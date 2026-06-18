import { cookies } from "next/headers";

/**
 * Lightweight bilingual (English / 中文) layer.
 *
 * Locale is read from a `locale` cookie on the server, so pages render fully in
 * the chosen language (good for both audiences). A header toggle sets the cookie.
 * NOTE: cookie-based locale makes pages dynamic; for per-language SEO indexing,
 * migrate to `/en` `/zh` path routing later. Listing/agent DATA stays as-is
 * (MLS is English); only brand/marketing copy is translated.
 */

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get("locale")?.value === "zh" ? "zh" : "en";
}

export async function getT() {
  const locale = await getLocale();
  return { locale, t: messages[locale] };
}

const en = {
  common: {
    listings: "Listings",
    advisors: "Advisors",
    journal: "Journal",
    sell: "Sell",
    join: "Join Homix",
    about: "About",
    contact: "Contact",
    neighborhoods: "Neighborhoods",
    privacy: "Privacy",
    terms: "Terms",
    accessibility: "Accessibility",
    fairHousing: "Fair Housing",
    explore: "Explore",
    firm: "Firm",
    legal: "Legal",
    backHome: "Back home",
    viewProfile: "View profile",
    calculator: "Mortgage calculator",
    langLabel: "中文",
  },
  footer: {
    eho: "Homix Realty Inc. is committed to the principles of the Fair Housing Act and the Equal Opportunity Act. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, or national origin. All information is deemed reliable but not guaranteed.",
    brokerOfRecord: "Broker of Record",
    licensedIn: "Licensed in",
    rights: "All rights reserved.",
  },
  hero: {
    eyebrow: "New York Real Estate · Media · AI",
    title: "Where homes meet headlines.",
    lead: "New York's media-first real estate company. We sell homes, build star agents, and run the content machine — a 1,000,000+ audience and AI-driven marketing that traditional brokerages can't touch.",
    ctaPrimary: "View listings",
    ctaSecondary: "Meet the team",
  },
  brandStory: {
    eyebrow: "The firm",
    title: "Not another brokerage. A real estate media company.",
    p1: "Homix blends the essence of home and mix: brokerage, media studio, and agent incubator under one roof. Viral video, lifestyle content, and a 1M+ audience put every listing — and every agent — in front of the market.",
    p2: "The result is exposure most firms can only dream of, faster closings, and a bilingual team that knows Queens, Long Island, and Manhattan by heart — backed by the data and AI that make every move sharper.",
  },
  pillars: {
    eyebrow: "What we do",
    title: "Three ways to work with Homix",
    items: [
      {
        eyebrow: "Buy & Sell",
        title: "Find or sell a home",
        body: "Full-service representation across Queens, Long Island, and Manhattan — with marketing that puts most brokerages to shame.",
        cta: "Browse listings",
      },
      {
        eyebrow: "Careers",
        title: "Build your career",
        body: "Join the brokerage that hands you an audience. Media training, personal-brand building, leads, and AI tools — we turn agents into stars, not just hires.",
        cta: "Join Homix",
      },
      {
        eyebrow: "Media & Marketing",
        title: "Reach more buyers",
        body: "A content studio with a 1M+ following produces the video and runs the campaigns that put properties — and people — in front of the entire market.",
        cta: "Work with our studio",
      },
    ],
  },
  stats: {
    items: [
      { value: "1M+", label: "Social followers" },
      { value: "40+", label: "Advisors" },
      { value: "Top", label: "NY content brokerage" },
      { value: "中 / EN", label: "Bilingual service" },
    ],
  },
  valueProps: [
    {
      title: "Media is our marketplace",
      body: "We were built on a self-media platform — viral video, lifestyle content, and a 1M+ audience that puts every listing in front of the right buyers, fast.",
    },
    {
      title: "We make agents into stars",
      body: "Homix is an incubator. Agents get media training, personal-brand building, real leads, and the tools to build a business — not just a desk.",
    },
    {
      title: "AI and data, not guesswork",
      body: "Pricing, marketing, and client guidance are sharpened by data and AI — so every decision is faster and better informed than the competition's.",
    },
  ],
  featured: {
    eyebrow: "Selected listings",
    title: "Featured New York homes",
    viewAll: "View all listings",
  },
  neighborhoods: {
    eyebrow: "Local knowledge",
    title: "Neighborhoods we know by heart",
    lead: "Pricing and timing come from people who actually walk these streets. A few of the places we cover most closely.",
    exploreAll: "Explore all neighborhoods",
  },
  reach: {
    eyebrow: "Our reach",
    title: "We don't wait for the headlines. We make them.",
    lead: "Every listing rides a content engine with a 1,000,000+ audience across platforms — the marketing edge behind faster, higher sales.",
  },
  testimonials: { eyebrow: "In their words" },
  team: {
    eyebrow: "The advisors",
    title: "The people behind the work",
    lead: "A senior, bilingual team. You work directly with the advisor whose name is on the door — not a hand-off.",
    cta: "Meet the advisors",
  },
  contactBand: {
    eyebrow: "Get in touch",
    title: "Let's talk about your next move.",
    lead: "Buying, selling, or just thinking it through — start a quiet conversation. No pressure, no obligation.",
  },
  inquiry: {
    name: "Full name",
    phone: "Phone",
    email: "Email",
    message: "How can we help?",
    consent:
      "I agree to be contacted by Homix by phone, text, or email about my inquiry. Consent is not a condition of any service. Message and data rates may apply; reply STOP to opt out.",
    submit: "Send inquiry",
    thanksTitle: "Thank you.",
    thanksBody: "We've received your note and will be in touch shortly.",
  },
  about: {
    eyebrow: "About Homix",
    title: "New York's first media-first real estate company.",
    lead: "Homix blends the essence of home and mix — a full-service brokerage, a media studio, and an agent incubator, powered by a 1,000,000+ audience and AI-driven marketing.",
    p1: "Most brokerages still market the way they did a decade ago. Homix was built differently — around viral social video, lifestyle content, and curated guides that amplify a property far beyond the MLS. The result is exposure traditional firms can't match, faster closings, and a marketing edge that compounds.",
    p2: "Behind the content is a bilingual team that knows Queens, Long Island, and Manhattan by heart — fluent in Mandarin and English, and relentless on behalf of every client from the first showing to the closing table.",
    foundersEyebrow: "Our founders",
    foundersTitle: "The people who built Homix",
    howEyebrow: "How we work",
    workWithUs: "Work with us",
    meetTeam: "Meet the team",
  },
  join: {
    eyebrow: "Careers · Join Homix",
    title: "Join the brokerage that hands you an audience.",
    lead: "Most brokerages give you a desk and a logo. Homix gives you a 1M+ media engine, real leads, and the tools to build a brand — so your business compounds instead of starting from zero on every deal.",
    benefits: [
      {
        title: "An audience on day one",
        body: "Plug into a 1,000,000+ following and a content engine already producing video, Reels, and lifestyle posts that generate real buyer and seller interest.",
      },
      {
        title: "A media studio behind you",
        body: "Professional photography, video walk-throughs, drone, and virtual staging — plus coaching to build and grow your own channel.",
      },
      {
        title: "Build a personal brand that compounds",
        body: "We help you develop a personal IP: more reach, more trust, more referrals — an asset that grows with every deal.",
      },
      {
        title: "Warm leads and AI tools",
        body: "Leads that come from our content, plus AI-assisted tools for pricing, marketing copy, and client follow-up that save you hours.",
      },
      {
        title: "Bilingual, senior mentorship",
        body: "Guidance from founders and brokers with decades of New York experience — fluent in Mandarin and English.",
      },
      {
        title: "A team, not a desk-fee factory",
        body: "We're a small, senior group that actually invests in your growth, from your first transaction to your hundredth.",
      },
    ],
    ctaEyebrow: "Let's talk",
    ctaTitle: "Tell us about yourself.",
    ctaLead:
      "Licensed already or just getting started — if you're ambitious and curious about a media-first brokerage, we'd love to talk. Every conversation is confidential.",
    orReach: "Or reach us directly at",
  },
  journal: {
    eyebrow: "Journal",
    title: "Notes from a media-first brokerage",
    lead: "Market reports, neighborhood deep-dives, and a point of view worth reading — from the people who do the work.",
    readMore: "Read article",
    by: "By",
    backToJournal: "All articles",
    minRead: "min read",
  },
  agentsPage: {
    eyebrow: "The team",
    title: "Our advisors",
    lead: "A bilingual team across Queens, Long Island, and Manhattan — each one a licensed New York professional who knows the neighborhoods firsthand.",
    contact: "Contact",
    licenseNo: "License #",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Start a quiet conversation.",
    lead: "Buying, selling, or just thinking it through — we're glad to help, with no pressure and no obligation.",
    byPhone: "By phone",
    byEmail: "By email",
    inPerson: "In person",
  },
  neighborhoodsPage: {
    eyebrow: "Neighborhoods",
    title: "The places we know best",
    lead: "Local guides to the New York neighborhoods where Homix works most closely.",
    viewHomes: "View homes here",
    backToAll: "All neighborhoods",
    photoBy: "Photo",
  },
  notFound: {
    eyebrow: "404",
    title: "This page has moved on.",
    lead: "The page you're looking for isn't here. Let's get you back to the homes.",
    backHome: "Back home",
    browseListings: "Browse listings",
  },
  legal: {
    note: "This is a working template. Have qualified counsel review and finalize the text before launch.",
    lastUpdated: "Last updated",
  },
  sell: {
    eyebrow: "Sell with Homix",
    title: "Your home deserves an audience.",
    lead: "Most listings reach a fraction of the market. Homix puts yours in front of a 1,000,000+ audience with video, content, and AI-driven marketing — so it sells faster, and for more.",
    points: [
      {
        title: "A marketing machine, not a yard sign",
        body: "Professional photography, video tours, and Reels distributed to a 1M+ audience already watching New York real estate.",
      },
      {
        title: "Priced with data, not guesswork",
        body: "We price with live market data and AI-assisted analysis, so your home lists at the number that actually moves.",
      },
      {
        title: "Concierge from prep to closing",
        body: "Staging, marketing, negotiation, and paperwork — handled end to end by an advisor whose name is on the door.",
      },
    ],
    valuationEyebrow: "Free home valuation",
    valuationTitle: "What's your home worth?",
    valuationLead: "Tell us about your home and a Homix advisor will prepare a complimentary, no-obligation valuation.",
    orCall: "Or call",
  },
  calculator: {
    eyebrow: "Tools",
    title: "Mortgage calculator",
    lead: "Estimate your monthly payment. For guidance only — talk to a lender for an exact quote.",
    homePrice: "Home price",
    downPayment: "Down payment",
    interestRate: "Interest rate",
    loanTerm: "Loan term (years)",
    monthlyPayment: "Estimated monthly payment",
    principalInterest: "Principal & interest",
    loanAmount: "Loan amount",
    disclaimer: "Estimates principal and interest only; taxes, insurance, and HOA are not included. Not a loan offer.",
  },
};

