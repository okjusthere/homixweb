import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { featuredDevelopments } from "@/data/featured-developments";
import type { FeaturedDevelopment } from "@/data/featured-developments";
import type { Locale } from "@/lib/i18n";

const groups = ["Manhattan", "Queens"] as const;

function mapUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function factsFor(building: FeaturedDevelopment, zh: boolean) {
  return [
    [zh ? "户数" : "Units", building.facts.units],
    [zh ? "楼层" : "Stories", building.facts.stories],
    [zh ? "年份" : "Built", building.facts.built],
    [zh ? "状态" : "Status", building.facts.status],
    [zh ? "开发商" : "Developer", building.facts.developer],
    [zh ? "建筑设计" : "Architect", building.facts.architect],
    [zh ? "室内设计" : "Interior design", building.facts.interiors],
    [zh ? "销售团队" : "Sales team", building.facts.sales],
  ].filter(([, value]) => value);
}

function DevelopmentCard({
  building,
  locale,
  open,
}: {
  building: FeaturedDevelopment;
  locale: Locale;
  open: boolean;
}) {
  const zh = locale === "zh";
  const labels = {
    projectOverview: zh ? "项目概览" : "Project Overview",
    location: zh ? "地理位置 / 社区 / 交通" : "Location / Community / Transit",
    media: zh ? "建筑 + 室内照片" : "Building + Interior Photos",
    pricing: zh ? "户型图 + 价格 + 物业 + 税" : "Plans + Price + CC + Tax",
    source: zh ? "StreetEasy 来源" : "StreetEasy Source",
    official: zh ? "项目官网" : "Official Site",
    gallery: zh ? "图库" : "Gallery",
    updated: zh ? "更新" : "Updated",
    mapTitle: zh ? "地图标记" : "Map Marker",
    layout: zh ? "户型" : "Plan",
    price: zh ? "价格区间" : "Price",
    availability: zh ? "供应" : "Availability",
    commonCharges: zh ? "物业费" : "Common charges",
    taxes: zh ? "地产税" : "Taxes",
    unitLevel: zh ? "按单元核验" : "Unit-level",
    readDetails: zh ? "展开项目" : "View Details",
    note: zh
      ? "物业费、地产税和户型图按具体单元变化；看房或出价前，以 StreetEasy 单元页、销售团队或 offering plan 为准。"
      : "Common charges, taxes, and floor plans vary by unit; verify against the StreetEasy unit page, sales team, or offering plan before a tour or offer.",
    mediaNote: zh
      ? "第三方图片暂不复制到官网；当前保留来源图库入口，后续可替换为授权建筑、室内与户型图素材。"
      : "Third-party imagery is linked at source for now; licensed exterior, interior, and floor plan assets can be added later.",
  };

  const priceLead = building.priceBands[0];

  return (
    <details
      open={open}
      className="group rounded-sm border border-line bg-surface shadow-[0_14px_35px_rgba(28,27,24,0.04)] [&>summary::-webkit-details-marker]:hidden"
    >
      <summary className="grid cursor-pointer gap-5 p-5 outline-none transition-colors hover:bg-paper/70 focus-visible:bg-paper/80 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-serif text-2xl font-normal leading-tight text-ink">
              {building.name}
            </p>
            <span className="rounded-full border border-bronze/25 bg-bronze/10 px-2.5 py-1 text-xs font-medium text-bronze-dark">
              {building.area}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{building.address}</p>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-4 sm:min-w-72 sm:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-ink">{priceLead.price}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
              {priceLead.layout} · {labels.updated} {building.sourceUpdated}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-lg leading-none text-bronze transition-transform group-open:rotate-45">
            +
          </span>
        </div>
        <span className="sr-only">{labels.readDetails}</span>
      </summary>

      <div className="border-t border-line p-5 sm:p-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <section>
            <p className="eyebrow">{labels.projectOverview}</p>
            <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {factsFor(building, zh).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-line pt-6">
              <p className="eyebrow">{labels.media}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {labels.gallery}: {building.galleryCount} · {labels.mediaNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={building.sourceUrl} variant="outline" className="px-4 py-2">
                  {labels.source}
                </Button>
                {building.officialUrl && (
                  <Button href={building.officialUrl} variant="ghost">
                    {labels.official} →
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section>
            <p className="eyebrow">{labels.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{building.transit}</p>
            <div className="mt-4 overflow-hidden rounded-sm border border-line bg-paper">
              <iframe
                title={`${building.name} ${labels.mapTitle}`}
                src={mapUrl(building.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0 grayscale-[28%] sepia-[8%] saturate-[70%] sm:h-64"
              />
            </div>
          </section>
        </div>

        <section className="mt-8 border-t border-line pt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="eyebrow">{labels.pricing}</p>
            <p className="max-w-2xl text-xs leading-relaxed text-muted">{labels.note}</p>
          </div>
          <div className="mt-4 divide-y divide-line/80 sm:hidden">
            {building.priceBands.map((band) => (
              <div key={`${building.slug}-${band.layout}-mobile`} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-medium text-ink">{band.layout}</p>
                  <p className="text-right text-ink/85">{band.price}</p>
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <dt className="uppercase tracking-[0.12em] text-muted">
                      {labels.availability}
                    </dt>
                    <dd className="mt-1 text-ink/75">{band.availability}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.12em] text-muted">
                      {labels.commonCharges}
                    </dt>
                    <dd className="mt-1 text-ink/75">{labels.unitLevel}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.12em] text-muted">
                      {labels.taxes}
                    </dt>
                    <dd className="mt-1 text-ink/75">{labels.unitLevel}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
                  <th className="py-3 pr-4 font-medium">{labels.layout}</th>
                  <th className="py-3 pr-4 font-medium">{labels.price}</th>
                  <th className="py-3 pr-4 font-medium">{labels.availability}</th>
                  <th className="py-3 pr-4 font-medium">{labels.commonCharges}</th>
                  <th className="py-3 font-medium">{labels.taxes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/80">
                {building.priceBands.map((band) => (
                  <tr key={`${building.slug}-${band.layout}`}>
                    <td className="py-3 pr-4 font-medium text-ink">{band.layout}</td>
                    <td className="py-3 pr-4 text-ink/85">{band.price}</td>
                    <td className="py-3 pr-4 text-muted">{band.availability}</td>
                    <td className="py-3 pr-4 text-muted">{labels.unitLevel}</td>
                    <td className="py-3 text-muted">{labels.unitLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </details>
  );
}

export function FeaturedDevelopments({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const copy = {
    eyebrow: zh ? "精选新盘大楼" : "Featured Developments",
    title: zh ? "纽约核心新盘与精品公寓资料库" : "New York New Development Desk",
    body: zh
      ? "根据文件中的 StreetEasy 链接整理，先把项目、位置、图库入口、户型价格和单元级费用核验路径做成官网栏目。后续拿到授权图片与完整 offering plan 后，可以直接补充素材与逐套费用。"
      : "Organized from the StreetEasy links in the source document, this desk gives buyers a clean way to review project facts, location, source galleries, floor-plan pricing, and unit-level fee verification paths.",
    buildings: zh ? "栋楼" : "buildings",
    sourceNote: zh
      ? "所有报价与库存为来源页快照，需以实时来源与销售团队确认为准。"
      : "All pricing and availability are source-page snapshots and should be reconfirmed live.",
  };

  return (
    <section
      id="new-developments"
      className="mt-20 scroll-mt-28 border-t border-line pt-16 sm:mt-24 sm:scroll-mt-32 sm:pt-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {copy.title}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-muted">{copy.body}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
            <span className="border border-line bg-surface px-3 py-2">
              {featuredDevelopments.length} {copy.buildings}
            </span>
            <span className="border border-line bg-surface px-3 py-2">
              Manhattan · Long Island City
            </span>
            <span className="border border-line bg-surface px-3 py-2">
              {copy.sourceNote}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {groups.map((group) => {
          const items = featuredDevelopments.filter((building) => building.borough === group);
          return (
            <div key={group}>
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h3 className="font-serif text-2xl font-normal text-ink">{group}</h3>
                <p className="text-sm text-muted">
                  {items.length} {copy.buildings}
                </p>
              </div>
              <div className="mt-5 space-y-4">
                {items.map((building, index) => (
                  <Reveal key={building.slug} delay={(index % 4) * 45}>
                    <DevelopmentCard
                      building={building}
                      locale={locale}
                      open={index === 0}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
