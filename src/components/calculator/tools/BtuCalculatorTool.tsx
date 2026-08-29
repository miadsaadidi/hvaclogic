"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculateHeatLoad } from "@/lib/math/load-sizing";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { HeatLossDonutVisualizer } from "@/components/calculator/visualizers/HeatLossDonutVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  { label: "1,500 sq ft Home (Zone 4)", area: 1500, zone: "zone_4" },
  { label: "2,000 sq ft Home (Zone 4)", area: 2000, zone: "zone_4" },
  { label: "2,500 sq ft Home (Zone 5)", area: 2500, zone: "zone_5" },
  { label: "3,000 sq ft Home (Zone 2)", area: 3000, zone: "zone_2" },
  { label: "Small 500 sq ft Apartment", area: 500, zone: "zone_3" },
];

export function BtuCalculatorTool() {
  const { isMetric } = useUnitSystem();
  const { getNumberParam, getParam, updateParam } = useHydrateParams();

  // State
  const [area, setArea] = useState<number>(2000);
  const [ceiling, setCeiling] = useState<number>(9);
  const [zone, setZone] = useState<any>("zone_4");
  const [insulation, setInsulation] = useState<any>("average");
  const [windowQuality, setWindowQuality] = useState<any>("double_low_e");
  const [occupants, setOccupants] = useState<number>(4);

  // Hydrate from URL query params
  useEffect(() => {
    const urlArea = getNumberParam("area", 2000);
    const urlZone = getParam("zone", "zone_4");
    setArea(urlArea);
    setZone(urlZone);
  }, [getNumberParam, getParam]);

  const handleAreaChange = (val: number) => {
    setArea(val);
    updateParam("area", val);
  };

  const handleZoneChange = (z: string) => {
    setZone(z);
    updateParam("zone", z);
  };

  const handlePreset = (pArea: number, pZone: string) => {
    setArea(pArea);
    setZone(pZone);
    updateParam("area", pArea);
    updateParam("zone", pZone);
  };

  // Perform Calculation
  const result = useMemo(() => {
    return calculateHeatLoad({
      areaSqFt: area,
      ceilingHeightFt: ceiling,
      climateZone: zone,
      insulationGrade: insulation,
      windowQuality,
      occupants,
    });
  }, [area, ceiling, zone, insulation, windowQuality, occupants]);

  const displayArea = isMetric ? `${Math.round(area * 0.092903)} m²` : `${area} sq ft`;
  const displayCoolingBtu = isMetric
    ? `${(result.totalCoolingBtu * 0.000293071).toFixed(1)} kW`
    : `${result.totalCoolingBtu.toLocaleString()} BTU/hr`;

  const displayHeatingBtu = isMetric
    ? `${(result.totalHeatingBtu * 0.000293071).toFixed(1)} kW`
    : `${result.totalHeatingBtu.toLocaleString()} BTU/hr`;

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Standard Home Load Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Quick Home Presets:</span>
          <button
            type="button"
            onClick={() => handlePreset(2000, "4")}
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
            title="Reset to 2,000 sq ft Zone 4 standard default"
          >
            ↺ Reset Defaults
          </button>
        </div>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePreset(p.area, p.zone)}
            className={`preset-chip-btn ${area === p.area && zone === p.zone ? "active" : ""}`}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          <CalculatorTrustPill />
          {/* AREA INPUT */}
          <div className="form-group">
            <label htmlFor="area-input">
              <span>Conditioned Floor Area</span>
              <span className="unit-label">{displayArea}</span>
            </label>
            <input
              id="area-input"
              type="number"
              min="100"
              max="10000"
              step="50"
              value={area}
              onChange={(e) => handleAreaChange(parseFloat(e.target.value) || 100)}
              className="input-number"
            />
            <input
              id="area-slider"
              type="range"
              min="500"
              max="5000"
              step="50"
              value={area}
              onChange={(e) => handleAreaChange(parseFloat(e.target.value))}
              className="range-slider"
              aria-label="Conditioned Area Slider"
            />
          </div>

          {/* CEILING HEIGHT */}
          <div className="form-group">
            <label htmlFor="ceiling-select">
              <span>Ceiling Height</span>
            </label>
            <select
              id="ceiling-select"
              value={ceiling}
              onChange={(e) => setCeiling(parseFloat(e.target.value))}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={8}>8 ft (Standard)</option>
              <option value={9}>9 ft (Modern Standard)</option>
              <option value={10}>10 ft (High Ceiling)</option>
              <option value={12}>12 ft (Cathedral / Vaulted)</option>
              <option value={16}>16 ft (Great Room / Loft)</option>
            </select>
          </div>

          {/* CLIMATE ZONE */}
          <div className="form-group">
            <label htmlFor="zone-select">
              <span>IECC Climate Zone</span>
            </label>
            <select
              id="zone-select"
              value={zone}
              onChange={(e) => handleZoneChange(e.target.value)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="zone_1">Zone 1: Very Hot-Humid (Miami, Honolulu)</option>
              <option value="zone_2">Zone 2: Hot-Humid (Houston, Tampa, Phoenix)</option>
              <option value="zone_3">Zone 3: Warm-Humid (Atlanta, Dallas, Las Vegas)</option>
              <option value="zone_4">Zone 4: Mixed-Humid (St. Louis, DC, Seattle)</option>
              <option value="zone_5">Zone 5: Cold (Chicago, Boston, Denver)</option>
              <option value="zone_6">Zone 6: Very Cold (Minneapolis, Burlington)</option>
              <option value="zone_7">Zone 7: Subarctic (Duluth, Fairbanks)</option>
            </select>
          </div>

          {/* INSULATION GRADE */}
          <div className="form-group">
            <label htmlFor="insul-select">
              <span>Building Insulation Quality</span>
            </label>
            <select
              id="insul-select"
              value={insulation}
              onChange={(e) => setInsulation(e.target.value as any)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="poor">Poor (Pre-1980, R-11 walls, unsealed leaks)</option>
              <option value="average">Average (1990-2010, R-13 walls, R-30 attic)</option>
              <option value="good">Good (2012+ IECC, R-20 walls, R-49 attic)</option>
              <option value="superior">Superior (Continuous foam, R-60 attic, Net-Zero)</option>
            </select>
          </div>

          {/* WINDOWS & OCCUPANTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="window-select"><span>Windows</span></label>
              <select
                id="window-select"
                value={windowQuality}
                onChange={(e) => setWindowQuality(e.target.value as any)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="single_pane">Single Pane</option>
                <option value="double_clear">Double Clear</option>
                <option value="double_low_e">Double Low-E</option>
                <option value="triple_low_e">Triple Low-E</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="occupants-input"><span>Occupants</span></label>
              <input
                id="occupants-input"
                type="number"
                min="1"
                max="20"
                value={occupants}
                onChange={(e) => setOccupants(parseInt(e.target.value) || 1)}
                className="input-number"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL & DONUT VISUALIZER */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Load Sizing Results">
            <div className="result-label">Recommended Cooling Capacity</div>
            <div className="result-value">{result.coolingTonnage} Tons</div>
            <div className="result-unit">
              Total Cooling Load: <strong>{displayCoolingBtu}</strong>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  background: "rgba(0, 210, 255, 0.12)",
                  color: "var(--accent-cooling)",
                  border: "1px solid rgba(0, 210, 255, 0.3)",
                }}
              >
                SHR: {Math.round(result.sensibleHeatRatio * 100)}% Sensible / {Math.round((1 - result.sensibleHeatRatio) * 100)}% Latent
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual J® (8th Ed)", "ASHRAE Fundamentals Ch. 18"]} />

          {/* DUAL EQUIPMENT SIZING MATCH CARD */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              margin: "0.75rem 0",
            }}
          >
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "3px solid var(--accent-cooling)", borderRadius: "0.65rem", padding: "0.85rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-cooling)", textTransform: "uppercase" }}>❄️ Summer Cooling</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginTop: "0.2rem" }}>{result.coolingTonnage} Ton System</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>AC or Heat Pump (Manual S)</div>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "3px solid var(--accent-heating)", borderRadius: "0.65rem", padding: "0.85rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-heating)", textTransform: "uppercase" }}>🔥 Winter Heating</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginTop: "0.2rem" }}>{(result.recommendedFurnaceBtu / 1000).toFixed(0)}k BTU Furnace</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>96% AFUE Input Rating</div>
            </div>
          </div>

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Heating Load</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>{displayHeatingBtu}</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Required Airflow</div>
              <div className="item-value">{result.recommendedCfm} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Sensible Heat</div>
              <div className="item-value">{result.sensibleCoolingBtu.toLocaleString()} BTU</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Latent Moisture</div>
              <div className="item-value">{result.latentCoolingBtu.toLocaleString()} BTU</div>
            </div>
          </div>

          {/* DONUT BREAKDOWN */}
          <HeatLossDonutVisualizer breakdown={result.breakdown} />

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTONS */}
          <ActionButtonBar
            toolRoute="/calculators/btu-calculator"
            toolName="BTU Load Master"
          />

          {/* WORKFLOW HANDOFF TO CFM & DUCT CALCULATOR */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step: Airflow &amp; Duct Sizing Workflow</div>
            <Link href={`/calculators/cfm-calculator?btu=${result.sensibleCoolingBtu}`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Airflow for {result.sensibleCoolingBtu.toLocaleString()} BTU Load</span>
              <span>→</span>
            </Link>
            <Link href={`/calculators/ductulator?cfm=${result.recommendedCfm}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Supply &amp; Return Trunks for {result.recommendedCfm} CFM</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Cooling Sizing"
        value={`${result.coolingTonnage} Tons`}
        unit={`(${displayCoolingBtu})`}
      />
    </div>
  );
}
