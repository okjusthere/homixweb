import Link from "@/components/ui/LocalizedLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatBaths, formatPriceCompact } from "@/lib/format";
import { getT, type Locale } from "@/lib/i18n";
import { formatOpenHouseDisplay } from "@/lib/listing-display";
import { listings } from "@/lib/listings";

export async function UpcomingOpenHouses({ locale }: { locale: Locale }) {
  const [{ t }, result] = await Promise.all([
    getT(locale),
    listings.getUpcomingOpenHouses({ limit: 3, horizonDays: 30 }),
  ]);
  if (result.unavailable || result.events.length === 0) return null;

  const events = result.events.flatMap((event) => {
    const display = formatOpenHouseDisplay(event.openHouse, locale);
    return display ? [{ ...event, display }] : [];
  });
  if (events.length === 0) return null;

  return (
    <section className="border-y border-line bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <Eyebrow>{t.openHouses.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.4rem]">
              {t.openHouses.title}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-xl text-base leading-relaxed text-muted">
              {t.openHouses.lead}
            </p>
            <Button href="/open-houses" variant="ghost" className="hidden shrink-0 sm:inline-flex">
              {t.openHouses.viewAll} →
            </Button>
          </div>
        </div>

        <ol className="mt-10 border-t border-line">
          {events.map(({ openHouse, listing, display }) => (
            <li key={openHouse.id} className="border-b border-line">
              <Link
                href={`/listings/${listing.slug}`}
                className="group grid min-h-[112px] grid-cols-[64px_minmax(0,1fr)] gap-5 py-6 sm:grid-cols-[76px_minmax(0,1fr)_auto] sm:items-center sm:gap-7"
              >
                <time dateTime={openHouse.startsAt} className="border-r border-line pr-5 text-center">
                  <span className="block text-[10px] font-medium uppercase text-bronze">
                    {display.month}
                  </span>
                  <span className="mt-1 block font-serif text-3xl leading-none tabular-nums text-ink">
                    {display.day}
                  </span>
                  <span className="mt-1.5 block text-[10px] uppercase text-muted">
                    {display.weekday}
                  </span>
                </time>

                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-normal leading-snug text-ink transition-colors group-hover:text-bronze sm:text-2xl">
                    {listing.address.street}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">
                    {[listing.address.city, listing.address.state].filter(Boolean).join(", ")}
                    {listing.beds > 0 ? ` · ${listing.beds} BD` : ""}
                    {listing.baths > 0
                      ? ` · ${formatBaths(listing.baths, listing.halfBaths)} BA`
                      : ""}
                  </p>
                  {listing.listAgentName && (
                    <p className="mt-2 text-xs text-muted">
                      {t.openHouses.listingAdvisor} · {listing.listAgentName}
                    </p>
                  )}
                  <div className="mt-3 sm:hidden">
                    <p className="text-sm font-medium text-ink">{display.time}</p>
                    {listing.listPrice > 0 && (
                      <p className="mt-1 font-serif text-lg tabular-nums text-ink">
                        {formatPriceCompact(listing.listPrice)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden min-w-[168px] text-right sm:block">
                  <p className="text-sm font-medium text-ink">{display.time}</p>
                  {listing.listPrice > 0 && (
                    <p className="mt-2 font-serif text-xl tabular-nums text-ink">
                      {formatPriceCompact(listing.listPrice)}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-8 sm:hidden">
          <Button href="/open-houses" variant="outline" className="w-full">
            {t.openHouses.viewAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
