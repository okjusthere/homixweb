"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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
  source: string;
  city: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  sort: string;
  scopeHomix: string;
  scopeAll: string;
  allLocations: string;
  anyType: string;
  noMin: string;
  noMax: string;
  upTo: string; // e.g. "Up to" / "最高"
  anyBeds: string;
  bedsSuffix: string; // e.g. "+ beds" / "居+"
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

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      const query = next.toString();
      router.push(
        localizePath(locale, query ? `/listings?${query}` : "/listings"),
        { scroll: false },
      );
    },
    [locale, params, router],
  );

  const val = (k: string) => params.get(k) ?? "";

  return (
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
        value={val("sort")}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="newest">{labels.sortNewest}</option>
        <option value="price-desc">{labels.sortPriceDesc}</option>
        <option value="price-asc">{labels.sortPriceAsc}</option>
        <option value="beds-desc">{labels.sortBeds}</option>
      </select>
    </div>
  );
}
