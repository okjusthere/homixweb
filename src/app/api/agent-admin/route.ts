import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Portal-facing admin console for the public advisor roster (public.agents).
// This replaces the old website /admin page: agents.homixny.com authenticates an
// admin (Google/NextAuth) and forwards management actions here over the shared
// server-to-server secret. Account creation/deactivation lives in the portal;
// this endpoint only controls public visibility and ordering.
function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function revalidatePublicAgents() {
  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
}

/** GET → the full roster for the admin console (all advisors, hidden included). */
export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const { data, error } = await sb
    .from("agents")
    .select("id, name, slug, visibility_status, sort, portal_agent_id, photo_url, license_number")
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ agents: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

/** POST → a JSON management action: visibility | reorder. */
export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "visibility") {
    const id = String(body.id || "");
    const portalAgentId = Number(body.portalAgentId);
    if (!id && (!Number.isInteger(portalAgentId) || portalAgentId <= 0)) {
      return NextResponse.json({ error: "id or portalAgentId required" }, { status: 400 });
    }
    const visibilityStatus = String(body.visibilityStatus || "");
    if (!["visible", "admin_hidden"].includes(visibilityStatus)) {
      return NextResponse.json({ error: "Invalid admin visibility status" }, { status: 400 });
    }
    const update = sb.from("agents").update({
      visibility_status: visibilityStatus,
      updated_at: new Date().toISOString(),
    });
    const { data, error } = id
      ? await update.eq("id", id).select("id, slug").maybeSingle()
      : await update.eq("portal_agent_id", portalAgentId).select("id, slug").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Linked public profile not found" }, { status: 404 });
    revalidatePublicAgents();
    return NextResponse.json({ ok: true, id: data.id, visibilityStatus });
  }

  if (action === "reorder") {
    const ids = (Array.isArray(body.ids) ? body.ids : [])
      .map((x: unknown) => String(x).trim())
      .filter(Boolean);
    const uniqueIds: string[] = Array.from(new Set(ids));
    if (ids.length === 0) return NextResponse.json({ error: "No advisors to reorder." }, { status: 400 });
    if (uniqueIds.length !== ids.length) {
      return NextResponse.json({ error: "Duplicate advisor in order." }, { status: 400 });
    }
    // Guard against a stale client list: the ids must match the roster exactly.
    const { data: existing, error: loadErr } = await sb.from("agents").select("id");
    if (loadErr) return NextResponse.json({ error: loadErr.message }, { status: 500 });
    const existingIds = new Set((existing ?? []).map((r) => r.id));
    if (existingIds.size !== uniqueIds.length || uniqueIds.some((id) => !existingIds.has(id))) {
      return NextResponse.json({ error: "Advisor list changed. Refresh and try again." }, { status: 409 });
    }
    const results = await Promise.all(
      uniqueIds.map((id, i) => sb.from("agents").update({ sort: (i + 1) * 10 }).eq("id", id)),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) return NextResponse.json({ error: failed.error.message }, { status: 500 });
    revalidatePublicAgents();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
