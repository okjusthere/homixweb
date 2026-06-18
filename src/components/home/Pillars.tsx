import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { pillarLinks } from "@/lib/site";

/** The three business lines: buy/sell homes, careers, media & marketing. */
export async function Pillars() {
  const { t } = await getT();
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t.pillars.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.pillars.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {t.pillars.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="flex bg-surface">
              <div className="flex flex-col p-8 sm:p-10">
                <Eyebrow>{p.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-serif text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.body}</p>
                <Link
                  href={pillarLinks[i] ?? "/contact"}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-bronze hover:underline"
                >
                  {p.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
