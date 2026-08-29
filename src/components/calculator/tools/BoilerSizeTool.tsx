"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateBoilerSize,
  BoilerSizingMode,
  HeatingMedium,
  BoilerSizingInput,
  BoilerSizingOutput,
} from "@/lib/math/boiler";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { HydronicBoilerVisualizer } from "@/components/calculator/visualizers/HydronicBoilerVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  {
    label: "🏠 100 ft Baseboard (180°F / 95% Mod-Con)",
    mode: "baseboard" as BoilerSizingMode,
    medium: "hot_water" as HeatingMedium,
    baseboardFt: 100,
    waterTemp: 180,
    edr: 300,
    heatLoss: 55000,
    hasDhw: true,
    dhwPriority: true,
    afue: 95,
  },
  {
    label: "🏛️ 400 EDR Hot Water Radiators (84% Cast-Iron)",
    mode: "radiator_edr" as BoilerSizingMode,
    medium: "hot_water" as HeatingMedium,
    baseboardFt: 100,
    waterTemp: 180,
    edr: 400,
    heatLoss: 60000,
    hasDhw: false,
    dhwPriority: true,
    afue: 84,
  },
  {
    label: "💨 300 EDR Steam Radiators (82% Steam)",
    mode: "radiator_edr" as BoilerSizingMode,
    medium: "steam" as HeatingMedium,
    baseboardFt: 100,
    waterTemp: 215,
    edr: 300,
    heatLoss: 72000,
    hasDhw: false,
    dhwPriority: true,
    afue: 82,
  },
  {
    label: "❄️ 150 ft Low-Temp Baseboard (140°F Condensing)",
    mode: "baseboard" as BoilerSizingMode,
    medium: "hot_water" as HeatingMedium,
    baseboardFt: 150,
    waterTemp: 140,
    edr: 300,
    heatLoss: 50000,
    hasDhw: true,
    dhwPriority: true,
    afue: 96,
  },
];

