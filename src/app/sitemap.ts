import type { MetadataRoute } from "next";
import { journalPosts } from "@/content/journal/posts";
import { featuredDevelopments } from "@/data/featured-developments";
import { getAgents } from "@/lib/agents";
import { newDevelopmentBasePath, newDevelopmentHref } from "@/lib/new-developments";
import { gatedCommunities } from "@/data/gated-communities";
import { communitiesBasePath, communityHref } from "@/lib/gated-communities";
import { neighborhoods, siteConfig } from "@/lib/site";

/**
 * Static pages + advisor + neighborhood routes. Individual IDX listing detail
 * pages are intentionally excluded (kept noindex per MLS display rules).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/listings",
    newDevelopmentBasePath,
    "/sell",
    "/agents",
    "/neighborhoods",
    communitiesBasePath,
    "/about",
    "/join",
    "/calculator",
    "/contact",
    "/journal",
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
    })),
    ...agents.map((a) => ({
      url: `${base}/agents/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...neighborhoods.map((n) => ({
      url: `${base}/neighborhoods/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...featuredDevelopments.map((building) => ({
      url: `${base}${newDevelopmentHref(building.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...gatedCommunities.map((c) => ({
      url: `${base}${communityHref(c.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...journalPosts.map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
