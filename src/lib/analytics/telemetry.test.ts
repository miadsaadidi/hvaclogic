import { describe, it, expect } from "vitest";
import { sanitizeTelemetryPayload, TelemetryEventName } from "./telemetry";

describe("Day 6 — Privacy-Preserving Telemetry & Zero-PII Guardrails", () => {
  it("strips all customer PII, street addresses, and emails from payload", () => {
    const rawPayload = {
      calculatorId: "ductulator",
      customerName: "John Doe",
      email: "tech@example.com",
      address: "123 Main St",
      jobName: "Smith Residence",
      unitSystem: "ip",
    };

    const sanitized = sanitizeTelemetryPayload(rawPayload);

    expect(sanitized.calculatorId).toBe("ductulator");
    expect(sanitized.unitSystem).toBe("ip");
    expect((sanitized as any).customerName).toBeUndefined();
    expect((sanitized as any).email).toBeUndefined();
    expect((sanitized as any).address).toBeUndefined();
    expect((sanitized as any).jobName).toBeUndefined();
  });

  it("strips proprietary numerical job inputs (CFM, BTU, dimensions)", () => {
    const rawPayload = {
      calculatorId: "btu-calculator",
      presetId: "residential_3_ton",
      cfm: 1200,
      coolingBtu: 36000,
      sqft: 2000,
      width: 14,
      height: 10,
    };

    const sanitized = sanitizeTelemetryPayload(rawPayload);

    expect(sanitized.calculatorId).toBe("btu-calculator");
    expect(sanitized.presetId).toBe("residential_3_ton");
    expect((sanitized as any).cfm).toBeUndefined();
    expect((sanitized as any).coolingBtu).toBeUndefined();
    expect((sanitized as any).sqft).toBeUndefined();
    expect((sanitized as any).width).toBeUndefined();
    expect((sanitized as any).height).toBeUndefined();
  });

  it("rejects URLs containing search query parameters or email addresses", () => {
    const rawPayload = {
      calculatorId: "pt-chart",
      referrerUrl: "https://hvaclogic.org/calculators/pt-chart?psig=118&ref=r454b",
      shareTarget: "someone@trade.com",
    };

    const sanitized = sanitizeTelemetryPayload(rawPayload);

    expect(sanitized.calculatorId).toBe("pt-chart");
    expect((sanitized as any).referrerUrl).toBeUndefined();
    expect((sanitized as any).shareTarget).toBeUndefined();
  });
});
