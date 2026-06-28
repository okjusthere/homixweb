"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ListingPhoto } from "@/lib/listings";

export function ListingGallery({
  photos,
  alt,
}: {
  photos: ListingPhoto[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  if (!photos.length) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-sm border border-line bg-surface text-xs uppercase tracking-[0.18em] text-muted">
        Homix listing media coming soon
      </div>
    );
  }
  const current = photos[active] ?? photos[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-line/50">
        <Image
          src={current.url}
          alt={current.alt ?? alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>
      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-8">
          {photos.slice(0, 16).map((p, i) => (
            <button
              key={i}
              type="button"
              aria-label={`View photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm transition",
                i === active
                  ? "ring-2 ring-bronze ring-offset-1 ring-offset-paper"
                  : "opacity-75 hover:opacity-100",
              )}
            >
              <Image src={p.url} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
