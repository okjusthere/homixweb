"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const selectClass =
  "rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-bronze focus:outline-none";

const PRICES = [
  { label: "No min", value: "" },
  { label: "$500K", value: "500000" },
  { label: "$750K", value: "750000" },
  { label: "$1M", value: "1000000" },
  { label: "$1.5M", value: "1500000" },
  { label: "$2M", value: "2000000" },
  { label: "$3M", value: "3000000" },
  { label: "$5M", value: "5000000" },
];

const TYPES = ["Single Family", "Condo", "Townhouse", "Multi-Family", "Land"];

export function ListingFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      router.push(`/listings?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const val = (k: string) => params.get(k) ?? "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        aria-label="City"
        className={selectClass}
        value={val("city")}
        onChange={(e) => update("city", e.target.value)}
      >
        <option value="">All locations</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        aria-label="Property type"
        className={selectClass}
        value={val("type")}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="">Any type</option>
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        aria-label="Minimum price"
        className={selectClass}
        value={val("minPrice")}
        onChange={(e) => update("minPrice", e.target.value)}
      >
        {PRICES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label === "No min" ? "No min" : `${p.label}+`}
          </option>
        ))}
      </select>

      <select
        aria-label="Maximum price"
        className={selectClass}
        value={val("maxPrice")}
        onChange={(e) => update("maxPrice", e.target.value)}
      >
        <option value="">No max</option>
        {PRICES.slice(1).map((p) => (
          <option key={p.value} value={p.value}>
            {`Up to ${p.label}`}
          </option>
        ))}
      </select>

      <select
        aria-label="Bedrooms"
        className={selectClass}
        value={val("beds")}
        onChange={(e) => update("beds", e.target.value)}
      >
        <option value="">Any beds</option>
        {[1, 2, 3, 4, 5].map((b) => (
          <option key={b} value={b}>
            {b}+ beds
          </option>
        ))}
      </select>

      <select
        aria-label="Sort"
        className={`${selectClass} ml-auto`}
        value={val("sort")}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-desc">Price (high to low)</option>
        <option value="price-asc">Price (low to high)</option>
        <option value="beds-desc">Most bedrooms</option>
      </select>
    </div>
  );
}
