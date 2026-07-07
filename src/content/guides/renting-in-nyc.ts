import type { Guide } from "./types";

/**
 * Rental pillar guide — the first-transaction guide for 留学生/新移民 whose
 * first NYC deal is a lease. Market figures are sourced verbatim from the
 * journal post manhattan-rentals-2026; process content is general knowledge
 * stated conservatively (NY 2019 rent-law items phrased as "根据纽约州 2019 年
 * 租赁法…" with a check-current-rules caveat).
 */
export const rentingGuide: Guide = {
  slug: "renting-in-nyc",
  title: {
    zh: "纽约租房完整指南——留学生与新移民版",
    en: "The Complete NYC Rental Guide — for Students & New Arrivals",
  },
  description: {
    zh: "从看懂纽约租房市场、40 倍收入规则、没有美国信用怎么办，到申请材料、签约与入住，再到什么时候该考虑买房——为第一次在纽约租房的留学生与新移民准备的一站式指南。",
    en: "From how the NYC rental market works, the 40x income rule, and what to do without U.S. credit, to application documents, lease signing, move-in, and when to start thinking about buying — a one-stop guide for students and new arrivals signing their first NYC lease.",
  },
  intro: {
    zh: "对大多数留学生和新移民来说，在纽约做的第一笔房产交易不是买房，而是**签下第一份租约**。而纽约的租房规则和国内、和美国其他城市都不一样：房东要看「年收入是月租的 40 倍」，没有美国信用记录的申请人常常需要担保人，好房源可能上架几天就没了。\n\n这份指南把整个流程拆开讲清楚：市场怎么运作、资质怎么算、没有美国信用和收入时有哪些常见解决路径、申请要备齐哪些材料、签约时要盯住哪些条款，以及租了几年之后，什么时候该开始认真算「买还是租」这笔账。\n\n市场数字部分引用我们的[《曼哈顿租赁市场 2026》](/journal/manhattan-rentals-2026)——那篇文章标注了每个数字的来源和时点。租金、法规都会变化，本文中涉及纽约州与纽约市法规的表述均为一般性信息，请以签约时的现行法规为准。",
    en: "For most international students and new immigrants, the first real-estate transaction in New York is not a purchase — it is **signing a first lease**. And NYC's rental rules differ from those back home and from most other U.S. cities: landlords look for annual income of 40 times the monthly rent, applicants without a U.S. credit history often need a guarantor, and good listings can be gone within days.\n\nThis guide breaks the whole process down: how the market works, how qualification math is done, the common paths when you have no U.S. credit or income, what documents to prepare, which lease clauses to watch at signing, and — after a few years of renting — when it is time to seriously run the buy-vs-rent numbers.\n\nMarket figures are drawn from our post [Manhattan Rentals in 2026](/journal/manhattan-rentals-2026), which notes the source and as-of date for every number. Rents and rules change; statements about New York State and City regulations here are general information — always confirm the rules in force when you sign.",
  },
  updated: "2026-07-07",
  cover: "/journal/covers/brownstone.jpg",
  sections: [
    {
      heading: {
        zh: "纽约租房市场怎么运作",
        en: "How the NYC Rental Market Works",
      },
      body: {
        zh: "先建立三个基本认知。\n\n**第一，市场很紧，价格不低。** 根据[《曼哈顿租赁市场 2026》](/journal/manhattan-rentals-2026)引用的 Douglas Elliman / Miller Samuel 数据，2026 年 4 月曼哈顿中位租金创下 **$5,099** 的历史新高，空置率跌至 **1.55%**——六年多来最低——在租房源同比减少约 **25%**。StreetEasy 统计的中位挂牌租金在 2026 年 2 月突破 **$4,700**。要注意：**中位租金不等于你的租金**——它把开间和四居室混在一起，很多街区的开间、一居室明显低于全区中位数；皇后区、布鲁克林的许多社区（比如[法拉盛](/neighborhoods/flushing)）也提供比曼哈顿核心区更友好的价位。\n\n**第二，经纪费规则近年发生了变化。** 纽约市的 **FARE 法案（2024 年第 119 号地方法）**自 2025 年 6 月 11 日起生效，大体原则是**谁雇用经纪人，谁付经纪费**——房东通过经纪人挂牌的房源，租客通常不再支付这笔费用。历史上由租客承担的经纪费可高达一个月租金乃至年租金的 15%。但该法案仍在诉讼中，也并非所有情形都免除费用（例如你自己另请经纪人代表你时）——**签约前务必确认由谁付费、落在书面上，并以签约时的法规为准**。\n\n**第三，分清 no-fee 和 fee 房源。** 挂牌页面标注 no-fee，通常意味着租客不付经纪费（房东自租、管理公司直租，或房东承担了费用）；标注 fee 则意味着租客可能要付费。同时问清报价是**名义租金（gross）**还是扣掉免租月后的**净有效租金（net effective）**——两者可能相差几百美元，日常现金流要按名义租金规划。",
        en: "Start with three basics.\n\n**First, the market is tight and not cheap.** Per the Douglas Elliman / Miller Samuel data cited in [Manhattan Rentals in 2026](/journal/manhattan-rentals-2026), Manhattan's median rent hit a new all-time high of **$5,099** in April 2026, the vacancy rate fell to **1.55%** — the lowest in more than six years — and active listings were down roughly **25%** year over year. StreetEasy's median asking rent crossed **$4,700** in February 2026. Keep in mind: **the median is not your rent** — it blends studios with four-bedrooms, and studios and one-bedrooms in many neighborhoods sit well below the borough median. Many Queens and Brooklyn neighborhoods (such as [Flushing](/neighborhoods/flushing)) offer friendlier price points than core Manhattan.\n\n**Second, broker-fee rules changed recently.** New York City's **FARE Act (Local Law 119 of 2024)** took effect June 11, 2025. In broad terms, **whoever hires the broker pays the broker** — so when a landlord lists through an agent, the tenant generally no longer pays that fee. Historically a tenant-paid fee could run one month's rent up to 15% of annual rent. The Act is being litigated and does not erase fees in every scenario (for example, when you hire your own broker to represent you) — **confirm in writing who pays before you sign, and treat the rules in force at signing as controlling**.\n\n**Third, know no-fee vs. fee listings.** A listing marked no-fee generally means the tenant pays no broker fee (landlord-direct, management-company-direct, or the landlord absorbs it); a fee listing means the tenant may owe one. Also ask whether a quoted price is **gross rent** or **net effective rent** (averaged after free months) — the two can differ by hundreds of dollars, and your monthly budget should be built on the gross number.",
      },
    },
    {
      heading: {
        zh: "资质要求：40 倍收入规则与信用记录",
        en: "Qualifying: the 40x Income Rule and Credit",
      },
      body: {
        zh: "纽约房东审核租客，核心看两样东西：**收入**和**信用**。\n\n**1. 收入门槛：40 倍规则。** 很多房东和管理公司要求申请人的**年收入约为月租的 40 倍**。举例：月租 $3,000 的公寓，通常要求年收入约 **$120,000**；月租 $2,000 则约 **$80,000**。多名室友合租时，不少房东允许把室友收入合并计算，但各家政策不同，要提前问清。\n\n**2. 信用记录。** 房东一般会拉取申请人的信用报告，查看信用分数、还款记录和是否有欠租、被驱逐等负面记录。没有美国信用记录（很多新来的留学生和新移民都是如此）不等于「信用差」，但会让房东难以评估风险——下一节专门讲解决办法。关于如何从零开始建立美国信用，可以读[《从零开始建立美国信用》](/journal/building-us-credit-from-scratch)。\n\n**3. 房源类型影响审核流程。** 出租大楼（rental building）由房东或管理公司直接审批，通常几天内出结果；如果租的是 condo 或 co-op 里业主转租的单元，除了业主同意，往往还需要**大楼董事会审批**，材料更多、周期更长（co-op 转租审批可能需要数周），赶开学、赶入职的申请人要把这段时间算进去。\n\n**4. 提前自查。** 看房前先算好自己（加上室友）的收入是否达标、能否提供证明；达不到也不用慌——担保人、机构担保等路径见下一节。",
        en: "NYC landlords screen tenants on two things above all: **income** and **credit**.\n\n**1. The income test: the 40x rule.** Many landlords and management companies look for **annual income of roughly 40 times the monthly rent**. Example: a $3,000/month apartment typically calls for about **$120,000** in annual income; $2,000/month, about **$80,000**. With roommates, many landlords allow combining incomes — but policies vary, so ask up front.\n\n**2. Credit history.** Landlords generally pull a credit report to check your score, payment history, and any negatives such as unpaid rent or eviction records. Having no U.S. credit history — the situation of most new students and immigrants — is not the same as bad credit, but it makes you hard to underwrite; the next section covers the standard workarounds. For building U.S. credit from zero, see [Building U.S. Credit from Scratch](/journal/building-us-credit-from-scratch).\n\n**3. Building type shapes the approval process.** In a rental building, the landlord or management company approves you directly, often within days. If you rent a unit inside a condo or co-op from its owner, you usually also need **building board approval** on top of the owner's consent — more paperwork and a longer timeline (co-op sublet approvals can take weeks). If you are racing a semester start or a job start date, budget for that.\n\n**4. Self-check before touring.** Before you tour, work out whether your income (plus roommates') clears the bar and whether you can document it. If it does not, do not panic — guarantors and institutional guarantee services are covered next.",
      },
    },
    {
      heading: {
        zh: "没有美国信用或收入怎么办",
        en: "No U.S. Credit or Income? The Standard Workarounds",
      },
      body: {
        zh: "这是留学生和新移民最常卡住的一步。好消息是：纽约租赁市场对这种情况非常熟悉，形成了几条成熟路径。\n\n**路径一：个人担保人（guarantor）。** 找一位收入达标的亲友为租约担保。行业惯例是担保人的**年收入约为月租的 80 倍**（比租客本人的 40 倍标准更高），且很多房东要求担保人是美国居民，有的进一步要求纽约州或纽约都会区居民。担保人需要提交自己的收入证明和信用报告，并在租约上承担连带责任——这对担保人是实打实的法律义务，请双方都想清楚。\n\n**路径二：机构担保服务。** 如果找不到符合条件的个人担保人，可以使用 **TheGuarantors、Insurent** 这类机构担保服务。它们的一般机制是：机构审核你的整体情况（可包括海外收入、父母资助、录取证明等）后，向房东出具担保，作为交换你支付一笔费用——**通常按月租或年租的一定比例计算，各家定价不同**。注意：房东必须接受该机构的担保才行，看房时就要问清「接不接受 institutional guarantor」。\n\n**路径三：预付租金——在纽约要格外谨慎。** 在美国一些州，一次性预付数月租金是常见的变通做法；但**根据纽约州 2019 年租赁法，房东可预先收取的款项受到严格限制**（押金等预收款一般以一个月租金为上限），因此「预付一年房租」在纽约并不像在其他州那样普遍可行。具体怎么安排合法合规，以签约时的法规为准，必要时咨询律师。\n\n**路径四：留学生材料组合。** 常见实践是提交 **I-20 或录取通知 + 父母的银行流水/资产证明 + 本人护照签证**，配合机构担保或父母出面担保。提前把中英文材料备齐、翻译好，能显著加快审批。",
        en: "This is where students and new arrivals most often get stuck. The good news: the NYC rental market sees this situation constantly, and several well-worn paths exist.\n\n**Path 1: a personal guarantor.** Ask a relative or friend with qualifying income to guarantee the lease. The industry convention is that a guarantor needs **annual income of roughly 80 times the monthly rent** (a higher bar than the tenant's own 40x), and many landlords require the guarantor to be U.S.-based — some specifically a New York State or tri-state resident. The guarantor submits their own income documents and credit report and becomes legally liable on the lease — a real obligation both sides should think through.\n\n**Path 2: institutional guarantee services.** If no qualifying individual is available, services such as **TheGuarantors or Insurent** can act as your guarantor. The general mechanism: the company underwrites your overall situation (which can include overseas income, parental support, or an admission letter), then issues a guarantee to the landlord; in exchange you pay a fee, **typically calculated as a percentage of the monthly or annual rent, with pricing varying by provider**. Note that the landlord must accept that provider's guarantee — ask \"do you accept an institutional guarantor?\" at the tour.\n\n**Path 3: prepaid rent — be extra careful in New York.** In some U.S. states, prepaying several months of rent is a common workaround. But **under New York State's 2019 rent law, what a landlord may collect up front is tightly limited** (deposits and advance payments are generally capped around one month's rent), so \"prepay a year of rent\" is not the routine option in New York that it is elsewhere. Treat the rules in force at signing as controlling, and consult an attorney if needed.\n\n**Path 4: the student document package.** The common practice is to submit an **I-20 or admission letter + parents' bank statements / proof of assets + your passport and visa**, combined with an institutional guarantor or a parent standing as guarantor. Having documents (and translations) ready in advance meaningfully speeds up approval.",
      },
    },
    {
      heading: {
        zh: "找房与看房：节奏、渠道与防骗清单",
        en: "Finding and Touring: Pace, Channels, and a Scam Checklist",
      },
      body: {
        zh: "**节奏：比你想的快得多。** 在空置率低于 2% 的市场里（2026 年 4 月曼哈顿为 **1.55%**），好房源几天内就会租出去。纽约的常见节奏是：**入住日前 4–6 周开始认真看房**——太早看到的房源等不到你入住，太晚则选择所剩无几。看中就要当天或次日递申请，材料必须提前备齐（见下一节清单）。\n\n**渠道：StreetEasy 生态。** StreetEasy 是纽约租房搜索的主流平台，大量房源和经纪人都在上面；Zillow、Apartments.com 等也有覆盖。设置好价格、区域、入住日提醒，新房源第一时间响应。也可以请中英双语经纪人代找——FARE 法案生效后请注意：**你自己雇用经纪人代表你时，这笔费用通常由你承担**，委托前谈清楚。我们的[中英双语团队](/chinese-real-estate-agents-nyc)可以协助租赁和后续的买房规划。\n\n**看房时确认清楚：**\n\n- 报价是名义租金还是净有效租金？有没有免租月？\n- 水电、燃气、网络哪些包含在租金里？\n- 大楼有没有额外费用（amenity fee、move-in fee）？\n- 洗衣设施、电梯、管理方式（有无 super/管理公司）？\n\n**防骗清单——出现任何一条都要警惕：**\n\n- 没看房（或只给几张照片）就催你打款「定房」；\n- 价格明显低于同区域同户型市场价；\n- 「房东在国外」，只肯邮件/短信联系，拒绝视频看房；\n- 要求用现金、礼品卡、加密货币或个人转账付定金；\n- 房源照片是从卖房挂牌盗来的（可反搜图片核实）；\n- 对方拒绝出示身份或经纪执照（纽约州经纪执照可在州务厅网站在线核验）。\n\n**原则：没有实地或可信视频看房、没有书面文件之前，一分钱都不要付。**",
        en: "**Pace: faster than you expect.** In a sub-2% vacancy market (Manhattan was at **1.55%** in April 2026), good units lease within days. The standard NYC rhythm: **start touring seriously 4–6 weeks before your move-in date** — units you see earlier will not wait for you, and starting later leaves slim pickings. When you find the one, apply the same or next day, with documents already assembled (checklist in the next section).\n\n**Channels: the StreetEasy ecosystem.** StreetEasy is the dominant NYC rental search platform, where most listings and agents live; Zillow, Apartments.com and others also have coverage. Set alerts for price, area, and move-in date and respond to new listings immediately. You can also engage a bilingual (Chinese/English) agent to search for you — note that after the FARE Act, **when you hire an agent to represent you, that fee is generally yours** — agree on it before engaging. Our [bilingual team](/chinese-real-estate-agents-nyc) assists with rentals and later purchase planning.\n\n**Confirm at the tour:**\n\n- Is the quoted price gross or net effective? Any free months?\n- Which utilities (water, gas, electric, internet) are included?\n- Any building charges (amenity fee, move-in fee)?\n- Laundry, elevator, and management setup (super / management company)?\n\n**Scam checklist — any one of these is a red flag:**\n\n- Pressure to wire a \"holding deposit\" before you have seen the unit (or with photos only);\n- A price clearly below market for the area and layout;\n- A \"landlord abroad\" who will only email/text and refuses a live video tour;\n- Requests for cash, gift cards, cryptocurrency, or personal transfer apps for a deposit;\n- Listing photos lifted from a for-sale listing (reverse-image-search to check);\n- Refusal to show ID or a broker license (New York State licenses can be verified online with the Department of State).\n\n**The rule: pay nothing before an in-person or trusted live video tour and written paperwork.**",
      },
    },
    {
      heading: {
        zh: "申请材料清单",
        en: "The Application Document Checklist",
      },
      body: {
        zh: "纽约租房是「先到先得+材料齐全者胜」。把下面的材料提前扫描成 PDF、按类归档，看中房子当天就能递交完整申请。\n\n**身份与身份状态：**\n\n- 护照（照片页）；\n- 美国签证；留学生加上 **I-20**（或 DS-2019）；\n- 有 SSN 就提供；**没有 SSN 通常也可以申请**——房东可用其他方式做背景审核，机构担保服务也不以 SSN 为前提。\n\n**收入与资金证明：**\n\n- 最近 **2–3 个月银行流水**（留学生常用父母账户流水+资助说明）；\n- 在职者：**在职证明/offer letter**（注明职位与年薪）+ 最近数张工资单 + 最近一年报税表（W-2 / 1040，如有）;\n- 学生：**录取通知书或在读证明**；\n- 海外资产证明如需使用，提前准备英文版或翻译件。\n\n**其他常见项：**\n\n- 前房东推荐信或租房记录（如有）；\n- 担保人的整套收入与信用材料（如走担保人路径）；\n- 申请费：**根据纽约州 2019 年租赁法，申请费/背景与信用调查费受到上限约束（一般为 $20）**，明显高于此的收费要问清依据，以签约时法规为准。\n\n**实用技巧：** 把所有 PDF 放进一个云端文件夹，起好文件名（如 passport.pdf、bank-statement-2026-05.pdf），随时能一键发给经纪人或管理公司。在几个申请人竞争同一套房时，**谁的材料先齐、谁就占先机**。",
        en: "NYC renting is first-come, complete-file-wins. Scan everything below to PDF and organize it by category in advance, so you can submit a complete application the day you find the right unit.\n\n**Identity and status:**\n\n- Passport (photo page);\n- U.S. visa; students add the **I-20** (or DS-2019);\n- SSN if you have one; **no SSN is usually still workable** — landlords can screen through other means, and institutional guarantors do not require one.\n\n**Income and funds:**\n\n- The most recent **2–3 months of bank statements** (students often use parents' statements plus a support letter);\n- If employed: an **employment verification / offer letter** (title and salary) + recent pay stubs + last year's tax return (W-2 / 1040, if any);\n- Students: **admission letter or enrollment verification**;\n- If using overseas asset documents, prepare English versions or translations ahead of time.\n\n**Other common items:**\n\n- Reference letter or rental history from a prior landlord (if any);\n- The guarantor's full income and credit package (if going the guarantor route);\n- Application fees: **under New York State's 2019 rent law, application / background-and-credit-check fees are capped (generally $20)** — question anything clearly above that, and treat the rules at signing as controlling.\n\n**Practical tip:** keep every PDF in one cloud folder with clean file names (passport.pdf, bank-statement-2026-05.pdf) so you can send the whole set to an agent or management company in one click. When several applicants compete for one unit, **the first complete file usually wins**.",
      },
    },
    {
      heading: {
        zh: "签约与入住：押金、关键条款与验房",
        en: "Signing and Moving In: Deposit, Key Clauses, Walkthrough",
      },
      body: {
        zh: "**押金：一个月上限。** **根据纽约州 2019 年租赁法，住宅租赁押金上限为一个月租金**，房东退租时也须按法定流程和时限处理押金。要求「两个月押金」或大额「定金」的，先核实其合法性再付款，以签约时法规为准。\n\n**签约前把租约读完，重点盯这些条款：**\n\n1. **租期与租金**——起止日期、月租金额；如有免租月，写明是哪几个月、违约（如提前退租）时是否要退还优惠；\n2. **续租与涨租**——租约到期怎么续、有无既定涨幅；在上涨的市场里，较长首期租约可以锁定当前租金；\n3. **提前解约条款**——违约金怎么算、能否转租（sublet）或找人接替（lease assignment / break clause）；对未来几年可能因工作、学业变动搬家的人尤其重要；\n4. **室友与转租政策**——谁在租约上、加人减人怎么办；\n5. **维修责任与报修渠道**——哪些归房东、哪些归租客；\n6. **杂费**——迟付滞纳金、宠物费、设施费是否写明。\n\n**入住 walkthrough（验房）：** 拿钥匙当天，对每个房间拍照录像存档——墙面、地板、电器、水压、门窗、已有的划痕污渍，**发邮件给房东/管理处留底**。这是退租时拿回押金的最强证据。\n\n**入住事务清单：** 开通电和网（燃气如需）、按租约要求购买租客保险（renter's insurance，很多大楼强制）、到 USPS 办理地址、更新银行与学校/雇主地址。更多安家事项见[《第一年在纽约安家清单》](/journal/first-year-nyc-settling-checklist)。",
        en: "**Deposit: capped at one month.** **Under New York State's 2019 rent law, the security deposit on a residential lease is capped at one month's rent**, and landlords must handle its return through the required process and timeline. If someone asks for \"two months' deposit\" or a large \"holding fee,\" verify its legality before paying — the rules at signing control.\n\n**Read the entire lease before signing, focusing on:**\n\n1. **Term and rent** — start and end dates, monthly amount; if there are free months, exactly which months, and whether the concession is clawed back if you break the lease early;\n2. **Renewal and increases** — how renewal works and whether an increase is set; in a rising market, a longer initial term locks in today's rent;\n3. **Early termination** — how the penalty is computed, and whether subletting or lease assignment / a break clause is allowed; this matters most for people whose job, school, or status may move them within a few years;\n4. **Roommate and sublet policy** — who is on the lease and how names are added or removed;\n5. **Repairs** — what the landlord covers vs. the tenant, and how to file requests;\n6. **Fees** — late fees, pet fees, amenity fees spelled out in writing.\n\n**The move-in walkthrough:** on key day, photograph and video every room — walls, floors, appliances, water pressure, windows and doors, and every existing scratch or stain — then **email the set to the landlord/management for the record**. This is your strongest evidence for getting the deposit back at move-out.\n\n**Move-in admin:** set up electricity and internet (and gas if needed), buy renter's insurance if the lease requires it (many buildings do), file your address with USPS, and update your bank and school/employer. For more settling-in items, see [Your First-Year NYC Settling Checklist](/journal/first-year-nyc-settling-checklist).",
      },
    },
    {
      heading: {
        zh: "租转买：什么时候该开始算买房这笔账",
        en: "From Renting to Buying: When to Start Running the Numbers",
      },
      body: {
        zh: "租房不是终点。很多客户的路径是：**先租 1–3 年，摸清街区、建立信用、攒首付，再考虑买**。什么信号说明可以开始认真算账了？\n\n**先看真实的成本对比。** 曼哈顿中位租金 **$5,099**（2026 年 4 月，Elliman / Miller Samuel）听起来很高，但买房的月成本同样不低：按[《曼哈顿租赁市场 2026》](/journal/manhattan-rentals-2026)引用的房地美数据，30 年固定房贷利率**截至 2026 年 6 月 25 日为 6.49%**——100 万美元贷款光本息每月约 **$6,300**，还没算房产税和每月常见 **$1,000–$3,000 以上**的 condo 公共费或 co-op 管理费。单看月供，买未必比租便宜。\n\n**再看这几个信号：**\n\n1. **持有年限**——很多买家用 **5 到 7 年**的粗略回本经验法则：预计在纽约稳定生活超过这个年限，买房的前期成本（首付、过户费、税费）才摊得开；\n2. **首付与储备金**——co-op 往往要求可观首付和过户后储备金；首付攒到位是硬门槛；\n3. **信用与收入记录**——两年左右的美国收入与信用记录会让贷款顺利很多（没有绿卡也有路径，见[《没有绿卡怎么贷款买房》](/journal/mortgage-without-green-card)）；\n4. **身份与流动性**——未来几年可能搬离纽约的人，租房的灵活性本身就有价值。\n\n**动手算：** 用我们的[买还是租计算器](/calculator)，代入当前利率、真实税费和你诚实的持有年限。想系统了解买房全流程（co-op vs condo、出价、过户），读[《纽约买房完整指南》](/guides/buying-in-nyc)；家有留学生的家庭可参考[《为孩子上学：买还是租》](/journal/buying-vs-renting-students-parents)。到了想认真看房的阶段，[联系我们](/contact)——中英双语团队可以把你目标街区的可比租金和近期成交并排拉给你看。",
        en: "Renting is not the end state. A common client path is: **rent for 1–3 years, learn the neighborhoods, build credit, save the down payment — then buy**. What signals say it is time to run the numbers seriously?\n\n**Start with the honest cost comparison.** Manhattan's median rent of **$5,099** (April 2026, Elliman / Miller Samuel) sounds high, but owning is not cheap monthly either: per the Freddie Mac data cited in [Manhattan Rentals in 2026](/journal/manhattan-rentals-2026), the 30-year fixed rate was **6.49% as of June 25, 2026** — on a $1,000,000 mortgage that is roughly **$6,300 a month** in principal and interest alone, before property taxes and the **$1,000–$3,000+ a month** in condo common charges or co-op maintenance that family-sized apartments commonly carry. On monthly cost alone, buying is not automatically cheaper than renting.\n\n**Then check these signals:**\n\n1. **Holding period** — many buyers use a rough **5-to-7-year** break-even rule of thumb: the up-front costs of buying (down payment, closing costs, taxes) only amortize if you expect to stay in New York longer than that;\n2. **Down payment and reserves** — co-ops often require substantial down payments and post-closing reserves; having the down payment saved is the hard gate;\n3. **Credit and income history** — about two years of U.S. income and credit history makes financing much smoother (there are paths without a green card too — see [Getting a Mortgage Without a Green Card](/journal/mortgage-without-green-card));\n4. **Status and mobility** — if you might leave New York within a few years, the flexibility of renting has real value.\n\n**Do the math:** use our [buy-vs-rent calculator](/calculator) with a current rate, real taxes and charges, and an honest holding period. For the full purchase process (co-op vs. condo, offers, closing), read [The Complete NYC Buying Guide](/guides/buying-in-nyc); families with students can start with [Buy or Rent for Your Student](/journal/buying-vs-renting-students-parents). When you are ready to tour, [contact us](/contact) — our bilingual team can pull comparable rents and recent sales side by side for your target neighborhoods.",
      },
    },
  ],
  faq: [
    {
      question: {
        zh: "留学生没有 SSN 能在纽约租房吗？",
        en: "Can an international student rent in NYC without an SSN?",
      },
      answer: {
        zh: "通常可以。SSN 不是租房的法定前提，房东可以通过护照、签证、I-20、银行流水等材料完成审核；机构担保服务（如 TheGuarantors、Insurent 这类公司）也不以 SSN 为前提。常见做法是提交 I-20 或录取通知、父母的银行流水或资产证明，并配合担保人或机构担保。",
        en: "Usually yes. An SSN is not a legal prerequisite for renting; landlords can screen using a passport, visa, I-20, and bank statements, and institutional guarantee services (companies like TheGuarantors or Insurent) do not require one. The common package is an I-20 or admission letter plus parents' bank statements or proof of assets, combined with a guarantor or an institutional guarantee.",
      },
    },
    {
      question: {
        zh: "担保人需要满足什么条件？",
        en: "What does a guarantor need to qualify?",
      },
      answer: {
        zh: "行业惯例是担保人年收入约为月租的 80 倍（高于租客本人的 40 倍标准），并提交自己的收入证明和信用报告。很多房东要求担保人是美国居民，有的要求纽约州或纽约都会区居民。担保人对租约承担连带法律责任。找不到合适个人担保人时，可以考虑机构担保服务，但需房东接受。",
        en: "The industry convention is annual income of roughly 80 times the monthly rent (higher than the tenant's own 40x bar), documented with the guarantor's income records and credit report. Many landlords require a U.S.-based guarantor, some specifically New York State or tri-state. The guarantor is legally liable on the lease. If no qualifying individual is available, an institutional guarantee service is an option — provided the landlord accepts it.",
      },
    },
    {
      question: {
        zh: "现在在纽约租房还要付中介费吗？",
        en: "Do tenants still pay broker fees in NYC?",
      },
      answer: {
        zh: "纽约市 FARE 法案（2024 年第 119 号地方法）自 2025 年 6 月 11 日起生效，大体原则是谁雇用经纪人谁付费——房东通过经纪人挂牌的房源，租客通常不再付这笔费用。但法案仍在诉讼中，且你自己雇经纪人代表你找房时，费用通常由你承担。签约前务必书面确认由谁付费，并以签约时的法规为准。",
        en: "New York City's FARE Act (Local Law 119 of 2024) took effect June 11, 2025; in broad terms, whoever hires the broker pays. When a landlord lists through an agent, the tenant generally no longer pays that fee. The Act is being litigated, though, and if you hire your own broker to represent you, that fee is generally yours. Confirm in writing who pays before signing, and treat the rules in force at signing as controlling.",
      },
    },
    {
      question: {
        zh: "押金最多可以收多少？什么时候能拿回来？",
        en: "How much can the deposit be, and when do I get it back?",
      },
      answer: {
        zh: "根据纽约州 2019 年租赁法，住宅租赁押金上限为一个月租金，房东退租时须按法定流程和时限退还，可扣除合理的损坏维修费用（正常磨损除外）。入住和退租时都做好拍照录像留底，是顺利拿回押金的最有效办法。具体细节以签约时法规为准。",
        en: "Under New York State's 2019 rent law, the security deposit on a residential lease is capped at one month's rent, and the landlord must return it through the required process and timeline, less reasonable charges for damage beyond normal wear and tear. Photo-and-video documentation at both move-in and move-out is the most effective way to get it back smoothly. Confirm the current rules at signing.",
      },
    },
    {
      question: {
        zh: "年收入不到月租的 40 倍怎么办？",
        en: "What if my income is below 40x the monthly rent?",
      },
      answer: {
        zh: "常见路径有四条：找年收入约为月租 80 倍的个人担保人；使用房东接受的机构担保服务；与室友合租并合并计算收入（需房东允许）；或者选择月租更低的房源和区域。预付多月租金在纽约受州法严格限制，不是可靠的默认选项。",
        en: "Four common paths: find a personal guarantor with annual income around 80x the monthly rent; use an institutional guarantee service the landlord accepts; share with roommates and combine incomes (where the landlord allows it); or target lower-rent units and neighborhoods. Prepaying multiple months of rent is tightly restricted under New York State law and is not a reliable default option.",
      },
    },
    {
      question: {
        zh: "可以一次性预付一年租金代替担保人吗？",
        en: "Can I prepay a year of rent instead of using a guarantor?",
      },
      answer: {
        zh: "在美国一些州这是常见变通，但根据纽约州 2019 年租赁法，房东可预先收取的款项受到严格限制（一般以一个月租金为上限），所以在纽约这通常不是可行的默认做法。更常规的路径是个人担保人或机构担保服务。具体安排以签约时法规为准，必要时咨询律师。",
        en: "In some U.S. states this is a common workaround, but under New York State's 2019 rent law what a landlord may collect up front is tightly limited (generally capped around one month's rent), so in New York it is usually not a workable default. The standard paths are a personal guarantor or an institutional guarantee service. Treat the rules at signing as controlling and consult an attorney if needed.",
      },
    },
    {
      question: {
        zh: "从看房到入住一般要多久？",
        en: "How long from touring to move-in?",
      },
      answer: {
        zh: "出租大楼的申请通常几天内出结果，从递交申请到签约、拿钥匙常常在一到两周内完成；condo 或 co-op 业主转租的单元还需大楼审批，周期可能长达数周。纽约房源周转极快，建议入住日前 4 到 6 周开始认真看房，材料提前备齐，看中当天就递申请。",
        en: "Rental-building applications are typically decided within days, and application-to-keys often takes one to two weeks; units sublet from condo or co-op owners also need building approval, which can add weeks. NYC listings turn over extremely fast — start touring seriously 4 to 6 weeks before your move-in date, have documents ready in advance, and apply the day you find the right unit.",
      },
    },
    {
      question: {
        zh: "净有效租金（net effective rent）是什么意思？",
        en: "What does net effective rent mean?",
      },
      answer: {
        zh: "当房东提供免租月等让步时，把总租金摊到整个租期上得到的平均月租就是净有效租金。例如 12 个月、月租 $5,000 的租约免一个月，净有效租金约为 $4,583——但在实际居住的每个月你仍要付足 $5,000。看房时务必确认报价是名义租金还是净有效租金，日常预算按名义租金规划。",
        en: "When a landlord offers a concession such as free months, the net effective rent is the average monthly rent after spreading the total across the full term. Example: on a 12-month lease at $5,000 gross with one month free, the net effective rent is roughly $4,583 — but you still pay the full $5,000 in every month you actually occupy. Always confirm whether a quote is gross or net effective, and budget on the gross number.",
      },
    },
  ],
  relatedSlugs: [
    "manhattan-rentals-2026",
    "buying-vs-renting-students-parents",
    "building-us-credit-from-scratch",
    "first-year-nyc-settling-checklist",
  ],
};
