import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Homix collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return <LegalLayout doc="privacy" />;
}
