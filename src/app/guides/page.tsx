import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { guides } from "@/content/guides";
import { getLocale, getT } from "@/lib/i18n";
import { absUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/guides",
    locale,
    title: {
      en: "NYC Buying & Renting Guides — Process, Costs, Taxes",
      zh: "纽约置业指南——买房流程、租房、税务与新移民安家",
    },
    description: {
      en: "Evergreen, bilingual guides to buying, renting, taxes, and settling in New York — written for Chinese-speaking buyers, students, and new immigrants.",
      zh: "常读常新的纽约置业指南:买房全流程、租房、房产税务、新移民安家与留学生置业,中英双语。",
    },
  });
}

export default async function GuidesIndexPage() {
  const { locale } = await getT();
  const zh = locale === "zh";

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
        <Eyebrow>{zh ? "置业指南" : "Guides"}</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
          {zh ? "纽约置业指南" : "New York Buying & Living Guides"}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          {zh
            ? "把纽约买房、租房、税务和安家讲透的长期指南——不追热点、持续更新,配套深度文章。"
            : "Evergreen playbooks for buying, renting, taxes, and settling in New York — continuously reviewed, with deep-dive articles behind every topic."}
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </Container>
  );
}
