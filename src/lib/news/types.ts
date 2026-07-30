import type { Locale } from "@/lib/locale";

export const NEWS_CATEGORIES = [
  "market",
  "policy",
  "renting",
  "buying",
  "selling",
  "investing",
  "development",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsArticle = {
  id: number;
  slug: string;
  status: "published" | "unpublished";
  category: NewsCategory;
  region: string;
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  bodyEn: string;
  bodyZh: string;
  homixTakeEn: string;
  homixTakeZh: string;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedAt: string | null;
  publishedAt: string;
};

export const NEWS_CATEGORY_LABELS: Record<
  NewsCategory,
  Record<Locale, string>
> = {
  market: { en: "Market", zh: "市场" },
  policy: { en: "Policy", zh: "政策" },
  renting: { en: "Renting", zh: "租赁" },
  buying: { en: "Buying", zh: "买房" },
  selling: { en: "Selling", zh: "卖房" },
  investing: { en: "Investing", zh: "投资" },
  development: { en: "Development", zh: "开发与新盘" },
};

export function newsText(
  article: NewsArticle,
  locale: Locale,
): {
  title: string;
  summary: string;
  body: string;
  homixTake: string;
} {
  return locale === "zh"
    ? {
        title: article.titleZh,
        summary: article.summaryZh,
        body: article.bodyZh,
        homixTake: article.homixTakeZh,
      }
    : {
        title: article.titleEn,
        summary: article.summaryEn,
        body: article.bodyEn,
        homixTake: article.homixTakeEn,
      };
}
