import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { getSupabase } from "@/lib/supabase";

/**
 * Shared core for saving a public advisor profile. Every entry point reuses it,
 * so validation / image upload / cache revalidation can never drift between
 * them. Identity fields (name, phone, license) are deliberately NOT accepted
 * here; portal.agents owns them and syncs through /api/agent-profile/identity.
 * Callers resolve the agent row their own way,
 * then hand it here with the submitted form:
 *  - /api/agent-profile — the advisor's own linked profile, keyed by
 *    portal_agent_id from an authenticated agents.homixny.com session.
 *  - /api/agent-admin/edit — an admin editing any advisor, keyed by public id.
 *
 * The write is keyed by agent id, so it doesn't matter how the row was found.
 */

export interface SaveState {
  ok: boolean;
  error?: string;
  /** Non-blocking feedback, e.g. the license-verification result. */
  notice?: string;
}

const SOCIAL_KEYS = [
  "instagram",
  "xiaohongshu",
  "douyin",
  "youtube",
  "linkedin",
  "website",
] as const;
const REVIEW_SITES = ["zillow", "google"] as const;
const STAT_KEYS = ["years", "transactions", "volume", "areas"] as const;
const MAX_TESTIMONIALS = 3;

/** Allowed image MIME types → canonical extension. The content-type and the
 *  stored extension are derived from THIS map, never from the client's
 *  filename/file.type, so a `x.html`/`text/html` upload can't land in the bucket. */
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/** Strip control chars (incl. CR/LF) so a value can't inject extra lines into a
 *  vCard, a mailto: header, or JSON-LD downstream. */
