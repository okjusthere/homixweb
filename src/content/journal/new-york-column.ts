import { SITE_MEDIA_ROOT } from "@/lib/media";
import type { JournalPost } from "./posts";

const reviewed = "2026-08-04";

export const newYorkColumnPosts: JournalPost[] = [
  {
    slug: "new-york-star-property-tax-credit",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["taxes"],
    parentGuideSlug: "property-taxes",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/city-hall.jpg`,
    readMinutes: 7,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "How New York Homeowners Claim STAR Property-Tax Relief",
      zh: "纽约房主如何申请 STAR 房产税福利",
    },
    excerpt: {
      en: "Who qualifies for Basic or Enhanced STAR, why new owners receive a credit rather than an exemption, and what to do after closing.",
      zh: "Basic 与 Enhanced STAR 谁能申请、新业主为什么领取 credit 而非 exemption，以及过户后应如何登记。",
    },
    body: {
      en: `New York's School Tax Relief program, better known as **STAR**, can reduce the school-tax burden on an owner-occupied primary residence. It is not automatic for a new buyer, it is not the same as grieving an assessment, and it generally does not apply to a second home or rental property.

*Reviewed August 4, 2026. Income limits and procedures change. Confirm eligibility with the New York State Department of Taxation and Finance before relying on this guide.*

## Basic STAR and Enhanced STAR

**Basic STAR** is available for a primary residence when the owners and resident spouses have combined income of **$500,000 or less** for the STAR credit. There is no age requirement. **Enhanced STAR** provides a larger benefit for qualifying seniors: at least one owner must turn 65 by the end of the benefit year and the household must meet the annual income limit. The published limit for 2026 benefits is **$110,750**.

Only one property can be the STAR primary residence of a married couple. If ownership is held through a trust, life estate, co-op, or another less common structure, do not assume the answer; use the state's eligibility rules or ask the STAR unit how the beneficial owner is treated.

## New owners receive a credit, not the old exemption

Long-time owners may still see a **STAR exemption** directly reducing the school-tax line on their bill. That legacy form is generally limited to owners who have continuously received it since 2015. A new purchaser registers for the **STAR credit** instead. The state pays the benefit by check or direct deposit rather than placing it on the local tax bill.

The economic benefit may be similar, but the workflow is different. A buyer should not conclude that STAR is missing merely because the first tax bill shows no exemption. Check the state benefit portal and the payment record separately.

## What to do after closing

1. Wait until the deed and local assessment record reflect the new ownership.
2. Create or sign in to the New York State **Homeowner Benefit Portal**.
3. Register the property, owners, resident spouses, ownership percentages, and primary-residence status.
4. Provide the requested Social Security or tax-identification information so the state can verify income.
5. Choose direct deposit if offered, then retain the confirmation number and monitor the portal.

Register promptly. The state uses local school-tax due dates and processing cutoffs to determine when a benefit can be issued. If you already receive Basic STAR and later qualify for Enhanced STAR, New York generally checks income eligibility automatically, but your ownership and residency information still needs to stay current.

## STAR does not replace a tax grievance

STAR lowers eligible school taxes. A **grievance** challenges the assessed value used to calculate the bill. They are separate programs with separate agencies and deadlines. An owner may be eligible for both, so review the annual assessment notice even after registering for STAR.

## Before you count the savings

Do not subtract an estimated STAR amount from a purchase budget until eligibility and the local benefit have been verified. Benefit amounts vary by school district and property. Your attorney, CPA, or tax professional can help when residency, ownership entities, trusts, divorce, or multiple homes make the facts less straightforward.

## Official sources

- New York State Tax Department — STAR program: https://www.tax.ny.gov/star/
- STAR eligibility: https://www.tax.ny.gov/pit/property/star/eligibility.htm
- STAR program changes: https://www.tax.ny.gov/star/changes/
- Enhanced STAR income limits: https://www.tax.ny.gov/pit/property/star/enhanced-income-limits.htm

*This article is general educational information, not tax or legal advice. Verify current rules with New York State and a qualified professional.*`,
      zh: `纽约州的 **STAR（School Tax Relief）**项目，可以减轻自住主要居所的学校税负担。新买家通常需要主动登记；它不是房产税评估申诉，也一般不适用于第二套住房或出租房。

*本文于 2026 年 8 月 4 日复核。收入上限和办理方式会调整，实际申请前请以纽约州税务与财政局公布的信息为准。*

## Basic STAR 与 Enhanced STAR

**Basic STAR** 面向自住主要居所。申请 STAR credit 时，所有业主及同住配偶的合计收入需要在 **50 万美元或以下**，没有年龄要求。**Enhanced STAR** 福利更高，主要面向符合条件的年长业主：至少一名业主要在福利年度结束前满 65 岁，并满足每年更新的收入上限。2026 年福利公布的收入上限为 **110,750 美元**。

一对已婚夫妇只能把一处房产作为 STAR 主要居所。若房产通过信托、终身产权、Co-op 或其他特殊结构持有，不要凭经验判断，应查看州政府规则或直接向 STAR 部门确认实际受益人如何认定。

## 新业主领取 credit，不再进入旧 exemption

部分老业主的税单上仍会直接显示 **STAR exemption**，减少学校税。这个旧形式通常只保留给自 2015 年起持续享有 exemption 的业主。新买家应登记 **STAR credit**，福利由纽约州通过支票或直接存款发放，而不是直接写在地方税单上。

两种形式的经济效果可能接近，但查询方式不同。第一张税单上没有 STAR exemption，并不代表没有资格；应同时查看州政府 Homeowner Benefit Portal 和付款记录。

## 过户后应该怎么做

1. 等待 deed 与地方评估档案更新为新业主。
2. 注册或登录纽约州 **Homeowner Benefit Portal**。
3. 填写房产、全部业主、同住配偶、持有比例与主要居所信息。
4. 按要求提供社会安全号或税务识别资料，供州政府核实收入。
5. 如可选择直接存款，完成设置并保存确认编号，之后持续查看 portal 状态。

建议尽快登记。州政府会结合当地学校税到期日和处理窗口确定福利发放时间。已经领取 Basic STAR、之后达到 Enhanced STAR 条件的业主，纽约州通常会自动核验收入并升级，但产权和居住信息仍需保持准确。

## STAR 不代替房产税申诉

STAR 减少符合条件的学校税；**grievance（评估申诉）**则挑战计算税款所用的评估价值。两者由不同机构管理，也有不同截止日期。业主可能同时符合两者，因此完成 STAR 登记后，仍要每年查看评估通知。

## 不要提前把预计优惠算进预算

在资格和当地实际金额确认前，不应直接从购房持有成本中扣掉一个估算的 STAR 数字。福利金额因学区和房产而异。遇到信托、公司持有、离婚、多处房产或居住状态复杂的情况，应让律师、CPA 或税务专业人士确认。

## 官方来源

- 纽约州税务与财政局 STAR 项目：https://www.tax.ny.gov/star/
- STAR 资格规则：https://www.tax.ny.gov/pit/property/star/eligibility.htm
- STAR 项目变化：https://www.tax.ny.gov/star/changes/
- Enhanced STAR 收入上限：https://www.tax.ny.gov/pit/property/star/enhanced-income-limits.htm

*本文仅为一般教育信息，不构成税务或法律建议。请以纽约州最新规则及专业人士意见为准。*`,
    },
  },
  {
    slug: "nyc-property-tax-bill-explained",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["taxes"],
    parentGuideSlug: "property-taxes",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/courthouse.jpg`,
    readMinutes: 7,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "How to Read a New York City Property-Tax Bill",
      zh: "纽约市房产税账单怎么看：市场价值、评估价值与应税价值",
    },
    excerpt: {
      en: "A plain-English map from market value to assessed value, exemptions, abatements, and the amount due.",
      zh: "从市场价值到评估价值、豁免、减免和最终应缴金额，把纽约市税单逐层拆开。",
    },
    body: {
      en: `A New York City property-tax bill contains several values that sound interchangeable but are not. Reading them in the right order helps an owner spot missing exemptions, understand an increase, and decide whether an assessment challenge deserves attention.

*Reviewed August 4, 2026. Tax rates and program rules change annually. Use the current Department of Finance record for the property.*

## The calculation in four layers

1. **Market value** is the Department of Finance estimate of what the property is worth.
2. **Assessed value** is a percentage of market value determined by tax class. The assessment ratio is 6% for Class 1 and 45% for Classes 2, 3, and 4, subject to statutory caps and transitional rules.
3. **Taxable value** is the assessed value after eligible exemptions reduce it.
4. The city applies the annual class tax rate, then eligible **abatements** reduce the resulting tax.

That distinction matters: an exemption reduces the value being taxed; an abatement reduces the tax after it has been calculated.

## Know the tax class before comparing bills

Most one-to-three-family homes are **Class 1**. Co-ops, condos, and rental apartment buildings are generally **Class 2**. Commercial property is usually Class 4. Two homes with the same market value can have very different bills because their class, assessed-value history, exemptions, and abatements differ.

Class 1 assessed-value increases are generally capped at 6% in one year and 20% over five years. Small Class 2 properties have separate caps. Larger Class 2 and commercial properties may show a transitional assessed value that phases changes in over time. This is why multiplying today's estimated market value by a headline ratio may not reproduce the exact bill.

## Read the Notice of Property Value before the bill

The annual **Notice of Property Value (NOPV)** explains market value, assessed value, tax class, and exemptions before the final tax bill. Compare it with the prior year and ask:

- Did the market value jump even though comparable sales do not support it?
- Is the tax class correct?
- Are expected exemptions still listed?
- Does the owner name and mailing address match current records?
- Is a co-op/condo abatement reflected through the managing agent?

Assessment challenges have firm annual deadlines. Waiting for a later quarterly bill can mean missing the window.

## Separate the owner's bill from the lender escrow

Many owners pay taxes through mortgage escrow. The lender's monthly escrow collection is an estimate that can include an anticipated cushion; it is not itself the city tax bill. After an exemption, abatement, or assessment change, compare the official Department of Finance balance with the lender's next escrow analysis.

## A practical annual routine

Download the NOPV, the property-tax bill, and the Department of Finance account history once a year. Keep proof of exemptions and abatements. For a purchase, ask the attorney how taxes are prorated at closing and whether the seller's exemptions will continue after ownership changes. If a number looks wrong, contact the responsible agency before the filing deadline rather than relying on the listing's tax figure.

## Official sources

- NYC Department of Finance — Calculating your property taxes: https://www.nyc.gov/site/finance/property/calculating-your-property-taxes.page
- Determining assessed value: https://www.nyc.gov/site/finance/property/property-determining-your-assessed-value.page
- Property reports and bills: https://www.nyc.gov/site/finance/taxes/property-reports.page

*This article is general information, not tax or legal advice. Confirm the current record and deadlines for the specific property.*`,
      zh: `纽约市房产税账单里有好几个看似相近、实际完全不同的“价值”。按正确顺序阅读，业主才能发现漏掉的减免、理解税款为什么上升，并判断是否值得提出评估申诉。

*本文于 2026 年 8 月 4 日复核。税率和项目规则每年可能变化，请以该房产当前的纽约市财政局记录为准。*

## 四层计算逻辑

1. **市场价值（market value）**：财政局估算该房产在市场上的价值。
2. **评估价值（assessed value）**：按税务类别对市场价值应用比例。Class 1 的法定比例为 6%，Class 2、3、4 为 45%，但还会受到年度涨幅上限和过渡规则影响。
3. **应税价值（taxable value）**：评估价值扣除符合条件的 exemption 后的金额。
4. 城市对其适用当年税率，再用符合条件的 **abatement** 直接减少算出的税款。

两者不能混淆：exemption 减少“被征税的价值”，abatement 减少“已经计算出的税”。

## 比较税单前先确认税务类别

大多数一至三户住宅属于 **Class 1**；Co-op、Condo 和出租公寓楼通常属于 **Class 2**；商业房产一般是 Class 4。即使市场价值相同，税务类别、评估价值历史、exemption 和 abatement 不同，最终税单也可能差很多。

Class 1 的评估价值涨幅通常受“一年不超过 6%、五年不超过 20%”限制。小型 Class 2 有另一套上限；较大 Class 2 和商业物业还可能采用 transitional assessed value，把变化分多年计入。因此，只用当前市场价值乘一个公开比例，往往无法精确还原税单。

## 先读 NOPV，再看季度账单

年度 **Notice of Property Value（NOPV）** 会在最终税单前列出市场价值、评估价值、税务类别和 exemption。应与上一年逐项比较：

- 市场价值是否突然上升，但附近可比成交并不支持？
- 税务类别是否正确？
- 预期的 exemption 是否仍然存在？
- 业主姓名和邮寄地址是否准确？
- Co-op / Condo abatement 是否通过管理公司正确反映？

评估申诉有严格年度截止日。等到后续季度税单才处理，可能已经错过窗口。

## 城市税单与贷款 escrow 要分开看

很多业主通过贷款 escrow 缴税。贷款机构每月收取的是估算额，可能包含缓冲，并不等于城市实际税单。发生 exemption、abatement 或评估变化后，应把财政局余额与贷款机构下一次 escrow analysis 对照。

## 每年一次的实用检查

每年下载并保存 NOPV、房产税账单和财政局账户历史，同时留好所有减免证明。买房时，应让律师说明过户日如何分摊税款，以及卖家的减免在产权变化后是否还能保留。如果数字不合理，应在截止日前直接联系负责机构，不能只依赖房源页面上的税额。

## 官方来源

- 纽约市财政局房产税计算：https://www.nyc.gov/site/finance/property/calculating-your-property-taxes.page
- 评估价值说明：https://www.nyc.gov/site/finance/property/property-determining-your-assessed-value.page
- 房产报告与账单：https://www.nyc.gov/site/finance/taxes/property-reports.page

*本文为一般信息，不构成税务或法律建议。请核对具体房产的最新记录与截止日期。*`,
    },
  },
  {
    slug: "nyc-coop-condo-tax-abatement",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["taxes", "buying"],
    parentGuideSlug: "property-taxes",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/apartment-building.jpg`,
    readMinutes: 6,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "NYC Co-op and Condo Property-Tax Abatement: What Owners Should Check",
      zh: "纽约 Co-op / Condo 房产税减免：谁申请、业主怎么确认",
    },
    excerpt: {
      en: "The managing agent usually files, but the owner still needs to verify primary-residence information and the benefit on the account.",
      zh: "通常由董事会或管理公司申报，但业主仍需核对主要居所资料及减免是否真正到账。",
    },
    body: {
      en: `New York City's co-op and condo property-tax abatement can reduce the tax attributable to an eligible unit, but an individual owner usually does **not** submit the building application. The board or managing agent files for the development and reports which units qualify.

*Reviewed August 4, 2026. Eligibility, percentages, and filing rules can change. Confirm the current record with the managing agent and NYC Department of Finance.*

## The basic eligibility pattern

The unit must generally be in an eligible Tax Class 2 co-op or condo and used as the owner's primary residence. Sponsor units, units owned by many business entities, and investor or second-home units generally do not qualify. Ownership of multiple units and trust arrangements require a closer reading of the rules.

The published abatement percentage depends on the development's average assessed value per unit. Current tiers range from **17.5% to 28.1%**. That percentage applies to the eligible property tax, not to the unit's market price or common charges.

## The building files, but the owner supplies the facts

The board or managing agent collects unit-owner names and primary-residence certifications, then files with the Department of Finance. The normal filing deadline is February 15. A buyer who closes after the building has assembled its roster can be missed unless ownership and residency records are updated promptly.

After closing, send the managing agent:

- the recorded or closing ownership information it requests;
- the names of all owners;
- the correct mailing address;
- the primary-residence certification; and
- any trust or estate documents needed to establish beneficial ownership.

Ask when the next building filing occurs and request written confirmation that the unit was included.

## How to verify the benefit

For a condo, review the unit's Department of Finance account and tax bill. For a co-op, taxes are assessed at the building level and the economic benefit may flow through the corporation's maintenance calculation, so request the board or managing agent's allocation statement. Do not rely only on the seller's prior maintenance bill; a seller's eligibility does not automatically prove the buyer's.

## Common reasons the benefit disappears

- The unit is no longer the owner's primary residence.
- Ownership changed but the managing agent was not notified before filing.
- The unit moved into an LLC or other ineligible ownership form.
- The building's filing omitted or misclassified the unit.
- The owner confused this city abatement with the separate state STAR credit.

Correcting an omission can take time and may depend on the filing cycle. Raise it as soon as the discrepancy appears.

## Official sources

- NYC Department of Finance — Co-op and condo abatement: https://www.nyc.gov/site/finance/property/landlords-coop-condo.page
- Co-op/condo abatement FAQs: https://www.nyc.gov/site/finance/property/co-op-condo-abatement-faqs.page

*This article is general educational information, not tax or legal advice.*`,
      zh: `纽约市 Co-op / Condo 房产税减免可以降低符合条件单元对应的房产税，但通常不是业主自己向城市提交整栋楼的申请，而是由董事会或管理公司统一申报，并报告哪些单元符合资格。

*本文于 2026 年 8 月 4 日复核。资格、比例和申报方式可能变化，请同时向管理公司和纽约市财政局确认。*

## 基本资格逻辑

单元通常需要位于符合条件的 Tax Class 2 Co-op 或 Condo，并作为业主的主要居所。Sponsor 单元、许多公司实体持有的单元，以及投资房或第二居所通常不符合条件。持有多个单元、信托或遗产安排则需要进一步核对具体规则。

减免比例取决于整栋项目的平均每户评估价值，现行公布的档位大致为 **17.5% 至 28.1%**。这个比例作用于符合条件的房产税，不是房屋市场价格，也不是管理费。

## 大楼申报，业主提供事实

董事会或管理公司收集业主姓名与主要居所声明，再向财政局申报。常规截止日为 2 月 15 日。买家若在大楼整理名单后才过户，而又没有及时更新产权与居住资料，就可能被漏掉。

过户后应向管理公司提交：

- 对方要求的过户或已登记产权资料；
- 全部业主姓名；
- 正确邮寄地址；
- 主要居所声明；
- 信托或遗产持有时用于证明实际受益人的文件。

同时询问下一次申报时间，并要求书面确认该单元已被列入。

## 如何确认减免真正到账

Condo 业主可查看本单元的财政局账户和税单。Co-op 的房产税通常按整栋楼计征，经济利益可能通过公司维护费分摊体现，因此应向董事会或管理公司索取分配说明。不要只看卖家过去的管理费账单；卖家符合资格，不代表买家自动延续。

## 常见的减免消失原因

- 该单元不再是业主主要居所；
- 产权已变化，但管理公司申报前未收到更新；
- 单元转入 LLC 或其他不符合资格的持有形式；
- 大楼申报时漏掉或错误分类该单元；
- 业主把纽约市 abatement 与纽约州 STAR credit 混为一谈。

遗漏更正可能需要时间，并受申报周期影响，一旦发现应尽快处理。

## 官方来源

- 纽约市财政局 Co-op / Condo 减免：https://www.nyc.gov/site/finance/property/landlords-coop-condo.page
- 常见问题：https://www.nyc.gov/site/finance/property/co-op-condo-abatement-faqs.page

*本文仅为一般教育信息，不构成税务或法律建议。*`,
    },
  },
  {
    slug: "nyc-property-records-acris-dob-hpd",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["buying"],
    parentGuideSlug: "buying-in-nyc",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/financial-district.jpg`,
    readMinutes: 7,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "Before Buying in NYC: How to Check ACRIS, DOB, and HPD Records",
      zh: "买纽约房前，如何查 ACRIS、DOB 与 HPD 记录",
    },
    excerpt: {
      en: "A practical public-record checklist for ownership documents, permits, complaints, violations, and housing-code history.",
      zh: "用公开档案核对产权文件、许可、投诉、违规和住房维护记录的实用清单。",
    },
    body: {
      en: `A listing tells a marketing story. New York City's public databases tell parts of the property's legal and operational history. They do not replace an attorney, title search, engineer, or building diligence, but they help a buyer ask better questions before contract.

## Start with the correct identifiers

Find the borough, block, and lot — the **BBL** — from the city's property profile or tax record. Street addresses can be inconsistent; the BBL is the reliable key across agencies. A condo unit normally has its own lot, while a co-op apartment is shares in a corporation and may not appear as a separately deeded parcel.

## ACRIS: recorded property documents

**ACRIS** contains deeds, mortgages, satisfactions, assignments, and other recorded documents for Manhattan, Brooklyn, Queens, and the Bronx, generally from 1966 forward. Staten Island records are handled through the Richmond County Clerk.

Use ACRIS to review the apparent ownership chain, recent mortgages, recorded liens, and deed history. Names can be misspelled and documents can be indexed imperfectly, so this is reconnaissance, not a title opinion. NYC explicitly warns that ACRIS is not a substitute for a professional title search.

## DOB NOW and BIS: building records

The Department of Buildings maintains two public systems. **DOB NOW** contains newer filings, permits, inspections, and many violations. The older **Building Information System (BIS)** still holds legacy jobs, certificates, complaints, and records that have not moved to DOB NOW. Check both.

Compare the actual home with approved use and plans. A finished basement, added bathroom, converted garage, enclosed terrace, or combined apartment may look polished but still lack approval. Search for open permit jobs, expired permits, stop-work orders, complaints, and violations. An open DOB violation can complicate a Certificate of Occupancy amendment and may delay a sale or refinancing.

## HPD: housing-maintenance history

For multiple dwellings and rental buildings, **HPD Online** shows registration, complaints, violations, litigation, and related housing-maintenance information. A condo buyer should review the building, not only the unit. Repeated heat, hot-water, mold, pest, or safety complaints may reveal an operational issue that financial statements alone do not show.

## Turn findings into diligence questions

Public records can be stale, duplicated, dismissed, or attached to the building rather than the unit. Give the results to the buyer's attorney and, where condition or legality is involved, an architect or engineer. Ask the seller or managing agent for closure documents rather than accepting “it was taken care of.”

Before contract, save a PDF or screenshot of the searches and record the date. Databases change, and a clean search is not a warranty. The goal is to identify questions early enough that licensed professionals can resolve them.

## Official sources

- NYC ACRIS: https://www.nyc.gov/site/finance/property/acris.page
- NYC DOB building data: https://www.nyc.gov/site/buildings/dob/find-building-data.page
- DOB NOW public-portal FAQs: https://www.nyc.gov/site/buildings/industry/dob-now-public-portal-faqs.page
- HPD Online: https://hpdonline.nyc.gov/

*This article is educational information, not legal, title, engineering, or building-code advice.*`,
      zh: `房源页面讲的是营销故事，纽约市公开数据库则记录了房产部分法律和运营历史。它们不能代替律师、产权调查、工程师或大楼尽调，但能帮助买家在签合同前问出更准确的问题。

## 先找到正确识别码

从城市房产资料或税务记录中找到 borough、block、lot，也就是 **BBL**。街道地址可能有多种写法，BBL 才是跨政府部门检索的稳定钥匙。Condo 单元通常有独立 lot；Co-op 是公司股份，往往不会作为单独 deed 房产出现。

## ACRIS：已登记产权文件

**ACRIS** 保存曼哈顿、布鲁克林、皇后区和布朗克斯的 deed、mortgage、satisfaction、assignment 等登记文件，通常可追溯至 1966 年。史泰登岛由 Richmond County Clerk 管理。

可用 ACRIS 初步查看产权链、近期贷款、已登记 lien 和 deed 历史。但姓名可能拼错，文件索引也可能不完整，因此它只是前期侦查，不是产权意见。纽约市也明确说明，ACRIS 不能代替专业 title search。

## DOB NOW 与 BIS：建筑记录

楼宇局同时保留两套公开系统。**DOB NOW** 包含较新的申请、许可、检查和许多违规；较旧的 **Building Information System（BIS）** 仍保存历史工程、Certificate、投诉及尚未迁移的记录。两边都要查。

把房屋现状与批准用途及图纸对照。装修精美的地下室、新增浴室、车库改房间、封闭露台或打通单元，仍可能没有合法批准。应查找未结工程、过期许可、停工令、投诉和违规。未结 DOB violation 可能影响 Certificate of Occupancy 变更，也会拖延出售或再融资。

## HPD：住房维护历史

对于多户住宅和出租楼，**HPD Online** 会显示登记、投诉、违规、诉讼及住房维护资料。Condo 买家也应查询整栋楼，不要只看本单元。反复出现的暖气、热水、霉菌、虫害或安全投诉，可能暴露财务报表里看不到的运营问题。

## 把检索结果变成尽调问题

公开记录可能滞后、重复、已经撤销，也可能属于整栋楼而不是单元。应把结果交给买方律师；涉及房况或合法用途时，再交由建筑师或工程师判断。卖家或管理公司声称“已经处理”时，应要求提供结案文件。

签合同前保存检索 PDF 或截图并记录日期。数据库会变化，“没搜到问题”也不构成保证。真正目标是尽早发现问题，让持牌专业人士有时间核实和解决。

## 官方来源

- 纽约市 ACRIS：https://www.nyc.gov/site/finance/property/acris.page
- DOB 楼宇资料：https://www.nyc.gov/site/buildings/dob/find-building-data.page
- DOB NOW 常见问题：https://www.nyc.gov/site/buildings/industry/dob-now-public-portal-faqs.page
- HPD Online：https://hpdonline.nyc.gov/

*本文为教育信息，不构成法律、产权、工程或建筑法规建议。*`,
    },
  },
  {
    slug: "nyc-renovation-permits-board-approval",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["buying"],
    parentGuideSlug: "buying-in-nyc",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/construction.jpg`,
    readMinutes: 6,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "Renovating in NYC: Board Approval, DOB Permits, and Contractor Checks",
      zh: "纽约装修前先问清：大楼批准、DOB 许可与承包商资质",
    },
    excerpt: {
      en: "Why a building's alteration agreement and a city permit are separate approvals, and how to organize the work before demolition starts.",
      zh: "大楼装修协议与城市许可是两套独立批准；拆除前应如何安排设计、保险和承包商。",
    },
    body: {
      en: `A renovation can require approval from the building, New York City, or both. Permission from a co-op board or condo management does not replace a Department of Buildings permit, and a city permit does not waive the building's alteration agreement.

## Separate cosmetic work from regulated work

Painting, plastering, installing cabinets, resurfacing floors, and certain non-structural repairs may not require a DOB permit. Work involving walls, plumbing, electrical systems, gas, structural elements, egress, occupancy, or fire protection often does. The exact scope matters more than the label “renovation.”

Before signing a contractor proposal, have a New York-licensed architect or professional engineer identify which filings and permits are required. If the plan depends on legalizing existing unpermitted work, address that separately rather than burying it inside a new project.

## Read the building alteration agreement

Co-ops and condos commonly require an alteration application, drawings, contractor licenses, insurance certificates, deposits, work-hour rules, elevator protection, neighbor notices, and architect review. Some buildings restrict wet-over-dry layouts, moving kitchens, floor soundproofing, summer work, or the duration of construction.

Request the agreement before purchase when renovation is central to the deal. A technically possible layout may still be prohibited by building policy, and review fees or deposits can materially change the budget.

## Verify the people doing the work

Check required Home Improvement Contractor licensing through NYC Department of Consumer and Worker Protection and verify trade licenses where electrical, plumbing, fire-suppression, or other regulated work is involved. The name on the contract, license, insurance, and permit should match the party actually responsible.

The contract should define scope, drawings, materials, change orders, payment milestones, cleanup, permits, inspections, lien handling, insurance, and responsibility for building fines. Avoid paying the full price before required inspections and closeout documents are complete.

## Close the job, not just the construction site

At completion, collect signed permits, inspection results, letters of completion, equipment warranties, approved plans, and the building's deposit release. Confirm in DOB NOW or BIS that filed work is closed. Open permits can become the next owner's problem and can delay a future refinance or sale.

## Official sources

- NYC DOB — Do I need a permit?: https://www.nyc.gov/site/buildings/property-or-business-owner/do-i-need-a-permit.page
- NYC DOB homeowner toolkits: https://www.nyc.gov/site/buildings/property-or-business-owner/tool-kits.page
- NYC Consumer and Worker Protection — contractor licensing: https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page

*This article is general information. Confirm the property, building, and project with licensed design, legal, and construction professionals.*`,
      zh: `纽约装修可能需要大楼批准、纽约市批准，或者两者都需要。Co-op 董事会或 Condo 管理公司的许可不能代替楼宇局 permit；城市 permit 也不能跳过大楼的 alteration agreement。

## 区分表面装修与受监管工程

刷漆、补墙、安装橱柜、地板翻新和部分非结构维修可能不需要 DOB permit。涉及墙体、水管、电气、燃气、结构、逃生、用途或消防系统的工程通常需要。是否需要许可取决于实际 scope，不取决于合同标题是否写着“renovation”。

签承包商合同前，应让纽约州持牌建筑师或专业工程师判断所需申请与许可。如果方案依赖把既有无许可工程合法化，应作为独立问题处理，不能悄悄塞进新工程里。

## 阅读大楼装修协议

Co-op 和 Condo 通常会要求装修申请、图纸、承包商执照、保险证明、押金、施工时段、电梯保护、邻居通知和建筑师审查。有些大楼限制 wet-over-dry、移动厨房、地板隔音、夏季施工或总工期。

如果装修是买房决策核心，应在购买前索取协议。技术上可以实现的户型，也可能被大楼政策禁止；审图费和押金也可能明显改变预算。

## 核验实际施工人员

需要 Home Improvement Contractor license 时，应通过纽约市消费者与劳工保护局查询；涉及电气、水管、消防等受监管专业时，还要核验对应 trade license。合同、执照、保险和 permit 上的主体，应与真正承担责任的施工方一致。

合同应写清 scope、图纸、材料、变更单、付款节点、清运、许可、检查、lien、保险及大楼罚款责任。要求的检查与结案文件完成前，不应支付全部工程款。

## 结束工程，也要关闭政府档案

完工后收齐 permit、检查结果、completion letter、设备保修、批准图纸和大楼押金退还文件，并在 DOB NOW 或 BIS 确认工程已关闭。未结 permit 会留给下一任业主，也可能拖延未来再融资或出售。

## 官方来源

- NYC DOB 是否需要许可：https://www.nyc.gov/site/buildings/property-or-business-owner/do-i-need-a-permit.page
- NYC DOB 房主工具包：https://www.nyc.gov/site/buildings/property-or-business-owner/tool-kits.page
- NYC 承包商执照清单：https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page

*本文为一般信息。具体房产、大楼和工程请由持牌设计、法律与施工专业人士确认。*`,
    },
  },
  {
    slug: "sell-nyc-home-open-permits-violations",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["selling"],
    parentGuideSlug: "selling-in-new-york",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/brownstone.jpg`,
    readMinutes: 6,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "Selling in NYC with Open Permits or Violations",
      zh: "纽约卖房前如何处理未结许可与违规记录",
    },
    excerpt: {
      en: "How to find open DOB records early, decide whether to cure them, and avoid discovering the problem during buyer diligence.",
      zh: "挂牌前如何发现未结 DOB 记录、判断是否整改，避免买方尽调时才暴露问题。",
    },
    body: {
      en: `An open permit, unresolved violation, or mismatch between the legal record and the home's current layout does not always make a sale impossible. It does create a diligence issue that can reduce the buyer pool, affect financing, delay closing, or force a late credit.

## Search before the listing launches

Check both DOB NOW and BIS using the address and BBL. Review open job filings, permit status, complaints, violations, stop-work orders, Certificate of Occupancy records, and any related Environmental Control Board matters. For a condo or co-op, distinguish building-wide issues from work associated with the unit.

Compare the public record with what a buyer will see: bedrooms, bathrooms, basement use, decks, garages, combined units, walls, plumbing fixtures, and major equipment. If the property is marketed in a way the legal record does not support, correct the description before the first showing.

## Decide whether to cure, disclose, credit, or restructure

Some records can be closed by completing inspections or filing missing documents. Others require an architect or engineer, corrective construction, penalties, or a new application. A very old job may need a specialist who understands legacy filings.

Bring the search to the seller's attorney and a licensed design professional. They can estimate time, cost, and whether the issue must be resolved before a lender or title insurer will proceed. The seller can then choose a strategy deliberately rather than negotiating under a closing deadline.

## Prepare a clean diligence package

Keep permits, approved plans, sign-offs, letters of completion, violation-dismissal records, contractor invoices, warranties, and building approvals together. For work that did not require a permit, ask the appropriate professional whether a written explanation is useful. A clear file does not erase risk, but it helps the buyer's team reach an answer faster.

## Why waiting is expensive

If the buyer discovers the issue after contract negotiation begins, the seller may lose leverage and time. A financing buyer may face an appraisal or underwriting condition; a cash buyer may demand a holdback or price reduction. Early work gives the seller more choices, including changing the launch date or pricing with the issue already understood.

## Official sources

- NYC DOB — Find building data: https://www.nyc.gov/site/buildings/dob/find-building-data.page
- What is a DOB violation?: https://www.nyc.gov/site/buildings/property-or-business-owner/what-is-a-dob-violation.page
- Certificate of Occupancy information: https://www.nyc.gov/site/buildings/property-or-business-owner/certificate-of-occupancy.page

*This article is general information, not legal, engineering, title, or building-code advice.*`,
      zh: `未结 permit、尚未处理的 violation，或房屋现状与合法档案不一致，并不一定导致无法出售。但它会成为尽调问题，可能缩小买家范围、影响贷款、拖延过户，或迫使卖家在最后阶段提供 credit。

## 挂牌前主动搜索

用地址与 BBL 同时查询 DOB NOW 和 BIS，查看未结工程、permit 状态、投诉、违规、停工令、Certificate of Occupancy 及相关 Environmental Control Board 事项。Condo 或 Co-op 还要区分整栋楼问题与本单元施工记录。

把公开档案与买家现场看到的内容逐项对照：卧室、浴室、地下室用途、露台、车库、打通单元、墙体、水管设备和主要机电。如果营销描述超出合法记录，应在第一次带看前改正。

## 决定整改、披露、补偿还是调整交易结构

部分记录只需完成检查或补交文件即可关闭；另一些则需要建筑师或工程师、整改施工、罚款或重新申请。年代久远的工程可能需要熟悉旧系统的专业人士。

应把检索结果交给卖方律师和持牌设计专业人士，让他们估算时间、成本，以及贷款机构或 title insurer 是否要求先解决。卖家才能在没有 closing deadline 压力时主动选择策略。

## 准备清楚的尽调文件包

把 permit、批准图纸、sign-off、completion letter、违规撤销记录、承包商发票、保修和大楼批准集中保存。对于确实无需 permit 的施工，可询问专业人士是否需要书面说明。清楚的文件不能消除风险，但能帮助买方团队更快得出结论。

## 为什么拖到最后更贵

买家若在合同谈判后才发现问题，卖家通常会失去时间和议价能力。贷款买家可能遇到估价或 underwriting 条件；现金买家可能要求 holdback 或降价。提前处理可保留更多选择，包括调整上市日期，或在已知问题的情况下合理定价。

## 官方来源

- NYC DOB 楼宇资料：https://www.nyc.gov/site/buildings/dob/find-building-data.page
- DOB violation 说明：https://www.nyc.gov/site/buildings/property-or-business-owner/what-is-a-dob-violation.page
- Certificate of Occupancy：https://www.nyc.gov/site/buildings/property-or-business-owner/certificate-of-occupancy.page

*本文为一般信息，不构成法律、工程、产权或建筑法规建议。*`,
    },
  },
  {
    slug: "nyc-deed-recording-alert-homeowner",
    date: reviewed,
    contentKind: "evergreen",
    topic: "new-york",
    secondaryTags: ["policy", "buying"],
    parentGuideSlug: "buying-in-nyc",
    authorSlug: "sunny",
    cover: `${SITE_MEDIA_ROOT}/journal/covers/city-hall.jpg`,
    readMinutes: 5,
    category: { en: "New York Homeownership", zh: "纽约专栏" },
    title: {
      en: "A Free NYC Deed-Recording Alert Every Homeowner Should Consider",
      zh: "纽约房主过户后应设置的免费产权文件提醒",
    },
    excerpt: {
      en: "What the Notice of Recorded Document program watches, what it cannot prevent, and why owners should still review ACRIS.",
      zh: "Notice of Recorded Document 会监控什么、不能阻止什么，以及为什么仍要定期查看 ACRIS。",
    },
    body: {
      en: `New York City offers a free **Notice of Recorded Document** program that can alert an owner when certain deed-, mortgage-, or ownership-related documents are recorded against a registered property. It is a useful monitoring layer after closing, especially for an owner who does not regularly review public records.

## What the alert does

The subscriber registers contact information and the property's borough, block, and lot. When a covered document is recorded, the city sends a notice by the selected method. The alert gives the owner an opportunity to review the filing quickly and respond if it was not expected.

The notice is not proof that fraud occurred. A legitimate refinance, satisfaction, assignment, estate filing, or correction can also trigger it. Compare the document with recent transactions and contact the closing attorney or lender when the filing is unclear.

## What the alert does not do

The program does **not** stop a document from being recorded, verify signatures before recording, insure title, or replace legal action. It is an after-recording notification. If an unfamiliar deed or mortgage appears, contact the Department of Finance's deed-fraud unit and a New York real-estate attorney promptly.

Co-op apartments present a limitation because individual units are not separately deeded by BBL. A subscriber may receive notices for the entire building rather than only one apartment. The program is most direct for deeded property such as houses and condos.

## Add it to the post-closing checklist

After the deed appears in ACRIS, confirm the owner name and property identifiers, save the recorded document, register for the notice program, and keep the closing attorney's file. Review ACRIS periodically even if no alert arrives. Also keep the Department of Finance mailing address current so tax and assessment notices reach the owner.

No single alert prevents deed fraud. The value is speed: an owner who sees an unexpected filing early has more time to preserve records, notify agencies, and obtain legal help.

## Official sources

- NYC Department of Finance — Deed fraud: https://www.nyc.gov/site/finance/property/deed-fraud.page
- Notice of Recorded Document FAQs: https://www.nyc.gov/site/finance/property/deed-fraud-program-faq.page
- ACRIS property records: https://www.nyc.gov/site/finance/property/acris.page

*This article is general educational information, not legal or title advice.*`,
      zh: `纽约市提供免费的 **Notice of Recorded Document** 服务。当登记房产名下出现特定 deed、mortgage 或产权相关文件时，系统可以向业主发出提醒。对平时不会主动查看公开记录的业主来说，这是过户后很实用的一层监控。

## 提醒能做什么

订阅人登记联系方式以及房产的 borough、block、lot。符合范围的文件完成登记后，城市会通过所选方式通知。业主可以尽快查看文件，并在不是自己预期的情况下采取行动。

收到提醒不代表一定发生了诈骗。正常再融资、贷款结清、assignment、遗产文件或更正登记也可能触发。应与近期交易对照，不清楚时联系过户律师或贷款机构。

## 提醒不能做什么

该项目**不能**阻止文件登记，也不会在登记前核实签名、提供产权保险或代替法律行动。它只是事后通知。若发现陌生 deed 或 mortgage，应尽快联系财政局 deed-fraud 部门及纽约房地产律师。

Co-op 单元存在限制，因为每套公寓没有独立 deed BBL。订阅人可能收到整栋楼的文件提醒，而不是只针对一个单元。对独栋和 Condo 等有独立 deed 的房产，这项服务更直接。

## 加入过户后清单

Deed 出现在 ACRIS 后，确认业主姓名和房产识别码，保存登记文件，注册提醒，并保留过户律师档案。即使没有收到提醒，也应定期查看 ACRIS；同时保持财政局邮寄地址准确，确保税务与评估通知能够送达。

没有任何单一提醒可以杜绝 deed fraud。它真正的价值是速度：越早看到异常文件，越有时间保存证据、通知政府机构并取得法律帮助。

## 官方来源

- 纽约市财政局 deed fraud：https://www.nyc.gov/site/finance/property/deed-fraud.page
- 文件提醒常见问题：https://www.nyc.gov/site/finance/property/deed-fraud-program-faq.page
- ACRIS 房产记录：https://www.nyc.gov/site/finance/property/acris.page

*本文仅为一般教育信息，不构成法律或产权建议。*`,
    },
  },
];
