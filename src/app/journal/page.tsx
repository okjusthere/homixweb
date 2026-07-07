import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { journalPosts, postsByTopic } from "@/content/journal/posts";
import { topics } from "@/content/journal/topics";
import { JournalList, type JournalCardData } from "@/components/journal/JournalList";
import { getAgents } from "@/lib/agents";
import { getLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/journal",
    locale,
    title: {
      en: "Journal — NYC Real Estate Guides & Market Insights",
      zh: "纽约买房指南——房产知识与市场解读",
    },
    description: {
      en: "Market reports, buyer guides, and neighborhood deep-dives from the Homix team — practical knowledge for buying, selling, and investing in New York.",
      zh: "纽约买房流程、税费贷款、学区与社区分析、市场月报——Homix 团队撰写的中文房产知识库，帮首次购房者与投资者看懂纽约楼市。",
    },
  });
}

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
      coverCredit: post.coverCredit,
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

      {/* Browse by topic — crawlable, server-rendered links to topic archives */}
      <div className="mt-10">
        <p className="eyebrow mb-4">{locale === "zh" ? "按主题浏览" : "Browse by topic"}</p>
        <div className="flex flex-wrap gap-2.5">
          {topics.map((topic) => {
            const count = postsByTopic(topic.slug).length;
            if (count === 0) return null;
            return (
              <Link
                key={topic.slug}
                href={`/journal/topic/${topic.slug}`}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/80 transition-colors hover:border-bronze/50 hover:text-bronze"
              >
                {topic.label[locale]}
                <span className="ml-1.5 text-muted/70">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12">
        <JournalList
          posts={cards}
          categories={categories}
          allLabel={locale === "zh" ? "全部" : "All"}
          minRead={t.journal.minRead}
        />
      </div>
    </Container>
  );
}
