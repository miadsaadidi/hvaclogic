export const runtime = "edge";

import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "Furnace Sizing & AFUE BTU Calculator (Gas & Electric Heating) — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("furnace-size-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #150d1a 0%, #201026 50%, #2d0b16 100%)",
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
            background: "rgba(255, 107, 74, 0.15)",
            border: "1px solid rgba(255, 107, 74, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#ff6b4a",
          }}
        >
          <span>🔥</span>
          <span>RESIDENTIAL HEATING &amp; FURNACE BTU SIZER</span>
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
          {calc?.name || "Furnace Sizing & AFUE Efficiency Calculator"}
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
          {calc?.metaDescription || "Calculate required furnace input and output BTU based on home square footage, climate zone, and AFUE efficiency (80% vs 96% condensing)."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Input vs Output BTU", "80% to 98% AFUE Tiers", "5-Zone US Climate Models", "Blower CFM & Delta T"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 16px",
                background: "rgba(255, 107, 74, 0.12)",
                border: "1px solid rgba(255, 107, 74, 0.3)",
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
