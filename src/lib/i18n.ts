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
    listings: "Buy",
    advisors: "Advisors",
    journal: "Journal",
    sell: "Sell",
    join: "Join Homix",
    about: "About",
    contact: "Contact",
    neighborhoods: "Neighborhoods",
    offer: "Make an offer",
    buyercoach: "Buyer coach",
    tools: "Agents Portal",
    onboarding: "Onboarding",
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
    title: "We don't hand you a desk. We hand you an audience.",
    lead: "Most brokerages sell you a logo and a commission split, then leave you to find clients alone. Homix is a brokerage, an agent incubator, and a media engine in one. Day one, you step into an audience of 1,000,000+ across 抖音, 小红书, and Instagram, an in-house content studio, AI and data tools, and bilingual senior mentors who have closed in this market. Where Homes Meet Headlines — we turn agents into local stars.",
    heroCta: "Apply to join Homix",
    stats: [
      {
        value: "1,000,000+",
        label: "Followers across 抖音 · 小红书 · Instagram you tap into on day one",
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
        title: "An audience, handed to you",
        body: "You don't start from zero followers. Our 1,000,000+ community across 抖音, 小红书, and Instagram becomes the top of your funnel. Your listings, your face, and your story go out to people already watching Homix — so the leads find you, not the other way around.",
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
    stepsEyebrow: "How to join",
    stepsTitle: "From hello to local star.",
    steps: [
      {
        title: "Apply and have a real conversation",
        body: "Send us your background — licensed, newly licensed, or considering the move. We'll sit down (in English or 中文) to understand your goals and tell you honestly whether Homix is the right fit.",
      },
      {
        title: "Build your brand kit",
        body: "Our studio shoots your intro content, sets up your bilingual profile, and plugs you into the Homix channels so the 1,000,000+ audience starts seeing your name and your listings.",
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
        a: "We keep economics transparent and discuss them openly in your first conversation, because the right structure depends on your experience and goals. What we won't do is dress up a monthly desk fee as a 'partnership.' We invest in your brand and leads because your growth is how we grow.",
      },
      {
        q: "Do I need an existing following to benefit from the media engine?",
        a: "No — that's the entire point. You plug into our 1,000,000+ audience and in-house studio from day one. We build your personal brand from where you are; you don't need to arrive famous, you leave famous.",
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
  journal: {
    eyebrow: "Journal",
    title: "Notes from an AI-first brokerage",
    lead: "Market data, neighborhood deep-dives, and a point of view worth reading — from the people who do the work.",
    readMore: "Read article",
    by: "By",
    backToJournal: "All articles",
    minRead: "min read",
  },
  offer: {
    eyebrow: "Make an offer",
    title: "Ready to make an offer?",
    lead: "Tell us the home and your terms. A Homix advisor reviews every submission and follows up — usually within one business day — to formalize your offer.",
    prepEyebrow: "Before you start",
    prepTitle: "What to have on hand",
    prep: [
      {
        title: "The property",
        body: "The address or MLS number of the home you want to offer on.",
      },
      {
        title: "Your terms",
        body: "Offer price, financing (cash or mortgage), down payment, and your ideal closing date.",
      },
      {
        title: "Proof of funds",
        body: "A pre-approval letter or proof of funds makes your offer stronger — have a PDF ready to upload.",
      },
    ],
    formEyebrow: "Offer details",
    fallbackTitle: "Online offers are being connected.",
    fallbackBody: "We're setting this up right now. In the meantime, call or message us and we'll take your offer directly.",
    talkToUs: "Contact us",
    disclaimer: "Submitting this form is a non-binding expression of interest, not a contract — a signed contract is required to be legally binding. Homix is an Equal Housing Opportunity brokerage. Information you share is handled under our Privacy Policy.",
  },
  buyercoach: {
    eyebrow: "Buyer Coach · AI",
    title: "Your AI buyer coach.",
    lead: "Ask anything about buying a home in the US. Trained on Homix's guides, in plain language, any time.",
    disclaimer: "Answers are general information generated by AI — not legal, financial, tax, or mortgage advice. Confirm anything important with a licensed Homix advisor.",
    fallbackTitle: "The coach is being connected.",
    fallbackBody: "Our AI buyer coach is coming online. In the meantime, reach a real advisor — we're glad to help.",
    talkToAdvisor: "Talk to an advisor",
  },
  toolDesc: {
    calculator: "Estimate your monthly payment",
    offer: "Submit an offer on a home",
    buyercoach: "AI answers for home buyers",
    onboarding: "How joining Homix works",
  },
  buyMenu: [
    { title: "Browse homes", desc: "Search every home for sale" },
    { title: "Neighborhoods", desc: "Guides to the areas we cover" },
    { title: "Mortgage calculator", desc: "Estimate your monthly payment" },
  ],
  onboarding: {
    eyebrow: "Agent Onboarding",
    title: "Your first 90 days at Homix, mapped out",
    lead: "Joining a brokerage should feel like joining a team that has already cleared the runway for you. This is the full picture of what onboarding at Homix Realty involves — from the moment you accept our offer in Flushing to the day you close your first deal. Six phases, no guesswork: licensing and compliance handled correctly under New York law, every account and system set up, a media kit and personal brand built in our in-house studio, and a bilingual mentor walking beside you the whole way.",
    phases: [
      {
        title: "Phase 1 — Offer & Paperwork",
        blurb: "We start with clarity. Before any system or license, you and Homix put the working relationship in writing — your commission tier, what the brokerage provides, and what we expect of each other. Most of this happens in a single sit-down at our Flushing office, in the language you're most comfortable in.",
        items: [
          "Review and sign your Independent Contractor Agreement, which defines your commission split, tier, and how splits grow with production.",
          "Walk through the Homix policy manual and code of conduct — advertising rules, client handling, anti-discrimination and Fair Housing expectations.",
          "Complete tax and payroll setup: W-9, direct-deposit details, and emergency contact on file.",
          "Meet your onboarding lead and pick your bilingual (EN/中文) mentor track.",
          "Receive your onboarding roadmap — this six-phase plan with target dates for each milestone.",
        ],
      },
      {
        title: "Phase 2 — Licensing & Compliance",
        blurb: "Real estate is a licensed profession, and in New York it is taken seriously. Homix becomes your sponsoring broker — but the salesperson license is yours, applied for in your name through the NY Department of State. We make sure every step is done correctly the first time, because a clean license file is the foundation of everything that follows.",
        items: [
          "Confirm your 77-hour NY pre-licensing course completion and passing state exam score (or transfer an active license if you already hold one).",
          "Apply for your salesperson license via eAccessNY, entering Homix Realty Inc.'s broker UID as your sponsoring broker; we authorize the association from our side.",
          "Receive your DOS pocket card and license number — this number is disclosed on all your advertising and listings.",
          "Be added to Homix's Errors & Omissions (E&O) insurance and review your coverage.",
          "Complete required Fair Housing and Code of Ethics training so you start fully compliant.",
        ],
      },
      {
        title: "Phase 3 — Systems & Accounts",
        blurb: "With your license active, we switch on your toolkit. Homix gives you a single Homix ID that opens your email, CRM, the OneKey MLS, and our AI workspace — the same intelligence that powers our listings, valuations, and content. By the end of this phase you can log in once and reach everything you need to work a deal.",
        items: [
          "Activate your @homix email and Homix ID single sign-on for the agent portal.",
          "Gain OneKey MLS access through our association membership — covering Queens and the wider NYC metro — and complete the required MLS rules orientation.",
          "Set up your CRM: import contacts, connect lead routing, and learn how Homix-sourced leads land in your pipeline.",
          "Get onboarded to the Homix AI workspace — listing copy, valuations, bilingual translation, and content drafting.",
          "Install transaction and e-signature tools, and bookmark the brokerage's compliant forms library.",
        ],
      },
      {
        title: "Phase 4 — Brand & Media Kit",
        blurb: "This is where Homix is different. Most brokerages hand you a logo and wish you luck. We put you in front of a camera. Our in-house studio and 1M+ audience exist to make you visible from day one — so the market meets a Homix professional, not an anonymous new agent. This phase turns you into recognizable, on-brand media.",
        items: [
          "Book your in-house studio session: professional headshots, a short intro reel, and on-brand profile photography.",
          "Publish your agent profile on the Homix website and connect it to your listings.",
          "Receive your branded media kit — business cards, email signature, social templates, and EHO/license disclosures built in.",
          "Plan your first content with the media team: a Flushing/Queens neighborhood feature or a listing tour for our channels.",
          "Set up your social handles to brand standards, with bilingual captions ready to go.",
        ],
      },
      {
        title: "Phase 5 — Training & Mentorship",
        blurb: "Tools and a brand don't close deals — skill does. Homix is an agent incubator first, so we don't drop you in the deep end. You get a structured curriculum and a bilingual mentor who has done the work in this market. You'll learn how a Homix deal actually runs, from first call to closing table, before you ever do it for real.",
        items: [
          "Complete the Homix Foundations curriculum: pricing, buyer and seller consultations, contracts, and negotiation.",
          "Shadow your mentor on live appointments and a closing, and debrief each one together.",
          "Run role-play scripts for buyer consultations and listing presentations in English and 中文.",
          "Build your 90-day business plan: lead sources, content cadence, and weekly activity targets.",
          "Learn the compliance essentials in practice — agency disclosure, Fair Housing in conversation, and accurate listing attribution.",
        ],
      },
      {
        title: "Phase 6 — First Deal & Beyond",
        blurb: "Onboarding ends where your career begins: a real client and a real transaction, with the whole brokerage behind you. Your mentor, the media engine, the AI tools, and our operations desk stay close while you take a deal across the line. After it closes, we review what worked and set the rhythm that carries you into a steady, growing book of business.",
        items: [
          "Take your first lead from intake to signed agreement with mentor support at each step.",
          "Use the operations desk for contract review, timelines, and a smooth, compliant closing.",
          "Turn the win into content: a closing announcement and client story for the Homix channels.",
          "Hold a first-deal debrief with your mentor and lock in your ongoing growth plan.",
          "Map your path up the commission tiers and into Homix's advanced and leadership tracks.",
        ],
      },
    ],
    closingTitle: "You're never onboarding alone",
    closingBody: "Every phase here is something Homix does with you, not a checklist we hand off and forget. By the time you finish, you have an active New York license sponsored by Homix Realty, full OneKey MLS access, a complete tech and AI stack, a studio-built personal brand in front of a 1M+ audience, and a mentor who has already walked the same road. That is the difference between getting a job and being set up to win. Welcome to Homix.",
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
    whyEyebrow: "Neighborhood Intelligence",
    whyTitle: "We don't sell zip codes. We read neighborhoods.",
    whyBody: "From Downtown Flushing to the North Shore villages of Nassau County, these are the markets Homix works in every week. Our agents grew up here, shop here, and ride these trains — so our guidance is grounded in lived knowledge, not a portal listing. For each neighborhood we pair that local fluency with disciplined data: how homes are actually pricing, which school districts hold their reputation, what the commute really looks like, and where supply and demand are heading. The result is bilingual, fair-housing-conscious counsel you can act on, whether you're buying your first co-op near the 7 train or trading up to a colonial in a top-ranked school zone.",
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
    title: "Sell where the buyers already are.",
    lead: "Most homes wait on a portal to be found. Homix launches yours as content to a 1,000,000+ audience across 抖音, 小红书, and Instagram — in English and 中文 — reaching qualified, often cash-ready buyers other brokerages can't. The result: broader demand, a faster sale, and more money in your pocket.",
    heroCta: "Get your free valuation",
    proof: {
      eyebrow: "The Homix difference",
      items: [
        { value: "1,000,000+", label: "Audience we reach" },
        { value: "EN · 中文", label: "Bilingual marketing" },
        { value: "抖音 · 小红书 · IG", label: "Where we publish" },
        { value: "Flushing · NYC · LI", label: "Where we go deep" },
      ],
    },
    advantagesEyebrow: "Why sell with Homix",
    advantagesTitle: "An unfair advantage for your listing.",
    advantages: [
      {
        headline: "Your home launches to an audience we already own",
        body: "Most listings sit on a portal waiting to be found. We broadcast yours on day one to a 1,000,000+ following across 抖音, 小红书, and Instagram — real buyers already watching New York real estate. More eyes in the first days means more showings, faster, and the demand that creates competing offers.",
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
        body: "A coming-soon warm-up, then a day-one broadcast to our 1,000,000+ audience across every channel.",
      },
      {
        title: "MLS, offers & closing",
        body: "Full MLS and portal syndication, offer negotiation, and attorney and closing coordination — handled for you.",
      },
    ],
    valuationEyebrow: "Free home valuation",
    valuationTitle: "What's your home worth?",
    valuationLead: "Tell us about your home and a Homix advisor will prepare a complimentary, no-obligation valuation.",
    valuationAssurances: ["Free & no-obligation", "We reply within one business day", "Confidential"],
    orCall: "Or call",
    listingsCta: {
      kicker: "Thinking of selling?",
      line: "Your home deserves more than a yard sign. We launch it to a 1,000,000+ bilingual audience — and reach buyers other brokerages can't.",
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
    journal: "观察",
    sell: "卖房",
    join: "加入我们",
    about: "关于",
    contact: "联系",
    neighborhoods: "社区",
    offer: "提交报价",
    buyercoach: "买家教练",
    tools: "经纪人门户",
    onboarding: "入职",
    privacy: "隐私政策",
    terms: "服务条款",
    accessibility: "无障碍",
    fairHousing: "公平住房",
    standardOperatingProcedures: "标准操作流程",
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
    title: "一家媒体先行、AI 赋能的纽约房地产公司。",
    lead: "Homix 是一家以\"媒体先行\"为根基的纽约房地产公司：我们先赢得关注，再谈房源委托。我们组建了一支横跨法拉盛、皇后区与长岛的双语团队，并以 AI 辅助定价与营销——让您的房子用对的语言、在买家本就信任的平台上，触达真正合适的买家。",
    p1: "Homix 的起点是一台相机，而不是一块\"待售\"招牌。在公司成立之前，先有了观众——一群追随创始人张思（Si Zhang，\"Sunny\"）的街坊邻里，因为他用大家听得懂的语言，诚实地讲清楚纽约房地产到底是怎么运转的：合作公寓（co-op）董事会真正在意什么、为什么相邻两个街区价格相差悬殊、怎样读懂一则皇后区房源字里行间的言外之意。这种\"媒体先行\"的习惯，至今仍是我们存在的全部意义。我们相信，赢得客户最好的方式，是在任何人准备买卖之前就真正帮上忙，并在成交之后依然在场。",
    p2: "这样的起点，决定了我们做事的方式。我们的团队天生双语——英语与普通话皆能流利沟通，更通晓法拉盛、皇后区其他社区与长岛的真实生态：在这里，许多家庭正进行人生中第一笔、或最大一笔的美国置业。我们让 AI 在它该出力的地方出力：依据最新可比成交为房屋定价、用两种语言撰写营销文案、更快地为合适的房子匹配合适的买家。技术留在幕后，关系留在台前。无论您是初次置业，还是要出售养育了一家人的住所，您得到的，都是一支早已熟悉您社区的团队——以及一群早已在聆听的观众。",
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
    teamBody: "从法拉盛到曼哈顿，再到长岛北岸，我们的经纪人秉持同一套服务标准——本地洞察、双语贴心，以及每一单背后的媒体引擎。",
  },
  join: {
    eyebrow: "Homix 招募 · Flushing · NYC · LI",
    title: "我们给你的不是一张办公桌，而是一群观众。",
    lead: "大多数经纪公司卖给你一个 logo 和一份佣金分成，然后让你独自去找客户。Homix 不一样——我们是经纪公司、经纪人孵化器和媒体引擎三合一。入职第一天，你就接入抖音、小红书、Instagram 上超过 100 万的粉丝群体，拥有自有内容工作室、AI 与数据工具，以及在本地真正成交过的双语资深导师。Where Homes Meet Headlines——我们把经纪人打造成本地明星。",
    heroCta: "申请加入 Homix",
    stats: [
      {
        value: "1,000,000+",
        label: "抖音 · 小红书 · Instagram 全网粉丝，入职即可触达",
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
        title: "一群现成的观众，直接交到你手上",
        body: "你不必从零粉丝起步。我们在抖音、小红书、Instagram 上超过 100 万的社群，就是你的获客漏斗顶端。你的房源、你的出镜、你的故事，会推送给本就关注 Homix 的人群——让客户主动找到你，而不是你苦苦去找客户。",
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
    stepsEyebrow: "如何加入",
    stepsTitle: "从初次见面，到本地明星。",
    steps: [
      {
        title: "提交申请，进行一次真诚的面谈",
        body: "把你的背景告诉我们——已持照、刚持照，或正在考虑转行。我们会面对面（中英文皆可）了解你的目标，并坦诚地告诉你 Homix 是否适合你。",
      },
      {
        title: "打造你的品牌套装",
        body: "我们的工作室为你拍摄出镜内容、建立你的双语主页，并将你接入 Homix 各大渠道，让超过 100 万的观众开始看到你的名字和你的房源。",
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
        a: "我们坚持透明的收入结构，并会在首次面谈时与你开诚布公地讨论，因为最合适的方案取决于你的经验和目标。我们绝不会把每月的桌费包装成所谓的“合伙”。我们投资你的品牌与客户，因为你的成长就是我们的成长方式。",
      },
      {
        q: "我需要先有粉丝才能用上媒体引擎吗？",
        a: "不需要——这正是关键所在。你从第一天起就接入我们超过 100 万的观众和自有工作室。我们从你当下的起点出发，帮你打造个人品牌；你不必带着名气进来，而是带着名气走出去。",
      },
      {
        q: "在这里工作必须会中文吗？",
        a: "会中文是很大的优势，因为我们大量客户是华人，团队本身也以中英双语运作。但这并非硬性要求——企图心、可指导性和正直更为重要。我们会把你安排在最能取胜的位置。",
      },
    ],
    ctaEyebrow: "聊一聊",
    ctaTitle: "别再独自追着客户跑。让自己成为头条。",
    ctaLead: "只需一次面谈，你就能看到一群观众、一个工作室、一套 AI 工具和真正的导师，能为你的事业带来什么。请在下方申请——我们会用你偏好的语言回复你。",
    orReach: "或直接联系我们：",
  },
  journal: {
    eyebrow: "观察",
    title: "来自一家 AI 优先经纪公司的洞察",
    lead: "市场数据、社区深度、值得一读的观点——出自真正做事的人。",
    readMore: "阅读全文",
    by: "作者",
    backToJournal: "全部文章",
    minRead: "分钟阅读",
  },
  offer: {
    eyebrow: "提交报价",
    title: "准备好出价了吗？",
    lead: "告诉我们房子和你的条件。每一份提交都会有 Homix 顾问审阅，并通常在一个工作日内跟进，帮你把报价正式化。",
    prepEyebrow: "开始之前",
    prepTitle: "请先准备好",
    prep: [
      {
        title: "房源",
        body: "你想出价的房子的地址或 MLS 编号。",
      },
      {
        title: "你的条件",
        body: "报价金额、付款方式（现金或贷款）、首付，以及你理想的过户日期。",
      },
      {
        title: "资金证明",
        body: "贷款预批信或资金证明会让你的报价更有分量——准备好一份 PDF 以便上传。",
      },
    ],
    formEyebrow: "报价详情",
    fallbackTitle: "在线报价正在接入中。",
    fallbackBody: "我们正在配置这项功能。在此之前，欢迎直接致电或留言，我们会当面为你接收报价。",
    talkToUs: "联系我们",
    disclaimer: "提交此表单是无约束力的意向表达，并非合同——具备法律约束力需另签正式合同。Homix 遵循《公平住房机会》原则。你提供的信息将依据我们的隐私政策处理。",
  },
  buyercoach: {
    eyebrow: "买家教练 · AI",
    title: "你的 AI 买房教练。",
    lead: "关于在美国买房的任何问题都可以问。基于 Homix 的指南训练，用大白话，随时为你解答。",
    disclaimer: "回答是由 AI 生成的一般信息——不构成法律、财务、税务或贷款方面的专业意见。重要事项请向持牌的 Homix 顾问核实。",
    fallbackTitle: "教练正在接入中。",
    fallbackBody: "我们的 AI 买房教练即将上线。在此之前，欢迎联系真人顾问，我们很乐意帮忙。",
    talkToAdvisor: "联系顾问",
  },
  toolDesc: {
    calculator: "估算你的月供",
    offer: "在线提交购房报价",
    buyercoach: "AI 买房问答",
    onboarding: "加入 Homix 的全流程",
  },
  buyMenu: [
    { title: "搜索房源", desc: "查找全部在售房源" },
    { title: "社区指南", desc: "我们覆盖区域的本地指南" },
    { title: "房贷计算器", desc: "估算你的月供" },
  ],
  onboarding: {
    eyebrow: "经纪人入职",
    title: "在 Homix 的前 90 天，为你铺好每一步",
    lead: "加入一家经纪公司，应当像加入一支早已为你扫清跑道的团队。这里是 Homix Realty 入职流程的完整图景——从你在法拉盛接受我们的 offer，到成交第一单。六个阶段，无需自己摸索：依据纽约州法律正确办妥执照与合规、配齐所有账户与系统、在自有摄影棚打造你的媒体素材包与个人品牌，并由一位中英双语导师全程陪你同行。",
    phases: [
      {
        title: "第一阶段 · Offer 与签约文件",
        blurb: "我们从把话说清楚开始。在配置任何系统或办理执照之前，你与 Homix 先把合作关系白纸黑字写下来——你的佣金档位、公司提供什么、彼此的期待是什么。这些大多在法拉盛办公室一次面谈中、用你最自在的语言完成。",
        items: [
          "审阅并签署《独立承包人协议》，其中界定你的佣金分成、档位，以及分成如何随业绩成长。",
          "通读 Homix 政策手册与行为准则——广告规则、客户对接、反歧视与公平住房（Fair Housing）要求。",
          "完成税务与发放设置：W-9 表、直接存款资料，并登记紧急联系人。",
          "认识你的入职负责人，并选定中英双语导师路线。",
          "领取你的入职路线图——这份六阶段计划，并为每个里程碑标注目标日期。",
        ],
      },
      {
        title: "第二阶段 · 执照与合规",
        blurb: "房地产是受执照监管的行业，在纽约州尤为严格。Homix 成为你的挂靠经纪（sponsoring broker）——但销售员执照属于你本人，以你的名义通过纽约州务厅（NY Department of State）申请。我们确保每一步第一次就办对，因为一份干净的执照档案，是后续一切的根基。",
        items: [
          "确认你已完成纽约州 77 小时执照前课程并通过州考（若已持有有效执照，则办理挂靠转移）。",
          "通过 eAccessNY 申请销售员执照，填入 Homix Realty Inc. 的经纪 UID 作为挂靠经纪；我们从公司端确认关联。",
          "领取州务厅 pocket card 与执照号——该号码须出现在你所有广告与房源中。",
          "纳入 Homix 的错误与遗漏（E&O）责任保险，并了解你的保障范围。",
          "完成必修的公平住房与职业道德规范（Code of Ethics）培训，确保起步即合规。",
        ],
      },
      {
        title: "第三阶段 · 系统与账户",
        blurb: "执照生效后，我们为你开启全套工具。Homix 给你一个统一的 Homix ID，打通邮箱、CRM、OneKey MLS，以及我们的 AI 工作台——正是驱动我们房源、估价与内容的同一套智能。到本阶段结束，你只需登录一次，就能触达推进一单交易所需的全部工具。",
        items: [
          "激活你的 @homix 企业邮箱与 Homix ID 单点登录，进入经纪人后台。",
          "通过公司协会会员资格获得 OneKey MLS 权限——覆盖皇后区及整个纽约都会区——并完成必修的 MLS 规则培训。",
          "配置你的 CRM：导入联系人、接通线索分配，了解 Homix 提供的线索如何进入你的管道。",
          "接入 Homix AI 工作台——房源文案、估价、中英互译与内容初稿。",
          "安装交易管理与电子签名工具，并收藏公司合规表单库。",
        ],
      },
      {
        title: "第四阶段 · 品牌与媒体素材包",
        blurb: "这是 Homix 与众不同之处。多数经纪公司只给你一个 logo，然后祝你好运。我们把你请到镜头前。我们的自有摄影棚与百万级（1M+）受众，就是为了让你从第一天起就被看见——市场遇见的是一位 Homix 专业人士，而非一个无名的新人。本阶段，把你打造成可被识别、契合品牌的媒体形象。",
        items: [
          "预约自有摄影棚拍摄：专业形象照、一段简短自我介绍影片，以及契合品牌的个人照片。",
          "在 Homix 官网发布你的经纪人主页，并关联到你的房源。",
          "领取品牌媒体素材包——名片、邮件签名、社交模板，并已内置平等住房机会（EHO）与执照披露。",
          "与媒体团队规划你的首批内容：一期法拉盛/皇后区社区特辑，或一支登上我们频道的房源导览。",
          "按品牌规范建立你的社交账号，并备好中英双语文案。",
        ],
      },
      {
        title: "第五阶段 · 培训与师徒同行",
        blurb: "工具与品牌成交不了单——本事才行。Homix 首先是一个经纪人孵化器，所以我们不会把你直接丢进深水区。你将获得一套结构化课程，以及一位在本地市场真正实战过的双语导师。在你真正上手之前，你会先学会一单 Homix 交易究竟如何运转——从第一通电话到成交桌。",
        items: [
          "完成 Homix 基础课程：定价、买卖方咨询、合同与谈判。",
          "跟随导师实地参与真实约访与一场成交，并在每次结束后共同复盘。",
          "用中英双语演练买方咨询与房源推介的话术剧本。",
          "制定你的 90 天业务计划：线索来源、内容节奏与每周行动目标。",
          "在实操中掌握合规要点——代理关系披露、对话中的公平住房原则，以及准确的房源署名。",
        ],
      },
      {
        title: "第六阶段 · 第一单及之后",
        blurb: "入职在你的事业起点处收尾：一位真实客户、一笔真实交易，整家公司做你的后盾。在你把一单送过终点线时，导师、媒体引擎、AI 工具与运营台始终在你身边。成交之后，我们一起复盘哪些奏效，并定下能带你走向稳定、持续增长业务的节奏。",
        items: [
          "在导师每一步的支持下，把你的第一条线索从接洽推进到签约。",
          "借助运营台完成合同审阅、时间节点把控，达成顺畅而合规的成交。",
          "把成功转化为内容：在 Homix 频道发布成交喜讯与客户故事。",
          "与导师进行首单复盘，并敲定你的长期成长计划。",
          "规划你晋升佣金档位、迈入 Homix 进阶与带队领导路线的路径。",
        ],
      },
    ],
    closingTitle: "入职路上，你从不孤单",
    closingBody: "这里的每一个阶段，都是 Homix 与你一起完成的，而非交出一张清单便不再过问。当你走完全程，你将拥有：由 Homix Realty 挂靠的有效纽约执照、完整的 OneKey MLS 权限、一整套技术与 AI 工具、在摄影棚打造并面向百万级受众的个人品牌，以及一位早已走过同一条路的导师。这正是\"找到一份工作\"与\"被托举着去赢\"之间的差别。欢迎加入 Homix。",
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
    whyEyebrow: "社区研判",
    whyTitle: "我们卖的不是邮编，而是对社区的理解",
    whyBody: "从法拉盛市中心到拿骚县北岸的村镇，这些都是 Homix 每周深耕的市场。我们的经纪人在这里长大、在这里生活、也每天搭乘这些列车——因此我们的建议来自真实的在地认知，而非门户网站上的一条房源。对每个社区，我们都把这份在地熟悉与严谨的数据结合起来：房子真实的定价走向、哪些学区的口碑长期稳固、通勤实际是什么样、供需又在往哪个方向走。最终交付的，是符合公平住房原则的中英双语建议，让你可以据此行动——无论是在 7 号线旁购入第一套合作公寓，还是换购顶级学区里的一栋殖民式住宅。",
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
  notFound: {
    eyebrow: "404",
    title: "这个页面已经搬走了。",
    lead: "你要找的页面不在这里。我们带你回到房子那边。",
    backHome: "返回首页",
    browseListings: "浏览房源",
  },
  legal: {
    note: "上线前请由专业律师和备案经纪人审核法律文本。",
    lastUpdated: "最近更新",
  },
  sell: {
    eyebrow: "卖房 · Homix",
    title: "把房子卖到买家本来就在的地方。",
    lead: "大多数房子只是挂在网站上等人来翻。Homix 把你的家做成内容，第一天就推给抖音、小红书、Instagram 上 100 万+ 的受众，中英文双语触达那些别家够不着、又往往手握现金的精准买家。结果是：更广的需求、更快的成交、更多落进你口袋的钱。",
    heroCta: "免费估价",
    proof: {
      eyebrow: "Homix 的不同之处",
      items: [
        { value: "1,000,000+", label: "触达受众" },
        { value: "EN · 中文", label: "双语营销" },
        { value: "抖音 · 小红书 · IG", label: "发布平台" },
        { value: "Flushing · NYC · LI", label: "深耕区域" },
      ],
    },
    advantagesEyebrow: "为什么把房子交给 Homix",
    advantagesTitle: "给你的房源，一个别人给不了的优势。",
    advantages: [
      {
        headline: "你的房子，第一天就推给我们自己的百万受众",
        body: "大多数房源只是挂在网站上，等着被人翻到。我们不一样：挂牌第一天，就把你的房子推送给抖音、小红书、Instagram 上 100 万+ 的粉丝——一群本就在看纽约房子的真实买家。开盘头几天看的人越多，带看越多、越快，也越容易形成抢 offer 的局面。",
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
        body: "我们会把多个估价模型，和我们手工挑选的本地成交对比盘、实时市场热度信号交叉核对，再由持牌的 Homix 顾问拍定价格，并把每一步逻辑讲清楚给你听。一开盘就定对价，才不会越拖越掉价，最终卖得更高。",
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
        body: "先做预热，挂牌第一天各平台同时开盘，推送给我们 100 万+ 的受众。",
      },
      {
        title: "上市 · 谈判 · 过户",
        body: "全面同步 MLS 与各大网站，谈判出价，对接律师与过户——全程替你打理。",
      },
    ],
    valuationEyebrow: "免费房屋估价",
    valuationTitle: "你的家值多少？",
    valuationLead: "告诉我们你的房子，Homix 顾问将为你准备一份免费、无义务的估价。",
    valuationAssurances: ["免费、无义务", "一个工作日内回复", "全程保密"],
    orCall: "或致电",
    listingsCta: {
      kicker: "在考虑卖房？",
      line: "你的家，值得的不止门口一块牌子。我们把它推给 100 万+ 双语受众，触达别家够不着的买家。",
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
