import { featuredDevelopments } from "@/data/featured-developments";
import { gatedCommunities } from "@/data/gated-communities";
import { getDevelopmentCover } from "@/data/new-development-media";
import { guides } from "@/content/guides";
import { journalPosts } from "@/content/journal/posts";
import { topics } from "@/content/journal/topics";
import { listings } from "@/lib/listings";
import type { Listing } from "@/lib/listings/types";
import type { Locale } from "@/lib/locale";
import { neighborhoods } from "@/lib/site";
import { getPublishedNews, listPublishedNews } from "@/lib/news/repository";
import { newsCoverPath } from "@/lib/news/cover";
import { newsText } from "@/lib/news/types";
import { absUrl } from "@/lib/seo";

export const SHARE_CONTENT_KINDS = [
  "listing",
  "neighborhood",
  "community",
  "development",
  "guide",
  "news",
] as const;

export type ShareContentKind = (typeof SHARE_CONTENT_KINDS)[number];

export type ShareCatalogItem = {
  kind: ShareContentKind;
  key: string;
  path: string;
  title: string;
  subtitle: string;
  image: string | null;
  eyebrow?: string | null;
};

export type ShareCatalogResult = {
  items: ShareCatalogItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  totalIsEstimate: boolean;
  overview: boolean;
  unavailable?: boolean;
  counts: Partial<Record<ShareContentKind | "all", number>>;
};

function shortText(value: string, max = 160): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

function listingItem(listing: Listing): ShareCatalogItem {
  const details = [
    listing.address.city,
    listing.propertyType,
    listing.beds ? `${listing.beds} bd` : null,
    listing.baths ? `${listing.baths} ba` : null,
  ].filter(Boolean);
  return {
    kind: "listing",
    key: listing.id,
    path: `/listings/${listing.slug}`,
    title: listing.address.full,
    subtitle: details.join(" · "),
    image: listing.photos[0]?.url ?? null,
    eyebrow: listing.status,
  };
}

function staticCatalog(locale: Locale): ShareCatalogItem[] {
  const zh = locale === "zh";
  const newestPosts = journalPosts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const neighborhoodItems: ShareCatalogItem[] = neighborhoods.map((item) => ({
    kind: "neighborhood",
    key: item.slug,
    path: `/neighborhoods/${item.slug}`,
    title: item.name,
    subtitle: shortText(
      zh ? item.guide?.zh ?? item.blurb : item.guide?.en ?? item.blurb,
    ),
    image: item.image,
    eyebrow: zh ? "社区指南" : "Neighborhood",
  }));

  const communityItems: ShareCatalogItem[] = gatedCommunities.map((item) => ({
    kind: "community",
    key: item.slug,
    path: `/communities/${item.slug}`,
    title: item.name,
    subtitle: [item.town, item.subRegion, item.priceRange].filter(Boolean).join(" · "),
    image: item.image ?? null,
    eyebrow: zh ? "封闭式社区" : "Private community",
  }));

  const developmentItems: ShareCatalogItem[] = featuredDevelopments.map((item) => ({
    kind: "development",
    key: item.slug,
    path: `/NewDevelopment/${item.slug}`,
    title: item.name,
    subtitle: [item.area, item.borough, item.address].filter(Boolean).join(" · "),
    image: getDevelopmentCover(item.slug)?.src ?? null,
    eyebrow: zh ? "纽约新盘" : "New development",
  }));

  const guideItems: ShareCatalogItem[] = [
    ...guides.map((item) => ({
      kind: "guide" as const,
      key: `guide:${item.slug}`,
      path: `/guides/${item.slug}`,
      title: item.title[locale],
      subtitle: shortText(item.description[locale]),
      image: item.cover ?? null,
      eyebrow: zh ? "核心指南" : "Core guide",
    })),
    ...topics.map((item) => ({
      kind: "guide" as const,
      key: `topic:${item.slug}`,
      path: `/guides/topics/${item.slug}`,
      title: item.label[locale],
      subtitle: shortText(item.blurb[locale]),
      image:
        newestPosts.find(
          (post) =>
            post.topic === item.slug ||
            (post.secondaryTags ?? []).includes(item.slug),
        )?.cover ??
        (item.pillarSlug
          ? guides.find((guide) => guide.slug === item.pillarSlug)?.cover
          : null) ??
        null,
      eyebrow: zh ? "内容主题" : "Guide topic",
    })),
    ...newestPosts.map((item) => ({
      kind: "guide" as const,
      key: `article:${item.slug}`,
      path: `/guides/articles/${item.slug}`,
      title: item.title[locale],
      subtitle: shortText(item.excerpt[locale]),
      image: item.cover,
      eyebrow: item.category[locale],
    })),
  ];

  return [
    ...neighborhoodItems,
    ...communityItems,
    ...developmentItems,
    ...guideItems,
  ];
}

