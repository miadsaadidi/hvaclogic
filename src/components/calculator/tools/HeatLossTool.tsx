"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateBuildingHeatLoss,
  BuildingHeatLossInput,
  BuildingHeatLossOutput,
  WindowGlazingType,
  FoundationType,
  AirTightnessTier,
} from "@/lib/math/heat-loss";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { BuildingHeatLossVisualizer } from "@/components/calculator/visualizers/BuildingHeatLossVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  {
    label: "🏡 2020s Tight Home (R-25 / Low-E)",
    area: 2000,
    outdoorTemp: 10,
    wallR: 25,
    ceilingR: 49,
    glazing: "double_low_e" as WindowGlazingType,
    foundation: "conditioned_basement" as FoundationType,
    tightness: "tight_modern" as AirTightnessTier,
  },
  {
    label: "🏠 1990s Standard (R-13 / Double-Pane)",
    area: 2000,
    outdoorTemp: 10,
    wallR: 13,
    ceilingR: 30,
    glazing: "double_clear" as WindowGlazingType,
    foundation: "slab_on_grade" as FoundationType,
    tightness: "average_code" as AirTightnessTier,
  },
  {
    label: "🏚️ 1960s Ranch (R-8 / Single-Pane)",
    area: 1500,
    outdoorTemp: 10,
    wallR: 8,
    ceilingR: 19,
    glazing: "single_pane" as WindowGlazingType,
    foundation: "unconditioned_crawlspace" as FoundationType,
    tightness: "semi_leaky" as AirTightnessTier,
  },
  {
    label: "🏰 Pre-1940 Historic (Uninsulated)",
    area: 2500,
    outdoorTemp: 10,
    wallR: 4,
    ceilingR: 11,
    glazing: "single_pane" as WindowGlazingType,
    foundation: "unconditioned_crawlspace" as FoundationType,
    tightness: "very_leaky_historic" as AirTightnessTier,
  },
];

