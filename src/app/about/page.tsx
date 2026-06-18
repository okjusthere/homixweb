import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatsBand } from "@/components/home/StatsBand";
import { getT } from "@/lib/i18n";
import { listings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Homix is New York's media-first real estate company — a brokerage, media studio, and agent incubator with a 1M+ audience. Meet the founders.",
};

const FOUNDER_SLUGS = ["sunny", "heidi", "queenie"];

export default async function AboutPage() {
  const { t } = await getT();
  const agents = await listings.getAgents();
  const founders = FOUNDER_SLUGS.map((s) => agents.find((a) => a.slug === s)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );

  return (
    <>
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {t.about.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{t.about.lead}</p>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <p className="text-lg leading-relaxed text-ink/85">{t.about.p1}</p>
          <p className="text-lg leading-relaxed text-muted">{t.about.p2}</p>
        </div>
      </Container>

      <StatsBand />

      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.about.foundersTitle}
          </h2>
        </div>

        <div className="mt-14 space-y-16">
          {founders.map((f, i) => (
            <Reveal key={f.id}>
              <div
                className={`grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-12 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/50">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div className="md:py-4">
                  <h3 className="font-serif text-2xl text-ink">{f.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-wide text-bronze">
                    {f.title}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-ink/85">{f.bio}</p>
                  <Button href={`/agents/${f.slug}`} variant="ghost" className="mt-5">
                    {t.common.viewProfile} →
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-t border-line bg-surface py-20 sm:py-28">
        <Container>
          <Eyebrow>{t.about.howEyebrow}</Eyebrow>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
            {t.valueProps.map((p) => (
              <div key={p.title} className="bg-surface p-8 sm:p-10">
                <p className="font-serif text-xl text-ink">{p.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact">{t.about.workWithUs}</Button>
            <Button href="/agents" variant="outline">
              {t.about.meetTeam}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
