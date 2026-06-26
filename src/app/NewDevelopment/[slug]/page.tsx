import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentMedia } from "@/data/new-development-media";
import { getDevelopmentContent } from "@/data/new-development-content";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import {
  buyerFit,
  buyerChecklist,
  developmentIntro,
  editorialAngles,
  formatProjectScale,
  getDevelopment,
  newDevelopmentBasePath,
  priceLead,
  representativePlans,
} from "@/lib/new-developments";

function mapUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
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
    description: `${building.name} in ${building.area}: project overview, location, floor-plan pricing, and buyer notes from Homix.`,
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
  const angles = editorialAngles(building, locale);
  const plans = representativePlans(building);
  const checklist = buyerChecklist(building, locale);
  const media = getDevelopmentMedia(building.slug);
  const cover = media.images[0];
  const content = getDevelopmentContent(building.slug);

  const copy = {
    back: zh ? "全部新盘" : "All new developments",
    overview: zh ? "项目背景" : "Project Background",
    why: zh ? "项目亮点" : "Highlights",
    fit: zh ? "适合什么买家" : "Buyer Fit",
    location: zh ? "地段与交通" : "Location",
    budget: zh ? "户型与预算" : "Plans & Budget",
    details: zh ? "楼宇信息" : "Building Facts",
    commonCharges: zh ? "物业费" : "Common charges",
    taxes: zh ? "地产税" : "Taxes",
    unitLevel: zh ? "按单元核验" : "Unit-level",
    availability: zh ? "供应" : "Availability",
    plan: zh ? "户型" : "Plan",
    price: zh ? "价格" : "Price",
    official: zh ? "项目官网" : "Official Site",
    call: zh ? "联系 Homix 看房" : "Talk to Homix",
    checklist: zh ? "买家最容易忽略的点" : "Buyer Checks",
    gallery: zh ? "建筑与室内照片" : "Building & Interiors",
    floorPlans: zh ? "代表性户型图" : "Representative Floor Plans",
    originalPlan: zh ? "查看高清原件" : "Open Original",
    floorPlanPending: zh
      ? "该项目官网目前没有公开可直接展示的官方户型图；Homix 后续会按具体单元向销售团队核验户型图、面积、朝向、物业费和税费。"
      : "This project site does not currently expose official floor-plan files we can display; Homix verifies plans, area, exposure, common charges, and taxes by unit before touring or offering.",
    note: zh
      ? "新盘价格、税费、物业费和库存会变化；正式看房或出价前，需要按具体单元再次核验。"
      : "New-development pricing, taxes, common charges, and inventory change; verify unit by unit before touring or writing an offer.",
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
  ].filter(([, value]) => value);

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-surface">
        <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
          <Link
            href={newDevelopmentBasePath}
            className="w-fit text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline lg:col-span-2"
          >
            ← {copy.back}
          </Link>

          <div className="max-w-4xl">
            <p className="eyebrow">{building.area}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-tight text-ink sm:text-7xl">
              {building.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {formatProjectScale(building, locale)} · {priceLead(building)}
            </p>
          </div>
          <div className="space-y-4">
            {cover && (
              <figure className="overflow-hidden border border-line bg-paper">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={cover.src}
                    alt={`${building.name} ${cover.alt}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted">
                  {cover.caption}
                </figcaption>
              </figure>
            )}
            <div className="border border-line bg-paper p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {zh ? "客户速读" : "Client Summary"}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-px bg-line">
                {[
                  [zh ? "区域" : "Area", building.area],
                  [zh ? "价格" : "Price", priceLead(building)],
                  [zh ? "户型" : "Plans", plans.map((plan) => plan?.layout).join(" · ")],
                ].map(([label, value]) => (
                  <div key={label} className="bg-surface p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {zh
                  ? "官方图片与户型图优先展示；具体单元的物业费、税费和库存以后续核验资料为准。"
                  : "Official photos and floor plans where available; common charges, taxes, and inventory are verified by unit."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{copy.details}</Eyebrow>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">{label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {building.officialUrl && (
                <Button href={building.officialUrl} variant="outline">
                  {copy.official} →
                </Button>
              )}
              <Button href={siteConfig.contact.phoneHref} variant="ghost">
                {copy.call} →
              </Button>
            </div>
          </aside>

          <article>
            <section>
              <Eyebrow>{copy.overview}</Eyebrow>
              <p className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.25rem]">
                {content ? content.overview[locale] : developmentIntro(building, locale)}
              </p>
            </section>

            <section className="mt-14">
              <Eyebrow>{copy.why}</Eyebrow>
              {content ? (
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
              ) : (
                <>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
                    {angles.map((angle) => (
                      <div key={angle.title} className="bg-surface p-6">
                        <h2 className="font-serif text-xl font-normal text-ink">{angle.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{angle.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {checklist.map((item) => (
                      <div key={item.title} className="bg-surface p-6">
                        <h2 className="font-serif text-xl font-normal text-ink">{item.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>

            {media.images.length > 0 && (
              <section className="mt-14">
                <Eyebrow>{copy.gallery}</Eyebrow>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {media.images.map((image, index) => (
                    <figure
                      key={image.id}
                      className={index === 0 ? "sm:col-span-2" : undefined}
                    >
                      <div
                        className={`relative overflow-hidden border border-line bg-paper ${
                          index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={`${building.name} ${image.alt}`}
                          fill
                          sizes={
                            index === 0
                              ? "(max-width: 768px) 100vw, 44vw"
                              : "(max-width: 768px) 50vw, 22vw"
                          }
                          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="mt-2 text-xs leading-relaxed text-muted">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <Eyebrow>{copy.fit}</Eyebrow>
                <p className="mt-4 text-lg leading-relaxed text-ink/84">
                  {buyerFit(building, locale)}
                </p>
              </div>
              <div>
                <Eyebrow>{copy.location}</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {content ? content.location[locale] : building.transit}
                </p>
                <div className="mt-4 overflow-hidden rounded-sm border border-line bg-paper">
                  <iframe
                    title={`${building.name} map`}
                    src={mapUrl(building.address)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full border-0 grayscale-[26%] sepia-[8%] saturate-[72%]"
                  />
                </div>
              </div>
            </section>

            <section className="mt-14 border-t border-line pt-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>{copy.budget}</Eyebrow>
                  <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-ink">
                    {priceLead(building)}
                  </h2>
                </div>
                <p className="max-w-xl text-xs leading-relaxed text-muted">{copy.note}</p>
              </div>

              <section className="mt-10">
                <Eyebrow>{copy.floorPlans}</Eyebrow>
                {media.floorPlans.length > 0 ? (
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
                        <div className="border-t border-line p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="font-serif text-xl font-normal text-ink">
                              {plan.title}
                            </h3>
                            <a
                              href={plan.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium text-bronze transition-colors hover:text-bronze-dark"
                            >
                              {copy.originalPlan} →
                            </a>
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-muted">
                            {zh
                              ? "官方公开户型图缩略展示；面积、朝向、物业费和税费仍需按具体单元复核。"
                              : "Official floor-plan preview; area, exposure, common charges, and taxes still require unit-level verification."}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 border border-line bg-paper p-6">
                    <p className="text-sm leading-relaxed text-muted">
                      {copy.floorPlanPending}
                    </p>
                  </div>
                )}
              </section>

              <div className="mt-6 divide-y divide-line/80 sm:hidden">
                {building.priceBands.map((band) => (
                  <div key={`${band.layout}-mobile`} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-ink">{band.layout}</p>
                      <p className="text-right text-ink/85">{band.price}</p>
                    </div>
                    <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <dt className="uppercase tracking-[0.12em] text-muted">
                          {copy.availability}
                        </dt>
                        <dd className="mt-1 text-ink/75">{band.availability}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.12em] text-muted">
                          {copy.commonCharges}
                        </dt>
                        <dd className="mt-1 text-ink/75">{copy.unitLevel}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.12em] text-muted">
                          {copy.taxes}
                        </dt>
                        <dd className="mt-1 text-ink/75">{copy.unitLevel}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>

              <div className="mt-6 hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
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
                    {building.priceBands.map((band) => (
                      <tr key={band.layout}>
                        <td className="py-3 pr-4 font-medium text-ink">{band.layout}</td>
                        <td className="py-3 pr-4 text-ink/85">{band.price}</td>
                        <td className="py-3 pr-4 text-muted">{band.availability}</td>
                        <td className="py-3 pr-4 text-muted">{copy.unitLevel}</td>
                        <td className="py-3 text-muted">{copy.unitLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-14 overflow-hidden rounded-sm bg-ink p-7 text-paper sm:p-9">
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
          </article>
        </div>
      </Container>
    </>
  );
}
