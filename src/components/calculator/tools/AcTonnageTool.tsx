"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculateAcTonnage } from "@/lib/math/ac-tonnage";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { AcTonnageVisualizer } from "@/components/calculator/visualizers/AcTonnageVisualizer";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";

const PRESETS = [
  { label: "1,200 sq ft (Moderate)", area: 1200, climate: "moderate" },
  { label: "1,500 sq ft (Moderate)", area: 1500, climate: "moderate" },
  { label: "2,000 sq ft (Hot/Humid)", area: 2000, climate: "hot_humid" },
  { label: "2,500 sq ft (Moderate)", area: 2500, climate: "moderate" },
  { label: "2,000 sq ft (Desert Heat)", area: 2000, climate: "extreme_heat" },
];

export function AcTonnageTool() {
  const { isMetric } = useUnitSystem();
  const { getNumberParam, getParam, updateParam } = useHydrateParams();

  // State
  const [area, setArea] = useState<number>(1500);
  const [climate, setClimate] = useState<any>("moderate");
  const [ceiling, setCeiling] = useState<number>(8);
  const [seer, setSeer] = useState<number>(15.0);
  const [rate, setRate] = useState<number>(0.16);

  // Hydrate from URL query params
  useEffect(() => {
    const urlArea = getNumberParam("area", 1500);
    const urlClimate = getParam("climate", "moderate");
    const urlSeer = getNumberParam("seer", 15.0);
    setArea(urlArea);
    setClimate(urlClimate);
    setSeer(urlSeer);
  }, [getNumberParam, getParam]);

  const handleAreaChange = (val: number) => {
    setArea(val);
    updateParam("area", val);
  };

  const handleClimateChange = (c: string) => {
    setClimate(c);
    updateParam("climate", c);
  };

  const handlePreset = (pArea: number, pClimate: string) => {
    setArea(pArea);
    setClimate(pClimate);
    updateParam("area", pArea);
    updateParam("climate", pClimate);
  };

  const result = useMemo(() => {
    return calculateAcTonnage({
      areaSqFt: area,
      climateSeverity: climate,
      ceilingHeightFt: ceiling,
      seerRating: seer,
      electricRateKwh: rate,
    });
  }, [area, climate, ceiling, seer, rate]);

  const displayArea = isMetric ? `${Math.round(area * 0.092903)} m²` : `${area} sq ft`;

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Standard AC Sizing Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Quick Home Presets:</span>
          <button
            type="button"
            onClick={() => handlePreset(1500, "moderate")}
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
            title="Reset to 1,500 sq ft Moderate climate default"
          >
            ↺ Reset Defaults
          </button>
        </div>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePreset(p.area, p.climate)}
            className={`preset-chip-btn ${area === p.area && climate === p.climate ? "active" : ""}`}
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
          <AshraeClimateSelector
            compact={true}
            onSelectLocation={(loc) => {
              let mappedClimate = "moderate";
              if (loc.summerDb04 >= 100) mappedClimate = "extreme_heat";
              else if (loc.summerDb04 >= 92 && loc.summerWb04 >= 75) mappedClimate = "hot_humid";
              else if (loc.summerDb04 >= 90) mappedClimate = "warm";
              else if (loc.summerDb04 <= 82) mappedClimate = "cool";

              setClimate(mappedClimate);
              updateParam("climate", mappedClimate);
              updateParam("loc", loc.id);
            }}
          />
          {/* AREA INPUT */}
          <div className="form-group">
            <label htmlFor="ac-area-input">
              <span>Conditioned Floor Area</span>
              <span className="unit-label">{displayArea}</span>
            </label>
            <input
              id="ac-area-input"
              type="number"
              min="100"
              max="8000"
              step="50"
              value={area}
              onChange={(e) => handleAreaChange(parseFloat(e.target.value) || 100)}
              className="input-number"
            />
            <input
              id="ac-area-slider"
              type="range"
              min="500"
              max="4000"
              step="50"
              value={area}
              onChange={(e) => handleAreaChange(parseFloat(e.target.value))}
              className="range-slider"
              aria-label="Floor Area Slider"
            />
          </div>

          {/* CLIMATE SEVERITY */}
          <div className="form-group">
            <label htmlFor="climate-select">
              <span>Regional Climate Zone</span>
            </label>
            <select
              id="climate-select"
              value={climate}
              onChange={(e) => handleClimateChange(e.target.value)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="mild">Mild (Northern Coast / Pacific NW — ~650 sq ft/ton)</option>
              <option value="moderate">Moderate (Mid-Atlantic / Midwest — ~550 sq ft/ton)</option>
              <option value="hot_humid">Hot / Humid (South / Gulf Coast — ~450 sq ft/ton)</option>
              <option value="extreme_heat">Extreme Desert Heat (Southwest / Phoenix — ~350 sq ft/ton)</option>
            </select>
          </div>

          {/* CEILING HEIGHT */}
          <div className="form-group">
            <label htmlFor="ac-ceiling-select">
              <span>Ceiling Height</span>
            </label>
            <select
              id="ac-ceiling-select"
              value={ceiling}
              onChange={(e) => setCeiling(parseFloat(e.target.value))}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={8}>8 ft (Standard)</option>
              <option value={9}>9 ft (Modern 9-Foot)</option>
              <option value={10}>10 ft (High Ceiling)</option>
              <option value={12}>12 ft (Cathedral / Vaulted)</option>
            </select>
          </div>

          {/* SEER2 RATING & ELECTRICITY RATE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="seer-input"><span>Efficiency (SEER2)</span></label>
              <input
                id="seer-input"
                type="number"
                min="10"
                max="26"
                step="0.5"
                value={seer}
                onChange={(e) => setSeer(parseFloat(e.target.value) || 14)}
                className="input-number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rate-input"><span>Utility Electricity Rate ($/kWh)</span></label>
              <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.35rem" }}>
                {[
                  { label: "US Avg ($0.16)", val: 0.16 },
                  { label: "Low ($0.12)", val: 0.12 },
                  { label: "High ($0.28)", val: 0.28 },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setRate(chip.val);
                      updateParam("rate", chip.val);
                    }}
                    style={{
                      background: rate === chip.val ? "rgba(0, 210, 255, 0.15)" : "var(--surface)",
                      border: `1px solid ${rate === chip.val ? "var(--accent-cooling)" : "var(--border-subtle)"}`,
                      color: rate === chip.val ? "var(--accent-cooling)" : "var(--text-muted)",
                      borderRadius: "4px",
                      padding: "0.2rem 0.45rem",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <input
                id="rate-input"
                type="number"
                min="0.05"
                max="0.60"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0.16)}
                className="input-number"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="AC Tonnage Result">
            <div className="result-label">Recommended AC Capacity</div>
            <div className="result-value">{result.recommendedTonnage} Tons</div>
            <div className="result-unit">
              Nominal Rating: <strong>{result.recommendedBtu.toLocaleString()} BTU/hr</strong> ({result.exactTonnage} calculated)
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
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "var(--accent-success)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                ✓ ACCA Manual S Sizing Zone: {(area / result.recommendedTonnage).toFixed(0)} sq ft / Ton
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual J®", "ACCA Manual S®", "AHRI Standard 210/240"]} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Nominal Airflow</div>
              <div className="item-value">{result.nominalCfm} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Annual Cooling Cost</div>
              <div className="item-value">${result.annualOperatingCost} / yr</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Legacy 10-SEER Cost</div>
              <div className="item-value" style={{ color: "var(--accent-warning)" }}>${result.seer10OperatingCost} / yr</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Annual Energy Savings</div>
              <div className="item-value" style={{ color: "var(--accent-success)" }}>+${result.annualSavingsVsLegacy} / yr</div>
            </div>
          </div>

          {/* SEER2 COST COMPARISON TABLE */}
          <div className="scenario-table" style={{ margin: "0.5rem 0" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">SEER2 Rating</th>
                  <th scope="col">Annual Operating Cost</th>
                  <th scope="col">10-Year Total</th>
                </tr>
              </thead>
              <tbody>
                {result.seerRatingsComparison.map((sc) => (
                  <tr key={sc.seer} style={{ background: sc.seer === Math.round(seer) ? "rgba(56, 189, 248, 0.1)" : "transparent" }}>
                    <td><strong>{sc.seer} SEER2</strong> {sc.seer === Math.round(seer) ? "(Selected)" : ""}</td>
                    <td>${sc.annualCost} / yr</td>
                    <td>${sc.annualCost * 10}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AC TONNAGE & SEER2 HEAT EXTRACTION VISUAL SCHEMA */}
          <AcTonnageVisualizer
            tonnage={result.recommendedTonnage}
            btuPerHour={result.recommendedBtu}
            seerRating={seer}
            annualOperatingCost={result.annualOperatingCost}
            floorAreaSqFt={area}
            climateZone={climate}
          />

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/ac-tonnage-calculator"
            toolName="AC Tonnage Calculator"
          />

          {/* DECODER WORKFLOW & DUCT SIZING HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Steps in HVAC Engineering</div>
            <Link href={`/calculators/ductulator?cfm=${result.nominalCfm}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Ductwork for {result.nominalCfm} CFM ({result.recommendedTonnage} Ton AC)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/ac-model-decoder">
              <span>Decode your AC model number data plate (Carrier, Trane, Goodman)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="AC Tonnage"
        value={`${result.recommendedTonnage} Tons`}
        unit={`(${result.recommendedBtu.toLocaleString()} BTU)`}
      />
    </div>
  );
}
