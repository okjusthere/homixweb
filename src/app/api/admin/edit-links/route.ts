import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const provided =
    new URL(req.url).searchParams.get("secret") || req.headers.get("x-admin-secret");
  return provided === secret;
}

/**
 * List every advisor's private edit link (to distribute).
 *   GET /api/admin/edit-links?secret=YOUR_ADMIN_SECRET
 */
export async function GET(req: Request): Promise<Response> {
  if (!authorized(req)) return new NextResponse("Unauthorized", { status: 401 });
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }

  const { data, error } = await sb
    .from("agents")
    .select("name, slug, edit_token")
    .order("sort", { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(req.url).origin;
  const links = (data ?? []).map((r) => ({
    name: r.name,
    slug: r.slug,
    editUrl: `${base}/edit/${r.edit_token}`,
  }));
  return NextResponse.json({ ok: true, count: links.length, links });
}
