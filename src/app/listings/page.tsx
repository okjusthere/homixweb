import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { ListingsPagination } from "@/components/listings/ListingsPagination";
import { MlsDisclaimer } from "@/components/listings/MlsDisclaimer";
import { listings, type ListingQuery, type PropertyType } from "@/lib/listings";
import { formatNumber } from "@/lib/format";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Search homes for sale across New York — Queens, Long Island, Manhattan and beyond — from the OneKey MLS, presented by Homix.",
};

const PER_PAGE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const { t } = await getT();
  const page = Math.max(1, parseInt(one(sp.page), 10) || 1);
  const scope = one(sp.scope) === "all" ? "all" : "homix";

  const query: ListingQuery = {
    scope,
    city: one(sp.city) || undefined,
    propertyType: (one(sp.type) as PropertyType) || undefined,
    minPrice: one(sp.minPrice) ? Number(one(sp.minPrice)) : undefined,
    maxPrice: one(sp.maxPrice) ? Number(one(sp.maxPrice)) : undefined,
    minBeds: one(sp.beds) ? Number(one(sp.beds)) : undefined,
    q: one(sp.q) || undefined,
    sort: (one(sp.sort) as ListingQuery["sort"]) || "newest",
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  };

  const result = await listings.getListings(query);
  const { listings: results, total, hasMore, totalIsEstimate, unavailable } = result;
  const pages = hasMore && totalIsEstimate ? page + 1 : Math.max(1, Math.ceil(total / PER_PAGE));

  const cities = listings.cities ? listings.cities(30) : [];

  // Preserve active filters in pagination links.
  const baseParams: Record<string, string> = {};
  for (const k of ["scope", "city", "type", "minPrice", "maxPrice", "beds", "q", "sort"]) {
    const v = one(sp[k]);
    if (v) baseParams[k] = v;
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Listings</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            Homes for sale
          </h1>
          <Link
            href="/calculator"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-bronze"
          >
            {t.common.calculator}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Sell-side CTA */}
        <Link
          href="/sell"
          className="group block w-full shrink-0 rounded-sm border border-line bg-surface px-6 py-4 transition-colors hover:border-bronze lg:max-w-md"
        >
          <Eyebrow>{t.sell.listingsCta.kicker}</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed text-ink/85">
            {t.sell.listingsCta.line}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-bronze">
            {t.sell.listingsCta.button}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
      </div>

      <div className="mt-10 border-y border-line py-5">
        <ListingFilters cities={cities} />
      </div>

      <p className="mt-6 text-sm text-muted">
        {formatNumber(total)} {total === 1 ? "home" : "homes"}
        {query.city ? ` in ${query.city}` : ""} · page {page} of {pages || 1}
        {scope === "homix" ? " · Homix Realty Inc." : " · All OneKey"}
      </p>

      {unavailable ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-ink">Listings are temporarily unavailable.</p>
          <p className="mt-2 text-muted">
            Please contact Homix for current inventory while the MLS feed is restored.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-ink">No homes match those filters.</p>
          <p className="mt-2 text-muted">Try widening your price range or location.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} priority={i < 3} />
          ))}
        </div>
      )}

      <ListingsPagination
        page={page}
        pages={pages}
        hasMore={hasMore}
        baseParams={baseParams}
      />

      <div className="mt-16 border-t border-line pt-8">
        <MlsDisclaimer syncedAt={listings.lastSyncedAt} />
      </div>
    </Container>
  );
}
