import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { HOMIX_LISTINGS_CACHE_TAG, listingCacheTag } from "@/lib/listings/cache";

export const runtime = "nodejs";

function secretsMatch(actual: string, expected: string): boolean {
  const left = Buffer.from(actual);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const secret = process.env.BBO_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const authorization = request.headers.get("authorization") ?? "";
  if (!secretsMatch(authorization, `Bearer ${secret}`)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  let listingKey = "";
  try {
    const body = (await request.json()) as { listingKey?: unknown };
    listingKey = typeof body.listingKey === "string" ? body.listingKey.trim() : "";
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (!/^KEY[A-Za-z0-9]+$/.test(listingKey)) {
    return Response.json({ error: "Invalid listing key." }, { status: 400 });
  }

  revalidateTag(HOMIX_LISTINGS_CACHE_TAG, { expire: 0 });
  revalidateTag(listingCacheTag(listingKey), { expire: 0 });
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/listings", "page");
  revalidatePath("/[locale]/listings/[slug]", "page");
  revalidatePath("/[locale]/agents/[slug]", "page");

  return Response.json({ revalidated: true, listingKey });
}
