import { ImageResponse } from "next/og";

export const alt = "Building Science & Insulation — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0c1a2e 50%, #250938 100%)",
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
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#a855f7",
          }}
        >
          <span>🏢</span>
          <span>BUILDING SCIENCE &amp; INSULATION</span>
        </div>

        <div
          style={{
            fontSize: "58px",
            fontWeight: "800",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "1000px",
            marginBottom: "18px",
            color: "#ffffff",
          }}
        >
          Insulation R-Value, Heat Loss &amp; Kitchen CFM
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "850px",
            marginBottom: "36px",
          }}
        >
          IECC 2024 Wall Assemblies • Continuous Insulation • ASHRAE 62.2 Ventilation
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Insulation R-Value Sizer", "Heat Loss Calculator", "Garage Heater Sizer", "Kitchen Hood CFM"].map((tool) => (
            <div
              key={tool}
              style={{
                padding: "8px 18px",
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "600",
                color: "#e2e8f0",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
