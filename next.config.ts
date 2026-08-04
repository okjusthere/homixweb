import type { NextConfig } from "next";

// Preserve Next's blocking-metadata crawler list and add WeChat, whose link
// preview fetcher needs OG tags in the initial <head> rather than streamed.
const htmlLimitedBots =
  /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|MicroMessenger|WeChat/i;

const nextConfig: NextConfig = {
  htmlLimitedBots,
  // Pin the workspace root — a stray lockfile in the home dir confuses inference.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Vercel Hobby image transformations are capped; serve already curated media directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // BBO listing media proxy and R2 public media.
      { protocol: "https", hostname: "onekey.kevv.ai" },
      { protocol: "https", hostname: "onekeymls.kevv.ai" },
      // Wikimedia Commons — real, freely-licensed neighborhood photos.
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // Supabase Storage — advisor-uploaded headshots.
      { protocol: "https", hostname: "*.supabase.co" },
      // New-development official marketing images (developer CMS CDNs).
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "media-production.lp-cdn.com" },
      { protocol: "https", hostname: "thebryantnyc.com" },
    ],
  },
  experimental: {
    // Advisor headshot uploads go through a server action.
    serverActions: { bodySizeLimit: "8mb" },
  },
  async redirects() {
    return [
      // /offer (and its /offers alias) moved into the gated agent portal.
      { source: "/offer", destination: "https://agents.homixny.com/offer", permanent: true },
      { source: "/offers", destination: "https://agents.homixny.com/offer", permanent: true },
      { source: "/zh/offer", destination: "https://agents.homixny.com/offer", permanent: true },
      { source: "/zh/offers", destination: "https://agents.homixny.com/offer", permanent: true },
    ];
  },
};

export default nextConfig;
