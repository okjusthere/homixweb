import type { Metadata } from "next";
import Image from "next/image";
import { SellerValuationForm } from "@/components/forms/SellerValuationForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { sellPageCopy } from "@/content/sell";
import { getRouteLocale, getT } from "@/lib/i18n";
import { SITE_MEDIA_ROOT } from "@/lib/media";
import { absUrl, breadcrumbLd, faqLd, jsonLd, pageMetadata } from "@/lib/seo";
import { heroImage, siteConfig } from "@/lib/site";

const SELL_MEDIA_ROOT = `${SITE_MEDIA_ROOT}/sell`;
const SOCIAL_EXAMPLES = `${SELL_MEDIA_ROOT}/social-channel-examples.jpg`;
const PRODUCTION_EXAMPLES = `${SELL_MEDIA_ROOT}/production-package-examples.jpg`;
const TEAM_IMAGE = `${SITE_MEDIA_ROOT}/about/team.jpg`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const content = sellPageCopy[locale];
  return pageMetadata({
    path: "/sell",
    locale,
    title: content.meta.title,
    description: content.meta.description,
    image: heroImage.src,
  });
}

function n2(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const content = sellPageCopy[locale];
  const { t } = await getT(locale);
  const { phone, phoneHref, offices } = siteConfig.contact;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "zh"
        ? "纽约住宅卖方代理与房源营销"
        : "New York residential seller representation and listing marketing",
    serviceType: "Residential real estate seller representation",
    description: content.meta.description,
    url: absUrl(locale === "zh" ? "/zh/sell" : "/sell"),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "New York City" },
      { "@type": "AdministrativeArea", name: "Long Island, New York" },
    ],
    availableLanguage: ["English", "Chinese"],
  };

  return (
    <>
      <section className="relative h-[78svh] min-h-[610px] max-h-[900px] w-full overflow-hidden bg-ink text-paper before:absolute before:inset-x-0 before:-top-64 before:h-64 before:bg-ink">
        <Image
          src={heroImage.src}
          alt={content.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/65" aria-hidden="true" />
        <Container className="relative flex h-full items-end pb-14 pt-28 sm:pb-20">
          <div className="max-w-4xl">
            <Eyebrow className="text-paper/70">{content.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.04] text-paper sm:text-[4rem]">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              {content.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#valuation" onDark>
                {content.hero.primary}
              </Button>
              <Button href="#campaign" variant="outline" onDark>
                {content.hero.secondary}
              </Button>
              <Button href={phoneHref} variant="ghost" onDark>
                {t.sell.orCall} {phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface py-12 text-ink sm:py-16">
        <Container>
          <Eyebrow>{content.proof.eyebrow}</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {content.proof.items.map((item, index) => (
              <Reveal key={item.label} delay={index * 60}>
                <p className="font-serif text-2xl leading-tight text-ink sm:text-[2rem]">
                  {item.value}
                </p>
                <p className="mt-2 max-w-56 text-xs font-medium uppercase leading-relaxed text-muted">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <Eyebrow>{content.premise.eyebrow}</Eyebrow>
            </div>
            <div>
              <h2 className="max-w-4xl font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.9rem]">
                {content.premise.title}
              </h2>
              <div className="mt-7 grid gap-6 text-lg leading-relaxed text-muted md:grid-cols-2 md:gap-10">
                {content.premise.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-10 max-w-4xl border-l-2 border-bronze pl-6 font-serif text-2xl leading-snug text-ink sm:text-[2rem]">
                {content.premise.statement}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <Eyebrow>{content.media.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
                {content.media.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.media.lead}</p>
            </div>
            <Reveal>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-paper">
                  <Image
                    src={SOCIAL_EXAMPLES}
                    alt={content.media.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                  {content.media.imageCaption}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {content.media.channels.map((channel) => {
              const href = channel.hrefKey ? siteConfig.social[channel.hrefKey] : null;
              const body = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-medium uppercase text-bronze">{channel.name}</p>
                    {href && (
                      <span className="text-sm text-bronze" aria-hidden>
                        ↗
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif text-xl leading-snug text-ink">{channel.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{channel.body}</p>
                </>
              );

              return href ? (
                <a
                  key={channel.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line py-7 transition-colors hover:bg-paper sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={channel.name}
                  className="border-b border-line py-7 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  {body}
                </div>
              );
            })}
          </div>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-muted">{content.media.note}</p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface">
                <Image
                  src={PRODUCTION_EXAMPLES}
                  alt={content.production.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-contain"
                />
              </div>
            </Reveal>
            <div>
              <Eyebrow>{content.production.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
                {content.production.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.production.lead}</p>
              <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {content.production.items.map((item, index) => (
                  <div key={item.title} className="border-t border-line py-5">
                    <p className="text-xs text-bronze">{n2(index)}</p>
                    <h3 className="mt-2 font-serif text-lg text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-l border-bronze/60 pl-4 text-xs leading-relaxed text-muted">
                {content.production.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="text-paper/60">{content.distribution.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight sm:text-[2.8rem]">
              {content.distribution.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/70">{content.distribution.lead}</p>
          </div>
          <div className="mt-12 grid border-y border-paper/20 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-paper/20">
            {content.distribution.lanes.map((lane, index) => (
              <Reveal
                key={lane.label}
                delay={index * 60}
                className="border-b border-paper/20 py-8 last:border-b-0 md:odd:pr-8 md:even:pl-8 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-xs font-medium uppercase text-bronze">{lane.label}</p>
                  <p className="font-serif text-lg text-paper/40">{n2(index)}</p>
                </div>
                <h3 className="mt-5 font-serif text-xl leading-snug text-paper">{lane.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{lane.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="campaign" className="scroll-mt-20 border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <Eyebrow>{content.campaign.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
                {content.campaign.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.campaign.lead}</p>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {content.campaign.steps.map((step, index) => (
                <Reveal key={step.title} delay={(index % 3) * 60}>
                  <article className="border-t border-line py-6">
                    <p className="font-serif text-2xl text-bronze">{n2(index)}</p>
                    <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-14">
              <Eyebrow>{content.sellerView.eyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-xl font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.sellerView.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {content.sellerView.lead}
              </p>
              <div className="mt-8">
                {content.sellerView.items.map((item, index) => (
                  <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line py-5">
                    <span className="font-serif text-lg text-bronze">{n2(index)}</span>
                    <div>
                      <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <Eyebrow>{content.pricing.eyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-xl font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.6rem]">
                {content.pricing.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{content.pricing.lead}</p>
              <ul className="mt-8 border-t border-line">
                {content.pricing.factors.map((factor, index) => (
                  <li key={factor} className="flex gap-4 border-b border-line py-4 text-sm leading-relaxed text-ink">
                    <span className="font-serif text-bronze">{n2(index)}</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-2 border-bronze pl-5 font-serif text-xl leading-snug text-ink">
                {content.pricing.statement}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={TEAM_IMAGE}
                  alt={content.team.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
            <div>
              <Eyebrow>{content.team.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
                {content.team.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{content.team.lead}</p>
              <div className="mt-9 border-t border-line">
                {offices.map((office) => (
                  <div key={office.key} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-baseline sm:gap-6">
                    <div>
                      <p className="text-xs uppercase text-bronze">{content.team.officeLabel}</p>
                      <h3 className="mt-2 font-serif text-lg text-ink">{office.label[locale]}</h3>
                    </div>
                    <div className="text-sm leading-relaxed text-muted">
                      <p>{office.market[locale]}</p>
                      <p>
                        {office.line1}, {office.city}, {office.state} {office.zip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="valuation" className="scroll-mt-20 bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow className="text-paper/70">{t.sell.valuationEyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-xl font-serif text-3xl font-normal leading-tight sm:text-[2.8rem]">
                {t.sell.valuationTitle}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
                {t.sell.valuationLead}
              </p>
              <div className="mt-10">
                {t.sell.valuationDeliverables.map((item, index) => (
                  <Reveal key={item.title} delay={index * 60} className="border-t border-paper/20 py-5">
                    <div className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-serif text-lg text-bronze">{n2(index)}</span>
                      <div>
                        <h3 className="font-serif text-lg text-paper">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-paper/65">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-paper/70">
                {t.sell.valuationAssurances.map((item) => (
                  <span key={item} className="border-l border-bronze pl-3">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-7 max-w-lg text-xs leading-relaxed text-paper/50">
                {t.sell.valuationNotice}
              </p>
              <p className="mt-7 text-sm text-paper/75">
                {t.sell.orCall}{" "}
                <a className="text-paper underline decoration-bronze underline-offset-4" href={phoneHref}>
                  {phone}
                </a>
              </p>
            </div>
            <div className="self-start rounded-sm bg-surface p-6 text-ink sm:p-9">
              <SellerValuationForm labels={t.sell.valuationForm} locale={locale} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{content.faq.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.7rem]">
              {content.faq.title}
            </h2>
          </div>
          <div className="mt-12 border-t border-line">
            {content.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left marker:content-none">
                  <span className="font-serif text-lg leading-snug text-ink">{item.q}</span>
                  <span className="mt-0.5 shrink-0 text-xl font-light text-bronze transition-transform duration-200 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-base leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <div className="max-w-3xl">
              <Eyebrow>{content.closing.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.8rem]">
                {content.closing.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{content.closing.lead}</p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button href="#valuation">{content.closing.primary}</Button>
              <Button href={phoneHref} variant="outline">
                {content.closing.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqLd(content.faq.items.map((item) => ({ question: item.q, answer: item.a }))),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd(
              [
                { name: locale === "zh" ? "首页" : "Home", path: "/" },
                { name: locale === "zh" ? "卖房" : "Sell", path: "/sell" },
              ],
              locale,
            ),
          ),
        }}
      />
    </>
  );
}
