import { MOCK_AGENTS, MOCK_LISTINGS } from "./mock-data";
import { matches, sortListings } from "./search";
import type {
  Agent,
  Listing,
  ListingQuery,
  ListingResult,
  ListingsProvider,
} from "./types";

/**
 * In-memory provider backed by mock data. Async signatures match a real network
 * provider so swapping has zero call-site impact.
 */
export class MockListingsProvider implements ListingsProvider {
  readonly name = "mock";

  async getListings(query: ListingQuery = {}): Promise<ListingResult> {
    const filtered = MOCK_LISTINGS.filter((l) => matches(l, query));
    const sorted = sortListings(filtered, query.sort);
    const offset = query.offset ?? 0;
    const limit = query.limit ?? sorted.length;
    return {
      listings: sorted.slice(offset, offset + limit),
      total: sorted.length,
    };
  }

  async getListingBySlug(slug: string): Promise<Listing | null> {
    return MOCK_LISTINGS.find((l) => l.slug === slug) ?? null;
  }

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    const featured = MOCK_LISTINGS.filter((l) => l.isFeatured);
    const pool = featured.length ? featured : MOCK_LISTINGS;
    return sortListings(pool, "price-desc").slice(0, limit);
  }

  async getAgents(): Promise<Agent[]> {
    return MOCK_AGENTS;
  }

  async getAgentBySlug(slug: string): Promise<Agent | null> {
    return MOCK_AGENTS.find((a) => a.slug === slug) ?? null;
  }
}
