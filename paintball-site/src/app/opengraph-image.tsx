import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "بينتبول الأحساء | Ahsa Paintball";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Green glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(163,230,53,0.08)",
            filter: "blur(80px)",
          }}
        />

        {/* Orange glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Crosshair SVG — left side */}
        <div style={{ position: "absolute", left: 60, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
          <svg width="220" height="220" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#a3e635" strokeWidth="1" opacity="0.2" />
            <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="1.5" opacity="0.4" />
            <circle cx="24" cy="24" r="12.5" stroke="#a3e635" strokeWidth="1.5" opacity="0.7" />
            <circle cx="24" cy="24" r="5" stroke="#a3e635" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="1.8" fill="#a3e635" />
            <line x1="24" y1="4" x2="24" y2="19" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="24" y1="29" x2="24" y2="44" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="4" y1="24" x2="19" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="29" y1="24" x2="44" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="24" cy="8" r="1.3" fill="#a3e635" />
            <circle cx="24" cy="40" r="1.3" fill="#a3e635" />
            <circle cx="8" cy="24" r="1.3" fill="#a3e635" />
            <circle cx="40" cy="24" r="1.3" fill="#a3e635" />
          </svg>
        </div>

        {/* Text content — center/right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(163,230,53,0.3)",
              borderRadius: 999,
              padding: "6px 16px",
              color: "#a3e635",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            🎯 Al-Ahsa, Eastern Province
          </div>

          {/* Arabic name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            بينتبول{" "}
            <span style={{ color: "#a3e635" }}>الأحساء</span>
          </div>

          {/* English name */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            AHSA PAINTBALL
          </div>

          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 2,
              background: "linear-gradient(90deg, #a3e635, transparent)",
              borderRadius: 2,
            }}
          />

          {/* Domain */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(163,230,53,0.7)",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            ahsapb.com
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #a3e635, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
