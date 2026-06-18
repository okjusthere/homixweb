/**
 * Equal Housing Opportunity mark — stylized house + equal sign.
 *
 * NOTE: For production, replace with the official HUD Equal Housing Opportunity
 * logo artwork. This is a faithful glyph for layout/contrast purposes.
 */
export function EqualHousingLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Equal Housing Opportunity"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M7 31 L32 11 L57 31" />
      <path d="M14 28 V53 H50 V28" />
      <line x1="24" y1="36" x2="40" y2="36" />
      <line x1="24" y1="44" x2="40" y2="44" />
    </svg>
  );
}
