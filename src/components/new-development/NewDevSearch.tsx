"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export interface DevCard {
  slug: string;
  name: string;
  area: string;
  borough: string;
  address: string;
  price: string;
  scale: string;
  cover: { src: string; alt: string } | null;
  stories: string;
  units: string;
  built: string;
  href: string;
}

export interface DevSearchLabels {
  placeholder: string;
  view: string;
  starting: string;
  mediaPending: string;
  stories: string;
  units: string;
  year: string;
  copy: string;
  copied: string;
  noResults: string;
  showing: string; // e.g. "showing" → "showing 12 / 34"
}

export function NewDevSearch({
  buildings,
  labels,
}: {
  buildings: DevCard[];
  labels: DevSearchLabels;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return buildings;
    return buildings.filter((b) =>
      `${b.name} ${b.area} ${b.borough} ${b.address}`.toLowerCase().includes(s),
    );
  }, [q, buildings]);

  return (
    <>
      <div className="sticky top-[57px] z-20 -mx-4 mb-8 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur sm:top-[65px]">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            >
              <path
                fill="currentColor"
                d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l3.626 3.627a.75.75 0 1 1-1.06 1.06l-3.627-3.626A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
              />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.placeholder}
              className="w-full rounded-sm border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-bronze"
            />
          </div>
          <span className="flex-none whitespace-nowrap text-sm text-muted">
            {labels.showing} {filtered.length} / {buildings.length}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">{labels.noResults}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, index) => (
            <Reveal key={b.slug} delay={(index % 6) * 40}>
              <DevCardView b={b} labels={labels} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function DevCardView({ b, labels }: { b: DevCard; labels: DevSearchLabels }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}${b.href}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <article className="flex h-full flex-col border border-line bg-surface transition-colors hover:border-bronze/50">
      <Link href={b.href} className="group block focus-visible:outline-none">
        {b.cover ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
            <Image
              src={b.cover.src}
              alt={`${b.name} ${b.cover.alt}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center border-b border-line bg-paper px-5 text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {labels.mediaPending}
            </p>
          </div>
        )}
        <div className="border-b border-line p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.14em] text-bronze">{b.area}</p>
            <p className="text-xs text-muted">{b.borough}</p>
          </div>
          <h3 className="mt-4 min-h-16 font-serif text-2xl font-normal leading-tight text-ink transition-colors group-hover:text-bronze">
            {b.name}
          </h3>
          <div className="mt-5 grid grid-cols-3 gap-px bg-line">
            {[
              [b.stories, labels.stories],
              [b.units, labels.units],
              [b.built, labels.year],
            ].map(([value, lab], i) => (
              <div key={i} className="bg-paper p-3 text-center">
                <p className="text-lg font-medium text-ink">{value}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                  {lab}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-base font-medium text-ink">
          {labels.starting} · {b.price}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{b.address}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <Link
            href={b.href}
            className="text-sm font-medium text-bronze transition-colors hover:text-bronze-dark"
          >
            {labels.view} →
          </Link>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="7" y="7" width="9" height="9" rx="1.5" />
              <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
            </svg>
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      </div>
    </article>
  );
}
