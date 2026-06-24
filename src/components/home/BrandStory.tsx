import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";

export async function BrandStory() {
  const { t } = await getT();
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>{t.brandStory.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.brandStory.title}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-ink/85">{t.brandStory.p1}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.brandStory.p2}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {t.valueProps.map((prop, i) => (
            <Reveal key={prop.title} delay={i * 60} className="bg-surface p-8 sm:p-10">
              <p className="font-serif text-xl text-ink">{prop.title}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{prop.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
