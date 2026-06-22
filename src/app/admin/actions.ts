"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, signIn, signOut } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";
import { getOrigin } from "@/lib/site-url";

export interface ActionState {
  ok: boolean;
  error?: string;
  editUrl?: string;
  name?: string;
  message?: string;
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

async function editUrl(token: string): Promise<string> {
  return `${await getOrigin()}/edit/${token}`;
}

export async function loginAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const ok = await signIn(String(formData.get("password") || ""));
  if (!ok) return { ok: false, error: "Wrong password." };
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/admin");
}

export async function addAgentAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase not configured." };

  const name = String(formData.get("name") || "").trim();
  if (!name) return { ok: false, error: "Please enter a name." };

  let slug = kebab(name) || `advisor-${randomBytes(2).toString("hex")}`;
  const { data: exists } = await sb.from("agents").select("slug").eq("slug", slug).maybeSingle();
  if (exists) slug = `${slug}-${randomBytes(2).toString("hex")}`;

  const token = randomBytes(20).toString("hex");
  const { data: maxRow } = await sb
    .from("agents")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort = (maxRow?.sort ?? 0) + 1;

  const { error } = await sb.from("agents").insert({
    id: slug,
    slug,
    name,
    title: "Licensed Real Estate Salesperson",
    photo_url: "/agent-placeholder-logo.png",
    specialties: [],
    social: {},
    edit_token: token,
    sort,
    visible: true,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/agents");
  revalidatePath("/admin");
  return { ok: true, name, editUrl: await editUrl(token) };
}

export async function toggleVisibleAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  const id = String(formData.get("id") || "");
  const visible = String(formData.get("visible") || "") === "true";
  await sb.from("agents").update({ visible: !visible }).eq("id", id);
  revalidatePath("/agents");
  revalidatePath("/admin");
}

export async function updateAgentOrderAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase not configured." };

  const ids = formData
    .getAll("ids")
    .map((id) => String(id).trim())
    .filter(Boolean);
  const uniqueIds = Array.from(new Set(ids));

  if (ids.length === 0) return { ok: false, error: "No advisors to reorder." };
  if (uniqueIds.length !== ids.length) {
    return { ok: false, error: "Duplicate advisor in order. Refresh and try again." };
  }

  const { data: existing, error: loadError } = await sb.from("agents").select("id");
  if (loadError) return { ok: false, error: loadError.message };

  const existingIds = new Set((existing ?? []).map((row) => row.id));
  if (existingIds.size !== uniqueIds.length || uniqueIds.some((id) => !existingIds.has(id))) {
    return { ok: false, error: "Advisor list changed. Refresh and try again." };
  }

  const updates = await Promise.all(
    uniqueIds.map((id, index) =>
      sb
        .from("agents")
        .update({ sort: (index + 1) * 10 })
        .eq("id", id),
    ),
  );
  const failed = updates.find((result) => result.error);
  if (failed?.error) return { ok: false, error: failed.error.message };

  revalidatePath("/agents");
  revalidatePath("/admin");
  return { ok: true, message: "Order saved." };
}

export async function deleteAgentAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  const id = String(formData.get("id") || "");
  await sb.from("agents").delete().eq("id", id);
  revalidatePath("/agents");
  revalidatePath("/admin");
}

// --- Training videos (agent portal) ----------------------------------------

export async function addTrainingVideoAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase not configured." };

  const title = String(formData.get("title") || "").trim();
  if (!title) return { ok: false, error: "Please enter a title." };

  const { data: maxRow } = await sb
    .from("training_videos")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort = (maxRow?.sort ?? 0) + 10;

  const { error } = await sb.from("training_videos").insert({
    id: `tv_${randomBytes(8).toString("hex")}`,
    title,
    cloudflare_uid: String(formData.get("cloudflare_uid") || "").trim() || null,
    category: String(formData.get("category") || "").trim() || "Training",
    duration: String(formData.get("duration") || "").trim() || null,
    summary: String(formData.get("summary") || "").trim() || null,
    sort,
    visible: true,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/training");
  revalidatePath("/portal/training");
  return { ok: true, message: "Video added." };
}

export async function toggleTrainingVisibleAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  const id = String(formData.get("id") || "");
  const visible = String(formData.get("visible") || "") === "true";
  await sb.from("training_videos").update({ visible: !visible }).eq("id", id);
  revalidatePath("/admin/training");
  revalidatePath("/portal/training");
}

export async function deleteTrainingVideoAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("training_videos").delete().eq("id", String(formData.get("id") || ""));
  revalidatePath("/admin/training");
  revalidatePath("/portal/training");
}

// --- Resource library (agent portal) ---------------------------------------

export async function addResourceAction(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase not configured." };

  const title = String(formData.get("title") || "").trim();
  if (!title) return { ok: false, error: "Please enter a title." };
  const url = String(formData.get("url") || "").trim();
  if (!url) return { ok: false, error: "Please add a link (URL)." };

  const { data: maxRow } = await sb
    .from("resources")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort = (maxRow?.sort ?? 0) + 10;

  const { error } = await sb.from("resources").insert({
    id: `res_${randomBytes(8).toString("hex")}`,
    title,
    url,
    category: String(formData.get("category") || "").trim() || "Resources",
    description: String(formData.get("description") || "").trim() || null,
    sort,
    visible: true,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/resources");
  revalidatePath("/portal/resources");
  return { ok: true, message: "Resource added." };
}

export async function toggleResourceVisibleAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  const id = String(formData.get("id") || "");
  const visible = String(formData.get("visible") || "") === "true";
  await sb.from("resources").update({ visible: !visible }).eq("id", id);
  revalidatePath("/admin/resources");
  revalidatePath("/portal/resources");
}

export async function deleteResourceAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("resources").delete().eq("id", String(formData.get("id") || ""));
  revalidatePath("/admin/resources");
  revalidatePath("/portal/resources");
}
