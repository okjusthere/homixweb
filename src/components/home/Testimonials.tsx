import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { testimonials } from "@/lib/site";

export async function Testimonials() {
  const { t } = await getT();
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <figure className="flex h-full flex-col">
                <blockquote className="font-serif text-2xl font-normal leading-snug text-ink sm:text-[1.75rem]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-sm text-muted">{item.detail}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
