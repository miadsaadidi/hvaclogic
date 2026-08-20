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
});
