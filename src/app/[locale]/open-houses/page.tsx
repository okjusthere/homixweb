import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ListingAttribution } from "@/components/listings/ListingAttribution";
import { MlsDisclaimer } from "@/components/listings/MlsDisclaimer";
import { getAgents } from "@/lib/agents";
import { formatBaths, formatNumber, formatPrice } from "@/lib/format";
import { getRouteLocale, getT, type Locale } from "@/lib/i18n";
import { formatOpenHouseDisplay, type OpenHouseDisplay } from "@/lib/listing-display";
import {
  listings,
  type Agent,
  type UpcomingOpenHouseEvent,
} from "@/lib/listings";
import { localizePath } from "@/lib/locale";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/open-houses",
    locale,
    title: {
      en: "Upcoming Open Houses in New York",
      zh: "Homix 本周开放日｜纽约近期 Open House",
    },
    description: {
      en: "See upcoming public Open Houses for homes represented by Homix across New York, with current dates and times supplied by OneKey MLS.",
      zh: "查看 Homix 在纽约代理房源的近期公开开放日，包括最新日期、时间、价格与挂牌经纪人信息。",
    },
  });
}

type DisplayEvent = UpcomingOpenHouseEvent & { display: OpenHouseDisplay };

function displayEvents(
  events: UpcomingOpenHouseEvent[],
  locale: Locale,
): DisplayEvent[] {
  return events.flatMap((event) => {
    const display = formatOpenHouseDisplay(event.openHouse, locale);
    return display ? [{ ...event, display }] : [];
  });
}

function groupByDate(events: DisplayEvent[]) {
  const groups = new Map<string, DisplayEvent[]>();
  for (const event of events) {
    const current = groups.get(event.display.dateKey) ?? [];
    current.push(event);
    groups.set(event.display.dateKey, current);
  }
  return Array.from(groups.entries()).map(([dateKey, items]) => ({ dateKey, items }));
}

