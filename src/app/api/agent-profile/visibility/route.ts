import { NextRequest, NextResponse } from "next/server";
import { revalidatePublicAgents } from "@/lib/agents/revalidate";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const portalAgentId = Number(body.portalAgentId);
  const visibilityStatus = String(body.visibilityStatus || "");
  if (!Number.isInteger(portalAgentId) || portalAgentId <= 0) {
    return NextResponse.json({ error: "portalAgentId required" }, { status: 400 });
  }
  if (!["visible", "agent_hidden"].includes(visibilityStatus)) {
    return NextResponse.json({ error: "Invalid agent visibility status" }, { status: 400 });
  }

  const { data: agent, error: loadError } = await sb
    .from("agents")
    .select("id, slug, visibility_status")
    .eq("portal_agent_id", portalAgentId)
    .maybeSingle();
  if (loadError) return NextResponse.json({ error: loadError.message }, { status: 500 });
  if (!agent) return NextResponse.json({ error: "Linked public profile not found" }, { status: 404 });
  if (agent.visibility_status === "admin_hidden") {
    return NextResponse.json(
      { error: "This profile is hidden by an administrator.", visibilityStatus: "admin_hidden" },
      { status: 409 },
    );
  }

  const { error } = await sb
    .from("agents")
    .update({ visibility_status: visibilityStatus, updated_at: new Date().toISOString() })
    .eq("id", agent.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePublicAgents(agent.slug);
  return NextResponse.json({ ok: true, visibilityStatus });
}
