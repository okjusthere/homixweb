import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MOCK_AGENTS } from "./mock-data";
import { cityFacets, matches, sortListings } from "./search";
import type {
  Agent,
  Listing,
  ListingQuery,
  ListingResult,
  ListingsProvider,
} from "./types";

/**
 * Serves listings from the local cache produced by `scripts/sync-listings.mjs`
 * (the OneKey / MLS Grid replication). All rich search runs in-memory here,
 * because MLS Grid itself only supports replication-style filters. Agents/team
 * are brand content and always come from the static roster.
 */

const CACHE_PATH = join(process.cwd(), "src", "data", "listings-cache.json");

let cache: Listing[] | null = null;
let syncedAt: string | null = null;

function load(): Listing[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(readFileSync(CACHE_PATH, "utf8")) as {
      listings?: Listing[];
      syncedAt?: string;
    };
    cache = parsed.listings ?? [];
    syncedAt = parsed.syncedAt ?? null;
  } catch {
    console.warn(
      "listings-cache.json not found — run `node scripts/sync-listings.mjs`. Serving empty set.",
    );
    cache = [];
  }
  return cache;
}

/** Curate homepage features: well-photographed, mid–high-end, varied cities. */
function pickFeatured(all: Listing[], limit: number): Listing[] {
  const pool = all.filter(
    (l) =>
      l.photos.length >= 5 &&
      l.listPrice >= 600_000 &&
      l.listPrice <= 8_000_000 &&
      l.status === "Active",
  );
  const sorted = sortListings(pool.length ? pool : all, "price-desc");
  const seenCity = new Set<string>();
  const out: Listing[] = [];
  for (const l of sorted) {
    if (seenCity.has(l.address.city)) continue;
    seenCity.add(l.address.city);
    out.push(l);
    if (out.length >= limit) break;
  }
  return out.length >= limit ? out : sorted.slice(0, limit);
}

export class CachedListingsProvider implements ListingsProvider {
  readonly name = "onekey-cache";

  get lastSyncedAt(): string | null {
    load();
    return syncedAt;
  }

  async getListings(query: ListingQuery = {}): Promise<ListingResult> {
    const all = load();
    const filtered = all.filter((l) => matches(l, query));
    const sorted = sortListings(filtered, query.sort);
    const offset = query.offset ?? 0;
    const limit = query.limit ?? sorted.length;
    return { listings: sorted.slice(offset, offset + limit), total: sorted.length };
  }

  async getListingBySlug(slug: string): Promise<Listing | null> {
    return load().find((l) => l.slug === slug) ?? null;
  }

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    return pickFeatured(load(), limit);
  }

  async getAgents(): Promise<Agent[]> {
    return MOCK_AGENTS;
  }

  async getAgentBySlug(slug: string): Promise<Agent | null> {
    return MOCK_AGENTS.find((a) => a.slug === slug) ?? null;
  }

  /** City facets for the listings filter bar. */
  cities(limit = 24): string[] {
    return cityFacets(load(), limit);
  }
}
