import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/privacy",
    locale,
    title: { en: "Privacy Policy", zh: "隐私政策" },
    description: {
      en: "This Privacy Policy explains how Homix Realty Inc. collects, uses, and protects your information through this website and related communications.",
      zh: "本隐私政策说明 Homix Realty Inc. 如何通过本网站及相关经纪沟通收集、使用、披露和保护你的个人信息，并介绍你的隐私选择。",
    },
  });
}

export default function PrivacyPage() {
  return <LegalLayout doc="privacy" />;
}
