"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateFurnaceBtu,
  HeatingClimateZone,
  CLIMATE_ZONE_BTU_FACTORS,
  InsulationGrade,
  INSULATION_FACTORS,
  SunExposure,
  FurnaceBtuOutput,
} from "@/lib/math/furnace-btu";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { FurnaceFlameVisualizer } from "@/components/calculator/visualizers/FurnaceFlameVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";

const FURNACE_PRESETS = [
  { label: "🏡 1,500 sq ft (Mid-Atlantic Zone 3)", sqft: 1500, zone: 3 as HeatingClimateZone, ceiling: 8, insulation: "average" as InsulationGrade, afue: 96 },
  { label: "🏠 2,000 sq ft (Midwest Zone 4)", sqft: 2000, zone: 4 as HeatingClimateZone, ceiling: 8, insulation: "average" as InsulationGrade, afue: 96 },
  { label: "🏰 2,800 sq ft (Northeast Zone 4)", sqft: 2800, zone: 4 as HeatingClimateZone, ceiling: 9, insulation: "good" as InsulationGrade, afue: 96 },
  { label: "❄️ 1,800 sq ft (Sub-Zero Zone 5)", sqft: 1800, zone: 5 as HeatingClimateZone, ceiling: 8, insulation: "good" as InsulationGrade, afue: 98 },
];

