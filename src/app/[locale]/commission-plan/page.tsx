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
        "Compare what agents keep under Homix Realty's Solo, Solo Pro, and Team commission plans, including annual company caps, team economics, transaction fees, lead fees, and sponsor rewards.",
    },
    hero: {
      eyebrow: "Homix commission & growth",
      title: "Keep more as your business grows.",
      lead: "Choose an independent, 100%, or team path. Start with what you actually keep, then see the company cap, post-cap economics, and lead fees before you join.",
      primary: "Compare the plans",
      secondary: "Apply to Homix",
      alt: "Homix real estate advisors together in the studio",
    },
    plans: {
      eyebrow: "Choose your path",
      title: "Start with what you keep.",
      lead: "The percentages below show the agent or member side before the Homix cap. Your source of business does not choose your plan; source economics apply only when a lead comes from Homix or an outside referral.",
      annualFee: "Membership",
      commission: "What you keep",
      cap: "Homix company cap",
      items: [
        {
          tag: "Independent",
          name: "Solo",
          audience: "For independent agents who want a low fixed cost and a reachable cap.",
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
          audience: "For established producers who prefer certainty from closing one.",
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
          audience: "For agents who want a leader, shared training, and team infrastructure.",
          fee: "$288 / year",
          feeNote: "or $500 / 2 years prepaid",
          split: "≈ 81%",
          splitNote: "recommended member net before Homix cap",
          capValue: "$10,000",
          capNote: "≈ $100,000 eligible commission to Homix cap",
          afterLabel: "After the Homix cap",
          result: "≈ 90%, less transaction fee",
          body: "On each eligible $100, Homix receives $10 first. The recommended 10% Team Split is then calculated from the remaining $90: $9 to the Team Leader and $81 to the Member. After the Homix cap, the Homix split stops and the transaction fee begins, but the Team Split may continue. Exact economics follow your Team Agreement.",
        },
      ],
      note: "The $500 two-year membership is prepaid and saves $76 compared with two annual $288 payments. Solo Pro and Team Leader pricing already includes the base affiliation fee. Team figures use Homix's recommended 10% Team Split; your signed Team Agreement controls the actual configuration.",
    },
    cap: {
      eyebrow: "The cap",
      title: "A finish line, not a forever split.",
      lead: "Homix company dollar accumulates from eligible commission during your individual anniversary year. Reach the Homix cap and the company percentage split stops; a Team Split is a separate ledger and may continue under your Team Agreement.",
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
          ["Team economics", "The recommended 10% Team Split is calculated from the remaining 90% agent side"],
          ["After Homix cap", "Homix's 10% stops and the transaction fee begins; Team terms continue separately"],
        ],
      },
      reset: "Caps reset on the agent's anniversary, not January 1. Outside referrals, sponsor payouts, transaction fees, and third-party charges do not create cap credit. *The approximate 90% Team Member result assumes the recommended 10% Team Split and is before the applicable transaction fee; actual Team terms may differ.",
    },
    example: {
      eyebrow: "See the math",
      title: "One $10,000 self-generated closing. Three clear outcomes.",
      lead: "This example shows a pre-cap closing with no outside referral, client rebate, or other adjustment.",
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
      title: "First identify where the business came from.",
      lead: "Source economics are taken off the top. The remaining commission then enters your Solo, Solo Pro, or Team plan.",
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
      flowTitle: "The order stays consistent",
      flow: [
        "Gross commission",
        "Source economics",
        "Homix split or 100% fee",
        "Team economics, if applicable",
        "Agent-side amount",
      ],
      note: "A team-generated lead is governed by the approved team configuration; it is not automatically treated as a Homix lead.",
    },
    transaction: {
      eyebrow: "100% commission mode",
      title: "A fixed transaction fee, never a second split.",
      lead: "The transaction fee applies only to Solo Pro and post-cap closings. If a closing still generates the normal 15% or 10% Homix company dollar, no transaction fee is added.",
      checkLabel: "Commission check",
      fees: [
        { range: "Up to $30,000", fee: "$200" },
        { range: "$30,000.01–$100,000", fee: "$500" },
        { range: "Over $100,000", fee: "$1,000" },
      ],
      principle: "Split or transaction fee",
      detail: "One closing creates one Homix transaction fee, even when co-agents, a Team Leader, or an outside referral share the commission. The tier is determined by the full Homix commission check.",
    },
    sponsor: {
      eyebrow: "Sponsor reward",
      title: "Bring the right people. Share in the growth.",
      lead: "Under the current plan, a sponsor may receive a Lifetime Referral equal to 10% of eligible Homix-owned revenue generated by the agent they introduce.",
      value: "10%",
      valueLabel: "Lifetime Referral on eligible Homix-owned revenue",
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
      note: "Sponsor and Team Leader are separate roles; one person may be both. Sponsor payouts never reduce an agent's cap credit or agent-side commission. “Lifetime” describes the current program's referral relationship while all eligibility, good-standing, active-status, and signed-agreement requirements remain satisfied; it is not guaranteed income.",
      alt: "Homix advisors celebrating a training milestone in the office",
    },
    platform: {
      eyebrow: "Beyond the split",
      title: "Clear economics. A platform built to make them count.",
      lead: "A commission plan matters only if you can build production behind it. Homix pairs transparent economics with bilingual coaching, real deal review, an in-house content studio, and practical AI and data tools.",
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
      title: "Read the fine print without needing a spreadsheet.",
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
      title: "Choose the structure. Build the business.",
      lead: "We will walk through your production, team goals, and lead mix, then show you exactly how the plan applies before you make a decision.",
      primary: "Apply to join Homix",
      secondary: "Explore agent training",
    },
  },
  zh: {
    meta: {
      title: "地产经纪人佣金分成与封顶方案",
      description:
        "比较 Homix Realty 的 Solo、Solo Pro 与 Team 佣金方案，清楚了解经纪人实际保留比例、公司年度封顶、团队分成、Transaction Fee、客源费与 Sponsor 奖励。",
    },
    hero: {
      eyebrow: "Homix 佣金与成长方案",
      title: "业务越成熟，留给自己的越多。",
      lead: "独立发展、从第一单进入 100%，或加入团队——先看你实际保留多少，再看公司封顶、封顶后规则与客源费用。",
      primary: "比较三种方案",
      secondary: "申请加入 Homix",
      alt: "Homix 房地产经纪人团队在工作室合影",
    },
    plans: {
      eyebrow: "选择发展路径",
      title: "先看你实际保留多少。",
      lead: "以下百分比显示达到 Homix Cap 前，Agent 或 Team Member 实际保留的部分。方案由你选择；只有客源来自 Homix 或外部 referral 时，才会先处理对应的客源经济规则。",
      annualFee: "会员费用",
      commission: "你实际保留",
      cap: "Homix 公司年度封顶",
      items: [
        {
          tag: "独立发展",
          name: "Solo",
          audience: "适合希望固定成本低、封顶目标清晰的独立经纪人。",
          fee: "$288 / 年",
          feeNote: "或一次预付 $500 / 两年",
          split: "85%",
          splitNote: "Homix 公司分成：15%",
          capValue: "$12,000",
          capNote: "约 $80,000 可计入封顶的佣金即可达到",
          afterLabel: "达到 Homix Cap 后",
          result: "100% 佣金，另收 Transaction Fee",
          body: "封顶前，每 $100 可计入封顶的佣金中，你保留 $85，Homix 获得 $15。达到 Homix Cap 后，当个周年年度不再收取百分比分成。",
        },
        {
          tag: "高产经纪人",
          name: "Solo Pro",
          audience: "适合希望从第一单就确定采用 100% 模式的成熟经纪人。",
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
          audience: "适合希望获得 Team Leader、共同培训与团队基础设施支持的经纪人。",
          fee: "$288 / 年",
          feeNote: "或一次预付 $500 / 两年",
          split: "约 81%",
          splitNote: "推荐配置下，Homix 封顶前 Member 实际比例",
          capValue: "$10,000",
          capNote: "约 $100,000 可计入封顶的佣金即可达到",
          afterLabel: "达到 Homix Cap 后",
          result: "约保留 90%，另收 Transaction Fee",
          body: "每 $100 可计入封顶的佣金中，Homix 先获得 $10；推荐的 10% Team Split 再从剩余 $90 中计算，即 Team Leader 获得 $9，Member 保留 $81。达到 Homix Cap 后，Homix 的 10% 停止并改收 Transaction Fee，但 Team Split 可能继续；最终以你的 Team Agreement 为准。",
        },
      ],
      note: "$500 两年方案为一次预付，比连续两年各付 $288 节省 $76。Solo Pro 与 Team Leader 的 $3,650 已包含基础 affiliation fee。Team 数字采用 Homix 推荐的 10% Team Split，实际配置以已签署的 Team Agreement 为准。",
    },
    cap: {
      eyebrow: "年度封顶",
      title: "分成有终点，不会无限持续。",
      lead: "每位经纪人以自己的入职周年年为周期，可计入封顶的佣金会持续产生 Homix Company Dollar。达到 Homix Cap 后，公司百分比分成停止；Team Split 使用独立账本，仍可能按 Team Agreement 继续。",
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
          ["Team economics", "推荐的 10% Team Split 从剩余 90% Agent Side 中计算"],
          ["Homix 封顶后", "Homix 的 10% 停止并改收 Transaction Fee；团队条款继续独立执行"],
        ],
      },
      reset: "Cap 按个人入职周年重置，不是每年 1 月 1 日。Outside referral、Sponsor payout、Transaction Fee 与第三方费用都不会形成 Cap credit。*约 90% 的 Team Member 结果以推荐的 10% Team Split 为前提，且尚未扣除适用的 Transaction Fee；实际团队条款可能不同。",
    },
    example: {
      eyebrow: "直接看数字",
      title: "同一笔 $10,000 自有客源佣金，三种清晰结果。",
      lead: "以下假设该笔成交仍在封顶前，且没有 outside referral、客户 rebate 或其他调整。",
      items: [
        {
          name: "Solo",
          amount: "$8,500",
          label: "Agent Side",
          detail: "$1,500 累计进入 Solo Cap。",
        },
        {
          name: "Solo Pro",
          amount: "$9,800",
          label: "Agent Side",
          detail: "commission check 不超过 $30,000，对应 $200 Transaction Fee。",
        },
        {
          name: "Team Member",
          amount: "$8,100",
          label: "Member Side",
          detail: "Homix 先获得 $1,000，再从剩余 $9,000 中分给 Team Leader $900：Member 81% / Team Leader 9% / Homix 10%。",
        },
      ],
      disclaimer: "以上为解释结构的示例金额，尚未扣除税费与日常经营支出。Team 实际结果以 approved team configuration 为准。如存在 Sponsor payout，该金额来自 eligible Homix revenue，不会减少此处展示的 Agent Side。",
    },
    source: {
      eyebrow: "客源来源",
      title: "第一步，先确认这笔业务从哪里来。",
      lead: "客源相关费用先从总佣金顶部处理，剩余佣金才进入 Solo、Solo Pro 或 Team 方案。",
      items: [
        {
          name: "Self-generated",
          value: "0%",
          body: "没有客源费，全部 eligible commission 直接进入你的方案。",
        },
        {
          name: "Homix 出租客源",
          value: "15%",
          body: "先扣 Homix Lead Fee，剩余佣金再进入你的方案。",
        },
        {
          name: "Homix 买卖客源",
          value: "25%",
          body: "先扣 Homix Lead Fee，剩余佣金再进入你的方案。",
        },
        {
          name: "Outside referral",
          value: "按协议",
          body: "先依照已签 referral agreement 支付，再进入方案计算。",
        },
      ],
      flowTitle: "计算顺序始终一致",
      flow: [
        "Gross commission",
        "客源经济规则",
        "Homix Split 或 100% Fee",
        "Team economics（如适用）",
        "Agent Side",
      ],
      note: "Team-generated lead 按 approved team configuration 执行，不会自动被视作 Homix lead。",
    },
    transaction: {
      eyebrow: "100% 佣金模式",
      title: "收固定 Transaction Fee，不再叠加第二层分成。",
      lead: "Transaction Fee 只适用于 Solo Pro 与封顶后的成交。只要某笔成交仍产生正常的 15% 或 10% Homix Company Dollar，就不会再加收 Transaction Fee。",
      checkLabel: "Commission Check 金额",
      fees: [
        { range: "不超过 $30,000", fee: "$200" },
        { range: "$30,000.01–$100,000", fee: "$500" },
        { range: "超过 $100,000", fee: "$1,000" },
      ],
      principle: "Split 或 Transaction Fee，二选一",
      detail: "同一笔成交即使包含 co-agent、Team Leader 或 outside referral，也只产生一次 Homix Transaction Fee。收费档位以 Homix 收到的整张 commission check 为准。",
    },
    sponsor: {
      eyebrow: "Sponsor 奖励",
      title: "介绍对的人，也能分享长期成长。",
      lead: "在当前方案下，Sponsor 可获得 Lifetime Referral，金额为其介绍经纪人所产生的 eligible Homix-owned revenue 的 10%。",
      value: "10%",
      valueLabel: "eligible Homix-owned revenue 的 Lifetime Referral",
      eligibleTitle: "计入范围",
      eligible: [
        "Solo 或 Team 产生的 Company Dollar",
        "Homix 出租与买卖 Lead Fee",
        "Solo 与 Team Member affiliation fee",
        "Solo Pro 年费或符合条件的升级实付金额",
      ],
      excludedTitle: "不计入范围",
      excluded: [
        "Homix Transaction Fee",
        "支付给外部的 referral pass-through",
        "客户 rebate 或 credit",
        "MLS、协会、政府、税费与第三方费用",
      ],
      note: "Sponsor 与 Team Leader 是两个独立角色，同一人可以兼任。Sponsor payout 不会减少经纪人的 Cap credit 或 Agent Side。“Lifetime”指在当前项目下，只要资格、active status、good standing 与已签协议要求始终满足，该 referral relationship 可持续；并不构成收入保证。",
      alt: "Homix 经纪人在办公室庆祝培训里程碑",
    },
    platform: {
      eyebrow: "分成之外",
      title: "经济规则讲清楚，平台再把它放大。",
      lead: "只有持续做出 production，佣金方案才真正有意义。Homix 在透明结构之外，还提供双语带教、真实交易复盘、自有内容工作室，以及实用的 AI 与数据工具。",
      items: [
        "围绕纽约真实交易设计的 Buyer 与 Listing Boot Camp",
        "线下带教、圆桌复盘与专业嘉宾专题课",
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
      title: "不用打开 Excel，也能看懂细则。",
      items: [
        {
          q: "年度 Cap 到底是什么？",
          a: "Cap 是每个入职周年年内，正常分成最多为 Homix 产生的 Company Dollar：Solo 为 $12,000，约需 $80,000 可计入封顶的佣金；Team Member 为 $10,000，约需 $100,000 可计入封顶的佣金。达到后，当年剩余时间停止 Homix 百分比分成；Team Split 独立计算，仍可能继续。",
        },
        {
          q: "Split 和 Transaction Fee 会同时收吗？",
          a: "不会。核心规则是 Split 或 Transaction Fee 二选一。封顶前的 Solo 与 Team 成交产生 Company Dollar，不收 Transaction Fee；Solo Pro 与封顶后的成交改按 Transaction Fee 表执行。",
        },
        {
          q: "Team Split 是 Homix 的第二层分成吗？",
          a: "不是。Homix 先获得 10% Company Dollar，Team Split 再从剩余 90% Agent Side 中独立计算。采用推荐的 10% Team Split 时，每 $100 中 Member 获得 $81、Team Leader 获得 $9、Homix 获得 $10。获批的 Team preset 与任何 optional Team Cap 都会写入已签署的 Team Agreement。",
        },
        {
          q: "Team 的 $10,000 Cap 更低，是不是更快拿到 100%？",
          a: "不是。Team 的 Homix Cap 按 10% 累计，因此约需 $100,000 可计入封顶的佣金才能达到 $10,000；Solo 按 15% 累计，约 $80,000 即达到 $12,000。Team 达到 Homix Cap 后，Homix 的 10% 停止，但 Team Split 通常继续；按推荐配置，Member 会从约 81% 变为约 90%，不是 100%，并另收适用的 Transaction Fee。",
        },
        {
          q: "中途升级 Solo Pro 怎么计算？",
          a: "支付 $288 或 $500 基础 affiliation fee 后 90 天内升级，可将该笔基础费用全额抵扣 $3,650 Solo Pro 年费；超过 90 天则不再抵扣。升级日起重新开始 12 个月 Solo Pro term，不现金退款，也不按月 prorate。",
        },
        {
          q: "暂不做单、只保留牌照也用基础会员费吗？",
          a: "经批准的 Holding 或 Non-Producing status 同样采用 $288 一年或 $500 两年的基础 affiliation pricing。可从事的活动与资格仍以适用协议、公司政策及纽约州法律为准。",
        },
        {
          q: "公司客源、Sponsor 收入或最终收入有保证吗？",
          a: "没有。客源数量、成交结果、Sponsor 资格与收入都会变化。本页不是 earnings claim 或收入保证，实际 compensation 以已签协议和每笔交易事实为准。",
        },
      ],
    },
    disclosure: {
      title: "重要方案说明",
      body: "本页是便于理解的摘要，不构成 independent contractor agreement 或任何 compensation 承诺。实际佣金以已签署的 Homix 协议、Team Agreement、referral 或 lead-source 文件、交易事实、公司政策及适用法律为准。在协议与法律允许范围内，方案资格、费用、Cap 与项目条款可能调整。所有金额仅为解释结构的示例，不包含税费与日常经营成本；相关成本可能包括牌照、MLS 或协会会费、保险、营销及第三方费用。",
    },
    cta: {
      eyebrow: "找到适合你的路径",
      title: "选定结构，然后把业务做起来。",
      lead: "我们会和你一起看 production、团队目标与客源结构，并在你做决定前逐项说明方案如何落到你的实际业务上。",
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

              <div className="mt-8 flex items-end gap-4 border-y border-line py-6">
                <p className="font-serif text-6xl tabular-nums text-bronze">{content.sponsor.value}</p>
                <p className="max-w-48 pb-1 text-sm leading-snug text-muted">{content.sponsor.valueLabel}</p>
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
