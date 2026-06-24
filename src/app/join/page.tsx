import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join Homix — Careers for Agents",
  description:
    "Join the New York brokerage that hands you an audience. A 1M+ media engine, an in-house studio, real leads, AI tools, and bilingual mentorship — Homix turns agents into local stars.",
};

const HERO = "/join/hero.jpg";

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function JoinPage() {
  const { t } = await getT();
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
              <Button href="#apply">{t.join.heroCta}</Button>
              <Button href="/agents" variant="outline">
                {t.join.whoEyebrow}
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

      {/* Apply */}
      <section id="apply" className="scroll-mt-24 bg-ink py-20 text-paper sm:py-28">
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
              <InquiryForm labels={t.inquiry} source="join" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
