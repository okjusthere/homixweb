import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingAttribution } from "@/components/listings/ListingAttribution";
import { MlsDisclaimer } from "@/components/listings/MlsDisclaimer";
import { listings } from "@/lib/listings";
import { formatBaths, formatNumber, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await listings.getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };
  return {
    title: `${listing.address.street} — ${formatPrice(listing.listPrice)}`,
    description: listing.description.slice(0, 155),
    // IDX detail pages: keep out of the index unless OneKey's license permits it.
    robots: { index: false, follow: true },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await listings.getListingBySlug(slug);
  if (!listing) notFound();

  const { address, listPrice, beds, baths, halfBaths, sqft, status } = listing;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.full)}`;

  const specs: { label: string; value: string }[] = [
    { label: "Price", value: formatPrice(listPrice) },
    { label: "Type", value: listing.propertyType },
    { label: "Status", value: status },
    { label: "Bedrooms", value: String(beds) },
    { label: "Bathrooms", value: formatBaths(baths, halfBaths) },
    { label: "Interior", value: sqft ? `${formatNumber(sqft)} sq ft` : "—" },
    ...(listing.lotSqft
      ? [{ label: "Lot", value: `${formatNumber(listing.lotSqft)} sq ft` }]
      : []),
    ...(listing.yearBuilt
      ? [{ label: "Year built", value: String(listing.yearBuilt) }]
      : []),
    ...(listing.schoolDistrict
      ? [{ label: "School district", value: listing.schoolDistrict }]
      : []),
    ...(listing.county ? [{ label: "County", value: listing.county }] : []),
    { label: "MLS #", value: listing.mlsNumber },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: address.full,
    description: listing.description,
    image: listing.photos.slice(0, 5).map((p) => p.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "US",
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/listings"
        className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
      >
        ← All listings
      </Link>

      <div className="mt-6">
        <ListingGallery photos={listing.photos} alt={address.full} />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.7fr_1fr]">
        {/* Main column */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              {address.neighborhood && (
                <p className="eyebrow mb-2">
                  {address.neighborhood}, {address.state}
                </p>
              )}
              <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-4xl">
                {address.street}
              </h1>
              <p className="mt-1 text-muted">
                {address.city}, {address.state} {address.postalCode}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-serif text-3xl tabular-nums text-ink">
                {formatPrice(listPrice)}
              </p>
              <Link
                href="/calculator"
                className="mt-1 inline-block text-sm text-bronze underline-offset-4 hover:underline"
              >
                Estimate monthly payment →
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink">
            <span>{beds} Bedrooms</span>
            <span>{formatBaths(baths, halfBaths)} Bathrooms</span>
            {sqft > 0 && <span>{formatNumber(sqft)} sq ft</span>}
            {listing.daysOnMarket != null && (
              <span className="text-muted">{listing.daysOnMarket} days on market</span>
            )}
          </div>

          {listing.description && (
            <div className="mt-8">
              <h2 className="eyebrow">About this home</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/85">
                {listing.description}
              </p>
            </div>
          )}

          {/* Spec sheet */}
          <div className="mt-10">
            <h2 className="eyebrow">The details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-surface p-4">
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bronze underline-offset-4 hover:underline"
            >
              View on map →
            </a>
          </div>

          <div className="mt-10 border-t border-line pt-5">
            <ListingAttribution text={listing.attribution} />
          </div>
        </div>

        {/* Inquiry sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-line bg-surface p-6 sm:p-7">
            <p className="font-serif text-xl text-ink">Request a private showing</p>
            <p className="mt-2 text-sm text-muted">
              A Homix advisor will follow up promptly — no pressure, no obligation.
            </p>
            <div className="mt-5">
              <InquiryForm />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
              Or call{" "}
              <a className="text-ink hover:text-bronze" href={siteConfig.contact.phoneHref}>
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-16 border-t border-line pt-8">
        <MlsDisclaimer syncedAt={listings.lastSyncedAt} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}
