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

export function priceLead(building: FeaturedDevelopment) {
  return building.priceBands[0]?.price ?? "By unit";
}

export function layoutLead(building: FeaturedDevelopment) {
  return building.priceBands.map((band) => band.layout).slice(0, 4).join(" · ");
}

export function representativePlans(building: FeaturedDevelopment) {
  const priority = ["Studio", "1 bed", "2 beds", "3 beds", "4+ beds"];
  const selected = priority
    .map((layout) => building.priceBands.find((band) => band.layout === layout))
    .filter((band): band is FeaturedDevelopment["priceBands"][number] => Boolean(band));

  return selected.length > 0 ? selected.slice(0, 4) : building.priceBands.slice(0, 4);
}

export function formatProjectScale(building: FeaturedDevelopment, locale: Locale) {
  if (locale === "zh") {
    return `${building.facts.stories} 层 · ${building.facts.units} 户 · ${building.facts.built}`;
  }
  return `${building.facts.stories} stories · ${building.facts.units} residences · ${building.facts.built}`;
}

export function developmentIntro(building: FeaturedDevelopment, locale: Locale) {
  const architect = building.facts.architect ? ` Architecture by ${building.facts.architect}.` : "";
  const interiors = building.facts.interiors ? ` Interiors by ${building.facts.interiors}.` : "";
  const developer = building.facts.developer ? ` Developed by ${building.facts.developer}.` : "";

  if (locale === "zh") {
    const zhArchitect = building.facts.architect
      ? `建筑设计：${building.facts.architect}。`
      : "建筑团队信息以项目方披露为准";
    const zhInteriors = building.facts.interiors
      ? `室内设计：${building.facts.interiors}。`
      : "";
    const zhDeveloper = building.facts.developer
      ? `开发商为 ${building.facts.developer}。`
      : "";

    return `${building.name} 是位于 ${building.area} 的新盘项目，规模为 ${building.facts.stories} 层、${building.facts.units} 户。${zhDeveloper}${zhArchitect}${zhInteriors}我们看这个项目，不只看价格，而是把地段兑现度、楼宇辨识度、户型效率、月供持有成本和未来转售人群放在一起判断。`;
  }

  return `${building.name} is a ${building.facts.stories}-story, ${building.facts.units}-residence project in ${building.area}.${developer}${architect}${interiors} The key is not price alone, but location strength, building recognition, floor-plan efficiency, carrying cost, and resale audience.`;
}

export function editorialAngles(building: FeaturedDevelopment, locale: Locale) {
  if (locale === "zh") {
    return [
      {
        title: "看地段",
        body: `${building.transit} 买家需要重点看：通勤是否真实方便、周边生活配套是否成熟、这个位置未来是否容易被下一任买家理解。`,
      },
      {
        title: "看建筑",
        body: `${building.facts.status}。${building.facts.architect ? `建筑设计：${building.facts.architect}。` : ""}${building.facts.interiors ? `室内：${building.facts.interiors}。` : ""}重点不是名字好不好听，而是楼宇辨识度、公共区域维护和未来转售时的记忆点。`,
      },
      {
        title: "看预算",
        body: `当前可参考户型包括 ${layoutLead(building)}，入门价格区间从 ${priceLead(building)} 开始。真正要核验的是同户型面积效率、朝向楼层差价、物业费和税费后的总月供。`,
      },
    ];
  }

  return [
    {
      title: "Location",
      body: `${building.transit} Buyers should check whether the commute, daily retail, and resale story are easy to understand.`,
    },
    {
      title: "Architecture",
      body: `${building.facts.status}. ${building.facts.architect ? `Architecture: ${building.facts.architect}.` : ""} ${building.facts.interiors ? `Interiors: ${building.facts.interiors}.` : ""} Focus on recognition, maintenance quality, and resale memory.`.trim(),
    },
    {
      title: "Budget",
      body: `Reference plans include ${layoutLead(building)}. Current entry pricing begins around ${priceLead(building)}; the real comparison is layout efficiency plus taxes and common charges.`,
    },
  ];
}

export function buyerChecklist(building: FeaturedDevelopment, locale: Locale) {
  if (locale === "zh") {
    return [
      {
        title: "先看总月供",
        body: "价格只是第一层，物业费、地产税、贷款利率和未来 assessment 风险加起来，才是真正持有成本。",
      },
      {
        title: "再看户型效率",
        body: "同样是一房或两房，走廊面积、采光面、卧室比例和储物空间会直接影响居住体验与转售。",
      },
      {
        title: "看楼宇辨识度",
        body: `${building.facts.architect ? `${building.facts.architect} 的设计团队` : "建筑团队"}、大堂质感、配套完整度和楼盘名气，决定客户未来转手时好不好讲。`,
      },
      {
        title: "看位置能否讲清楚",
        body: `${building.area} 的核心问题是：客户是否能用一句话理解它为什么值这个预算。`,
      },
    ];
  }

  return [
    {
      title: "Start with carrying cost",
      body: "Price is only layer one. Common charges, taxes, financing, and assessment risk define the real monthly cost.",
    },
    {
      title: "Check layout efficiency",
      body: "Hallways, window line, bedroom proportions, and storage can make two units with the same room count feel very different.",
    },
    {
      title: "Read building recognition",
      body: `${building.facts.architect ?? "The design team"}, lobby quality, amenities, and name recognition shape the resale story.`,
    },
    {
      title: "Make the location legible",
      body: `For ${building.area}, the question is whether a buyer can understand the value in one sentence.`,
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
