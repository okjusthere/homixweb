import {
  defaultLocale,
  localeFromParam,
  type Locale,
} from "@/lib/locale";

export { defaultLocale, locales } from "@/lib/locale";
export type { Locale } from "@/lib/locale";

/**
 * Bilingual copy. Locale is a route parameter (`/` for English, `/zh` for
 * Chinese), not request state, so public pages can be prerendered and cached.
 * Listing/agent DATA stays as-is (MLS is English); brand and marketing copy
 * are translated.
 */

export async function getLocale(locale: Locale = defaultLocale): Promise<Locale> {
  return locale;
}

export async function getT(locale: Locale = defaultLocale) {
  return { locale, t: messages[locale] };
}

export async function getRouteLocale<T extends { locale: string }>(
  params: Promise<T>,
): Promise<Locale> {
  return localeFromParam((await params).locale);
}

const en = {
  common: {
    listings: "Buy",
    advisors: "Advisors",
    bilingualAgents: "Chinese-Speaking Agents",
    guides: "Guides",
    marketData: "Market Data",
    journal: "Articles",
    learn: "Guides",
    sell: "Sell",
    join: "Join Homix",
    commissionPlan: "Commission plan",
    about: "About",
    contact: "Contact",
    neighborhoods: "Neighborhoods",
    communities: "Gated communities",
    openHouses: "Open Houses",
    newDevelopment: "New Development",
    flexiblePaymentHomes: "Flexible payment",
    privacy: "Privacy",
    terms: "Terms",
    accessibility: "Accessibility",
    fairHousing: "Fair Housing",
    standardOperatingProcedures: "Standard Operating Procedures",
    explore: "Explore",
    firm: "Firm",
    legal: "Legal",
    backHome: "Back home",
    viewProfile: "View profile",
    calculator: "Mortgage calculator",
    agentLogin: "Agent Login",
    langLabel: "中文",
  },
  footer: {
    eho: "Homix Realty Inc. is committed to the principles of the Fair Housing Act and the Equal Opportunity Act. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, or any other class protected by applicable federal, New York State, or New York City law. All information is deemed reliable but not guaranteed.",
    brokerOfRecord: "Broker of Record",
    licensedIn: "Licensed in",
    offices: "Offices",
    rights: "All rights reserved.",
  },
  hero: {
    eyebrow: "New York Real Estate · Media · AI",
    title: "Where homes meet headlines.",
    lead: "New York's media-first real estate company. We sell homes, develop agents, and publish bilingual content every day — backed by 1M+ combined followers across Homix-affiliated social accounts and AI-assisted marketing.",
    ctaPrimary: "View listings",
    ctaSecondary: "Meet the team",
  },
  brandStory: {
    eyebrow: "The firm",
    title: "Not another brokerage. A real estate media company.",
    p1: "Homix blends the essence of home and mix: brokerage, media studio, and agent incubator under one roof. Daily video, lifestyle content, and 1M+ combined followers across affiliated accounts give selected listings and agent stories an established distribution network.",
    p2: "The result is consistent, bilingual market visibility from a team that knows Queens, Long Island, and Manhattan by heart — backed by data and AI that make every move better informed.",
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
        body: "Join a brokerage with an established media platform. Media training, personal-brand building, leads, and AI tools help agents become recognizable local professionals.",
        cta: "Join Homix",
      },
      {
        eyebrow: "Media & Marketing",
        title: "Reach more buyers",
        body: "Our content studio publishes daily through affiliated accounts with 1M+ combined followers, then builds focused campaigns around properties and people.",
        cta: "Work with our studio",
      },
    ],
  },
  stats: {
    items: [
      { value: "1M+", label: "Combined social followers" },
      { value: "100+", label: "Agents across the Homix network" },
      { value: "Daily", label: "Bilingual content publishing" },
      { value: "中 / EN", label: "Bilingual service" },
    ],
  },
  valueProps: [
    {
      title: "Media is our marketplace",
      body: "We were built on a self-media platform — daily video, lifestyle content, and affiliated accounts with 1M+ combined followers. Actual reach varies by content, platform, and campaign.",
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
  openHouses: {
    eyebrow: "Visit in person",
    title: "Upcoming Open Houses",
    lead: "Tour homes represented by Homix, with current times supplied by OneKey MLS.",
    viewAll: "View all Open Houses",
    viewHome: "View home",
    listingAdvisor: "Listing advisor",
    scheduleNote: "All times are shown in New York local time. Schedules may change; check this page before visiting.",
    emptyTitle: "No public Open Houses are currently scheduled.",
    emptyBody: "Browse current Homix listings or contact an advisor to arrange a private showing.",
    unavailableTitle: "The Open House schedule is being refreshed.",
    unavailableBody: "Please check back shortly or contact Homix to confirm upcoming showing times.",
    browseListings: "Browse listings",
    contact: "Contact Homix",
    updated: "Schedule updated",
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
    lead: "Selected listings are supported by a daily content engine and affiliated social accounts with 1M+ combined followers — with campaign reach measured by platform and content.",
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
    title: "A media-first, AI-empowered New York real estate company.",
    lead: "Homix is a New York real estate company built media-first: we earn attention before we ask for a listing. We pair a bilingual team across Flushing, Queens and Long Island with AI-assisted pricing and marketing — so your home reaches the right buyers, in the right language, on the platforms they already trust.",
    p1: "Homix started with a camera, not a \"for sale\" sign. Before there was a brokerage, there was an audience — neighbors who followed founder Si Zhang (\"Sunny\") for honest, in-language explanations of how New York real estate actually works: what a co-op board really wants, why one block trades at a premium over the next, how to read a Queens listing between the lines. That media-first habit is still the whole point. We believe the best way to earn a client is to be genuinely useful long before anyone is ready to buy or sell, and to keep showing up after the deal closes.",
    p2: "That origin shapes how we operate. Our team is bilingual by default — fluent in English and Mandarin, and fluent in the realities of Flushing, the rest of Queens and Long Island, where so many families are making their first or biggest American purchase. We use AI where it earns its place: pricing a home against fresh comparables, drafting marketing in two languages, matching the right buyer to the right home faster. The technology stays behind the scenes; the relationship stays in front. Whether you're buying your first apartment or listing the home you raised a family in, you get a team that already knows your neighborhood — and an audience that's already listening.",
    whatWeAreEyebrow: "What we are",
    whatWeAreTitle: "Three companies in one.",
    whatWeAre: [
      {
        title: "A brokerage",
        body: "A licensed New York residential brokerage. We list, market and close homes the way a brokerage should — fiduciary, full-service, fair-housing compliant — but with an audience already watching before your sign goes up.",
      },
      {
        title: "A media studio",
        body: "Content is how we work, not an afterthought. We shoot, edit and publish the neighborhood walk-throughs, market explainers and home tours that have built a real local following — so every listing launches into an audience instead of into silence.",
      },
      {
        title: "An agent incubator",
        body: "We help agents build a personal brand, not just a pipeline. New agents get our media playbook, AI tools and bilingual support from day one — the platform we wish we'd had — so their reputation compounds instead of resetting with every deal.",
      },
    ],
    howEyebrow: "How we work",
    workWithUs: "Work with us",
    meetTeam: "Meet the team",
    teamEyebrow: "Our team",
    teamTitle: "One team, every corner of New York.",
    teamBody: "From Flushing to Manhattan to the North Shore, our advisors share one standard of service — local knowledge, bilingual care, and a media engine behind every deal.",
  },
  join: {
    eyebrow: "Careers at Homix · Flushing · NYC · LI",
    title: "We don't hand you a desk. We build your platform.",
    lead: "Most brokerages sell you a logo and a commission split, then leave you to find clients alone. Homix is a brokerage, an agent incubator, and a media engine in one. From day one, you gain access to an in-house studio and distribution through affiliated 抖音, 小红书, and Instagram accounts with 1M+ combined followers, plus AI and data tools and bilingual senior mentors who have closed in this market.",
    heroCta: "Apply to join Homix",
    commissionPlanCta: "View commission plan",
    stats: [
      {
        value: "1M+",
        label: "Combined followers across affiliated 抖音 · 小红书 · Instagram accounts",
      },
      {
        value: "Bilingual",
        label: "English + 中文 team built for NYC's Chinese-American buyers and sellers",
      },
      {
        value: "In-house",
        label: "Content studio — shoot, edit, and publish without paying an outside agency",
      },
      {
        value: "Flushing · NYC · LI",
        label: "Rooted in the markets we actually live and sell in",
      },
    ],
    benefitsEyebrow: "Why agents join",
    benefitsTitle: "What you get on day one.",
    benefits: [
      {
        title: "A media platform from day one",
        body: "You do not build alone. Approved listings and personal-brand content can be distributed through Homix-affiliated 抖音, 小红书, and Instagram accounts with 1M+ combined followers. Reach varies by content and platform, while the studio helps you improve it over time.",
      },
      {
        title: "An in-house studio that makes you famous",
        body: "This is the SERHANT idea, localized for our market: media is how we sell. Our studio scripts, shoots, and edits short-form video, listing films, and personal-brand content for you — at no agency markup. You stay in front of clients; we make sure the camera loves you.",
      },
      {
        title: "AI and data tools that save your week",
        body: "Pricing comps, neighborhood data, lead follow-up, and listing copy in two languages — handled by our AI and data stack so you spend your hours with clients, not spreadsheets. Smart tech should serve the agent, not the other way around.",
      },
      {
        title: "Bilingual senior mentorship",
        body: "Whether you're newly licensed or stuck at a desk-fee shop, you're paired with senior agents who have actually closed in Flushing, Queens, and Long Island — in English and 中文. Real shadowing, real deal reviews, real introductions. You learn the market, not just the theory.",
      },
      {
        title: "Built for the bilingual market",
        body: "New York's Chinese-American buyers and sellers are an enormous, underserved market — and we are built for them in both languages. Marketing, contracts, and conversations happen in the language each client trusts, which means you can serve clients other agents simply can't reach.",
      },
      {
        title: "A real team, not a desk-fee factory",
        body: "Some brokerages just rent you a seat and collect a monthly fee. Homix invests in you because your wins are our story. Transparent economics, a clear path to grow, and a team that shows up — we'd rather have a smaller roster of stars than a warehouse of names.",
      },
    ],
    trainingEyebrow: "See it for yourself",
    trainingTitle: "Weekly boot camps and expert seminars — not a manual to read alone.",
    trainingLead:
      "This is what \"bilingual senior mentorship\" looks like in practice: structured boot camps and specialist sessions with real estate attorneys, mortgage teams, and media strategists — walking agents through the deals, contracts, and content that come up every week.",
    trainingFeatures: [
      "Buyer & Listing Mastery boot camps — 6 weeks, 12 practical sessions each",
      "Weekly specialist seminars on legal, financing, media, and applied AI, led by named experts",
      "In-person coaching and roundtables, not just a channel to scroll",
    ],
    trainingCta: "Explore agent training",
    stepsEyebrow: "How to join",
    stepsTitle: "From hello to local star.",
    steps: [
      {
        title: "Apply and have a real conversation",
        body: "Send us your background — licensed, newly licensed, or considering the move. We'll sit down (in English or 中文) to understand your goals and tell you honestly whether Homix is the right fit.",
      },
      {
        title: "Build your brand kit",
        body: "Our studio shoots your intro content, sets up your bilingual profile, and plans distribution through Homix channels so the audience can begin discovering your name and your listings.",
      },
      {
        title: "Get paired with a mentor and tools",
        body: "You're matched with a senior bilingual mentor and onboarded to our AI, data, and CRM tools — then you start working real leads with support beside you, not a manual to read alone.",
      },
      {
        title: "Grow into a local star",
        body: "As your deals and content compound, we scale your reach, your brand, and your earnings. The agents who lean in become the faces people in the neighborhood already recognize.",
      },
    ],
    whoEyebrow: "Who we're looking for",
    whoTitle: "Who we're looking for",
    whoBody: "You don't need a big book of business or a following — you need ambition and a willingness to show up on camera and in the community. We're a fit for newly licensed agents who want a real launchpad instead of a desk and a login, and for experienced agents who are stuck at a fee-factory brokerage and tired of generating every lead alone. Bilingual (English/中文) is a major plus given the clients we serve, but the non-negotiables are hunger, coachability, and integrity. If you want to be a local star and you're willing to do the work to get there, we want to talk.",
    faqEyebrow: "Questions",
    faqTitle: "Good to know.",
    faq: [
      {
        q: "I'm not licensed yet — can I still join?",
        a: "Talk to us early. We can't issue your license — that's the state — but we'll point you to the right pre-licensing course, and we're built to launch newly licensed agents. The mentorship, tools, and audience matter most exactly when you're starting out.",
      },
      {
        q: "How do the splits and economics work?",
        a: "The full commission-plan page publishes the numbers before you apply: Solo is 85/15 with a $12,000 annual cap, Solo Pro is $3,650 per year with 100% commission from the first closing, and Team Members are 90/10 with a $10,000 Homix cap plus separately documented team economics.",
      },
      {
        q: "Do I need an existing following to benefit from the media engine?",
        a: "No. You gain access to our in-house studio and distribution workflow from day one. We build your personal brand from where you are and publish approved content through Homix channels; results depend on the content, market, and platform.",
      },
      {
        q: "Do I have to speak Chinese to work here?",
        a: "It's a strong advantage because so many of our clients are Chinese-American, and our team operates in both languages. But it isn't a hard requirement — drive, coachability, and integrity come first. We'll place you where you can win.",
      },
    ],
    ctaEyebrow: "Let's talk",
    ctaTitle: "Stop chasing leads alone. Become the headline.",
    ctaLead: "One conversation is all it takes to see what an audience, a studio, AI tools, and real mentorship could do for your career. Apply below — we'll reply in the language you prefer.",
    orReach: "Or reach us directly at",
  },
  training: {
    eyebrow: "Homix agent training",
    title: "Training built around real New York deals.",
    lead: "From buyer representation and listing development to financing, legal issues, media, and applied AI, Homix turns the work agents face every day into structured boot camps and specialist sessions.",
    archiveCta: "Watch past training videos",
    galleryEyebrow: "Programs & seminars",
    galleryTitle: "Every session starts with a problem agents meet in the field.",
    photosEyebrow: "Training in action",
    photosTitle: "Real sessions, shared practice, and a team learning together.",
  },
  journal: {
    eyebrow: "Guide Articles",
    title: "New York real estate articles",
    lead: "Practical articles on buying, selling, renting, taxes, market data, and settling in New York.",
    readMore: "Read article",
    by: "By",
    backToJournal: "All articles",
    minRead: "min read",
  },
  buyMenu: [
    { title: "Browse homes", desc: "Search every home for sale" },
    { title: "Neighborhoods", desc: "Guides to the areas we cover" },
    { title: "Gated communities", desc: "Nassau's gated & private enclaves" },
    { title: "New Development", desc: "Shareable condo project pages" },
    { title: "Flexible payment", desc: "Projects with flexible payment options" },
    { title: "Mortgage calculator", desc: "Estimate your monthly payment" },
  ],
  agentsPage: {
    eyebrow: "The team",
    title: "Our advisors",
    lead: "A bilingual team across Queens, Long Island, and Manhattan — each one a licensed New York professional who knows the neighborhoods firsthand.",
    searchLabel: "Search advisors",
    placeholder: "Search by name, language, or specialty…",
    showing: "Showing",
    noResults: "No matching advisors — try another name or keyword.",
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
    officesEyebrow: "Office locations",
    officesTitle: "Three New York offices, one advisory team.",
    officesLead: "Meet us in Flushing, Long Island, or Manhattan by appointment. The Flushing office remains our main office for brokerage operations and client coordination.",
    mainOffice: "Main office",
    openMap: "Open map",
  },
  neighborhoodsPage: {
    eyebrow: "Neighborhoods",
    title: "The places we know best",
    lead: "Local guides to the New York neighborhoods where Homix works most closely.",
    viewHomes: "View homes here",
    backToAll: "All neighborhoods",
    photoBy: "Photo",
    whyEyebrow: "Neighborhood Intelligence",
    whyTitle: "We don't sell zip codes. We read neighborhoods.",
    whyBody: "From Downtown Flushing to the North Shore villages of Nassau County, these are the markets Homix works in every week. Our agents grew up here, shop here, and ride these trains — so our guidance is grounded in lived knowledge, not a portal listing. For each neighborhood we pair that local fluency with disciplined data: how homes are actually pricing, which school districts hold their reputation, what the commute really looks like, and where supply and demand are heading. The result is bilingual, fair-housing-conscious counsel you can act on, whether you're buying your first co-op near the 7 train or trading up to a colonial on the North Shore.",
    methodology: [
      {
        title: "Comps & pricing discipline",
        body: "We price from recent, genuinely comparable sales — adjusting for floor, condition, lot, and view rather than headline list prices. Buyers get an offer strategy backed by evidence; sellers get a number the market will actually support, so homes don't sit and don't leave money on the table.",
      },
      {
        title: "Schools & zoning",
        body: "On Long Island especially, the school district line can matter more than the street. We confirm which district and attendance zone a home actually falls in, track each district's long-standing reputation rather than a single year's ranking, and flag zoning or co-op board rules that shape what you can buy and how.",
      },
      {
        title: "Transit & access",
        body: "We map the real commute — which subway lines, LIRR branch, ferry, or highways serve a home, and how that translates into door-to-door time and resale appeal. Proximity to a station or express service is a durable value driver, and we weigh it the way buyers and future buyers will.",
      },
      {
        title: "Supply, demand & timing",
        body: "We watch inventory, days-on-market, and seasonal rhythm by neighborhood so timing works for you, not against you. Knowing whether a market favors buyers or sellers — and when listings typically surge — turns a stressful guess into a planned move.",
      },
    ],
    glanceTitle: "At a glance",
    glanceLabels: {
      transit: "Getting around",
      schools: "Schools",
      character: "Character",
      bestFor: "Best for",
    },
  },
  communitiesPage: {
    eyebrow: "Long Island",
    title: "Nassau gated & private communities",
    lead: "What's behind the gate, what the HOA actually covers, and the real monthly cost — plain-language guides to Nassau County's gated and private communities.",
    backToAll: "All communities",
    whyEyebrow: "How we read a gated community",
    whyTitle: "A gate is the start of the question, not the answer.",
    whyBody: "From the guard-gated estates of North Hills and Muttontown to the private townhome enclaves near the water, Nassau's gated communities trade on privacy, low-maintenance living, and a short ride to Manhattan. We read each one the way a buyer should: not by the gate alone, but by what you actually pay to live there each month, what the homeowners' association takes off your plate, how the commute really works, and how easily the next buyer will understand the address.",
    methodology: [
      {
        title: "The real carrying cost",
        body: "The sticker price is only the start. HOA dues, property taxes, and any special assessment decide your true monthly cost — and dues vary by unit and floor plan, so we confirm them per home, never from a brochure.",
      },
      {
        title: "What's behind the gate",
        body: "A 24-hour manned gatehouse, a coded gate, or simply a private association are very different things. We say plainly which one a community has, and what the dues cover — landscaping, snow, security, amenities — so there are no surprises.",
      },
      {
        title: "Commute & access",
        body: "We map the real commute: the nearest LIRR station and branch, typical minutes to Penn Station or Grand Central, and the drive into the city. For a Long Island address, that ride is a durable part of the value.",
      },
      {
        title: "Resale story",
        body: "Builder, era, home type, and the strength of the address all shape how easily the next buyer understands the home. We weigh resale the way the market will — not just how the home shows today.",
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "This page has moved on.",
    lead: "The page you're looking for isn't here. Let's get you back to the homes.",
    backHome: "Back home",
    browseListings: "Browse listings",
  },
  legal: {
    note: "Have qualified counsel and the broker of record review legal text before launch.",
    lastUpdated: "Last updated",
  },
  sell: {
    eyebrow: "Sell with Homix",
    title: "Sell your New York home with Homix.",
    lead: "Broker-led pricing, bilingual representation, and a media team that can publish your campaign through affiliated social accounts with 1M+ combined followers across Queens, Long Island, Manhattan, and beyond.",
    heroCta: "Request a home valuation",
    proof: {
      eyebrow: "The Homix difference",
      items: [
        { value: "1M+", label: "Combined social followers" },
        { value: "EN · 中文", label: "Bilingual marketing" },
        { value: "抖音 · 小红书 · IG", label: "Where we publish" },
        { value: "Flushing · NYC · LI", label: "Where we go deep" },
      ],
    },
    advantagesEyebrow: "Why sell with Homix",
    advantagesTitle: "An unfair advantage for your listing.",
    advantages: [
      {
        headline: "Your home launches through an established media network",
        body: "Most listings sit on a portal waiting to be found. We create a day-one campaign for affiliated 抖音, 小红书, and Instagram accounts with 1M+ combined followers, including people who follow Homix for New York real estate. Actual reach, showings, and offers depend on the property, price, content, and market.",
      },
      {
        headline: "We reach buyers in the language they buy in",
        body: "We market and negotiate fully in English and 中文, opening your home to the large, often cash-ready Chinese-speaking buyer pool across Flushing, Queens, and Long Island — including overseas buyers who research on 微信, 小红书, and 抖音, not English-only portals. That's a bigger, more qualified buyer base, which national English-only brokerages can't tap in-house.",
      },
      {
        headline: "Your home becomes a story, not a slideshow",
        body: "Our in-house studio films your home the way a brand films a product — cinematic walk-throughs, short-form tours, and bilingual storytelling built to travel on social, not just sit in an MLS gallery. Presentation is what makes buyers stop scrolling and book a showing — and what lets a home command its price.",
      },
      {
        headline: "Priced with data, decided by a person",
        body: "We cross-check multiple valuation models against a hand-built set of local comparable sales and live demand signals, then a licensed Homix advisor sets your number and walks you through exactly how we got there. Pricing right from day one is how you avoid the stale-listing discount and sell for more.",
      },
      {
        headline: "We engineer the first days, when it matters most",
        body: "A listing draws its peak attention in its first days live. We line up a coming-soon audience and launch across every channel at once, so interest lands all at the same time instead of trickling in — the raw material for momentum and multiple offers, rather than a home that slowly goes stale.",
      },
      {
        headline: "We handle it, so you don't have to",
        body: "Staging guidance, photography, marketing, showings, negotiation, attorney and closing coordination — handled end to end by the advisor whose name is on the door. Selling is one of the most stressful things people do; our job is to take the weight off and keep the deal moving to the closing table.",
      },
      {
        headline: "Hyper-local, from people who walk these streets",
        body: "We know Flushing, Queens, and the Long Island North Shore block by block — the comps, the school districts, what local buyers actually pay for. That local read is how we price with confidence and defend your number when offers come in.",
      },
      {
        headline: "You see the comps, the data, and the reasoning",
        body: "No black-box estimate, no take-our-word-for-it. We show you the comparable sales, the market data, and the reasoning behind your price and your strategy — and we give you a clear net-proceeds estimate up front, before you list.",
      },
    ],
    howEyebrow: "How it works",
    howTitle: "Four steps from listed to closed.",
    steps: [
      {
        title: "Valuation & strategy",
        body: "A free, data-backed valuation. We set your price and the plan together — and show our reasoning.",
      },
      {
        title: "Prep & production",
        body: "Staging guidance, then our in-house studio films your home into bilingual content built for social.",
      },
      {
        title: "Media launch",
        body: "A coming-soon warm-up, followed by coordinated day-one publishing across the Homix media network.",
      },
      {
        title: "MLS, offers & closing",
        body: "Full MLS and portal syndication, offer negotiation, and attorney and closing coordination — handled for you.",
      },
    ],
    valuationEyebrow: "Complimentary seller consultation",
    valuationTitle: "A valuation built around your actual home.",
    valuationLead: "Share the address and a licensed Homix advisor will review recent comparable sales, current competition, property details, and likely buyer demand.",
    valuationDeliverables: [
      {
        title: "A defensible price range",
        body: "Recent closed sales and active competition selected for your property, not a ZIP-code average.",
      },
      {
        title: "A launch strategy",
        body: "Positioning, timing, preparation, and the buyer audiences most likely to respond.",
      },
      {
        title: "A clearer net picture",
        body: "An early view of likely selling costs and estimated net proceeds before you decide to list.",
      },
    ],
    valuationAssurances: ["Free & no-obligation", "We reply within one business day", "Confidential"],
    valuationNotice: "This broker price opinion is for planning purposes. It is not a licensed appraisal or a guaranteed sale price.",
    valuationForm: {
      propertyAddress: "Property address",
      addressPlaceholder: "Street address, city, state, ZIP",
      propertyType: "Property type",
      propertyTypePlaceholder: "Select a type",
      propertyTypes: [
        { value: "single-family", label: "Single-family home" },
        { value: "condo", label: "Condo" },
        { value: "coop", label: "Co-op" },
        { value: "multifamily", label: "Multi-family home" },
        { value: "townhouse", label: "Townhouse" },
        { value: "other", label: "Other" },
      ],
      bedrooms: "Bedrooms",
      bedroomsPlaceholder: "Select bedrooms",
      bedroomOptions: [
        { value: "studio", label: "Studio" },
        { value: "1", label: "1 bedroom" },
        { value: "2", label: "2 bedrooms" },
        { value: "3", label: "3 bedrooms" },
        { value: "4", label: "4 bedrooms" },
        { value: "5-plus", label: "5+ bedrooms" },
      ],
      timeline: "When are you considering selling?",
      timelinePlaceholder: "Select a timeline",
      timelineOptions: [
        { value: "now", label: "As soon as possible" },
        { value: "0-3", label: "Within 3 months" },
        { value: "3-6", label: "Within 3-6 months" },
        { value: "6-plus", label: "More than 6 months" },
        { value: "curious", label: "Just exploring" },
      ],
      name: "Full name",
      phone: "Phone (optional)",
      email: "Email",
      notes: "Anything we should know? (optional)",
      notesPlaceholder: "Renovations, occupancy, preferred contact time, or other details",
      consent: "I agree to be contacted by Homix by phone, text, or email about my valuation request. Consent is not a condition of any service. Message and data rates may apply; reply STOP to opt out.",
      submit: "Request my valuation",
      sending: "Sending...",
      thanksTitle: "Your valuation request is in.",
      thanksBody: "A Homix advisor will review the property and contact you within one business day.",
    },
    finalCta: {
      title: "A better sale starts before the listing goes live.",
      body: "Start with a private conversation about price, timing, preparation, and what you want the move to accomplish.",
      button: "Start with a valuation",
    },
    orCall: "Or call",
    listingsCta: {
      kicker: "Thinking of selling?",
      line: "Your home deserves more than a yard sign. We build a bilingual campaign and distribute it through affiliated accounts with 1M+ combined followers.",
      button: "Sell with Homix",
    },
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
    listings: "买房",
    advisors: "经纪人",
    bilingualAgents: "华人经纪团队",
    guides: "置业指南",
    marketData: "市场数据",
    journal: "置业文章",
    learn: "置业指南",
    sell: "卖房",
    join: "加入我们",
    commissionPlan: "佣金方案",
    about: "关于",
    contact: "联系",
    neighborhoods: "社区",
    communities: "封闭社区",
    openHouses: "本周公展",
    newDevelopment: "纽约新盘",
    flexiblePaymentHomes: "灵活支付",
    privacy: "隐私政策",
    terms: "服务条款",
    accessibility: "无障碍",
    fairHousing: "公平住房",
    standardOperatingProcedures: "标准操作流程",
    explore: "探索",
    firm: "公司",
    legal: "法律",
    backHome: "返回首页",
    viewProfile: "查看资料",
    calculator: "房贷计算器",
    agentLogin: "经纪人登录",
    langLabel: "EN",
  },
  footer: {
    eho: "Homix Realty Inc. 恪守《公平住房法》与《平等机会法》。我们不因种族、肤色、宗教、性别、残障、家庭状况、国籍，或联邦、纽约州及纽约市法律保护的任何其他类别而歧视。所有信息力求可靠，但不作保证。",
    brokerOfRecord: "备案经纪人",
    licensedIn: "持牌州",
    offices: "办公室",
    rights: "保留所有权利。",
  },
  hero: {
    eyebrow: "纽约地产 · 媒体 · AI",
    title: "好房，自带头条。",
    lead: "纽约以媒体驱动的地产公司。我们卖房、培养经纪人并坚持每日发布双语内容——Homix 旗下及关联社媒账号合计 100 万+ 粉丝，并以 AI 辅助营销。",
    ctaPrimary: "浏览房源",
    ctaSecondary: "认识团队",
  },
  brandStory: {
    eyebrow: "关于公司",
    title: "我们不是又一家经纪公司，而是一家地产媒体公司。",
    p1: "Homix 融合 home 与 mix：经纪、媒体工作室、经纪人孵化器集于一体。每日视频、生活方式内容与关联账号合计 100 万+ 粉丝，为精选房源和经纪人内容提供成熟的分发网络。",
    p2: "由此带来持续、双语的市场曝光，以及一支深耕皇后区、长岛与曼哈顿的团队——背后是让每一步都更有依据的数据与 AI。",
  },
  pillars: {
    eyebrow: "我们做什么",
    title: "与 Homix 合作的三种方式",
    items: [
      {
        eyebrow: "买房 · 卖房",
        title: "买房卖房，全程托付",
        body: "覆盖皇后区、长岛与曼哈顿的全程服务——配上让同行汗颜的营销能力。",
        cta: "浏览房源",
      },
      {
        eyebrow: "加入我们",
        title: "成就你的事业",
        body: "加入一家拥有成熟媒体平台的经纪公司。媒体培训、个人 IP、客源与 AI 工具，帮助经纪人成为可被本地客户识别的专业人士。",
        cta: "加入我们",
      },
      {
        eyebrow: "媒体 · 流量",
        title: "触达更多买家",
        body: "内容工作室坚持日更，并通过合计 100 万+ 粉丝的关联账号，为房源与经纪人策划和发布内容。",
        cta: "合作媒体业务",
      },
    ],
  },
  stats: {
    items: [
      { value: "100 万+", label: "关联社媒账号合计粉丝" },
      { value: "100+", label: "Homix 网络经纪人" },
      { value: "每日", label: "双语内容持续发布" },
      { value: "中 / EN", label: "双语服务" },
    ],
  },
  valueProps: [
    {
      title: "媒体即市场",
      body: "我们生于自媒体平台——每日视频、生活方式内容，以及关联账号合计 100 万+ 粉丝。实际触达取决于内容、平台与具体推广方案。",
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
  openHouses: {
    eyebrow: "到场看房",
    title: "Homix 本周公展",
    lead: "集中查看 Homix 代理房源的近期公展，时间安排由 OneKey MLS 实时同步。",
    viewAll: "查看全部公展",
    viewHome: "查看房源",
    listingAdvisor: "挂牌顾问",
    scheduleNote: "以下均为纽约当地时间。公展安排可能调整，出发前请再次查看本页。",
    emptyTitle: "目前暂无公展安排。",
    emptyBody: "你可以浏览 Homix 当前房源，或联系经纪人预约私人看房。",
    unavailableTitle: "公展安排正在更新。",
    unavailableBody: "请稍后再试，或直接联系 Homix 确认近期看房时间。",
    browseListings: "浏览房源",
    contact: "联系 Homix",
    updated: "日程更新于",
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
    lead: "精选房源由每日内容引擎与合计 100 万+ 粉丝的关联社媒账号支持，并按平台和内容衡量每次推广的实际触达。",
  },
  testimonials: { eyebrow: "客户怎么说" },
  team: {
    eyebrow: "经纪团队",
    title: "成事的人",
    lead: "一支资深、双语的团队。从头到尾对接你的，就是那位署名负责的经纪人本人——绝不中途甩手转交。",
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
    title: "一家媒体先行、AI 赋能的纽约房地产公司。",
    lead: "Homix 是一家以\"媒体先行\"为根基的纽约房地产公司：我们先赢得关注，再谈房源委托。我们组建了一支横跨法拉盛、皇后区与长岛的双语团队，并以 AI 辅助定价与营销——让您的房子用对的语言、在买家本就信任的平台上，触达真正合适的买家。",
    p1: "Homix 的起点是一台相机，而不是一块\"待售\"招牌。在公司成立之前，先有了观众——一群追随创始人张思（Si Zhang，\"Sunny\"）的街坊邻里，因为他用大家听得懂的语言，诚实地讲清楚纽约房地产到底是怎么运转的：合作公寓（co-op）董事会真正在意什么、为什么相邻两个街区价格相差悬殊、怎样读懂一则皇后区房源字里行间的言外之意。这种\"媒体先行\"的习惯，至今仍是我们存在的全部意义。我们相信，赢得客户最好的方式，是在任何人准备买卖之前就真正帮上忙，并在成交之后依然在场。",
    p2: "这样的起点，决定了我们做事的方式。我们的团队生来就是双语的——英语与普通话都能流利沟通，更通晓法拉盛、皇后区其他社区与长岛的真实生态：在这里，许多家庭正进行人生中第一笔、或最大一笔的美国置业。我们让 AI 在它该出力的地方出力：依据最新可比成交为房屋定价、用两种语言撰写营销文案、更快地为合适的房子匹配合适的买家。技术留在幕后，关系留在台前。无论您是初次置业，还是要出售养育了一家人的住所，您得到的，都是一支早已熟悉您社区的团队——以及一群早已在聆听的观众。",
    whatWeAreEyebrow: "我们是什么",
    whatWeAreTitle: "三位一体，一家公司。",
    whatWeAre: [
      {
        title: "一家持牌经纪公司",
        body: "我们是一家持牌的纽约住宅房地产经纪公司。挂牌、营销、成交，我们坚守经纪应有的本分——尽责守信、全程服务、遵循公平住房原则——区别只在于：在挂牌牌子立起之前，已经有一群观众在关注。",
      },
      {
        title: "一间内容工作室",
        body: "内容是我们做事的方式，而非事后的点缀。我们亲自拍摄、剪辑并发布社区漫步、市场解读与房源导览，由此积累起真实的本地粉丝——让每一套房源一上线就面对观众，而不是面对沉默。",
      },
      {
        title: "一个经纪人孵化器",
        body: "我们帮助经纪人打造个人品牌，而不只是积累客源。新加入的经纪人从第一天起就能用上我们的内容方法论、AI 工具与双语支持——这正是我们当初渴望拥有的平台——让他们的口碑不断累积，而非每成交一单就归零重来。",
      },
    ],
    howEyebrow: "我们的方式",
    workWithUs: "与我们合作",
    meetTeam: "认识团队",
    teamEyebrow: "我们的团队",
    teamTitle: "一个团队，服务纽约每个角落。",
    teamBody: "从法拉盛到曼哈顿，再到长岛北岸，我们的经纪人秉持同一套服务标准——本地洞察、双语关怀，以及每一单背后的媒体引擎。",
  },
  join: {
    eyebrow: "Homix 招募 · Flushing · NYC · LI",
    title: "我们给你的不是一张办公桌，而是一套成长平台。",
    lead: "大多数经纪公司卖给你一个 logo 和一份佣金分成，然后让你独自去找客户。Homix 不一样——我们是经纪公司、经纪人孵化器和媒体引擎三合一。入职第一天，你就能使用自有内容工作室，并通过抖音、小红书、Instagram 等合计 100 万+ 粉丝的关联账号进行内容分发，同时获得 AI、数据工具与本地双语资深导师支持。",
    heroCta: "申请加入 Homix",
    commissionPlanCta: "查看佣金方案",
    stats: [
      {
        value: "100 万+",
        label: "关联抖音 · 小红书 · Instagram 账号合计粉丝",
      },
      {
        value: "Bilingual",
        label: "中英双语团队，专为纽约华人买家与卖家而建",
      },
      {
        value: "In-house",
        label: "自有内容工作室——拍摄、剪辑、发布，无需外包",
      },
      {
        value: "Flushing · NYC · LI",
        label: "扎根法拉盛、皇后区与长岛，我们真正生活与成交的市场",
      },
    ],
    benefitsEyebrow: "为什么选择加入",
    benefitsTitle: "入职第一天，你就拥有。",
    benefits: [
      {
        title: "入职即可使用的媒体平台",
        body: "你不必独自从零搭建内容渠道。通过审核的房源和个人品牌内容，可由 Homix 工作室制作并在合计 100 万+ 粉丝的关联账号分发。实际触达因内容与平台而异，工作室会持续帮助你优化。",
      },
      {
        title: "自有工作室，把你打造成名",
        body: "这正是 SERHANT 的逻辑，并为本地市场量身定制：用媒体来卖房。我们的工作室为你撰稿、拍摄、剪辑短视频、房源影片和个人品牌内容——没有外包加价。你专注面对客户，我们负责让镜头爱上你。",
      },
      {
        title: "AI 与数据工具，帮你省下整周时间",
        body: "定价比对、社区数据、客户跟进、双语房源文案——全部交给我们的 AI 与数据系统处理，让你把时间花在客户身上，而不是表格里。好的科技应该服务于经纪人，而不是反过来。",
      },
      {
        title: "双语资深导师带教",
        body: "无论你是刚拿到执照，还是被困在只收桌费的公司，我们都会为你配对真正在法拉盛、皇后区和长岛成交过的资深经纪人——中英双语。真实跟单、真实复盘、真实人脉引荐。你学到的是市场，而不只是理论。",
      },
      {
        title: "为双语市场而生",
        body: "纽约的华人买家与卖家是一个庞大却被忽视的市场——而我们就是为他们、用两种语言打造的。营销、合同、沟通，都用每位客户最信任的语言进行，这意味着你能服务到其他经纪人根本触及不到的客户。",
      },
      {
        title: "一个真正的团队，而非桌费工厂",
        body: "有些经纪公司只是租给你一个座位、按月收费。Homix 选择投资你，因为你的成功就是我们的故事。透明的分成结构、清晰的成长路径，以及一个真正并肩作战的团队——我们宁愿打造一小批明星，也不要一仓库的名字。",
      },
    ],
    trainingEyebrow: "眼见为实",
    trainingTitle: "每周训练营与专题讲座——不是丢给你一本手册自己啃。",
    trainingLead:
      "这就是“双语资深导师带教”在 Homix 的真实样子：结构化训练营，以及由地产律师、贷款团队、自媒体专家主讲的专题课，带你走过每周都会遇到的交易、合同与内容难题。",
    trainingFeatures: [
      "买家精英 & Listing Mastery 训练营——每期 6 周、12 节实战课程",
      "每周专题讲座——法律、贷款、自媒体与 AI 实战，由行业专家主讲",
      "线下带教与圆桌讨论，而不只是一个刷不完的群",
    ],
    trainingCta: "查看经纪人培训",
    stepsEyebrow: "如何加入",
    stepsTitle: "从初次见面，到本地明星。",
    steps: [
      {
        title: "提交申请，进行一次真诚的面谈",
        body: "把你的背景告诉我们——已持照、刚持照，或正在考虑转行。我们会面对面（中英文皆可）了解你的目标，并坦诚地告诉你 Homix 是否适合你。",
      },
      {
        title: "打造你的品牌素材包",
        body: "我们的工作室为你拍摄出镜内容、建立双语主页，并规划在 Homix 渠道的内容分发，让市场逐步认识你的名字和房源。",
      },
      {
        title: "配对导师，开通工具",
        body: "我们为你配对一位资深双语导师，并开通 AI、数据与 CRM 工具——随后你便开始跟进真实客户，身边有人支持，而不是丢给你一本手册自己啃。",
      },
      {
        title: "成长为本地明星",
        body: "随着你的成交与内容不断累积，我们持续放大你的曝光、品牌与收入。真正投入的经纪人，会成为整个社区一眼就认得的面孔。",
      },
    ],
    whoEyebrow: "我们在寻找谁",
    whoTitle: "我们在寻找这样的你",
    whoBody: "你不需要庞大的客户名单，也不需要现成的粉丝——你需要的是企图心，以及愿意出镜、愿意走进社区的态度。如果你是刚持照、想要一个真正的起飞平台而不只是一张桌子和一个登录账号，我们很合适；如果你是经验丰富、却被困在只收费的经纪公司、厌倦了所有客户都得自己一个人去找，我们同样合适。考虑到我们服务的客户群，双语（中英文）是很大的加分项，但不可妥协的是：渴望、可被指导的心态，以及正直。如果你想成为本地明星，并且愿意为之付出，我们想和你聊聊。",
    faqEyebrow: "常见问题",
    faqTitle: "你可能想了解。",
    faq: [
      {
        q: "我还没有执照，可以加入吗？",
        a: "欢迎尽早联系我们。我们无法为你颁发执照——那是州里的事——但我们会指引你报读正确的考照课程，而且我们本就是为帮助新持照经纪人起步而设计的。导师、工具与观众，恰恰在你刚起步时最有价值。",
      },
      {
        q: "佣金分成和收入结构是怎样的？",
        a: "佣金方案页面会在申请前直接公布数字：Solo 为 85/15 与 $12,000 年度封顶；Solo Pro 每年 $3,650，从第一笔成交进入 100% 佣金模式；Team Member 为 90/10 与 $10,000 Homix 封顶，Team economics 则另行写入团队协议。",
      },
      {
        q: "我需要先有粉丝才能用上媒体引擎吗？",
        a: "不需要。你从第一天起就能使用自有工作室和内容分发流程。我们从你当下的起点出发，通过 Homix 渠道发布经审核的内容；最终效果取决于内容、市场与平台。",
      },
      {
        q: "在这里工作必须会中文吗？",
        a: "会中文是很大的优势，因为我们大量客户是华人，团队本身也以中英双语运作。但这并非硬性要求——企图心、虚心受教和正直更为重要。我们会把你安排在最能取胜的位置。",
      },
    ],
    ctaEyebrow: "聊一聊",
    ctaTitle: "别再独自追着客户跑。让自己成为头条。",
    ctaLead: "只需一次面谈，你就能看到一群观众、一个工作室、一套 AI 工具和真正的导师，能为你的事业带来什么。请在下方申请——我们会用你偏好的语言回复你。",
    orReach: "或直接联系我们：",
  },
  training: {
    eyebrow: "Homix 经纪人培训",
    title: "围绕纽约真实交易，系统训练。",
    lead: "从买家服务、房源开发，到贷款、交易法律、自媒体与 AI，Homix 把经纪人每天面对的一线工作，练成结构化训练营与专题课。",
    archiveCta: "查看历史培训视频",
    galleryEyebrow: "课程与讲座",
    galleryTitle: "每一场训练，都从经纪人一线遇到的问题出发。",
    photosEyebrow: "培训现场",
    photosTitle: "真实课堂、共同演练，也是一支持续学习的团队。",
  },
  journal: {
    eyebrow: "置业文章",
    title: "纽约置业文章",
    lead: "买房、卖房、租房、税务、市场数据与纽约安家相关的实用文章。",
    readMore: "阅读全文",
    by: "作者",
    backToJournal: "全部文章",
    minRead: "分钟阅读",
  },
  buyMenu: [
    { title: "搜索房源", desc: "查找全部在售房源" },
    { title: "社区指南", desc: "我们覆盖区域的本地指南" },
    { title: "封闭社区", desc: "Nassau 封闭与私密社区" },
    { title: "纽约新盘", desc: "可转发给客户的项目页" },
    { title: "灵活支付", desc: "可提供灵活付款安排的新盘" },
    { title: "房贷计算器", desc: "估算你的月供" },
  ],
  agentsPage: {
    eyebrow: "团队",
    title: "我们的经纪人",
    lead: "一支覆盖皇后区、长岛与曼哈顿的双语团队——每一位都是熟悉本地社区的纽约持牌专业人士。",
    searchLabel: "搜索经纪人",
    placeholder: "搜索姓名、语言或业务专长…",
    showing: "显示",
    noResults: "没有匹配的经纪人，请换个姓名或关键词。",
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
    officesEyebrow: "办公室",
    officesTitle: "三处纽约办公室，一支顾问团队。",
    officesLead: "可预约到访法拉盛、长岛或曼哈顿办公室。法拉盛仍是我们的主办公室，负责经纪业务运营与客户协调。",
    mainOffice: "主办公室",
    openMap: "打开地图",
  },
  neighborhoodsPage: {
    eyebrow: "社区",
    title: "我们最了解的地方",
    lead: "Homix 深耕的纽约社区的本地指南。",
    viewHomes: "查看该区房源",
    backToAll: "全部社区",
    photoBy: "摄影",
    whyEyebrow: "社区研判",
    whyTitle: "我们卖的不是邮编，而是对社区的理解",
    whyBody: "从法拉盛市中心到拿骚县北岸的村镇，这些都是 Homix 每周深耕的市场。我们的经纪人在这里长大、在这里生活、也每天搭乘这些列车——因此我们的建议来自真实的在地认知，而非门户网站上的一条房源。对每个社区，我们都把这份在地熟悉与严谨的数据结合起来：房子真实的定价走向、哪些学区的口碑长期稳固、通勤实际是什么样、供需又在往哪个方向走。最终交付的，是符合公平住房原则的中英双语建议，让你可以据此行动——无论是在 7 号线旁购入第一套合作公寓，还是换购北岸村镇的一栋殖民式住宅。",
    methodology: [
      {
        title: "可比成交与定价纪律",
        body: "我们以近期、真正可比的成交为基准定价——按楼层、房况、地块与景观逐项调整，而非照搬挂牌标价。买家得到有据可依的出价策略；卖家得到市场真正能承接的价格，让房子既不滞销，也不贱卖。",
      },
      {
        title: "学区与分区",
        body: "尤其在长岛，学区边界往往比所在街道更关键。我们核实房子真正所属的学区与对口范围，关注各学区长期稳固的口碑而非某一年的排名，并提示影响你能买什么、怎么买的分区规定与合作公寓董事会规则。",
      },
      {
        title: "交通与可达性",
        body: "我们把真实的通勤画出来——哪条地铁线、哪条长岛铁路支线、渡轮或高速公路服务这套房子，以及它如何转化为门到门的时间与转售吸引力。临近车站或快车服务是长期的价值支撑，我们会像买家和未来买家那样去权衡它。",
      },
      {
        title: "供需与时机",
        body: "我们按社区跟踪库存量、在售天数与季节节奏，让时机为你所用，而不是与你作对。清楚一个市场当下偏向买方还是卖方、房源通常在何时集中放出，能把一次紧张的猜测变成一步有计划的行动。",
      },
    ],
    glanceTitle: "速览",
    glanceLabels: {
      transit: "交通",
      schools: "学区",
      character: "社区气质",
      bestFor: "适合人群",
    },
  },
  communitiesPage: {
    eyebrow: "长岛",
    title: "Nassau 封闭与私密社区",
    lead: "门后是什么、HOA 到底管哪些、每月真实持有成本是多少——用人话讲清楚 Nassau County 的封闭式与私密社区。",
    backToAll: "全部社区",
    whyEyebrow: "我们怎么看一个 gated community",
    whyTitle: "门禁是问题的开始，不是答案。",
    whyBody: "从 North Hills、Muttontown 的人工岗哨独栋庄园，到近水的私密联排社区，Nassau 的封闭社区卖的是私密、省心和到曼哈顿的短途通勤。我们替买家这样看它：不只看一道门，而是看你住进去每月真实要付多少、业主协会替你打理了哪些、通勤到底方不方便、以及下一个买家是否能一眼读懂这个地址。",
    methodology: [
      {
        title: "真实持有成本",
        body: "标价只是开始。HOA 月费、地产税、以及可能的特别摊派，才决定你每月真正的开销——而且月费按户型和楼层浮动，我们逐套核实，不照搬宣传册。",
      },
      {
        title: "门后是什么",
        body: "24 小时人工岗、密码门、还是只是一个私密协会，差别很大。我们直说每个社区是哪一种、月费覆盖什么——绿化、铲雪、安保、会所配套——不留意外。",
      },
      {
        title: "通勤与可达",
        body: "我们把通勤讲实：最近的 LIRR 车站和支线、到 Penn Station 或 Grand Central 的常规时长、以及开车进城的情况。长岛地址，这趟车程是价值里很实在的一部分。",
      },
      {
        title: "转售逻辑",
        body: "开发商、年代、户型、地址的辨识度，共同决定下一个买家好不好理解这套房。我们按市场会怎么看来权衡转售，而不只看它今天好不好看。",
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "这个页面已经搬走了。",
    lead: "你要找的页面不在这里。带你回到房源吧。",
    backHome: "返回首页",
    browseListings: "浏览房源",
  },
  legal: {
    note: "上线前请由专业律师和备案经纪人审核法律文本。",
    lastUpdated: "最后更新",
  },
  sell: {
    eyebrow: "卖房 · Homix",
    title: "在纽约卖房，交给 Homix。",
    lead: "由持牌经纪人判断价格，中英文双语服务，再由专业内容团队通过合计 100 万+ 粉丝的关联社媒账号，在皇后区、长岛、曼哈顿及更广区域发布房源营销内容。",
    heroCta: "申请免费房屋估值",
    proof: {
      eyebrow: "Homix 的不同之处",
      items: [
        { value: "100 万+", label: "关联社媒账号合计粉丝" },
        { value: "EN · 中文", label: "双语营销" },
        { value: "抖音 · 小红书 · IG", label: "发布平台" },
        { value: "Flushing · NYC · LI", label: "深耕区域" },
      ],
    },
    advantagesEyebrow: "为什么把房子交给 Homix",
    advantagesTitle: "给你的房源，一个别人给不了的优势。",
    advantages: [
      {
        headline: "你的房子，通过成熟的媒体网络上线",
        body: "大多数房源只是挂在网站上等待被发现。我们会为挂牌首日制作内容，并通过抖音、小红书、Instagram 等合计 100 万+ 粉丝的关联账号发布，其中包括长期关注 Homix 纽约地产内容的人群。实际触达、带看和 offer 仍取决于房屋、定价、内容与市场。",
      },
      {
        headline: "我们能用买家的母语，把房子卖给他们",
        body: "从营销到谈判，我们全程中英文双语，把你的房子打开给法拉盛、皇后区、长岛一大批往往手握现金的华人买家——包括那些只在微信、小红书、抖音上看房，根本不上英文网站的海外买家。买家池更大、更精准，这正是只做英文的全国大行做不到的。",
      },
      {
        headline: "把你的家拍成一个故事，而不是一组图",
        body: "我们有自己的内容工作室，像拍品牌大片一样拍你的家——电影感带看、短视频房源、中英文讲述，专为在社交平台上被刷到、被转发而做，而不是塞进 MLS 图库里没人看。好的呈现，能让买家停下手指、约看房，也能让房子卖出该有的价。",
      },
      {
        headline: "定价用数据，拍板靠人",
        body: "我们会把多个估价模型，与我们手工整理的本地可比成交、实时需求信号逐一交叉核对，再由持牌的 Homix 顾问敲定价格，并把每一步推算逻辑讲清楚给你听。一开盘就定对价，才不会越拖越掉价，最终卖得更高。",
      },
      {
        headline: "我们做足开盘头几天——最关键的窗口",
        body: "一套房子最被关注的，就是刚挂牌的头几天。我们会先用预热把一批意向买家攒起来，再各平台同时开盘，让关注集中爆发，而不是零零散散地来——这才是势头起来、多组买家抢的开始，而不是慢慢挂冷。",
      },
      {
        headline: "繁琐的事我们扛，你省心",
        body: "布置建议、摄影、营销、带看、谈判，再到对接律师、协调过户——全程由名字挂在门上的那位顾问一手包办。卖房是很多人经历过最操心的事之一；我们的活儿，就是把这份重量接过来，把成交一路稳稳推到签约桌前。",
      },
      {
        headline: "真正走在这些街区里的本地团队",
        body: "法拉盛、皇后区、长岛北岸，我们一个街区一个街区地熟——成交对比、学区、本地买家真正愿意为什么买单。正是这份本地判断，让我们敢于定价，也能在出 offer 时替你守住价格。",
      },
      {
        headline: "成交、数据、逻辑，全都摊开给你看",
        body: "不靠看不懂的网络估价，也不让你听一句空话。我们会把对比成交、市场数据，以及定价和策略背后的逻辑全摊开给你看——还会在挂牌前，先给你一份清清楚楚的到手净收益预估。",
      },
    ],
    howEyebrow: "卖房流程",
    howTitle: "从挂牌到成交，四步搞定。",
    steps: [
      {
        title: "估价与策略",
        body: "免费、有数据支撑的估价。价格和方案我们和你一起定，逻辑也讲给你听。",
      },
      {
        title: "筹备与拍摄",
        body: "先给布置建议，再由我们的工作室把你的家拍成适合社交平台的中英文内容。",
      },
      {
        title: "媒体开盘",
        body: "先做预热，再在挂牌首日通过 Homix 媒体网络协调发布。",
      },
      {
        title: "挂牌上市 · 谈判 · 过户",
        body: "全面同步 MLS 与各大网站，谈判出价，对接律师与过户——全程替你打理。",
      },
    ],
    valuationEyebrow: "免费卖房咨询",
    valuationTitle: "不是一个算法数字，而是一份针对你家房子的市场判断。",
    valuationLead: "留下房屋地址，Homix 持牌顾问会结合近期可比成交、当前竞争房源、房屋情况和买家需求，为你准备更有依据的价格建议。",
    valuationDeliverables: [
      {
        title: "有依据的价格区间",
        body: "围绕你的房屋筛选近期成交和在售竞争，不用一个 ZIP Code 的平均数敷衍你。",
      },
      {
        title: "清楚的上市策略",
        body: "从定价、时间、上市前准备，到最值得触达的买家人群，逐项说明。",
      },
      {
        title: "更明白的到手金额",
        body: "在决定挂牌前，先了解可能的卖房成本和预计净收益。",
      },
    ],
    valuationAssurances: ["免费、无任何义务", "一个工作日内回复", "全程保密"],
    valuationNotice: "本意见用于卖房规划，不构成持牌房屋评估报告，也不保证最终成交价格。",
    valuationForm: {
      propertyAddress: "房屋地址",
      addressPlaceholder: "街道地址、城市、州、邮编",
      propertyType: "房屋类型",
      propertyTypePlaceholder: "请选择",
      propertyTypes: [
        { value: "single-family", label: "独栋住宅" },
        { value: "condo", label: "Condo 公寓" },
        { value: "coop", label: "Co-op 合作公寓" },
        { value: "multifamily", label: "多家庭住宅" },
        { value: "townhouse", label: "联排住宅" },
        { value: "other", label: "其他" },
      ],
      bedrooms: "卧室数量",
      bedroomsPlaceholder: "请选择",
      bedroomOptions: [
        { value: "studio", label: "Studio" },
        { value: "1", label: "1 卧" },
        { value: "2", label: "2 卧" },
        { value: "3", label: "3 卧" },
        { value: "4", label: "4 卧" },
        { value: "5-plus", label: "5 卧以上" },
      ],
      timeline: "你大概什么时候考虑出售？",
      timelinePlaceholder: "请选择时间",
      timelineOptions: [
        { value: "now", label: "尽快出售" },
        { value: "0-3", label: "3 个月内" },
        { value: "3-6", label: "3-6 个月内" },
        { value: "6-plus", label: "6 个月以后" },
        { value: "curious", label: "先了解市场" },
      ],
      name: "姓名",
      phone: "电话（选填）",
      email: "电子邮箱",
      notes: "还有什么需要我们了解？（选填）",
      notesPlaceholder: "装修情况、是否自住、方便联系的时间或其他说明",
      consent: "我同意 Homix 就本次估值申请通过电话、短信或电子邮件联系我。同意并非获得任何服务的条件；可能产生短信及数据费用，回复 STOP 可退订。",
      submit: "申请我的房屋估值",
      sending: "正在提交...",
      thanksTitle: "估值申请已收到。",
      thanksBody: "Homix 顾问会查看房屋情况，并在一个工作日内与你联系。",
    },
    finalCta: {
      title: "房子卖得好，从挂牌前就开始了。",
      body: "先私下聊清楚价格、时机、上市前准备，以及这次搬家真正想实现什么。",
      button: "从免费估值开始",
    },
    orCall: "或致电",
    listingsCta: {
      kicker: "在考虑卖房？",
      line: "你的家，值得的不止门口一块牌子。我们制作双语推广内容，并通过合计 100 万+ 粉丝的关联账号分发。",
      button: "卖房 · Homix",
    },
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
