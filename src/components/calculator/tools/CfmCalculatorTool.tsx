"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  CfmCalculationMode,
  calculateCfmFromDuctVelocity,
  calculateCfmFromThermalLoad,
  calculateCfmFromRoomAch,
  calculateCfmFromTonnage,
  calculateCfmFromElectricHeat,
  ACH_PRESETS,
  CFM_PER_TON_PRESETS,
  CfmCalculationResult,
} from "@/lib/math/cfm";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { CfmAirflowVisualizer } from "@/components/calculator/visualizers/CfmAirflowVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

export function CfmCalculatorTool() {
  const { getParam, updateParam } = useHydrateParams();

  // Active Mode State
  const [mode, setMode] = useState<CfmCalculationMode>("duct-velocity");

  // Mode 1: Duct & Velocity
  const [shape, setShape] = useState<"round" | "rectangular">("round");
  const [diameter, setDiameter] = useState<number>(8);
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(8);
  const [velocityFpm, setVelocityFpm] = useState<number>(800);

  // Mode 2: Thermal Load
  const [sensibleBtu, setSensibleBtu] = useState<number>(24000);
  const [deltaT, setDeltaT] = useState<number>(20);

  // Mode 3: Room ACH
  const [roomLength, setRoomLength] = useState<number>(20);
  const [roomWidth, setRoomWidth] = useState<number>(15);
  const [roomHeight, setRoomHeight] = useState<number>(9);
  const [ach, setAch] = useState<number>(5);

  // Mode 4: Tonnage
  const [tonnage, setTonnage] = useState<number>(3.0);
  const [cfmPerTon, setCfmPerTon] = useState<number>(400);

  // Mode 5: Electric Heat
  const [heatKw, setHeatKw] = useState<number>(10);
  const [heatDeltaT, setHeatDeltaT] = useState<number>(40);

  // Hydrate from URL
  useEffect(() => {
    const urlMode = getParam("mode", "duct-velocity") as CfmCalculationMode;
    const urlDiameter = Number(getParam("diameter", "8"));
    const urlVelocity = Number(getParam("velocity", "800"));
    const urlTonnage = Number(getParam("tonnage", "3"));

    if (urlMode) setMode(urlMode);
    if (!isNaN(urlDiameter) && urlDiameter > 0) setDiameter(urlDiameter);
    if (!isNaN(urlVelocity) && urlVelocity > 0) setVelocityFpm(urlVelocity);
    if (!isNaN(urlTonnage) && urlTonnage > 0) setTonnage(urlTonnage);
  }, [getParam]);

  const handleModeSwitch = (newMode: CfmCalculationMode) => {
    setMode(newMode);
    updateParam("mode", newMode);
  };

  // Perform Calculation based on active mode
  const result: CfmCalculationResult = useMemo(() => {
    switch (mode) {
      case "duct-velocity":
        return calculateCfmFromDuctVelocity({
          shape,
          diameterInches: diameter,
          widthInches: width,
          heightInches: height,
          velocityFpm,
        });
      case "thermal-load":
        return calculateCfmFromThermalLoad({
          sensibleBtuPerHour: sensibleBtu,
          temperatureDeltaF: deltaT,
        });
      case "room-ach":
        return calculateCfmFromRoomAch({
          lengthFeet: roomLength,
          widthFeet: roomWidth,
          heightFeet: roomHeight,
          airChangesPerHour: ach,
        });
      case "tonnage":
        return calculateCfmFromTonnage({
          coolingTons: tonnage,
          cfmPerTon,
        });
      case "electric-heat":
        return calculateCfmFromElectricHeat({
          kilowatts: heatKw,
          temperatureDeltaF: heatDeltaT,
        });
      default:
        return calculateCfmFromDuctVelocity({ shape: "round", diameterInches: 8, velocityFpm: 800 });
    }
  }, [mode, shape, diameter, width, height, velocityFpm, sensibleBtu, deltaT, roomLength, roomWidth, roomHeight, ach, tonnage, cfmPerTon, heatKw, heatDeltaT]);

  const handleExportCsv = () => {
    const headers = "Mode,Calculated CFM,Acoustic Rating,Explanation\n";
    const row = `"${result.mode}",${result.cfm},"${result.velocityCategory || "N/A"}","${result.explanation}"\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cfm-airflow-${result.cfm}cfm.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* 5-MODE CALCULATION TAB SWITCHER */}
      <div
        role="tablist"
        aria-label="CFM Calculation Mode Switcher"
        style={{
          display: "flex",
          gap: "0.4rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {[
          { id: "duct-velocity", label: "📏 Duct & Velocity (FPM)" },
          { id: "thermal-load", label: "🔥 Thermal Load (BTU)" },
          { id: "room-ach", label: "🏠 Room Volume & ACH" },
          { id: "tonnage", label: "❄️ AC Tonnage (400 CFM/ton)" },
          { id: "electric-heat", label: "⚡ Electric Heat Strip" },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => handleModeSwitch(tab.id as CfmCalculationMode)}
            className={`preset-chip-btn ${mode === tab.id ? "active" : ""}`}
            type="button"
            style={{ whiteSpace: "nowrap" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          {/* MODE 1: DUCT & VELOCITY */}
          {mode === "duct-velocity" && (
            <>
              <div className="form-group">
                <label>
                  <span>Duct Shape</span>
                  <span className="unit-label">Profile</span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className={`preset-chip-btn ${shape === "round" ? "active" : ""}`}
                    onClick={() => setShape("round")}
                    style={{ flex: 1 }}
                  >
                    Ø Round Duct
                  </button>
                  <button
                    type="button"
                    className={`preset-chip-btn ${shape === "rectangular" ? "active" : ""}`}
                    onClick={() => setShape("rectangular")}
                    style={{ flex: 1 }}
                  >
                    ▭ Rectangular Duct
                  </button>
                </div>
              </div>

              {shape === "round" ? (
                <div className="form-group">
                  <label htmlFor="diameter-input">
                    <span>Round Duct Diameter</span>
                    <span className="unit-label">Inches (&Oslash;)</span>
                  </label>
                  <div className="input-with-slider">
                    <input
                      id="diameter-input"
                      type="number"
                      min={4}
                      max={36}
                      step={1}
                      value={diameter}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setDiameter(val);
                        updateParam("diameter", val);
                      }}
                      className="input-number"
                    />
                    <input
                      type="range"
                      min={4}
                      max={36}
                      step={1}
                      value={diameter}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setDiameter(val);
                        updateParam("diameter", val);
                      }}
                      className="input-range"
                      aria-label="Round duct diameter slider"
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div className="form-group">
                    <label htmlFor="width-input">
                      <span>Width</span>
                      <span className="unit-label">Inches</span>
                    </label>
                    <input
                      id="width-input"
                      type="number"
                      min={4}
                      max={48}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="input-number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="height-input">
                      <span>Height</span>
                      <span className="unit-label">Inches</span>
                    </label>
                    <input
                      id="height-input"
                      type="number"
                      min={4}
                      max={36}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="input-number"
                    />
                  </div>
                </div>
              )}

              {/* Air Velocity */}
              <div className="form-group">
                <label htmlFor="velocity-input">
                  <span>Airflow Velocity</span>
                  <span className="unit-label">Feet Per Minute (FPM)</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="velocity-input"
                    type="number"
                    min={200}
                    max={2500}
                    step={25}
                    value={velocityFpm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVelocityFpm(val);
                      updateParam("velocity", val);
                    }}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={200}
                    max={2500}
                    step={25}
                    value={velocityFpm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVelocityFpm(val);
                      updateParam("velocity", val);
                    }}
                    className="input-range"
                    aria-label="Airflow velocity slider"
                  />
                </div>
                <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    { label: "Quiet Trunk (600 FPM)", val: 600 },
                    { label: "Standard Branch (800 FPM)", val: 800 },
                    { label: "Main Supply (1,000 FPM)", val: 1000 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setVelocityFpm(preset.val);
                        updateParam("velocity", preset.val);
                      }}
                      style={{
                        background: velocityFpm === preset.val ? "var(--accent-cooling)" : "var(--surface)",
                        color: velocityFpm === preset.val ? "#000" : "var(--ink-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "4px",
                        padding: "0.15rem 0.45rem",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* MODE 2: THERMAL LOAD */}
          {mode === "thermal-load" && (
            <>
              <div className="form-group">
                <label htmlFor="btu-input">
                  <span>Sensible Heat Load (Q)</span>
                  <span className="unit-label">BTU/hr</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="btu-input"
                    type="number"
                    min={1000}
                    max={120000}
                    step={1000}
                    value={sensibleBtu}
                    onChange={(e) => setSensibleBtu(Number(e.target.value))}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={1000}
                    max={120000}
                    step={1000}
                    value={sensibleBtu}
                    onChange={(e) => setSensibleBtu(Number(e.target.value))}
                    className="input-range"
                    aria-label="Sensible heat load slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="deltat-input">
                  <span>Supply-to-Return Temperature Split (&Delta;T)</span>
                  <span className="unit-label">&deg;F Delta</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="deltat-input"
                    type="number"
                    min={10}
                    max={80}
                    step={1}
                    value={deltaT}
                    onChange={(e) => setDeltaT(Number(e.target.value))}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={1}
                    value={deltaT}
                    onChange={(e) => setDeltaT(Number(e.target.value))}
                    className="input-range"
                    aria-label="Temperature split slider"
                  />
                </div>
                <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.4rem" }}>
                  <button type="button" onClick={() => setDeltaT(20)} className="preset-chip-btn" style={{ fontSize: "0.7rem" }}>
                    ❄️ AC Cooling (20°F ΔT)
                  </button>
                  <button type="button" onClick={() => setDeltaT(45)} className="preset-chip-btn" style={{ fontSize: "0.7rem" }}>
                    🔥 Gas Furnace (45°F ΔT)
                  </button>
                </div>
              </div>
            </>
          )}

          {/* MODE 3: ROOM ACH */}
          {mode === "room-ach" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                <div className="form-group">
                  <label htmlFor="length-input">
                    <span>Length</span>
                    <span className="unit-label">Ft</span>
                  </label>
                  <input
                    id="length-input"
                    type="number"
                    min={5}
                    max={100}
                    value={roomLength}
                    onChange={(e) => setRoomLength(Number(e.target.value))}
                    className="input-number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="room-width-input">
                    <span>Width</span>
                    <span className="unit-label">Ft</span>
                  </label>
                  <input
                    id="room-width-input"
                    type="number"
                    min={5}
                    max={100}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(Number(e.target.value))}
                    className="input-number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="room-height-input">
                    <span>Ceiling</span>
                    <span className="unit-label">Ft</span>
                  </label>
                  <input
                    id="room-height-input"
                    type="number"
                    min={7}
                    max={30}
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(Number(e.target.value))}
                    className="input-number"
                  />
                </div>
              </div>

              {/* ACH Target */}
              <div className="form-group">
                <label htmlFor="ach-select">
                  <span>Air Changes Per Hour (ACH)</span>
                  <span className="unit-label">Standard</span>
                </label>
                <select
                  id="ach-select"
                  value={ach}
                  onChange={(e) => setAch(Number(e.target.value))}
                  className="input-number"
                  style={{ cursor: "pointer" }}
                >
                  {ACH_PRESETS.map((p) => (
                    <option key={p.label} value={p.ach}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* MODE 4: TONNAGE */}
          {mode === "tonnage" && (
            <>
              <div className="form-group">
                <label htmlFor="tonnage-input">
                  <span>Nominal AC Cooling Tonnage</span>
                  <span className="unit-label">Tons</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="tonnage-input"
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={tonnage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTonnage(val);
                      updateParam("tonnage", val);
                    }}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={0.5}
                    value={tonnage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTonnage(val);
                      updateParam("tonnage", val);
                    }}
                    className="input-range"
                    aria-label="AC Tonnage slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cfm-rate-select">
                  <span>Climate Airflow Standard</span>
                  <span className="unit-label">Rate</span>
                </label>
                <select
                  id="cfm-rate-select"
                  value={cfmPerTon}
                  onChange={(e) => setCfmPerTon(Number(e.target.value))}
                  className="input-number"
                  style={{ cursor: "pointer" }}
                >
                  {CFM_PER_TON_PRESETS.map((p) => (
                    <option key={p.label} value={p.rate}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* MODE 5: ELECTRIC HEAT */}
          {mode === "electric-heat" && (
            <>
              <div className="form-group">
                <label htmlFor="kw-input">
                  <span>Electric Strip Capacity</span>
                  <span className="unit-label">Kilowatts (kW)</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="kw-input"
                    type="number"
                    min={2}
                    max={30}
                    step={1}
                    value={heatKw}
                    onChange={(e) => setHeatKw(Number(e.target.value))}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={2}
                    max={30}
                    step={1}
                    value={heatKw}
                    onChange={(e) => setHeatKw(Number(e.target.value))}
                    className="input-range"
                    aria-label="Electric heat kW slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="heat-delta-input">
                  <span>Target Temperature Rise</span>
                  <span className="unit-label">&deg;F Delta</span>
                </label>
                <input
                  id="heat-delta-input"
                  type="number"
                  min={20}
                  max={70}
                  step={1}
                  value={heatDeltaT}
                  onChange={(e) => setHeatDeltaT(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            </>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="CFM Airflow Sizing Result">
            <div className="result-label">Required Airflow Volume</div>
            <div className="result-value">{result.cfm.toLocaleString()} CFM</div>
            <div className="result-unit">
              Cubic Feet Per Minute ({(result.cfm * 1.699).toFixed(0)} m&sup3;/h metric)
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
                Equivalent Cooling: ~{(result.cfm / 400).toFixed(1)} Tons Capacity
              </span>
            </div>
          </div>

          {/* REACTIVE VISUALIZER */}
          <CfmAirflowVisualizer result={result} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Air Velocity Limit</div>
              <div className="item-value" style={{ fontSize: "1.05rem" }}>
                {result.velocityFpm ? `${result.velocityFpm} FPM` : "Standard Branch"}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Acoustic Comfort</div>
              <div className="item-value" style={{ fontSize: "1.05rem" }}>
                {result.velocityCategory === "whisper"
                  ? "🟢 Whisper (<600)"
                  : result.velocityCategory === "noisy"
                  ? "🟠 Moderate (900-1200)"
                  : result.velocityCategory === "excessive"
                  ? "🔴 Excessive (>1200)"
                  : "🟡 Standard (600-900)"}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Air Turnover Cycle</div>
              <div className="item-value" style={{ fontSize: "1.05rem" }}>
                {result.airTurnoverMinutes ? `${result.airTurnoverMinutes} Mins` : "Continuous"}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Calculation Mode</div>
              <div className="item-value" style={{ fontSize: "0.95rem", textTransform: "capitalize" }}>
                {mode.replace("-", " ")}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/cfm-calculator"
            toolName="HVAC CFM & Airflow Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Sizing &amp; Design</div>
            <Link href={`/calculators/ductulator?cfm=${result.cfm}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Ductwork for {result.cfm.toLocaleString()} CFM (Digital Ductulator)</span>
              <span>→</span>
            </Link>
            <Link href={`/calculators/ac-tonnage-calculator?tons=${(result.cfm / 400).toFixed(1)}`}>
              <span>Calculate Required AC Equipment Tonnage</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE RESULT BAR */}
      <MobileResultBar
        label="Required Airflow"
        value={`${result.cfm.toLocaleString()} CFM`}
        unit={`(~${(result.cfm / 400).toFixed(1)} Tons)`}
      />
    </div>
  );
}
