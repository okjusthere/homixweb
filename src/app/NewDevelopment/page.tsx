import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { featuredDevelopments } from "@/data/featured-developments";
import { getDevelopmentCover } from "@/data/new-development-media";
import { getT } from "@/lib/i18n";
import {
  formatProjectScale,
  newDevelopmentHref,
  priceLead,
} from "@/lib/new-developments";

export const metadata: Metadata = {
  title: "New Development",
  description:
    "A curated Homix guide to New York new development condos, with individual project pages for client sharing.",
};

export default async function NewDevelopmentPage() {
  const { locale } = await getT();
  const zh = locale === "zh";

  const copy = {
    eyebrow: zh ? "New Development" : "New Development",
    title: zh ? "纽约新盘精选" : "New York New Development",
    lead: zh
      ? "把值得看的新盘单独整理成项目页，方便发给客户，也方便快速比较地段、楼宇背景、户型和预算。"
      : "Shareable project pages for the New York new developments Homix buyers ask about most.",
    cta: zh ? "查看第一个项目" : "Open first project",
    all: zh ? "全部项目" : "All Projects",
    view: zh ? "查看项目" : "View Project",
    starting: zh ? "参考价格" : "From",
    mediaPending: zh ? "官方图片待核验" : "Official media pending",
  };

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-surface">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-tight text-ink sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{copy.lead}</p>
            <div className="mt-8">
              <Button href={newDevelopmentHref(featuredDevelopments[0].slug)}>
                {copy.cta} →
              </Button>
            </div>
          </div>
          <div className="relative border border-line bg-paper p-5 sm:p-7">
            <div className="flex items-start justify-between gap-6 border-b border-line pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">Homix Desk</p>
                <p className="mt-2 font-serif text-3xl leading-tight text-ink">
                  {featuredDevelopments.length} {zh ? "个新盘项目" : "New Development Projects"}
                </p>
              </div>
              <p className="text-right text-sm leading-relaxed text-muted">
                Manhattan
                <br />
                Long Island City
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px bg-line">
              {featuredDevelopments.slice(0, 8).map((building) => (
                <div key={building.slug} className="bg-surface p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-bronze">
                    {building.area}
                  </p>
                  <p className="mt-2 min-h-12 font-serif text-lg leading-tight text-ink">
                    {building.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line pb-5">
          <div>
            <Eyebrow>{copy.all}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-ink sm:text-[2.4rem]">
              {featuredDevelopments.length} {zh ? "个可分享项目页" : "shareable project pages"}
            </h2>
          </div>
          <p className="text-sm text-muted">Manhattan · Long Island City</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDevelopments.map((building, index) => {
            const cover = getDevelopmentCover(building.slug);

            return (
              <Reveal key={building.slug} delay={(index % 6) * 45}>
                <Link
                  href={newDevelopmentHref(building.slug)}
                  className="group block h-full focus-visible:outline-none"
                >
                  <article className="flex h-full flex-col border border-line bg-surface transition-colors group-hover:border-bronze/50">
                    {cover && (
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                        <Image
                          src={cover.src}
                          alt={`${building.name} ${cover.alt}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    {!cover && (
                      <div className="flex aspect-[16/10] items-center justify-center border-b border-line bg-paper px-5 text-center">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                          {copy.mediaPending}
                        </p>
                      </div>
                    )}
                    <div className="border-b border-line p-5">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-bronze">
                          {building.area}
                        </p>
                        <p className="text-xs text-muted">{building.borough}</p>
                      </div>
                      <h3 className="mt-8 min-h-20 font-serif text-3xl font-normal leading-tight text-ink">
                        {building.name}
                      </h3>
                      <div className="mt-6 grid grid-cols-3 gap-px bg-line">
                        {[building.facts.stories, building.facts.units, building.facts.built].map(
                          (value, i) => (
                            <div key={`${building.slug}-${i}`} className="bg-paper p-3 text-center">
                              <p className="text-lg font-medium text-ink">{value}</p>
                              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                                {i === 0 ? (zh ? "楼层" : "Stories") : i === 1 ? (zh ? "户数" : "Units") : (zh ? "年份" : "Year")}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm leading-relaxed text-muted">
                        {formatProjectScale(building, locale)}
                      </p>
                      <p className="mt-4 text-base font-medium text-ink">
                        {copy.starting} · {priceLead(building)}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {building.address}
                      </p>
                      <span className="mt-6 inline-flex text-sm font-medium text-bronze transition-colors group-hover:text-bronze-dark">
                        {copy.view} →
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </>
  );
}
