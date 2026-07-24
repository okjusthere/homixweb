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

/** Upload one image to the shared public agent-photos bucket, returning its URL. */
async function uploadImage(
  sb: NonNullable<ReturnType<typeof getSupabase>>,
  slug: string,
  kind: string,
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (file.size > 8 * 1024 * 1024) return { error: "Image is too large (max 8MB)." };
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Please upload a JPG, PNG, WebP, or GIF image." };
  const path = `agents/${slug}/${kind}-${Date.now()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage
    .from("agent-photos")
    .upload(path, buf, { contentType: file.type, upsert: true });
  if (error) return { error: `Upload failed: ${error.message}` };
  return { url: sb.storage.from("agent-photos").getPublicUrl(path).data.publicUrl };
}

/** The Supabase agents row shape this module reads. */
export type AgentRowForSave = {
  id: string;
  slug: string;
  photo_url: string | null;
  wechat_qr: string | null;
  mls_id?: string | null;
  show_past_deals?: boolean | null;
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

  const { error } = await sb
    .from("agents")
    .update({
      title: cleanText(formData.get("title")) || "Licensed Real Estate Salesperson",
      email: cleanText(formData.get("email")) || null,
      // Bio is multi-paragraph (rendered whitespace-pre-line) and isn't used in
      // the vCard/JSON-LD, so preserve its newlines — just trim.
      bio: String(formData.get("bio") || "").trim() || null,
      specialties,
      languages,
      social,
      wechat_qr: wechatQr,
      reviews,
      stats,
      testimonials,
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
      ...(hasCareerColumns
        ? {
            show_past_deals: formData.get("show_past_deals") === "on",
          }
        : {}),
    })
    .eq("id", agent.id);

  if (error) return { ok: false, error: error.message };

  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath(`/agents/${agent.slug}`);
  revalidatePath(`/zh/agents/${agent.slug}`);
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
  return { ok: true };
}
