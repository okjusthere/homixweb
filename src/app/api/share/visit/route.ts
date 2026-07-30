import { NextRequest, NextResponse } from "next/server";
import {
  deviceType,
  referrerDomain,
  resolvePublicShare,
  upsertShareVisit,
  validShareSession,
  visitorHash,
} from "@/lib/share-links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  if (!body || !validShareSession(body.sessionKey)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const code = String(body.code || "");
  const path = String(body.path || "");
  const context = await resolvePublicShare(code, path);
  if (!context) {
    return NextResponse.json({ error: "Share link not found" }, { status: 404 });
  }

  const userAgent = request.headers.get("user-agent") || "";
  const visitId = await upsertShareVisit({
    context,
    sessionKey: body.sessionKey,
    visitorHash: visitorHash(clientIp(request), userAgent),
    referrerDomain: referrerDomain(String(body.referrer || "")),
    deviceType: deviceType(userAgent),
    activeSecondsDelta: Number(body.activeSecondsDelta) || 0,
    maxScrollDepth: Number(body.maxScrollDepth) || 0,
  });
  if (!visitId) {
    return NextResponse.json({ error: "Unable to record visit" }, { status: 503 });
  }
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
