import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { getRouteLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/accessibility",
    locale,
    title: { en: "Accessibility Statement", zh: "无障碍声明" },
    description: {
      en: "Homix is committed to digital accessibility for visitors of all abilities. Learn about our WCAG 2.2 AA standard and how to reach us with feedback.",
      zh: "Homix 致力于让所有能力的用户都能无障碍访问本网站，以 WCAG 2.2 AA 级为标准，并欢迎你随时提出无障碍反馈。",
    },
  });
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  return <LegalLayout doc="accessibility" locale={await getRouteLocale(params)} />;
}
