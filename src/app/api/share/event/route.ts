import { NextRequest, NextResponse } from "next/server";
import {
  recordShareEvent,
  resolveTrackedShare,
  validShareSession,
} from "@/lib/share-links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_TYPES = new Set(["call", "email", "wechat", "profile"]);

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const eventType = String(body?.eventType || "");
  const sessionKey = body?.sessionKey;
  if (
    !body ||
    !EVENT_TYPES.has(eventType) ||
    (sessionKey != null && !validShareSession(sessionKey))
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const context = await resolveTrackedShare(
    String(body.code || ""),
    String(body.path || ""),
    typeof sessionKey === "string" ? sessionKey : null,
  );
  if (!context) {
    return NextResponse.json({ error: "Share link not found" }, { status: 404 });
  }
  const ok = await recordShareEvent({
    context,
    sessionKey: typeof sessionKey === "string" ? sessionKey : null,
    eventType: eventType as "call" | "email" | "wechat" | "profile",
  });
  return NextResponse.json(
    { ok },
    {
      status: ok ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
