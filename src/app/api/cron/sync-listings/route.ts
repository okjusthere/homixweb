/**
 * Scheduled listings refresh (Vercel Cron — see vercel.json, every 6h).
 *
 * On Vercel, the filesystem is read-only at runtime, so we don't write the cache
 * here. Instead the cron triggers a redeploy via a Deploy Hook; the build command
 * (`node scripts/sync-listings.mjs && next build`) re-syncs fresh OneKey data and
 * bakes it into the new deployment — durable and within OneKey's refresh cadence.
 *
 * Setup: add env DEPLOY_HOOK_URL (a Vercel Deploy Hook) and CRON_SECRET.
 * Locally, just run `npm run sync` to refresh src/data/listings-cache.json.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) {
    return Response.json({
      ok: false,
      message:
        "DEPLOY_HOOK_URL not set. Listings re-sync runs at build time; set a Vercel Deploy Hook to enable scheduled refresh.",
    });
  }

  const res = await fetch(hook, { method: "POST" });
  return Response.json({ ok: res.ok, triggeredRebuild: res.ok });
}
