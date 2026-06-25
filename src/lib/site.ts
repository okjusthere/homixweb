/**
 * Site-wide brand content and configuration for Homix.
 *
 * Most values are REAL, migrated from homixny.com. Compliance note: keep stats
 * and testimonials truthful and attributable.
 */

export const siteConfig = {
  name: "Homix",
  legalName: "Homix Realty Inc.",
  tagline: "Where Homes Meet Headlines",
  description:
    "Homix is a new kind of New York real estate company — built on media. A full-service brokerage, an agent incubator, and a content studio with a 200K+ audience, powered by data and AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homixny.com",
  market: "New York",
  // The agents' internal portal (homixliving CRM) — a separate deployment.
  portalUrl: "https://agents.homixny.com",
  contact: {
    phone: "(929) 666-9886",
    phoneHref: "tel:+19296669886",
    phone2: "(516) 988-8558",
    phone2Href: "tel:+15169888558",
    email: "homix@homixny.com",
    address: {
      line1: "37-20 Prince St, STE 3H",
      city: "Flushing",
      state: "NY",
      zip: "11354",
    },
  },
  // Required US/NY brokerage disclosures.
  legal: {
    brokerOfRecord: "Si Zhang",
    brokerLicense: "NYS Real Estate Broker License #10991241632",
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

// "Buy" renders as a dropdown (see buyNav); the rest are flat header links.
export const primaryNav: NavItem[] = [
  { key: "sell", href: "/sell" },
  { key: "advisors", href: "/agents" },
  { key: "journal", href: "/journal" },
  { key: "join", href: "/join" },
  { key: "about", href: "/about" },
];

/** "Buy" dropdown items (labels/descs via i18n buyMenu, hrefs here, same order). */
export const buyNav: string[] = [
  "/listings",
  "/neighborhoods",
  "/NewDevelopment",
  "/calculator",
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
      { key: "standardOperatingProcedures", href: "/standard-operating-procedures" },
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
  region: "Queens" | "Long Island" | "Manhattan";
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
    region: "Queens",
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
    region: "Queens",
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
    region: "Long Island",
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
    region: "Long Island",
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
    region: "Long Island",
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
    region: "Long Island",
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
  {
    name: "Tribeca",
    slug: "tribeca",
    region: "Manhattan",
    blurb: "Cast-iron lofts and cobblestone calm at the lower tip of Manhattan.",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Short for the \"Triangle Below Canal,\" Tribeca grew out of a 19th-century district of textile warehouses and merchant lofts, and that industrial bone structure still defines it. Cobblestone streets, cast-iron and masonry facades, and oversized factory windows give the neighborhood a low-rise, distinctly residential calm that sets it apart from the busier blocks just to the north. Much of the housing stock is converted loft space — high ceilings, exposed brick, and broad column-free floor plates — alongside a wave of modern luxury condominiums, many with harbor and skyline outlooks. Compared with neighboring SoHo, Tribeca tends to read quieter and more condo-dominant, and it carries some of the highest price points in the borough.\n\nTransit is a genuine strength. The 1/2/3 along the West Side and the A/C/E nearby put both downtown and Midtown within a quick ride, and the R/W and 4/5/6 at nearby Financial District and City Hall stations broaden the options further. Chambers Street is a major hub, and the proximity to the West Side Highway and Holland Tunnel suits drivers as well.\n\nGreen space and amenities cluster along the water: Hudson River Park's piers, lawns, and the Greenway run the western edge, while Washington Market Park and Bogardus Plaza anchor everyday neighborhood life. The dining scene is among the city's most celebrated, with a dense roster of acclaimed restaurants, galleries, and boutiques. For schools-as-fact, Tribeca sits within Community School District 2.",
      zh: "Tribeca 是 \"Triangle Below Canal\"（运河街以南三角地带）的缩写，脱胎于 19 世纪的纺织品仓库与商号阁楼区，这副工业骨架至今仍定义着它的气质。鹅卵石街道、铸铁与砖石立面、超大的厂房窗户，赋予街区低层而鲜明的居住感，与北侧更喧嚣的街段截然不同。住宅以阁楼改造为主——挑高天花、裸露砖墙、开阔无柱的楼面——并伴有一批现代豪华公寓，许多可眺望港湾与天际线。与相邻的 SoHo 相比，Tribeca 更显安静，且以共有产权公寓（condo）为主，价位居全区前列。\n\n交通是真正的优势。西侧的 1/2/3 线与近旁的 A/C/E 线让下城与中城都近在咫尺，金融区与市政厅一带的 R/W 与 4/5/6 线进一步拓展了选择。Chambers Street 是重要枢纽，邻近西侧高速公路与荷兰隧道，对自驾者同样便利。\n\n绿地与配套沿水岸聚集：Hudson River Park 的码头、草坪与滨水绿道构成西缘，Washington Market Park 与 Bogardus Plaza 则承载着日常社区生活。餐饮场景跻身全市顶尖之列，云集众多备受推崇的餐厅、画廊与精品店。就学区事实而言，Tribeca 隶属第 2 学区（Community School District 2）。",
    },
  },
  {
    name: "Financial District",
    slug: "financial-district",
    region: "Manhattan",
    blurb: "Wall Street's historic core, now a transit-rich residential downtown.",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "The Financial District — FiDi — occupies Manhattan's southern tip on the footprint of 17th-century New Amsterdam, the city's oldest streets. Long defined by Wall Street and the trading day, it has steadily become a round-the-clock residential neighborhood. Beginning in the 1990s and 2000s, many landmark office towers were converted into apartments — 15 Broad Street, an early Wall Street condo conversion, is among the best known — and they now sit beside ground-up luxury towers. The result is a varied housing stock: prewar conversions with grand lobbies and generous proportions, plus new-construction condos with amenity floors and water views.\n\nTransit here is unmatched in Lower Manhattan. The 1, 2, 3, 4, 5, A, C, E, J, Z, R, and W trains all serve the district, joined by the PATH to New Jersey and the Staten Island and East River ferries — among the densest transit coverage anywhere in the city. Fulton Center and the WTC Oculus tie the lines together under one roof.\n\nLandmarks and open space are close at hand: Battery Park and its waterfront esplanade anchor the southern edge, the World Trade Center campus and its memorial define the west, and the cobblestoned, restaurant-lined Stone Street offers a historic pocket of nightlife. Brookfield Place, Eataly, and the Seaport add day-to-day shopping and dining. FiDi sits within Community School District 2.",
      zh: "金融区（Financial District，简称 FiDi）位于曼哈顿最南端，坐落在 17 世纪新阿姆斯特丹的旧址之上，是全城最古老的街区。它长期由华尔街与交易时段所定义，如今已稳步转型为全天候的居住社区。自 1990 至 2000 年代起，众多地标办公塔被改建为公寓——华尔街早期的共有产权公寓改造项目 15 Broad Street 即为其中翘楚——它们如今与全新建造的豪华塔楼比肩而立。住宅类型由此十分多样：拥有宏伟大堂与宽绰格局的战前改造单元，以及配有会所楼层与水景的新建公寓。\n\n这里的交通在下城无可匹敌。1、2、3、4、5、A、C、E、J、Z、R、W 线悉数到达，外加通往新泽西的 PATH 以及史泰登岛与东河渡轮——堪称全城最密集的交通覆盖之一。Fulton Center 与世贸中心 Oculus 将各条线路汇于一处。\n\n地标与开放空间近在咫尺：Battery Park 及其滨水步道构成南缘，世贸中心园区及纪念广场定义西侧，铺着鹅卵石、餐厅林立的 Stone Street 则保留了一处历史夜生活角落。Brookfield Place、Eataly 与南街海港（Seaport）则补足了日常购物与餐饮。FiDi 隶属第 2 学区（District 2）。",
    },
  },
  {
    name: "Upper West Side",
    slug: "upper-west-side",
    region: "Manhattan",
    blurb: "Prewar grandeur between two parks, anchored by Lincoln Center.",
    image:
      "https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "The Upper West Side runs roughly from 59th Street to 110th, framed by Central Park on the east and the Hudson River on the west — a span that gives the neighborhood its enduring \"between the parks\" identity. The subway's arrival in 1904 spurred a building boom that still shapes the streetscape: grand prewar apartment houses line Central Park West and Riverside Drive, while tree-shaded brownstones fill the side streets. Co-ops dominate the housing stock, many of them spacious prewar layouts with hardwood floors and separate dining rooms, complemented by condominiums and converted townhouses for buyers who prefer that ownership structure.\n\nTransit centers on the 1/2/3 under Broadway — the 1 local plus 2/3 express — and the B/C along Central Park West, with the 81st Street station feeding directly into the American Museum of Natural History. Crosstown buses (M66, M72, M79, M86, M96) link the neighborhood to the East Side through the park.\n\nThe two parks define daily life: Central Park to the east and Riverside Park's Hudson-side promenade, playgrounds, and Greenway to the west. Cultural anchors are exceptional — Lincoln Center, the American Museum of Natural History, and the New-York Historical Society all sit here — alongside Zabar's, the 79th Street Greenmarket, and Broadway's long run of restaurants and cafes. The Upper West Side falls within Community School District 3.",
      zh: "上西区（Upper West Side）大致自 59 街延伸至 110 街，东倚中央公园、西临哈德逊河，这片地带赋予它历久弥新的 \"两园之间\" 身份。1904 年地铁通车引发的建设热潮，至今仍塑造着街景：宏伟的战前公寓沿中央公园西大道（Central Park West）与 Riverside Drive 排列，林荫掩映的褐石联排屋则填满侧街。住宅以合作公寓（co-op）为主，许多为宽敞的战前格局，配硬木地板与独立餐厅，并辅以共有产权公寓与改造联排屋，供偏好该产权形式的买家选择。\n\n交通以 Broadway 下方的 1/2/3 线（1 号慢车加 2/3 号快车）和中央公园西大道的 B/C 线为核心，其中 81 街站直通美国自然历史博物馆。横贯东西的公交（M66、M72、M79、M86、M96）穿越公园连接东区。\n\n两座公园定义着日常生活：东侧的中央公园，与西侧 Riverside Park 临河的步道、游乐场及滨水绿道。文化地标尤为出众——林肯中心、美国自然历史博物馆与纽约历史协会皆汇聚于此——还有 Zabar's、79 街绿色市集，以及 Broadway 上绵长的餐厅与咖啡馆。上西区隶属第 3 学区（Community School District 3）。",
    },
  },
  {
    name: "Upper East Side",
    slug: "upper-east-side",
    region: "Manhattan",
    blurb: "Museum Mile, Madison Avenue, and stately prewar co-ops by the park.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "The Upper East Side stretches above 59th Street between Fifth Avenue and the East River, with Central Park forming its western edge. It is known for a stately, unhurried character and a housing stock weighted toward prewar co-ops — many with formal layouts, high ceilings, and white-glove service — alongside postwar and contemporary condominiums and a run of limestone and brownstone townhouses. Fifth, Madison, and Park Avenues set the architectural tone, while the blocks east toward the river offer a broader range of building types and values.\n\nTransit runs on two spines. The 4/5 express and 6 local under Lexington Avenue stop at 59th and 86th, with the 6 adding 68th Street–Hunter College, 77th, and 96th. The Second Avenue Subway's Q train serves newer stations at 72nd, 86th, and 96th, easing the historic crowding on Lexington and improving access to the East Side's eastern blocks. Crosstown buses cut through Central Park to the West Side.\n\nThe neighborhood's signature is culture and retail: Museum Mile along Fifth Avenue includes the Met, the Guggenheim, the Neue Galerie, the Jewish Museum, and the Cooper Hewitt, while Madison Avenue is a corridor of flagship boutiques and galleries. Central Park and Carl Schurz Park provide green space, and the dining and gourmet-market scene is deep. The Upper East Side falls within Community School District 2.",
      zh: "上东区（Upper East Side）位于 59 街以北，介于第五大道与东河之间，西缘即中央公园。它以庄重从容的气质著称，住宅以战前合作公寓为主——许多拥有正式格局、挑高天花与全天候管家服务——并辅以战后及当代共有产权公寓，以及一排石灰岩与褐石联排屋。第五、麦迪逊与公园大道（Park Avenue）奠定了建筑基调，而向东靠近河岸的街段则提供更丰富的楼型与价位选择。\n\n交通沿两条主轴展开。Lexington Avenue 下方的 4/5 快车与 6 号慢车停靠 59 街与 86 街，6 号线另设 68 街（Hunter College）、77 街与 96 街站。第二大道地铁的 Q 线在 72 街、86 街与 96 街设有较新站点，缓解了 Lexington 沿线历来的拥挤，并改善了东区东侧街段的可达性。横贯公交穿越中央公园直抵西区。\n\n街区的标志在于文化与零售：第五大道沿线的博物馆大道（Museum Mile）汇聚大都会艺术博物馆、古根海姆、Neue Galerie、犹太博物馆与库珀·休伊特设计博物馆，而麦迪逊大道则是旗舰精品店与画廊的长廊。中央公园与 Carl Schurz Park 提供绿地，餐饮与精品食材市集亦十分丰富。上东区隶属第 2 学区（Community School District 2）。",
    },
  },
  {
    name: "SoHo",
    slug: "soho",
    region: "Manhattan",
    blurb: "Cast-iron lofts, cobblestones, and flagship shopping south of Houston.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "SoHo — \"South of Houston Street\" — holds one of the world's densest concentrations of cast-iron architecture, much of it built in the mid-to-late 19th century for manufacturing and dry-goods trade. Designated a historic district in the 1970s, the neighborhood preserves those ornate facades, broad windows, and Belgian-block streets, and that heritage shapes its housing: airy artist-era lofts and luxury loft conversions with soaring ceilings, columns, and oversized windows, alongside a smaller set of prewar walk-ups and new condominiums. Many buildings carry co-op or condo loft layouts that prize open, light-filled volume over conventional room counts.\n\nTransit is broad for so compact an area. The 6 runs along Lafayette and the N/R/W along Broadway, the B/D/F/M cross at Broadway–Lafayette, and the A/C/E and 1 sit just to the west — giving quick reach uptown, downtown, and into Brooklyn. The central location is one of SoHo's defining conveniences.\n\nAbove all, SoHo is a destination for retail and art. Broadway and the side streets host flagship fashion boutiques, independent shops, and a long lineage of galleries and cultural spaces — the Drawing Center, the Leslie-Lohman Museum, and the nearby Museum of Chinese in America among them. Cobblestoned blocks, design showrooms, and a dense restaurant and cafe scene round out daily life. SoHo falls within Community School District 2.",
      zh: "SoHo——\"South of Houston Street\"（豪斯顿街以南）的缩写——坐拥全球最密集的铸铁建筑群之一，多数建于 19 世纪中后期，用于制造业与百货贸易。该街区于 1970 年代被列为历史保护区，那些繁复的立面、宽阔的窗户与比利时方石街道得以保存，这份遗产也塑造了其住宅：通透的艺术家时代阁楼，以及挑高天花、立柱与超大窗户的豪华阁楼改造单元，并辅以少量战前免电梯公寓与新建共有产权公寓。许多楼宇采用合作公寓或共有产权的阁楼格局，看重开阔通透的体量胜于传统的房间数量。\n\n对如此紧凑的区域而言，交通颇为广泛。6 号线沿 Lafayette 行驶，N/R/W 线沿 Broadway，B/D/F/M 线在 Broadway–Lafayette 交汇，A/C/E 与 1 号线则近在西侧——上城、下城与布鲁克林皆可迅速抵达。中心地段是 SoHo 最具代表性的便利之一。\n\n更重要的是，SoHo 是零售与艺术的目的地。Broadway 及各侧街云集时尚旗舰店、独立小店，以及源远流长的画廊与文化空间——包括 The Drawing Center、Leslie-Lohman 博物馆，以及邻近的美国华人博物馆（MOCA）。鹅卵石街区、设计展厅与密集的餐厅咖啡馆共同构成日常生活。SoHo 隶属第 2 学区（Community School District 2）。",
    },
  },
  {
    name: "Roslyn",
    slug: "roslyn",
    region: "Long Island",
    blurb: "Historic village charm and gracious North Shore homes, a short LIRR ride from the city.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Roslyn is one of Long Island's North Shore villages, set at the head of Hempstead Harbor and known for a remarkably preserved 18th- and 19th-century downtown. Its Main Street, the duck pond, and the landmark clock tower give the village an unhurried, storybook character, while the surrounding villages — Roslyn Estates, Roslyn Harbor, East Hills, and Flower Hill — offer wooded lots, classic colonials, Tudors, and a number of larger estate properties.\n\nFor commuters, the Roslyn station sits on the LIRR Port Washington Branch with direct trains to both Penn Station and Grand Central Madison; peak service reaches Midtown in roughly 40 to 50 minutes, with no transfer required. Parks and open space are close at hand, from Gerry Pond and Christopher Morley Park to the Cedarmere waterfront, and the Nassau County Museum of Art anchors the village's cultural life.\n\nFor buyers, Roslyn pairs a walkable historic downtown with quiet, established residential streets; for sellers, well-kept homes in a sought-after district tend to hold their value across markets.",
      zh: "Roslyn 是长岛北岸的村镇之一，坐落在 Hempstead 港湾的尽头，以保存极为完好的 18、19 世纪市中心而闻名。Main Street、鸭池与地标钟楼为村庄赋予了从容、如画的气质，而周边的 Roslyn Estates、Roslyn Harbor、East Hills 与 Flower Hill 等村落，则提供林木环绕的地块、经典殖民式与都铎式住宅，以及若干规模更大的庄园物业。\n\n对通勤者而言，Roslyn 车站位于长岛铁路 Port Washington 支线，可直达宾州车站与 Grand Central Madison；高峰时段约 40 至 50 分钟即抵中城，无需换乘。公园与开放绿地近在咫尺，从 Gerry Pond、Christopher Morley 公园到 Cedarmere 滨水区皆是，拿骚县艺术博物馆更为村镇的文化生活注入活力。\n\n对买家来说，Roslyn 将可步行的历史市中心与宁静、成熟的住宅街区融为一体；对卖家而言，热门学区内维护良好的住宅往往能在各种市况下保值。",
    },
  },
  {
    name: "Port Washington",
    slug: "port-washington",
    region: "Long Island",
    blurb: "A walkable waterfront town on Manhasset Bay with one of the North Shore's quickest commutes.",
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Port Washington occupies the Cow Neck Peninsula between Manhasset Bay and Hempstead Harbor, giving it a genuine waterfront identity that's rare this close to Manhattan. The downtown along Main Street is one of the more walkable on the North Shore — dozens of restaurants, independent shops, the Landmark on Main Street performing arts center, and a Town Dock that hosts a Saturday farmers market and a working harbor. Housing runs a wide range, from co-ops and condos near the station and downtown to mid-century capes and colonials in the residential neighborhoods, with larger properties in Flower Hill and waterfront estates in Sands Point.\n\nThe Port Washington station is the eastern terminus of the LIRR's Port Washington Branch, with frequent direct trains to Penn Station and Grand Central Madison — roughly 35 to 45 minutes to Midtown, and no transfer at any point. Sailing and boating are woven into daily life through the Manhasset Bay and Port Washington yacht clubs, and the bayfront parks and trails keep the water close.\n\nFor buyers, Port Washington offers a true downtown, a wide spread of housing types, and a short commute; for sellers, homes near the station and the village stay in steady demand.",
      zh: "Port Washington 坐落于 Manhasset 湾与 Hempstead 港之间的 Cow Neck 半岛，赋予它在距曼哈顿如此之近的地方实属难得的真正滨水气质。沿 Main Street 的市中心是北岸最适合步行的街区之一——数十家餐厅、独立小店、Landmark on Main Street 表演艺术中心，以及每周六举办农夫市集、仍在运作的 Town Dock 码头。住宅类型十分多元，从车站与市中心附近的合作公寓、共管公寓，到住宅区内世纪中叶的 Cape 与殖民式住宅，再到 Flower Hill 较大的物业与 Sands Point 的滨水庄园。\n\nPort Washington 车站是长岛铁路 Port Washington 支线的东端终点，频密的直达列车通往宾州车站与 Grand Central Madison——到中城约 35 至 45 分钟，全程无需换乘。航海与划船借由 Manhasset Bay 与 Port Washington 帆船俱乐部融入日常生活，湾畔公园与步道也让水景近在咫尺。\n\n对买家而言，Port Washington 提供真正的市中心、多元的住宅类型与短途通勤；对卖家来说，车站与村镇周边的住宅需求始终稳定。",
    },
  },
  {
    name: "Garden City",
    slug: "garden-city",
    region: "Long Island",
    blurb: "A planned village of tree-lined boulevards, grand colonials, and a classic downtown.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Garden City is one of Long Island's earliest planned communities, laid out in the 19th century with wide, tree-lined boulevards, generous setbacks, and a deliberate, parklike street grid. The housing stock reflects that heritage — stately colonials, Tudors, and center-hall homes on landscaped lots — while the downtown along Seventh Street and Franklin Avenue offers a walkable mix of shops, restaurants, and the historic Garden City Hotel. The Cathedral of the Incarnation and the village's many parks and athletic fields reinforce its settled, manicured character.\n\nThe Garden City station sits on the LIRR's Hempstead Branch; many trips to Penn Station route through Jamaica with a short connection, and select Hempstead Branch trains now run directly to Grand Central Madison, giving commuters options into both Midtown terminals. Adelphi University and Roosevelt Field's regional shopping are minutes away, and the parkways keep the rest of Nassau within easy reach by car.\n\nFor buyers, Garden City offers architectural character, a true downtown, and a strong public-school district; for sellers, classic homes in the village's established sections draw steady attention.",
      zh: "Garden City 是长岛最早的规划社区之一，于 19 世纪铺设而成，拥有宽阔的林荫大道、慷慨的退界距离，以及精心设计、宛如公园的街道网格。其住宅风貌承袭了这一传统——景观地块上气派的殖民式、都铎式与中央门厅式住宅——而沿 Seventh Street 与 Franklin Avenue 的市中心，则汇聚了可步行的商铺、餐厅与历史悠久的 Garden City Hotel。Incarnation 主教座堂以及村镇众多公园与运动场，进一步彰显其成熟、精致的气质。\n\nGarden City 车站位于长岛铁路 Hempstead 支线；不少前往宾州车站的行程会经 Jamaica 短暂换乘，部分 Hempstead 支线列车如今亦直达 Grand Central Madison，让通勤者在两座中城终点站之间皆有选择。Adelphi 大学与 Roosevelt Field 的区域购物中心近在数分钟车程，公园大道也让拿骚县其余各处自驾可及。\n\n对买家而言，Garden City 提供鲜明的建筑特色、真正的市中心与优秀的公立学区；对卖家来说，村镇成熟区段中的经典住宅持续吸引关注。",
    },
  },
  {
    name: "Old Westbury",
    slug: "old-westbury",
    region: "Long Island",
    blurb: "Gold Coast estates on sweeping, wooded acreage with privacy and quiet.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Old Westbury is among the most rural-feeling of Nassau County's villages — a Gold Coast enclave defined by large-acreage estates, long private drives, and extensive woodland and equestrian land. The Gilded Age legacy is still visible in landmarks like Old Westbury Gardens, the restored Phipps estate with its formal gardens, and the village's preservation of open space and low-density zoning keeps lots generous and homes well set back from the road. Architecturally it spans Colonial Revival manors, brick Georgians, and modern custom builds, many with stables, pools, or tennis courts.\n\nThe village has no LIRR station of its own; commuters typically drive to the nearby Westbury station on the Main Line or to Hicksville, both offering direct service to Penn Station and Grand Central Madison, with Midtown reachable in roughly 40 minutes at peak. The Long Island Expressway and Northern State Parkway frame the village for easy driving, and New York Institute of Technology and SUNY Old Westbury sit within its bounds. Because the village spans several school districts — East Williston, Jericho, and Westbury among them — district assignment depends on the specific property.\n\nFor buyers, Old Westbury offers privacy, acreage, and estate-scale homes within a short drive of the city's rail connections; for sellers, distinctive properties on substantial land occupy a specialized, enduring corner of the market.",
      zh: "Old Westbury 是拿骚县最具乡野气息的村镇之一——一处黄金海岸的隐逸聚居地，以大面积庄园、悠长的私人车道，以及广袤的林地与马术用地为特征。镀金时代的遗产至今清晰可见，如 Old Westbury Gardens、修复后设有规整花园的 Phipps 庄园；村镇对开放空间的保护与低密度分区规划，使地块保持宽敞、住宅远离街道深处。建筑风格横跨殖民复兴式宅邸、砖砌乔治亚式与现代定制建筑，许多更配有马厩、泳池或网球场。\n\n村镇本身没有长岛铁路车站；通勤者通常驾车前往邻近 Main Line 上的 Westbury 车站或 Hicksville，两者皆可直达宾州车站与 Grand Central Madison，高峰时段约 40 分钟抵达中城。长岛快速路（LIE）与 Northern State Parkway 环绕村镇，自驾便利，纽约理工学院与纽约州立大学 Old Westbury 分校亦坐落其境内。由于村镇跨越多个学区——包括 East Williston、Jericho 与 Westbury——学区归属取决于具体物业。\n\n对买家而言，Old Westbury 提供私密性、大面积地块与庄园级住宅，且距城市的铁路连接仅短途车程；对卖家来说，坐落于大片土地上的独特物业，占据着市场中一个专门而恒久的角落。",
    },
  },
  {
    name: "Forest Hills",
    slug: "forest-hills",
    region: "Queens",
    blurb: "Tudor enclaves, pre-war co-ops, and Austin Street shopping with a fast Midtown commute.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Forest Hills is one of Queens' most architecturally distinctive neighborhoods, anchored by the 142-acre Forest Hills Gardens — a planned community laid out in the early 20th century with input from Frederick Law Olmsted Jr., now famous for its English Tudor homes on winding, tree-lined streets. Beyond the Gardens, the housing stock is unusually varied: brick and stucco Tudors, a deep inventory of pre-war and post-war cooperatives, and newer condominiums and apartment buildings give buyers a wide range of price points and property types.\n\nThe commercial spine is Austin Street, a walkable retail-and-dining corridor that blends national stores with independent boutiques, cafes, and restaurants, plus a seasonal farmers market. The neighborhood is also home to the historic West Side Tennis Club and Forest Hills Stadium, a longtime concert venue and former host of the U.S. National tennis championships. Flushing Meadows-Corona Park, the borough's largest green space at over 900 acres, is a short distance away with museums, ball fields, and trails.\n\nTransit is a defining strength. The Forest Hills-71st Avenue station puts E and F express service to Manhattan minutes away, with M and R service as well, and the Long Island Rail Road station sits within walking distance — one of the few LIRR stops that pairs directly with a subway hub, giving commuters a fast route to Penn Station and Grand Central.",
      zh: "森林小丘（Forest Hills）是皇后区建筑风貌最为独特的社区之一，以占地142英亩的「森林小丘花园」（Forest Hills Gardens）为核心——这片20世纪初规划兴建的住区曾有小弗雷德里克·劳·奥姆斯特德参与设计，如今以蜿蜒林荫街道两旁的英式都铎住宅闻名。花园区之外，住宅类型亦十分丰富：砖砌与灰泥都铎宅邸、数量可观的战前与战后合作公寓，以及较新的共有公寓和公寓楼，为买家提供了宽广的价位与房型选择。\n\n社区的商业主轴是奥斯汀街（Austin Street），一条适宜步行的零售餐饮长廊，连锁商店与独立精品店、咖啡馆、餐厅交错其间，并设有季节性农夫市集。社区内还有历史悠久的西区网球俱乐部与森林小丘体育场——一处长期举办演出、并曾是美国全国网球锦标赛旧址的场馆。皇后区最大的绿地、占地逾900英亩的法拉盛草甸-可乐娜公园（Flushing Meadows-Corona Park）也近在咫尺，内有博物馆、球场与步道。\n\n交通是这里的显著优势。森林小丘-71大道地铁站让E、F线快车数分钟即可直达曼哈顿，并有M、R线服务；长岛铁路车站亦在步行范围内——这是少数与地铁枢纽直接衔接的长岛铁路站点之一，通勤者可快速抵达宾州车站与中央车站。",
    },
  },
  {
    name: "Bayside",
    slug: "bayside",
    region: "Queens",
    blurb: "Single-family blocks, an LIRR express to Penn, and Bell Boulevard dining near the waterfront.",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1280&q=80",
    guide: {
      en: "Bayside sits in northeastern Queens near the Long Island Sound shoreline, and its residential fabric is defined by detached single-family homes on quiet, tree-lined blocks. The housing stock leans toward mid-20th-century construction — Tudors, Colonials, Cape Cods, and split-levels, most with private driveways and yards — alongside semi-detached two-family houses and elevator co-op buildings. Detached houses with three to five bedrooms generally trade in the high six figures into the low millions, while co-ops and townhouses offer more accessible entry points, giving the area a suburban feel within city limits.\n\nThe commercial heart is Bell Boulevard, a lively dining-and-retail strip known for Greek seafood, Italian, Korean, Japanese, and American restaurants, plus bakeries and cafes. The neighborhood is well supplied with green space: Crocheron Park and the adjacent John Golden Park offer ball fields, tennis and pickleball courts, ponds, and trails, while Fort Totten Park preserves a Civil War-era fortress alongside a seasonal pool, waterfront paths, and birdwatching along the Sound. Oakland Lake and the Brooklyn-Queens Greenway add further routes for walking and cycling.\n\nFor commuters, the Long Island Rail Road Port Washington Branch is the headline. The Bayside station, just off Bell Boulevard, reaches Penn Station in roughly 28 to 35 minutes depending on express or local service, making this one of the faster rail commutes to Manhattan from a low-density, house-oriented part of the borough.",
      zh: "贝赛（Bayside）位于皇后区东北部、临近长岛海湾岸线，其住宅肌理以宁静林荫街区上的独栋单户住宅为特色。住宅多建于20世纪中期——都铎、殖民地式、鳕鱼角式（Cape Cod）与错层式住宅，大多配有私人车道与庭院——并夹杂半独立式双户住宅及带电梯的合作公寓楼。三至五房的独栋住宅成交价大致在数十万美元高位至数百万美元低位之间，而合作公寓与联排住宅则提供更易入手的价位，让这一带在城市范围内呈现郊区般的氛围。\n\n社区的商业核心是贝尔大道（Bell Boulevard），一条热闹的餐饮零售街，以希腊海鲜、意大利、韩国、日本及美式餐厅闻名，并有面包房与咖啡馆。社区绿地充裕：克罗谢隆公园（Crocheron Park）与毗邻的约翰·戈尔登公园（John Golden Park）设有球场、网球与匹克球场、池塘和步道；托腾堡公园（Fort Totten Park）则保存着内战时期的要塞，并设季节性泳池、滨水步道，以及沿海湾的观鸟去处。奥克兰湖（Oakland Lake）与布鲁克林-皇后绿道为步行与骑行增添更多线路。\n\n对通勤者而言，长岛铁路华盛顿港支线是最大亮点。贝尔大道旁的贝赛车站，视快车或慢车而定，约28至35分钟即可抵达宾州车站，使这里成为皇后区低密度、以独栋住宅为主区域中通往曼哈顿较快的铁路通勤之一。",
    },
  },
];

