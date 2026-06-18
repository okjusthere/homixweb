/**
 * Site-wide brand content and configuration for Homix.
 *
 * Most values are REAL, migrated from homixny.com. Items still needing the
 * client's confirmation are marked CONFIRM. Compliance note: keep stats and
 * testimonials truthful and attributable.
 */

export const siteConfig = {
  name: "Homix",
  legalName: "Homix Realty Inc.",
  tagline: "Where Homes Meet Headlines",
  description:
    "Homix is a new kind of New York real estate company — built on media. A full-service brokerage, an agent incubator, and a content studio with a 200K+ audience, powered by data and AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homixny.com",
  market: "New York",
  contact: {
    phone: "(917) 688-9917",
    phoneHref: "tel:+19176889917",
    email: "homix@homixny.com",
    address: {
      line1: "37-20 Prince St, Ste 3F",
      city: "Flushing",
      state: "NY",
      zip: "11354",
    },
  },
  // Required US/NY brokerage disclosures — CONFIRM exact license numbers + text.
  legal: {
    brokerOfRecord: "Si Zhang",
    brokerLicense: "NY Licensed Real Estate Broker", // CONFIRM: add license #
    statesLicensed: ["New York"],
    // New York requires a Fair Housing Notice + Standard Operating Procedures.
    iabsNote: "NY Fair Housing Notice · Standard Operating Procedures",
  },
  social: {
    instagram: "https://www.instagram.com/homix.realty",
    xiaohongshu:
      "https://www.xiaohongshu.com/user/profile/653db5b50000000030031376",
    douyin: "https://v.douyin.com/3ye-M8fQ41U/",
  },
} as const;

/** Nav items reference i18n keys (see common.* in i18n.ts) for their labels. */
export interface NavItem {
  key: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { key: "listings", href: "/listings" },
  { key: "advisors", href: "/agents" },
  { key: "journal", href: "/journal" },
  { key: "join", href: "/join" },
  { key: "about", href: "/about" },
];

export const footerNav: { headingKey: string; links: NavItem[] }[] = [
  {
    headingKey: "explore",
    links: [
      { key: "listings", href: "/listings" },
      { key: "sell", href: "/sell" },
      { key: "neighborhoods", href: "/neighborhoods" },
      { key: "advisors", href: "/agents" },
      { key: "journal", href: "/journal" },
    ],
  },
  {
    headingKey: "firm",
    links: [
      { key: "about", href: "/about" },
      { key: "join", href: "/join" },
      { key: "calculator", href: "/calculator" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    headingKey: "legal",
    links: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
      { key: "accessibility", href: "/accessibility" },
      { key: "fairHousing", href: "/fair-housing" },
    ],
  },
];

/** Hrefs for the three business-line pillars (copy lives in i18n.ts). */
export const pillarLinks = ["/listings", "/join", "/contact"];

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  photo: string;
}

/**
 * One REAL testimonial migrated from homixny.com ("What Our Clients Say"). It is
 * anonymous on the source, so it's attributed honestly without a fabricated name.
 * Add more attributable client quotes (with consent) as they come in.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sunny was very professional and responsive throughout the entire process. They helped me sell my condo above asking price and guided me through every step with patience. Highly recommend!",
    name: "A Homix client",
    detail: "Sold a condo above asking price",
    photo: "",
  },
];

export interface SocialChannel {
  platform: string;
  handle: string;
  stat: string;
  href: string;
}

/**
 * "Our reach" — honest, verifiable content-platform presence in place of a
 * (currently unsupportable) press logo wall. This is the real "headlines" asset.
 */
export const socialReach: SocialChannel[] = [
  {
    platform: "抖音 · Douyin",
    handle: "Sunny房产观察",
    stat: "NY real estate, daily",
    href: siteConfig.social.douyin,
  },
  {
    platform: "小红书 · RED",
    handle: "SunnyNYC 地产观察",
    stat: "Home guides & tours",
    href: siteConfig.social.xiaohongshu,
  },
  {
    platform: "Instagram",
    handle: "@homix.realty",
    stat: "Reels & home tours",
    href: siteConfig.social.instagram,
  },
];

export interface NeighborhoodTeaser {
  name: string;
  slug: string;
  blurb: string;
  image: string;
  /** Photo attribution — required for CC-BY/CC-BY-SA imagery. */
  photoCredit?: string;
  photoCreditUrl?: string;
  /** Bilingual guide copy for /neighborhoods/[slug] (Fair-Housing-safe). */
  guide?: { en: string; zh: string };
}

