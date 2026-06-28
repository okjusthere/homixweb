import "server-only";

import type {
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
const DEFAULT_REVALIDATE_SECONDS = 300;

const CITY_OPTIONS = [
  "Flushing",
  "New York",
  "Long Island City",
  "Bayside",
  "Forest Hills",
  "Great Neck",
  "Manhasset",
  "Roslyn",
  "Garden City",
  "Hempstead",
  "Brooklyn",
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

    const params = new URLSearchParams();
    params.set("limit", String(query.limit ?? 12));
    params.set("offset", String(query.offset ?? 0));
    params.set("sort", toBboSort(query.sort));
    if (query.city) params.set("city", query.city);
    if (query.q) params.set("q", query.q);
    if (query.status) params.set("status", query.status);
    if (query.minPrice != null) params.set("priceMin", String(query.minPrice));
    if (query.maxPrice != null) params.set("priceMax", String(query.maxPrice));
    if (query.minBeds != null) params.set("bedsMin", String(query.minBeds));
    if (query.minBaths != null) params.set("bathsMin", String(query.minBaths));
    if (query.propertyType) applyPropertyType(params, query.propertyType);

    if (query.scope !== "all") {
      params.set("listOfficeMlsId", cfg.homixOfficeMlsId);
      params.set("listOfficeKey", cfg.homixOfficeKey);
    }

    try {
      const [payload] = await Promise.all([
        this.request<BboSearchResponse>("/api/v1/listings/search", params),
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
      return null;
    }
  }

  async getFeaturedListings(limit = 3): Promise<Listing[]> {
    const result = await this.getListings({ limit, sort: "newest" });
    return result.listings;
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

  private async request<T>(path: string, params?: URLSearchParams): Promise<T> {
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
      next: { revalidate: cfg.revalidateSeconds },
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
  const state = trim(dto.stateOrProvince) || "NY";
  const postalCode = trim(dto.postalCode);
  const cityLine = [city, state, postalCode].filter(Boolean).join(" ");
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
      city,
      state,
      postalCode,
      // Skip the city eyebrow when the city is already standing in as the street.
      neighborhood: hasStreet ? city || undefined : undefined,
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

function applyPropertyType(params: URLSearchParams, type: PropertyType): void {
  if (type === "Residential") {
    params.set("propertyType", "Residential");
    return;
  }
  if (type !== "Other") {
    params.set("propertySubType", type);
  }
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
  if (value.includes("multi")) return "Multi-Family";
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
