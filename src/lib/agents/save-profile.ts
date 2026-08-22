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

export type SaveErrorCode =
  | "image_too_large"
  | "heic_requires_conversion"
  | "unsupported_image"
  | "image_decode_failed"
  | "image_upload_failed"
  | "profile_update_failed";

export interface SaveState {
  ok: boolean;
  error?: string;
  code?: SaveErrorCode;
  field?: "photo" | "wechat_qr";
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

const MAX_IMAGE_UPLOAD_BYTES = 3 * 1024 * 1024;
const IMAGE_FORMATS = new Set(["jpeg", "png", "webp", "gif"]);
const HEIC_MIME_TYPES = new Set(["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"]);
const HEIC_EXTENSIONS = /\.(?:heic|heif)$/i;
const HEIC_BRANDS = new Set(["heic", "heix", "hevc", "hevx", "mif1", "msf1"]);

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
): Promise<{ url: string } | { error: string; code: SaveErrorCode }> {
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return { error: "The processed image is too large (max 3 MB).", code: "image_too_large" };
  }

  let buf = Buffer.from(await file.arrayBuffer());
  const brand = buf.length >= 12 ? buf.subarray(8, 12).toString("ascii") : "";
  if (HEIC_MIME_TYPES.has(file.type.toLowerCase()) || HEIC_EXTENSIONS.test(file.name) || HEIC_BRANDS.has(brand)) {
    return {
      error: "HEIC/HEIF must be converted in the browser before uploading.",
      code: "heic_requires_conversion",
    };
  }

  try {
    const sharp = (await import("sharp")).default;
    const metadata = await sharp(buf).metadata();
    if (!metadata.format || !IMAGE_FORMATS.has(metadata.format)) {
      return { error: "Please upload a JPG, PNG, WebP, or GIF image.", code: "unsupported_image" };
    }

    let ext = metadata.format === "jpeg" ? "jpg" : metadata.format;
    let contentType = metadata.format === "jpeg" ? "image/jpeg" : `image/${metadata.format}`;
    if (metadata.format !== "gif") {
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
    }

    const path = `agents/${slug}/${kind}-${Date.now()}.${ext}`;
    const { error } = await sb.storage
      .from("agent-photos")
      .upload(path, buf, { contentType, upsert: true, cacheControl: "31536000" });
    if (error) {
      console.warn("Agent profile image storage upload failed", { kind, message: error.message });
      return { error: "The image could not be uploaded. Please try again.", code: "image_upload_failed" };
    }
    return { url: sb.storage.from("agent-photos").getPublicUrl(path).data.publicUrl };
  } catch (error) {
    console.warn("Agent profile image decode failed", {
      kind,
      mime: file.type || "unknown",
      size: file.size,
      message: error instanceof Error ? error.message : "unknown",
    });
    return { error: "That image could not be read. Please try a different file.", code: "image_decode_failed" };
  }
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
    if ("error" in res) return { ok: false, error: res.error, code: res.code, field: "photo" };
    photoUrl = res.url;
  }

  // Optional WeChat QR — upload a new one, or remove the existing one.
  let wechatQr: string | null = agent.wechat_qr;
  const qr = formData.get("wechat_qr");
  if (formData.get("remove_wechat_qr") === "1") {
    wechatQr = null;
  } else if (qr instanceof File && qr.size > 0) {
    const res = await uploadImage(sb, agent.slug, "wechat", qr);
    if ("error" in res) return { ok: false, error: res.error, code: res.code, field: "wechat_qr" };
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

  if (error) {
    console.warn("Agent public profile update failed", { agentId: agent.id, message: error.message });
    return { ok: false, error: "The profile could not be saved. Please try again.", code: "profile_update_failed" };
  }

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
