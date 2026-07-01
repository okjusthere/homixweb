import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewDevGallery } from "@/components/new-development/NewDevGallery";
import { NewDevHighlights } from "@/components/new-development/NewDevHighlights";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentMedia } from "@/data/new-development-media";
import { getDevelopmentContent } from "@/data/new-development-content";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import {
  buyerChecklist,
  buyerFit,
  developmentIntro,
  editorialAngles,
  formatProjectScale,
  getDevelopment,
  newDevelopmentBasePath,
  priceLead,
} from "@/lib/new-developments";

function mapUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function priceRange(building: ReturnType<typeof getDevelopment>) {
  if (!building || building.priceBands.length === 0) return "By unit";
  const first = building.priceBands[0].price;
  const last = building.priceBands[building.priceBands.length - 1].price;
  const low = first.split(/\s*[-–]\s*/)[0];
  const highParts = last.split(/\s*[-–]\s*/);
  const high = highParts[1] ?? highParts[0];
  return low && high && low !== high ? `${low} – ${high}` : priceLead(building);
}

export async function generateStaticParams() {
  return featuredDevelopments.map((building) => ({ slug: building.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const building = getDevelopment(slug);
  if (!building) return { title: "New development not found" };
  return {
    title: `${building.name} — New Development`,
    description: `${building.name} in ${building.area}: photos, building facts, floor-plan pricing, carrying costs, and buyer notes from Homix.`,
    openGraph: { type: "article" },
  };
}

export default async function NewDevelopmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const building = getDevelopment(slug);
  if (!building) notFound();

  const { locale } = await getT();
  const zh = locale === "zh";
  const media = getDevelopmentMedia(building.slug);
  const content = getDevelopmentContent(building.slug);

  const copy = {
    back: zh ? "全部新盘" : "All new developments",
    facts: zh ? "楼宇信息" : "Building Facts",
    highlights: zh ? "项目亮点" : "Highlights",
    flipHint: zh ? "翻看" : "Flip",
    budget: zh ? "户型与预算" : "Plans & Budget",
    floorPlans: zh ? "代表性户型图" : "Floor Plans",
    plan: zh ? "户型" : "Plan",
    price: zh ? "价格" : "Price",
    availability: zh ? "供应" : "Availability",
    commonCharges: zh ? "物业费" : "Common charges",
    taxes: zh ? "地产税" : "Taxes",
    unitLevel: zh ? "按单元核验" : "By unit",
    fit: zh ? "适合什么买家" : "Buyer Fit",
    location: zh ? "地段与交通" : "Location & Transit",
    overview: zh ? "项目背景" : "Project Background",
    official: zh ? "项目官网" : "Official Site",
    call: zh ? "联系 Homix 看房" : "Talk to Homix",
    photos: zh ? "张照片" : "photos",
    priceRange: zh ? "价格区间" : "Price range",
    originalPlan: zh ? "查看高清原件" : "Open Original",
    floorPlanPending: zh
      ? "该项目官网目前没有公开可直接展示的官方户型图；Homix 会按具体单元向销售团队核验户型图、面积、朝向、物业费和税费。"
      : "This project site does not currently expose official floor-plan files we can display; Homix verifies plans, area, exposure, common charges, and taxes by unit.",
    estNote: zh
      ? "物业费与地产税为按楼栋估算的大致月度区间，会随楼层、朝向、户型线和具体单元而变化，正式看房或出价前需按单元核验。"
      : "Common charges and taxes are approximate monthly ranges estimated at the building level; they vary by floor, exposure, line, and unit, and must be verified per unit before touring or offering.",
  };

  const facts = [
    [zh ? "地址" : "Address", building.address],
    [zh ? "区域" : "Area", `${building.area}, ${building.borough}`],
    [zh ? "规模" : "Scale", formatProjectScale(building, locale)],
    [zh ? "状态" : "Status", building.facts.status],
    [zh ? "开发商" : "Developer", building.facts.developer],
    [zh ? "建筑设计" : "Architecture", building.facts.architect],
    [zh ? "室内设计" : "Interiors", building.facts.interiors],
    [zh ? "销售团队" : "Sales", building.facts.sales],
  ].filter(([, value]) => value) as [string, string][];

  const galleryImages = media.images.map((im) => ({
    src: im.src,
    alt: im.alt,
    caption: im.caption,
  }));

  const highlightItems = content
    ? content.highlights.map((h) => ({
        title: zh ? h.titleZh : h.titleEn,
        body: zh ? h.bodyZh : h.bodyEn,
      }))
    : [
        ...editorialAngles(building, locale).map((a) => ({ title: a.title, body: a.body })),
        ...buyerChecklist(building, locale).map((c) => ({ title: c.title, body: c.body })),
      ];

  const carryingFor = (layout: string) => {
    const band = content?.carrying?.bands.find((b) => b.layout === layout);
    return {
      cc: band ? band.commonCharges[locale] : copy.unitLevel,
      tax: band ? band.taxes[locale] : copy.unitLevel,
    };
  };
  const carryingNote = content?.carrying?.note[locale];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href={newDevelopmentBasePath}
        className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
      >
        ← {copy.back}
      </Link>

      {/* Carousel */}
      {galleryImages.length > 0 && (
        <div className="mt-5">
          <NewDevGallery
            images={galleryImages}
            name={building.name}
            allMediaLabel={copy.photos}
          />
        </div>
      )}

      {/* Header: name / address / price */}
      <header className="mt-8 border-b border-line pb-8">
        <p className="eyebrow">{building.area}</p>
        <h1 className="mt-3 font-serif text-4xl font-normal leading-[1.0] tracking-tight text-ink sm:text-6xl">
          {building.name}
        </h1>
        <p className="mt-4 text-lg text-muted">{building.address}</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{copy.priceRange}</p>
            <p className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{priceRange(building)}</p>
            <p className="mt-2 text-sm text-muted">{formatProjectScale(building, locale)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {building.officialUrl && (
              <Button href={building.officialUrl} variant="outline">
                {copy.official} →
              </Button>
            )}
            <Button href={siteConfig.contact.phoneHref}>{copy.call} →</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-16">
        {/* 1 — Building facts */}
        <section>
          <Eyebrow>{copy.facts}</Eyebrow>
          <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-px overflow-hidden border-y border-line sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-4 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0"
              >
                <dt className="text-xs uppercase tracking-[0.12em] text-muted">{label}</dt>
                <dd className="text-sm leading-relaxed text-ink/85">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 2 — Plans & budget */}
        <section>
          <Eyebrow>{copy.budget}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-ink">
            {priceRange(building)}
          </h2>

          {media.floorPlans.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {media.floorPlans.map((plan) => (
                <article key={plan.id} className="border border-line bg-surface">
                  <div className="relative aspect-[4/3] bg-white sm:aspect-[5/4]">
                    <Image
                      src={plan.src}
                      alt={`${building.name} ${plan.title} floor plan`}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 36vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-line p-4">
                    <h3 className="font-serif text-lg font-normal text-ink">{plan.title}</h3>
                    <a
                      href={plan.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-none text-sm font-medium text-bronze transition-colors hover:text-bronze-dark"
                    >
                      {copy.originalPlan} →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-7 border border-line bg-paper p-6">
              <p className="text-sm leading-relaxed text-muted">{copy.floorPlanPending}</p>
            </div>
          )}

          {/* price + carrying-cost table (desktop) */}
          <div className="mt-8 hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
                  <th className="py-3 pr-4 font-medium">{copy.plan}</th>
                  <th className="py-3 pr-4 font-medium">{copy.price}</th>
                  <th className="py-3 pr-4 font-medium">{copy.availability}</th>
                  <th className="py-3 pr-4 font-medium">{copy.commonCharges}</th>
                  <th className="py-3 font-medium">{copy.taxes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/80">
                {building.priceBands.map((band) => {
                  const c = carryingFor(band.layout);
                  return (
                    <tr key={band.layout}>
                      <td className="py-3 pr-4 font-medium text-ink">{band.layout}</td>
                      <td className="py-3 pr-4 text-ink/85">{band.price}</td>
                      <td className="py-3 pr-4 text-muted">{band.availability}</td>
                      <td className="py-3 pr-4 text-muted">{c.cc}</td>
                      <td className="py-3 text-muted">{c.tax}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* price + carrying-cost cards (mobile) */}
          <div className="mt-6 divide-y divide-line/80 sm:hidden">
            {building.priceBands.map((band) => {
              const c = carryingFor(band.layout);
              return (
                <div key={`${band.layout}-m`} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium text-ink">{band.layout}</p>
                    <p className="text-right text-ink/85">{band.price}</p>
                  </div>
                  <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <dt className="uppercase tracking-[0.1em] text-muted">{copy.availability}</dt>
                      <dd className="mt-1 text-ink/75">{band.availability}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.1em] text-muted">{copy.commonCharges}</dt>
                      <dd className="mt-1 text-ink/75">{c.cc}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.1em] text-muted">{copy.taxes}</dt>
                      <dd className="mt-1 text-ink/75">{c.tax}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted">{carryingNote ?? copy.estNote}</p>
        </section>

        {/* 3 — Highlights (flip cards) */}
        <section>
          <Eyebrow>{copy.highlights}</Eyebrow>
          <div className="mt-6">
            <NewDevHighlights items={highlightItems} hint={copy.flipHint} />
          </div>
        </section>

        {/* 4 — Buyer fit + location */}
        <section>
          <Eyebrow>{copy.fit}</Eyebrow>
          <p className="mt-4 text-lg leading-relaxed text-ink/84">{buyerFit(building, locale)}</p>

          <div className="mt-10">
            <Eyebrow>{copy.location}</Eyebrow>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {content ? content.location[locale] : building.transit}
            </p>
            <div className="mt-5 overflow-hidden rounded-sm border border-line bg-paper">
              <iframe
                title={`${building.name} map`}
                src={mapUrl(building.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 grayscale-[26%] sepia-[8%] saturate-[72%]"
              />
            </div>
          </div>
        </section>

        {/* 5 — Project background (last) */}
        <section>
          <Eyebrow>{copy.overview}</Eyebrow>
          <p className="mt-5 text-lg leading-relaxed text-ink/85">
            {content ? content.overview[locale] : developmentIntro(building, locale)}
          </p>
        </section>

        {/* CTA */}
        <section className="overflow-hidden rounded-sm bg-ink p-7 text-paper sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="eyebrow text-paper/60">Homix</p>
              <h2 className="mt-4 font-serif text-3xl font-normal">
                {zh ? "想看这一栋？" : "Want to see this building?"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/72">
                {zh
                  ? "把这个页面发给客户，或直接联系 Homix 安排楼盘资料、看房和单元费用核验。"
                  : "Share this page with a client, or contact Homix for the building deck, tours, and unit-level carrying-cost checks."}
              </p>
            </div>
            <Button href={siteConfig.contact.phoneHref} onDark>
              {copy.call}
            </Button>
          </div>
        </section>
      </div>
    </Container>
  );
}
