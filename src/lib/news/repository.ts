import "server-only";

import { unstable_cache } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import {
  NEWS_CATEGORIES,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/news/types";

type NewsRow = {
  id: number | string;
  slug: string;
  status: "published" | "unpublished";
  category: string;
  region: string;
  title_en: string;
  title_zh: string;
  summary_en: string;
  summary_zh: string;
  body_en: string;
  body_zh: string;
  homix_take_en: string;
  homix_take_zh: string;
  source_name: string;
  source_url: string;
  source_published_at: string | null;
  image_url: string | null;
  image_alt_en: string | null;
  image_alt_zh: string | null;
  image_generated_at: string | null;
  published_at: string;
};

function isCategory(value: string): value is NewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(value);
}

function mapRow(row: NewsRow): NewsArticle | null {
  if (!isCategory(row.category)) return null;
  return {
    id: Number(row.id),
    slug: row.slug,
    status: row.status,
    category: row.category,
    region: row.region,
    titleEn: row.title_en,
    titleZh: row.title_zh,
    summaryEn: row.summary_en,
    summaryZh: row.summary_zh,
    bodyEn: row.body_en,
    bodyZh: row.body_zh,
    homixTakeEn: row.homix_take_en,
    homixTakeZh: row.homix_take_zh,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    sourcePublishedAt: row.source_published_at,
    imageUrl: row.image_url,
    imageAltEn: row.image_alt_en,
    imageAltZh: row.image_alt_zh,
    imageGeneratedAt: row.image_generated_at,
    publishedAt: row.published_at,
  };
}

const selectColumns = [
  "id",
  "slug",
  "status",
  "category",
  "region",
  "title_en",
  "title_zh",
  "summary_en",
  "summary_zh",
  "body_en",
  "body_zh",
  "homix_take_en",
  "homix_take_zh",
  "source_name",
  "source_url",
  "source_published_at",
  "image_url",
  "image_alt_en",
  "image_alt_zh",
  "image_generated_at",
  "published_at",
].join(",");

const cachedPublishedNews = unstable_cache(
  async (limit: number): Promise<NewsArticle[]> => {
    const client = getSupabase();
    if (!client) return [];
    const { data, error } = await client
      .from("news_articles")
      .select(selectColumns)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(Math.min(Math.max(limit, 1), 100));
    if (error || !data) return [];
    return (data as unknown as NewsRow[])
      .map(mapRow)
      .filter((article): article is NewsArticle => article !== null);
  },
  ["homix-published-news"],
  { revalidate: 900, tags: ["homix-news"] },
);

const cachedNewsArticle = unstable_cache(
  async (slug: string): Promise<NewsArticle | null> => {
    const client = getSupabase();
    if (!client) return null;
    const { data, error } = await client
      .from("news_articles")
      .select(selectColumns)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return mapRow(data as unknown as NewsRow);
  },
  ["homix-news-article"],
  { revalidate: 900, tags: ["homix-news"] },
);

export function listPublishedNews(limit = 30): Promise<NewsArticle[]> {
  return cachedPublishedNews(limit);
}

export function getPublishedNews(slug: string): Promise<NewsArticle | null> {
  return cachedNewsArticle(slug);
}
