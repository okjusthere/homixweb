import type { MetadataRoute } from "next";
import { journalPosts } from "@/content/journal/posts";
import { listings } from "@/lib/listings";
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
    "/sell",
    "/agents",
    "/neighborhoods",
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

  const agents = await listings.getAgents();

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
    ...journalPosts.map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
