"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export interface SaveState {
  ok: boolean;
  error?: string;
}

const SOCIAL_KEYS = ["instagram", "xiaohongshu", "douyin", "linkedin", "website"] as const;

export async function updateAgentProfile(
  _prev: SaveState | null,
  formData: FormData,
): Promise<SaveState> {
  const token = String(formData.get("token") || "");
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Editing isn't configured yet." };
  if (!token) return { ok: false, error: "Missing edit token." };

  const { data: agent } = await sb
    .from("agents")
    .select("id, slug, photo_url")
    .eq("edit_token", token)
    .maybeSingle();
  if (!agent) return { ok: false, error: "This edit link is invalid or expired." };

  // Optional new headshot.
  let photoUrl: string | null = agent.photo_url;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    if (file.size > 8 * 1024 * 1024) {
      return { ok: false, error: "Photo is too large (max 8MB)." };
    }
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${agent.slug}/${Date.now()}.${ext || "jpg"}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await sb.storage
      .from("agent-photos")
      .upload(path, buf, { contentType: file.type || "image/jpeg", upsert: true });
    if (upErr) return { ok: false, error: `Upload failed: ${upErr.message}` };
    photoUrl = sb.storage.from("agent-photos").getPublicUrl(path).data.publicUrl;
  }

  const specialties = String(formData.get("specialties") || "")
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const social: Record<string, string> = {};
  for (const k of SOCIAL_KEYS) {
    const v = String(formData.get(`social_${k}`) || "").trim();
    if (v) social[k] = v;
  }

  const { error } = await sb
    .from("agents")
    .update({
      name: String(formData.get("name") || "").trim(),
      title: String(formData.get("title") || "").trim() || "Licensed Real Estate Salesperson",
      phone: String(formData.get("phone") || "").trim() || null,
      email: String(formData.get("email") || "").trim() || null,
      bio: String(formData.get("bio") || "").trim() || null,
      license_number: String(formData.get("license") || "").trim() || null,
      specialties,
      social,
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("edit_token", token);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/agents/${agent.slug}`);
  revalidatePath("/agents");
  return { ok: true };
}