type Dict = typeof en;

const zh: Dict = {
  common: {
    listings: "房源",
    advisors: "经纪人",
    journal: "观察",
    sell: "卖房",
    join: "加入我们",
    about: "关于",
    contact: "联系",
    neighborhoods: "社区",
    privacy: "隐私政策",
    terms: "服务条款",
    accessibility: "无障碍",
    fairHousing: "公平住房",
    explore: "探索",
    firm: "公司",
    legal: "法律",
    backHome: "返回首页",
    viewProfile: "查看主页",
    calculator: "房贷计算器",
    langLabel: "EN",
  },
  footer: {
    eho: "Homix Realty Inc. 恪守《公平住房法》与《平等机会法》。我们不因种族、肤色、宗教、性别、残障、家庭状况或国籍而歧视。所有信息力求可靠，但不作保证。",
    brokerOfRecord: "持牌经纪人",
    licensedIn: "持牌州",
    rights: "保留所有权利。",
  },
  hero: {
    eyebrow: "纽约地产 · 媒体 · AI",
    title: "好房，自带头条。",
    lead: "纽约首家以媒体驱动的地产公司。我们卖房、孵化明星经纪人、运营内容机器——100 万+ 全网粉丝与 AI 营销，传统经纪公司望尘莫及。",
    ctaPrimary: "浏览房源",
    ctaSecondary: "认识团队",
  },
  brandStory: {
    eyebrow: "关于公司",
    title: "我们不是又一家经纪公司，而是一家地产媒体公司。",
    p1: "Homix 融合 home 与 mix：经纪、媒体工作室、经纪人孵化器集于一体。爆款视频、生活方式内容与 100 万+ 粉丝，把每一套房、每一位经纪人推到市场面前。",
    p2: "由此带来同行难以企及的曝光、更快的成交，以及一支深耕皇后区、长岛与曼哈顿的双语团队——背后是让每一步都更精准的数据与 AI。",
  },
  pillars: {
    eyebrow: "我们做什么",
    title: "与 Homix 合作的三种方式",
    items: [
      {
        eyebrow: "买房 · 卖房",
        title: "找到或卖出你的家",
        body: "覆盖皇后区、长岛与曼哈顿的全程服务——配上让同行汗颜的营销能力。",
        cta: "浏览房源",
      },
      {
        eyebrow: "加入我们",
        title: "成就你的事业",
        body: "加入这家把流量交到你手里的经纪公司。媒体培训、个人 IP、客源与 AI 工具——我们把经纪人打造成明星，而不只是招人。",
        cta: "加入我们",
      },
      {
        eyebrow: "媒体 · 流量",
        title: "触达更多买家",
        body: "拥有 100 万+ 粉丝的内容工作室，产出视频、运营投放，把房与人推到整个市场面前。",
        cta: "合作媒体业务",
      },
    ],
  },
  stats: {
    items: [
      { value: "100万+", label: "全网粉丝" },
      { value: "40+", label: "经纪人" },
      { value: "头部", label: "纽约内容型经纪" },
      { value: "中 / EN", label: "双语服务" },
    ],
  },
  valueProps: [
    {
      title: "媒体即市场",
      body: "我们生于自媒体平台——爆款视频、生活方式内容，以及把每套房迅速送到对的买家面前的 100 万+ 粉丝。",
    },
    {
      title: "我们把经纪人打造成明星",
      body: "Homix 是孵化器。经纪人获得媒体培训、个人 IP 打造、真实客源,以及把生意做大的工具——而不只是一张办公桌。",
    },
    {
      title: "靠 AI 与数据，而非凭感觉",
      body: "定价、营销与客户服务都由数据和 AI 加持——每个决策都比同行更快、更有据。",
    },
  ],
  featured: {
    eyebrow: "精选房源",
    title: "纽约精选好房",
    viewAll: "查看全部房源",
  },
  neighborhoods: {
    eyebrow: "本地洞察",
    title: "我们了如指掌的社区",
    lead: "定价与时机，来自真正走在这些街区里的人。以下是我们覆盖最深的几个片区。",
    exploreAll: "探索全部社区",
  },
  reach: {
    eyebrow: "我们的影响力",
    title: "我们不等头条，我们制造头条。",
    lead: "每一套房源都搭载着一台全网 100 万+ 粉丝的内容引擎——这是更快、更高成交背后的营销优势。",
  },
  testimonials: { eyebrow: "客户怎么说" },
  team: {
    eyebrow: "经纪团队",
    title: "成事背后的人",
    lead: "一支资深、双语的团队。你直接对接名字挂在门上的那位经纪人——绝不甩手转交。",
    cta: "认识经纪人",
  },
  contactBand: {
    eyebrow: "联系我们",
    title: "聊聊你的下一步。",
    lead: "买房、卖房，或只是还在考虑——先开始一次轻松的对话。没有压力，没有义务。",
  },
  inquiry: {
    name: "姓名",
    phone: "电话",
    email: "邮箱",
    message: "我们能帮你什么？",
    consent:
      "我同意 Homix 就我的咨询通过电话、短信或邮件与我联系。同意并非任何服务的前提。可能产生信息与流量费用；回复 STOP 可退订。",
    submit: "发送咨询",
    thanksTitle: "谢谢你。",
    thanksBody: "我们已收到你的留言，会尽快与你联系。",
  },
  about: {
    eyebrow: "关于 Homix",
    title: "纽约首家以媒体驱动的地产公司。",
    lead: "Homix 融合 home 与 mix——集全程经纪、媒体工作室与经纪人孵化器于一体，由 100 万+ 全网粉丝与 AI 营销驱动。",
    p1: "大多数经纪公司还在用十年前的方式做营销。Homix 生来不同——以爆款短视频、生活方式内容与精选指南，把房源的曝光带到远超 MLS 的范围。由此带来传统公司无法匹敌的曝光、更快的成交，以及不断累积的营销优势。",
    p2: "内容背后，是一支把皇后区、长岛与曼哈顿了如指掌的双语团队——中英文流利，从第一次看房到成交签约，始终全力以赴。",
    foundersEyebrow: "创始团队",
    foundersTitle: "缔造 Homix 的人",
    howEyebrow: "我们的方式",
    workWithUs: "与我们合作",
    meetTeam: "认识团队",
  },
  join: {
    eyebrow: "招募 · 加入 Homix",
    title: "加入这家把流量交到你手里的经纪公司。",
    lead: "大多数公司给你一张办公桌和一个 logo。Homix 给你一台 100 万+ 粉丝的媒体引擎、真实客源，以及打造个人品牌的工具——让你的生意不断累积，而不是每单从零开始。",
    benefits: [
      {
        title: "第一天就有流量",
        body: "接入 100 万+ 粉丝与一台已经在产出视频、Reels 与生活方式内容的引擎，持续带来真实的买家与卖家。",
      },
      {
        title: "一支媒体工作室在背后",
        body: "专业摄影、视频带看、航拍与虚拟布置——再加上帮你打造并做大自己账号的辅导。",
      },
      {
        title: "打造会复利的个人品牌",
        body: "我们帮你建立个人 IP：更多触达、更多信任、更多转介绍——一项随每单成交而增值的资产。",
      },
      {
        title: "温暖客源与 AI 工具",
        body: "来自我们内容的客源，加上用于定价、营销文案与客户跟进的 AI 工具，为你省下大量时间。",
      },
      {
        title: "双语 · 资深导师",
        body: "来自拥有数十年纽约经验的创始人与经纪人的指导——中英文流利。",
      },
      {
        title: "是团队，不是收桌费的工厂",
        body: "我们是一支真正投入于你成长的资深小团队，从你的第一单到第一百单。",
      },
    ],
    ctaEyebrow: "聊一聊",
    ctaTitle: "介绍一下你自己。",
    ctaLead:
      "无论你已持牌还是刚起步——只要你有野心、对媒体驱动的经纪模式感兴趣，我们都很想聊聊。每一次对话都严格保密。",
    orReach: "或直接联系我们：",
  },
  journal: {
    eyebrow: "观察",
    title: "来自媒体优先经纪公司的洞察",
    lead: "市场月报、社区深度、值得一读的观点——出自真正做事的人。",
    readMore: "阅读全文",
    by: "作者",
    backToJournal: "全部文章",
    minRead: "分钟阅读",
  },
  agentsPage: {
    eyebrow: "团队",
    title: "我们的经纪人",
    lead: "一支覆盖皇后区、长岛与曼哈顿的双语团队——每一位都是熟悉本地社区的纽约持牌专业人士。",
    contact: "联系",
    licenseNo: "牌照号",
  },
  contactPage: {
    eyebrow: "联系",
    title: "开始一次轻松的对话。",
    lead: "买房、卖房，或只是还在考虑——我们都乐意帮忙，没有压力，没有义务。",
    byPhone: "电话",
    byEmail: "邮箱",
    inPerson: "到访",
  },
  neighborhoodsPage: {
    eyebrow: "社区",
    title: "我们最了解的地方",
    lead: "Homix 深耕的纽约社区的本地指南。",
    viewHomes: "查看该区房源",
    backToAll: "全部社区",
    photoBy: "摄影",
  },
  notFound: {
    eyebrow: "404",
    title: "这个页面已经搬走了。",
    lead: "你要找的页面不在这里。我们带你回到房子那边。",
    backHome: "返回首页",
    browseListings: "浏览房源",
  },
  legal: {
    note: "这是一份可用模板。上线前请由专业律师审核并定稿。",
    lastUpdated: "最近更新",
  },
  sell: {
    eyebrow: "卖房 · Homix",
    title: "你的家，值得被看见。",
    lead: "大多数房源只触达市场的一小部分。Homix 用视频、内容与 AI 营销，把你的家推到 100 万+ 受众面前——卖得更快，也卖得更高。",
    points: [
      {
        title: "营销机器，而非院里一块牌子",
        body: "专业摄影、视频带看与 Reels，投放给 100 万+ 本就关注纽约地产的受众。",
      },
      {
        title: "用数据定价，而非凭感觉",
        body: "我们以实时市场数据与 AI 辅助分析定价，让你的房子挂在真正能成交的价位。",
      },
      {
        title: "从筹备到成交的管家式服务",
        body: "布置、营销、谈判、文书——由名字挂在门上的顾问全程一手包办。",
      },
    ],
    valuationEyebrow: "免费房屋估价",
    valuationTitle: "你的家值多少？",
    valuationLead: "告诉我们你的房子，Homix 顾问将为你准备一份免费、无义务的估价。",
    orCall: "或致电",
  },
  calculator: {
    eyebrow: "工具",
    title: "房贷计算器",
    lead: "估算你的月供。仅供参考——准确报价请咨询贷款机构。",
    homePrice: "房屋总价",
    downPayment: "首付",
    interestRate: "利率",
    loanTerm: "贷款年限",
    monthlyPayment: "预估月供",
    principalInterest: "本金 + 利息",
    loanAmount: "贷款金额",
    disclaimer: "仅估算本金与利息；不含税费、保险与 HOA。不构成贷款要约。",
  },
};

export const messages = { en, zh };
export type Messages = Dict;
