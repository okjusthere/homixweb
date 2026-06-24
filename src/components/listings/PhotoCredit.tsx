/** Photo attribution line: "Photo by: <credited source>" with a link out. */
export function PhotoCredit({
  label,
  credit,
  url,
}: {
  label: string;
  credit: string;
  url?: string;
}) {
  return (
    <p className="mt-2 text-xs leading-tight text-muted">
      {label}:{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:text-bronze hover:underline"
      >
        {credit}
      </a>
    </p>
  );
}
