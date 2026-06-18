import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Sell with Homix — a 1M+ media audience, professional marketing, and AI-driven pricing that helps your New York home sell faster and for more.",
};

export default async function SellPage() {
  const { t } = await getT();
  return (
    <>
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{t.sell.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {t.sell.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{t.sell.lead}</p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {t.sell.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="bg-surface">
              <div className="h-full p-8 sm:p-10">
                <p className="font-serif text-xl text-ink">{p.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-ink py-20 text-paper sm:py-28">
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
              <p className="mt-8 text-paper/80">
                {t.sell.orCall}{" "}
                <a className="text-paper hover:text-bronze" href={siteConfig.contact.phoneHref}>
                  {siteConfig.contact.phone}
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
