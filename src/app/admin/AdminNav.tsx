import Link from "next/link";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/admin", label: "Advisors", key: "advisors" },
  { href: "/admin/training", label: "Training", key: "training" },
  { href: "/admin/resources", label: "Resources", key: "resources" },
] as const;

export function AdminNav({
  active,
}: {
  active: "advisors" | "training" | "resources";
}) {
  return (
    <nav className="mb-8 flex gap-6 border-b border-line pb-3 text-sm">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={cn(
            "transition-colors hover:text-bronze",
            active === t.key ? "font-medium text-bronze" : "text-muted",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
