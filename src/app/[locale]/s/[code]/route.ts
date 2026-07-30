import { NextRequest, NextResponse } from "next/server";
import { localizePath } from "@/lib/locale";
import { resolvePublicShare } from "@/lib/share-links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const context = await resolvePublicShare(code);
  if (!context) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  const target = new URL(
    localizePath(context.locale, context.contentPath),
    request.url,
  );
  target.searchParams.set("share", context.code);
  return NextResponse.redirect(target, {
    status: 307,
    headers: { "Cache-Control": "private, no-store" },
  });
}
