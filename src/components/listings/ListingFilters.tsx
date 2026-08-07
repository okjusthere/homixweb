"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

const selectClass =
  "rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-bronze focus:outline-none";

const PRICES = [
  { label: "$500K", value: "500000" },
  { label: "$750K", value: "750000" },
  { label: "$1M", value: "1000000" },
  { label: "$1.5M", value: "1500000" },
  { label: "$2M", value: "2000000" },
  { label: "$3M", value: "3000000" },
  { label: "$5M", value: "5000000" },
];

// MLS property-type values stay in English (data terms), only UI labels localize.
const TYPES = [
  "Single Family",
  "Condo",
  "Co-op",
  "Townhouse",
  "Multi-Family",
  "Land",
  "Residential",
];

export interface ListingFilterLabels {
  searchQuery: string;
  searchPlaceholder: string;
  searchAction: string;
  clearSearch: string;
  source: string;
  status: string;
  city: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  sort: string;
  scopeHomix: string;
  scopeAll: string;
  statusAll: string;
  statusForSale: string;
  statusComingSoon: string;
  statusPending: string;
  statusSold: string;
  allLocations: string;
  anyType: string;
  noMin: string;
  noMax: string;
  upTo: string; // e.g. "Up to" / "最高"
  anyBeds: string;
  bedsSuffix: string; // e.g. "+ beds" / "居+"
  sortPortfolio: string;
  sortNewest: string;
  sortPriceDesc: string;
  sortPriceAsc: string;
  sortBeds: string;
}

export function ListingFilters({
  cities,
  locale,
  labels,
}: {
  cities: string[];
  locale: Locale;
  labels: ListingFilterLabels;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeQuery = params.get("q") ?? "";
  const searchInput = useRef<HTMLInputElement>(null);

  const navigate = useCallback(
    (next: URLSearchParams) => {
      next.delete("page");
      const nextQuery = next.toString();
      router.push(
        localizePath(
          locale,
          nextQuery ? `/listings?${nextQuery}` : "/listings",
        ),
        { scroll: false },
      );
    },
    [locale, router],
  );

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      if (key === "scope" && value === "all") {
        next.delete("status");
        if (next.get("sort") === "status-priority") next.delete("sort");
      }
      navigate(next);
    },
    [navigate, params],
  );

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    const value = searchInput.current?.value.trim() ?? "";
    if (value) next.set("q", value);
    else next.delete("q");
    navigate(next);
  }

  function clearSearch() {
    if (searchInput.current) searchInput.current.value = "";
    const next = new URLSearchParams(params.toString());
    next.delete("q");
    navigate(next);
  }

  const val = (k: string) => params.get(k) ?? "";
  const homixScope = val("scope") !== "all";

  return (
    <div className="space-y-4">
      <form
        onSubmit={submitSearch}
        className="flex flex-col gap-2 sm:flex-row"
        role="search"
      >
        <label htmlFor="listing-search" className="sr-only">
          {labels.searchQuery}
        </label>
        <input
          key={activeQuery}
          ref={searchInput}
          id="listing-search"
          type="search"
          defaultValue={activeQuery}
          placeholder={labels.searchPlaceholder}
          autoComplete="off"
          className="min-h-12 min-w-0 flex-1 rounded-sm border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-bronze"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="min-h-12 flex-1 rounded-sm bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-ink/85 sm:flex-none"
          >
            {labels.searchAction}
          </button>
          {activeQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="min-h-12 rounded-sm border border-line bg-surface px-4 text-sm text-muted transition-colors hover:border-bronze hover:text-ink"
            >
              {labels.clearSearch}
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <select
          aria-label={labels.source}
          className={selectClass}
          value={val("scope")}
          onChange={(e) => update("scope", e.target.value)}
        >
          <option value="">{labels.scopeHomix}</option>
          <option value="all">{labels.scopeAll}</option>
        </select>

        {homixScope && (
          <select
            aria-label={labels.status}
            className={selectClass}
            value={val("status")}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">{labels.statusAll}</option>
            <option value="for-sale">{labels.statusForSale}</option>
            <option value="coming-soon">{labels.statusComingSoon}</option>
            <option value="pending">{labels.statusPending}</option>
            <option value="sold">{labels.statusSold}</option>
          </select>
        )}

        <select
          aria-label={labels.city}
          className={selectClass}
          value={val("city")}
          onChange={(e) => update("city", e.target.value)}
        >
          <option value="">{labels.allLocations}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label={labels.propertyType}
          className={selectClass}
          value={val("type")}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="">{labels.anyType}</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          aria-label={labels.minPrice}
          className={selectClass}
          value={val("minPrice")}
          onChange={(e) => update("minPrice", e.target.value)}
        >
          <option value="">{labels.noMin}</option>
          {PRICES.map((p) => (
            <option key={p.value} value={p.value}>
              {`${p.label}+`}
            </option>
          ))}
        </select>

        <select
          aria-label={labels.maxPrice}
          className={selectClass}
          value={val("maxPrice")}
          onChange={(e) => update("maxPrice", e.target.value)}
        >
          <option value="">{labels.noMax}</option>
          {PRICES.map((p) => (
            <option key={p.value} value={p.value}>
              {`${labels.upTo} ${p.label}`}
            </option>
          ))}
        </select>

        <select
          aria-label={labels.bedrooms}
          className={selectClass}
          value={val("beds")}
          onChange={(e) => update("beds", e.target.value)}
        >
          <option value="">{labels.anyBeds}</option>
          {[1, 2, 3, 4, 5].map((b) => (
            <option key={b} value={b}>
              {`${b}${labels.bedsSuffix}`}
            </option>
          ))}
        </select>

        <select
          aria-label={labels.sort}
          className={`${selectClass} ml-auto`}
          value={val("sort") || (homixScope ? "status-priority" : "newest")}
          onChange={(e) => update("sort", e.target.value)}
        >
          {homixScope && <option value="status-priority">{labels.sortPortfolio}</option>}
          <option value="newest">{labels.sortNewest}</option>
          <option value="price-desc">{labels.sortPriceDesc}</option>
          <option value="price-asc">{labels.sortPriceAsc}</option>
          <option value="beds-desc">{labels.sortBeds}</option>
        </select>
      </div>
    </div>
  );
}
