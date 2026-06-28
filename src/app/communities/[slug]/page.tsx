import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gatedCommunities } from "@/data/gated-communities";
import { getCommunityContent } from "@/data/gated-community-content";
import { amenityLabel, commuteFor, homeTypesLabel } from "@/data/gated-community-zh";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import {
  communitiesBasePath,
  communityScale,
  gateLabel,
  getCommunity,
  subRegionLabel,
} from "@/lib/gated-communities";

function mapUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function generateStaticParams() {
  return gatedCommunities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return { title: "Community not found" };
  return {
    title: `${c.name} — ${c.town}`,
    description: `${c.name} in ${c.town}, Nassau County: a buyer's guide to this gated/private community — access, homes, HOA, commute, and resale.`,
    openGraph: { type: "article", images: c.image ? [c.image] : undefined },
  };
}

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) notFound();

  const { locale, t } = await getT();
  const zh = locale === "zh";
  const content = getCommunityContent(c.slug);
  const cz = commuteFor(c.slug, locale);

  const copy = {
    overview: zh ? "社区概览" : "Overview",
    highlights: zh ? "买家亮点" : "Highlights",
    location: zh ? "位置与通勤" : "Location & Commute",
    bestFor: zh ? "适合什么买家" : "Best for",
    facts: zh ? "社区信息" : "Community Facts",
    access: zh ? "门禁" : "Access",
    homes: zh ? "户数" : "Homes",
    homeTypes: zh ? "户型" : "Home types",
    built: zh ? "建成" : "Built",
    developer: zh ? "开发商" : "Developer",
    hoa: zh ? "HOA 月费" : "HOA dues",
    hoaNote: zh ? "按户型/楼层浮动" : "varies by unit",
    price: zh ? "价格区间" : "Price range",
    amenities: zh ? "配套" : "Amenities",
    lirr: zh ? "最近 LIRR" : "Nearest LIRR",
    toCity: zh ? "进城" : "To Manhattan",
    drive: zh ? "驾车" : "By car",
    official: zh ? "社区官网" : "Official site",
    call: zh ? "联系 Homix 看房" : "Talk to Homix",
    sources: zh ? "资料来源" : "Sources",
    accuracyNote: zh
      ? "社区数据（户数、HOA 月费、价格、配套）会随时间变化，且 HOA 月费按具体户型与楼层不同；正式看房或出价前，Homix 会按具体单元再次核验。"
      : "Community details (home counts, HOA dues, pricing, amenities) change over time, and HOA dues vary by unit and floor plan; Homix re-verifies by unit before touring or writing an offer.",
  };

  const facts: [string, string | undefined][] = [
    [zh ? "区域" : "Area", `${c.town} · ${subRegionLabel(c.subRegion, locale)}`],
    [copy.access, gateLabel(c.gateType, locale)],
    [copy.homes, c.homesCount],
    [copy.homeTypes, c.homeTypes ? homeTypesLabel(c.homeTypes, locale) : undefined],
    [copy.built, c.builtYear],
    [copy.developer, c.developer],
    [copy.hoa, c.hoaDues ? `${c.hoaDues} · ${copy.hoaNote}` : undefined],
    [copy.price, c.priceRange],
  ];
  const shownFacts = facts.filter(([, v]) => v);

  const commuteRows: [string, string | undefined][] = [
    [
      copy.lirr,
      c.commute.lirrStation
        ? [c.commute.lirrStation, c.commute.lirrBranch].filter(Boolean).join(" · ")
        : undefined,
    ],
    [copy.toCity, cz?.minutesToManhattan ?? c.commute.minutesToManhattan],
    [copy.drive, cz?.drive ?? c.commute.drive],
  ];
  const shownCommute = commuteRows.filter(([, v]) => v);

  // Provenance footnote: one link per distinct domain.
  const uniqueSources = Array.from(
    new Map(c.sources.map((s) => [hostOf(s.url), s.url])).values(),
  );

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-surface">
        <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <Link
            href={communitiesBasePath}
            className="w-fit text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline lg:col-span-2"
          >
            ← {t.communitiesPage.backToAll}
          </Link>

          <div className="max-w-4xl">
            <p className="eyebrow">{subRegionLabel(c.subRegion, locale)}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.98] tracking-tight text-ink sm:text-6xl">
              {c.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {c.town} · {communityScale(c, locale)}
            </p>
          </div>

          <div className="space-y-4">
            {c.image ? (
              <figure className="overflow-hidden border border-line bg-paper">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={c.image}
                    alt={`${c.name}, ${c.town}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            ) : (
              <div className="overflow-hidden rounded-sm border border-line bg-paper">
                <iframe
                  title={`${c.name} map`}
                  src={mapUrl(`${c.name}, ${c.town}, NY`)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[300px] w-full border-0 grayscale-[26%] sepia-[8%] saturate-[72%]"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{copy.facts}</Eyebrow>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {shownFacts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">{label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>

            {c.amenities.length > 0 && (
              <div className="mt-6">
                <Eyebrow>{copy.amenities}</Eyebrow>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.amenities.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-line px-3 py-1 text-xs text-ink/75"
                    >
                      {amenityLabel(a, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {c.officialUrl && (
                <Button href={c.officialUrl} variant="outline">
                  {copy.official} →
                </Button>
              )}
              <Button href={siteConfig.contact.phoneHref} variant="ghost">
                {copy.call} →
              </Button>
            </div>
          </aside>

          <article>
            {content && (
              <section>
                <Eyebrow>{copy.overview}</Eyebrow>
                <p className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.25rem]">
                  {content.overview[locale]}
                </p>
              </section>
            )}

            {content && content.highlights.length > 0 && (
              <section className="mt-14">
                <Eyebrow>{copy.highlights}</Eyebrow>
                <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                  {content.highlights.map((h) => (
                    <div key={zh ? h.titleZh : h.titleEn} className="bg-surface p-6">
                      <h2 className="font-serif text-xl font-normal text-ink">
                        {zh ? h.titleZh : h.titleEn}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {zh ? h.bodyZh : h.bodyEn}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                {content && (
                  <>
                    <Eyebrow>{copy.bestFor}</Eyebrow>
                    <p className="mt-4 text-lg leading-relaxed text-ink/84">
                      {content.bestFor[locale]}
                    </p>
                  </>
                )}
                {shownCommute.length > 0 && (
                  <dl className="mt-8 divide-y divide-line border-y border-line">
                    {shownCommute.map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-3.5">
                        <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                          {label}
                        </dt>
                        <dd className="text-sm leading-relaxed text-ink/85">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
              <div>
                <Eyebrow>{copy.location}</Eyebrow>
                {content && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {content.location[locale]}
                  </p>
                )}
                <div className="mt-4 overflow-hidden rounded-sm border border-line bg-paper">
                  <iframe
                    title={`${c.name} map`}
                    src={mapUrl(`${c.name}, ${c.town}, NY`)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full border-0 grayscale-[26%] sepia-[8%] saturate-[72%]"
                  />
                </div>
              </div>
            </section>

            <section className="mt-14 border-t border-line pt-8">
              <p className="text-xs leading-relaxed text-muted">{copy.accuracyNote}</p>
              {uniqueSources.length > 0 && (
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  <span className="uppercase tracking-[0.12em]">{copy.sources}:</span>{" "}
                  {uniqueSources.map((url, i) => (
                    <span key={url}>
                      {i > 0 && " · "}
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-2 hover:text-bronze hover:underline"
                      >
                        {hostOf(url)}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </section>

            <section className="mt-14 overflow-hidden rounded-sm bg-ink p-7 text-paper sm:p-9">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="eyebrow text-paper/60">Homix</p>
                  <h2 className="mt-4 font-serif text-3xl font-normal">
                    {zh ? "想看这个社区？" : "Want to see this community?"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-paper/72">
                    {zh
                      ? "把这个页面发给客户，或直接联系 Homix 安排看房、核实 HOA 月费与可售房源。"
                      : "Share this page with a client, or contact Homix to tour, verify HOA dues, and see what's available."}
                  </p>
                </div>
                <Button href={siteConfig.contact.phoneHref} onDark>
                  {copy.call}
                </Button>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </>
  );
}
