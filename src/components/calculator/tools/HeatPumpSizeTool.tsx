"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateHeatPumpSizing,
  HeatPumpCompressorType,
  COMPRESSOR_PERFORMANCE_FACTORS,
  HeatPumpOutput,
} from "@/lib/math/heat-pump";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { HeatPumpBalanceVisualizer } from "@/components/calculator/visualizers/HeatPumpBalanceVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const HEAT_PUMP_PRESETS = [
  { label: "❄️ Cold-Climate Inverter (3T)", tons: 3.0, type: "inverter_cold_climate" as HeatPumpCompressorType, outdoorDesign: 5, heatLoss: 42000, coolingLoad: 32000 },
  { label: "🏡 Standard Inverter (2.5T)", tons: 2.5, type: "inverter_standard" as HeatPumpCompressorType, outdoorDesign: 17, heatLoss: 32000, coolingLoad: 28000 },
  { label: "☀️ Sunbelt Heat Pump (3T)", tons: 3.0, type: "single_stage_standard" as HeatPumpCompressorType, outdoorDesign: 25, heatLoss: 30000, coolingLoad: 36000 },
  { label: "🏰 4-Ton Cold Climate", tons: 4.0, type: "inverter_cold_climate" as HeatPumpCompressorType, outdoorDesign: 0, heatLoss: 58000, coolingLoad: 44000 },
];

