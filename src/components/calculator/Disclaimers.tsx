import React from "react";
import { CalculatorMeta } from "@/types/calculation";
import { Disclaimer } from "@/components/shared/Disclaimer";

interface DisclaimersProps {
  calculator: CalculatorMeta;
}

export function Disclaimers({ calculator }: DisclaimersProps) {
  const isLifeSafety =
    calculator.riskLevel === "high" ||
    calculator.id.includes("combustion") ||
    calculator.id.includes("refrigerant") ||
    calculator.id.includes("boiler") ||
    calculator.id.includes("hood");

  const safetyTopic = calculator.id.includes("refrigerant")
    ? "a2l"
    : calculator.id.includes("combustion")
    ? "combustion"
    : calculator.id.includes("boiler")
    ? "boiler"
    : "general";

  return (
    <Disclaimer
      variant="calculator"
      isLifeSafety={isLifeSafety}
      safetyTopic={safetyTopic}
      title="Engineering Reference &amp; Regulatory Disclaimers"
    />
  );
}
