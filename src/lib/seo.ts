import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * SEO helpers for the bilingual layer.
 *
 * URL model: English lives at the clean URL, the crawlable Chinese variant at
 * `?lang=zh` (see src/proxy.ts). Each language version is SELF-canonical —
 * the zh page canonicalizes to `?lang=zh`, not to the English URL — so Google
 * can index both sides of every hreflang cluster. (Canonicalizing zh → en, as
 * we did before 2026-07, silently deindexed the entire Chinese layer.)
 */

type Localized = string | { en: string; zh: string };

function pick(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

function compact(value: string, max = 240): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const breakAt = cut.lastIndexOf(" ");
  return `${cut.slice(0, breakAt > 80 ? breakAt : max - 1).replace(/[.,;:!?—-]+$/, "")}…`;
}

function introOgImage(title: string, description: string, path: string) {
  const params = new URLSearchParams({
    title: compact(title, 92),
    description: compact(description, 220),
    path,
  });
  return `/og?${params.toString()}`;
}

export type PageMetaInput = {
  /** Clean path without locale param, e.g. "/about" or "/journal/foo". */
  path: string;
  title: Localized;
  description: Localized;
  /** Current render locale — pass the result of getLocale(). */
  locale: Locale;
  /** Page-specific social image (path or absolute). Omit to inherit the branded card. */
  image?: string | null;
  ogType?: "website" | "article" | "profile";
  /** For noindex pages (e.g. MLS listing details) that shouldn't advertise alternates. */
  noAlternates?: boolean;
};

/**
 * Full per-page metadata: localized title/description, self-canonical +
 * hreflang cluster, and a complete OpenGraph block (title/description/url/
 * siteName/locale/image) so every page shares as ITSELF — never as the
 * generic homepage card. Twitter tags flow from OG automatically (the root
 * layout deliberately sets only the card type).
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const title = pick(input.title, input.locale);
  const description = pick(input.description, input.locale);
  const zhUrl = `${input.path}?lang=zh`;
  const enUrl = input.path;
  const canonical = input.locale === "zh" ? zhUrl : enUrl;
  const image = input.image ?? introOgImage(title, description, canonical);
  const imageAlt = compact(`${title}. ${description}`, 300);

  return {
    title,
    description,
    alternates: input.noAlternates
      ? undefined
      : {
          canonical,
          languages: {
            en: enUrl,
            "zh-Hans": zhUrl,
            "x-default": enUrl,
          },
        },
    openGraph: {
      type: input.ogType ?? "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: input.locale === "zh" ? "zh_CN" : "en_US",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
  };
}

/**
 * hreflang alternates only (legacy helper). Locale-aware: pass the current
 * locale so the canonical points at the language actually being served.
 */
export function langAlternates(path: string, locale: Locale = "en") {
  const zhUrl = `${path}?lang=zh`;
  return {
    canonical: locale === "zh" ? zhUrl : path,
    languages: {
      en: path,
      "zh-Hans": zhUrl,
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

/** FAQPage JSON-LD from question/answer pairs (plain text answers). */
export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Sitewide brand entity: RealEstateAgent (org-level) with NAP, geo, license,
 * bilingual alternateName, and social profiles. Rendered once in the root
 * layout so every page carries the entity signal.
 */
export function organizationLd() {
  const { contact, legal, social } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ["Homix Realty", "纽约Homix地产"],
    url: siteConfig.url,
    logo: absUrl("/icon.png"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line1,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // 37-20 Prince St, Flushing NY 11354
      latitude: 40.7639,
      longitude: -73.8327,
    },
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "AdministrativeArea", name: "Manhattan" },
      { "@type": "AdministrativeArea", name: "Queens" },
      { "@type": "AdministrativeArea", name: "Brooklyn" },
      { "@type": "AdministrativeArea", name: "Nassau County" },
    ],
    knowsAbout: [
      "New York real estate",
      "NYC new development condos",
      "Chinese-speaking real estate service",
      "Flushing homes for sale",
      "Long Island school-district home search",
      "Manhattan buyer representation",
      "Queens residential real estate",
      "Nassau County gated communities",
      "纽约买房",
      "纽约新盘",
      "纽约华人房产经纪",
      "长岛学区房",
    ],
    knowsLanguage: ["en", "zh"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "customer service",
      areaServed: "US-NY",
      availableLanguage: ["English", "Chinese"],
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: legal.brokerLicense,
    },
    sameAs: Object.values(social).filter(Boolean),
  };
}

/** WebSite schema so search/AI engines understand the site entity + name. */
export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: "纽约Homix地产",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: ["en", "zh-Hans"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/listings?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Safe JSON-LD string for native script tags. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
