import { ImageResponse } from "next/og";
import { getCalculatorById } from "@/lib/data/calculators-registry";

export const runtime = "edge";

export const alt = "Refrigerant Line Set Charge and Weigh-In Calculator — HVACLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const calculator = getCalculatorById("refrigerant-charge-calculator");

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "58px", color: "#f8fafc", background: "linear-gradient(135deg, #090e1a 0%, #102238 55%, #062634 100%)", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "flex", alignSelf: "flex-start", padding: "9px 22px", marginBottom: "24px", border: "1px solid rgba(0,210,255,.45)", borderRadius: "999px", color: "#00d2ff", background: "rgba(0,210,255,.12)", fontSize: "20px", fontWeight: 700 }}>
        OEM-SOURCED FIELD CALCULATOR
      </div>
      <div style={{ maxWidth: "1060px", marginBottom: "18px", fontSize: "58px", fontWeight: 800, lineHeight: 1.08 }}>
        {calculator?.name}
      </div>
      <div style={{ maxWidth: "940px", marginBottom: "38px", color: "#cbd5e1", fontSize: "24px", lineHeight: 1.35 }}>
        Initial line-set weigh-in estimates for verified R-454B, R-32, and R-410A equipment profiles.
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {["Exact OEM rates", "A2L notice", "Metric + IP units", "100% client-side"].map((item) => (
          <div key={item} style={{ display: "flex", padding: "9px 17px", border: "1px solid rgba(0,210,255,.3)", borderRadius: "10px", background: "rgba(0,210,255,.1)", fontSize: "17px", fontWeight: 650 }}>
            {item}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
