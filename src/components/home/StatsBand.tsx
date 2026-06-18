import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";

export async function StatsBand() {
  const { t } = await getT();
  return (
    <section className="border-y border-line bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {t.stats.items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60} className="text-center">
              <p className="font-serif text-4xl tabular-nums text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="eyebrow mt-3">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
