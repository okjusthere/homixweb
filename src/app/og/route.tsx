import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

const size = { width: 1200, height: 630 };

let cjkFontPromise: Promise<ArrayBuffer> | undefined;

/**
 * ImageResponse does not inherit browser/system CJK fallbacks. Keep an OFL
 * Simplified Chinese subset alongside this route so share cards render without
 * depending on Google Fonts or the host operating system.
 */
function getCjkFont() {
  cjkFontPromise ??= fetch(
    new URL(
      "../../assets/fonts/noto-sans-sc-chinese-simplified-400.woff",
      import.meta.url,
    ),
  ).then((response) => response.arrayBuffer());
  return cjkFontPromise;
}

function hasCjk(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function fit(value: string | null, fallback: string, max: number): string {
  const clean = (value || fallback).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const breakAt = cut.lastIndexOf(" ");
  return `${cut.slice(0, breakAt > 40 ? breakAt : max - 1).replace(/[.,;:!?—-]+$/, "")}…`;
}

function displayPath(value: string | null): string {
  const path = fit(value, "homixny.com", 86);
  return path
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/^\/$/, "homixny.com");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title");
  const rawDescription = searchParams.get("description");
  const cjkTitle = hasCjk(rawTitle || "");
  const cjkDescription = hasCjk(rawDescription || "");
  const cjk = cjkTitle || cjkDescription;
  const title = fit(
    rawTitle,
    `${siteConfig.name} — ${siteConfig.market} Real Estate`,
    cjkTitle ? 30 : 92,
  );
  const description = fit(
    rawDescription,
    siteConfig.description,
    cjkDescription ? 130 : 230,
  );
  const path = displayPath(searchParams.get("path"));
  const titleFontSize = cjkTitle
    ? title.length > 24
      ? 42
      : title.length > 16
        ? 50
        : 58
    : title.length > 62
      ? 58
      : 68;
  const descriptionFontSize = cjkDescription
    ? description.length > 84
      ? 25
      : 29
    : description.length > 150
      ? 28
      : 32;
  const cjkFont = cjk ? await getCjkFont() : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "#F6F3EC",
          color: "#1C1B18",
          fontFamily:
            'Inter, Arial, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              fontWeight: 700,
              color: "#1C1B18",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#9A6A3C",
              }}
            />
            Homix
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: "#75716A",
            }}
          >
            New York Real Estate
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontFamily: cjkTitle ? "Noto Sans SC" : "Georgia, serif",
              fontSize: titleFontSize,
              lineHeight: 1.04,
              color: "#1C1B18",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: descriptionFontSize,
              lineHeight: 1.35,
              color: "#4E4A43",
              maxWidth: 970,
              fontFamily: cjkDescription
                ? "Noto Sans SC"
                : 'Inter, Arial, sans-serif',
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22, color: "#75716A" }}>{path}</div>
          <div style={{ display: "flex", width: 128, height: 4, background: "#9A6A3C" }} />
        </div>
      </div>
    ),
    {
      ...size,
      // Satori rendering (+ CJK font) costs real CPU per invocation, and
      // Vercel's edge cache only stores function responses on s-maxage —
      // ImageResponse's default max-age alone left every crawler fetch
      // re-rendering. Card URLs are content-addressed (title/description/path
      // in the query), so a changed card is a new URL: cache for a year.
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
      },
      ...(cjkFont
        ? {
            fonts: [
              {
                name: "Noto Sans SC",
                data: cjkFont,
                weight: 400,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
}
