export const HOMIX_LISTINGS_CACHE_TAG = "homix-listings";
export const AGENT_CAREER_CACHE_TAG = "agent-career";

export function listingCacheTag(listingKey: string): string {
  return `listing:${listingKey}`;
}
