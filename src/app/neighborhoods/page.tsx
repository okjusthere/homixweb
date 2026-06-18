import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "Local guides to the neighborhoods Homix knows best.",
};

export default function NeighborhoodsPage() {
  return (
    <PagePlaceholder
      eyebrow="Neighborhoods"
      title="Neighborhood guides are on the way."
    >
      Market stats, lifestyle notes, and the homes we&rsquo;re representing in
      each area — a hyper-local view of where we work.
    </PagePlaceholder>
  );
}
