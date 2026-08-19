import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "Kitchen Range Hood CFM Calculator & Make-Up Air Sizer (IRC M1503.6) — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("kitchen-hood-cfm");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090e1a 0%, #17162b 50%, #201026 100%)",
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
          <span>🍳</span>
          <span>KITCHEN VENTILATION &amp; MAKE-UP AIR SIZER</span>
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
          {calc?.name || "Kitchen Range Hood CFM & Make-Up Air Sizer"}
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
          {calc?.metaDescription || "Calculate required kitchen range hood CFM for gas and electric cooktops. Check mandatory IRC Section M1503.6 make-up air code requirements."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Gas BTU (100 CFM / 10k)", "Electric Linear Width", "Island Hood 1.30× Penalty", "IRC M1503.6 Code Alert (>400 CFM)"].map((item) => (
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
