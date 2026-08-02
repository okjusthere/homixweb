import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { saveAgentProfileFromForm } from "@/lib/agents/save-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Portal-facing public-profile API. agents.homixny.com authenticates the agent
// (Google/NextAuth) and resolves which public profile is theirs via
// public.agents.portal_agent_id; this endpoint is the website-side writer so
// all public.agents logic (validation, MLS verification, image upload, cache
// revalidation) stays in one place. Auth is the shared server-to-server secret;
// the portal supplies portalAgentId from its own session, never from the client.
function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

// Columns the portal editor needs to populate its form.
const PROFILE_COLUMNS =
  "id, slug, name, title, phone, email, bio, bio_zh, license_number, specialties, languages, social, wechat_qr, reviews, stats, testimonials, photo_url, show_past_deals, visibility_status, mls_id, portal_agent_id";

/** GET ?portalAgentId=N → the linked public profile for editing (404 if none). */
export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const portalAgentId = Number(req.nextUrl.searchParams.get("portalAgentId"));
  if (!Number.isInteger(portalAgentId) || portalAgentId <= 0) {
    return NextResponse.json({ error: "portalAgentId required" }, { status: 400 });
  }

  const { data, error } = await sb
    .from("agents")
    .select(PROFILE_COLUMNS)
    .eq("portal_agent_id", portalAgentId)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ linked: false }, { status: 404 });
  return NextResponse.json(
    { linked: true, profile: data },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/** POST (multipart FormData: portalAgentId + profile fields + optional photo/qr).
 *  Finds the linked public profile and applies the edit via the shared core. */
export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }
  const portalAgentId = Number(formData.get("portalAgentId"));
  if (!Number.isInteger(portalAgentId) || portalAgentId <= 0) {
    return NextResponse.json({ error: "portalAgentId required" }, { status: 400 });
  }

  // Full-row select — feature-detects mls_id / show_past_deals for the core.
  const { data: agent, error } = await sb
    .from("agents")
    .select("*")
    .eq("portal_agent_id", portalAgentId)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!agent) {
    return NextResponse.json(
      { error: "This agent has no public profile yet — publish one first." },
      { status: 404 },
    );
  }

  const result = await saveAgentProfileFromForm(agent, formData);
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
    headers: { "Cache-Control": "no-store" },
  });
}
