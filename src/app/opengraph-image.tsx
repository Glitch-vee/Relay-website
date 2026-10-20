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
          background: "radial-gradient(ellipse 50% 70% at 85% 50%, rgba(130,150,255,0.18), transparent 70%), #050507",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={src} alt="" width={64} height={64} style={{ borderRadius: 16 }} />
          <div style={{ fontSize: 36, fontWeight: 600, color: "#ffffff" }}>Relay</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 600,
              letterSpacing: -4,
              lineHeight: 0.98,
              color: "#ffffff",
              maxWidth: 980,
            }}
          >
            Give Grok a phone.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
            Free for Android
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
