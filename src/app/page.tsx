import { Hero } from "@/components/home/Hero";
import { BrandStory } from "@/components/home/BrandStory";
import { Pillars } from "@/components/home/Pillars";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { Neighborhoods } from "@/components/home/Neighborhoods";
import { ReachBand } from "@/components/home/ReachBand";
import { Testimonials } from "@/components/home/Testimonials";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { ContactBand } from "@/components/home/ContactBand";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Pillars />
      <StatsBand />
      <FeaturedListings />
      <Neighborhoods />
      <ReachBand />
      <Testimonials />
      <TeamTeaser />
      <ContactBand />
      <OrganizationJsonLd />
    </>
  );
}

function OrganizationJsonLd() {
  const { name, legalName, url, description, contact, social } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name,
    legalName,
    url,
    description,
    image: `${url}/og.jpg`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line1,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "US",
    },
    areaServed: siteConfig.market,
    sameAs: [social.instagram, social.xiaohongshu, social.douyin],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
