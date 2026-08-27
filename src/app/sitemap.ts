import type { MetadataRoute } from "next";
import { journalPosts, postModified } from "@/content/journal/posts";
import { guides } from "@/content/guides";
import { topics } from "@/content/journal/topics";
import { marketAreas } from "@/data/market-stats";
import { featuredDevelopments } from "@/data/featured-developments";
import { getAgents } from "@/lib/agents";
import { newDevelopmentBasePath, newDevelopmentHref } from "@/lib/new-developments";
import { gatedCommunities } from "@/data/gated-communities";
import { communitiesBasePath, communityHref } from "@/lib/gated-communities";
import { localizePath } from "@/lib/locale";
import { neighborhoods, siteConfig } from "@/lib/site";
import { listPublishedNews } from "@/lib/news/repository";

/**
 * Static pages + advisor + neighborhood routes. Individual IDX listing detail
 * pages are intentionally excluded (kept noindex per MLS display rules).
 *
 * Every language version has its own <loc> and carries the full reciprocal
 * hreflang cluster. Google requires a URL entry for each locale variant.
 */
function withAlternates(enUrl: string, zhUrl: string) {
  return {
    alternates: {
      languages: {
        en: enUrl,
        "zh-Hans": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

type SitemapEntryOptions = Pick<
  MetadataRoute.Sitemap[number],
  "lastModified" | "changeFrequency" | "priority"
>;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/listings",
    "/open-houses",
    newDevelopmentBasePath,
    "/flexible-payment-homes",
    "/sell",
    "/agents",
    "/chinese-real-estate-agents-nyc",
    "/guides",
    "/news",
    "/market-data",
    "/neighborhoods",
    communitiesBasePath,
    "/about",
    "/join",
    "/commission-plan",
    "/training",
    "/calculator",
    "/contact",
    "/guides/articles",
    "/privacy",
    "/terms",
    "/accessibility",
    "/fair-housing",
    "/standard-operating-procedures",
  ];

  const agents = await getAgents();
  const news = await listPublishedNews(100);
  const localizedEntries = (path: string, options: SitemapEntryOptions) => {
    const enUrl = `${base}${localizePath("en", path || "/")}`;
    const zhUrl = `${base}${localizePath("zh", path || "/")}`;
    const alternates = withAlternates(enUrl, zhUrl);
    return [
      { url: enUrl, ...options, ...alternates },
      { url: zhUrl, ...options, ...alternates },
    ];
  };

  return [
    ...staticPaths.flatMap((p) => localizedEntries(p, {
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...agents.flatMap((a) => localizedEntries(`/agents/${a.slug}`, {
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...neighborhoods.flatMap((n) => localizedEntries(`/neighborhoods/${n.slug}`, {
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...featuredDevelopments.flatMap((building) => localizedEntries(newDevelopmentHref(building.slug), {
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...gatedCommunities.flatMap((c) => localizedEntries(communityHref(c.slug), {
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...guides.flatMap((g) => localizedEntries(`/guides/${g.slug}`, {
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...marketAreas.flatMap((a) => localizedEntries(`/market-data/${a.slug}`, {
      lastModified: a.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...topics.flatMap((tp) => localizedEntries(`/guides/topics/${tp.slug}`, {
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...journalPosts.flatMap((p) => localizedEntries(`/guides/articles/${p.slug}`, {
      // Signal re-review freshness, not just the original publish date.
      lastModified: postModified(p),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...news.flatMap((article) => localizedEntries(`/news/${article.slug}`, {
      lastModified: article.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
