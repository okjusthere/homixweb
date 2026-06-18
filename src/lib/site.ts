/**
 * Site-wide brand content and configuration for Homix.
 *
 * Most values are REAL, migrated from homixny.com. Items still needing the
 * client's confirmation are marked CONFIRM. Compliance note: keep stats and
 * testimonials truthful and attributable.
 */

export const siteConfig = {
  name: "Homix",
  legalName: "Homix Realty Inc.",
  tagline: "Where Homes Meet Headlines",
  description:
    "Homix is a new kind of New York real estate company — built on media. A full-service brokerage, an agent incubator, and a content studio with a 200K+ audience, powered by data and AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homixny.com",
  market: "New York",
  contact: {
    phone: "(917) 688-9917",
    phoneHref: "tel:+19176889917",
    email: "homix@homixny.com",
    address: {
      line1: "37-20 Prince St, Ste 3F",
      city: "Flushing",
      state: "NY",
      zip: "11354",
    },
  },
  // Required US/NY brokerage disclosures — CONFIRM exact license numbers + text.
  legal: {
    brokerOfRecord: "Si Zhang",
    brokerLicense: "NY Licensed Real Estate Broker", // CONFIRM: add license #
    statesLicensed: ["New York"],
    // New York requires a Fair Housing Notice + Standard Operating Procedures.
    iabsNote: "NY Fair Housing Notice · Standard Operating Procedures",
  },
  social: {
    instagram: "https://www.instagram.com/homix.realty",
    xiaohongshu:
      "https://www.xiaohongshu.com/user/profile/653db5b50000000030031376",
    douyin: "https://v.douyin.com/3ye-M8fQ41U/",
  },
} as const;

/** Nav items reference i18n keys (see common.* in i18n.ts) for their labels. */
export interface NavItem {
  key: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { key: "listings", href: "/listings" },
  { key: "advisors", href: "/agents" },
  { key: "journal", href: "/journal" },
  { key: "join", href: "/join" },
  { key: "about", href: "/about" },
];

export const footerNav: { headingKey: string; links: NavItem[] }[] = [
  {
    headingKey: "explore",
    links: [
      { key: "listings", href: "/listings" },
      { key: "neighborhoods", href: "/neighborhoods" },
      { key: "advisors", href: "/agents" },
      { key: "journal", href: "/journal" },
    ],
  },
  {
    headingKey: "firm",
    links: [
      { key: "about", href: "/about" },
      { key: "join", href: "/join" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    headingKey: "legal",
    links: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
      { key: "accessibility", href: "/accessibility" },
      { key: "fairHousing", href: "/fair-housing" },
    ],
  },
];

/** Hrefs for the three business-line pillars (copy lives in i18n.ts). */
export const pillarLinks = ["/listings", "/join", "/contact"];

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  photo: string;
}

/**
 * PLACEHOLDER testimonials — written as samples. Replace with REAL, attributable
 * client quotes (with consent) before launch; anonymous/invented testimonials
 * are a compliance risk.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Their video tour hit tens of thousands of views in days, and we had multiple offers the first weekend. The exposure was unlike any agent we'd worked with.",
    name: "The Chen Family",
    detail: "Sold in Flushing",
    photo:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=320&q=80",
  },
  {
    quote:
      "As first-time buyers from out of state, we needed patience and honesty in both languages. Homix gave us exactly that, start to finish.",
    name: "Daniel & Mei",
    detail: "Bought in Long Island City",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=320&q=80",
  },
];

export interface SocialChannel {
  platform: string;
  handle: string;
  stat: string;
  href: string;
}

/**
 * "Our reach" — honest, verifiable content-platform presence in place of a
 * (currently unsupportable) press logo wall. This is the real "headlines" asset.
 */
export const socialReach: SocialChannel[] = [
  {
    platform: "抖音 · Douyin",
    handle: "Sunny房产观察",
    stat: "NY real estate, daily",
    href: siteConfig.social.douyin,
  },
  {
    platform: "小红书 · RED",
    handle: "SunnyNYC 地产观察",
    stat: "Home guides & tours",
    href: siteConfig.social.xiaohongshu,
  },
  {
    platform: "Instagram",
    handle: "@homix.realty",
    stat: "Reels & home tours",
    href: siteConfig.social.instagram,
  },
];

export interface NeighborhoodTeaser {
  name: string;
  slug: string;
  blurb: string;
  image: string;
}

export const neighborhoods: NeighborhoodTeaser[] = [
  {
    name: "Flushing",
    slug: "flushing",
    blurb: "Downtown energy, transit, and new-construction condos in the heart of Queens.",
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Long Island City",
    slug: "long-island-city",
    blurb: "Waterfront towers and skyline views, minutes from Midtown.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Great Neck",
    slug: "great-neck",
    blurb: "Top-rated schools and gracious homes on Long Island's North Shore.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
  },
];

/** Hero art direction — replace with owned photography for launch. */
export const heroImage = {
  src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
  alt: "A bright, contemporary New York home at dusk",
};
