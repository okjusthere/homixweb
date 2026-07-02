"use client";

import Link from "next/link";

/**
 * Error boundary for listing detail pages: a transient MLS-feed failure
 * renders this (a retryable 5xx-style state) instead of a hard 404.
 */
export default function ListingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-28 text-center">
      <p className="font-serif text-2xl text-ink">
        This listing is temporarily unavailable. · 房源数据暂时不可用。
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The MLS feed didn&rsquo;t respond — the listing itself may still be active.
        <br />
        MLS 数据暂时未响应——该房源本身可能仍在售。
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/85"
        >
          Retry · 重试
        </button>
        <Link
          href="/listings"
          className="rounded-sm border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-bronze"
        >
          All listings · 全部房源
        </Link>
      </div>
    </div>
  );
}
