import { ImageResponse } from "next/og";

export const alt = "Homix — Where Homes Meet Headlines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share image, generated at the edge. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#F6F3EC",
          color: "#1C1B18",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#75716A",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          New York Real Estate · Media · AI
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 150, lineHeight: 1 }}>
            Homix
            <span style={{ color: "#9A6A3C" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 48, color: "#75716A" }}>
            Where Homes Meet Headlines
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, fontFamily: "system-ui, sans-serif" }}>
            homixny.com
          </div>
          <div style={{ display: "flex", width: 120, height: 4, background: "#9A6A3C" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
