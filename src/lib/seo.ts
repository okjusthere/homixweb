import { siteConfig } from "@/lib/site";

/**
 * hreflang alternates for the bilingual layer. English at the clean URL is
 * canonical; the crawlable Chinese variant lives at `?lang=zh` (see proxy.ts).
 */
export function langAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      en: path,
      "zh-Hans": `${path}?lang=zh`,
      "x-default": path,
    },
  };
}

/** Absolute URL for JSON-LD consumers (schema.org wants absolute images/urls). */
export function absUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

/** BreadcrumbList JSON-LD for 2-level section → detail hierarchies. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}
