import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { testimonials } from "@/lib/site";

export async function Testimonials() {
  const { t } = await getT();
  const featured = testimonials[0];
  if (!featured) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
          <blockquote className="mt-8 font-serif text-3xl font-normal leading-snug text-ink sm:text-[2.25rem]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 text-sm text-muted">
            <span className="text-ink">{featured.name}</span>
            {featured.detail ? ` · ${featured.detail}` : ""}
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
