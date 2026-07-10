import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/journal/Markdown";
import { getMarketArea, marketAreas } from "@/data/market-stats";
import { getJournalPost } from "@/content/journal/posts";
import { getRouteLocale, getT } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import {
  absUrl,
  breadcrumbLd,
  faqLd,
  jsonLd as serializeJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return marketAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getMarketArea(slug);
  if (!area) return { title: "Market data not found" };
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: `/market-data/${slug}`,
    locale,
    title: area.title,
    description: area.description,
    ogType: "article",
  });
}

export default async function MarketDataPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const area = getMarketArea(slug);
  if (!area) notFound();

  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const zh = locale === "zh";
  const reports = area.reportSlugs
    .map((s) => getJournalPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const copy = {
    eyebrow: zh ? "市场数据" : "Market Data",
    updated: zh ? "数据更新于" : "Data refreshed",
    source: zh ? "数据来源" : "Source",
    asOf: zh ? "统计期" : "As of",
    faq: zh ? "数据速答" : "Quick answers",
    reports: zh ? "完整市场报告" : "Full market reports",
    explore: zh ? "相关页面" : "Explore",
    backToAll: zh ? "全部市场数据" : "All market data",
    methodology: zh
      ? "说明：本页数字摘自下方引用的 Homix 市场报告及其标注的原始数据源，按统计期呈现；市场数据随时间变化，交易决策前请与顾问核实最新数字。"
      : "Note: figures are lifted from the cited Homix market reports and their named primary sources, presented per stated period. Markets move — verify current numbers with an advisor before acting.",
    talk: zh ? "咨询双语顾问" : "Ask a bilingual advisor",
  };

  // Distinct source labels across every table on the page (for the visible
  // Sources block + Dataset citation — makes provenance explicit for AI engines).
  const distinctSources = Array.from(
    new Set(area.tables.map((t) => t.source))
  );

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: area.title[locale],
    description: area.description[locale],
    url: absUrl(localizePath(locale, `/market-data/${area.slug}`)),
    dateModified: area.updated,
    creator: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "RealEstateAgent",
      name: siteConfig.legalName,
    },
    citation: distinctSources,
    isBasedOn: reports.map((p) =>
      absUrl(localizePath(locale, `/guides/articles/${p.slug}`)),
    ),
    inLanguage: zh ? "zh-Hans" : "en",
  };

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/market-data"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {copy.backToAll}
        </Link>

        <div className="mt-6">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {area.title[locale]}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {copy.updated} {df.format(new Date(area.updated))} · Homix
          </p>
        </div>

        <div className="mt-8">
          <Markdown>{area.intro[locale]}</Markdown>
        </div>

        {area.tables.map((table) => (
          <section key={table.title.en} className="mt-12">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink">
              {table.title[locale]}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-sm border border-line">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface text-left">
                    {table.columns.map((c) => (
                      <th key={c.en} className="px-4 py-3 font-medium text-ink">
                        {c[locale]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.label.en} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3 text-ink">{row.label[locale]}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-4 py-3 font-mono text-[13px] text-ink/90">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted/80">
              {copy.asOf} {table.asOf} · {copy.source}: {table.source}
            </p>
          </section>
        ))}

        {area.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink">
              {copy.faq}
            </h2>
            <div className="mt-6 space-y-7">
              {area.faq.map((f) => (
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

        {/* Explicit sources block — provenance for readers and AI engines */}
        <div className="mt-12 rounded-sm border border-line bg-surface px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-muted">
            {zh ? "数据来源" : "Data sources"}
          </p>
          <ul className="mt-2 space-y-1">
            {distinctSources.map((src) => (
              <li key={src} className="text-sm leading-relaxed text-ink/80">
                {src}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted/80">{copy.methodology}</p>

        {reports.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-normal leading-tight tracking-tight text-ink">
              {copy.reports}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {reports.map((p) => (
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
                </Link>
              ))}
            </div>
          </section>
        )}

        {area.relatedLinks.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="text-sm text-muted">{copy.explore}:</span>
            {area.relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-bronze underline-offset-4 hover:underline"
              >
                {l.label[locale]}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 rounded-sm border border-line bg-surface p-8 text-center">
          <p className="font-serif text-2xl text-ink">{t.contactBand.title}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Button href="/contact">{copy.talk}</Button>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(datasetLd) }}
      />
      {area.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              faqLd(
                area.faq.map((f) => ({
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
              { name: zh ? "市场数据" : "Market Data", path: "/market-data" },
              { name: area.name[locale], path: `/market-data/${area.slug}` },
            ], locale)
          ),
        }}
      />
    </Container>
  );
}
