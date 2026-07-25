import "server-only";

import type {
  AgentCareer,
  CareerDeal,
  Listing,
  ListingPhoto,
  ListingQuery,
  ListingResult,
  ListingStatus,
  ListingsProvider,
  PropertyType,
} from "./types";

const DEFAULT_BBO_API_URL = "https://onekey.kevv.ai";
const DEFAULT_HOMIX_OFFICE_MLS_ID = "KEYHRMI01";
const DEFAULT_HOMIX_OFFICE_KEY = "KEY421354028";
const DEFAULT_REVALIDATE_SECONDS = 1800;

const CITY_OPTIONS = [
  "Flushing",
  "Manhattan",
  "Astoria",
  "Long Island City",
  "Bayside",
  "Forest Hills",
  "Brooklyn",
  "Great Neck",
  "Manhasset",
  "Roslyn",
  "Garden City",
  "Hempstead",
];

interface BboListingDTO {
  listingKey?: string;
  listingId?: string;
  standardStatus?: string;
  mlsStatus?: string;
  unparsedAddress?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  countyOrParish?: string;
  postalCity?: string;
  listPrice?: number | string | null;
  propertyType?: string;
  propertySubType?: string;
  bedroomsTotal?: number | null;
  bathroomsTotalInteger?: number | null;
  bathroomsFull?: number | null;
  bathroomsHalf?: number | null;
  livingArea?: number | string | null;
  lotSizeSquareFeet?: number | string | null;
  yearBuilt?: number | null;
  daysOnMarket?: number | null;
  onMarketDate?: string;
  modificationTimestamp?: string;
  imageUrls?: string[];
  media?: { url?: string }[];
  publicRemarks?: string;
  roomsSummary?: string;
  unitTypesSummary?: string;
  architecturalStyle?: string;
  propertyCondition?: string;
  listAgentKey?: string;
  listAgentMlsId?: string;
  listAgentFullName?: string;
  listOfficeKey?: string;
  listOfficeMlsId?: string;
  listOfficeName?: string;
}

interface BboSearchResponse {
  items?: BboListingDTO[];
  results?: BboListingDTO[];
  count?: number;
  totalCount?: number;
  totalCountIsEstimate?: boolean;
  hasMore?: boolean;
  limit?: number;
  offset?: number;
}

interface BboDetailResponse {
  listing?: BboListingDTO;
  imageUrls?: string[];
}

interface BboCareerDealDTO {
  listingKey?: string;
  listingId?: string;
  closeDate?: string;
  closePrice?: string;
  listPrice?: string;
  propertyType?: string;
  propertySubType?: string;
  streetAddress?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  beds?: number | null;
  baths?: number | null;
  side?: string;
  listOfficeName?: string;
  buyerOfficeName?: string;
  photoUrl?: string;
  mlgCanUse?: string;
}

interface BboCareerResponse {
  stats?: {
    total?: number;
    asListAgent?: number;
    asBuyerAgent?: number;
    saleDeals?: number;
    leaseDeals?: number;
    saleVolume?: string;
    firstCloseDate?: string;
    lastCloseDate?: string;
  };
  deals?: BboCareerDealDTO[];
  dataAsOf?: string;
}

interface BboSyncResponse {
  syncStatus?: {
    resource?: string;
    status?: string;
    lastSyncAt?: string | null;
    lastSuccessAt?: string | null;
  }[];
}

export class BboListingsProvider implements ListingsProvider {
  readonly name = "bbo-onekey";

  private lastSyncedAtValue: string | null = null;
  private lastSyncFetchAt = 0;

  get lastSyncedAt(): string | null {
    return this.lastSyncedAtValue;
  }

