"use client";

import React, { useState } from "react";

interface CopyForAiButtonProps {
  toolName: string;
  governingStandard?: string;
  inputs?: Record<string, string | number>;
  outputs?: Record<string, string | number>;
  className?: string;
}

export function CopyForAiButton({
  toolName,
  governingStandard = "ASHRAE / ACCA",
  inputs = {},
  outputs = {},
  className = "action-btn",
}: CopyForAiButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyForAi = () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const timestamp = new Date().toISOString();

    const formattedPrompt = [
      `### ⚡ HVAC Engineering Scenario Context (via HVACLogic.com)`,
      `**System Analysis**: ${toolName}`,
      `**Governing Engineering Standard**: ${governingStandard}`,
      `**Timestamp**: ${timestamp}`,
      `**Direct Permitted State URL**: ${currentUrl}`,
      ``,
      `#### 📥 Input Parameter Vector:`,
      Object.entries(inputs)
        .map(([k, v]) => `- **${k}**: \`${v}\``)
        .join("\n") || "- *Standard nominal baseline conditions*",
      ``,
      `#### 📤 Deterministic Physics Outputs:`,
      Object.entries(outputs)
        .map(([k, v]) => `- **${k}**: \`${v}\``)
        .join("\n") || "- *Deterministic computation evaluated*",
      ``,
      `#### 🤖 LLM Prompt Request:`,
      `Please review this ${toolName} engineering calculation against ${governingStandard} criteria. Provide any design recommendations, code rule constraints, efficiency optimizations, or duct/equipment sizing considerations based on these exact input parameters.`
    ].join("\n");

    navigator.clipboard.writeText(formattedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopyForAi}
      className={className}
      title="Copy calculation scenario formatted for ChatGPT, Claude, and Perplexity reasoning"
      type="button"
    >
      {copied ? "✓ Copied for AI!" : "🤖 Copy for AI"}
    </button>
  );
}
