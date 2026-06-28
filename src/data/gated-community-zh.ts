/**
 * Chinese localization for the gated-community FACTS panel (amenity chips,
 * home-type line, and commute values). The narrative copy is already bilingual
 * in `gated-community-content.ts`; this file translates the structured facts so
 * the 中文 page reads fully in Chinese. Proper nouns (town, LIRR station, branch)
 * intentionally stay in English. Anything missing falls back to English.
 */
import type { Locale } from "@/lib/i18n";

/** English amenity string → Chinese. Keyed by the exact strings in the data. */
export const amenityZh: Record<string, string> = {
  "24-hour gated security": "24 小时门禁安保",
  "24-hour gated security / guard gate": "24 小时门禁 / 人工岗哨",
  "24-hour guard-gated entry": "24 小时人工岗哨入口",
  "24-hour manned gatehouse / guard-gated security": "24 小时人工岗亭 / 门禁安保",
  "24-hour manned guard gatehouse": "24 小时人工岗亭",
  "24-hour manned guard gatehouse / security": "24 小时人工岗亭 / 安保",
  "24-hour manned guard-gated entrance": "24 小时人工岗哨入口",
  "24-hour security with manned guard gate / gatehouse": "24 小时安保（人工岗亭）",
  "24/7 manned/gated security with estate gated entrance and visitor announcement system":
    "24/7 人工门禁安保，庄园式大门并配访客通报系统",
  "160-acre former Phipps estate grounds": "160 英亩前 Phipps 庄园园林",
  "3-acre freshwater lake": "3 英亩私家淡水湖",
  "63 acres of landscaped grounds": "63 英亩园林景观",
  "8 tennis courts": "8 片网球场",
  "Adjacent to North Hills Country Club / golf course": "紧邻 North Hills 乡村俱乐部 / 高尔夫球场",
  "Adjacent to North Hills Country Club / golf course views": "紧邻 North Hills 乡村俱乐部，可观球场景",
  "Basketball court": "篮球场",
  "Basketball half court": "半场篮球场",
  "Card room": "牌室",
  "Children's indoor playroom": "儿童室内游戏室",
  "Children's/kiddie pool": "儿童池",
  "Clubhouse": "会所",
  "Clubhouse / ballroom": "会所 / 宴会厅",
  "Clubhouse in the historic John F. Ryan mansion": "会所（设于历史悠久的 John F. Ryan 庄园大宅）",
  "Clubhouse with banquet hall and catering kitchen": "会所（含宴会厅与餐饮厨房）",
  "Clubhouse with event deck": "会所（含活动露台）",
  "Clubhouse with renovated great room and full kitchen": "会所（翻新大活动厅与全套厨房）",
  "Coded/keypad security gate": "密码门禁",
  "Community outdoor swimming pool": "社区室外泳池",
  "Community swimming pool": "社区泳池",
  "Double-gated 24-hour manned gatehouse entrance": "双重门禁，24 小时人工岗亭入口",
  "Equestrian trail": "骑马步道",
  "Fitness center": "健身中心",
  "Fitness center / gym": "健身中心 / 健身房",
  "Fitness center / health club": "健身中心 / 健康会所",
  "Fitness center and locker rooms": "健身中心与更衣室",
  "Fitness center with men's and women's locker rooms": "健身中心（含男女更衣室）",
  "Floating boat house on the lake": "湖上浮动船屋",
  "Garbage pickup": "垃圾清运",
  "Gated community access": "门禁出入",
  "Gated entrance": "门禁入口",
  "Gated outdoor park and playground": "带门禁的户外公园与游乐场",
  "Gated, secluded private community": "封闭、隐蔽的私密社区",
  "Golf simulator": "高尔夫模拟器",
  "HOA common areas plus deed-restricted open space": "HOA 公共区域及受地役保护的开放空间",
  "HOA-maintained community": "HOA 统一维护社区",
  "HOA-maintained grounds / landscaping": "HOA 维护庭院 / 景观",
  "Heated indoor swimming pool": "室内恒温泳池",
  "Heated lifeguard-supervised outdoor swimming pool": "室外恒温泳池（有救生员）",
  "Heated outdoor pool overlooking the marina": "俯瞰码头的室外恒温泳池",
  "In-ground community pool": "社区下沉式泳池",
  "Indoor and outdoor pools": "室内外泳池",
  "Indoor heated multi-sport court": "室内恒温多功能球馆",
  "Indoor heated pool": "室内恒温泳池",
  "Indoor heated pool with hot tub": "室内恒温泳池（带按摩池）",
  "Indoor pool": "室内泳池",
  "Indoor swimming pool": "室内泳池",
  "Landscaping and snow removal": "景观养护与铲雪",
  "Landscaping, irrigation, and snow removal included": "含景观、灌溉与铲雪",
  "Lighted tennis courts": "灯光网球场",
  "Lock-and-leave low-maintenance living": "锁门即走的低维护生活",
  "Lounge": "休息区",
  "Maintenance-free living": "免维护生活",
  "Mansion Clubhouse": "庄园大宅会所",
  "Many individual homes have private in-ground pools": "不少住宅自带私人下沉式泳池",
  "Mature trees and rolling meadowland": "成材古树与起伏草甸",
  "Mobile on-site security": "现场移动安保",
  "Multi-acre build-to-suit estate lots": "多英亩可定制庄园地块",
  "Nighttime motorized security patrol": "夜间机动安保巡逻",
  "Original Russell Page-designed estate gardens": "Russell Page 设计的庄园花园",
  "Outdoor heated pool": "室外恒温泳池",
  "Outdoor heated swimming pool": "室外恒温泳池",
  "Outdoor pool with cabanas": "室外泳池（带凉亭包间）",
  "Outdoor seasonal pool with patio": "季节性室外泳池（带露台）",
  "Outdoor swimming pool": "室外泳池",
  "Owner clubhouse with water views, fireplace lounge, catering kitchen & wet bar, conference room, billiards, lending library":
    "业主会所（水景、壁炉休息区、餐饮厨房与吧台、会议室、台球室、借阅图书室）",
  "Pet-friendly": "可养宠物",
  "Pickleball court": "匹克球场",
  "Pickleball courts": "匹克球场",
  "Playground": "儿童游乐场",
  "Playground and basketball court": "儿童游乐场与篮球场",
  "Pond and nature walkways to the Sound": "池塘与通往海湾的自然步道",
  "Pool house": "池畔小屋",
  "Private clubhouse with gathering/card room": "私人会所（含聚会 / 牌室）",
  "Private gated community": "私密门禁社区",
  "Private marina with boat slips": "私人码头（带船位）",
  "Private sandy beach on Long Island Sound": "长岛海湾私家沙滩",
  "Private tennis court(s)": "私人网球场",
  "Private tennis facility": "私人网球设施",
  "Racquetball court": "壁球场",
  "Red Door by Elizabeth Arden in-home spa services": "Red Door by Elizabeth Arden 上门水疗服务",
  "Resort-style community clubhouse": "度假村式社区会所",
  "Roving night security": "夜间巡逻安保",
  "Sauna": "桑拿",
  "Sauna / steam": "桑拿 / 蒸汽房",
  "Sauna / steam / whirlpool": "桑拿 / 蒸汽 / 按摩池",
  "Set within/adjacent to preserved woodlands": "坐落于保护林地之中 / 旁",
  "Shaded patios": "遮荫露台",
  "Snow removal to the front door": "铲雪直送门口",
  "Social committee": "社区活动委员会",
  "Social lounge": "社交休息室",
  "Spa & fitness center": "水疗与健身中心",
  "Spa facilities": "水疗设施",
  "Steam room": "蒸汽房",
  "Tennis court": "网球场",
  "Tennis courts": "网球场",
  "Three full tennis courts plus one tennis/pickleball court": "三片标准网球场加一片网球 / 匹克球场",
  "Three ponds": "三处池塘",
  "Two clubhouses": "两座会所",
  "Two pool sites": "两处泳池区",
  "Two tennis courts": "两片网球场",
  "Video camera surveillance system": "视频监控系统",
  "Village green / landscaped grounds": "村庄绿地 / 园林景观",
  "Walking trail": "步道",
  "Waterfront promenade along Hempstead Harbor": "沿 Hempstead Harbor 的滨水步道",
  "Whirlpool/spa": "按摩池 / 水疗",
  "Yoga studio": "瑜伽室",
};

