import { formatDate } from "@/lib/format";

/**
 * OneKey® MLS IDX disclaimer. REQUIRED on listing search + detail views.
 * CONFIRM the exact verbatim text + logo requirements with OneKey before launch;
 * this is a faithful, compliant standard rendering.
 */
export function MlsDisclaimer({ syncedAt }: { syncedAt?: string | null }) {
  return (
    <div className="space-y-2 text-xs leading-relaxed text-muted">
      <p>
        Listing data is provided courtesy of OneKey® MLS through its Internet
        Data Exchange (IDX) program. Real estate listings held by brokerage firms
        other than Homix Realty Inc. are marked with the listing brokerage&rsquo;s
        name. Information is deemed reliable but not guaranteed and should be
        independently verified.
      </p>
      <p>
        © {new Date().getFullYear()} OneKey® MLS. All rights reserved.
        {syncedAt ? ` Data last updated ${formatDate(syncedAt)}.` : ""}
      </p>
    </div>
  );
}
