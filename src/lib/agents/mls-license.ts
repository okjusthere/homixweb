export interface RosterMember {
  memberKey: string;
  memberMlsId: string;
  fullName: string;
  stateLicense?: string;
  status?: string;
}

export type LicenseMatch =
  | { status: "empty" }
  | { status: "unmatched" }
  | { status: "ambiguous"; matches: RosterMember[] }
  | { status: "matched"; member: RosterMember };

/** Digits-only view of a license number ("# 10401337464" -> "10401337464"). */
export function normalizeLicense(value: string | null | undefined): string {
  return (value ?? "").replace(/\D/g, "");
}

/** Resolve only a unique, exact state-license match. Names are never guessed. */
export function matchRosterMemberByLicense(
  license: string | null | undefined,
  roster: RosterMember[],
): LicenseMatch {
  const wanted = normalizeLicense(license);
  if (!wanted) return { status: "empty" };

  const matches = roster.filter(
    (member) => normalizeLicense(member.stateLicense) === wanted,
  );
  if (matches.length === 0) return { status: "unmatched" };
  if (matches.length > 1) return { status: "ambiguous", matches };
  return { status: "matched", member: matches[0] };
}
