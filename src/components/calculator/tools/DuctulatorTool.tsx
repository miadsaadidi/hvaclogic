"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculateDuct } from "@/lib/math/duct";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { DuctCanvasVisualizer } from "@/components/calculator/visualizers/DuctCanvasVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  { label: "1.5 Ton Trunk (600 CFM)", cfm: 600, friction: 0.08 },
  { label: "2.5 Ton Trunk (1,000 CFM)", cfm: 1000, friction: 0.08 },
  { label: "3.0 Ton Trunk (1,200 CFM)", cfm: 1200, friction: 0.08 },
  { label: "4.0 Ton Trunk (1,600 CFM)", cfm: 1600, friction: 0.08 },
  { label: "5.0 Ton Trunk (2,000 CFM)", cfm: 2000, friction: 0.08 },
  { label: "Standard Branch (150 CFM)", cfm: 150, friction: 0.10 },
];

export function DuctulatorTool() {
  const { isMetric } = useUnitSystem();
  const { getNumberParam, updateParam } = useHydrateParams();

  // State
  const [cfm, setCfm] = useState<number>(1200);
  const [friction, setFriction] = useState<number>(0.08);
  const [lockMode, setLockMode] = useState<"none" | "lock_height" | "lock_width" | "ratio_1_1" | "ratio_1_2" | "ratio_1_3">("none");
  const [lockedDimension, setLockedDimension] = useState<number>(10);
  const [sag, setSag] = useState<number>(0);

  // Hydrate from URL query params on mount
  useEffect(() => {
    const urlCfm = getNumberParam("cfm", 1200);
    const urlFriction = getNumberParam("friction", 0.08);
    setCfm(urlCfm);
    setFriction(urlFriction);
  }, [getNumberParam]);

  // Handle updates with URL sync
  const handleCfmChange = (val: number) => {
    setCfm(val);
    updateParam("cfm", val);
  };

  const handleFrictionChange = (val: number) => {
    setFriction(val);
    updateParam("friction", val);
  };

  const handlePresetSelect = (pCfm: number, pFriction: number) => {
    setCfm(pCfm);
    setFriction(pFriction);
    updateParam("cfm", pCfm);
    updateParam("friction", pFriction);
  };

  // Perform Calculation
  const result = useMemo(() => {
    return calculateDuct({
      cfm,
      friction,
      lockMode,
      lockedDimension,
      compressionSag: sag,
    });
  }, [cfm, friction, lockMode, lockedDimension, sag]);

  // Unit conversion helpers
  const displayDiameter = isMetric
    ? `${Math.round(result.roundDiameter * 25.4)} mm`
    : `${result.roundDiameter}"`;

  const displayRectWidth = isMetric
    ? `${Math.round(result.rectangularWidth * 25.4)} mm`
    : `${result.rectangularWidth}"`;

  const displayRectHeight = isMetric
    ? `${Math.round(result.rectangularHeight * 25.4)} mm`
    : `${result.rectangularHeight}"`;

  const displayVelocity = isMetric
    ? `${(result.velocityFpm * 0.00508).toFixed(1)} m/s`
    : `${result.velocityFpm} FPM`;

  const handleExportCsv = () => {
    const headers = "CFM,Friction (in.wg/100ft),Round Diameter (in),Rect Width (in),Rect Height (in),Velocity (FPM),Acoustic Rating\n";
    const row = `${cfm},${friction},${result.roundDiameter},${result.rectangularWidth},${result.rectangularHeight},${result.velocityFpm},${result.velocityCategory}\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `duct-sizing-${cfm}cfm.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Standard HVAC Duct Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Quick Preset Scenarios:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(1200, 0.08)}
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
            title="Reset to 1,200 CFM & 0.08 in.wg standard default"
          >
            ↺ Reset Defaults
          </button>
        </div>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset.cfm, preset.friction)}
            className={`preset-chip-btn ${cfm === preset.cfm && friction === preset.friction ? "active" : ""}`}
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
          {/* CFM INPUT */}
          <div className="form-group">
            <label htmlFor="cfm-input">
              <span>Airflow Volume (CFM)</span>
              <span className="unit-label">{isMetric ? "L/s" : "CFM"}</span>
            </label>
            <div className="input-row">
              <input
                id="cfm-input"
                type="number"
                inputMode="decimal"
                min="10"
                max="50000"
                step="10"
                value={cfm}
                onChange={(e) => handleCfmChange(parseFloat(e.target.value) || 0)}
                className="input-number"
                aria-describedby="cfm-slider"
              />
            </div>
            <input
              id="cfm-slider"
              type="range"
              min="50"
              max="5000"
              step="50"
              value={cfm}
              onChange={(e) => handleCfmChange(parseFloat(e.target.value))}
              className="range-slider"
              aria-label="CFM Airflow Slider"
            />
          </div>

          {/* FRICTION RATE INPUT */}
          <div className="form-group">
            <label htmlFor="friction-input">
              <span>Friction Rate (Head Loss)</span>
              <span className="unit-label">{isMetric ? "Pa/m" : "in. wg / 100 ft"}</span>
            </label>
            <div className="input-row">
              <input
                id="friction-input"
                type="number"
                inputMode="decimal"
                min="0.01"
                max="1.0"
                step="0.01"
                value={friction}
                onChange={(e) => handleFrictionChange(parseFloat(e.target.value) || 0.01)}
                className="input-number"
                aria-describedby="friction-slider"
              />
            </div>
            <input
              id="friction-slider"
              type="range"
              min="0.02"
              max="0.30"
              step="0.01"
              value={friction}
              onChange={(e) => handleFrictionChange(parseFloat(e.target.value))}
              className="range-slider"
              aria-label="Friction Rate Slider"
            />
          </div>

          {/* ASPECT RATIO LOCK */}
          <div className="form-group">
            <label htmlFor="aspect-lock-select">
              <span>Rectangular Geometry Constraint</span>
            </label>
            <select
              id="aspect-lock-select"
              value={lockMode}
              onChange={(e) => setLockMode(e.target.value as any)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="none">Auto (Balanced ~1.5:1 Ratio)</option>
              <option value="lock_height">Fixed Height (e.g. 10" ceiling joist)</option>
              <option value="lock_width">Fixed Width</option>
              <option value="ratio_1_1">Square Duct (1:1 Ratio)</option>
              <option value="ratio_1_2">Wide Aspect (2:1 Ratio)</option>
              <option value="ratio_1_3">Flat Aspect (3:1 Ratio)</option>
            </select>
          </div>

          {(lockMode === "lock_height" || lockMode === "lock_width") && (
            <div className="form-group">
              <label htmlFor="locked-dim-input">
                <span>{lockMode === "lock_height" ? "Fixed Height (inches)" : "Fixed Width (inches)"}</span>
              </label>
              <input
                id="locked-dim-input"
                type="number"
                min="3"
                max="60"
                step="1"
                value={lockedDimension}
                onChange={(e) => setLockedDimension(parseFloat(e.target.value) || 10)}
                className="input-number"
              />
            </div>
          )}

          {/* FLEX DUCT SAG DERATE SLIDER */}
          <div className="form-group">
            <label htmlFor="sag-select">
              <span>Flexible Duct Sag & Compression</span>
              <span className="unit-label">{sag === 0 ? "0% (Rigid Sheet Metal)" : `${sag * 100}% Compression`}</span>
            </label>
            <select
              id="sag-select"
              value={sag}
              onChange={(e) => setSag(parseFloat(e.target.value))}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={0}>0% — Rigid Galvanized Sheet Metal</option>
              <option value={0.04}>4% — Flexible Duct (Properly Supported)</option>
              <option value={0.15}>15% — Flexible Duct (Moderate Sag)</option>
              <option value={0.30}>30% — Flexible Duct (Severe Sag / Compressed)</option>
            </select>
          </div>
        </div>

        {/* OUTPUT PANEL & 2D CANVAS */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Primary Sizing Results">
            <div className="result-label">Recommended Round Diameter</div>
            <div className="result-value">{displayDiameter}</div>
            <div className="result-unit">
              Equivalent Rectangular: <strong>{displayRectWidth} × {displayRectHeight}</strong>
            </div>
            <div style={{ marginTop: "0.6rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  background:
                    result.velocityCategory === "quiet"
                      ? "rgba(16, 185, 129, 0.12)"
                      : result.velocityCategory === "moderate"
                      ? "rgba(234, 179, 8, 0.12)"
                      : "rgba(239, 68, 68, 0.12)",
                  color:
                    result.velocityCategory === "quiet"
                      ? "var(--accent-success)"
                      : result.velocityCategory === "moderate"
                      ? "var(--accent-warning)"
                      : "var(--accent-danger)",
                  border: `1px solid ${
                    result.velocityCategory === "quiet"
                      ? "rgba(16, 185, 129, 0.3)"
                      : result.velocityCategory === "moderate"
                      ? "rgba(234, 179, 8, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  }`,
                }}
              >
                {result.velocityCategory === "quiet"
                  ? `🟢 Whisper Quiet (${displayVelocity})`
                  : result.velocityCategory === "moderate"
                  ? `🟡 Standard Supply (${displayVelocity})`
                  : `🔴 High Velocity Noise Alert (${displayVelocity})`}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASHRAE Fundamentals Ch. 21", "SMACNA 4th Ed", "ACCA Manual D®"]} />

          {/* 2D CANVAS CROSS-SECTION */}
          <DuctCanvasVisualizer
            roundDiameter={result.roundDiameter}
            width={result.rectangularWidth}
            height={result.rectangularHeight}
            velocityFpm={result.velocityFpm}
            velocityCategory={result.velocityCategory}
          />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Air Velocity</div>
              <div className="item-value">{displayVelocity}</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Acoustic Rating</div>
              <div className="item-value" style={{
                color: result.velocityCategory === "quiet" ? "var(--accent-success)" : result.velocityCategory === "moderate" ? "var(--accent-warning)" : "var(--accent-danger)",
                textTransform: "capitalize",
              }}>
                {result.velocityCategory}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Cross-Section Area</div>
              <div className="item-value">{result.roundAreaSqFt} sq ft</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Aspect Ratio</div>
              <div className="item-value">{result.aspectRatio}:1</div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/ductulator"
            toolName="Digital Ductulator"
            onExportCsv={handleExportCsv}
          />

          {/* WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Airflow Design</div>
            <Link href={`/calculators/flex-duct-cfm-chart?friction=${friction}`}>
              <span>View Flex Duct CFM Lookup Matrix</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Round Duct Size"
        value={displayDiameter}
        unit={`(${displayRectWidth} × ${displayRectHeight})`}
      />
    </div>
  );
}
