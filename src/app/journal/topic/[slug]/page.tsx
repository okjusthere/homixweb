import { permanentRedirect } from "next/navigation";
import { topics } from "@/content/journal/topics";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default async function LegacyJournalTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/guides/topics/${slug}`);
}
