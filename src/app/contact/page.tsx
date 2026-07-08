import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/contact",
    locale,
    title: {
      en: "Contact — Homix Offices in Flushing, Long Island & Manhattan",
      zh: "联系我们——法拉盛、长岛与曼哈顿办公室",
    },
    description: {
      en: "Call, email, or visit Homix by appointment at our Flushing main office, Long Island office in Jericho, or Manhattan office in Hudson Square.",
      zh: "电话、邮件或预约到访 Homix 法拉盛主办公室、Jericho 长岛办公室或 Hudson Square 曼哈顿办公室，咨询买房、卖房与置业问题。",
    },
  });
}

type Office = (typeof siteConfig.contact.offices)[number];

function officeMapHref(office: Office) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${office.line1}, ${office.city}, ${office.state} ${office.zip}`,
  )}`;
}

export default async function ContactPage() {
  const { locale, t } = await getT();
  const { contact } = siteConfig;
  const primaryOffice = contact.offices.find((office) => office.isPrimary) ?? contact.offices[0];

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
                className="block font-serif text-2xl transition-colors hover:text-bronze"
              >
                {contact.phone}
              </a>
              <a
                href={contact.phone2Href}
                className="mt-1 block font-serif text-2xl transition-colors hover:text-bronze"
              >
                {contact.phone2}
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
                <span className="font-medium text-ink">{primaryOffice.label[locale]}</span>
                <br />
                {primaryOffice.line1}
                <br />
                {primaryOffice.city}, {primaryOffice.state}{" "}
                {primaryOffice.zip}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-line bg-surface p-7 sm:p-9">
          <InquiryForm labels={t.inquiry} source="contact" />
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <Eyebrow>{t.contactPage.officesEyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-ink">
              {t.contactPage.officesTitle}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {t.contactPage.officesLead}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {contact.offices.map((office) => (
              <a
                key={office.key}
                href={officeMapHref(office)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[220px] flex-col justify-between rounded-sm border border-line bg-surface p-6 transition-colors hover:border-bronze/60"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {office.market[locale]}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-normal leading-tight text-ink group-hover:text-bronze">
                    {office.label[locale]}
                  </h3>
                  {office.isPrimary && (
                    <p className="mt-3 inline-flex border border-bronze/30 px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-bronze">
                      {t.contactPage.mainOffice}
                    </p>
                  )}
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    {office.line1}
                    <br />
                    {office.city}, {office.state} {office.zip}
                  </p>
                </div>
                <p className="mt-6 text-sm font-medium text-bronze">
                  {t.contactPage.openMap} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
