import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

/** Homix wordmark — Fraunces, with a small bronze terminal dot. */
export function Wordmark({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "font-serif text-2xl leading-none tracking-tight transition-colors",
        className,
      )}
    >
      {siteConfig.name}
      <span className="text-bronze">.</span>
    </Link>
  );
}
