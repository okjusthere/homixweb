import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StatsBand } from "@/components/home/StatsBand";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Homix is New York's media-first real estate company — a brokerage, media studio, and agent incubator with a 1M+ audience.",
};

export default async function AboutPage() {
  const { t } = await getT();

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

      <section className="border-t border-line bg-surface py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.about.teamEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.about.teamTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {t.about.teamBody}
            </p>
          </div>
          <div className="relative mt-12 aspect-[3/2] overflow-hidden rounded-sm bg-line/40">
            <Image
              src="/about/team.jpg"
              alt="The Homix team"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <StatsBand />

      <section className="border-t border-line py-20 sm:py-28">
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
