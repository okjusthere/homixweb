import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = {
  title: "Fair Housing",
  description:
    "Homix supports the Fair Housing Act and equal opportunity in housing.",
};

export default function FairHousingPage() {
  return (
    <PagePlaceholder eyebrow="Legal" title="Fair Housing & Equal Opportunity">
      Homix is committed to the Fair Housing Act and the Equal Opportunity Act.
      We do not discriminate on the basis of race, color, religion, sex,
      disability, familial status, or national origin. Full disclosures and
      state brokerage notices will be published here before launch.
    </PagePlaceholder>
  );
}
