import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { journalPosts } from "@/content/journal/posts";
import { JournalList, type JournalCardData } from "@/components/journal/JournalList";
import { getAgents } from "@/lib/agents";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Market reports, neighborhood deep-dives, and guides from the Homix team — New York's media-first brokerage.",
};

export default async function JournalPage() {
  const { locale, t } = await getT();
  const agents = await getAgents();
  const authorName = (slug: string) =>
    agents.find((a) => a.slug === slug)?.name ?? "Homix";
  const df = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // post dates are date-only ISO strings; format in UTC to avoid off-by-one
  });

  const CAT_ORDER = [
    "Market Data", "Buyer Guide", "Selling", "Neighborhood", "Investing",
    "Law & Taxes", "Immigrant Life", "Students & Families", "Policy & News",
    "Media", "Guide",
  ];
  const cards: JournalCardData[] = [...journalPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      slug: post.slug,
      cover: post.cover,
      catKey: post.category.en,
      catLabel: post.category[locale],
      title: post.title[locale],
      excerpt: post.excerpt[locale],
      author: authorName(post.authorSlug),
      date: df.format(new Date(post.date)),
      readMinutes: post.readMinutes,
    }));
  const categories = Array.from(
    new Map(cards.map((c) => [c.catKey, c.catLabel])).entries(),
  )
    .map(([key, label]) => ({ key, label }))
    .sort((a, b) => {
      const ai = CAT_ORDER.indexOf(a.key);
      const bi = CAT_ORDER.indexOf(b.key);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.label.localeCompare(b.label);
    });

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{t.journal.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.journal.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t.journal.lead}</p>
      </div>

      <JournalList
        posts={cards}
        categories={categories}
        allLabel={locale === "zh" ? "全部" : "All"}
        minRead={t.journal.minRead}
      />
    </Container>
  );
}
