/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { resolvePublicShare } from "@/lib/share-links";
import { absUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const size = { width: 1200, height: 630 };

let cjkFontPromise: Promise<ArrayBuffer> | undefined;

function getCjkFont() {
  cjkFontPromise ??= readFile(
    new URL(
      "../../../../assets/fonts/noto-sans-sc-chinese-simplified-400.woff",
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

function fit(value: string | null, fallback: string, max: number): string {
  const clean = (value || fallback).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const context = await resolvePublicShare(code);
  if (!context) {
    return new Response("Share card not found", { status: 404 });
  }

  const cjkFont = await getCjkFont();
  const agentName = fit(context.agent.name, "Homix Advisor", 34);
  const agentTitle = fit(
    context.agent.title,
    context.locale === "zh" ? "纽约持牌地产经纪" : "New York Real Estate Advisor",
    58,
  );
  const eyebrow =
    context.locale === "zh" ? "为你分享纽约地产内容" : "Shared with you by";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f3ec",
          color: "#1c1b18",
          fontFamily:
            '"Noto Sans SC", Inter, Arial, "PingFang SC", sans-serif',
        }}
      >
        <div
          style={{
            width: 760,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "66px 70px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#9a6a3c",
              }}
            />
            HOMIX REALTY
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 22,
                fontSize: 23,
                color: "#79736a",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, Noto Sans SC, serif",
                fontSize: agentName.length > 22 ? 58 : 70,
                lineHeight: 1.05,
              }}
            >
              {agentName}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 27,
                lineHeight: 1.3,
                color: "#524e47",
              }}
            >
              {agentTitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 20,
              color: "#79736a",
            }}
          >
            <span style={{ display: "flex" }}>homixny.com</span>
            <span
              style={{
                display: "flex",
                width: 112,
                height: 4,
                background: "#9a6a3c",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: 440,
            height: "100%",
            display: "flex",
            position: "relative",
            background: "#e8e2d7",
            overflow: "hidden",
          }}
        >
          {context.agent.photoUrl ? (
            <img
              src={absUrl(context.agent.photoUrl)}
              alt=""
              width="440"
              height="630"
              style={{
                width: 440,
                height: 630,
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
                fontSize: 132,
                color: "#9a6a3c",
              }}
            >
              {agentName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: 12,
              display: "flex",
              background: "#9a6a3c",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
      },
      fonts: [
        {
          name: "Noto Sans SC",
          data: cjkFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
