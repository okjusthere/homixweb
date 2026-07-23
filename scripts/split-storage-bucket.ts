/**
 * Storage split: copy everything under agent-photos/site-media/ into a
 * dedicated public `site-media` bucket, so `agent-photos` goes back to
 * meaning exactly what it says (advisor portraits only).
 *
 *   SUPABASE_URL=https://<ref>.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=… \
 *   npx tsx scripts/split-storage-bucket.ts
 *
 * Idempotent: re-running overwrites (upsert). Source objects are NOT
 * deleted — flip SITE_MEDIA_ROOT in src/lib/media.ts, deploy, verify, and
 * only then clean up the old prefix by hand in the dashboard.
 */
import { createClient } from "@supabase/supabase-js";

const SRC_BUCKET = "agent-photos";
const SRC_PREFIX = "site-media";
const DST_BUCKET = "site-media";

async function main() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const sb = createClient(url, key, { auth: { persistSession: false } });

  // 1. Ensure the destination bucket exists and is public.
  const { data: buckets, error: bucketsErr } = await sb.storage.listBuckets();
  if (bucketsErr) throw bucketsErr;
  if (!buckets.some((b) => b.name === DST_BUCKET)) {
    const { error } = await sb.storage.createBucket(DST_BUCKET, { public: true });
    if (error) throw error;
    console.log(`Created public bucket "${DST_BUCKET}".`);
  } else {
    console.log(`Bucket "${DST_BUCKET}" already exists.`);
  }

  // 2. Walk the source prefix recursively.
  async function listAll(prefix: string): Promise<string[]> {
    const out: string[] = [];
    let offset = 0;
    for (;;) {
      const { data, error } = await sb.storage
        .from(SRC_BUCKET)
        .list(prefix, { limit: 100, offset });
      if (error) throw error;
      if (!data || data.length === 0) break;
      for (const entry of data) {
        const path = prefix ? `${prefix}/${entry.name}` : entry.name;
        // Folders come back with a null id.
        if (entry.id === null) out.push(...(await listAll(path)));
        else out.push(path);
      }
      if (data.length < 100) break;
      offset += data.length;
    }
    return out;
  }

  const sources = await listAll(SRC_PREFIX);
  console.log(`Found ${sources.length} objects under ${SRC_BUCKET}/${SRC_PREFIX}/`);

  // 3a. Resume support: list what's already in the destination so a re-run
  // after a mid-copy failure (rate limit, network) skips finished files
  // instead of re-copying all 1000+.
  async function listDst(prefix: string): Promise<Set<string>> {
    const out = new Set<string>();
    async function walk(p: string) {
      let offset = 0;
      for (;;) {
        const { data, error } = await sb.storage.from(DST_BUCKET).list(p, { limit: 100, offset });
        if (error) return; // bucket empty/new — nothing to skip
        if (!data || data.length === 0) break;
        for (const entry of data) {
          const path = p ? `${p}/${entry.name}` : entry.name;
          if (entry.id === null) await walk(path);
          else out.add(path);
        }
        if (data.length < 100) break;
        offset += data.length;
      }
    }
    await walk(prefix);
    return out;
  }
  const alreadyThere = await listDst("");
  if (alreadyThere.size) console.log(`Destination already has ${alreadyThere.size} objects — will skip those.`);

  // 3b. Copy (download → upload; cross-bucket copy isn't in the client API).
  let copied = 0;
  let skipped = 0;
  for (const src of sources) {
    const dst = src.replace(new RegExp(`^${SRC_PREFIX}/`), "");
    if (alreadyThere.has(dst)) {
      skipped += 1;
      continue;
    }
    const { data: blob, error: dlErr } = await sb.storage.from(SRC_BUCKET).download(src);
    if (dlErr || !blob) throw new Error(`download ${src}: ${dlErr?.message}`);
    const { error: upErr } = await sb.storage
      .from(DST_BUCKET)
      .upload(dst, blob, { upsert: true, contentType: blob.type || undefined });
    if (upErr) throw new Error(`upload ${dst}: ${upErr.message}`);
    copied += 1;
    if (copied % 25 === 0) console.log(`  copied ${copied} (skipped ${skipped})…`);
  }
  console.log(`Copied ${copied} objects into "${DST_BUCKET}" (skipped ${skipped} already present).`);

  // 4. Verify one public URL end-to-end.
  if (sources.length > 0) {
    const probe = sources[0].replace(new RegExp(`^${SRC_PREFIX}/`), "");
    const publicUrl = sb.storage.from(DST_BUCKET).getPublicUrl(probe).data.publicUrl;
    const res = await fetch(publicUrl, { method: "HEAD" });
    console.log(`Probe ${publicUrl} → ${res.status}`);
    if (!res.ok) process.exit(1);
  }
  console.log("Done. Now flip SITE_MEDIA_ROOT in src/lib/media.ts and deploy.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
