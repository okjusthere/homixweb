import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingAttribution } from "@/components/listings/ListingAttribution";
import { MlsDisclaimer } from "@/components/listings/MlsDisclaimer";
import { listings } from "@/lib/listings";
import type { PropertyType } from "@/lib/listings";
import { formatBaths, formatNumber, formatPrice } from "@/lib/format";
import { getRouteLocale, getT } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { absUrl, jsonLd as serializeJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function displayPrice(value: number): string {
  return value > 0 ? formatPrice(value) : "Price upon request";
}

/** Clean MLS copy for meta tags: collapse whitespace, cut at a word boundary. */
function metaDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 155) return clean;
  const cut = clean.slice(0, 155);
  const breakAt = cut.lastIndexOf(" ");
  return `${cut.slice(0, breakAt > 0 ? breakAt : 155).replace(/[.,;:!?—-]+$/, "")}…`;
}

/** schema.org types for each normalized MLS property type. */
const SCHEMA_PROPERTY_TYPE: Record<PropertyType, string> = {
  "Single Family": "SingleFamilyResidence",
  Condo: "Apartment",
  "Co-op": "Apartment",
  Townhouse: "House",
  "Multi-Family": "House",
  Land: "Place",
  Residential: "Residence",
  Other: "Residence",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await listings.getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };
  const locale = await getRouteLocale(params);
  return {
    ...pageMetadata({
      path: `/listings/${slug}`,
      locale,
      title: {
        en: `${listing.address.street} — ${formatPrice(listing.listPrice)}`,
        zh: `${listing.address.street}——纽约在售房源`,
      },
      description:
        locale === "zh"
          ? `${listing.address.full}，${listing.propertyType}，${displayPrice(listing.listPrice)}。Homix 提供中英双语看房与置业咨询。`
          : metaDescription(listing.description) ||
            `${listing.address.full} — ${listing.propertyType}, ${displayPrice(listing.listPrice)}.`,
      // Sharing a listing must show the property itself, not the brand card.
      image: listing.photos[0]?.url ?? null,
      ogType: "article",
      noAlternates: true,
    }),
    // IDX detail pages: keep out of the index unless OneKey's license permits it.
    robots: { index: false, follow: true },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const listing = await listings.getListingBySlug(slug);
  if (!listing) notFound();

  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const zh = locale === "zh";
  const { address, listPrice, beds, baths, halfBaths, sqft, status } = listing;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.full)}`;
  const copy = zh
    ? {
        back: "全部房源",
        estimate: "估算月供",
        bedrooms: "卧室",
        bathrooms: "卫生间",
        squareFeet: "平方英尺",
        daysOnMarket: "在售天数",
        about: "房源介绍",
        details: "房源详情",
        map: "在地图中查看",
        privateShowing: "预约私享看房",
        followUp: "Homix 顾问会尽快联系您，无压力、无义务。",
        orCall: "或致电",
        price: "价格",
        type: "类型",
        status: "状态",
        interior: "室内面积",
        lot: "地块面积",
        yearBuilt: "建造年份",
        schoolDistrict: "学区",
        county: "郡",
        mls: "MLS 编号",
      }
    : {
        back: "All listings",
        estimate: "Estimate monthly payment",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        squareFeet: "sq ft",
        daysOnMarket: "days on market",
        about: "About this home",
        details: "The details",
        map: "View on map",
        privateShowing: "Request a private showing",
        followUp: "A Homix advisor will follow up promptly — no pressure, no obligation.",
        orCall: "Or call",
        price: "Price",
        type: "Type",
        status: "Status",
        interior: "Interior",
        lot: "Lot",
        yearBuilt: "Year built",
        schoolDistrict: "School district",
        county: "County",
        mls: "MLS #",
      };

  const specs: { label: string; value: string }[] = [
    { label: copy.price, value: displayPrice(listPrice) },
    { label: copy.type, value: listing.propertyType },
    { label: copy.status, value: status },
    { label: copy.bedrooms, value: beds > 0 ? String(beds) : "—" },
    { label: copy.bathrooms, value: baths > 0 ? formatBaths(baths, halfBaths) : "—" },
    { label: copy.interior, value: sqft ? `${formatNumber(sqft)} ${copy.squareFeet}` : "—" },
    ...(listing.lotSqft
      ? [{ label: copy.lot, value: `${formatNumber(listing.lotSqft)} ${copy.squareFeet}` }]
      : []),
    ...(listing.yearBuilt
      ? [{ label: copy.yearBuilt, value: String(listing.yearBuilt) }]
      : []),
    ...(listing.schoolDistrict
      ? [{ label: copy.schoolDistrict, value: listing.schoolDistrict }]
      : []),
    ...(listing.county ? [{ label: copy.county, value: listing.county }] : []),
    { label: copy.mls, value: listing.mlsNumber },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": SCHEMA_PROPERTY_TYPE[listing.propertyType] ?? "Residence",
    name: address.full,
    description: listing.description,
    url: absUrl(localizePath(locale, `/listings/${listing.slug}`)),
    image: listing.photos.slice(0, 5).map((p) => p.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: "US",
    },
    inLanguage: zh ? "zh-Hans" : "en",
    ...(listPrice > 0
      ? { offers: { "@type": "Offer", price: listPrice, priceCurrency: "USD" } }
      : {}),
  };

  return (
    <Container className="py-10 sm:py-14">
      <Button variant="ghost" href="/listings">
        ← {copy.back}
      </Button>

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
              <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
                {address.street}
              </h1>
              <p className="mt-1 text-muted">
                {address.city}, {address.state} {address.postalCode}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-serif text-3xl tabular-nums text-ink">
                {displayPrice(listPrice)}
              </p>
              <Button variant="ghost" href="/calculator" className="mt-1">
                {copy.estimate} →
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink">
            <span>{beds || "—"} {copy.bedrooms}</span>
            <span>{baths > 0 ? formatBaths(baths, halfBaths) : "—"} {copy.bathrooms}</span>
            {sqft > 0 && <span>{formatNumber(sqft)} {copy.squareFeet}</span>}
            {listing.daysOnMarket != null && (
              <span className="text-muted">{listing.daysOnMarket} {copy.daysOnMarket}</span>
            )}
          </div>

          {listing.description && (
            <div className="mt-8">
              <h2 className="eyebrow">{copy.about}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/85">
                {listing.description}
              </p>
            </div>
          )}

          {/* Spec sheet */}
          <div className="mt-10">
            <h2 className="eyebrow">{copy.details}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-surface p-4">
                  <dt className="eyebrow text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <Button variant="ghost" href={mapHref}>
              {copy.map} →
            </Button>
          </div>

          <div className="mt-10 border-t border-line pt-5">
            <ListingAttribution text={listing.attribution} />
          </div>
        </div>

        {/* Inquiry sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm border border-line bg-surface p-6 sm:p-7">
            <p className="font-serif text-xl text-ink">{copy.privateShowing}</p>
            <p className="mt-2 text-sm text-muted">
              {copy.followUp}
            </p>
            <div className="mt-5">
              <InquiryForm labels={t.inquiry} source="listing-showing" />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
              {copy.orCall}{" "}
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </Container>
  );
}
