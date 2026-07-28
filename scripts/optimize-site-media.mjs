// One-off recompression sweep over the Supabase `site-media` bucket (and,
// with --bucket=agent-photos, the headshot bucket).
//
// Why: the site serves images unoptimized (Vercel transform quota exhausted),
// and the editorial imagery was uploaded near-lossless — 234 of the 244
// referenced files exceed 200KB (~113MB total, typical 1500px file at 850KB).
// The buckets also serve `cache-control: no-cache`, forcing revalidation on
// every navigation. This script downloads every image, re-encodes it with
// sharp (cap 1600px, mozjpeg q80 / webp q80, EXIF-rotated and stripped), and
// re-uploads IN PLACE with a one-year cacheControl. URLs don't change.
//
// Safety: only rewrites when the re-encode is at least 15% smaller; originals
// are saved to ./site-media-backup/ before the first overwrite. Re-running is
// harmless (already-small files are skipped).
//
// Run:
//   SUPABASE_URL=https://wnshsoxtxkfbphglyvmj.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=... \
//   node scripts/optimize-site-media.mjs [--bucket=site-media] [--dry-run]

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  process.exit(1);
}

const args = new Map(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  }),
);
const BUCKET = args.get("bucket") || "site-media";
const DRY = args.get("dry-run") === "true";
const MAX_WIDTH = 1600;
const MIN_BYTES = 150 * 1024; // leave already-small files alone
const MIN_SAVING = 0.15;
const BACKUP_DIR = "site-media-backup";

const sb = createClient(url, key, { auth: { persistSession: false } });

async function* walk(prefix = "") {
  let page = 0;
  for (;;) {
    const { data, error } = await sb.storage
      .from(BUCKET)
      .list(prefix, { limit: 100, offset: page * 100, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(`list ${prefix}: ${error.message}`);
    if (!data?.length) return;
    for (const entry of data) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) yield* walk(path); // folder
      else yield { path, size: entry.metadata?.size ?? 0 };
    }
    if (data.length < 100) return;
    page += 1;
  }
}

let scanned = 0, rewritten = 0, savedBytes = 0, skipped = 0, failed = 0;

for await (const { path, size } of walk()) {
  if (!/\.(jpe?g|png|webp)$/i.test(path)) continue;
  scanned += 1;
  if (size > 0 && size < MIN_BYTES) { skipped += 1; continue; }

  const { data: blob, error: dlErr } = await sb.storage.from(BUCKET).download(path);
  if (dlErr || !blob) { console.warn(`  !! download failed ${path}: ${dlErr?.message}`); failed += 1; continue; }
  const original = Buffer.from(await blob.arrayBuffer());
  if (original.length < MIN_BYTES) { skipped += 1; continue; }

  // Keep each file's own format — a .webp re-encoded as JPEG bytes would be
  // served with the wrong content-type and lose transparency.
  const isPng = /\.png$/i.test(path);
  const isWebp = /\.webp$/i.test(path);
  let out;
  try {
    const base = sharp(original).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
    out = isPng
      ? await base.png({ compressionLevel: 9, palette: true }).toBuffer()
      : isWebp
        ? await base.webp({ quality: 80 }).toBuffer()
        : await base.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  } catch (err) {
    console.warn(`  !! sharp failed ${path}: ${err.message}`); failed += 1; continue;
  }

  if (out.length > original.length * (1 - MIN_SAVING)) {
    // Not enough savings — still worth re-uploading once for the cacheControl,
    // using the ORIGINAL bytes so quality is untouched.
    out = original;
  }

  const saving = original.length - out.length;
  console.log(
    `${DRY ? "[dry] " : ""}${path}  ${(original.length / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`,
  );
  if (DRY) continue;

  const backupPath = join(BACKUP_DIR, BUCKET, path);
  if (!existsSync(backupPath)) {
    mkdirSync(dirname(backupPath), { recursive: true });
    writeFileSync(backupPath, original);
  }

  const contentType = isPng ? "image/png" : /\.webp$/i.test(path) ? "image/webp" : "image/jpeg";
  const { error: upErr } = await sb.storage
    .from(BUCKET)
    .upload(path, out, { contentType, upsert: true, cacheControl: "31536000" });
  if (upErr) { console.warn(`  !! upload failed ${path}: ${upErr.message}`); failed += 1; continue; }
  rewritten += 1;
  savedBytes += Math.max(0, saving);
}

console.log(
  `\nDone: ${scanned} scanned, ${rewritten} rewritten, ${skipped} already small, ${failed} failed, ` +
  `${(savedBytes / 1024 / 1024).toFixed(1)}MB saved. Originals in ./${BACKUP_DIR}/`,
);
