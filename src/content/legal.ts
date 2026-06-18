/**
 * Bilingual legal content. Fair Housing + Accessibility are near-final standard
 * statements; Privacy + Terms are working templates (note: true) — have counsel
 * finalize jurisdiction-specific text before launch.
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
      en: "Homix Realty Inc. is committed to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the nation.",
      zh: "Homix Realty Inc. 恪守美国实现全国平等住房机会的政策及其精神。",
    },
    note: false,
    sections: [
      {
        heading: { en: "Our commitment", zh: "我们的承诺" },
        body: {
          en: "We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, sexual orientation, gender identity, or any other class protected by federal, New York State, or local law.",
          zh: "我们不因种族、肤色、宗教、性别、残障、家庭状况、国籍、性取向、性别认同，或联邦、纽约州及地方法律保护的任何其他类别而歧视。",
        },
      },
      {
        heading: { en: "New York Fair Housing Notice", zh: "纽约公平住房须知" },
        body: {
          en: "Under New York law, real estate licensees must provide a Fair Housing Notice and follow Standard Operating Procedures for prospective homebuyers. Copies are published by the New York Department of State and are available on request.",
          zh: "根据纽约法律，持牌地产从业者须向潜在购房者提供《公平住房须知》并遵守《标准操作流程》。相关文件由纽约州务厅发布，亦可应要求提供。",
        },
      },
      {
        heading: { en: "Report a concern", zh: "反映问题" },
        body: {
          en: "If you believe you have experienced discrimination, contact us, the New York Department of State, or the U.S. Department of Housing and Urban Development (HUD).",
          zh: "若你认为遭遇歧视，可联系我们、纽约州务厅，或美国住房与城市发展部（HUD）。",
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
      en: "This policy explains how Homix Realty Inc. collects, uses, and protects your information.",
      zh: "本政策说明 Homix Realty Inc. 如何收集、使用与保护你的信息。",
    },
    note: true,
    sections: [
      {
        heading: { en: "Information we collect", zh: "我们收集的信息" },
        body: {
          en: "Contact details you provide through our forms (name, phone, email, message), and standard analytics data such as pages viewed and device type.",
          zh: "你通过表单提供的联系信息（姓名、电话、邮箱、留言），以及页面浏览、设备类型等标准分析数据。",
        },
      },
      {
        heading: { en: "How we use it", zh: "我们如何使用" },
        body: {
          en: "To respond to your inquiries, provide real estate services, and improve the site. We do not sell your personal information.",
          zh: "用于回应你的咨询、提供地产服务、改进网站。我们不出售你的个人信息。",
        },
      },
      {
        heading: { en: "Your choices", zh: "你的选择" },
        body: {
          en: "You may request access to, correction of, or deletion of your information, and opt out of marketing communications, by contacting us. California residents have additional rights under the CCPA/CPRA, including a Do-Not-Sell-or-Share option.",
          zh: "你可联系我们，请求访问、更正或删除你的信息，并退订营销通讯。加州居民根据 CCPA/CPRA 享有额外权利，包括「不出售或共享」选项。",
        },
      },
    ],
  },
  terms: {
    title: { en: "Terms of Use", zh: "服务条款" },
    intro: {
      en: "These terms govern your use of the Homix website.",
      zh: "本条款规范你对 Homix 网站的使用。",
    },
    note: true,
    sections: [
      {
        heading: { en: "Listing information", zh: "房源信息" },
        body: {
          en: "Property information is provided for general informational purposes and is deemed reliable but not guaranteed. It should be independently verified and is subject to change or prior sale.",
          zh: "房源信息仅供一般参考，力求可靠但不作保证。应自行核实，且可能变更或已先行售出。",
        },
      },
      {
        heading: { en: "Use of the site", zh: "网站使用" },
        body: {
          en: "You agree to use the site lawfully and not to copy, scrape, or misuse its content. All trademarks and content are the property of Homix or their respective owners.",
          zh: "你同意合法使用本网站，不复制、抓取或滥用其内容。所有商标与内容归 Homix 或各自所有者所有。",
        },
      },
      {
        heading: { en: "Disclaimers", zh: "免责声明" },
        body: {
          en: "The site is provided “as is” without warranties. Homix is not liable for indirect or consequential damages arising from its use.",
          zh: "本网站按「现状」提供，不附带任何保证。对因使用本网站而产生的间接或后果性损失，Homix 不承担责任。",
        },
      },
    ],
  },
};
