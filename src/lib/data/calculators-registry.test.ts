import { describe, expect, it } from "vitest";
import {
  getCalculatorById,
  publishedCalculators,
} from "./calculators-registry";

describe("calculator registry publication state", () => {
  it("keeps the refrigerant charge calculator in development until release gates pass", () => {
    const calculator = getCalculatorById("refrigerant-charge-calculator");

    expect(calculator).toBeDefined();
    expect(calculator?.status).toBe("development");
    expect(calculator?.testStatus).toBe("partial");
    expect(publishedCalculators().map((item) => item.id)).not.toContain(
      "refrigerant-charge-calculator",
    );
  });
});
