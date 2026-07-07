import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/terms",
    locale,
    title: { en: "Terms of Use", zh: "服务条款" },
    description: {
      en: "These Terms of Use govern your use of the Homix Realty Inc. website and online content, including listings information and disclaimers.",
      zh: "本服务条款规范你对 Homix Realty Inc. 网站及线上内容的使用，包括房源信息、免责声明与知识产权等重要条款。",
    },
  });
}

export default function TermsPage() {
  return <LegalLayout doc="terms" />;
}
