import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { postsByTopic } from "@/content/journal/posts";
import { getGuide } from "@/content/guides";
import { topics, getTopic } from "@/content/journal/topics";
import { getAgents } from "@/lib/agents";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { absUrl, breadcrumbLd, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return { title: "Topic not found" };
  const locale = await getRouteLocale(params);
  const count = postsByTopic(slug).length;
  return pageMetadata({
    path: `/guides/topics/${slug}`,
    locale,
    title: {
      en: `${topic.label.en} — NYC Real Estate Guides & Articles`,
      zh: `${topic.label.zh}——纽约买房知识与文章`,
    },
    description: {
      en: `${topic.blurb.en} ${count} bilingual articles from the Homix team.`,
      zh: `${topic.blurb.zh} Homix 团队 ${count} 篇中英双语文章。`,
    },
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const locale = await getRouteLocale(params);
  const zh = locale === "zh";
  const posts = postsByTopic(slug);
  const pillar = topic.pillarSlug ? getGuide(topic.pillarSlug) : undefined;
  const agents = await getAgents();
  const authorName = (s: string) => agents.find((a) => a.slug === s)?.name ?? "Homix";
  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  const copy = {
    eyebrow: zh ? "主题" : "Topic",
    backToAll: zh ? "返回置业指南" : "Back to Guides",
    pillarCta: zh ? "先读这份完整指南" : "Start with the complete guide",
    dataCta: zh ? "查看市场数据" : "See market data",
    articles: zh ? "相关文章" : "Articles",
    empty: zh ? "该主题的文章即将上线。" : "Articles for this topic are coming soon.",
  };

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/guides"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {copy.backToAll}
        </Link>

        <div className="mt-6">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {topic.label[locale]}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{topic.blurb[locale]}</p>
        </div>

        {/* Authority hub link — the pillar guide or the data hub */}
        {(pillar || topic.hubHref) && (
          <div className="mt-6 rounded-sm border border-line bg-surface p-6">
            {pillar ? (
              <>
                <p className="font-serif text-xl leading-snug text-ink">
                  {pillar.title[locale]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description[locale]}
                </p>
                <div className="mt-4">
                  <Button href={`/guides/${pillar.slug}`}>{copy.pillarCta}</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <p className="font-serif text-lg text-ink">
                  {zh ? "各区房价与市场数据" : "Prices & market data by area"}
                </p>
                <Button href={topic.hubHref!} variant="outline">
                  {copy.dataCta}
                </Button>
              </div>
            )}
          </div>
        )}

        <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight text-ink">
          {copy.articles}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-muted">{copy.empty}</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/guides/articles/${p.slug}`}
                className="group overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-bronze/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-line/50">
                  <Image
                    src={p.cover}
                    alt={p.title[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="font-serif text-lg leading-snug text-ink group-hover:text-bronze">
                    {p.title[locale]}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {p.excerpt[locale]}
                  </p>
                  <p className="mt-3 text-xs text-muted/80">
                    {authorName(p.authorSlug)}
                    {p.contentKind === "timely" ? ` · ${df.format(new Date(p.date))}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: topic.label[locale],
            description: topic.blurb[locale],
            url: absUrl(localizePath(locale, `/guides/topics/${topic.slug}`)),
            hasPart: posts.map((p) => ({
              "@type": "Article",
              headline: p.title[locale],
              url: absUrl(localizePath(locale, `/guides/articles/${p.slug}`)),
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbLd([
              { name: zh ? "置业指南" : "Guides", path: "/guides" },
              { name: topic.label[locale], path: `/guides/topics/${topic.slug}` },
            ], locale)
          ),
        }}
      />
    </Container>
  );
}
