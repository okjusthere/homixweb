import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { AgentCareer, CareerDeal } from "@/lib/listings/types";

/**
 * MLS-verified career history ("Past sales") on an advisor profile.
 *
 * Every number and card here comes from the OneKey MLS Closed feed via BBO —
 * never agent-attested. Compliance shape baked in:
 *  - one photo per closed listing (OneKey Rule 712), served from our R2 cache
 *  - per-card "Listing courtesy of …" attribution
 *  - section footer carries the MLS GRID source line with period + as-of date
 */

const INITIAL_CARDS = 12;
const MAX_CARDS = 60;

function isLease(deal: CareerDeal): boolean {
  return (deal.propertyType ?? "").toLowerCase().includes("lease");
}

function formatPrice(deal: CareerDeal, zh: boolean): string {
  if (!deal.closePrice) return zh ? "价格未披露" : "Price undisclosed";
  const full = `$${deal.closePrice.toLocaleString("en-US")}`;
  if (isLease(deal)) return zh ? `${full}/月` : `${full}/mo`;
  return full;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000)
    return `$${(volume / 1_000_000).toFixed(volume >= 10_000_000 ? 0 : 1)}M`;
  if (volume >= 1_000) return `$${Math.round(volume / 1_000)}K`;
  return `$${volume.toLocaleString("en-US")}`;
}

function formatCloseDate(iso: string | undefined, zh: boolean): string {
  if (!iso) return "";
  const [y, m] = iso.split("-");
  if (!y || !m) return iso;
  if (zh) return `${y}年${Number(m)}月`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1] ?? m} ${y}`;
}

function yearOf(iso: string | undefined): string {
  return iso?.slice(0, 4) ?? "";
}

function DealCard({ deal, zh }: { deal: CareerDeal; zh: boolean }) {
  const sideLabel =
    deal.side === "buyer"
      ? zh
        ? "代表买方"
        : "Buyer rep"
      : deal.side === "both"
        ? zh
          ? "买卖双方"
          : "Both sides"
        : zh
          ? "代表卖方"
          : "Seller rep";
  const addressLine = [deal.streetAddress, deal.city].filter(Boolean).join(", ");
  const metaBits = [
    formatCloseDate(deal.closeDate, zh),
    deal.beds ? `${deal.beds} BD` : "",
    deal.baths ? `${deal.baths} BA` : "",
  ].filter(Boolean);

  return (
    <article className="overflow-hidden rounded-sm border border-line bg-surface">
      <div className="relative aspect-[4/3] bg-line/50">
        {deal.photoUrl ? (
          <Image
            src={deal.photoUrl}
            alt={addressLine || (zh ? "已成交房源" : "Sold home")}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="eyebrow text-muted">
              {zh ? "已成交" : "Closed"}
            </span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-sm bg-ink/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-paper">
          {sideLabel}
        </span>
      </div>
      <div className="px-4 py-3.5">
        <p className="font-serif text-lg leading-none text-ink">
          {formatPrice(deal, zh)}
        </p>
        <p className="mt-1.5 truncate text-[13px] text-ink/80" title={addressLine}>
          {addressLine || (zh ? "地址未披露" : "Address undisclosed")}
        </p>
        <p className="mt-0.5 text-xs text-muted">{metaBits.join(" · ")}</p>
        {deal.listOfficeName && (
          <p
            className="mt-2 truncate text-[10.5px] leading-tight text-muted/80"
            title={`Listing courtesy of ${deal.listOfficeName}`}
          >
            Listing courtesy of {deal.listOfficeName}
          </p>
        )}
      </div>
    </article>
  );
}

export function CareerSection({
  career,
  zh,
  firstName,
}: {
  career: AgentCareer;
  zh: boolean;
  firstName: string;
}) {
  const { stats, deals } = career;
  const shown = deals.slice(0, MAX_CARDS);
  const head = shown.slice(0, INITIAL_CARDS);
  const rest = shown.slice(INITIAL_CARDS);

  const figures = [
    {
      value: String(stats.total),
      label: zh ? "MLS 成交记录" : "Closed on MLS",
    },
    ...(stats.asListAgent > 0
      ? [{ value: String(stats.asListAgent), label: zh ? "代表卖方" : "As seller's agent" }]
      : []),
    ...(stats.asBuyerAgent > 0
      ? [{ value: String(stats.asBuyerAgent), label: zh ? "代表买方" : "As buyer's agent" }]
      : []),
    ...(stats.saleVolume > 0
      ? [{ value: formatVolume(stats.saleVolume), label: zh ? "买卖成交总额" : "Sales volume" }]
      : []),
  ];
  const cols =
    figures.length <= 2
      ? "grid-cols-2"
      : figures.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-4";

  const firstYear = yearOf(stats.firstCloseDate);
  const lastYear = yearOf(stats.lastCloseDate);
  const period =
    firstYear && lastYear
      ? firstYear === lastYear
        ? firstYear
        : `${firstYear}–${lastYear}`
      : "";
  // The sync cursor is the zero time during the very first full scan — treat
  // anything implausibly old as "not yet available".
  const asOfRaw = career.dataAsOf?.slice(0, 10) ?? "";
  const asOf = asOfRaw > "2000-01-01" ? asOfRaw : "";

  return (
    <section id="sales" className="scroll-mt-32 py-14">
      <Reveal>
        <Eyebrow>{zh ? "历史成交" : "Past sales"}</Eyebrow>
        <p className="mt-3 max-w-2xl text-ink/80">
          {zh
            ? `${firstName} 近年为客户完成的买卖交易。`
            : `The homes ${firstName} has helped clients buy and sell.`}
        </p>

        <div
          className={`mt-7 grid gap-px overflow-hidden rounded-sm border border-line bg-line ${cols}`}
        >
          {figures.map((f) => (
            <div key={f.label} className="bg-surface px-5 py-5 sm:px-6">
              <p className="font-serif text-2xl text-ink sm:text-3xl">{f.value}</p>
              <p className="eyebrow mt-2">{f.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {head.map((deal, i) => (
          <Reveal key={deal.listingKey} delay={Math.min(i, 7) * 60}>
            <DealCard deal={deal} zh={zh} />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <details className="group mt-6">
          <summary className="cursor-pointer list-none text-sm font-medium text-bronze underline-offset-4 hover:underline">
            <span className="group-open:hidden">
              {zh
                ? `展开全部 ${shown.length} 笔成交 ↓`
                : `Show all ${shown.length} closed deals ↓`}
            </span>
            <span className="hidden group-open:inline">
              {zh ? "收起 ↑" : "Show fewer ↑"}
            </span>
          </summary>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {rest.map((deal) => (
              <DealCard key={deal.listingKey} deal={deal} zh={zh} />
            ))}
          </div>
        </details>
      )}

      {deals.length > MAX_CARDS && (
        <p className="mt-4 text-xs text-muted">
          {zh
            ? `显示最近 ${MAX_CARDS} 笔，共 ${stats.total} 笔。`
            : `Showing the latest ${MAX_CARDS} of ${stats.total} closed deals.`}
        </p>
      )}

      {/* Required MLS attribution: source, period, and as-of date. Legal line
          stays in English in both locales. */}
      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
        Based on information from OneKey® MLS{period ? `, for the period ${period},` : ""} as
        distributed by MLS GRID{asOf ? ` (data as of ${asOf})` : ""}. Properties displayed may be
        listed or sold by various participants in the MLS. Listing information is provided for
        consumers&rsquo; personal, non-commercial use.
      </p>
    </section>
  );
}
