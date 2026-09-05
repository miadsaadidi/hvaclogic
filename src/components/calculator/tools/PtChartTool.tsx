"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  REFRIGERANTS,
  RefrigerantMeta,
  solveRefrigerantPt,
  generatePtMatrix,
  PressureUnit,
  TemperatureUnit,
  SaturationCurveType,
  PtLookupOutput,
} from "@/lib/math/pt-chart";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { RefrigerantGaugeVisualizer } from "@/components/calculator/visualizers/RefrigerantGaugeVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

export function PtChartTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [selectedRef, setSelectedRef] = useState<string>("r454b");
  const [lookupMode, setLookupMode] = useState<"pressure_to_temp" | "temp_to_pressure">("pressure_to_temp");
  const [pressureVal, setPressureVal] = useState<number>(118);
  const [tempVal, setTempVal] = useState<number>(40);
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>("psig");
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>("F");
  const [curveType, setCurveType] = useState<SaturationCurveType>("dew");

  // Hydrate from URL
  useEffect(() => {
    const rawRef = getParam("ref", "r454b");
    const urlRef = (rawRef || "r454b").toLowerCase();
    const urlPress = Number(getParam("psig", "118"));
    const urlTemp = Number(getParam("temp", "40"));
    const urlMode = getParam("mode", "pressure_to_temp");

    if (REFRIGERANTS[urlRef]) setSelectedRef(urlRef);
    if (!isNaN(urlPress) && urlPress >= 0) setPressureVal(urlPress);
    if (!isNaN(urlTemp)) setTempVal(urlTemp);
    if (urlMode === "pressure_to_temp" || urlMode === "temp_to_pressure") setLookupMode(urlMode);
  }, [getParam]);

  const handleRefChange = (refId: string) => {
    setSelectedRef(refId);
    updateParam("ref", refId);
  };

  const handlePressureChange = (val: number) => {
    setPressureVal(val);
    updateParam("psig", val);
  };

  const handleTempChange = (val: number) => {
    setTempVal(val);
    updateParam("temp", val);
  };

  // Perform Calculation
  const output: PtLookupOutput = useMemo(() => {
    return solveRefrigerantPt({
      refrigerantId: selectedRef,
      lookupMode,
      inputValue: lookupMode === "pressure_to_temp" ? pressureVal : tempVal,
      pressureUnit,
      temperatureUnit: tempUnit,
      curveType,
    });
  }, [selectedRef, lookupMode, pressureVal, tempVal, pressureUnit, tempUnit, curveType]);

  // Full PT Reference Table
  const tableRows = useMemo(() => generatePtMatrix(selectedRef), [selectedRef]);

  const handleExportCsv = () => {
    const headers = "Refrigerant,Temperature (°F),Temperature (°C),Pressure (PSIG),Pressure (Bar),Bubble Temp (°F),Dew Temp (°F)\n";
    const rows = tableRows
      .map(
        (r) =>
          `"${output.refrigerant.name}",${r.tempF},${r.tempC},${r.pressurePsig},${r.pressureBar},${r.bubbleTempF || ""},${r.dewTempF || ""}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedRef}-pt-chart-matrix.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* REFRIGERANT SELECTOR CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Refrigerant Type Selector">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Select Refrigerant:</span>
          <button
            type="button"
            onClick={() => handleRefChange("r454b")}
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
            title="Reset to R-454B Next-Gen Default"
          >
            ↺ Reset R-454B (A2L)
          </button>
        </div>

        {(Object.values(REFRIGERANTS) as RefrigerantMeta[]).map((r) => (
          <button
            key={r.id}
            onClick={() => handleRefChange(r.id)}
            className={`preset-chip-btn ${selectedRef === r.id ? "active" : ""}`}
            type="button"
            style={r.safetyClass === "A2L" ? { borderColor: "rgba(16, 185, 129, 0.4)", fontWeight: 700 } : {}}
          >
            {r.id.toUpperCase()} {r.safetyClass === "A2L" ? "⚡ (A2L)" : ""}
          </button>
        ))}
      </div>

      {/* QUICK PRESET SCENARIOS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0.5rem 0 1rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--ink-secondary)", textTransform: "uppercase" }}>Quick Presets:</span>
        <button
          type="button"
          onClick={() => {
            handleRefChange("r454b");
            setLookupMode("pressure_to_temp");
            setCurveType("dew");
            handlePressureChange(115.5);
          }}
          className="preset-chip-btn"
          style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
        >
          ❄️ R-454B Evaporator (40°F / 115.5 psig)
        </button>
        <button
          type="button"
          onClick={() => {
            handleRefChange("r454b");
            setLookupMode("pressure_to_temp");
            setCurveType("bubble");
            handlePressureChange(365.2);
          }}
          className="preset-chip-btn"
          style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
        >
          🔥 R-454B Condenser (110°F / 365.2 psig)
        </button>
        <button
          type="button"
          onClick={() => {
            handleRefChange("r32");
            setLookupMode("pressure_to_temp");
            handlePressureChange(119.0);
          }}
          className="preset-chip-btn"
          style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
        >
          ⚡ R-32 Evaporator (40°F / 119.0 psig)
        </button>
        <button
          type="button"
          onClick={() => {
            handleRefChange("r410a");
            setLookupMode("pressure_to_temp");
            handlePressureChange(118.0);
          }}
          className="preset-chip-btn"
          style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}
        >
          🏢 R-410A Baseline (40°F / 118.0 psig)
        </button>
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          <CalculatorTrustPill />
          {/* LOOKUP MODE TOGGLE */}
          <div style={{ display: "flex", gap: "0.45rem", marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={() => {
                setLookupMode("pressure_to_temp");
                updateParam("mode", "pressure_to_temp");
              }}
              className={`preset-chip-btn ${lookupMode === "pressure_to_temp" ? "active" : ""}`}
              style={{ flex: 1, padding: "0.45rem 0.6rem" }}
            >
              Pressure → Sat. Temp
            </button>
            <button
              type="button"
              onClick={() => {
                setLookupMode("temp_to_pressure");
                updateParam("mode", "temp_to_pressure");
              }}
              className={`preset-chip-btn ${lookupMode === "temp_to_pressure" ? "active" : ""}`}
              style={{ flex: 1, padding: "0.45rem 0.6rem" }}
            >
              Sat. Temp → Pressure
            </button>
          </div>

          {/* PRIMARY INPUT (PRESSURE OR TEMPERATURE) */}
          {lookupMode === "pressure_to_temp" ? (
            <div className="form-group">
              <label htmlFor="pressure-input">
                <span>Manifold Vapor/Liquid Pressure</span>
                <span className="unit-label">{pressureUnit.toUpperCase()}</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="pressure-input"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={650}
                  step={0.5}
                  value={pressureVal}
                  onChange={(e) => handlePressureChange(Number(e.target.value))}
                  className="input-number"
                />
                <input
                  type="range"
                  min={0}
                  max={550}
                  step={1}
                  value={Math.min(550, pressureVal)}
                  onChange={(e) => handlePressureChange(Number(e.target.value))}
                  className="input-range"
                  aria-label="Refrigerant pressure gauge slider"
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="temp-input">
                <span>Target Saturation Temperature</span>
                <span className="unit-label">&deg;{tempUnit}</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="temp-input"
                  type="number"
                  inputMode="decimal"
                  min={-40}
                  max={160}
                  step={0.5}
                  value={tempVal}
                  onChange={(e) => handleTempChange(Number(e.target.value))}
                  className="input-number"
                />
                <input
                  type="range"
                  min={-20}
                  max={140}
                  step={1}
                  value={tempVal}
                  onChange={(e) => handleTempChange(Number(e.target.value))}
                  className="input-range"
                  aria-label="Refrigerant saturation temperature slider"
                />
              </div>
            </div>
          )}

          {/* UNIT SELECTORS & BUBBLE/DEW CURVE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group">
              <label htmlFor="pressure-unit-select">
                <span>Pressure Unit</span>
                <span className="unit-label">System</span>
              </label>
              <select
                id="pressure-unit-select"
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value as PressureUnit)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="psig">PSIG (Gauge)</option>
                <option value="psia">PSIA (Absolute)</option>
                <option value="bar">Bar (Metric)</option>
                <option value="kPa">kPa (Metric)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="temp-unit-select">
                <span>Temp Unit</span>
                <span className="unit-label">Scale</span>
              </label>
              <select
                id="temp-unit-select"
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value as TemperatureUnit)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="F">&deg;F (Fahrenheit)</option>
                <option value="C">&deg;C (Celsius)</option>
              </select>
            </div>
          </div>

          {/* BUBBLE VS DEW POINT SELECTOR (IF HAS GLIDE) */}
          {output.refrigerant.hasGlide && (
            <div className="form-group" style={{ marginTop: "0.25rem" }}>
              <label htmlFor="curve-select">
                <span>Zeotropic Glide Curve</span>
                <span className="unit-label">NIST REFPROP</span>
              </label>
              <select
                id="curve-select"
                value={curveType}
                onChange={(e) => setCurveType(e.target.value as SaturationCurveType)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="dew">Dew Point Curve (Vapor / Superheat)</option>
                <option value="bubble">Bubble Point Curve (Liquid / Subcooling)</option>
              </select>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.25rem", display: "block" }}>
                {output.refrigerant.name} has a <strong>{output.refrigerant.glideF}&deg;F temperature glide</strong>. Use Dew Point for Superheat and Bubble Point for Subcooling.
              </span>
            </div>
          )}

          {/* A2L SAFETY ALERT */}
          {output.warningNotice && (
            <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "0.5rem", padding: "0.75rem", marginTop: "0.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "#f59e0b", lineHeight: 1.45 }}>
                {output.warningNotice}
              </div>
            </div>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Refrigerant Saturation Result">
            <div className="result-label">
              {lookupMode === "pressure_to_temp"
                ? `${output.refrigerant.name} Saturation Temp`
                : `${output.refrigerant.name} Saturation Pressure`}
            </div>
            <div className="result-value">
              {lookupMode === "pressure_to_temp"
                ? `${output.satTempF}°F / ${output.satTempC}°C`
                : `${output.pressurePsig} PSIG`}
            </div>
            <div className="result-unit">
              At <strong>{output.pressurePsig} PSIG</strong> ({output.pressureBar} bar / {output.pressurePsia} psia)
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
                {output.operatingPhase}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["NIST REFPROP V10", "EPA Section 608", "ASHRAE Standard 34"]} />

          {/* MANIFOLD GAUGE VISUALIZER */}
          <RefrigerantGaugeVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Absolute Pressure</div>
              <div className="item-value">{output.pressurePsia} PSIA</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Metric Pressure</div>
              <div className="item-value">{output.pressureBar} BAR</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Safety Group</div>
              <div className="item-value" style={{ color: output.refrigerant.safetyClass === "A2L" ? "#f59e0b" : "var(--accent-success)" }}>
                ASHRAE {output.refrigerant.safetyClass}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Global Warming Pot.</div>
              <div className="item-value">{output.refrigerant.gwp} GWP</div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/pt-chart"
            toolName="Digital Refrigerant Pressure-Temperature Chart"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Charging Diagnostics</div>
            <Link href={`/calculators/superheat-subcooling-calculator?ref=${output.refrigerant.id}`} style={{ marginBottom: "0.5rem" }}>
              <span>Diagnose TXV Subcooling &amp; Fixed Orifice Superheat ({output.refrigerant.id.toUpperCase()})</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/refrigerant-charge-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate Refrigerant Line Set Weigh-In Charge Adjustment</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/ac-model-decoder">
              <span>Decode Air Conditioner Data Plate &amp; Factory Charge</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FULL REFERENCE PT LOOKUP TABLE */}
      <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
              📊 Complete {output.refrigerant.name} Pressure-Temperature Table
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              High-precision saturation properties across standard operating temperatures. Click any row to load into gauge.
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

        <div style={{ marginTop: "1rem", marginBottom: "1.25rem", padding: "1rem 1.25rem", borderRadius: "0.65rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", fontSize: "0.82rem" }}>
          <div style={{ fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
            <span>🔧</span>
            <span>A2L EPA 608 Zeotropic Glide Diagnostic Notice:</span>
          </div>
          <p style={{ margin: 0, color: "var(--ink)", lineHeight: 1.5 }}>
            For R-454B systems, always calculate <strong>Subcooling using the Bubble Point</strong> and <strong>Superheat using the Dew Point</strong> to avoid the 2.2°F diagnostic charging error. Read the comprehensive <Link href="/field-diagnostics" style={{ color: "#10b981", fontWeight: 700, textDecoration: "underline" }}>Field Diagnostics &amp; A2L Transition Master Guide →</Link>
          </p>
        </div>

        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Temp (&deg;F)</th>
                <th scope="col">Temp (&deg;C)</th>
                <th scope="col" style={{ color: "var(--accent-cooling)" }}>Saturation Pressure (PSIG)</th>
                <th scope="col">Metric (Bar)</th>
                {output.refrigerant.hasGlide && <th scope="col">Bubble Temp (&deg;F)</th>}
                {output.refrigerant.hasGlide && <th scope="col">Glide (&deg;F)</th>}
                <th scope="col">Typical Operating Zone</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((r) => {
                const isSelected = Math.abs(r.tempF - output.satTempF) < 2.5;

                return (
                  <tr
                    key={r.tempF}
                    onClick={() => {
                      setLookupMode("temp_to_pressure");
                      setTempVal(r.tempF);
                      updateParam("temp", r.tempF);
                      updateParam("mode", "temp_to_pressure");
                    }}
                    style={{
                      cursor: "pointer",
                      background: isSelected ? "rgba(0, 210, 255, 0.12)" : undefined,
                      transition: "background 100ms ease",
                    }}
                  >
                    <td><strong>{r.tempF}&deg;F</strong></td>
                    <td>{r.tempC}&deg;C</td>
                    <td style={{ color: "var(--accent-cooling)", fontWeight: 700 }}>{r.pressurePsig} PSIG</td>
                    <td>{r.pressureBar} bar</td>
                    {output.refrigerant.hasGlide && <td>{r.bubbleTempF || "-"}</td>}
                    {output.refrigerant.hasGlide && <td>{r.glideF || "-"}</td>}
                    <td style={{ fontSize: "0.78rem", color: "var(--ink-secondary)" }}>
                      {r.tempF < 30 ? "Heat Pump Evaporator" : r.tempF <= 55 ? "AC Evaporator (Low Side)" : "Condenser (High Side)"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label={`${output.refrigerant.id.toUpperCase()} Sat. Temp`}
        value={`${output.satTempF}°F`}
        unit={`(@ ${output.pressurePsig} PSIG)`}
      />
    </div>
  );
}
