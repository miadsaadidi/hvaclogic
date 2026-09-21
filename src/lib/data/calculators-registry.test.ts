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
    expect(calculator?.testStatus).toBe("validated");
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
});
