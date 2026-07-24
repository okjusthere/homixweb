import { NextRequest, NextResponse } from "next/server";
import { syncAgentIdentity } from "@/lib/agents/sync-identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(req: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const portalAgentId = Number(body.portalAgentId);
  if (!Number.isInteger(portalAgentId) || portalAgentId <= 0) {
    return NextResponse.json({ error: "portalAgentId required" }, { status: 400 });
  }

  const result = await syncAgentIdentity({
    portalAgentId,
    name: body.name,
    phone: body.phone,
    license: body.license,
  });
  return NextResponse.json(result, {
    status: result.ok ? 200 : result.error === "Linked public profile not found" ? 404 : 400,
    headers: { "Cache-Control": "no-store" },
  });
}
