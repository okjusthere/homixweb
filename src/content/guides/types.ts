import type { Bilingual } from "@/content/journal/posts";

/**
 * Evergreen pillar guides (/guides/[slug]) — undated hub pages that organize
 * the dated journal posts into topic clusters. Content rules:
 * - Bilingual everywhere; zh is the primary audience.
 * - Factual, sourced from the journal posts they link to; no invented numbers.
 * - YMYL topics (tax/legal/finance/immigration) carry the not-advice note the
 *   template renders automatically.
 * - Fair-Housing-safe phrasing (language capability, never audience exclusivity).
 */

export interface GuideSection {
  heading: Bilingual;
  /** Markdown — rendered with the same component as journal bodies. */
  body: Bilingual;
}

export interface GuideFaq {
  question: Bilingual;
  /** Plain text (also emitted as FAQPage JSON-LD). */
  answer: Bilingual;
}

export interface Guide {
  slug: string;
  /** On-page H1. */
  title: Bilingual;
  /** Meta description + index-card blurb. */
  description: Bilingual;
  /** Markdown lead paragraph(s). */
  intro: Bilingual;
  /** ISO date of last content review — rendered as 更新于/Updated. */
  updated: string;
  /** Optional cover (reuse a journal cover path) for OG + index card. */
  cover?: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  /** Journal post slugs rendered as the "深入阅读 / Go deeper" cluster. */
  relatedSlugs: string[];
}
