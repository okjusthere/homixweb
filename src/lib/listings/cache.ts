export const HOMIX_LISTINGS_CACHE_TAG = "homix-listings";

export function listingCacheTag(listingKey: string): string {
  return `listing:${listingKey}`;
}