async function newsCatalog(locale: Locale): Promise<ShareCatalogItem[]> {
  const articles = await listPublishedNews(100);
  return articles.map((article) => {
    const copy = newsText(article, locale);
    return {
      kind: "news",
      key: article.slug,
      path: `/news/${article.slug}`,
      title: copy.title,
      subtitle: shortText(copy.summary),
      image: absUrl(newsCoverPath(article, locale)),
      eyebrow: locale === "zh" ? "地产新闻" : "Real estate news",
    };
  });
}

function matches(item: ShareCatalogItem, query: string): boolean {
  if (!query) return true;
  const haystack = `${item.title} ${item.subtitle} ${item.eyebrow ?? ""}`.toLocaleLowerCase();
  return haystack.includes(query);
}

export function normalizeShareContentPath(value: string): string {
  const withoutQuery = value.split(/[?#]/, 1)[0] || "/";
  const normalized = withoutQuery.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export async function findShareCatalogItem(
  path: string,
  locale: Locale,
): Promise<ShareCatalogItem | null> {
  const normalized = normalizeShareContentPath(path);
  const staticMatch = staticCatalog(locale).find((item) => item.path === normalized);
  if (staticMatch) return staticMatch;

  const newsSlug = normalized.match(/^\/news\/([^/]+)$/)?.[1];
  if (newsSlug) {
    const article = await getPublishedNews(decodeURIComponent(newsSlug));
    if (!article) return null;
    const copy = newsText(article, locale);
    return {
      kind: "news",
      key: article.slug,
      path: `/news/${article.slug}`,
      title: copy.title,
      subtitle: shortText(copy.summary),
      image: absUrl(newsCoverPath(article, locale)),
      eyebrow: locale === "zh" ? "地产新闻" : "Real estate news",
    };
  }

  const listingSlug = normalized.match(/^\/listings\/([^/]+)$/)?.[1];
  if (!listingSlug) return null;
  const listing = await listings.getListingBySlug(decodeURIComponent(listingSlug));
  return listing ? listingItem(listing) : null;
}

export async function getShareCatalog(input: {
  locale: Locale;
  kind: ShareContentKind | "all";
  listingScope?: "homix" | "all";
  query?: string;
  page?: number;
  pageSize?: number;
}): Promise<ShareCatalogResult> {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const pageSize = Math.min(48, Math.max(6, Math.floor(input.pageSize ?? 24)));
  const query = (input.query ?? "").trim().toLocaleLowerCase().slice(0, 100);
  const staticItems = staticCatalog(input.locale);
  const dynamicNewsItems = await newsCatalog(input.locale);
  const catalogItems = [...staticItems, ...dynamicNewsItems];
  const counts: ShareCatalogResult["counts"] = {
    neighborhood: staticItems.filter((item) => item.kind === "neighborhood").length,
    community: staticItems.filter((item) => item.kind === "community").length,
    development: staticItems.filter((item) => item.kind === "development").length,
    guide: staticItems.filter((item) => item.kind === "guide").length,
    news: dynamicNewsItems.length,
  };

  if (input.kind !== "all" && input.kind !== "listing") {
    const matching = catalogItems
      .filter((item) => item.kind === input.kind)
      .filter((item) => matches(item, query));
    const offset = (page - 1) * pageSize;
    return {
      items: matching.slice(offset, offset + pageSize),
      total: matching.length,
      page,
      pageSize,
      hasMore: offset + pageSize < matching.length,
      totalIsEstimate: false,
      overview: false,
      counts,
    };
  }

  // The mixed overview stays office-scoped. The full listing category can
  // browse the wider OneKey IDX feed without an expensive exact-count scan.
  const listingScope =
    input.kind === "listing" ? input.listingScope ?? "homix" : "homix";
  const listingLimit = input.kind === "all" ? (query ? 24 : 12) : pageSize;
  const listingOffset = input.kind === "all" ? 0 : (page - 1) * pageSize;
  const listingResult = await listings.getListings({
    scope: listingScope,
    q: query || undefined,
    sort: "newest",
    exactTotal: listingScope === "homix",
    limit: listingLimit,
    offset: listingOffset,
  });
  if (!listingResult.totalIsEstimate) counts.listing = listingResult.total;

  if (input.kind === "listing") {
    return {
      items: listingResult.listings.map(listingItem),
      total: listingResult.total,
      page,
      pageSize,
      hasMore: listingResult.hasMore === true,
      totalIsEstimate: listingResult.totalIsEstimate === true,
      overview: false,
      unavailable: listingResult.unavailable,
      counts,
    };
  }

  const matchingStatic = catalogItems.filter((item) => matches(item, query));
  const groupedPreview = SHARE_CONTENT_KINDS.flatMap((kind) => {
    if (kind === "listing") return [];
    return matchingStatic.filter((item) => item.kind === kind).slice(0, query ? 12 : 8);
  });
  const total = listingResult.total + matchingStatic.length;
  counts.all = total;

  return {
    items: [...listingResult.listings.map(listingItem), ...groupedPreview],
    total,
    page: 1,
    pageSize: listingLimit + groupedPreview.length,
    hasMore: false,
    totalIsEstimate: false,
    overview: true,
    unavailable: listingResult.unavailable,
    counts,
  };
}
