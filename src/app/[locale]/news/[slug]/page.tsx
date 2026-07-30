import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Markdown } from "@/components/journal/Markdown";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { getPublishedNews } from "@/lib/news/repository";
import { newsCoverPath } from "@/lib/news/cover";
import {
  NEWS_CATEGORY_LABELS,
  newsText,
} from "@/lib/news/types";
import {
  absUrl,
  breadcrumbLd,
  jsonLd as serializeJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNews(slug);
  if (!article) return { title: "News not found" };
  const locale = await getRouteLocale(params);
  const copy = newsText(article, locale);
  return pageMetadata({
    path: `/news/${article.slug}`,
    locale,
    title: copy.title,
    description: copy.summary,
    image: newsCoverPath(article.slug, locale),
    ogType: "article",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedNews(slug);
  if (!article) notFound();
  const locale = await getRouteLocale(params);
  const zh = locale === "zh";
  const copy = newsText(article, locale);
  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const articleUrl = absUrl(localizePath(locale, `/news/${article.slug}`));
  const coverUrl = absUrl(newsCoverPath(article.slug, locale));
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: copy.title,
    description: copy.summary,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: articleUrl,
    author: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: absUrl("/homix-logo.webp"),
      },
    },
    citation: article.sourceUrl,
    image: coverUrl,
    inLanguage: zh ? "zh-Hans" : "en",
  };

  return (
    <Container className="py-10 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/news"
          className="text-sm text-muted transition-colors hover:text-bronze hover:underline"
        >
          ← {zh ? "全部新闻" : "All news"}
        </Link>

        <header className="mt-7 border-b border-line pb-8">
          <Eyebrow>
            {NEWS_CATEGORY_LABELS[article.category][locale]} · {article.region}
          </Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{copy.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <time dateTime={article.publishedAt}>
              {df.format(new Date(article.publishedAt))}
            </time>
            <span aria-hidden="true">·</span>
            <span>Homix News</span>
          </div>
        </header>

        <figure className="mt-8 overflow-hidden rounded-sm border border-line bg-surface">
          <Image
            src={newsCoverPath(article.slug, locale)}
            alt={zh ? `${copy.title} 新闻封面` : `${copy.title} news cover`}
            width={1200}
            height={630}
            priority
            className="aspect-[1200/630] h-auto w-full object-cover"
          />
        </figure>

        <div className="mt-9">
          <Markdown>{copy.body}</Markdown>
        </div>

        <section className="my-10 border-y border-bronze/40 bg-surface px-6 py-7 sm:px-8">
          <p className="eyebrow">{zh ? "Homix 视角" : "Homix perspective"}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">
            {copy.homixTake}
          </p>
        </section>

        <section className="border-t border-line pt-7">
          <p className="text-xs uppercase text-muted">
            {zh ? "原始报道" : "Original reporting"}
          </p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-medium text-bronze hover:underline"
          >
            {article.sourceName} ↗
          </a>
          {article.sourcePublishedAt && (
            <p className="mt-2 text-sm text-muted">
              {zh ? "来源发布时间" : "Source published"}:{" "}
              {df.format(new Date(article.sourcePublishedAt))}
            </p>
          )}
          <p className="mt-6 text-sm leading-relaxed text-muted">
            {zh
              ? "本文基于所列原始报道整理，仅供一般性市场教育参考，不构成法律、税务、贷款或投资建议。事实与规则可能变化，请在交易前向相应持牌专业人士核实。"
              : "This briefing is based on the cited original reporting and is general market education, not legal, tax, lending, or investment advice. Facts and rules can change; verify them with the appropriate licensed professional before a transaction."}
          </p>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbLd(
              [
                { name: zh ? "新闻" : "News", path: "/news" },
                { name: copy.title, path: `/news/${article.slug}` },
              ],
              locale,
            ),
          ),
        }}
      />
    </Container>
  );
}
