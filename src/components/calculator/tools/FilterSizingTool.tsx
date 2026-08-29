"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateFilterSizing,
  MervRating,
  FilterDepthInches,
  STANDARD_FILTER_SIZES,
  FilterSizingInput,
  FilterSizingOutput,
} from "@/lib/math/filter-sizing";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { FilterSizingVisualizer } from "@/components/calculator/visualizers/FilterSizingVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  {
    label: "🏠 Standard 1\" MERV 8 (16x25x1)",
    cfm: 1000,
    width: 16,
    height: 25,
    depth: 1 as FilterDepthInches,
    count: 1,
    merv: "merv_8" as MervRating,
  },
  {
    label: "⚠️ 1\" MERV 13 High Resistance (16x20x1)",
    cfm: 1200,
    width: 16,
    height: 20,
    depth: 1 as FilterDepthInches,
    count: 1,
    merv: "merv_13" as MervRating,
  },
  {
    label: "🛡️ 4\" Deep Media Upgrade (20x25x4)",
    cfm: 1200,
    width: 20,
    height: 25,
    depth: 4 as FilterDepthInches,
    count: 1,
    merv: "merv_13" as MervRating,
  },
  {
    label: "🏡 Dual Return Grilles (2x 16x20x1)",
    cfm: 1400,
    width: 16,
    height: 20,
    depth: 1 as FilterDepthInches,
    count: 2,
    merv: "merv_11" as MervRating,
  },
];

