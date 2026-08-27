import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { Container } from "@/components/ui/Container";
import { NewDevSearch, type DevCard } from "@/components/new-development/NewDevSearch";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentCover } from "@/data/new-development-media";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { formatProjectScale, newDevelopmentHref, priceLead } from "@/lib/new-developments";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/rmb-homes",
    locale,
    title: {
      en: "New York Homes with RMB Purchase Options",
      zh: "纽约人民币房源——可使用人民币付款的新盘",
    },
    description: {
      en: "A curated Homix index of New York condominium projects with currently confirmed RMB purchase options, each linked to a bilingual project guide.",
      zh: "Homix 整理可使用人民币付款的纽约新盘，涵盖曼哈顿、皇后区与布鲁克林，并链接至每个项目的中英双语独立介绍页。",
    },
  });
}

export default async function RmbHomesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const zh = locale === "zh";
  const developments = featuredDevelopments
    .filter((development) => development.rmbEligible)
    .sort((a, b) => a.name.localeCompare(b.name));

  const cards: DevCard[] = developments.map((development) => {
    const cover = getDevelopmentCover(development.slug);
    return {
      slug: development.slug,
      name: development.name,
      area: development.area,
      borough: development.borough,
      address: development.address,
      price: priceLead(development),
      scale: formatProjectScale(development, locale),
      cover: cover ? { src: cover.src, alt: cover.alt } : null,
      stories: development.facts.stories,
      units: development.facts.units,
      built: development.facts.built,
      href: newDevelopmentHref(development.slug),
      rmbEligible: true,
    };
  });

  const labels = {
    placeholder: zh ? "搜索楼盘名 / 区域 / 地址…" : "Search by building, area, or address…",
    view: zh ? "查看项目" : "View project",
    starting: zh ? "参考价" : "From",
    mediaPending: zh ? "官方图片即将上线" : "Photos coming soon",
    stories: zh ? "楼层" : "Stories",
    units: zh ? "户数" : "Units",
    year: zh ? "年份" : "Year",
    copy: zh ? "复制链接" : "Copy link",
    copied: zh ? "已复制 ✓" : "Copied ✓",
    noResults: zh ? "没有匹配的项目，换个关键词试试。" : "No matching projects — try another keyword.",
    showing: zh ? "显示" : "Showing",
    rmbOnly: zh ? "人民币房源" : "RMB options",
    allProjects: zh ? "全部新盘" : "All projects",
    rmbBadge: zh ? "人民币" : "RMB option",
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: zh ? "纽约人民币房源" : "New York homes with RMB purchase options",
    itemListElement: cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.name,
      url: absUrl(localizePath(locale, card.href)),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListLd) }}
      />
      <section className="border-b border-line bg-surface">
        <Container className="py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="eyebrow">RMB Purchase Options</p>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl font-normal leading-[1.02] text-ink sm:text-6xl">
                {zh ? "纽约人民币房源" : "New York homes with RMB purchase options"}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                {zh
                  ? "从曼哈顿到皇后区与布鲁克林，集中查看目前确认可使用人民币付款的新建公寓。每个项目都有独立页面，便于比较地段、建筑、户型与预算。"
                  : "A focused index of New York new-development condominiums currently offering RMB purchase options, with a separate bilingual page for every project."}
              </p>
            </div>
            <div className="border-l border-bronze/45 pl-5">
              <p className="font-serif text-4xl text-ink">{developments.length}</p>
              <p className="mt-1 text-sm text-muted">
                {zh ? "个已确认项目" : "currently confirmed projects"}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                {zh
                  ? "可用项目、付款币种与收款方式会调整，认购前以项目方当期书面政策为准。"
                  : "Eligibility, currency, and payment method can change. Confirm the project's current written policy before reservation."}
              </p>
            </div>
          </div>
          <Link
            href="/NewDevelopment?purchase=rmb"
            className="mt-7 inline-flex text-sm font-medium text-bronze transition-colors hover:text-bronze-dark"
          >
            {zh ? "在纽约新盘库中查看筛选结果 →" : "View this filter in the full new-development library →"}
          </Link>
        </Container>
      </section>

      <Container className="pb-16 pt-6">
        <NewDevSearch
          buildings={cards}
          labels={labels}
          locale={locale}
          initialRmbOnly
          showRmbFilter={false}
        />
      </Container>
    </>
  );
}
