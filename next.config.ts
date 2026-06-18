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
    ],
  },
};

export default nextConfig;
