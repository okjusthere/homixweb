import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProfileNav } from "@/components/agents/ProfileNav";
import { getAgentBySlug, getAgents } from "@/lib/agents";
import { getT } from "@/lib/i18n";
import { heroImage, siteConfig, socialReach } from "@/lib/site";

const PLACEHOLDER = "/agent-placeholder-logo.png";

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return { title: "Advisor not found" };
  return {
    title: `${agent.name} · ${agent.title}`,
    description:
      agent.bio?.slice(0, 155) ||
      `${agent.name}, ${agent.title} at Homix — bilingual New York real estate.`,
  };
}

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  xiaohongshu: "小红书 · RED",
  douyin: "抖音 · Douyin",
  linkedin: "LinkedIn",
  website: "Website",
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

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const { locale, t } = await getT();
  const zh = locale === "zh";
  const first = agent.name.trim().split(/\s+/)[0] || agent.name;

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
        reachLead: "每位 Homix 顾问背后，是一台全网千万级流量的内容机器。",
        followers: "全网粉丝",
        contentDaily: "每日内容产出",
        bilingual: "双语服务",
        workCard: "浏览 Homix 在售房源",
        workSub: "从法拉盛到长岛与曼哈顿，探索我们代理的房源。",
        browse: "查看房源 →",
        featured: "由 Homix 出品",
        follow: "关注 →",
        contactLead: `想买房、卖房，或了解 Homix 的招募与媒体合作？${first}随时为你服务。`,
        contactCta: `联系${first}`,
      }
    : {
        back: t.agentsPage.title,
        about: "About",
        work: "Recent work",
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
        workCard: "Browse homes Homix represents",
        workSub:
          "From Flushing to Long Island and Manhattan, explore the listings we represent.",
        browse: "View listings →",
        featured: "Featured on Homix",
        follow: "Follow →",
        contactLead: `Buying, selling, or exploring Homix's incubator and media partnerships? ${first} is here to help.`,
        contactCta: `Contact ${first}`,
      };

  const isPlaceholder = !agent.photo || agent.photo === PLACEHOLDER;
  const phoneDigits = agent.phone.replace(/[^\d+]/g, "");
  const bioLead = agent.bio ? agent.bio.split("\n")[0].slice(0, 180) : "";
  const fallbackBio = zh
    ? `${agent.name} 是 Homix 的纽约持牌地产专业人士，服务大纽约地区的买家与卖家，以双语沟通与媒体驱动的服务著称。`
    : `${agent.name} is a licensed New York real estate professional with Homix, serving buyers and sellers across the greater New York market with bilingual, media-driven service.`;

  const socialList = Object.entries(agent.social ?? {}).filter(([, v]) => v) as [
    string,
    string,
  ][];
  const hasOwnChannels = socialList.length > 0;
  const channels = hasOwnChannels
    ? socialList.map(([platform, url]) => ({
        label: PLATFORM_LABEL[platform] ?? platform,
        sub: L.follow,
        href: url,
      }))
    : socialReach.map((c) => ({ label: c.platform, sub: c.handle, href: c.href }));

  const tabs = [
    { id: "about", label: L.about },
    { id: "work", label: L.work },
    { id: "headlines", label: L.headlines },
    { id: "contact", label: L.contact },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: agent.name,
    jobTitle: agent.title,
    image: isPlaceholder ? undefined : agent.photo,
    telephone: agent.phone || undefined,
    email: agent.email || undefined,
    knowsLanguage: ["en", "zh"],
    sameAs: socialList.map(([, url]) => url),
    worksFor: { "@type": "Organization", name: siteConfig.legalName },
  };

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
                {["English", "中文"].map((lng) => (
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

        {/* Recent work — single intentional CTA, never an empty grid */}
        <section id="work" className="scroll-mt-32 py-14">
          <Reveal>
            <Eyebrow>{L.work}</Eyebrow>
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
        </section>

        {/* In the Headlines — agent's channels, or brand channels as fallback */}
        <section id="headlines" className="scroll-mt-32 py-14">
          <Reveal>
            <Eyebrow>{hasOwnChannels ? L.headlines : L.featured}</Eyebrow>
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

        {/* Contact */}
        <section id="contact" className="scroll-mt-32 border-t border-line py-14">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>{L.contactCta}</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ink/85">{L.contactLead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                {agent.email && <Button href={`mailto:${agent.email}`}>{L.email}</Button>}
                {agent.phone && (
                  <Button href={`tel:${phoneDigits}`} variant="outline">
                    {L.call} {agent.phone}
                  </Button>
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
                      {PLATFORM_LABEL[platform] ?? platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
