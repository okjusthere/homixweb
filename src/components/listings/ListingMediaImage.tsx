"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { ListingPhoto } from "@/lib/listings";

type ListingMediaImageProps = Omit<ImageProps, "src" | "alt" | "onError"> & {
  photos: ListingPhoto[];
  alt: string;
  fallbackClassName?: string;
};

/** Tries each supplied MLS image before showing a stable branded fallback. */
export function ListingMediaImage({
  photos,
  alt,
  className,
  fallbackClassName,
  ...imageProps
}: ListingMediaImageProps) {
  const candidates = useMemo(() => {
    const seen = new Set<string>();
    return photos.filter((photo) => {
      const url = photo.url.trim();
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
  }, [photos]);
  const signature = candidates.map((photo) => photo.url).join("\n");
  const [selection, setSelection] = useState({ signature, index: 0 });
  const currentIndex = selection.signature === signature ? selection.index : 0;
  const current = candidates[currentIndex];

  if (!current) {
    return (
      <span
        className={cn(
          "flex h-full w-full items-center justify-center bg-surface text-xs uppercase tracking-[0.18em] text-muted",
          fallbackClassName,
        )}
      >
        Homix
      </span>
    );
  }

  return (
    <Image
      {...imageProps}
      key={current.url}
      src={current.url}
      alt={current.alt ?? alt}
      className={className}
      onError={() =>
        setSelection((previous) => {
          const activeSelection =
            previous.signature === signature
              ? previous
              : { signature, index: currentIndex };
          if (activeSelection.index !== currentIndex) return activeSelection;
          return { signature, index: currentIndex + 1 };
        })
      }
    />
  );
}
