import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { runNewsPipeline } from "@/lib/news/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!secret || !header.startsWith("Bearer ")) return false;
  const received = Buffer.from(header.slice(7));
  const expected = Buffer.from(secret);
  return (
    received.length === expected.length &&
    timingSafeEqual(received, expected)
  );
}

export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET?.trim()) {
    return NextResponse.json(
      { error: "News cron is not configured" },
      { status: 503 },
    );
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runNewsPipeline();
    if (result.status === "published") {
      revalidateTag("homix-news", "max");
      revalidatePath("/news");
      revalidatePath("/zh/news");
      if (result.slug) {
        revalidatePath(`/news/${result.slug}`);
        revalidatePath(`/zh/news/${result.slug}`);
      }
    }
    return NextResponse.json(result, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "News pipeline failed";
    console.error("Automated news run failed", { message });
    return NextResponse.json(
      { error: "News pipeline failed" },
      {
        status: 500,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  }
}
