import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/journal/Markdown";
import { getGuide, guides } from "@/content/guides";
import { getJournalPost } from "@/content/journal/posts";
import { getLocale, getT } from "@/lib/i18n";
import {
  absUrl,
  breadcrumbLd,
  faqLd,
  jsonLd as serializeJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  const locale = await getLocale();
  return pageMetadata({
    path: `/guides/${slug}`,
    locale,
    title: guide.title,
    description: guide.description,
    image: guide.cover,
    ogType: "article",
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { locale, t } = await getT();
  const zh = locale === "zh";
  const related = guide.relatedSlugs
    .map((s) => getJournalPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

  const copy = {
    eyebrow: zh ? "置业指南" : "Guide",
    updated: zh ? "更新于" : "Updated",
    onThisPage: zh ? "本页内容" : "On this page",
    goDeeper: zh ? "深入阅读" : "Go deeper",
    faq: zh ? "常见问题" : "Frequently asked questions",
    backToGuides: zh ? "全部指南" : "All guides",
    disclaimer: zh
      ? "本指南为一般性市场信息,不构成法律、税务、贷款或移民建议;具体交易请咨询相应持牌专业人士。数据以引用文章的截至日期为准。"
      : "This guide is general market information — not legal, tax, lending, or immigration advice. Consult licensed professionals for your situation. Figures are as of the dates cited in the linked reports.",
    reviewed: zh
      ? `本指南由 Homix 持牌经纪团队复审(记录经纪 ${siteConfig.legal.brokerOfRecord},${siteConfig.legal.brokerLicense})。税务、移民、法律与贷款细节请以持牌专业人士的意见为准。`
      : `Reviewed by the Homix licensed brokerage team (Broker of Record ${siteConfig.legal.brokerOfRecord}, ${siteConfig.legal.brokerLicense}). For tax, immigration, legal, and lending specifics, rely on the relevant licensed professional.`,
    reviewLabel: zh ? "内容复审" : "Content review",
    talk: zh ? "和双语顾问聊聊" : "Talk to a bilingual advisor",
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title[locale],
    description: guide.description[locale],
    ...(guide.cover ? { image: absUrl(guide.cover) } : {}),
    dateModified: guide.updated,
    lastReviewed: guide.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(`/guides/${guide.slug}`) },
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    reviewedBy: {
      "@type": "Organization",
      name: siteConfig.legalName,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: siteConfig.legal.brokerLicense,
      },
    },
    inLanguage: zh ? "zh-Hans" : "en",
  };

  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/guides"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {copy.backToGuides}
        </Link>

        <div className="mt-6">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {guide.title[locale]}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {copy.updated} {df.format(new Date(guide.updated))} · Homix
          </p>
        </div>

        {guide.cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-line/50">
            <Image
              src={guide.cover}
              alt={guide.title[locale]}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8">
          <Markdown>{guide.intro[locale]}</Markdown>
        </div>

        {/* On this page */}
        <nav className="mt-8 rounded-sm border border-line bg-surface p-6">
          <p className="eyebrow mb-3">{copy.onThisPage}</p>
          <ol className="space-y-1.5 text-sm">
            {guide.sections.map((s, i) => (
              <li key={s.heading.en}>
                <a
                  href={`#s${i + 1}`}
                  className="text-ink/80 underline-offset-4 hover:text-bronze hover:underline"
                >
                  {i + 1}. {s.heading[locale]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {guide.sections.map((s, i) => (
          <section key={s.heading.en} id={`s${i + 1}`} className="mt-12 scroll-mt-24">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink sm:text-3xl">
              {s.heading[locale]}
            </h2>
            <div className="mt-4">
              <Markdown>{s.body[locale]}</Markdown>
            </div>
          </section>
        ))}

        {/* FAQ */}
        {guide.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink sm:text-3xl">
              {copy.faq}
            </h2>
            <div className="mt-6 space-y-7">
              {guide.faq.map((f) => (
                <div key={f.question.en}>
                  <h3 className="font-serif text-lg leading-snug text-ink">
                    {f.question[locale]}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {f.answer[locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* YMYL trust signal — visible reviewer credit + schema reviewedBy */}
        <div className="mt-12 rounded-sm border border-line bg-surface px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-muted">{copy.reviewLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{copy.reviewed}</p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted/80">{copy.disclaimer}</p>

        {/* Topic cluster */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink">
              {copy.goDeeper}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/guides/articles/${p.slug}`}
                  className="group rounded-sm border border-line bg-surface p-5 transition-colors hover:border-bronze/50"
                >
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {p.category[locale]}
                  </p>
                  <p className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-bronze">
                    {p.title[locale]}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {p.excerpt[locale]}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 rounded-sm border border-line bg-surface p-8 text-center">
          <p className="font-serif text-2xl text-ink">{t.contactBand.title}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Button href="/contact">{copy.talk}</Button>
            <Button href="/chinese-real-estate-agents-nyc" variant="outline">
              {zh ? "认识双语团队" : "Meet the bilingual team"}
            </Button>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleLd) }}
      />
      {guide.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              faqLd(
                guide.faq.map((f) => ({
                  question: f.question[locale],
                  answer: f.answer[locale],
                }))
              )
            ),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbLd([
              { name: zh ? "置业指南" : "Guides", path: "/guides" },
              { name: guide.title[locale], path: `/guides/${guide.slug}` },
            ])
          ),
        }}
      />
    </Container>
  );
}
