import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { featuredDevelopments } from "@/data/featured-developments";
import { getT } from "@/lib/i18n";
import {
  formatProjectScale,
  getDevelopmentImages,
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
  const hero = getDevelopmentImages(featuredDevelopments[0], 1)[0];

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
  };

  return (
    <>
      <section className="relative min-h-[62vh] overflow-hidden bg-ink">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.72]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
        <Container className="relative flex min-h-[62vh] items-end pb-12 pt-24 sm:pb-16">
          <div className="max-w-3xl text-paper">
            <p className="eyebrow text-paper/70">{copy.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-tight sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/82">
              {copy.lead}
            </p>
            <div className="mt-8">
              <Button href={newDevelopmentHref(featuredDevelopments[0].slug)} onDark>
                {copy.cta} →
              </Button>
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
            const image = getDevelopmentImages(building, 1)[0];
            return (
              <Reveal key={building.slug} delay={(index % 6) * 45}>
                <Link
                  href={newDevelopmentHref(building.slug)}
                  className="group block h-full focus-visible:outline-none"
                >
                  <article className="flex h-full flex-col border border-line bg-surface">
                    <div className="relative aspect-[4/5] overflow-hidden bg-line">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/12 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                        <p className="text-xs uppercase tracking-[0.14em] text-paper/70">
                          {building.area}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl leading-tight">
                          {building.name}
                        </h3>
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
