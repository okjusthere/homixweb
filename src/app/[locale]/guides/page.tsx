import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { guides } from "@/content/guides";
import { journalPosts, postsByTopic } from "@/content/journal/posts";
import { topics, getTopic } from "@/content/journal/topics";
import { marketAreas } from "@/data/market-stats";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/guides",
    locale,
    title: {
      en: "New York Real Estate Guides — Buying, Selling, Taxes & Market Data",
      zh: "纽约置业指南——买房、卖房、税务与市场数据",
    },
    description: {
      en: "Homix's organized New York real estate guide hub: buyer guides, seller strategy, renting, investing, taxes, immigration, students, market data, and 50+ bilingual articles.",
      zh: "Homix 纽约置业指南中心: 买房、卖房、租房、投资、税务、新移民、留学家庭、市场数据与 50+ 篇中英双语文章。",
    },
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const zh = locale === "zh";
  const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const guideBySlug = new Map(guides.map((guide) => [guide.slug, guide]));
  const articleCount = journalPosts.length;

  const paths = [
    {
      topic: "buying",
      title: zh ? "我要买房" : "Buying a home",
      body: zh
        ? "流程、贷款、过户、Co-op / Condo、首次买家与看房前该准备的数字。"
        : "Process, financing, closing, co-op vs condo, first-time buyer basics, and numbers to know before touring.",
      href: "/guides/topics/buying",
      guideSlug: "buying-in-nyc",
    },
    {
      topic: "selling",
      title: zh ? "我要卖房" : "Selling a home",
      body: zh
        ? "定价、布置、媒体曝光、卖方税费与挂牌前最值得做的准备。"
        : "Pricing, staging, media exposure, seller taxes, and what to prepare before listing.",
      href: "/guides/topics/selling",
      guideSlug: "selling-in-new-york",
    },
    {
      topic: "renting",
      title: zh ? "我要租房" : "Renting in New York",
      body: zh
        ? "收入门槛、担保人、无信用租房、押金规则与纽约租赁市场。"
        : "Income rules, guarantors, no-credit paths, deposit rules, and the New York rental market.",
      href: "/guides/topics/renting",
      guideSlug: "renting-in-nyc",
    },
    {
      topic: "taxes",
      title: zh ? "税务与法律" : "Taxes & law",
      body: zh
        ? "豪宅税、转让税、房产税申诉、1031、FIRPTA 与公平住房。"
        : "Mansion tax, transfer taxes, tax grievances, 1031 exchanges, FIRPTA, and fair housing.",
      href: "/guides/topics/taxes",
      guideSlug: "property-taxes",
    },
    {
      topic: "new-immigrants",
      title: zh ? "新移民 / 海外买家" : "Newcomers & overseas buyers",
      body: zh
        ? "从零建信用、ITIN 贷款、海外资金、落地生活与安家选区。"
        : "Building credit, ITIN loans, overseas funds, settling in, and choosing where to live.",
      href: "/guides/topics/new-immigrants",
      guideSlug: "new-immigrants",
    },
    {
      topic: "students",
      title: zh ? "留学家庭 / 学区" : "Students & families",
      body: zh
        ? "父母给孩子买房、大学周边、学区边界、长岛家庭置业。"
        : "Parents buying for students, university areas, school boundaries, and family moves.",
      href: "/guides/topics/students",
      guideSlug: "international-students",
    },
    {
      topic: "market",
      title: zh ? "市场数据" : "Market data",
      body: zh
        ? "曼哈顿、皇后区、长岛、布鲁克林与新泽西的价格和趋势。"
        : "Prices and trends across Manhattan, Queens, Long Island, Brooklyn, and New Jersey.",
      href: "/market-data",
    },
    {
      topic: "investing",
      title: zh ? "投资入门" : "Investing",
      body: zh
        ? "投资房、租金测算、持有成本与第一套投资房的判断框架。"
        : "Investment property, rental math, carrying costs, and a first-property decision frame.",
      href: "/guides/topics/investing",
      guideSlug: "investing-and-landlording",
    },
  ];

  const latest = [...journalPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      ...guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.title[locale],
        url: absUrl(localizePath(locale, `/guides/${g.slug}`)),
      })),
      ...topics.map((topic, i) => ({
        "@type": "ListItem",
        position: guides.length + i + 1,
        name: topic.label[locale],
        url: absUrl(localizePath(locale, `/guides/topics/${topic.slug}`)),
      })),
    ],
  };

  return (
    <Container className="py-14 sm:py-20">
      <section className="grid gap-10 border-b border-line pb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
        <div>
          <Eyebrow>{zh ? "纽约置业指南" : "New York Real Estate Guides"}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {zh ? "按真实需求整理的纽约房产知识。" : "Real estate knowledge, organized by what you need next."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {zh
              ? "买房、卖房、租房、税务、新移民、留学家庭与市场数据分开整理。先选你的处境，再读对应的完整指南和深度文章。"
              : "Buying, selling, renting, taxes, newcomers, student families, and market data are separated into clear paths. Start with your situation, then go deeper."}
          </p>
        </div>
        <div className="border-y border-line py-6 lg:border-l lg:border-y-0 lg:py-0 lg:pl-8">
          <dl className="grid grid-cols-3 gap-5">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                {zh ? "核心指南" : "Core guides"}
              </dt>
              <dd className="mt-2 font-serif text-3xl text-ink">{guides.length}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                {zh ? "主题" : "Topics"}
              </dt>
              <dd className="mt-2 font-serif text-3xl text-ink">{topics.length}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                {zh ? "文章" : "Articles"}
              </dt>
              <dd className="mt-2 font-serif text-3xl text-ink">{articleCount}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{zh ? "先选路径" : "Choose a path"}</p>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink">
              {zh ? "从你的处境开始" : "Start where you are"}
            </h2>
          </div>
          <Link href="/guides/articles" className="text-sm font-medium text-bronze hover:underline">
            {zh ? "查看全部文章" : "All articles"} →
          </Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => {
            const count = path.topic === "market" ? postsByTopic("market").length : postsByTopic(path.topic).length;
            const guide = path.guideSlug ? guideBySlug.get(path.guideSlug) : undefined;
            return (
              <Link
                key={path.topic}
                href={path.href}
                className="group flex min-h-[224px] flex-col justify-between rounded-sm border border-line bg-surface p-6 transition-colors hover:border-bronze/60"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {guide ? (zh ? "完整指南" : "Complete guide") : topicBySlug.get(path.topic)?.label[locale] ?? (zh ? "主题" : "Topic")}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-normal leading-tight text-ink group-hover:text-bronze">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{path.body}</p>
                </div>
                <p className="mt-6 text-sm text-bronze">
                  {count ? `${count} ${zh ? "篇文章" : "articles"}` : zh ? "进入主题" : "Open topic"} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <p className="eyebrow">{zh ? "核心指南" : "Core guides"}</p>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={index === 0 ? "group grid overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-bronze/60 sm:grid-cols-[0.95fr_1.05fr] lg:row-span-2" : "group grid overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-bronze/60 sm:grid-cols-[180px_1fr]"}
            >
              {guide.cover && (
                <div className={index === 0 ? "relative min-h-72 overflow-hidden bg-line/50" : "relative min-h-44 overflow-hidden bg-line/50"}>
                  <Image
                    src={guide.cover}
                    alt={guide.title[locale]}
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 40vw, 220px"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className={index === 0 ? "p-7 sm:p-8" : "p-6"}>
                <p className="eyebrow">{zh ? "指南" : "Guide"}</p>
                <h3 className={index === 0 ? "mt-4 font-serif text-3xl font-normal leading-tight text-ink group-hover:text-bronze" : "mt-3 font-serif text-xl font-normal leading-snug text-ink group-hover:text-bronze"}>
                  {guide.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {guide.description[locale]}
                </p>
                <p className="mt-5 text-sm font-medium text-bronze">
                  {zh ? "阅读指南" : "Read guide"} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 border-y border-line py-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">{zh ? "市场数据" : "Market data"}</p>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink">
            {zh ? "先看数字，再看背后的故事。" : "The numbers, then the story behind them."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {zh
              ? "区域数据页用于快速比较价格；市场文章解释背后的成交结构、库存和买卖双方策略。"
              : "Area data pages help compare prices quickly; market articles explain sale mix, inventory, and buyer-seller strategy."}
          </p>
          <Link href="/market-data" className="mt-5 inline-block text-sm font-medium text-bronze hover:underline">
            {zh ? "全部市场数据" : "All market data"} →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {marketAreas.slice(0, 6).map((area) => (
            <Link
              key={area.slug}
              href={`/market-data/${area.slug}`}
              className="rounded-sm border border-line bg-surface p-5 transition-colors hover:border-bronze/60"
            >
              <p className="font-serif text-lg text-ink">{area.name[locale]}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {area.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-7 border-y border-line py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="eyebrow">{zh ? "每日动态" : "Current developments"}</p>
          <h2 className="mt-3 font-serif text-3xl font-normal text-ink">
            {zh ? "常青指南之外，关注今天真正发生的变化。" : "Beyond evergreen guidance, follow what is changing now."}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {zh
              ? "News 是独立新闻栏目，只收录通过来源、相关性与事实核查门槛的纽约都市圈地产动态。"
              : "News is a separate newsroom for New York metro real-estate developments that clear source, relevance, and factual-quality gates."}
          </p>
        </div>
        <Link
          href="/news"
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
        >
          {zh ? "查看地产新闻" : "Open News"} →
        </Link>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{zh ? "近期更新" : "Recent updates"}</p>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink">
              {zh ? "常读常新的市场与置业观察。" : "New thinking, worth your time."}
            </h2>
          </div>
          <Link href="/guides/articles" className="text-sm font-medium text-bronze hover:underline">
            {zh ? "全部文章" : "All articles"} →
          </Link>
        </div>
        <div className="mt-7 divide-y divide-line border-y border-line">
          {latest.map((post) => {
            const topic = post.topic ? getTopic(post.topic) : undefined;
            return (
              <Link
                key={post.slug}
                href={`/guides/articles/${post.slug}`}
                className="grid gap-4 py-5 transition-colors hover:text-bronze sm:grid-cols-[160px_1fr_auto] sm:items-center"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {topic ? topic.label[locale] : post.category[locale]}
                </p>
                <p className="font-serif text-xl leading-snug text-ink">{post.title[locale]}</p>
                <p className="text-sm text-bronze">{zh ? "阅读" : "Read"} →</p>
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
