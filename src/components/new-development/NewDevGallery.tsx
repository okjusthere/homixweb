"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function NewDevGallery({
  images,
  name,
  allMediaLabel,
}: {
  images: GalleryImage[];
  name: string;
  allMediaLabel: string;
}) {
  const [i, setI] = useState(0);
  const n = images.length;

  const go = useCallback(
    (d: number) => setI((p) => (p + d + n) % n),
    [n],
  );

  useEffect(() => {
    if (n <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n]);

  if (n === 0) return null;
  const cur = images[i];

  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-paper sm:aspect-[16/9]">
        <Image
          key={cur.src}
          src={cur.src}
          alt={`${name} — ${cur.alt}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1120px"
          className="object-cover"
        />

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/55 text-2xl text-paper backdrop-blur-sm transition hover:bg-ink/80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/55 text-2xl text-paper backdrop-blur-sm transition hover:bg-ink/80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-3 rounded-full bg-ink/65 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm">
              {i + 1} / {n}
            </div>
          </>
        )}

        {cur.caption && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pb-3 pt-10">
            <p className="text-right text-xs leading-relaxed text-paper/90">
              {cur.caption}
            </p>
          </div>
        )}
      </div>

      {n > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                type="button"
                key={img.src}
                onClick={() => setI(idx)}
                aria-label={`Photo ${idx + 1}`}
                className={`relative h-14 w-20 flex-none overflow-hidden border transition sm:h-16 sm:w-24 ${
                  idx === i
                    ? "border-bronze ring-1 ring-bronze"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
          <span className="hidden flex-none whitespace-nowrap text-xs uppercase tracking-[0.12em] text-muted sm:inline">
            {n} {allMediaLabel}
          </span>
        </div>
      )}
    </div>
  );
}
