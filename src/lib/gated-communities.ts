import {
  gatedCommunities,
  type CommunitySubRegion,
  type GateType,
  type GatedCommunity,
} from "@/data/gated-communities";
import type { Locale } from "@/lib/i18n";

export const communitiesBasePath = "/communities";

export function communityHref(slug: string) {
  return `${communitiesBasePath}/${slug}`;
}

export function getCommunity(slug: string): GatedCommunity | undefined {
  return gatedCommunities.find((c) => c.slug === slug);
}

/** Render order for the grouped index page. */
export const subRegionOrder: CommunitySubRegion[] = [
  "North Shore",
  "Central Nassau",
  "South Shore",
];

export function subRegionLabel(region: CommunitySubRegion, locale: Locale) {
  if (locale === "zh") {
    return {
      "North Shore": "北岸 North Shore",
      "Central Nassau": "中区 Central Nassau",
      "South Shore": "南岸 South Shore",
    }[region];
  }
  return region;
}

/** Short, honest label for the kind of gate/access a community has. */
export function gateLabel(gate: GateType, locale: Locale) {
  const zh = locale === "zh";
  switch (gate) {
    case "guard-gated-24h":
      return zh ? "24 小时人工岗亭" : "24-hour guard gate";
    case "guard-gated-part-time":
      return zh ? "人工岗亭（非全天）" : "Part-time guard gate";
    case "coded-gate":
      return zh ? "密码门禁" : "Coded gate";
    case "gated":
      return zh ? "门禁社区" : "Gated community";
    case "private-no-gate":
      return zh ? "私密社区（无岗亭）" : "Private community";
    default:
      return zh ? "门禁待核" : "Access TBD";
  }
}

export function communitiesBySubRegion() {
  return subRegionOrder
    .map((region) => ({
      region,
      items: gatedCommunities.filter((c) => c.subRegion === region),
    }))
    .filter((group) => group.items.length > 0);
}

/** Grouping key: the town with any parenthetical (P.O./village note) stripped. */
export function townGroupOf(c: GatedCommunity) {
  return c.town.split("(")[0].trim();
}

/** Communities grouped by town — largest clusters first, then alphabetical. */
export function communitiesByTown() {
  const map = new Map<string, GatedCommunity[]>();
  for (const c of gatedCommunities) {
    const town = townGroupOf(c);
    const list = map.get(town) ?? [];
    list.push(c);
    map.set(town, list);
  }
  return Array.from(map.entries())
    .map(([town, items]) => ({ town, items }))
    .sort((a, b) => b.items.length - a.items.length || a.town.localeCompare(b.town));
}

/**
 * Home-count label that avoids doubling the unit word: a bare number gets
 * "homes"/"户" appended, but a count that already carries a noun
 * ("80 homesites", "~12 estate lots") is shown as-is.
 */
export function homesLabel(homesCount: string, locale: Locale) {
  const isNumeric = /^[~\d,]+$/.test(homesCount.trim());
  if (!isNumeric) return homesCount;
  return locale === "zh" ? `${homesCount} 户` : `${homesCount} homes`;
}

/** One-line meta string for cards/hero: gate · homes · year. */
export function communityScale(c: GatedCommunity, locale: Locale) {
  const parts: string[] = [gateLabel(c.gateType, locale)];
  if (c.homesCount) parts.push(homesLabel(c.homesCount, locale));
  if (c.builtYear) parts.push(c.builtYear);
  return parts.join(" · ");
}
