import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT } from "@/lib/i18n";
import { requirePortal } from "@/lib/portal-auth";
import { getResources, groupByCategory } from "@/lib/portal-content";
import { PortalShell } from "../PortalShell";

export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: false },
};

export default async function PortalResources() {
  const { t } = await getT();
  const p = t.portal;
  const { preview, identity } = await requirePortal();
  const resources = await getResources();
  const groups = groupByCategory(resources);

  const shellLabels = {
    workspace: p.workspace,
    signOut: p.signOut,
    previewBanner: p.previewBanner,
    training: p.trainingCard,
    resources: p.resourcesCard,
  };

  return (
    <PortalShell active="resources" preview={preview} identity={identity} labels={shellLabels}>
      <Container className="py-14 sm:py-20">
        <Eyebrow>{p.resourcesEyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {p.resourcesTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{p.resourcesLead}</p>

        {resources.length === 0 ? (
          <>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-paper p-6">
                  <div className="h-4 w-1/2 rounded-sm bg-line" />
                  <div className="mt-3 h-3 w-full rounded-sm bg-line/70" />
                  <div className="mt-2 h-3 w-4/5 rounded-sm bg-line/70" />
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-muted">{p.resourcesEmpty}</p>
          </>
        ) : (
          <div className="mt-12 space-y-14">
            {groups.map(([category, items]) => (
              <section key={category}>
                <h2 className="font-serif text-2xl text-ink">{category}</h2>
                <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col bg-paper p-6 transition-colors hover:bg-surface"
                    >
                      <h3 className="font-serif text-lg text-ink">{r.title}</h3>
                      {r.description && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {r.description}
                        </p>
                      )}
                      <span className="mt-5 text-sm font-medium text-bronze">
                        {p.openResource} →
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </PortalShell>
  );
}
