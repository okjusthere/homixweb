import { headers } from "next/headers";

/**
 * Absolute origin for building shareable links (advisor edit links, etc.).
 *
 * Prefers the ACTUAL request host so links work on whatever domain the app is
 * currently served from — e.g. https://homixweb.vercel.app before the
 * www.homixny.com domain is pointed at the deployment. Falls back to
 * NEXT_PUBLIC_SITE_URL only when no host header is available.
 */

function build(get: (k: string) => string | null): string | null {
  const host = get("x-forwarded-host") || get("host");
  if (!host) return null;
  const proto =
    get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

function fallbackOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.homixny.com"
  ).replace(/\/$/, "");
}

/** Origin for use inside Server Components / Server Actions. */
export async function getOrigin(): Promise<string> {
  const h = await headers();
  return build((k) => h.get(k)) || fallbackOrigin();
}

/** Origin for use inside Route Handlers (which receive a Request). */
export function getOriginFromRequest(req: Request): string {
  return build((k) => req.headers.get(k)) || new URL(req.url).origin;
}
