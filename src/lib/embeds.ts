/**
 * Third-party embed targets for the /offer (Tally), /buyercoach (FastGPT), and
 * /training (Cloudflare Stream) pages. These are PUBLIC URLs/IDs (they ship to
 * the browser in an iframe), not secrets — so they can be hardcoded here or
 * overridden with NEXT_PUBLIC_* env vars in Vercel (a redeploy applies env
 * changes).
 *
 * To go live, set the values below (or the env vars):
 *  - offerTallyId       → the form id in your Tally URL, e.g. tally.so/r/<ID>
 *  - buyerCoachUrl      → the full FastGPT share/iframe URL
 *  - cloudflareStreamCustomerCode → the code from Stream embed URLs
 * When a value is empty, the page shows a tasteful "being connected" fallback.
 */

export const offerTallyId =
  process.env.NEXT_PUBLIC_TALLY_OFFER_ID?.trim() || "mJPA4J";

/** Optional separate Chinese-language Tally form; falls back to the main one. */
export const offerTallyIdZh =
  process.env.NEXT_PUBLIC_TALLY_OFFER_ID_ZH?.trim() || offerTallyId;

export const buyerCoachUrl =
  process.env.NEXT_PUBLIC_BUYERCOACH_URL?.trim() ||
  "https://cloud.fastgpt.io/chat/share?shareId=eQARSV3riLnetFY59kTaniRg";

export const cloudflareStreamCustomerCode =
  process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE?.trim() || "";

export function cloudflareStreamIframeUrl(videoUid: string, customerCode = cloudflareStreamCustomerCode) {
  const uid = videoUid.trim();
  const code = customerCode.trim();
  if (!uid || !code) return "";

  const params = new URLSearchParams({
    preload: "metadata",
    primaryColor: "#9a6a3c",
  });

  return `https://customer-${code}.cloudflarestream.com/${uid}/iframe?${params}`;
}
