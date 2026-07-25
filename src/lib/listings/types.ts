/**
 * Listing & agent domain types.
 *
 * Field names follow the RESO Data Dictionary loosely. UI code depends on these
 * provider-agnostic types; BBO owns MLS/OneKey normalization upstream.
 */

export type ListingStatus = "Active" | "Coming Soon" | "Pending" | "Sold";

export type PropertyType =
  | "Single Family"
  | "Condo"
  | "Co-op"
  | "Townhouse"
  | "Multi-Family"
  | "Land"
  | "Residential"
  | "Other";

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
  /** Original MLS English public remarks, with feed fallbacks when absent. */
  description: string;
  /** AI-generated Chinese description supplied by BBO when ready. */
  descriptionZh?: string;
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

/**
 * External review profile. The `url` always points at the live source (Zillow,
 * Google) so what a visitor clicks through to is never stale; `rating`/`count`
 * are agent-attested display values, shown alongside the live link.
 */
export interface AgentReview {
  url: string;
  /** Agent-attested star rating, e.g. "4.9". */
  rating?: string;
  /** Agent-attested review count, e.g. "32". */
  count?: string;
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
  /** Spoken languages, e.g. ["English", "中文", "粤语"]. UI falls back to EN/中文. */
  languages?: string[];
  /** Link to the agent's profile on the legacy/current site, if any. */
  profileUrl?: string;
  /** Uploaded WeChat QR image URL (agent-photos bucket) — a primary contact channel. */
  wechatQr?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    xiaohongshu?: string;
    douyin?: string;
    youtube?: string;
    website?: string;
  };
  /** External review profiles — links stay live; rating/count are agent-attested. */
  reviews?: {
    zillow?: AgentReview;
    google?: AgentReview;
  };
  /** Self-reported, verifiable track-record metrics (agent-entered; never fabricated). */
  stats?: {
    /** Years in the business, e.g. "10+". */
    years?: string;
    /** Closed transactions, e.g. "150+". */
    transactions?: string;
    /** Sales volume, e.g. "$80M+". */
    volume?: string;
    /** Areas served, e.g. "Flushing · Long Island · Manhattan". */
    areas?: string;
  };
  /** Short client testimonials the agent has permission to publish. */
  testimonials?: { quote: string; author?: string }[];
  /**
   * OneKey MLS member id (e.g. "KEY207692") — keys the MLS-verified career
   * history. Set by admin mapping or by license verification against the
   * official MLS roster (never as free text: a wrong number simply fails to
   * match, so it can't attach someone else's production).
   */
  mlsId?: string;
  /** Advisor's choice to show their MLS past sales (default true). */
  showPastDeals?: boolean;
}

/** One closed transaction from the agent's MLS career history. */
export interface CareerDeal {
  listingKey: string;
  /** ISO date, e.g. "2019-06-15". */
  closeDate?: string;
  closePrice?: number;
  propertyType?: string;
  propertySubType?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  beds?: number;
  baths?: number;
  /** Which side the agent represented: listing, buyer, or both. */
  side: "list" | "buyer" | "both";
  /** Listing brokerage — required for "Listing courtesy of …" attribution. */
  listOfficeName?: string;
  /** Locally cached primary photo (MLS media may not be hotlinked). */
  photoUrl?: string;
}

/** MLS-verified career summary + deals for one agent. */
export interface AgentCareer {
  stats: {
    total: number;
    asListAgent: number;
    asBuyerAgent: number;
    saleDeals: number;
    leaseDeals: number;
    /** Total sale volume in dollars (leases excluded). */
    saleVolume: number;
    firstCloseDate?: string;
    lastCloseDate?: string;
  };
  deals: CareerDeal[];
  /** ISO timestamp of the career sync — the required "data as of" line. */
  dataAsOf?: string;
}

/** Query / filter shape accepted by every provider. */
export interface ListingQuery {
  /** Default is Homix office listings; "all" searches the wider BBO/OneKey set. */
  scope?: "homix" | "all";
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
  /** Ask BBO for an exact total on a selectively scoped query (for example, one office). */
  exactTotal?: boolean;
  limit?: number;
  offset?: number;
}

export interface ListingResult {
  listings: Listing[];
  /** Exact total unless `totalIsEstimate` is true, when this is a lower bound. */
  total: number;
  /** BBO returns this for cursor-like next-page behavior on large searches. */
  hasMore?: boolean;
  totalIsEstimate?: boolean;
  unavailable?: boolean;
  message?: string;
}

/**
 * The single seam between the UI and the BBO listing backend.
 */
export interface ListingsProvider {
  readonly name: string;
  /** ISO timestamp of the last data sync, if the source tracks one. */
  readonly lastSyncedAt?: string | null;
  getListings(query?: ListingQuery): Promise<ListingResult>;
  getListingBySlug(slug: string): Promise<Listing | null>;
  getFeaturedListings(limit?: number): Promise<Listing[]>;
  /**
   * MLS-verified career history for an agent (by OneKey member id, e.g.
   * "KEY207692"). Returns null when unavailable (no mls_id, BBO down, or
   * unknown member) — the profile section renders nothing in that case.
   */
  getAgentCareer?(mlsId: string): Promise<AgentCareer | null>;
  /** Distinct cities for filter facets, if supported. */
  cities?(limit?: number): string[];
}