export function FilterSizingTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [cfm, setCfm] = useState<number>(1000);
  const [selectedStandardSize, setSelectedStandardSize] = useState<string>("16x25");
  const [filterWidth, setFilterWidth] = useState<number>(16);
  const [filterHeight, setFilterHeight] = useState<number>(25);
  const [filterDepth, setFilterDepth] = useState<FilterDepthInches>(1);
  const [filterCount, setFilterCount] = useState<number>(1);
  const [mervRating, setMervRating] = useState<MervRating>("merv_8");

  // Hydrate from URL
  useEffect(() => {
    const urlCfm = Number(getParam("cfm", "1000"));
    const urlWidth = Number(getParam("w", "16"));
    const urlHeight = Number(getParam("h", "25"));
    const urlDepth = Number(getParam("d", "1")) as FilterDepthInches;
    const urlCount = Number(getParam("count", "1"));
    const urlMerv = getParam("merv", "merv_8") as MervRating;

    if (!isNaN(urlCfm) && urlCfm > 0) setCfm(urlCfm);
    if (!isNaN(urlWidth) && urlWidth > 0) setFilterWidth(urlWidth);
    if (!isNaN(urlHeight) && urlHeight > 0) setFilterHeight(urlHeight);
    if ([1, 2, 4, 5].includes(urlDepth)) setFilterDepth(urlDepth);
    if (!isNaN(urlCount) && urlCount > 0) setFilterCount(urlCount);
    if (["merv_4", "merv_8", "merv_11", "merv_13", "merv_16"].includes(urlMerv)) setMervRating(urlMerv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStandardSizeChange = (sizeId: string) => {
    setSelectedStandardSize(sizeId);
    if (sizeId !== "custom") {
      const match = STANDARD_FILTER_SIZES.find((s) => s.id === sizeId);
      if (match) {
        setFilterWidth(match.widthInches);
        setFilterHeight(match.heightInches);
        updateParam("w", match.widthInches);
        updateParam("h", match.heightInches);
      }
    }
  };

  const handlePresetSelect = (p: typeof PRESETS[0]) => {
    setCfm(p.cfm);
    setFilterWidth(p.width);
    setFilterHeight(p.height);
    setFilterDepth(p.depth);
    setFilterCount(p.count);
    setMervRating(p.merv);

    const standardMatch = STANDARD_FILTER_SIZES.find((s) => s.widthInches === p.width && s.heightInches === p.height);
    setSelectedStandardSize(standardMatch ? standardMatch.id : "custom");

    updateParam("cfm", p.cfm);
    updateParam("w", p.width);
    updateParam("h", p.height);
    updateParam("d", p.depth);
    updateParam("merv", p.merv);
  };

  // Perform Calculation
  const output: FilterSizingOutput = useMemo(() => {
    const input: FilterSizingInput = {
      airflowCfm: cfm,
      filterWidthInches: filterWidth,
      filterHeightInches: filterHeight,
      filterDepthInches: filterDepth,
      filterCount,
      mervRating,
    };
    return calculateFilterSizing(input);
  }, [cfm, filterWidth, filterHeight, filterDepth, filterCount, mervRating]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = `System Airflow,${output.airflowCfm},"CFM"\nFilter Dimensions,"${output.filterDimensionsStr}",""\nFilter Count,${output.filterCount},""\nTotal Filter Face Area,${output.totalFaceAreaSqFt},"sq ft"\nFace Velocity,${output.faceVelocityFpm},"FPM"\nVelocity Status,"${output.velocityStatus}",""\nMERV Rating,"${mervRating}",""\nInitial Clean Static Pressure Drop,${output.initialCleanPressureDropInWg},"in. wg"\nEstimated Loaded Pressure Drop,${output.estimatedLoadedPressureDropInWg},"in. wg"\nPressure Drop Risk Status,"${output.pressureDropStatus}",""\nMax Recommended CFM (300/450 FPM limit),${output.recommendedMaxCfm},"CFM"\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `filter-sizing-${output.faceVelocityFpm}FPM-${mervRating}.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Filter Configurations">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Filter Scenarios:</span>
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
            title="Reset to 1-inch MERV 8 Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePresetSelect(p)}
            className={`preset-chip-btn ${cfm === p.cfm && filterDepth === p.depth && mervRating === p.merv ? "active" : ""}`}
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
          {/* SYSTEM CFM */}
          <div className="form-group" style={{ marginBottom: "0.5rem" }}>
            <label htmlFor="cfm-input">
              <span>System Airflow</span>
              <span className="unit-label">CFM (400 CFM / Ton)</span>
            </label>
            <input
              id="cfm-input"
              type="number"
              step={50}
              min={100}
              max={5000}
              value={cfm}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCfm(val);
                updateParam("cfm", val);
              }}
              className="input-number"
            />
          </div>

          {/* FILTER DIMENSIONS & DEPTH */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="size-select">
                <span>Filter Size</span>
                <span className="unit-label">WxH</span>
              </label>
              <select
                id="size-select"
                value={selectedStandardSize}
                onChange={(e) => handleStandardSizeChange(e.target.value)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                {STANDARD_FILTER_SIZES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
                <option value="custom">Custom Dimensions...</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="depth-select">
                <span>Media Depth</span>
                <span className="unit-label">Inches</span>
              </label>
              <select
                id="depth-select"
                value={filterDepth}
                onChange={(e) => {
                  const val = Number(e.target.value) as FilterDepthInches;
                  setFilterDepth(val);
                  updateParam("d", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={1}>1&quot; Standard Slot</option>
                <option value={2}>2&quot; Commercial</option>
                <option value={4}>4&quot; Deep Pleated Media</option>
                <option value={5}>5&quot; Whole-House Cleaner</option>
              </select>
            </div>
          </div>

          {/* CUSTOM DIMENSIONS (IF CUSTOM SELECTED) */}
          {selectedStandardSize === "custom" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-w">Width (Inches)</label>
                <input
                  id="custom-w"
                  type="number"
                  min={6}
                  max={48}
                  value={filterWidth}
                  onChange={(e) => setFilterWidth(Number(e.target.value))}
                  className="input-number"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-h">Height (Inches)</label>
                <input
                  id="custom-h"
                  type="number"
                  min={6}
                  max={48}
                  value={filterHeight}
                  onChange={(e) => setFilterHeight(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            </div>
          )}

          {/* MERV RATING & FILTER COUNT */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="merv-select">
                <span>MERV Efficiency</span>
                <span className="unit-label">ASHRAE 52.2</span>
              </label>
              <select
                id="merv-select"
                value={mervRating}
                onChange={(e) => {
                  const val = e.target.value as MervRating;
                  setMervRating(val);
                  updateParam("merv", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="merv_4">MERV 4 — Fiberglass Mesh (Low Resistance)</option>
                <option value="merv_8">MERV 8 — Standard Residential Pleated</option>
                <option value="merv_11">MERV 11 — High Allergy &amp; Pet Dander</option>
                <option value="merv_13">MERV 13 — ASHRAE 241 Virus / Wildfire Smoke</option>
                <option value="merv_16">MERV 16 — Hospital / Cleanroom Grade</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="count-select">
                <span>Filter Grilles</span>
                <span className="unit-label">Qty</span>
              </label>
              <select
                id="count-select"
                value={filterCount}
                onChange={(e) => setFilterCount(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={1}>1 Filter Slot</option>
                <option value={2}>2 Filter Grilles (Parallel)</option>
                <option value={3}>3 Filter Grilles</option>
                <option value={4}>4 Filter Grilles</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Filter Face Velocity and Pressure Drop Result">
            <div className="result-label">Initial Clean Static Pressure Drop</div>
            <div
              className="result-value"
              style={{
                color:
                  output.pressureDropStatus === "low_resistance"
                    ? "var(--accent-success)"
                    : output.pressureDropStatus === "moderate"
                    ? "var(--accent-cooling)"
                    : output.pressureDropStatus === "high_risk"
                    ? "#f97316"
                    : "var(--accent-danger)",
              }}
            >
              {output.initialCleanPressureDropInWg.toFixed(3)}&quot; w.g.
            </div>
            <div className="result-unit">
              Face Velocity: <strong>{output.faceVelocityFpm} FPM</strong> across {output.totalFaceAreaSqFt} sq ft ({output.filterDimensionsStr})
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
                  background:
                    output.pressureDropStatus === "low_resistance" || output.pressureDropStatus === "moderate"
                      ? "rgba(16, 185, 129, 0.12)"
                      : output.pressureDropStatus === "high_risk"
                      ? "rgba(249, 115, 22, 0.12)"
                      : "rgba(239, 68, 68, 0.12)",
                  color:
                    output.pressureDropStatus === "low_resistance" || output.pressureDropStatus === "moderate"
                      ? "var(--accent-success)"
                      : output.pressureDropStatus === "high_risk"
                      ? "#f97316"
                      : "var(--accent-danger)",
                  border: "1px solid currentColor",
                }}
              >
                {output.pressureDropStatus === "low_resistance"
                  ? "✓ Optimal Low Resistance (<0.10\" w.g. Drop)"
                  : output.pressureDropStatus === "moderate"
                  ? "✓ Normal Resistance (0.10\" to 0.18\" w.g.)"
                  : output.pressureDropStatus === "high_risk"
                  ? "⚠️ High Resistance (>0.18\" w.g.): Upgrade to 4\" media recommended"
                  : "⛔ Severe Choking (>0.28\" w.g.): High risk of ECM blower failure!"}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASHRAE Standard 52.2 (MERV)", "ACCA Manual D®", "ASHRAE Standard 241"]} />

          {/* REACTIVE VISUALIZER */}
          <FilterSizingVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Total Face Area</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.totalFaceAreaSqFt} sq ft
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Loaded Dirty Drop</div>
              <div className="item-value">~{output.estimatedLoadedPressureDropInWg.toFixed(3)}&quot; w.g.</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Max CFM (300/450 FPM)</div>
              <div className="item-value">{output.recommendedMaxCfm} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Face Velocity Status</div>
              <div className="item-value" style={{ textTransform: "capitalize" }}>
                {output.velocityStatus.replace("_", " ")}
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/filter-sizing-calculator"
            toolName="MERV Air Filter Sizing & Static Pressure Drop Sizer"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Airflow Distribution</div>
            <Link href="/calculators/duct-friction-loss-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Deduct Filter Drop ({output.initialCleanPressureDropInWg.toFixed(3)}&quot;) in Duct Friction Loss Sizer</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/cfm-calculator">
              <span>Calculate Total System Room CFM Requirements</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Filter Drop"
        value={`${output.initialCleanPressureDropInWg.toFixed(3)}" w.g.`}
        unit={`(${output.faceVelocityFpm} FPM)`}
      />
    </div>
  );
}
