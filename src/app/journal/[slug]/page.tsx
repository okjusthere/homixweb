import { permanentRedirect } from "next/navigation";
import { journalPosts } from "@/content/journal/posts";

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export default async function LegacyJournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/guides/articles/${slug}`);
}
