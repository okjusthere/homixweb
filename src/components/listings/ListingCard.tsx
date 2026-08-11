import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { cn } from "@/lib/cn";
import { formatBaths, formatNumber, formatPrice } from "@/lib/format";
import { formatOpenHouseRange, listingStatusLabel } from "@/lib/listing-display";
import type { Locale } from "@/lib/i18n";
import type { Agent, Listing } from "@/lib/listings";
import { ListingAttribution } from "./ListingAttribution";
import { ListingMediaImage } from "./ListingMediaImage";

function displayPrice(value: number, locale: Locale): string {
  if (value > 0) return formatPrice(value);
  return locale === "zh" ? "价格面议" : "Price upon request";
}

/** Editorial, image-led listing card. No shadow: hairline and image motion only. */
export function ListingCard({
  listing,
  agent,
  locale = "en",
  priority = false,
  showAgent = true,
  className,
}: {
  listing: Listing;
  agent?: Agent;
  locale?: Locale;
  priority?: boolean;
  showAgent?: boolean;
  className?: string;
}) {
  const { address, listPrice, beds, baths, halfBaths, sqft, photos, status } = listing;
  const nextOpenHouse = listing.openHouses?.[0]
    ? formatOpenHouseRange(listing.openHouses[0], locale)
    : null;
  const zh = locale === "zh";

  return (
    <article className={cn("group", className)}>
      <Link href={`/listings/${listing.slug}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-line/50">
          <ListingMediaImage
            photos={photos}
            alt={address.full}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            preload={priority}
          />
          {status !== "Active" && (
            <span className="absolute left-3 top-3 rounded-sm bg-surface/95 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink">
              {listingStatusLabel(status, locale)}
            </span>
          )}
        </div>

        <div className="pt-4">
          {nextOpenHouse && (
            <p className="mb-3 border-l-2 border-bronze pl-3 text-xs leading-relaxed text-ink">
              <span className="font-medium uppercase tracking-[0.12em] text-bronze">
                {zh ? "开放日" : "Open house"}
              </span>
              <span className="ml-2 text-muted">
                {nextOpenHouse.date} · {nextOpenHouse.time}
              </span>
            </p>
          )}
          {address.neighborhood && <p className="eyebrow mb-2">{address.neighborhood}</p>}
          {status === "Sold" && (
            <p className="mb-1 text-xs uppercase tracking-[0.12em] text-muted">
              {zh ? "成交价" : "Sold for"}
            </p>
          )}
          <p className="font-serif text-2xl leading-none tabular-nums text-ink">
            {displayPrice(listPrice, locale)}
          </p>
          <p className="mt-2.5 text-sm text-ink/90 underline-offset-4 transition-colors group-hover:text-bronze group-hover:underline">
            {address.street}
          </p>
          <p className="mt-1 text-sm text-muted">
            {beds || "—"} BD · {baths > 0 ? formatBaths(baths, halfBaths) : "—"} BA
            {sqft > 0 ? ` · ${formatNumber(sqft)} SF` : ""}
          </p>
          <ListingAttribution text={listing.attribution} className="mt-3" />
        </div>
      </Link>

      {showAgent && agent ? (
        <Link
          href={`/agents/${agent.slug}`}
          className="mt-4 flex items-center gap-3 border-t border-line pt-4 text-sm focus-visible:outline-none"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-line/60">
            <Image
              src={agent.photo}
              alt=""
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.12em] text-muted">
              {zh ? "挂牌顾问" : "Listing advisor"}
            </span>
            <span className="block truncate font-medium text-ink transition-colors hover:text-bronze">
              {agent.name}
            </span>
          </span>
        </Link>
      ) : showAgent && listing.listAgentName ? (
        <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
          {zh ? "挂牌顾问" : "Listing advisor"} · {listing.listAgentName}
        </p>
      ) : null}
    </article>
  );
}
