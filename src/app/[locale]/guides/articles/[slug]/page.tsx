import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/journal/Markdown";
import { getJournalPost, journalPosts, postModified } from "@/content/journal/posts";
import { getGuide } from "@/content/guides";
import { getTopic } from "@/content/journal/topics";
import { getAgentBySlug } from "@/lib/agents";
import { getRouteLocale, getT } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { absUrl, breadcrumbLd, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Article not found" };
  const locale = await getRouteLocale(params);
  const author = await getAgentBySlug(post.authorSlug);
  const meta = pageMetadata({
    path: `/guides/articles/${slug}`,
    locale,
    title: post.title,
    description: post.excerpt,
    image: post.cover,
    ogType: "article",
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: author ? [author.name] : undefined,
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const zh = locale === "zh";
  const author = await getAgentBySlug(post.authorSlug);
  const df = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // post dates are date-only ISO strings; format in UTC to avoid off-by-one
  });
  const parentGuide = post.parentGuideSlug ? getGuide(post.parentGuideSlug) : undefined;
  const topic = post.topic ? getTopic(post.topic) : undefined;
  const modified = postModified(post);
  // Timely pieces (market reports, rate/policy) show the publish date as a
  // freshness signal. Evergreen how-tos show "Updated" only when they've been
  // materially re-reviewed (dateModified > date) — otherwise no stale date line,
  // while schema keeps datePublished either way.
  const dateLine =
    post.contentKind === "timely"
      ? `${zh ? "发表于 " : ""}${df.format(new Date(post.date))}${zh ? "" : ""}`
      : modified !== post.date
      ? `${zh ? "更新于 " : "Updated "}${df.format(new Date(modified))}`
      : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: absUrl(post.cover),
    datePublished: post.date,
    dateModified: modified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absUrl(localizePath(locale, `/guides/articles/${post.slug}`)),
    },
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.title }
      : { "@type": "Organization", name: siteConfig.legalName },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "RealEstateAgent",
      name: siteConfig.legalName,
    },
  };

  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/guides/articles"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {t.journal.backToJournal}
        </Link>

        <div className="mt-6">
          <Eyebrow>{topic ? topic.label[locale] : post.category[locale]}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {post.title[locale]}
          </h1>
          <p className="mt-5 text-sm text-muted">
            {t.journal.by}{" "}
            {author ? (
              <Link
                href={`/agents/${author.slug}`}
                className="text-ink underline-offset-4 hover:text-bronze hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              "Homix"
            )}
            {dateLine ? ` · ${dateLine}` : ""} · {post.readMinutes}{" "}
            {t.journal.minRead}
          </p>
          {topic && (
            <div className="mt-3">
              <Link
                href={`/guides/topics/${topic.slug}`}
                className="inline-block rounded-full border border-line px-3 py-1 text-xs text-ink/70 transition-colors hover:border-bronze/50 hover:text-bronze"
              >
                {topic.label[locale]}
              </Link>
            </div>
          )}
        </div>

        {/* Reverse link UP to the pillar guide this article is a spoke of */}
        {parentGuide && (
          <div className="mt-8 rounded-sm border border-line bg-surface px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-muted">
              {zh ? "本文属于" : "Part of the guide"}
            </p>
            <Link
              href={`/guides/${parentGuide.slug}`}
              className="mt-1 inline-block font-serif text-lg leading-snug text-ink underline-offset-4 hover:text-bronze hover:underline"
            >
              {parentGuide.title[locale]} →
            </Link>
          </div>
        )}

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-line/50">
          <Image
            src={post.cover}
            alt={post.title[locale]}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        {post.coverCredit && (
          <p className="mt-2 text-right text-[11px] leading-relaxed text-muted/70">
            {post.coverCredit}
          </p>
        )}

        <div className="mt-10">
          <Markdown>{post.body[locale]}</Markdown>
        </div>

        <div className="mt-14 rounded-sm border border-line bg-surface p-8 text-center">
          <p className="font-serif text-2xl text-ink">{t.contactBand.title}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Button href="/contact">{t.about.workWithUs}</Button>
            <Button href="/listings" variant="outline">
              {t.featured.viewAll}
            </Button>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbLd([
              { name: "Guides", path: "/guides" },
              { name: "Articles", path: "/guides/articles" },
              { name: post.title[locale], path: `/guides/articles/${post.slug}` },
            ], locale),
          ),
        }}
      />
    </Container>
  );
}
