import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localizePath } from "@/lib/locale";

/**
 * Public locale routing.
 *
 * English keeps the established clean URLs and rewrites internally to /en.
 * Chinese is a first-class /zh tree. Legacy ?lang= URLs permanently migrate
 * to their canonical path so crawlers and shared links consolidate correctly.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = request.nextUrl.searchParams.get("lang");
  if (lang === "zh" || lang === "en") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    url.pathname = localizePath(lang, pathname);
    return NextResponse.redirect(url, 308);
  }

  // Direct /en visits canonicalize to the clean English URL. Requests carrying
  // this private marker are the internal target of the rewrite below.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (request.headers.get("x-homix-locale-rewrite") === "1") {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = localizePath("en", pathname);
    return NextResponse.redirect(url, 308);
  }

  // /zh is a real public route and reaches app/[locale] without a rewrite.
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return NextResponse.next();

  // Preserve external English URLs while rendering through app/[locale].
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  const headers = new Headers(request.headers);
  headers.set("x-homix-locale-rewrite", "1");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip non-localized routes, metadata files, API, and static assets.
  matcher: [
    "/((?!_next(?:/|$)|api(?:/|$)|og(?:/|$)|news-cover(?:/|$)|llms\\.txt$|robots\\.txt$|sitemap\\.xml$|icon\\.png$|apple-icon\\.png$|admin(?:/|$)|edit(?:/|$)|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
