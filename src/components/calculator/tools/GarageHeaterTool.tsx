"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateGarageHeater,
  GaragePreset,
  GarageInsulationTier,
  GarageHeaterInput,
  GarageHeaterOutput,
} from "@/lib/math/garage-heater";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { GarageHeaterVisualizer } from "@/components/calculator/visualizers/GarageHeaterVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

const PRESETS = [
  {
    label: "🚗 2-Car Attached (22x24 / Avg Ins)",
    preset: "2_car" as GaragePreset,
    height: 9,
    attached: true,
    insulation: "average" as GarageInsulationTier,
    targetTemp: 60,
    outdoorTemp: 10,
  },
  {
    label: "🚙 1-Car Compact (12x22 / Poor Ins)",
    preset: "1_car" as GaragePreset,
    height: 9,
    attached: true,
    insulation: "poor" as GarageInsulationTier,
    targetTemp: 55,
    outdoorTemp: 15,
  },
  {
    label: "🚛 3-Car Detached (24x32 / Insulated)",
    preset: "3_car" as GaragePreset,
    height: 10,
    attached: false,
    insulation: "insulated_good" as GarageInsulationTier,
    targetTemp: 65,
    outdoorTemp: 0,
  },
  {
    label: "🚜 1,200 sq ft Shop (30x40 / 14ft Unins)",
    preset: "pole_barn_shop" as GaragePreset,
    height: 14,
    attached: false,
    insulation: "uninsulated" as GarageInsulationTier,
    targetTemp: 60,
    outdoorTemp: 0,
  },
];

