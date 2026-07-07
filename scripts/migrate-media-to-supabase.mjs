import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const bucket = "agent-photos";
const dryRun = process.argv.includes("--dry-run");
const skipUpload = process.argv.includes("--skip-upload");
const skipDb = process.argv.includes("--skip-db");
const skipSource = process.argv.includes("--skip-source");

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function isMigratableFile(file) {
  return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".pdf"].includes(
    path.extname(file).toLowerCase(),
  );
}

async function walkAll(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return walkAll(full);
        if (entry.isFile()) return [full];
        return [];
      }),
    );
    return files.flat();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function walkMedia(dir) {
  return (await walkAll(dir)).filter(isMigratableFile);
}

async function mapLimit(items, limit, fn) {
  const results = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function publicUrlFor(sb, storagePath) {
  return sb.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

async function uploadFile(sb, localPath, storagePath, index, total) {
  const ext = path.extname(localPath).toLowerCase();
  const contentType = contentTypes[ext] || "application/octet-stream";
  if (!dryRun && !skipUpload) {
    const body = await fs.readFile(localPath);
    const { error } = await sb.storage.from(bucket).upload(storagePath, body, {
      cacheControl: "31536000",
      contentType,
      upsert: true,
    });
    if (error) throw new Error(`${storagePath}: ${error.message}`);
  }
  if ((index + 1) % 50 === 0 || index + 1 === total) {
    console.log(`uploaded ${index + 1}/${total}`);
  }
  return publicUrlFor(sb, storagePath);
}

async function replaceInSource(replacements) {
  const sourceFiles = (await walkAll(path.join(cwd, "src"))).filter((file) =>
    [".ts", ".tsx", ".json"].includes(path.extname(file).toLowerCase()),
  );
  let changed = 0;
  for (const file of sourceFiles) {
    let text = await fs.readFile(file, "utf8");
    const before = text;
    for (const [from, to] of replacements) {
      text = text.split(from).join(to);
    }
    if (text !== before) {
      changed += 1;
      if (!dryRun && !skipSource) await fs.writeFile(file, text);
    }
  }
  return changed;
}

async function main() {
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const sb = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  const agentFiles = await walkMedia(path.join(cwd, "public", "agents"));
  const mediaRoots = [
    "about",
    "communities",
    "join",
    "journal",
    "neighborhoods",
    "new-development",
    "onboarding",
    "training",
  ];
  const mediaFiles = (
    await Promise.all(mediaRoots.map((root) => walkMedia(path.join(cwd, "public", root))))
  ).flat();

  console.log(
    JSON.stringify(
      {
        dryRun,
        skipUpload,
        skipDb,
        skipSource,
        agentFiles: agentFiles.length,
        siteMediaFiles: mediaFiles.length,
      },
      null,
      2,
    ),
  );

  const agentUploads = await mapLimit(agentFiles, 5, async (file, index) => {
    const name = path.basename(file);
    const slug = name.replace(/\.[^.]+$/, "");
    const storagePath = `agents/${name}`;
    const publicUrl = await uploadFile(sb, file, storagePath, index, agentFiles.length);
    return { slug, publicUrl, storagePath };
  });

  if (!dryRun && !skipDb) {
    let updated = 0;
    for (const agent of agentUploads) {
      const { data, error } = await sb
        .from("agents")
        .update({ photo_url: agent.publicUrl })
        .eq("slug", agent.slug)
        .select("slug")
        .maybeSingle();
      if (error) throw new Error(`${agent.slug}: ${error.message}`);
      if (data) updated += 1;
    }
    console.log(`agent rows updated: ${updated}`);
  }

  const mediaReplacements = [];
  await mapLimit(mediaFiles, 5, async (file, index) => {
    const rel = path.relative(path.join(cwd, "public"), file).split(path.sep).join("/");
    const storagePath = `site-media/${rel}`;
    const publicUrl = await uploadFile(sb, file, storagePath, index, mediaFiles.length);
    mediaReplacements.push([`/${rel}`, publicUrl]);
  });

  const changedSourceFiles = await replaceInSource(mediaReplacements);
  console.log(`source files changed by media URL replacement: ${changedSourceFiles}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
