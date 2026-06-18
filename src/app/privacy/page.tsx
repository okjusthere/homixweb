import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Homix collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <PagePlaceholder eyebrow="Legal" title="Privacy Policy">
      A full privacy policy (including CCPA/CPRA notices, a Do-Not-Sell-or-Share
      option, and Global Privacy Control support) will be published here before
      launch. Please have counsel review the final text.
    </PagePlaceholder>
  );
}
