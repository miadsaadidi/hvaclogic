"use client";

import React from "react";
import { RefrigerantChargeOutput } from "@/lib/math/refrigerant-charge";

interface RefrigerantChargeVisualizerProps {
  output: RefrigerantChargeOutput;
}

export function RefrigerantChargeVisualizer({ output }: RefrigerantChargeVisualizerProps) {
  const adjustmentColor = output.adjustmentAction === "remove"
    ? "var(--accent-warning)"
    : output.adjustmentAction === "none"
      ? "var(--accent-success)"
      : "var(--accent-cooling)";
  const actionLabel = output.adjustmentAction === "remove"
    ? "Recover"
    : output.adjustmentAction === "none"
      ? "No adjustment"
      : "Add";
  const ariaLabel = `${output.refrigerant} line-set diagram. ${output.actualLengthFt} feet total with ${output.excessLengthFt} feet above the factory allowance. ${actionLabel} ${output.chargeAdjustmentFormatted}. Initial target charge ${output.initialTargetChargeFormatted}.`;

  return (
    <div className="refrigerant-charge-visualizer" role="img" aria-label={ariaLabel}>
      <div className="refrigerant-charge-visualizer__header">
        <div>
          <span className="eyebrow">Live line-set schematic</span>
          <strong>{output.refrigerant} · {output.safetyGroup}</strong>
        </div>
        <span className="metric-pill">{output.liquidLineOd} liquid</span>
      </div>

      <svg viewBox="0 0 640 235" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="charge-unit" x1="0" x2="1">
            <stop offset="0" stopColor="var(--surface-raised)" />
            <stop offset="1" stopColor="var(--surface)" />
          </linearGradient>
        </defs>

        <rect x="20" y="48" width="145" height="135" rx="12" fill="url(#charge-unit)" stroke="var(--border-color)" />
        <circle cx="92" cy="102" r="34" fill="none" stroke="var(--accent-cooling)" strokeWidth="3" />
        <path d="M92 72 L100 96 L122 102 L100 110 L92 132 L84 110 L62 102 L84 94 Z" fill="var(--accent-cooling)" opacity="0.65" />
        <text x="92" y="158" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="700">OUTDOOR UNIT</text>

        <rect x="475" y="48" width="145" height="135" rx="12" fill="url(#charge-unit)" stroke="var(--border-color)" />
        <path d="M510 140 L548 78 L585 140 Z" fill="none" stroke="var(--accent-primary)" strokeWidth="4" />
        <path d="M520 127 L575 127 M527 114 L568 114 M535 101 L560 101" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.75" />
        <text x="548" y="158" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="700">INDOOR COIL</text>

        <path d="M165 88 H475" stroke="var(--accent-heating)" strokeWidth="5" strokeLinecap="round" />
        <path d="M475 137 H165" stroke="var(--accent-cooling)" strokeWidth="8" strokeLinecap="round" />
        <path d="M192 88 H322" stroke="var(--accent-success)" strokeWidth="7" strokeLinecap="round" />
        {output.excessLengthFt > 0 && (
          <path d="M322 88 H448" stroke={adjustmentColor} strokeWidth="7" strokeLinecap="round" strokeDasharray="9 7" />
        )}

        <text x="255" y="75" textAnchor="middle" fill="var(--accent-success)" fontSize="12" fontWeight="700">
          {output.factoryAllowanceFt} ft factory allowance
        </text>
        <text x="386" y="75" textAnchor="middle" fill={adjustmentColor} fontSize="12" fontWeight="700">
          {output.excessLengthFt > 0 ? `+${output.excessLengthFt} ft excess` : "within allowance"}
        </text>
        <text x="320" y="158" textAnchor="middle" fill="var(--ink-secondary)" fontSize="12">
          {output.suctionLineOd} suction · {output.adderRateOzPerFt} oz/ft
        </text>

        <rect x="224" y="178" width="192" height="42" rx="8" fill="var(--bg-primary)" stroke={adjustmentColor} />
        <text x="320" y="196" textAnchor="middle" fill="var(--ink-secondary)" fontSize="10" fontWeight="700">INITIAL WEIGH-IN</text>
        <text x="320" y="213" textAnchor="middle" fill={adjustmentColor} fontSize="15" fontWeight="700">
          {actionLabel}: {output.chargeAdjustmentFormatted}
        </text>
      </svg>

      <div className="refrigerant-charge-visualizer__footer">
        <span>Source: <strong>{output.sourceInternalId || "Custom OEM manual"}</strong></span>
        <span>Initial target: <strong>{output.initialTargetChargeFormatted}</strong></span>
      </div>
    </div>
  );
}
