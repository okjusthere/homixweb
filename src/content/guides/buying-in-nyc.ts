import type { Guide } from "./types";

/**
 * Buying pillar guide — the definitive zh-first NYC home-buying walkthrough.
 * Every figure is sourced verbatim from the linked journal posts:
 * - Timeline / closing sequence & taxes: nyc-closing-process-step-by-step
 * - Buyer closing-cost line items & 2%–5% ballpark: nyc-closing-costs-explained
 * - Co-op vs condo ownership mechanics: coop-vs-condo-nyc
 * - Co-op board bar (DTI, liquidity, down payment) + 2026 timeline law:
 *   passing-a-coop-board-nyc
 * - Mortgage roadmap (DTI, down-payment myth, FHA/SONYMA, loan limits):
 *   first-time-buyer-mortgage-roadmap
 * - Rates, buying power, P&I table, Fed context: interest-rates-fed-buying-power
 * - Order-of-operations framing: first-time-buyer-guide-nyc
 * Tax/legal/finance content stays general-information; the template renders the
 * not-advice disclaimer, so it is not hard-coded per section.
 */
export const buyingGuide: Guide = {
  slug: "buying-in-nyc",
  title: {
    zh: "纽约买房完整指南——流程、成本与时间线",
    en: "The Complete Guide to Buying a Home in New York",
  },
  description: {
    zh: "从预批、找房、出价、律师审约、贷款到过户拿钥匙，把纽约买房的完整流程、真实成本和各阶段时间线一次讲清楚。含 Condo / Co-op / 联排关键差异对照、买方过户成本明细（含豪宅税阈值）、Co-op 董事会审核标准，以及常见的坑与时间预期——为纽约华人买家准备的一站式买房指南。",
    en: "From pre-approval, home search, offer, attorney review, and mortgage to closing and keys — the full NYC buying process, real costs, and stage-by-stage timeline in one place. Includes a condo/co-op/townhouse comparison, a buyer's closing-cost breakdown (with the mansion-tax threshold), the co-op board's financial bar, and the common pitfalls and timing to expect — a one-stop buying guide for New York's Chinese community.",
  },
  intro: {
    zh: "在纽约买房，和在国内、甚至和美国其他城市都不一样。这里是一个「律师州」：报价被接受不等于成交，真正让交易生效的是双方律师认可的书面合同；而如果你买的是 co-op（合作公寓），你买到的根本不是不动产，而是一家公司的股份——还要过得了大楼董事会那一关。从卖家接受报价到你拿到钥匙，纽约市一笔典型交易通常要 **60 到 90 天**。\n\n这份指南把整条路一次走通：先给你一张各阶段的**时间线**，再依次讲清预算与贷款（预批、利率与购买力）、Condo / Co-op / 联排的关键差异、从出价到签约、买方的**过户成本明细**（含豪宅税阈值）、Co-op 董事会审核怎么过，最后是常见的坑与真实的时间预期。想先粗算月供和总成本，可以随时打开我们的[买房计算器](/calculator)；找一位[中英双语经纪人](/chinese-real-estate-agents-nyc)全程陪你，能让每个节点都不至于手忙脚乱。\n\n文中所有数字都逐一来自我们标注了来源与时点的置业文章——利率、税率和法规都会变化，涉及税务、法律与贷款的内容均为一般性信息，具体请以你的律师、贷款机构和税务专业人士的意见，以及行动当时的现行规则为准。",
    en: "Buying a home in New York is unlike buying one back home — or even in most other U.S. cities. This is an \"attorney state\": an accepted offer is not a done deal; what makes a transaction binding is a written contract both sides' lawyers approve. And if you buy a co-op, you are not buying real property at all — you are buying shares in a corporation, and you must also clear the building's board. From accepted offer to keys, a typical NYC purchase runs about **60 to 90 days**.\n\nThis guide walks the whole path once, in order: first a stage-by-stage **timeline**, then budget and financing (pre-approval, rates, and buying power), the condo/co-op/townhouse differences that matter, going from offer to signed contract, the buyer's **closing-cost breakdown** (including the mansion-tax threshold), how to pass a co-op board, and finally the common pitfalls and realistic timing. To rough out a monthly payment and total cost at any point, open our [buying calculator](/calculator); working with a [bilingual (Chinese/English) agent](/chinese-real-estate-agents-nyc) keeps every deadline from becoming a scramble.\n\nEvery figure here traces back to our journal posts, each of which notes its source and as-of date. Rates, tax rates, and rules change; anything touching tax, law, or financing is general information — rely on your attorney, lender, and tax professional, and on the rules in force when you act.",
  },
  updated: "2026-07-07",
  cover: "https://wnshsoxtxkfbphglyvmj.supabase.co/storage/v1/object/public/agent-photos/site-media/journal/covers/apartment-building.jpg",
  sections: [
    {
      heading: {
        zh: "一、买房全流程时间线（60–90 天）",
        en: "1. The Full Timeline (60–90 Days)",
      },
      body: {
        zh: "先看全景。纽约市一笔典型交易，从卖家接受报价到你拿到钥匙，大致 **60 到 90 天**。整个过程是有迹可循的，按下面的顺序推进：\n\n1. **预批（找房之前）**——先向贷款机构拿到书面预批，知道自己的真实购房上限。预批信通常有效期 **60 到 90 天**。\n2. **找房与看房**——带着必备清单和预算有针对性地看，两三套精选胜过十套漫游。\n3. **出价（offer）**——在纽约，接受报价**不具约束力**，什么都还没定。\n4. **律师审约与签约（第 1–2 周）**——卖方律师起草买卖合同，你的律师审阅、谈判并做尽职调查；双方满意后签字，你通常电汇约 **10%** 的合同定金到卖方律师托管账户，这一刻你才真正「进入合同」。\n5. **贷款承诺与产权/留置权调查（第 3–6 周）**——正式申请贷款、等待**贷款承诺函**；同时产权公司（condo/独立屋）或律师（co-op 留置权调查）核查权属。\n6. **Co-op 董事会审核（第 4–8 周，仅 co-op）**——准备董事会材料包、面试、投票；condo 通常只需一份更快的优先购买权放弃书。\n7. **结算披露与验房（第 8–12 周）**——有贷款者须在成交前**至少三个工作日**拿到结算披露书（Closing Disclosure）；过户前 24–48 小时做**最终验房**。\n8. **过户当天**——签署文件、款项划付、契据或股票凭证易手，拿到钥匙。\n\n一条主线：**condo 通常更快**（跳过董事会），**co-op 更慢但过户桌上往往更省钱**。想看某类流程的完整细节，读[《纽约买房过户全流程》](/journal/nyc-closing-process-step-by-step)。",
        en: "Start with the big picture. A typical NYC purchase runs about **60 to 90 days** from accepted offer to keys. The sequence is predictable and moves in this order:\n\n1. **Pre-approval (before you shop)** — get a written pre-approval so you know your real ceiling. The letter is usually valid **60 to 90 days**.\n2. **Search and tour** — go in with a must-have list and a budget; two or three curated showings beat ten random ones.\n3. **Offer** — in New York, an accepted offer is **not binding**; nothing is settled yet.\n4. **Attorney review and signing (weeks 1–2)** — the seller's attorney drafts the contract of sale; yours reviews, negotiates, and runs due diligence. When both sides are satisfied you sign and typically wire a contract deposit of about **10%** into the seller attorney's escrow — the moment you are truly \"in contract.\"\n5. **Mortgage commitment and title/lien work (weeks 3–6)** — you formally apply and await the **mortgage commitment letter**; in parallel a title company (condo/house) or your attorney (co-op lien search) confirms clean ownership.\n6. **Co-op board review (weeks 4–8, co-ops only)** — assemble the board package, interview, and vote; a condo usually needs only a faster waiver of the right of first refusal.\n7. **Closing Disclosure and walkthrough (weeks 8–12)** — if financing, you must receive the Closing Disclosure **at least three business days** before closing; do the **final walkthrough** 24–48 hours out.\n8. **Closing day** — sign documents, funds disburse, the deed or stock certificate changes hands, and you get the keys.\n\nThe throughline: **condos usually close faster** (no board), while **co-ops take longer but often cost less at the table**. For the full detail of each step, read [The NYC Home Closing Process, Step by Step](/journal/nyc-closing-process-step-by-step).",
      },
    },
    {
      heading: {
        zh: "二、预算与贷款：预批、利率与购买力",
        en: "2. Budget and Financing: Pre-approval, Rates, Buying Power",
      },
      body: {
        zh: "**从预批开始，而不是从房源开始。** 预批（pre-approval）是贷款机构在真实审核你的收入、资产、负债和信用后，出具的书面放贷额度估算，比只凭口头信息的「预资格」（pre-qualification）更有分量。竞争激烈时，很多卖家不看没有预批的报价；它也在你爱上超预算的房子之前先告诉你上限。准备好工资单、W-2 或报税表、银行对账单，并同意查信用。\n\n**贷款机构最盯的数字是债务收入比（DTI）**：每月债务总支出（新房贷 + 车贷、学贷、信用卡最低还款）÷ 税前月收入。你或许听过「43% 规则」，但 CFPB 多年前已用基于定价的标准取代了这一硬性上限；实践中许多顺利获批的情形落在 **36%–45%** 区间。务实结论：**申请前还掉一张信用卡或一笔车贷，对购买力的提升往往胜过其他任何动作。**\n\n**利率决定你的月供和总购买力。** 根据房地美（Freddie Mac）调查，**截至 2026 年 6 月 25 日，30 年固定利率平均为 6.49%**，15 年固定为 5.84%（一年前 30 年期为 6.77%）。注意：**美联储并不直接设定房贷利率**——2026 年 6 月 17 日它将联邦基金利率维持在 3.50%–3.75%，而长期房贷利率跟随 10 年期国债收益率，可能与美联储不同步。\n\n利率对月供的分量，看这张「每借 10 万美元、30 年固定、每月本息（P&I）」表（不含房产税、保险、公共费）：\n\n| 利率 | 每借 $100k 月供（本+息） |\n|------|--------------------------|\n| 5.0% | 约 $537 |\n| 6.0% | 约 $600 |\n| 6.5% | 约 $632 |\n| 7.0% | 约 $665 |\n\n在 50 万贷款上，6.5% 与 7.0% 每月相差约 **$165**，一年约 $2,000，整个周期近 $60,000。反过来，若你的预算上限是固定月供，**利率越高，能贷到的额度越小**——同样的工资，7% 买到的房子比 6% 小。把利率换算成月供和额度，用我们的[买房计算器](/calculator)；想更深入了解利率机制，读[《利率与美联储》](/journal/interest-rates-fed-buying-power)与[《首次购房者的贷款全流程》](/journal/first-time-buyer-mortgage-roadmap)。",
        en: "**Start with pre-approval, not listings.** A pre-approval is a lender's written estimate of how much it will lend after a real review of your income, assets, debts, and credit — stronger than a \"pre-qualification,\" which is just a guess. In a competitive market many sellers won't take an offer without one, and it tells you your ceiling before you fall for something above it. Have pay stubs, W-2s or tax returns, and bank statements ready, and consent to a credit check.\n\n**The number lenders watch most is debt-to-income (DTI):** total monthly debt payments (the new mortgage plus car loans, student loans, credit-card minimums) divided by gross monthly income. You may have heard of a \"43% rule,\" but the CFPB replaced that hard cap years ago with a pricing-based standard; in practice many comfortable approvals sit in the **36%–45%** range. The practical takeaway: **paying down a credit card or car loan before you apply can do more for your buying power than almost anything else.**\n\n**Rates shape your payment and total buying power.** Per Freddie Mac's survey, the **30-year fixed averaged 6.49% as of June 25, 2026**, and the 15-year fixed 5.84% (a year earlier the 30-year was 6.77%). Note: **the Fed does not set mortgage rates directly** — on June 17, 2026 it held the federal funds range at 3.50%–3.75%, while long-term mortgage rates track the 10-year Treasury and can move independently.\n\nTo feel a rate's weight, here is monthly principal-and-interest per $100,000 borrowed on a 30-year fixed loan (taxes, insurance, and common charges are extra):\n\n| Rate | Monthly P&I per $100k |\n|------|-----------------------|\n| 5.0% | ~$537 |\n| 6.0% | ~$600 |\n| 6.5% | ~$632 |\n| 7.0% | ~$665 |\n\nOn a $500,000 loan, 6.5% vs. 7.0% is about **$165 a month** — roughly $2,000 a year and close to $60,000 over the loan's life. Flip it around: if your budget tops out at a fixed monthly payment, **a higher rate shrinks the loan you qualify for** — the same paycheck buys less house at 7% than at 6%. Turn rates into a payment and a loan amount with our [buying calculator](/calculator); to go deeper, read [Interest Rates and the Fed](/journal/interest-rates-fed-buying-power) and [The First-Time Buyer's Mortgage Roadmap](/journal/first-time-buyer-mortgage-roadmap).",
      },
    },
    {
      heading: {
        zh: "三、Condo vs Co-op vs 联排：关键差异对照",
        en: "3. Condo vs. Co-op vs. Townhouse: The Key Differences",
      },
      body: {
        zh: "同样挂牌价的两套纽约公寓，可能是两笔完全不同的交易。这一步的差别决定了你如何贷款、由谁审批、每月付多少、日后能否自由出租。\n\n**两种持有方式。** **Co-op（合作公寓）**卖给你的不是房子本身，而是拥有整栋楼那家公司的**股份**，附带一份针对你单元的专有租约；从历史上看，co-op 在纽约住房中占比很高，老楼尤其多。**Condo（共管公寓）**是**不动产**——你拿到属于你单元的房契和公共空间的共有权益，行为上接近纵向叠起来的独立屋；新建项目更偏向 condo。**联排别墅（townhouse）**则是你直接持有的整栋不动产，没有大楼董事会，但维护与产权调查都由你自己承担。\n\n关键差异对照：\n\n| 维度 Dimension | Co-op 合作公寓 | Condo 共管公寓 |\n|---|---|---|\n| 你买的是 What you buy | 公司股份 + 专有租约 Shares + proprietary lease | 单元不动产 Real property (deed) |\n| 审批 Approval | 董事会审批 + 面试，可拒 Board approval + interview | 多为优先购买权放弃，很少面试 Waiver of right of first refusal |\n| 首付/贷款 Down payment | 常 20% 起，25–30% 常见，部分全现金 20%+ | 通常更灵活、可更低 More flexible, often lower |\n| 每月 Monthly | maintenance（含底层贷款+房产税） Maintenance bundles taxes | common charges + 房产税另算 Common charges, taxes separate |\n| 出租 Renting | 普遍限制，甚至近乎禁止 Often restricted | 一般对出租友好 Generally rental-friendly |\n\n**怎么选？** Co-op 同样预算常能换来更大空间、以自住为主的楼；condo 胜在灵活——贷款更易、审批更轻、出租更自由，因此价格常有溢价。脱离你的财务与计划，没有谁一定更好。完整对照见[《纽约合作公寓与共管公寓》](/journal/coop-vs-condo-nyc)；co-op 审批标准见第六节。",
        en: "Two NYC apartments at the same list price can be entirely different purchases. This choice shapes how you finance, who approves you, what you pay monthly, and how freely you can rent later.\n\n**Two ways to own.** A **co-op** sells you not the apartment but **shares** in the corporation that owns the building, plus a proprietary lease for your unit; historically co-ops make up a large share of NYC housing, especially older buildings. A **condo** is **real property** — you get a deed to your unit and a fractional interest in shared spaces, behaving much like a house stacked vertically; newer construction skews condo. A **townhouse** is an entire piece of real property you hold directly — no building board, but you carry the upkeep and title work yourself.\n\nThe key differences:\n\n| Dimension | Co-op | Condo |\n|---|---|---|\n| What you buy | Shares + proprietary lease | Real property (a deed) |\n| Approval | Board approval + interview; can reject | Usually a waiver of first refusal; rarely an interview |\n| Down payment / financing | Often 20%+, 25–30% common, some all-cash | More flexible, often lower |\n| Monthly | Maintenance (bundles underlying mortgage + property tax) | Common charges + property tax billed separately |\n| Renting | Commonly restricted, sometimes near-banned | Generally rental-friendly |\n\n**How to choose?** A co-op can offer more space for the price and owner-occupied buildings; a condo wins on flexibility — easier financing, lighter approval, freer renting — which is why it often carries a price premium. Neither is better in the abstract; the right answer follows your finances and plans. See the full comparison in [Co-op vs. Condo in New York](/journal/coop-vs-condo-nyc); the co-op financial bar is in section 6.",
      },
    },
    {
      heading: {
        zh: "四、从出价到签约：offer、律师审约、10% 定金",
        en: "4. From Offer to Contract: Offer, Attorney Review, 10% Deposit",
      },
      body: {
        zh: "这是最容易被误解的一段。**在纽约，卖家接受你的报价并不具约束力——什么都还没定。** 真正让交易生效的，是双方律师认可的书面买卖合同和双方签字。\n\n**第一步：出价（offer）有策略。** 价格只是报价的一部分，条款、时机和你如何呈现同样关键，在抢手地段尤其如此。一份有预批背书的报价更可信。\n\n**第二步：聘请房地产律师。** 报价被接受后，你要做的第一件事就是请律师——纽约是「律师州」，交割由买卖双方各自的律师主持。卖方律师起草买卖合同（contract of sale），你的律师审阅、谈判。\n\n**第三步：律师审约窗口 = 尽职调查。** 在这个窗口期，你的律师会：\n\n- 买 **condo / 独立屋**：审阅产权、招股说明书或楼盘财务状况；\n- 买 **co-op**：研读楼宇财务报表、董事会会议纪要、专有租约和住户规约，找出隐患——储备金不足、诉讼、即将到来的特别摊派费等。\n\n**第四步：签字 + 电汇 10% 定金。** 双方满意后你签字，并通常把**约 10%** 的合同定金电汇到**卖方律师的托管账户（escrow）**。签字这一刻，你才真正「进入合同」（in contract）。你的合同几乎都会包含**贷款条件（financing contingency）**——如果在约定日期前拿不到贷款承诺函，它能保护你的定金。\n\n把这一段做扎实，后面的贷款、审核、过户才有稳固的地基。整段的官方来源与细节见[《纽约买房过户全流程》](/journal/nyc-closing-process-step-by-step)。",
        en: "This is the most misunderstood stretch. **In New York, a seller accepting your offer is not binding — nothing is settled.** What makes a deal real is a written contract of sale both attorneys approve, plus signatures.\n\n**Step 1: offer with strategy.** Price is only part of an offer; terms, timing, and how you present matter — especially in a competitive pocket. An offer backed by a pre-approval is more credible.\n\n**Step 2: hire a real estate attorney.** The first move after your offer is accepted is retaining a lawyer — New York is an attorney state, and closings are run by both sides' attorneys. The seller's attorney drafts the contract of sale; yours reviews and negotiates it.\n\n**Step 3: the attorney-review window = due diligence.** During this window your lawyer will:\n\n- For a **condo / house**: review title and the offering plan or building financials;\n- For a **co-op**: read the building's financial statements, board minutes, proprietary lease, and house rules to flag trouble — underfunded reserves, litigation, looming assessments.\n\n**Step 4: sign and wire the ~10% deposit.** When both sides are satisfied you sign and typically wire a contract deposit of **about 10%** into the **seller attorney's escrow account**. That signature is when you are truly \"in contract.\" Your contract almost always includes a **financing contingency** that protects your deposit if you cannot secure a commitment letter by a set date.\n\nGet this stretch right and the financing, approval, and closing that follow rest on solid ground. For the sourced detail, see [The NYC Home Closing Process, Step by Step](/journal/nyc-closing-process-step-by-step).",
      },
    },
    {
      heading: {
        zh: "五、过户成本明细：买方要付哪些钱（含豪宅税阈值）",
        en: "5. Closing Costs: What the Buyer Pays (and the Mansion-Tax Threshold)",
      },
      body: {
        zh: "成交价之外，还有一叠一次性费用用来完成交易、交付钥匙。作为**粗略预算，买家常按成交价的 2% 到 5% 预留过户成本**——同时涉及房贷和豪宅税时偏上限，全款购房省去登记税时偏下限。\n\n买方常见项目：\n\n| 费用 Cost | 说明 What it is |\n|---|---|\n| 豪宅税 Mansion tax | 针对 **$1M 及以上**住宅，按全价 **1%–3.9%** 分八档累进 Tiered 1%–3.9% on $1M+ |\n| 房贷登记税 Mortgage recording tax | 按**贷款金额**计，NYC 合计约 **1.8%–1.925%**；**co-op 不收** On the loan; co-ops exempt |\n| 产权保险 Title insurance | 主要针对 condo/独立屋；co-op 做更便宜的留置权调查 Condos/houses; co-ops lien search |\n| 律师费 Attorney fees | 通常固定费用，常见几千美元 Flat fee, often a few thousand |\n| 银行/贷款费用 Lender fees | 评估、点数、申请费、银行律师 Appraisal, points, application |\n\n**两项纽约市特有费用最关键：**\n\n1. **豪宅税（Mansion Tax）**——纽约州对 **100 万美元及以上**住宅征收的一次性税，由买家支付，分八个累进档次，从 **1% 到 3.9%**。关键在于它**按全价计征**：哪怕只比 100 万门槛多一美元，也会触发整档税，可能多花几千美元。如果你的目标价位就在这条线附近，尤其要留意。\n2. **房贷登记税（Mortgage Recording Tax）**——按房贷金额征收（NYC 合计税率视贷款规模约 **1.8%–1.925%**），只有贷款时才产生。**关键差异：co-op 买家无需缴纳**，因为 co-op 贷款不是登记在不动产上的抵押。仅这一项，就可能让 co-op 的过户成本明显低于同价位 condo。\n\n**折扣点（discount points）**是可选的前期费用：一个点等于**贷款金额的 1%**（50 万贷款即 $5,000），用来买低利率；是否划算取决于你打算持有多久。\n\n所有数字都是示意，具体请让律师和贷款机构按你的房子和贷款算出真实估算。逐项拆解见[《纽约购房交易成本全解析》](/journal/nyc-closing-costs-explained)与[《纽约买房过户全流程》](/journal/nyc-closing-process-step-by-step)。",
        en: "Beyond the purchase price sits a stack of one-time costs that close the deal and transfer the keys. As a **rough budget, buyers often set aside 2% to 5% of the price** for closing costs — toward the higher end when a mortgage and mansion tax are both in play, lower for an all-cash purchase that skips the recording tax.\n\nCommon buyer line items:\n\n| Cost | What it is |\n|---|---|\n| Mansion tax | On homes **$1M+**, tiered **1%–3.9%** of the full price, in eight brackets |\n| Mortgage recording tax | On the **loan amount**, NYC combined ~**1.8%–1.925%**; **co-ops do not pay it** |\n| Title insurance | Mainly for condos/houses; co-ops do a cheaper lien search |\n| Attorney fees | Usually a flat fee, often a few thousand dollars |\n| Lender / loan fees | Appraisal, points, application, bank attorney |\n\n**Two NYC-specific items dominate:**\n\n1. **Mansion tax** — a one-time, buyer-paid New York State tax on residential purchases of **$1 million or more**, with eight progressive brackets from **1% up to 3.9%**. Critically, it applies to the **entire price**: crossing the $1M line by a single dollar triggers the whole bracket and can cost thousands. Watch this closely if your target sits near that line.\n2. **Mortgage recording tax** — charged on the mortgage amount (NYC combined runs roughly **1.8%–1.925%** depending on loan size) and only when you borrow. The key difference: **co-op buyers do not pay it**, because a co-op loan is not a recorded mortgage on real property. That one item alone can make a co-op meaningfully cheaper to close than an equivalent condo.\n\n**Discount points** are an optional upfront fee: one point equals **1% of the loan amount** ($5,000 on a $500,000 loan) to buy down your rate; whether it pays off depends on how long you keep the loan.\n\nAll figures are illustrative — have your attorney and lender turn them into a real estimate for your specific home and loan. For the line-by-line detail, see [Closing Costs in New York, Explained](/journal/nyc-closing-costs-explained) and [The NYC Home Closing Process, Step by Step](/journal/nyc-closing-process-step-by-step).",
      },
    },
    {
      heading: {
        zh: "六、Co-op 董事会审核怎么过",
        en: "6. How to Pass a Co-op Board",
      },
      body: {
        zh: "在纽约，签了合同只算走完一半路——买 co-op 还得过大楼董事会这一关。好消息是：董事会很好预测，他们要的是财务稳健、不爱惹事的业主。\n\n**董事会材料包（board package）**是一本厚卷宗（通常做成 PDF 经物业提交），核心内容全市相当一致：填好的购买申请表和该楼的 **REBNY 财务报表**（一页纸概括资产、负债、收入、月支出，董事会最先看的数字）、**近两年联邦报税表**（连同附表和 W-2）、近期工资单和在职证明信、银行/券商/退休账户对账单，以及**推荐信**（一般两三封个人、一两封专业，外加现房东和雇主各一封），再加已签署的买卖合同副本和贷款承诺函。**准确比漂亮更重要**——财务报表与底层对账单对不上，是最容易被退回补料、白白拖几周的原因。\n\n**决定申请的两个数字：**\n\n| 指标 Metric | 董事会常见预期 Common board expectation (2026) |\n|---|---|\n| 首付 Down payment | 最低 20%；25–30% 常见；部分全现金 20% min; 25–30% common |\n| 最高贷款比例 Max financing | 房价的 70%–80% 70–80% of price |\n| 负债收入比 DTI | 约 25%–28% 或更低 ~25–28% or lower |\n| 交割后流动性 Post-closing liquidity | 12–24 个月的月供 + 管理费 12–24 months |\n\n注意：董事会的 DTI 门槛（约 **25%–28%**）常比银行更严——银行可能在 40% 以上还放你过，保守的董事会却未必。**交割后流动性**指付完首付和过户费后手里剩的现金及类现金，董事会常要求覆盖 **1 到 2 年**的月供加管理费。\n\n**面试**一般 15–45 分钟，考的是「合不合得来」：像面试工作那样穿着、提前到、问什么答什么、别主动提装修或转租打算。要知道董事会**有权以任何理由甚至不给理由拒绝**财务合格的申请人，但**不得**基于《公平住房法》与《纽约市人权法》禁止的事由（种族、原国籍、宗教、家庭状况、残障、移民身份等）拒绝你。\n\n**2026 年新规：** 一部《合作公寓申请时限法》自 **2026 年 7 月 28 日**起，对该日及之后的申请生效——董事会须在 **15 天**内确认收件或要求补料，并在收到完整申请后 **45 天**内决定，逾期将被罚款（据报约 $1,000 起）；少于 10 个单元的楼等可豁免。它**不**强制董事会说明理由，但终于给流程「上了闹钟」。完整拆解见[《Co-op 董事会审批》](/journal/passing-a-coop-board-nyc)。",
        en: "In New York, signing the contract is only half the deal — a co-op purchase must also clear the building's board. The good news: boards are predictable, and they want financially stable, low-drama owners.\n\nThe **board package** is a thick binder (usually a PDF submitted through the managing agent), and its core is remarkably consistent citywide: a completed purchase application and the building's **REBNY financial statement** (a one-page snapshot of assets, liabilities, income, and monthly expenses — the number boards read first), **two years of federal tax returns** (with schedules and W-2s), recent pay stubs and an employment letter, bank/brokerage/retirement statements, and **reference letters** (typically two or three personal, one or two professional, plus current landlord and employer), along with the executed contract and your mortgage commitment letter. **Accuracy beats polish** — a financial statement that doesn't reconcile with the underlying statements is the fastest way to get bounced back for \"additional information\" and lose weeks.\n\n**Two numbers decide most applications:**\n\n| Metric | Common board expectation (2026) |\n|---|---|\n| Down payment | 20% minimum; 25–30% common; some all-cash |\n| Max financing | 70–80% of the purchase price |\n| Debt-to-income | ~25–28% or lower |\n| Post-closing liquidity | 12–24 months of mortgage + maintenance |\n\nNote the board's DTI bar (~**25–28%**) is often stricter than a lender's — a bank may approve you above 40%, a conservative board may not. **Post-closing liquidity** is the cash and near-cash left after your down payment and closing costs; boards commonly require enough to cover **one to two years** of mortgage-and-maintenance.\n\nThe **interview** runs 15–45 minutes and is about fit: dress and arrive like a job interview, answer what's asked briefly, and don't volunteer renovation or sublet plans. Know that a board **can reject** a financially qualified applicant **for any reason, or none**, but it **cannot** reject you on a basis barred by the Fair Housing Act and NYC Human Rights Law (race, national origin, religion, familial status, disability, immigration status, and more).\n\n**A 2026 change:** a Cooperative Application Timeline Law takes effect **July 28, 2026**, applying to applications submitted on or after that date — the board must acknowledge or request missing items within **15 days** and decide within **45 days** of a complete application, with fines (reportedly around $1,000) for missing the deadline; buildings with fewer than 10 units, among others, are exempt. It does **not** force boards to give reasons, but it finally puts a clock on the process. For the full walkthrough, see [Passing a Co-op Board](/journal/passing-a-coop-board-nyc).",
      },
    },
    {
      heading: {
        zh: "七、首付与首次购房者项目：FHA 与 SONYMA",
        en: "7. Down Payment and First-Time-Buyer Programs: FHA and SONYMA",
      },
      body: {
        zh: "「首付必须 20%」是个误解，它让许多本可购房的人白白徘徊在门外。你通常需要得更少：\n\n| 贷款类型 Loan type | 常见最低首付 Typical minimum down |\n|---|---|\n| FHA（信用分 580+） FHA (score 580+) | 3.5% |\n| FHA（信用分 500–579） FHA (500–579) | 10% |\n| 常规贷款 Conventional | 常低至 3%–5% Often 3%–5% |\n\n常规贷款首付低于 20% 时，通常需付**私人按揭保险（PMI）**，随着净值积累可取消；FHA 贷款有自己的按揭保险（前期保费 + 按月年度保费），往往伴随贷款全程直到再融资。来自家人的首付赠与款一般允许，但需规范文件。\n\n**贷款额度也很关键。** 2026 年，常规贷款与更大额「巨额贷款」（jumbo）之间的基准上限为 **$832,750**，在高成本地区（含纽约都会区）升至 **$1,249,125**；FHA 在高成本地区的 2026 年上限同样为 **$1,249,125**。\n\n两个项目为首次购房者承担最重的活：\n\n- **FHA 贷款**（联邦住房管理局承保）——正是为首付少、信用薄的买家而设，580 分即可首付 3.5%；代价是按揭保险常伴随全程。\n- **SONYMA（纽约州按揭署）**——为首次购房者提供低于市场利率的固定利率贷款，并搭配首付援助。其首付援助贷款 **DPAL** 是一笔**零利率、可豁免、无需按月还款**的二次贷款，持有满 **10 年**后豁免；金额取 **$3,000 与房价 3% 中的较高者，上限 $15,000**。借款人需以现金贡献至少房产价值的 **1%**（co-op 及 3–4 户住宅为 3%），带 DPAL 通常使利率上浮约 **0.40%**。SONYMA 仅限自住主房，**各县有不同的区域收入上限**；另有增强版 DPAL Plus。条款请直接向 SONYMA 核实。\n\n**利率锁定（rate lock）**在约定窗口（常见 30–60 天）冻结利率，防止过户前上行；申请后三个工作日内你会拿到**贷款估算表（Loan Estimate）**，用它比较多家报价。完整七步贷款流程见[《首次购房者的贷款全流程》](/journal/first-time-buyer-mortgage-roadmap)。（Homix 是持牌纽约房地产经纪机构，并非贷款机构。）",
        en: "\"You need 20% down\" is a myth that keeps qualified buyers on the sidelines. You generally need less:\n\n| Loan type | Typical minimum down |\n|---|---|\n| FHA (credit score 580+) | 3.5% |\n| FHA (credit score 500–579) | 10% |\n| Conventional | Often as low as 3%–5% |\n\nPut down less than 20% on a conventional loan and you'll usually pay **private mortgage insurance (PMI)**, removable later as you build equity; FHA loans carry their own mortgage insurance (an upfront premium plus a monthly annual premium) that often stays for the life of the loan until you refinance. Down-payment gift funds from family are generally allowed with proper documentation.\n\n**Loan size matters too.** For 2026, the baseline conforming loan limit (the line between conventional and a larger \"jumbo\" loan) is **$832,750**, rising to **$1,249,125** in high-cost areas — which includes the New York City metro. FHA's 2026 high-cost ceiling is likewise **$1,249,125**.\n\nTwo programs do the heaviest lifting for first-time buyers:\n\n- **FHA loans** (insured by the Federal Housing Administration) exist for buyers with smaller down payments or thinner credit — 3.5% down at a 580 score; the trade-off is mortgage insurance that often lasts the life of the loan.\n- **SONYMA** (the State of New York Mortgage Agency) offers below-market fixed-rate mortgages to first-time buyers with down-payment help. Its **DPAL** is a **zero-interest, forgivable** second loan with **no monthly payments**, forgiven after **10 years** of ownership; the amount is the greater of **$3,000 or 3% of the price, capped at $15,000**. Borrowers contribute at least **1%** of the property's value in cash (3% for co-ops and 3–4 family homes), and a DPAL typically adds about **0.40%** to the rate. SONYMA is for primary residences only, and **regional income limits apply and vary by county**; an enhanced DPAL Plus exists too. Verify current terms directly with SONYMA.\n\nA **rate lock** freezes your rate for a set window (commonly 30–60 days) against a rise before closing; within three business days of applying you'll get a **Loan Estimate** to compare offers. For the full seven-station financing path, see [The First-Time Buyer's Mortgage Roadmap](/journal/first-time-buyer-mortgage-roadmap). (Homix is a licensed New York real estate brokerage, not a lender.)",
      },
    },
    {
      heading: {
        zh: "八、常见的坑与时间预期",
        en: "8. Common Pitfalls and What to Expect on Timing",
      },
      body: {
        zh: "把整条路走完后，最后提醒几个最容易踩的坑和最现实的时间预期。\n\n**时间预期。** 一笔典型的纽约市交易大致这样推进：签约与付定金（第 1–2 周）、贷款承诺 + 产权/留置权调查（第 3–6 周）、co-op 董事会材料与审批（第 4–8 周），再到结算披露、验房、过户（第 8–12 周）。**condo 通常更快，co-op 更慢但过户桌上往往更省钱。** 董事会审批中，凑齐推荐信和对账单往往是最慢的环节，材料早备齐能省下好几周。\n\n**常见的坑：**\n\n1. **以为「接受报价」就等于成交。** 在纽约，签合同前什么都不算数——别在签约前停止看其他房子。\n2. **核保阶段「晃船」。** 从申请到过户之间，**不要**换工作、新开信用卡、贷款买车，或存入无法说明来源的大额款项——任何一项都可能让你的贷款资料被重新审查。\n3. **忽略豪宅税阈值。** 目标价卡在 100 万上下时，多出一美元就触发整档豪宅税，谈价时要把这条线算进去。\n4. **只算本息、忘了「全部月成本」。** 房产税、保险、condo 公共费或 co-op 管理费都要计入——单看 P&I 会低估真实月供。\n5. **爱上一套自己资格不够的 co-op。** 出价前先摸清目标楼的首付、DTI 和流动性门槛；够不着是信息，不是失败。\n6. **等利率下降而无限观望。** 利率下降常吸引更多买家、推高房价；「利率与房价」是个权衡——你可以日后再融资改利率，却无法改成交价。\n\n**你从来不是一个人在走。** 律师、贷款机构、产权公司各管一段，你的任务是快速回应、把文件准备齐全、尽早提问。想让一位[中英双语经纪人](/chinese-real-estate-agents-nyc)把你目标街区的可比成交、真实税费和月供并排拉给你看，随时[联系我们](/contact)；先用[买房计算器](/calculator)把数字跑一遍，也读一读[《首次买家完全指南》](/journal/first-time-buyer-guide-nyc)。",
        en: "Having walked the whole path, here are the pitfalls people trip on most and the most realistic timing to expect.\n\n**Timing.** A typical NYC purchase runs roughly: contract and deposit (weeks 1–2), mortgage commitment plus title/lien work (weeks 3–6), the co-op board package and approval (weeks 4–8), then Closing Disclosure, walkthrough, and closing (weeks 8–12). **Condos generally close faster; co-ops take longer but often cost less at the table.** In board review, gathering references and statements is the slow part — having the package ready early saves weeks.\n\n**Common pitfalls:**\n\n1. **Thinking an \"accepted offer\" means a done deal.** In New York nothing is binding before the contract is signed — don't stop looking at other homes until then.\n2. **\"Rocking the boat\" during underwriting.** Between application and closing, **do not** change jobs, open a new credit card, finance a car, or make a large undocumented deposit — any of these can reopen your loan file.\n3. **Ignoring the mansion-tax threshold.** When your target hovers around $1M, a single extra dollar triggers the whole bracket — build that line into your negotiation.\n4. **Budgeting only principal and interest.** Property taxes, insurance, and condo common charges or co-op maintenance all count — P&I alone understates your true monthly cost.\n5. **Falling for a co-op you can't qualify for.** Learn a target building's down-payment, DTI, and liquidity bar before you bid; coming up short is information, not failure.\n6. **Waiting indefinitely for rates to fall.** Falling rates often draw more buyers and push prices up; rate-versus-price is a trade-off — you can refinance a rate later but can't change your purchase price.\n\n**You are never doing this alone.** Your attorney, lender, and title company each own a lane; your job is to respond fast, keep documents in order, and ask questions early. To have a [bilingual (Chinese/English) agent](/chinese-real-estate-agents-nyc) pull comparable sales, real taxes, and payments side by side for your target neighborhoods, [contact us](/contact) any time; run the numbers first with our [buying calculator](/calculator), and read [A First-Time Buyer's Guide](/journal/first-time-buyer-guide-nyc).",
      },
    },
  ],
  faq: [
    {
      question: {
        zh: "在纽约买房从头到尾要多久？",
        en: "How long does buying a home in NYC take, start to finish?",
      },
      answer: {
        zh: "从卖家接受报价到你拿到钥匙，纽约市一笔典型交易通常需要 60 到 90 天。大致节奏是：签约与付定金（第 1–2 周）、贷款承诺函与产权/留置权调查（第 3–6 周）、co-op 董事会材料与审批（第 4–8 周），然后是结算披露、最终验房和过户（第 8–12 周）。Condo 通常更快，因为跳过了董事会；co-op 更慢，但过户桌上往往更省钱。",
        en: "From the seller accepting your offer to keys in hand, a typical NYC purchase runs about 60 to 90 days. The rough rhythm is: contract and deposit (weeks 1–2), mortgage commitment and title/lien work (weeks 3–6), the co-op board package and approval (weeks 4–8), then Closing Disclosure, final walkthrough, and closing (weeks 8–12). Condos are usually faster because they skip the board; co-ops take longer but often cost less at the table.",
      },
    },
    {
      question: {
        zh: "在纽约买房，接受报价就等于成交了吗？",
        en: "Once my offer is accepted in NYC, is the deal done?",
      },
      answer: {
        zh: "不是。纽约是一个「律师州」，卖家接受你的报价并不具约束力——在双方律师认可一份书面买卖合同、双方签字之前，什么都不算数。签字时你通常还要把约 10% 的合同定金电汇到卖方律师的托管账户，这一刻你才真正「进入合同」。在签约之前，继续关注其他房源是明智的。",
        en: "No. New York is an \"attorney state,\" and an accepted offer is not binding — nothing is settled until both sides' attorneys approve a written contract of sale and both parties sign. At signing you typically also wire a contract deposit of about 10% into the seller attorney's escrow account, which is when you are truly \"in contract.\" It's wise to keep looking at other homes until you sign.",
      },
    },
    {
      question: {
        zh: "买房首付真的必须要 20% 吗？",
        en: "Do I really need a 20% down payment to buy?",
      },
      answer: {
        zh: "不一定。这是一个常见误解。FHA 贷款在信用分 580 及以上时首付可低至 3.5%（500–579 分为 10%），常规贷款首付常低至 3%–5%。首付低于 20% 时通常需付按揭保险（常规贷款为 PMI，可在积累净值后取消）。但请注意，co-op 董事会往往另有更高要求，多数要求至少 20% 首付，25%–30% 常见，部分甚至要求全现金。",
        en: "Not necessarily — this is a common myth. FHA loans allow as little as 3.5% down with a credit score of 580+ (10% for 500–579), and conventional loans often go as low as 3%–5%. Below 20% you'll usually pay mortgage insurance (PMI on conventional loans, removable once you build equity). Note, though, that co-op boards often set a higher bar of their own — most want at least 20% down, 25–30% is common, and some require all cash.",
      },
    },
    {
      question: {
        zh: "豪宅税（mansion tax）从多少钱开始征？",
        en: "At what price does the mansion tax kick in?",
      },
      answer: {
        zh: "豪宅税是纽约州对成交价达到或超过 100 万美元的住宅征收的一次性税，由买家支付，分八个累进档次，从 1% 一直到 3.9%。关键在于它按全价计征——哪怕只比 100 万门槛多一美元，也会触发整档税，可能多花几千美元。如果你的目标价位就在这条线附近，谈价时要特别把它算进去。",
        en: "The mansion tax is a one-time New York State tax on residential purchases of $1 million or more, paid by the buyer, with eight progressive brackets running from 1% up to 3.9%. Crucially it applies to the entire price — crossing the $1M line by even a single dollar triggers the whole bracket and can cost thousands. If your target price sits near that line, factor it in carefully when negotiating.",
      },
    },
    {
      question: {
        zh: "为什么说 co-op 的过户成本可能比 condo 低？",
        en: "Why can a co-op cost less to close than a condo?",
      },
      answer: {
        zh: "主要因为房贷登记税。这项税按贷款金额征收（纽约市合计税率视贷款规模约在 1.8%–1.925% 之间），但 co-op 买家无需缴纳——因为 co-op 贷款并不是登记在不动产上的抵押。此外 co-op 通常做更便宜的留置权调查而非传统产权保险。仅登记税这一项差异，就可能让 co-op 的过户成本明显低于同价位的 condo，尽管 condo 转售更容易、限制更少。",
        en: "Mainly the mortgage recording tax. That tax is charged on the loan amount (the NYC combined rate runs roughly 1.8%–1.925% depending on loan size), but co-op buyers don't pay it — a co-op loan isn't a recorded mortgage on real property. Co-ops also do a cheaper lien search instead of traditional title insurance. The recording-tax difference alone can make a co-op meaningfully cheaper to close than an equivalent condo, even though condos offer easier resale and fewer restrictions.",
      },
    },
    {
      question: {
        zh: "Co-op 董事会看重哪些财务指标？",
        en: "What financial metrics does a co-op board look at?",
      },
      answer: {
        zh: "主要看两个数字。一是负债收入比（DTI）：每月住房成本加其他债务除以税前月收入，许多董事会希望约 25%–28% 或更低，往往比银行更严。二是交割后流动性：付完首付和过户费后剩下的现金及类现金，常要求覆盖 12 到 24 个月的月供加管理费。首付方面，多数 co-op 把贷款上限设在房价的 70%–80%（即至少 20% 首付），很多楼期待 25%–30%。这些是逐楼而定的惯例，差异很大。",
        en: "Mainly two numbers. First, debt-to-income (DTI): monthly housing cost plus other debt divided by gross monthly income — many boards want roughly 25%–28% or lower, often stricter than a bank. Second, post-closing liquidity: the cash and near-cash left after your down payment and closing costs, commonly enough to cover 12 to 24 months of mortgage-plus-maintenance. On the down payment, most co-ops cap financing at 70%–80% of the price (so at least 20% down), with many expecting 25–30%. These are building-by-building practices and vary widely.",
      },
    },
    {
      question: {
        zh: "什么是 SONYMA？它能帮首次购房者什么？",
        en: "What is SONYMA, and how does it help first-time buyers?",
      },
      answer: {
        zh: "SONYMA 是纽约州按揭署，为首次购房者提供低于市场利率的固定利率贷款并搭配首付援助。其首付援助贷款 DPAL 是一笔零利率、可豁免、无需按月还款的二次贷款，持有满 10 年后豁免，金额取 3,000 美元与房价 3% 中的较高者、上限 15,000 美元。借款人需以现金贡献至少房产价值的 1%（co-op 及 3–4 户住宅为 3%），带 DPAL 通常使利率上浮约 0.40%。仅限自住主房，各县有不同收入上限，请直接向 SONYMA 核实当前条款。",
        en: "SONYMA is the State of New York Mortgage Agency, which offers below-market fixed-rate mortgages to first-time buyers paired with down-payment help. Its DPAL is a zero-interest, forgivable second loan with no monthly payments, forgiven after 10 years of ownership; the amount is the greater of $3,000 or 3% of the price, capped at $15,000. Borrowers contribute at least 1% of the property's value in cash (3% for co-ops and 3–4 family homes), and a DPAL typically adds about 0.40% to the rate. It's for primary residences only, income limits vary by county, and you should verify current terms directly with SONYMA.",
      },
    },
    {
      question: {
        zh: "利率会怎样影响我能买多大的房子？",
        en: "How does the interest rate affect how much house I can buy?",
      },
      answer: {
        zh: "利率直接决定月供，也就决定你的购买力。以 30 年固定、每借 10 万美元的每月本息为例：6.0% 约 $600，6.5% 约 $632，7.0% 约 $665。在 50 万贷款上，6.5% 与 7.0% 每月相差约 165 美元。如果你的预算上限是一个固定月供，利率越高，能贷到的额度就越小——同样的工资，7% 买到的房子比 6% 小。作为参照，房地美调查显示 30 年固定利率截至 2026 年 6 月 25 日平均为 6.49%。可用我们的买房计算器代入你的数字。",
        en: "The rate drives your monthly payment and therefore your buying power. On a 30-year fixed loan, monthly principal and interest per $100,000 borrowed runs about $600 at 6.0%, $632 at 6.5%, and $665 at 7.0%. On a $500,000 loan, 6.5% vs. 7.0% is about $165 a month. If your budget tops out at a fixed monthly payment, a higher rate shrinks the loan you qualify for — the same paycheck buys less house at 7% than at 6%. For reference, Freddie Mac's survey put the 30-year fixed at 6.49% as of June 25, 2026. Use our buying calculator to plug in your own numbers.",
      },
    },
    {
      question: {
        zh: "在核保（underwriting）阶段有哪些事绝对不能做？",
        en: "What should I avoid doing during underwriting?",
      },
      answer: {
        zh: "核保阶段的铁律是「别晃船」。在贷款申请与过户之间，不要换工作、不要新开信用卡、不要贷款买车，也不要存入一笔无法说明来源的大额款项——任何一项都可能让核保员重新审查你的资料，甚至危及贷款。这个阶段考验的是耐心：收到补件要求就尽快回应，让你的财务状况尽量「平淡无奇」，直到拿到钥匙。",
        en: "The cardinal rule of underwriting is \"don't rock the boat.\" Between loan application and closing, don't change jobs, open a new credit card, finance a car, or make a large undocumented deposit — any of these can prompt the underwriter to reopen your file and even jeopardize the loan. This stage tests patience: respond to document requests quickly and keep your finances boring until you have the keys.",
      },
    },
    {
      question: {
        zh: "2026 年的 co-op 申请新规是什么？",
        en: "What is the new 2026 co-op application rule?",
      },
      answer: {
        zh: "一部《合作公寓申请时限法》自 2026 年 7 月 28 日起生效，适用于该日及之后提交的购买申请。它要求董事会在 15 天内确认收到申请或要求补件，并在收到完整申请后 45 天内作出批准、有条件批准或拒绝的决定，逾期将被罚款（据报约 1,000 美元起）。少于 10 个单元的楼、HDFC 合作公寓和某些政府资助项目可豁免。它并不强制董事会说明拒绝理由，但终于给整个流程设定了时限。",
        en: "A Cooperative Application Timeline Law takes effect July 28, 2026, applying to purchase applications submitted on or after that date. It requires the board to acknowledge an application or request missing items within 15 days, and to approve, conditionally approve, or reject within 45 days of a complete application, with fines (reportedly around $1,000) for missing the deadline. Buildings with fewer than 10 units, HDFC co-ops, and certain government-sponsored developments are exempt. It does not force boards to give reasons for a rejection, but it finally puts deadlines on the process.",
      },
    },
  ],
  relatedSlugs: [
    "first-time-buyer-guide-nyc",
    "nyc-closing-process-step-by-step",
    "nyc-closing-costs-explained",
    "coop-vs-condo-nyc",
    "passing-a-coop-board-nyc",
    "first-time-buyer-mortgage-roadmap",
    "interest-rates-fed-buying-power",
  ],
};
