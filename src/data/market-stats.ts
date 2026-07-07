import type { Bilingual } from "@/content/journal/posts";

/**
 * Living market-data pages (/market-data/[slug]).
 *
 * HARD RULE: every number here must be traceable to a cited source — either a
 * journal post in src/content/journal/posts.ts (whose articles carry source
 * citations and as-of dates) or an external source named in `source`. Never
 * estimate or invent figures. Refresh quarterly: update the rows + asOf, keep
 * the page URL stable.
 */

export interface StatRow {
  /** Segment label, e.g. { en: "Condo", zh: "公寓 Condo" }. */
  label: Bilingual;
  /** Formatted values, verbatim from the source (e.g. "$1,180,000", "-2.1%"). */
  values: string[];
}

export interface StatTable {
  title: Bilingual;
  /** Column headers, first column is the row label. */
  columns: Bilingual[];
  rows: StatRow[];
  /** Where these numbers come from, shown under the table. */
  source: string;
  /** Data as-of, e.g. "2026 Q2". */
  asOf: string;
}

export interface MarketArea {
  slug: string;
  name: Bilingual;
  /** H1, e.g. 法拉盛房价与市场数据. */
  title: Bilingual;
  description: Bilingual;
  /** Markdown intro summarizing the current state (facts from the tables). */
  intro: Bilingual;
  /** ISO date the page data was last refreshed. */
  updated: string;
  tables: StatTable[];
  /** Direct Q&A derived from the data (also FAQPage JSON-LD). */
  faq: { question: Bilingual; answer: Bilingual }[];
  /** Journal slugs of the full reports these figures come from. */
  reportSlugs: string[];
  /** Neighborhood/community page slugs to cross-link, e.g. /neighborhoods/flushing. */
  relatedLinks: { label: Bilingual; href: string }[];
}

export { marketAreas, getMarketArea } from "./market-stats-data";
