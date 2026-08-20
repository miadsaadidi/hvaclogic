export const runtime = "edge";

import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "Building Heat Loss Calculator & Air Infiltration Estimator — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("heat-loss-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090e1a 0%, #2b1704 50%, #3d1402 100%)",
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
            background: "rgba(255, 107, 0, 0.15)",
            border: "1px solid rgba(255, 107, 0, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#ff6b00",
          }}
        >
          <span>🏠 🔥</span>
          <span>WHOLE-BUILDING HEAT LOSS &amp; INFILTRATION</span>
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
          {calc?.name || "Building Heat Loss & Infiltration Calculator"}
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
          {calc?.metaDescription || "Calculate whole-building peak heat loss combining envelope conductive transmission (U * A * Delta T) and blower door air infiltration leakage."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Conductive Envelope Loss", "Air Infiltration Leakage", "Peak BTU/hr & kW", "Equipment Sizing Recs"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 16px",
                background: "rgba(255, 107, 0, 0.12)",
                border: "1px solid rgba(255, 107, 0, 0.3)",
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
