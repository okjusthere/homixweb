import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { getPublishedNews } from "@/lib/news/repository";
import {
  NEWS_CATEGORY_LABELS,
  newsText,
} from "@/lib/news/types";

const size = { width: 1200, height: 630 };
const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,118}[a-z0-9])?$/;

let cjkFontPromise: Promise<ArrayBuffer> | undefined;

function getCjkFont() {
  cjkFontPromise ??= readFile(
    new URL(
      "../../assets/fonts/noto-sans-sc-chinese-simplified-400.woff",
      import.meta.url,
    ),
  ).then(
    (font) =>
      font.buffer.slice(
        font.byteOffset,
        font.byteOffset + font.byteLength,
      ) as ArrayBuffer,
  );
  return cjkFontPromise;
}

function fit(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const breakAt = cut.lastIndexOf(" ");
  return `${cut.slice(0, breakAt > 30 ? breakAt : max - 1).trim()}…`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const locale = searchParams.get("locale") === "zh" ? "zh" : "en";
  if (!SLUG_PATTERN.test(slug)) {
    return new Response("Invalid news slug", { status: 400 });
  }
  const article = await getPublishedNews(slug);
  if (!article) return new Response("News article not found", { status: 404 });

  const copy = newsText(article, locale);
  const category = NEWS_CATEGORY_LABELS[article.category][locale];
  const title = fit(copy.title, locale === "zh" ? 52 : 100);
  const summary = fit(copy.summary, locale === "zh" ? 100 : 190);
  const cjkFont = locale === "zh" ? await getCjkFont() : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#EDE9DF",
          color: "#1C1B18",
          fontFamily:
            locale === "zh"
              ? '"Noto Sans SC", sans-serif'
              : "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 740,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 64px 54px",
            background: "#F8F7F3",
            borderRight: "1px solid #D4CEC0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 18,
                height: 18,
                display: "flex",
                background: "#8A5A3B",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              HOMIX NEWS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                color: "#6D685F",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {category} · {article.region}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontFamily:
                  locale === "zh" ? '"Noto Sans SC"' : "Georgia, serif",
                fontSize:
                  locale === "zh"
                    ? title.length > 34
                      ? 47
                      : 54
                    : title.length > 72
                      ? 48
                      : 56,
                lineHeight: 1.08,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: locale === "zh" ? 23 : 24,
                lineHeight: 1.38,
                color: "#59564F",
              }}
            >
              {summary}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#777269",
            }}
          >
            homixny.com/news
          </div>
        </div>

        <div
          style={{
            width: 460,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 52px",
            background: "#243B32",
            color: "#F8F7F3",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 17,
              letterSpacing: 2,
              color: "#D8D2C5",
            }}
          >
            NEW YORK METRO
          </div>
          <div
            style={{
              height: 310,
              display: "flex",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            {[128, 220, 170, 282, 196, 244].map((height, index) => (
              <div
                key={height}
                style={{
                  width: index === 3 ? 58 : 48,
                  height,
                  display: "flex",
                  background:
                    index === 3
                      ? "#B77B50"
                      : index % 2 === 0
                        ? "#657A6C"
                        : "#D8D2C5",
                  opacity: index === 3 ? 1 : 0.88,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid #657A6C",
              paddingTop: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 18,
                lineHeight: 1.4,
                color: "#D8D2C5",
              }}
            >
              <span style={{ display: "flex" }}>DAILY BRIEFING</span>
              <span style={{ display: "flex" }}>HOMIX REALTY</span>
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, serif",
                fontSize: 74,
                lineHeight: 0.8,
                color: "#F8F7F3",
              }}
            >
              H
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
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
                weight: 400 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
}
