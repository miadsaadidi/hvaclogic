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
  FOUNDATION_F_FACTORS,
} from "@/lib/math/heat-loss";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { BuildingHeatLossVisualizer } from "@/components/calculator/visualizers/BuildingHeatLossVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";

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
  const [isManualTemp, setIsManualTemp] = useState<boolean>(false);
  const [wallMode, setWallMode] = useState<"nominal_r" | "effective_u">("nominal_r");
  const [wallR, setWallR] = useState<number>(19);
  const [customWallU, setCustomWallU] = useState<number>(0.052);
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
    const urlWallMode = getParam("wallMode", "");
    const urlWallU = Number(getParam("wallU", ""));

    if (!isNaN(urlArea) && urlArea >= 200) setFloorArea(urlArea);
    if (!isNaN(urlOutdoor)) {
      setOutdoorTemp(urlOutdoor);
      setIsManualTemp(true);
    }
    if (!isNaN(urlWallR) && urlWallR >= 0) setWallR(urlWallR);
    if (!isNaN(urlCeilingR) && urlCeilingR >= 0) setCeilingR(urlCeilingR);

    if (urlWallMode === "effective_u" || (!isNaN(urlWallU) && urlWallU > 0)) {
      setWallMode("effective_u");
      if (!isNaN(urlWallU) && urlWallU > 0) {
        setCustomWallU(urlWallU);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setFloorArea(preset.area);
    setOutdoorTemp(preset.outdoorTemp);
    setIsManualTemp(false);
    setWallMode("nominal_r");
    setWallR(preset.wallR);
    setCeilingR(preset.ceilingR);
    setGlazing(preset.glazing);
    setFoundation(preset.foundation);
    setTightness(preset.tightness);

    updateParam("area", preset.area);
    updateParam("outTemp", preset.outdoorTemp);
    updateParam("wallMode", "nominal_r");
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
      wallAssemblyMode: wallMode,
      customWallUFactor: customWallU,
      ceilingInsulationR: ceilingR,
      windowGlazing: glazing,
      foundation,
      airTightness: tightness,
    };
    return calculateBuildingHeatLoss(input);
  }, [floorArea, ceilingHeight, indoorTemp, outdoorTemp, wallMode, wallR, customWallU, ceilingR, glazing, foundation, tightness]);

  const handleExportCsv = () => {
    const headers = "Component,Heat Loss (BTU/hr),Percentage (%)\n";
    const rows = `Above-Grade Walls (${output.netWallAreaSqFt} sq ft @ U-${output.wallUFactor.toFixed(4)}),${output.breakdown.wallsBtu},${output.breakdownPercentages.wallsPercent}%\nCeiling & Attic (${output.ceilingAreaSqFt} sq ft @ U-${output.ceilingUFactor.toFixed(4)}),${output.breakdown.ceilingBtu},${output.breakdownPercentages.ceilingPercent}%\nWindows & Glazing (${output.windowAreaSqFt} sq ft @ U-${output.windowUFactor}),${output.breakdown.windowsBtu},${output.breakdownPercentages.windowsPercent}%\nExterior Doors (${output.doorAreaSqFt} sq ft @ U-${output.doorUFactor}),${output.breakdown.doorsBtu},${output.breakdownPercentages.doorsPercent}%\nFoundation (${output.perimeterFeet} ft perimeter @ F-${output.foundationFFactor}),${output.breakdown.foundationBtu},${output.breakdownPercentages.foundationPercent}%\nAir Infiltration (${output.infiltrationCfm} CFM @ ${output.naturalAch} ACHnat),${output.breakdown.infiltrationBtu},${output.breakdownPercentages.infiltrationPercent}%\n\nWALL MODE,${output.wallAssemblyMode === "effective_u" ? "Assembly U-Factor (Bridging Adjusted)" : "Nominal Cavity R"},\nINDOOR DESIGN TEMP,${indoorTemp}°F,\nOUTDOOR DESIGN TEMP,${outdoorTemp}°F,\nDESIGN DELTA T,${output.temperatureDifferenceDeltaT}°F,\nTOTAL PRELIMINARY HEAT LOSS,${output.totalHeatLossBtu} BTU/hr,100%\nTOTAL POWER DEMAND,${output.totalHeatLossKw} kW,\nHEAT LOSS INTENSITY,${output.heatLossPerSqFtBtu} BTU/sq ft·hr,\n`;
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
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Representative Building Vintages:</span>
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
          <AshraeClimateSelector
            compact={true}
            onSelectLocation={(loc) => {
              setOutdoorTemp(loc.winterDb99);
              setIsManualTemp(false);
              updateParam("outTemp", loc.winterDb99);
              updateParam("loc", loc.id);
            }}
          />
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
                <span className="unit-label">{isManualTemp ? "Manual Override" : "99% Winter"}</span>
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
                  setIsManualTemp(true);
                  updateParam("outTemp", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* WALL CONDUCTION MODE TOGGLE */}
          <div style={{ marginBottom: "0.75rem", background: "var(--surface-subtle)", padding: "0.55rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Wall Conduction Model
              </span>
              <Link
                href="/calculators/effective-r-value-calculator"
                style={{ fontSize: "0.73rem", color: "var(--accent-cooling)", textDecoration: "underline", fontWeight: 600 }}
              >
                Thermal Bridging Tool ↗
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "0.4rem" }}>
              <button
                type="button"
                onClick={() => {
                  setWallMode("nominal_r");
                  updateParam("wallMode", "nominal_r");
                }}
                className={`preset-chip-btn ${wallMode === "nominal_r" ? "active" : ""}`}
                style={{ margin: 0, padding: "0.35rem 0.5rem", fontSize: "0.75rem", textAlign: "center", width: "100%" }}
              >
                Nominal Cavity R
              </button>
              <button
                type="button"
                onClick={() => {
                  setWallMode("effective_u");
                  updateParam("wallMode", "effective_u");
                  updateParam("wallU", customWallU);
                }}
                className={`preset-chip-btn ${wallMode === "effective_u" ? "active" : ""}`}
                style={{ margin: 0, padding: "0.35rem 0.5rem", fontSize: "0.75rem", textAlign: "center", width: "100%" }}
              >
                Assembly U-Factor (Bridging Adjusted)
              </button>
            </div>
          </div>

          {/* WALL & CEILING INSULATION */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            {wallMode === "nominal_r" ? (
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="wall-r-input">
                  <span>Wall Cavity R</span>
                  <span className="unit-label">Nominal</span>
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
            ) : (
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-wall-u-input">
                  <span>Assembly U-Factor</span>
                  <span className="unit-label">BTU/hr·ft²·°F</span>
                </label>
                <input
                  id="custom-wall-u-input"
                  type="number"
                  min={0.015}
                  max={0.35}
                  step={0.001}
                  value={customWallU}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomWallU(val);
                    updateParam("wallU", val);
                  }}
                  className="input-number"
                />
                <span style={{ fontSize: "0.68rem", color: "var(--ink-secondary)", display: "block", marginTop: "0.2rem" }}>
                  Effective R-{(1 / Math.max(0.01, customWallU)).toFixed(1)}
                </span>
              </div>
            )}

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="ceiling-r-input">
                <span>Ceiling Insulation</span>
                <span className="unit-label">Nominal R</span>
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
                <span>Air Infiltration Tier</span>
                <span className="unit-label">ACH50 / ACHnat</span>
              </label>
              <select
                id="tightness-select"
                value={tightness}
                onChange={(e) => setTightness(e.target.value as AirTightnessTier)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="tight_modern">Tight Modern (&lt;3 ACH50, ~0.20 ACHnat)</option>
                <option value="average_code">Standard Code (3–5 ACH50, ~0.38 ACHnat)</option>
                <option value="semi_leaky">Semi-Leaky (6–8 ACH50, ~0.65 ACHnat)</option>
                <option value="very_leaky_historic">Historic Leaky (&gt;10 ACH50, ~1.10 ACHnat)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="foundation-select">
                <span>Foundation Model</span>
                <span className="unit-label">F-Factor</span>
              </label>
              <select
                id="foundation-select"
                value={foundation}
                onChange={(e) => setFoundation(e.target.value as FoundationType)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="slab_on_grade">Slab-on-Grade (F-0.50)</option>
                <option value="conditioned_basement">Conditioned Basement (F-0.25)</option>
                <option value="unconditioned_crawlspace">Crawlspace (F-0.35)</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Building Heat Loss Result">
            <div className="result-label">Preliminary Peak Building Heat Loss</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.totalHeatLossBtu.toLocaleString()} BTU/hr
            </div>
            <div className="result-unit">
              Power Demand: <strong>{output.totalHeatLossKw} kW</strong> &bull; &Delta;T = {output.temperatureDifferenceDeltaT}&deg;F ({indoorTemp}&deg;F in / {outdoorTemp}&deg;F out)
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
                {output.heatLossPerSqFtBtu} BTU/sq ft·hr Specific Thermal Intensity
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASHRAE Handbook of Fundamentals", "ACCA Manual J Reference Physics"]} />

          {/* BUILDING HEAT LOSS SVG VISUALIZER */}
          <BuildingHeatLossVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Air Infiltration Loss</div>
              <div className="item-value" style={{ color: "#f43f5e" }}>
                {output.breakdown.infiltrationBtu.toLocaleString()} BTU/hr ({output.breakdownPercentages.infiltrationPercent}%)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Envelope Conduction</div>
              <div className="item-value">
                {(output.totalHeatLossBtu - output.breakdown.infiltrationBtu).toLocaleString()} BTU/hr ({100 - output.breakdownPercentages.infiltrationPercent}%)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Estimated Infiltration Airflow</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.infiltrationCfm} CFM ({output.naturalAch} ACHnat)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Foundation / Slab Conduction</div>
              <div className="item-value">
                {output.breakdown.foundationBtu.toLocaleString()} BTU/hr (F-{output.foundationFFactor})
              </div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/heat-loss-calculator"
            toolName="Building Heat Loss & Infiltration Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* WORKFLOW HANDOFFS */}
          <div className="handoff-card">
            <div className="handoff-title">Next Steps: Detailed Load Calculation &amp; Equipment Selection</div>
            <Link href="/calculators/effective-r-value-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Derive Exact Wall Assembly U-Factor with Stud Thermal Bridging</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/btu-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Whole-House Room-by-Room Heating &amp; Cooling Load Screening</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/furnace-size-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Size Replacement Gas Furnace for {output.totalHeatLossBtu.toLocaleString()} BTU Heat Loss</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-pump-size-calculator">
              <span>Find Cold-Climate Heat Pump Balance Point &amp; Backup Deficit</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Preliminary Heat Loss"
        value={`${output.totalHeatLossBtu.toLocaleString()} BTU/hr`}
        unit={`(${output.totalHeatLossKw} kW)`}
      />
    </div>
  );
}
