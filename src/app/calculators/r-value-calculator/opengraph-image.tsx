import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "Insulation R-Value Calculator & Assembly U-Factor (IECC 2021/2024) — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("r-value-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090e1a 0%, #1e1b38 50%, #2b1129 100%)",
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
            background: "rgba(236, 72, 153, 0.15)",
            border: "1px solid rgba(236, 72, 153, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#ec4899",
          }}
        >
          <span>🧱 ❄️</span>
          <span>BUILDING SCIENCE &amp; THERMAL ENVELOPE</span>
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
          {calc?.name || "Insulation R-Value & U-Factor Calculator"}
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
          {calc?.metaDescription || "Build multi-layer wall, roof, and floor assemblies to calculate total R-value (R-total) and overall U-factor with IECC 2021/2024 climate zone compliance checks."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Multi-Layer Stack Builder", "Total R-Value", "Overall U-Factor (U=1/R)", "IECC 2024 Zones 1–7"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 16px",
                background: "rgba(236, 72, 153, 0.12)",
                border: "1px solid rgba(236, 72, 153, 0.3)",
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
