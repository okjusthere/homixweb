import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_AGENTS_CACHE_TAG } from "@/lib/agents";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cache-refresh hook for the agent portal (agents.homixny.com). After an
 * advisor edits their profile there, the portal calls this so the public
 * roster/profile pages reflect the change immediately instead of waiting out
 * the 24h TTL. Mirrors the revalidation the admin actions perform.
 *
 * Fail-closed: no-op 503 until AGENTS_REVALIDATE_SECRET is configured.
 */
export async function POST(request: Request) {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(PUBLIC_AGENTS_CACHE_TAG, "max");
  revalidatePath("/agents");
  revalidatePath("/zh/agents");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true });
}