export function BoilerSizeTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [mode, setMode] = useState<BoilerSizingMode>("baseboard");
  const [medium, setMedium] = useState<HeatingMedium>("hot_water");
  const [baseboardFeet, setBaseboardFeet] = useState<number>(100);
  const [waterTemp, setWaterTemp] = useState<number>(180);
  const [radiatorEdr, setRadiatorEdr] = useState<number>(300);
  const [heatLossBtu, setHeatLossBtu] = useState<number>(55000);
  const [hasDhw, setHasDhw] = useState<boolean>(true);
  const [dhwPriority, setDhwPriority] = useState<boolean>(true);
  const [boilerAfue, setBoilerAfue] = useState<number>(95);

  // Hydrate from URL
  useEffect(() => {
    const urlMode = getParam("mode", "baseboard") as BoilerSizingMode;
    const urlFeet = Number(getParam("feet", "100"));
    const urlEdr = Number(getParam("edr", "300"));
    const urlAfue = Number(getParam("afue", "95"));

    if (["baseboard", "radiator_edr", "heat_loss"].includes(urlMode)) setMode(urlMode);
    if (!isNaN(urlFeet) && urlFeet > 0) setBaseboardFeet(urlFeet);
    if (!isNaN(urlEdr) && urlEdr > 0) setRadiatorEdr(urlEdr);
    if (!isNaN(urlAfue) && urlAfue >= 80 && urlAfue <= 99) setBoilerAfue(urlAfue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setMode(preset.mode);
    setMedium(preset.medium);
    setBaseboardFeet(preset.baseboardFt);
    setWaterTemp(preset.waterTemp);
    setRadiatorEdr(preset.edr);
    setHeatLossBtu(preset.heatLoss);
    setHasDhw(preset.hasDhw);
    setDhwPriority(preset.dhwPriority);
    setBoilerAfue(preset.afue);

    updateParam("mode", preset.mode);
    updateParam("feet", preset.baseboardFt);
    updateParam("edr", preset.edr);
    updateParam("afue", preset.afue);
  };

  // Perform Calculation
  const output: BoilerSizingOutput = useMemo(() => {
    const input: BoilerSizingInput = {
      mode,
      heatingMedium: medium,
      baseboardLinearFeet: baseboardFeet,
      waterTempF: waterTemp,
      radiatorEdrSqFt: radiatorEdr,
      buildingHeatLossBtu: heatLossBtu,
      hasIndirectDhw: hasDhw,
      hasDhwPriority: dhwPriority,
      boilerAfuePercent: boilerAfue,
    };
    return calculateBoilerSize(input);
  }, [mode, medium, baseboardFeet, waterTemp, radiatorEdr, heatLossBtu, hasDhw, dhwPriority, boilerAfue]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = `Sizing Method,"${mode}",""\nHeating Medium,"${medium}",""\nConnected Emitter Load,${output.connectedEmitterLoadBtu},"BTU/hr"\nDHW Indirect Pickup Allowance,${output.dhwPickupBtu},"BTU/hr"\nTotal Net AHRI Load,${output.totalNetAhriLoadBtu},"BTU/hr"\nI=B=R Piping & Pickup Factor,${output.pipingAndPickupFactor},"x"\nGross DOE Heating Capacity,${output.grossDoeCapacityBtu},"BTU/hr"\nRecommended Boiler Fuel Input,${output.recommendedBoilerInputBtu},"BTU/hr Gross"\nEquivalent Power,${output.recommendedBoilerInputKw},"kW"\nBoiler Efficiency,${output.boilerAfuePercent},"%"\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `boiler-sizing-${output.recommendedBoilerInputBtu}btu.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Hydronic System Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Boiler Configurations:</span>
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
            title="Reset to 100 ft Baseboard Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${mode === preset.mode && boilerAfue === preset.afue && (mode === "baseboard" ? baseboardFeet === preset.baseboardFt : radiatorEdr === preset.edr) ? "active" : ""}`}
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
          {/* METHOD & MEDIUM SELECTORS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="boiler-mode-select">
                <span>Sizing Method</span>
                <span className="unit-label">Basis</span>
              </label>
              <select
                id="boiler-mode-select"
                value={mode}
                onChange={(e) => {
                  const val = e.target.value as BoilerSizingMode;
                  setMode(val);
                  updateParam("mode", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="baseboard">Fin-Tube Baseboard Footage</option>
                <option value="radiator_edr">Cast-Iron Radiator EDR</option>
                <option value="heat_loss">Whole-House Heat Loss</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="medium-select">
                <span>Heating Medium</span>
                <span className="unit-label">Type</span>
              </label>
              <select
                id="medium-select"
                value={medium}
                onChange={(e) => setMedium(e.target.value as HeatingMedium)}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="hot_water">Hydronic Hot Water</option>
                <option value="steam">Low-Pressure Steam</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC SIZING INPUTS */}
          {mode === "baseboard" && (
            <>
              <div className="form-group">
                <label htmlFor="baseboard-input">
                  <span>Total Baseboard Linear Footage</span>
                  <span className="unit-label">Linear Feet</span>
                </label>
                <div className="input-with-slider">
                  <input
                    id="baseboard-input"
                    type="number"
                    min={20}
                    max={500}
                    step={5}
                    value={baseboardFeet}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBaseboardFeet(val);
                      updateParam("feet", val);
                    }}
                    className="input-number"
                  />
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={5}
                    value={baseboardFeet}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBaseboardFeet(val);
                      updateParam("feet", val);
                    }}
                    className="input-range"
                    aria-label="Baseboard linear feet slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="water-temp-select">
                  <span>Average Water Temperature (AWT)</span>
                  <span className="unit-label">&deg;F Supply</span>
                </label>
                <select
                  id="water-temp-select"
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(Number(e.target.value))}
                  className="input-number"
                  style={{ cursor: "pointer" }}
                >
                  <option value={180}>180&deg;F AWT (Standard Cast-Iron @ 580 BTU/ft)</option>
                  <option value={160}>160&deg;F AWT (Mid-Efficiency @ 450 BTU/ft)</option>
                  <option value={140}>140&deg;F AWT (Mod-Con Condensing @ 330 BTU/ft)</option>
                  <option value={120}>120&deg;F AWT (Low-Temp Heat Pump @ 210 BTU/ft)</option>
                </select>
              </div>
            </>
          )}

          {mode === "radiator_edr" && (
            <div className="form-group">
              <label htmlFor="edr-input">
                <span>Total Radiator EDR</span>
                <span className="unit-label">Sq Ft EDR</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="edr-input"
                  type="number"
                  min={50}
                  max={1500}
                  step={10}
                  value={radiatorEdr}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRadiatorEdr(val);
                    updateParam("edr", val);
                  }}
                  className="input-number"
                />
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={10}
                  value={radiatorEdr}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRadiatorEdr(val);
                    updateParam("edr", val);
                  }}
                  className="input-range"
                  aria-label="Radiator EDR slider"
                />
              </div>
            </div>
          )}

          {mode === "heat_loss" && (
            <div className="form-group">
              <label htmlFor="heat-loss-input">
                <span>Calculated Peak Heat Loss</span>
                <span className="unit-label">BTU/hr</span>
              </label>
              <input
                id="heat-loss-input"
                type="number"
                min={15000}
                max={300000}
                step={5000}
                value={heatLossBtu}
                onChange={(e) => setHeatLossBtu(Number(e.target.value))}
                className="input-number"
              />
            </div>
          )}

          {/* DOMESTIC HOT WATER (DHW) CONTROLS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="dhw-toggle">
                <span>Indirect DHW Tank</span>
                <span className="unit-label">Water Heater</span>
              </label>
              <select
                id="dhw-toggle"
                value={hasDhw ? "yes" : "no"}
                onChange={(e) => setHasDhw(e.target.value === "yes")}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="yes">Yes (Indirect Tank)</option>
                <option value="no">No (Standalone HW)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="dhw-priority-toggle">
                <span>DHW Priority Relay</span>
                <span className="unit-label">Controller</span>
              </label>
              <select
                id="dhw-priority-toggle"
                disabled={!hasDhw}
                value={dhwPriority ? "yes" : "no"}
                onChange={(e) => setDhwPriority(e.target.value === "yes")}
                className="input-number"
                style={{ cursor: hasDhw ? "pointer" : "not-allowed", opacity: hasDhw ? 1 : 0.5 }}
              >
                <option value="yes">Priority ON (0 BTU adder)</option>
                <option value="no">Priority OFF (+35k BTU)</option>
              </select>
            </div>
          </div>

          {/* BOILER EFFICIENCY AFUE */}
          <div className="form-group">
            <label htmlFor="boiler-afue-input">
              <span>Boiler AFUE Efficiency</span>
              <span className="unit-label">% AFUE</span>
            </label>
            <select
              id="boiler-afue-input"
              value={boilerAfue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setBoilerAfue(val);
                updateParam("afue", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value={95}>95% AFUE (Mod-Con Wall-Hung Condensing)</option>
              <option value={90}>90% AFUE (High-Efficiency Condensing)</option>
              <option value={84}>84% AFUE (Standard Cast-Iron Water)</option>
              <option value={82}>82% AFUE (Atmospheric Draft / Steam)</option>
            </select>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Boiler Size Calculation Result">
            <div className="result-label">Recommended Boiler Gross Input</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.recommendedBoilerInputBtu.toLocaleString()} BTU/hr
            </div>
            <div className="result-unit">
              DOE Heating Output: <strong>{output.grossDoeCapacityBtu.toLocaleString()} BTU/hr</strong> ({output.recommendedBoilerInputKw} kW)
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
                  background: output.isCondensingEligible ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 107, 0, 0.12)",
                  color: output.isCondensingEligible ? "var(--accent-success)" : "var(--accent-heating)",
                  border: "1px solid currentColor",
                }}
              >
                {output.isCondensingEligible ? "✓ Continuous Flue Condensing Mode (95%+ AFUE)" : "Standard Non-Condensing Operating Mode"}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["AHRI Hydronics (I=B=R)", "ASME Boiler Code", "ACCA Manual S®"]} />

          {/* HYDRONIC LOOP SVG VISUALIZER */}
          <HydronicBoilerVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Connected Emitters</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.connectedEmitterLoadBtu.toLocaleString()} BTU/hr
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Total AHRI Net Load</div>
              <div className="item-value">{output.totalNetAhriLoadBtu.toLocaleString()} BTU/hr</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">I=B=R Piping Factor</div>
              <div className="item-value">{output.pipingAndPickupFactor}x Multiplier</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">DOE Gross Output</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.grossDoeCapacityBtu.toLocaleString()} BTU/hr
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/boiler-size-calculator"
            toolName="Hydronic Boiler & Baseboard Sizing Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Heating Systems Engineering</div>
            <Link href="/calculators/heat-loss-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Verify Boiler Sizing with Whole-Building Manual J Heat Loss</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/furnace-size-calculator">
              <span>Compare Hydronic Boilers vs Forced-Air Furnaces</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Boiler Size"
        value={`${output.recommendedBoilerInputBtu.toLocaleString()} BTU`}
        unit={`(${output.recommendedBoilerInputKw} kW)`}
      />
    </div>
  );
}
