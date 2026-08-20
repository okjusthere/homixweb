import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE_MEDIA_ROOT } from "@/lib/media";
import { getRouteLocale } from "@/lib/i18n";
import {
  breadcrumbLd,
  faqLd,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";

const HERO = `${SITE_MEDIA_ROOT}/about/team.jpg`;
const TRAINING_ROOT = `${SITE_MEDIA_ROOT}/training`;

const copy = {
  en: {
    meta: {
      title: "Real Estate Agent Commission Plan & Splits",
      description:
        "Compare Homix Realty's Solo, Solo Pro, and Team commission plans, annual company caps, transaction and lead fees, and the 10% Sponsor Lifetime Referral.",
    },
    hero: {
      eyebrow: "Homix commission & growth",
      title: "Keep more as your business grows.",
      lead: "Three ways to build your business: operate independently, move into 100% commission from your first closing, or grow with a team. Fees, splits, caps, and lead costs are disclosed before you join.",
      primary: "Compare the plans",
      secondary: "Apply to Homix",
      alt: "Homix real estate advisors together in the studio",
    },
    plans: {
      eyebrow: "Choose your path",
      title: "Three plans for three stages of business.",
      lead: "Compare each plan's annual cost, pre-cap agent-side percentage, and post-cap terms. Homix lead fees and outside referral terms apply only when the business comes from those sources.",
      annualFee: "Annual cost",
      commission: "Pre-cap agent side",
      cap: "Annual Homix cap",
      items: [
        {
          tag: "Independent",
          name: "Solo",
          audience: "For independent agents who value a low annual cost and a clear path to 100% commission.",
          fee: "$288 / year",
          feeNote: "or $500 / 2 years prepaid",
          split: "85%",
          splitNote: "Homix company dollar: 15%",
          capValue: "$12,000",
          capNote: "≈ $80,000 eligible commission to cap",
          afterLabel: "After the Homix cap",
          result: "100% commission, less transaction fee",
          body: "Before cap, each eligible $100 allocates $85 to you and $15 to Homix. Once the Homix cap is reached, the percentage split stops for the rest of your anniversary year.",
        },
        {
          tag: "High production",
          name: "Solo Pro",
          audience: "For established producers who want 100% commission from their first closing.",
          fee: "$3,650 / year",
          feeNote: "base affiliation fee included",
          split: "100%",
          splitNote: "from the first closing; transaction fee applies",
          capValue: "No split cap",
          capNote: "no percentage split to accumulate",
          afterLabel: "From day one",
          result: "100% continues",
          body: "A fixed transaction fee applies to each closing based on the full Homix commission check.",
        },
        {
          tag: "Team based",
          name: "Team Member",
          audience: "For agents who want hands-on leadership, shared training, and team infrastructure.",
          fee: "$288 / year",
          feeNote: "or $500 / 2 years prepaid",
          split: "≈ 81%",
          splitNote: "recommended member net before Homix cap",
          capValue: "$10,000",
          capNote: "≈ $100,000 eligible commission to Homix cap",
          afterLabel: "After the Homix cap",
          result: "≈ 90%, less transaction fee",
          body: "Before the Homix cap, each eligible $100 allocates $10 to Homix. The recommended Team Split is 10% of the remaining $90, leaving $81 to the Member and $9 to the Team Leader. After the Homix cap, the Homix split ends and the applicable transaction fee begins; Team terms continue according to the signed Team Agreement.",
        },
      ],
      note: "Prepaying $500 for two years saves $76 compared with two annual $288 payments. Solo Pro and Team Leader pricing includes the base affiliation fee. Team figures use Homix's recommended 10% Team Split; the signed Team Agreement controls the final configuration.",
    },
    cap: {
      eyebrow: "The cap",
      title: "Reach the cap. The company split stops.",
      lead: "Solo and Team company dollar accrues during each agent's anniversary year. Once the Homix cap is reached, Homix no longer takes a percentage split for the balance of that year. A Team Split is separate and continues according to the Team Agreement.",
      solo: {
        name: "Solo",
        split: "15% Homix",
        cap: "$12,000 cap",
        after: "100% mode",
        stages: [
          ["Before cap", "15% builds toward $12,000; approximately $80,000 of eligible commission reaches it"],
          ["Crossing the cap", "Only the amount needed to finish the cap is collected"],
          ["After cap", "Transaction fee begins on the next closing"],
        ],
      },
      team: {
        name: "Team Member",
        split: "10% Homix",
        cap: "$10,000 Homix cap",
        after: "≈ 90% member net*",
        stages: [
          ["Before cap", "10% builds toward $10,000; approximately $100,000 of eligible commission reaches it"],
          ["Team Split", "The recommended 10% Team Split is calculated from the remaining 90% agent side"],
          ["After Homix cap", "Homix's 10% stops and the transaction fee begins; Team terms continue separately"],
        ],
      },
      reset: "The cap year follows each agent's anniversary date, not the calendar year. Outside referrals, Sponsor payouts, transaction fees, and third-party charges do not create cap credit. *The approximate 90% Team Member result assumes the recommended 10% Team Split and is before the applicable transaction fee; the signed Team Agreement controls.",
    },
    example: {
      eyebrow: "Commission example",
      title: "How a $10,000 self-generated commission is allocated.",
      lead: "These examples assume a pre-cap closing with no outside referral, client rebate, or other adjustment.",
      items: [
        {
          name: "Solo",
          amount: "$8,500",
          label: "agent-side amount",
          detail: "$1,500 goes to the Solo cap.",
        },
        {
          name: "Solo Pro",
          amount: "$9,800",
          label: "agent-side amount",
          detail: "$200 transaction fee for a commission check up to $30,000.",
        },
        {
          name: "Team Member",
          amount: "$8,100",
          label: "member-side amount",
          detail: "$1,000 to Homix first, then $900 to the Team Leader from the remaining $9,000: 81% Member / 9% Team Leader / 10% Homix.",
        },
      ],
      disclaimer: "Illustrative amounts are before taxes and ordinary business expenses. Team results vary by the approved team configuration. A sponsor payment, when applicable, comes from eligible Homix revenue and does not reduce the agent-side amount shown here.",
    },
    source: {
      eyebrow: "Lead source",
      title: "Lead source determines the first calculation.",
      lead: "Self-generated business carries no lead fee. Homix rental or sales leads and outside referrals are settled first, and the remaining commission then enters the selected plan.",
      items: [
        {
          name: "Self-generated",
          value: "0%",
          body: "No source fee. The full eligible commission enters your plan.",
        },
        {
          name: "Homix rental lead",
          value: "15%",
          body: "Homix lead fee first; the remaining commission enters your plan.",
        },
        {
          name: "Homix sales lead",
          value: "25%",
          body: "Homix lead fee first; the remaining commission enters your plan.",
        },
        {
          name: "Outside referral",
          value: "By agreement",
          body: "Paid according to the signed referral agreement before plan economics.",
        },
      ],
      flowTitle: "How each closing is calculated",
      flow: [
        "Gross commission",
        "Lead or referral fee",
        "Homix split or 100% transaction fee",
        "Team Split, if applicable",
        "Agent-side amount",
      ],
      note: "A team-generated lead follows the signed Team Agreement and is not automatically treated as a Homix company lead.",
    },
    transaction: {
      eyebrow: "100% commission mode",
      title: "Company split or transaction fee, never both.",
      lead: "Solo Pro uses the transaction fee schedule from the first closing. Solo and Team Member closings move to the same schedule after the Homix cap. A pre-cap closing that generates the standard 15% or 10% company dollar is not charged an additional transaction fee.",
      checkLabel: "Commission check",
      fees: [
        { range: "Up to $30,000", fee: "$200" },
        { range: "$30,000.01–$100,000", fee: "$500" },
        { range: "Over $100,000", fee: "$1,000" },
      ],
      principle: "One closing, one Homix fee structure",
      detail: "A closing creates one Homix transaction fee even when co-agents, a Team Leader, or an outside referral share the commission. The fee tier is based on the full commission check received by Homix.",
    },
    sponsor: {
      eyebrow: "10% Sponsor reward",
      title: "Refer great agents. Earn a 10% Lifetime Referral.",
      lead: "When an agent you introduce joins Homix, you may receive 10% of the eligible Homix-owned revenue they generate for as long as the referral remains qualified. The reward is paid by Homix and is never deducted from the introduced agent's commission.",
      value: "10%",
      valueLabel: "Lifetime Referral on eligible Homix-owned revenue",
      qualificationTitle: "Annual production requirement",
      qualification: "For each reward year, both the Sponsor and the introduced agent must individually reach at least $10,000 in qualifying commission production.",
      eligibleTitle: "Included",
      eligible: [
        "Solo or Team company dollar",
        "Homix rental and sales lead fees",
        "Solo and Team Member affiliation fees",
        "Solo Pro annual fee or eligible upgrade payment",
      ],
      excludedTitle: "Not included",
      excluded: [
        "Homix transaction fees",
        "Outside referral pass-throughs",
        "Client rebates or credits",
        "MLS, association, government, tax, or third-party fees",
      ],
      note: "Sponsor and Team Leader are separate roles, although one person may serve as both. Sponsor payouts do not reduce the introduced agent's commission or cap credit. “Lifetime” means the referral may continue while the program remains available and all annual production, active-status, good-standing, and signed-agreement requirements are met. It is not unconditional, permanent, or guaranteed income.",
      alt: "Homix advisors celebrating a training milestone in the office",
    },
    platform: {
      eyebrow: "The Homix platform",
      title: "The support behind your production.",
      lead: "Homix agents have access to bilingual coaching, live transaction reviews, an in-house content studio, and practical AI and market-data tools designed for day-to-day real estate work.",
      items: [
        "Buyer and listing boot camps built around New York transactions",
        "In-person coaching, roundtables, and specialist seminars",
        "Bilingual content production and personal-brand support",
        "AI, market data, and workflow tools that give time back to agents",
      ],
      trainingCta: "See agent training",
      applyCta: "Start a conversation",
      workshopAlt: "Homix agents working through a live training session",
      roundtableAlt: "Homix agents in a roundtable coaching session",
    },
    faq: {
      eyebrow: "Questions",
      title: "Plan details, in plain language.",
      items: [
        {
          q: "What exactly is the annual cap?",
          a: "The cap is the maximum Homix company dollar generated by the normal split during your anniversary year: $12,000 for Solo and $10,000 for a Team Member. Solo reaches its Homix cap at approximately $80,000 of eligible commission; Team reaches its Homix cap at approximately $100,000. Once reached, the Homix percentage split stops for the rest of that year. A Team Split is separate and may continue.",
        },
        {
          q: "Do I pay both a split and a transaction fee?",
          a: "No. The core rule is split or transaction fee. Pre-cap Solo and Team closings generate company dollar and no transaction fee. Solo Pro and post-cap closings use the transaction fee schedule instead.",
        },
        {
          q: "Is the Team split another Homix split?",
          a: "No. Homix first receives 10% company dollar. The Team Split is then calculated separately from the remaining 90% agent side. Under the recommended 10% Team Split, each eligible $100 becomes $81 to the Member, $9 to the Team Leader, and $10 to Homix. Approved Team presets and any optional Team Cap are documented in the signed Team Agreement.",
        },
        {
          q: "Does the lower $10,000 Team cap mean I reach 100% sooner?",
          a: "No. The Team Homix cap is funded at 10%, so it takes approximately $100,000 of eligible commission to reach $10,000. Solo reaches its $12,000 Homix cap at approximately $80,000 because it is funded at 15%. After the Team Homix cap, Homix's 10% stops, but the Team Split normally continues; under the recommended configuration the Member moves from approximately 81% to approximately 90%, not 100%, before the applicable transaction fee.",
        },
        {
          q: "What happens if I upgrade to Solo Pro?",
          a: "If you upgrade within 90 days after paying the $288 or $500 base affiliation fee, that payment receives full credit toward the $3,650 Solo Pro fee. After 90 days, no credit applies. The upgrade starts a new 12-month Solo Pro term; there is no cash refund or monthly proration.",
        },
        {
          q: "Does the base membership cover a non-producing license?",
          a: "The $288 one-year or $500 two-year affiliation pricing also applies to an approved Holding or Non-Producing status. Permitted activity and eligibility are governed by the applicable agreement, brokerage policy, and New York law.",
        },
        {
          q: "How does the 10% Lifetime Referral qualify?",
          a: "For each reward year, the Sponsor and introduced agent must each record at least $10,000 in qualifying commission production, remain active and in good standing, and satisfy the signed program terms. The 10% is calculated only on eligible Homix-owned revenue; transaction fees, outside referral pass-throughs, client rebates or credits, and third-party charges are excluded.",
        },
        {
          q: "Are leads, sponsor income, or earnings guaranteed?",
          a: "No. Lead availability, closings, sponsor eligibility, and earnings vary. Nothing on this page is an earnings claim or guarantee; actual compensation follows the signed agreements and the facts of each transaction.",
        },
      ],
    },
    disclosure: {
      title: "Important plan disclosure",
      body: "This page is a plain-language summary, not an independent contractor agreement or promise of compensation. Actual compensation is governed by the executed Homix agreement, any team agreement, referral or lead-source documents, transaction facts, brokerage policy, and applicable law. Plan availability, fees, caps, and program terms may change as permitted by those agreements and law. Examples are illustrative and exclude taxes and ordinary business expenses, which may include licensing, MLS or association dues, insurance, marketing, and third-party charges.",
    },
    cta: {
      eyebrow: "Find your fit",
      title: "Find the plan that fits your business.",
      lead: "Tell us about your production, preferred way of working, and lead mix. We will review the applicable plan and costs with you before any agreement is signed.",
      primary: "Apply to join Homix",
      secondary: "Explore agent training",
    },
  },
  zh: {
    meta: {
      title: "地产经纪人佣金分成与封顶方案",
      description:
        "比较 Homix Realty 的 Solo、Solo Pro 与 Team 佣金方案，了解年度公司封顶、封顶前后佣金、Transaction Fee、客源费及 10% Sponsor Lifetime Referral 奖励。",
    },
    hero: {
      eyebrow: "Homix 佣金与成长方案",
      title: "业务越成熟，留给自己的越多。",
      lead: "三种发展路径，对应不同阶段的业务需要：独立经营、从第一笔成交采用 100% 模式，或加入团队获得带教与协作支持。费用、分成、封顶和客源规则，均在加入前说明清楚。",
      primary: "比较三种方案",
      secondary: "申请加入 Homix",
      alt: "Homix 房地产经纪人团队在工作室合影",
    },
    plans: {
      eyebrow: "选择发展路径",
      title: "三种方案，匹配不同的发展阶段。",
      lead: "比较每种方案的年度费用、封顶前经纪人所得及封顶后的安排。只有在使用 Homix 客源或外部转介时，才会另按相应的客源或转介规则结算。",
      annualFee: "年度费用",
      commission: "封顶前经纪人所得",
      cap: "年度 Homix 封顶",
      items: [
        {
          tag: "独立发展",
          name: "Solo",
          audience: "适合重视较低年度成本，并希望通过明确封顶进入 100% 模式的独立经纪人。",
          fee: "$288 / 年",
          feeNote: "或一次预付 $500 / 两年",
          split: "85%",
          splitNote: "Homix 公司分成：15%",
          capValue: "$12,000",
          capNote: "约需 $80,000 可计入封顶的佣金",
          afterLabel: "达到 Homix Cap 后",
          result: "100% 佣金，另收 Transaction Fee",
          body: "封顶前，每 $100 可计入封顶的佣金中，你保留 $85，Homix 获得 $15。达到 Homix Cap 后，当个周年年度不再收取百分比分成。",
        },
        {
          tag: "高产经纪人",
          name: "Solo Pro",
          audience: "适合业务稳定，希望从第一笔成交起采用 100% 模式的成熟经纪人。",
          fee: "$3,650 / 年",
          feeNote: "已包含基础 affiliation fee",
          split: "100%",
          splitNote: "从第一笔成交开始；每单收 Transaction Fee",
          capValue: "无需累计封顶",
          capNote: "没有需要累计的百分比分成",
          afterLabel: "从第一笔成交开始",
          result: "持续采用 100% 模式",
          body: "每笔成交根据 Homix 收到的整张 commission check 金额，收取固定 Transaction Fee。",
        },
        {
          tag: "团队发展",
          name: "Team Member",
          audience: "适合希望获得 Team Leader 带教、共同培训与团队资源支持的经纪人。",
          fee: "$288 / 年",
          feeNote: "或一次预付 $500 / 两年",
          split: "约 81%",
          splitNote: "采用推荐团队分成时，封顶前 Member 所得",
          capValue: "$10,000",
          capNote: "约需 $100,000 可计入封顶的佣金",
          afterLabel: "达到 Homix Cap 后",
          result: "约保留 90%，另收 Transaction Fee",
          body: "达到 Homix Cap 前，每 $100 可计入封顶的佣金中，Homix 获得 $10。推荐的 Team Split 为剩余 $90 的 10%，即 Member 获得 $81，Team Leader 获得 $9。达到 Homix Cap 后，公司分成停止并开始适用 Transaction Fee；团队分成继续按已签署的 Team Agreement 执行。",
        },
      ],
      note: "一次预付 $500 可覆盖两年，比连续两年各付 $288 节省 $76。Solo Pro 与 Team Leader 的 $3,650 已包含基础会员费。Team 示例采用 Homix 推荐的 10% Team Split，最终配置以已签署的 Team Agreement 为准。",
    },
    cap: {
      eyebrow: "年度封顶",
      title: "达到年度封顶后，公司分成即停止。",
      lead: "Solo 与 Team Member 的公司分成按个人入职周年年度累计。达到对应的 Homix Cap 后，该周期内不再收取公司百分比分成；Team Member 与 Team Leader 之间的团队分成仍按 Team Agreement 执行。",
      solo: {
        name: "Solo",
        split: "15% Homix",
        cap: "$12,000 封顶",
        after: "100% 模式",
        stages: [
          ["封顶前", "15% 持续累计至 $12,000，约需 $80,000 可计入封顶的佣金"],
          ["跨越封顶的那一单", "只收刚好达到封顶所需的余额"],
          ["封顶后", "从下一笔成交开始收 Transaction Fee"],
        ],
      },
      team: {
        name: "Team Member",
        split: "10% Homix",
        cap: "$10,000 Homix 封顶",
        after: "Member 约保留 90%*",
        stages: [
          ["封顶前", "10% 持续累计至 $10,000，约需 $100,000 可计入封顶的佣金"],
          ["团队分成", "推荐的 10% Team Split 从剩余 90% 经纪人所得中计算"],
          ["Homix 封顶后", "Homix 的 10% 停止并改收 Transaction Fee；团队条款继续独立执行"],
        ],
      },
      reset: "封顶周期按个人入职周年计算，并非自然年。外部转介费、Sponsor 奖励、Transaction Fee 与第三方费用均不计入封顶。*Team Member 封顶后约保留 90%，按推荐的 10% Team Split 估算，尚未扣除适用的 Transaction Fee；实际以已签署的 Team Agreement 为准。",
    },
    example: {
      eyebrow: "佣金示例",
      title: "一笔 $10,000 自有客源佣金，三种方案分别如何分配？",
      lead: "以下示例假设成交发生在封顶前，且不涉及外部转介、客户返还或其他调整。",
      items: [
        {
          name: "Solo",
          amount: "$8,500",
          label: "经纪人所得",
          detail: "$1,500 累计进入 Solo Cap。",
        },
        {
          name: "Solo Pro",
          amount: "$9,800",
          label: "经纪人所得",
          detail: "commission check 不超过 $30,000，对应 $200 Transaction Fee。",
        },
        {
          name: "Team Member",
          amount: "$8,100",
          label: "团队成员所得",
          detail: "Homix 先获得 $1,000，再从剩余 $9,000 中分给 Team Leader $900：Member 81% / Team Leader 9% / Homix 10%。",
        },
      ],
      disclaimer: "以上金额仅用于说明分配方式，尚未扣除税费与日常经营支出。团队方案以已批准并签署的 Team Agreement 为准。Sponsor 奖励如适用，由 Homix 可计入奖励的自有收入支付，不会从经纪人所得中另行扣除。",
    },
    source: {
      eyebrow: "客源与转介",
      title: "客源不同，结算方式也不同。",
      lead: "自有客源不收客源费。Homix 提供的出租或买卖客源，以及外部转介，会先按相应约定结算，剩余佣金再进入所选方案。",
      items: [
        {
          name: "自有客源",
          value: "0%",
          body: "不收客源费，可计入方案的佣金全部进入所选方案。",
        },
        {
          name: "Homix 出租客源",
          value: "15%",
          body: "先扣除 Homix 客源费，剩余佣金再进入所选方案。",
        },
        {
          name: "Homix 买卖客源",
          value: "25%",
          body: "先扣除 Homix 客源费，剩余佣金再进入所选方案。",
        },
        {
          name: "外部转介",
          value: "按协议",
          body: "先依照已签署的转介协议支付，再进入方案计算。",
        },
      ],
      flowTitle: "每笔成交按以下顺序结算",
      flow: [
        "总佣金",
        "客源费或转介费",
        "Homix 分成或 100% 模式 Transaction Fee",
        "团队分成（如适用）",
        "经纪人所得",
      ],
      note: "团队提供的客源按已签署的 Team Agreement 结算，不会自动视为 Homix 公司客源。",
    },
    transaction: {
      eyebrow: "100% 佣金模式",
      title: "公司分成与 Transaction Fee 不会重复收取。",
      lead: "Solo Pro 从第一笔成交起按 Transaction Fee 表执行；Solo 与 Team Member 达到 Homix Cap 后，也改按同一标准执行。仍在封顶前、已产生 15% 或 10% 公司分成的成交，不另收 Transaction Fee。",
      checkLabel: "Homix 收到的佣金",
      fees: [
        { range: "不超过 $30,000", fee: "$200" },
        { range: "$30,000.01–$100,000", fee: "$500" },
        { range: "超过 $100,000", fee: "$1,000" },
      ],
      principle: "一笔成交，只适用一种公司收费方式",
      detail: "同一笔成交即使包含共同经纪人、Team Leader 或外部转介，也只产生一次 Homix Transaction Fee。收费档位以 Homix 收到的整笔佣金为准。",
    },
    sponsor: {
      eyebrow: "10% Sponsor 奖励",
      title: "介绍优秀经纪人，获得 10% Lifetime Referral。",
      lead: "当你介绍的经纪人加入 Homix，并持续满足计划资格时，你可按其为 Homix 带来的合资格自有收入获得 10% Lifetime Referral。奖励由 Homix 支付，不会从被介绍经纪人的佣金中扣除。",
      value: "10%",
      valueLabel: "合资格 Homix 自有收入的 Lifetime Referral",
      qualificationTitle: "年度产量要求",
      qualification: "每个奖励年度内，Sponsor 与被介绍经纪人双方各自均须达到至少 $10,000 的可认定佣金产量，方可获得该年度奖励。",
      eligibleTitle: "计入范围",
      eligible: [
        "Solo 或 Team 产生的 Homix 公司分成",
        "Homix 出租与买卖客源费",
        "Solo 与 Team Member 会员费",
        "Solo Pro 年费或符合条件的升级实付金额",
      ],
      excludedTitle: "不计入范围",
      excluded: [
        "Homix Transaction Fee",
        "支付给外部机构或转介方的费用",
        "客户返还或抵扣",
        "MLS、协会、政府、税费及第三方费用",
      ],
      note: "Sponsor 与 Team Leader 是两个独立角色，同一人可以兼任。Sponsor 奖励不会减少被介绍经纪人的佣金或封顶累计。“Lifetime”表示推荐关系可在该计划持续有效，且双方每年均满足产量、在职状态、良好执业记录及已签协议要求的前提下延续；并非无条件永久支付，也不构成收入保证。",
      alt: "Homix 经纪人在办公室庆祝培训里程碑",
    },
    platform: {
      eyebrow: "Homix 平台支持",
      title: "佣金方案之外，还有把业务做起来的支持。",
      lead: "Homix 为经纪人提供中英双语带教、真实交易复盘、自有内容工作室，以及面向日常业务的 AI 与市场数据工具。",
      items: [
        "围绕纽约真实交易设计的买方与房源代理实战训练营",
        "线下带教、圆桌复盘和专业嘉宾课程",
        "中英双语内容制作与个人品牌支持",
        "帮助经纪人节省时间的 AI、市场数据与工作流工具",
      ],
      trainingCta: "查看经纪人培训",
      applyCta: "开始聊一聊",
      workshopAlt: "Homix 经纪人参加线下实战培训",
      roundtableAlt: "Homix 经纪人参加圆桌带教",
    },
    faq: {
      eyebrow: "常见问题",
      title: "重要细则，一次说明清楚。",
      items: [
        {
          q: "年度 Cap 到底是什么？",
          a: "年度封顶是指每个入职周年年度内，Homix 通过常规分成最多收取的公司分成。Solo 封顶为 $12,000，约在累计 $80,000 可计入封顶的佣金时达到；Team Member 封顶为 $10,000，约在累计 $100,000 时达到。达到封顶后，该周期内不再收取 Homix 百分比分成；Team Split 仍依 Team Agreement 执行。",
        },
        {
          q: "Split 和 Transaction Fee 会同时收吗？",
          a: "不会。封顶前的 Solo 与 Team 成交按百分比分成，不另收 Transaction Fee；Solo Pro 与封顶后的成交改按 Transaction Fee 标准结算。",
        },
        {
          q: "Team Split 是 Homix 的第二层分成吗？",
          a: "不是。每 $100 可计入方案的佣金中，Homix 先获得 $10；推荐的 10% Team Split 从剩余 $90 计算，Team Member 获得 $81，Team Leader 获得 $9。具体团队分成及可选的 Team Cap 都会写入已签署的 Team Agreement。",
        },
        {
          q: "Team 的 $10,000 Cap 更低，是不是更快拿到 100%？",
          a: "不会。Team 的 Homix Cap 按 10% 累计，因此约需 $100,000 可计入封顶的佣金才能达到 $10,000；Solo 按 15% 累计，约 $80,000 即达到 $12,000。Team Member 达到 Homix Cap 后，公司 10% 分成停止，但 Team Split 通常继续；按推荐配置，Member 所得会从约 81% 调整为约 90%，并另收适用的 Transaction Fee，而不是直接进入 100%。",
        },
        {
          q: "中途升级 Solo Pro 怎么计算？",
          a: "支付 $288 或 $500 基础会员费后 90 天内升级，可将该笔费用全额抵扣 $3,650 Solo Pro 年费；超过 90 天则不再抵扣。升级之日起重新开始 12 个月 Solo Pro 周期，不提供现金退款，也不按月份折算。",
        },
        {
          q: "暂不做单、只保留牌照也用基础会员费吗？",
          a: "经批准的牌照保留（Holding）或非生产（Non-Producing）状态，同样采用 $288 一年或 $500 两年的基础会员费。可从事的活动及相关资格，以适用协议、公司政策和纽约州法律为准。",
        },
        {
          q: "10% Lifetime Referral 需要满足什么资格？",
          a: "每个奖励年度内，Sponsor 与被介绍经纪人的可认定佣金产量都必须分别达到至少 $10,000，同时保持在职、良好执业状态，并满足已签署的计划条款。10% 只按合资格的 Homix 自有收入计算，不包括 Transaction Fee、外部转介支出、客户返还或抵扣及第三方费用。",
        },
        {
          q: "公司客源、Sponsor 奖励或最终收入有保证吗？",
          a: "不保证。客源数量、成交结果、Sponsor 资格和最终收入会因个人业务及具体交易而异。本页不构成收入承诺，实际报酬以已签协议和每笔交易为准。",
        },
      ],
    },
    disclosure: {
      title: "重要方案说明",
      body: "本页为方案摘要，不构成独立承包人协议或任何报酬承诺。实际佣金以已签署的 Homix 协议、Team Agreement、转介或客源文件、交易事实、公司政策及适用法律为准。在协议与法律允许的范围内，方案资格、费用、封顶及项目条款可能调整。所有金额仅用于说明分配方式，不包含税费与日常经营成本；相关成本可能包括牌照、MLS 或协会会费、保险、营销及第三方费用。",
    },
    cta: {
      eyebrow: "找到适合你的路径",
      title: "一起选出适合你业务的方案。",
      lead: "告诉我们你目前的业务阶段、合作方式与客源结构。签署任何协议前，我们会说明适用方案、费用及具体规则。",
      primary: "申请加入 Homix",
      secondary: "查看经纪人培训",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const content = copy[locale];
  return pageMetadata({
    path: "/commission-plan",
    locale,
    title: content.meta.title,
    description: content.meta.description,
    image: HERO,
  });
}

export default async function CommissionPlanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const content = copy[locale];

  return (
    <>
      <section className="relative h-[76svh] min-h-[580px] max-h-[820px] w-full bg-ink before:absolute before:inset-x-0 before:-top-64 before:h-64 before:bg-ink">
        <Image
          src={HERO}
          alt={content.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%] lg:object-[center_38%]"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <Container className="relative flex h-full items-end pb-14 pt-28 sm:pb-20">
          <div className="max-w-3xl">
            <Eyebrow className="text-paper/70">{content.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-normal leading-[1.04] text-paper sm:text-[4rem]">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              {content.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#plans" onDark>
                {content.hero.primary}
                <span aria-hidden>↓</span>
              </Button>
              <Button href="/join#apply" variant="outline" onDark>
                {content.hero.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="plans" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{content.plans.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
              {content.plans.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{content.plans.lead}</p>
          </div>

          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {content.plans.items.map((plan, index) => {
              const dark = index === 1;
              return (
                <article
                  key={plan.name}
                  className={
                    dark
                      ? "flex h-full flex-col rounded-sm border border-ink bg-ink p-7 text-paper sm:p-8"
                      : "flex h-full flex-col rounded-sm border border-line bg-surface p-7 text-ink sm:p-8"
                  }
                >
                    <p className={dark ? "eyebrow text-paper/60" : "eyebrow text-bronze"}>
                      {plan.tag}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl font-normal leading-none">
                      {plan.name}
                    </h3>
                    <p className={dark ? "mt-4 min-h-16 text-sm leading-relaxed text-paper/70" : "mt-4 min-h-16 text-sm leading-relaxed text-muted"}>
                      {plan.audience}
                    </p>

                    <dl className={dark ? "mt-7 divide-y divide-paper/15 border-y border-paper/15" : "mt-7 divide-y divide-line border-y border-line"}>
                      <div className="py-4">
                        <dt className={dark ? "text-xs uppercase text-paper/55" : "text-xs uppercase text-muted"}>
                          {content.plans.annualFee}
                        </dt>
                        <dd className="mt-1.5 font-serif text-2xl tabular-nums">{plan.fee}</dd>
                        <dd className={dark ? "mt-1 text-xs text-paper/60" : "mt-1 text-xs text-muted"}>
                          {plan.feeNote}
                        </dd>
                      </div>
                      <div className="py-4">
                        <dt className={dark ? "text-xs uppercase text-paper/55" : "text-xs uppercase text-muted"}>
                          {content.plans.commission}
                        </dt>
                        <dd className="mt-1.5 font-serif text-[2rem] tabular-nums">{plan.split}</dd>
                        <dd className={dark ? "mt-1 text-xs text-paper/60" : "mt-1 text-xs text-muted"}>
                          {plan.splitNote}
                        </dd>
                      </div>
                      <div className="py-4">
                        <dt className={dark ? "text-xs uppercase text-paper/55" : "text-xs uppercase text-muted"}>
                          {content.plans.cap}
                        </dt>
                        <dd className="mt-1.5 font-serif text-2xl tabular-nums">{plan.capValue}</dd>
                        <dd className={dark ? "mt-1 text-xs text-paper/60" : "mt-1 text-xs text-muted"}>
                          {plan.capNote}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6">
                      <p className={dark ? "text-xs uppercase text-paper/55" : "text-xs uppercase text-muted"}>
                        {plan.afterLabel}
                      </p>
                      <p className={dark ? "mt-2 text-base font-medium text-paper" : "mt-2 text-base font-medium text-bronze"}>
                        {plan.result}
                      </p>
                      <p className={dark ? "mt-3 text-sm leading-relaxed text-paper/70" : "mt-3 text-sm leading-relaxed text-muted"}>
                        {plan.body}
                      </p>
                    </div>
                </article>
              );
            })}
          </div>

          <p className="mt-6 border-l border-bronze/60 pl-4 text-sm leading-relaxed text-muted">
            {content.plans.note}
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>{content.cap.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.cap.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.cap.lead}</p>
            </div>

            <div className="space-y-10">
              {[content.cap.solo, content.cap.team].map((track) => (
                <div key={track.name} className="border-t border-line pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-serif text-2xl text-ink">{track.name}</h3>
                    <p className="text-sm text-muted">
                      <span className="font-medium text-ink">{track.split}</span> → {track.cap} →{" "}
                      <span className="font-medium text-bronze">{track.after}</span>
                    </p>
                  </div>
                  <div className="mt-5 grid h-3 grid-cols-[3fr_1fr] overflow-hidden rounded-sm" aria-hidden>
                    <div className="bg-bronze" />
                    <div className="bg-ink" />
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-3">
                    {track.stages.map(([title, body], index) => (
                      <div key={title}>
                        <p className="text-xs font-medium text-bronze">0{index + 1}</p>
                        <p className="mt-2 text-sm font-medium text-ink">{title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
            {content.cap.reset}
          </p>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="text-paper/60">{content.example.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight sm:text-[2.7rem]">
              {content.example.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">{content.example.lead}</p>
          </div>

          <div className="mt-12 grid border-y border-paper/20 md:grid-cols-3 md:divide-x md:divide-paper/20">
            {content.example.items.map((item) => (
              <div key={item.name} className="h-full border-b border-paper/20 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="text-sm font-medium text-paper/70">{item.name}</p>
                <p className="mt-5 font-serif text-5xl tabular-nums text-paper">{item.amount}</p>
                <p className="mt-2 text-xs uppercase text-paper/50">{item.label}</p>
                <p className="mt-5 text-sm leading-relaxed text-paper/70">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-paper/55">
            {content.example.disclaimer}
          </p>
        </Container>
      </section>

      <section id="lead-source" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <Eyebrow>{content.source.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.source.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.source.lead}</p>
            </div>
            <div className="border-t border-line">
              {content.source.items.map((item) => (
                <div key={item.name} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[1fr_0.55fr_1.45fr] sm:items-baseline sm:gap-6">
                  <h3 className="font-serif text-xl text-ink">{item.name}</h3>
                  <p className="font-serif text-2xl tabular-nums text-bronze">{item.value}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-y border-line py-8">
            <p className="eyebrow text-bronze">{content.source.flowTitle}</p>
            <ol className="mt-6 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-5">
              {content.source.flow.map((step, index) => (
                <li key={step} className="relative min-h-28 bg-surface p-5">
                  <span className="text-xs text-bronze">0{index + 1}</span>
                  <p className="mt-3 text-sm font-medium leading-snug text-ink">{step}</p>
                  {index < content.source.flow.length - 1 && (
                    <span className="absolute bottom-4 right-4 text-bronze sm:-right-1.5 sm:bottom-auto sm:top-1/2 sm:z-10 sm:-translate-y-1/2 sm:bg-surface sm:px-0.5" aria-hidden>
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-muted">{content.source.note}</p>
          </div>
        </Container>
      </section>

      <section id="transaction-fees" className="scroll-mt-20 border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>{content.transaction.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.transaction.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {content.transaction.lead}
              </p>
              <div className="mt-8 border-l-2 border-bronze pl-5">
                <p className="font-serif text-2xl text-ink">{content.transaction.principle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{content.transaction.detail}</p>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:self-start">
              {content.transaction.fees.map((fee) => (
                <div key={fee.range} className="bg-paper p-6 sm:min-h-44 sm:p-7">
                  <p className="text-xs uppercase text-muted">{content.transaction.checkLabel}</p>
                  <p className="mt-4 text-sm font-medium leading-snug text-ink">{fee.range}</p>
                  <p className="mt-8 font-serif text-4xl tabular-nums text-bronze">{fee.fee}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="sponsor" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div className="relative min-h-[520px] overflow-hidden rounded-sm bg-line/40">
              <Image
                src={`${TRAINING_ROOT}/training-milestone.jpg`}
                alt={content.sponsor.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Eyebrow>{content.sponsor.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.sponsor.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{content.sponsor.lead}</p>

              <div className="mt-8 border-y border-bronze/50 bg-surface px-5 py-6">
                <div className="flex items-end gap-5">
                  <p className="font-serif text-7xl tabular-nums text-bronze">{content.sponsor.value}</p>
                  <p className="max-w-56 pb-1 text-sm font-medium leading-snug text-ink">
                    {content.sponsor.valueLabel}
                  </p>
                </div>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-xs font-medium text-bronze">{content.sponsor.qualificationTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {content.sponsor.qualification}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-ink">{content.sponsor.eligibleTitle}</h3>
                  <ul className="mt-4 space-y-3">
                    {content.sponsor.eligible.map((item) => (
                      <li key={item} className="border-l border-bronze/60 pl-3 text-sm leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-ink">{content.sponsor.excludedTitle}</h3>
                  <ul className="mt-4 space-y-3">
                    {content.sponsor.excluded.map((item) => (
                      <li key={item} className="border-l border-line pl-3 text-sm leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-7 text-xs leading-relaxed text-muted">{content.sponsor.note}</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="platform" className="scroll-mt-20 border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>{content.platform.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.platform.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.platform.lead}</p>
              <ul className="mt-8 space-y-4">
                {content.platform.items.map((item) => (
                  <li key={item} className="flex gap-4 border-t border-line pt-4 text-sm leading-relaxed text-ink">
                    <span className="font-serif text-bronze" aria-hidden>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/training" variant="outline">
                  {content.platform.trainingCta}
                </Button>
                <Button href="/join#apply" variant="ghost">
                  {content.platform.applyCta}
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={`${TRAINING_ROOT}/live-workshop.jpg`}
                  alt={content.platform.workshopAlt}
                  fill
                  sizes="(max-width: 1024px) 46vw, 310px"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={`${TRAINING_ROOT}/roundtable-window-session.jpg`}
                  alt={content.platform.roundtableAlt}
                  fill
                  sizes="(max-width: 1024px) 46vw, 310px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="questions" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{content.faq.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
              {content.faq.title}
            </h2>
          </div>

          <div className="mt-12 border-t border-line">
            {content.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left marker:content-none">
                  <span className="font-serif text-lg leading-snug text-ink">{item.q}</span>
                  <span className="mt-0.5 shrink-0 text-xl font-light text-bronze transition-transform duration-200 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-base leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>

          <aside className="mt-12 border border-line bg-surface p-6 sm:p-8" aria-labelledby="plan-disclosure-title">
            <h3 id="plan-disclosure-title" className="text-sm font-medium text-ink">
              {content.disclosure.title}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted">{content.disclosure.body}</p>
          </aside>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <div className="max-w-3xl">
              <Eyebrow className="text-paper/60">{content.cta.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight sm:text-[2.8rem]">
                {content.cta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70">
                {content.cta.lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button href="/join#apply" onDark>
                {content.cta.primary}
              </Button>
              <Button href="/training" variant="outline" onDark>
                {content.cta.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqLd(content.faq.items.map((item) => ({ question: item.q, answer: item.a }))),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd(
              [
                { name: locale === "zh" ? "首页" : "Home", path: "/" },
                {
                  name: locale === "zh" ? "佣金与成长方案" : "Commission plan",
                  path: "/commission-plan",
                },
              ],
              locale,
            ),
          ),
        }}
      />
    </>
  );
}
