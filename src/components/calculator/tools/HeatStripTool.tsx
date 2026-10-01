"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateHeatStripSizing,
  ElectricalVoltage,
  ElectricalPhase,
  SizingObjective,
  HeatStripOutput,
  STANDARD_HEAT_STRIP_SIZES_KW,
} from "@/lib/math/heat-strip";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { HeatStripVisualizer } from "@/components/calculator/visualizers/HeatStripVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";

const HEAT_STRIP_PRESETS = [
  { label: "⚡ Supplemental Deficit (3T HP @ 5°F)", heatLoss: 45000, hpCapacity: 24000, tonnage: 3.0, objective: "supplemental_deficit" as SizingObjective, voltage: 240 as ElectricalVoltage, cfm: 1200 },
  { label: "🚨 100% Emergency Backup (4T Home)", heatLoss: 50000, hpCapacity: 0, tonnage: 4.0, objective: "full_emergency_backup" as SizingObjective, voltage: 240 as ElectricalVoltage, cfm: 1600 },
  { label: "❄️ Defrost Tempering (3T System)", heatLoss: 36000, hpCapacity: 28000, tonnage: 3.0, objective: "defrost_tempering" as SizingObjective, voltage: 240 as ElectricalVoltage, cfm: 1200 },
  { label: "🏢 Commercial 3-Phase (208V 3Ø)", heatLoss: 65000, hpCapacity: 30000, tonnage: 5.0, objective: "supplemental_deficit" as SizingObjective, voltage: 208 as ElectricalVoltage, phase: 3 as ElectricalPhase, cfm: 2000 },
  { label: "🏡 Small Home (2T HP @ 15°F)", heatLoss: 28000, hpCapacity: 16000, tonnage: 2.0, objective: "supplemental_deficit" as SizingObjective, voltage: 240 as ElectricalVoltage, cfm: 800 },
];

