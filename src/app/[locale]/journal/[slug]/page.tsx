import { permanentRedirect } from "next/navigation";
import { journalPosts } from "@/content/journal/posts";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export default async function LegacyJournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(
    localizePath(await getRouteLocale(params), `/guides/articles/${slug}`),
  );
}
