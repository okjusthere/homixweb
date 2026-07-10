import { permanentRedirect } from "next/navigation";
import { topics } from "@/content/journal/topics";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default async function LegacyJournalTopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(
    localizePath(await getRouteLocale(params), `/guides/topics/${slug}`),
  );
}
