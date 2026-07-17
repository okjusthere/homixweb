import { unstable_cache } from "next/cache";
import { STATIC_AGENTS } from "./agents/static-roster";
import { getSupabase } from "./supabase";
import type { Agent, AgentReview } from "./listings/types";

/**
 * Agent roster data layer. Reads from Supabase when configured (so advisors can
 * self-edit), otherwise falls back to the bundled static roster — the site works
 * either way.
 */

export interface AgentReviews {
  zillow?: AgentReview;
  google?: AgentReview;
}

export interface AgentStats {
  years?: string;
  transactions?: string;
  volume?: string;
  areas?: string;
}

export interface AgentTestimonial {
  quote: string;
  author?: string;
}

export interface AgentRow {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  specialties: string[] | null;
  languages: string[] | null;
  social: Record<string, string> | null;
  wechat_qr: string | null;
  reviews: AgentReviews | null;
  stats: AgentStats | null;
  testimonials: AgentTestimonial[] | null;
  license_number: string | null;
  profile_url: string | null;
  mls_id: string | null;
  show_past_deals: boolean | null;
  visible: boolean | null;
  sort: number | null;
  edit_token?: string;
}

/** Public roster cache tag, invalidated whenever an advisor record changes. */
export const PUBLIC_AGENTS_CACHE_TAG = "public-agents";

/** Keep only reviews that carry a live URL; drop empty/rating-only entries. */
function cleanReviews(reviews: AgentReviews | null): Agent["reviews"] {
  if (!reviews) return undefined;
  const out: AgentReviews = {};
  for (const key of ["zillow", "google"] as const) {
    const r = reviews[key];
    if (r && r.url) out[key] = r;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Drop stat keys with no value so the UI can test presence cleanly. */
function cleanStats(stats: AgentStats | null): Agent["stats"] {
  if (!stats) return undefined;
  const out: AgentStats = {};
  for (const key of ["years", "transactions", "volume", "areas"] as const) {
    const v = stats[key]?.trim();
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

function cleanTestimonials(list: AgentTestimonial[] | null): Agent["testimonials"] {
  if (!list) return undefined;
  const out = list
    .filter((t) => t && t.quote?.trim())
    .map((t) => ({ quote: t.quote.trim(), author: t.author?.trim() || undefined }));
  return out.length ? out : undefined;
}

function rowToAgent(r: AgentRow): Agent {
  const languages = (r.languages || []).map((l) => l.trim()).filter(Boolean);
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    title: r.title || "Licensed Real Estate Salesperson",
    photo: r.photo_url || "/agent-placeholder-logo.png",
    phone: r.phone || "",
    email: r.email || "",
    bio: r.bio || "",
    specialties: r.specialties || [],
    languages: languages.length ? languages : undefined,
    licenseNumber: r.license_number || undefined,
    profileUrl: r.profile_url || undefined,
    mlsId: r.mls_id || undefined,
    // Only an explicit false hides past sales; missing column/value = show.
    showPastDeals: r.show_past_deals === false ? false : undefined,
    wechatQr: r.wechat_qr || undefined,
    social: r.social || undefined,
    reviews: cleanReviews(r.reviews),
    stats: cleanStats(r.stats),
    testimonials: cleanTestimonials(r.testimonials),
  };
}

const loadPublicAgents = unstable_cache(async (): Promise<Agent[]> => {
  const sb = getSupabase();
  if (!sb) return STATIC_AGENTS;
  const { data, error } = await sb
    .from("agents")
    .select("*")
    .eq("visible", true)
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  if (error || !data || data.length === 0) return STATIC_AGENTS;
  return (data as AgentRow[]).map(rowToAgent);
}, ["public-agents"], {
  // Long TTL is safe: the self-edit save action revalidates the tag, so
  // changes appear immediately — the TTL is only a fallback. Keeping it high
  // stops the roster from rewriting the data cache every few minutes under
  // crawler traffic (Vercel ISR-write/CPU quota).
  revalidate: 86400,
  tags: [PUBLIC_AGENTS_CACHE_TAG],
});

const loadPublicAgentBySlug = unstable_cache(async (slug: string): Promise<Agent | null> => {
  const sb = getSupabase();
  if (!sb) return STATIC_AGENTS.find((a) => a.slug === slug) ?? null;
  const { data } = await sb.from("agents").select("*").eq("slug", slug).maybeSingle();
  // A hidden Supabase profile must not fall through to a same-slug static
  // record: the public directory only represents explicitly visible advisors.
  if (data && (data as AgentRow).visible !== true) return null;
  return data ? rowToAgent(data as AgentRow) : (STATIC_AGENTS.find((a) => a.slug === slug) ?? null);
}, ["public-agent-by-slug"], {
  // Same story as public-agents above: tag-invalidated on save, long fallback.
  revalidate: 86400,
  tags: [PUBLIC_AGENTS_CACHE_TAG],
});

export async function getAgents(): Promise<Agent[]> {
  return loadPublicAgents();
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  return loadPublicAgentBySlug(slug);
}

/** Load an advisor by their secret edit token (for the self-edit page). */
export async function getAgentByToken(
  token: string,
): Promise<(Agent & { editToken: string }) | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from("agents").select("*").eq("edit_token", token).maybeSingle();
  if (!data) return null;
  return { ...rowToAgent(data as AgentRow), editToken: token };
}
