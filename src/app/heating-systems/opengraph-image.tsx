import { ImageResponse } from "next/og";

export const alt = "Heating & Heat Pump Systems — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0c1a2e 50%, #2b1606 100%)",
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
            background: "rgba(249, 115, 22, 0.15)",
            border: "1px solid rgba(249, 115, 22, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#f97316",
          }}
        >
          <span>🔥</span>
          <span>HEATING &amp; HEAT PUMPS</span>
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
          Heat Pump HSPF2, Furnace AFUE &amp; Boilers
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
          Cold-Climate Balance Points • Auxiliary Heat Strip Sizing • Boiler EDR Ratings
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Heat Pump Sizer", "Furnace AFUE Sizer", "Boiler EDR Calculator"].map((tool) => (
            <div
              key={tool}
              style={{
                padding: "8px 18px",
                background: "rgba(249, 115, 22, 0.12)",
                border: "1px solid rgba(249, 115, 22, 0.3)",
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
