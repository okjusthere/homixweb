import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { getRouteLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/standard-operating-procedures",
    locale,
    title: { en: "Standardized Operating Procedures", zh: "标准操作流程" },
    description: {
      en: "Homix Realty Inc. maintains these standardized operating procedures for prospective homebuyers under New York Real Property Law section 442-h.",
      zh: "Homix Realty Inc. 依据纽约《不动产法》第 442-h 条公开标准操作流程，说明身份证明、独家买方经纪协议与贷款预批等要求。",
    },
  });
}

export default async function StandardOperatingProceduresPage({ params }: { params: Promise<{ locale: string }> }) {
  return <LegalLayout doc="standard-operating-procedures" locale={await getRouteLocale(params)} />;
}