/** English home-type line → Chinese, keyed by the exact strings in the data. */
export const homeTypesZh: Record<string, string> = {
  "Single-family detached, 4,000+ sq ft on ~½-acre and larger lots":
    "独栋住宅，4,000 平尺以上，坐落半英亩及更大地块",
  "Detached single-family estate homes (seven floor plans, full basements)":
    "独栋庄园住宅（七种户型，带全地下室）",
  "New-construction single-family estates, up to ~4,780 sq ft":
    "全新独栋庄园，最大约 4,780 平尺",
  "Custom single-family estates on 1–2.5+ acre lots (~148 acres)":
    "定制独栋庄园，地块 1 至 2.5 英亩以上（约 148 英亩）",
  "Build-to-suit single-family estates on multi-acre lots":
    "多英亩地块上的定制独栋庄园（build-to-suit）",
  "Detached single-family homes on ~½-acre lots": "独栋住宅，约半英亩地块",
  "Attached condos — ranch and 2-story townhouse plans, full basements":
    "联排公寓——单层 ranch 与两层联排户型，带全地下室",
  "Semi-attached, townhouse-style condominium residences": "半独立、联排式公寓住宅",
  "Attached condominium townhomes, 2–3 bedrooms": "联排式公寓，2–3 卧",
  "Attached brick townhouse-style condominiums, 2–3 bedrooms": "砖砌联排式公寓，2–3 卧",
  "Attached ranch-style and 2-story townhouse residences": "联排式住宅，单层 ranch 与两层户型",
  "Townhomes, flat-over-flat condos, and some single-family homes":
    "联排、上下叠拼公寓，及少量独栋住宅",
  "Detached single-family homes, ~3,500 sq ft": "独栋住宅，约 3,500 平尺",
  "Single-family colonials in a woodland-preserve setting": "林地环境中的独栋殖民风格住宅",
  "Single-family homes, lake-view villas, and carriage-house condos":
    "独栋住宅、湖景 villa，及马车房公寓",
  "Detached single-family estates and villas, ~3,000–4,800 sq ft":
    "独栋庄园与 villa，约 3,000–4,800 平尺",
  "Condominiums and townhomes across three sections": "公寓与联排，分三个区域",
  "Townhomes and single-family homes, 3–4 bedrooms": "联排与独栋住宅，3–4 卧",
  "Townhouse-style condominiums (six layouts), plus apartments in The Gables and residences in the historic Ryan mansion":
    "联排式公寓（六种户型），另有 The Gables 公寓单元及历史 Ryan 大宅内的住宅",
};

