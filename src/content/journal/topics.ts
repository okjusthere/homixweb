import type { Bilingual } from "@/content/journal/posts";

/**
 * Canonical topic taxonomy — the SINGLE source of truth for how educational
 * content is organized (pillars, guide articles, and topic index pages all
 * key off these slugs). Replaces the old free-text `category` field, which had
 * 13 inconsistent labels (some with 1 post, some with duplicate zh names).
 *
 * Each topic optionally points to its pillar guide (/guides/[pillarSlug]) or a
 * data hub (hubHref) — that page IS the topic's authority hub; the topic index
 * page (/guides/topics/[slug]) is the crawlable archive of its articles.
 */
export interface Topic {
  slug: string;
  label: Bilingual;
  /** One-line description for the topic index page + cards. */
  blurb: Bilingual;
  /** Pillar guide slug (/guides/[pillarSlug]) if this topic has one. */
  pillarSlug?: string;
  /** Non-guide hub (e.g. /market-data) if the authority page isn't a guide. */
  hubHref?: string;
}

export const topics: Topic[] = [
  {
    slug: "buying",
    label: { en: "Buying", zh: "买房" },
    blurb: {
      en: "The NYC purchase process end to end — offers, financing, closing, co-op boards.",
      zh: "纽约买房全流程:出价、贷款、过户、Co-op 董事会。",
    },
    pillarSlug: "buying-in-nyc",
  },
  {
    slug: "renting",
    label: { en: "Renting", zh: "租房" },
    blurb: {
      en: "Leasing in New York — income rules, guarantors, no-credit paths, deposits.",
      zh: "纽约租房:收入门槛、担保人、无信用方案、押金规定。",
    },
    pillarSlug: "renting-in-nyc",
  },
  {
    slug: "selling",
    label: { en: "Selling", zh: "卖房" },
    blurb: {
      en: "Listing and selling — staging, media-first marketing, seller costs.",
      zh: "卖房挂牌:布置、媒体化营销、卖方成本。",
    },
  },
  {
    slug: "taxes",
    label: { en: "Taxes & Law", zh: "税务与法律" },
    blurb: {
      en: "Property taxes, transfer/mansion tax, abatements, FIRPTA, fair housing.",
      zh: "房产税、转让税/豪宅税、税务优惠、FIRPTA、公平住房。",
    },
    pillarSlug: "property-taxes",
  },
  {
    slug: "new-immigrants",
    label: { en: "New Immigrants", zh: "新移民" },
    blurb: {
      en: "Settling in — credit from scratch, ITIN loans, funds compliance, daily life.",
      zh: "落地安家:从零建信用、ITIN 贷款、资金合规、生活入门。",
    },
    pillarSlug: "new-immigrants",
  },
  {
    slug: "students",
    label: { en: "Students & Families", zh: "留学与家庭" },
    blurb: {
      en: "Buying near universities, parents buying for students, school districts.",
      zh: "名校周边置业、父母为子女买房、学区功课。",
    },
    pillarSlug: "international-students",
  },
  {
    slug: "investing",
    label: { en: "Investing", zh: "投资" },
    blurb: {
      en: "Investment property, rental math, 1031 exchanges.",
      zh: "投资房、租金测算、1031 置换。",
    },
  },
  {
    slug: "market",
    label: { en: "Market Data", zh: "市场数据" },
    blurb: {
      en: "Prices, trends, and quarterly market reports by area.",
      zh: "各区房价、走势与季度市场报告。",
    },
    hubHref: "/market-data",
  },
  {
    slug: "policy",
    label: { en: "Policy & News", zh: "政策与动态" },
    blurb: {
      en: "Rates, zoning reform, congestion pricing, flood risk — what moves the market.",
      zh: "利率、分区改革、拥堵收费、洪水风险——影响楼市的动态。",
    },
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
