import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { syncAgentIdentity } from "@/lib/agents/sync-identity";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Create a public advisor profile for a portal agent who doesn't have one yet,
// and link it (portal_agent_id). Admin creation/approval is the company's
// authorization to list the advisor, so new profiles start visible with a
// deliberately minimal card. The advisor fills in the rest from the portal.
function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

/** Mirror the admin slug rule: lowercase, non-alnum → "-", trimmed, capped. */
function kebab(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const portalAgentId = Number(body.portalAgentId);
  const name = String(body.name || "").trim();
  if (!Number.isInteger(portalAgentId) || portalAgentId <= 0) {
    return NextResponse.json({ error: "portalAgentId required" }, { status: 400 });
  }
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  // Already published? Return the existing link (idempotent).
  const { data: existing } = await sb
    .from("agents")
    .select("id, slug, visibility_status")
    .eq("portal_agent_id", portalAgentId)
    .maybeSingle();
  if (existing) {
    const identity = await syncAgentIdentity({
      portalAgentId,
      name,
      phone: body.phone,
      license: body.license,
    });
    if (!identity.ok) {
      return NextResponse.json(
        { error: identity.error || "Identity synchronization failed." },
        { status: 500 },
      );
    }
    return NextResponse.json({
      published: true,
      alreadyLinked: true,
      ...existing,
      notice: identity.notice,
    });
  }

  // Unique slug (single collision retry, same as the admin flow).
  let slug = kebab(name) || `advisor-${randomBytes(2).toString("hex")}`;
  const { data: slugTaken } = await sb.from("agents").select("id").eq("slug", slug).maybeSingle();
  if (slugTaken) slug = `${slug}-${randomBytes(2).toString("hex")}`;

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
    // The Google login email is an internal identity and must never become the
    // public contact email. Advisors add a public email from their profile.
    email: null,
    // Identity synchronization below owns these fields. Keeping the initial
    // license empty guarantees a newly linked profile runs MLS verification.
    phone: null,
    license_number: null,
    title: "Licensed Real Estate Salesperson",
    photo_url: "/agent-placeholder-logo.png",
    specialties: [],
    social: {},
    sort,
    visibility_status: "visible",
    portal_agent_id: portalAgentId,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const identity = await syncAgentIdentity({
    portalAgentId,
    name,
    phone: body.phone,
    license: body.license,
  });
  if (!identity.ok) {
    return NextResponse.json(
      {
        error: identity.error || "Profile created, but identity synchronization failed.",
        published: true,
        slug,
        id: slug,
      },
      { status: 500 },
    );
  }

  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({
    published: true,
    slug,
    id: slug,
    visibility_status: "visible",
    notice: identity.notice,
  });
}
