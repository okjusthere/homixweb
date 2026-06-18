"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, signIn, signOut } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export interface ActionState {
  ok: boolean;
  error?: string;
  editUrl?: string;
  name?: string;
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function editUrl(token: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  return `${base}/edit/${token}`;
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
  return { ok: true, name, editUrl: editUrl(token) };
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

export async function deleteAgentAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const sb = getSupabase();
  if (!sb) return;
  const id = String(formData.get("id") || "");
  await sb.from("agents").delete().eq("id", id);
  revalidatePath("/agents");
  revalidatePath("/admin");
}
