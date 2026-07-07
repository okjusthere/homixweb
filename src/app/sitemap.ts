import type { MetadataRoute } from "next";
import { journalPosts } from "@/content/journal/posts";
import { guides } from "@/content/guides";
import { topics } from "@/content/journal/topics";
import { marketAreas } from "@/data/market-stats";
import { featuredDevelopments } from "@/data/featured-developments";
import { getAgents } from "@/lib/agents";
import { newDevelopmentBasePath, newDevelopmentHref } from "@/lib/new-developments";
import { gatedCommunities } from "@/data/gated-communities";
import { communitiesBasePath, communityHref } from "@/lib/gated-communities";
import { neighborhoods, siteConfig } from "@/lib/site";

/**
 * Static pages + advisor + neighborhood routes. Individual IDX listing detail
 * pages are intentionally excluded (kept noindex per MLS display rules).
 *
 * Every entry advertises its zh-Hans variant (?lang=zh) via sitemap-level
 * hreflang so the Chinese layer is discoverable at scale — on-page link tags
 * alone only cover pages a crawler already found.
 */
function withAlternates(url: string) {
  return {
    alternates: {
      languages: {
        en: url,
        "zh-Hans": `${url}?lang=zh`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/listings",
    newDevelopmentBasePath,
    "/sell",
    "/agents",
    "/chinese-real-estate-agents-nyc",
    "/guides",
    "/market-data",
    "/neighborhoods",
    communitiesBasePath,
    "/about",
    "/join",
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

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      ...withAlternates(`${base}${p}`),
    })),
    ...agents.map((a) => ({
      url: `${base}/agents/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...withAlternates(`${base}/agents/${a.slug}`),
    })),
    ...neighborhoods.map((n) => ({
      url: `${base}/neighborhoods/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...withAlternates(`${base}/neighborhoods/${n.slug}`),
    })),
    ...featuredDevelopments.map((building) => ({
      url: `${base}${newDevelopmentHref(building.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...withAlternates(`${base}${newDevelopmentHref(building.slug)}`),
    })),
    ...gatedCommunities.map((c) => ({
      url: `${base}${communityHref(c.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...withAlternates(`${base}${communityHref(c.slug)}`),
    })),
    ...guides.map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...withAlternates(`${base}/guides/${g.slug}`),
    })),
    ...marketAreas.map((a) => ({
      url: `${base}/market-data/${a.slug}`,
      lastModified: a.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...withAlternates(`${base}/market-data/${a.slug}`),
    })),
    ...topics.map((tp) => ({
      url: `${base}/guides/topics/${tp.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...withAlternates(`${base}/guides/topics/${tp.slug}`),
    })),
    ...journalPosts.map((p) => ({
      url: `${base}/guides/articles/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...withAlternates(`${base}/guides/articles/${p.slug}`),
    })),
  ];
}
