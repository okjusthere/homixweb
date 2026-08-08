import type { ListingOpenHouse, ListingStatus } from "@/lib/listings";
import type { Locale } from "@/lib/i18n";

const NEW_YORK_TIME_ZONE = "America/New_York";

export interface OpenHouseDisplay {
  dateKey: string;
  date: string;
  weekday: string;
  month: string;
  day: string;
  time: string;
}

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
  const display = formatOpenHouseDisplay(openHouse, locale);
  return display ? { date: display.date, time: display.time } : null;
}

export function formatOpenHouseDisplay(
  openHouse: ListingOpenHouse,
  locale: Locale,
): OpenHouseDisplay | null {
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

  const keyParts = new Intl.DateTimeFormat("en-US", {
    timeZone: NEW_YORK_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(startsAt);
  const keyPart = (type: Intl.DateTimeFormatPartTypes) =>
    keyParts.find((part) => part.type === type)?.value ?? "";

  return {
    dateKey: `${keyPart("year")}-${keyPart("month")}-${keyPart("day")}`,
    date,
    weekday: new Intl.DateTimeFormat(language, {
      timeZone: NEW_YORK_TIME_ZONE,
      weekday: "short",
    }).format(startsAt),
    month: new Intl.DateTimeFormat(language, {
      timeZone: NEW_YORK_TIME_ZONE,
      month: "short",
    }).format(startsAt),
    day: new Intl.DateTimeFormat(language, {
      timeZone: NEW_YORK_TIME_ZONE,
      day: "numeric",
    }).format(startsAt),
    time: `${timeFormatter.format(startsAt)} - ${timeFormatter.format(endsAt)}`,
  };
}
