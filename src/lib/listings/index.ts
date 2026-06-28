/**
 * Listings data layer — single entry point.
 *
 * UI code imports `listings` from here and never touches a concrete provider.
 * BBO is the only MLS data source; the website does not keep a local listing
 * cache or talk directly to OneKey/MLSGrid.
 */

import { BboListingsProvider } from "./bbo-provider";
import type { ListingsProvider } from "./types";

function createProvider(): ListingsProvider {
  return new BboListingsProvider();
}

/** Process-wide singleton provider. */
export const listings: ListingsProvider = createProvider();

export * from "./types";
