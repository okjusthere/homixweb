import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";
import { revalidatePublicAgents as revalidateAgentPaths } from "@/lib/agents/revalidate";
import { syncAgentIdentity } from "@/lib/agents/sync-identity";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Portal-facing admin console for the public advisor roster (public.agents).
// This replaces the old website /admin page: agents.homixny.com authenticates an
// admin (Google/NextAuth) and forwards management actions here over the shared
// server-to-server secret. Account creation/deactivation lives in the portal;
// this endpoint controls public visibility, ordering, and explicit links to
// portal accounts. It never guesses identity from names or emails.
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
    // Both bios are included so the portal can tell which advisors still have an
    // empty profile — it drives the "needs attention" hint on the roster, not
    // visibility (an incomplete profile still publishes by design).
    .select(
      "id, name, slug, visibility_status, sort, portal_agent_id, photo_url, license_number, bio, bio_zh",
    )
    .order("sort", { ascending: true })
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ agents: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

/** POST → a JSON management action: visibility | reorder | link | merge_link. */
export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "merge_link") {
    const keepProfileId = String(body.keepProfileId || "").trim();
    const deleteProfileId = String(body.deleteProfileId || "").trim();
    const portalAgentId = Number(body.portalAgentId);
    if (
      !keepProfileId ||
      !deleteProfileId ||
      keepProfileId === deleteProfileId ||
      !Number.isInteger(portalAgentId) ||
      portalAgentId <= 0
    ) {
      return NextResponse.json(
        { error: "Two different profile ids and a valid portalAgentId are required." },
        { status: 400 },
      );
    }

    const { data: profiles, error: loadError } = await sb
      .from("agents")
      .select("id, slug, name, portal_agent_id")
      .in("id", [keepProfileId, deleteProfileId]);
    if (loadError) {
      return NextResponse.json({ error: loadError.message }, { status: 500 });
    }
    const keepProfile = profiles?.find((profile) => profile.id === keepProfileId);
    const deleteProfile = profiles?.find((profile) => profile.id === deleteProfileId);
    if (!keepProfile || !deleteProfile) {
      return NextResponse.json(
        { error: "One of the selected public profiles no longer exists." },
        { status: 404 },
      );
    }
    if (keepProfile.portal_agent_id != null) {
      return NextResponse.json(
        { error: "The profile selected to retain is already linked." },
        { status: 409 },
      );
    }
    if (deleteProfile.portal_agent_id !== portalAgentId) {
      return NextResponse.json(
        { error: "The duplicate profile is not linked to this Portal account." },
        { status: 409 },
      );
    }

    const { data: mergedRows, error: mergeError } = await sb.rpc(
      "merge_agent_profiles",
      {
        p_portal_agent_id: portalAgentId,
        p_keep_profile_id: keepProfileId,
        p_delete_profile_id: deleteProfileId,
      },
    );
    if (mergeError) {
      const status = mergeError.code === "P0001" || mergeError.code === "23505" ? 409 : 500;
      return NextResponse.json({ error: mergeError.message }, { status });
    }
    const merged = Array.isArray(mergedRows) ? mergedRows[0] : null;
    if (!merged) {
      return NextResponse.json({ error: "Profile merge returned no result." }, { status: 500 });
    }

    const identity = await syncAgentIdentity({
      portalAgentId,
      name: body.name,
      phone: body.phone,
      license: body.license,
      // The retained website profile may already contain verified contact and
      // MLS data. A sparse Portal account must not erase those fields.
      preserveMissing: true,
    });
    revalidateAgentPaths(keepProfile.slug);
    revalidateAgentPaths(deleteProfile.slug);

    return NextResponse.json({
      ok: true,
      id: keepProfile.id,
      portalAgentId,
      kept: {
        id: keepProfile.id,
        slug: keepProfile.slug,
        name: keepProfile.name,
      },
      deleted: {
        id: deleteProfile.id,
        slug: deleteProfile.slug,
        name: deleteProfile.name,
      },
      notice: identity.ok
        ? identity.notice
        : "Profiles were merged, but Portal identity synchronization should be retried.",
    });
  }

  if (action === "link") {
    const id = String(body.id || "").trim();
    const portalAgentId = Number(body.portalAgentId);
    if (!id || !Number.isInteger(portalAgentId) || portalAgentId <= 0) {
      return NextResponse.json(
        { error: "id and portalAgentId required" },
        { status: 400 },
      );
    }

    const { data: profile, error: loadError } = await sb
      .from("agents")
      .select("id, portal_agent_id")
      .eq("id", id)
      .maybeSingle();
    if (loadError) {
      return NextResponse.json({ error: loadError.message }, { status: 500 });
    }
    if (!profile) {
      return NextResponse.json({ error: "Public profile not found" }, { status: 404 });
    }
    if (
      profile.portal_agent_id != null &&
      profile.portal_agent_id !== portalAgentId
    ) {
      return NextResponse.json(
        { error: "Public profile is already linked to another portal account." },
        { status: 409 },
      );
    }

    const { data: claimed, error: claimedError } = await sb
      .from("agents")
      .select("id")
      .eq("portal_agent_id", portalAgentId)
      .neq("id", id)
      .maybeSingle();
    if (claimedError) {
      return NextResponse.json({ error: claimedError.message }, { status: 500 });
    }
    if (claimed) {
      return NextResponse.json(
        { error: "Portal account is already linked to another public profile." },
        { status: 409 },
      );
    }

    if (profile.portal_agent_id == null) {
      const { data: linked, error: linkError } = await sb
        .from("agents")
        .update({
          portal_agent_id: portalAgentId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .is("portal_agent_id", null)
        .select("id")
        .maybeSingle();
      if (linkError) {
        const status = linkError.code === "23505" ? 409 : 500;
        return NextResponse.json({ error: linkError.message }, { status });
      }
      if (!linked) {
        return NextResponse.json(
          { error: "Public profile changed. Refresh and try again." },
          { status: 409 },
        );
      }
    }

    const identity = await syncAgentIdentity({
      portalAgentId,
      name: body.name,
      phone: body.phone,
      license: body.license,
    });
    if (!identity.ok) {
      return NextResponse.json(
        {
          error: identity.error || "Profile linked, but identity sync failed.",
          linked: true,
          id,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({
      ok: true,
      id,
      portalAgentId,
      notice: identity.notice,
    });
  }

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