  async getListings(query: ListingQuery = {}): Promise<ListingResult> {
    const cfg = bboConfig();
    if (!cfg.apiKey) {
      return unavailableResult("BBO_API_KEY is not configured.");
    }

    // Vercel's data cache charges per write and keys on the full request URL.
    // Only the clean per-scope first page — where real traffic concentrates —
    // earns a cache entry. Filtered/paginated/free-text combinations are an
    // unbounded key space minted mostly by crawlers, each a paid write with a
    // near-zero hit rate, so those bypass the platform cache and hit BBO
    // directly (our own service; an 8s-timeout fetch, not a shared quota).
    const stableQuery =
      !query.q &&
      !query.city &&
      !query.status &&
      query.minPrice == null &&
      query.maxPrice == null &&
      query.minBeds == null &&
      query.minBaths == null &&
      !query.propertyType &&
      (query.offset ?? 0) === 0 &&
      (query.sort ?? "newest") === "newest";

    const params = new URLSearchParams();
    params.set("limit", String(query.limit ?? 12));
    params.set("offset", String(query.offset ?? 0));
    params.set("sort", toBboSort(query.sort));
    if (query.city) params.set("city", toBboLocation(query.city));
    if (query.q) params.set("q", query.q);
    if (query.status) params.set("status", query.status);
    if (query.minPrice != null) params.set("priceMin", String(query.minPrice));
    if (query.maxPrice != null) params.set("priceMax", String(query.maxPrice));
    if (query.minBeds != null) params.set("bedsMin", String(query.minBeds));
    if (query.minBaths != null) params.set("bathsMin", String(query.minBaths));
    if (query.propertyType) applyPropertyType(params, query.propertyType);
    if (query.exactTotal) params.set("exactTotal", "1");

    if (query.scope !== "all") {
      params.set("listOfficeMlsId", cfg.homixOfficeMlsId);
      params.set("listOfficeKey", cfg.homixOfficeKey);
    }

    try {
      const [payload] = await Promise.all([
        this.request<BboSearchResponse>(
          "/api/v1/listings/search",
          params,
          stableQuery ? undefined : null,
        ),
        this.refreshSyncStatus(),
      ]);
      const items = payload.items ?? payload.results ?? [];
      return {
        listings: items.map(toListing).filter(Boolean) as Listing[],
        total: payload.totalCount ?? payload.count ?? items.length,
        hasMore: payload.hasMore ?? false,
        totalIsEstimate: payload.totalCountIsEstimate ?? false,
      };
    } catch (error) {
      logBboFailure("search", error);
      return unavailableResult("Listings are temporarily unavailable.");
    }
  }

  async getListingBySlug(slug: string): Promise<Listing | null> {
    const key = listingKeyFromSlug(slug);
    const cfg = bboConfig();
    if (!cfg.apiKey || !key) return null;

    try {
      const payload = await this.request<BboDetailResponse>(
        `/api/v1/listings/by-key/${encodeURIComponent(key)}`,
      );
      const dto = payload.listing;
      if (!dto) return null;
      return toListing({ ...dto, imageUrls: dto.imageUrls ?? payload.imageUrls });
    } catch (error) {
      logBboFailure("detail", error);
      // Only a genuine "listing not found" becomes null (→ 404). A transient
      // upstream failure re-throws to the error boundary so crawlers don't see
      // valid listing URLs answered with hard 404s during an outage.
      if (error instanceof Error && /failed with 404/.test(error.message)) return null;
      throw error;
    }
  }

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    const result = await this.getListings({ limit, sort: "newest" });
    return result.listings;
  }

  async getAgentCareer(mlsId: string): Promise<AgentCareer | null> {
    const cfg = bboConfig();
    const id = mlsId.trim();
    if (!cfg.apiKey || !id) return null;

    try {
      // Career data changes when BBO's monthly sync (or a roster change) runs —
      // a 24h cache is still generous and keeps ~50 per-agent URLs from
      // rewriting the data cache every few minutes under crawler traffic.
      const payload = await this.request<BboCareerResponse>(
        `/api/v1/agents/${encodeURIComponent(id)}/career`,
        undefined,
        86400,
      );
      const stats = payload.stats ?? {};
      const deals = (payload.deals ?? [])
        .map(toCareerDeal)
        .filter(Boolean) as CareerDeal[];
      return {
        stats: {
          total: stats.total ?? deals.length,
          asListAgent: stats.asListAgent ?? 0,
          asBuyerAgent: stats.asBuyerAgent ?? 0,
          saleDeals: stats.saleDeals ?? 0,
          leaseDeals: stats.leaseDeals ?? 0,
          saleVolume: toNumber(stats.saleVolume),
          firstCloseDate: trim(stats.firstCloseDate) || undefined,
          lastCloseDate: trim(stats.lastCloseDate) || undefined,
        },
        deals,
        dataAsOf: trim(payload.dataAsOf) || undefined,
      };
    } catch (error) {
      // Missing mls_id mapping or a BBO outage both degrade to "no section",
      // never to a broken profile page.
      logBboFailure("career", error);
      return null;
    }
  }

  cities(limit = 24): string[] {
    return CITY_OPTIONS.slice(0, limit);
  }

  private async refreshSyncStatus(): Promise<void> {
    const now = Date.now();
    if (now - this.lastSyncFetchAt < 5 * 60 * 1000) return;
    this.lastSyncFetchAt = now;
    try {
      const payload = await this.request<BboSyncResponse>("/api/v1/sync/status");
      const property = payload.syncStatus?.find((s) => s.resource === "Property");
      this.lastSyncedAtValue = property?.lastSuccessAt ?? property?.lastSyncAt ?? null;
    } catch (error) {
      logBboFailure("sync-status", error);
    }
  }

  // revalidateSeconds: undefined → provider default TTL; a number → that TTL;
  // null → cache: "no-store" (no data-cache entry, no ISR write).
  private async request<T>(
    path: string,
    params?: URLSearchParams,
    revalidateSeconds?: number | null,
  ): Promise<T> {
    const cfg = bboConfig();
    if (!cfg.apiKey) throw new Error("BBO_API_KEY is not configured.");
    const url = new URL(path, cfg.apiUrl);
    if (params) {
      for (const [key, value] of params) url.searchParams.set(key, value);
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        Accept: "application/json",
      },
      ...(revalidateSeconds === null
        ? { cache: "no-store" as const }
        : { next: { revalidate: revalidateSeconds ?? cfg.revalidateSeconds } }),
      // A hung upstream should degrade to the "listings unavailable" notice,
      // not stall the page render until the platform function timeout.
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      throw new Error(`BBO request failed with ${response.status}`);
    }
    return (await response.json()) as T;
  }
}

