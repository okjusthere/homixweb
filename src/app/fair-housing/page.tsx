import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Fair Housing",
  description:
    "Homix supports the Fair Housing Act and equal opportunity in housing.",
};

export default function FairHousingPage() {
  return <LegalLayout doc="fair-housing" />;
}
