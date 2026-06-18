import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ListingCard } from "@/components/listings/ListingCard";
import { getT } from "@/lib/i18n";
import { listings } from "@/lib/listings";

export async function FeaturedListings() {
  const { t } = await getT();
  const featured = await listings.getFeaturedListings(3);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{t.featured.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.featured.title}
            </h2>
          </div>
          <Button href="/listings" variant="ghost" className="hidden sm:inline-flex">
            {t.featured.viewAll} →
          </Button>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing, i) => (
            <Reveal key={listing.id} delay={i * 70}>
              <ListingCard listing={listing} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 sm:hidden">
          <Button href="/listings" variant="outline" className="w-full">
            {t.featured.viewAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
