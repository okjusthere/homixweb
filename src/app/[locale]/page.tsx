import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { Pillars } from "@/components/home/Pillars";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { Neighborhoods } from "@/components/home/Neighborhoods";
import { ReachBand } from "@/components/home/ReachBand";
import { Testimonials } from "@/components/home/Testimonials";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { ContactBand } from "@/components/home/ContactBand";
import { getRouteLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// The org-level RealEstateAgent + WebSite JSON-LD moved to the root layout
// (src/app/layout.tsx) so every page carries the entity signal, not just "/".

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const md = pageMetadata({
    path: "/",
    locale,
    title: {
      en: "Homix — New York Real Estate | Bilingual Brokerage",
      zh: "Homix — 纽约华人房产平台｜买房·新盘·社区指南",
    },
    description: {
      en: "Homix is a media-first New York real estate brokerage: homes for sale, new developments, neighborhood guides, and bilingual (English/Chinese) advisors across NYC and Long Island.",
      zh: "Homix 是媒体驱动的纽约房产经纪公司：纽约买房、曼哈顿新盘、社区与学区指南，中英双语持牌经纪人服务纽约与长岛华人。",
    },
  });
  // Homepage title is absolute — the root "%s · Homix" template would
  // double-brand it.
  return { ...md, title: { absolute: md.title as string } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  return (
    <>
      <Hero locale={locale} />
      <BrandStory locale={locale} />
      <Pillars locale={locale} />
      <StatsBand locale={locale} />
      <FeaturedListings locale={locale} />
      <Neighborhoods locale={locale} />
      <ReachBand locale={locale} />
      <Testimonials locale={locale} />
      <TeamTeaser locale={locale} />
      <ContactBand locale={locale} />
    </>
  );
}