export function FurnaceBtuTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [sqft, setSqft] = useState<number>(2000);
  const [climateZone, setClimateZone] = useState<HeatingClimateZone>(4);
  const [ceilingHeight, setCeilingHeight] = useState<number>(8);
  const [insulation, setInsulation] = useState<InsulationGrade>("average");
  const [sunExposure, setSunExposure] = useState<SunExposure>("average");
  const [afue, setAfue] = useState<number>(96);
  const [tempRise, setTempRise] = useState<number>(45);

  // Hydrate from URL
  useEffect(() => {
    const urlSqft = Number(getParam("sqft", "2000"));
    const urlZone = Number(getParam("zone", "4")) as HeatingClimateZone;
    const urlCeiling = Number(getParam("ceiling", "8"));
    const urlAfue = Number(getParam("afue", "96"));

    if (!isNaN(urlSqft) && urlSqft > 0) setSqft(urlSqft);
    if ([1, 2, 3, 4, 5].includes(urlZone)) setClimateZone(urlZone);
    if (!isNaN(urlCeiling) && urlCeiling >= 7) setCeilingHeight(urlCeiling);
    if (!isNaN(urlAfue) && urlAfue >= 78) setAfue(urlAfue);
  }, [getParam]);

  const handlePresetSelect = (preset: typeof FURNACE_PRESETS[0]) => {
    setSqft(preset.sqft);
    setClimateZone(preset.zone);
    setCeilingHeight(preset.ceiling);
    setInsulation(preset.insulation);
    setAfue(preset.afue);

    updateParam("sqft", preset.sqft);
    updateParam("zone", preset.zone);
    updateParam("ceiling", preset.ceiling);
    updateParam("afue", preset.afue);
  };

  // Perform Calculation
  const output: FurnaceBtuOutput = useMemo(() => {
    return calculateFurnaceBtu({
      floorAreaSqFt: sqft,
      climateZone,
      ceilingHeightFeet: ceilingHeight,
      insulationGrade: insulation,
      sunExposure,
      afueRatingPercent: afue,
      temperatureRiseF: tempRise,
    });
  }, [sqft, climateZone, ceilingHeight, insulation, sunExposure, afue, tempRise]);

  const handleExportCsv = () => {
    const headers = "Square Footage,Climate Zone,AFUE %,Input BTU,Output BTU,Nominal Model BTU,Cabinet Width,Heating CFM\n";
    const row = `${output.floorAreaSqFt},${climateZone},${output.afueRatingPercent},${output.requiredInputBtu},${output.requiredOutputBtu},${output.nominalFurnaceModelBtu},"${output.recommendedCabinetWidth}",${output.requiredHeatingCfm}\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `furnace-sizing-${output.nominalFurnaceModelBtu / 1000}k-btu.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* QUICK PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Popular Home Furnace Sizing Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Home Profiles:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(FURNACE_PRESETS[1])}
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
            title="Reset to 2,000 sq ft Zone 4 default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {FURNACE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${sqft === preset.sqft && climateZone === preset.zone ? "active" : ""}`}
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
              let mappedZone: HeatingClimateZone = 3;
              if (loc.winterDb99 <= -10) mappedZone = 5;
              else if (loc.winterDb99 <= 5) mappedZone = 4;
              else if (loc.winterDb99 <= 20) mappedZone = 3;
              else if (loc.winterDb99 <= 35) mappedZone = 2;
              else mappedZone = 1;

              setClimateZone(mappedZone);
              updateParam("zone", mappedZone);
              updateParam("loc", loc.id);
            }}
          />
          {/* SQUARE FOOTAGE */}
          <div className="form-group">
            <label htmlFor="sqft-input">
              <span>Heated Living Space</span>
              <span className="unit-label">Square Feet</span>
            </label>
            <div className="input-with-slider">
              <input
                id="sqft-input"
                type="number"
                min={500}
                max={6000}
                step={50}
                value={sqft}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSqft(val);
                  updateParam("sqft", val);
                }}
                className="input-number"
              />
              <input
                type="range"
                min={500}
                max={5000}
                step={50}
                value={Math.min(5000, sqft)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSqft(val);
                  updateParam("sqft", val);
                }}
                className="input-range"
                aria-label="Floor area square footage slider"
              />
            </div>
          </div>

          {/* CLIMATE ZONE SELECTOR */}
          <div className="form-group">
            <label htmlFor="zone-select">
              <span>Geographic Heating Zone</span>
              <span className="unit-label">Climate Severity</span>
            </label>
            <select
              id="zone-select"
              value={climateZone}
              onChange={(e) => {
                const val = Number(e.target.value) as HeatingClimateZone;
                setClimateZone(val);
                updateParam("zone", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              {([1, 2, 3, 4, 5] as HeatingClimateZone[]).map((z) => (
                <option key={z} value={z}>
                  {CLIMATE_ZONE_BTU_FACTORS[z].label} ({CLIMATE_ZONE_BTU_FACTORS[z].btuPerSqFt} BTU/sqft)
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Winter Outdoor Design Temp: <strong>{CLIMATE_ZONE_BTU_FACTORS[climateZone].outdoorDesignTemp}</strong>
            </span>
          </div>

          {/* AFUE EFFICIENCY SELECTOR */}
          <div className="form-group">
            <label htmlFor="afue-select">
              <span>Furnace AFUE Efficiency</span>
              <span className="unit-label">Gas Tier</span>
            </label>
            <select
              id="afue-select"
              value={afue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAfue(val);
                updateParam("afue", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={80}>80% AFUE (Standard Non-Condensing, Metal Chimney)</option>
              <option value={92}>92% AFUE (Condensing Single-Stage)</option>
              <option value={96}>96% AFUE (Energy Star Condensing Two-Stage - Recommended)</option>
              <option value={98}>98% AFUE (High-Efficiency Modulating Inverter)</option>
            </select>
          </div>

          {/* CEILING HEIGHT & INSULATION */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="ceiling-select">
                <span>Ceiling</span>
                <span className="unit-label">Height</span>
              </label>
              <select
                id="ceiling-select"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={8}>8 Feet (Standard)</option>
                <option value={9}>9 Feet (1.12x)</option>
                <option value={10}>10 Feet (1.25x)</option>
                <option value={12}>12 Feet (1.50x)</option>
                <option value={14}>14 Feet (1.75x)</option>
                <option value={18}>18 Feet Cathedral (2.25x)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="insulation-select">
                <span>Insulation</span>
                <span className="unit-label">Quality</span>
              </label>
              <select
                id="insulation-select"
                value={insulation}
                onChange={(e) => setInsulation(e.target.value as InsulationGrade)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                {(["poor", "average", "good", "spray_foam"] as InsulationGrade[]).map((k) => (
                  <option key={k} value={k}>
                    {INSULATION_FACTORS[k].label.split(" (")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Recommended Furnace Sizing Result">
            <div className="result-label">Recommended Nominal Furnace Rating</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.nominalFurnaceModelBtu.toLocaleString()} BTU/hr
            </div>
            <div className="result-unit">
              Standard <strong>{output.nominalFurnaceModelBtu / 1000}k BTU Input</strong> ({output.afueRatingPercent}% AFUE)
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
                  background: "rgba(255, 107, 74, 0.12)",
                  color: "var(--accent-heating)",
                  border: "1px solid rgba(255, 107, 74, 0.3)",
                }}
              >
                Delivers {output.requiredOutputBtu.toLocaleString()} BTU/hr Output Heat into Living Space
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual S®", "DOE 10 CFR 430", "AHRI Ratings"]} />

          {/* COMBUSTION FLAME VISUALIZER */}
          <FurnaceFlameVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Net Heat Loss (Output)</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.requiredOutputBtu.toLocaleString()} BTU
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Blower Airflow CFM</div>
              <div className="item-value">{output.requiredHeatingCfm} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Cabinet Chassis Width</div>
              <div className="item-value" style={{ fontSize: "0.95rem" }}>
                {output.recommendedCabinetWidth}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Flue Vent Pipe Type</div>
              <div className="item-value" style={{ fontSize: "0.82rem" }}>
                {output.flueExhaustType}
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/furnace-size-calculator"
            toolName="Furnace Sizing & AFUE Efficiency Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Heating System Engineering</div>
            <Link href={`/calculators/ductulator?cfm=${output.requiredHeatingCfm}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Furnace Supply Plenum &amp; Trunk ({output.requiredHeatingCfm} CFM)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/btu-calculator">
              <span>Cross-Check Whole-Home Summer Cooling Load</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Recommended Furnace"
        value={`${output.nominalFurnaceModelBtu / 1000}k BTU`}
        unit={`(${output.afueRatingPercent}% AFUE)`}
      />
    </div>
  );
}
