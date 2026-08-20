export const runtime = "edge";

import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "MERV Air Filter Sizing & Static Pressure Drop Calculator — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("filter-sizing-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090e1a 0%, #0c1a2e 50%, #061c28 100%)",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 210, 255, 0.15)",
            border: "1px solid rgba(0, 210, 255, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#00d2ff",
          }}
        >
          <span>🌪️ 🛡️</span>
          <span>ASHRAE 52.2 AIR FILTRATION ENGINE</span>
        </div>

        <div
          style={{
            fontSize: "54px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1050px",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          {calc?.name || "MERV Air Filter Sizing & Static Pressure Drop"}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: "850px",
            marginBottom: "36px",
            lineHeight: 1.4,
          }}
        >
          {calc?.metaDescription || "Calculate HVAC air filter face velocity (FPM) and static pressure drops across 1-inch, 2-inch, and 4-inch deep MERV 8 to MERV 16 pleated media."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Face Velocity (FPM = CFM / Area)", "1\" vs 4\" Media Derating", "MERV 8 to MERV 16 Curves", "100% Client-Side Privacy"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 16px",
                background: "rgba(0, 210, 255, 0.12)",
                border: "1px solid rgba(0, 210, 255, 0.3)",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#e2e8f0",
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
