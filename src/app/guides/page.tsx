import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { guides } from "@/content/guides";
import { marketAreas } from "@/data/market-stats";
import { journalPosts } from "@/content/journal/posts";
import { topics, getTopic } from "@/content/journal/topics";
import { getLocale, getT } from "@/lib/i18n";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/guides",
    locale,
    title: {
      en: "Learn — NYC Buying, Renting, Taxes & Market Guides",
      zh: "学堂——纽约买房、租房、税务与市场指南",
    },
    description: {
      en: "The Homix learning hub: evergreen pillar guides, living market data, and 45+ bilingual articles on buying, renting, taxes, and settling in New York.",
      zh: "Homix 学堂:常青支柱指南、持续更新的市场数据,以及 45+ 篇中英双语文章,讲透纽约买房、租房、税务与安家。",
    },
  });
}

export default async function LearnHubPage() {
  const { locale } = await getT();
  const zh = locale === "zh";

  // Latest 4 articles across all topics for the "fresh" strip.
  const latest = [...journalPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const copy = {
    eyebrow: zh ? "学堂" : "Learn",
    h1: zh ? "纽约置业学堂" : "The New York Learning Hub",
    lead: zh
      ? "从「一个主题一份完整指南」出发,配套各区房价数据和数十篇深度文章——买房、租房、税务、新移民、留学,系统看懂纽约。"
      : "Start with one complete guide per topic, backed by live price data and dozens of deep-dive articles — buying, renting, taxes, immigration, and students, all in one place.",
    pillars: zh ? "支柱指南" : "Pillar guides",
    data: zh ? "市场数据" : "Market data",
    dataLead: zh ? "各区房价,季度更新,数字均有出处。" : "Prices by area, refreshed quarterly, every figure sourced.",
    byTopic: zh ? "按主题浏览" : "Browse by topic",
    latest: zh ? "最新文章" : "Latest articles",
    allArticles: zh ? "全部文章" : "All articles",
    read: zh ? "阅读" : "Read",
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title[locale],
      url: absUrl(`/guides/${g.slug}`),
    })),
  };

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-3xl">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
          {copy.h1}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">{copy.lead}</p>
      </div>

      {/* Pillars */}
      <section className="mt-14">
        <p className="eyebrow mb-6">{copy.pillars}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-bronze/50"
            >
              {g.cover && (
                <div className="relative aspect-[16/8] overflow-hidden bg-line/50">
                  <Image
                    src={g.cover}
                    alt={g.title[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="p-7">
                <p className="font-serif text-2xl leading-snug text-ink group-hover:text-bronze">
                  {g.title[locale]}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {g.description[locale]}
                </p>
                <p className="mt-4 text-sm font-medium text-bronze">
                  {zh ? "阅读指南" : "Read the guide"} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Market data */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">{copy.data}</p>
            <p className="text-base text-muted">{copy.dataLead}</p>
          </div>
          <Link href="/market-data" className="text-sm font-medium text-bronze hover:underline">
            {zh ? "全部数据" : "All data"} →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marketAreas.map((a) => (
            <Link
              key={a.slug}
              href={`/market-data/${a.slug}`}
              className="rounded-sm border border-line bg-surface p-5 transition-colors hover:border-bronze/50"
            >
              <p className="font-serif text-lg text-ink">{a.name[locale]}</p>
              <p className="mt-1 text-sm text-bronze">{zh ? "查看房价" : "See prices"} →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by topic */}
      <section className="mt-16">
        <p className="eyebrow mb-5">{copy.byTopic}</p>
        <div className="flex flex-wrap gap-2.5">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/journal/topic/${topic.slug}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/80 transition-colors hover:border-bronze/50 hover:text-bronze"
            >
              {topic.label[locale]}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="eyebrow">{copy.latest}</p>
          <Link href="/journal" className="text-sm font-medium text-bronze hover:underline">
            {copy.allArticles} →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((p) => {
            const topic = p.topic ? getTopic(p.topic) : undefined;
            return (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                className="group rounded-sm border border-line bg-surface p-5 transition-colors hover:border-bronze/50"
              >
                {topic && (
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {topic.label[locale]}
                  </p>
                )}
                <p className="mt-2 font-serif text-base leading-snug text-ink group-hover:text-bronze">
                  {p.title[locale]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListLd) }}
      />
    </Container>
  );
}
