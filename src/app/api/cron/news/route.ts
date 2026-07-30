import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  regenerateNewsArticle,
  runNewsPipeline,
} from "@/lib/news/pipeline";

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

function revalidateNews(slug?: string) {
  revalidateTag("homix-news", "max");
  revalidatePath("/news");
  revalidatePath("/zh/news");
  if (slug) {
    revalidatePath(`/news/${slug}`);
    revalidatePath(`/zh/news/${slug}`);
  }
}

function authorizationError(request: NextRequest) {
  if (!process.env.CRON_SECRET?.trim()) {
    return NextResponse.json(
      { error: "News cron is not configured" },
      { status: 503 },
    );
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authError = authorizationError(request);
  if (authError) return authError;

  try {
    const result = await runNewsPipeline();
    if (result.status === "published") {
      revalidateNews(result.slug);
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

export async function POST(request: NextRequest) {
  const authError = authorizationError(request);
  if (authError) return authError;

  const body = (await request.json().catch(() => null)) as {
    slug?: unknown;
  } | null;
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
  if (
    slug.length === 0 ||
    slug.length > 160 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  ) {
    return NextResponse.json(
      { error: "A valid news slug is required" },
      { status: 400 },
    );
  }

  try {
    const result = await regenerateNewsArticle(slug);
    if (result.status === "not_found") {
      return NextResponse.json(result, {
        status: 404,
        headers: { "Cache-Control": "private, no-store" },
      });
    }
    if (result.status === "rejected") {
      return NextResponse.json(result, {
        status: 422,
        headers: { "Cache-Control": "private, no-store" },
      });
    }
    revalidateNews(result.slug);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "News regeneration failed";
    console.error("News regeneration failed", { slug, message });
    return NextResponse.json(
      { error: "News regeneration failed" },
      {
        status: 500,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  }
}
