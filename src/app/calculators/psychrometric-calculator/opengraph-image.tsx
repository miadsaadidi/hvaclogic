import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const alt = "Psychrometric Calculator & Moist Air Thermodynamic Properties — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const calc = getCalculatorById("psychrometric-calculator");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090e1a 0%, #0c233c 50%, #033658 100%)",
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
          <span>💧 📈</span>
          <span>ASHRAE MOIST AIR PSYCHROMETRICS</span>
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
          {calc?.name || "Psychrometric Chart & Moist Air Calculator"}
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
          {calc?.metaDescription || "Calculate moist air thermodynamic properties from any 2 inputs (Dry Bulb, Wet Bulb, Dew Point, RH, Enthalpy) with altitude barometric compensation."}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Dew Point (°F)", "Wet Bulb (°F)", "Enthalpy (BTU/lb)", "Humidity Ratio (grains/lb)", "Altitude Adjusted"].map((item) => (
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
