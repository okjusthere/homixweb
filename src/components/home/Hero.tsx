import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT, type Locale } from "@/lib/i18n";
import { heroImage } from "@/lib/site";

export async function Hero({ locale }: { locale: Locale }) {
  const { t } = await getT(locale);
  return (
    // bg-ink: while the photo streams in (or if it ever fails), the header and
    // headline sit on dark — never white-on-cream. The before: strip extends
    // the dark above the document top so macOS rubber-band overscroll exposes
    // ink (white header stays readable) instead of the cream body background.
    <section className="relative flex min-h-[92vh] items-end bg-ink before:absolute before:inset-x-0 before:-top-64 before:h-64 before:bg-ink">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Two scrims: vertical for the header/footer zones, and a left-side
          wash under the headline so bright sky/window areas never fight the
          type, whatever the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/45 via-ink/15 to-transparent"
      />

      <Container className="relative z-10 pb-20 pt-32">
        <Eyebrow className="text-paper/75">{t.hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-serif text-[2.75rem] font-normal leading-[1.05] tracking-tight text-paper [text-shadow:0_1px_3px_rgba(12,15,14,0.45)] sm:text-[4rem]">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/90 [text-shadow:0_1px_2px_rgba(12,15,14,0.5)]">
          {t.hero.lead}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/listings" className="bg-paper text-ink hover:bg-bronze hover:text-paper">
            {t.hero.ctaPrimary}
          </Button>
          <Button
            href="/agents"
            variant="outline"
            className="border-paper/60 text-paper hover:border-bronze hover:text-bronze"
          >
            {t.hero.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
