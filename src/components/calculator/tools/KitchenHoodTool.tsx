"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateKitchenHoodCfm,
  CooktopType,
  HoodMountingType,
  KitchenHoodOutput,
} from "@/lib/math/kitchen-hood";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { KitchenHoodVisualizer } from "@/components/calculator/visualizers/KitchenHoodVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

const KITCHEN_PRESETS = [
  { label: "🍳 30\" Standard Gas", type: "gas" as CooktopType, width: 30, btu: 45000, mounting: "wall" as HoodMountingType, ductLen: 10, elbows: 1 },
  { label: "🔥 36\" Pro Gas Range", type: "gas" as CooktopType, width: 36, btu: 60000, mounting: "wall" as HoodMountingType, ductLen: 15, elbows: 2 },
  { label: "🏝️ 36\" Center Island", type: "gas" as CooktopType, width: 36, btu: 60000, mounting: "island" as HoodMountingType, ductLen: 20, elbows: 2 },
  { label: "⚡ 30\" Induction / Electric", type: "induction" as CooktopType, width: 30, btu: 0, mounting: "wall" as HoodMountingType, ductLen: 8, elbows: 1 },
];

export function KitchenHoodTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [cooktopType, setCooktopType] = useState<CooktopType>("gas");
  const [cooktopWidth, setCooktopWidth] = useState<number>(30);
  const [gasBtu, setGasBtu] = useState<number>(45000);
  const [mountingType, setMountingType] = useState<HoodMountingType>("wall");
  const [ductLength, setDuctLength] = useState<number>(10);
  const [elbows90, setElbows90] = useState<number>(1);

  // Hydrate from URL
  useEffect(() => {
    const urlType = getParam("type", "gas") as CooktopType;
    const urlWidth = Number(getParam("width", "30"));
    const urlBtu = Number(getParam("btu", "45000"));
    const urlMount = getParam("mount", "wall") as HoodMountingType;
    const urlDuct = Number(getParam("duct", "10"));

    if (["gas", "electric", "induction"].includes(urlType)) setCooktopType(urlType);
    if (!isNaN(urlWidth) && urlWidth > 0) setCooktopWidth(urlWidth);
    if (!isNaN(urlBtu) && urlBtu > 0) setGasBtu(urlBtu);
    if (["wall", "island", "under_cabinet"].includes(urlMount)) setMountingType(urlMount);
    if (!isNaN(urlDuct) && urlDuct >= 0) setDuctLength(urlDuct);
  }, [getParam]);

  const handlePresetSelect = (preset: typeof KITCHEN_PRESETS[0]) => {
    setCooktopType(preset.type);
    setCooktopWidth(preset.width);
    setGasBtu(preset.btu);
    setMountingType(preset.mounting);
    setDuctLength(preset.ductLen);
    setElbows90(preset.elbows);

    updateParam("type", preset.type);
    updateParam("width", preset.width);
    updateParam("btu", preset.btu);
    updateParam("mount", preset.mounting);
    updateParam("duct", preset.ductLen);
  };

  // Perform Calculation
  const output: KitchenHoodOutput = useMemo(() => {
    return calculateKitchenHoodCfm({
      cooktopType,
      cooktopWidthInches: cooktopWidth,
      gasTotalBtu: cooktopType === "gas" ? gasBtu : undefined,
      mountingType,
      ductRunLengthFeet: ductLength,
      elbowCount90: elbows90,
    });
  }, [cooktopType, cooktopWidth, gasBtu, mountingType, ductLength, elbows90]);

  const handleExportCsv = () => {
    const headers = "Cooktop Type,Width (Inches),Gas BTU,Mounting,Recommended CFM,Duct Diameter,Canopy Width,Make-Up Air Required (IRC M1503.6)\n";
    const row = `"${cooktopType}",${cooktopWidth},${cooktopType === "gas" ? gasBtu : "N/A"},"${mountingType}",${output.recommendedCfm},"${output.recommendedDuctDiameterInches}\"",${output.recommendedHoodWidthInches},"${output.isMakeUpAirRequired ? "YES (>400 CFM)" : "NO"}"\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kitchen-hood-${output.recommendedCfm}cfm-sizing.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Kitchen Sizing Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Cooktop Profiles:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(KITCHEN_PRESETS[0])}
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
            title="Reset to 30-inch Gas Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {KITCHEN_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${cooktopType === preset.type && cooktopWidth === preset.width && mountingType === preset.mounting ? "active" : ""}`}
            type="button"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          {/* COOKTOP TYPE & MOUNTING */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="cooktop-type-select">
                <span>Cooktop Fuel</span>
                <span className="unit-label">Type</span>
              </label>
              <select
                id="cooktop-type-select"
                value={cooktopType}
                onChange={(e) => {
                  const val = e.target.value as CooktopType;
                  setCooktopType(val);
                  updateParam("type", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="gas">🔥 Gas Burners</option>
                <option value="induction">⚡ Induction</option>
                <option value="electric">⚡ Electric Radiant</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mounting-select">
                <span>Mounting Style</span>
                <span className="unit-label">Location</span>
              </label>
              <select
                id="mounting-select"
                value={mountingType}
                onChange={(e) => {
                  const val = e.target.value as HoodMountingType;
                  setMountingType(val);
                  updateParam("mount", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="wall">Wall Mount (Standard)</option>
                <option value="under_cabinet">Under Cabinet</option>
                <option value="island">Island Mount (1.30× Penalty)</option>
              </select>
            </div>
          </div>

          {/* COOKTOP WIDTH */}
          <div className="form-group">
            <label htmlFor="width-select">
              <span>Cooktop Width</span>
              <span className="unit-label">Inches</span>
            </label>
            <select
              id="width-select"
              value={cooktopWidth}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCooktopWidth(val);
                updateParam("width", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={24}>24 Inches (Compact / Apartment)</option>
              <option value={30}>30 Inches (Standard Residential)</option>
              <option value={36}>36 Inches (Pro-Style 5–6 Burners)</option>
              <option value={42}>42 Inches (Large Pro-Style)</option>
              <option value={48}>48 Inches (Commercial Double Oven Range)</option>
              <option value={60}>60 Inches (Custom Estate Range)</option>
            </select>
          </div>

          {/* TOTAL GAS BTU (IF GAS) */}
          {cooktopType === "gas" && (
            <div className="form-group">
              <label htmlFor="gas-btu-input">
                <span>Total Gas Burner Rating</span>
                <span className="unit-label">BTU / hr</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="gas-btu-input"
                  type="number"
                  min={20000}
                  max={150000}
                  step={5000}
                  value={gasBtu}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setGasBtu(val);
                    updateParam("btu", val);
                  }}
                  className="input-number"
                />
                <input
                  type="range"
                  min={20000}
                  max={120000}
                  step={5000}
                  value={Math.min(120000, gasBtu)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setGasBtu(val);
                    updateParam("btu", val);
                  }}
                  className="input-range"
                  aria-label="Gas BTU slider"
                />
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                HVI Rule: <strong>100 CFM per 10,000 BTU</strong> of total burner output.
              </span>
            </div>
          )}

          {/* DUCT RUN LENGTH & ELBOWS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="duct-length-input">
                <span>Straight Duct Run</span>
                <span className="unit-label">Feet</span>
              </label>
              <input
                id="duct-length-input"
                type="number"
                min={2}
                max={50}
                value={ductLength}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDuctLength(val);
                  updateParam("duct", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="elbow-select">
                <span>90&deg; Elbows</span>
                <span className="unit-label">Turns</span>
              </label>
              <select
                id="elbow-select"
                value={elbows90}
                onChange={(e) => setElbows90(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={0}>0 (Straight Up Roof)</option>
                <option value={1}>1 (Through Wall / Roof)</option>
                <option value={2}>2 (Standard Attic Offset)</option>
                <option value={3}>3 (Complex Run)</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Kitchen Range Hood Sizing Result">
            <div className="result-label">Recommended Exhaust Airflow</div>
            <div className="result-value">
              {output.recommendedCfm} CFM
            </div>
            <div className="result-unit">
              Minimum rated blower capacity (HVI &amp; ASHRAE 62.2)
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
                  background: output.isMakeUpAirRequired ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                  color: output.isMakeUpAirRequired ? "var(--accent-danger)" : "var(--accent-success)",
                  border: "1px solid currentColor",
                }}
              >
                {output.isMakeUpAirRequired ? "⚠️ IRC M1503.6 Make-Up Air Damper Required" : "✓ IRC Code Compliant (≤400 CFM)"}
              </span>
            </div>
          </div>

          {/* KITCHEN HOOD SVG VISUALIZER */}
          <KitchenHoodVisualizer output={output} cooktopType={cooktopType} mountingType={mountingType} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Round Duct Diameter</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                &Oslash; {output.recommendedDuctDiameterInches}&quot; Rigid Metal
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Recommended Canopy Width</div>
              <div className="item-value">{output.recommendedHoodWidthInches}&quot; Width</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Equivalent Duct Length</div>
              <div className="item-value">{output.ductEquivalentLengthFeet} Eq. Feet</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Make-Up Air Flow Rate</div>
              <div className="item-value" style={{ color: output.isMakeUpAirRequired ? "var(--accent-danger)" : "var(--ink)" }}>
                {output.isMakeUpAirRequired ? `${output.makeUpAirCfmRequired} CFM` : "Exempt (≤400)"}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/kitchen-hood-cfm"
            toolName="Kitchen Range Hood CFM & Make-Up Air Sizer"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Exhaust Ventilation Design</div>
            <Link href={`/calculators/ductulator?cfm=${output.recommendedCfm}&diameter=${output.recommendedDuctDiameterInches}`} style={{ marginBottom: "0.5rem" }}>
              <span>Verify Range Hood Duct Friction Drop in Ductulator ({output.recommendedCfm} CFM)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/cfm-calculator">
              <span>Calculate Whole-Home Fresh Air Ventilation Rates</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Recommended Hood"
        value={`${output.recommendedCfm} CFM`}
        unit={`(Ø ${output.recommendedDuctDiameterInches}" Duct)`}
      />
    </div>
  );
}
