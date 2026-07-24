import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { saveAgentProfileFromForm } from "@/lib/agents/save-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin edit of ANY advisor's public profile, keyed by public agent id (so it
// reaches advisors with no portal account). Same shared save core as the
// self-service editor, so validation / image upload / MLS verification / cache
// revalidation stay single-sourced. Auth is the shared server-to-server secret;
// the portal admin-gates the caller before forwarding here.
function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

/** GET ?id=slug → one advisor's editable profile (404 if none). */
export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data, error } = await sb
    .from("agents")
    .select(
      "id, slug, name, title, phone, email, bio, license_number, specialties, languages, social, wechat_qr, reviews, stats, testimonials, photo_url, show_past_deals, visible, mls_id, portal_agent_id",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ profile: data }, { headers: { "Cache-Control": "no-store" } });
}

/** POST (multipart: id + profile fields + optional photo/qr) → apply the edit. */
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
  const id = String(formData.get("id") || "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data: agent, error } = await sb.from("agents").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const result = await saveAgentProfileFromForm(agent, formData);
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
    headers: { "Cache-Control": "no-store" },
  });
}
