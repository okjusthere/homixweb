import "server-only";
import {
  matchRosterMemberByLicense,
  type RosterMember,
} from "@/lib/agents/mls-license";

export {
  matchRosterMemberByLicense,
  normalizeLicense,
  type LicenseMatch,
  type RosterMember,
} from "@/lib/agents/mls-license";

/**
 * MLS roster lookup — powers self-service license verification.
 *
 * NY license numbers are DOS-issued digits (e.g. 10401337464) and are NOT the
 * MLS member id (e.g. KEY207692) — but every OneKey member record carries the
 * license in MemberStateLicense, so a self-entered license number can be
 * cross-checked against the official roster and, on an exact match, resolve
 * the member id automatically. A typo simply fails to match (or matches
 * nobody), so a wrong number can never attach someone else's production
 * unless it is literally another Homix agent's real license — which the
 * caller guards against separately (mls_id uniqueness across agents).
 */

interface RosterResponse {
  members?: {
    memberKey?: string;
    memberMlsId?: string;
    fullName?: string;
    stateLicense?: string;
    status?: string;
  }[];
}

/** Fetch the office roster from BBO (revalidated hourly; [] on any failure). */
export async function getMlsRoster(options?: { fresh?: boolean }): Promise<RosterMember[]> {
  const apiUrl = (process.env.BBO_API_URL || "https://onekey.kevv.ai").replace(/\/$/, "");
  const apiKey = process.env.BBO_API_KEY || "";
  if (!apiKey) return [];
  try {
    const res = await fetch(`${apiUrl}/api/v1/agents/roster`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      ...(options?.fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: 3600 } }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const payload = (await res.json()) as RosterResponse;
    return (payload.members ?? [])
      .filter((m) => m.memberKey && m.memberMlsId)
      .map((m) => ({
        memberKey: m.memberKey as string,
        memberMlsId: m.memberMlsId as string,
        fullName: m.fullName ?? "",
        stateLicense: m.stateLicense || undefined,
        status: m.status || undefined,
      }));
  } catch {
    return [];
  }
}

/** Find the roster member whose state license matches (digits compared). */
export async function findRosterMemberByLicense(
  license: string,
): Promise<RosterMember | null> {
  const roster = await getMlsRoster();
  const result = matchRosterMemberByLicense(license, roster);
  return result.status === "matched" ? result.member : null;
}
