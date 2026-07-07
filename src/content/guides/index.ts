import type { Guide } from "./types";
import { buyingGuide } from "./buying-in-nyc";
import { rentingGuide } from "./renting-in-nyc";
import { newImmigrantsGuide } from "./new-immigrants";
import { internationalStudentsGuide } from "./international-students";
import { taxesGuide } from "./property-taxes";

export type { Guide, GuideFaq, GuideSection } from "./types";

/** Order controls the /guides index page. */
export const guides: Guide[] = [
  buyingGuide,
  rentingGuide,
  newImmigrantsGuide,
  internationalStudentsGuide,
  taxesGuide,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