export function HeatStripTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [heatLoss, setHeatLoss] = useState<number>(45000);
  const [hpCapacity, setHpCapacity] = useState<number>(24000);
  const [tonnage, setTonnage] = useState<number>(3.0);
  const [objective, setObjective] = useState<SizingObjective>("supplemental_deficit");
  const [voltage, setVoltage] = useState<ElectricalVoltage>(240);
  const [phase, setPhase] = useState<ElectricalPhase>(1);
  const [systemCfm, setSystemCfm] = useState<number>(1200);
  const [safetyFactor, setSafetyFactor] = useState<number>(1.0);

  // Hydrate from URL search params
  useEffect(() => {
    const urlLoss = Number(getParam("loss", "45000"));
    const urlHp = Number(getParam("hp", "24000"));
    const urlTons = Number(getParam("tons", "3.0"));
    const urlObj = getParam("obj", "supplemental_deficit") as SizingObjective;
    const urlVolt = Number(getParam("volt", "240")) as ElectricalVoltage;
    const urlPhase = Number(getParam("phase", "1")) as ElectricalPhase;
    const urlCfm = Number(getParam("cfm", "1200"));
    const urlSafety = Number(getParam("safety", "1.0"));

    if (!isNaN(urlLoss) && urlLoss > 0) setHeatLoss(urlLoss);
    if (!isNaN(urlHp) && urlHp >= 0) setHpCapacity(urlHp);
    if (!isNaN(urlTons) && urlTons > 0) setTonnage(urlTons);
    if (["supplemental_deficit", "full_emergency_backup", "defrost_tempering"].includes(urlObj)) setObjective(urlObj);
    if ([240, 208, 480].includes(urlVolt)) setVoltage(urlVolt);
    if ([1, 3].includes(urlPhase)) setPhase(urlPhase);
    if (!isNaN(urlCfm) && urlCfm > 0) setSystemCfm(urlCfm);
    if (!isNaN(urlSafety) && urlSafety >= 1.0) setSafetyFactor(urlSafety);
  }, [getParam]);

  const handlePresetSelect = (p: typeof HEAT_STRIP_PRESETS[0]) => {
    setHeatLoss(p.heatLoss);
    setHpCapacity(p.hpCapacity);
    setTonnage(p.tonnage);
    setObjective(p.objective);
    setVoltage(p.voltage);
    if (p.phase) setPhase(p.phase);
    setSystemCfm(p.cfm);

    updateParam("loss", p.heatLoss);
    updateParam("hp", p.hpCapacity);
    updateParam("tons", p.tonnage);
    updateParam("obj", p.objective);
    updateParam("volt", p.voltage);
    if (p.phase) updateParam("phase", p.phase);
    updateParam("cfm", p.cfm);
  };

  // Perform Calculation
  const output: HeatStripOutput = useMemo(() => {
    return calculateHeatStripSizing({
      designHeatLossBtu: heatLoss,
      heatPumpCapacityAtDesignBtu: hpCapacity,
      nominalTonnage: tonnage,
      sizingObjective: objective,
      voltage,
      phase,
      systemAirflowCfm: systemCfm,
      safetyOversizeFactor: safetyFactor,
    });
  }, [heatLoss, hpCapacity, tonnage, objective, voltage, phase, systemCfm, safetyFactor]);

  const handleExportCsv = () => {
    const headers = "Design Heat Loss (BTU),Heat Pump Capacity @ Design (BTU),Net Deficit (BTU),Sizing Objective,Exact Required kW,Selected Standard kW,Delivered BTU,Coverage %,Voltage (V),Phase,Total FLA (A),Total MCA (A),Breaker (MOPD A),Multi-Circuit Required,System Airflow (CFM),Min Airflow (CFM),Airflow Status,Temp Rise (°F),Recommended Stages\n";
    const row = `${output.designHeatLossBtu},${output.heatPumpCapacityAtDesignBtu},${output.netHeatingDeficitBtu},"${output.sizingObjective}",${output.exactRequiredKw},${output.selectedStandardKw},${output.totalDeliveredBtu},${output.coveragePercentage},${output.voltage},${output.phase},${output.totalFlaAmps},${output.totalMcaAmps},${output.totalMopdBreakerAmps},${output.isMultiCircuitRequired},${output.systemAirflowCfm},${output.minRequiredAirflowCfm},"${output.airflowStatus}",${output.estimatedTempRiseF},${output.recommendedStages}\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heat-strip-${output.selectedStandardKw}kw-sizing.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      <GooglePreferredBanner />

      <CalculatorTrustPill />

      {/* Preset Archetype Chips */}
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          Engineering Archetype Presets:
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {HEAT_STRIP_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetSelect(p)}
              className="btn btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem" }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <AshraeClimateSelector
        onSelectLocation={(climate) => {
          // Adjust heat loss roughly based on 99% design temp
          const deltaT = 70 - climate.winterDb99;
          const estimatedLoss = Math.round(2000 * deltaT * 0.35 * 100) / 100;
          setHeatLoss(estimatedLoss);
          updateParam("loss", estimatedLoss);
        }}
      />

      {/* Form Controls Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginTop: "1.25rem" }}>
        {/* Left Column: Sizing & Thermal Inputs */}
        <div className="input-group-panel" style={{ background: "var(--surface)", padding: "1.15rem", borderRadius: "0.6rem", border: "1px solid var(--border-color)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>🌡️</span> Thermal Deficit &amp; Sizing Parameters
          </h3>

          <div className="form-group" style={{ marginBottom: "0.85rem" }}>
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>Sizing Objective Mode</span>
            </label>
            <select
              className="form-select"
              value={objective}
              onChange={(e) => {
                const val = e.target.value as SizingObjective;
                setObjective(val);
                updateParam("obj", val);
              }}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border-color)", background: "var(--bg)", color: "var(--ink)" }}
            >
              <option value="supplemental_deficit">Supplemental Heat Deficit (Heat Loss - HP Output @ Design)</option>
              <option value="full_emergency_backup">100% Emergency Backup Mode (Full Heat Loss Coverage)</option>
              <option value="defrost_tempering">Defrost Cycle Tempering (Offset Indoor Coil Cooling)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "0.85rem" }}>
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>Design Heating Loss (ACCA Manual J)</span>
              <span style={{ color: "var(--accent-orange)", fontWeight: 700 }}>{heatLoss.toLocaleString()} BTU/hr</span>
            </label>
            <input
              type="range"
              min={10000}
              max={120000}
              step={1000}
              value={heatLoss}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHeatLoss(val);
                updateParam("loss", val);
              }}
              className="form-range"
              style={{ width: "100%" }}
            />
          </div>

          {objective !== "full_emergency_backup" && (
            <div className="form-group" style={{ marginBottom: "0.85rem" }}>
              <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
                <span>Heat Pump Output @ Winter Design Temp</span>
                <span style={{ color: "var(--accent-cooling)", fontWeight: 700 }}>{hpCapacity.toLocaleString()} BTU/hr</span>
              </label>
              <input
                type="range"
                min={0}
                max={90000}
                step={1000}
                value={hpCapacity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHpCapacity(val);
                  updateParam("hp", val);
                }}
                className="form-range"
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                Delivered heating capacity at local 99% outdoor design temperature from expanded manufacturer tables.
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: "0.85rem" }}>
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>Nominal Heat Pump Tonnage</span>
              <span>{tonnage} Tons</span>
            </label>
            <select
              className="form-select"
              value={tonnage}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTonnage(val);
                updateParam("tons", val);
              }}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border-color)", background: "var(--bg)", color: "var(--ink)" }}
            >
              <option value={1.5}>1.5 Tons (18,000 BTU/hr)</option>
              <option value={2.0}>2.0 Tons (24,000 BTU/hr)</option>
              <option value={2.5}>2.5 Tons (30,000 BTU/hr)</option>
              <option value={3.0}>3.0 Tons (36,000 BTU/hr)</option>
              <option value={3.5}>3.5 Tons (42,000 BTU/hr)</option>
              <option value={4.0}>4.0 Tons (48,000 BTU/hr)</option>
              <option value={5.0}>5.0 Tons (60,000 BTU/hr)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Electrical & Airflow Specifications */}
        <div className="input-group-panel" style={{ background: "var(--surface)", padding: "1.15rem", borderRadius: "0.6rem", border: "1px solid var(--border-color)" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>⚡</span> Electrical &amp; Blower Coordination (NEC 424)
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.85rem" }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Service Voltage</label>
              <select
                className="form-select"
                value={voltage}
                onChange={(e) => {
                  const val = Number(e.target.value) as ElectricalVoltage;
                  setVoltage(val);
                  updateParam("volt", val);
                }}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border-color)", background: "var(--bg)", color: "var(--ink)" }}
              >
                <option value={240}>240V (Standard Residential)</option>
                <option value={208}>208V (Commercial / High-Rise)</option>
                <option value={480}>480V (Commercial Industrial)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Phase</label>
              <select
                className="form-select"
                value={phase}
                onChange={(e) => {
                  const val = Number(e.target.value) as ElectricalPhase;
                  setPhase(val);
                  updateParam("phase", val);
                }}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border-color)", background: "var(--bg)", color: "var(--ink)" }}
              >
                <option value={1}>1-Phase (Single Phase)</option>
                <option value={3}>3-Phase (Three Phase)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "0.85rem" }}>
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>Air Handler Airflow Delivery</span>
              <span style={{ color: output.airflowStatus === "Adequate" ? "var(--accent-green)" : "#ef4444", fontWeight: 700 }}>
                {systemCfm} CFM
              </span>
            </label>
            <input
              type="range"
              min={400}
              max={3000}
              step={50}
              value={systemCfm}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSystemCfm(val);
                updateParam("cfm", val);
              }}
              className="form-range"
              style={{ width: "100%" }}
            />
            <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
              Minimum safe airflow requirement: {output.minRequiredAirflowCfm} CFM (45 CFM / kW rule of thumb).
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>Design Safety / Oversize Factor</span>
              <span>{Math.round(safetyFactor * 100)}%</span>
            </label>
            <select
              className="form-select"
              value={safetyFactor}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSafetyFactor(val);
                updateParam("safety", val);
              }}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid var(--border-color)", background: "var(--bg)", color: "var(--ink)" }}
            >
              <option value={1.0}>1.00 (Exact 100% Deficit Match)</option>
              <option value={1.1}>1.10 (10% Design Safety Buffer)</option>
              <option value={1.15}>1.15 (15% Cold-Snap Margin)</option>
              <option value={1.25}>1.25 (25% Oversizing Maximum)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reactive Visualizer */}
      <HeatStripVisualizer output={output} />

      {/* Main Results Callout Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem", margin: "1rem 0" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderLeft: "4px solid #f59e0b", padding: "1rem", borderRadius: "0.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase" }}>Recommended Heat Strip</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f59e0b", marginTop: "0.25rem" }}>
            {output.selectedStandardKw} kW
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
            Exact Deficit: {output.exactRequiredKw} kW ({output.totalDeliveredBtu.toLocaleString()} BTU/hr)
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderLeft: "4px solid var(--accent-cooling)", padding: "1rem", borderRadius: "0.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase" }}>Circuit Ampacity (MCA)</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--ink)", marginTop: "0.25rem" }}>
            {output.totalMcaAmps} A
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
            FLA: {output.totalFlaAmps} A | 125% Continuous Duty
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderLeft: "4px solid var(--accent-green)", padding: "1rem", borderRadius: "0.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase" }}>Overcurrent Protection</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--ink)", marginTop: "0.25rem" }}>
            {output.totalMopdBreakerAmps} A
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
            {output.isMultiCircuitRequired ? "Split 2-Circuit Feed" : "Single 2-Pole Breaker"}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderLeft: `4px solid ${output.airflowStatus === "Adequate" ? "var(--accent-green)" : "#ef4444"}`, padding: "1rem", borderRadius: "0.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase" }}>Airflow Temperature Rise</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: output.airflowStatus === "Adequate" ? "var(--accent-green)" : "#ef4444", marginTop: "0.25rem" }}>
            {output.estimatedTempRiseF}°F
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
            {output.airflowStatus} (Min {output.minRequiredAirflowCfm} CFM)
          </div>
        </div>
      </div>

      {/* Upstream & Downstream Workflow Bridges */}
      <div style={{ background: "rgba(56, 189, 248, 0.05)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "0.5rem", padding: "1rem", margin: "1.25rem 0" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
          🔄 Connected Sizing &amp; Heating Distribution Workflow:
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
          <Link
            href={`/calculators/heat-pump-size-calculator?loss=${heatLoss}&tons=${tonnage}`}
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}
          >
            ← Verify Heat Pump Balance Point
          </Link>
          <Link
            href={`/calculators/heat-loss-calculator?loss=${heatLoss}`}
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}
          >
            ← Recalculate Building Heat Loss
          </Link>
          <Link
            href={`/calculators/ductulator?cfm=${systemCfm}`}
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}
          >
            Verify Ductwork for {systemCfm} CFM →
          </Link>
        </div>
      </div>

      {/* Action Buttons & Export */}
      <ActionButtonBar
        toolRoute="/calculators/heat-strip-size-calculator"
        toolName="Heat Pump Auxiliary Electric Heat Strip Sizing Calculator"
        onExportCsv={handleExportCsv}
      />

      <StandardsBadge
        standards={[
          "ANSI/ACCA Manual S (3rd Ed)",
          "ACCA Manual J (8th Ed)",
          "NFPA 70 / NEC Article 424",
          "UL 1995 / UL 60335-2-40",
        ]}
      />

      <MobileResultBar
        label="Electric Strip"
        value={`${output.selectedStandardKw} kW`}
        unit={`(${output.totalMcaAmps}A MCA)`}
      />
    </div>
  );
}
