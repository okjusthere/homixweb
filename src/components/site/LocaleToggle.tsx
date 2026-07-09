"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

/** Switches between the canonical English and Chinese URL trees. */
export function LocaleToggle({
  locale,
  label,
  className,
}: {
  locale: Locale;
  /** The OTHER language's name (e.g. "中文" when current is en). */
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const toggle = () => {
    const next = locale === "zh" ? "en" : "zh";
    router.push(localizePath(next, pathname));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language"
      className={cn(
        "text-sm font-medium tracking-wide transition-colors hover:text-bronze",
        className,
      )}
    >
      {label}
    </button>
  );
}
