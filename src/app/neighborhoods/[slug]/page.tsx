import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/listings/PhotoCredit";
import { getT } from "@/lib/i18n";
import { absUrl, breadcrumbLd, langAlternates } from "@/lib/seo";
import { neighborhoodGlance, neighborhoods, siteConfig } from "@/lib/site";

function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) return { title: "Neighborhood not found" };
  return {
    title: `${n.name} — Neighborhood Guide`,
    description: n.blurb,
    alternates: langAlternates(`/neighborhoods/${slug}`),
    openGraph: { images: [n.image], type: "article" },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) notFound();

  const { locale, t } = await getT();
  const paragraphs = (n.guide?.[locale] ?? n.blurb).split("\n\n");
  const glance = neighborhoodGlance[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${n.name}, New York`,
    description: n.guide?.en ?? n.blurb,
    image: absUrl(n.image),
  };
  const crumbs = breadcrumbLd([
    { name: "Neighborhoods", path: "/neighborhoods" },
    { name: n.name, path: `/neighborhoods/${n.slug}` },
  ]);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </Container>
  );
}
