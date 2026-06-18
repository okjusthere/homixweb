"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Slim in-page anchor nav for the advisor profile. Sticks just under the global
 * fixed header (68px) and highlights the section currently in view. Smooth-scroll
 * comes from the global `scroll-behavior` (neutralized under reduced-motion);
 * each target section sets its own `scroll-mt` for the header offset.
 */
export function ProfileNav({ tabs }: { tabs: { id: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const els = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  return (
    <nav className="sticky top-[68px] z-30 border-y border-line bg-surface/90 backdrop-blur-sm">
      <div className="flex gap-7 overflow-x-auto py-3.5">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            aria-current={active === t.id ? "true" : undefined}
            className={cn(
              "whitespace-nowrap text-sm transition-colors",
              active === t.id ? "text-bronze" : "text-muted hover:text-ink",
            )}
          >
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
