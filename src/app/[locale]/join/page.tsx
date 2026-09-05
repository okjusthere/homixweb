import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { portalJoinUrl, siteConfig } from "@/lib/site";
import { SITE_MEDIA_ROOT } from "@/lib/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/join",
    locale,
    title: {
      en: "Careers — Join a Media-First New York Brokerage",
      zh: "纽约地产经纪人招聘——加入媒体驱动的 Homix",
    },
    description: {
      en: "Join a New York brokerage with an in-house studio, distribution through affiliated accounts with 1M+ combined followers, AI tools, leads, and bilingual mentorship from day one.",
      zh: "加入 Homix：从第一天起使用自有内容工作室、合计 100 万+ 粉丝的关联账号分发渠道、AI 工具、客源与中英双语导师支持。",
    },
    image: HERO,
  });
}

const HERO = `${SITE_MEDIA_ROOT}/join/hero.jpg`;
const TRAINING_PHOTOS = `${SITE_MEDIA_ROOT}/training`;

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const applyUrl = portalJoinUrl(locale);
  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow>{t.join.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-[3.25rem]">
              {t.join.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted">{t.join.lead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={applyUrl} sameTab>
                {t.join.heroCta}
                <span aria-hidden>→</span>
              </Button>
              <Button href="/commission-plan" variant="outline">
                {t.join.commissionPlanCta}
              </Button>
              <Button href="#questions" variant="ghost">
                {t.join.consultationCta}
                <span aria-hidden>↓</span>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/40">
            <Image
              src={HERO}
              alt="A Homix advisor at work"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Stats band */}
      <section className="border-y border-line bg-surface py-14 text-ink sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
            {t.join.stats.map((s, i) => (
              <Reveal key={s.value + i} delay={i * 60}>
                <p className="font-serif text-2xl leading-tight text-ink sm:text-[1.9rem]">
                  {s.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{t.join.benefitsEyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            {t.join.benefitsTitle}
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.join.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 60} className="bg-surface">
              <div className="h-full p-8">
                <p className="font-serif text-2xl text-bronze/60">{n2(i)}</p>
                <p className="mt-3 font-serif text-xl leading-snug text-ink">{b.title}</p>
                <p className="mt-3 text-base leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Training spotlight */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow>{t.join.trainingEyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
                {t.join.trainingTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t.join.trainingLead}</p>
              <ul className="mt-8 space-y-4">
                {t.join.trainingFeatures.map((f) => (
                  <li key={f} className="flex gap-3 border-l border-bronze/50 pl-4">
                    <span className="text-base leading-relaxed text-ink">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button href="/training" variant="outline">
                  {t.join.trainingCta}
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Reveal className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={`${TRAINING_PHOTOS}/live-workshop.jpg`}
                  alt="Homix agents in a live training workshop"
                  fill
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="object-cover"
                />
              </Reveal>
              <Reveal delay={80} className="relative mt-8 aspect-[3/4] overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={`${TRAINING_PHOTOS}/roundtable-window-session.jpg`}
                  alt="Homix agents in a roundtable training session"
                  fill
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* How to join */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.join.stepsEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {t.join.stepsTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.join.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="border-t border-line pt-5">
                  <p className="font-serif text-3xl text-bronze">{n2(i)}</p>
                  <p className="mt-3 font-serif text-lg leading-snug text-ink">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we're looking for */}
      <Container className="py-20 sm:py-28">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <Eyebrow>{t.join.whoEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.join.whoTitle}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink/85">{t.join.whoBody}</p>
        </div>
      </Container>

      {/* FAQ */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.join.faqEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {t.join.faqTitle}
            </h2>
          </div>
          <div className="mt-12 border-t border-line">
            {t.join.faq.map((f) => (
              <div
                key={f.q}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-[0.9fr_1.1fr] md:gap-10"
              >
                <p className="font-serif text-lg leading-snug text-ink">{f.q}</p>
                <p className="text-base leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pre-application questions */}
      <section id="questions" className="scroll-mt-24 bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <Eyebrow className="text-paper/70">{t.join.ctaEyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
                {t.join.ctaTitle}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">
                {t.join.ctaLead}
              </p>
              <p className="mt-8 text-paper/80">
                {t.join.orReach}{" "}
                <a className="text-paper hover:text-bronze" href={siteConfig.contact.phoneHref}>
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
            <div className="rounded-sm bg-surface p-7 sm:p-9">
              <InquiryForm labels={t.inquiry} source="join-consultation" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
