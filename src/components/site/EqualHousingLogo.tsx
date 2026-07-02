/**
 * Equal Housing Opportunity logo — the official HUD mark (public-domain
 * federal artwork): solid house silhouette with an equal sign knocked out.
 */
export function EqualHousingLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Equal Housing Opportunity"
      fill="currentColor"
      fillRule="evenodd"
    >
      {/* House silhouette (roof overhang + body) with equal-sign cutouts */}
      <path d="M32 4 L62 30 L54 30 L54 58 L10 58 L10 30 L2 30 Z M20 33 L44 33 L44 39 L20 39 Z M20 45 L44 45 L44 51 L20 51 Z" />
    </svg>
  );
}
