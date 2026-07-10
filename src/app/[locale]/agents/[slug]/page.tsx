import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CareerSection } from "@/components/agents/CareerSection";
import { ProfileNav } from "@/components/agents/ProfileNav";
import { SaveContactButton } from "@/components/agents/SaveContactButton";
import { ListingCard } from "@/components/listings/ListingCard";
import { getAgentBySlug, getAgents } from "@/lib/agents";
import { listings } from "@/lib/listings";
import type { Agent } from "@/lib/listings/types";
import { getRouteLocale, getT } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import {
  absUrl,
  breadcrumbLd,
  jsonLd as serializeJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { heroImage, siteConfig } from "@/lib/site";

const PLACEHOLDER = "/agent-placeholder-logo.png";

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map((a) => ({ slug: a.slug }));
}

/** First complete sentence of a bio — only if it fits a meta description. */
function bioSentence(bio: string): string | null {
  const clean = bio.replace(/\s+/g, " ").trim();
  const sentence = clean.match(/^[^.。]+[.。]/)?.[0].trim() ?? null;
  return sentence && sentence.length <= 160 ? sentence : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return { title: "Advisor not found" };
  const locale = await getRouteLocale(params);
  const sentence = agent.bio ? bioSentence(agent.bio) : null;
  return pageMetadata({
    path: `/agents/${slug}`,
    locale,
    title: {
      en: `${agent.name} — ${agent.title}`,
      zh: `${agent.name}——纽约持牌房产经纪人`,
    },
    description: sentence ?? {
      en: `${agent.name} is a bilingual real-estate advisor at Homix serving New York buyers and sellers.`,
      zh: `${agent.name}，Homix 纽约持牌房产经纪人，提供中英双语买房卖房服务。`,
    },
    ogType: "profile",
    // The placeholder logo makes a poor share card; inherit the branded one.
    image: agent.photo && agent.photo !== PLACEHOLDER ? agent.photo : null,
  });
}

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  xiaohongshu: "小红书 · RED",
  douyin: "抖音 · Douyin",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  website: "Website",
};

const REVIEW_LABEL: Record<string, string> = {
  zillow: "Zillow",
  google: "Google",
};

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const ascii = /^[\x00-\x7F]+$/.test(name);
  if (ascii) {
    const a = words[0]?.[0] ?? "";
    const b = words.length > 1 ? words[words.length - 1][0] : "";
    return (a + b).toUpperCase();
  }
  return name.slice(0, 2);
}

/** True only for http(s) URLs — blocks javascript:/data: hrefs from stored data. */
function isHttpUrl(url: string | undefined): boolean {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

/**
 * Escape a text value per RFC 6350 so a stored field can't break out of its
 * line. Crucially collapses ALL line breaks (\r\n, lone \r, lone \n) so a
 * CRLF-carrying value can't inject extra vCard properties into the .vcf.
 */
function vcardEscape(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/([;,])/g, "\\$1")
    .replace(/\r\n|\r|\n/g, "\\n");
}

