"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  generateFlexDuctMatrix,
  findRecommendedFlexDuct,
  SagCompressionLevel,
  SAG_COMPRESSION_FACTORS,
  FrictionRate,
  STANDARD_FRICTION_RATES,
} from "@/lib/math/flex-duct";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { FlexDuctSagVisualizer } from "@/components/calculator/visualizers/FlexDuctSagVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

export function FlexDuctChartTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [selectedSag, setSelectedSag] = useState<SagCompressionLevel>(4);
  const [activeDiameter, setActiveDiameter] = useState<number>(8);
  const [targetCfm, setTargetCfm] = useState<number>(150);
  const [selectedFriction, setSelectedFriction] = useState<FrictionRate>(0.08);

  // Hydrate from URL
  useEffect(() => {
    const urlSag = Number(getParam("sag", "4")) as SagCompressionLevel;
    const urlDiameter = Number(getParam("diameter", "8"));
    const urlCfm = Number(getParam("cfm", "150"));
    const urlFriction = Number(getParam("friction", "0.08")) as FrictionRate;

    if ([0, 4, 15, 30].includes(urlSag)) setSelectedSag(urlSag);
    if (!isNaN(urlDiameter) && urlDiameter > 0) setActiveDiameter(urlDiameter);
    if (!isNaN(urlCfm) && urlCfm > 0) setTargetCfm(urlCfm);
    if (STANDARD_FRICTION_RATES.includes(urlFriction)) setSelectedFriction(urlFriction);
  }, [getParam]);

  const handleSagChange = (sag: SagCompressionLevel) => {
    setSelectedSag(sag);
    updateParam("sag", sag);
  };

  const handleCfmChange = (val: number) => {
    setTargetCfm(val);
    updateParam("cfm", val);
  };

  // Matrix calculation
  const matrix = useMemo(() => generateFlexDuctMatrix(selectedSag), [selectedSag]);

  // Finder calculation
  const recommendation = useMemo(() => {
    return findRecommendedFlexDuct(targetCfm, selectedFriction, selectedSag);
  }, [targetCfm, selectedFriction, selectedSag]);

  const activeRow = useMemo(() => {
    return matrix.rows.find((r) => r.diameterInches === activeDiameter) || matrix.rows[4];
  }, [matrix, activeDiameter]);

  const handleExportCsv = () => {
    const headers = "Diameter (Inches),Area (sq ft),0.05 in.wg CFM,0.08 in.wg CFM,0.10 in.wg CFM,0.15 in.wg CFM,Velocity @ 0.08 (FPM),Recommended Space\n";
    const rowsText = matrix.rows
      .map(
        (r) =>
          `"${r.diameterInches}\"",${r.areaSqFt},${r.cfmAt005},${r.cfmAt008},${r.cfmAt010},${r.cfmAt015},${r.velocityAt008Fpm},"${r.recommendedRoomType}"`
      )
      .join("\n");
    const blob = new Blob([headers + rowsText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flex-duct-cfm-chart-${selectedSag}pct-sag.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* SAG COMPRESSION SELECTOR CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Flexible Duct Installation Sag Options">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>
            Field Installation Sag &amp; Tension:
          </span>
          <button
            type="button"
            onClick={() => handleSagChange(4)}
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
            title="Reset to 4% Code Standard"
          >
            ↺ Reset Code Default (4%)
          </button>
        </div>

        {([0, 4, 15, 30] as SagCompressionLevel[]).map((sag) => {
          const cfg = SAG_COMPRESSION_FACTORS[sag];
          return (
            <button
              key={sag}
              onClick={() => handleSagChange(sag)}
              className={`preset-chip-btn ${selectedSag === sag ? "active" : ""}`}
              type="button"
            >
              {cfg.label.split(" (")[0]} ({sag === 0 ? "1.0×" : `${cfg.frictionMultiplier}× drop`})
            </button>
          );
        })}
      </div>

      <div className="calculator-grid">
        {/* INPUT & QUICK SIZING FINDER PANEL */}
        <div className="input-panel">
          {/* QUICK SIZING FINDER CARD */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "3px solid var(--accent-cooling)",
              borderRadius: "0.65rem",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent-cooling)", marginBottom: "0.5rem" }}>
              🔍 Fast Flex Duct Sizer &amp; Room Matcher
            </div>

            <div className="form-group" style={{ marginBottom: "0.75rem" }}>
              <label htmlFor="target-cfm-input">
                <span>Required Room Airflow</span>
                <span className="unit-label">CFM Target</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="target-cfm-input"
                  type="number"
                  min={20}
                  max={3000}
                  step={10}
                  value={targetCfm}
                  onChange={(e) => handleCfmChange(Number(e.target.value))}
                  className="input-number"
                />
                <input
                  type="range"
                  min={20}
                  max={1200}
                  step={10}
                  value={Math.min(1200, targetCfm)}
                  onChange={(e) => handleCfmChange(Number(e.target.value))}
                  className="input-range"
                  aria-label="Target CFM airflow slider"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "0.5rem" }}>
              <label htmlFor="friction-select">
                <span>Design Friction Rate</span>
                <span className="unit-label">in. wg / 100 ft</span>
              </label>
              <select
                id="friction-select"
                value={selectedFriction}
                onChange={(e) => {
                  const val = Number(e.target.value) as FrictionRate;
                  setSelectedFriction(val);
                  updateParam("friction", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={0.05}>0.05 in. wg / 100 ft (Quiet Trunks / High Latent)</option>
                <option value={0.08}>0.08 in. wg / 100 ft (Standard Residential Supply)</option>
                <option value={0.10}>0.10 in. wg / 100 ft (Commercial / Shorter Runs)</option>
                <option value={0.15}>0.15 in. wg / 100 ft (High Velocity Systems)</option>
              </select>
            </div>

            {/* Quick Sizing Recommendation Box */}
            <div
              style={{
                marginTop: "0.75rem",
                background: "rgba(0, 210, 255, 0.08)",
                border: "1px solid rgba(0, 210, 255, 0.25)",
                padding: "0.65rem 0.85rem",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em" }}>Recommended Size:</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--accent-cooling)", letterSpacing: "0.01em", marginTop: "0.1rem" }}>
                &Oslash; {recommendation.recommendedDiameter}&quot; Flexible Duct
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--ink-secondary)", marginTop: "0.15rem" }}>
                Delivers <strong>{recommendation.achievedCfm} CFM</strong> at {recommendation.velocityFpm} FPM velocity.
              </div>
            </div>
          </div>

          {/* ACTIVE DIAMETER INSPECTOR */}
          <div className="form-group">
            <label htmlFor="diameter-picker">
              <span>Inspect Diameter Details</span>
              <span className="unit-label">Inches (&Oslash;)</span>
            </label>
            <select
              id="diameter-picker"
              value={activeDiameter}
              onChange={(e) => {
                const val = Number(e.target.value);
                setActiveDiameter(val);
                updateParam("diameter", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              {matrix.rows.map((r) => (
                <option key={r.diameterInches} value={r.diameterInches}>
                  &Oslash; {r.diameterInches}&quot; Flex Duct ({r.cfmAt008} CFM @ 0.08 in.wg)
                </option>
              ))}
            </select>
          </div>

          {/* SMACNA & ASHRAE RP-1333 Installation Rules */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "0.5rem", padding: "0.75rem" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", marginBottom: "0.3rem" }}>
              📋 Installation Rules (SMACNA &amp; ASHRAE RP-1333):
            </div>
            <ul style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "0.72rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
              <li>Support flexible duct with minimum 1.5&quot; wide hanger straps every <strong>4 feet</strong>.</li>
              <li>Maximum allowable sag between supports is <strong>0.5 inches per foot</strong> of span.</li>
              <li>Always pull flexible duct fully taut (4% code tension); never leave bunched or partly inside shipping bags.</li>
              <li>Attic heat degrades standard tape adhesives; seal joints with UL 181-rated mastic and mechanical clamps to prevent attic leaks.</li>
            </ul>
          </div>
        </div>

        {/* OUTPUT & VISUALIZER PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Flexible Duct CFM Capacity">
            <div className="result-label">&Oslash; {activeRow.diameterInches}&quot; Flex Duct Capacity</div>
            <div className="result-value">{activeRow.cfmAt008} CFM</div>
            <div className="result-unit">
              At standard residential <strong>0.08 in. wg / 100 ft</strong> friction ({selectedSag}% sag)
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
                  background: "rgba(0, 210, 255, 0.12)",
                  color: "var(--accent-cooling)",
                  border: "1px solid rgba(0, 210, 255, 0.3)",
                }}
              >
                {activeRow.recommendedRoomType}
              </span>
            </div>
          </div>

          {/* CATENARY SAG VISUALIZER */}
          <FlexDuctSagVisualizer sagPercent={selectedSag} activeDiameter={activeRow.diameterInches} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Air Velocity (@ 0.08)</div>
              <div className="item-value">{activeRow.velocityAt008Fpm} FPM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Quiet Trunk (@ 0.05)</div>
              <div className="item-value">{activeRow.cfmAt005} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Standard Sizing (@ 0.10)</div>
              <div className="item-value">{activeRow.cfmAt010} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">High Velocity (@ 0.15)</div>
              <div className="item-value">{activeRow.cfmAt015} CFM</div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/flex-duct-cfm-chart"
            toolName="Flexible Duct CFM & Friction Drop Chart"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Sizing &amp; Design</div>
            <Link href={`/calculators/ductulator?cfm=${activeRow.cfmAt008}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Compare with Sheet Metal Ductulator ({activeRow.cfmAt008} CFM)</span>
              <span>→</span>
            </Link>
            <Link href={`/calculators/cfm-calculator?diameter=${activeRow.diameterInches}`}>
              <span>Calculate Room Air Changes &amp; Sensible Airflow</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FULL MASTER FLEX DUCT CFM LOOKUP MATRIX TABLE */}
      <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
              📊 Complete Flexible Duct CFM Capacity Matrix (4&quot; to 20&quot;)
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Values derated for <strong>{selectedSag}% installation sag</strong> ({matrix.frictionMultiplier}&times; friction factor). Click any row to inspect.
            </span>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            className="action-btn"
            style={{ height: "32px", fontSize: "0.75rem" }}
          >
            📥 Download Full CSV Matrix
          </button>
        </div>

        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Diameter</th>
                <th scope="col">0.05 in.wg (Quiet)</th>
                <th scope="col" style={{ color: "var(--accent-cooling)" }}>0.08 in.wg (Std Supply)</th>
                <th scope="col">0.10 in.wg (Standard)</th>
                <th scope="col">0.15 in.wg (High)</th>
                <th scope="col">Velocity @ 0.08</th>
                <th scope="col">Typical Application</th>
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((r) => {
                const isSelected = r.diameterInches === activeDiameter;
                const isRecommended = r.diameterInches === recommendation.recommendedDiameter;

                return (
                  <tr
                    key={r.diameterInches}
                    onClick={() => {
                      setActiveDiameter(r.diameterInches);
                      updateParam("diameter", r.diameterInches);
                    }}
                    style={{
                      cursor: "pointer",
                      background: isSelected ? "rgba(0, 210, 255, 0.1)" : isRecommended ? "rgba(16, 185, 129, 0.08)" : undefined,
                      transition: "background 100ms ease",
                    }}
                  >
                    <td>
                      <strong style={{ color: isSelected ? "var(--accent-cooling)" : "var(--ink)" }}>
                        &Oslash; {r.diameterInches}&quot;
                      </strong>
                      {isRecommended && (
                        <span style={{ marginLeft: "0.4rem", fontSize: "0.65rem", padding: "0.1rem 0.35rem", borderRadius: "3px", background: "rgba(16, 185, 129, 0.2)", color: "var(--accent-success)" }}>
                          Match
                        </span>
                      )}
                    </td>
                    <td>{r.cfmAt005} CFM</td>
                    <td style={{ color: "var(--accent-cooling)", fontWeight: 700 }}>{r.cfmAt008} CFM</td>
                    <td>{r.cfmAt010} CFM</td>
                    <td>{r.cfmAt015} CFM</td>
                    <td>{r.velocityAt008Fpm} FPM</td>
                    <td style={{ fontSize: "0.78rem", color: "var(--ink-secondary)" }}>{r.recommendedRoomType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label={`Ø ${activeRow.diameterInches}" Flex Duct`}
        value={`${activeRow.cfmAt008} CFM`}
        unit="(@ 0.08 in.wg)"
      />
    </div>
  );
}
