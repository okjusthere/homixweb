import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { neighborhoods } from "@/lib/site";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "Local guides to the New York neighborhoods Homix knows best — Flushing, Long Island City, Great Neck and more.",
};

export default async function NeighborhoodsPage() {
  const { t } = await getT();
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{t.neighborhoodsPage.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.neighborhoodsPage.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {t.neighborhoodsPage.lead}
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 3) * 70}>
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
            {n.photoCredit && (
              <p className="mt-2 text-[11px] leading-tight text-muted">
                {t.neighborhoodsPage.photoBy}:{" "}
                <a
                  href={n.photoCreditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:text-bronze hover:underline"
                >
                  {n.photoCredit}
                </a>
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
