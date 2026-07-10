import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/listings/PhotoCredit";
import { getRouteLocale, getT } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { absUrl, breadcrumbLd, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";
import { neighborhoodGlance, neighborhoods, siteConfig } from "@/lib/site";

function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}

/** First complete sentence of guide copy — used as the meta description. */
function firstSentence(text: string, zh = false) {
  const end = zh ? text.indexOf("。") : text.search(/\.(?=\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
}

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) return { title: "Neighborhood not found" };
  const locale = await getRouteLocale(params);
  const introEn = firstSentence(n.guide?.en ?? n.blurb);
  const introZh = n.guide ? firstSentence(n.guide.zh, true) : "";
  return pageMetadata({
    path: `/neighborhoods/${slug}`,
    locale,
    title: {
      en: `${n.name} — Neighborhood Guide`,
      zh: `${n.name} 买房与社区指南`,
    },
    description: {
      en:
        introEn.length <= 170
          ? introEn
          : `${n.blurb} Homix's ${n.name} guide covers homes, transit, schools, and daily life.`,
      zh:
        introZh && introZh.length <= 110
          ? introZh
          : `${n.name} 买房与社区指南：住房类型、交通通勤、学区与生活配套，Homix 提供中英双语解析。`,
    },
    image: n.image,
    ogType: "article",
  });
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) notFound();

  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const paragraphs = (n.guide?.[locale] ?? n.blurb).split("\n\n");
  const glance = neighborhoodGlance[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${n.name}, New York`,
    description: n.guide?.[locale] ?? n.blurb,
    url: absUrl(localizePath(locale, `/neighborhoods/${n.slug}`)),
    image: absUrl(n.image),
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
  };
  const crumbs = breadcrumbLd([
    { name: "Neighborhoods", path: "/neighborhoods" },
    { name: n.name, path: `/neighborhoods/${n.slug}` },
  ], locale);

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/neighborhoods"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {t.neighborhoodsPage.backToAll}
        </Link>

        <div className="mt-6">
          <Eyebrow>{t.neighborhoodsPage.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {n.name}
          </h1>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-line/50">
          <Image
            src={n.image}
            alt={`${n.name}, New York`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        {n.photoCredit && (
          <PhotoCredit
            label={t.neighborhoodsPage.photoBy}
            credit={n.photoCredit}
            url={n.photoCreditUrl}
          />
        )}

        <div className="mt-10 space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink/85">
              {p}
            </p>
          ))}
        </div>

        {glance && (
          <div className="mt-12 rounded-sm border border-line bg-surface p-7 sm:p-8">
            <p className="eyebrow">{t.neighborhoodsPage.glanceTitle}</p>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {(
                [
                  ["transit", glance.transit],
                  ["schools", glance.schools],
                  ["character", glance.character],
                  ["bestFor", glance.bestFor],
                ] as const
              ).map(([key, val]) => (
                <div key={key}>
                  <dt className="eyebrow text-muted">
                    {t.neighborhoodsPage.glanceLabels[key]}
                  </dt>
                  <dd className="mt-1.5 text-base leading-relaxed text-ink/85">
                    {val[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-8">
          <Button href={`/listings?city=${encodeURIComponent(n.name)}`}>
            {t.neighborhoodsPage.viewHomes} →
          </Button>
          <Button href={siteConfig.contact.phoneHref} variant="outline">
            {siteConfig.contact.phone}
          </Button>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(crumbs) }}
      />
    </Container>
  );
}
