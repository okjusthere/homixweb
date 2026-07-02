import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale proxy: makes the Chinese layer crawlable.
 *
 * Cookie-based locale is invisible to crawlers (they don't send cookies), so
 * `?lang=zh` / `?lang=en` on any URL forces that locale for the request via a
 * request header that `getLocale()` reads before the cookie. Pages emit
 * hreflang alternates pointing at the `?lang=zh` variants.
 */
export function proxy(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  if (lang === "zh" || lang === "en") {
    const headers = new Headers(request.headers);
    headers.set("x-locale", lang);
    return NextResponse.next({ request: { headers } });
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals — only pages need locale handling.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
