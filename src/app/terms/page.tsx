import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the Homix website.",
};

export default function TermsPage() {
  return <LegalLayout doc="terms" />;
}
