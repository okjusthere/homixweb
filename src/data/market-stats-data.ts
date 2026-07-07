import type { MarketArea } from "./market-stats";
import type { Bilingual } from "@/content/journal/posts";

/**
 * Living market-data source rows for /market-data/[slug].
 *
 * HARD RULE (see ./market-stats.ts): every number below is transcribed verbatim
 * from a cited guide article in src/content/journal/posts.ts — never estimated.
 * Each StatTable names its primary source and as-of period exactly as the post
 * states them. When the posts are refreshed, update these rows + asOf + updated
 * and keep the page URLs stable.
 *
 * Sourcing map (post slug -> area):
 * - manhattan   ← manhattan-residential-market-data-2026, manhattan-rentals-2026
 * - flushing    ← queens-residential-market-data-2026 (the flushing-queens-market-report
 *                 post is explicitly illustrative — "Figures are illustrative" — so no
 *                 numbers are drawn from it)
 * - long-island ← nassau-north-shore-long-island-market-data-2026,
 *                 long-island-south-shore-suffolk-2026
 * - brooklyn    ← brooklyn-market-data-2026
 */

export const marketAreas: MarketArea[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // MANHATTAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "manhattan",
    name: { zh: "曼哈顿", en: "Manhattan" },
    title: {
      zh: "曼哈顿房价与市场数据（持续更新）",
      en: "Manhattan Housing Market Data (Continuously Updated)",
    },
    description: {
      zh: "曼哈顿住宅与租赁市场的有据数据：全区中位成交价、公寓与合作公寓的价差、各街区中位价与每平方英尺单价，以及创纪录的中位租金和空置率——数字逐项标注来源与时点。",
      en: "Sourced sales and rental data for Manhattan: borough-wide median price, the condo-vs-co-op spread, neighborhood medians and price per square foot, plus record median rent and vacancy — every figure carries its source and as-of date.",
    },
    intro: {
      zh: "曼哈顿的中位价在上涨，但标题数字掩盖了一个分裂的市场——公寓（condo）和豪宅在推高价格，合作公寓（co-op）的中间层则持平或偏软。下表汇总的是有据可查的数据：**全区中位成交价、公寓与合作公寓的价差、逐街区的中位价与每平方英尺单价**，以及春季再创新高的**中位租金与空置率**。\n\n请把这些数字当作方向性参考：街区层面的月度样本量很小，单月中位价波动较大。想看完整的逐街区解读，见[《曼哈顿住宅市场数据 2026》](/guides/articles/manhattan-residential-market-data-2026)与[《曼哈顿租赁市场 2026》](/guides/articles/manhattan-rentals-2026)；要针对具体楼盘或街区做可比成交分析，也可查看在建的[新开发项目](/NewDevelopment)。所有数字均标注来源与时点，请以最新报告为准。",
      en: "Manhattan's median is up, but the headline hides a split market — condos and luxury are pulling prices higher while the co-op middle sits flat to soft. The tables below gather the sourced figures: the **borough-wide median, the condo-vs-co-op spread, and neighborhood-by-neighborhood medians and price per square foot**, plus the **record median rent and vacancy** set this spring.\n\nTreat these as directional: neighborhood monthly samples are small and single-month medians swing. For the full read, see [Manhattan Residential Market Data 2026](/guides/articles/manhattan-residential-market-data-2026) and [Manhattan Rentals in 2026](/guides/articles/manhattan-rentals-2026); to weigh new inventory, browse current [new developments](/NewDevelopment). Every number carries its source and as-of date — rely on the latest report.",
    },
    updated: "2026-07-07",
    tables: [
      {
        title: {
          zh: "曼哈顿整体：中位价、库存与去化",
          en: "Manhattan Overall: Median, Inventory & Absorption",
        },
        columns: [
          { zh: "指标", en: "Metric" },
          { zh: "数值", en: "Figure" },
        ],
        rows: [
          {
            label: {
              zh: "全区中位成交价（Q1 2026）",
              en: "Borough median sale price (Q1 2026)",
            },
            values: ["$1,225,000 (+5.2% YoY)"],
          },
          {
            label: {
              zh: "月度中位价（2026 年 3 月，Redfin 口径）",
              en: "Monthly median (March 2026, Redfin)",
            },
            values: ["~$1.1M (+~8% YoY)"],
          },
          {
            label: {
              zh: "公寓 Condo 中位价（Q1 2026）",
              en: "Condo median (Q1 2026)",
            },
            values: ["~$1.75M"],
          },
          {
            label: {
              zh: "合作公寓 Co-op 中位价（Q1 2026）",
              en: "Co-op median (Q1 2026)",
            },
            values: ["$850K"],
          },
          {
            label: {
              zh: "在售库存（Q1 2026）",
              en: "Active inventory (Q1 2026)",
            },
            values: ["~6,000 units (five-year Q1 low)"],
          },
          {
            label: {
              zh: "在售天数 DOM（Q1 2026）",
              en: "Days on market (Q1 2026)",
            },
            values: ["~110 (fastest Q1 since 2018)"],
          },
        ],
        source:
          "Douglas Elliman / Miller Samuel, Q1 2026; Redfin, March 2026 (via Homix Guides)",
        asOf: "2026 Q1 / 2026 年 3 月",
      },
      {
        title: {
          zh: "各街区中位价、单价与走势",
          en: "Neighborhood Median, PPSF & Trend",
        },
        columns: [
          { zh: "街区", en: "Sub-neighborhood" },
          { zh: "中位成交价", en: "Median sale price" },
          { zh: "每平方英尺单价", en: "Price / sq ft" },
          { zh: "同比走势", en: "YoY trend" },
          { zh: "在售天数", en: "Days on market" },
        ],
        rows: [
          {
            label: { zh: "上西区 UWS", en: "Upper West Side" },
            values: ["~$1.6M", "~$1,677", "+12%", "~65"],
          },
          {
            label: { zh: "上东区 UES", en: "Upper East Side" },
            values: ["~$1.4M", "n/a", "+6.7%", "n/a"],
          },
          {
            label: { zh: "中城 Midtown", en: "Midtown" },
            values: ["~$1.1M", "~$1,510", "−7.9%", "n/a"],
          },
          {
            label: { zh: "下城 Downtown", en: "Downtown Manhattan" },
            values: ["~$1.6M", "~$1,650", "≈ flat", "~66"],
          },
          {
            label: { zh: "金融区 FiDi", en: "FiDi" },
            values: ["~$1.2M", "~$1,164", "+25% (volatile)", "n/a"],
          },
          {
            label: { zh: "翠贝卡 Tribeca", en: "Tribeca" },
            values: ["~$3.8M", "~$1,680", "+30% (volatile)", "~99"],
          },
          {
            label: { zh: "苏豪区 SoHo", en: "SoHo" },
            values: ["~$3.2M", "~$1,900", "−17% (volatile)", "~106"],
          },
          {
            label: { zh: "哈莱姆 Harlem", en: "Harlem" },
            values: ["~$655K", "~$834", "−14%", "n/a"],
          },
        ],
        source:
          "Redfin (Mar–Apr 2026); StreetEasy Q1 2026 (via Homix Guides). Neighborhood samples are small — read as directional.",
        asOf: "2026 年 3–4 月 / Mar–Apr 2026",
      },
      {
        title: {
          zh: "曼哈顿租赁市场",
          en: "Manhattan Rental Market",
        },
        columns: [
          { zh: "指标", en: "Metric" },
          { zh: "数值", en: "Figure" },
          { zh: "时点", en: "As of" },
        ],
        rows: [
          {
            label: {
              zh: "中位租金（成交租约）",
              en: "Median rent (signed leases)",
            },
            values: ["$5,099", "Apr 2026"],
          },
          {
            label: { zh: "同比变化", en: "Year-over-year change" },
            values: ["~ +6%", "Apr 2026"],
          },
          {
            label: { zh: "空置率", en: "Vacancy rate" },
            values: ["1.55%", "Apr 2026"],
          },
          {
            label: { zh: "中位挂牌租金", en: "Median asking rent" },
            values: ["~$4,700+", "Feb 2026"],
          },
          {
            label: {
              zh: "在租房源（同比）",
              en: "Active listings vs. year ago",
            },
            values: ["~ −25%", "early 2026"],
          },
          {
            label: {
              zh: "30 年固定房贷利率",
              en: "30-year fixed mortgage rate",
            },
            values: ["6.49%", "Jun 25, 2026"],
          },
        ],
        source:
          "Douglas Elliman / Miller Samuel; StreetEasy; Freddie Mac PMMS (via Homix Guides)",
        asOf: "2026 年 4 月 / April 2026",
      },
    ],
    faq: [
      {
        question: {
          zh: "2026 年曼哈顿的中位房价是多少？",
          en: "What is Manhattan's median home price in 2026?",
        },
        answer: {
          zh: "根据 Douglas Elliman / Miller Samuel 数据，曼哈顿全区中位成交价在 2026 年第一季度为 122.5 万美元，同比上涨 5.2%。Redfin 的 2026 年 3 月月度口径则约为 110 万美元，同比上涨约 8%——两者统计方法不同，但方向一致。",
          en: "Per Douglas Elliman / Miller Samuel, Manhattan's borough-wide median was $1,225,000 in Q1 2026, up 5.2% year over year. Redfin's March 2026 monthly read put it near $1.1M, up about 8% — different methods, same upward direction.",
        },
      },
      {
        question: {
          zh: "公寓（condo）和合作公寓（co-op）价差有多大？",
          en: "How wide is the condo-vs-co-op price gap?",
        },
        answer: {
          zh: "在 2026 年第一季度，公寓中位价接近 175 万美元，而合作公寓中位价为 85 万美元（Douglas Elliman / Miller Samuel，Q1 2026）——是近年来最宽的价差之一。",
          en: "In Q1 2026 the condo median sat near $1.75M against a co-op median of $850K (Douglas Elliman / Miller Samuel, Q1 2026) — one of the widest spreads in recent memory.",
        },
      },
      {
        question: {
          zh: "曼哈顿哪个街区的房价在涨、哪个在跌？",
          en: "Which Manhattan neighborhoods are rising or falling?",
        },
        answer: {
          zh: "截至 2026 年 3–4 月（Redfin 口径）：上西区中位价约 160 万美元、同比 +12%，上东区约 140 万美元、+6.7%；中城约 110 万美元、同比 −7.9%，哈莱姆约 65.5 万美元、−14%。街区月度样本量小，请视为方向性参考。",
          en: "As of March–April 2026 (Redfin): the Upper West Side was near $1.6M (+12%) and the Upper East Side near $1.4M (+6.7%); Midtown was near $1.1M (−7.9%) and Harlem near $655K (−14%). Neighborhood monthly samples are small — read these as directional.",
        },
      },
      {
        question: {
          zh: "曼哈顿现在的租金和空置率是多少？",
          en: "What are Manhattan rents and vacancy right now?",
        },
        answer: {
          zh: "2026 年 4 月，曼哈顿中位租金（成交租约）创下 5,099 美元的历史新高，同比上涨约 6%，空置率降至 1.55%——六年多来最低；在租房源同比减少约 25%（Douglas Elliman / Miller Samuel；StreetEasy）。",
          en: "In April 2026, Manhattan's median signed-lease rent hit a record $5,099, up about 6% year over year, with vacancy at 1.55% — the lowest in more than six years — and active listings down roughly 25% (Douglas Elliman / Miller Samuel; StreetEasy).",
        },
      },
    ],
    reportSlugs: [
      "manhattan-residential-market-data-2026",
      "manhattan-rentals-2026",
    ],
    relatedLinks: [
      {
        label: { zh: "曼哈顿新开发项目", en: "Manhattan new developments" },
        href: "/NewDevelopment",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FLUSHING
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "flushing",
    name: { zh: "法拉盛", en: "Flushing" },
    title: {
      zh: "法拉盛房价与市场数据（持续更新）",
      en: "Flushing Housing Market Data (Continuously Updated)",
    },
    description: {
      zh: "法拉盛与皇后区的有据市场数据：全区创纪录的季度中位价、合作公寓/公寓/独立屋的分层价格、库存激增，以及法拉盛、长岛市、森林小丘、贝赛、杰克逊高地的逐街区中位价与每平方英尺单价。",
      en: "Sourced Flushing and Queens data: the record borough quarterly median, co-op/condo/house price tiers, the inventory surge, and neighborhood-by-neighborhood medians and price per square foot for Flushing, Long Island City, Forest Hills, Bayside, and Jackson Heights.",
    },
    intro: {
      zh: "皇后区刚刚录得有记录以来最高的季度成交中位价，但全区数字掩盖了至少三个市场——合作公寓、公寓与独立屋走势各异，到街区层面差异更大。下表汇总有据数据：**全区及分层中位价、库存变化，以及法拉盛、长岛市、森林小丘、贝赛、杰克逊高地的逐街区中位价、每平方英尺单价与在市天数**。\n\n法拉盛本身的关键词不是价格，而是**库存激增**——这带来了多年来最强的议价空间。街区月度样本量小、波动大，请把单一街区数字视为方向性参考。完整解读见[《皇后区住宅市场数据 2026》](/guides/articles/queens-residential-market-data-2026)，社区介绍见[法拉盛](/neighborhoods/flushing)。所有数字均标注来源与时点。",
      en: "Queens just posted its highest quarterly median sale price on record, but the borough number averages over at least three markets — co-ops, condos, and houses move differently, and the spread is wider still at the neighborhood level. The tables below gather the sourced figures: the **borough and by-type medians, inventory shifts, and neighborhood-by-neighborhood median, price per square foot, and days on market** for Flushing, Long Island City, Forest Hills, Bayside, and Jackson Heights.\n\nFor Flushing itself the story isn't price — it's the **inventory surge**, which has handed buyers their most negotiating leverage in years. Neighborhood samples are small and volatile, so read single-neighborhood figures as directional. For the full read see [Queens Residential Market Data 2026](/guides/articles/queens-residential-market-data-2026), and for the community see [Flushing](/neighborhoods/flushing). Every number carries its source and as-of date.",
    },
    updated: "2026-07-07",
    tables: [
      {
        title: {
          zh: "皇后区整体：中位价、分层与库存",
          en: "Queens Overall: Median, Type Tiers & Inventory",
        },
        columns: [
          { zh: "指标", en: "Metric" },
          { zh: "数值", en: "Figure" },
        ],
        rows: [
          {
            label: {
              zh: "全区中位成交价（Q4 2025）",
              en: "Borough median sale price (Q4 2025)",
            },
            values: ["$739,053 (+5.6% YoY — record high)"],
          },
          {
            label: {
              zh: "合作公寓 Co-op 中位价（Q4 2025）",
              en: "Co-op median (Q4 2025)",
            },
            values: ["$339,750 (+6.5% YoY)"],
          },
          {
            label: {
              zh: "公寓 Condo 中位价（Q4 2025）",
              en: "Condo median (Q4 2025)",
            },
            values: ["$680,000 (−0.5% YoY)"],
          },
          {
            label: {
              zh: "一至三户住宅中位价（Q4 2025）",
              en: "1–3 family home median (Q4 2025)",
            },
            values: ["$910,000 (+4.6% YoY)"],
          },
          {
            label: {
              zh: "皇后区在售库存（2025 全年）",
              en: "Queens for-sale supply (2025)",
            },
            values: ["+17.7% (largest jump of any borough)"],
          },
          {
            label: {
              zh: "法拉盛库存（2025 全年）",
              en: "Flushing inventory (2025)",
            },
            values: ["+48.4%"],
          },
          {
            label: {
              zh: "长岛市库存（2025 全年）",
              en: "Long Island City inventory (2025)",
            },
            values: ["+36.4%"],
          },
        ],
        source:
          "Douglas Elliman / Miller Samuel, Q4 2025 (via QNS); StreetEasy 2025 Year in Review (via Homix Guides)",
        asOf: "2025 Q4 / 2025 全年",
      },
      {
        title: {
          zh: "各街区中位价、单价与走势",
          en: "Neighborhood Median, PPSF & Trend",
        },
        columns: [
          { zh: "街区", en: "Neighborhood" },
          { zh: "中位成交价", en: "Median sale price" },
          { zh: "每平方英尺单价", en: "Price / sq ft" },
          { zh: "同比走势", en: "YoY trend" },
          { zh: "在市天数", en: "Days on market" },
        ],
        rows: [
          {
            label: { zh: "法拉盛 Flushing", en: "Flushing" },
            values: ["~$687K", "~$750", "≈ flat (−0.8%)", "~58"],
          },
          {
            label: { zh: "长岛市 LIC", en: "Long Island City" },
            values: ["~$1.03M", "~$959", "~ +19%", "~60–70"],
          },
          {
            label: { zh: "森林小丘 Forest Hills", en: "Forest Hills" },
            values: [
              "~$430–445K",
              "~$475–485 (zip 11375 ~$640)",
              "down (low single digits)",
              "~50–60",
            ],
          },
          {
            label: { zh: "贝赛 Bayside", en: "Bayside" },
            values: [
              "~$860K nbhd / ~$1.1M (zip 11361)",
              "~$677 (11361)",
              "up sharply but volatile",
              "~45–60",
            ],
          },
          {
            label: {
              zh: "杰克逊高地 Jackson Heights",
              en: "Jackson Heights",
            },
            values: ["~$430K", "~$516", "−7%", "~95 (up from 71)"],
          },
        ],
        source:
          "Redfin (Oct–Nov 2025); StreetEasy 2025 asking median for LIC ~$1.24M (via Homix Guides). Single-neighborhood figures are directional.",
        asOf: "2025 年 10–11 月 / Oct–Nov 2025",
      },
    ],
    faq: [
      {
        question: {
          zh: "2026 年法拉盛的房价走势如何？",
          en: "How are Flushing home prices trending in 2026?",
        },
        answer: {
          zh: "根据 Redfin 2025 年 11 月数据，法拉盛成交中位价约 68.7 万美元，同比基本持平（约 −0.8%），每平方英尺约 750 美元，成交周期约 58 天。这里的关键不是价格，而是 2025 年高达 48.4% 的库存激增（StreetEasy）——这是多年来最强的议价空间。",
          en: "Per Redfin (November 2025), Flushing's median sale price was roughly $687K, essentially flat year over year (about −0.8%), at about $750 per square foot with homes selling in around 58 days. The story here isn't price — it's the 48.4% inventory surge in 2025 (StreetEasy), the most negotiating leverage in years.",
        },
      },
      {
        question: {
          zh: "皇后区的中位价为什么创了纪录？",
          en: "Why did Queens set a record median?",
        },
        answer: {
          zh: "根据 Douglas Elliman / Miller Samuel 第四季度报告，皇后区全区成交中位价在 2025 年第四季度达到 739,053 美元，同比上涨 5.6%——这是 Elliman 为皇后区记录到的有史以来最高季度中位价。但这个数字平均掉了三个市场：合作公寓约 33.98 万美元、公寓约 68 万美元、一至三户住宅约 91 万美元（Elliman，Q4 2025）。",
          en: "Per the Douglas Elliman / Miller Samuel fourth-quarter report, the borough's median reached $739,053 in Q4 2025, up 5.6% year over year — the highest quarterly median Elliman has ever recorded for Queens. That headline averages three markets, though: co-ops near $339,750, condos near $680,000, and 1–3 family homes near $910,000 (Elliman, Q4 2025).",
        },
      },
      {
        question: {
          zh: "皇后区哪个街区最贵、哪个最便宜？",
          en: "Which Queens neighborhood is priciest and most affordable?",
        },
        answer: {
          zh: "截至 2025 年下半年（Redfin 口径），长岛市是全区价格高地，成交中位价约 103 万美元、同比约 +19%、每平方英尺约 959 美元；森林小丘与杰克逊高地则约 43 万美元，是相对入门的选择。街区月度数据波动较大，请视为方向性参考。",
          en: "As of late 2025 (Redfin), Long Island City is the priciest pocket, with a median near $1.03M (about +19% YoY) at roughly $959 per square foot; Forest Hills and Jackson Heights sit near $430K, the more entry-level options. Neighborhood monthly data is volatile — read as directional.",
        },
      },
      {
        question: {
          zh: "杰克逊高地现在是买方还是卖方市场？",
          en: "Is Jackson Heights a buyer's or seller's market now?",
        },
        answer: {
          zh: "杰克逊高地最清晰地呈现了买方市场信号：Redfin 2025 年 10 月数据显示成交中位价约 43 万美元、同比下跌 7%，而房屋平均在市约 95 天，高于一年前的 71 天。卖家应预期需要谈判，买家有时间从容观望。",
          en: "Jackson Heights shows the clearest buyer's-market signal: per Redfin (October 2025), the median was around $430K, down 7% year over year, with homes sitting about 95 days on market, up from 71 a year earlier. Sellers should expect to negotiate; buyers have time to be patient.",
        },
      },
    ],
    reportSlugs: [
      "flushing-queens-market-report",
      "queens-residential-market-data-2026",
    ],
    relatedLinks: [
      {
        label: { zh: "法拉盛社区介绍", en: "Flushing neighborhood guide" },
        href: "/neighborhoods/flushing",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LONG ISLAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "long-island",
    name: { zh: "长岛", en: "Long Island" },
    title: {
      zh: "长岛房价与市场数据（持续更新）",
      en: "Long Island Housing Market Data (Continuously Updated)",
    },
    description: {
      zh: "长岛拿骚北岸与南岸/Suffolk 的有据数据：全岛与全县中位价、创纪录的平均成交价与豪宅门槛、库存收紧，以及大颈、曼哈塞特、赛奥赛特、杰里科、罗斯林等社区的中位价与每平方英尺单价。",
      en: "Sourced Long Island data across the Nassau North Shore and the South Shore / Suffolk: island- and county-wide medians, record average price and luxury-tier entry, tightening inventory, and community-level medians and price per square foot for Great Neck, Manhasset, Syosset, Jericho, Roslyn, and more.",
    },
    intro: {
      zh: "长岛是纽约都会区供应最紧张的角落之一：库存收紧、价格坚挺、需求耐心而持续。下表汇总有据数据：**全岛及全县中位价、创纪录的平均成交价与豪宅门槛，以及拿骚北岸五个社区的中位价、每平方英尺单价、在售天数与学区排名**。\n\n请注意方法：大颈与罗斯林的\"门户网站中位价\"被村中心的公寓大幅拉低，独栋房屋实际成交更高——每平方英尺单价是更稳定的跨社区比较指标，小市场单月数据波动较大。完整解读见[《拿骚北岸数据 2026》](/guides/articles/nassau-north-shore-long-island-market-data-2026)与[《长岛南岸与 Suffolk 2026》](/guides/articles/long-island-south-shore-suffolk-2026)。社区介绍见[封闭式社区](/communities)与[大颈](/neighborhoods/great-neck)。所有数字均标注来源与时点。",
      en: "Long Island is one of the New York metro's most supply-constrained corners: tight inventory, firm prices, and patient, persistent demand. The tables below gather the sourced figures: **island- and county-wide medians, the record average price and luxury-tier entry, and community-level median, price per square foot, days on market, and school rankings** across the Nassau North Shore.\n\nA note on method: portal \"median sale price\" for Great Neck and Roslyn is pulled down by village-center condos, so detached houses trade higher — price per square foot is the more stable cross-community comparison, and single-month figures in small markets are volatile. For the full read see [Nassau North Shore Data 2026](/guides/articles/nassau-north-shore-long-island-market-data-2026) and [South Shore & Suffolk 2026](/guides/articles/long-island-south-shore-suffolk-2026). For communities see [gated communities](/communities) and [Great Neck](/neighborhoods/great-neck). Every number carries its source and as-of date.",
    },
    updated: "2026-07-07",
    tables: [
      {
        title: {
          zh: "长岛整体与全县：中位价、均价与库存",
          en: "Long Island & Counties: Median, Average & Inventory",
        },
        columns: [
          { zh: "指标", en: "Metric" },
          { zh: "数值", en: "Figure" },
          { zh: "来源 / 截至", en: "Source / as-of" },
        ],
        rows: [
          {
            label: {
              zh: "长岛房价中位数",
              en: "Long Island median sale price",
            },
            values: [
              "$738,444 (+4.7% YoY)",
              "Elliman / Miller Samuel, Q1 2026",
            ],
          },
          {
            label: {
              zh: "长岛平均成交价",
              en: "Long Island average sale price",
            },
            values: ["$905,032 (record high)", "Elliman / Miller Samuel, Q1 2026"],
          },
          {
            label: {
              zh: "豪宅区间门槛（前 10%）",
              en: "Luxury tier entry (top 10%)",
            },
            values: ["$1,430,000", "Elliman / Miller Samuel, Q1 2026"],
          },
          {
            label: { zh: "Nassau 县中位数", en: "Nassau County median" },
            values: ["$805,000 (+5.9%)", "OneKey MLS, full-year 2025"],
          },
          {
            label: {
              zh: "拿骚县中位价（月度）",
              en: "Nassau median (monthly)",
            },
            values: ["$835,000 (+3.1% YoY)", "OneKey MLS, Jan 2026"],
          },
          {
            label: {
              zh: "拿骚县在售库存",
              en: "Nassau active inventory",
            },
            values: ["~1,497 homes (−16.8%)", "OneKey MLS, Jan 2026"],
          },
          {
            label: {
              zh: "区域整体中位数（11 县）",
              en: "Service-area median (11-county)",
            },
            values: ["$680,000 (+5.4% YoY)", "OneKey MLS, April 2026"],
          },
          {
            label: {
              zh: "区域成交量（同比）",
              en: "Service-area closed sales (YoY)",
            },
            values: ["−8.7%", "OneKey MLS, April 2026"],
          },
        ],
        source:
          "Elliman / Miller Samuel, Q1 2026; OneKey MLS, full-year 2025 / Jan 2026 / April 2026 (via Homix Guides)",
        asOf: "2026 Q1 / 2026 年 1–4 月",
      },
      {
        title: {
          zh: "拿骚北岸社区：中位价、单价与学区",
          en: "Nassau North Shore Communities: Median, PPSF & Schools",
        },
        columns: [
          { zh: "社区", en: "Community" },
          { zh: "销售中位价", en: "Median sale price" },
          { zh: "每平方英尺单价", en: "$ / sq ft" },
          { zh: "同比走势", en: "YoY trend" },
          { zh: "在售天数", en: "Days on market" },
        ],
        rows: [
          {
            label: {
              zh: "大颈 Great Neck（村，含各类型）",
              en: "Great Neck (village, all types)",
            },
            values: ["~$926K–$1.13M", "~$572", "up; noisy", "~30–40"],
          },
          {
            label: { zh: "曼哈塞特 Manhasset", en: "Manhasset" },
            values: ["~$1.6M", "~$737–$888", "mixed (−25% on thin volume)", "~32"],
          },
          {
            label: { zh: "赛奥赛特 Syosset", en: "Syosset" },
            values: ["~$1.0M–$1.3M", "~$534", "up ~5–9%", "~28"],
          },
          {
            label: { zh: "杰里科 Jericho", en: "Jericho" },
            values: ["~$1.1M–$1.4M", "~$537", "up ~2–4%", "~40–66"],
          },
          {
            label: {
              zh: "罗斯林 / 东希尔斯 Roslyn / East Hills",
              en: "Roslyn / East Hills",
            },
            values: [
              "~$1.3M (Roslyn Hts) – ~$1.8M (East Hills)",
              "~$484",
              "Roslyn Hts +~7%",
              "~48",
            ],
          },
        ],
        source:
          "Redfin / Zillow / Movoto (Nov 2025–Jun 2026); Niche 2025 school rankings — Jericho #1 in NY, Syosset #4 (via Homix Guides). Small-sample figures are directional.",
        asOf: "2025 年 11 月–2026 年 6 月 / Nov 2025–Jun 2026",
      },
    ],
    faq: [
      {
        question: {
          zh: "2026 年长岛的房价中位数是多少？",
          en: "What is Long Island's median home price in 2026?",
        },
        answer: {
          zh: "根据 Elliman / Miller Samuel（2026 年第一季度），长岛（不含 Hamptons 与 North Fork）房价中位数为 738,444 美元，同比上涨 4.7%；平均成交价达到 905,032 美元，创历史新高。进入前 10% 豪宅区间的门槛为 1,430,000 美元。",
          en: "Per Elliman / Miller Samuel (Q1 2026), Long Island (excluding the Hamptons and North Fork) had a median sale price of $738,444, up 4.7% year over year; the average sale price reached an all-time high of $905,032. The entry into the top-10% luxury tier began at $1,430,000.",
        },
      },
      {
        question: {
          zh: "拿骚县和 Suffolk 县的房价数据如何？",
          en: "What do Nassau and Suffolk county figures show?",
        },
        answer: {
          zh: "根据 OneKey MLS，2025 全年 Nassau 县中位数上涨 5.9% 至 805,000 美元（成交 9,799 套）；月度口径下，2026 年 1 月拿骚中位价为 835,000 美元、同比 +3.1%，在售库存约 1,497 套、同比下降约 16.8%。覆盖 11 个县的区域整体中位数在 2026 年 4 月为 680,000 美元、同比 +5.4%，但成交量同比下降 8.7%。",
          en: "Per OneKey MLS, Nassau County's full-year-2025 median rose 5.9% to $805,000 on 9,799 sales; on a monthly basis, Nassau's January 2026 median was $835,000 (+3.1% YoY) with active inventory around 1,497 homes, down about 16.8%. The broader 11-county service-area median was $680,000 in April 2026 (+5.4% YoY), though closed sales fell 8.7%.",
        },
      },
      {
        question: {
          zh: "拿骚北岸哪个社区性价比最高？学区如何？",
          en: "Which North Shore community is the best value, and the schools?",
        },
        answer: {
          zh: "赛奥赛特是相对性价比之选：中位价约 100 万–130 万美元，每平方英尺单价约 534 美元（五个社区中最低），同比上涨约 5–9%，约 28 天成交（最快）。学区方面，杰里科在纽约州排名第 1、赛奥赛特第 4（Niche，2025），两者均为 A+ 评级、数学达标率超过 85%。数据截至 2025 年底至 2026 年中。",
          en: "Syosset is the relative value play: a median around $1.0M–$1.3M at roughly $534 per square foot — the lowest of the five communities — up about 5–9% year over year and selling in about 28 days (the fastest). On schools, Jericho ranks #1 in New York State and Syosset #4 (Niche, 2025), both A+ rated with math proficiency above 85%. Figures are as of late 2025 through mid-2026.",
        },
      },
      {
        question: {
          zh: "为什么长岛市场感觉这么紧？",
          en: "Why does the Long Island market feel so tight?",
        },
        answer: {
          zh: "供给是主因。拿骚县在售库存在 2026 年 1 月降至约 1,497 套、同比下降约 16.8%（OneKey MLS），覆盖 11 个县的区域成交量在 2026 年 4 月同比下降 8.7%。价格坚挺、成交量却很薄——定价合理、拎包入住的房子走得很快，常常高于要价。",
          en: "Supply is the driver. Nassau County active inventory fell to roughly 1,497 homes in January 2026, down about 16.8% (OneKey MLS), and 11-county service-area closed sales were down 8.7% in April 2026. Prices are firm while transactions are thin — well-priced, move-in-ready houses go quickly and often above ask.",
        },
      },
    ],
    reportSlugs: [
      "nassau-north-shore-long-island-market-data-2026",
      "long-island-south-shore-suffolk-2026",
    ],
    relatedLinks: [
      {
        label: { zh: "封闭式社区", en: "Gated communities" },
        href: "/communities",
      },
      {
        label: { zh: "大颈社区介绍", en: "Great Neck neighborhood guide" },
        href: "/neighborhoods/great-neck",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BROOKLYN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "brooklyn",
    name: { zh: "布鲁克林", en: "Brooklyn" },
    title: {
      zh: "布鲁克林房价与市场数据（持续更新）",
      en: "Brooklyn Housing Market Data (Continuously Updated)",
    },
    description: {
      zh: "布鲁克林的有据市场数据：全区中位成交价与每平方英尺单价，以及威廉斯堡、公园坡、贝德福德-斯泰弗森特、DUMBO/布鲁克林高地、湾脊的逐街区中位价、单价与在市天数。",
      en: "Sourced Brooklyn data: the borough-wide median and price per square foot, plus neighborhood-by-neighborhood median, PPSF, and days on market for Williamsburg, Park Slope, Bed-Stuy, DUMBO/Brooklyn Heights, and Bay Ridge.",
    },
    intro: {
      zh: "布鲁克林全区中位成交价稳健、缓慢上行，而这个数字底下的各个市场却朝相反方向拉扯。下表汇总有据数据：**全区中位价与每平方英尺单价，以及五个核心街区的中位价、单价与在市天数**。\n\n一个直白的警告：布鲁克林街区层面的月度样本量很小，单月中位价波动剧烈——几套顶层公寓成交就能让一个数字一夜之间跳动 90%。像布鲁克林高地的 +91.8% 或 DUMBO 的 220 天在市，几乎可以肯定是小样本造成的假象、而非趋势。请把每个单一街区数字视为方向性参考。完整解读见[《布鲁克林 2026 市场数据》](/guides/articles/brooklyn-market-data-2026)，社区介绍见[本森贺](/neighborhoods/bensonhurst)与[日落公园](/neighborhoods/sunset-park)。所有数字均标注来源与时点。",
      en: "Brooklyn's borough-wide median is firm and grinding slowly higher, while the markets *underneath* that number pull in opposite directions. The tables below gather the sourced figures: the **borough median and price per square foot, plus median, PPSF, and days on market** across five core neighborhoods.\n\nA blunt warning: neighborhood-level monthly samples in Brooklyn are small and single-month medians swing violently — a couple of penthouse closings can move a number 90% overnight. Prints like Brooklyn Heights at +91.8% or DUMBO at 220 days on market are almost certainly small-sample artifacts, not trends. Read every single-neighborhood figure as directional. For the full read see [The Brooklyn Market in 2026, Block by Block](/guides/articles/brooklyn-market-data-2026); for communities see [Bensonhurst](/neighborhoods/bensonhurst) and [Sunset Park](/neighborhoods/sunset-park). Every number carries its source and as-of date.",
    },
    updated: "2026-07-07",
    tables: [
      {
        title: {
          zh: "布鲁克林整体：中位价、单价与利率背景",
          en: "Brooklyn Overall: Median, PPSF & Rate Backdrop",
        },
        columns: [
          { zh: "指标", en: "Metric" },
          { zh: "数值", en: "Figure" },
        ],
        rows: [
          {
            label: {
              zh: "全区中位成交价（近三个月）",
              en: "Borough median sale price (3-mo. window)",
            },
            values: ["~$1.05M (+~0.7% YoY)"],
          },
          {
            label: {
              zh: "全区每平方英尺单价",
              en: "Borough price per square foot",
            },
            values: ["~$750 (+~4.5%)"],
          },
          {
            label: {
              zh: "全区中位价（Elliman Q3 2025）",
              en: "Borough median (Elliman Q3 2025)",
            },
            values: ["$1.05M (+7.7% YoY)"],
          },
          {
            label: {
              zh: "30 年固定房贷利率",
              en: "30-year fixed mortgage rate",
            },
            values: ["6.49% (as of Jun 25, 2026)"],
          },
        ],
        source:
          "Redfin (3-mo., Jun 2026); Douglas Elliman / Miller Samuel (Q3 2025, Q4 2025); Freddie Mac PMMS (Jun 25, 2026) (via Homix Guides)",
        asOf: "2026 年 6 月 / June 2026",
      },
      {
        title: {
          zh: "各街区中位价、单价与走势",
          en: "Neighborhood Median, PPSF & Trend",
        },
        columns: [
          { zh: "街区", en: "Neighborhood" },
          { zh: "中位成交价", en: "Median sale price" },
          { zh: "每平方英尺单价", en: "Price / sq ft" },
          { zh: "同比走势", en: "YoY trend" },
          { zh: "在市天数", en: "Days on market" },
        ],
        rows: [
          {
            label: { zh: "威廉斯堡 Williamsburg", en: "Williamsburg" },
            values: ["~$1.3M", "~$1,520", "−21% (mo.; volatile)", "~69"],
          },
          {
            label: { zh: "公园坡 Park Slope", en: "Park Slope" },
            values: [
              "~$1.72M (asking); townhouses $2.5M+",
              "n/a",
              "≈ flat",
              "n/a",
            ],
          },
          {
            label: {
              zh: "贝德福德-斯泰弗森特 Bed-Stuy",
              en: "Bed-Stuy",
            },
            values: ["~$1.64M (asking)", "n/a", "≈ flat (−0.5%)", "n/a"],
          },
          {
            label: { zh: "DUMBO", en: "DUMBO" },
            values: ["~$2.6M", "~$1,250", "+19% (mo.; volatile)", "~220*"],
          },
          {
            label: {
              zh: "布鲁克林高地 Brooklyn Heights",
              en: "Brooklyn Heights",
            },
            values: ["~$2.7M", "~$1,510", "+91.8% (volatile)", "~57"],
          },
          {
            label: { zh: "湾脊 Bay Ridge", en: "Bay Ridge" },
            values: [
              "~$699K (asking)",
              "n/a",
              "−4.2%",
              "SF under $1M ~18–28",
            ],
          },
        ],
        source:
          "Redfin (recent month, 2026); StreetEasy (2026) (via Homix Guides). *DUMBO's 220 DOM and the +91.8% Brooklyn Heights print are small-sample artifacts — read as directional.",
        asOf: "2026 年近月 / recent month, 2026",
      },
    ],
    faq: [
      {
        question: {
          zh: "2026 年布鲁克林的中位房价是多少？",
          en: "What is Brooklyn's median home price in 2026?",
        },
        answer: {
          zh: "根据 Redfin（截至 2026 年 6 月），布鲁克林全区成交中位价在最近三个月窗口内接近 105 万美元，同比上涨约 0.7%，每平方英尺单价约 750 美元、上涨约 4.5%。Douglas Elliman / Miller Samuel 在 2025 年第三季度录得全区中位价 105 万美元、同比上涨 7.7%。",
          en: "Per Redfin (as of June 2026), Brooklyn's borough-wide median sale price sits near $1.05M over the most recent three-month window, up about 0.7% year over year, with price per square foot around $750, up roughly 4.5%. Douglas Elliman / Miller Samuel clocked a Q3 2025 borough median of $1.05M, up 7.7%.",
        },
      },
      {
        question: {
          zh: "布鲁克林哪个街区最贵？",
          en: "Which Brooklyn neighborhood is most expensive?",
        },
        answer: {
          zh: "滨水的 DUMBO 与布鲁克林高地是标杆区，均处于 200 万美元以上、每平方英尺约 1,250–1,510 美元区间（Redfin，2026 年近月）。但要注意：布鲁克林高地报告的同比 +91.8% 与 DUMBO 报告的 220 天在市，几乎可以肯定是小样本造成的假象，而非真实趋势。",
          en: "The waterfront DUMBO and Brooklyn Heights are the trophy submarkets, both above $2M at roughly $1,250–$1,510 per square foot (Redfin, recent month 2026). Note, though, that Brooklyn Heights' reported +91.8% YoY and DUMBO's reported 220 days on market are almost certainly small-sample artifacts, not real trends.",
        },
      },
      {
        question: {
          zh: "布鲁克林哪里最实惠、成交最快？",
          en: "Where in Brooklyn is most affordable and fastest-moving?",
        },
        answer: {
          zh: "湾脊是南布鲁克林的价值之锚：挂牌中位价约 69.9 万美元、同比下跌约 4.2%，库存上升约 7%（StreetEasy / 市场报告，2026）。最突出的是入门层的速度——百万美元以下的独立屋成交周期约为 18 到 28 天，以 2026 年任何标准看都很快。",
          en: "Bay Ridge is the southern value anchor: a median asking price around $699K, down about 4.2% year over year, with inventory up roughly 7% (StreetEasy / market reports, 2026). The standout is entry-level velocity — single-family houses priced under $1M move in roughly 18 to 28 days, fast by any 2026 standard.",
        },
      },
      {
        question: {
          zh: "为什么威廉斯堡的中位价在跌、单价却在涨？",
          en: "Why is Williamsburg's median down while PPSF is up?",
        },
        answer: {
          zh: "Redfin 近月口径显示威廉斯堡成交中位价接近 130 万美元、同比下跌约 21%，而每平方英尺单价约 1,520 美元、上涨约 3%，成交周期约 69 天。中位价跌、单价涨这种组合通常意味着成交结构变化——更多定价合理的小户型公寓成交——而非价值真的崩跌 21%。",
          en: "Redfin's recent-month read put Williamsburg's median near $1.3M, down about 21% year over year, while price per square foot was around $1,520, up roughly 3%, with homes selling in about 69 days. A falling median alongside a rising per-foot number almost always signals a mix shift — more smaller, well-priced condos trading — rather than a true 21% collapse in value.",
        },
      },
    ],
    reportSlugs: ["brooklyn-market-data-2026"],
    relatedLinks: [
      {
        label: { zh: "本森贺社区介绍", en: "Bensonhurst neighborhood guide" },
        href: "/neighborhoods/bensonhurst",
      },
      {
        label: { zh: "日落公园社区介绍", en: "Sunset Park neighborhood guide" },
        href: "/neighborhoods/sunset-park",
      },
    ],
  },
];

export function getMarketArea(slug: string): MarketArea | undefined {
  return marketAreas.find((area) => area.slug === slug);
}

/** Convenience accessor for an area's bilingual display name. */
export function getMarketAreaName(slug: string): Bilingual | undefined {
  return getMarketArea(slug)?.name;
}
