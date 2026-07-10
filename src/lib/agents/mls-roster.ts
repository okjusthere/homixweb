import "server-only";

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

export interface RosterMember {
  memberKey: string;
  memberMlsId: string;
  fullName: string;
  stateLicense?: string;
  status?: string;
}

interface RosterResponse {
  members?: {
    memberKey?: string;
    memberMlsId?: string;
    fullName?: string;
    stateLicense?: string;
    status?: string;
  }[];
}

/** Digits-only view of a license number ("# 10401337464" → "10401337464"). */
export function normalizeLicense(v: string | null | undefined): string {
  return (v ?? "").replace(/\D/g, "");
}

/** Fetch the office roster from BBO (revalidated hourly; [] on any failure). */
export async function getMlsRoster(): Promise<RosterMember[]> {
  const apiUrl = (process.env.BBO_API_URL || "https://onekey.kevv.ai").replace(/\/$/, "");
  const apiKey = process.env.BBO_API_KEY || "";
  if (!apiKey) return [];
  try {
    const res = await fetch(`${apiUrl}/api/v1/agents/roster`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      next: { revalidate: 3600 },
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
  const wanted = normalizeLicense(license);
  if (wanted.length < 6) return null;
  const roster = await getMlsRoster();
  const hits = roster.filter((m) => normalizeLicense(m.stateLicense) === wanted);
  return hits.length === 1 ? hits[0] : null;
}
