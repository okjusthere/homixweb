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
  "/communities",
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
      { key: "communities", href: "/communities" },
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
    "name": "Flushing",
    "slug": "flushing",
    "region": "Queens",
    "blurb": "Downtown energy, transit, and new-construction condos in the heart of Queens.",
    "image": "/neighborhoods/covers/flushing.jpg",
    "photoCredit": "Kidfly182 · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Flushing_Queens_March_2022_076.jpg",
    "guide": {
      "en": "Downtown Flushing centers on the intersection of Main Street and Roosevelt Avenue, one of New York City's busiest commercial and dining cores outside Manhattan. The blocks immediately around Main Street have been reshaped by a sustained condominium boom: large mixed-use towers such as Tangram (anchored at College Point Boulevard and 39th Avenue, with a food hall and a 4DX cinema) and the Sky View Parc complex along College Point Boulevard pair newly built apartments with retail, hotels, and offices, and additional mid-rise condos continue to rise along Sanford and Roosevelt Avenues. Step a few blocks out and the texture changes entirely. Murray Hill and the Broadway-Flushing Historic District—the latter listed on the State and National Registers—are quiet, tree-lined enclaves of detached single-family houses and a scattering of two-family homes in early-to-mid-20th-century styles. The result is a wide spectrum of ownership: glassy new condos and co-ops downtown at accessible-to-mid price tiers, and detached houses on generous lots that command a meaningful premium and represent the area's upper end.\n\nFor transit, Flushing-Main Street is the eastern terminus of the 7 subway, a single-seat ride to Long Island City, Grand Central, and Times Square. At the same intersection, the Long Island Rail Road's Port Washington Branch stops at Flushing-Main Street and reaches Penn Station in roughly 20 minutes, with direct service also reaching Grand Central Madison on the East Side. More than twenty bus routes converge here, making it one of the largest bus hubs in Queens, while the Whitestone Expressway and Van Wyck Expressway connect to LaGuardia Airport and the wider region.\n\nFlushing Meadows-Corona Park, one of the city's largest parks, lies just south and holds the Unisphere, Citi Field, and the USTA Billie Jean King National Tennis Center, host of the US Open. The downtown commercial district is anchored by sprawling indoor malls and food halls—New World Mall's basement food court on Roosevelt Avenue is among the largest in the country—alongside dense restaurant rows, bakeries, bubble-tea shops, and well-stocked Asian supermarkets. Schools fall within NYC Geographic District 25; named campuses include Flushing High School, the city's oldest public high school, and Townsend Harris High School, with Queens College nearby in adjacent Kew Gardens Hills.",
      "zh": "法拉盛市中心以缅街（Main Street）与罗斯福大道（Roosevelt Avenue）交汇处为核心，是曼哈顿以外纽约市最繁忙的商业与餐饮中心之一。缅街周边街区近年因持续的公寓开发热潮而面貌一新：Tangram（坐落于College Point大道与39大道交会处，内设美食广场及4DX影院）、沿College Point大道展开的Sky View Parc等大型综合体，将全新住宅与商场、酒店、写字楼融为一体；Sanford大道、罗斯福大道沿线也不断有中层公寓拔地而起。但只要往外走几个街区，城市肌理便截然不同。Murray Hill与已列入州及国家历史名录的Broadway-Flushing历史保护区，是绿树成荫的宁静住宅区，以二十世纪初至中叶风格的独立式单户住宅为主，间杂少量双户住宅。由此形成丰富的产权层次：市中心的全新公寓与合作公寓价位亲民至中档，而独立屋占地宽裕、价格更高，代表本区的高端段位。\n\n交通方面，法拉盛缅街站是地铁7号线的东端终点，可一线直达长岛市、中央车站与时报广场。同一路口的长岛铁路（LIRR）Port Washington支线在此设站，约20分钟即达宾州车站（Penn Station），并有直达班次通往曼哈顿东区的Grand Central Madison。逾二十条公交线路在此汇集，是皇后区最大的公交枢纽之一；Whitestone快速路与Van Wyck快速路则通往拉瓜迪亚机场及更广阔的区域。\n\n紧邻其南的法拉盛草原可乐娜公园（Flushing Meadows-Corona Park）是全市最大的公园之一，园内有地球仪（Unisphere）、花旗球场（Citi Field）以及承办美网公开赛的USTA比莉·简·金国家网球中心。市中心商业区以大型室内商场与美食广场为支点——罗斯福大道上New World Mall地下美食广场为全美规模最大者之一——并密布餐馆街、烘焙店、珍珠奶茶店及货品齐全的亚洲超市。学区隶属纽约市第25学区，知名校园包括全市历史最悠久的公立高中法拉盛高中（Flushing High School）与Townsend Harris高中，邻近的Kew Gardens Hills还设有皇后学院（Queens College）。"
    }
  },
  {
    "name": "Long Island City",
    "slug": "long-island-city",
    "region": "Queens",
    "blurb": "Waterfront towers and skyline views, minutes from Midtown.",
    "image": "/neighborhoods/covers/long-island-city.jpg",
    "photoCredit": "Kidfly182 · CC BY 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Long_Island_City_Skyline_2026.jpg",
    "guide": {
      "en": "Long Island City sits at the western edge of Queens, across the East River from Midtown Manhattan — a former industrial dockyard remade into a wall of glass residential towers. The housing stock skews decisively new. Along Center Boulevard and the Hunters Point South redevelopment, high-rise condominiums and rentals dominate, many built within the past fifteen years. Projects like Gotham Point and Paragon, which folds the historic Paragon Paint Factory into its base, mix market-rate and income-restricted units. Inland toward Court Square, converted lofts and prewar walk-ups offer more accessible entry points than the waterfront towers.\n\nTransit is the neighborhood's defining advantage. The Court Square complex links the 7, E, and G at all times, the M on weekdays, and the F during rush hours — one stop under the river into Manhattan. The 7 from Vernon Boulevard–Jackson Avenue reaches Grand Central in roughly 7 minutes. The LIRR's Hunterspoint Avenue and Long Island City stations sit on the Main Line but run peak-direction rush hours only, so the subway is the everyday spine; NYC Ferry boards at Hunters Point South and LIC Landing for Midtown and Lower Manhattan.\n\nOpen space is the waterfront's signature. The contiguous Gantry Plaza State Park (12 acres, named for its preserved rail-car gantries) and Hunters Point South Park (11 acres) frame an East River esplanade with playgrounds, playing fields, and kayak launches. MoMA PS1 — a Museum of Modern Art affiliate in an 1892 Romanesque Revival former schoolhouse — anchors a scene of galleries and studios, while Vernon Boulevard is the dining-and-retail spine of cafes, bakeries, and restaurants. Schools fall within NYC Community School District 30; options include P.S./I.S. 78Q on Center Boulevard and P.S. 384, known as Hunters Point Elementary.",
      "zh": "长岛市（Long Island City，简称 LIC）位于皇后区最西端，隔东河与曼哈顿中城相望——昔日的工业码头，如今已被一排排玻璃幕墙住宅塔楼取代。这里的房源以新建为主。沿 Center Boulevard 一线及 Hunters Point South 改造区，高层共管公寓（condo）与出租公寓占据主导，多为近十五年内交付。Gotham Point，以及把历史建筑 Paragon 油漆厂融入裙楼的 Paragon 等项目，混合了市场价与限价（income-restricted）单元。往内陆靠近 Court Square，改造 loft 与战前步梯楼则比滨水塔楼提供更易入手的选择。\n\n交通是本区最大的优势。Court Square 换乘枢纽全天接驳 7、E、G 线，工作日另有 M 线，高峰时段另有 F 线——一站即可穿越东河进入曼哈顿。从 Vernon Blvd–Jackson Ave 乘 7 号线，约 7 分钟即达中央车站（Grand Central）。长岛铁路（LIRR）的 Hunterspoint Avenue 与 Long Island City 两站虽位于干线（Main Line），却仅在高峰时段单向运行，故地铁才是日常主力；NYC Ferry 渡轮则于 Hunters Point South 与 LIC Landing 登船，通往中城与下城。\n\n滨水开放空间是本区的招牌。相连的 Gantry Plaza 州立公园（12 英亩，因保留的铁路货运龙门架而得名）与 Hunters Point South 公园（11 英亩），共同围出一条东河滨水步道，配有游乐场、运动场与皮划艇下水点。MoMA PS1——隶属现代艺术博物馆、坐落于一栋 1892 年罗马式复兴风格旧校舍内——是本区画廊与工作室氛围的核心，而 Vernon Boulevard 则是咖啡馆、烘焙店与餐厅林立的餐饮零售主轴。学区方面，本区属纽约市第 30 学区（Community School District 30），社区公立学校包括 Center Boulevard 上的 P.S./I.S. 78Q，以及被称为 Hunters Point Elementary 的 P.S. 384。"
    }
  },
  {
    "name": "Great Neck",
    "slug": "great-neck",
    "region": "Long Island",
    "blurb": "Gracious homes and waterfront parks on Long Island's North Shore.",
    "image": "/neighborhoods/covers/great-neck.jpg",
    "photoCredit": "AITFFan1 · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Steppingstone_Park,_Kings_Point,_NY_August_14,_2022.jpg",
    "guide": {
      "en": "Great Neck occupies a leafy peninsula on the North Shore of Long Island, jutting into Manhasset Bay and Long Island Sound within the Town of North Hempstead. It is not one town but a mosaic of nine incorporated villages — among them Kings Point, Great Neck Estates, Russell Gardens, Kensington, Saddle Rock, and the compact downtown of Great Neck Plaza — each with its own character. This is Fitzgerald's Gold Coast, the peninsula that inspired the \"West Egg\" of The Great Gatsby, and the Jazz Age legacy still shows in grand estates and stately stone gateposts. The housing stock spans from classic center-hall Colonials, Tudors, and ranches on generous lots to contemporary new construction and waterfront properties; the larger estates in Kings Point sit at the top of the market, while elevator co-ops and newer condominiums clustered near Great Neck Plaza offer more accessible entry points. Detached houses, two-family homes, and apartment-style ownership all coexist across the peninsula.\n\nFor commuters, the Long Island Rail Road Port Washington Branch is the anchor. From the Great Neck station, trains reach Penn Station in roughly 25 to 35 minutes, with a few peak departures running express; since 2023 the branch has also fed Grand Central Madison, opening a one-seat ride to Manhattan's East Side. By car, Northern Boulevard (Route 25A) crosses the peninsula's base, with the Long Island Expressway (I-495) and the Northern State Parkway a short drive south for routes east and into the city.\n\nOpen space hugs the water: Steppingstone Park, in Kings Point, offers a Sound-front marina, lawns, and skyline views, while the Great Neck Park District maintains pools, tennis, and recreation facilities, with Manhasset Bay framing the waterfront. The commercial heart is Great Neck Plaza, a walkable downtown along Middle Neck Road with more than 250 shops and restaurants, cafes, bakeries, and boutiques. Public education is provided by Great Neck Public Schools (Union Free School District No. 7), whose campuses include John L. Miller Great Neck North High School and William A. Shine Great Neck South High School, along with several elementary and middle schools across the district.",
      "zh": "大颈区（Great Neck）坐落于长岛北岸一处绿树成荫的半岛，伸入曼哈塞特湾（Manhasset Bay）与长岛海湾（Long Island Sound）之间，隶属北亨普斯特德镇。它并非单一市镇，而是由九个独立建制村落组成的拼图——其中包括金斯点（Kings Point）、大颈庄园（Great Neck Estates）、罗素花园（Russell Gardens）、肯辛顿、马鞍石，以及紧凑的市中心大颈广场（Great Neck Plaza）——各具风貌。这里正是菲茨杰拉德笔下的\"黄金海岸\"，启发《了不起的盖茨比》中\"西卵\"的半岛，爵士时代的气派至今仍留存于庄园宅邸与石砌门柱之间。住宅类型从大地块上的经典中厅式殖民屋、都铎式与平层别墅，到现代新建住宅与滨水物业，一应俱全；金斯点的大型庄园位居市场顶端，而聚集在大颈广场一带的电梯公寓（co-op）与新建共管公寓（condo）则提供门槛更低的入门选择。独栋、双拼与公寓式产权在半岛上并存。\n\n通勤方面，长岛铁路（LIRR）的华盛顿港支线是核心。从大颈站出发，列车约25至35分钟即可抵达宾州车站（Penn Station），少数高峰班次为快车直达；自2023年起，该支线亦接入大中央麦迪逊站（Grand Central Madison），一车直达曼哈顿东区。自驾方面，北方大道（25A公路）横贯半岛根部，长岛高速（I-495）与北州景观公路（Northern State Parkway）均在南侧不远处，可东行或进城。\n\n开放空间紧邻水岸：位于金斯点的步石公园（Steppingstone Park）设有面朝长岛海湾的码头、草坪与城市天际线景观；大颈公园区另设泳池、网球及康乐设施，曼哈塞特湾勾勒出滨水轮廓。商业核心是大颈广场，沿中颈路（Middle Neck Road）展开的步行式市中心，汇聚250余家店铺与餐厅、咖啡馆、烘焙店及精品店。公立教育由大颈公立学校系统（第7号独立学区）提供，校园包括约翰·L·米勒大颈北高中、威廉·A·夏恩大颈南高中，以及学区内多所小学与初中。"
    }
  },
  {
    "name": "Manhasset",
    "slug": "manhasset",
    "region": "Long Island",
    "blurb": "Gracious North Shore homes, the Miracle Mile, and a short LIRR ride to the city.",
    "image": "/neighborhoods/covers/manhasset.jpg",
    "photoCredit": "AITFFan1 · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Plandome_Pond_Park,_Manhasset,_Long_Island,_New_York_August_2,_2021.jpg",
    "guide": {
      "en": "Manhasset sits on the North Shore of Nassau County, just east of the Queens line along Manhasset Bay, and grew from early-20th-century country estates into one of Long Island's long-established residential communities. The housing is overwhelmingly detached single-family, and the architecture reads like a catalog of the era: center-hall Colonials, Tudors, Cape Cods, and Mediterranean-style stucco homes with red-tile roofs, most built from the 1920s through the 1940s on generous, landscaped lots. Distinct enclaves give the hamlet its texture — neighborhoods near the water around the incorporated village of Plandome carry grander estate-scale homes, while the Strathmores, carved from former estate land, mix classic Colonials and early ranches with substantial properties. Pricing sits firmly in the upper tier of the Long Island market, with entry-level houses well into seven figures and estate-caliber homes ranging considerably higher; co-ops and condos are limited, so buyers here are largely purchasing detached houses.\n\nFor commuters, the Long Island Rail Road's Port Washington Branch is the anchor. The Manhasset station, at Plandome Road and Maple Place, sits about 17 miles from Midtown; peak trains reach Penn Station in roughly 28 to 38 minutes, and because this branch runs to both Penn Station and Grand Central Madison without a Jamaica transfer, the East Side is equally reachable. The neighboring village of Plandome has its own station as well. Drivers rely on the Long Island Expressway (I-495) and the Northern State Parkway just to the south, with Northern Boulevard (Route 25A) cutting through town as the main east-west surface route.\n\nManhasset's signature draw is Americana Manhasset, the open-air luxury center anchoring the \"Miracle Mile\" along Northern Boulevard, where roughly sixty designer shops — among them Hermes, Chanel, Cartier, Louis Vuitton, London Jewelers, and Hirshleifers — sit alongside restaurants such as Cipollini and Toku. Green space is woven through town: Whitney Pond Park offers a pond, tennis, basketball and handball courts, walking paths and a community pool, while Mary Jane Davies Green provides a gazebo, playground and lawn, and Manhasset Valley Park adds further trails. Education is served by the Manhasset Union Free School District (District No. 6 of North Hempstead), whose schools include Munsey Park Elementary and Shelter Rock Elementary for grades K-6, with all students continuing to Manhasset Secondary School for grades 7 through 12.",
      "zh": "曼哈塞特（Manhasset）位于纳苏县北岸，紧邻皇后区东侧、临曼哈塞特湾，由二十世纪初的乡村庄园逐步发展为长岛历史悠久的住宅社区之一。这里几乎清一色为独栋单户住宅，建筑风格宛如一部时代图鉴：中央门厅式殖民风（Colonial）、都铎风、科德角小屋，以及红瓦白墙的地中海灰泥宅邸，多建于1920至1940年代，坐落于宽敞且精心修整的地块之上。各处聚落各具气质——临水、邻近独立建制村庄普兰多姆（Plandome）一带的宅邸更显庄园气派；由旧庄园用地开发而成的斯特拉斯莫尔（Strathmore）一带，则融合经典殖民风与早期牧场式住宅。价位稳居长岛市场高端，入门房源即达七位数中高段，庄园级宅邸则高出许多；公寓与共有产权房极少，购房者基本都是在选购独栋住宅。\n\n通勤方面，长岛铁路（LIRR）的华盛顿港线是核心依托。曼哈塞特站位于普兰多姆路与枫树坊交口，距中城约17英里；高峰时段列车约28至38分钟即可抵达宾州车站。该线直达宾州车站与大中央麦迪逊站，无需在牙买加站换乘，前往东城同样便捷；相邻的普兰多姆村亦设有独立车站。自驾者主要依托南侧的长岛高速（I-495）与北州景观大道，北方大道（25A公路）则横贯镇中，是主要的东西向地面干道。\n\n曼哈塞特的招牌是Americana Manhasset露天奢侈品中心，坐镇北方大道上的\"奇迹一英里\"，云集约六十家设计师门店——爱马仕、香奈儿、卡地亚、路易威登、London Jewelers与Hirshleifers皆在其列，并配有Cipollini、Toku等餐厅。绿地遍布镇内：惠特尼池塘公园（Whitney Pond Park）设有池塘、网球、篮球与手球场、步道及社区泳池；Mary Jane Davies Green则有凉亭、游乐场与草坪；Manhasset Valley Park另辟步道。学区为曼哈塞特联合自由学区（北汉普斯特第6学区），旗下学校包括招收K至6年级的Munsey Park小学与Shelter Rock小学，全体学生升入Manhasset Secondary School就读7至12年级。"
    }
  },
  {
    "name": "Syosset",
    "slug": "syosset",
    "region": "Long Island",
    "blurb": "A walkable downtown and direct LIRR service in the heart of Long Island.",
    "image": "/neighborhoods/covers/syosset.jpg",
    "photoCredit": "AITFFan1 · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Downtown_Syosset,_Long_Island,_New_York_August_29,_2021.jpg",
    "guide": {
      "en": "Syosset is a hamlet in central Nassau County that grew from 19th-century farmland into a settled suburb after the Long Island Rail Road arrived and the postwar building boom followed. Its fabric is overwhelmingly detached single-family houses on generous lots: mid-century ranches and split-levels, Cape Cods, and classic Colonials, many since expanded or rebuilt, alongside a few converted farmhouses and newer custom homes. The north side runs hillier and more wooded, with winding, often acre-plus parcels, while the south tends toward newer, more uniform construction. Ownership is almost entirely fee-simple houses rather than co-ops or condos, with pricing from mid-market Colonials up into the millions for expanded estates on the larger northern lots.\n\nFor commuters, the headline is the LIRR Port Jefferson Branch. The Syosset station, at Jackson Avenue and Underhill Boulevard, sits on the line's electrified segment, roughly 31 miles from Manhattan; trains reach Penn Station in about 40 to 55 minutes and, since Grand Central Madison opened, also run to the East Side terminal. Drivers sit between the Long Island Expressway (I-495) to the south and the Northern State Parkway, putting Jericho and the wider region within easy reach.\n\nThe walkable downtown runs along Jackson Avenue, a low-rise main street of independent boutiques, bakeries, coffee shops, and a varied dining bench spanning Greek, Japanese sushi, Italian, and American kitchens. Open space is anchored by Stillwell Woods Preserve, roughly 270 acres of oak-barrens and old-field habitat laced with hiking, equestrian, and mountain-biking trails; the Nassau-Suffolk Greenbelt runs through it toward Trail View State Park and Bethpage, with Oyster Bay and the north-shore waterfront just beyond. Public schools belong to the Syosset Central School District, which includes Syosset High School, Harry B. Thompson and South Woods middle schools, and elementary schools such as Berry Hill, South Grove, Robbins Lane, Village, and A.P. Willits.",
      "zh": "西奥塞特（Syosset）是纳苏县中部的一处村镇，由十九世纪的农场逐步发展而来——长岛铁路通车、战后建房热潮随之到来，将这里塑造成一处成熟的近郊社区。其住宅以独栋单户为主，地块普遍宽敞：上世纪中叶的牧场式（ranch）、错层式（split-level）住宅、Cape Cod 小宅，以及经典的殖民式（Colonial），许多已经扩建或重建，间或还有改建的旧农舍与新建的定制大宅。北区地势更起伏、林木更密，街道蜿蜒，地块常达一英亩以上；南区则多为较新、较为整齐的建筑。产权几乎全为独栋房屋，鲜见合作公寓或共管公寓；价位区间较宽——从中端的殖民式，到北区大地块上可上探数百万美元的扩建大宅。\n\n通勤方面，重头是长岛铁路 Port Jefferson 支线。西奥塞特车站位于 Jackson Avenue 与 Underhill Boulevard 路口，处于该线已电气化的路段，距曼哈顿约 31 英里；列车约 40 至 55 分钟可达 Penn Station，自 Grand Central Madison 启用后，也可直达中城东侧终点站。自驾则夹在南侧的长岛快速路（I-495）与 Northern State Parkway 之间，前往 Jericho 及更广区域都很便捷。\n\n可步行的市中心沿 Jackson Avenue 展开，是一条低层主街，遍布独立精品店、面包房、咖啡馆，餐饮丰富多元，涵盖希腊菜、日式寿司、意大利菜与美式餐厅。绿地以 Stillwell Woods Preserve 为核心，约 270 英亩的橡树荒原与旧野生境，交织着徒步、骑马与山地自行车道；Nassau-Suffolk Greenbelt 穿园而过，向南通往 Trail View 州立公园与 Bethpage，蚝湾镇（Oyster Bay）与北岸海滨近在咫尺。公立学校归属 Syosset Central School District，包括 Syosset 高中，Harry B. Thompson 与 South Woods 两所初中，以及 Berry Hill、South Grove、Robbins Lane、Village、A.P. Willits 等小学。"
    }
  },
  {
    "name": "Jericho",
    "slug": "jericho",
    "region": "Long Island",
    "blurb": "Quiet residential streets and easy highway access in central Nassau County.",
    "image": "/neighborhoods/covers/jericho.jpg",
    "photoCredit": "DanTD · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:The_Milleridge_Inn;_Jericho,_New_York-3.jpg",
    "guide": {
      "en": "Jericho is a Nassau County hamlet on the North Shore of Long Island, the kind of established, low-density suburb where the appeal is written into the streetscape: sidewalk-lined blocks, mature trees, and detached single-family houses set on roughly quarter-acre lots, many with private driveways, backyards, and in-ground pools. The housing stock is overwhelmingly single-family, with little of the co-op or condo fabric found closer to the city. Architecture spans mid-century Colonials and Colonial Revivals, ranches, Cape Cods, and the split-level and \"splanch\" hybrids that defined postwar Long Island, increasingly joined by larger custom new builds and tear-down rebuilds. Recognizable pockets such as Birchwood, White Birch, and Princeton Park anchor the residential grid. Pricing sits firmly in the upper tier of the Long Island market — most detached homes trade roughly in the one-to-two-and-a-half-million range, with smaller or edge-of-hamlet houses offering more accessible entry points and larger renovated or new-construction properties reaching well above.\n\nJericho has no Long Island Rail Road station of its own, so commuters drive a few minutes to neighboring stops. Hicksville, served by both the LIRR Main Line and the Port Jefferson Branch, is the workhorse — a major hub with frequent service and large parking, reaching Penn Station or Grand Central Madison on Manhattan's East Side in roughly 40 to 55 minutes depending on express or local timing. Syosset, on the Port Jefferson Branch, is the alternative to the east. By car, the hamlet is bracketed by the Long Island Expressway (I-495) and the Northern State Parkway, with Route 106/107 running north–south through the area — the spine of Jericho's reputation as a commuter-friendly bedroom community.\n\nDaily life centers on dining, shopping, and history rather than a single Main Street. The historic Milleridge Inn at 585 North Broadway, with roots dating to 1672, anchors the hamlet's character; recently renovated, it pairs classic American dining with a village of shops, a bakery, and a courtyard wine bar. Retail is close at hand: Broadway Commons in adjacent Hicksville — now undergoing a major open-air redevelopment — sits minutes away, with the larger Walt Whitman Shops a short drive into Huntington Station in Suffolk County. Jericho is served by the Jericho Union Free School District, which operates three elementary schools — Cantiague, George A. Jackson, and Jeffrey Ratner Robert Seaman — along with Jericho Middle School and Jericho High School.",
      "zh": "杰里科（Jericho）是长岛北岸纳苏县的一个 hamlet（社区村落），属于成熟、低密度的住宅郊区，魅力直接写在街景里：人行道沿街铺开、树木成荫，独栋单户住宅多坐落在约四分之一英亩的地块上，大多带私人车道、后院，不少还配有内置泳池。这里的房产以独栋单户为绝对主体，几乎没有靠近市区常见的合作公寓（co-op）或共管公寓（condo）。建筑风格涵盖二十世纪中叶的 Colonial、Colonial Revival、ranch 平房、Cape Cod，以及定义了战后长岛的 split-level 与 \"splanch\" 混合户型，近年来更多大型定制新建与推倒重建的房屋加入其中。Birchwood、White Birch、Princeton Park 等片区构成住宅骨架。价格稳居长岛市场高位：多数独栋成交价大致在一百万至二百五十万美元区间，地块较小或位于社区边缘的房屋入门门槛更友好，而翻新或全新建造的大宅则明显更高。\n\n杰里科本身没有长岛铁路（LIRR）车站，通勤者通常驱车几分钟到邻近站点。Hicksville 站同时位于 LIRR 主线（Main Line）与 Port Jefferson 支线上，是主力枢纽，班次密集、停车充足，视快慢车约 40 至 55 分钟即可抵达曼哈顿的 Penn Station 或东侧的 Grand Central Madison。东边的 Syosset 站（Port Jefferson 支线）是另一选择。自驾方面，社区被长岛快速路（I-495）与 Northern State Parkway 夹在中间，106/107 号公路南北贯穿，奠定了杰里科宜通勤\"卧城\"的口碑。\n\n日常生活的重心在餐饮、购物与历史，而非单一的商业主街。北 Broadway 585 号的历史地标 Milleridge Inn 可追溯至 1672 年，是社区气质的灵魂所在；近年完成翻新，将经典美式餐饮与一组商铺、面包房及庭院酒吧融为一体。购物近在咫尺：毗邻 Hicksville 的 Broadway Commons 商场（目前正进行大规模露天化改造）几分钟可达，规模更大的 Walt Whitman Shops 则位于 Suffolk 县 Huntington Station，驱车不远。本地由 Jericho Union Free School District 学区服务，下设三所小学——Cantiague、George A. Jackson 与 Jeffrey Ratner Robert Seaman——以及 Jericho 初中与 Jericho 高中。"
    }
  },
  {
    "name": "Tribeca",
    "slug": "tribeca",
    "region": "Manhattan",
    "blurb": "Cast-iron lofts and cobblestone calm at the lower tip of Manhattan.",
    "image": "/neighborhoods/covers/tribeca.jpg",
    "guide": {
      "en": "Short for the \"Triangle Below Canal,\" Tribeca grew out of a 19th-century district of textile warehouses and merchant lofts, and that industrial bone structure still defines it. Cobblestone streets, cast-iron and masonry facades, and oversized factory windows give the neighborhood a low-rise, distinctly residential calm that sets it apart from the busier blocks just to the north. Much of the housing stock is converted loft space — high ceilings, exposed brick, and broad column-free floor plates — alongside a wave of modern luxury condominiums, many with harbor and skyline outlooks. Compared with neighboring SoHo, Tribeca tends to read quieter and more condo-dominant, and it carries some of the highest price points in the borough.\n\nTransit is a genuine strength. The 1/2/3 along the West Side and the A/C/E nearby put both downtown and Midtown within a quick ride, and the R/W and 4/5/6 at nearby Financial District and City Hall stations broaden the options further. Chambers Street is a major hub, and the proximity to the West Side Highway and Holland Tunnel suits drivers as well.\n\nGreen space and amenities cluster along the water: Hudson River Park's piers, lawns, and the Greenway run the western edge, while Washington Market Park and Bogardus Plaza anchor everyday neighborhood life. The dining scene is among the city's most celebrated, with a dense roster of acclaimed restaurants, galleries, and boutiques. For schools-as-fact, Tribeca sits within Community School District 2.",
      "zh": "Tribeca 是 \"Triangle Below Canal\"（运河街以南三角地带）的缩写，脱胎于 19 世纪的纺织品仓库与商号阁楼区，这副工业骨架至今仍定义着它的气质。鹅卵石街道、铸铁与砖石立面、超大的厂房窗户，赋予街区低层而鲜明的居住感，与北侧更喧嚣的街段截然不同。住宅以阁楼改造为主——挑高天花、裸露砖墙、开阔无柱的楼面——并伴有一批现代豪华公寓，许多可眺望港湾与天际线。与相邻的 SoHo 相比，Tribeca 更显安静，且以共有产权公寓（condo）为主，价位居全区前列。\n\n交通是真正的优势。西侧的 1/2/3 线与近旁的 A/C/E 线让下城与中城都近在咫尺，金融区与市政厅一带的 R/W 与 4/5/6 线进一步拓展了选择。Chambers Street 是重要枢纽，邻近西侧高速公路与荷兰隧道，对自驾者同样便利。\n\n绿地与配套沿水岸聚集：Hudson River Park 的码头、草坪与滨水绿道构成西缘，Washington Market Park 与 Bogardus Plaza 则承载着日常社区生活。餐饮场景跻身全市顶尖之列，云集众多备受推崇的餐厅、画廊与精品店。就学区事实而言，Tribeca 隶属第 2 学区（Community School District 2）。"
    }
  },
  {
    "name": "Financial District",
    "slug": "financial-district",
    "region": "Manhattan",
    "blurb": "Wall Street's historic core, now a transit-rich residential downtown.",
    "image": "/neighborhoods/covers/financial-district.jpg",
    "guide": {
      "en": "The Financial District — FiDi — occupies Manhattan's southern tip on the footprint of 17th-century New Amsterdam, the city's oldest streets. Long defined by Wall Street and the trading day, it has steadily become a round-the-clock residential neighborhood. Beginning in the 1990s and 2000s, many landmark office towers were converted into apartments — 15 Broad Street, an early Wall Street condo conversion, is among the best known — and they now sit beside ground-up luxury towers. The result is a varied housing stock: prewar conversions with grand lobbies and generous proportions, plus new-construction condos with amenity floors and water views.\n\nTransit here is unmatched in Lower Manhattan. The 1, 2, 3, 4, 5, A, C, E, J, Z, R, and W trains all serve the district, joined by the PATH to New Jersey and the Staten Island and East River ferries — among the densest transit coverage anywhere in the city. Fulton Center and the WTC Oculus tie the lines together under one roof.\n\nLandmarks and open space are close at hand: Battery Park and its waterfront esplanade anchor the southern edge, the World Trade Center campus and its memorial define the west, and the cobblestoned, restaurant-lined Stone Street offers a historic pocket of nightlife. Brookfield Place, Eataly, and the Seaport add day-to-day shopping and dining. FiDi sits within Community School District 2.",
      "zh": "金融区（Financial District，简称 FiDi）位于曼哈顿最南端，坐落在 17 世纪新阿姆斯特丹的旧址之上，是全城最古老的街区。它长期由华尔街与交易时段所定义，如今已稳步转型为全天候的居住社区。自 1990 至 2000 年代起，众多地标办公塔被改建为公寓——华尔街早期的共有产权公寓改造项目 15 Broad Street 即为其中翘楚——它们如今与全新建造的豪华塔楼比肩而立。住宅类型由此十分多样：拥有宏伟大堂与宽绰格局的战前改造单元，以及配有会所楼层与水景的新建公寓。\n\n这里的交通在下城无可匹敌。1、2、3、4、5、A、C、E、J、Z、R、W 线悉数到达，外加通往新泽西的 PATH 以及史泰登岛与东河渡轮——堪称全城最密集的交通覆盖之一。Fulton Center 与世贸中心 Oculus 将各条线路汇于一处。\n\n地标与开放空间近在咫尺：Battery Park 及其滨水步道构成南缘，世贸中心园区及纪念广场定义西侧，铺着鹅卵石、餐厅林立的 Stone Street 则保留了一处历史夜生活角落。Brookfield Place、Eataly 与南街海港（Seaport）则补足了日常购物与餐饮。FiDi 隶属第 2 学区（District 2）。"
    }
  },
  {
    "name": "Upper West Side",
    "slug": "upper-west-side",
    "region": "Manhattan",
    "blurb": "Prewar grandeur between two parks, anchored by Lincoln Center.",
    "image": "/neighborhoods/covers/upper-west-side.jpg",
    "guide": {
      "en": "The Upper West Side runs roughly from 59th Street to 110th, framed by Central Park on the east and the Hudson River on the west — a span that gives the neighborhood its enduring \"between the parks\" identity. The subway's arrival in 1904 spurred a building boom that still shapes the streetscape: grand prewar apartment houses line Central Park West and Riverside Drive, while tree-shaded brownstones fill the side streets. Co-ops dominate the housing stock, many of them spacious prewar layouts with hardwood floors and separate dining rooms, complemented by condominiums and converted townhouses for buyers who prefer that ownership structure.\n\nTransit centers on the 1/2/3 under Broadway — the 1 local plus 2/3 express — and the B/C along Central Park West, with the 81st Street station feeding directly into the American Museum of Natural History. Crosstown buses (M66, M72, M79, M86, M96) link the neighborhood to the East Side through the park.\n\nThe two parks define daily life: Central Park to the east and Riverside Park's Hudson-side promenade, playgrounds, and Greenway to the west. Cultural anchors are exceptional — Lincoln Center, the American Museum of Natural History, and the New-York Historical Society all sit here — alongside Zabar's, the 79th Street Greenmarket, and Broadway's long run of restaurants and cafes. The Upper West Side falls within Community School District 3.",
      "zh": "上西区（Upper West Side）大致自 59 街延伸至 110 街，东倚中央公园、西临哈德逊河，这片地带赋予它历久弥新的 \"两园之间\" 身份。1904 年地铁通车引发的建设热潮，至今仍塑造着街景：宏伟的战前公寓沿中央公园西大道（Central Park West）与 Riverside Drive 排列，林荫掩映的褐石联排屋则填满侧街。住宅以合作公寓（co-op）为主，许多为宽敞的战前格局，配硬木地板与独立餐厅，并辅以共有产权公寓与改造联排屋，供偏好该产权形式的买家选择。\n\n交通以 Broadway 下方的 1/2/3 线（1 号慢车加 2/3 号快车）和中央公园西大道的 B/C 线为核心，其中 81 街站直通美国自然历史博物馆。横贯东西的公交（M66、M72、M79、M86、M96）穿越公园连接东区。\n\n两座公园定义着日常生活：东侧的中央公园，与西侧 Riverside Park 临河的步道、游乐场及滨水绿道。文化地标尤为出众——林肯中心、美国自然历史博物馆与纽约历史协会皆汇聚于此——还有 Zabar's、79 街绿色市集，以及 Broadway 上绵长的餐厅与咖啡馆。上西区隶属第 3 学区（Community School District 3）。"
    }
  },
  {
    "name": "Upper East Side",
    "slug": "upper-east-side",
    "region": "Manhattan",
    "blurb": "Museum Mile, Madison Avenue, and stately prewar co-ops by the park.",
    "image": "/neighborhoods/covers/upper-east-side.jpg",
    "guide": {
      "en": "The Upper East Side stretches above 59th Street between Fifth Avenue and the East River, with Central Park forming its western edge. It is known for a stately, unhurried character and a housing stock weighted toward prewar co-ops — many with formal layouts, high ceilings, and white-glove service — alongside postwar and contemporary condominiums and a run of limestone and brownstone townhouses. Fifth, Madison, and Park Avenues set the architectural tone, while the blocks east toward the river offer a broader range of building types and values.\n\nTransit runs on two spines. The 4/5 express and 6 local under Lexington Avenue stop at 59th and 86th, with the 6 adding 68th Street–Hunter College, 77th, and 96th. The Second Avenue Subway's Q train serves newer stations at 72nd, 86th, and 96th, easing the historic crowding on Lexington and improving access to the East Side's eastern blocks. Crosstown buses cut through Central Park to the West Side.\n\nThe neighborhood's signature is culture and retail: Museum Mile along Fifth Avenue includes the Met, the Guggenheim, the Neue Galerie, the Jewish Museum, and the Cooper Hewitt, while Madison Avenue is a corridor of flagship boutiques and galleries. Central Park and Carl Schurz Park provide green space, and the dining and gourmet-market scene is deep. The Upper East Side falls within Community School District 2.",
      "zh": "上东区（Upper East Side）位于 59 街以北，介于第五大道与东河之间，西缘即中央公园。它以庄重从容的气质著称，住宅以战前合作公寓为主——许多拥有正式格局、挑高天花与全天候管家服务——并辅以战后及当代共有产权公寓，以及一排石灰岩与褐石联排屋。第五、麦迪逊与公园大道（Park Avenue）奠定了建筑基调，而向东靠近河岸的街段则提供更丰富的楼型与价位选择。\n\n交通沿两条主轴展开。Lexington Avenue 下方的 4/5 快车与 6 号慢车停靠 59 街与 86 街，6 号线另设 68 街（Hunter College）、77 街与 96 街站。第二大道地铁的 Q 线在 72 街、86 街与 96 街设有较新站点，缓解了 Lexington 沿线历来的拥挤，并改善了东区东侧街段的可达性。横贯公交穿越中央公园直抵西区。\n\n街区的标志在于文化与零售：第五大道沿线的博物馆大道（Museum Mile）汇聚大都会艺术博物馆、古根海姆、Neue Galerie、犹太博物馆与库珀·休伊特设计博物馆，而麦迪逊大道则是旗舰精品店与画廊的长廊。中央公园与 Carl Schurz Park 提供绿地，餐饮与精品食材市集亦十分丰富。上东区隶属第 2 学区（Community School District 2）。"
    }
  },
  {
    "name": "SoHo",
    "slug": "soho",
    "region": "Manhattan",
    "blurb": "Cast-iron lofts, cobblestones, and flagship shopping south of Houston.",
    "image": "/neighborhoods/covers/soho.jpg",
    "guide": {
      "en": "SoHo — \"South of Houston Street\" — holds one of the world's densest concentrations of cast-iron architecture, much of it built in the mid-to-late 19th century for manufacturing and dry-goods trade. Designated a historic district in the 1970s, the neighborhood preserves those ornate facades, broad windows, and Belgian-block streets, and that heritage shapes its housing: airy artist-era lofts and luxury loft conversions with soaring ceilings, columns, and oversized windows, alongside a smaller set of prewar walk-ups and new condominiums. Many buildings carry co-op or condo loft layouts that prize open, light-filled volume over conventional room counts.\n\nTransit is broad for so compact an area. The 6 runs along Lafayette and the N/R/W along Broadway, the B/D/F/M cross at Broadway–Lafayette, and the A/C/E and 1 sit just to the west — giving quick reach uptown, downtown, and into Brooklyn. The central location is one of SoHo's defining conveniences.\n\nAbove all, SoHo is a destination for retail and art. Broadway and the side streets host flagship fashion boutiques, independent shops, and a long lineage of galleries and cultural spaces — the Drawing Center, the Leslie-Lohman Museum, and the nearby Museum of Chinese in America among them. Cobblestoned blocks, design showrooms, and a dense restaurant and cafe scene round out daily life. SoHo falls within Community School District 2.",
      "zh": "SoHo——\"South of Houston Street\"（豪斯顿街以南）的缩写——坐拥全球最密集的铸铁建筑群之一，多数建于 19 世纪中后期，用于制造业与百货贸易。该街区于 1970 年代被列为历史保护区，那些繁复的立面、宽阔的窗户与比利时方石街道得以保存，这份遗产也塑造了其住宅：通透的艺术家时代阁楼，以及挑高天花、立柱与超大窗户的豪华阁楼改造单元，并辅以少量战前免电梯公寓与新建共有产权公寓。许多楼宇采用合作公寓或共有产权的阁楼格局，看重开阔通透的体量胜于传统的房间数量。\n\n对如此紧凑的区域而言，交通颇为广泛。6 号线沿 Lafayette 行驶，N/R/W 线沿 Broadway，B/D/F/M 线在 Broadway–Lafayette 交汇，A/C/E 与 1 号线则近在西侧——上城、下城与布鲁克林皆可迅速抵达。中心地段是 SoHo 最具代表性的便利之一。\n\n更重要的是，SoHo 是零售与艺术的目的地。Broadway 及各侧街云集时尚旗舰店、独立小店，以及源远流长的画廊与文化空间——包括 The Drawing Center、Leslie-Lohman 博物馆，以及邻近的美国华人博物馆（MOCA）。鹅卵石街区、设计展厅与密集的餐厅咖啡馆共同构成日常生活。SoHo 隶属第 2 学区（Community School District 2）。"
    }
  },
  {
    "name": "Roslyn",
    "slug": "roslyn",
    "region": "Long Island",
    "blurb": "Historic village charm and gracious North Shore homes, a short LIRR ride from the city.",
    "image": "/neighborhoods/covers/roslyn.jpg",
    "guide": {
      "en": "Roslyn is one of Long Island's North Shore villages, set at the head of Hempstead Harbor and known for a remarkably preserved 18th- and 19th-century downtown. Its Main Street, the duck pond, and the landmark clock tower give the village an unhurried, storybook character, while the surrounding villages — Roslyn Estates, Roslyn Harbor, East Hills, and Flower Hill — offer wooded lots, classic colonials, Tudors, and a number of larger estate properties.\n\nFor commuters, the Roslyn station sits on the LIRR Port Washington Branch with direct trains to both Penn Station and Grand Central Madison; peak service reaches Midtown in roughly 40 to 50 minutes, with no transfer required. Parks and open space are close at hand, from Gerry Pond and Christopher Morley Park to the Cedarmere waterfront, and the Nassau County Museum of Art anchors the village's cultural life.\n\nFor buyers, Roslyn pairs a walkable historic downtown with quiet, established residential streets; for sellers, well-kept homes near the village center tend to hold their value across markets.",
      "zh": "Roslyn 是长岛北岸的村镇之一，坐落在 Hempstead 港湾的尽头，以保存极为完好的 18、19 世纪市中心而闻名。Main Street、鸭池与地标钟楼为村庄赋予了从容、如画的气质，而周边的 Roslyn Estates、Roslyn Harbor、East Hills 与 Flower Hill 等村落，则提供林木环绕的地块、经典殖民式与都铎式住宅，以及若干规模更大的庄园物业。\n\n对通勤者而言，Roslyn 车站位于长岛铁路 Port Washington 支线，可直达宾州车站与 Grand Central Madison；高峰时段约 40 至 50 分钟即抵中城，无需换乘。公园与开放绿地近在咫尺，从 Gerry Pond、Christopher Morley 公园到 Cedarmere 滨水区皆是，拿骚县艺术博物馆更为村镇的文化生活注入活力。\n\n对买家来说，Roslyn 将可步行的历史市中心与宁静、成熟的住宅街区融为一体；对卖家而言，热门学区内维护良好的住宅往往能在各种市况下保值。"
    }
  },
  {
    "name": "Port Washington",
    "slug": "port-washington",
    "region": "Long Island",
    "blurb": "A walkable waterfront town on Manhasset Bay with one of the North Shore's quickest commutes.",
    "image": "/neighborhoods/covers/port-washington.jpg",
    "guide": {
      "en": "Port Washington occupies the Cow Neck Peninsula between Manhasset Bay and Hempstead Harbor, giving it a genuine waterfront identity that's rare this close to Manhattan. The downtown along Main Street is one of the more walkable on the North Shore — dozens of restaurants, independent shops, the Landmark on Main Street performing arts center, and a Town Dock that hosts a Saturday farmers market and a working harbor. Housing runs a wide range, from co-ops and condos near the station and downtown to mid-century capes and colonials in the residential neighborhoods, with larger properties in Flower Hill and waterfront estates in Sands Point.\n\nThe Port Washington station is the eastern terminus of the LIRR's Port Washington Branch, with frequent direct trains to Penn Station and Grand Central Madison — roughly 35 to 45 minutes to Midtown, and no transfer at any point. Sailing and boating are woven into daily life through the Manhasset Bay and Port Washington yacht clubs, and the bayfront parks and trails keep the water close.\n\nFor buyers, Port Washington offers a true downtown, a wide spread of housing types, and a short commute; for sellers, homes near the station and the village stay in steady demand.",
      "zh": "Port Washington 坐落于 Manhasset 湾与 Hempstead 港之间的 Cow Neck 半岛，赋予它在距曼哈顿如此之近的地方实属难得的真正滨水气质。沿 Main Street 的市中心是北岸最适合步行的街区之一——数十家餐厅、独立小店、Landmark on Main Street 表演艺术中心，以及每周六举办农夫市集、仍在运作的 Town Dock 码头。住宅类型十分多元，从车站与市中心附近的合作公寓、共管公寓，到住宅区内世纪中叶的 Cape 与殖民式住宅，再到 Flower Hill 较大的物业与 Sands Point 的滨水庄园。\n\nPort Washington 车站是长岛铁路 Port Washington 支线的东端终点，频密的直达列车通往宾州车站与 Grand Central Madison——到中城约 35 至 45 分钟，全程无需换乘。航海与划船借由 Manhasset Bay 与 Port Washington 帆船俱乐部融入日常生活，湾畔公园与步道也让水景近在咫尺。\n\n对买家而言，Port Washington 提供真正的市中心、多元的住宅类型与短途通勤；对卖家来说，车站与村镇周边的住宅需求始终稳定。"
    }
  },
  {
    "name": "Garden City",
    "slug": "garden-city",
    "region": "Long Island",
    "blurb": "A planned village of tree-lined boulevards, grand colonials, and a classic downtown.",
    "image": "/neighborhoods/covers/garden-city.jpg",
    "guide": {
      "en": "Garden City is one of Long Island's earliest planned communities, laid out in the 19th century with wide, tree-lined boulevards, generous setbacks, and a deliberate, parklike street grid. The housing stock reflects that heritage — stately colonials, Tudors, and center-hall homes on landscaped lots — while the downtown along Seventh Street and Franklin Avenue offers a walkable mix of shops, restaurants, and the historic Garden City Hotel. The Cathedral of the Incarnation and the village's many parks and athletic fields reinforce its settled, manicured character.\n\nThe Garden City station sits on the LIRR's Hempstead Branch; many trips to Penn Station route through Jamaica with a short connection, and select Hempstead Branch trains now run directly to Grand Central Madison, giving commuters options into both Midtown terminals. Adelphi University and Roosevelt Field's regional shopping are minutes away, and the parkways keep the rest of Nassau within easy reach by car.\n\nFor buyers, Garden City offers architectural character, a true downtown, and a strong public-school district; for sellers, classic homes in the village's established sections draw steady attention.",
      "zh": "Garden City 是长岛最早的规划社区之一，于 19 世纪铺设而成，拥有宽阔的林荫大道、慷慨的退界距离，以及精心设计、宛如公园的街道网格。其住宅风貌承袭了这一传统——景观地块上气派的殖民式、都铎式与中央门厅式住宅——而沿 Seventh Street 与 Franklin Avenue 的市中心，则汇聚了可步行的商铺、餐厅与历史悠久的 Garden City Hotel。Incarnation 主教座堂以及村镇众多公园与运动场，进一步彰显其成熟、精致的气质。\n\nGarden City 车站位于长岛铁路 Hempstead 支线；不少前往宾州车站的行程会经 Jamaica 短暂换乘，部分 Hempstead 支线列车如今亦直达 Grand Central Madison，让通勤者在两座中城终点站之间皆有选择。Adelphi 大学与 Roosevelt Field 的区域购物中心近在数分钟车程，公园大道也让拿骚县其余各处自驾可及。\n\n对买家而言，Garden City 提供鲜明的建筑特色、真正的市中心与优秀的公立学区；对卖家来说，村镇成熟区段中的经典住宅持续吸引关注。"
    }
  },
  {
    "name": "Old Westbury",
    "slug": "old-westbury",
    "region": "Long Island",
    "blurb": "Gold Coast estates on sweeping, wooded acreage with privacy and quiet.",
    "image": "/neighborhoods/covers/old-westbury.jpg",
    "guide": {
      "en": "Old Westbury is among the most rural-feeling of Nassau County's villages — a Gold Coast enclave defined by large-acreage estates, long private drives, and extensive woodland and equestrian land. The Gilded Age legacy is still visible in landmarks like Old Westbury Gardens, the restored Phipps estate with its formal gardens, and the village's preservation of open space and low-density zoning keeps lots generous and homes well set back from the road. Architecturally it spans Colonial Revival manors, brick Georgians, and modern custom builds, many with stables, pools, or tennis courts.\n\nThe village has no LIRR station of its own; commuters typically drive to the nearby Westbury station on the Main Line or to Hicksville, both offering direct service to Penn Station and Grand Central Madison, with Midtown reachable in roughly 40 minutes at peak. The Long Island Expressway and Northern State Parkway frame the village for easy driving, and New York Institute of Technology and SUNY Old Westbury sit within its bounds. Because the village spans several school districts — East Williston, Jericho, and Westbury among them — district assignment depends on the specific property.\n\nFor buyers, Old Westbury offers privacy, acreage, and estate-scale homes within a short drive of the city's rail connections; for sellers, distinctive properties on substantial land occupy a specialized, enduring corner of the market.",
      "zh": "Old Westbury 是拿骚县最具乡野气息的村镇之一——一处黄金海岸的隐逸聚居地，以大面积庄园、悠长的私人车道，以及广袤的林地与马术用地为特征。镀金时代的遗产至今清晰可见，如 Old Westbury Gardens、修复后设有规整花园的 Phipps 庄园；村镇对开放空间的保护与低密度分区规划，使地块保持宽敞、住宅远离街道深处。建筑风格横跨殖民复兴式宅邸、砖砌乔治亚式与现代定制建筑，许多更配有马厩、泳池或网球场。\n\n村镇本身没有长岛铁路车站；通勤者通常驾车前往邻近 Main Line 上的 Westbury 车站或 Hicksville，两者皆可直达宾州车站与 Grand Central Madison，高峰时段约 40 分钟抵达中城。长岛快速路（LIE）与 Northern State Parkway 环绕村镇，自驾便利，纽约理工学院与纽约州立大学 Old Westbury 分校亦坐落其境内。由于村镇跨越多个学区——包括 East Williston、Jericho 与 Westbury——学区归属取决于具体物业。\n\n对买家而言，Old Westbury 提供私密性、大面积地块与庄园级住宅，且距城市的铁路连接仅短途车程；对卖家来说，坐落于大片土地上的独特物业，占据着市场中一个专门而恒久的角落。"
    }
  },
  {
    "name": "Forest Hills",
    "slug": "forest-hills",
    "region": "Queens",
    "blurb": "Tudor enclaves, pre-war co-ops, and Austin Street shopping with a fast Midtown commute.",
    "image": "/neighborhoods/covers/forest-hills.jpg",
    "guide": {
      "en": "Forest Hills is one of Queens' most architecturally distinctive neighborhoods, anchored by the 142-acre Forest Hills Gardens — a planned community laid out in the early 20th century with input from Frederick Law Olmsted Jr., now famous for its English Tudor homes on winding, tree-lined streets. Beyond the Gardens, the housing stock is unusually varied: brick and stucco Tudors, a deep inventory of pre-war and post-war cooperatives, and newer condominiums and apartment buildings give buyers a wide range of price points and property types.\n\nThe commercial spine is Austin Street, a walkable retail-and-dining corridor that blends national stores with independent boutiques, cafes, and restaurants, plus a seasonal farmers market. The neighborhood is also home to the historic West Side Tennis Club and Forest Hills Stadium, a longtime concert venue and former host of the U.S. National tennis championships. Flushing Meadows-Corona Park, the borough's largest green space at over 900 acres, is a short distance away with museums, ball fields, and trails.\n\nTransit is a defining strength. The Forest Hills-71st Avenue station puts E and F express service to Manhattan minutes away, with M and R service as well, and the Long Island Rail Road station sits within walking distance — one of the few LIRR stops that pairs directly with a subway hub, giving commuters a fast route to Penn Station and Grand Central.",
      "zh": "森林小丘（Forest Hills）是皇后区建筑风貌最为独特的社区之一，以占地142英亩的「森林小丘花园」（Forest Hills Gardens）为核心——这片20世纪初规划兴建的住区曾有小弗雷德里克·劳·奥姆斯特德参与设计，如今以蜿蜒林荫街道两旁的英式都铎住宅闻名。花园区之外，住宅类型亦十分丰富：砖砌与灰泥都铎宅邸、数量可观的战前与战后合作公寓，以及较新的共有公寓和公寓楼，为买家提供了宽广的价位与房型选择。\n\n社区的商业主轴是奥斯汀街（Austin Street），一条适宜步行的零售餐饮长廊，连锁商店与独立精品店、咖啡馆、餐厅交错其间，并设有季节性农夫市集。社区内还有历史悠久的西区网球俱乐部与森林小丘体育场——一处长期举办演出、并曾是美国全国网球锦标赛旧址的场馆。皇后区最大的绿地、占地逾900英亩的法拉盛草甸-可乐娜公园（Flushing Meadows-Corona Park）也近在咫尺，内有博物馆、球场与步道。\n\n交通是这里的显著优势。森林小丘-71大道地铁站让E、F线快车数分钟即可直达曼哈顿，并有M、R线服务；长岛铁路车站亦在步行范围内——这是少数与地铁枢纽直接衔接的长岛铁路站点之一，通勤者可快速抵达宾州车站与中央车站。"
    }
  },
  {
    "name": "Bayside",
    "slug": "bayside",
    "region": "Queens",
    "blurb": "Single-family blocks, an LIRR express to Penn, and Bell Boulevard dining near the waterfront.",
    "image": "/neighborhoods/covers/bayside.jpg",
    "guide": {
      "en": "Bayside sits in northeastern Queens near the Long Island Sound shoreline, and its residential fabric is defined by detached single-family homes on quiet, tree-lined blocks. The housing stock leans toward mid-20th-century construction — Tudors, Colonials, Cape Cods, and split-levels, most with private driveways and yards — alongside semi-detached two-family houses and elevator co-op buildings. Detached houses with three to five bedrooms generally trade in the high six figures into the low millions, while co-ops and townhouses offer more accessible entry points, giving the area a suburban feel within city limits.\n\nThe commercial heart is Bell Boulevard, a lively dining-and-retail strip known for Greek seafood, Italian, Korean, Japanese, and American restaurants, plus bakeries and cafes. The neighborhood is well supplied with green space: Crocheron Park and the adjacent John Golden Park offer ball fields, tennis and pickleball courts, ponds, and trails, while Fort Totten Park preserves a Civil War-era fortress alongside a seasonal pool, waterfront paths, and birdwatching along the Sound. Oakland Lake and the Brooklyn-Queens Greenway add further routes for walking and cycling.\n\nFor commuters, the Long Island Rail Road Port Washington Branch is the headline. The Bayside station, just off Bell Boulevard, reaches Penn Station in roughly 28 to 35 minutes depending on express or local service, making this one of the faster rail commutes to Manhattan from a low-density, house-oriented part of the borough.",
      "zh": "贝赛（Bayside）位于皇后区东北部、临近长岛海湾岸线，其住宅肌理以宁静林荫街区上的独栋单户住宅为特色。住宅多建于20世纪中期——都铎、殖民地式、鳕鱼角式（Cape Cod）与错层式住宅，大多配有私人车道与庭院——并夹杂半独立式双户住宅及带电梯的合作公寓楼。三至五房的独栋住宅成交价大致在数十万美元高位至数百万美元低位之间，而合作公寓与联排住宅则提供更易入手的价位，让这一带在城市范围内呈现郊区般的氛围。\n\n社区的商业核心是贝尔大道（Bell Boulevard），一条热闹的餐饮零售街，以希腊海鲜、意大利、韩国、日本及美式餐厅闻名，并有面包房与咖啡馆。社区绿地充裕：克罗谢隆公园（Crocheron Park）与毗邻的约翰·戈尔登公园（John Golden Park）设有球场、网球与匹克球场、池塘和步道；托腾堡公园（Fort Totten Park）则保存着内战时期的要塞，并设季节性泳池、滨水步道，以及沿海湾的观鸟去处。奥克兰湖（Oakland Lake）与布鲁克林-皇后绿道为步行与骑行增添更多线路。\n\n对通勤者而言，长岛铁路华盛顿港支线是最大亮点。贝尔大道旁的贝赛车站，视快车或慢车而定，约28至35分钟即可抵达宾州车站，使这里成为皇后区低密度、以独栋住宅为主区域中通往曼哈顿较快的铁路通勤之一。"
    }
  },
  {
    "name": "Astoria",
    "slug": "astoria",
    "region": "Queens",
    "blurb": "A waterfront food capital on the East River, 20 minutes from Midtown by N/W or ferry.",
    "image": "/neighborhoods/astoria.jpg",
    "photoCredit": "NickCPrior · CC BY-SA 3.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Hell_Gate_from_Astoria_Park.jpg",
    "guide": {
      "en": "Astoria sits at the northwestern corner of Queens along the East River, where old-world brick meets a steady wave of new construction. Low-rise cooperative buildings, many from the 1920s and 1930s, cluster around Ditmars Boulevard and Steinway Street and offer some of the more accessible entry points into ownership. Alongside them run attached and semi-detached row houses and two- and three-family homes, several with private driveways, patios, and basements valued for rental income or extra living space. Nearer the waterfront, glass-and-steel condominiums have reshaped the skyline. As a rule, co-ops trade below the neighborhood median, houses above it, and new condos at a premium.\n\nThe elevated N and W trains run the length of 31st Street, stopping at Astoria–Ditmars Boulevard (the northern terminus), Astoria Boulevard, 30th Avenue, Broadway, and 36th Avenue; the M and R add a second option at Steinway Street. The N/W reaches Times Square in roughly 18 to 22 minutes. The NYC Ferry Astoria route links the Astoria landing to Roosevelt Island, Long Island City, East 34th Street, the Upper East Side at East 90th Street, and Wall Street/Pier 11. Drivers reach the Grand Central Parkway, the RFK (Triborough) Bridge, and the Brooklyn-Queens Expressway within minutes.\n\nOpen space centers on Astoria Park, a riverside expanse beneath the Hell Gate and RFK bridges, with a running track, tennis courts, and the landmarked Astoria Pool — the largest of the city's WPA-era pools. The dining and retail scene is the neighborhood's signature, spread across Steinway Street, 30th Avenue, and Ditmars Boulevard, where bakeries, grocers, cafes, and restaurants span cuisines from around the world. Kaufman Astoria Studios and the adjacent Museum of the Moving Image anchor a working film district, while Socrates Sculpture Park and the nearby Noguchi Museum sit along the waterfront to the southwest. Public schools fall within NYC Community School District 30; named schools include P.S. 122 Mamie Fay on Ditmars Boulevard and the Frank Sinatra School of the Arts High School.",
      "zh": "阿斯托利亚（Astoria）位于皇后区西北角、东河之畔，老派的红砖建筑与持续涌现的新建筑在此交汇。区域的根基是战前红砖：大量建于1920、1930年代的低层合作公寓（co-op）聚集在Ditmars大道与Steinway街一带，是本区门槛较低的置业选择之一。与之相邻的，是一排排联排与半独立式排屋，以及两到三户型住宅，其中不少配有私人车道、后院和地下室，深受看重租金收益或额外居住空间的买家青睐。靠近水岸一带，玻璃幕墙公寓则重塑了天际线。总体而言，合作公寓价格低于本区中位数，独栋住宅高于中位数，新建公寓则因装修与景观而溢价。\n\n通勤方面，高架的N、W线沿31街贯穿全区，设Astoria–Ditmars大道（北端终点站）、Astoria大道、30大道、Broadway与36大道等站；Steinway街另有M、R线可选。乘N/W线约18至22分钟即可抵达时报广场。纽约渡轮（NYC Ferry）阿斯托利亚航线连接阿斯托利亚码头至罗斯福岛、长岛市、东34街、上东区的东90街，以及下城的华尔街/11号码头。驾车则可在数分钟内接入大中央公园大道、RFK（Triborough）大桥与布鲁克林–皇后区高速。\n\n绿地以阿斯托利亚公园为核心，这片临河绿地横卧于Hell Gate桥与RFK桥之下，设有跑道、网球场，以及被列为地标的阿斯托利亚泳池——全市最大的WPA时代泳池。餐饮零售是本区的招牌，分布于Steinway街、30大道与Ditmars大道，烘焙坊、食品杂货、咖啡馆与餐厅汇聚了来自世界各地的风味。Kaufman Astoria片场与紧邻的活动影像博物馆（Museum of the Moving Image）撑起一片运作中的影视区，西南侧水畔则有苏格拉底雕塑公园与野口勇博物馆（Noguchi Museum）。公立学校隶属纽约市第30社区学区；区内学校包括Ditmars大道上的P.S. 122 Mamie Fay，以及法兰克·辛纳屈艺术高中（Frank Sinatra School of the Arts）。"
    }
  },
  {
    "name": "Jackson Heights",
    "slug": "jackson-heights",
    "region": "Queens",
    "blurb": "Landmarked garden-apartment co-ops, world-class food halls, and a five-line subway hub to Midtown.",
    "image": "/neighborhoods/jackson-heights.jpg",
    "photoCredit": "Jleon · CC BY 2.5",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:NYC_Jackson_Heights_3.jpg",
    "guide": {
      "en": "Jackson Heights began around 1914 as one of America's first planned \"garden city\" communities, laid out by the Queensboro Corporation. Now a New York City Historic District, it holds a rare collection of pre-war garden-apartment co-ops — brick and stucco buildings set around private courtyards, with complexes such as Linden Court, The Chateau, and Hampton Court. The housing stock is overwhelmingly cooperative, with some condos and attached \"garden homes\" from the 1920s onward, and pre-war one-bedrooms generally trade well below comparable Manhattan units.\n\nTransit is the neighborhood's anchor. The Jackson Heights–Roosevelt Avenue / 74th Street complex brings five lines together: the 7 (IRT Flushing), plus the E, F, R, and weekday M (IND Queens Boulevard). The 7 runs direct to Grand Central and Times Square in about 20 minutes. Nearby Woodside station, on the LIRR Port Washington Branch, reaches Penn Station and Grand Central Madison in roughly 15 minutes without changing at Jamaica.\n\nOpen space and commerce define daily life. Travers Park, along 34th Avenue between 77th and 78th Streets, hosts a year-round Sunday greenmarket, while the 34th Avenue Open Street — co-named \"Paseo Park,\" at roughly 1.3 miles the city's largest — runs a car-free corridor through the district. The commercial streets are a global pantry, from the Himalayan momo and Colombian arepas of Roosevelt Avenue to the South Asian groceries and restaurants of the 74th Street corridor. The neighborhood sits in New York City Geographic District 30, with schools such as P.S. 69 Jackson Heights and I.S. 145 Joseph Pulitzer.",
      "zh": "杰克逊高地（Jackson Heights）始建于约1914年，由Queensboro公司统一规划，是美国最早的\"花园城市\"社区之一。如今它已被列为纽约市历史保护区，保留着罕见的战前花园公寓合作公寓群——砖石与灰泥建筑环绕私家庭院而建，著名楼盘包括Linden Court、The Chateau与Hampton Court。住房以合作公寓（co-op）为主，另有部分共有公寓（condo）及1920年代起建成的连排\"花园住宅\"；战前一居室成交价通常明显低于曼哈顿同类单元。\n\n交通是本区的核心优势。杰克逊高地–罗斯福大道/74街枢纽汇集五条地铁线：7号线（法拉盛线），以及E、F、R和工作日的M线（皇后大道线）。7号线约20分钟直达中央车站与时报广场。邻近的Woodside车站位于长岛铁路华盛顿港支线，约15分钟直达宾州车站与中央车站麦迪逊站，无需在Jamaica换乘。\n\n开放空间与商业塑造了日常生活。Travers Park位于34大道沿线、77街与78街之间，常年于周日举办农夫市集；34大道开放街道——别名\"Paseo Park\"，长约1.3英里、为全市最长——在区域核心辟出一条无车走廊。商业街区宛如全球美食地图：从罗斯福大道的喜马拉雅momo与哥伦比亚arepa，到74街走廊闻名的南亚食材与餐馆。本区隶属纽约市第30学区，区内学校包括P.S. 69 Jackson Heights与I.S. 145 Joseph Pulitzer。"
    }
  },
  {
    "name": "Sunnyside",
    "slug": "sunnyside",
    "region": "Queens",
    "blurb": "A 1920s garden-city plan and quick 7-train blocks, minutes from Midtown.",
    "image": "/neighborhoods/sunnyside.jpg",
    "photoCredit": "hi-lo from NYC · CC BY-SA 2.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:46_Street_entrance_vc.jpg",
    "guide": {
      "en": "Sunnyside sits in western Queens just east of Long Island City, and its character is anchored by Sunnyside Gardens — built between 1924 and 1928 as the first attempt at an English-style garden city in the United States, listed on the National Register of Historic Places in 1984 and designated a New York City Historic District by the Landmarks Preservation Commission in 2007. Across a series of low-rise blocks, rows of attached one- to three-family brick houses, co-op buildings, and rental apartments wrap around shared interior courts and common gardens, a deliberate departure from the standard street grid. Beyond the Gardens, the housing stock runs to prewar apartment buildings — many since converted to co-ops or condos — alongside more brick row houses with small front yards. Co-ops form the most accessible entry point, with condos commanding a premium and one- and two-family houses trading higher still, keeping the area comparatively attainable for the borough.\n\nFor commuters, the headline is the elevated 7 train running above Queens Boulevard, with three local stations in the neighborhood — 40th Street–Lowery Street, 46th Street–Bliss Street, and 33rd Street–Rawson Street. Trains reach Midtown Manhattan and the Grand Central–42nd Street subway station in roughly fifteen minutes, among the quickest commutes in the borough, with transfers feeding the rest of the system at Queensboro Plaza. Drivers have the Brooklyn-Queens Expressway and the Long Island Expressway, the latter feeding the Queens-Midtown Tunnel into Manhattan, while the Pulaski Bridge links the area to Greenpoint, Brooklyn over Newtown Creek.\n\nOpen space and street life center on the pedestrian Bliss and Lowery plazas beneath the 7 line, while the members-only Sunnyside Gardens Park serves the historic district. The commercial spine runs along Greenpoint Avenue, Skillman Avenue, and Queens Boulevard, where the illuminated Art Deco \"Sunnyside\" arch near 46th Street marks a gateway to Queens; the corridor is dense with restaurants spanning Latin American, Turkish, Romanian, Irish, and Himalayan kitchens, plus bakeries, cafes, and groceries, much of it programmed by the Sunnyside Shines business district. Public schools fall within two community school districts — District 30 north of Queens Boulevard and District 24 to the south; named schools include P.S. 150 and I.S. 429 in District 30 and P.S. 343 (The Children's Lab School) in District 24.",
      "zh": "阳光区（Sunnyside）位于皇后区西部、长岛市以东，其气质由\"阳光花园区\"（Sunnyside Gardens）奠定——它建于1924至1928年间，是美国首次按英式花园城市理念营建的社区，1984年列入《国家史迹名录》，2007年由纽约市地标保护委员会定为历史保护区。在一系列低层街区中，一至三户的连排砖砌住宅、合作公寓与出租公寓楼环绕共享内庭与公共花园布置，刻意有别于常规的街道网格。在花园区之外，住房存量以战前公寓楼为主，许多已改为合作公寓（co-op）或共有公寓（condo），另有带小前院的砖砌联排屋。合作公寓是最易入手的选择，共有公寓价格更高，独栋及双拼住宅则更高一档，在皇后区中相对可负担。\n\n通勤方面的亮点是沿皇后大道高架运行的7号线，社区内设三座本地车站——40街-Lowery、46街-Bliss、33街-Rawson。列车约十五分钟即可抵达曼哈顿中城与Grand Central–42街地铁站，是全区最快捷的通勤之一，并可在Queensboro Plaza换乘接入全市地铁网。自驾者可经布鲁克林-皇后高速（BQE）与长岛高速（LIE），后者接通往曼哈顿的皇后-中城隧道；Pulaski大桥则跨越Newtown Creek连接布鲁克林的Greenpoint。\n\n公共空间与街区生活以7号线下方的Bliss与Lowery步行广场为中心，仅限会员的Sunnyside Gardens Park则服务于历史保护区。商业主轴沿Greenpoint Avenue、Skillman Avenue与皇后大道展开，46街附近那座灯光装饰艺术风格的\"Sunnyside\"拱门被视为皇后区门户之一；沿线餐馆密集，涵盖拉美、土耳其、罗马尼亚、爱尔兰与喜马拉雅风味，并有面包房、咖啡馆与杂货店，许多活动由Sunnyside Shines商业改进区组织。公立学校分属两个学区——皇后大道以北为第30学区，以南为第24学区；区内学校包括第30学区的P.S. 150与I.S. 429，以及第24学区的P.S. 343（The Children's Lab School）。"
    }
  },
  {
    "name": "Douglaston–Little Neck",
    "slug": "douglaston-little-neck",
    "region": "Queens",
    "blurb": "Waterfront enclaves and leafy lanes on Little Neck Bay — suburban calm, 28 minutes to Manhattan.",
    "image": "/neighborhoods/douglaston-little-neck.jpg",
    "photoCredit": "Peter Greenberg · CC BY-SA 3.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Zion_Episcopal_Church_Douglaston_03.JPG",
    "guide": {
      "en": "Douglaston–Little Neck occupies the far-northeastern tip of Queens, fronting Little Neck Bay where the borough meets the Nassau border, and it reads more like a leafy Long Island suburb than a city neighborhood. Its centerpiece is Douglas Manor, a planned community laid out in the early 20th century on a mile-long peninsula and designated a New York City historic district in 1997; the surrounding Douglaston Historic District was listed on the National Register of Historic Places in 2005, with more than 600 contributing buildings. The architecture is unusually varied for one enclave: Tudors, Colonial Revivals, Mediterranean villas, and low-slung Arts and Crafts bungalows, many architect-designed, on generous landscaped lots. Beyond the Manor, the older Douglaston Hill subdivision and Little Neck add detached single-family Colonials, Cape Cods, and split-levels, with some two-family houses and a handful of co-op and condo buildings near the commercial streets. This is one of the higher price tiers in Queens — detached houses, especially waterfront and historic-district properties, command a clear premium, while co-ops and smaller homes offer more attainable entry points.\n\nFor commuters, the headline is the Long Island Rail Road Port Washington Branch, which serves both the Douglaston and Little Neck stations. Because this branch bypasses Jamaica, trains run direct: Douglaston reaches Penn Station in roughly 28 minutes and Little Neck in about 30, with alternating service continuing to Grand Central Madison on Manhattan's East Side. Drivers rely on the Cross Island Parkway, which traces the bay, and the Long Island Expressway (I-495) for regional trips and the airports.\n\nGreen space defines daily life here. Alley Pond Park — at roughly 655 acres, the second-largest park in Queens — offers trails, wetlands, and ballfields, while the Udalls Cove Park Preserve protects a tidal inlet off Little Neck Bay, and the Brooklyn-Queens Greenway threads bike routes through the area. Dining and retail cluster along Northern Boulevard and around the Douglaston Plaza Shopping Center, a mix of pizzerias, delis, bakeries, and Korean, Chinese, Greek, and Italian kitchens. Schools fall within NYC Community School District 26; nearby campuses include P.S. 98 The Douglaston School, J.H.S. 67 Louis Pasteur in Little Neck, and Benjamin N. Cardozo High School in adjacent Bayside.",
      "zh": "道格拉斯顿—小颈（Douglaston–Little Neck）位于皇后区最东北端，临小颈湾（Little Neck Bay），与拿骚县接壤，整体气质更像绿树成荫的长岛郊区，而非典型的城市社区。其核心是道格拉斯庄园（Douglas Manor）——一座20世纪初规划兴建的社区，坐落在一条约一英里长、伸入海湾的半岛上，1997年被定为纽约市历史街区；其周边的道格拉斯顿历史街区（Douglaston Historic District）于2005年列入国家史迹名录，区内有六百余栋具历史价值的建筑。这里的建筑风格异常多元：都铎式、殖民复兴式、地中海式，以及低矮的工艺美术风格平房，许多出自建筑师之手，坐落于宽敞的景观地块上。庄园之外，年代更早的道格拉斯顿丘（Douglaston Hill）与小颈一带则以独栋殖民式、Cape Cod式和错层式住宅为主，并有少量双拼住宅及临商业街的合作公寓与共管公寓。此处属皇后区价格较高的区段——独栋住宅，尤其是临水及历史街区房产，溢价明显，而合作公寓与较小住宅则提供较易入手的选择。\n\n通勤方面的亮点是长岛铁路（LIRR）的华盛顿港线，道格拉斯顿与小颈两站均在此线上。由于该线不经牙买加站，列车直达：道格拉斯顿至宾州车站约28分钟，小颈约30分钟，并有班次续行至曼哈顿东侧的中央车站麦迪逊站（Grand Central Madison）。驾车出行则可借助沿湾的跨岛大道（Cross Island Parkway）与长岛高速（I-495）通往各区及机场。\n\n绿地是这里日常生活的底色。巷塘公园（Alley Pond Park）约655英亩，为皇后区第二大公园，设有步道、湿地与球场；尤多尔湾保护区（Udalls Cove Park Preserve）守护着小颈湾的一处潮汐入口；布鲁克林—皇后绿道则在区内串起骑行路线。餐饮零售主要集中于北方大道（Northern Boulevard）一带及道格拉斯顿广场购物中心（Douglaston Plaza），披萨店、熟食铺、面包房与韩、中、希腊、意式餐馆错落其间。学区属纽约市第26学区，附近校园包括道格拉斯顿98公立小学（P.S. 98）、小颈的路易·巴斯德67初中（J.H.S. 67），以及邻近贝赛（Bayside）的卡多佐高中（Benjamin N. Cardozo High School）。"
    }
  },
  {
    "name": "Mineola",
    "slug": "mineola",
    "region": "Long Island",
    "blurb": "Nassau's county seat reborn: a walkable downtown of new condos minutes from Penn and Grand Central.",
    "image": "/neighborhoods/mineola.jpg",
    "photoCredit": "Joe Mabel · CC BY-SA 3.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Mineola_-_Village_Hall_01.jpg",
    "guide": {
      "en": "Mineola is an incorporated village and the seat of Nassau County government, home to the county's courts and administrative offices, which gives its downtown a civic, distinctly urban character unusual for central Long Island. The older housing fabric is classic interwar and mid-century Long Island: Capes, Colonials, Dutch Colonials, Tudors, and ranches on compact lots, interspersed with two-family houses. What sets Mineola apart from many North Shore villages is its depth of attached ownership stock — established co-op and condominium communities such as the gated Birchwood Court, the village's largest co-op, plus a recent wave of transit-oriented condo buildings rising downtown near the station. Detached single-family houses, condos, and co-ops together give the village one of the more varied entry points in the area.\n\nFor commuters, Mineola is a major hub. The LIRR station sits on the Main Line where the Oyster Bay Branch splits off, so trains to Penn Station, Grand Central Madison, and Atlantic Terminal run frequently — Penn Station is roughly 33 to 35 minutes away. The Main Line Third Track, completed in October 2022, and the opening of Grand Central Madison together added dozens of daily trains and direct East Side access. The Mineola Intermodal Center pairs the rail station with a NICE bus hub (routes including the N22, N24, and N40) and a multi-level parking garage. By car, Jericho Turnpike (NY 25) crosses the village, with the Northern State Parkway and Meadowbrook State Parkway close by.\n\nThe village maintains Wilson Park, with sports fields and tennis courts, and Memorial Park beside the Mineola Memorial Library. Downtown dining clusters along Mineola Boulevard, Old Country Road, and Jericho Turnpike — from the longstanding Mineola Diner to Italian, Indian, Portuguese, Thai, and Mexican kitchens and pubs like The St. James. NYU Langone Hospital–Long Island (formerly Winthrop) anchors the village as a major employer, alongside the NYU Grossman Long Island School of Medicine. Public schools are run by the Mineola Union Free School District, which includes Hampton Street, Jackson Avenue, and Meadow Drive elementary schools, Mineola Middle School, and Mineola High School; some blocks fall within neighboring districts.",
      "zh": "麦尼奥拉（Mineola）是一座建制村庄，也是纳苏郡（Nassau County）的郡治所在地，郡法院与各级行政机构均设于此，因此其市中心带有浓厚的行政与都市气质，在长岛中部颇为少见。较早的住宅以经典的两战之间及二十世纪中叶风格为主：Cape、殖民式、荷兰殖民式、都铎式与平房，地块紧凑，间杂双拼住宅。与北岸许多村庄不同的是，麦尼奥拉拥有大量产权式公寓——既有如门禁社区 Birchwood Court（村内规模最大的合作公寓）这样成熟的合作公寓与共有公寓，也有近年在车站旁拔地而起的一批\"以公共交通为导向\"的新建共管公寓。独栋住宅、共管公寓与合作公寓并存，使这里成为本区域入门选择更为多样的市场之一。\n\n对通勤者而言，麦尼奥拉是一座重要枢纽。LIRR 车站位于主线（Main Line）与 Oyster Bay 支线的分岔处，开往宾州车站、大中央麦迪逊站（Grand Central Madison）与布鲁克林 Atlantic 总站的列车班次密集，至宾州车站约 33 至 35 分钟。2022 年 10 月竣工的主线第三轨工程，加上大中央麦迪逊站的启用，使每日列车大幅增加，并直通曼哈顿东区。麦尼奥拉联运中心（Intermodal Center）将铁路、NICE 巴士枢纽（含 N22、N24、N40 等线路）与多层停车楼整合于一体。自驾方面，Jericho Turnpike（NY 25）横贯村庄，Northern State 与 Meadowbrook 两条州立公园路也近在咫尺。\n\n村庄设有 Wilson Park（设球场与网球场）以及紧邻 Mineola Memorial 图书馆的 Memorial Park。餐饮主要集中在 Mineola Boulevard、Old Country Road 与 Jericho Turnpike 沿线——从老字号 Mineola Diner 到意式、印度、葡萄牙、泰式、墨西哥餐馆以及 The St. James 等酒馆，选择丰富。NYU Langone Hospital–Long Island（原 Winthrop 医院）是村内的重要雇主，旁边还有 NYU Grossman 长岛医学院。公立学校由 Mineola 联合自由学区（Mineola UFSD）管理，下设 Hampton Street、Jackson Avenue 与 Meadow Drive 小学、Mineola 初中与 Mineola 高中；部分街区则归邻近学区。"
    }
  },
  {
    "name": "New Hyde Park",
    "slug": "new-hyde-park",
    "region": "Long Island",
    "blurb": "A house-oriented village on the Queens–Nassau line, with a fast Main Line commute and lively dining strips.",
    "image": "/neighborhoods/new-hyde-park.jpg",
    "photoCredit": "Metropolitan Transportation Authority · CC BY 2.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:MTA_Long_Island_Rail_Road_Announces_Rededication_of_Upgraded_New_Hyde_Park_Station_as_Part_of_Third_Track_Project_IMG_1703M_(52149083724).jpg",
    "guide": {
      "en": "New Hyde Park is an incorporated village straddling the Queens–Nassau border, where New York City's grid gives way to Long Island's garden suburbs. Its character is firmly residential: detached single-family houses line quiet blocks, accounting for the overwhelming majority of the housing stock. Much of it dates to the building boom of the 1940s through 1960s — capes, colonials, ranches, and split-levels, most with private driveways and modest yards — with a thinner layer of two-family homes near the commercial corridors. Compared with pricier North Shore villages nearby, entry points here tend to be more attainable, and turnkey detached houses with three to four bedrooms remain the everyday trade, giving the area a settled, suburban feel within easy reach of the city.\n\nFor commuters, the headline is the Long Island Rail Road Main Line. The New Hyde Park station — rebuilt with twelve-car platforms, ramps, and shelters as part of the now-complete Third Track expansion — offers service to both Penn Station and Grand Central Madison, with rides to Manhattan running roughly 30 to 40 minutes. The same Third Track project eliminated the New Hyde Park Road grade crossing, replacing it with a vehicle underpass that ended the daily backups behind lowered gates. Drivers reach the Cross Island Parkway, Northern State Parkway, and the Long Island Expressway within minutes, and the Northwell Health/Long Island Jewish medical campus sits just to the north.\n\nDaily life centers on walkable commercial corridors — Jericho Turnpike, Hillside Avenue, and Lakeville/Marcus Avenue, the last a busy South Asian dining-and-grocery strip anchored by spots like Apna Bazar on Lakeville Road, alongside halal butchers, sweet shops, and produce markets. School districts vary block to block: much of the village sits in the Herricks Union Free School District (Center Street and Denton Avenue elementaries, Herricks Middle School, and Herricks High on Shelter Rock Road), while other sections fall under the New Hyde Park–Garden City Park Union Free School District, an elementary district that feeds the Sewanhaka Central High School District and New Hyde Park Memorial High School.",
      "zh": "新海德公园（New Hyde Park）是一座横跨皇后区与拿骚县边界的自治村落，城市的棋盘式街道在此过渡为长岛的花园式郊区。这里的氛围以居住为主：独栋单户住宅排列在安静的街区，占据了绝大部分的住房存量，多数建于1940至1960年代的建房热潮——包括Cape式、殖民式、平房（ranch）与错层式住宅，大多配有私家车道和小院落，靠近商业街一带还点缀着少量双拼住宅。与附近价位更高的北岸村镇相比，这里的入门门槛更为亲民，三至四居室、可拎包入住的独栋住宅是日常成交的主力，让整个区域在邻近市区的同时保有沉静的郊区气质。\n\n通勤方面的重头戏是长岛铁路（LIRR）主线。新海德公园车站作为现已完工的\"第三轨道\"扩建工程的一部分，已重建为可停靠十二节车厢的月台，并增设坡道与候车棚；列车同时通往宾州车站（Penn Station）与中央车站麦迪逊站（Grand Central Madison），约30至40分钟即可抵达曼哈顿。同一工程取消了New Hyde Park Road的平交道口，改建为车行地下通道，终结了昔日候闸排队的拥堵。驾车数分钟即可上Cross Island Parkway、Northern State Parkway与长岛高速；北侧紧邻Northwell Health／Long Island Jewish大型医疗园区。\n\n日常生活围绕几条适合步行的商业走廊展开——Jericho Turnpike、Hillside Avenue，以及Lakeville／Marcus Avenue，后者是热闹的南亚餐饮与杂货街，云集Lakeville Road上的Apna Bazar，以及清真肉铺、甜品店和生鲜市场。学区随街区而异：村内大部分属于Herricks联合自由学区（含Center Street、Denton Avenue小学，Herricks初中，以及位于Shelter Rock Road的Herricks高中），其余部分则归New Hyde Park–Garden City Park联合自由学区——一个小学学区，升入Sewanhaka中央高中学区及New Hyde Park Memorial高中。"
    }
  },
  {
    "name": "Hicksville",
    "slug": "hicksville",
    "region": "Long Island",
    "blurb": "Nassau's busiest rail hub, a revitalizing downtown, and accessible first-home buys.",
    "image": "/neighborhoods/hicksville.jpg",
    "photoCredit": "Kenneth C. Zirkel · CC BY-SA 4.0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Broadway,_Hicksville_New_York.jpg",
    "guide": {
      "en": "Hicksville sits at the geographic center of Nassau County and grew up around its railroad in the post-war boom. South of Old Country Road, much of the housing is Levitt-era — Cape Cods and ranches on compact lots from the late 1940s and 1950s — while blocks to the north add split-levels, raised ranches, and Colonials from the 1960s and 1970s. The stock is overwhelmingly detached single-family, with some two-family houses and, increasingly, new transit-oriented apartments and townhomes near the station, such as Fieldstone at North Broadway. It stays relatively attainable for Nassau.\n\nThe Long Island Rail Road is the defining asset. Hicksville is a Main Line hub and transfer point for the Port Jefferson and Ronkonkoma branches, with direct trains to Penn Station in roughly 45 minutes and to Grand Central Madison in a comparable window. The completed Main Line Third Track added capacity, and a future Amtrak Northeast Regional stop has been announced. NY 106/107 (Broadway) connects to the Northern State Parkway and the Long Island Expressway (I-495).\n\nDowntown is mid-revitalization, with state grants funding station and public-space upgrades, a more walkable Broadway, and new mixed-use units. Broadway and South Broadway anchor retail and dining, including a South Asian commercial strip with Patel Brothers and restaurants such as Chennai Dosas. The former Broadway Mall is being reimagined as The Shops on Broadway. Schools fall under the Hicksville Union Free School District, including Burns Avenue, Dutch Lane, and Lee Avenue elementary and Hicksville Middle and High schools.",
      "zh": "希克斯维尔位于纳苏县地理中心，在战后郊区开发热潮中围绕铁路而兴。老乡村路（Old Country Road）以南的住宅多属莱维特（Levitt）时代——上世纪四十年代末至五十年代建造的小型科德角式与牧场式房屋，地块紧凑；以北街区则增添了六十至七十年代的错层屋、抬高牧场式与殖民地式住宅。房源以独栋单户住宅为绝对主体，夹杂少量双拼住宅，并有越来越多沿车站新建的公寓与联排住宅，如 North Broadway 的 Fieldstone 项目。按纳苏标准，这里仍属相对易入手的区域。\n\n长岛铁路（LIRR）是这里的核心优势。希克斯维尔为干线枢纽，也是港杰斐逊线与朗肯科马线的换乘点；直达列车约 45 分钟可至宾州车站，抵达麦迪逊中央车站（Grand Central Madison）用时相近。干线第三轨已建成通车，提升了走廊运力，并已宣布将在此新增美铁东北区域线停靠站。NY 106/107 号公路连通北州大道与长岛快速路（I-495）。\n\n市中心正进行州政府支持的振兴改造：拨款用于车站与公共空间升级、打造更宜步行的 Broadway，并新增混合用途住宅。Broadway 与 South Broadway 构成零售与餐饮主轴，其中包括南亚商业街——Patel Brothers 杂货店及 Chennai Dosas 等餐厅。原 Broadway Mall 正改造为 The Shops on Broadway。学区为希克斯维尔联合自由学区（Hicksville UFSD），辖下包括 Burns Avenue、Dutch Lane、Lee Avenue 等小学，以及希克斯维尔初中与高中。"
    }
  },
  {
    "name": "Floral Park",
    "slug": "floral-park",
    "region": "Long Island",
    "blurb": "An incorporated village on the Queens line — walkable downtowns, Tudors, and a one-seat LIRR ride to both Manhattan terminals.",
    "image": "/neighborhoods/floral-park.jpg",
    "photoCredit": "Jim.henderson · CC0",
    "photoCreditUrl": "https://commons.wikimedia.org/wiki/File:Floral_Park_Post_Offc_35_Tulip_Av_11001_jeh.jpg",
    "guide": {
      "en": "Floral Park is an incorporated village straddling the Queens–Nassau line, named for the seed-and-nursery business that once bloomed across its grounds — a heritage still legible in street names like Tulip, Violet, and Verbena. Its residential fabric is the suburban dream rendered in early-to-mid-20th-century brick and stucco: well-kept Tudors with timbering and steep gables, center-hall Colonials, and Cape Cods with dormers and bay windows, set on tidy, tree-lined blocks with private driveways and yards. Ownership skews overwhelmingly toward detached single-family houses, supplemented by some two-family homes and a modest stock of co-ops and condominiums. Three-to-four-bedroom houses generally trade in the high six figures, with the village offering relatively accessible pricing compared with pricier North Shore towns — a value entry point into Nassau ownership without leaving the Queens doorstep.\n\nFor commuters, the Long Island Rail Road is the headline. The Floral Park station, at Tulip and Atlantic Avenues, sits just west of where the Main Line and Hempstead Branch split: Main Line trains run one-seat to Penn Station in roughly 30 to 35 minutes, while Hempstead Branch trains now reach Grand Central Madison on the East Side directly, around 40 minutes. The station is ADA-accessible, with elevators to each platform, and sits along the completed Main Line Third Track, which added bi-directional capacity. Drivers reach the Cross Island Parkway, Grand Central Parkway, and Jericho Turnpike (NY Route 25) within minutes, linking to the wider parkway network and the boroughs.\n\nTwo compact downtowns give the village its rhythm. Tulip Avenue, the \"Uptown\" main street, lines up independent restaurants, bakeries, and pubs — the long-running Floral Park Diner, taco and gyro counters, and Irish tap rooms — behind brick and stone facades, and closes to traffic for the annual Chamber street fair timed to the Belmont Stakes. Covert Avenue adds a second walkable strip of shops and eateries. Belmont Park and UBS Arena, home of the New York Islanders, sit just over the line in Elmont for racing, concerts, and hockey. Elementary education is provided by the Floral Park-Bellerose Union Free School District (Floral Park-Bellerose School and John Lewis Childs School, PreK–6); secondary students attend Floral Park Memorial High School within the Sewanhaka Central High School District.",
      "zh": "Floral Park 是一座横跨皇后区与拿骚县交界的自治村（incorporated village），村名源自早年遍布此地的花卉苗圃产业，至今 Tulip（郁金香）、Violet（紫罗兰）、Verbena 等街名仍留有这段花卉渊源。它的住宅肌理是典型的郊区图景，以二十世纪上半叶的砖石与灰泥建筑为主：带木骨外露与陡峭山墙的都铎式（Tudor）、中厅式殖民风（Colonial），以及带老虎窗与凸窗的鳕鱼角式（Cape Cod），错落在整洁的林荫街区，多配私家车道与庭院。产权结构以独栋独户为绝对主体，辅以部分双拼住宅及少量合作公寓与共管公寓。三至四居室独栋通常成交于六十万至九十余万美元区间；相较北岸（North Shore）更昂贵的小镇，这里价格更亲民，是一个紧贴皇后区门口、又能进入拿骚县置业的高性价比入口。\n\n通勤方面，长岛铁路（LIRR）是核心卖点。Floral Park 车站位于 Tulip 与 Atlantic 大道交口，正处主线（Main Line）与 Hempstead 支线分叉点稍西侧：主线列车直达宾州车站（Penn Station）约 30 至 35 分钟，Hempstead 支线列车则可一车直达东城的 Grand Central Madison，约 40 分钟。车站已实现无障碍通行，各站台均设电梯，并坐落于已完工、新增双向运力的主线第三轨（Third Track）沿线。自驾数分钟即可上 Cross Island Parkway、Grand Central Parkway 及 Jericho Turnpike（纽约 25 号公路），接入更广的景观公路网与各区。\n\n两处紧凑的小镇中心赋予了村庄节奏。被本地人称作 \"Uptown\" 的主街 Tulip Avenue，在砖石店面后聚集着独立餐馆、烘焙坊与酒馆——开业多年的 Floral Park Diner、墨西哥卷与希腊烤肉小店，以及爱尔兰风格酒吧；每年配合贝尔蒙锦标赛（Belmont Stakes）的商会街市更会封街举办。Covert Avenue 则是第二条可步行的商铺与餐饮街。一线之隔的 Elmont 即是 Belmont Park 赛马场与纽约岛人队（New York Islanders）主场 UBS Arena，可看赛马、演唱会与冰球。小学教育由 Floral Park-Bellerose 联合自由学区提供（Floral Park-Bellerose School 与 John Lewis Childs School，学前至六年级）；中学生就读于 Sewanhaka 中央高中学区下的 Floral Park Memorial High School。"
    }
  }
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
    "transit": {
      "en": "A true transit hub: the 7 subway and the LIRR Port Washington Branch meet at Flushing–Main Street, joined by one of Queens' busiest bus networks (Q-line and SBS service). Rare walk-everywhere access for the borough.",
      "zh": "名副其实的交通枢纽：7 号线地铁与长岛铁路 Port Washington 支线在法拉盛-缅街站交汇，再加上皇后区最繁忙的公交网络之一（多条 Q 线及 SBS 快速公交）。在本区中少见的「步行即达」便利。"
    },
    "schools": {
      "en": "Served by NYC public schools (largely District 25), with specialized and dual-language programs that draw families; many also weigh nearby private and parochial options.",
      "zh": "隶属纽约市公立学校系统（主要为第 25 学区），设有吸引家庭的特殊项目与双语课程；不少家庭也会考虑周边的私立与教会学校。"
    },
    "character": {
      "en": "A dense, fast-moving downtown core — one of New York's premier Asian commercial and dining districts — where new-construction condos rise beside long-established blocks of shops and restaurants.",
      "zh": "密集而快节奏的市中心核心区——纽约首屈一指的亚裔商业与餐饮聚集地之一——新建公寓与历史悠久的商铺、餐馆街区比邻而立。"
    },
    "bestFor": {
      "en": "Best for buyers who want urban energy, transit, and condo living, plus investors drawn to steady rental and resale demand near the station.",
      "zh": "适合想要都市活力、便捷交通与公寓生活的买家，以及看重车站周边稳定租售需求的投资者。"
    }
  },
  "long-island-city": {
    "transit": {
      "en": "Among the most connected neighborhoods in NYC: the 7, E, M and G (plus the F on weekdays) converge at Court Square, putting Midtown roughly one stop and a few minutes away, with NYC Ferry at Hunters Point as a scenic alternative.",
      "zh": "纽约市连通性最强的社区之一：7、E、M、G 线（工作日另有 F 线）在 Court Square 站汇集，到中城大约一站、几分钟即达，Hunters Point 的 NYC 渡轮则是风景宜人的另一选择。"
    },
    "schools": {
      "en": "Part of the NYC public school system (District 30), alongside a growing roster of charter, private, and pre-K options that families compare.",
      "zh": "属于纽约市公立学校系统（第 30 学区），并有日益增多的特许、私立及学前班选择供家庭比较。"
    },
    "character": {
      "en": "A former industrial waterfront reborn as a skyline of glass towers, riverfront parks, and a lively arts and dining scene looking straight across the East River at Manhattan.",
      "zh": "昔日的工业滨水区，如今重生为玻璃高层的天际线，拥有滨河公园与热闹的艺术、餐饮场景，隔着东河正对曼哈顿。"
    },
    "bestFor": {
      "en": "Best for buyers and renters who want new-construction amenities, skyline views, and the shortest possible commute to Midtown.",
      "zh": "适合想要新建配套、天际线景观，以及通往中城最短通勤的买家与租客。"
    }
  },
  "great-neck": {
    "transit": {
      "en": "On the LIRR Port Washington Branch with direct service to Penn Station and Grand Central; peak express trains reach Midtown in roughly half an hour, making it one of the quicker North Shore commutes.",
      "zh": "位于长岛铁路 Port Washington 支线，直达宾州车站与中央车站；高峰时段的快车约半小时即抵中城，是北岸较快的通勤之一。"
    },
    "schools": {
      "en": "The area is served by the Great Neck Union Free School District; school assignment varies by address, so verify with the district before offering.",
      "zh": "该区域隶属 Great Neck 联合自由学区；学校划分因地址而异，下 offer 前请向学区核实。"
    },
    "character": {
      "en": "A cluster of North Shore villages defined by tree-lined streets, waterfront parks on Manhasset Bay, and a housing mix from classic colonials to modern builds.",
      "zh": "一组北岸村镇，以林荫街道、Manhasset 湾畔的滨水公园，以及从经典殖民式到现代新建的多元住宅著称。"
    },
    "bestFor": {
      "en": "Best for buyers who want the Great Neck school district and suburban space within a quick, direct ride to Manhattan.",
      "zh": "适合看重 Great Neck 学区与郊区空间、又能快速直达曼哈顿的买家。"
    }
  },
  "manhasset": {
    "transit": {
      "en": "The Manhasset LIRR station (Plandome Road) sits on the Port Washington Branch with direct trains to Penn Station and Grand Central — a short, reliable North Shore commute.",
      "zh": "Manhasset 长岛铁路车站（Plandome Road）位于 Port Washington 支线，直达宾州车站与中央车站——一段短而可靠的北岸通勤。"
    },
    "schools": {
      "en": "The hamlet is served by the Manhasset Union Free School District, anchored by Manhasset Secondary School; verify the assignment for any specific address with the district.",
      "zh": "该区域隶属 Manhasset 联合自由学区，以 Manhasset 中学为核心；具体地址的学校划分请向学区核实。"
    },
    "character": {
      "en": "A gracious North Shore community of tree-lined streets and classic colonial and estate homes, anchored by the upscale Miracle Mile shopping district on Northern Boulevard.",
      "zh": "一处优雅的北岸社区，林荫街道间散落着经典殖民式与庄园式住宅，并以 Northern Boulevard 上的高端购物区「Miracle Mile」为核心。"
    },
    "bestFor": {
      "en": "Best for buyers seeking estate-style space, the Manhasset school district, and high-end shopping within an easy commute to the city.",
      "zh": "适合追求庄园式空间、Manhasset 学区与高端购物，同时通勤进城便捷的买家。"
    }
  },
  "syosset": {
    "transit": {
      "en": "Syosset's LIRR station, on the Port Jefferson Branch, offers direct service to Penn Station and Grand Central, while the LIE and Northern State Parkway keep the area well connected by car.",
      "zh": "Syosset 的长岛铁路车站位于 Port Jefferson 支线，直达宾州车站与中央车站；长岛快速路（LIE）与 Northern State Parkway 也让该区在自驾上四通八达。"
    },
    "schools": {
      "en": "The area is served by the Syosset Central School District, including Syosset High School; school assignment varies by address, so verify with the district.",
      "zh": "该区域隶属 Syosset 中央学区（含 Syosset 高中）；学校划分因地址而异，请向学区核实。"
    },
    "character": {
      "en": "A heart-of-Nassau community with a walkable downtown along Jackson Avenue, parks and recreation close by, and homes from mid-century classics to updated colonials on generous lots.",
      "zh": "位于拿骚县腹地的社区，Jackson Avenue 沿线有可步行的市中心，公园与休闲设施近在咫尺，住宅从世纪中叶经典款到地块宽敞、翻新过的殖民式不等。"
    },
    "bestFor": {
      "en": "Best for buyers who prioritize the Syosset school district alongside a walkable downtown and classic suburban lots.",
      "zh": "适合把 Syosset 学区放在首位，同时看重可步行市中心与经典郊区地块的买家。"
    }
  },
  "jericho": {
    "transit": {
      "en": "Jericho has no station of its own; commuters use the nearby Hicksville and Syosset LIRR stations for direct Manhattan service, while the Long Island Expressway and Northern State Parkway make for an easy drive.",
      "zh": "Jericho 本身没有车站；通勤者借由邻近的 Hicksville 与 Syosset 长岛铁路车站直达曼哈顿，长岛快速路与 Northern State Parkway 则让自驾轻松便捷。"
    },
    "schools": {
      "en": "The hamlet is served by the Jericho Union Free School District; school assignment varies by address, so verify with the district before offering.",
      "zh": "该区域隶属 Jericho 联合自由学区；学校划分因地址而异，下 offer 前请向学区核实。"
    },
    "character": {
      "en": "A quiet, established Nassau County hamlet of residential streets and a central location, anchored by landmarks like the historic Milleridge Inn.",
      "zh": "一处宁静、成熟的拿骚县社区，住宅街道与中心地段相映，并以历史悠久的 Milleridge Inn 等地标为依托。"
    },
    "bestFor": {
      "en": "Best for buyers who put the Jericho school district first and value quiet streets with quick highway access.",
      "zh": "适合把 Jericho 学区放在第一位、并看重安静街道与便捷高速通行的买家。"
    }
  },
  "tribeca": {
    "transit": {
      "en": "1/2/3 and A/C/E trains, with R/W and 4/5/6 nearby; Chambers Street is the main hub, putting Midtown and downtown within a short ride.",
      "zh": "1/2/3 与 A/C/E 线，近旁还有 R/W 与 4/5/6 线；Chambers Street 为主枢纽，中城与下城均仅数站之遥。"
    },
    "schools": {
      "en": "Tribeca falls within Community School District 2, which serves much of Lower Manhattan.",
      "zh": "Tribeca 隶属第 2 学区（District 2），覆盖下城大部分区域。"
    },
    "character": {
      "en": "Quiet, low-rise, and residential, with converted warehouse lofts — high ceilings, exposed brick, large windows — alongside modern luxury condos with skyline and harbor views.",
      "zh": "安静、低层、宜居，仓库改造阁楼（挑高天花、裸砖、大窗）与可眺望天际线和港湾的现代豪华公寓并存。"
    },
    "bestFor": {
      "en": "Buyers who want a spacious loft or a view-oriented luxury condo in a calm, walkable downtown setting with fast transit in every direction.",
      "zh": "适合希望在静谧宜步行的下城置入宽敞阁楼或景观豪华公寓、且看重四通八达交通的买家。"
    }
  },
  "financial-district": {
    "transit": {
      "en": "The 1/2/3, 4/5, A/C/E, J/Z, and R/W trains plus PATH and ferries make this the most transit-dense pocket of Lower Manhattan.",
      "zh": "1/2/3、4/5、A/C/E、J/Z、R/W 各线，加上 PATH 与渡轮，使其成为下城交通最密集的区域。"
    },
    "schools": {
      "en": "The Financial District is part of Community School District 2, serving Lower Manhattan.",
      "zh": "金融区属第 2 学区（District 2），覆盖下城区域。"
    },
    "character": {
      "en": "Historic office towers converted to apartments alongside new luxury high-rises, ranging from prewar conversions with grand lobbies to amenity-rich condos with harbor views.",
      "zh": "历史办公塔改建公寓与新建豪华高层并存，从拥有宏伟大堂的战前改造单元到配套丰富、坐拥港景的公寓皆有。"
    },
    "bestFor": {
      "en": "Buyers who prize a short downtown commute and the densest transit access in the city, in a high-rise condo with waterfront and skyline views.",
      "zh": "适合看重下城短途通勤与全城最密集交通、并钟意坐拥水景与天际线的高层公寓的买家。"
    }
  },
  "upper-west-side": {
    "transit": {
      "en": "The 1/2/3 under Broadway and the B/C along Central Park West, with the 81st Street station feeding the natural history museum and crosstown buses linking the East Side.",
      "zh": "Broadway 下的 1/2/3 线与中央公园西大道的 B/C 线，81 街站直通自然历史博物馆，横贯公交连接东区。"
    },
    "schools": {
      "en": "The Upper West Side sits within Community School District 3, which covers Manhattan's West Side above 59th Street.",
      "zh": "上西区属第 3 学区（District 3），覆盖 59 街以北的曼哈顿西侧。"
    },
    "character": {
      "en": "Co-op-dominant prewar apartment houses and tree-lined brownstone side streets, with condominiums and converted townhouses rounding out the mix.",
      "zh": "以合作公寓为主的战前公寓与林荫褐石侧街，辅以共有产权公寓与改造联排屋。"
    },
    "bestFor": {
      "en": "Buyers who want a spacious prewar co-op near Central Park, Riverside Park, and Lincoln Center, with classic layouts and an unhurried residential pace.",
      "zh": "适合希望在中央公园、Riverside Park 与林肯中心附近置入格局经典、节奏从容的宽敞战前合作公寓的买家。"
    }
  },
  "upper-east-side": {
    "transit": {
      "en": "The 4/5 express and 6 local under Lexington Avenue, plus the Second Avenue Subway's Q at 72nd, 86th, and 96th, with crosstown buses to the West Side.",
      "zh": "Lexington Avenue 下的 4/5 快车与 6 号慢车，加上第二大道地铁 Q 线（72、86、96 街），并有横贯公交直达西区。"
    },
    "schools": {
      "en": "The Upper East Side is part of Community School District 2, which serves much of the East Side and Lower Manhattan.",
      "zh": "上东区属第 2 学区（District 2），覆盖东区大部及下城。"
    },
    "character": {
      "en": "Stately prewar co-ops with formal layouts and full service, plus postwar and contemporary condos and limestone-and-brownstone townhouses along Fifth, Madison, and Park.",
      "zh": "格局正式、服务周全的庄重战前合作公寓，辅以战后及当代共有产权公寓，以及第五、麦迪逊、公园大道沿线的石灰岩与褐石联排屋。"
    },
    "bestFor": {
      "en": "Buyers who want a refined prewar co-op or full-service condo near Central Park, Museum Mile, and Madison Avenue, with reliable Lexington and Second Avenue transit.",
      "zh": "适合希望在中央公园、博物馆大道与麦迪逊大道附近置入考究战前合作公寓或全服务公寓、并看重 Lexington 与第二大道便捷交通的买家。"
    }
  },
  "soho": {
    "transit": {
      "en": "The 6 on Lafayette, N/R/W on Broadway, and B/D/F/M at Broadway–Lafayette, with A/C/E and 1 just west — a central location reaching uptown, downtown, and Brooklyn fast.",
      "zh": "Lafayette 上的 6 号线、Broadway 上的 N/R/W 线、Broadway–Lafayette 交汇的 B/D/F/M 线，西侧紧邻 A/C/E 与 1 号线——中心地段，上下城与布鲁克林皆可速达。"
    },
    "schools": {
      "en": "SoHo is part of Community School District 2, which serves much of Lower Manhattan.",
      "zh": "SoHo 属第 2 学区（District 2），覆盖下城大部分区域。"
    },
    "character": {
      "en": "A cast-iron historic district of airy artist-era lofts and luxury loft conversions — soaring ceilings, columns, oversized windows — with some prewar walk-ups and new condos.",
      "zh": "铸铁历史保护区，通透的艺术家时代阁楼与豪华阁楼改造单元（挑高天花、立柱、超大窗户），辅以部分战前免电梯公寓与新建公寓。"
    },
    "bestFor": {
      "en": "Buyers who want a light-filled loft with open volume and high ceilings in a central, design- and gallery-rich district with flagship shopping at the door.",
      "zh": "适合希望在设计与画廊云集、旗舰购物近在门前的中心街区，置入采光充沛、空间开阔、挑高天花阁楼的买家。"
    }
  },
  "roslyn": {
    "transit": {
      "en": "The Roslyn LIRR station sits on the Port Washington Branch with direct trains to Penn Station and Grand Central Madison; peak service reaches Midtown in roughly 40 to 50 minutes with no transfer.",
      "zh": "Roslyn 长岛铁路车站位于 Port Washington 支线，直达宾州车站与 Grand Central Madison；高峰时段约 40 至 50 分钟抵达中城，无需换乘。"
    },
    "schools": {
      "en": "The Roslyn Union Free School District is a long-regarded Nassau County district, with Roslyn High School consistently rated among the stronger public high schools in New York State.",
      "zh": "Roslyn 联合自由学区是拿骚县长期备受认可的学区，Roslyn 高中始终位列纽约州较为优秀的公立高中之中。"
    },
    "character": {
      "en": "A preserved historic village of colonials, Tudors, and estate properties on wooded lots, anchored by a storybook Main Street, a duck pond, and the landmark clock tower.",
      "zh": "一座保存完好的历史村镇，林木地块上散布着殖民式、都铎式住宅与庄园物业，以如画的 Main Street、鸭池及地标钟楼为核心。"
    },
    "bestFor": {
      "en": "Best for buyers who want a walkable historic downtown and gracious North Shore homes within a direct, transfer-free commute to the city.",
      "zh": "适合想要可步行的历史市中心与优雅北岸住宅、同时通勤进城可直达且无需换乘的买家。"
    }
  },
  "port-washington": {
    "transit": {
      "en": "Port Washington is the eastern terminus of the LIRR Port Washington Branch, with frequent direct trains to Penn Station and Grand Central Madison — roughly 35 to 45 minutes to Midtown with no transfer.",
      "zh": "Port Washington 是长岛铁路 Port Washington 支线的东端终点，频密直达列车通往宾州车站与 Grand Central Madison——到中城约 35 至 45 分钟，无需换乘。"
    },
    "schools": {
      "en": "The Port Washington Union Free School District includes Paul D. Schreiber Senior High School, which regularly produces Regeneron Science Talent Search semifinalists and finalists.",
      "zh": "Port Washington 联合自由学区下辖 Paul D. Schreiber 高中，该校常有学生入围 Regeneron 科学人才选拔赛（Science Talent Search）的半决赛与决赛。"
    },
    "character": {
      "en": "A walkable waterfront town with a lively Main Street downtown and a working harbor, spanning co-ops and condos near the station, mid-century capes and colonials, and waterfront estates in Sands Point.",
      "zh": "一座可步行的滨水小镇，拥有热闹的 Main Street 市中心与运作中的码头，住宅涵盖车站附近的合作及共管公寓、世纪中叶的 Cape 与殖民式住宅，以及 Sands Point 的滨水庄园。"
    },
    "bestFor": {
      "en": "Best for buyers who want a walkable downtown, boating and waterfront living, and one of the North Shore's quickest direct commutes to Midtown.",
      "zh": "适合想要可步行市中心、划船与滨水生活，以及北岸最快捷之一、直达中城通勤的买家。"
    }
  },
  "garden-city": {
    "transit": {
      "en": "The Garden City station sits on the LIRR Hempstead Branch; many Penn Station trips connect at Jamaica, while select Hempstead Branch trains now run directly to Grand Central Madison.",
      "zh": "Garden City 车站位于长岛铁路 Hempstead 支线；许多前往宾州车站的行程在 Jamaica 换乘，部分 Hempstead 支线列车如今亦直达 Grand Central Madison。"
    },
    "schools": {
      "en": "The Garden City Union Free School District is a high-performing Nassau County district, well regarded for both academics and a strong athletics tradition.",
      "zh": "Garden City 联合自由学区是拿骚县表现优异的学区，在学术与深厚的体育传统两方面皆备受推崇。"
    },
    "character": {
      "en": "A 19th-century planned village of wide, tree-lined boulevards lined with stately colonials, Tudors, and center-hall homes, anchored by a walkable downtown and the historic Garden City Hotel.",
      "zh": "一座 19 世纪规划而成的村镇，宽阔林荫大道两旁矗立着气派的殖民式、都铎式与中央门厅式住宅，以可步行的市中心及历史悠久的 Garden City Hotel 为核心。"
    },
    "bestFor": {
      "en": "Best for buyers who want architectural character and a walkable downtown in an established, parklike village served by its own school district.",
      "zh": "适合想要在一座成熟、宛如公园的村镇中，拥有建筑特色与可步行市中心的买家（村镇设有自己的学区）。"
    }
  },
  "old-westbury": {
    "transit": {
      "en": "Old Westbury has no station of its own; commuters drive to the nearby Westbury station on the Main Line or to Hicksville, both with direct service to Penn Station and Grand Central Madison in roughly 40 minutes at peak.",
      "zh": "Old Westbury 本身没有车站；通勤者驾车前往邻近 Main Line 上的 Westbury 车站或 Hicksville，两者皆可直达宾州车站与 Grand Central Madison，高峰时段约 40 分钟。"
    },
    "schools": {
      "en": "The village spans several school districts — East Williston, Jericho, and Westbury among them — so district assignment depends on the specific property; East Williston and Jericho are both highly regarded Nassau County districts.",
      "zh": "村镇跨越多个学区——包括 East Williston、Jericho 与 Westbury——因此学区归属取决于具体物业；East Williston 与 Jericho 均为拿骚县备受推崇的学区。"
    },
    "character": {
      "en": "A Gold Coast estate village of large-acreage properties, long private drives, and preserved woodland, spanning Colonial Revival manors, brick Georgians, and modern custom builds, many with stables, pools, or tennis courts.",
      "zh": "一座黄金海岸的庄园村镇，遍布大面积物业、悠长私人车道与受保护的林地，建筑横跨殖民复兴式宅邸、砖砌乔治亚式与现代定制住宅，许多配有马厩、泳池或网球场。"
    },
    "bestFor": {
      "en": "Best for buyers who want privacy, acreage, and estate-scale homes — including horse properties — within a short drive of the city's rail connections.",
      "zh": "适合想要私密性、大面积地块与庄园级住宅（包括马场物业），且距城市铁路连接仅短途车程的买家。"
    }
  },
  "forest-hills": {
    "transit": {
      "en": "E and F express plus M and R trains at Forest Hills-71st Avenue, with an LIRR station within walking distance for fast Penn Station and Grand Central service.",
      "zh": "森林小丘-71大道站有E、F快车及M、R线，长岛铁路车站亦在步行范围内，可快速通往宾州车站与中央车站。"
    },
    "schools": {
      "en": "Served by NYC Public Schools District 28, with neighborhood options including P.S. 101 The School in the Gardens, P.S. 196 Grand Central Parkway, J.H.S. 190 Russell Sage, and Forest Hills High School.",
      "zh": "隶属纽约市公立学校第28学区，社区内学校包括P.S. 101 花园学校、P.S. 196 大中央公园路、J.H.S. 190 Russell Sage 初中以及森林小丘高中。"
    },
    "character": {
      "en": "Calm, leafy, and architecturally rich, with Forest Hills Gardens Tudors, pre-war co-ops, and modern apartments side by side.",
      "zh": "宁静、绿意盎然、建筑底蕴深厚，森林小丘花园的都铎宅邸、战前合作公寓与现代公寓比邻而立。"
    },
    "bestFor": {
      "en": "Buyers who want pre-war co-op charm or a Tudor on a tree-lined street, walkable Austin Street dining, and a fast express-train commute to Midtown.",
      "zh": "适合钟意战前合作公寓韵味或林荫街道上都铎住宅、喜爱步行可达的奥斯汀街餐饮、并需要快车直通中城通勤的买家。"
    }
  },
  "bayside": {
    "transit": {
      "en": "LIRR Port Washington Branch from Bayside station reaches Penn Station in about 28 to 35 minutes; local buses connect to subway lines in neighboring areas.",
      "zh": "长岛铁路华盛顿港支线由贝赛车站出发，约28至35分钟可达宾州车站；本地巴士可接驳邻近区域的地铁线路。"
    },
    "schools": {
      "en": "Served by NYC Public Schools District 26, with neighborhood options including P.S. 31 Bayside, M.S. 158 Marie Curie, and Bayside High School.",
      "zh": "隶属纽约市公立学校第26学区，社区内学校包括P.S. 31 贝赛小学、M.S. 158 玛丽·居里初中以及贝赛高中。"
    },
    "character": {
      "en": "Suburban in feel within the city — detached houses with driveways and yards, a walkable Bell Boulevard, and waterfront parks.",
      "zh": "身处城市却具郊区气息——配有车道与庭院的独栋住宅、适宜步行的贝尔大道，以及滨水公园。"
    },
    "bestFor": {
      "en": "Buyers seeking a detached single-family house with a yard and driveway, walkable Bell Boulevard dining, and a quick LIRR commute to Penn Station.",
      "zh": "适合寻求带庭院与车道的独栋单户住宅、喜爱步行可达的贝尔大道餐饮、并希望搭乘长岛铁路快速通往宾州车站的买家。"
    }
  },
  "astoria": {
    "transit": {
      "en": "Elevated N/W trains run along 31st Street (Astoria–Ditmars Blvd, Astoria Blvd, 30th Ave, Broadway, 36th Ave), with M/R at Steinway Street; the N/W reaches Times Square in about 18-22 minutes. The NYC Ferry Astoria route links the Astoria landing to Roosevelt Island, Long Island City, East 34th Street, the Upper East Side at East 90th Street, and Wall Street/Pier 11.",
      "zh": "高架N/W线沿31街设站（Astoria–Ditmars大道、Astoria大道、30大道、Broadway、36大道），Steinway街另有M/R线；N/W线约18至22分钟可达时报广场。纽约渡轮阿斯托利亚航线连接阿斯托利亚码头至罗斯福岛、长岛市、东34街、上东区的东90街，以及华尔街/11号码头。"
    },
    "schools": {
      "en": "Astoria is served by NYC Community School District 30. Named schools include P.S. 122 Mamie Fay on Ditmars Boulevard and the Frank Sinatra School of the Arts High School.",
      "zh": "阿斯托利亚隶属纽约市第30社区学区。区内学校包括Ditmars大道上的P.S. 122 Mamie Fay，以及法兰克·辛纳屈艺术高中（Frank Sinatra School of the Arts）。"
    },
    "character": {
      "en": "A lively East River neighborhood known for its global dining corridors and waterfront parks, blending pre-war brick co-ops and two- to three-family row houses with a growing crop of new waterfront condos.",
      "zh": "充满活力的东河社区，以汇聚全球风味的餐饮主街和临河公园闻名；住宅融合战前红砖合作公寓、两至三户型排屋，以及不断增多的新建水岸公寓。"
    },
    "bestFor": {
      "en": "Buyers and investors who want a fast Midtown commute, vibrant street life, and a choice between accessible pre-war co-ops, income-producing multi-family houses, or modern waterfront condos.",
      "zh": "适合看重快速通勤中城、热闹街区生活的买家与投资者；可在门槛较低的战前合作公寓、带租金收益的多户住宅，或现代水岸公寓之间灵活选择。"
    }
  },
  "jackson-heights": {
    "transit": {
      "en": "The Jackson Heights–Roosevelt Avenue / 74th Street complex serves five subway lines — the 7, E, F, R, and weekday M. The 7 reaches Grand Central and Times Square in about 20 minutes. Nearby Woodside station, on the LIRR Port Washington Branch, runs to Penn Station and Grand Central Madison in roughly 15 minutes without a transfer at Jamaica.",
      "zh": "杰克逊高地–罗斯福大道/74街枢纽汇集7、E、F、R及工作日M共五条地铁线。7号线约20分钟直达中央车站与时报广场。邻近的Woodside车站位于长岛铁路华盛顿港支线，约15分钟即可抵达宾州车站与中央车站麦迪逊站，无需在Jamaica换乘。"
    },
    "schools": {
      "en": "Jackson Heights sits in New York City Geographic District 30. Area public schools include P.S. 69 Jackson Heights, I.S. 145 Joseph Pulitzer, and P.S. 212.",
      "zh": "杰克逊高地隶属纽约市第30学区。区内公立学校包括P.S. 69 Jackson Heights、I.S. 145 Joseph Pulitzer与P.S. 212。"
    },
    "character": {
      "en": "A landmarked historic district of 1910s–20s garden-apartment co-ops set around private courtyards — including Linden Court, The Chateau, and Hampton Court — paired with global food and shopping corridors and the car-free Paseo Park open street. Housing is predominantly co-op, with some condos and garden homes.",
      "zh": "由1910–20年代花园公寓合作公寓组成的历史保护区，楼宇环抱私家庭院，包括Linden Court、The Chateau与Hampton Court，毗邻全球风味的美食与购物街区，以及无车的Paseo Park开放街道。住房以合作公寓为主，另有部分共有公寓与花园住宅。"
    },
    "bestFor": {
      "en": "Buyers seeking an accessible NYC co-op entry point with pre-war character and a fast, multi-line commute to Midtown, plus value-focused investors drawn to a dense, transit-rich neighborhood with deep food and retail corridors.",
      "zh": "适合希望以较低门槛购入纽约市合作公寓、青睐战前韵味与多线快速通勤中城的买家，以及看重高密度、交通便利、餐饮零售繁荣街区价值的投资者。"
    }
  },
  "sunnyside": {
    "transit": {
      "en": "The elevated 7 train serves three local stations — 40th St–Lowery St, 46th St–Bliss St, and 33rd St–Rawson St — reaching Midtown and the Grand Central–42nd Street subway station in roughly 15 minutes, with transfers at Queensboro Plaza. The BQE, Long Island Expressway (to the Queens-Midtown Tunnel), and Pulaski Bridge add road access.",
      "zh": "高架7号线设有三座本地车站——40街-Lowery、46街-Bliss、33街-Rawson，约15分钟可达中城与Grand Central–42街地铁站，并可在Queensboro Plaza换乘。布鲁克林-皇后高速（BQE）、长岛高速（接皇后-中城隧道）及Pulaski大桥提供公路通行。"
    },
    "schools": {
      "en": "Sunnyside is split between two community school districts — District 30 north of Queens Boulevard and District 24 to the south. Named public schools include P.S. 150 and I.S. 429 in District 30 and P.S. 343 (The Children's Lab School) in District 24.",
      "zh": "阳光区以皇后大道为界分属两个学区——以北为第30学区，以南为第24学区。区内公立学校包括第30学区的P.S. 150与I.S. 429，以及第24学区的P.S. 343（The Children's Lab School）。"
    },
    "character": {
      "en": "A walkable, low-rise neighborhood defined by the 1920s Sunnyside Gardens garden-city plan, with co-ops, prewar apartment buildings, and one- to two-family brick row houses around shared courts and lively plazas under the 7 line.",
      "zh": "一个适宜步行的低层社区，以1920年代的\"阳光花园区\"花园社区规划为标志，住房以合作公寓、战前公寓楼和一至两户砖砌联排屋为主，环绕共享内庭与7号线下方热闹的步行广场。"
    },
    "bestFor": {
      "en": "Well suited to buyers and investors seeking a fast Midtown commute and a relatively accessible Queens entry point — first-time co-op purchasers, end-users wanting a small house with a yard, and those drawn to a historic, walkable streetscape.",
      "zh": "适合追求快速通勤中城、并希望以相对可负担价格入手皇后区的买家与投资者——包括首次置业的合作公寓买家、想要带院落小屋的自住者，以及钟情于历史风貌、步行友好街景的人群。"
    }
  },
  "douglaston-little-neck": {
    "transit": {
      "en": "The LIRR Port Washington Branch serves Douglaston (about 28 min) and Little Neck (about 30 min) direct to Penn Station, with alternating service continuing to Grand Central Madison. The Cross Island Parkway and Long Island Expressway (I-495) handle driving.",
      "zh": "长岛铁路华盛顿港线设道格拉斯顿站（约28分钟）与小颈站（约30分钟），直达宾州车站，并有班次续行至中央车站麦迪逊站。驾车可经跨岛大道与长岛高速（I-495）。"
    },
    "schools": {
      "en": "The area falls within NYC Community School District 26. Nearby schools include P.S. 98 The Douglaston School, J.H.S. 67 Louis Pasteur in Little Neck, and Benjamin N. Cardozo High School in adjacent Bayside.",
      "zh": "该区属纽约市第26学区。附近学校包括道格拉斯顿98公立小学、小颈的路易·巴斯德67初中，以及邻近贝赛的卡多佐高中。"
    },
    "character": {
      "en": "Quiet, leafy, and low-density, with a suburban feel on Little Neck Bay. Housing runs from the architect-designed Tudors, Colonials, and bungalows of historic Douglas Manor to detached houses, plus some two-family homes and co-ops near the commercial streets.",
      "zh": "静谧、绿荫、低密度，临小颈湾，颇具郊区气息。住宅从历史街区道格拉斯庄园由建筑师设计的都铎式、殖民式与平房，到各式独栋住宅，并有临商业街的双拼住宅与合作公寓。"
    },
    "bestFor": {
      "en": "Buyers seeking a low-density, house-oriented setting with waterfront and historic character, generous green space, and a fast direct rail commute to Manhattan.",
      "zh": "适合追求低密度、以独栋住宅为主的居住环境，向往临水与历史氛围、充裕绿地，并看重直达曼哈顿快捷通勤的买家。"
    }
  },
  "mineola": {
    "transit": {
      "en": "LIRR Mineola station sits on the Main Line at the Oyster Bay Branch junction, with frequent service to Penn Station (about 33-35 min), Grand Central Madison, and Atlantic Terminal; the Intermodal Center adds a NICE bus hub and parking garage. Jericho Turnpike (NY 25) and the Northern State Parkway serve drivers.",
      "zh": "LIRR 麦尼奥拉站位于主线与 Oyster Bay 支线的交汇处，开往宾州车站（约 33-35 分钟）、大中央麦迪逊站与 Atlantic 总站的班次密集；联运中心还整合了 NICE 巴士枢纽与停车楼。自驾可走 Jericho Turnpike（NY 25）与 Northern State 州立公园路。"
    },
    "schools": {
      "en": "Public schools are operated by the Mineola Union Free School District, which includes Hampton Street, Jackson Avenue, and Meadow Drive elementary schools, Mineola Middle School, and Mineola High School. Some blocks fall within neighboring districts.",
      "zh": "公立学校由 Mineola 联合自由学区（Mineola UFSD）管理，下设 Hampton Street、Jackson Avenue 与 Meadow Drive 小学、Mineola 初中与 Mineola 高中。部分街区归邻近学区。"
    },
    "character": {
      "en": "An urban, walkable village that doubles as Nassau's county seat, with a civic downtown, NYU Langone Hospital–Long Island, and a growing cluster of new condos by the station. Housing ranges from Capes, Colonials, and Tudors to co-ops and condominiums.",
      "zh": "一座都市感强、适宜步行的村庄，同时是纳苏郡郡治，拥有行政市中心、NYU Langone 长岛医院，以及车站旁不断增多的新建共管公寓。住宅类型涵盖 Cape、殖民式、都铎式独栋，到合作公寓与共管公寓。"
    },
    "bestFor": {
      "en": "Commuters who want a fast, frequent train to Manhattan's East and West sides, and buyers seeking condo or co-op ownership and walkable downtown living rather than a large North Shore lot.",
      "zh": "适合希望快速、密集通勤至曼哈顿东西两区的上班族，以及偏好共管/合作公寓产权与步行可达市中心生活、而非北岸大地块的买家。"
    }
  },
  "new-hyde-park": {
    "transit": {
      "en": "LIRR Main Line at New Hyde Park station, with both Penn Station and Grand Central Madison service reaching Manhattan in about 30–40 minutes. The Cross Island Parkway, Northern State Parkway, and Long Island Expressway are minutes away by car.",
      "zh": "长岛铁路主线新海德公园车站，同时通往宾州车站与中央车站麦迪逊站，约30至40分钟抵达曼哈顿。驾车数分钟即可上Cross Island Parkway、Northern State Parkway与长岛高速。"
    },
    "schools": {
      "en": "Districts vary by block. Much of the village lies in the Herricks Union Free School District (Center Street and Denton Avenue elementaries, Herricks Middle School, Herricks High); other sections fall under the New Hyde Park–Garden City Park UFSD, which feeds the Sewanhaka Central High School District and New Hyde Park Memorial High School.",
      "zh": "学区随街区而异。村内大部分属Herricks联合自由学区（Center Street、Denton Avenue小学，Herricks初中、Herricks高中）；其余部分归New Hyde Park–Garden City Park联合自由学区，升入Sewanhaka中央高中学区及New Hyde Park Memorial高中。"
    },
    "character": {
      "en": "A quiet, house-oriented village on the Queens–Nassau line, dominated by detached single-family capes, colonials, ranches, and split-levels from the mid-20th century, with walkable commercial corridors and comparatively attainable entry points.",
      "zh": "一座安静、以独栋住宅为主的边界村落，住房多为20世纪中叶的Cape式、殖民式、平房与错层式独栋，配有适合步行的商业街，入门价位相对亲民。"
    },
    "bestFor": {
      "en": "Commuters wanting a detached house with yard and a fast Main Line ride to Manhattan, plus buyers drawn to the South Asian dining-and-grocery corridors and proximity to the Northwell/LIJ medical campus.",
      "zh": "适合想要带院独栋、又看重主线快速通勤曼哈顿的上班族，以及青睐南亚餐饮杂货街、邻近Northwell／LIJ医疗园区的买家。"
    }
  },
  "hicksville": {
    "transit": {
      "en": "LIRR Hicksville is a Main Line hub with direct service to Penn Station (~45 min) and Grand Central Madison (comparable), plus transfers to the Port Jefferson and Ronkonkoma branches; NY 106/107 connects to the Northern State Parkway and Long Island Expressway (I-495).",
      "zh": "长岛铁路希克斯维尔站为干线枢纽，直达宾州车站约 45 分钟，抵达麦迪逊中央车站用时相近，并可换乘港杰斐逊线与朗肯科马线；NY 106/107 号公路连通北州大道与长岛快速路（I-495）。"
    },
    "schools": {
      "en": "The area is served by the Hicksville Union Free School District, whose schools include Burns Avenue, Dutch Lane, and Lee Avenue elementary schools, Hicksville Middle School, and Hicksville High School.",
      "zh": "该区域属希克斯维尔联合自由学区（Hicksville UFSD），辖下学校包括 Burns Avenue、Dutch Lane、Lee Avenue 等小学，以及希克斯维尔初中与希克斯维尔高中。"
    },
    "character": {
      "en": "A practical, transit-centered hamlet in central Nassau, defined by post-war capes, ranches, and split-levels and a downtown undergoing mixed-use revitalization around its busy rail station.",
      "zh": "纳苏中部一处务实、以交通为核心的社区，以战后科德角式、牧场式与错层住宅为主，市中心正围绕繁忙车站进行混合用途振兴改造。"
    },
    "bestFor": {
      "en": "First-time buyers and investors seeking an accessible Nassau entry point with a fast, frequent rail commute and a revitalizing downtown.",
      "zh": "适合寻求纳苏较易入手区域、看重快速密集铁路通勤与振兴中市中心的首次购房者和投资者。"
    }
  },
  "floral-park": {
    "transit": {
      "en": "LIRR Floral Park station (Tulip & Atlantic Aves) sits just west of the Main Line / Hempstead Branch split: about 30–35 minutes to Penn Station on the Main Line and roughly 40 minutes to Grand Central Madison on the Hempstead Branch. The station is ADA-accessible. The Cross Island Parkway, Grand Central Parkway, and Jericho Turnpike (NY Route 25) are minutes away.",
      "zh": "长岛铁路 Floral Park 车站（Tulip 与 Atlantic 大道交口）位于主线与 Hempstead 支线分叉点稍西侧：主线约 30–35 分钟可达宾州车站，Hempstead 支线约 40 分钟直达 Grand Central Madison。车站可无障碍通行。Cross Island Parkway、Grand Central Parkway 与 Jericho Turnpike（纽约 25 号公路）均在数分钟车程内。"
    },
    "schools": {
      "en": "Elementary education is provided by the Floral Park-Bellerose Union Free School District (Floral Park-Bellerose School and John Lewis Childs School, PreK–6). Secondary students attend Floral Park Memorial High School within the Sewanhaka Central High School District.",
      "zh": "小学教育由 Floral Park-Bellerose 联合自由学区提供（Floral Park-Bellerose School 与 John Lewis Childs School，学前至六年级）。中学生就读于 Sewanhaka 中央高中学区下的 Floral Park Memorial High School。"
    },
    "character": {
      "en": "A picturesque incorporated village on the Queens line with two walkable downtowns and a strong village-events calendar. Housing is mostly detached single-family Tudors, Colonials, and Capes on tidy tree-lined blocks, with some two-family homes and limited co-ops/condos.",
      "zh": "一座紧贴皇后区边界、风景宜人的自治村，拥有两条可步行的小镇中心与丰富的村庄活动日程。住宅以独栋独户的都铎式、殖民风与鳕鱼角式为主，错落在整洁的林荫街区，另有部分双拼住宅及少量合作/共管公寓。"
    },
    "bestFor": {
      "en": "Buyers who want village charm, walkable downtowns, and detached-house ownership with a fast one-seat LIRR ride to both Manhattan terminals — at relatively accessible Nassau pricing right at the Queens doorstep.",
      "zh": "适合向往小镇韵味、步行可达的镇中心与独栋自住产权，又看重一车直达曼哈顿两大车站的快速通勤的买家——价格在拿骚县中相对亲民，且紧贴皇后区门口。"
    }
  }
};
