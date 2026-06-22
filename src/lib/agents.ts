import { MOCK_AGENTS } from "./listings/mock-data";
import { getSupabase } from "./supabase";
import type { Agent } from "./listings/types";

/**
 * Agent roster data layer. Reads from Supabase when configured (so advisors can
 * self-edit), otherwise falls back to the bundled static roster — the site works
 * either way.
 */

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
  social: Record<string, string> | null;
  license_number: string | null;
  profile_url: string | null;
  visible: boolean | null;
  sort: number | null;
  edit_token?: string;
}

function rowToAgent(r: AgentRow): Agent {
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
    licenseNumber: r.license_number || undefined,
    profileUrl: r.profile_url || undefined,
    social: r.social || undefined,
  };
}

export async function getAgents(): Promise<Agent[]> {
  const sb = getSupabase();
  if (!sb) return MOCK_AGENTS;
  const { data, error } = await sb
    .from("agents")
    .select("*")
    .eq("visible", true)
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  if (error || !data || data.length === 0) return MOCK_AGENTS;
  return (data as AgentRow[]).map(rowToAgent);
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const sb = getSupabase();
  if (!sb) return MOCK_AGENTS.find((a) => a.slug === slug) ?? null;
  const { data } = await sb.from("agents").select("*").eq("slug", slug).maybeSingle();
  return data ? rowToAgent(data as AgentRow) : (MOCK_AGENTS.find((a) => a.slug === slug) ?? null);
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
