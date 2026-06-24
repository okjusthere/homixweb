import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT } from "@/lib/i18n";
import { heroImage } from "@/lib/site";

export async function Hero() {
  const { t } = await getT();
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/45"
      />

      <Container className="relative z-10 pb-20 pt-32">
        <Eyebrow className="text-paper/75">{t.hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-serif text-[2.75rem] font-normal leading-[1.05] tracking-tight text-paper sm:text-[4rem]">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
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
