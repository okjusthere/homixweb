import { NextRequest, NextResponse } from "next/server";
import { resolveTrackedShare } from "@/lib/share-links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code") || "";
  const path = request.nextUrl.searchParams.get("path") || "";
  const sessionKey = request.nextUrl.searchParams.get("sessionKey");
  const context = await resolveTrackedShare(code, path, sessionKey);
  if (!context) {
    return NextResponse.json({ error: "Share link not found" }, { status: 404 });
  }
  return NextResponse.json(
    {
      code: context.code,
      contentPath: context.contentPath,
      contentTitle: context.contentTitle,
      locale: context.locale,
      agent: context.agent,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
