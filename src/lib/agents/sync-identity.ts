import "server-only";
import { revalidateTag } from "next/cache";
import {
  getMlsRoster,
  matchRosterMemberByLicense,
  normalizeLicense,
} from "@/lib/agents/mls-roster";
import { revalidatePublicAgents } from "@/lib/agents/revalidate";
import { AGENT_CAREER_CACHE_TAG } from "@/lib/listings/cache";
import { getSupabase } from "@/lib/supabase";

function cleanText(value: unknown): string {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim();
}

export type IdentitySyncResult = {
  ok: boolean;
  error?: string;
  notice?: string;
  slug?: string;
  verificationStatus?: MlsVerificationStatus;
  mlsId?: string;
};

export type MlsVerificationStatus =
  | "not_provided"
  | "verified"
  | "unavailable"
  | "unmatched"
  | "ambiguous"
  | "claimed";

/**
 * Mirror portal-owned identity fields into one linked public profile.
 * Public profile forms never write these fields directly.
 */
export async function syncAgentIdentity(input: {
  portalAgentId: number;
  name: unknown;
  phone: unknown;
  license: unknown;
  preserveMissing?: boolean;
}): Promise<IdentitySyncResult> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Not configured" };

  const name = cleanText(input.name);
  const suppliedPhone = cleanText(input.phone);
  const suppliedLicense = cleanText(input.license);
  if (!name) return { ok: false, error: "Name required" };

  const { data: agent, error: loadError } = await sb
    .from("agents")
    .select("id, slug, phone, license_number, mls_id")
    .eq("portal_agent_id", input.portalAgentId)
    .maybeSingle();
  if (loadError) return { ok: false, error: loadError.message };
  if (!agent) return { ok: false, error: "Linked public profile not found" };

  const phone = input.preserveMissing && !suppliedPhone
    ? agent.phone
    : suppliedPhone || null;
  const license = input.preserveMissing && !suppliedLicense
    ? agent.license_number
    : suppliedLicense || null;

  let nextMlsId: string | null = agent.mls_id;
  let notice: string | undefined;
  let verificationStatus: MlsVerificationStatus = license
    ? agent.mls_id
      ? "verified"
      : "unmatched"
    : "not_provided";
  const licenseChanged =
    normalizeLicense(license) !== normalizeLicense(agent.license_number);
  if (licenseChanged || (license && !agent.mls_id)) {
    if (licenseChanged) nextMlsId = null;
    if (license) {
      const roster = await getMlsRoster();
      const match = matchRosterMemberByLicense(license, roster);
      if (roster.length === 0) {
        verificationStatus = "unavailable";
        notice = "License saved; MLS verification is temporarily unavailable and will retry automatically.";
      } else if (match.status === "matched") {
        const { data: claimed, error: claimedError } = await sb
          .from("agents")
          .select("id")
          .eq("mls_id", match.member.memberMlsId)
          .neq("id", agent.id)
          .limit(1)
          .maybeSingle();
        if (claimedError) return { ok: false, error: claimedError.message };
        if (claimed) {
          verificationStatus = "claimed";
          notice = "License is already linked to another public profile; past sales remain hidden.";
        } else {
          nextMlsId = match.member.memberMlsId;
          verificationStatus = "verified";
          notice = `License verified against the MLS roster (${match.member.fullName}).`;
        }
      } else if (match.status === "ambiguous") {
        verificationStatus = "ambiguous";
        notice = "License matches multiple MLS roster records and requires administrator review.";
      } else {
        verificationStatus = "unmatched";
        notice = "License saved but did not match exactly one Homix MLS member.";
      }
    }
  }

  const updatedAt = new Date().toISOString();
  const { error } = await sb
    .from("agents")
    .update({
      name,
      phone,
      license_number: license,
      mls_id: nextMlsId,
      updated_at: updatedAt,
    })
    .eq("id", agent.id);
  if (error) return { ok: false, error: error.message };

  const { error: shareVersionError } = await sb
    .from("share_links")
    .update({ updated_at: updatedAt })
    .eq("agent_id", input.portalAgentId);
  if (shareVersionError && shareVersionError.code !== "42P01") {
    console.warn("Unable to refresh share-card versions:", shareVersionError.message);
  }

  // Identity changes alter the BBO career lookup key. Expire prior empty or
  // mismatched career responses before regenerating the public profile.
  revalidateTag(AGENT_CAREER_CACHE_TAG, { expire: 0 });
  revalidatePublicAgents(agent.slug);
  return {
    ok: true,
    slug: agent.slug,
    notice,
    verificationStatus,
    mlsId: nextMlsId || undefined,
  };
}
