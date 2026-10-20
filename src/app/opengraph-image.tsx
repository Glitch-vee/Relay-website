import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const logo = readFileSync(join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={src} alt="" width={72} height={72} />
          <div style={{ fontSize: 32, fontWeight: 600, color: "#ffffff" }}>Relay</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.02,
              color: "#ffffff",
              maxWidth: 980,
            }}
          >
            Give Grok a phone.
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.62)" }}>Free for Android</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
