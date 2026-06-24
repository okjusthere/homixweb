import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatsBand } from "@/components/home/StatsBand";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Homix is a media-first, AI-empowered New York real estate company — a brokerage, a media studio, and an agent incubator with a 1M+ bilingual audience.",
};

const HERO = "/about/hero.jpg";

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function AboutPage() {
  const { t } = await getT();

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="The New York skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />
        <Container className="absolute inset-x-0 bottom-0 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <Eyebrow className="text-paper/70">{t.about.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-paper sm:text-[4rem]">
              {t.about.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85">
              {t.about.lead}
            </p>
          </div>
        </Container>
      </section>

      {/* Narrative */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="text-lg leading-relaxed text-ink/85">{t.about.p1}</p>
          <p className="text-lg leading-relaxed text-muted">{t.about.p2}</p>
        </div>
      </Container>

      {/* What we are */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.about.whatWeAreEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {t.about.whatWeAreTitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
            {t.about.whatWeAre.map((w, i) => (
              <Reveal key={w.title} delay={i * 60} className="bg-surface">
                <div className="h-full p-8 sm:p-10">
                  <p className="font-serif text-2xl text-bronze/60">{n2(i)}</p>
                  <p className="mt-3 font-serif text-xl text-ink">{w.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.about.teamEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.about.teamTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.about.teamBody}</p>
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

      {/* How we work */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <Eyebrow>{t.about.howEyebrow}</Eyebrow>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
            {t.valueProps.map((p) => (
              <div key={p.title} className="bg-surface p-8 sm:p-10">
                <p className="font-serif text-xl text-ink">{p.title}</p>
                <p className="mt-3 text-base leading-relaxed text-muted">{p.body}</p>
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
