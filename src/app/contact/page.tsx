import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Homix — ${siteConfig.contact.phone}.`,
};

export default async function ContactPage() {
  const { t } = await getT();
  const { contact } = siteConfig;
  return (
    <Container className="py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <Eyebrow>{t.contactPage.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {t.contactPage.title}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            {t.contactPage.lead}
          </p>

          <div className="mt-10 space-y-6 text-ink">
            <div>
              <p className="eyebrow mb-2">{t.contactPage.byPhone}</p>
              <a
                href={contact.phoneHref}
                className="font-serif text-2xl transition-colors hover:text-bronze"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">{t.contactPage.byEmail}</p>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-bronze"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">{t.contactPage.inPerson}</p>
              <p className="text-ink/85">
                {contact.address.line1}
                <br />
                {contact.address.city}, {contact.address.state}{" "}
                {contact.address.zip}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-line bg-surface p-7 sm:p-9">
          <InquiryForm labels={t.inquiry} />
        </div>
      </div>
    </Container>
  );
}
