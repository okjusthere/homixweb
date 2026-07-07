import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

const size = { width: 1200, height: 630 };

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
  const title = fit(
    searchParams.get("title"),
    `${siteConfig.name} — ${siteConfig.market} Real Estate`,
    92,
  );
  const description = fit(searchParams.get("description"), siteConfig.description, 230);
  const path = displayPath(searchParams.get("path"));

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
              fontFamily: "Georgia, serif",
              fontSize: title.length > 62 ? 58 : 68,
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
              fontSize: description.length > 150 ? 28 : 32,
              lineHeight: 1.35,
              color: "#4E4A43",
              maxWidth: 970,
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
    size,
  );
}
