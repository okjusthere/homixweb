"use server";

import { redirect } from "next/navigation";
import { portalSignIn, portalSignOut } from "@/lib/portal-auth";

export interface PortalActionState {
  error?: string;
}

export async function portalLoginAction(
  _prev: PortalActionState | null,
  formData: FormData,
): Promise<PortalActionState> {
  const name = String(formData.get("name") || "");
  const ok = await portalSignIn(name, String(formData.get("password") || ""));
  if (!ok) return { error: "wrong" };
  redirect("/portal");
}

export async function portalLogoutAction(): Promise<void> {
  await portalSignOut();
  redirect("/portal/login");
}
