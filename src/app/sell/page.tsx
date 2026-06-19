import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Sell with Homix — your home launches as content to a 1,000,000+ bilingual audience, reaching qualified buyers other brokerages can't. Broader demand, a faster sale, more money.",
};

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function SellPage() {
  const { t } = await getT();
  const { phone, phoneHref } = siteConfig.contact;

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{t.sell.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {t.sell.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{t.sell.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="#valuation">{t.sell.heroCta}</Button>
            <a
              href={phoneHref}
              className="text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-bronze hover:underline"
            >
              {t.sell.orCall} {phone}
            </a>
          </div>
        </div>
      </Container>

      {/* Proof band */}
      <section className="bg-pine py-16 text-paper sm:py-20">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-paper/55">
            {t.sell.proof.eyebrow}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {t.sell.proof.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <p className="font-serif text-2xl leading-tight text-paper sm:text-[2rem]">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-paper/60">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Advantages */}
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{t.sell.advantagesEyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            {t.sell.advantagesTitle}
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {t.sell.advantages.map((a, i) => (
            <Reveal key={a.headline} delay={(i % 2) * 60} className="bg-surface">
              <div className="h-full p-8 sm:p-10">
                <p className="font-serif text-2xl text-bronze/60">{n2(i)}</p>
                <p className="mt-3 font-serif text-xl leading-snug text-ink">
                  {a.headline}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* How it works */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.sell.howEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {t.sell.howTitle}
            </h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.sell.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="border-t border-line pt-5">
                  <p className="font-serif text-3xl text-bronze">{n2(i)}</p>
                  <p className="mt-3 font-serif text-lg text-ink">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Valuation + inquiry form */}
      <section id="valuation" className="scroll-mt-24 bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-bronze">
                {t.sell.valuationEyebrow}
              </p>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
                {t.sell.valuationTitle}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">
                {t.sell.valuationLead}
              </p>
              <ul className="mt-7 space-y-2.5">
                {t.sell.valuationAssurances.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-paper/80">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 12.5l4.5 4.5L19 7"
                        stroke="var(--color-bronze)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-paper/80">
                {t.sell.orCall}{" "}
                <a className="text-paper hover:text-bronze" href={phoneHref}>
                  {phone}
                </a>
              </p>
            </div>
            <div className="rounded-sm bg-surface p-7 sm:p-9">
              <InquiryForm labels={t.inquiry} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
