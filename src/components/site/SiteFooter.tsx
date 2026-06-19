import Image from "next/image";
import Link from "next/link";
import { getT } from "@/lib/i18n";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { EqualHousingLogo } from "./EqualHousingLogo";

const year = 2026;

export async function SiteFooter() {
  const { t } = await getT();
  const { contact, legal, legalName } = siteConfig;
  const common = t.common as Record<string, string>;

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Image
              src="/homix-logo.webp"
              alt={siteConfig.legalName}
              width={240}
              height={136}
              className="h-auto w-[210px]"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 space-y-1 text-sm text-ink/80">
              <p>
                {contact.address.line1}
                <br />
                {contact.address.city}, {contact.address.state}{" "}
                {contact.address.zip}
              </p>
              <p>
                <a className="hover:text-bronze" href={contact.phoneHref}>
                  {contact.phone}
                </a>{" "}
                ·{" "}
                <a className="hover:text-bronze" href={contact.phone2Href}>
                  {contact.phone2}
                </a>
              </p>
              <p>
                <a className="hover:text-bronze" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.headingKey}>
                <p className="eyebrow mb-4">{common[col.headingKey]}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
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
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-start sm:justify-between">
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
