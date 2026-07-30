import { createHash } from "node:crypto";
import { XMLParser } from "fast-xml-parser";
import type { NewsCategory } from "@/lib/news/types";

export type NewsSource = {
  id: number;
  sourceKey: string;
  name: string;
  sourceType: "publisher_rss" | "google_news";
  trustTier: "A" | "B" | "C";
  feedUrl: string;
  publisherDomain: string | null;
  categories: string[];
  regions: string[];
  requiresCorroboration: boolean;
};

export type FeedCandidate = {
  sourceId: number;
  sourceKey: string;
  trustTier: NewsSource["trustTier"];
  requiresCorroboration: boolean;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  publisherUrl: string | null;
  publishedAt: string | null;
  category: NewsCategory;
  region: string;
  contentHash: string;
  score: number;
  rawPayload: Record<string, unknown>;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  parseTagValue: false,
});

const CATEGORY_TERMS: Record<NewsCategory, string[]> = {
  policy: ["zoning", "law", "policy", "regulation", "council", "governor", "mayor", "housing plan", "rent stabilization"],
  renting: ["rent", "rental", "tenant", "landlord", "lease", "vacancy"],
  development: ["development", "develop", "rezoning", "construction", "permit", "new building", "conversion"],
  investing: ["investor", "investment", "multifamily", "cap rate", "1031", "landlord"],
  buying: ["mortgage", "homebuyer", "buyer", "interest rate", "closing"],
  selling: ["seller", "listing", "inventory", "home sale"],
  market: ["market", "price", "sales", "housing", "real estate", "home"],
};

const GEO_TERMS = [
  "new york",
  "nyc",
  "manhattan",
  "brooklyn",
  "queens",
  "bronx",
  "staten island",
  "long island",
  "nassau",
  "suffolk",
  "westchester",
  "jersey city",
  "hoboken",
  "north jersey",
  "new jersey",
  "tri-state",
];

const REAL_ESTATE_TERMS = [
  "housing",
  "home",
  "real estate",
  "property",
  "mortgage",
  "rent",
  "rental",
  "zoning",
  "development",
  "building",
  "condo",
  "co-op",
  "multifamily",
];

const NATIONAL_IMPACT_TERMS = [
  "mortgage rate",
  "interest rate",
  "federal reserve",
  "treasury yield",
  "fannie mae",
  "freddie mac",
  "conforming loan",
  "housing finance",
];

const EXCLUDED_TERMS = [
  "celebrity home",
  "celebrity mansion",
  "sports",
  "murder",
  "shooting",
  "crime scene",
  "lottery",
  "horoscope",
];

const GOOGLE_PUBLISHER_ALLOWLIST = [
  "Associated Press",
  "AP News",
  "Reuters",
  "Bloomberg",
  "The New York Times",
  "The Wall Street Journal",
  "Crain's New York Business",
  "The Real Deal",
  "Commercial Observer",
  "Bisnow",
  "HousingWire",
  "Newsday",
  "Gothamist",
  "THE CITY",
  "City & State New York",
  "Brick Underground",
  "New York Post",
  "amNewYork",
  "NBC New York",
  "CBS News",
  "CNBC",
  "NorthJersey.com",
  "New York City Council",
  "NYC Housing Preservation and Development",
  "New York State Homes and Community Renewal",
];

