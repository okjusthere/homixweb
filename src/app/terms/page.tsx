import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the Homix website.",
};

export default function TermsPage() {
  return (
    <PagePlaceholder eyebrow="Legal" title="Terms of Use">
      Terms of use, including a listing-accuracy disclaimer and required state
      agency disclosures, will be published here before launch. Please have
      counsel review the final text.
    </PagePlaceholder>
  );
}
