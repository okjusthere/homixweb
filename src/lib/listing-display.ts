import type { ListingOpenHouse, ListingStatus } from "@/lib/listings";
import type { Locale } from "@/lib/i18n";

const NEW_YORK_TIME_ZONE = "America/New_York";

export function listingStatusLabel(status: ListingStatus, locale: Locale): string {
  if (locale === "zh") {
    switch (status) {
      case "Coming Soon":
        return "即将上市";
      case "Pending":
        return "合同处理中";
      case "Sold":
        return "已成交";
      default:
        return "在售";
    }
  }
  return status;
}

export function formatOpenHouseRange(
  openHouse: ListingOpenHouse,
  locale: Locale,
): { date: string; time: string } | null {
  const startsAt = new Date(openHouse.startsAt);
  const endsAt = new Date(openHouse.endsAt);
  if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) return null;

  const language = locale === "zh" ? "zh-CN" : "en-US";
  const date = new Intl.DateTimeFormat(language, {
    timeZone: NEW_YORK_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(startsAt);
  const timeFormatter = new Intl.DateTimeFormat(language, {
    timeZone: NEW_YORK_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    date,
    time: `${timeFormatter.format(startsAt)} - ${timeFormatter.format(endsAt)}`,
  };
}
