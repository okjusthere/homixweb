/**
 * Bilingual legal content for a New York real estate brokerage. Have counsel
 * and the broker of record review the final published text as part of launch QA.
 */

export interface Bilingual {
  en: string;
  zh: string;
}

export interface LegalSection {
  heading: Bilingual;
  body: Bilingual;
}

export interface LegalDoc {
  title: Bilingual;
  intro: Bilingual;
  sections: LegalSection[];
  /** Show the "have counsel finalize" note. */
  note: boolean;
}

export const legalDocs: Record<string, LegalDoc> = {
  "fair-housing": {
    title: { en: "Fair Housing & Equal Opportunity", zh: "公平住房与平等机会" },
    intro: {
      en: "Homix Realty Inc. is committed to equal housing opportunity and to serving every client and customer fairly, consistently, and lawfully.",
      zh: "Homix Realty Inc. 致力于公平住房机会，并以公平、一致、合法的方式服务每一位客户与消费者。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Our commitment", zh: "我们的承诺" },
        body: {
          en: "We do not discriminate in the sale, rental, financing, marketing, showing, negotiation, or servicing of housing based on race, color, religion or creed, national origin, sex, disability, familial status, age, marital status, sexual orientation, gender identity or expression, military status, lawful source of income, or any other status protected by federal, New York State, or local law.",
          zh: "在住房销售、租赁、融资、营销、带看、谈判或服务过程中，我们不因种族、肤色、宗教或信仰、国籍、性别、残障、家庭状况、年龄、婚姻状况、性取向、性别认同或表达、军人身份、合法收入来源，或联邦、纽约州及地方法律保护的任何其他身份而歧视。",
        },
      },
      {
        heading: { en: "New York Fair Housing Notice", zh: "纽约公平住房须知" },
        body: {
          en: "The New York Department of State publishes the required Fair Housing Notice for real estate licensees. Homix makes this notice available through this website and will provide a copy on request. The Department of State fair housing resources are available at https://dos.ny.gov/fair-housing.",
          zh: "纽约州务厅发布了地产持牌人员须使用的《公平住房须知》。Homix 在本网站提供该须知，并可应要求提供副本。纽约州务厅公平住房资源见 https://dos.ny.gov/fair-housing。",
        },
      },
      {
        heading: { en: "Standardized Operating Procedures", zh: "标准操作流程" },
        body: {
          en: "New York brokers must maintain standardized operating procedures for prospective homebuyers and make them publicly available. Homix publishes its procedures at /standard-operating-procedures and keeps current copies available at its office.",
          zh: "纽约州地产经纪公司须为潜在购房者制定并公开标准操作流程。Homix 在 /standard-operating-procedures 发布相关流程，并在办公室保存最新版本。",
        },
      },
      {
        heading: { en: "Report a concern", zh: "反映问题" },
        body: {
          en: "If you believe you have experienced discrimination, contact Homix, the New York State Division of Human Rights, the New York Department of State, or the U.S. Department of Housing and Urban Development (HUD). Homix will not retaliate against any person for raising a fair housing concern.",
          zh: "若你认为遭遇歧视，可联系 Homix、纽约州人权署、纽约州务厅，或美国住房与城市发展部（HUD）。任何人提出公平住房疑虑，Homix 均不会进行报复。",
        },
      },
    ],
  },
  "standard-operating-procedures": {
    title: { en: "Standardized Operating Procedures", zh: "标准操作流程" },
    intro: {
      en: "Homix Realty Inc. maintains these standardized operating procedures for prospective homebuyers in accordance with New York Real Property Law section 442-h and New York Department of State guidance.",
      zh: "Homix Realty Inc. 根据纽约《不动产法》第 442-h 条及纽约州务厅指引，为潜在购房者制定并公开以下标准操作流程。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Identification", zh: "身份证明" },
        body: {
          en: "Homix does not require prospective homebuyers to show identification before receiving brokerage services. Identification may be requested when required by a property owner, building, managing agent, listing broker, open house policy, applicable law, safety procedure, fraud-prevention practice, or before preparing transaction documents.",
          zh: "Homix 不要求潜在购房者在接受经纪服务前出示身份证明。但在业主、楼宇、管理方、挂牌经纪、开放屋政策、适用法律、安全流程、防欺诈流程，或准备交易文件时，可根据需要要求出示身份证明。",
        },
      },
      {
        heading: { en: "Exclusive buyer broker agreement", zh: "独家买方经纪协议" },
        body: {
          en: "Homix does not require a prospective homebuyer to sign an exclusive buyer broker agreement before receiving brokerage services. A written agreement may be discussed or required before Homix undertakes specific representation, compensation, offer-preparation, or negotiation services, and any such requirement will be applied consistently and in compliance with law.",
          zh: "Homix 不要求潜在购房者在接受经纪服务前签署独家买方经纪协议。在 Homix 提供特定代理、佣金安排、出价准备或谈判服务前，双方可讨论或需要签署书面协议；任何此类要求均将一致适用并遵守法律。",
        },
      },
      {
        heading: { en: "Mortgage pre-approval or proof of funds", zh: "贷款预批或资金证明" },
        body: {
          en: "Homix does not require a prospective homebuyer to provide a mortgage pre-approval, pre-qualification, or proof of funds before receiving brokerage services. A seller, listing broker, building, sponsor, or other third party may require such documentation before a showing, offer, board package, application, or contract step. Homix may also request documentation when it is reasonably needed to prepare or present an offer.",
          zh: "Homix 不要求潜在购房者在接受经纪服务前提供贷款预批、预资格证明或资金证明。但卖方、挂牌经纪、楼宇、开发商或其他第三方可在带看、出价、董事会材料、申请或合同阶段前要求相关文件。Homix 也可在合理需要准备或提交出价时要求相关文件。",
        },
      },
      {
        heading: { en: "Equal application", zh: "一致适用" },
        body: {
          en: "These procedures apply to Homix Realty Inc. and its associated licensees and teams. Property-specific requirements from sellers, buildings, listing brokers, or other third parties will be communicated when known and applied without discrimination.",
          zh: "本流程适用于 Homix Realty Inc. 及其关联持牌人员与团队。来自卖方、楼宇、挂牌经纪或其他第三方的特定房源要求，在已知时将予以说明，并以非歧视方式适用。",
        },
      },
      {
        heading: { en: "Updates and archive", zh: "更新与存档" },
        body: {
          en: "Homix maintains an archive of its standardized operating procedures for as long as it remains actively licensed. Any amendment will be date-stamped, retained, and posted online and at the brokerage office within the period required by New York law.",
          zh: "只要 Homix 保持有效持牌状态，将保存标准操作流程的历史版本。任何修订均将标注日期、留存，并按纽约法律要求在网站和经纪公司办公室发布。",
        },
      },
    ],
  },
  accessibility: {
    title: { en: "Accessibility Statement", zh: "无障碍声明" },
    intro: {
      en: "Homix is committed to ensuring digital accessibility for people of all abilities.",
      zh: "Homix 致力于确保所有能力的用户都能无障碍访问本网站。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Our standard", zh: "我们的标准" },
        body: {
          en: "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA and continually work to improve the experience for every visitor.",
          zh: "我们以符合《网页内容无障碍指南》（WCAG）2.2 AA 级为目标，并持续改进每位访客的体验。",
        },
      },
      {
        heading: { en: "Need assistance?", zh: "需要协助？" },
        body: {
          en: "If you have difficulty accessing any part of this site, or need information in an alternative format, please contact us by phone or email and we will help you directly.",
          zh: "若你在访问本网站任何部分时遇到困难，或需要其他格式的信息，请通过电话或邮件联系我们，我们会直接为你提供协助。",
        },
      },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", zh: "隐私政策" },
    intro: {
      en: "This Privacy Policy explains how Homix Realty Inc. collects, uses, discloses, and protects information through this website and related brokerage communications.",
      zh: "本隐私政策说明 Homix Realty Inc. 如何通过本网站及相关经纪沟通收集、使用、披露和保护信息。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Information we collect", zh: "我们收集的信息" },
        body: {
          en: "We collect information you provide directly, including name, phone number, email address, message content, property interests, preferred language, and communications with Homix. We may also collect website usage data such as pages viewed, referring page, device/browser information, approximate location derived from IP address, and form-submission metadata used for security and recordkeeping.",
          zh: "我们收集你直接提供的信息，包括姓名、电话、电子邮箱、留言内容、房产需求、偏好语言，以及与 Homix 的沟通内容。我们也可能收集网站使用数据，例如浏览页面、来源页面、设备/浏览器信息、由 IP 地址推断的大致位置，以及用于安全和记录保存的表单提交元数据。",
        },
      },
      {
        heading: { en: "How we use information", zh: "我们如何使用信息" },
        body: {
          en: "We use information to respond to inquiries, schedule consultations and showings, provide real estate brokerage services, evaluate property or agent-fit requests, send service-related communications, maintain compliance records, prevent fraud or misuse, improve the website, and, with appropriate consent, send marketing communications. We do not sell personal information.",
          zh: "我们使用信息以回应咨询、安排咨询或带看、提供地产经纪服务、评估房产或经纪人合作需求、发送服务相关沟通、保存合规记录、防止欺诈或滥用、改进网站，并在取得适当同意时发送营销信息。我们不出售个人信息。",
        },
      },
      {
        heading: { en: "Sharing", zh: "信息共享" },
        body: {
          en: "We may share information with Homix licensees and staff, service providers who help operate the website or communications, and transaction participants such as attorneys, lenders, inspectors, title companies, managing agents, cooperating brokers, MLS/IDX providers, or other parties when needed for brokerage services. We may disclose information when required by law, regulation, subpoena, MLS rule, court order, or to protect rights, safety, and security.",
          zh: "我们可能与 Homix 持牌人员及员工、协助运营网站或通信的服务商，以及在经纪服务中需要参与的交易方共享信息，例如律师、贷款机构、验房师、产权公司、管理方、合作经纪、MLS/IDX 提供方或其他相关方。我们也可能在法律、法规、传票、MLS 规则、法院命令要求，或为保护权利、安全和安保时披露信息。",
        },
      },
      {
        heading: { en: "Calls, texts, and email", zh: "电话、短信与电子邮件" },
        body: {
          en: "When you submit a form or contact Homix, you authorize Homix and its associated licensees to respond using the contact information you provide. Consent to receive marketing calls, texts, or emails is not a condition of receiving brokerage services. You may opt out of marketing communications at any time; transactional or service-related communications may still be sent when needed.",
          zh: "当你提交表单或联系 Homix，即授权 Homix 及其关联持牌人员使用你提供的联系方式进行回复。接收营销电话、短信或电子邮件的同意并非接受经纪服务的条件。你可随时退订营销通信；在必要时，我们仍可能发送交易或服务相关沟通。",
        },
      },
      {
        heading: { en: "Retention and security", zh: "留存与安全" },
        body: {
          en: "We retain information for as long as reasonably necessary to respond to inquiries, provide services, maintain business and legal records, resolve disputes, and comply with applicable obligations. We use administrative, technical, and organizational safeguards appropriate for a small brokerage website, but no internet or email transmission is completely secure.",
          zh: "我们将在合理必要期间内保留信息，以回应咨询、提供服务、保存业务和法律记录、解决争议并遵守适用义务。我们采用适合小型经纪公司网站的管理、技术和组织安全措施，但互联网或电子邮件传输均无法保证绝对安全。",
        },
      },
      {
        heading: { en: "Your choices", zh: "你的选择" },
        body: {
          en: "You may contact Homix to request access, correction, deletion, or opt-out assistance where applicable. California residents and residents of other jurisdictions may have additional rights under applicable privacy laws, including rights related to access, correction, deletion, portability, and opting out of certain sharing or targeted advertising. Homix will respond as required by applicable law.",
          zh: "在适用情况下，你可联系 Homix 请求访问、更正、删除信息或协助退订。加州及其他司法辖区居民可能根据适用隐私法律享有额外权利，包括访问、更正、删除、可携带，以及选择退出某些共享或定向广告的权利。Homix 将按适用法律要求回应。",
        },
      },
      {
        heading: { en: "Contact", zh: "联系我们" },
        body: {
          en: "Questions about this Privacy Policy may be sent to homix@homixny.com or mailed to Homix Realty Inc., 37-20 Prince St, Ste 3F, Flushing, NY 11354.",
          zh: "关于本隐私政策的问题，可发送至 homix@homixny.com，或邮寄至 Homix Realty Inc., 37-20 Prince St, Ste 3F, Flushing, NY 11354。",
        },
      },
    ],
  },
  terms: {
    title: { en: "Terms of Use", zh: "服务条款" },
    intro: {
      en: "These Terms of Use govern your use of the Homix Realty Inc. website and online content.",
      zh: "本服务条款规范你对 Homix Realty Inc. 网站及线上内容的使用。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Informational website", zh: "信息性网站" },
        body: {
          en: "This website is provided for general informational and marketing purposes. It does not create an agency relationship, fiduciary relationship, representation agreement, attorney-client relationship, lender relationship, or other professional relationship. A brokerage relationship with Homix begins only through the required disclosures, consents, and written agreements applicable to the specific service.",
          zh: "本网站仅用于一般信息与营销目的。使用本网站并不建立代理关系、信义关系、代理协议、律师客户关系、贷款关系或其他专业关系。与 Homix 的经纪关系仅在具体服务所需的披露、同意和书面协议完成后开始。",
        },
      },
      {
        heading: { en: "Real estate information", zh: "地产信息" },
        body: {
          en: "Property information, neighborhood information, market commentary, mortgage calculations, valuations, and other content are provided for general informational purposes and are deemed reliable only to the extent of their source, but are not guaranteed. Prices, availability, taxes, assessments, square footage, school information, building rules, property condition, and other details may change and should be independently verified by the user and appropriate professionals.",
          zh: "房源信息、社区信息、市场评论、房贷计算、估值和其他内容仅供一般参考，其可靠性取决于信息来源，但不作保证。价格、可售状态、税费、评估、面积、学校信息、楼宇规则、房屋状况及其他细节均可能变化，用户应自行并通过适当专业人士核实。",
        },
      },
      {
        heading: { en: "MLS/IDX and third-party content", zh: "MLS/IDX 与第三方内容" },
        body: {
          en: "Listing data may be provided by MLS/IDX sources, cooperating brokers, public records, third-party vendors, or property owners. Such information is subject to applicable MLS rules, attribution requirements, copyright restrictions, update intervals, errors, omissions, prior sale, lease, withdrawal, or price change. Homix does not grant permission to scrape, copy, redistribute, or commercially reuse listing data from this website.",
          zh: "房源数据可能来自 MLS/IDX、合作经纪、公共记录、第三方供应商或业主。此类信息受适用 MLS 规则、署名要求、版权限制、更新周期、错误、遗漏、已售、已租、撤回或价格变更影响。Homix 不授权抓取、复制、再分发或商业重复使用本网站房源数据。",
        },
      },
      {
        heading: { en: "No legal, tax, lending, or inspection advice", zh: "非法律、税务、贷款或验房建议" },
        body: {
          en: "Homix provides real estate brokerage services, not legal, tax, accounting, mortgage lending, appraisal, engineering, architectural, or inspection advice. Users should consult qualified professionals before making decisions involving contracts, financing, taxes, property condition, zoning, insurance, immigration, estate planning, or investment risk.",
          zh: "Homix 提供地产经纪服务，不提供法律、税务、会计、贷款、估价、工程、建筑或验房建议。涉及合同、融资、税务、房屋状况、分区、保险、移民、遗产规划或投资风险的决定，用户应咨询合格专业人士。",
        },
      },
      {
        heading: { en: "Fair housing and lawful use", zh: "公平住房与合法使用" },
        body: {
          en: "Users agree not to use this website to request, encourage, or facilitate discrimination or any conduct that would violate federal, New York State, or local fair housing, human rights, advertising, consumer protection, privacy, intellectual property, or real estate licensing laws. Homix reserves the right to decline or remove unlawful, abusive, misleading, or harmful submissions.",
          zh: "用户同意不使用本网站请求、鼓励或促成歧视，或任何违反联邦、纽约州或地方法律中关于公平住房、人权、广告、消费者保护、隐私、知识产权或地产持牌要求的行为。Homix 保留拒绝或移除违法、滥用、误导或有害提交内容的权利。",
        },
      },
      {
        heading: { en: "User submissions and consent", zh: "用户提交与同意" },
        body: {
          en: "When you submit a form, you represent that the information is accurate and that you are authorized to provide it. You authorize Homix and its associated licensees to contact you about your inquiry by phone, text, or email. Consent is not a condition of any brokerage service, and message/data rates may apply. You may request that marketing communications stop at any time.",
          zh: "当你提交表单，即表示所提供信息准确，且你有权提供该等信息。你授权 Homix 及其关联持牌人员通过电话、短信或电子邮件就你的咨询联系你。该同意并非任何经纪服务的条件，短信/数据费用可能适用。你可随时要求停止营销通信。",
        },
      },
      {
        heading: { en: "Intellectual property", zh: "知识产权" },
        body: {
          en: "The Homix name, logos, design, copy, photographs, videos, graphics, and other site content are owned by Homix or its licensors unless otherwise indicated. You may view the website for personal, non-commercial use only and may not reproduce, modify, distribute, scrape, frame, or create derivative works without written permission.",
          zh: "除非另有说明，Homix 名称、标识、设计、文案、照片、视频、图形及其他网站内容均归 Homix 或其许可方所有。你仅可为个人、非商业用途浏览本网站，未经书面许可不得复制、修改、分发、抓取、嵌入或创作衍生作品。",
        },
      },
      {
        heading: { en: "Third-party links and services", zh: "第三方链接与服务" },
        body: {
          en: "This website may link to third-party websites, maps, social platforms, MLS services, lenders, vendors, or other resources. Homix does not control and is not responsible for third-party content, policies, security, availability, or services.",
          zh: "本网站可能链接至第三方网站、地图、社交平台、MLS 服务、贷款机构、供应商或其他资源。Homix 不控制第三方内容、政策、安全性、可用性或服务，也不对此负责。",
        },
      },
      {
        heading: { en: "No warranty", zh: "无保证" },
        body: {
          en: "The website is provided as available and as is. To the maximum extent permitted by law, Homix disclaims warranties of accuracy, completeness, merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, and error-free operation.",
          zh: "本网站按可用状态和现状提供。在法律允许的最大范围内，Homix 不就准确性、完整性、适销性、特定用途适用性、不侵权、持续可用或无错误运行作出保证。",
        },
      },
      {
        heading: { en: "Limitation of liability", zh: "责任限制" },
        body: {
          en: "To the maximum extent permitted by law, Homix will not be liable for indirect, incidental, consequential, special, punitive, or lost-profit damages arising from use of or inability to use the website. Nothing in these terms limits liability that cannot be limited under applicable law or limits duties owed under a signed brokerage agreement.",
          zh: "在法律允许的最大范围内，对于因使用或无法使用本网站而产生的间接、附带、后果性、特殊、惩罚性或利润损失，Homix 不承担责任。本条款不限制适用法律不得限制的责任，也不限制已签署经纪协议项下的义务。",
        },
      },
      {
        heading: { en: "Governing law and updates", zh: "适用法律与更新" },
        body: {
          en: "These terms are governed by the laws of the State of New York, without regard to conflict-of-law rules. Homix may update these terms from time to time by posting a revised version on this website. Continued use of the website after an update means you accept the revised terms.",
          zh: "本条款受纽约州法律管辖，不适用冲突法规则。Homix 可不时在本网站发布修订版本以更新本条款。更新后继续使用本网站，即表示你接受修订后的条款。",
        },
      },
      {
        heading: { en: "Contact", zh: "联系" },
        body: {
          en: "Questions about these Terms of Use may be sent to homix@homixny.com or mailed to Homix Realty Inc., 37-20 Prince St, Ste 3F, Flushing, NY 11354.",
          zh: "关于本服务条款的问题，可发送至 homix@homixny.com，或邮寄至 Homix Realty Inc., 37-20 Prince St, Ste 3F, Flushing, NY 11354。",
        },
      },
    ],
  },
};
