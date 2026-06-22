import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT } from "@/lib/i18n";
import { isPortalConfigured, isPortalMember } from "@/lib/portal-auth";
import { LoginForm } from "../LoginForm";

export const metadata: Metadata = {
  title: "Agent login",
  robots: { index: false, follow: false },
};

export default async function PortalLoginPage() {
  const { t } = await getT();
  const p = t.portal;
  if (await isPortalMember()) redirect("/portal");

  if (!isPortalConfigured()) {
    return (
      <Container className="flex min-h-[70vh] flex-col justify-center py-24">
        <div className="mx-auto w-full max-w-md text-center">
          <Eyebrow>{p.loginEyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            {p.notReadyTitle}
          </h1>
          <p className="mt-4 text-muted">{p.notReadyBody}</p>
          <Link
            href="/portal"
            className="mt-8 inline-block text-sm font-medium text-bronze underline-offset-4 hover:underline"
          >
            {p.previewCta} →
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <div className="mx-auto w-full max-w-md text-center">
        <Eyebrow>{p.loginEyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{p.loginTitle}</h1>
        <p className="mt-4 text-muted">{p.loginLead}</p>
        <div className="mt-8">
          <LoginForm
            labels={{
              name: p.nameLabel,
              password: p.passwordLabel,
              signIn: p.signIn,
              signingIn: p.signingIn,
              wrong: p.wrongPassword,
            }}
          />
        </div>
      </div>
    </Container>
  );
}
