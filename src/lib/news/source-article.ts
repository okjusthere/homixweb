import "server-only";

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { load } from "cheerio";

const MAX_HTML_BYTES = 2_000_000;
const MAX_SOURCE_CHARS = 16_000;
const MIN_SOURCE_CHARS = 900;

const CONTENT_SELECTORS = [
  "[itemprop='articleBody']",
  "article",
  ".article-body",
  ".article-content",
  ".entry-content",
  ".post-content",
  "main",
];

function isPrivateIpv4(address: string): boolean {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) {
    return true;
  }
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 4) return isPrivateIpv4(address);
  if (isIP(address) !== 6) return true;
  const value = address.toLocaleLowerCase();
  if (value.startsWith("::ffff:")) {
    return isPrivateIpv4(value.slice("::ffff:".length));
  }
  return (
    value === "::" ||
    value === "::1" ||
    value.startsWith("fc") ||
    value.startsWith("fd") ||
    /^fe[89ab]/.test(value)
  );
}

async function safeSourceUrl(value: string): Promise<URL | null> {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLocaleLowerCase();
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      isIP(host) !== 0
    ) {
      return null;
    }
    const addresses = await lookup(host, { all: true, verbatim: true });
    if (
      addresses.length === 0 ||
      addresses.some(({ address }) => isPrivateAddress(address))
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function cleanBlock(value: string): string {
  return value
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBlocks(html: string): string {
  const $ = load(html);
  $(
    "script,style,noscript,nav,footer,header,form,aside,dialog,template,svg",
  ).remove();

  let best = "";
  for (const selector of CONTENT_SELECTORS) {
    $(selector).each((_, element) => {
      const container = $(element);
      const blocks = container
        .find("h1,h2,h3,p,li")
        .toArray()
        .map((node) => cleanBlock($(node).text()))
        .filter((value) => value.length >= 20);
      const text = (blocks.length > 0 ? blocks.join("\n") : cleanBlock(container.text()))
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      if (text.length > best.length) best = text;
    });
  }
  return best.slice(0, MAX_SOURCE_CHARS);
}

export async function fetchSourceArticleText(
  sourceUrl: string,
): Promise<string | null> {
  const url = await safeSourceUrl(sourceUrl);
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "HomixNewsBot/1.0 (+https://www.homixny.com/news)",
      },
      redirect: "error",
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") ?? "";
    const contentLength = Number(response.headers.get("content-length") ?? "0");
    if (
      !contentType.toLocaleLowerCase().includes("text/html") ||
      (contentLength > 0 && contentLength > MAX_HTML_BYTES)
    ) {
      return null;
    }
    const html = await response.text();
    if (html.length > MAX_HTML_BYTES) return null;
    const text = extractBlocks(html);
    return text.length >= MIN_SOURCE_CHARS ? text : null;
  } catch {
    return null;
  }
}