function cleanText(v: unknown): string {
  return String(v ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim();
}

/** Keep a URL only if it's a real http(s) link — drops javascript:/data: etc. */
function httpUrl(v: unknown): string {
  const s = cleanText(v);
  return /^https?:\/\//i.test(s) ? s : "";
}

/** Split a comma/、separated field into clean, non-empty items. */
function splitList(v: unknown): string[] {
  return cleanText(v)
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Display-size ceilings. Headshots render at ≤420px (agent profile hero), the
 *  WeChat QR at ≤176px; 2x those caps keeps retina sharpness. The site serves
 *  images unoptimized (Vercel transform quota), so upload time is the only
 *  place a 12MP phone photo can be cut down. */
const IMAGE_MAX_WIDTH: Record<string, number> = { headshot: 1100, wechat: 600 };

/** Upload one image to the shared public agent-photos bucket, returning its URL.
 *  Re-encodes through sharp: capped to the render size, EXIF-rotated then
 *  stripped. Headshots become JPEG — they double as the profile's og:image,
 *  and WeChat/QQ share-card crawlers don't render webp (this audience lives
 *  on WeChat). Everything else becomes webp. Animated GIFs skip re-encoding
 *  (sharp would keep only the first frame) and upload as-is. Filenames are
 *  timestamped, so the year-long cache never serves a stale replacement. */
async function uploadImage(
  sb: NonNullable<ReturnType<typeof getSupabase>>,
  slug: string,
  kind: string,
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (file.size > 8 * 1024 * 1024) return { error: "Image is too large (max 8MB)." };
  if (!IMAGE_TYPES[file.type]) return { error: "Please upload a JPG, PNG, WebP, or GIF image." };

  let buf = Buffer.from(await file.arrayBuffer());
  let ext = IMAGE_TYPES[file.type];
  let contentType = file.type;
  if (file.type !== "image/gif") {
    try {
      const sharp = (await import("sharp")).default;
      const base = sharp(buf)
        .rotate()
        .resize({ width: IMAGE_MAX_WIDTH[kind] ?? 1100, withoutEnlargement: true });
      if (kind === "headshot") {
        buf = Buffer.from(await base.jpeg({ quality: 84, mozjpeg: true }).toBuffer());
        ext = "jpg";
        contentType = "image/jpeg";
      } else {
        buf = Buffer.from(await base.webp({ quality: 82 }).toBuffer());
        ext = "webp";
        contentType = "image/webp";
      }
    } catch {
      return { error: "That image could not be read — please try a different file." };
    }
  }

  const path = `agents/${slug}/${kind}-${Date.now()}.${ext}`;
  const { error } = await sb.storage
    .from("agent-photos")
    .upload(path, buf, { contentType, upsert: true, cacheControl: "31536000" });
  if (error) return { error: `Upload failed: ${error.message}` };
  return { url: sb.storage.from("agent-photos").getPublicUrl(path).data.publicUrl };
}

/** The Supabase agents row shape this module reads. */
export type AgentRowForSave = {
  id: string;
  slug: string;
  photo_url: string | null;
  wechat_qr: string | null;
  bio_zh?: string | null;
  mls_id?: string | null;
  show_past_deals?: boolean | null;
  portal_agent_id?: number | null;
};

/**
 * Apply an edited profile (from a multipart FormData) to the given agent row.
 * Handles optional headshot/QR uploads, list/social/reviews/stats/testimonials
 * parsing, MLS license verification, the DB update (keyed by id), and cache
 * revalidation. Returns { ok, notice? } or { ok:false, error }.
 */
export async function saveAgentProfileFromForm(
  agent: AgentRowForSave,
  formData: FormData,
): Promise<SaveState> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Editing isn't configured yet." };

  // Optional new headshot.
  let photoUrl: string | null = agent.photo_url;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    const res = await uploadImage(sb, agent.slug, "headshot", photo);
    if ("error" in res) return { ok: false, error: res.error };
    photoUrl = res.url;
  }

  // Optional WeChat QR — upload a new one, or remove the existing one.
  let wechatQr: string | null = agent.wechat_qr;
  const qr = formData.get("wechat_qr");
  if (formData.get("remove_wechat_qr") === "1") {
    wechatQr = null;
  } else if (qr instanceof File && qr.size > 0) {
    const res = await uploadImage(sb, agent.slug, "wechat", qr);
    if ("error" in res) return { ok: false, error: res.error };
    wechatQr = res.url;
  }

  const specialties = splitList(formData.get("specialties"));
  const languages = splitList(formData.get("languages"));

  // Social links — stored only when they're real http(s) URLs.
  const social: Record<string, string> = {};
  for (const k of SOCIAL_KEYS) {
    const v = httpUrl(formData.get(`social_${k}`));
    if (v) social[k] = v;
  }

  // Reviews — only stored when a live http(s) URL is present; rating/count optional.
  const reviews: Record<string, { url: string; rating?: string; count?: string }> = {};
  for (const site of REVIEW_SITES) {
    const url = httpUrl(formData.get(`review_${site}_url`));
    if (!url) continue;
    const rating = cleanText(formData.get(`review_${site}_rating`));
    const count = cleanText(formData.get(`review_${site}_count`));
    reviews[site] = {
      url,
      ...(rating ? { rating } : {}),
      ...(count ? { count } : {}),
    };
  }

  // Track-record stats — agent-entered, keep only non-empty values.
  const stats: Record<string, string> = {};
  for (const k of STAT_KEYS) {
    const v = cleanText(formData.get(`stat_${k}`));
    if (v) stats[k] = v;
  }

  // Testimonials — up to MAX_TESTIMONIALS quote/author pairs; drop empty quotes.
  const testimonials: { quote: string; author?: string }[] = [];
  for (let i = 0; i < MAX_TESTIMONIALS; i++) {
    const quote = cleanText(formData.get(`testimonial_${i}_quote`));
    if (!quote) continue;
    const author = cleanText(formData.get(`testimonial_${i}_author`));
    testimonials.push({ quote, ...(author ? { author } : {}) });
  }

  const hasCareerColumns = "mls_id" in agent && "show_past_deals" in agent;
  const submittedBioZh = formData.get("bio_zh");

  const updatedAt = new Date().toISOString();
  const { error } = await sb
    .from("agents")
    .update({
      title: cleanText(formData.get("title")) || "Licensed Real Estate Salesperson",
      email: cleanText(formData.get("email")) || null,
      // Bio is multi-paragraph (rendered whitespace-pre-line) and isn't used in
      // the vCard/JSON-LD, so preserve its newlines — just trim.
      bio: String(formData.get("bio") || "").trim() || null,
      // Older portal clients do not submit bio_zh. Preserve the current
      // translation until their bilingual editor is deployed.
      ...(submittedBioZh !== null
        ? { bio_zh: String(submittedBioZh).trim() || null }
        : {}),
      specialties,
      languages,
      social,
      wechat_qr: wechatQr,
      reviews,
      stats,
      testimonials,
      photo_url: photoUrl,
      updated_at: updatedAt,
      ...(hasCareerColumns
        ? {
            show_past_deals: formData.get("show_past_deals") === "on",
          }
        : {}),
    })
    .eq("id", agent.id);

  if (error) return { ok: false, error: error.message };

  // Existing share codes stay stable for analytics, while their versioned URL
  // changes whenever the public identity changes. That forces WeChat and other
  // social crawlers to fetch the updated name/headshot instead of reusing an
  // old card indefinitely.
  if (agent.portal_agent_id) {
    const { error: shareVersionError } = await sb
      .from("share_links")
      .update({ updated_at: updatedAt })
      .eq("agent_id", agent.portal_agent_id);
    if (shareVersionError && shareVersionError.code !== "42P01") {
      console.warn("Unable to refresh share-card versions:", shareVersionError.message);
    }
  }

  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath(`/agents/${agent.slug}`);
  revalidatePath(`/zh/agents/${agent.slug}`);
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
  return { ok: true };
}