function arrayOf<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function textValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return textValue(record["#text"] ?? record.href ?? record["@_href"] ?? "");
  }
  return "";
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function cleanText(value: unknown, max = 4_000): string {
  return decodeEntities(textValue(value).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function normalizeTitle(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/\s+-\s+[^-]{2,80}$/u, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function sourceHash(title: string): string {
  return createHash("sha256").update(normalizeTitle(title)).digest("hex");
}

function inferCategory(text: string): NewsCategory {
  const lower = text.toLocaleLowerCase();
  let best: NewsCategory = "market";
  let bestScore = 0;
  for (const [category, terms] of Object.entries(CATEGORY_TERMS) as [
    NewsCategory,
    string[],
  ][]) {
    const score = terms.reduce(
      (total, term) => total + (lower.includes(term) ? 1 : 0),
      0,
    );
    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }
  return best;
}

function inferRegion(text: string, fallback: string[]): string {
  const lower = text.toLocaleLowerCase();
  if (lower.includes("long island city")) return "Queens";
  if (lower.includes("long island") || lower.includes("nassau") || lower.includes("suffolk")) return "Long Island";
  if (lower.includes("new jersey") || lower.includes("jersey city") || lower.includes("hoboken") || lower.includes("north jersey")) return "New Jersey";
  if (lower.includes("westchester")) return "Westchester";
  if (lower.includes("manhattan")) return "Manhattan";
  if (lower.includes("brooklyn")) return "Brooklyn";
  if (lower.includes("queens")) return "Queens";
  if (lower.includes("bronx")) return "The Bronx";
  if (lower.includes("new york") || lower.includes("nyc")) return "New York City";
  return fallback[0] ?? "New York Metro";
}

function safeFeedUrl(source: NewsSource): URL | null {
  try {
    const url = new URL(source.feedUrl);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLocaleLowerCase();
    const expected = source.publisherDomain?.toLocaleLowerCase();
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)
    ) {
      return null;
    }
    if (expected && host !== expected && !host.endsWith(`.${expected}`)) return null;
    return url;
  } catch {
    return null;
  }
}

function safeArticleUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function isRecent(publishedAt: string | null, now: Date): boolean {
  if (!publishedAt) return false;
  const time = Date.parse(publishedAt);
  if (!Number.isFinite(time)) return false;
  const age = now.getTime() - time;
  return age >= -3_600_000 && age <= 60 * 60 * 60 * 1_000;
}

function candidateScore(input: {
  title: string;
  summary: string;
  source: NewsSource;
  publishedAt: string | null;
  now: Date;
}): number {
  const text = `${input.title} ${input.summary}`.toLocaleLowerCase();
  const hasLocalGeography = GEO_TERMS.some((term) => text.includes(term));
  const hasNationalImpact = NATIONAL_IMPACT_TERMS.some((term) =>
    text.includes(term),
  );
  if (!hasLocalGeography && !hasNationalImpact) return -100;

  let score = input.source.trustTier === "A" ? 5 : input.source.trustTier === "B" ? 4 : 2;
  score += hasLocalGeography ? 3 : 1;
  score += REAL_ESTATE_TERMS.some((term) => text.includes(term)) ? 3 : 0;
  if (input.publishedAt) {
    const ageHours =
      (input.now.getTime() - Date.parse(input.publishedAt)) / (60 * 60 * 1_000);
    score += ageHours <= 24 ? 2 : 1;
  }
  if (EXCLUDED_TERMS.some((term) => text.includes(term))) score -= 10;
  return score;
}

function publisherAllowed(name: string): boolean {
  const normalized = name.toLocaleLowerCase();
  return GOOGLE_PUBLISHER_ALLOWLIST.some((publisher) =>
    normalized.includes(publisher.toLocaleLowerCase()),
  );
}

function parsePublishedAt(value: unknown): string | null {
  const raw = cleanText(value, 120);
  if (!raw) return null;
  const time = Date.parse(raw);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

export async function fetchFeedCandidates(
  source: NewsSource,
  now = new Date(),
): Promise<FeedCandidate[]> {
  const url = safeFeedUrl(source);
  if (!url) throw new Error(`Unsafe news feed URL for ${source.sourceKey}`);

  const response = await fetch(url, {
    headers: {
      accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      "user-agent": "HomixNewsBot/1.0 (+https://www.homixny.com/news)",
    },
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`News feed ${source.sourceKey} returned ${response.status}`);
  }
  const xml = await response.text();
  if (xml.length > 2_000_000) return [];

  const parsed = parser.parse(xml) as Record<string, unknown>;
  const rss = parsed.rss as Record<string, unknown> | undefined;
  const channel = rss?.channel as Record<string, unknown> | undefined;
  const feed = parsed.feed as Record<string, unknown> | undefined;
  const items = channel
    ? arrayOf(channel.item as Record<string, unknown> | Record<string, unknown>[])
    : arrayOf(feed?.entry as Record<string, unknown> | Record<string, unknown>[]);

  return items.flatMap((item): FeedCandidate[] => {
    const title = cleanText(item.title, 400);
    const summary = cleanText(
      item.description ?? item.summary ?? item.content ?? item["content:encoded"],
    );
    const linkValue = item.link;
    const sourceUrl =
      typeof linkValue === "string"
        ? linkValue
        : Array.isArray(linkValue)
          ? textValue(linkValue[0])
          : textValue(linkValue);
    const sourceNode = item.source as Record<string, unknown> | string | undefined;
    const itemPublisher =
      cleanText(sourceNode, 200) || source.name;
    const publisherUrl =
      sourceNode && typeof sourceNode === "object"
        ? cleanText(sourceNode["@_url"], 1_000) || null
        : null;
    const publishedAt = parsePublishedAt(
      item.pubDate ?? item.published ?? item.updated ?? item["dc:date"],
    );
    const safeSourceUrl = safeArticleUrl(sourceUrl);
    const safePublisherUrl = publisherUrl
      ? safeArticleUrl(publisherUrl)
      : null;
    if (
      title.length < 20 ||
      !safeSourceUrl ||
      !isRecent(publishedAt, now)
    ) {
      return [];
    }
    if (source.sourceType === "google_news" && !publisherAllowed(itemPublisher)) {
      return [];
    }
    const score = candidateScore({ title, summary, source, publishedAt, now });
    if (score < 9) return [];
    const fullText = `${title} ${summary}`;
    return [
      {
        sourceId: source.id,
        sourceKey: source.sourceKey,
        trustTier: source.trustTier,
        requiresCorroboration: source.requiresCorroboration,
        title,
        summary,
        sourceName: itemPublisher,
        sourceUrl: safeSourceUrl,
        publisherUrl: safePublisherUrl,
        publishedAt,
        category: inferCategory(fullText),
        region: inferRegion(fullText, source.regions),
        contentHash: sourceHash(title),
        score,
        rawPayload: {
          sourceKey: source.sourceKey,
          guid: cleanText(item.guid ?? item.id, 500),
        },
      },
    ];
  });
}

export function candidatesCorroborate(
  candidate: FeedCandidate,
  all: FeedCandidate[],
): boolean {
  if (!candidate.requiresCorroboration) return true;
  const words = new Set(
    normalizeTitle(candidate.title)
      .split(" ")
      .filter((word) => word.length >= 5),
  );
  if (words.size < 3) return false;
  return all.some((other) => {
    if (
      other.contentHash === candidate.contentHash ||
      other.sourceName === candidate.sourceName
    ) {
      return false;
    }
    const otherWords = new Set(normalizeTitle(other.title).split(" "));
    const overlap = [...words].filter((word) => otherWords.has(word)).length;
    return overlap >= Math.min(4, Math.ceil(words.size * 0.45));
  });
}
