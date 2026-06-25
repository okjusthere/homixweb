import media from "./new-development-media.json";

export type DevelopmentImage = {
  id: string;
  src: string;
  caption: string;
  alt: string;
  sourceUrl: string;
  width: number;
  height: number;
};

export type DevelopmentFloorPlan = {
  id: string;
  src: string;
  title: string;
  sourceUrl: string;
  width: number;
  height: number;
};

export type DevelopmentMedia = {
  images: DevelopmentImage[];
  floorPlans: DevelopmentFloorPlan[];
};

export const newDevelopmentMedia = media as Record<string, DevelopmentMedia>;

export function getDevelopmentMedia(slug: string): DevelopmentMedia {
  return newDevelopmentMedia[slug] ?? { images: [], floorPlans: [] };
}

export function getDevelopmentCover(slug: string): DevelopmentImage | undefined {
  return getDevelopmentMedia(slug).images[0];
}
