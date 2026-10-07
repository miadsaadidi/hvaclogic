import { describe, expect, it } from "vitest";
import {
  getCalculatorById,
  publishedCalculators,
} from "./calculators-registry";

describe("calculator registry publication state", () => {
  it("publishes the validated refrigerant charge calculator after release gates pass", () => {
    const calculator = getCalculatorById("refrigerant-charge-calculator");

    expect(calculator).toBeDefined();
    expect(calculator?.status).toBe("production");
    expect(calculator?.testStatus).toBe("unit-tested");
    expect(publishedCalculators().map((item) => item.id)).toContain(
      "refrigerant-charge-calculator",
    );
  });

  it("verifies bidirectional cluster relations between airflow tools and boiler sizing tool", () => {
    const ductulator = getCalculatorById("ductulator");
    const flexDuct = getCalculatorById("flex-duct-cfm-chart");
    const ductFriction = getCalculatorById("duct-friction-loss-calculator");
    const boiler = getCalculatorById("boiler-size-calculator");

    expect(ductulator?.relatedCalculatorIds).toContain("boiler-size-calculator");
    expect(flexDuct?.relatedCalculatorIds).toContain("boiler-size-calculator");
    expect(ductFriction?.relatedCalculatorIds).toContain("boiler-size-calculator");

    expect(boiler?.relatedCalculatorIds).toContain("ductulator");
    expect(boiler?.relatedCalculatorIds).toContain("duct-friction-loss-calculator");
  });

  it("publishes the validated ACCA Manual D equivalent length calculator and verifies cluster links", () => {
    const eqLength = getCalculatorById("equivalent-length-calculator");
    const ductFriction = getCalculatorById("duct-friction-loss-calculator");
    const ductulator = getCalculatorById("ductulator");

    expect(eqLength).toBeDefined();
    expect(eqLength?.status).toBe("production");
    expect(["unit-tested", "validated"]).toContain(eqLength?.testStatus);
    expect(publishedCalculators().map((item) => item.id)).toContain("equivalent-length-calculator");

    // Bidirectional cluster relations
    expect(eqLength?.relatedCalculatorIds).toContain("duct-friction-loss-calculator");
    expect(eqLength?.relatedCalculatorIds).toContain("ductulator");
    expect(ductFriction?.relatedCalculatorIds).toContain("equivalent-length-calculator");
    expect(ductulator?.relatedCalculatorIds).toContain("equivalent-length-calculator");
  });

  it("publishes the unit-tested hydronic expansion tank calculator and verifies cluster links", () => {
    const expTank = getCalculatorById("expansion-tank-calculator");
    const boiler = getCalculatorById("boiler-size-calculator");

    expect(expTank).toBeDefined();
    expect(expTank?.status).toBe("production");
    expect(expTank?.testStatus).toBe("unit-tested");
    expect(publishedCalculators().map((item) => item.id)).toContain("expansion-tank-calculator");

    // Bidirectional cluster relations
    expect(expTank?.relatedCalculatorIds).toContain("boiler-size-calculator");
    expect(boiler?.relatedCalculatorIds).toContain("expansion-tank-calculator");
  });

  it("publishes the heat strip calculator and verifies bidirectional cluster links with heat pump and heat loss tools", () => {
    const heatStrip = getCalculatorById("heat-strip-size-calculator");
    const heatPump = getCalculatorById("heat-pump-size-calculator");
    const heatLoss = getCalculatorById("heat-loss-calculator");
    const furnace = getCalculatorById("furnace-size-calculator");

    expect(heatStrip).toBeDefined();
    expect(heatStrip?.status).toBe("production");
    expect(heatStrip?.testStatus).toBe("unit-tested");
    expect(publishedCalculators().map((item) => item.id)).toContain("heat-strip-size-calculator");

    // Bidirectional cluster links
    expect(heatStrip?.relatedCalculatorIds).toContain("heat-pump-size-calculator");
    expect(heatStrip?.relatedCalculatorIds).toContain("heat-loss-calculator");
    expect(heatPump?.relatedCalculatorIds).toContain("heat-strip-size-calculator");
    expect(heatLoss?.relatedCalculatorIds).toContain("heat-strip-size-calculator");
    expect(furnace?.relatedCalculatorIds).toContain("heat-strip-size-calculator");
  });
});
