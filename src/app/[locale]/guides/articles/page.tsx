import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { journalPosts, postsByTopic } from "@/content/journal/posts";
import { topics } from "@/content/journal/topics";
import { JournalList, type JournalCardData } from "@/components/journal/JournalList";
import { getAgents } from "@/lib/agents";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/guides/articles",
    locale,
    title: {
      en: "All Articles — New York Real Estate Guides",
      zh: "全部置业文章——纽约买房、卖房与市场知识",
    },
    description: {
      en: "Browse Homix articles by topic: buying, selling, renting, taxes, market data, immigration, students, families, and investing in New York real estate.",
      zh: "按主题浏览 Homix 置业文章：买房、卖房、租房、税务、市场数据、新移民、留学家庭与纽约地产投资。",
    },
  });
}

export default async function GuideArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const agents = await getAgents();
  const authorName = (slug: string) =>
    agents.find((a) => a.slug === slug)?.name ?? "Homix";
  const df = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // post dates are date-only ISO strings; format in UTC to avoid off-by-one
  });

  const cards: JournalCardData[] = [...journalPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      slug: post.slug,
      cover: post.cover,
      coverCredit: post.coverCredit,
      catKey: post.topic ?? "general",
      catLabel: post.topic ? topics.find((t) => t.slug === post.topic)?.label[locale] ?? post.category[locale] : post.category[locale],
      title: post.title[locale],
      excerpt: post.excerpt[locale],
      author: authorName(post.authorSlug),
      date: df.format(new Date(post.date)),
      readMinutes: post.readMinutes,
    }));
  const categories = topics
    .filter((topic) => postsByTopic(topic.slug).length > 0)
    .map((topic) => ({ key: topic.slug, label: topic.label[locale] }));

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{locale === "zh" ? "置业文章" : "Guide Articles"}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {locale === "zh" ? "按主题阅读纽约置业知识" : "Read by real estate topic"}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {locale === "zh"
            ? "这里保留完整文章库，但浏览顺序按买家、卖家、新移民、留学家庭、税务与市场数据重新整理。"
            : "The full article library, reorganized around buyer, seller, newcomer, student-family, tax, and market-data questions."}
        </p>
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
                href={`/guides/topics/${topic.slug}`}
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
