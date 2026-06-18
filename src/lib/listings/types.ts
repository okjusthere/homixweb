/**
 * Listing & agent domain types.
 *
 * Field names follow the RESO Data Dictionary loosely so that swapping the mock
 * provider for a real MLS/IDX feed (SimplyRETS, Spark API, RESO Web API) is a
 * mapping job, not a redesign. Keep this file provider-agnostic.
 */

export type ListingStatus = "Active" | "Coming Soon" | "Pending" | "Sold";

export type PropertyType =
  | "Single Family"
  | "Condo"
  | "Townhouse"
  | "Multi-Family"
  | "Land";

export interface ListingAddress {
  /** Pretty single-line address, e.g. "1204 W 9th St, Austin, TX 78703". */
  full: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  /** Marketing-friendly neighborhood / area name. */
  neighborhood?: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface ListingPhoto {
  url: string;
  /** Alt text for accessibility; falls back to the address when absent. */
  alt?: string;
}

export interface Listing {
  /** Stable internal key (RESO: ListingKey). */
  id: string;
  /** Human MLS number (RESO: ListingId). */
  mlsNumber: string;
  /** URL slug used for /listings/[slug]. */
  slug: string;
  status: ListingStatus;
  propertyType: PropertyType;
  listPrice: number;
  address: ListingAddress;
  coords?: GeoPoint;
  beds: number;
  /** Full bathrooms. */
  baths: number;
  /** Half bathrooms. */
  halfBaths?: number;
  /** Interior living area in square feet. */
  sqft: number;
  /** Lot size in square feet (omit for condos). */
  lotSqft?: number;
  yearBuilt?: number;
  description: string;
  features: string[];
  photos: ListingPhoto[];
  /** Agent id (MLS) who holds the listing. */
  listingAgentId: string;
  /** Listing agent display name (from the feed). */
  listAgentName?: string;
  /** ISO date the listing went live. */
  listDate: string;
  daysOnMarket?: number;
  county?: string;
  schoolDistrict?: string;
  /**
   * IDX attribution string. MLS rules require displaying the listing brokerage
   * ("Listing courtesy of …") for listings sourced from the shared feed.
   */
  attribution?: string;
  isFeatured?: boolean;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  /** State real estate license number — required disclosure in many states. */
  licenseNumber?: string;
  bio: string;
  specialties: string[];
  /** Link to the agent's profile on the legacy/current site, if any. */
  profileUrl?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    xiaohongshu?: string;
    douyin?: string;
    website?: string;
  };
}

/** Query / filter shape accepted by every provider. */
export interface ListingQuery {
  city?: string;
  status?: ListingStatus;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  /** Free-text search across address + neighborhood + description. */
  q?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "beds-desc";
  limit?: number;
  offset?: number;
}

export interface ListingResult {
  listings: Listing[];
  /** Total matches before limit/offset — for pagination. */
  total: number;
}

/**
 * The single seam between the UI and any data source. The mock provider and a
 * future SimplyRETS / RESO Web API provider both implement this.
 */
export interface ListingsProvider {
  readonly name: string;
  /** ISO timestamp of the last data sync, if the source tracks one. */
  readonly lastSyncedAt?: string | null;
  getListings(query?: ListingQuery): Promise<ListingResult>;
  getListingBySlug(slug: string): Promise<Listing | null>;
  getFeaturedListings(limit?: number): Promise<Listing[]>;
  getAgents(): Promise<Agent[]>;
  getAgentBySlug(slug: string): Promise<Agent | null>;
  /** Distinct cities for filter facets, if supported. */
  cities?(limit?: number): string[];
}