function bboConfig() {
  return {
    apiUrl: (process.env.BBO_API_URL || DEFAULT_BBO_API_URL).replace(/\/$/, ""),
    apiKey: process.env.BBO_API_KEY || "",
    homixOfficeMlsId:
      process.env.BBO_HOMIX_LIST_OFFICE_MLS_ID || DEFAULT_HOMIX_OFFICE_MLS_ID,
    homixOfficeKey:
      process.env.BBO_HOMIX_LIST_OFFICE_KEY || DEFAULT_HOMIX_OFFICE_KEY,
    revalidateSeconds: Number(
      process.env.BBO_REVALIDATE_SECONDS || DEFAULT_REVALIDATE_SECONDS,
    ),
  };
}

function unavailableResult(message: string): ListingResult {
  return {
    listings: [],
    total: 0,
    hasMore: false,
    totalIsEstimate: false,
    unavailable: true,
    message,
  };
}

function toListing(dto: BboListingDTO): Listing | null {
  const listingKey = trim(dto.listingKey);
  if (!listingKey) return null;

  const unparsed = trim(dto.unparsedAddress);
  const city = trim(dto.city);
  const postalCity = trim(dto.postalCity);
  const locality =
    postalCity === "New York (Manhattan)" ? "Manhattan" : postalCity || city;
  const state = trim(dto.stateOrProvince) || "NY";
  const postalCode = trim(dto.postalCode);
  const cityLine = [locality, state, postalCode].filter(Boolean).join(" ");
  // Never surface the raw listing key as an address — it means nothing to a
  // buyer. Prefer the street line; otherwise fall back to city/state/zip, then
  // a neutral label. (When the feed omits the street, BBO is the real fix.)
  const hasStreet = unparsed.length > 0;
  const street = hasStreet ? unparsed : cityLine || "Address available on request";
  const full = hasStreet ? [unparsed, cityLine].filter(Boolean).join(", ") : street;
  const officeName = trim(dto.listOfficeName);
  const images = dto.imageUrls?.length
    ? dto.imageUrls
    : dto.media?.map((m) => m.url).filter(isNonEmptyString) ?? [];
  const photos: ListingPhoto[] = images.map((url) => ({
    url,
    alt: full,
  }));

  return {
    id: listingKey,
    mlsNumber: trim(dto.listingId) || listingKey,
    slug: listingSlug(street, listingKey),
    status: normalizeStatus(dto.standardStatus || dto.mlsStatus),
    propertyType: normalizePropertyType(dto.propertyType, dto.propertySubType),
    listPrice: toNumber(dto.listPrice),
    address: {
      full,
      street,
      city: locality,
      state,
      postalCode,
      // Skip the city eyebrow when the city is already standing in as the street.
      neighborhood: hasStreet ? locality || undefined : undefined,
    },
    beds: toInteger(dto.bedroomsTotal),
    baths: toInteger(dto.bathroomsFull ?? dto.bathroomsTotalInteger),
    halfBaths: toInteger(dto.bathroomsHalf),
    sqft: toNumber(dto.livingArea),
    lotSqft: positiveNumber(dto.lotSizeSquareFeet),
    yearBuilt: positiveInteger(dto.yearBuilt),
    description:
      trim(dto.publicRemarks) ||
      trim(dto.roomsSummary) ||
      trim(dto.unitTypesSummary) ||
      "",
    features: [dto.propertySubType, dto.architecturalStyle, dto.propertyCondition]
      .map(trim)
      .filter(Boolean),
    photos,
    listingAgentId: trim(dto.listAgentKey) || trim(dto.listAgentMlsId),
    listAgentName: trim(dto.listAgentFullName) || undefined,
    listDate: trim(dto.onMarketDate) || trim(dto.modificationTimestamp),
    daysOnMarket: positiveInteger(dto.daysOnMarket),
    county: trim(dto.countyOrParish) || undefined,
    attribution: officeName ? `Listing courtesy of ${officeName}` : undefined,
  };
}

