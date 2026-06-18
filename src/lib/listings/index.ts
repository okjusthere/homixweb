/**
 * Listings data layer — single entry point.
 *
 * UI code imports `listings` from here and never touches a concrete provider.
 * Switch sources with the LISTINGS_PROVIDER env var:
 *
 *   LISTINGS_PROVIDER=mock     (default — sample data, no credentials)
 *   LISTINGS_PROVIDER=onekey   (real OneKey MLS data via the synced cache;
 *                               run `node scripts/sync-listings.mjs` to populate)
 */

import { CachedListingsProvider } from "./cached-provider";
import { MockListingsProvider } from "./mock-provider";
import type { ListingsProvider } from "./types";

function createProvider(): ListingsProvider {
  const which = (process.env.LISTINGS_PROVIDER ?? "mock").toLowerCase();
  switch (which) {
    case "onekey":
    case "mlsgrid":
    case "cache":
      return new CachedListingsProvider();
    case "mock":
      return new MockListingsProvider();
    default:
      console.warn(`Unknown LISTINGS_PROVIDER "${which}", falling back to mock.`);
      return new MockListingsProvider();
  }
}

/** Process-wide singleton provider. */
export const listings: ListingsProvider = createProvider();

export * from "./types";
