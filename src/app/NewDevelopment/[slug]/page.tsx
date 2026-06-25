import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { featuredDevelopments } from "@/data/featured-developments";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import {
  buyerFit,
  developmentIntro,
  editorialAngles,
  formatProjectScale,
  getDevelopment,
  getDevelopmentImages,
  newDevelopmentBasePath,
  priceLead,
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
    openGraph: {
      type: "article",
      images: [getDevelopmentImages(building, 1)[0].src],
    },
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
  const images = getDevelopmentImages(building, 5);
  const angles = editorialAngles(building, locale);

  const copy = {
    back: zh ? "全部新盘" : "All new developments",
    overview: zh ? "项目背景" : "Project Background",
    why: zh ? "为什么值得看" : "Why It Matters",
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
    gallery: zh ? "看图库 / 户型图" : "Photos / Floor Plans",
    official: zh ? "项目官网" : "Official Site",
    call: zh ? "联系 Homix 看房" : "Talk to Homix",
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
      <section className="relative min-h-[72vh] overflow-hidden bg-ink">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.74]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/34 to-ink/10" />
        <Container className="relative flex min-h-[72vh] flex-col justify-between pb-12 pt-8 sm:pb-16">
          <Link
            href={newDevelopmentBasePath}
            className="w-fit text-sm text-paper/78 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            ← {copy.back}
          </Link>

          <div className="max-w-4xl text-paper">
            <p className="eyebrow text-paper/70">{building.area}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-tight sm:text-7xl">
              {building.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/82">
              {formatProjectScale(building, locale)} · {priceLead(building)}
            </p>
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
              <Button href={building.sourceUrl} variant="outline">
                {copy.gallery}
              </Button>
              {building.officialUrl && (
                <Button href={building.officialUrl} variant="ghost">
                  {copy.official} →
                </Button>
              )}
            </div>
          </aside>

          <article>
            <section>
              <Eyebrow>{copy.overview}</Eyebrow>
              <p className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.25rem]">
                {developmentIntro(building, locale)}
              </p>
            </section>

            <section className="mt-12 grid gap-4 sm:grid-cols-3">
              {images.slice(1, 4).map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </section>

            <section className="mt-14">
              <Eyebrow>{copy.why}</Eyebrow>
              <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
                {angles.map((angle) => (
                  <div key={angle.title} className="bg-surface p-6">
                    <h2 className="font-serif text-xl font-normal text-ink">{angle.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{angle.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <Eyebrow>{copy.fit}</Eyebrow>
                <p className="mt-4 text-lg leading-relaxed text-ink/84">
                  {buyerFit(building, locale)}
                </p>
              </div>
              <div>
                <Eyebrow>{copy.location}</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-muted">{building.transit}</p>
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
