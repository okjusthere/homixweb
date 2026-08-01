import type { Metadata } from "next";
import Image from "next/image";
import { SellerValuationForm } from "@/components/forms/SellerValuationForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { heroImage, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/sell",
    locale,
    title: {
      en: "Sell Your New York Home | Free Home Valuation",
      zh: "纽约卖房与免费房屋估值 | Homix",
    },
    description: {
      en: "Request a complimentary, advisor-prepared home valuation and sell with Homix across Queens, Long Island, and Manhattan.",
      zh: "申请由 Homix 持牌顾问准备的免费房屋估值，获得面向皇后区、长岛与曼哈顿市场的定价和卖房建议。",
    },
  });
}

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const { phone, phoneHref } = siteConfig.contact;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[68svh] overflow-hidden bg-ink text-paper">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        <Container className="relative flex min-h-[68svh] items-end py-14 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight text-paper sm:text-[3.75rem]">
              {t.sell.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80 sm:text-xl">
              {t.sell.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href="#valuation" onDark>
                {t.sell.heroCta}
              </Button>
              <Button href={phoneHref} variant="ghost" onDark>
                {t.sell.orCall} {phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof band */}
      <section className="border-b border-line bg-surface py-14 text-ink sm:py-20">
        <Container>
          <Eyebrow>{t.sell.proof.eyebrow}</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {t.sell.proof.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <p className="font-serif text-2xl leading-tight text-ink sm:text-[2rem]">
                  {s.value}
                </p>
                <Eyebrow className="mt-2">{s.label}</Eyebrow>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Valuation + seller intake */}
      <section id="valuation" className="scroll-mt-24 bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow className="text-paper/70">{t.sell.valuationEyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-xl font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.8rem]">
                {t.sell.valuationTitle}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
                {t.sell.valuationLead}
              </p>

              <div className="mt-10">
                {t.sell.valuationDeliverables.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 60}
                    className="border-t border-paper/20 py-5"
                  >
                    <div className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-serif text-lg text-bronze">{n2(i)}</span>
                      <div>
                        <h3 className="font-serif text-lg text-paper">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-paper/65">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-paper/70">
                {t.sell.valuationAssurances.map((item) => (
                  <span key={item} className="border-l border-bronze pl-3">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-7 max-w-lg text-xs leading-relaxed text-paper/50">
                {t.sell.valuationNotice}
              </p>
              <p className="mt-7 text-sm text-paper/75">
                {t.sell.orCall}{" "}
                <a className="text-paper underline decoration-bronze underline-offset-4" href={phoneHref}>
                  {phone}
                </a>
              </p>
            </div>

            <div className="self-start rounded-sm bg-surface p-6 text-ink sm:p-9">
              <SellerValuationForm labels={t.sell.valuationForm} locale={locale} />
            </div>
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
                <p className="mt-3 text-base leading-relaxed text-muted">{a.body}</p>
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

      {/* Closing seller CTA */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid items-end gap-8 border-t border-line pt-12 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.5rem]">
                {t.sell.finalCta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {t.sell.finalCta.body}
              </p>
            </div>
            <Button href="#valuation">{t.sell.finalCta.button}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
