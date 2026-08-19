import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "BTU Heating & Cooling Load Calculator — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("btu-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0c1a2e 50%, #06283d 100%)",
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
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#38bdf8",
          }}
        >
          <span>❄️</span>
          <span>COOLING &amp; HEATING LOADS</span>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1050px",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          {calc?.name || "BTU Heating & Cooling Load Calculator"}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "850px",
            marginBottom: "36px",
            lineHeight: 1.4,
          }}
        >
          {calc?.metaDescription || "Calculate residential room and whole-house heating and cooling BTU requirements based on ACCA Manual J."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["ACCA Manual J (8th Ed)", "ASHRAE Standard 90.1", "IECC Climate Zones"].map((std) => (
            <div
              key={std}
              style={{
                padding: "8px 18px",
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#e2e8f0",
              }}
            >
              ✓ {std}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