export function HeatPumpSizeTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [tons, setTons] = useState<number>(3.0);
  const [compressorType, setCompressorType] = useState<HeatPumpCompressorType>("inverter_cold_climate");
  const [outdoorDesign, setOutdoorDesign] = useState<number>(5);
  const [heatLoss, setHeatLoss] = useState<number>(42000);
  const [coolingLoad, setCoolingLoad] = useState<number>(32000);

  // Hydrate from URL
  useEffect(() => {
    const urlTons = Number(getParam("tons", "3.0"));
    const urlType = getParam("type", "inverter_cold_climate") as HeatPumpCompressorType;
    const urlDesign = Number(getParam("design", "5"));
    const urlLoss = Number(getParam("loss", "42000"));
    const urlCool = Number(getParam("cool", "32000"));

    if (!isNaN(urlTons) && urlTons > 0) setTons(urlTons);
    if (["inverter_cold_climate", "inverter_standard", "single_stage_standard"].includes(urlType)) setCompressorType(urlType);
    if (!isNaN(urlDesign)) setOutdoorDesign(urlDesign);
    if (!isNaN(urlLoss) && urlLoss > 0) setHeatLoss(urlLoss);
    if (!isNaN(urlCool) && urlCool > 0) setCoolingLoad(urlCool);
  }, [getParam]);

  const handlePresetSelect = (preset: typeof HEAT_PUMP_PRESETS[0]) => {
    setTons(preset.tons);
    setCompressorType(preset.type);
    setOutdoorDesign(preset.outdoorDesign);
    setHeatLoss(preset.heatLoss);
    setCoolingLoad(preset.coolingLoad);

    updateParam("tons", preset.tons);
    updateParam("type", preset.type);
    updateParam("design", preset.outdoorDesign);
    updateParam("loss", preset.heatLoss);
    updateParam("cool", preset.coolingLoad);
  };

  // Perform Calculation
  const output: HeatPumpOutput = useMemo(() => {
    return calculateHeatPumpSizing({
      nominalTonnage: tons,
      compressorType,
      outdoorDesignTempF: outdoorDesign,
      designHeatingLossBtu: heatLoss,
      designCoolingLoadBtu: coolingLoad,
    });
  }, [tons, compressorType, outdoorDesign, heatLoss, coolingLoad]);

  const handleExportCsv = () => {
    const headers = "Nominal Tonnage,Compressor Type,Outdoor Design Temp (°F),Design Heat Loss (BTU),Heating Output @ Design (BTU),Thermal Balance Point (°F),Auxiliary Heat Deficit (BTU),Recommended Aux Heat Strip (kW)\n";
    const row = `${output.nominalTonnage},"${compressorType}",${outdoorDesign},${output.buildingHeatLossAtDesignBtu},${output.heatingCapacityAtDesignBtu},${output.thermalBalancePointF},${output.auxiliaryHeatDeficitBtu},${output.recommendedAuxHeatStripKw}\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heat-pump-${output.nominalTonnage}t-balance-point.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Heat Pump Design Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample System Profiles:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(HEAT_PUMP_PRESETS[0])}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "0.72rem",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
            title="Reset to 3-Ton Cold Climate Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {HEAT_PUMP_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${tons === preset.tons && compressorType === preset.type && outdoorDesign === preset.outdoorDesign ? "active" : ""}`}
            type="button"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          <CalculatorTrustPill />
          {/* TONNAGE & COMPRESSOR */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="tons-select">
                <span>Equipment Size</span>
                <span className="unit-label">Tonnage</span>
              </label>
              <select
                id="tons-select"
                value={tons}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTons(val);
                  updateParam("tons", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={1.5}>1.5 Tons (18k BTU)</option>
                <option value={2.0}>2.0 Tons (24k BTU)</option>
                <option value={2.5}>2.5 Tons (30k BTU)</option>
                <option value={3.0}>3.0 Tons (36k BTU)</option>
                <option value={3.5}>3.5 Tons (42k BTU)</option>
                <option value={4.0}>4.0 Tons (48k BTU)</option>
                <option value={5.0}>5.0 Tons (60k BTU)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="compressor-select">
                <span>Compressor Tech</span>
                <span className="unit-label">Inverter Tier</span>
              </label>
              <select
                id="compressor-select"
                value={compressorType}
                onChange={(e) => {
                  const val = e.target.value as HeatPumpCompressorType;
                  setCompressorType(val);
                  updateParam("type", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="inverter_cold_climate">Cold-Climate ccASHP (76% @ 5°F)</option>
                <option value="inverter_standard">Standard Inverter (52% @ 5°F)</option>
                <option value="single_stage_standard">Single-Stage (35% @ 5°F)</option>
              </select>
            </div>
          </div>

          {/* WINTER OUTDOOR DESIGN TEMPERATURE */}
          <div className="form-group">
            <label htmlFor="outdoor-temp-input">
              <span>Winter Outdoor Design Temp</span>
              <span className="unit-label">&deg;F (99% ASHRAE)</span>
            </label>
            <div className="input-with-slider">
              <input
                id="outdoor-temp-input"
                type="number"
                min={-20}
                max={40}
                value={outdoorDesign}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setOutdoorDesign(val);
                  updateParam("design", val);
                }}
                className="input-number"
              />
              <input
                type="range"
                min={-15}
                max={35}
                value={outdoorDesign}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setOutdoorDesign(val);
                  updateParam("design", val);
                }}
                className="input-range"
                aria-label="Outdoor design temperature slider"
              />
            </div>
          </div>

          {/* BUILDING DESIGN HEATING LOSS */}
          <div className="form-group">
            <label htmlFor="heat-loss-input">
              <span>Building Design Heat Loss</span>
              <span className="unit-label">BTU / hr</span>
            </label>
            <div className="input-with-slider">
              <input
                id="heat-loss-input"
                type="number"
                min={10000}
                max={120000}
                step={1000}
                value={heatLoss}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHeatLoss(val);
                  updateParam("loss", val);
                }}
                className="input-number"
              />
              <input
                type="range"
                min={15000}
                max={80000}
                step={1000}
                value={Math.min(80000, heatLoss)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHeatLoss(val);
                  updateParam("loss", val);
                }}
                className="input-range"
                aria-label="Building heat loss slider"
              />
            </div>
          </div>

          {/* DESIGN COOLING LOAD (ACCA MANUAL S CHECK) */}
          <div className="form-group">
            <label htmlFor="cooling-load-input">
              <span>Summer Design Cooling Load</span>
              <span className="unit-label">BTU / hr</span>
            </label>
            <input
              id="cooling-load-input"
              type="number"
              min={10000}
              max={80000}
              step={1000}
              value={coolingLoad}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCoolingLoad(val);
                updateParam("cool", val);
              }}
              className="input-number"
            />
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Manual S Status: <strong>{output.manualSOversizingStatus}</strong> ({Math.round(output.manualSCoolingRatio * 100)}% of cooling load)
            </span>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Heat Pump Thermal Balance Result">
            <div className="result-label">Thermal Balance Point</div>
            <div className="result-value" style={{ color: "var(--accent-cooling)" }}>
              {output.thermalBalancePointF}&deg;F Outdoor
            </div>
            <div className="result-unit">
              100% heat pump heating capacity down to <strong>{output.thermalBalancePointF}&deg;F</strong>
            </div>
            <div style={{ marginTop: "0.4rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: output.auxiliaryHeatDeficitBtu > 0 ? "rgba(245, 158, 11, 0.12)" : "rgba(16, 185, 129, 0.12)",
                  color: output.auxiliaryHeatDeficitBtu > 0 ? "#f59e0b" : "var(--accent-success)",
                  border: "1px solid currentColor",
                }}
              >
                {output.auxiliaryHeatDeficitBtu > 0
                  ? `Requires ${output.recommendedAuxHeatStripKw} kW Auxiliary Backup at ${outdoorDesign}°F`
                  : `✓ 100% Heating Coverage down to ${outdoorDesign}°F Design`}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual S®", "AHRI 210/240", "NEEP Cold-Climate (ccASHP)"]} />

          {/* BALANCE POINT INTERSECTION VISUALIZER */}
          <HeatPumpBalanceVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Heating Output (@ {outdoorDesign}&deg;F)</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.heatingCapacityAtDesignBtu.toLocaleString()} BTU
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Aux Heat Strip Size</div>
              <div className="item-value">{output.recommendedAuxHeatStripKw} kW Backup</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">47&deg;F Rated Capacity</div>
              <div className="item-value">{output.nominalHeatingBtu47F.toLocaleString()} BTU</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Cold Climate ccASHP</div>
              <div className="item-value" style={{ color: output.isColdClimateQualified ? "var(--accent-success)" : "var(--ink)" }}>
                {output.isColdClimateQualified ? "✓ NEEP Qualified" : "Standard Tier"}
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/heat-pump-size-calculator"
            toolName="Heat Pump Sizing & Balance Point Tool"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Sizing &amp; Design</div>
            <Link href={`/calculators/furnace-size-calculator?sqft=${Math.round(heatLoss / 40)}`} style={{ marginBottom: "0.5rem" }}>
              <span>Compare with Gas Furnace Dual-Fuel Alternative</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/btu-calculator">
              <span>Cross-Check Whole-House Manual J Heating &amp; Cooling Load</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label={`${output.nominalTonnage}T Balance Point`}
        value={`${output.thermalBalancePointF}°F`}
        unit={`(${output.recommendedAuxHeatStripKw} kW Aux)`}
      />
    </div>
  );
}
