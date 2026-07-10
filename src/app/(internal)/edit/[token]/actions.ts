"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { findRosterMemberByLicense } from "@/lib/agents/mls-roster";
import { getSupabase } from "@/lib/supabase";

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

/** Upload one image to the shared bucket, returning its public URL. */
async function uploadImage(
  sb: ReturnType<typeof getSupabase>,
  slug: string,
  kind: string,
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (!sb) return { error: "Storage isn't configured." };
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

export async function updateAgentProfile(
  _prev: SaveState | null,
  formData: FormData,
): Promise<SaveState> {
  const token = String(formData.get("token") || "");
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Editing isn't configured yet." };
  if (!token) return { ok: false, error: "Missing edit token." };

  // Full-row select doubles as feature detection: mls_id / show_past_deals
  // only exist after the career-columns migration, and the update payload
  // must not reference columns that aren't there yet.
  const { data: agent, error: lookupErr } = await sb
    .from("agents")
    .select("*")
    .eq("edit_token", token)
    .maybeSingle();
  // Distinguish a real DB error (e.g. a missing column before the migration ran)
  // from a genuinely unknown token, so the advisor isn't told "invalid link".
  if (lookupErr) return { ok: false, error: `Couldn't load your profile: ${lookupErr.message}` };
  if (!agent) return { ok: false, error: "This edit link is invalid or expired." };

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

  const license = cleanText(formData.get("license")) || null;
  const hasCareerColumns = "mls_id" in agent && "show_past_deals" in agent;

  // License verification against the official MLS roster. A license number is
  // DOS-issued digits, NOT the MLS member id — but the roster carries each
  // member's license, so an exact match resolves the member id safely:
  //  - only fills mls_id when it's empty (never overrides an admin mapping)
  //  - refuses a member id already claimed by another advisor (typo guard)
  //  - a non-matching number still saves as display text, with a notice
  let notice: string | undefined;
  let verifiedMlsId: string | null = null;
  if (license && hasCareerColumns) {
    const member = await findRosterMemberByLicense(license);
    if (member) {
      const { data: claimed } = await sb
        .from("agents")
        .select("slug")
        .eq("mls_id", member.memberMlsId)
        .neq("id", agent.id)
        .maybeSingle();
      if (claimed) {
        notice = `License ${license} belongs to ${member.fullName}, already linked to another profile — please double-check the number.`;
      } else if (!agent.mls_id) {
        verifiedMlsId = member.memberMlsId;
        notice = `License verified against the MLS roster (${member.fullName}) — past sales are now linked.`;
      } else if (agent.mls_id !== member.memberMlsId) {
        notice = `Heads-up: this license belongs to ${member.fullName} on the MLS roster, but the profile is linked to a different MLS member. Ask an admin to review.`;
      }
    } else {
      notice =
        "License saved, but it didn't match the MLS roster — check for typos if your past sales don't appear.";
    }
  }

  const { error } = await sb
    .from("agents")
    .update({
      name: cleanText(formData.get("name")),
      title: cleanText(formData.get("title")) || "Licensed Real Estate Salesperson",
      phone: cleanText(formData.get("phone")) || null,
      email: cleanText(formData.get("email")) || null,
      // Bio is multi-paragraph (rendered whitespace-pre-line) and isn't used in
      // the vCard/JSON-LD, so preserve its newlines — just trim.
      bio: String(formData.get("bio") || "").trim() || null,
      license_number: license,
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
            ...(verifiedMlsId ? { mls_id: verifiedMlsId } : {}),
          }
        : {}),
    })
    .eq("edit_token", token);

  if (error) return { ok: false, error: error.message };

  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath(`/agents/${agent.slug}`);
  revalidatePath(`/zh/agents/${agent.slug}`);
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
  return { ok: true, notice };
}
