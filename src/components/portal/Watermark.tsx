/**
 * A tiled, faint, repeating identity watermark drawn over video. It deters
 * casual screen-recording and — once login is per-agent — makes any leaked
 * recording traceable to a person. `pointer-events-none` keeps player controls
 * usable. (Note: it sits over the iframe, so it does not appear inside the
 * player's own fullscreen; a true burned-in watermark is the connect-time
 * upgrade.)
 */
export function Watermark({ label }: { label: string }) {
  const tiles = Array.from({ length: 18 });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 flex flex-wrap items-center justify-around gap-y-10 overflow-hidden p-6 opacity-[0.15]"
    >
      {tiles.map((_, i) => (
        <span
          key={i}
          className="select-none whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-paper"
          style={{ transform: "rotate(-22deg)" }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