/**
 * Neighborhood imagery uses real, freely-licensed photos of the actual places
 * from Wikimedia Commons (CC-BY / CC-BY-SA) — attribution shown on each card.
 * Replace with owned photography when available.
 */
export const neighborhoods: NeighborhoodTeaser[] = [
  {
    name: "Flushing",
    slug: "flushing",
    blurb: "Downtown energy, transit, and new-construction condos in the heart of Queens.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flushing_Queens_March_2022_076.jpg/1280px-Flushing_Queens_March_2022_076.jpg",
    photoCredit: "Kidfly182 · CC BY-SA 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:Flushing_Queens_March_2022_076.jpg",
    guide: {
      en: "Downtown Flushing is one of New York's most dynamic urban centers — a hub of dining, shopping, and culture anchored by Main Street and the Flushing–Main Street stations on the 7 train and the Long Island Rail Road. New-construction condos along Sanford and Roosevelt Avenues sit beside long-established blocks, putting modern towers within steps of some of the best food in the city.\n\nFor buyers, Flushing offers rare walkability and transit access for Queens, with a deep mix of condos and single-family homes. For sellers, demand near transit stays strong year-round.",
      zh: "法拉盛市中心是纽约最具活力的城市中心之一——以缅街(Main Street)为核心,汇聚餐饮、购物与文化,法拉盛-缅街站连接 7 号线与长岛铁路(LIRR)。Sanford、Roosevelt 大道沿线的新建公寓与成熟街区比邻,现代高层与全城最好的美食仅几步之遥。\n\n对买家而言,法拉盛提供了皇后区少见的步行性与交通便利,公寓与独立屋选择丰富;对卖家而言,临近交通的需求全年坚挺。",
    },
  },
  {
    name: "Long Island City",
    slug: "long-island-city",
    blurb: "Waterfront towers and skyline views, minutes from Midtown.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Long_Island_City_Skyline_2026.jpg/1280px-Long_Island_City_Skyline_2026.jpg",
    photoCredit: "Kidfly182 · CC BY 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:Long_Island_City_Skyline_2026.jpg",
    guide: {
      en: "Long Island City rose from an industrial waterfront into one of the city's most photographed skylines. Glass towers along Center Boulevard and Gantry Plaza State Park look straight across the East River to Midtown, with the 7, E, M, and G trains putting Grand Central minutes away.\n\nLIC pairs new-construction condos and amenities with riverfront parks and a growing arts and dining scene — a combination that keeps both buyers and renters competing for the best views.",
      zh: "长岛市(LIC)从工业滨水区蜕变为全城最上镜的天际线之一。Center Boulevard 与 Gantry Plaza 州立公园沿线的玻璃高层隔着东河正对中城,7、E、M、G 线让中央车站近在咫尺。\n\nLIC 将新建公寓与配套和滨河公园、日益繁荣的艺术与餐饮场景结合在一起——这种组合让买家与租客都在争抢最好的景观。",
    },
  },
  {
    name: "Great Neck",
    slug: "great-neck",
    blurb: "Top-rated schools and gracious homes on Long Island's North Shore.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Steppingstone_Park%2C_Kings_Point%2C_NY_August_14%2C_2022.jpg/1280px-Steppingstone_Park%2C_Kings_Point%2C_NY_August_14%2C_2022.jpg",
    photoCredit: "AITFFan1 · CC BY-SA 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:Steppingstone_Park,_Kings_Point,_NY_August_14,_2022.jpg",
    guide: {
      en: "Great Neck sits on Long Island's North Shore, a cluster of villages known for tree-lined streets, gracious homes, and a short Long Island Rail Road ride to Penn Station. Waterfront parks like Steppingstone look out over Manhasset Bay, and the area's schools are among the most sought-after on the Island.\n\nFrom classic colonials to modern builds, Great Neck offers space and quiet within easy reach of the city — a combination that holds its value across markets.",
      zh: "Great Neck 位于长岛北岸,是一组以林荫街道、优雅住宅闻名的村镇,搭乘长岛铁路很快即达宾州车站。Steppingstone 等滨水公园俯瞰 Manhasset 湾,该区的学校是全岛最受追捧之列。\n\n从经典殖民式到现代新建,Great Neck 在离市区不远处提供了空间与宁静——这种组合在各种市场里都保值。",
    },
  },
  {
    name: "Manhasset",
    slug: "manhasset",
    blurb: "Gracious North Shore homes, top schools, and a short LIRR ride to the city.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Plandome_Pond_Park%2C_Manhasset%2C_Long_Island%2C_New_York_August_2%2C_2021.jpg/1280px-Plandome_Pond_Park%2C_Manhasset%2C_Long_Island%2C_New_York_August_2%2C_2021.jpg",
    photoCredit: "AITFFan1 · CC BY-SA 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:Plandome_Pond_Park,_Manhasset,_Long_Island,_New_York_August_2,_2021.jpg",
    guide: {
      en: "Manhasset is a North Shore community known for tree-lined streets, gracious homes, and an easy Long Island Rail Road commute to Penn Station and Grand Central. The Plandome and Strathmore areas offer classic colonials and estate properties, while Manhasset's Miracle Mile brings high-end shopping close to home. The public schools are among the most sought-after on Long Island.\n\nFor buyers, Manhasset pairs space and quiet with quick access to Manhattan; for sellers, well-kept homes in the top school zones stay in steady demand.",
      zh: "Manhasset 是长岛北岸的社区，以林荫街道、优雅住宅，以及搭乘长岛铁路便捷直达宾州车站与中央车站而闻名。Plandome 与 Strathmore 一带多为经典殖民式与庄园式住宅，而 Manhasset 的「Miracle Mile」将高端购物带到家门口。当地公立学校是长岛最受追捧之列。\n\n对买家而言，Manhasset 在空间与宁静之外，又有通往曼哈顿的便捷；对卖家而言，顶级学区内保养良好的房子需求稳定。",
    },
  },
  {
    name: "Syosset",
    slug: "syosset",
    blurb: "Award-winning schools and a walkable downtown in the heart of Long Island.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Downtown_Syosset%2C_Long_Island%2C_New_York_August_29%2C_2021.jpg/1280px-Downtown_Syosset%2C_Long_Island%2C_New_York_August_29%2C_2021.jpg",
    photoCredit: "AITFFan1 · CC BY-SA 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:Downtown_Syosset,_Long_Island,_New_York_August_29,_2021.jpg",
    guide: {
      en: "Syosset sits in the heart of Nassau County, prized for its award-winning school district, a walkable downtown along Jackson Avenue, and an LIRR station with direct service to Manhattan. Homes range from mid-century classics to updated colonials on generous lots, with parks and recreation close at hand.\n\nFamilies and investors alike track Syosset for its schools and steady demand; well-priced homes in the district move quickly through any season.",
      zh: "Syosset 位于拿骚县腹地，以屡获殊荣的学区、Jackson Avenue 沿线可步行的市中心，以及直达曼哈顿的长岛铁路车站而著称。住宅从世纪中叶的经典款到翻新的殖民式不等，地块宽敞，公园与休闲设施近在咫尺。\n\n无论家庭还是投资者，都因学区与稳定需求而关注 Syosset；学区内定价合理的房子，一年四季都走得快。",
    },
  },
  {
    name: "Jericho",
    slug: "jericho",
    blurb: "One of Long Island's top school districts, with quiet streets and easy highways.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Milleridge_Inn%3B_Jericho%2C_New_York-3.jpg/1280px-The_Milleridge_Inn%3B_Jericho%2C_New_York-3.jpg",
    photoCredit: "DanTD · CC BY-SA 4.0",
    photoCreditUrl:
      "https://commons.wikimedia.org/wiki/File:The_Milleridge_Inn;_Jericho,_New_York-3.jpg",
    guide: {
      en: "Jericho is a Nassau County hamlet consistently ranked among Long Island's strongest school districts, which keeps demand high year-round. Its quiet residential streets, a central location near the Long Island Expressway and Northern State Parkway, and the historic Milleridge Inn give the area a settled, established character.\n\nBuyers are drawn to Jericho for schools and convenience; for sellers, homes in the district command attention and hold their value across markets.",
      zh: "Jericho 是拿骚县的一处社区，长年位列长岛最强学区之中，全年需求旺盛。安静的住宅街道、临近长岛快速路与 Northern State Parkway 的中心位置，以及历史悠久的 Milleridge Inn，赋予这一带成熟稳重的气质。\n\n买家因学区与便利而青睐 Jericho；对卖家而言，学区内的房子备受关注，并在各种市场里保值。",
    },
  },
];

/** Hero art direction — replace with owned photography for launch. */
export const heroImage = {
  src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  alt: "A bright, contemporary New York home at dusk",
};
