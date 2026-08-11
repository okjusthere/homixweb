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
  const [gallery, setGallery] = useState({ active: 0, failedUrls: [] as string[] });
  const availablePhotos = photos.filter(
    (photo) => photo.url.trim() && !gallery.failedUrls.includes(photo.url),
  );

  if (!availablePhotos.length) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-sm border border-line bg-surface text-xs uppercase tracking-[0.18em] text-muted">
        Homix listing media coming soon
      </div>
    );
  }
  const current = availablePhotos[gallery.active] ?? availablePhotos[0];

  function markFailed(url: string) {
    setGallery((currentGallery) => {
      if (currentGallery.failedUrls.includes(url)) return currentGallery;
      const currentPhotos = photos.filter(
        (photo) =>
          photo.url.trim() && !currentGallery.failedUrls.includes(photo.url),
      );
      const removedIndex = currentPhotos.findIndex((photo) => photo.url === url);
      let nextActive = currentGallery.active;
      if (removedIndex >= 0 && removedIndex < nextActive) nextActive -= 1;
      if (removedIndex === nextActive && nextActive >= currentPhotos.length - 1) {
        nextActive = 0;
      }
      return {
        active: nextActive,
        failedUrls: [...currentGallery.failedUrls, url],
      };
    });
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-line/50">
        <Image
          key={current.url}
          src={current.url}
          alt={current.alt ?? alt}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
          onError={() => markFailed(current.url)}
        />
      </div>
      {availablePhotos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-8">
          {availablePhotos.slice(0, 16).map((p, i) => (
            <button
              key={p.url}
              type="button"
              aria-label={`View photo ${i + 1}`}
              onClick={() =>
                setGallery((currentGallery) => ({ ...currentGallery, active: i }))
              }
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm transition",
                i === gallery.active
                  ? "ring-2 ring-bronze ring-offset-1 ring-offset-paper"
                  : "opacity-75 hover:opacity-100",
              )}
            >
              <Image
                src={p.url}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                onError={() => markFailed(p.url)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
