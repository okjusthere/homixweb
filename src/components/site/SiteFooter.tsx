import Image from "next/image";
import Link from "next/link";
import { getT, type Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { EqualHousingLogo } from "./EqualHousingLogo";

const year = new Date().getFullYear();

export async function SiteFooter({ locale }: { locale: Locale }) {
  const { t } = await getT(locale);
  const { contact, legal, legalName } = siteConfig;
  const common = t.common as Record<string, string>;

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Image
              src="/homix-logo.webp"
              alt={siteConfig.legalName}
              width={240}
              height={136}
              className="h-auto w-[184px]"
            />
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-6 shrink-0 bg-bronze" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
            </div>
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 decoration-bronze/60 transition-colors hover:text-bronze hover:underline"
            >
              {common.agentLogin} <span aria-hidden>→</span>
            </a>
          </div>

          {/* Offices & contact */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">{t.footer.offices}</p>
            <div className="space-y-4">
              {contact.offices.map((office) => (
                <div key={office.key}>
                  <p className="font-serif text-base leading-tight text-ink">
                    {office.label[locale]}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {office.line1}
                    <br />
                    {office.city}, {office.state} {office.zip}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-ink/80">
              <p>
                <a className="transition-colors hover:text-bronze" href={contact.phoneHref}>
                  {contact.phone}
                </a>{" "}
                ·{" "}
                <a className="transition-colors hover:text-bronze" href={contact.phone2Href}>
                  {contact.phone2}
                </a>
              </p>
              <p>
                <a
                  className="transition-colors hover:text-bronze"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.headingKey} className="lg:col-span-2">
              <p className="eyebrow mb-5">{common[col.headingKey]}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizePath(locale, link.href)}
                      className="text-sm text-ink/80 transition-colors hover:text-bronze"
                    >
                      {common[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <EqualHousingLogo className="h-9 w-9 shrink-0 text-ink" />
            <p className="max-w-md text-xs leading-relaxed text-muted">
              {t.footer.eho}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-muted sm:text-right">
            {legal.brokerLicense}
            <br />
            {t.footer.brokerOfRecord}: {legal.brokerOfRecord}
            <br />
            {t.footer.licensedIn} {legal.statesLicensed.join(", ")} · {legal.iabsNote}
          </p>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {year} {legalName}
          {legalName.endsWith(".") ? "" : "."} {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
