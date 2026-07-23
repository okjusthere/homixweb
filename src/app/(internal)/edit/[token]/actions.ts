"use server";

import { getSupabase } from "@/lib/supabase";
import { saveAgentProfileFromForm, type SaveState } from "@/lib/agents/save-profile";

export type { SaveState };

/**
 * Magic-link profile save. Identity is proven by possession of the secret
 * edit_token (the public site has no agent login). Once the agent is resolved,
 * all the real work — validation, image upload, MLS verification, the DB write,
 * cache revalidation — lives in the shared core so the portal API and this
 * action can never drift. (Agents who log into agents.homixny.com edit the
 * same profile there without a magic link.)
 */
export async function updateAgentProfile(
  _prev: SaveState | null,
  formData: FormData,
): Promise<SaveState> {
  const token = String(formData.get("token") || "");
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Editing isn't configured yet." };
  if (!token) return { ok: false, error: "Missing edit token." };

  // Full-row select doubles as feature detection: mls_id / show_past_deals only
  // exist after the career-columns migration, and the update payload must not
  // reference columns that aren't there yet.
  const { data: agent, error: lookupErr } = await sb
    .from("agents")
    .select("*")
    .eq("edit_token", token)
    .maybeSingle();
  if (lookupErr) return { ok: false, error: `Couldn't load your profile: ${lookupErr.message}` };
  if (!agent) return { ok: false, error: "This edit link is invalid or expired." };

  return saveAgentProfileFromForm(agent, formData);
}
