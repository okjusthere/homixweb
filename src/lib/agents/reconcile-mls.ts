import "server-only";
import { getMlsRoster, matchRosterMemberByLicense } from "@/lib/agents/mls-roster";
import { revalidatePublicAgents } from "@/lib/agents/revalidate";
import { getSupabase } from "@/lib/supabase";

type UnverifiedAgent = {
  id: string;
  slug: string;
  license_number: string | null;
};

export type AgentMlsReconciliationResult = {
  ok: boolean;
  scanned: number;
  matched: number;
  unmatched: number;
  ambiguous: number;
  claimed: number;
  invalid: number;
  failures: number;
  error?: string;
};

const emptyResult = (): AgentMlsReconciliationResult => ({
  ok: false,
  scanned: 0,
  matched: 0,
  unmatched: 0,
  ambiguous: 0,
  claimed: 0,
  invalid: 0,
  failures: 0,
});

/**
 * Retry MLS identity verification for profiles whose license was saved before
 * the BBO roster was ready. Exact license matches are the only accepted link.
 */
export async function reconcileUnverifiedAgentMlsIds(): Promise<AgentMlsReconciliationResult> {
  const sb = getSupabase();
  if (!sb) return { ...emptyResult(), error: "Supabase is not configured." };

  const roster = await getMlsRoster({ fresh: true });
  if (roster.length === 0) {
    return { ...emptyResult(), error: "The MLS roster is unavailable." };
  }

  const [{ data: candidates, error: candidateError }, { data: linked, error: linkedError }] =
    await Promise.all([
      sb
        .from("agents")
        .select("id, slug, license_number")
        .not("license_number", "is", null)
        .is("mls_id", null),
      sb.from("agents").select("id, mls_id").not("mls_id", "is", null),
    ]);
  if (candidateError || linkedError) {
    return {
      ...emptyResult(),
      error: candidateError?.message || linkedError?.message || "Unable to load agent identities.",
    };
  }

  const rows = (candidates ?? []) as UnverifiedAgent[];
  const claimedMlsIds = new Set(
    (linked ?? [])
      .map((row) => String(row.mls_id || "").trim().toUpperCase())
      .filter(Boolean),
  );
  const result: AgentMlsReconciliationResult = {
    ...emptyResult(),
    ok: true,
    scanned: rows.length,
  };
  const updatedSlugs: string[] = [];

  for (const agent of rows) {
    const match = matchRosterMemberByLicense(agent.license_number, roster);
    if (match.status === "empty") {
      result.invalid += 1;
      continue;
    }
    if (match.status === "unmatched") {
      result.unmatched += 1;
      continue;
    }
    if (match.status === "ambiguous") {
      result.ambiguous += 1;
      continue;
    }

    const normalizedMlsId = match.member.memberMlsId.trim().toUpperCase();
    if (claimedMlsIds.has(normalizedMlsId)) {
      result.claimed += 1;
      continue;
    }

    const { data: updated, error } = await sb
      .from("agents")
      .update({
        mls_id: match.member.memberMlsId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", agent.id)
      .is("mls_id", null)
      .select("id")
      .maybeSingle();
    if (error) {
      result.failures += 1;
      continue;
    }
    if (!updated) continue;

    claimedMlsIds.add(normalizedMlsId);
    result.matched += 1;
    updatedSlugs.push(agent.slug);
  }

  for (const slug of updatedSlugs) revalidatePublicAgents(slug);
  return result;
}
