import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment ? " ws: http: https:" : ""}`,
  "frame-src https://www.google.com",
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

// Preserve Next's blocking-metadata crawler list and add WeChat, whose link
// preview fetcher needs OG tags in the initial <head> rather than streamed.
const htmlLimitedBots =
  /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|MicroMessenger|WeChat/i;

const nextConfig: NextConfig = {
  htmlLimitedBots,
  // The profile upload routes use Sharp for content validation and resizing.
  // Turbopack traces Sharp's JavaScript but can miss libvips, which leaves the
  // deployed Vercel function unable to decode any image. Keep these patterns
  // route-scoped so the native binaries are only added to the two upload APIs.
  outputFileTracingIncludes: {
    "/api/agent-profile": [
      "node_modules/sharp/**/*",
      "node_modules/@img/sharp-*/**/*",
    ],
    "/api/agent-admin/edit": [
      "node_modules/sharp/**/*",
      "node_modules/@img/sharp-*/**/*",
    ],
  },
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
