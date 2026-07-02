import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import {
  communitiesByTown,
  communityHref,
  gateLabel,
  homesLabel,
} from "@/lib/gated-communities";

export const metadata: Metadata = {
  title: "Nassau Gated & Private Communities",
  description:
    "Plain-language buyer guides to the gated and private communities of Nassau County, Long Island — North Shore to South Shore: what's behind the gate, what the HOA covers, and the real monthly cost.",
  alternates: {
    canonical: "/communities",
    languages: { en: "/communities", "zh-Hans": "/communities?lang=zh", "x-default": "/communities" },
  },
};

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default async function CommunitiesPage() {
  const { locale, t } = await getT();
  const groups = communitiesByTown();

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{t.communitiesPage.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.communitiesPage.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {t.communitiesPage.lead}
        </p>
      </div>

      {groups.map(({ town, items }) => (
        <section key={town} className="mt-14 first:mt-12">
          <h2 className="font-serif text-2xl font-normal tracking-tight text-ink sm:text-[1.75rem]">
            {town}
            <span className="ml-3 align-middle text-sm text-muted">
              {items.length}
            </span>
          </h2>
          <div className="mt-6 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 60}>
                <Link
                  href={communityHref(c.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-bronze/50 focus-visible:outline-none"
                >
                  {c.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-line/40">
                      <Image
                        src={c.image}
                        alt={`${c.name}, ${c.town}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-muted">
                        {gateLabel(c.gateType, locale)}
                      </span>
                      <h3 className="mt-4 font-serif text-2xl font-normal leading-snug text-ink transition-colors group-hover:text-bronze">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{c.town}</p>
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.1em] text-muted">
                        {[
                          c.homesCount && homesLabel(c.homesCount, locale),
                          c.builtYear,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {c.priceRange && (
                        <p className="shrink-0 text-sm font-medium text-ink/85">
                          {c.priceRange}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* How we read a gated community */}
      <section className="mt-20 border-t border-line pt-16 sm:mt-24 sm:pt-20">
        <div className="max-w-2xl">
          <Eyebrow>{t.communitiesPage.whyEyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.communitiesPage.whyTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {t.communitiesPage.whyBody}
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.communitiesPage.methodology.map((m, i) => (
            <Reveal key={m.title} delay={i * 60} className="bg-surface">
              <div className="h-full p-7">
                <p className="font-serif text-2xl text-bronze/60">{n2(i)}</p>
                <p className="mt-3 font-serif text-lg leading-snug text-ink">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
