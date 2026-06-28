/**
 * Buyer-facing copy for Nassau gated/private communities — bilingual, written
 * from the buyer's point of view (plain language, no lecture, no AI filler) and
 * Fair-Housing-safe (describes the place, homes, amenities, security, commute,
 * HOA, and resale — never who lives there). Every claim is grounded in the
 * source-verified facts in `gated-communities.ts`; nothing is invented.
 *
 * Keyed by the community `slug`. A community with no entry falls back to facts.
 */

export interface CommunityHighlight {
  titleZh: string;
  bodyZh: string;
  titleEn: string;
  bodyEn: string;
}

export interface CommunityContent {
  overview: { zh: string; en: string };
  highlights: CommunityHighlight[];
  location: { zh: string; en: string };
  bestFor: { zh: string; en: string };
}

export const gatedCommunityContent: Record<string, CommunityContent> = {
  "stone-hill-north-hills": {
    overview: {
      zh: "Stone Hill at North Hills 是 Manhasset 一处 24 小时人工岗哨的封闭社区——约 82 栋独栋大宅，每栋 4,000 平尺以上，坐落在半英亩或更大的地块上，且建在传奇的 Kiluna Farm（CBS 创始人 Paley 旧庄园）原址之上。最打动买家的，是它把人工岗哨级别的私密安保和一块成熟、有来历的北岸庄园地段放在一起，离 Manhasset 火车站只有几分钟。",
      en: "Stone Hill at North Hills is a 24-hour guard-gated community in Manhasset — about 82 single-family homes, each over 4,000 square feet on a half-acre-plus lot, set on the legendary former Kiluna Farm (the Paley/CBS estate). Its real draw is guard-gated privacy on mature, storied North Shore land, just minutes from the Manhasset train.",
    },
    highlights: [
      {
        titleZh: "24 小时人工岗哨 + 夜间巡逻",
        bodyZh: "入口设 24 小时有人值守的门卫岗亭，并配夜间巡逻安保。对把安全和私密放在前面的买家，这是日常实打实的一层保障。",
        titleEn: "24-hour guard gate + night patrol",
        bodyEn: "A staffed 24-hour gatehouse plus roving night security. For buyers who put safety and privacy first, that's a real, everyday layer of protection.",
      },
      {
        titleZh: "大地块上的独栋大宅",
        bodyZh: "约 82 栋独栋住宅，每栋 4,000 平尺以上，坐落在半英亩或更大的地块上——空间和私密度都是公寓或联排给不了的。",
        titleEn: "Large single-family homes on big lots",
        bodyEn: "About 82 detached homes, each over 4,000 sq ft on a half-acre-plus lot — the kind of space and separation a condo or townhouse can't offer.",
      },
      {
        titleZh: "有来历的庄园地段",
        bodyZh: "社区建在前 Kiluna Farm（Paley 庄园）原址上，保留了 Russell Page 设计的庄园花园，并紧邻 North Hills 乡村俱乐部高尔夫球场，部分住宅可俯瞰球场。这种地段辨识度，对未来转手是加分项。",
        titleEn: "An address with provenance",
        bodyEn: "Built on the former Kiluna Farm (the Paley estate), it keeps the Russell Page-designed gardens and sits beside the North Hills Country Club golf course, with some homes overlooking it — the kind of recognizable address that helps at resale.",
      },
      {
        titleZh: "省心维护 + 短通勤",
        bodyZh: "HOA 负责景观养护、铲雪，并维护两片网球场等公共区域。通勤上，Manhasset 站（LIRR Port Washington 线）就在附近，到 Penn Station 约 28–32 分钟。",
        titleEn: "Low-maintenance, short commute",
        bodyEn: "The HOA handles landscaping, snow, and common areas including two tennis courts. The Manhasset LIRR station (Port Washington Branch) is close by — roughly 28–32 minutes to Penn Station.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills 自治村（Manhasset 邮区），长岛北岸。最近的 LIRR 车站是 Manhasset 站（Port Washington 线），到曼哈顿 Penn Station 约 28–32 分钟；自驾经 LIE（I-495）36N 出口 / Shelter Rock Road 进出，约 20–25 英里到中城。",
      en: "The community is in the Village of North Hills (Manhasset post office), Nassau County, on Long Island's North Shore. The nearest LIRR station is Manhasset on the Port Washington Branch — about 28–32 minutes to Penn Station; by car it's off the LIE (I-495) Exit 36N / Shelter Rock Road, roughly 20–25 miles to Midtown.",
    },
    bestFor: {
      zh: "适合想要一栋大地块独栋大宅、把 24 小时人工岗哨的私密安保放在首位，同时希望保留较短 Port Washington 线通勤的买家。",
      en: "Best for a buyer who wants a large single-family home on a big lot, puts 24-hour guard-gated privacy first, and wants to keep a short Port Washington-branch commute.",
    },
  },

  "gracewood-north-hills": {
    overview: {
      zh: "Gracewood at North Hills 是一处 24 小时人工岗哨的封闭社区，约 141 栋独栋庄园宅邸散布在约 80 英亩的园林式土地上。最大的看点是它会所级别的配套——由修复后的 W.R. Grace 家族庄园大宅改成的会所，加上室内外泳池、健身、瑜伽和水疗，几乎是一个把度假村搬进社区的设定。",
      en: "Gracewood at North Hills is a 24-hour guard-gated community of about 141 detached estate homes spread across roughly 80 acres of park-like grounds. Its biggest draw is the resort-grade amenity set — a clubhouse carved out of the restored W.R. Grace family mansion, plus indoor and outdoor pools, a gym, yoga, and a spa.",
    },
    highlights: [
      {
        titleZh: "庄园会所 + 度假村式配套",
        bodyZh: "会所由修复后的 Grace 家族庄园大宅改建，配室内泳池、室外恒温泳池、健身房、瑜伽室、水疗、桑拿蒸汽、台球室和儿童游乐场——日常生活几乎不用出社区。",
        titleEn: "Mansion clubhouse + resort amenities",
        bodyEn: "The clubhouse is the restored Grace family mansion, paired with an indoor pool, a heated outdoor pool, a gym, a yoga studio, a spa, sauna and steam, a billiard room, and a playground — most of daily life without leaving the gate.",
      },
      {
        titleZh: "独栋庄园宅邸，141 户",
        bodyZh: "约 141 栋独栋庄园住宅，提供七种户型，均带壁炉和全地下室，部分一层即设主卧。",
        titleEn: "141 detached estate homes",
        bodyEn: "About 141 detached estate homes in seven floor plans, all with fireplaces and full basements, some with a first-floor primary bedroom.",
      },
      {
        titleZh: "24 小时门岗，80 英亩园林",
        bodyZh: "整个社区 24 小时人工值守，坐落在约 80 英亩的园林式土地上，私密、成熟、好辨识。",
        titleEn: "Guard-gated, 80 acres of grounds",
        bodyEn: "The whole community is staffed around the clock and set on about 80 acres of park-like grounds — private, mature, and recognizable.",
      },
      {
        titleZh: "短通勤 + HOA 月费",
        bodyZh: "最近的 Manhasset 站（Port Washington 线）到 Penn Station 约 28–32 分钟。HOA 月费按户型不同大致在 1,200–1,675 美元之间——具体以你看中的那套为准，我们会逐套核实。",
        titleEn: "Short commute, and the HOA number",
        bodyEn: "The Manhasset station (Port Washington Branch) is about 28–32 minutes to Penn. HOA dues run roughly $1,200–$1,675/month depending on the home — we confirm the exact figure on the specific unit you like.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills（Manhasset），长岛北岸，就在 LIE（I-495）/ Northern State Parkway 旁。最近的 LIRR 车站为 Manhasset（Port Washington 线），到 Penn Station 约 28–32 分钟。",
      en: "The community is in North Hills (Manhasset), Nassau County, on the North Shore, just off the LIE (I-495)/Northern State Parkway. The nearest LIRR station is Manhasset on the Port Washington Branch, about 28–32 minutes to Penn Station.",
    },
    bestFor: {
      zh: "适合想要一栋独栋庄园、又希望社区自带全套度假村式配套和 24 小时门岗的买家。",
      en: "Best for a buyer who wants a detached estate home in a guard-gated community with a full, resort-style amenity package built in.",
    },
  },

  "manhasset-crest": {
    overview: {
      zh: "Manhasset Crest 是 Toll Brothers 在 Manhasset 打造的全新封闭社区，规模很小——仅 46 栋独栋庄园宅邸，最大约 4,780 平尺，2023 年开盘、目前仍在销售。最大的优势是“全新”：你买的是带建商质保的新房，户型可选，而不是接手一栋几十年的老宅。",
      en: "Manhasset Crest is Toll Brothers' new gated community in Manhasset — small by design at just 46 single-family estate homes, up to roughly 4,780 sq ft, which opened in 2023 and is still selling. Its edge is simply that it's new: a builder-warranty home with design choices, not a decades-old house to take over.",
    },
    highlights: [
      {
        titleZh: "全新建商房，仍可直接购买",
        bodyZh: "这是 Toll Brothers 的新建社区，目前仍在售——意味着你可以买到带建商质保的新房，并在多个户型设计中选择。",
        titleEn: "Brand-new, still selling from the builder",
        bodyEn: "This is new construction by Toll Brothers, still actively selling — so you can buy a new home with a builder warranty and pick from several home designs.",
      },
      {
        titleZh: "仅 46 户的小型封闭社区",
        bodyZh: "整个社区只有 46 栋独栋庄园宅邸，最大约 4,780 平尺，规模小、密度低、配门禁出入。",
        titleEn: "An intimate 46-home gated enclave",
        bodyEn: "Just 46 single-family estate homes, up to about 4,780 sq ft, with gated community access — small, low-density, and private.",
      },
      {
        titleZh: "会所 + 短通勤",
        bodyZh: "社区设度假村式会所与社交休息室。位置就在 LIE 旁，约 19 英里到中城；Manhasset 站（Port Washington 线）到 Penn Station 约 28–32 分钟。",
        titleEn: "Clubhouse + short commute",
        bodyEn: "A resort-style community clubhouse and social lounge. It's right off the LIE, about 19 miles to Midtown; the Manhasset station (Port Washington Branch) is roughly 28–32 minutes to Penn.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Manhasset，长岛北岸，紧邻 LIE（I-495）。最近的 LIRR 车站为 Manhasset（Port Washington 线），到 Penn Station 约 28–32 分钟；自驾约 19 英里到中城。",
      en: "The community is in Manhasset, Nassau County, on the North Shore, next to the LIE (I-495). The nearest LIRR station is Manhasset on the Port Washington Branch, about 28–32 minutes to Penn Station; roughly 19 miles to Midtown by car.",
    },
    bestFor: {
      zh: "适合想要全新建商房（带质保、可选户型）、又偏好小型封闭社区和较短 Manhasset 通勤的买家。",
      en: "Best for a buyer who wants new construction (warranty, design choices) in a small gated enclave with a short Manhasset commute.",
    },
  },

  "stone-hill-muttontown": {
    overview: {
      zh: "Stone Hill at Muttontown 是长岛北岸一处 24 小时门卫值守、双重门禁的私密社区——约 148 英亩土地上仅 80 户定制独栋庄园，每户坐落于 1 至 2.5 英亩以上的地块。最吸引人的地方在于它把真正的私密安保与北岸庄园式生活结合在一起，离曼哈顿开车约 35 分钟。",
      en: "Stone Hill at Muttontown is a double-gated, 24-hour guard-manned private community on Long Island's North Shore — just 80 custom single-family estate homes spread across roughly 148 acres, each on a 1 to 2.5+ acre lot. Its single biggest draw: genuine round-the-clock security paired with true North Shore estate living, about 35 minutes by car from Manhattan.",
    },
    highlights: [
      {
        titleZh: "双重门禁，24 小时人工值守",
        bodyZh: "入口设双重门禁与 24 小时有人值守的门卫岗亭，并配有视频监控系统。对于看重安全与隐私的买家，这是日常生活里实实在在的一层保障。",
        titleEn: "Double-gated, manned 24/7",
        bodyEn: "The entrance is double-gated with a 24-hour staffed gatehouse and a video camera surveillance system. For buyers who weigh security and privacy, that's a real, everyday layer of protection.",
      },
      {
        titleZh: "地块开阔的定制独栋庄园",
        bodyZh: "全社区仅 80 户定制独栋庄园，坐落于 1 至 2.5 英亩以上的地块。空间足以在自家地块上加建私人泳池、网球场，甚至马厩。",
        titleEn: "Custom single-family estates on large lots",
        bodyEn: "Just 80 custom single-family estate homes, each on a 1 to 2.5+ acre lot. There's room for a private pool, tennis court, or even a horse barn on your own land.",
      },
      {
        titleZh: "会所与全套社区设施",
        bodyZh: "社区配有私人会所（含聚会/牌室）、室内恒温泳池、私人网球场，以及健身中心和更衣室。还设有骑马步道与受地役保护的开放空间。",
        titleEn: "Clubhouse and full amenity set",
        bodyEn: "A private clubhouse with a gathering and card room, a heated indoor pool, a private tennis facility, plus a fitness center and locker rooms. There's also an equestrian trail and deed-restricted open space.",
      },
      {
        titleZh: "HOA 打理外部，省心维护",
        bodyZh: "HOA 负责各户地块的景观养护和车道除雪，并维护社区公共区域。买家少操心日常维护，多享受庄园生活。",
        titleEn: "HOA handles the outside upkeep",
        bodyEn: "The HOA covers landscaping for individual lots and driveway snow removal, and maintains the community's common areas. Less day-to-day upkeep, more time to enjoy the estate.",
      },
    ],
    location: {
      zh: "社区位于纳苏县牡蛎湾镇（Town of Oyster Bay）内的 Muttontown 自治村，地处长岛北岸，坐落在历史悠久的 B.K. Stevens 庄园旧址之上。通勤方面，官方资料称开车约 35 分钟即可向东抵达曼哈顿；最近的长岛铁路车站为 Syosset 站（Port Jefferson 支线）。",
      en: "The community sits in the incorporated Village of Muttontown, within the Town of Oyster Bay, Nassau County, on Long Island's North Shore — on the historic former B.K. Stevens estate. For commuting, the official site cites about 35 minutes by car east to Manhattan; the nearest LIRR station is Syosset on the Port Jefferson Branch.",
    },
    bestFor: {
      zh: "适合想要一栋地块开阔、可定制的独栋庄园，并把 24 小时门卫值守的私密安保放在首位的买家。",
      en: "Best for a buyer who wants a custom single-family estate on a large lot and puts guard-gated, 24-hour private security at the top of the list.",
    },
  },

  "spring-hill-old-westbury": {
    overview: {
      zh: "Spring Hill at Old Westbury 坐落在 160 英亩的前 Phipps 庄园原址上，是一个 24 小时专人门岗、与世隔绝的私密社区。最大的看点是社区中心那片 3 英亩的私家淡水湖与湖上的浮动船屋——你在多英亩地块上由 Kean Development 量身定制一栋传统风格的独栋庄园宅邸。",
      en: "Spring Hill at Old Westbury sits on the 160-acre grounds of the former Phipps estate as a secluded, 24-hour guard-gated community. Its single biggest draw is the private 3-acre freshwater lake at its heart, complete with a floating boat house — and you build a traditional single-family estate to suit on a multi-acre lot with Kean Development.",
    },
    highlights: [
      {
        titleZh: "24 小时专人门岗，真正的私密",
        bodyZh: "社区设有 24 小时人工值守的门卫岗亭，整体封闭、隐蔽，进出受控。对看重安全与私密的买家来说，这是日常生活里看得见、摸得着的那层保障。",
        titleEn: "24-hour manned gate, real seclusion",
        bodyEn: "A staffed gatehouse controls access around the clock, and the community is fully gated and secluded. For buyers who weigh security and privacy first, this is protection you can see every day.",
      },
      {
        titleZh: "3 英亩私家湖 + 庄园原野",
        bodyZh: "社区建在 160 英亩的前 Phipps 庄园上，中心是一片 3 英亩的淡水湖，配有湖上浮动船屋，四周是成材古树与起伏草甸。这种成熟的庄园景观不是新规划能凭空造出来的。",
        titleEn: "A private 3-acre lake on historic estate grounds",
        bodyEn: "Set on the 160-acre former Phipps estate, the community centers on a 3-acre freshwater lake with a floating boat house, framed by mature trees and rolling meadowland — the kind of established landscape a new subdivision can't manufacture.",
      },
      {
        titleZh: "多英亩地块，量身定制的独栋庄园",
        bodyZh: "这里是 build-to-suit：你在多英亩地块上，由 Kean Development 设计并建造一栋经典/传统风格的独栋豪华庄园宅邸，而不是从现成户型里挑一套。社区规模很小，按官方说法约 12 个庄园地块。",
        titleEn: "Multi-acre lots, a single-family estate built to suit",
        bodyEn: "This is build-to-suit: on a multi-acre lot, Kean Development designs and constructs a classic, traditional single-family estate home for you rather than handing you a stock floor plan. The community is small — the official site cites about 12 estate lots.",
      },
      {
        titleZh: "从生地到顶级成品，价位跨度很大",
        bodyZh: "目前可买的从多英亩生地（个别 Spring Hill Lane 地块挂牌约 350 万至 567.5 万美元）到 Kean 已建成的成品庄园（约 2800 万至 3880 万美元）都有。已建成的大宅得到第三方报道关注，对在意保值与日后转手的买家是一个参考点。以上数字来自各自独立的 MLS／经纪挂牌，并非开发商统一价目表。",
        titleEn: "A wide span, from raw land to top-tier finished estates",
        bodyEn: "What's available ranges from multi-acre raw lots (individual Spring Hill Lane parcels listed roughly $3.5M–$5.675M) up to completed Kean-built estates (about $28M–$38.8M). The finished homes have drawn third-party coverage — a useful reference point for buyers thinking about value and resale. These figures come from separate individual MLS/brokerage listings, not a developer price sheet.",
      },
    ],
    location: {
      zh: "社区位于纳苏县老韦斯特伯里（Old Westbury），长岛北岸的“黄金海岸”地带，地处纽约市与汉普顿斯之间。通勤上，最近的 LIRR 车站是 Westbury 站（Port Jefferson 线），到曼哈顿 Penn Station 约 45–55 分钟；开发商宣传的自驾时间为非高峰约 22 分钟到曼哈顿。",
      en: "The community is in Old Westbury, Nassau County, along Long Island's North Shore Gold Coast, sitting midway between New York City and the Hamptons. For commuting, the nearest LIRR station is Westbury on the Port Jefferson Branch, about 45–55 minutes to Penn Station; the developer markets a drive of roughly 22 minutes to Manhattan off-peak.",
    },
    bestFor: {
      zh: "适合想要在 24 小时门岗社区里，于多英亩地块上量身定制一栋独栋庄园宅邸、同时希望保留通往曼哈顿较短 LIRR 通勤的买家。",
      en: "Suits a buyer who wants to build a single-family estate to suit on a multi-acre lot inside a 24-hour guard-gated community, while keeping a relatively short LIRR commute to Manhattan.",
    },
  },

  "legend-yacht-beach-club": {
    overview: {
      zh: "Legend Yacht & Beach Club 是 Glen Cove 海滨一处 24 小时门卫值守的封闭社区，仅 47 栋独栋住宅，建于 2002 年。最大的卖点是水：社区自带私人码头和船位，以及一片位于长岛海湾（Long Island Sound）的私家沙滩——在长岛，能“出门就上船”的封闭社区并不多。",
      en: "Legend Yacht & Beach Club is a 24-hour guard-gated waterfront community of just 47 detached homes in Glen Cove, built in 2002. The headline is the water: a private marina with boat slips and a private sandy beach on Long Island Sound — a gated community where you can step from home to your boat, which is rare on Long Island.",
    },
    highlights: [
      {
        titleZh: "私人码头 + 海湾私家沙滩",
        bodyZh: "社区设私人码头（带水电接口和防波堤）和一片长岛海湾边的私家沙滩，外加一个俯瞰码头的恒温室外泳池。对喜欢船和水上生活的买家，这是核心吸引力。",
        titleEn: "Private marina + a private beach on the Sound",
        bodyEn: "A private marina with boat slips (water and electric hookups, a breakwater) and a private sandy beach on Long Island Sound, plus a heated outdoor pool overlooking the marina. For a boating buyer, this is the whole point.",
      },
      {
        titleZh: "47 栋独栋住宅，24 小时门卫",
        bodyZh: "仅 47 栋独栋住宅，多数坐落在约半英亩地块上；入口 24 小时门卫值守、带访客通报系统，私密度高。",
        titleEn: "47 detached homes, guard-gated 24/7",
        bodyEn: "Just 47 detached single-family homes, most on about half-acre lots, behind a 24/7 manned gated entrance with a visitor announcement system.",
      },
      {
        titleZh: "会所 + 室内多功能球馆",
        bodyZh: "业主会所带水景、壁炉休息区、餐饮厨房、会议室、台球室和图书室；另有室内恒温多功能球馆（网球、匹克球、羽毛球、篮球、沙狐球）。",
        titleEn: "Clubhouse + indoor sport court",
        bodyEn: "An owner clubhouse with water views, a fireplace lounge, catering kitchen, conference room, billiards, and a library, plus an indoor heated multi-sport court (tennis, pickleball, badminton, basketball, shuffleboard).",
      },
      {
        titleZh: "通勤更长，按实说",
        bodyZh: "HOA 月费约 2,450 美元，覆盖景观、灌溉和除雪等。要提醒的是通勤：最近的 Glen Cove 站走 Oyster Bay 支线，到 Penn Station 约 64–78 分钟，且常需在 Jamaica 或 Mineola 换乘——这里更适合自驾或非每日通勤的买家。",
        titleEn: "A longer commute — said plainly",
        bodyEn: "HOA dues are about $2,450/month, covering landscaping, irrigation, and snow. One honest caveat is the commute: the nearest Glen Cove station is on the Oyster Bay Branch, roughly 64–78 minutes to Penn and often with a transfer at Jamaica or Mineola — this suits a buyer who drives or doesn't commute daily.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Glen Cove 市的海滨，长岛北岸“黄金海岸”。最近的 LIRR 车站为 Glen Cove（Oyster Bay 支线），到 Penn Station 约 64–78 分钟（常需换乘）；自驾约 25 英里到中城。",
      en: "The community is on the Glen Cove waterfront, Nassau County, along the North Shore Gold Coast. The nearest LIRR station is Glen Cove on the Oyster Bay Branch, about 64–78 minutes to Penn (often with a transfer); roughly 25 miles to Midtown by car.",
    },
    bestFor: {
      zh: "适合想要一栋带私人码头/船位、临长岛海湾的封闭式独栋住宅，且不介意通勤偏长的买家。",
      en: "Best for a buyer who wants a guard-gated waterfront home with a boat slip on Long Island Sound and is comfortable with a longer commute.",
    },
  },

  "estates-north-hills-2": {
    overview: {
      zh: "The Estates at North Hills II 是 North Hills 一处 24 小时人工岗哨的封闭社区，约 178 套带门禁的低维护住宅，建于约 1983 年。它的特点是把“独门独院的私密感”和“省心的联排式生活”结合起来——单层 ranch 与两层联排户型都带全地下室，离 Manhasset 火车站只有几分钟车程。",
      en: "The Estates at North Hills II is a 24-hour guard-gated community of about 178 low-maintenance homes in North Hills, built around 1983. Its niche is combining gated privacy with easy attached-home living — single-level ranch and two-story townhouse plans, all with full basements, a few minutes' drive from the Manhasset train.",
    },
    highlights: [
      {
        titleZh: "24 小时门岗 + 夜间机动巡逻",
        bodyZh: "入口设 24 小时人工门岗（Searingtown Road 一侧），并配夜间机动安保巡逻，私密与安全到位。",
        titleEn: "24-hour guard gate + night patrol",
        bodyEn: "A 24-hour manned guard gate (on Searingtown Road) plus a nighttime motorized security patrol — privacy and security covered.",
      },
      {
        titleZh: "带全地下室的联排，含单层 ranch",
        bodyZh: "约 178 套联排式住宅，提供单层 ranch 和两层多层户型，且都带全地下室。对想要私密但又不想打理大宅、或偏好单层生活的买家很合适。",
        titleEn: "Attached homes with full basements, incl. single-level",
        bodyEn: "About 178 attached homes in ranch (single-level) and two-story plans, all with full basements — good for buyers who want privacy without maintaining a big house, or who prefer single-level living.",
      },
      {
        titleZh: "可办活动的会所 + 全套配套",
        bodyZh: "会所设翻新的大活动厅和全套厨房，可租用办私人活动；另有健身中心（带男女更衣室）、有救生员的恒温室外泳池、硬地与 Har-Tru 网球场，以及匹克球场。",
        titleEn: "Rentable clubhouse + full amenities",
        bodyEn: "A clubhouse with a renovated great room and full kitchen you can rent for private events, plus a fitness center with locker rooms, a lifeguarded heated outdoor pool, hard and Har-Tru tennis courts, and pickleball.",
      },
      {
        titleZh: "离 Manhasset 站很近",
        bodyZh: "社区到 Manhasset 站（Port Washington 线）约 2.5 英里、车程约 9 分钟，进出 LIE 方便。",
        titleEn: "Close to the Manhasset station",
        bodyEn: "About 2.5 miles / a 9-minute drive to the Manhasset LIRR station (Port Washington Branch), with easy LIE access.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills，长岛北岸，门岗设在 Searingtown Road 一侧。最近的 LIRR 车站为 Manhasset（Port Washington 线），约 2.5 英里 / 9 分钟车程。",
      en: "The community is in North Hills, Nassau County, on the North Shore, with its gate on Searingtown Road. The nearest LIRR station is Manhasset on the Port Washington Branch, about 2.5 miles / a 9-minute drive away.",
    },
    bestFor: {
      zh: "适合想要 24 小时门岗、低维护联排生活（含单层 ranch 选项）且离 Manhasset 通勤近的买家。",
      en: "Best for a buyer who wants guard-gated, low-maintenance attached living (including single-level ranch options) close to the Manhasset commute.",
    },
  },

  "links-north-hills": {
    overview: {
      zh: "The Links at North Hills 是 North Hills 一处 24 小时人工岗哨、占地约 125 英亩的封闭社区，约 212 套半独立的联排式公寓。它的优势是“配套极全 + 价格更亲民”——既有人工门岗和度假村级配套，入门价又比周边那些独栋庄园社区低不少。",
      en: "The Links at North Hills is a 24-hour guard-gated community of about 212 semi-attached, townhouse-style condominiums on roughly 125 acres. Its appeal is amenities-plus-value: a manned gate and a resort-grade amenity package, at an entry price well below the surrounding single-family estate communities.",
    },
    highlights: [
      {
        titleZh: "24 小时人工门岗",
        bodyZh: "入口 24 小时有人值守，整个社区封闭管理，私密、安静。",
        titleEn: "24-hour guard gate",
        bodyEn: "A staffed gatehouse 24/7, with the whole community gated — private and quiet.",
      },
      {
        titleZh: "度假村级配套，125 英亩",
        bodyZh: "会所带宴会厅和餐饮厨房；室内恒温泳池加按摩池、季节性室外泳池、健身中心（带课程）、网球、壁球、篮球、匹克球、桑拿蒸汽、图书牌室、儿童游乐场、狗公园，以及带喷泉的景观水池。",
        titleEn: "Resort-grade amenities on 125 acres",
        bodyEn: "A clubhouse with a banquet hall and catering kitchen; an indoor heated pool with hot tub, a seasonal outdoor pool, a fitness center with classes, tennis, racquetball, basketball, pickleball, sauna and steam, a library and card room, a playground, a dog park, and landscaped ponds with fountains.",
      },
      {
        titleZh: "半独立联排，门槛更低",
        bodyZh: "约 212 套以半独立联排为主的住宅，入门价大致从 145 万美元起，比周边独栋庄园社区更容易进入。",
        titleEn: "Semi-attached homes, a lower entry point",
        bodyEn: "About 212 mostly semi-attached townhouse-style residences, with entry pricing starting around $1.45M — more accessible than the nearby single-family estate communities.",
      },
      {
        titleZh: "Manhasset 线通勤",
        bodyZh: "最近的 Manhasset 站走 Port Washington 线，社区方面通常引用约 25 分钟车程进城；列车到 Penn Station/Grand Central 约 40 分钟（该支线常规水平）。",
        titleEn: "Port Washington-branch commute",
        bodyEn: "The nearest Manhasset station is on the Port Washington Branch; community write-ups cite about a 25-minute drive into the city, with trains around 40 minutes to Penn / Grand Central (typical for the branch).",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills（Roslyn 邮区），长岛北岸，经 LIE 进出。最近的 LIRR 车站为 Manhasset（Port Washington 线）。",
      en: "The community is in North Hills (Roslyn post office), Nassau County, on the North Shore, with LIE access. The nearest LIRR station is Manhasset on the Port Washington Branch.",
    },
    bestFor: {
      zh: "适合想要人工门岗、配套极全的低维护生活，但预算比独栋庄园社区更理性的买家。",
      en: "Best for a buyer who wants a guard-gated, amenity-rich, low-maintenance home at a more rational price than the single-family estate communities.",
    },
  },

  "acorn-ponds": {
    overview: {
      zh: "Acorn Ponds at North Hills 是一处占地约 32 英亩、约 382 套住宅的私密公寓社区，2-3 卧户型，始建于 1979 年。它的吸引力在于“亲民又省心”：配套齐全、HOA 月费偏低，还有免费班车直送 Manhasset 火车站。需要说清楚的是——它有夜间巡逻安保，但不是人工岗亭门禁。",
      en: "Acorn Ponds at North Hills is a private condominium community of about 382 homes (2–3 bedrooms) on roughly 32 acres, first built in 1979. The draw is accessible, low-maintenance living: a full amenity set, relatively low HOA dues, and a free shuttle to the Manhasset train. To be clear, it has evening roving security — not a manned entrance gate.",
    },
    highlights: [
      {
        titleZh: "私密社区，夜间巡逻（非人工门岗）",
        bodyZh: "社区为私密管理，配夜间巡逻安保——但要如实说明：它没有 24 小时人工岗亭。如果你的硬性要求是“人工门岗”，这一点要先了解。",
        titleEn: "Private, with night security (not a manned gate)",
        bodyEn: "The community is private with evening roving security — but to be straight with you, it does not have a 24-hour manned gatehouse. If a staffed gate is a hard requirement, know that up front.",
      },
      {
        titleZh: "配套齐全，HOA 偏低",
        bodyZh: "室内外恒温泳池、健身房、桑拿蒸汽、三片网球场加一片网球/匹克球场、带活动露台的会所、带门禁的户外公园和儿童游乐场；HOA 月费约 580–602 美元，在同类社区里偏低。",
        titleEn: "Full amenities, low HOA",
        bodyEn: "Indoor and outdoor heated pools, a gym, sauna and steam, three tennis courts plus a tennis/pickleball court, a clubhouse with an event deck, and a gated outdoor park and playground — with HOA dues around $580–$602/month, low for the category.",
      },
      {
        titleZh: "免费班车直达火车站",
        bodyZh: "North Hills 村提供免费通勤班车直送 Manhasset 站（Port Washington 线），到 Penn Station 约 28–33 分钟，省去自己开车停车的麻烦。",
        titleEn: "Free shuttle to the train",
        bodyEn: "The Village of North Hills runs a free commuter shuttle to the Manhasset station (Port Washington Branch), about 28–33 minutes to Penn — no driving-and-parking hassle.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills（Roslyn 11576 邮区），长岛北岸，经 LIE（35 出口）/ Northern State Parkway 进出，约 20–22 英里到中城。最近的 LIRR 车站为 Manhasset（Port Washington 线）。",
      en: "The community is in North Hills (Roslyn 11576 post office), Nassau County, on the North Shore, via the LIE (Exit 35)/Northern State Parkway, about 20–22 miles to Midtown. The nearest LIRR station is Manhasset on the Port Washington Branch.",
    },
    bestFor: {
      zh: "适合想要亲民价、配套齐全、HOA 低的低维护公寓，且不强求人工门岗、看重火车班车便利的买家。",
      en: "Best for a buyer who wants an accessible, amenity-rich, low-HOA condo, doesn't require a manned gate, and values the easy train shuttle.",
    },
  },

  "greens-north-hills": {
    overview: {
      zh: "The Greens at North Hills 是 North Hills 一处私密的联排式公寓社区，砖砌联排、2-3 卧，约建于 1980 年。它主打“真正省心”：HOA 几乎把房子外部的事全包了，社区紧邻 North Hills 乡村俱乐部高尔夫球场，到 Manhasset 火车站只要几分钟。这是一个私密社区，但没有人工岗亭门禁。",
      en: "The Greens at North Hills is a private townhouse-style condominium community in North Hills — brick townhomes, 2–3 bedrooms, built around 1980. It's about genuinely low-maintenance living: the HOA covers nearly everything outside the home, it sits beside the North Hills Country Club golf course, and the Manhasset train is minutes away. It's a private community, without a manned gate.",
    },
    highlights: [
      {
        titleZh: "几乎全包的省心维护",
        bodyZh: "HOA 月费约 700 美元，覆盖庭院、外墙维护、除雪、垃圾和有线电视——基本是“锁门就走”的生活方式。",
        titleEn: "Near-total maintenance-free living",
        bodyEn: "HOA dues are about $700/month, covering grounds, exterior maintenance, snow removal, trash, and cable — close to a lock-and-leave lifestyle.",
      },
      {
        titleZh: "砖砌联排，紧邻高尔夫球场",
        bodyZh: "砖砌联排式公寓，一般 2-3 卧，紧邻 North Hills 乡村俱乐部，部分单元可观球场景，社区可养宠物。",
        titleEn: "Brick townhomes beside the golf course",
        bodyEn: "Brick townhouse-style condos, generally 2–3 bedrooms, next to the North Hills Country Club with golf-course views from some units, and pet-friendly.",
      },
      {
        titleZh: "泳池网球 + 短通勤",
        bodyZh: "社区设室外泳池和私人网球场。到 Manhasset 站（Port Washington 线）约 2 英里、车程约 7 分钟，列车到 Penn Station 约 28 分钟。",
        titleEn: "Pool, tennis + short commute",
        bodyEn: "A community outdoor pool and private tennis. The Manhasset station (Port Washington Branch) is about 2 miles / a 7-minute drive, with trains roughly 28 minutes to Penn.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills（Manhasset 邮区），长岛北岸，就在 LIE 35 出口以北、Northern State Parkway 旁。最近的 LIRR 车站为 Manhasset（Port Washington 线）。",
      en: "The community is in North Hills (Manhasset post office), Nassau County, on the North Shore, just north of LIE Exit 35 by the Northern State Parkway. The nearest LIRR station is Manhasset on the Port Washington Branch.",
    },
    bestFor: {
      zh: "适合想要紧邻高尔夫球场、几乎全包式低维护联排，且看重 Manhasset 短通勤、不强求人工门岗的买家。",
      en: "Best for a buyer who wants a low-maintenance townhome beside the golf course with a short Manhasset commute, and doesn't require a manned gate.",
    },
  },

  "whitewood-north-hills": {
    overview: {
      zh: "Whitewood at North Hills 是 North Hills 一处带密码门禁的小型社区，住宅为联排式——既有单层 ranch 户型，也有两层联排。它适合想要一处低维护、带门禁、又靠近 Manhasset 的住所的买家。（这个社区公开资料较少，户数和建成年份等细节我们会在你看中具体单元时再逐项核实。）",
      en: "Whitewood at North Hills is a small, coded-gate community in North Hills with attached homes — both single-level ranch plans and two-story townhouses. It suits a buyer who wants a low-maintenance, gated home close to Manhasset. (Public data on this community is thin; details like the home count and build year we verify per unit when you focus on a specific home.)",
    },
    highlights: [
      {
        titleZh: "密码门禁，低调私密",
        bodyZh: "社区入口为密码/键盘门禁（非人工岗亭），规模小、相对低调。",
        titleEn: "Coded gate, low-key and private",
        bodyEn: "Entry is by a coded/keypad gate (not a manned gatehouse) — small and relatively low-key.",
      },
      {
        titleZh: "联排住宅，含单层 ranch",
        bodyZh: "住宅为联排式，提供单层 ranch 和两层多层户型，适合想要省心、或偏好单层生活的买家；社区可养宠物。",
        titleEn: "Attached homes, including single-level ranch",
        bodyEn: "Attached residences in single-level ranch and two-story townhouse plans — good for low-maintenance or single-level living — and pet-friendly.",
      },
      {
        titleZh: "泳池网球 + 近 Manhasset",
        bodyZh: "社区设游泳池、池畔小屋和网球场。位置在 LIE 出口附近，约 20–25 英里到中城，开车到 Manhasset 站搭 Port Washington 线。",
        titleEn: "Pool, tennis + near Manhasset",
        bodyEn: "A community pool, pool house, and tennis courts. It's near an LIE exit, about 20–25 miles to Midtown, with residents driving to the Manhasset station for the Port Washington Branch.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 North Hills（Roslyn），长岛北岸，靠近 LIE（I-495）出口。最近可用的 LIRR 车站为 Manhasset（Port Washington 线，居民自驾前往）。",
      en: "The community is in North Hills (Roslyn), Nassau County, on the North Shore, near an LIE (I-495) exit. The nearest practical LIRR station is Manhasset on the Port Washington Branch (residents drive to it).",
    },
    bestFor: {
      zh: "适合想要一处带门禁、低维护的小型联排住所（含单层选项）、靠近 Manhasset 的买家。",
      en: "Best for a buyer who wants a small, gated, low-maintenance attached home (with single-level options) close to Manhasset.",
    },
  },

  "roslyn-landing": {
    overview: {
      zh: "Roslyn Landing 是 Roslyn 村一处临 Hempstead Harbor 的较新滨水社区（2016–2018 年建成），78 套住宅，包括联排、上下叠拼公寓和少量独栋。它的吸引力在于“新 + 滨水 + 步行可达 Roslyn 老村”：沿港湾有滨水步道，社区把景观、除雪和垃圾都包了。这是私密社区，配移动安保，但没有人工岗亭门禁。",
      en: "Roslyn Landing is a newer waterfront community (built 2016–2018) on Hempstead Harbor in the Village of Roslyn — 78 homes including townhomes, flat-over-flat condos, and a few single-family houses. The appeal is new-plus-waterfront with walkable Roslyn village: a harbor-front promenade, with landscaping, snow, and refuse included. It's a private community with mobile security, not a manned gate.",
    },
    highlights: [
      {
        titleZh: "较新建成，临 Hempstead Harbor",
        bodyZh: "2016–2018 年分期建成，比北岸多数社区都新；沿 Hempstead Harbor 设滨水步道，社区还有约 12 英亩的村庄绿地。",
        titleEn: "Newer construction on Hempstead Harbor",
        bodyEn: "Built in phases in 2016–2018 — newer than most North Shore communities — with a waterfront promenade along Hempstead Harbor and about 12 acres of village green.",
      },
      {
        titleZh: "多种户型，省心维护",
        bodyZh: "78 套住宅含联排、上下叠拼公寓和少量独栋；HOA 已包含景观、除雪和垃圾清运，省心。",
        titleEn: "A mix of home types, low-maintenance",
        bodyEn: "78 homes spanning townhomes, flat-over-flat condos, and some single-family houses; the HOA includes landscaping, snow, and refuse removal.",
      },
      {
        titleZh: "会所配套 + 私密安保",
        bodyZh: "会所设台球、酒吧、休息区和餐饮厨房，另有健身中心、高尔夫模拟器和儿童室内游戏室；社区配移动现场安保（非人工岗亭）。HOA 月费约 998–1,054 美元。",
        titleEn: "Clubhouse amenities + on-site security",
        bodyEn: "A clubhouse with billiards, a bar, a lounge, and a catering kitchen, plus a fitness center, golf simulator, and children's indoor playroom; mobile on-site security (not a manned gate). HOA dues run about $998–$1,054/month.",
      },
      {
        titleZh: "步行可达 Roslyn 村",
        bodyZh: "社区紧邻 Roslyn 老村。最近的 Roslyn 站走 Oyster Bay 支线，到 Penn Station 约 48 分钟。",
        titleEn: "Walkable to Roslyn village",
        bodyEn: "The community is next to the historic Roslyn village. The nearest Roslyn station is on the Oyster Bay Branch, about 48 minutes to Penn.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Roslyn 村，长岛北岸，临 Hempstead Harbor，约 30 英里到曼哈顿。最近的 LIRR 车站为 Roslyn（Oyster Bay 支线），到 Penn Station 约 48 分钟。",
      en: "The community is in the Village of Roslyn, Nassau County, on the North Shore, on Hempstead Harbor, about 30 miles from Manhattan. The nearest LIRR station is Roslyn on the Oyster Bay Branch, about 48 minutes to Penn.",
    },
    bestFor: {
      zh: "适合想要较新、低维护的滨水联排，看重步行可达 Roslyn 老村、且能接受 Oyster Bay 支线通勤的买家。",
      en: "Best for a buyer who wants a newer, low-maintenance waterfront townhome with walkable Roslyn village and is comfortable with the Oyster Bay-branch commute.",
    },
  },

  "fieldstone-oyster-bay": {
    overview: {
      zh: "Fieldstone 是 Oyster Bay 一处仅 40 栋独栋住宅的小型私密社区，建于 1995 年，房屋平均约 3,500 平尺。它主打“独栋 + 锁门就走”：HOA 把景观、铲雪（直送门口）和垃圾清运都包了，月费还低。它是私密 HOA 社区，但没有人工岗亭门禁，且这一带是 Oyster Bay 慢速支线——更适合自驾的买家。",
      en: "Fieldstone is a small, private community of just 40 detached homes in Oyster Bay, built in 1995, with houses averaging about 3,500 sq ft. It's detached-plus-lock-and-leave: the HOA covers landscaping, snow (cleared to your front door), and garbage, at a low monthly fee. It's a private HOA community without a manned gate, and the area sits on the slower Oyster Bay branch — better suited to a buyer who drives.",
    },
    highlights: [
      {
        titleZh: "40 栋独栋，锁门就走",
        bodyZh: "整个社区仅 40 栋独栋住宅，平均约 3,500 平尺。HOA 负责庭院养护、铲雪直送门口、垃圾清运——独栋的私密，加上几乎不用操心的维护。",
        titleEn: "40 detached homes, lock-and-leave",
        bodyEn: "Just 40 detached single-family homes, averaging about 3,500 sq ft. The HOA handles landscaping, snow cleared to your front door, and garbage — detached privacy with almost no upkeep.",
      },
      {
        titleZh: "HOA 月费低",
        bodyZh: "HOA 月费约 595 美元，在独栋社区里相当低，持有成本友好。",
        titleEn: "Low HOA dues",
        bodyEn: "HOA dues are about $595/month — low for a detached-home community, and easy on carrying cost.",
      },
      {
        titleZh: "通勤按实说：适合自驾",
        bodyZh: "最近的 Oyster Bay 站走 Oyster Bay 支线（柴油线、非电气化），到 Penn Station 约 90–100 分钟、通常需换乘。这里更适合自驾、或不需每日进城的买家。",
        titleEn: "Honest on commute: better for drivers",
        bodyEn: "The nearest Oyster Bay station is on the diesel (non-electric) Oyster Bay Branch, roughly 90–100 minutes to Penn and usually with a transfer. This fits a buyer who drives or doesn't head into the city daily.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Oyster Bay（村镇），长岛北岸，约 35–40 英里到曼哈顿（经 LIE）。最近的 LIRR 车站为 Oyster Bay（Oyster Bay 支线，柴油线）。",
      en: "The community is in the hamlet of Oyster Bay, Nassau County, on the North Shore, about 35–40 miles to Manhattan via the LIE. The nearest LIRR station is Oyster Bay on the (diesel) Oyster Bay Branch.",
    },
    bestFor: {
      zh: "适合想要一处小型、低维护的独栋社区、主要靠自驾、不需每日搭火车进城的买家。",
      en: "Best for a buyer who wants a small, low-maintenance detached-home enclave and relies on driving rather than a daily train into the city.",
    },
  },

  "lattingtown-preserve": {
    overview: {
      zh: "Lattingtown Preserve 是 Locust Valley 一处小型门禁社区，约 20 栋独栋住宅，多为中央门厅式殖民风格，建于 1999 年，坐落在受保护的林地环境中。它适合想要一处安静、私密、被树林环绕的独栋小社区的买家，许多住宅自带私人泳池。",
      en: "Lattingtown Preserve is a small gated community of about 20 detached homes in Locust Valley — mostly center-hall colonials, built in 1999, set within a preserved woodland landscape. It suits a buyer who wants a quiet, private, tree-framed enclave of single-family homes, many with private in-ground pools.",
    },
    highlights: [
      {
        titleZh: "小型门禁社区，约 20 户",
        bodyZh: "整个社区仅约 20 栋独栋住宅，门禁出入、私密度高、邻里规模小。",
        titleEn: "A small gated enclave, ~20 homes",
        bodyEn: "Just about 20 detached homes behind a community gate — private, with a small-neighborhood scale.",
      },
      {
        titleZh: "殖民风格独栋，多带私人泳池",
        bodyZh: "住宅多为中央门厅式殖民风格，不少自带私人室外泳池；社区由 HOA 统一维护（condominium 式管理）。",
        titleEn: "Colonial-style homes, many with private pools",
        bodyEn: "Predominantly center-hall colonials, many with their own in-ground pools; the community is HOA-maintained (condominium-style).",
      },
      {
        titleZh: "林地环境 + 通勤按实说",
        bodyZh: "社区被保护林地环绕，环境安静。最近的 Locust Valley 站走 Oyster Bay 支线（柴油线），到 Penn Station 约 60–75 分钟、通常需换乘——更适合看重环境、不强求快速通勤的买家。",
        titleEn: "Woodland setting + honest commute",
        bodyEn: "The community is wrapped in preserved woodland and quiet. The nearest Locust Valley station is on the diesel Oyster Bay Branch, about 60–75 minutes to Penn and usually with a transfer — best for buyers who value the setting over a fast commute.",
      },
    ],
    location: {
      zh: "社区邮区为 Locust Valley，行政上属 Glen Cove 市管辖，长岛北岸，约 30–35 英里到中城。最近的 LIRR 车站为 Locust Valley（Oyster Bay 支线）。",
      en: "The community has a Locust Valley mailing address and is governed by the City of Glen Cove, on the North Shore, about 30–35 miles to Midtown. The nearest LIRR station is Locust Valley on the Oyster Bay Branch.",
    },
    bestFor: {
      zh: "适合想要一处安静、私密、林地环绕的小型门禁独栋社区，对快速通勤要求不高的买家。",
      en: "Best for a buyer who wants a quiet, private, woodland-framed gated enclave of single-family homes and doesn't need a fast commute.",
    },
  },

  "hamlet-olde-oyster-bay": {
    overview: {
      zh: "The Hamlet at Olde Oyster Bay 是 Plainview 一处 24 小时人工岗哨的度假村式封闭社区，约 141 户，建于 2001 年。它最大的特点是“一个社区容纳多种预算和生活方式”：从马车房公寓到独栋住宅都有，社区内自带湖泊、餐厅、室内外泳池和水疗，且离 Hicksville 火车站很近、走干线进城快。",
      en: "The Hamlet at Olde Oyster Bay is a 24-hour guard-gated, resort-style community of about 141 homes in Plainview, built in 2001. Its strength is fitting several budgets and lifestyles in one place — from carriage-house condos to single-family homes — with an on-site lake, restaurant, indoor and outdoor pools, and a spa, plus a quick Main Line commute from nearby Hicksville.",
    },
    highlights: [
      {
        titleZh: "24 小时门岗 + 度假村配套",
        bodyZh: "入口 24 小时人工值守；社区设会所/宴会厅、室内外泳池、水疗健身中心、桑拿蒸汽、灯光网球场、匹克球、半场篮球、推杆果岭，以及带木栈道和划船的湖泊和水畔餐厅，另有礼宾和代客泊车服务。",
        titleEn: "Guard-gated + resort amenities",
        bodyEn: "A 24-hour manned gatehouse; a clubhouse/ballroom, indoor and outdoor pools, a spa and fitness center, sauna and steam, lighted tennis, pickleball, a half basketball court, a putting green, plus a lake with a boardwalk and boating and a waterfront restaurant, with concierge and valet service.",
      },
      {
        titleZh: "多种户型，覆盖不同预算",
        bodyZh: "约 141 户，包含独栋住宅、湖景 villa，以及上层/底层的马车房公寓——从入门到升级都有选择，价格大致 87.5 万至 140 万美元。",
        titleEn: "Home types across budgets",
        bodyEn: "About 141 homes — detached single-family, lake-view villas, and upper/ground-level carriage-house condos — giving options from entry to step-up, roughly $875K to $1.4M.",
      },
      {
        titleZh: "Hicksville 干线，通勤快",
        bodyZh: "到 Hicksville 站约 3.4 英里 / 6 分钟车程；Hicksville 在 LIRR 干线（Main Line）上，到 Penn Station 约 41–55 分钟，是长岛通勤效率较高的一站。",
        titleEn: "Fast Main Line commute via Hicksville",
        bodyEn: "About 3.4 miles / a 6-minute drive to the Hicksville station; Hicksville is on the LIRR Main Line, roughly 41–55 minutes to Penn — one of the more efficient commutes on Long Island.",
      },
      {
        titleZh: "把真实月费说清",
        bodyZh: "HOA 月费按户型约 540–755 美元，另有一项约 165 美元/月的强制餐饮费——算总持有成本时要把这一项也加进去。具体数字我们按你看中的单元核实。",
        titleEn: "The real monthly number, stated",
        bodyEn: "HOA common charges run about $540–$755/month by home, plus a separate mandatory dining fee of about $165/month — fold that into your true carrying cost. We confirm the exact figures on the unit you choose.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Plainview，中区（Central Nassau）。最近的 LIRR 车站为 Hicksville（干线/Port Jefferson 支线），约 3.4 英里 / 6 分钟车程，到 Penn Station 约 41–55 分钟。",
      en: "The community is in Plainview, Nassau County (Central Nassau). The nearest LIRR station is Hicksville (Main Line / Port Jefferson Branch), about 3.4 miles / a 6-minute drive, roughly 41–55 minutes to Penn.",
    },
    bestFor: {
      zh: "适合想要全配套、24 小时门岗社区，且希望有跨预算户型选择和较快干线通勤的买家。",
      en: "Best for a buyer who wants a full-amenity, guard-gated community with home types across budgets and a faster Main Line commute.",
    },
  },

  "hamlet-estates-jericho": {
    overview: {
      zh: "The Hamlet Estates at Jericho 是 Jericho 一处 24 小时人工岗哨的封闭社区，102 栋独栋庄园和 villa，房屋约 3,000–4,800 平尺、3 到 6 卧。它适合想要一栋较新的独栋庄园、又看重 Jericho 位置和快速干线通勤的买家——到 Hicksville 上车，直达曼哈顿。",
      en: "The Hamlet Estates at Jericho is a 24-hour guard-gated community in Jericho of 102 detached estate homes and villas, roughly 3,000–4,800 sq ft, 3 to 6 bedrooms. It suits a buyer who wants a newer single-family estate with a strong Jericho location and a fast, direct Main Line commute from Hicksville.",
    },
    highlights: [
      {
        titleZh: "24 小时门岗",
        bodyZh: "入口 24 小时人工值守，整个社区封闭管理，私密、安静。",
        titleEn: "24-hour guard gate",
        bodyEn: "A staffed gatehouse around the clock, with the whole community gated — private and quiet.",
      },
      {
        titleZh: "独栋庄园与 villa，102 户",
        bodyZh: "102 栋独栋庄园和 villa，约 3,000–4,800 平尺、3 到 6 卧，适合想要空间和独栋私密、又不想要超大老宅维护负担的买家。",
        titleEn: "102 detached estates and villas",
        bodyEn: "102 detached estate homes and villas, about 3,000–4,800 sq ft, 3 to 6 bedrooms — for buyers who want space and detached privacy without an oversized maintenance burden.",
      },
      {
        titleZh: "会所配套 + HOA",
        bodyZh: "社区设会所、健身中心、休息区和牌室、室外泳池、儿童池、按摩池、灯光全天候网球场和半场篮球；HOA 月费约 1,000–1,025 美元，含除雪、垃圾和景观。",
        titleEn: "Clubhouse amenities + HOA",
        bodyEn: "A clubhouse, fitness center, lounge and card room, outdoor pool, kiddie pool, whirlpool, lighted all-weather tennis, and a half basketball court; HOA dues about $1,000–$1,025/month including snow, trash, and landscaping.",
      },
      {
        titleZh: "Hicksville 干线，直达快",
        bodyZh: "到 Hicksville 站搭 LIRR 干线，到 Penn Station 约 42–47 分钟、可直达，是长岛通勤效率较高的选择。",
        titleEn: "Direct, fast Main Line commute",
        bodyEn: "The Hicksville station on the LIRR Main Line runs about 42–47 minutes to Penn, with direct service — one of the more efficient Long Island commutes.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Jericho，中区（Central Nassau），约 29 英里到中城。最近的 LIRR 车站为 Hicksville（干线），到 Penn Station 约 42–47 分钟（直达）。",
      en: "The community is in Jericho, Nassau County (Central Nassau), about 29 miles to Midtown. The nearest LIRR station is Hicksville on the Main Line, about 42–47 minutes to Penn (direct).",
    },
    bestFor: {
      zh: "适合想要一栋 24 小时门岗社区里的独栋庄园，并看重 Jericho 位置和快速直达通勤的买家。",
      en: "Best for a buyer who wants a single-family estate in a guard-gated community with a strong Jericho location and a quick, direct commute.",
    },
  },

  "hamlet-jericho": {
    overview: {
      zh: "The Hamlet at Jericho 是 Jericho 一处成熟的 24 小时门禁社区，约 386 套公寓和联排，分三个区域、统一在 Picket Farm HOA 之下，最早一期始建于 1982 年。它的吸引力是“配套大、门槛低”：两个会所、两处泳池、8 片网球场，入门价又落在公寓区间，且 Hicksville 干线通勤快。",
      en: "The Hamlet at Jericho is an established, 24-hour gated community of about 386 condominiums and townhomes in Jericho, across three sections under the Picket Farm HOA, with the first section dating to 1982. The appeal is big-amenity, lower-entry: two clubhouses, two pool sites, and eight tennis courts, at condo-level entry pricing with a fast Hicksville Main Line commute.",
    },
    highlights: [
      {
        titleZh: "24 小时门禁安保",
        bodyZh: "社区 24 小时门禁管理，私密、安静，规模成熟。",
        titleEn: "24-hour gated security",
        bodyEn: "Gated and staffed 24 hours — private, quiet, and well-established.",
      },
      {
        titleZh: "配套规模大",
        bodyZh: "两个会所、两处泳池区（含恒温泳池、深水池和儿童恒温池）、8 片网球场、健身中心、儿童游乐场和步道，还有社区活动委员会。",
        titleEn: "A large amenity footprint",
        bodyEn: "Two clubhouses, two pool sites (a heated pool, a deep-water pool, and a heated children's pool), eight tennis courts, a fitness center, a playground, a walking trail, and a social committee.",
      },
      {
        titleZh: "公寓门槛，入门更易",
        bodyZh: "约 386 套公寓和联排，分三个区域；在售价大致从 100 万美元起，比周边独栋社区更容易进入。HOA 月费按户型和区域差异较大，约 660–1,507 美元——具体以你看中的单元为准。",
        titleEn: "Condo-level entry, more accessible",
        bodyEn: "About 386 condos and townhomes across three sections; active pricing starts around $1.0M, more accessible than nearby single-family communities. HOA dues vary widely by unit and section, about $660–$1,507/month — confirmed on the specific home.",
      },
      {
        titleZh: "Hicksville 干线，通勤快",
        bodyZh: "到 Hicksville 站搭 LIRR 干线，到 Penn Station 约 40–50 分钟（高峰），通勤效率较高。",
        titleEn: "Fast Main Line commute",
        bodyEn: "The Hicksville station on the LIRR Main Line runs about 40–50 minutes to Penn at peak — an efficient commute.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Jericho，中区（Central Nassau），经 LIE（I-495）进出，约 30–40 英里到中城。最近的 LIRR 车站为 Hicksville（干线/Ronkonkoma/Port Jefferson 支线）。",
      en: "The community is in Jericho, Nassau County (Central Nassau), via the LIE (I-495), about 30–40 miles to Midtown. The nearest LIRR station is Hicksville (Main Line / Ronkonkoma / Port Jefferson Branch).",
    },
    bestFor: {
      zh: "适合想要 24 小时门禁、配套丰富的低维护公寓/联排，看重通勤快、入门门槛更友好的买家。",
      en: "Best for a buyer who wants a guard-gated, amenity-rich, low-maintenance condo or townhome with a quick commute and a friendlier entry price.",
    },
  },

  "lattingtown-ponds": {
    overview: {
      zh: "Lattingtown Ponds 是 Glen Cove 一处门禁社区，约 56 户联排与独栋住宅（3–4 卧），坐落在约 63 英亩、有三处池塘的园林环境里。它的吸引力是把门禁私密、低维护和社区配套——泳池、网球、匹克球、会所——放在一个相对亲民的价位上。",
      en: "Lattingtown Ponds is a gated community of about 56 townhomes and single-family homes (3–4 bedrooms) in Glen Cove, set on roughly 63 landscaped acres with three ponds. Its draw is gated privacy and low-maintenance living with real amenities — pool, tennis, pickleball, clubhouse — at a relatively attainable price.",
    },
    highlights: [
      {
        titleZh: "门禁社区，私密省心",
        bodyZh: "社区设门禁出入，HOA 统一维护庭院与公共区域，日常更省心。",
        titleEn: "Gated, private, low-maintenance",
        bodyEn: "Gated access with HOA-maintained grounds and common areas — less day-to-day upkeep.",
      },
      {
        titleZh: "园林环境 + 全套配套",
        bodyZh: "约 63 英亩园林、三处池塘，配会所、社区泳池、两片网球场和匹克球场。",
        titleEn: "Landscaped grounds + full amenities",
        bodyEn: "About 63 landscaped acres with three ponds, plus a clubhouse, a community pool, two tennis courts, and pickleball.",
      },
      {
        titleZh: "价位更亲民",
        bodyZh: "近期成交大致在 79 万至 140 万美元区间；HOA 月费按户型不同约 800–1,165 美元，具体以你看中的那套为准。",
        titleEn: "A more attainable price",
        bodyEn: "Recent sales run roughly $790K–$1.4M; HOA dues vary by home, about $800–$1,165/month — confirmed on the specific unit.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Glen Cove 市，长岛北岸，约 25–30 英里到曼哈顿中城。最近的 LIRR 车站为 Glen Cove（Oyster Bay 支线）。",
      en: "The community is in the City of Glen Cove, Nassau County, on the North Shore, about 25–30 miles to Midtown. The nearest LIRR station is Glen Cove on the Oyster Bay Branch.",
    },
    bestFor: {
      zh: "适合想要门禁、低维护的联排或独栋住宅，看重社区配套、价位相对友好的家庭买家。",
      en: "Best for a buyer who wants a gated, low-maintenance townhome or single-family home with real amenities at a friendlier price.",
    },
  },

  "summit-high-point-north-hills": {
    overview: {
      zh: "The Summit at High Point 是 Roslyn Heights 一处 24 小时人工岗哨的门禁公寓社区，约 170 套住宅，由前 Renaissance 乡村俱乐部改建而成，会所就是历史悠久的 John F. Ryan 庄园大宅。它把人工门岗、度假村式配套和联排式公寓相对亲民的价位结合在一起。",
      en: "The Summit at High Point is a 24-hour guard-gated condominium community of about 170 homes in Roslyn Heights, converted from the former Renaissance Country Club, with the historic John F. Ryan mansion as its clubhouse. It pairs a manned gate and resort-style amenities with the more attainable pricing of townhouse-style condos.",
    },
    highlights: [
      {
        titleZh: "24 小时人工门岗",
        bodyZh: "入口 24 小时人工值守，三个区域共用同一门禁，私密、安全。",
        titleEn: "24-hour guard gate",
        bodyEn: "A staffed 24-hour gate serves all three sections — private and secure.",
      },
      {
        titleZh: "Ryan 庄园会所 + 度假村配套",
        bodyZh: "会所设于历史悠久的 John F. Ryan 庄园大宅；配套含室内泳池、带凉亭包间的室外泳池、网球与匹克球场、健身/健康会所、儿童游乐场和篮球场。",
        titleEn: "Ryan mansion clubhouse + resort amenities",
        bodyEn: "The clubhouse is the historic John F. Ryan mansion; amenities include an indoor pool, an outdoor pool with cabanas, tennis and pickleball, a fitness/health club, a playground, and a basketball court.",
      },
      {
        titleZh: "联排式公寓，门槛更友好",
        bodyZh: "约 170 套联排式公寓，提供六种户型，另有 The Gables 公寓单元和 Ryan 大宅内的住宅；近期挂牌约 133 万至 160 万美元。",
        titleEn: "Townhouse-style condos, a friendlier entry",
        bodyEn: "About 170 townhouse-style condos in six layouts, plus apartments in The Gables and residences within the Ryan mansion; recent listings run about $1.33M–$1.6M.",
      },
      {
        titleZh: "成熟地段与年代",
        bodyZh: "社区位于 North Hills 一带、LIE 37 出口旁，1985 年由乡村俱乐部改建、1988 年建成，地段成熟、好辨识。",
        titleEn: "Established setting and era",
        bodyEn: "Set in the North Hills area off LIE Exit 37, converted from the country club in 1985 and completed in 1988 — an established, recognizable address.",
      },
    ],
    location: {
      zh: "社区位于纳苏县 Roslyn Heights（North Hills 一带），长岛北岸，就在 LIE（I-495）37 出口 / Willis Avenue 旁。",
      en: "The community is in Roslyn Heights (the North Hills area), Nassau County, on the North Shore, right off the LIE (I-495) Exit 37 / Willis Avenue.",
    },
    bestFor: {
      zh: "适合想要 24 小时人工门岗、度假村式配套，又偏好联排式公寓相对友好价位的买家。",
      en: "Best for a buyer who wants a 24-hour guard gate and resort amenities at the friendlier price of a townhouse-style condo.",
    },
  },
};

export function getCommunityContent(slug: string): CommunityContent | undefined {
  return gatedCommunityContent[slug];
}
