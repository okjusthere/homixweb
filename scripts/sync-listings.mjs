/**
 * Replicate OneKey listings from MLS Grid into a local cache the site searches.
 *
 * MLS Grid is a REPLICATION API — its Property resource can only be filtered by
 * MlgCanView, ModificationTimestamp, OriginatingSystemName, StandardStatus,
 * ListingId, PropertyType, ListOfficeMlsId. So we pull the feed here and do all
 * rich search (city, price, beds, …) in-memory against the cache.
 *
 *   node scripts/sync-listings.mjs            # default cap
 *   MAX_RECORDS=500 node scripts/sync-listings.mjs
 *
 * Writes src/data/listings-cache.json (gitignored — real IDX data). Media URLs
 * from MLS Grid are time-limited signed links, so re-sync regularly (a Vercel
 * Cron / build step in production); for owned-image durability, proxy/store them.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// --- minimal .env.local loader ---------------------------------------------
function loadEnv() {
  try {
    const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
    }
  } catch {
    /* no .env.local — rely on real env */
  }
}
loadEnv();

const BASE = (process.env.ONEKEY_API_BASE ?? "https://api.mlsgrid.com/v2").replace(/\/$/, "");
const TOKEN = process.env.ONEKEY_TOKEN;
const ORIGINATING = process.env.ONEKEY_ORIGINATING_SYSTEM ?? "onekey2";
const MAX_RECORDS = Number(process.env.MAX_RECORDS ?? 2500);
const PAGE_SIZE = 1000;

if (!TOKEN) {
  // Graceful skip so builds without creds still succeed (serve existing cache / mock).
  console.warn("ONEKEY_TOKEN not set — skipping listings sync.");
  process.exit(0);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function kebab(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function mapStatus(s) {
  const map = {
    Active: "Active",
    "Active Under Contract": "Pending",
    Pending: "Pending",
    "Coming Soon": "Coming Soon",
    Closed: "Sold",
  };
  return map[s] || "Active";
}

function mapType(sub, type) {
  const v = `${sub || ""} ${type || ""}`.toLowerCase();
  if (v.includes("condo")) return "Condo";
  if (v.includes("cooperat") || v.includes("co-op") || v.includes("stock")) return "Condo";
  if (v.includes("town")) return "Townhouse";
  if (v.includes("multi") || v.includes("2 family") || v.includes("3 family")) return "Multi-Family";
  if (v.includes("land") || v.includes("lot") || v.includes("acreage")) return "Land";
  return "Single Family";
}

function normalize(p) {
  const street =
    [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(" ").trim() ||
    (p.UnparsedAddress ? p.UnparsedAddress.split(",")[0] : "");
  const city = p.City || p.PostalCity || "";
  const full =
    p.UnparsedAddress ||
    `${street}, ${city}, ${p.StateOrProvince || "NY"} ${p.PostalCode || ""}`.trim();
  const id = p.ListingKey || p.ListingId || "";
  const photos = (p.Media || [])
    .filter((m) => m.MediaURL && (m.Order ?? 0) >= 0)
    .sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .slice(0, 12)
    .map((m) => ({ url: m.MediaURL, alt: m.ShortDescription || full }));

  return {
    id,
    mlsNumber: p.ListingId || id,
    slug: `${kebab(street || city)}-${p.ListingId || id}`,
    status: mapStatus(p.StandardStatus),
    propertyType: mapType(p.PropertySubType, p.PropertyType),
    listPrice: p.ListPrice ?? 0,
    address: {
      full,
      street,
      city,
      state: p.StateOrProvince || "NY",
      postalCode: p.PostalCode || "",
      neighborhood: p.KEY_Hamlet || city || undefined,
    },
    coords: undefined,
    beds: p.BedroomsTotal ?? 0,
    baths: p.BathroomsFull ?? 0,
    halfBaths: p.BathroomsHalf || undefined,
    sqft: p.LivingArea ?? 0,
    lotSqft: p.LotSizeSquareFeet || undefined,
    yearBuilt: p.YearBuilt || undefined,
    description: p.PublicRemarks || "",
    features: [],
    photos,
    listingAgentId: p.ListAgentMlsId || "",
    listAgentName: p.ListAgentFullName || "",
    listDate: p.OnMarketDate || p.ListingContractDate || "",
    daysOnMarket: p.DaysOnMarket ?? undefined,
    county: p.CountyOrParish || undefined,
    schoolDistrict: p.HighSchoolDistrict || undefined,
    // IDX attribution is mandatory on every view.
    attribution: p.ListOfficeName ? `Listing courtesy of ${p.ListOfficeName}` : undefined,
  };
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}`, "Accept-Encoding": "gzip" },
  });
  if (!res.ok) {
    throw new Error(`MLS Grid ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  // PropertyType eq 'Residential' = homes for SALE (excludes leases/rentals and
  // commercial). One of MLS Grid's allowed replication filter fields.
  const propertyType = process.env.SYNC_PROPERTY_TYPE ?? "Residential";
  const filter = `OriginatingSystemName eq '${ORIGINATING}' and MlgCanView eq true and StandardStatus eq 'Active' and PropertyType eq '${propertyType}'`;
  const first = new URL(`${BASE}/Property`);
  first.searchParams.set("$filter", filter);
  first.searchParams.set("$top", String(PAGE_SIZE));
  first.searchParams.set("$expand", "Media");

  const listings = [];
  let next = first.toString();
  let page = 0;

  console.log(`Syncing OneKey (${ORIGINATING}) active listings, cap ${MAX_RECORDS}…`);
  while (next && listings.length < MAX_RECORDS) {
    page += 1;
    const json = await fetchPage(next);
    const batch = (json.value || []).map(normalize).filter((l) => l.photos.length > 0);
    listings.push(...batch);
    console.log(`  page ${page}: +${batch.length} (total ${listings.length})`);
    next = json["@odata.nextLink"] || null;
    if (next) await sleep(700); // stay under MLS Grid's 2 req/s
  }

  const capped = listings.slice(0, MAX_RECORDS);
  const out = {
    syncedAt: new Date().toISOString(),
    originatingSystem: ORIGINATING,
    count: capped.length,
    listings: capped,
  };
  const dir = join(ROOT, "src", "data");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "listings-cache.json"), JSON.stringify(out));
  console.log(`✓ Wrote ${capped.length} listings to src/data/listings-cache.json`);
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
