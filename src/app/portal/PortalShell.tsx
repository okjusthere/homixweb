import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { portalLogoutAction } from "./actions";

export interface PortalShellLabels {
  workspace: string;
  signOut: string;
  previewBanner: string;
  training: string;
  resources: string;
}

export function PortalShell({
  active,
  preview,
  identity,
  labels,
  children,
}: {
  active: "home" | "training" | "resources";
  preview: boolean;
  identity: string;
  labels: PortalShellLabels;
  children: React.ReactNode;
}) {
  const tab = (href: string, label: string, key: typeof active) => (
    <Link
      href={href}
      className={cn(
        "text-sm transition-colors hover:text-bronze",
        active === key ? "text-bronze" : "text-ink/70",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div>
      {preview && (
        <div className="border-b border-bronze/30 bg-bronze/10 px-5 py-2 text-center text-xs text-bronze-dark">
          {labels.previewBanner}
        </div>
      )}
      <div className="border-b border-line bg-surface">
        <Container className="flex h-14 items-center justify-between gap-6">
          <div className="flex items-center gap-7">
            <Link
              href="/portal"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              {labels.workspace}
            </Link>
            <nav className="flex items-center gap-5">
              {tab("/portal/training", labels.training, "training")}
              {tab("/portal/resources", labels.resources, "resources")}
            </nav>
          </div>
          {!preview && (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-muted sm:inline">{identity}</span>
              <form action={portalLogoutAction}>
                <button className="text-sm text-muted underline-offset-4 hover:text-bronze hover:underline">
                  {labels.signOut}
                </button>
              </form>
            </div>
          )}
        </Container>
      </div>
      {children}
    </div>
  );
}
