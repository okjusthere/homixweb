import { getSupabase } from "@/lib/supabase";

/**
 * Read-only loaders for the agent portal's two content areas. Both return [] when
 * Supabase isn't configured, so the pages render a tasteful empty/preview state.
 */

export interface TrainingVideo {
  id: string;
  cloudflareUid: string | null;
  title: string;
  summary: string | null;
  category: string;
  duration: string | null;
  level: string | null;
  sort: number;
}

export async function getTrainingVideos(): Promise<TrainingVideo[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from("training_videos")
    .select("id, cloudflare_uid, title, summary, category, duration, level, sort")
    .eq("visible", true)
    .order("sort", { ascending: true })
    .order("title", { ascending: true });
  return (data ?? []).map((r) => ({
    id: r.id,
    cloudflareUid: r.cloudflare_uid ?? null,
    title: r.title,
    summary: r.summary ?? null,
    category: r.category || "Training",
    duration: r.duration ?? null,
    level: r.level ?? null,
    sort: r.sort ?? 100,
  }));
}

export interface PortalResource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  url: string;
  sort: number;
}

export async function getResources(): Promise<PortalResource[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from("resources")
    .select("id, title, description, category, url, sort")
    .eq("visible", true)
    .order("sort", { ascending: true })
    .order("title", { ascending: true });
  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? null,
    category: r.category || "Resources",
    url: r.url,
    sort: r.sort ?? 100,
  }));
}

/** Stable group-by-category preserving first-seen (already sort-ordered) order. */
export function groupByCategory<T extends { category: string }>(items: T[]): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const arr = map.get(it.category) ?? [];
    arr.push(it);
    map.set(it.category, arr);
  }
  return Array.from(map.entries());
}
