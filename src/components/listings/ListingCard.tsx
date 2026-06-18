import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatBaths, formatNumber, formatPrice } from "@/lib/format";
import type { Listing } from "@/lib/listings";
import { ListingAttribution } from "./ListingAttribution";

/** Editorial, image-led listing card. No shadow — hairline + hover scale only. */
export function ListingCard({
  listing,
  priority = false,
  className,
}: {
  listing: Listing;
  priority?: boolean;
  className?: string;
}) {
  const { address, listPrice, beds, baths, halfBaths, sqft, photos, status } =
    listing;
  const photo = photos[0];

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={cn("group block focus-visible:outline-none", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-line/50">
        <Image
          src={photo.url}
          alt={photo.alt ?? address.full}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
        {status !== "Active" && (
          <span className="absolute left-3 top-3 rounded-sm bg-surface/95 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink">
            {status}
          </span>
        )}
      </div>

      <div className="pt-4">
        {address.neighborhood && (
          <p className="eyebrow mb-2">{address.neighborhood}</p>
        )}
        <p className="font-serif text-[1.6rem] leading-none tabular-nums text-ink">
          {formatPrice(listPrice)}
        </p>
        <p className="mt-2.5 text-[15px] text-ink/90 underline-offset-4 transition-colors group-hover:text-bronze group-hover:underline">
          {address.street}
        </p>
        <p className="mt-1 text-sm text-muted">
          {beds} BD · {formatBaths(baths, halfBaths)} BA ·{" "}
          {formatNumber(sqft)} SF
        </p>
        <ListingAttribution text={listing.attribution} className="mt-3" />
      </div>
    </Link>
  );
}
