import { cn } from "@/lib/cn";

/**
 * Per-listing MLS attribution. Required on every view of an IDX listing
 * ("Listing courtesy of …"). Renders nothing when no attribution is present.
 */
export function ListingAttribution({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  if (!text) return null;
  return (
    <p className={cn("text-[11px] leading-tight text-muted", className)}>
      {text}
    </p>
  );
}
