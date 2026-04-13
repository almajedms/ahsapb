import { ImageResponse } from "next/og";

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

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            zIndex: 10,
          }}
        >
          {/* Logo mark — large crosshair reticle */}
          <div style={{ display: "flex", position: "relative" }}>
            {/* Glow behind logo */}
            <div style={{
              position: "absolute",
              inset: -20,
              borderRadius: "50%",
              background: "rgba(163,230,53,0.15)",
              filter: "blur(30px)",
            }} />
            <svg width="160" height="160" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#0a1a02" />
              <circle cx="24" cy="24" r="22" fill="#a3e635" opacity="0.06" />
              <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="12.5" stroke="#a3e635" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="5" stroke="#a3e635" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="1.8" fill="#a3e635" />
              <line x1="24" y1="4"  x2="24" y2="19" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="24" y1="29" x2="24" y2="44" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="4"  y1="24" x2="19" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="29" y1="24" x2="44" y2="24" stroke="#a3e635" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="24" cy="8"  r="1.3" fill="#a3e635" />
              <circle cx="24" cy="40" r="1.3" fill="#a3e635" />
              <circle cx="8"  cy="24" r="1.3" fill="#a3e635" />
              <circle cx="40" cy="24" r="1.3" fill="#a3e635" />
            </svg>
          </div>

          {/* Arabic name */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 76, fontWeight: 900, color: "#ffffff", lineHeight: 1, textAlign: "center" }}>
              بينتبول <span style={{ color: "#a3e635" }}>الأحساء</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              AHSA PAINTBALL
            </div>
          </div>

          {/* Divider + domain */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 160, height: 1, background: "linear-gradient(90deg, transparent, #a3e635, transparent)" }} />
            <div style={{ fontSize: 20, color: "rgba(163,230,53,0.6)", fontWeight: 600, letterSpacing: "0.08em" }}>
              ahsapb.com
            </div>
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
