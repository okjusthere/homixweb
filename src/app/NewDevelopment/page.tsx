import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentCover } from "@/data/new-development-media";
import { NewDevSearch, type DevCard } from "@/components/new-development/NewDevSearch";
import { getT } from "@/lib/i18n";
import {
  formatProjectScale,
  newDevelopmentHref,
  priceLead,
} from "@/lib/new-developments";

export const metadata: Metadata = {
  title: "New Development",
  description:
    "A curated Homix guide to New York new development condos, with individual project pages for client sharing.",
};

export default async function NewDevelopmentPage() {
  const { locale } = await getT();
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
      };
    });

  const copy = {
    eyebrow: "New Development",
    title: zh ? "纽约新盘精选" : "New York New Development",
    lead: zh
      ? "每个新盘都有独立项目页，方便快速查找、发给客户，并对比地段、楼宇背景、户型和预算。"
      : "A searchable, shareable index of the New York new developments Homix buyers ask about most.",
  };

  const labels = {
    placeholder: zh ? "搜索楼盘名 / 区域 / 地址…" : "Search by building, area, or address…",
    view: zh ? "查看项目" : "View",
    starting: zh ? "参考价" : "From",
    mediaPending: zh ? "官方图片待核验" : "Official media pending",
    stories: zh ? "楼层" : "Stories",
    units: zh ? "户数" : "Units",
    year: zh ? "年份" : "Year",
    copy: zh ? "复制链接" : "Copy link",
    copied: zh ? "已复制 ✓" : "Copied ✓",
    noResults: zh ? "没有匹配的楼盘，换个关键词试试。" : "No matching buildings — try another keyword.",
    showing: zh ? "显示" : "Showing",
  };

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-tight text-ink sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{copy.lead}</p>
            <p className="mt-6 text-sm text-muted">
              {featuredDevelopments.length} {zh ? "个项目 · Manhattan · Long Island City" : "projects · Manhattan · Long Island City"}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <Eyebrow>{zh ? "全部项目（A–Z）" : "All Projects (A–Z)"}</Eyebrow>
        <div className="mt-6">
          <NewDevSearch buildings={cards} labels={labels} />
        </div>
      </Container>
    </>
  );
}
