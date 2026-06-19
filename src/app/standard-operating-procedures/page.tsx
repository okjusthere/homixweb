import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata: Metadata = {
  title: "Standardized Operating Procedures",
  description:
    "Homix Realty Inc. standardized operating procedures for prospective homebuyers in New York.",
};

export default function StandardOperatingProceduresPage() {
  return <LegalLayout doc="standard-operating-procedures" />;
}
