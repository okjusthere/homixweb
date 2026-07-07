import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin, /edit/[token], /training already carry meta noindex; keeping
      // /api/ out of the crawl budget entirely.
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
