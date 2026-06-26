import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the home dir confuses inference.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Homix legacy site (Squarespace) — agent & founder photos.
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "static1.squarespace.com" },
      // OneKey / MLS Grid listing photos (time-limited signed URLs).
      { protocol: "https", hostname: "media.mlsgrid.com" },
      // Wikimedia Commons — real, freely-licensed neighborhood photos.
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // Supabase Storage — advisor-uploaded headshots.
      { protocol: "https", hostname: "*.supabase.co" },
      // New-development official marketing images (developer CMS CDNs).
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "media-production.lp-cdn.com" },
    ],
  },
  experimental: {
    // Advisor headshot uploads go through a server action.
    serverActions: { bodySizeLimit: "8mb" },
  },
  async redirects() {
    return [
      // /offer (and its /offers alias) moved into the gated agent portal.
      { source: "/offer", destination: "https://agents.homixny.com/offer", permanent: false },
      { source: "/offers", destination: "https://agents.homixny.com/offer", permanent: false },
    ];
  },
};

export default nextConfig;
