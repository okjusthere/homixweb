/** Shared display formatters. */

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** $4,250,000 */
export function formatPrice(value: number): string {
  return USD.format(value);
}

/** $4.25M / $880K — compact price for cards and chips. */
export function formatPriceCompact(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return USD.format(value);
}

/** 6,120 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** "5 BD · 5.5 BA · 6,120 SF" style baths, merging half baths. */
export function formatBaths(baths: number, halfBaths = 0): string {
  return halfBaths > 0 ? `${baths}.${halfBaths}` : `${baths}`;
}

/** "June 17, 2026" */
export function formatDate(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
