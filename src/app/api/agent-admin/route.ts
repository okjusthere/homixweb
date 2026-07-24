import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Portal-facing admin console for the public advisor roster (public.agents).
// This replaces the old website /admin page: agents.homixny.com authenticates an
// admin (Google/NextAuth) and forwards management actions here over the shared
// server-to-server secret. Keyed by PUBLIC agent id, so it covers every advisor —
// including those with no portal account (which portal_agent_id editing can't
// reach). Per-profile field editing lives in ./edit (multipart, reuses the core).
function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
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
    .select("id, name, slug, visible, sort, portal_agent_id, photo_url, license_number")
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ agents: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

/** POST → a JSON management action: create | visible | reorder | delete. */
export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "create") {
    const name = String(body.name || "").trim();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    let slug = kebab(name) || `advisor-${randomBytes(2).toString("hex")}`;
    const { data: exists } = await sb.from("agents").select("slug").eq("slug", slug).maybeSingle();
    if (exists) slug = `${slug}-${randomBytes(2).toString("hex")}`;

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
      edit_token: randomBytes(20).toString("hex"),
      sort,
      visible: true,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePublicAgents();
    return NextResponse.json({ ok: true, id: slug, slug });
  }

  if (action === "visible") {
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const { error } = await sb.from("agents").update({ visible: !!body.visible }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePublicAgents();
    return NextResponse.json({ ok: true });
  }

  if (action === "delete") {
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const { error } = await sb.from("agents").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePublicAgents();
    return NextResponse.json({ ok: true });
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
