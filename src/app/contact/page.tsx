import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Homix — ${siteConfig.contact.phone}.`,
};

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <Container className="py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            Start a quiet conversation.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Buying, selling, or just thinking it through — we&rsquo;re glad to
            help, with no pressure and no obligation.
          </p>

          <div className="mt-10 space-y-6 text-ink">
            <div>
              <p className="eyebrow mb-2">By phone</p>
              <a
                href={contact.phoneHref}
                className="font-serif text-2xl transition-colors hover:text-bronze"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">By email</p>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-bronze"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">In person</p>
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
          <InquiryForm />
        </div>
      </div>
    </Container>
  );
}