/** Chinese commute values, keyed by community slug. Stations/branches stay EN. */
export const commuteZh: Record<string, { minutesToManhattan?: string; drive?: string }> = {
  "stone-hill-north-hills": { minutesToManhattan: "约 28–32 分钟到 Penn Station", drive: "经 LIE（I-495）36N 出口 / Shelter Rock Road" },
  "gracewood-north-hills": { minutesToManhattan: "约 28–32 分钟到 Penn Station（估算）", drive: "紧邻 LIE（I-495）/ Northern State Parkway" },
  "manhasset-crest": { minutesToManhattan: "约 28–32 分钟到 Penn Station", drive: "约 19 英里到曼哈顿中城" },
  "stone-hill-muttontown": { drive: "长岛北岸 Muttontown 自治村" },
  "spring-hill-old-westbury": { minutesToManhattan: "LIRR 约 45–55 分钟到 Penn Station", drive: "开发商宣传非高峰自驾约 22 分钟到曼哈顿" },
  "legend-yacht-beach-club": { minutesToManhattan: "约 64–78 分钟到 Penn Station（常需在 Jamaica/Mineola 换乘）", drive: "约 25 英里到曼哈顿中城，自驾约 45–75 分钟" },
  "estates-north-hills-2": { minutesToManhattan: "约 33–40 分钟（估算）", drive: "约 2.5 英里 / 9 分钟到 Manhasset 火车站" },
  "links-north-hills": { minutesToManhattan: "经 Port Washington 线到 Penn Station / Grand Central 通常约 40 分钟", drive: "社区资料称约 25 分钟进城，经 LIE 进出" },
  "acorn-ponds": { minutesToManhattan: "约 28–33 分钟到 Penn Station（一站直达；未与官方时刻表核对）", drive: "经 LIE（I-495 35 出口）/ Northern State Parkway 约 20–22 英里到中城" },
  "greens-north-hills": { minutesToManhattan: "约 28 分钟到 Penn Station", drive: "车站约 2 英里 / 7 分钟；社区位于 LIE 35 出口以北" },
  "whitewood-north-hills": { minutesToManhattan: "约 30–45 分钟到 Penn Station / Grand Central（North Hills 区域参考）", drive: "经 LIE（I-495）约 20–25 英里到中城" },
  "roslyn-landing": { minutesToManhattan: "约 48 分钟到 Penn Station", drive: "曼哈顿以东约 30 英里，自驾约 40–60 分钟到中城" },
  "fieldstone-oyster-bay": { minutesToManhattan: "约 90–100 分钟到 Penn Station，通常在 Jamaica 或 Mineola 换乘", drive: "长岛北岸；经 LIE 约 35–40 英里到曼哈顿" },
  "lattingtown-preserve": { minutesToManhattan: "约 60–75 分钟到 Penn Station（柴油线，通常需在 Jamaica 或 Mineola 换乘）", drive: "约 30–35 英里到曼哈顿中城，视路况约 60–90 分钟" },
  "hamlet-olde-oyster-bay": { minutesToManhattan: "约 41–55 分钟到 Penn Station", drive: "Hicksville 站距 Plainview 约 3.4 英里 / 6 分钟；自驾约 45–75 分钟" },
  "hamlet-estates-jericho": { minutesToManhattan: "约 42–47 分钟到 Penn Station（直达）", drive: "曼哈顿中城以东约 29 英里，经 LIE 自驾约 45–75 分钟" },
  "hamlet-jericho": { minutesToManhattan: "约 40–50 分钟到 Penn Station（高峰）", drive: "经 LIE（I-495）约 30–40 英里到曼哈顿中城" },
  "lattingtown-ponds": { drive: "约 25–30 英里到曼哈顿中城" },
  "summit-high-point-north-hills": { drive: "经 LIE（I-495）37 出口 / Willis Avenue" },
};

export function amenityLabel(en: string, locale: Locale) {
  return locale === "zh" ? amenityZh[en] ?? en : en;
}

export function homeTypesLabel(en: string, locale: Locale) {
  return locale === "zh" ? homeTypesZh[en] ?? en : en;
}

export function commuteFor(slug: string, locale: Locale) {
  return locale === "zh" ? commuteZh[slug] : undefined;
}
