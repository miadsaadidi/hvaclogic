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
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";

const HEAT_PUMP_PRESETS = [
  { label: "❄️ Cold-Climate Inverter (3T)", tons: 3.0, type: "inverter_cold_climate" as HeatPumpCompressorType, outdoorDesign: 5, heatLoss: 42000, coolingLoad: 32000, dualFuel: false },
  { label: "🔥 Dual-Fuel Hybrid (3T + Gas)", tons: 3.0, type: "inverter_cold_climate" as HeatPumpCompressorType, outdoorDesign: 5, heatLoss: 45000, coolingLoad: 32000, dualFuel: true },
  { label: "🏡 Standard Inverter (2.5T)", tons: 2.5, type: "inverter_standard" as HeatPumpCompressorType, outdoorDesign: 17, heatLoss: 32000, coolingLoad: 28000, dualFuel: false },
  { label: "☀️ Sunbelt Heat Pump (3T)", tons: 3.0, type: "single_stage_standard" as HeatPumpCompressorType, outdoorDesign: 25, heatLoss: 30000, coolingLoad: 36000, dualFuel: false },
  { label: "🏰 4-Ton Cold Climate", tons: 4.0, type: "inverter_cold_climate" as HeatPumpCompressorType, outdoorDesign: 0, heatLoss: 58000, coolingLoad: 44000, dualFuel: false },
];

