export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL for a locale. English remains at the existing clean URL. */
export function localizePath(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] || href;
  const suffix = match?.[2] || "";
  const clean = pathname === "/zh" ? "/" : pathname.replace(/^\/(?:zh|en)(?=\/|$)/, "") || "/";

  if (locale === "en") return `${clean}${suffix}`;
  return `${clean === "/" ? "/zh" : `/zh${clean}`}${suffix}`;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function localeFromParam(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}