function toCareerDeal(dto: BboCareerDealDTO): CareerDeal | null {
  const listingKey = trim(dto.listingKey);
  if (!listingKey) return null;
  const side =
    dto.side === "buyer" || dto.side === "both" ? dto.side : ("list" as const);
  return {
    listingKey,
    closeDate: trim(dto.closeDate) || undefined,
    closePrice: positiveNumber(dto.closePrice),
    propertyType: trim(dto.propertyType) || undefined,
    propertySubType: trim(dto.propertySubType) || undefined,
    streetAddress: trim(dto.streetAddress) || undefined,
    city: trim(dto.city) || undefined,
    state: trim(dto.stateOrProvince) || undefined,
    postalCode: trim(dto.postalCode) || undefined,
    beds: dto.beds ?? undefined,
    baths: dto.baths ?? undefined,
    side,
    listOfficeName: trim(dto.listOfficeName) || undefined,
    photoUrl: trim(dto.photoUrl) || undefined,
  };
}

function applyPropertyType(params: URLSearchParams, type: PropertyType): void {
  switch (type) {
    case "Single Family":
      params.set("propertySubType", "Single Family Residence");
      return;
    case "Condo":
      params.set("propertySubType", "Condominium");
      return;
    case "Co-op":
      params.set("propertySubType", "Stock Cooperative");
      return;
    case "Townhouse":
      params.set("propertySubType", "Townhouse");
      return;
    case "Multi-Family":
      params.set("propertyType", "Residential Income,Residential");
      params.set("propertySubType", "Multi Family,Duplex,Triplex,Quadruplex");
      return;
    case "Land":
      params.set("propertyType", "Land");
      return;
    case "Residential":
      params.set("propertyType", "Residential");
      return;
    default:
      return;
  }
}

function toBboLocation(location: string): string {
  return location === "Manhattan" ? "New York (Manhattan)" : location;
}

function normalizeStatus(raw?: string): ListingStatus {
  const value = trim(raw).toLowerCase();
  if (value === "coming soon") return "Coming Soon";
  if (value === "pending") return "Pending";
  if (value === "closed" || value === "sold") return "Sold";
  return "Active";
}

function normalizePropertyType(type?: string, subType?: string): PropertyType {
  const value = `${subType ?? ""} ${type ?? ""}`.toLowerCase();
  if (value.includes("condo")) return "Condo";
  if (value.includes("co-op") || value.includes("coop")) return "Co-op";
  if (value.includes("town")) return "Townhouse";
  if (
    value.includes("multi") ||
    value.includes("duplex") ||
    value.includes("triplex") ||
    value.includes("quadruplex") ||
    value.includes("residential income")
  ) {
    return "Multi-Family";
  }
  if (value.includes("land")) return "Land";
  if (value.includes("single")) return "Single Family";
  if (value.includes("residential")) return "Residential";
  return "Other";
}

function toBboSort(sort: ListingQuery["sort"]): string {
  switch (sort) {
    case "price-asc":
      return "price_asc";
    case "price-desc":
      return "price_desc";
    case "beds-desc":
      return "beds_desc";
    default:
      return "newest";
  }
}

function listingSlug(street: string, listingKey: string): string {
  const stem =
    trim(street)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 72) || "listing";
  return `${stem}-${listingKey}`;
}

function listingKeyFromSlug(slug: string): string {
  const trimmed = trim(slug);
  if (/^KEY[A-Za-z0-9]+$/.test(trimmed)) return trimmed;
  return trimmed.match(/-(KEY[A-Za-z0-9]+)$/)?.[1] ?? "";
}

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function positiveNumber(value: unknown): number | undefined {
  const parsed = toNumber(value);
  return parsed > 0 ? parsed : undefined;
}

function toInteger(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.round(value));
  return Math.max(0, Math.round(toNumber(value)));
}

function positiveInteger(value: unknown): number | undefined {
  const parsed = toInteger(value);
  return parsed > 0 ? parsed : undefined;
}

function logBboFailure(operation: string, error: unknown): void {
  const message = error instanceof Error ? error.message : "Unknown BBO error";
  console.warn(`BBO listings ${operation} failed: ${message}`);
}
