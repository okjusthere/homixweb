import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentCover } from "@/data/new-development-media";
import { NewDevSearch, type DevCard } from "@/components/new-development/NewDevSearch";
import { getRouteLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import {
  formatProjectScale,
  newDevelopmentHref,
  priceLead,
} from "@/lib/new-developments";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/NewDevelopment",
    locale,
    title: {
      en: "NYC New Developments — New Construction Condos",
      zh: "纽约新盘精选——曼哈顿与长岛市新建公寓",
    },
    description: {
      en: "A curated guide to New York new development condos — Manhattan and Long Island City new construction projects with pricing, scale, and shareable pages.",
      zh: "精选纽约新盘：曼哈顿与长岛市（LIC）新建公寓项目，含参考价格、楼盘规模与背景，每个新盘均有独立页面，方便对比并分享给客户。",
    },
  });
}

export default async function NewDevelopmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ purchase?: string }>;
}) {
  const locale = await getRouteLocale(params);
  const query = await searchParams;
  const zh = locale === "zh";

  const cards: DevCard[] = [...featuredDevelopments]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((b) => {
      const cover = getDevelopmentCover(b.slug);
      return {
        slug: b.slug,
        name: b.name,
        area: b.area,
        borough: b.borough,
        address: b.address,
        price: priceLead(b),
        scale: formatProjectScale(b, locale),
        cover: cover ? { src: cover.src, alt: cover.alt } : null,
        stories: b.facts.stories,
        units: b.facts.units,
        built: b.facts.built,
        href: newDevelopmentHref(b.slug),
        flexiblePayment: b.flexiblePayment === true,
      };
    });

  const copy = {
    eyebrow: "New Development",
    title: zh ? "纽约新盘精选" : "New York New Development",
    lead: zh
      ? "每个新盘都有独立项目页，方便对比地段、楼宇背景、户型和预算。"
      : "A searchable, shareable index of the New York new developments Homix buyers ask about most.",
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cards.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: absUrl(localizePath(locale, c.href)),
    })),
  };

  const labels = {
    placeholder: zh ? "搜索楼盘名 / 区域 / 地址…" : "Search by building, area, or address…",
    view: zh ? "查看项目" : "View",
    starting: zh ? "参考价" : "From",
    mediaPending: zh ? "官方图片即将上线" : "Photos coming soon",
    stories: zh ? "楼层" : "Stories",
    units: zh ? "户数" : "Units",
    year: zh ? "年份" : "Year",
    copy: zh ? "复制链接" : "Copy link",
    copied: zh ? "已复制 ✓" : "Copied ✓",
    noResults: zh ? "没有匹配的楼盘，换个关键词试试。" : "No matching buildings — try another keyword.",
    showing: zh ? "显示" : "Showing",
    flexibleOnly: zh ? "灵活支付" : "Flexible payment",
    allProjects: zh ? "全部新盘" : "All projects",
    flexibleBadge: zh ? "支持灵活支付" : "Flexible payment",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListLd) }}
      />
      <section className="border-b border-line bg-surface">
        <Container className="py-8 sm:py-10">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-normal leading-[1.0] tracking-tight text-ink sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.lead}</p>
          <p className="mt-3 text-sm text-muted">
            {featuredDevelopments.length} {zh ? "个项目 · Manhattan · Queens · Brooklyn · A–Z" : "projects · Manhattan · Queens · Brooklyn · A–Z"}
          </p>
        </Container>
      </section>

      <Container className="pb-14 pt-6">
        <NewDevSearch
          buildings={cards}
          labels={labels}
          locale={locale}
          initialFlexibleOnly={query.purchase === "flexible" || query.purchase === "rmb"}
        />
      </Container>
    </>
  );
}
