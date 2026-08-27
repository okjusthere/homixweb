import type { CarryingBand, DevelopmentContent } from "@/data/new-development-content";

const baseFlexibleDevelopmentContent: Record<string, DevelopmentContent> = {
  "hendrix-house": {
    overview: {
      zh: "Hendrix House 是 Kips Bay 一栋仅 59 户的精品新盘。项目由 New Empire Corp. 开发，DXA Studio 与 Morali Architects 负责建筑，Paris Forino 完成室内。赤陶色立面、拱形窗与尺度克制的公共空间，让它更接近一栋有住宅感的曼哈顿公寓，而不是大型玻璃塔楼。",
      en: "Hendrix House is a 59-residence boutique condominium in Kips Bay, developed by New Empire Corp., with architecture by DXA Studio and Morali Architects and interiors by Paris Forino. Its terracotta-toned facade, arched windows, and restrained common spaces give it a residential character rather than a large-tower feel.",
    },
    highlights: [
      { titleZh: "精品规模", bodyZh: "59 户分布在 12 层，住户密度与进出节奏都更安静。", titleEn: "Boutique scale", bodyEn: "Fifty-nine homes across 12 stories keep the building quieter and more private." },
      { titleZh: "Paris Forino 室内", bodyZh: "室内强调天然材质、柔和色调与收纳效率，适合长期自住。", titleEn: "Paris Forino interiors", bodyEn: "Natural materials, calm tones, and practical storage are designed for long-term living." },
      { titleZh: "成熟生活圈", bodyZh: "Kips Bay 连接 Gramercy、Flatiron 与医院走廊，日常生活和通勤都成熟。", titleEn: "Established daily life", bodyEn: "Kips Bay connects Gramercy, Flatiron, and the hospital corridor with mature transit and retail." },
    ],
    location: {
      zh: "项目位于 250 East 25th Street，靠近 23 街与 28 街 6 号线，步行可达 Madison Square Park、Gramercy 与多条跨城巴士。",
      en: "At 250 East 25th Street, the building is near the 6 train at 23rd and 28th Streets, Madison Square Park, Gramercy, and crosstown buses.",
    },
  },
  "the-kent": {
    overview: {
      zh: "The Kent 是 Extell 在上东区打造的全服务住宅，83 户、30 层，外观以印第安纳石灰石与红砖回应周边经典街区。Alexandra Champalimaud 的室内设计强调大户型、正式起居空间与家庭使用场景，是偏长期自住的上东区产品。",
      en: "The Kent is Extell's 83-residence, 30-story Upper East Side condominium. Indiana limestone and red brick connect it to the neighborhood's prewar character, while Alexandra Champalimaud's interiors favor large layouts, formal living spaces, and long-term family use.",
    },
    highlights: [
      { titleZh: "家庭型大户型", bodyZh: "当前供应以四房、五房为主，空间尺度与房间关系更适合家庭长期持有。", titleEn: "Family-scale layouts", bodyEn: "Current availability centers on four- and five-bedroom homes suited to long-term family ownership." },
      { titleZh: "完整会所体系", bodyZh: "室内泳池、健身、儿童与社交空间集中在楼内，减少家庭日常的额外通勤。", titleEn: "A complete amenity program", bodyEn: "Pool, fitness, children's, and social spaces bring much of family life into the building." },
      { titleZh: "上东区长期价值", bodyZh: "公园、博物馆、学校与成熟商业共同支撑上东区的自住与转售需求。", titleEn: "Durable Upper East Side demand", bodyEn: "Parks, museums, schools, and established retail support both living quality and resale demand." },
    ],
    location: {
      zh: "项目位于 200 East 95th Street，靠近 96 街 Q 线与 86 街 4/5/6 线，向西可达中央公园与博物馆大道。",
      en: "The building is at 200 East 95th Street, close to the Q at 96th Street and the 4/5/6 at 86th Street, with Central Park and Museum Mile to the west.",
    },
  },
  "urban-21": {
    overview: {
      zh: "Urban 21 位于 LIC Hunters Point 与 Court Square 之间，共 71 户、9 层。项目不是追求天际线高度，而是用一房与两房为主的紧凑户型、较低楼层和多线地铁覆盖，满足通勤型自住与中小户型投资需求。",
      en: "Urban 21 sits between Hunters Point and Court Square in Long Island City. The 71-home, nine-story building focuses on efficient one- and two-bedroom layouts and strong transit rather than tower height, making it relevant to commuters and smaller-format investors.",
    },
    highlights: [
      { titleZh: "多线地铁", bodyZh: "G、E、M、7 号线均在步行范围，前往 Midtown 与 Brooklyn 都方便。", titleEn: "Multiple subway lines", bodyEn: "The G, E, M, and 7 are within walking distance for Midtown and Brooklyn access." },
      { titleZh: "中小户型为主", bodyZh: "一房、两房构成清晰，预算和未来出租人群相对容易判断。", titleEn: "Efficient home sizes", bodyEn: "A clear mix of one- and two-bedroom homes makes budget and rental audiences easier to assess." },
      { titleZh: "低密度新楼", bodyZh: "九层体量比周边高塔更亲近街区，也减少高层塔楼的复杂动线。", titleEn: "A lower-rise alternative", bodyEn: "Nine stories provide a more neighborhood-scaled alternative to LIC's large towers." },
    ],
    location: {
      zh: "地址为 11-58 46th Road，Court Square、MoMA PS1、Murray Park 与 LIC 河岸都在短距离生活圈内。",
      en: "At 11-58 46th Road, Urban 21 is close to Court Square, MoMA PS1, Murray Park, and the LIC waterfront.",
    },
  },
  "skyline-tower": {
    overview: {
      zh: "Skyline Tower 是 Court Square 最具辨识度的住宅塔楼之一，共 802 户、67 层。它的核心优势是地铁枢纽、完整配套与高层景观；相应地，买家也要更重视同户型不同楼层、朝向与景观造成的价差。",
      en: "Skyline Tower is one of Court Square's most recognizable residential towers, with 802 homes across 67 stories. Its case rests on transit, a comprehensive amenity package, and high-floor views; buyers should compare price differences by line, floor, exposure, and view carefully.",
    },
    highlights: [
      { titleZh: "Court Square 枢纽", bodyZh: "E、G、M、7 线集中，前往曼哈顿核心区的通勤优势直接。", titleEn: "Court Square transit", bodyEn: "The E, G, M, and 7 make the Midtown commute unusually direct." },
      { titleZh: "高层景观", bodyZh: "塔楼高度带来曼哈顿天际线与东河方向景观，但不同朝向溢价明显。", titleEn: "High-floor views", bodyEn: "Tower height creates skyline and river views, with meaningful premiums by exposure." },
      { titleZh: "供应充足、可比性强", bodyZh: "大体量项目成交样本多，估值更有依据，但选户型时必须精确到具体线位。", titleEn: "A deep comp set", bodyEn: "A large building offers more comparable sales, but unit-line selection matters." },
    ],
    location: {
      zh: "项目位于 3 Court Square，紧邻 Court Square 地铁站，步行可达 MoMA PS1、Jackson Avenue 商业与 Hunters Point。",
      en: "At 3 Court Square, the tower is beside the subway hub and within walking distance of MoMA PS1, Jackson Avenue retail, and Hunters Point.",
    },
  },
  "vesta-lic": {
    overview: {
      zh: "Vesta LIC 是 Murray Park 正对面的 115 户新建公寓，7 层体量保留了 Hunters Point 的街区尺度。住宅从 studio 到三房，主打公园景观、自然采光和实用型配套，适合不想住大型高塔、但仍需要 LIC 交通效率的买家。",
      en: "Vesta LIC is a 115-residence condominium directly facing Murray Park. Its seven-story scale fits Hunters Point's streetscape, with studios through three-bedrooms, park views, natural light, and practical amenities for buyers who prefer a lower-rise building without giving up LIC transit.",
    },
    highlights: [
      { titleZh: "正对 Murray Park", bodyZh: "公园改善低楼层视野与日常生活，也降低正前方快速开发的风险。", titleEn: "Facing Murray Park", bodyEn: "The park improves lower-floor outlooks and daily life while protecting part of the immediate view." },
      { titleZh: "户型跨度完整", bodyZh: "从 studio 到三房，首套房、投资与家庭换房都能在同一项目内比较。", titleEn: "A broad unit mix", bodyEn: "Studios through three-bedrooms serve first buyers, investors, and families." },
      { titleZh: "低层社区感", bodyZh: "七层建筑比周边大型塔楼更安静，公共空间和进出动线更简单。", titleEn: "Lower-rise character", bodyEn: "Seven stories create a quieter, simpler alternative to nearby high-rises." },
    ],
    location: {
      zh: "项目位于 11-36 45th Road，靠近 G、E、M、7 号线，以及 MoMA PS1、Gantry Plaza 与 Vernon Boulevard 商业。",
      en: "The building is at 11-36 45th Road near the G, E, M, and 7, MoMA PS1, Gantry Plaza, and Vernon Boulevard retail.",
    },
  },
  "the-farrington": {
    overview: {
      zh: "The Farrington 是法拉盛市中心一栋 100 户、15 层的已建成公寓，当前供应集中在两房。它的价值不在概念包装，而在于新楼状态、室内车位与配套，以及靠近 Main Street 商业和交通的实用性。",
      en: "The Farrington is a completed 100-residence, 15-story Flushing condominium, with current availability concentrated in two-bedroom homes. Its appeal is practical: newer construction, indoor parking and amenities, and proximity to Main Street retail and transit.",
    },
    highlights: [
      { titleZh: "两房供应清晰", bodyZh: "当前主力是两房，适合家庭自住，也便于与法拉盛同类新盘横向比较。", titleEn: "A clear two-bedroom offering", bodyEn: "Current inventory centers on two-bedrooms, useful for families and direct local comparisons." },
      { titleZh: "完整生活配套", bodyZh: "停车、健身、屋顶与公共空间提高长期自住的便利性。", titleEn: "Practical amenities", bodyEn: "Parking, fitness, roof, and shared spaces support everyday ownership." },
      { titleZh: "法拉盛核心需求", bodyZh: "餐饮、商业、地铁、LIRR 与机场共同构成稳定的自住和出租需求。", titleEn: "Central Flushing demand", bodyEn: "Retail, dining, subway, LIRR, and airport access support broad demand." },
    ],
    location: {
      zh: "地址为 33-66 Farrington Street，靠近 Northern Boulevard 与 Main Street，可接驳 7 号线和 LIRR。",
      en: "At 33-66 Farrington Street, the building is close to Northern Boulevard and Main Street, with access to the 7 and LIRR.",
    },
  },
  "the-prince-flushing": {
    overview: {
      zh: "The Prince 位于法拉盛 Prince Street，共 120 户、16 层，以一房和两房为主。项目与酒店及商业环境相邻，面向希望把交通、餐饮、购物和较新的住宅条件集中在一个步行生活圈内的买家。",
      en: "The Prince is a 120-residence, 16-story condominium on Prince Street in Flushing, focused on one- and two-bedroom homes. It places newer residential product next to hotel and retail activity for buyers who prioritize a walkable transit, dining, and shopping radius.",
    },
    highlights: [
      { titleZh: "法拉盛步行生活圈", bodyZh: "Main Street 商业、餐饮与交通集中，日常无需依赖开车。", titleEn: "Walkable Flushing core", bodyEn: "Main Street retail, dining, and transit reduce daily dependence on a car." },
      { titleZh: "一房两房为主", bodyZh: "户型定位直接，适合首套房、小家庭与以出租需求为导向的买家。", titleEn: "One- and two-bedroom focus", bodyEn: "The unit mix is legible for first buyers, smaller families, and rental-oriented ownership." },
      { titleZh: "停车与家庭配套", bodyZh: "室内停车、儿童空间、健身与露台补足市中心公寓的使用需求。", titleEn: "Parking and family amenities", bodyEn: "Indoor parking, children's space, fitness, and terraces round out city-center living." },
    ],
    location: {
      zh: "项目位于 33-71 Prince Street，步行可达 7 号线、LIRR 与法拉盛核心商业，前往 LaGuardia 也方便。",
      en: "At 33-71 Prince Street, the building is walkable to the 7, LIRR, and central Flushing retail, with convenient LaGuardia access.",
    },
  },
  "la-vita-flushing": {
    overview: {
      zh: "La Vita 是法拉盛市中心 150 户、19 层的新盘，由 FXCollaborative 与 FANG Architect PC 参与设计。项目从 studio 到三房，约 16,000 平方英尺的配套覆盖健身、社交与家庭使用，产品线比多数法拉盛中型公寓更完整。",
      en: "La Vita is a 150-residence, 19-story Downtown Flushing development designed by FXCollaborative and FANG Architect PC. Studios through three-bedrooms and roughly 16,000 square feet of amenities create a broader product range than many mid-size Flushing condominiums.",
    },
    highlights: [
      { titleZh: "户型覆盖完整", bodyZh: "studio 到三房同时供应，便于不同预算与家庭阶段在同一项目内选择。", titleEn: "A complete unit range", bodyEn: "Studios through three-bedrooms serve several budgets and family stages." },
      { titleZh: "大体量配套", bodyZh: "约 16,000 平方英尺配套增强自住体验，也需要结合物业费判断使用价值。", titleEn: "Extensive amenities", bodyEn: "Roughly 16,000 square feet of amenities improve daily life and should be weighed against carrying cost." },
      { titleZh: "市中心新楼", bodyZh: "靠近 7 号线与 LIRR，适合需要法拉盛生活便利与新楼品质的买家。", titleEn: "New construction downtown", bodyEn: "Proximity to the 7 and LIRR suits buyers who want Flushing convenience in a new building." },
    ],
    location: {
      zh: "项目位于 133-25 37th Avenue，步行可达 Main Street 7 号线、LIRR、商场与主要餐饮街区。",
      en: "At 133-25 37th Avenue, La Vita is walkable to the Main Street 7, LIRR, shopping, and major dining streets.",
    },
  },
  "centric-condominium": {
    overview: {
      zh: "Centric 是 Woodside Queens Boulevard 沿线一栋 131 户、12 层的新建公寓，由 New Empire Corp. 开发。项目提供一房至三房及部分 townhouse 型产品，强调三层玻璃窗、户外空间和家庭型配套，是 Sunnyside、Woodside 与 LIC 预算之间的另一种选择。",
      en: "Centric is a 131-residence, 12-story Woodside condominium developed by New Empire Corp. One- through three-bedroom homes and select townhome-style layouts, triple-pane windows, outdoor space, and family amenities position it between Sunnyside, Woodside, and LIC budgets.",
    },
    highlights: [
      { titleZh: "交通选择多", bodyZh: "7 号线与 Woodside LIRR 都在附近，兼顾曼哈顿通勤和长岛方向出行。", titleEn: "Several transit options", bodyEn: "The 7 and Woodside LIRR cover both Manhattan commutes and Long Island travel." },
      { titleZh: "三层玻璃窗", bodyZh: "Queens Boulevard 临街项目尤其需要关注隔音，三层玻璃是实际使用中的关键配置。", titleEn: "Triple-pane windows", bodyEn: "On Queens Boulevard, triple glazing is a meaningful comfort feature rather than a marketing detail." },
      { titleZh: "家庭配套", bodyZh: "儿童、健身、屋顶、庭院、停车与储物形成较完整的长期自住组合。", titleEn: "Family-oriented amenities", bodyEn: "Children's, fitness, roof, courtyard, parking, and storage spaces support long-term ownership." },
    ],
    location: {
      zh: "项目位于 58-01 Queens Boulevard，靠近 52 街和 61 街 7 号线及 Woodside LIRR。",
      en: "Centric is at 58-01 Queens Boulevard near the 7 at 52nd and 61st Streets and the Woodside LIRR station.",
    },
  },
  "the-marina-astoria": {
    overview: {
      zh: "The Marina Astoria 位于 Astoria 河岸，共 67 户、7 层，从 studio 到两房。项目把河景、公园与渡轮生活作为核心，不是典型的地铁口产品；适合愿意用更安静的水岸环境交换几分钟接驳时间的买家。",
      en: "The Marina Astoria is a 67-residence, seven-story waterfront condominium with studios through two-bedrooms. Its proposition is river views, parks, and ferry access rather than a subway-at-the-door address, for buyers willing to trade a short connection for a quieter setting.",
    },
    highlights: [
      { titleZh: "水岸与开放景观", bodyZh: "东河、Socrates Sculpture Park 与 Noguchi Museum 构成有辨识度的日常环境。", titleEn: "Waterfront outlook", bodyEn: "The East River, Socrates Sculpture Park, and Noguchi Museum define the daily setting." },
      { titleZh: "精品体量", bodyZh: "67 户、7 层，公共动线比大型塔楼更简单。", titleEn: "Boutique scale", bodyEn: "Sixty-seven residences across seven stories keep circulation simple." },
      { titleZh: "先核实通勤习惯", bodyZh: "渡轮与巴士方便，但买家应按自己的上班地点实际测试门到门时间。", titleEn: "Test the commute", bodyEn: "Ferry and bus links work well for some routes; buyers should test their own door-to-door trip." },
    ],
    location: {
      zh: "项目位于 30-07 Vernon Boulevard，靠近 Astoria Ferry、Socrates Sculpture Park 与 Noguchi Museum。",
      en: "At 30-07 Vernon Boulevard, the building is near the Astoria Ferry, Socrates Sculpture Park, and the Noguchi Museum.",
    },
  },
  "sophie-condominium": {
    overview: {
      zh: "Sophie Condominium 是 Astoria Steinway Street 一栋 24 户、4 层的精品新盘，提供 studio、一房与两房，多数住宅带有私人户外空间。它的优势是住户少、户型尺度亲近和较低总价门槛，适合不需要大型会所的自住买家。",
      en: "Sophie Condominium is a 24-residence, four-story boutique building on Steinway Street in Astoria, offering studios, one- and two-bedrooms, many with private outdoor space. Its strengths are a small resident count, approachable layouts, and lower entry pricing for buyers who do not need a large amenity club.",
    },
    highlights: [
      { titleZh: "仅 24 户", bodyZh: "小体量带来更安静的住户环境，也更接近传统社区住宅。", titleEn: "Only 24 residences", bodyEn: "A small resident count creates a quieter, more neighborhood-scaled building." },
      { titleZh: "私人户外空间", bodyZh: "多数户型设露台或阳台，是低层新盘里值得优先比较的配置。", titleEn: "Private outdoor space", bodyEn: "Many homes include a balcony or terrace, a meaningful feature in a boutique building." },
      { titleZh: "较低入门预算", bodyZh: "studio 与一房提供比 LIC 高层塔楼更低的产权公寓起点。", titleEn: "A lower entry point", bodyEn: "Studios and one-bedrooms offer a lower condominium entry point than many LIC towers." },
    ],
    location: {
      zh: "项目位于 20-08 Steinway Street，靠近 Ditmars 商业、Astoria Park 与 N/W 地铁生活圈。",
      en: "The building is at 20-08 Steinway Street near Ditmars retail, Astoria Park, and the N/W transit area.",
    },
  },
  "stanhope-foundry": {
    overview: {
      zh: "Stanhope Foundry 是 Bushwick 一栋仅 10 户、5 层的精品新建公寓。项目以一房和两房为主，保留工业街区语汇，同时提供落地窗、地暖卫浴、户内洗烘与部分私人户外空间，定位更接近小型设计住宅。",
      en: "Stanhope Foundry is a ten-residence, five-story boutique condominium in Bushwick. One- and two-bedroom homes combine an industrial neighborhood vocabulary with floor-to-ceiling windows, heated bathroom floors, in-home laundry, and select private outdoor spaces.",
    },
    highlights: [
      { titleZh: "十户精品项目", bodyZh: "住户少、单元差异大，选房时应逐套比较采光、露台与面积效率。", titleEn: "A ten-home building", bodyEn: "With few homes and meaningful unit differences, light, outdoor space, and efficiency should be compared individually." },
      { titleZh: "完成度较高的室内", bodyZh: "Bosch 厨电、地暖卫浴与户内洗烘覆盖了长期自住的核心配置。", titleEn: "A complete interior package", bodyEn: "Bosch appliances, heated bathroom floors, and in-home laundry cover key ownership needs." },
      { titleZh: "M、L 双线范围", bodyZh: "Knickerbocker Avenue M 线最近，L 线也在步行范围，连接 Williamsburg 与曼哈顿。", titleEn: "M and L access", bodyEn: "The M at Knickerbocker is closest, with the L also walkable for Williamsburg and Manhattan." },
    ],
    location: {
      zh: "项目位于 196 Stanhope Street，靠近 Knickerbocker Avenue M 线、DeKalb Avenue L 线与 Bushwick 餐饮商业。",
      en: "At 196 Stanhope Street, the building is near the M at Knickerbocker Avenue, the L at DeKalb Avenue, and Bushwick retail and dining.",
    },
  },
};

