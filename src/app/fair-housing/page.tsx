import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/fair-housing",
    locale,
    title: { en: "Fair Housing & Equal Opportunity", zh: "公平住房与平等机会" },
    description: {
      en: "Homix Realty Inc. is committed to the Fair Housing Act and equal housing opportunity, serving every client fairly, consistently, and lawfully.",
      zh: "Homix Realty Inc. 遵守《公平住房法》，致力于公平住房与平等机会，以公平、一致、合法的方式服务每一位客户。",
    },
  });
}

export default function FairHousingPage() {
  return <LegalLayout doc="fair-housing" />;
}
