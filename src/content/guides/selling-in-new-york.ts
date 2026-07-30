import type { Guide } from "./types";
import { SITE_MEDIA_ROOT } from "@/lib/media";

export const sellingGuide: Guide = {
  slug: "selling-in-new-york",
  title: {
    en: "Selling a Home in New York",
    zh: "纽约卖房完整指南",
  },
  description: {
    en: "A practical seller roadmap from pricing and preparation through offers, contracts, board requirements, and closing.",
    zh: "从定价、上市准备到报价比较、合同、大楼要求与过户的纽约卖房实务路线图。",
  },
  intro: {
    en: "A successful sale is not simply the highest asking price. It is a sequence of decisions about timing, presentation, buyer quality, legal preparation, and execution. This guide explains that sequence for New York sellers and shows where condos, co-ops, and houses require different planning.\n\nThe information below is educational. Your attorney, accountant, building management, and licensed real-estate professional should confirm the requirements and costs for your property.",
    zh: "卖房成功并不等于把挂牌价定到最高，而是把时机、展示、买家质量、法律准备和执行衔接好。本文按纽约卖房的真实顺序拆解流程，并说明 Condo、Co-op 与独栋房屋分别需要注意什么。\n\n以下内容仅供教育参考。具体物业的要求与费用，应由律师、会计师、大楼管理方和持牌房地产专业人士共同确认。",
  },
  updated: "2026-07-30",
  cover: `${SITE_MEDIA_ROOT}/journal/covers/brownstone.jpg`,
  sections: [
    {
      heading: { en: "Prepare before the listing goes live", zh: "挂牌前先把基础工作做完" },
      body: {
        en: "Start with ownership documents, open permits or liens, building questionnaires, alteration records, and the property's current condition. A co-op seller should anticipate board and managing-agent requirements; a condo seller should order common-charge and waiver materials early; a house seller should resolve title, survey, certificate-of-occupancy, and permit questions before they become a buyer's emergency.\n\nDecide which repairs protect value and which merely consume time. Safety, water intrusion, non-working systems, and visible deferred maintenance deserve priority. Cosmetic work should be judged by likely return, schedule, and the buyer profile — not by the seller's personal taste.",
        zh: "先整理产权文件、未结许可或留置权、大楼问卷、装修记录和物业现状。Co-op 卖家要预留董事会与管理公司的材料时间；Condo 卖家应尽早准备 common charge、waiver 等文件；独栋卖家则应在买家发现问题前处理 title、survey、入住许可和施工许可。\n\n维修要区分“保护价值”和“只消耗时间”。安全、渗水、设备失灵和明显失修应优先处理；纯审美改造则要按预期回报、上市时间和目标买家判断，而不是按卖家个人喜好判断。",
      },
    },
    {
      heading: { en: "Price from evidence, not aspiration", zh: "用证据定价，而不是用愿望定价" },
      body: {
        en: "The strongest pricing set uses recent closed sales first, then adjusts for condition, floor, light, view, layout, outdoor space, building quality, carrying cost, and current competition. Active listings show what buyers can choose today; expired listings show prices the market rejected.\n\nWhen comparable sales disagree, build a range and explain the adjustment rather than choosing the highest number. The first weeks carry the greatest attention. An unrealistic launch price can create a stale-listing discount that later reductions do not fully repair.",
        zh: "可靠的定价应先看近期已成交案例，再按房况、楼层、采光、景观、户型、户外空间、大楼质量、持有成本和当前竞争房源调整。在售房源说明买家今天还有什么选择；撤牌或过期房源则说明市场拒绝了什么价格。\n\n可比成交不一致时，应建立合理区间并解释调整逻辑，而不是只挑最高数字。挂牌最初几周的关注度最高，不切实际的首发价会形成“滞销折价”，之后降价也未必能完全修复。",
      },
    },
    {
      heading: { en: "Compare the whole offer", zh: "比较完整报价，而不只看金额" },
      body: {
        en: "Net price matters, but so do financing strength, down payment, appraisal risk, contingencies, closing timeline, post-closing occupancy, and the buyer's document readiness. A slightly lower offer with reliable funds and fewer execution risks can produce a better outcome than a headline-high offer that cannot close.\n\nAsk for a side-by-side offer summary. For co-ops, evaluate board readiness as carefully as financing. For houses and condos, identify appraisal and inspection exposure before accepting terms.",
        zh: "净到手价格重要，但贷款可靠性、首付比例、估价风险、附带条件、过户时间、交割后占用安排和买家材料准备度同样重要。金额略低但资金可靠、执行风险更少的报价，可能比看似更高却无法过户的报价更好。\n\n建议让经纪人制作并列报价表。Co-op 要像审核贷款一样重视买家的董事会材料能力；独栋和 Condo 则应在接受条款前识别估价与验房风险。",
      },
    },
    {
      heading: { en: "Contract, diligence, and closing", zh: "合同、尽调与过户" },
      body: {
        en: "In New York, attorneys generally negotiate the contract after an accepted offer. The buyer's attorney reviews title or building records, financial statements, minutes where applicable, and contract terms. Until both sides sign, an accepted offer is usually not the same as a binding contract.\n\nTrack every dependency: attorney review, deposit, mortgage commitment, appraisal, board package, lien or permit clearance, final walk-through, and closing statement. Before committing proceeds to a purchase or tax plan, have your attorney and accountant calculate transfer taxes, building fees, mortgage payoff, commissions, and any other property-specific charges.",
        zh: "在纽约，报价被接受后通常由双方律师协商合同。买方律师会审查产权或大楼记录、财务报表、适用时的会议记录以及合同条款。在双方签字前，“接受报价”通常不等于合同已经生效。\n\n整个过程要逐项跟踪：律师审阅、定金、贷款承诺、估价、董事会材料、留置权或许可清理、最终验房和 closing statement。在把卖房款用于下一套房或税务安排前，应让律师与会计师计算转让税、大楼费用、贷款结清、佣金和其他物业特定费用。",
      },
    },
  ],
  faq: [
    {
      question: { en: "Should I renovate before selling?", zh: "卖房前一定要装修吗？" },
      answer: {
        en: "Not automatically. Correct safety and maintenance problems first, then compare the likely price benefit of cosmetic work with its cost, delay, and execution risk. Sometimes cleaning, decluttering, paint, lighting, and strong media outperform a large renovation.",
        zh: "不一定。先处理安全和维护问题，再比较审美改造可能带来的价格提升、成本、延期和施工风险。很多情况下，清洁、收纳、油漆、灯光和高质量影像比大装修更有效。",
      },
    },
    {
      question: { en: "Is the highest offer always best?", zh: "最高报价一定最好吗？" },
      answer: {
        en: "No. Compare net proceeds, financing, contingencies, appraisal exposure, timeline, and probability of closing. The best offer is the strongest complete package.",
        zh: "不是。要同时比较净到手、贷款、附带条件、估价风险、时间和成功过户概率。最好的报价是整体最可靠的方案。",
      },
    },
    {
      question: { en: "When should I hire an attorney?", zh: "什么时候应该找律师？" },
      answer: {
        en: "Before or immediately when the property is listed. Early legal review can surface title, building, estate, lien, permit, or occupancy issues before they delay a buyer.",
        zh: "最好在挂牌前或挂牌时就确定律师。提前审查可以在买家介入前发现产权、大楼、遗产、留置权、许可或入住许可问题。",
      },
    },
  ],
  relatedSlugs: [
    "selling-process-new-york",
    "pricing-when-comps-disagree",
    "highest-offer-not-always-best",
    "pre-listing-repairs-vs-as-is",
    "sell-and-buy-at-the-same-time",
  ],
};