export function GarageHeaterTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [preset, setPreset] = useState<GaragePreset>("2_car");
  const [customWidth, setCustomWidth] = useState<number>(22);
  const [customLength, setCustomLength] = useState<number>(24);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);
  const [isAttached, setIsAttached] = useState<boolean>(true);
  const [insulation, setInsulation] = useState<GarageInsulationTier>("average");
  const [targetTemp, setTargetTemp] = useState<number>(60);
  const [outdoorTemp, setOutdoorTemp] = useState<number>(10);

  // Hydrate from URL
  useEffect(() => {
    const urlPreset = getParam("preset", "2_car") as GaragePreset;
    const urlHeight = Number(getParam("height", "9"));
    const urlOutdoor = Number(getParam("outTemp", "10"));

    if (["1_car", "2_car", "2_5_car", "3_car", "pole_barn_shop", "custom"].includes(urlPreset)) setPreset(urlPreset);
    if (!isNaN(urlHeight) && urlHeight >= 8) setCeilingHeight(urlHeight);
    if (!isNaN(urlOutdoor)) setOutdoorTemp(urlOutdoor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (p: typeof PRESETS[0]) => {
    setPreset(p.preset);
    setCeilingHeight(p.height);
    setIsAttached(p.attached);
    setInsulation(p.insulation);
    setTargetTemp(p.targetTemp);
    setOutdoorTemp(p.outdoorTemp);

    updateParam("preset", p.preset);
    updateParam("height", p.height);
    updateParam("outTemp", p.outdoorTemp);
  };

  // Perform Calculation
  const output: GarageHeaterOutput = useMemo(() => {
    const input: GarageHeaterInput = {
      preset,
      customWidthFt: customWidth,
      customLengthFt: customLength,
      ceilingHeightFt: ceilingHeight,
      isAttached,
      insulationLevel: insulation,
      targetIndoorTempF: targetTemp,
      outdoorDesignTempF: outdoorTemp,
    };
    return calculateGarageHeater(input);
  }, [preset, customWidth, customLength, ceilingHeight, isAttached, insulation, targetTemp, outdoorTemp]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = `Garage Configuration,"${preset}",""\nFloor Area,${output.floorAreaSqFt},"sq ft"\nCeiling Height,${ceilingHeight},"ft"\nAttached to Home,"${isAttached ? "Yes" : "No"}",""\nInsulation Level,"${insulation}",""\nTarget Setpoint,${targetTemp},"°F"\nOutdoor Design Temp,${outdoorTemp},"°F"\nTemperature Difference,${output.temperatureDifferenceDeltaT},"°F"\nConductive Wall & Ceiling Loss,${output.conductiveLossBtu},"BTU/hr"\nSlab Edge Perimeter Loss,${output.slabEdgeLossBtu},"BTU/hr"\nOverhead Door Loss,${output.overheadDoorLossBtu},"BTU/hr"\nAir Infiltration Drafts,${output.infiltrationLossBtu},"BTU/hr"\n\nTOTAL PEAK HEAT LOSS,${output.totalPeakHeatLossBtu},"BTU/hr"\nRECOMMENDED GAS UNIT HEATER,${output.recommendedGasHeaterBtu},"BTU/hr"\nRECOMMENDED ELECTRIC HEATER,${output.recommendedElectricHeaterKw},"kW"\n240V ELECTRIC CURRENT,${output.recommendedElectricAmps240V},"Amps"\nRECOMMENDED 240V BREAKER,${output.recommendedCircuitBreakerAmps},"Amps"\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `garage-heater-${output.floorAreaSqFt}sqft.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Garage Space Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Garage Scenarios:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(PRESETS[0])}
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
            title="Reset to 2-Car Attached Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePresetSelect(p)}
            className={`preset-chip-btn ${preset === p.preset && insulation === p.insulation ? "active" : ""}`}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          {/* PRESET & CEILING HEIGHT */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="preset-select">
                <span>Garage Dimensions</span>
                <span className="unit-label">Layout</span>
              </label>
              <select
                id="preset-select"
                value={preset}
                onChange={(e) => {
                  const val = e.target.value as GaragePreset;
                  setPreset(val);
                  updateParam("preset", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="1_car">1-Car (12&apos; &times; 22&apos; = 264 sq ft)</option>
                <option value="2_car">2-Car (22&apos; &times; 24&apos; = 528 sq ft)</option>
                <option value="2_5_car">2.5-Car (24&apos; &times; 26&apos; = 624 sq ft)</option>
                <option value="3_car">3-Car (24&apos; &times; 32&apos; = 768 sq ft)</option>
                <option value="pole_barn_shop">Shop / Barn (30&apos; &times; 40&apos; = 1,200 sq ft)</option>
                <option value="custom">Custom Dimensions...</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="height-input">
                <span>Ceiling Height</span>
                <span className="unit-label">Feet</span>
              </label>
              <input
                id="height-input"
                type="number"
                min={8}
                max={20}
                value={ceilingHeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCeilingHeight(val);
                  updateParam("height", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* CUSTOM DIMENSIONS IF APPLICABLE */}
          {preset === "custom" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-w">Width (Feet)</label>
                <input
                  id="custom-w"
                  type="number"
                  min={10}
                  max={100}
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="input-number"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-l">Length (Feet)</label>
                <input
                  id="custom-l"
                  type="number"
                  min={10}
                  max={150}
                  value={customLength}
                  onChange={(e) => setCustomLength(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            </div>
          )}

          {/* ATTACHED & INSULATION LEVEL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="attached-select">
                <span>Building Attachment</span>
                <span className="unit-label">Wall</span>
              </label>
              <select
                id="attached-select"
                value={isAttached ? "yes" : "no"}
                onChange={(e) => setIsAttached(e.target.value === "yes")}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="yes">Attached (1 Warm Wall)</option>
                <option value="no">Detached (4 Cold Walls)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="insulation-select">
                <span>Insulation Level</span>
                <span className="unit-label">Quality</span>
              </label>
              <select
                id="insulation-select"
                value={insulation}
                onChange={(e) => setInsulation(e.target.value as GarageInsulationTier)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="uninsulated">Uninsulated (R-0 / Metal Door)</option>
                <option value="poor">Poor (R-7 Wall / Uninsulated)</option>
                <option value="average">Average (R-13 Wall / Insul Door)</option>
                <option value="insulated_good">Good (R-19 Wall / R-38 Ceil)</option>
              </select>
            </div>
          </div>

          {/* TEMPERATURE CONTROLS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="target-temp-select">
                <span>Target Thermostat</span>
                <span className="unit-label">&deg;F Setpoint</span>
              </label>
              <select
                id="target-temp-select"
                value={targetTemp}
                onChange={(e) => setTargetTemp(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={50}>50&deg;F (Freeze Protection / Storage)</option>
                <option value={55}>55&deg;F (Light Utility Work)</option>
                <option value={60}>60&deg;F (Comfortable Workshop)</option>
                <option value={65}>65&deg;F (Active Living / Gym)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="outdoor-temp-input">
                <span>Outdoor Design Temp</span>
                <span className="unit-label">&deg;F (Winter)</span>
              </label>
              <input
                id="outdoor-temp-input"
                type="number"
                min={-30}
                max={40}
                value={outdoorTemp}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setOutdoorTemp(val);
                  updateParam("outTemp", val);
                }}
                className="input-number"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Garage Heater Calculation Result">
            <div className="result-label">Recommended Heating Capacity</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.recommendedGasHeaterBtu.toLocaleString()} BTU Gas / {output.recommendedElectricHeaterKw} kW
            </div>
            <div className="result-unit">
              Peak Thermal Demand: <strong>{output.totalPeakHeatLossBtu.toLocaleString()} BTU/hr</strong> (&Delta;T = {output.temperatureDifferenceDeltaT}&deg;F)
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
                  background: output.isRadiantRecommended ? "rgba(56, 189, 248, 0.12)" : "rgba(255, 107, 0, 0.12)",
                  color: output.isRadiantRecommended ? "var(--accent-cooling)" : "var(--accent-heating)",
                  border: "1px solid currentColor",
                }}
              >
                {output.isRadiantRecommended
                  ? "✓ High Ceiling (≥12ft): Radiant Tube Heater Also Recommended"
                  : "Forced-Air Unit Heater Recommended"}
              </span>
            </div>
          </div>

          {/* GARAGE HEATER SVG VISUALIZER */}
          <GarageHeaterVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Gas Unit Heater</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.recommendedGasHeaterBtu.toLocaleString()} BTU/hr
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Electric Unit Heater</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.recommendedElectricHeaterKw} kW ({output.recommendedElectricAmps240V}A)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">240V Circuit Breaker</div>
              <div className="item-value">{output.recommendedCircuitBreakerAmps}A 2-Pole</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Slab &amp; Door Loss</div>
              <div className="item-value">
                {(output.slabEdgeLossBtu + output.overheadDoorLossBtu).toLocaleString()} BTU/hr
              </div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/garage-heater-sizing"
            toolName="Garage & Workshop Heater Sizing Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Heating Equipment Sizing</div>
            <Link href="/calculators/heat-loss-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate Whole-Home Thermal Heat Loss &amp; Infiltration</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/furnace-size-calculator">
              <span>Compare Gas Unit Heaters vs High-Efficiency Furnaces</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Garage Heater"
        value={`${output.recommendedGasHeaterBtu.toLocaleString()} BTU`}
        unit={`(${output.recommendedElectricHeaterKw} kW)`}
      />
    </div>
  );
}