/** Hero art direction — replace with owned photography for launch. */
export const heroImage = {
  src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  alt: "A bright, contemporary New York home at dusk",
};


/** Evergreen "at a glance" facts per neighborhood (durable, not prices). */
export const neighborhoodGlance: Record<
  string,
  {
    transit: { en: string; zh: string };
    schools: { en: string; zh: string };
    character: { en: string; zh: string };
    bestFor: { en: string; zh: string };
  }
> = {
  "flushing": {
    transit: { en: "A true transit hub: the 7 subway and the LIRR Port Washington Branch meet at Flushing–Main Street, joined by one of Queens' busiest bus networks (Q-line and SBS service). Rare walk-everywhere access for the borough.", zh: "名副其实的交通枢纽：7 号线地铁与长岛铁路 Port Washington 支线在法拉盛-缅街站交汇，再加上皇后区最繁忙的公交网络之一（多条 Q 线及 SBS 快速公交）。在本区中少见的「步行即达」便利。" },
    schools: { en: "Served by NYC public schools (largely District 25), with specialized and dual-language programs that draw families; many also weigh nearby private and parochial options.", zh: "隶属纽约市公立学校系统（主要为第 25 学区），设有吸引家庭的特殊项目与双语课程；不少家庭也会考虑周边的私立与教会学校。" },
    character: { en: "A dense, fast-moving downtown core — one of New York's premier Asian commercial and dining districts — where new-construction condos rise beside long-established blocks of shops and restaurants.", zh: "密集而快节奏的市中心核心区——纽约首屈一指的亚裔商业与餐饮聚集地之一——新建公寓与历史悠久的商铺、餐馆街区比邻而立。" },
    bestFor: { en: "Best for buyers who want urban energy, transit, and condo living, plus investors drawn to steady rental and resale demand near the station.", zh: "适合想要都市活力、便捷交通与公寓生活的买家，以及看重车站周边稳定租售需求的投资者。" },
  },
  "long-island-city": {
    transit: { en: "Among the most connected neighborhoods in NYC: the 7, E, M and G (plus the F on weekdays) converge at Court Square, putting Midtown roughly one stop and a few minutes away, with NYC Ferry at Hunters Point as a scenic alternative.", zh: "纽约市连通性最强的社区之一：7、E、M、G 线（工作日另有 F 线）在 Court Square 站汇集，到中城大约一站、几分钟即达，Hunters Point 的 NYC 渡轮则是风景宜人的另一选择。" },
    schools: { en: "Part of the NYC public school system (District 30), alongside a growing roster of charter, private, and pre-K options that families compare.", zh: "属于纽约市公立学校系统（第 30 学区），并有日益增多的特许、私立及学前班选择供家庭比较。" },
    character: { en: "A former industrial waterfront reborn as a skyline of glass towers, riverfront parks, and a lively arts and dining scene looking straight across the East River at Manhattan.", zh: "昔日的工业滨水区，如今重生为玻璃高层的天际线，拥有滨河公园与热闹的艺术、餐饮场景，隔着东河正对曼哈顿。" },
    bestFor: { en: "Best for buyers and renters who want new-construction amenities, skyline views, and the shortest possible commute to Midtown.", zh: "适合想要新建配套、天际线景观，以及通往中城最短通勤的买家与租客。" },
  },
  "great-neck": {
    transit: { en: "On the LIRR Port Washington Branch with direct service to Penn Station and Grand Central; peak express trains reach Midtown in roughly half an hour, making it one of the quicker North Shore commutes.", zh: "位于长岛铁路 Port Washington 支线，直达宾州车站与中央车站；高峰时段的快车约半小时即抵中城，是北岸较快的通勤之一。" },
    schools: { en: "Great Neck Union Free School District is a long-standing top-tier Nassau County district, consistently rated among the strongest in New York State.", zh: "Great Neck 联合自由学区是拿骚县长期稳居顶尖的学区，始终位列纽约州最强学区之中。" },
    character: { en: "A cluster of North Shore villages defined by tree-lined streets, waterfront parks on Manhasset Bay, and a housing mix from classic colonials to modern builds.", zh: "一组北岸村镇，以林荫街道、Manhasset 湾畔的滨水公园，以及从经典殖民式到现代新建的多元住宅著称。" },
    bestFor: { en: "Best for families and commuters who want top schools and suburban space within a quick, direct ride to Manhattan.", zh: "适合想要顶级学校与郊区空间、又能快速直达曼哈顿的家庭与通勤者。" },
  },
  "manhasset": {
    transit: { en: "The Manhasset LIRR station (Plandome Road) sits on the Port Washington Branch with direct trains to Penn Station and Grand Central — a short, reliable North Shore commute.", zh: "Manhasset 长岛铁路车站（Plandome Road）位于 Port Washington 支线，直达宾州车站与中央车站——一段短而可靠的北岸通勤。" },
    schools: { en: "Manhasset Union Free School District is a small, highly regarded district; its secondary school ranks among the very top public schools in New York year after year.", zh: "Manhasset 联合自由学区是一所规模不大却备受推崇的学区，其中学连年位列纽约州顶尖公立学校之中。" },
    character: { en: "A gracious North Shore community of tree-lined streets and classic colonial and estate homes, anchored by the upscale Miracle Mile shopping district on Northern Boulevard.", zh: "一处优雅的北岸社区，林荫街道间散落着经典殖民式与庄园式住宅，并以 Northern Boulevard 上的高端购物区「Miracle Mile」为核心。" },
    bestFor: { en: "Best for families seeking estate-style space, premier schools, and high-end shopping within an easy commute to the city.", zh: "适合追求庄园式空间、顶尖学校与高端购物，同时通勤进城便捷的家庭。" },
  },
  "syosset": {
    transit: { en: "Syosset's LIRR station, on the Port Jefferson Branch, offers direct service to Penn Station and Grand Central, while the LIE and Northern State Parkway keep the area well connected by car.", zh: "Syosset 的长岛铁路车站位于 Port Jefferson 支线，直达宾州车站与中央车站；长岛快速路（LIE）与 Northern State Parkway 也让该区在自驾上四通八达。" },
    schools: { en: "Syosset Central School District is one of the most acclaimed districts in the state and nation — repeatedly ranked at or near the top of New York's public school districts.", zh: "Syosset 中央学区是全州乃至全美最受赞誉的学区之一——屡次位列纽约州公立学区的榜首或前列。" },
    character: { en: "A heart-of-Nassau community with a walkable downtown along Jackson Avenue, parks and recreation close by, and homes from mid-century classics to updated colonials on generous lots.", zh: "位于拿骚县腹地的社区，Jackson Avenue 沿线有可步行的市中心，公园与休闲设施近在咫尺，住宅从世纪中叶经典款到地块宽敞、翻新过的殖民式不等。" },
    bestFor: { en: "Best for families prioritizing nationally ranked schools alongside a walkable downtown and classic suburban lots.", zh: "适合把全美知名学校放在首位，同时看重可步行市中心与经典郊区地块的家庭。" },
  },
  "jericho": {
    transit: { en: "Jericho has no station of its own; commuters use the nearby Hicksville and Syosset LIRR stations for direct Manhattan service, while the Long Island Expressway and Northern State Parkway make for an easy drive.", zh: "Jericho 本身没有车站；通勤者借由邻近的 Hicksville 与 Syosset 长岛铁路车站直达曼哈顿，长岛快速路与 Northern State Parkway 则让自驾轻松便捷。" },
    schools: { en: "Jericho Union Free School District is among the most decorated in the country, consistently ranked New York's #1 public school district and one of the very best nationally.", zh: "Jericho 联合自由学区是全美最受表彰的学区之一，长期被评为纽约州第一、并跻身全美最佳之列。" },
    character: { en: "A quiet, established Nassau County hamlet of residential streets and a central location, anchored by landmarks like the historic Milleridge Inn.", zh: "一处宁静、成熟的拿骚县社区，住宅街道与中心地段相映，并以历史悠久的 Milleridge Inn 等地标为依托。" },
    bestFor: { en: "Best for families who put top-ranked schools first and value quiet streets with quick highway access.", zh: "适合把顶级学区放在第一位、并看重安静街道与便捷高速通行的家庭。" },
  },
  "tribeca": {
    transit: { en: "1/2/3 and A/C/E trains, with R/W and 4/5/6 nearby; Chambers Street is the main hub, putting Midtown and downtown within a short ride.", zh: "1/2/3 与 A/C/E 线，近旁还有 R/W 与 4/5/6 线；Chambers Street 为主枢纽，中城与下城均仅数站之遥。" },
    schools: { en: "Tribeca falls within Community School District 2, which serves much of Lower Manhattan.", zh: "Tribeca 隶属第 2 学区（District 2），覆盖下城大部分区域。" },
    character: { en: "Quiet, low-rise, and residential, with converted warehouse lofts — high ceilings, exposed brick, large windows — alongside modern luxury condos with skyline and harbor views.", zh: "安静、低层、宜居，仓库改造阁楼（挑高天花、裸砖、大窗）与可眺望天际线和港湾的现代豪华公寓并存。" },
    bestFor: { en: "Buyers who want a spacious loft or a view-oriented luxury condo in a calm, walkable downtown setting with fast transit in every direction.", zh: "适合希望在静谧宜步行的下城置入宽敞阁楼或景观豪华公寓、且看重四通八达交通的买家。" },
  },
  "financial-district": {
    transit: { en: "The 1/2/3, 4/5, A/C/E, J/Z, and R/W trains plus PATH and ferries make this the most transit-dense pocket of Lower Manhattan.", zh: "1/2/3、4/5、A/C/E、J/Z、R/W 各线，加上 PATH 与渡轮，使其成为下城交通最密集的区域。" },
    schools: { en: "The Financial District is part of Community School District 2, serving Lower Manhattan.", zh: "金融区属第 2 学区（District 2），覆盖下城区域。" },
    character: { en: "Historic office towers converted to apartments alongside new luxury high-rises, ranging from prewar conversions with grand lobbies to amenity-rich condos with harbor views.", zh: "历史办公塔改建公寓与新建豪华高层并存，从拥有宏伟大堂的战前改造单元到配套丰富、坐拥港景的公寓皆有。" },
    bestFor: { en: "Buyers who prize a short downtown commute and the densest transit access in the city, in a high-rise condo with waterfront and skyline views.", zh: "适合看重下城短途通勤与全城最密集交通、并钟意坐拥水景与天际线的高层公寓的买家。" },
  },
  "upper-west-side": {
    transit: { en: "The 1/2/3 under Broadway and the B/C along Central Park West, with the 81st Street station feeding the natural history museum and crosstown buses linking the East Side.", zh: "Broadway 下的 1/2/3 线与中央公园西大道的 B/C 线，81 街站直通自然历史博物馆，横贯公交连接东区。" },
    schools: { en: "The Upper West Side sits within Community School District 3, which covers Manhattan's West Side above 59th Street.", zh: "上西区属第 3 学区（District 3），覆盖 59 街以北的曼哈顿西侧。" },
    character: { en: "Co-op-dominant prewar apartment houses and tree-lined brownstone side streets, with condominiums and converted townhouses rounding out the mix.", zh: "以合作公寓为主的战前公寓与林荫褐石侧街，辅以共有产权公寓与改造联排屋。" },
    bestFor: { en: "Buyers who want a spacious prewar co-op near Central Park, Riverside Park, and Lincoln Center, with classic layouts and an unhurried residential pace.", zh: "适合希望在中央公园、Riverside Park 与林肯中心附近置入格局经典、节奏从容的宽敞战前合作公寓的买家。" },
  },
  "upper-east-side": {
    transit: { en: "The 4/5 express and 6 local under Lexington Avenue, plus the Second Avenue Subway's Q at 72nd, 86th, and 96th, with crosstown buses to the West Side.", zh: "Lexington Avenue 下的 4/5 快车与 6 号慢车，加上第二大道地铁 Q 线（72、86、96 街），并有横贯公交直达西区。" },
    schools: { en: "The Upper East Side is part of Community School District 2, which serves much of the East Side and Lower Manhattan.", zh: "上东区属第 2 学区（District 2），覆盖东区大部及下城。" },
    character: { en: "Stately prewar co-ops with formal layouts and full service, plus postwar and contemporary condos and limestone-and-brownstone townhouses along Fifth, Madison, and Park.", zh: "格局正式、服务周全的庄重战前合作公寓，辅以战后及当代共有产权公寓，以及第五、麦迪逊、公园大道沿线的石灰岩与褐石联排屋。" },
    bestFor: { en: "Buyers who want a refined prewar co-op or full-service condo near Central Park, Museum Mile, and Madison Avenue, with reliable Lexington and Second Avenue transit.", zh: "适合希望在中央公园、博物馆大道与麦迪逊大道附近置入考究战前合作公寓或全服务公寓、并看重 Lexington 与第二大道便捷交通的买家。" },
  },
  "soho": {
    transit: { en: "The 6 on Lafayette, N/R/W on Broadway, and B/D/F/M at Broadway–Lafayette, with A/C/E and 1 just west — a central location reaching uptown, downtown, and Brooklyn fast.", zh: "Lafayette 上的 6 号线、Broadway 上的 N/R/W 线、Broadway–Lafayette 交汇的 B/D/F/M 线，西侧紧邻 A/C/E 与 1 号线——中心地段，上下城与布鲁克林皆可速达。" },
    schools: { en: "SoHo is part of Community School District 2, which serves much of Lower Manhattan.", zh: "SoHo 属第 2 学区（District 2），覆盖下城大部分区域。" },
    character: { en: "A cast-iron historic district of airy artist-era lofts and luxury loft conversions — soaring ceilings, columns, oversized windows — with some prewar walk-ups and new condos.", zh: "铸铁历史保护区，通透的艺术家时代阁楼与豪华阁楼改造单元（挑高天花、立柱、超大窗户），辅以部分战前免电梯公寓与新建公寓。" },
    bestFor: { en: "Buyers who want a light-filled loft with open volume and high ceilings in a central, design- and gallery-rich district with flagship shopping at the door.", zh: "适合希望在设计与画廊云集、旗舰购物近在门前的中心街区，置入采光充沛、空间开阔、挑高天花阁楼的买家。" },
  },
  "roslyn": {
    transit: { en: "The Roslyn LIRR station sits on the Port Washington Branch with direct trains to Penn Station and Grand Central Madison; peak service reaches Midtown in roughly 40 to 50 minutes with no transfer.", zh: "Roslyn 长岛铁路车站位于 Port Washington 支线，直达宾州车站与 Grand Central Madison；高峰时段约 40 至 50 分钟抵达中城，无需换乘。" },
    schools: { en: "The Roslyn Union Free School District is a long-regarded Nassau County district, with Roslyn High School consistently rated among the stronger public high schools in New York State.", zh: "Roslyn 联合自由学区是拿骚县长期备受认可的学区，Roslyn 高中始终位列纽约州较为优秀的公立高中之中。" },
    character: { en: "A preserved historic village of colonials, Tudors, and estate properties on wooded lots, anchored by a storybook Main Street, a duck pond, and the landmark clock tower.", zh: "一座保存完好的历史村镇，林木地块上散布着殖民式、都铎式住宅与庄园物业，以如画的 Main Street、鸭池及地标钟楼为核心。" },
    bestFor: { en: "Best for buyers who want a walkable historic downtown and gracious North Shore homes within a direct, transfer-free commute to the city.", zh: "适合想要可步行的历史市中心与优雅北岸住宅、同时通勤进城可直达且无需换乘的买家。" },
  },
  "port-washington": {
    transit: { en: "Port Washington is the eastern terminus of the LIRR Port Washington Branch, with frequent direct trains to Penn Station and Grand Central Madison — roughly 35 to 45 minutes to Midtown with no transfer.", zh: "Port Washington 是长岛铁路 Port Washington 支线的东端终点，频密直达列车通往宾州车站与 Grand Central Madison——到中城约 35 至 45 分钟，无需换乘。" },
    schools: { en: "The Port Washington Union Free School District includes Paul D. Schreiber Senior High School, which regularly produces Regeneron Science Talent Search semifinalists and finalists.", zh: "Port Washington 联合自由学区下辖 Paul D. Schreiber 高中，该校常有学生入围 Regeneron 科学人才选拔赛（Science Talent Search）的半决赛与决赛。" },
    character: { en: "A walkable waterfront town with a lively Main Street downtown and a working harbor, spanning co-ops and condos near the station, mid-century capes and colonials, and waterfront estates in Sands Point.", zh: "一座可步行的滨水小镇，拥有热闹的 Main Street 市中心与运作中的码头，住宅涵盖车站附近的合作及共管公寓、世纪中叶的 Cape 与殖民式住宅，以及 Sands Point 的滨水庄园。" },
    bestFor: { en: "Best for buyers who want a walkable downtown, boating and waterfront living, and one of the North Shore's quickest direct commutes to Midtown.", zh: "适合想要可步行市中心、划船与滨水生活，以及北岸最快捷之一、直达中城通勤的买家。" },
  },
  "garden-city": {
    transit: { en: "The Garden City station sits on the LIRR Hempstead Branch; many Penn Station trips connect at Jamaica, while select Hempstead Branch trains now run directly to Grand Central Madison.", zh: "Garden City 车站位于长岛铁路 Hempstead 支线；许多前往宾州车站的行程在 Jamaica 换乘，部分 Hempstead 支线列车如今亦直达 Grand Central Madison。" },
    schools: { en: "The Garden City Union Free School District is a high-performing Nassau County district, well regarded for both academics and a strong athletics tradition.", zh: "Garden City 联合自由学区是拿骚县表现优异的学区，在学术与深厚的体育传统两方面皆备受推崇。" },
    character: { en: "A 19th-century planned village of wide, tree-lined boulevards lined with stately colonials, Tudors, and center-hall homes, anchored by a walkable downtown and the historic Garden City Hotel.", zh: "一座 19 世纪规划而成的村镇，宽阔林荫大道两旁矗立着气派的殖民式、都铎式与中央门厅式住宅，以可步行的市中心及历史悠久的 Garden City Hotel 为核心。" },
    bestFor: { en: "Best for buyers who want architectural character and a walkable downtown in an established, parklike village with a strong public-school district.", zh: "适合想要在一座成熟、宛如公园的村镇中，拥有建筑特色与可步行市中心、且学区优秀的买家。" },
  },
  "old-westbury": {
    transit: { en: "Old Westbury has no station of its own; commuters drive to the nearby Westbury station on the Main Line or to Hicksville, both with direct service to Penn Station and Grand Central Madison in roughly 40 minutes at peak.", zh: "Old Westbury 本身没有车站；通勤者驾车前往邻近 Main Line 上的 Westbury 车站或 Hicksville，两者皆可直达宾州车站与 Grand Central Madison，高峰时段约 40 分钟。" },
    schools: { en: "The village spans several school districts — East Williston, Jericho, and Westbury among them — so district assignment depends on the specific property; East Williston and Jericho are both highly regarded Nassau County districts.", zh: "村镇跨越多个学区——包括 East Williston、Jericho 与 Westbury——因此学区归属取决于具体物业；East Williston 与 Jericho 均为拿骚县备受推崇的学区。" },
    character: { en: "A Gold Coast estate village of large-acreage properties, long private drives, and preserved woodland, spanning Colonial Revival manors, brick Georgians, and modern custom builds, many with stables, pools, or tennis courts.", zh: "一座黄金海岸的庄园村镇，遍布大面积物业、悠长私人车道与受保护的林地，建筑横跨殖民复兴式宅邸、砖砌乔治亚式与现代定制住宅，许多配有马厩、泳池或网球场。" },
    bestFor: { en: "Best for buyers who want privacy, acreage, and estate-scale homes — including horse properties — within a short drive of the city's rail connections.", zh: "适合想要私密性、大面积地块与庄园级住宅（包括马场物业），且距城市铁路连接仅短途车程的买家。" },
  },
  "forest-hills": {
    transit: { en: "E and F express plus M and R trains at Forest Hills-71st Avenue, with an LIRR station within walking distance for fast Penn Station and Grand Central service.", zh: "森林小丘-71大道站有E、F快车及M、R线，长岛铁路车站亦在步行范围内，可快速通往宾州车站与中央车站。" },
    schools: { en: "Served by NYC Public Schools District 28, with neighborhood options including P.S. 101 The School in the Gardens, P.S. 196 Grand Central Parkway, J.H.S. 190 Russell Sage, and Forest Hills High School.", zh: "隶属纽约市公立学校第28学区，社区内学校包括P.S. 101 花园学校、P.S. 196 大中央公园路、J.H.S. 190 Russell Sage 初中以及森林小丘高中。" },
    character: { en: "Calm, leafy, and architecturally rich, with Forest Hills Gardens Tudors, pre-war co-ops, and modern apartments side by side.", zh: "宁静、绿意盎然、建筑底蕴深厚，森林小丘花园的都铎宅邸、战前合作公寓与现代公寓比邻而立。" },
    bestFor: { en: "Buyers who want pre-war co-op charm or a Tudor on a tree-lined street, walkable Austin Street dining, and a fast express-train commute to Midtown.", zh: "适合钟意战前合作公寓韵味或林荫街道上都铎住宅、喜爱步行可达的奥斯汀街餐饮、并需要快车直通中城通勤的买家。" },
  },
  "bayside": {
    transit: { en: "LIRR Port Washington Branch from Bayside station reaches Penn Station in about 28 to 35 minutes; local buses connect to subway lines in neighboring areas.", zh: "长岛铁路华盛顿港支线由贝赛车站出发，约28至35分钟可达宾州车站；本地巴士可接驳邻近区域的地铁线路。" },
    schools: { en: "Served by NYC Public Schools District 26, with neighborhood options including P.S. 31 Bayside, M.S. 158 Marie Curie, and Bayside High School.", zh: "隶属纽约市公立学校第26学区，社区内学校包括P.S. 31 贝赛小学、M.S. 158 玛丽·居里初中以及贝赛高中。" },
    character: { en: "Suburban in feel within the city — detached houses with driveways and yards, a walkable Bell Boulevard, and waterfront parks.", zh: "身处城市却具郊区气息——配有车道与庭院的独栋住宅、适宜步行的贝尔大道，以及滨水公园。" },
    bestFor: { en: "Buyers seeking a detached single-family house with a yard and driveway, walkable Bell Boulevard dining, and a quick LIRR commute to Penn Station.", zh: "适合寻求带庭院与车道的独栋单户住宅、喜爱步行可达的贝尔大道餐饮、并希望搭乘长岛铁路快速通往宾州车站的买家。" },
  },
};