export function HeatPumpSizeTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [tons, setTons] = useState<number>(3.0);
  const [compressorType, setCompressorType] = useState<HeatPumpCompressorType>("inverter_cold_climate");
  const [outdoorDesign, setOutdoorDesign] = useState<number>(5);
  const [heatLoss, setHeatLoss] = useState<number>(42000);
  const [coolingLoad, setCoolingLoad] = useState<number>(32000);

  // Dual-fuel economic parameters
  const [dualFuelEnabled, setDualFuelEnabled] = useState<boolean>(false);
  const [elecRate, setElecRate] = useState<number>(0.16);
  const [gasRate, setGasRate] = useState<number>(1.40);
  const [furnaceAfue, setFurnaceAfue] = useState<number>(95);

  // Hydrate from URL
  useEffect(() => {
    const urlTons = Number(getParam("tons", "3.0"));
    const urlType = getParam("type", "inverter_cold_climate") as HeatPumpCompressorType;
    const urlDesign = Number(getParam("design", "5"));
    const urlLoss = Number(getParam("loss", "42000"));
    const urlCool = Number(getParam("cool", "32000"));
    const urlDf = getParam("dualfuel", "false") === "true";
    const urlElec = Number(getParam("elec", "0.16"));
    const urlGas = Number(getParam("gas", "1.40"));
    const urlAfue = Number(getParam("afue", "95"));

    if (!isNaN(urlTons) && urlTons > 0) setTons(urlTons);
    if (["inverter_cold_climate", "inverter_standard", "single_stage_standard"].includes(urlType)) setCompressorType(urlType);
    if (!isNaN(urlDesign)) setOutdoorDesign(urlDesign);
    if (!isNaN(urlLoss) && urlLoss > 0) setHeatLoss(urlLoss);
    if (!isNaN(urlCool) && urlCool > 0) setCoolingLoad(urlCool);
    if (urlDf) setDualFuelEnabled(true);
    if (!isNaN(urlElec) && urlElec > 0) setElecRate(urlElec);
    if (!isNaN(urlGas) && urlGas > 0) setGasRate(urlGas);
    if (!isNaN(urlAfue) && urlAfue > 50) setFurnaceAfue(urlAfue);
  }, [getParam]);

  const handlePresetSelect = (preset: typeof HEAT_PUMP_PRESETS[0]) => {
    setTons(preset.tons);
    setCompressorType(preset.type);
    setOutdoorDesign(preset.outdoorDesign);
    setHeatLoss(preset.heatLoss);
    setCoolingLoad(preset.coolingLoad);
    setDualFuelEnabled(preset.dualFuel);

    updateParam("tons", preset.tons);
    updateParam("type", preset.type);
    updateParam("design", preset.outdoorDesign);
    updateParam("loss", preset.heatLoss);
    updateParam("cool", preset.coolingLoad);
    updateParam("dualfuel", preset.dualFuel ? "true" : "false");
  };

  // Perform Calculation
  const output: HeatPumpOutput = useMemo(() => {
    return calculateHeatPumpSizing({
      nominalTonnage: tons,
      compressorType,
      outdoorDesignTempF: outdoorDesign,
      designHeatingLossBtu: heatLoss,
      designCoolingLoadBtu: coolingLoad,
      dualFuelEnabled,
      electricityRatePerKwh: elecRate,
      naturalGasRatePerTherm: gasRate,
      furnaceAfue: furnaceAfue / 100,
    });
  }, [tons, compressorType, outdoorDesign, heatLoss, coolingLoad, dualFuelEnabled, elecRate, gasRate, furnaceAfue]);

  const handleExportCsv = () => {
    const headers = "Nominal Tonnage,Compressor Type,Outdoor Design Temp (°F),Design Heat Loss (BTU),Heating Output @ Design (BTU),Thermal Balance Point (°F),Auxiliary Heat Deficit (BTU),Recommended Aux Heat Strip (kW),Manual S Status,Dual Fuel Enabled,Economic Balance Point (°F),Fuel Parity COP,HP Cost / MBTU,Furnace Cost / MBTU\n";
    const row = `${output.nominalTonnage},"${compressorType}",${outdoorDesign},${output.buildingHeatLossAtDesignBtu},${output.heatingCapacityAtDesignBtu},${output.thermalBalancePointF},${output.auxiliaryHeatDeficitBtu},${output.recommendedAuxHeatStripKw},"${output.manualSOversizingStatus}",${output.dualFuelEnabled},${output.economicBalancePointF ?? "N/A"},${output.economicCopThreshold ?? "N/A"},${output.heatPumpCostPerMbtuAtDesign},${output.furnaceCostPerMbtu}\n`;
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
          <AshraeClimateSelector
            compact={true}
            onSelectLocation={(loc) => {
              setOutdoorDesign(loc.winterDb99);
              updateParam("design", loc.winterDb99);
              updateParam("loc", loc.id);
            }}
          />
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
              Manual S 3rd Ed: <strong style={{ color: output.manualSOversizingStatus.includes("Optimal") ? "var(--accent-success)" : output.manualSOversizingStatus.includes("Heating-Priority") ? "var(--accent-cooling)" : "#f59e0b" }}>{output.manualSOversizingStatus}</strong> ({Math.round(output.manualSCoolingRatio * 100)}% of cooling load)
            </span>
          </div>

          {/* DUAL-FUEL HYBRID & ECONOMIC SWITCHOVER SETTINGS */}
          <div style={{ marginTop: "1rem", padding: "0.85rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label htmlFor="dual-fuel-toggle" style={{ fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span>🔥 Dual-Fuel Gas Backup &amp; Economic Switchover</span>
              </label>
              <input
                id="dual-fuel-toggle"
                type="checkbox"
                checked={dualFuelEnabled}
                onChange={(e) => {
                  setDualFuelEnabled(e.target.checked);
                  updateParam("dualfuel", e.target.checked ? "true" : "false");
                }}
                style={{ cursor: "pointer", width: "1.1rem", height: "1.1rem", accentColor: "var(--accent-cooling)" }}
              />
            </div>
            {dualFuelEnabled && (
              <div style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label htmlFor="elec-rate" style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>Elec ($/kWh)</label>
                  <input
                    id="elec-rate"
                    type="number"
                    step={0.01}
                    min={0.05}
                    max={0.60}
                    value={elecRate}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setElecRate(v);
                      updateParam("elec", v);
                    }}
                    className="input-number"
                    style={{ fontSize: "0.8rem", padding: "0.35rem 0.5rem" }}
                  />
                </div>
                <div>
                  <label htmlFor="gas-rate" style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>Gas ($/therm)</label>
                  <input
                    id="gas-rate"
                    type="number"
                    step={0.05}
                    min={0.50}
                    max={4.00}
                    value={gasRate}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setGasRate(v);
                      updateParam("gas", v);
                    }}
                    className="input-number"
                    style={{ fontSize: "0.8rem", padding: "0.35rem 0.5rem" }}
                  />
                </div>
                <div>
                  <label htmlFor="furnace-afue" style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>AFUE (%)</label>
                  <input
                    id="furnace-afue"
                    type="number"
                    step={1}
                    min={80}
                    max={98}
                    value={furnaceAfue}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setFurnaceAfue(v);
                      updateParam("afue", v);
                    }}
                    className="input-number"
                    style={{ fontSize: "0.8rem", padding: "0.35rem 0.5rem" }}
                  />
                </div>
              </div>
            )}
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

          <StandardsBadge standards={["ANSI/ACCA 3 Manual S (3rd Ed)", "AHRI 210/240-2023", "NEEP ccASHP v4.0"]} />

          {/* DUAL-FUEL ECONOMIC SWITCHOVER CARD */}
          {output.dualFuelEnabled && (
            <div style={{ margin: "0.75rem 0", padding: "0.85rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem", flexWrap: "wrap", gap: "0.3rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--accent-success)" }}>
                  ⚡/🔥 Dual-Fuel Economic Switchover
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Fuel Parity COP: <strong>{output.economicCopThreshold}</strong>
                </span>
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: "0.2rem 0" }}>
                {output.economicBalancePointF !== null ? `${output.economicBalancePointF}°F Switchover Temperature` : "Heat Pump Always More Economical"}
              </div>
              <p style={{ fontSize: "0.74rem", color: "var(--ink-secondary)", margin: "0.3rem 0", lineHeight: 1.45 }}>
                {output.economicExplanation}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.72rem" }}>
                <div style={{ background: "rgba(0,0,0,0.2)", padding: "0.35rem 0.5rem", borderRadius: "4px" }}>
                  HP Cost @ {outdoorDesign}&deg;F: <strong style={{ color: "var(--accent-cooling)" }}>${output.heatPumpCostPerMbtuAtDesign} / MBTU</strong>
                </div>
                <div style={{ background: "rgba(0,0,0,0.2)", padding: "0.35rem 0.5rem", borderRadius: "4px" }}>
                  Gas Furnace Cost: <strong style={{ color: "#f59e0b" }}>${output.furnaceCostPerMbtu} / MBTU</strong>
                </div>
              </div>
            </div>
          )}

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