/** Build a downloadable vCard (3.0) from an agent's public contact details. */
function buildVCard(agent: Agent, org: string, url: string): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${vcardEscape(agent.name)}`,
    `N:;${vcardEscape(agent.name)};;;`,
    `ORG:${vcardEscape(org)}`,
    agent.title ? `TITLE:${vcardEscape(agent.title)}` : "",
    agent.phone ? `TEL;TYPE=CELL:${agent.phone.replace(/[^\d+]/g, "")}` : "",
    agent.email ? `EMAIL;TYPE=INTERNET:${vcardEscape(agent.email)}` : "",
    url ? `URL:${url}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const zh = locale === "zh";
  // Names are stored as "Legal Name (Preferred)" — greet with the preferred
  // name when present ("Zhijun Zhang (Zoey)" → "Zoey"), else the first name.
  const first =
    agent.name.match(/\(([^)]+)\)\s*$/)?.[1].trim() ||
    agent.name.trim().split(/\s+/)[0] ||
    agent.name;

  // Company-level featured listings (BBO is office-wide, not per-agent), plus
  // this advisor's MLS-verified career history when an admin has mapped their
  // mls_id. Both degrade gracefully: featured falls back to a CTA, career to
  // no section at all.
  const wantsCareer = agent.showPastDeals !== false;
  const [featured, career] = await Promise.all([
    listings.getFeaturedListings(3),
    wantsCareer && agent.mlsId ? (listings.getAgentCareer?.(agent.mlsId) ?? null) : null,
  ]);
  const hasCareer = Boolean(career && career.stats.total > 0 && career.deals.length > 0);

  const L = zh
    ? {
        back: "返回顾问团队",
        about: "关于",
        work: "精选房源",
        headlines: "媒体报道",
        contact: "联系",
        advisor: "合美顾问",
        languages: "语言",
        license: "牌照号 ",
        workWith: `与${first}合作`,
        call: "致电",
        email: "邮件",
        reachEyebrow: "Homix 媒体引擎",
        reachLead: "每位 Homix 顾问背后，是一台全网百万级流量的内容机器。",
        followers: "全网粉丝",
        contentDaily: "每日内容产出",
        bilingual: "双语服务",
        workLead: "Homix 代理的精选在售房源，点击查看详情。",
        workCard: "浏览 Homix 在售房源",
        workSub: "从法拉盛到长岛与曼哈顿，探索我们代理的房源。",
        browse: "查看房源 →",
        follow: "关注 →",
        contactLead: `想买房、卖房，或了解 Homix 的招募与媒体合作？${first}随时为你服务。`,
        contactCta: `联系${first}`,
      }
    : {
        back: t.agentsPage.title,
        about: "About",
        work: "Listings",
        headlines: "In the Headlines",
        contact: "Contact",
        advisor: "Homix Advisor",
        languages: "Languages",
        license: "License # ",
        workWith: `Work with ${first}`,
        call: "Call",
        email: "Email",
        reachEyebrow: "The Homix media engine",
        reachLead:
          "Behind every Homix advisor is a content machine with a seven-figure audience.",
        followers: "Audience",
        contentDaily: "Content, daily",
        bilingual: "Bilingual service",
        workLead: "A selection of homes Homix currently represents — tap to view.",
        workCard: "Browse homes Homix represents",
        workSub:
          "From Flushing to Long Island and Manhattan, explore the listings we represent.",
        browse: "View listings →",
        follow: "Follow →",
        contactLead: `Buying, selling, or exploring Homix's incubator and media partnerships? ${first} is here to help.`,
        contactCta: `Contact ${first}`,
      };

  // Second label block — the profile-card additions (track record, reviews,
  // testimonials, WeChat, save-contact).
  const M = zh
    ? {
        trackEyebrow: "业绩与资历",
        statYears: "从业年数",
        statTransactions: "成交套数",
        statVolume: "成交额",
        statAreas: "服务区域",
        reviewsEyebrow: "客户评价",
        reviewsLead: "真实评价在第三方平台，点击查看最新内容。",
        reviewsRead: "查看评价 →",
        reviewsCount: (n: string) => `${n} 条评价`,
        testimonialsEyebrow: "客户怎么说",
        wechatEyebrow: "微信",
        wechatScan: `扫码添加${first}的微信`,
        saveContact: "存入通讯录",
      }
    : {
        trackEyebrow: "Track record",
        statYears: "Years in business",
        statTransactions: "Homes closed",
        statVolume: "Sales volume",
        statAreas: "Areas served",
        reviewsEyebrow: "Reviews",
        reviewsLead: "Real reviews live on third-party platforms — tap to see the latest.",
        reviewsRead: "Read reviews →",
        reviewsCount: (n: string) => `${n} reviews`,
        testimonialsEyebrow: "What clients say",
        wechatEyebrow: "WeChat",
        wechatScan: `Scan to add ${first} on WeChat`,
        saveContact: "Save contact",
      };

  const languages = agent.languages?.length ? agent.languages : ["English", "中文"];

  // Only surface reviews whose link is a real http(s) URL — this blocks a
  // javascript:/data: href from an agent-entered field reaching an anchor.
  const reviewList = Object.entries(agent.reviews ?? {}).filter(
    (entry): entry is [string, { url: string; rating?: string; count?: string }] =>
      isHttpUrl(entry[1]?.url),
  );

  const stats = agent.stats ?? {};
  // Numeric-style figures render in a stat grid; "areas served" is free text and
  // renders on its own line so a long location list never crowds a number cell.
  const figureStats = (
    [
      [stats.years, M.statYears],
      [stats.transactions, M.statTransactions],
      [stats.volume, M.statVolume],
    ] as [string | undefined, string][]
  )
    .filter(([v]) => v)
    .map(([v, label]) => ({ value: v as string, label }));
  const hasTrackRecord = figureStats.length > 0 || Boolean(stats.areas);
  // Always-filled grid: 1 → full width, 2 → halves, 3 → stacked on mobile, row on desktop.
  const statCols =
    figureStats.length === 1
      ? "grid-cols-1"
      : figureStats.length === 2
        ? "grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

  const testimonials = agent.testimonials ?? [];

  const vcard = buildVCard(
    agent,
    siteConfig.legalName,
    absUrl(localizePath(locale, `/agents/${agent.slug}`)),
  );

  const isPlaceholder = !agent.photo || agent.photo === PLACEHOLDER;
  const phoneDigits = agent.phone.replace(/[^\d+]/g, "");
  const bioLead = agent.bio ? agent.bio.split("\n")[0].slice(0, 180) : "";
  const fallbackBio = zh
    ? `${agent.name} 是 Homix 的纽约持牌地产专业人士，服务大纽约地区的买家与卖家，以双语沟通与媒体驱动的服务著称。`
    : `${agent.name} is a licensed New York real estate professional with Homix, serving buyers and sellers across the greater New York market with bilingual, media-driven service.`;

  // Personal channels, http(s) only (same anti-javascript:-href guard as reviews).
  const socialList = (Object.entries(agent.social ?? {}) as [string, string][]).filter(
    ([, v]) => isHttpUrl(v),
  );
  const hasOwnChannels = socialList.length > 0;
  // "Website" is the only common-noun platform label; localize it so a zh page
  // never shows a bare English word. Brand names stay as-is.
  const channelLabel = (platform: string) =>
    platform === "website"
      ? zh
        ? "个人网站"
        : "Website"
      : PLATFORM_LABEL[platform] ?? platform;
  // Personal channels only — never fall back to company accounts on an
  // individual's page (that made unset advisors look like they ran the brand's
  // Douyin/RED/IG). If the advisor hasn't linked their own, hide the section.
  const channels = socialList.map(([platform, url]) => ({
    label: channelLabel(platform),
    sub: L.follow,
    href: url,
  }));

  // The Headlines tab is only meaningful when the advisor has their own channels;
  // otherwise its section doesn't render and the tab would be a dead anchor.
  const tabs = [
    { id: "about", label: L.about },
    ...(hasCareer ? [{ id: "sales", label: zh ? "历史成交" : "Past sales" }] : []),
    { id: "work", label: L.work },
    ...(hasOwnChannels ? [{ id: "headlines", label: L.headlines }] : []),
    { id: "contact", label: L.contact },
  ];

  const profileUrl = absUrl(localizePath(locale, `/agents/${agent.slug}`));
  const entityUrl = absUrl(`/agents/${agent.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${entityUrl}#agent`,
    name: agent.name,
    url: profileUrl,
    jobTitle: agent.title,
    image: isPlaceholder ? undefined : absUrl(agent.photo),
    telephone: agent.phone || undefined,
    email: agent.email || undefined,
    knowsLanguage: languages,
    // sameAs points at the advisor's live third-party profiles (socials + review
    // sites) — the honest, verifiable signal. We deliberately do NOT emit
    // aggregateRating or review[]: self-attested star ratings and self-curated
    // testimonials on the brokerage's own LocalBusiness page are self-serving
    // review markup that Google disallows (and would risk a manual action). The
    // on-page reviews block links out to the live source for the real numbers.
    sameAs: [...socialList.map(([, url]) => url), ...reviewList.map(([, r]) => r.url)],
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };

  const breadcrumbJsonLd = breadcrumbLd([
    { name: zh ? "顾问团队" : "Advisors", path: "/agents" },
    { name: agent.name, path: `/agents/${agent.slug}` },
  ], locale);

  return (
    <>
      <Container className="pt-12 sm:pt-16">
        <Link
          href="/agents"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {L.back}
        </Link>

        {/* Hero */}
        <div className="mt-8 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            {isPlaceholder ? (
              <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-sm border border-line bg-surface">
                <span className="font-serif text-7xl leading-none text-bronze">
                  {initialsOf(agent.name)}
                </span>
                <span className="eyebrow mt-5">{L.advisor}</span>
              </div>
            ) : (
              <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-line/50">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
            )}
          </div>

          <div>
            <Eyebrow>{agent.title}</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {agent.name}
            </h1>

            {/* Languages + specialties */}
            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-1">{L.languages}</span>
                {languages.map((lng) => (
                  <span
                    key={lng}
                    className="rounded-sm border border-line px-3 py-1 text-xs text-muted"
                  >
                    {lng}
                  </span>
                ))}
              </div>
              {agent.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-sm bg-surface px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {bioLead && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">
                {bioLead}
                {agent.bio && agent.bio.length > 180 ? "…" : ""}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href="#contact">{L.workWith}</Button>
              {agent.phone && (
                <Button href={`tel:${phoneDigits}`} variant="ghost">
                  {L.call} {agent.phone}
                </Button>
              )}
              {agent.email && (
                <Button href={`mailto:${agent.email}`} variant="ghost">
                  {L.email}
                </Button>
              )}
            </div>

            {agent.licenseNumber && (
              <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                {L.license}
                {agent.licenseNumber}
              </p>
            )}
          </div>
        </div>
      </Container>

      {/* In-page anchor nav + sections share one scroll parent so the nav
          stays sticky through the whole article. */}
      <Container className="mt-12 pb-20">
        <ProfileNav tabs={tabs} />

        {/* About */}
        <section id="about" className="scroll-mt-32 border-t border-transparent py-14">
          <Reveal>
            <Eyebrow>{L.about}</Eyebrow>
            <p className="mt-6 max-w-[60ch] whitespace-pre-line text-lg leading-relaxed text-ink/85">
              {agent.bio || fallbackBio}
            </p>
          </Reveal>
        </section>

        {/* Track record — the advisor's own, agent-entered figures */}
        {hasTrackRecord && (
          <Reveal>
            <section className="pb-14">
              <Eyebrow>{M.trackEyebrow}</Eyebrow>
              {figureStats.length > 0 && (
                <div
                  className={`mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line ${statCols}`}
                >
                  {figureStats.map((s) => (
                    <div key={s.label} className="bg-surface px-6 py-6 sm:px-8">
                      <p className="font-serif text-3xl text-ink sm:text-4xl">{s.value}</p>
                      <p className="eyebrow mt-2">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {stats.areas && (
                <p className="mt-4 text-sm text-muted">
                  <span className="eyebrow mr-2">{M.statAreas}</span>
                  {stats.areas}
                </p>
              )}
            </section>
          </Reveal>
        )}

        {/* Past sales — MLS-verified career history (OneKey Closed feed via
            BBO). Complements the self-reported figures above: this block only
            counts OneKey-recorded deals, so the two can legitimately differ. */}
        {hasCareer && career && (
          <CareerSection career={career} zh={zh} firstName={first} />
        )}

        {/* Reviews — links stay live; rating/count are agent-attested */}
        {reviewList.length > 0 && (
          <Reveal>
            <section className="pb-14">
              <Eyebrow>{M.reviewsEyebrow}</Eyebrow>
              <p className="mt-3 max-w-2xl text-sm text-muted">{M.reviewsLead}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {reviewList.map(([site, r]) => (
                  <a
                    key={site}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-sm border border-line bg-surface p-6 transition-colors hover:border-bronze/60"
                  >
                    <div>
                      <p className="eyebrow">{REVIEW_LABEL[site] ?? site}</p>
                      {r.rating ? (
                        <p className="mt-2 flex items-baseline gap-2">
                          <span className="font-serif text-3xl text-ink">{r.rating}</span>
                          <span className="text-bronze" aria-hidden>
                            ★
                          </span>
                          {r.count && (
                            <span className="text-sm text-muted">{M.reviewsCount(r.count)}</span>
                          )}
                        </p>
                      ) : (
                        <p className="mt-2 font-serif text-xl text-ink">
                          {REVIEW_LABEL[site] ?? site}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-medium text-bronze underline-offset-4 group-hover:underline">
                      {M.reviewsRead}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Testimonials — real client words the advisor is cleared to share */}
        {testimonials.length > 0 && (
          <Reveal>
            <section className="pb-14">
              <Eyebrow>{M.testimonialsEyebrow}</Eyebrow>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {testimonials.map((t, i) => (
                  <figure
                    key={i}
                    className="rounded-sm border border-line bg-surface p-7"
                  >
                    <blockquote className="font-serif text-lg leading-relaxed text-ink/90">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    {t.author && (
                      <figcaption className="mt-4 eyebrow">— {t.author}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Credibility strip — the Homix media engine (always present) */}
        <Reveal>
          <section className="overflow-hidden rounded-sm border border-line bg-surface">
            <div className="px-7 pt-8 sm:px-10">
              <Eyebrow>{L.reachEyebrow}</Eyebrow>
              <p className="mt-3 max-w-2xl font-serif text-xl leading-snug text-ink sm:text-2xl">
                {L.reachLead}
              </p>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              {[
                { figure: "1,000,000+", label: L.followers },
                { figure: zh ? "每日" : "Daily", label: L.contentDaily },
                { figure: "EN · 中文", label: L.bilingual },
              ].map((s) => (
                <div key={s.label} className="bg-surface px-7 py-7 sm:px-10">
                  <p className="font-serif text-3xl text-ink sm:text-4xl">{s.figure}</p>
                  <p className="eyebrow mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Listings — a live selection of homes Homix represents (office-wide,
            so honestly framed as the company's, not this advisor's own sales).
            Real cards render directly; a CTA covers the BBO-empty case. */}
        <section id="work" className="scroll-mt-32 py-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>{L.work}</Eyebrow>
                <p className="mt-3 max-w-xl text-ink/80">{L.workLead}</p>
              </div>
              {featured.length > 0 && (
                <Button href="/listings" variant="ghost" className="hidden sm:inline-flex">
                  {t.featured.viewAll} →
                </Button>
              )}
            </div>
          </Reveal>

          {featured.length > 0 ? (
            <>
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((listing, i) => (
                  <Reveal key={listing.id} delay={i * 70}>
                    <ListingCard listing={listing} />
                  </Reveal>
                ))}
              </div>
              <div className="mt-10 sm:hidden">
                <Button href="/listings" variant="outline" className="w-full">
                  {t.featured.viewAll}
                </Button>
              </div>
            </>
          ) : (
            <Reveal>
              <Link
                href="/listings"
                className="group mt-6 block overflow-hidden rounded-sm border border-line"
              >
                <div className="relative aspect-[16/7] bg-line/50">
                  <Image
                    src={heroImage.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-7 sm:p-9">
                    <p className="font-serif text-2xl text-paper sm:text-3xl">{L.workCard}</p>
                    <p className="mt-2 text-sm text-paper/85">{L.workSub}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-paper underline-offset-4 group-hover:underline">
                      {L.browse}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}
        </section>

        {/* In the Headlines — the advisor's OWN channels only (no brand fallback) */}
        {hasOwnChannels && (
          <section id="headlines" className="scroll-mt-32 py-14">
            <Reveal>
              <Eyebrow>{L.headlines}</Eyebrow>
              <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
                {channels.map((c, i) => (
                  <a
                    key={`${c.label}-${i}`}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-surface p-7 transition-colors hover:bg-paper sm:p-8"
                  >
                    <p className="eyebrow">{c.label}</p>
                    <p className="mt-3 font-serif text-xl text-ink transition-colors group-hover:text-bronze">
                      {c.sub}
                    </p>
                  </a>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="scroll-mt-32 border-t border-line py-14">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1.5fr_0.5fr] md:items-start">
              <div>
                <Eyebrow>{L.contactCta}</Eyebrow>
                <p className="mt-5 text-lg leading-relaxed text-ink/85">{L.contactLead}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  {agent.email && <Button href={`mailto:${agent.email}`}>{L.email}</Button>}
                  {agent.phone && (
                    <Button href={`tel:${phoneDigits}`} variant="outline">
                      {L.call} {agent.phone}
                    </Button>
                  )}
                  {(agent.phone || agent.email) && (
                    <SaveContactButton
                      vcard={vcard}
                      filename={`${agent.slug}.vcf`}
                      label={M.saveContact}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-ink/80 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:border-bronze hover:text-bronze"
                    />
                  )}
                </div>
                {socialList.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-sm">
                    {socialList.map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline-offset-4 hover:text-bronze hover:underline"
                      >
                        {channelLabel(platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {agent.wechatQr && (
                <div className="rounded-sm border border-line bg-surface p-6 text-center">
                  <p className="eyebrow">{M.wechatEyebrow}</p>
                  <div className="relative mx-auto mt-4 aspect-square w-44 max-w-full overflow-hidden rounded-sm bg-paper">
                    <Image
                      src={agent.wechatQr}
                      alt={zh ? `${agent.name} 微信二维码` : `${agent.name} WeChat QR`}
                      fill
                      sizes="176px"
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted">{M.wechatScan}</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
    </>
  );
}
