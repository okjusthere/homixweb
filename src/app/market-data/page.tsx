import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { marketAreas } from "@/data/market-stats";
import { getLocale, getT } from "@/lib/i18n";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/market-data",
    locale,
    title: {
      en: "New York Housing Market Data — Prices by Area",
      zh: "纽约房价与市场数据——曼哈顿、法拉盛、长岛、布鲁克林",
    },
    description: {
      en: "Living market-data pages for Manhattan, Flushing, Long Island, and Brooklyn — median prices, price per square foot, and trends, refreshed from sourced reports.",
      zh: "持续更新的纽约房价数据页:曼哈顿、法拉盛、长岛、布鲁克林的中位价、每平方英尺价格与趋势,全部来自有出处的市场报告。",
    },
  });
}

export default async function MarketDataIndexPage() {
  const { locale } = await getT();
  const zh = locale === "zh";

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: marketAreas.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title[locale],
      url: absUrl(`/market-data/${a.slug}`),
    })),
  };

  const df = new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-3xl">
        <Eyebrow>{zh ? "市场数据" : "Market Data"}</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
          {zh ? "纽约房价,一页看清" : "New York prices, one page per market"}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          {zh
            ? "每个市场一个固定页面,数字全部来自有出处的报告,按季度刷新——收藏一次,常年有效。"
            : "One stable page per market. Every number traces to a sourced report and refreshes quarterly — bookmark once, current all year."}
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {marketAreas.map((a) => (
          <Link
            key={a.slug}
            href={`/market-data/${a.slug}`}
            className="group rounded-sm border border-line bg-surface p-7 transition-colors hover:border-bronze/50"
          >
            <p className="font-serif text-2xl leading-snug text-ink group-hover:text-bronze">
              {a.title[locale]}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {a.description[locale]}
            </p>
            <p className="mt-4 text-xs text-muted/80">
              {zh ? "数据更新于" : "Refreshed"} {df.format(new Date(a.updated))}
            </p>
          </Link>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListLd) }}
      />
    </Container>
  );
}