function updatedLabel(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function OpenHousesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const [{ t }, result, agents] = await Promise.all([
    getT(locale),
    listings.getUpcomingOpenHouses({ limit: 60, horizonDays: 30 }),
    getAgents(),
  ]);
  const events = displayEvents(result.events, locale);
  const groups = groupByDate(events);
  const agentsByMlsId = new Map(
    agents
      .filter((agent) => agent.mlsId)
      .map((agent) => [agent.mlsId!.trim().toUpperCase(), agent]),
  );

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.openHouses.title,
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${event.listing.address.street} - ${event.display.date} ${event.display.time}`,
      url: absUrl(localizePath(locale, `/listings/${event.listing.slug}`)),
    })),
  };

  return (
    <Container className="py-14 sm:py-20">
      <header className="grid gap-8 border-b border-line pb-10 sm:pb-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.55fr)] lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Eyebrow>{t.openHouses.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-tight text-ink sm:text-6xl">
            {t.openHouses.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {t.openHouses.lead}
          </p>
        </div>
        <div className="lg:text-right">
          <p className="text-sm leading-relaxed text-muted">
            {t.openHouses.scheduleNote}
          </p>
          {result.dataAsOf && !result.unavailable && (
            <p className="mt-3 text-xs text-muted">
              {t.openHouses.updated} {updatedLabel(result.dataAsOf, locale)}
            </p>
          )}
        </div>
      </header>

      {result.unavailable ? (
        <ScheduleState
          title={t.openHouses.unavailableTitle}
          body={t.openHouses.unavailableBody}
          browseLabel={t.openHouses.browseListings}
          contactLabel={t.openHouses.contact}
        />
      ) : events.length === 0 ? (
        <ScheduleState
          title={t.openHouses.emptyTitle}
          body={t.openHouses.emptyBody}
          browseLabel={t.openHouses.browseListings}
          contactLabel={t.openHouses.contact}
        />
      ) : (
        <div>
          {groups.map((group) => (
            <section
              key={group.dateKey}
              aria-labelledby={`open-house-${group.dateKey}`}
              className="grid border-b border-line py-10 sm:py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12"
            >
              <div className="mb-7 lg:mb-0">
                <p className="text-sm text-bronze">{group.items[0].display.weekday}</p>
                <h2
                  id={`open-house-${group.dateKey}`}
                  className="mt-1 font-serif text-3xl font-normal text-ink"
                >
                  {group.items[0].display.date}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {group.items.length} {locale === "zh" ? "场开放日" : group.items.length === 1 ? "Open House" : "Open Houses"}
                </p>
              </div>

              <ol className="divide-y divide-line border-t border-line lg:border-t-0">
                {group.items.map((event) => {
                  const agent = agentsByMlsId.get(
                    event.listing.listingAgentId.trim().toUpperCase(),
                  );
                  return (
                    <li key={event.openHouse.id} className="py-7 first:lg:pt-0">
                      <OpenHouseRow event={event} agent={agent} locale={locale} />
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}

      <div className="mt-14 border-t border-line pt-8">
        <MlsDisclaimer syncedAt={result.dataAsOf} />
      </div>

      {events.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListLd) }}
        />
      )}
    </Container>
  );
}

function OpenHouseRow({
  event,
  agent,
  locale,
}: {
  event: DisplayEvent;
  agent?: Agent;
  locale: Locale;
}) {
  const { listing, openHouse, display } = event;
  const photo = listing.photos[0];
  const zh = locale === "zh";
  const locality = [listing.address.city, listing.address.state]
    .filter(Boolean)
    .join(", ");
  const localityWithPostalCode = [locality, listing.address.postalCode]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start lg:grid-cols-[220px_minmax(0,1fr)_auto]">
      <Link
        href={`/listings/${listing.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-line/50"
      >
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt ?? listing.address.full}
            fill
            sizes="(max-width: 640px) 100vw, 220px"
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full items-center justify-center bg-surface text-xs uppercase text-muted">
            Homix
          </span>
        )}
      </Link>

      <div className="min-w-0">
        <time dateTime={openHouse.startsAt} className="text-sm font-medium text-bronze">
          {display.time}
        </time>
        <h3 className="mt-2 font-serif text-2xl font-normal leading-snug text-ink">
          <Link
            href={`/listings/${listing.slug}`}
            className="transition-colors hover:text-bronze"
          >
            {listing.address.street}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{localityWithPostalCode}</p>
        <p className="mt-3 text-sm text-muted">
          {listing.beds || "—"} BD · {listing.baths > 0 ? formatBaths(listing.baths, listing.halfBaths) : "—"} BA
          {listing.sqft > 0 ? ` · ${formatNumber(listing.sqft)} SF` : ""}
        </p>
        {agent ? (
          <Link
            href={`/agents/${agent.slug}`}
            className="mt-4 inline-flex text-sm text-ink transition-colors hover:text-bronze"
          >
            {zh ? "挂牌顾问" : "Listing advisor"} · {agent.name}
          </Link>
        ) : listing.listAgentName ? (
          <p className="mt-4 text-sm text-muted">
            {zh ? "挂牌顾问" : "Listing advisor"} · {listing.listAgentName}
          </p>
        ) : null}
        <ListingAttribution text={listing.attribution} className="mt-3" />
      </div>

      <div className="flex items-end justify-between gap-5 sm:col-start-2 lg:col-start-auto lg:block lg:min-w-[150px] lg:text-right">
        <p className="font-serif text-xl tabular-nums text-ink sm:text-2xl">
          {listing.listPrice > 0
            ? formatPrice(listing.listPrice)
            : zh
              ? "价格面议"
              : "Price upon request"}
        </p>
        <Link
          href={`/listings/${listing.slug}`}
          className="mt-4 inline-flex text-sm font-medium text-bronze hover:underline"
        >
          {zh ? "查看房源" : "View home"} →
        </Link>
      </div>
    </article>
  );
}

function ScheduleState({
  title,
  body,
  browseLabel,
  contactLabel,
}: {
  title: string;
  body: string;
  browseLabel: string;
  contactLabel: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <h2 className="max-w-2xl font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{body}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/listings">{browseLabel}</Button>
        <Button href="/contact" variant="outline">
          {contactLabel}
        </Button>
      </div>
    </section>
  );
}
