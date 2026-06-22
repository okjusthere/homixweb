import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT } from "@/lib/i18n";
import { requirePortal } from "@/lib/portal-auth";
import { PortalShell } from "./PortalShell";

export const metadata: Metadata = {
  title: "Agent workspace",
  robots: { index: false, follow: false },
};

export default async function PortalHome() {
  const { t } = await getT();
  const p = t.portal;
  const { preview, identity } = await requirePortal();

  const cards = [
    {
      href: "/portal/training",
      title: p.trainingCard,
      desc: p.trainingCardDesc,
      cta: p.open,
      ready: true,
    },
    {
      href: "/portal/resources",
      title: p.resourcesCard,
      desc: p.resourcesCardDesc,
      cta: p.open,
      ready: true,
    },
    {
      href: "#",
      title: p.dashboardCard,
      desc: p.dashboardCardDesc,
      cta: p.comingSoon,
      ready: false,
    },
  ];

  return (
    <PortalShell
      active="home"
      preview={preview}
      identity={identity}
      labels={{
        workspace: p.workspace,
        signOut: p.signOut,
        previewBanner: p.previewBanner,
        training: p.trainingCard,
        resources: p.resourcesCard,
      }}
    >
      <Container className="py-16 sm:py-20">
        <Eyebrow>{p.homeEyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {p.homeTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{p.homeLead}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) =>
            card.ready ? (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col rounded-sm border border-line bg-surface p-7 transition-colors hover:border-bronze"
              >
                <h2 className="font-serif text-2xl text-ink">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {card.desc}
                </p>
                <span className="mt-6 text-sm font-medium text-bronze">
                  {card.cta} →
                </span>
              </Link>
            ) : (
              <div
                key={card.title}
                className="flex flex-col rounded-sm border border-dashed border-line bg-paper p-7"
              >
                <h2 className="font-serif text-2xl text-ink/70">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {card.desc}
                </p>
                <span className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  {card.cta}
                </span>
              </div>
            ),
          )}
        </div>
      </Container>
    </PortalShell>
  );
}
