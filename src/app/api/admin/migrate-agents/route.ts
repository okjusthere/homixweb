import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { MOCK_AGENTS } from "@/lib/listings/mock-data";
import { getSupabase } from "@/lib/supabase";
import { getOriginFromRequest } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const provided =
    new URL(req.url).searchParams.get("secret") || req.headers.get("x-admin-secret");
  return provided === secret;
}

/**
 * One-time (idempotent) seed: copy the static roster into Supabase, generating a
 * stable secret edit token per advisor. Re-running ignores existing rows, so it
 * never clobbers an advisor's own edits. Returns each advisor's edit link.
 *
 *   GET /api/admin/migrate-agents?secret=YOUR_ADMIN_SECRET
 */
export async function GET(req: Request): Promise<Response> {
  if (!authorized(req)) return new NextResponse("Unauthorized", { status: 401 });
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }

  const { data: existing } = await sb.from("agents").select("id, edit_token");
  const tokenById = new Map((existing ?? []).map((r) => [r.id, r.edit_token as string]));

  const rows = MOCK_AGENTS.map((a, i) => ({
    id: a.id,
    slug: a.slug,
    name: a.name,
    title: a.title,
    photo_url: a.photo,
    phone: a.phone || null,
    email: a.email || null,
    bio: a.bio || null,
    specialties: a.specialties ?? [],
    social: a.social ?? {},
    license_number: a.licenseNumber ?? null,
    profile_url: a.profileUrl ?? null,
    edit_token: tokenById.get(a.id) || randomBytes(20).toString("hex"),
    sort: i,
    visible: true,
  }));

  const { error } = await sb
    .from("agents")
    .upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const base = getOriginFromRequest(req);
  const links = rows.map((r) => ({
    name: r.name,
    slug: r.slug,
    editUrl: `${base}/edit/${r.edit_token}`,
  }));
  return NextResponse.json({ ok: true, seeded: rows.length, links });
}
