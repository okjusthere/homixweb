import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export async function ContactBand() {
  const { t } = await getT();
  const { contact } = siteConfig;
  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Eyebrow className="text-paper/70">{t.contactBand.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
              {t.contactBand.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">
              {t.contactBand.lead}
            </p>
            <div className="mt-10 space-y-2">
              <a
                href={contact.phoneHref}
                className="block font-serif text-3xl text-paper transition-colors hover:text-bronze"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="block text-paper/80 transition-colors hover:text-bronze"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="rounded-sm bg-surface p-7 sm:p-9">
            <InquiryForm labels={t.inquiry} source="home-contact-band" />
          </div>
        </div>
      </Container>
    </section>
  );
}
