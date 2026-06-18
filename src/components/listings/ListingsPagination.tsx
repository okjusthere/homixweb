import Link from "next/link";
import { cn } from "@/lib/cn";

/** Link-based pagination that preserves the current filters. */
export function ListingsPagination({
  page,
  pages,
  baseParams,
}: {
  page: number;
  pages: number;
  baseParams: Record<string, string>;
}) {
  if (pages <= 1) return null;

  const href = (p: number) => {
    const sp = new URLSearchParams(baseParams);
    if (p <= 1) sp.delete("page");
    else sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `/listings?${qs}` : "/listings";
  };

  // Compact page window around the current page.
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const nums = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const cell =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-sm border px-3 text-sm transition-colors";

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link href={href(page - 1)} className={cn(cell, "border-line text-ink hover:border-bronze hover:text-bronze")}>
          ← Prev
        </Link>
      )}
      {start > 1 && <span className="px-1 text-muted">…</span>}
      {nums.map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            cell,
            n === page
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink hover:border-bronze hover:text-bronze",
          )}
        >
          {n}
        </Link>
      ))}
      {end < pages && <span className="px-1 text-muted">…</span>}
      {page < pages && (
        <Link href={href(page + 1)} className={cn(cell, "border-line text-ink hover:border-bronze hover:text-bronze")}>
          Next →
        </Link>
      )}
    </nav>
  );
}
