import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Homix is committed to digital accessibility for all visitors.",
};

export default function AccessibilityPage() {
  return (
    <PagePlaceholder eyebrow="Legal" title="Accessibility Statement">
      Homix is committed to meeting WCAG 2.2 AA. A full accessibility statement
      with an accommodation contact will be published here before launch. If you
      need assistance, please reach out — we&rsquo;ll help directly.
    </PagePlaceholder>
  );
}
