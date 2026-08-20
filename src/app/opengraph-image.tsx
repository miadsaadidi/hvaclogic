export const runtime = "edge";

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "HVAC Logic — Precision HVAC & Building Science Suite";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0d1527 50%, #061e38 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#f8fafc",
          padding: "48px",
          position: "relative",
        }}
      >
        {/* Subtle decorative grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0, 210, 255, 0.08) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glowing badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 210, 255, 0.12)",
            border: "1px solid rgba(0, 210, 255, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#00d2ff",
            letterSpacing: "0.06em",
          }}
        >
          <span>⚡</span>
          <span>HVACLOGIC ENGINEERING SUITE</span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "62px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1050px",
            marginBottom: "18px",
            background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Precision HVAC &amp; Building Science Calculators
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
            marginBottom: "40px",
            lineHeight: 1.4,
          }}
        >
          Deterministic Engineering Physics • ASHRAE • ACCA Manuals J/S/D • EPA 608 • IECC
        </div>

        {/* 5 Domains Pill Badges */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {[
            { label: "🌀 Airflow & Ducts", border: "rgba(0, 210, 255, 0.4)", bg: "rgba(0, 210, 255, 0.1)" },
            { label: "❄️ Cooling Loads", border: "rgba(56, 189, 248, 0.4)", bg: "rgba(56, 189, 248, 0.1)" },
            { label: "🔧 Diagnostics & PT", border: "rgba(16, 185, 129, 0.4)", bg: "rgba(16, 185, 129, 0.1)" },
            { label: "🔥 Heating & Pumps", border: "rgba(249, 115, 22, 0.4)", bg: "rgba(249, 115, 22, 0.1)" },
            { label: "🏢 Building Science", border: "rgba(168, 85, 247, 0.4)", bg: "rgba(168, 85, 247, 0.1)" },
          ].map((domain) => (
            <div
              key={domain.label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                background: domain.bg,
                border: `1px solid ${domain.border}`,
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#e2e8f0",
              }}
            >
              {domain.label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
