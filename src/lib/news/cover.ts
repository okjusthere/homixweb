import type { Locale } from "@/lib/locale";
import type { NewsArticle } from "@/lib/news/types";

export function newsCoverPath(
  article: Pick<NewsArticle, "slug" | "imageUrl">,
  locale: Locale,
): string {
  if (article.imageUrl) return article.imageUrl;
  const params = new URLSearchParams({ slug: article.slug, locale });
  return `/news-cover?${params.toString()}`;
}
