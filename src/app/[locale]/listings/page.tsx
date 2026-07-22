import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { ListingsPagination } from "@/components/listings/ListingsPagination";
import { MlsDisclaimer } from "@/components/listings/MlsDisclaimer";
import { listings, type ListingQuery, type PropertyType } from "@/lib/listings";
import { formatNumber } from "@/lib/format";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Only the clean listing index is indexable. Filter/pagination combinations
// (?page, ?city, ?type, ?minPrice, ?q, ?sort…) are unbounded duplicate/thin
// URLs: they get noindex,follow (same treatment as MLS detail pages) so
// crawlers keep following into listings without indexing — or endlessly
// re-crawling — the facet space.
const FILTER_PARAM_KEYS = [
  "page",
  "scope",
  "city",
  "type",
  "minPrice",
  "maxPrice",
  "beds",
  "q",
  "sort",
] as const;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const sp = await searchParams;
  const filtered = FILTER_PARAM_KEYS.some((k) => one(sp[k]));
  return {
    ...pageMetadata({
      path: "/listings",
      locale,
      title: {
        en: "New York Homes for Sale — Search NYC & Long Island Listings",
        zh: "纽约房源搜索——在售住宅与公寓",
      },
      description: {
        en: "Search homes for sale across New York — Queens, Manhattan, Brooklyn, and Long Island — from the OneKey MLS. Filter by price, location, and bedrooms.",
        zh: "搜索纽约在售房源：皇后区、曼哈顿、布鲁克林与长岛的住宅与公寓，可按价格、地区、卧室数筛选，Homix 中英双语持牌经纪人全程服务。",
      },
      noAlternates: filtered,
    }),
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

const PER_PAGE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export default async function ListingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const zh = locale === "zh";
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
    // BBO permits exact counts for this office-scoped search. Wider OneKey
    // searches retain lower-bound pagination to protect the shared API.
    exactTotal: scope === "homix",
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  };

  const result = await listings.getListings(query);
  const { listings: results, total, hasMore, totalIsEstimate, unavailable } = result;
  // An estimated total is only a lower bound. Keep the pager navigable via
  // hasMore, but never present a guessed total page count as fact.
  const pages = totalIsEstimate ? page : Math.max(1, Math.ceil(total / PER_PAGE));
  const totalLabel = totalIsEstimate ? `${formatNumber(total)}+` : formatNumber(total);

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
          <Eyebrow>{zh ? "房源搜索" : "Listings"}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {zh ? "在售房源" : "Homes for sale"}
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
        <ListingFilters
          cities={cities}
          locale={locale}
          labels={{
            source: zh ? "房源范围" : "Listing source",
            city: zh ? "地区" : "City",
            propertyType: zh ? "房屋类型" : "Property type",
            minPrice: zh ? "最低价格" : "Minimum price",
            maxPrice: zh ? "最高价格" : "Maximum price",
            bedrooms: zh ? "卧室数" : "Bedrooms",
            sort: zh ? "排序" : "Sort",
            scopeHomix: zh ? "Homix 房源" : "Homix listings",
            scopeAll: zh ? "全部 OneKey 房源" : "All OneKey listings",
            allLocations: zh ? "全部地区" : "All locations",
            anyType: zh ? "全部类型" : "Any type",
            noMin: zh ? "不限最低价" : "No min",
            noMax: zh ? "不限最高价" : "No max",
            upTo: zh ? "最高" : "Up to",
            anyBeds: zh ? "不限卧室" : "Any beds",
            bedsSuffix: zh ? " 居+" : "+ beds",
            sortNewest: zh ? "最新上架" : "Newest",
            sortPriceDesc: zh ? "价格从高到低" : "Price (high to low)",
            sortPriceAsc: zh ? "价格从低到高" : "Price (low to high)",
            sortBeds: zh ? "卧室最多" : "Most bedrooms",
          }}
        />
      </div>

      {!unavailable && (
        <p className="mt-6 text-sm text-muted">
          {zh ? (
            <>
              {totalLabel} 套房源
              {query.city ? `（${query.city}）` : ""} · 第 {page}
              {totalIsEstimate ? "" : ` / ${pages || 1}`} 页
              {scope === "homix" ? " · Homix Realty Inc." : " · 全部 OneKey"}
            </>
          ) : (
            <>
              {totalLabel} {total === 1 && !totalIsEstimate ? "home" : "homes"}
              {query.city ? ` in ${query.city}` : ""} · page {page}
              {totalIsEstimate ? "" : ` of ${pages || 1}`}
              {scope === "homix" ? " · Homix Realty Inc." : " · All OneKey"}
            </>
          )}
        </p>
      )}

      {unavailable ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-ink">
            {zh ? "房源数据暂时不可用。" : "Listings are temporarily unavailable."}
          </p>
          <p className="mt-2 text-muted">
            {zh
              ? "MLS 数据恢复期间，请直接联系 Homix 了解当前在售房源。"
              : "Please contact Homix for current inventory while the MLS feed is restored."}
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-ink">
            {zh ? "没有符合筛选条件的房源。" : "No homes match those filters."}
          </p>
          <p className="mt-2 text-muted">
            {zh ? "试试放宽价格区间或地区。" : "Try widening your price range or location."}
          </p>
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
