import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoCredit } from "@/components/listings/PhotoCredit";
import { getLocale, getT } from "@/lib/i18n";
import { neighborhoods } from "@/lib/site";
import { absUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/neighborhoods",
    locale,
    title: {
      en: "NYC Neighborhood Guides — Queens, Manhattan & Long Island",
      zh: "纽约社区指南——学区、通勤与房价解读",
    },
    description: {
      en: "Local guides to the New York neighborhoods Homix knows best — schools, commutes, housing stock, and prices across Queens, Manhattan, and Long Island.",
      zh: "纽约买房先看社区：Homix 深耕的法拉盛、皇后区、曼哈顿与长岛社区指南，逐区解读学区、通勤、房型与价格，帮你选对适合的家。",
    },
  });
}

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function NeighborhoodsPage() {
  const { locale, t } = await getT();
  const zh = locale === "zh";
  const regions: [string, string][] = [
    ["Queens", zh ? "皇后区" : "Queens"],
    ["Long Island", zh ? "长岛" : "Long Island"],
    ["Manhattan", zh ? "曼哈顿" : "Manhattan"],
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: neighborhoods.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: n.name,
      url: absUrl(`/neighborhoods/${n.slug}`),
    })),
  };

  return (
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <div className="max-w-2xl">
        <Eyebrow>{t.neighborhoodsPage.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.neighborhoodsPage.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {t.neighborhoodsPage.lead}
        </p>
      </div>

      {regions.map(([key, label]) => {
        const hoods = neighborhoods.filter((n) => n.region === key);
        if (hoods.length === 0) return null;
        return (
          <section key={key} className="mt-14 first:mt-12">
            <h2 className="font-serif text-2xl font-normal tracking-tight text-ink sm:text-[1.75rem]">
              {label}
              <span className="ml-3 align-middle text-sm text-muted">
                {hoods.length}
              </span>
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {hoods.map((n, i) => (
                <Reveal key={n.slug} delay={(i % 3) * 60}>
                  <Link
                    href={`/neighborhoods/${n.slug}`}
                    className="group block focus-visible:outline-none"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line/50">
                      <Image
                        src={n.image}
                        alt={`${n.name}, New York`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="font-serif text-2xl text-paper">{n.name}</p>
                        <p className="mt-1 text-sm text-paper/80">{n.blurb}</p>
                      </div>
                    </div>
                  </Link>
                  {n.photoCredit && (
                    <PhotoCredit
                      label={t.neighborhoodsPage.photoBy}
                      credit={n.photoCredit}
                      url={n.photoCreditUrl}
                    />
                  )}
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* How we read a neighborhood */}
      <section className="mt-20 border-t border-line pt-16 sm:mt-24 sm:pt-20">
        <div className="max-w-2xl">
          <Eyebrow>{t.neighborhoodsPage.whyEyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.neighborhoodsPage.whyTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {t.neighborhoodsPage.whyBody}
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.neighborhoodsPage.methodology.map((m, i) => (
            <Reveal key={m.title} delay={i * 60} className="bg-surface">
              <div className="h-full p-7">
                <p className="font-serif text-2xl text-bronze/60">{n2(i)}</p>
                <p className="mt-3 font-serif text-lg leading-snug text-ink">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