function verifiedBand(
  layout: string,
  commonCharges: string,
  taxes: string,
  unit: string,
): CarryingBand {
  return {
    layout,
    commonCharges: {
      zh: `约 ${commonCharges}/月（代表单元 ${unit}）`,
      en: `~${commonCharges} / mo (representative unit ${unit})`,
    },
    taxes: {
      zh: `约 ${taxes}/月（代表单元 ${unit}）`,
      en: `~${taxes} / mo (representative unit ${unit})`,
    },
  };
}

const verifiedNote = {
  zh: "数据根据 2026 年 8 月 27 日可查的项目官网及公开在售单元整理。物业费与地产税会随户型线、楼层、面积、税收减免及具体单元变化，认购前须以当期发售计划书和单元费用表书面核验。",
  en: "Based on project websites and publicly available unit information reviewed August 27, 2026. Common charges and property taxes vary by line, floor, area, abatement, and unit; verify the current offering plan and unit schedule in writing before purchase.",
};

const carryingBySlug: Record<string, NonNullable<DevelopmentContent["carrying"]>> = {
  "hendrix-house": {
    note: verifiedNote,
    bands: [
      verifiedBand("1 bed", "$752", "$1,105", "2C"),
      verifiedBand("2 beds", "$1,455", "$2,167", "11B"),
    ],
  },
  "the-kent": {
    note: {
      zh: `${verifiedNote.zh} 当前公开单元显示较低税额并注明税收减免；减免资格和到期日须由律师按目标单元核验。`,
      en: `${verifiedNote.en} Current public units show reduced taxes and reference an abatement; counsel must verify eligibility and expiration for the target unit.`,
    },
    bands: [
      verifiedBand("4 beds", "$3,751", "$342", "18B"),
      verifiedBand("5 beds", "$4,701", "$428", "15A"),
    ],
  },
  "urban-21": {
    note: verifiedNote,
    bands: [
      verifiedBand("1 bed", "$404", "$591", "2B"),
      verifiedBand("2 beds", "$618", "$904", "3E"),
    ],
  },
  "skyline-tower": {
    note: verifiedNote,
    bands: [
      verifiedBand("Studio", "$342", "$568", "3306"),
      verifiedBand("1 bed", "$573", "$953", "3307"),
      verifiedBand("2 beds", "$877", "$1,372", "PH205"),
      verifiedBand("3 beds", "$1,118", "$1,749", "PH307"),
    ],
  },
  "vesta-lic": {
    note: verifiedNote,
    bands: [
      verifiedBand("Studio", "$336", "$503", "101A"),
      verifiedBand("1 bed", "$443–$492", "$658–$731", "609B / 202B"),
      verifiedBand("2 beds", "$763", "$1,134", "411B"),
      verifiedBand("3 beds", "$1,123", "$1,669", "PH7B"),
    ],
  },
  "the-farrington": {
    note: {
      zh: `${verifiedNote.zh} 公开单元显示的地产税很低，可能受减免影响；不得将该金额视为长期固定税额。`,
      en: `${verifiedNote.en} Public units show unusually low property taxes that may reflect an abatement; do not treat the amount as a permanent fixed tax.`,
    },
    bands: [verifiedBand("2 beds", "$467", "$20", "13J")],
  },
  "the-prince-flushing": {
    note: verifiedNote,
    bands: [
      verifiedBand("1 bed", "$326–$369", "$435", "10A / 6A"),
      verifiedBand("2 beds", "$532–$611", "$661–$720", "7K / current sponsor range"),
    ],
  },
  "la-vita-flushing": {
    note: verifiedNote,
    bands: [
      verifiedBand("Studio", "$289", "$300", "3A"),
      verifiedBand("1 bed", "$352", "$365", "5K"),
      verifiedBand("2 beds", "$511", "$530", "18C"),
      {
        layout: "3 beds",
        commonCharges: { zh: "按具体单元核验", en: "Verify by unit" },
        taxes: { zh: "按具体单元核验", en: "Verify by unit" },
      },
    ],
  },
  "centric-condominium": {
    note: verifiedNote,
    bands: [
      verifiedBand("1 bed", "$335–$418", "$574–$718", "current sponsor range"),
      verifiedBand("2 beds", "$574–$747", "$985–$1,282", "current sponsor range"),
      verifiedBand("3 beds", "$997", "$1,711", "12C"),
    ],
  },
  "the-marina-astoria": {
    note: verifiedNote,
    bands: [
      verifiedBand("Studio", "$248", "$533", "3F"),
      verifiedBand("1 bed", "$599", "$327", "4G"),
      verifiedBand("2 beds", "$890", "$481", "2K"),
    ],
  },
  "sophie-condominium": {
    note: verifiedNote,
    bands: [
      verifiedBand("Studio", "$285", "$493", "207"),
      verifiedBand("1 bed", "$351", "$605", "406"),
      verifiedBand("2 beds", "$554", "$957", "201"),
    ],
  },
  "stanhope-foundry": {
    note: verifiedNote,
    bands: [
      verifiedBand("1 bed", "$429", "$257", "3B"),
      verifiedBand("2 beds", "$630", "$378", "2A"),
    ],
  },
};

export const rmbDevelopmentContent: Record<string, DevelopmentContent> = Object.fromEntries(
  Object.entries(baseFlexibleDevelopmentContent).map(([slug, content]) => [
    slug,
    { ...content, carrying: carryingBySlug[slug] },
  ]),
);
