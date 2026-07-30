import type { Locale } from "@/lib/locale";

export function newsCoverPath(slug: string, locale: Locale): string {
  const params = new URLSearchParams({ slug, locale });
  return `/news-cover?${params.toString()}`;
}
