import { NextRequest, NextResponse } from "next/server";
import {
  SHARE_CONTENT_KINDS,
  findShareCatalogItem,
  getShareCatalog,
  type ShareContentKind,
} from "@/lib/share-catalog";
import { isLocale, type Locale } from "@/lib/locale";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(request: NextRequest): boolean {
  const secret = process.env.AGENTS_REVALIDATE_SECRET?.trim();
  return Boolean(secret) &&
    request.headers.get("authorization") === `Bearer ${secret}`;
}

function localeParam(value: string | null): Locale {
  return value && isLocale(value) ? value : "zh";
}

export async function GET(request: NextRequest) {
  if (!authed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locale = localeParam(request.nextUrl.searchParams.get("locale"));
  const exactPath = request.nextUrl.searchParams.get("path")?.trim();
  if (exactPath) {
    const item = await findShareCatalogItem(exactPath, locale);
    if (!item) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }
    return NextResponse.json(
      { item },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const kindParam = request.nextUrl.searchParams.get("kind") || "all";
  const kind =
    kindParam === "all" ||
    (SHARE_CONTENT_KINDS as readonly string[]).includes(kindParam)
      ? (kindParam as ShareContentKind | "all")
      : null;
  if (!kind) {
    return NextResponse.json({ error: "Invalid content kind" }, { status: 400 });
  }

  const page = Number.parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const pageSize = Number.parseInt(
    request.nextUrl.searchParams.get("pageSize") || "24",
    10,
  );
  const result = await getShareCatalog({
    locale,
    kind,
    query: request.nextUrl.searchParams.get("q") || "",
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 24,
  });

  return NextResponse.json(result, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