export function HeatLossTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [floorArea, setFloorArea] = useState<number>(2000);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);
  const [indoorTemp, setIndoorTemp] = useState<number>(70);
  const [outdoorTemp, setOutdoorTemp] = useState<number>(10);
  const [wallR, setWallR] = useState<number>(19);
  const [ceilingR, setCeilingR] = useState<number>(38);
  const [glazing, setGlazing] = useState<WindowGlazingType>("double_low_e");
  const [foundation, setFoundation] = useState<FoundationType>("slab_on_grade");
  const [tightness, setTightness] = useState<AirTightnessTier>("average_code");

  // Hydrate from URL
  useEffect(() => {
    const urlArea = Number(getParam("area", "2000"));
    const urlOutdoor = Number(getParam("outTemp", "10"));
    const urlWallR = Number(getParam("wallR", "19"));
    const urlCeilingR = Number(getParam("ceilR", "38"));

    if (!isNaN(urlArea) && urlArea >= 200) setFloorArea(urlArea);
    if (!isNaN(urlOutdoor)) setOutdoorTemp(urlOutdoor);
    if (!isNaN(urlWallR) && urlWallR >= 0) setWallR(urlWallR);
    if (!isNaN(urlCeilingR) && urlCeilingR >= 0) setCeilingR(urlCeilingR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setFloorArea(preset.area);
    setOutdoorTemp(preset.outdoorTemp);
    setWallR(preset.wallR);
    setCeilingR(preset.ceilingR);
    setGlazing(preset.glazing);
    setFoundation(preset.foundation);
    setTightness(preset.tightness);

    updateParam("area", preset.area);
    updateParam("outTemp", preset.outdoorTemp);
    updateParam("wallR", preset.wallR);
    updateParam("ceilR", preset.ceilingR);
  };

  // Perform Calculation
  const output: BuildingHeatLossOutput = useMemo(() => {
    const input: BuildingHeatLossInput = {
      floorAreaSqFt: floorArea,
      ceilingHeightFeet: ceilingHeight,
      indoorTempF: indoorTemp,
      outdoorDesignTempF: outdoorTemp,
      wallInsulationR: wallR,
      ceilingInsulationR: ceilingR,
      windowGlazing: glazing,
      foundation,
      airTightness: tightness,
    };
    return calculateBuildingHeatLoss(input);
  }, [floorArea, ceilingHeight, indoorTemp, outdoorTemp, wallR, ceilingR, glazing, foundation, tightness]);

  const handleExportCsv = () => {
    const headers = "Component,Heat Loss (BTU/hr),Percentage (%)\n";
    const rows = `Above-Grade Walls,${output.breakdown.wallsBtu},${output.breakdownPercentages.wallsPercent}%\nCeiling & Attic,${output.breakdown.ceilingBtu},${output.breakdownPercentages.ceilingPercent}%\nWindows & Glazing,${output.breakdown.windowsBtu},${output.breakdownPercentages.windowsPercent}%\nExterior Doors,${output.breakdown.doorsBtu},${output.breakdownPercentages.doorsPercent}%\nFoundation Slab/Basement,${output.breakdown.foundationBtu},${output.breakdownPercentages.foundationPercent}%\nAir Infiltration Leakage,${output.breakdown.infiltrationBtu},${output.breakdownPercentages.infiltrationPercent}%\n\nTOTAL PEAK HEAT LOSS,${output.totalHeatLossBtu} BTU/hr,100%\nPEAK POWER DEMAND,${output.totalHeatLossKw} kW,\nHEAT LOSS INTENSITY,${output.heatLossPerSqFtBtu} BTU/sq ft,\nRECOMMENDED FURNACE,${output.recommendedFurnaceBtu} BTU/hr,\nRECOMMENDED HEAT PUMP,${output.recommendedHeatPumpTons} Tons,\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `building-heat-loss-${floorArea}sqft-${outdoorTemp}F.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Building Vintage Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Building Vintages:</span>
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
            title="Reset to 2020s Tight Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${floorArea === preset.area && wallR === preset.wallR && glazing === preset.glazing ? "active" : ""}`}
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
          {/* FLOOR AREA & OUTDOOR DESIGN TEMP */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="floor-area-input">
                <span>Conditioned Area</span>
                <span className="unit-label">Sq Ft</span>
              </label>
              <input
                id="floor-area-input"
                type="number"
                min={300}
                max={10000}
                step={50}
                value={floorArea}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFloorArea(val);
                  updateParam("area", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="outdoor-temp-input">
                <span>Outdoor Design Temp</span>
                <span className="unit-label">&deg;F (99% Winter)</span>
              </label>
              <input
                id="outdoor-temp-input"
                type="number"
                min={-30}
                max={45}
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

          {/* WALL & CEILING INSULATION */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="wall-r-input">
                <span>Wall Insulation</span>
                <span className="unit-label">R-Value</span>
              </label>
              <input
                id="wall-r-input"
                type="number"
                min={0}
                max={45}
                value={wallR}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWallR(val);
                  updateParam("wallR", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="ceiling-r-input">
                <span>Ceiling Insulation</span>
                <span className="unit-label">R-Value</span>
              </label>
              <input
                id="ceiling-r-input"
                type="number"
                min={0}
                max={70}
                value={ceilingR}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCeilingR(val);
                  updateParam("ceilR", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* WINDOW GLAZING */}
          <div className="form-group">
            <label htmlFor="glazing-select">
              <span>Window Glazing &amp; Efficiency</span>
              <span className="unit-label">U-Factor</span>
            </label>
            <select
              id="glazing-select"
              value={glazing}
              onChange={(e) => setGlazing(e.target.value as WindowGlazingType)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="single_pane">Single-Pane Clear Glass (U-1.10)</option>
              <option value="double_clear">Double-Pane Clear Glass (U-0.50)</option>
              <option value="double_low_e">Double-Pane Low-E Argon (U-0.28)</option>
              <option value="triple_pane">Triple-Pane High Performance (U-0.18)</option>
            </select>
          </div>

          {/* AIR TIGHTNESS & FOUNDATION */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="tightness-select">
                <span>Air Infiltration</span>
                <span className="unit-label">Leakage</span>
              </label>
              <select
                id="tightness-select"
                value={tightness}
                onChange={(e) => setTightness(e.target.value as AirTightnessTier)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="tight_modern">Tight Modern (&lt;3 ACH50)</option>
                <option value="average_code">Standard Code (3–5 ACH50)</option>
                <option value="semi_leaky">Semi-Leaky (6–8 ACH50)</option>
                <option value="very_leaky_historic">Historic Leaky (&gt;10 ACH50)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="foundation-select">
                <span>Foundation Type</span>
                <span className="unit-label">Subgrade</span>
              </label>
              <select
                id="foundation-select"
                value={foundation}
                onChange={(e) => setFoundation(e.target.value as FoundationType)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="slab_on_grade">Slab-on-Grade</option>
                <option value="conditioned_basement">Conditioned Basement</option>
                <option value="unconditioned_crawlspace">Crawlspace</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Building Heat Loss Result">
            <div className="result-label">Peak Whole-Building Heat Loss</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.totalHeatLossBtu.toLocaleString()} BTU/hr
            </div>
            <div className="result-unit">
              Power Demand: <strong>{output.totalHeatLossKw} kW</strong> &bull; &Delta;T = {output.temperatureDifferenceDeltaT}&deg;F
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
                  background: "rgba(255, 107, 0, 0.12)",
                  color: "var(--accent-heating)",
                  border: "1px solid currentColor",
                }}
              >
                {output.heatLossPerSqFtBtu} BTU/sq ft Specific Loss
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual J® (8th Ed)", "ASHRAE Standard 90.1", "ASHRAE Standard 90.2"]} />

          {/* BUILDING HEAT LOSS SVG VISUALIZER */}
          <BuildingHeatLossVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Air Infiltration</div>
              <div className="item-value" style={{ color: "#f43f5e" }}>
                {output.infiltrationCfm} CFM ({output.breakdownPercentages.infiltrationPercent}%)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Wall &amp; Window Loss</div>
              <div className="item-value">
                {(output.breakdown.wallsBtu + output.breakdown.windowsBtu).toLocaleString()} BTU/hr
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Recommended Furnace</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.recommendedFurnaceBtu.toLocaleString()} BTU
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Heat Pump Tonnage</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.recommendedHeatPumpTons} Tons
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/heat-loss-calculator"
            toolName="Building Heat Loss & Infiltration Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Heating Equipment Sizing</div>
            <Link href="/calculators/furnace-size-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Size 80% vs 96% AFUE Gas Furnace for {output.totalHeatLossBtu.toLocaleString()} BTU Heat Loss</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-pump-size-calculator">
              <span>Find Cold-Climate Heat Pump Thermal Balance Point</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Total Heat Loss"
        value={`${output.totalHeatLossBtu.toLocaleString()} BTU`}
        unit={`(${output.totalHeatLossKw} kW)`}
      />
    </div>
  );
}
