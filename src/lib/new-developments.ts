import { featuredDevelopments } from "@/data/featured-developments";
import type { FeaturedDevelopment } from "@/data/featured-developments";
import type { Locale } from "@/lib/i18n";

export const newDevelopmentBasePath = "/NewDevelopment";

export function newDevelopmentHref(slug: string) {
  return `${newDevelopmentBasePath}/${slug}`;
}

export function getDevelopment(slug: string): FeaturedDevelopment | undefined {
  return featuredDevelopments.find((building) => building.slug === slug);
}

const imagePool = [
  {
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1800&q=82",
    alt: "Lower Manhattan high-rise skyline at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1800&q=82",
    alt: "Tribeca and downtown New York architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&w=1800&q=82",
    alt: "Upper West Side residential towers near Central Park",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=82",
    alt: "Manhattan office and residential skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1800&q=82",
    alt: "New York city avenue lined with tall buildings",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    alt: "Warm modern residential interior",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Long_Island_City_Skyline_2026.jpg/1280px-Long_Island_City_Skyline_2026.jpg",
    alt: "Long Island City skyline",
  },
] as const;

function hashSlug(slug: string) {
  return [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function getDevelopmentImages(building: FeaturedDevelopment, count = 4) {
  const seed = hashSlug(building.slug);
  return Array.from({ length: count }, (_, i) => imagePool[(seed + i) % imagePool.length]);
}

export function priceLead(building: FeaturedDevelopment) {
  return building.priceBands[0]?.price ?? "By unit";
}

export function layoutLead(building: FeaturedDevelopment) {
  return building.priceBands.map((band) => band.layout).slice(0, 4).join(" · ");
}

export function formatProjectScale(building: FeaturedDevelopment, locale: Locale) {
  if (locale === "zh") {
    return `${building.facts.stories} 层 · ${building.facts.units} 户 · ${building.facts.built}`;
  }
  return `${building.facts.stories} stories · ${building.facts.units} residences · ${building.facts.built}`;
}

export function developmentIntro(building: FeaturedDevelopment, locale: Locale) {
  const architect = building.facts.architect ? `, architecture by ${building.facts.architect}` : "";
  const interiors = building.facts.interiors ? `, interiors by ${building.facts.interiors}` : "";
  const developer = building.facts.developer ? ` Developed by ${building.facts.developer}.` : "";

  if (locale === "zh") {
    const zhArchitect = building.facts.architect
      ? `建筑设计由 ${building.facts.architect} 操刀`
      : "建筑团队信息以项目方披露为准";
    const zhInteriors = building.facts.interiors
      ? `，室内设计来自 ${building.facts.interiors}`
      : "";
    const zhDeveloper = building.facts.developer
      ? `开发商为 ${building.facts.developer}。`
      : "";

    return `${building.name} 是位于 ${building.area} 的新盘项目，规模为 ${building.facts.stories} 层、${building.facts.units} 户。${zhArchitect}${zhInteriors}。${zhDeveloper}它适合被当作一个完整的生活场景来看：地段、建筑团队、户型预算和未来转手辨识度，需要放在一起判断。`;
  }

  return `${building.name} is a ${building.facts.stories}-story, ${building.facts.units}-residence project in ${building.area}${architect}${interiors}.${developer} Read it as a complete living proposition: location, architecture, floor-plan mix, monthly carrying cost, and long-term recognizability all matter together.`;
}

export function editorialAngles(building: FeaturedDevelopment, locale: Locale) {
  if (locale === "zh") {
    return [
      {
        title: "看地段",
        body: building.transit,
      },
      {
        title: "看建筑",
        body: `${building.facts.status}。${building.facts.architect ? `建筑设计：${building.facts.architect}。` : ""}${building.facts.interiors ? `室内：${building.facts.interiors}。` : ""}`,
      },
      {
        title: "看预算",
        body: `当前可参考户型包括 ${layoutLead(building)}，入门价格区间从 ${priceLead(building)} 开始。物业费和地产税要按具体单元核验。`,
      },
    ];
  }

  return [
    {
      title: "Location",
      body: building.transit,
    },
    {
      title: "Architecture",
      body: `${building.facts.status}. ${building.facts.architect ? `Architecture: ${building.facts.architect}.` : ""} ${building.facts.interiors ? `Interiors: ${building.facts.interiors}.` : ""}`.trim(),
    },
    {
      title: "Budget",
      body: `Reference plans include ${layoutLead(building)}. Current entry pricing begins around ${priceLead(building)}, with common charges and taxes verified unit by unit.`,
    },
  ];
}

export function buyerFit(building: FeaturedDevelopment, locale: Locale) {
  const isDowntown = ["Tribeca", "Financial District", "Two Bridges", "Lower East Side", "SoHo", "Hudson Square"].includes(building.area);
  const isPark = ["Upper West Side", "Lincoln Square", "Midtown", "Sutton Place"].includes(building.area);
  const isLic = building.borough === "Queens";

  if (locale === "zh") {
    if (isLic) return "适合想要新楼、强交通、靠近曼哈顿但预算更理性的买家。";
    if (isDowntown) return "适合重视下城生活、金融/科技通勤、餐饮和转售流动性的买家。";
    if (isPark) return "适合看重中央公园、经典纽约地标感和高端全服务楼宇的买家。";
    return "适合希望在曼哈顿核心区持有新盘资产，同时需要完整楼宇配套的买家。";
  }

  if (isLic) return "Best for buyers who want new construction, fast transit, and Manhattan proximity with a more rational entry point.";
  if (isDowntown) return "Best for buyers who value downtown life, finance or tech commutes, restaurants, and resale liquidity.";
  if (isPark) return "Best for buyers drawn to Central Park access, landmark New York addresses, and full-service luxury buildings.";
  return "Best for buyers who want a core Manhattan new-development asset with a complete amenity package.";
}
