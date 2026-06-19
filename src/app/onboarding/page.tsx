import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Agent Onboarding",
  description:
    "What onboarding at Homix involves — your first 90 days mapped out across six phases: paperwork, NY licensing & compliance, systems, your media kit, training, and your first deal.",
};

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="var(--color-bronze)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function OnboardingPage() {
  const { t } = await getT();
  const o = t.onboarding;

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {o.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{o.lead}</p>
        </div>
      </Container>

      {/* Phases */}
      <Container className="pb-20">
        <div className="border-t border-line">
          {o.phases.map((p, i) => (
            <Reveal key={p.title}>
              <div className="grid gap-5 border-b border-line py-10 md:grid-cols-[0.42fr_1.58fr] md:gap-12">
                <div>
                  <p className="font-serif text-4xl text-bronze">{n2(i)}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-snug text-ink">
                    {p.title}
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                  <ul className="mt-5 space-y-3">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[15px] leading-relaxed text-ink/85"
                      >
                        <Check />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Closing */}
      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
              {o.closingTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/75">
              {o.closingBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/join"
                className="inline-flex items-center rounded-sm bg-bronze px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-bronze-dark"
              >
                {t.join.heroCta}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-sm border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
              >
                {t.common.contact}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
