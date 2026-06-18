import type { Listing, ListingQuery } from "./types";

/** Shared in-memory filter + sort used by the mock and cached providers. */

export function matches(listing: Listing, q: ListingQuery): boolean {
  if (q.city && listing.address.city.toLowerCase() !== q.city.toLowerCase()) {
    return false;
  }
  if (q.status && listing.status !== q.status) return false;
  if (q.propertyType && listing.propertyType !== q.propertyType) return false;
  if (q.minPrice != null && listing.listPrice < q.minPrice) return false;
  if (q.maxPrice != null && listing.listPrice > q.maxPrice) return false;
  if (q.minBeds != null && listing.beds < q.minBeds) return false;
  if (q.minBaths != null && listing.baths < q.minBaths) return false;
  if (q.q) {
    const haystack = [
      listing.address.full,
      listing.address.neighborhood ?? "",
      listing.address.city,
      listing.description,
      listing.propertyType,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q.q.toLowerCase())) return false;
  }
  return true;
}

export function sortListings(
  listings: Listing[],
  by: ListingQuery["sort"],
): Listing[] {
  const sorted = [...listings];
  switch (by) {
    case "price-asc":
      return sorted.sort((a, b) => a.listPrice - b.listPrice);
    case "price-desc":
      return sorted.sort((a, b) => b.listPrice - a.listPrice);
    case "beds-desc":
      return sorted.sort((a, b) => b.beds - a.beds);
    case "newest":
    default:
      return sorted.sort(
        (a, b) => Date.parse(b.listDate || "0") - Date.parse(a.listDate || "0"),
      );
  }
}

/** Distinct cities present in a dataset, sorted by listing count desc. */
export function cityFacets(listings: Listing[], limit = 24): string[] {
  const counts = new Map<string, number>();
  for (const l of listings) {
    const c = l.address.city;
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([c]) => c);
}
