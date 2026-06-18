import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Homix is committed to digital accessibility for all visitors.",
};

export default function AccessibilityPage() {
  return <LegalLayout doc="accessibility" />;
}
