import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Agent-portal session — the gate in front of /portal (training + resources).
 *
 * INTERIM mechanism: a single shared access password (PORTAL_PASSWORD), the same
 * proven HMAC-cookie scheme as the admin login. The password never lands in the
 * cookie; the cookie holds an HMAC derived from it, so it can't be forged.
 *
 * This is a deliberate scaffold. When Supabase Auth is enabled we swap the
 * internals of `requirePortal()` for per-agent magic-link sessions (so we can
 * revoke individuals, audit who watched, and stamp a real per-person watermark)
 * WITHOUT touching the portal pages — they only call `requirePortal()`.
 *
 * When PORTAL_PASSWORD is unset the portal runs in PREVIEW mode: viewable, with a
 * banner, and unenforced — so the skeleton can be reviewed before the lock is on.
 */
const COOKIE = "homix_portal";
const WHO_COOKIE = "homix_portal_who"; // display name for the watermark (not a secret)

function sessionToken(): string | null {
  const pw = process.env.PORTAL_PASSWORD;
  if (!pw) return null;
  return createHmac("sha256", pw).update("homix-portal-session-v1").digest("hex");
}

export function isPortalConfigured(): boolean {
  return Boolean(process.env.PORTAL_PASSWORD);
}

export async function isPortalMember(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const store = await cookies();
  const got = store.get(COOKIE)?.value;
  if (!got || got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

/** Display identity for the watermark / greeting. */
export async function getPortalIdentity(): Promise<string | null> {
  const store = await cookies();
  return store.get(WHO_COOKIE)?.value || null;
}

export async function portalSignIn(name: string, password: string): Promise<boolean> {
  const pw = process.env.PORTAL_PASSWORD;
  if (!pw || password !== pw) return false;
  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";
  store.set(COOKIE, sessionToken()!, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  store.set(WHO_COOKIE, (name.trim() || "Homix agent").slice(0, 60), {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function portalSignOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
  store.delete(WHO_COOKIE);
}

export interface PortalAccess {
  preview: boolean;
  identity: string;
}

/**
 * Gate helper for portal pages. Redirects to /portal/login when locked.
 * In preview mode (no password set) it allows access so the skeleton renders.
 */
export async function requirePortal(): Promise<PortalAccess> {
  if (!isPortalConfigured()) return { preview: true, identity: "Preview" };
  if (await isPortalMember()) {
    return { preview: false, identity: (await getPortalIdentity()) || "Homix agent" };
  }
  redirect("/portal/login");
}
