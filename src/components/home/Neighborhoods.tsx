import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { neighborhoods } from "@/lib/site";

export async function Neighborhoods() {
  const { t } = await getT();
  return (
    <section className="border-t border-line bg-surface py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t.neighborhoods.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.neighborhoods.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {t.neighborhoods.lead}
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n, i) => (
            <Reveal key={n.slug} delay={i * 70}>
              <Link
                href={`/neighborhoods/${n.slug}`}
                className="group block focus-visible:outline-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line/50">
                  <Image
                    src={n.image}
                    alt={`${n.name}, New York`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-serif text-2xl text-paper">{n.name}</p>
                    <p className="mt-1 text-sm text-paper/80">{n.blurb}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/neighborhoods" variant="ghost">
            {t.neighborhoods.exploreAll} →
          </Button>
        </div>
      </Container>
    </section>
  );
}
