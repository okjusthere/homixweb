import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getRouteLocale } from "@/lib/i18n";
import { listPublishedNews } from "@/lib/news/repository";
import { newsCoverPath } from "@/lib/news/cover";
import {
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABELS,
  newsText,
  type NewsCategory,
} from "@/lib/news/types";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/news",
    locale,
    title: {
      en: "New York Real Estate News & Homix Perspective",
      zh: "纽约地产新闻与 Homix 视角",
    },
    description: {
      en: "Current New York metro real-estate developments, carefully selected and explained with practical context from Homix.",
      zh: "精选纽约都市圈地产动态，并由 Homix 提供清晰、实用的背景解读。",
    },
  });
}

function isCategory(value: string | undefined): value is NewsCategory {
  return Boolean(value) &&
    (NEWS_CATEGORIES as readonly string[]).includes(value as string);
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await getRouteLocale(params);
  const zh = locale === "zh";
  const requestedCategory = (await searchParams).category;
  const selected = isCategory(requestedCategory) ? requestedCategory : null;
  const allArticles = await listPublishedNews(60);
  const articles = selected
    ? allArticles.filter((article) => article.category === selected)
    : allArticles;
  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return (
    <Container className="py-12 sm:py-16">
      <header className="border-b border-line pb-10 sm:pb-12">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-4xl">
            <Eyebrow>{zh ? "Homix 新闻室" : "Homix Newsroom"}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl font-normal leading-tight text-ink sm:text-6xl">
              {zh ? "纽约地产新闻，讲清楚再分享。" : "New York real estate news, with the context intact."}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {zh
                ? "聚焦纽约市、长岛、新泽西与周边市场中真正影响买家、卖家、租客和房东的变化。"
                : "Developments across New York City, Long Island, New Jersey, and the surrounding market that materially affect buyers, sellers, renters, and owners."}
            </p>
          </div>
          <Image
            src="/homix-mark.webp"
            alt=""
            width={72}
            height={72}
            className="hidden h-16 w-16 object-contain opacity-80 sm:block"
          />
        </div>
      </header>

      <nav
        aria-label={zh ? "新闻分类" : "News categories"}
        className="flex gap-2 overflow-x-auto border-b border-line py-5"
      >
        <Link
          href="/news"
          className={`shrink-0 rounded-sm border px-4 py-2 text-sm transition-colors ${
            selected === null
              ? "border-ink bg-ink text-white"
              : "border-line bg-surface text-ink hover:border-bronze"
          }`}
        >
          {zh ? "全部" : "All"}
        </Link>
        {NEWS_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/news?category=${category}`}
            className={`shrink-0 rounded-sm border px-4 py-2 text-sm transition-colors ${
              selected === category
                ? "border-ink bg-ink text-white"
                : "border-line bg-surface text-ink hover:border-bronze"
            }`}
          >
            {NEWS_CATEGORY_LABELS[category][locale]}
          </Link>
        ))}
      </nav>

      {articles.length === 0 ? (
        <section className="py-20 sm:py-28">
          <p className="eyebrow">{zh ? "今日状态" : "Today"}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal text-ink sm:text-4xl">
            {selected
              ? zh
                ? "这个分类暂时没有符合发布标准的新闻。"
                : "No current briefing meets the publication standard in this category."
              : zh
                ? "今天暂无符合发布标准的地产新闻。"
                : "No current real-estate briefing meets the publication standard today."}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {zh
              ? "我们会保持当天为空，不使用常青文章填充新闻栏目。你仍可在置业指南中查看长期有效的内容。"
              : "The newsroom stays empty rather than filling the day with evergreen material. Long-lived education remains available in Guides."}
          </p>
          <Link
            href="/guides"
            className="mt-7 inline-block text-sm font-medium text-bronze hover:underline"
          >
            {zh ? "前往置业指南" : "Browse Guides"} →
          </Link>
        </section>
      ) : (
        <div className="divide-y divide-line">
          {articles.map((article, index) => {
            const copy = newsText(article, locale);
            return (
              <article
                key={article.id}
                className={`grid gap-6 py-9 sm:py-11 ${
                  index === 0
                    ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center"
                    : "md:grid-cols-[220px_minmax(0,1fr)] md:items-center"
                }`}
              >
                <Link
                  href={`/news/${article.slug}`}
                  className={`block overflow-hidden rounded-sm border border-line bg-surface ${
                    index === 0 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={newsCoverPath(article.slug, locale)}
                    alt=""
                    width={1200}
                    height={630}
                    className="aspect-[1200/630] h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.015]"
                  />
                </Link>
                <div className={index === 0 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase text-muted">
                    <span>
                      {NEWS_CATEGORY_LABELS[article.category][locale]} · {article.region}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.publishedAt}>
                      {df.format(new Date(article.publishedAt))}
                    </time>
                  </div>
                  <h2
                    className={`mt-3 font-serif font-normal leading-tight text-ink ${
                      index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"
                    }`}
                  >
                    <Link
                      href={`/news/${article.slug}`}
                      className="transition-colors hover:text-bronze"
                    >
                      {copy.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                    {copy.summary}
                  </p>
                  <p className="mt-5 text-sm font-medium text-bronze">
                    <Link href={`/news/${article.slug}`} className="hover:underline">
                      {zh ? "阅读全文" : "Read briefing"} →
                    </Link>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Container>
  );
}
