import type { Guide } from "./types";
import { SITE_MEDIA_ROOT } from "@/lib/media";

export const investingGuide: Guide = {
  slug: "investing-and-landlording",
  title: {
    en: "New York Property Investing & Landlording",
    zh: "纽约地产投资与房东实务",
  },
  description: {
    en: "A decision framework for rental cash flow, building due diligence, tenant rules, reserves, and long-term ownership.",
    zh: "覆盖租金现金流、楼宇尽调、租客法规、储备金与长期持有的投资决策框架。",
  },
  intro: {
    en: "An investment property is an operating business tied to an illiquid asset. Purchase price is only the first input; financing, taxes, insurance, maintenance, vacancy, regulation, management, and exit costs determine whether the plan works.\n\nThis guide provides a conservative framework for New York and nearby markets. It is not investment, legal, or tax advice. Verify assumptions with licensed professionals and current government or building records.",
    zh: "投资房是绑定在非流动资产上的一门经营业务。买入价只是第一个参数，贷款、税费、保险、维修、空置、法规、管理和退出成本共同决定这笔投资是否成立。\n\n本文提供适用于纽约及周边市场的保守分析框架，不构成投资、法律或税务建议。请让持牌专业人士并结合最新政府及大楼记录核实所有假设。",
  },
  updated: "2026-07-30",
  cover: `${SITE_MEDIA_ROOT}/journal/covers/jersey-city.jpg`,
  sections: [
    {
      heading: { en: "Underwrite the property as a business", zh: "像经营企业一样测算物业" },
      body: {
        en: "Begin with realistic gross rent, then subtract vacancy and credit loss, property taxes, insurance, common charges or maintenance, utilities paid by the owner, management, leasing, routine repairs, and a capital reserve. Debt service belongs below net operating income so the property can be compared independently of one buyer's financing.\n\nUse a base case, a downside case, and a capital-repair case. A deal that works only with perfect occupancy, immediate rent growth, and no major repairs is not a resilient deal.",
        zh: "先估算现实的总租金，再扣除空置与坏账、房产税、保险、common charge 或 maintenance、房东承担的水电、管理、招租、日常维修和资本开支储备。贷款本息应放在净营运收入之后计算，这样才能把物业本身和某个买家的融资结构分开比较。\n\n至少建立基准、下行情景和大修情景。如果一笔交易只有在全年满租、租金立即上涨且没有大修时才成立，它就缺乏韧性。",
      },
    },
    {
      heading: { en: "Due diligence changes by property type", zh: "不同物业类型需要不同尽调" },
      body: {
        en: "For a condo, review financial statements, reserves, assessments, insurance, rental restrictions, right of first refusal, and pending capital projects. For a small multifamily, verify the certificate of occupancy, legal unit count, leases, rent history, violations, building systems, utility responsibility, and whether any unit is regulated. For a house with an accessory unit, never assume the rental use is legal because it already exists.\n\nMatch every income assumption to a lease, rent roll, market comp, or lawful future scenario. Match every expense assumption to bills, tax records, insurance quotes, inspection findings, and reserve needs.",
        zh: "Condo 要审查财务报表、储备金、assessment、保险、出租限制、优先购买权和待进行的大型工程。小型多户住宅要核实入住许可、合法户数、租约、租金历史、违规记录、楼宇设备、公共事业费责任，以及是否存在受管制单元。带附属单元的独栋房，不能因为现状有人居住就假设出租用途合法。\n\n每一项收入假设都应对应租约、rent roll、市场可比案例或合法的未来情景；每一项支出假设都应对应账单、税务记录、保险报价、验房结果和储备需求。",
      },
    },
    {
      heading: { en: "Regulation is part of the investment", zh: "法规本身就是投资条件" },
      body: {
        en: "Rent stabilization, registration, security-deposit rules, notice periods, source-of-income protections, fair housing, building code, and local licensing can affect revenue and operations. Rules vary between New York City, Long Island municipalities, New Jersey, and other jurisdictions — and they change.\n\nDo not treat a regulated unit as a free-market unit or rely on informal representations. Have an attorney review leases, rent history, occupancy, and local requirements before closing. Fair-housing compliance applies to advertising, screening, communication, and enforcement throughout ownership.",
        zh: "租金稳定制度、登记、押金规则、通知期限、收入来源保护、公平住房、建筑规范和地方许可都会影响收入与运营。纽约市、长岛各市镇、新泽西及其他辖区的规则不同，而且会变化。\n\n不要把受管制单元当作自由市场单元，也不要只依赖口头描述。过户前应由律师审查租约、租金历史、入住状态和当地要求。公平住房要求贯穿广告、筛选、沟通和租约执行的整个持有周期。",
      },
    },
    {
      heading: { en: "Plan reserves, management, and exit before buying", zh: "买入前先规划储备、管理与退出" },
      body: {
        en: "Decide who answers maintenance calls, documents repairs, collects rent, handles renewals, and coordinates compliance. Price professional management even if you initially plan to self-manage; circumstances change.\n\nBuild reserves for predictable replacements and unexpected failures. Then test the exit: likely buyer pool, transaction costs, tax consequences, and whether the investment still works if the sale takes longer or pricing softens. A 1031 exchange can be useful in qualifying circumstances, but it has strict timing and documentation requirements — involve tax and exchange professionals before a sale.",
        zh: "提前确定谁接维修电话、记录维修、收租、处理续约和协调合规。即使初期打算自管，也应把专业管理费计入模型，因为个人情况会变化。\n\n为可预见更换和意外故障建立储备，再测试退出情景：潜在买家群、交易成本、税务后果，以及出售时间拉长或价格走软时是否仍成立。符合条件时 1031 置换可能有用，但时间和文件要求严格，应在出售前就让税务及置换专业人士介入。",
      },
    },
  ],
  faq: [
    {
      question: { en: "What is the most important investment metric?", zh: "投资房最重要的指标是什么？" },
      answer: {
        en: "No single metric is enough. Review net operating income, debt coverage, cash flow, return on invested cash, reserve needs, and downside sensitivity together.",
        zh: "没有一个指标可以单独决定。应把净营运收入、偿债能力、现金流、投入现金回报、储备需求和下行情景放在一起看。",
      },
    },
    {
      question: { en: "Can I use market rent for every unit?", zh: "每个单元都能按市场租金测算吗？" },
      answer: {
        en: "No. Existing leases, rent regulation, local law, occupancy, condition, and legal use can limit achievable rent. Verify each unit independently.",
        zh: "不能。现有租约、租金管制、当地法规、入住状态、房况和合法用途都可能限制实际租金，必须逐户核实。",
      },
    },
    {
      question: { en: "Should I self-manage?", zh: "应该自己管理吗？" },
      answer: {
        en: "Only if you have the time, systems, proximity, and compliance knowledge. Underwrite professional management anyway so the investment is not dependent on free personal labor.",
        zh: "只有在时间、系统、距离和合规知识都允许时才适合自管。测算时仍应计入专业管理费，避免投资建立在免费个人劳动上。",
      },
    },
  ],
  relatedSlugs: [
    "rental-property-cash-flow-new-york",
    "small-multifamily-holding-costs",
    "rent-stabilized-free-market-landlord-basics",
    "nyc-property-tax-2026",
    "nyc-condo-vs-coop-costs",
  ],
};
