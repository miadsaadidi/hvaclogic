"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculatePsychrometrics,
  PsychrometricOutput,
} from "@/lib/math/psychrometric";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { PsychrometricVisualizer } from "@/components/calculator/visualizers/PsychrometricVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

type InputMode = "db_rh" | "db_wb" | "db_dp";

const PSYCH_PRESETS = [
  { label: "🏠 Standard Comfort (75°F / 50% RH)", mode: "db_rh" as InputMode, db: 75, rh: 50, wb: 62.5, dp: 55, alt: 0 },
  { label: "❄️ AC Entering Coil (80°F DB / 67°F WB)", mode: "db_wb" as InputMode, db: 80, rh: 51, wb: 67, dp: 60, alt: 0 },
  { label: "☀️ Summer Outdoor (95°F / 40% RH)", mode: "db_rh" as InputMode, db: 95, rh: 40, wb: 75, dp: 68, alt: 0 },
  { label: "🏔️ Mile High Denver (75°F / 5,280 ft)", mode: "db_rh" as InputMode, db: 75, rh: 50, wb: 62.5, dp: 55, alt: 5280 },
];

const ELEVATION_PRESETS = [
  { label: "Sea Level (0 ft)", alt: 0 },
  { label: "Denver (5,280 ft)", alt: 5280 },
  { label: "Mexico City (7,350 ft)", alt: 7350 },
  { label: "Bogota (8,660 ft)", alt: 8660 },
];

export function PsychrometricTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [mode, setMode] = useState<InputMode>("db_rh");
  const [dryBulb, setDryBulb] = useState<number>(75);
  const [rhPercent, setRhPercent] = useState<number>(50);
  const [wetBulb, setWetBulb] = useState<number>(62.5);
  const [dewPoint, setDewPoint] = useState<number>(55.1);
  const [altitude, setAltitude] = useState<number>(0);
  const [showAcademicBenchmark, setShowAcademicBenchmark] = useState<boolean>(false);

  // Hydrate from URL
  useEffect(() => {
    const urlMode = getParam("mode", "db_rh") as InputMode;
    const urlDb = Number(getParam("db", "75"));
    const urlRh = Number(getParam("rh", "50"));
    const urlAlt = Number(getParam("alt", "0"));

    if (["db_rh", "db_wb", "db_dp"].includes(urlMode)) setMode(urlMode);
    if (!isNaN(urlDb)) setDryBulb(urlDb);
    if (!isNaN(urlRh) && urlRh >= 0 && urlRh <= 100) setRhPercent(urlRh);
    if (!isNaN(urlAlt) && urlAlt >= 0) setAltitude(urlAlt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (preset: typeof PSYCH_PRESETS[0]) => {
    setMode(preset.mode);
    setDryBulb(preset.db);
    setRhPercent(preset.rh);
    setWetBulb(preset.wb);
    setDewPoint(preset.dp);
    setAltitude(preset.alt);

    updateParam("mode", preset.mode);
    updateParam("db", preset.db);
    updateParam("rh", preset.rh);
    updateParam("alt", preset.alt);
  };

  // Perform Calculation
  const output: PsychrometricOutput = useMemo(() => {
    if (mode === "db_rh") {
      return calculatePsychrometrics({ dryBulbF: dryBulb, relativeHumidityPercent: rhPercent, altitudeFeet: altitude });
    } else if (mode === "db_wb") {
      return calculatePsychrometrics({ dryBulbF: dryBulb, wetBulbF: wetBulb, altitudeFeet: altitude });
    } else {
      return calculatePsychrometrics({ dryBulbF: dryBulb, dewPointF: dewPoint, altitudeFeet: altitude });
    }
  }, [mode, dryBulb, rhPercent, wetBulb, dewPoint, altitude]);

  const handleExportCsv = () => {
    const headers = "Dry Bulb (°F),Wet Bulb (°F),Dew Point (°F),Relative Humidity (%),Humidity Ratio (grains/lb),Enthalpy (BTU/lb),Specific Volume (cu ft/lb),Air Density (lb/cu ft),Barometric Pressure (psia),Altitude (ft),Sea Level Grains/lb,Sea Level Divergence (%),Lewis Relation Factor,Enhancement Factor f(pT)\n";
    const row = `${output.dryBulbF},${output.wetBulbF},${output.dewPointF},${output.relativeHumidityPercent},${output.humidityRatioGrainsPerLb},${output.specificEnthalpyBtuPerLb},${output.specificVolumeCuFtPerLb},${output.airDensityLbPerCuFt},${output.atmosphericPressurePsia},${altitude},${output.seaLevelHumidityRatioGrainsPerLb},${output.seaLevelDivergencePercent},${output.lewisRelationFactor},${output.enhancementFactor}\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `psychrometric-${output.dryBulbF}db-${output.relativeHumidityPercent}rh-${altitude}ft.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Psychrometric State Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Psychrometric States:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(PSYCH_PRESETS[0])}
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
            title="Reset to 75°F Comfort Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PSYCH_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${dryBulb === preset.db && altitude === preset.alt ? "active" : ""}`}
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
          {/* INPUT PAIR SELECTOR */}
          <div className="form-group">
            <label htmlFor="mode-select">
              <span>Input Property Combination</span>
              <span className="unit-label">2 Parameters</span>
            </label>
            <select
              id="mode-select"
              value={mode}
              onChange={(e) => {
                const val = e.target.value as InputMode;
                setMode(val);
                updateParam("mode", val);
              }}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="db_rh">Dry Bulb Temperature &amp; Relative Humidity (DB + RH)</option>
              <option value="db_wb">Dry Bulb Temperature &amp; Wet Bulb Temperature (DB + WB)</option>
              <option value="db_dp">Dry Bulb Temperature &amp; Dew Point Temperature (DB + DP)</option>
            </select>
          </div>

          {/* DRY BULB TEMPERATURE */}
          <div className="form-group">
            <label htmlFor="dry-bulb-input">
              <span>Dry Bulb Temperature</span>
              <span className="unit-label">&deg;F</span>
            </label>
            <div className="input-with-slider">
              <input
                id="dry-bulb-input"
                type="number"
                min={30}
                max={120}
                value={dryBulb}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDryBulb(val);
                  updateParam("db", val);
                }}
                className="input-number"
              />
              <input
                type="range"
                min={30}
                max={120}
                value={dryBulb}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDryBulb(val);
                  updateParam("db", val);
                }}
                className="input-range"
                aria-label="Dry bulb temperature slider"
              />
            </div>
          </div>

          {/* SECOND VARIABLE: RH % / WB / DP */}
          {mode === "db_rh" && (
            <div className="form-group">
              <label htmlFor="rh-input">
                <span>Relative Humidity</span>
                <span className="unit-label">% RH</span>
              </label>
              <div className="input-with-slider">
                <input
                  id="rh-input"
                  type="number"
                  min={1}
                  max={100}
                  value={rhPercent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRhPercent(val);
                    updateParam("rh", val);
                  }}
                  className="input-number"
                />
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={rhPercent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRhPercent(val);
                    updateParam("rh", val);
                  }}
                  className="input-range"
                  aria-label="Relative humidity slider"
                />
              </div>
            </div>
          )}

          {mode === "db_wb" && (
            <div className="form-group">
              <label htmlFor="wet-bulb-input">
                <span>Wet Bulb Temperature</span>
                <span className="unit-label">&deg;F (&le; Dry Bulb)</span>
              </label>
              <input
                id="wet-bulb-input"
                type="number"
                min={30}
                max={dryBulb}
                step={0.5}
                value={wetBulb}
                onChange={(e) => setWetBulb(Math.min(dryBulb, Number(e.target.value)))}
                className="input-number"
              />
            </div>
          )}

          {mode === "db_dp" && (
            <div className="form-group">
              <label htmlFor="dew-point-input">
                <span>Dew Point Temperature</span>
                <span className="unit-label">&deg;F (&le; Dry Bulb)</span>
              </label>
              <input
                id="dew-point-input"
                type="number"
                min={0}
                max={dryBulb}
                step={0.5}
                value={dewPoint}
                onChange={(e) => setDewPoint(Math.min(dryBulb, Number(e.target.value)))}
                className="input-number"
              />
            </div>
          )}

          {/* ALTITUDE / ELEVATION */}
          <div className="form-group">
            <label htmlFor="altitude-input">
              <span>Site Elevation (Altitude)</span>
              <span className="unit-label">Feet Above Sea Level</span>
            </label>
            <input
              id="altitude-input"
              type="number"
              min={0}
              max={12000}
              step={500}
              value={altitude}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAltitude(val);
                updateParam("alt", val);
              }}
              className="input-number"
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.4rem" }}>
              {ELEVATION_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setAltitude(p.alt);
                    updateParam("alt", p.alt);
                  }}
                  style={{
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.45rem",
                    borderRadius: "4px",
                    border: altitude === p.alt ? "1px solid var(--accent-cooling)" : "1px solid var(--border-color)",
                    background: altitude === p.alt ? "rgba(59, 130, 246, 0.12)" : "transparent",
                    color: altitude === p.alt ? "var(--accent-cooling)" : "var(--text-muted)",
                    cursor: "pointer",
                    fontWeight: altitude === p.alt ? 600 : 400,
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.35rem", display: "block" }}>
              Barometric Pressure: <strong>{output.atmosphericPressurePsia} psia</strong> ({Math.round(output.atmosphericPressurePsia * 2.036 * 100) / 100} in.Hg)
            </span>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Psychrometric Calculation Result">
            <div className="result-label">Moist Air Dew Point &amp; Humidity</div>
            <div className="result-value" style={{ color: "var(--accent-cooling)" }}>
              {output.dewPointF}&deg;F Dew Point
            </div>
            <div className="result-unit">
              Relative Humidity: <strong>{output.relativeHumidityPercent}% RH</strong> &bull; Wet Bulb: <strong>{output.wetBulbF}&deg;F</strong>
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
                  background: output.comfortZoneStatus.includes("Ideal") ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                  color: output.comfortZoneStatus.includes("Ideal") ? "var(--accent-success)" : "#f59e0b",
                  border: "1px solid currentColor",
                }}
              >
                {output.comfortZoneStatus}
              </span>
            </div>
          </div>

          {/* ELEVATION DIVERGENCE CALLOUT */}
          {altitude > 0 && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.09) 0%, rgba(239, 68, 68, 0.05) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: "8px",
                padding: "0.85rem 1rem",
                margin: "0.75rem 0",
              }}
              role="alert"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: "0.82rem", color: "#d97706" }}>
                  <span>⚠️</span>
                  <span>Sea-Level Psychrometric Chart Divergence: +{output.seaLevelDivergencePercent}% Error</span>
                </div>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px", background: "rgba(245, 158, 11, 0.2)", color: "#b45309" }}>
                  {altitude.toLocaleString()} ft ({output.atmosphericPressurePsia} psia)
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.77rem", lineHeight: 1.45, color: "var(--text-secondary)" }}>
                At {altitude.toLocaleString()} ft, true moist air holds <strong>{output.humidityRatioGrainsPerLb} grains/lb</strong> (vs <strong>{output.seaLevelHumidityRatioGrainsPerLb} grains/lb</strong> on standard sea-level charts). Applying unadjusted sea-level charts induces a <strong>+{output.seaLevelDivergencePercent}% error</strong> in moisture ratio and skews enthalpy by <strong>+{(output.specificEnthalpyBtuPerLb - output.seaLevelEnthalpyBtuPerLb).toFixed(1)} BTU/lb</strong>, heavily distorting ventilation and cooling coil sizing.
              </p>
            </div>
          )}

          <StandardsBadge standards={["ASHRAE Standard 55", "Hyland-Wexler Formulations", "ASHRAE Fundamentals Ch. 1"]} />

          {/* PSYCHROMETRIC SVG STATE VISUALIZER */}
          <PsychrometricVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Specific Enthalpy (h)</div>
              <div className="item-value" style={{ color: "#f59e0b" }}>
                {output.specificEnthalpyBtuPerLb} BTU/lb
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Humidity Ratio (W)</div>
              <div className="item-value">{output.humidityRatioGrainsPerLb} grains/lb</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Specific Volume (v)</div>
              <div className="item-value">{output.specificVolumeCuFtPerLb} cu ft/lb</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Air Density (&rho;)</div>
              <div className="item-value">{output.airDensityLbPerCuFt} lb/cu ft</div>
            </div>
          </div>

          {/* ACADEMIC & PHYSIOLOGICAL BENCHMARK CARD */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              padding: "0.85rem 1rem",
              background: "var(--bg-secondary)",
              margin: "0.85rem 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setShowAcademicBenchmark(!showAcademicBenchmark)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>🔬</span>
                <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-primary)" }}>
                  Academic &amp; Physiological Benchmark (CBE / Lewis Relation)
                </span>
              </div>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent-cooling)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showAcademicBenchmark ? "▲ Collapse" : "▼ Expand Benchmark"}
              </button>
            </div>

            {showAcademicBenchmark && (
              <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.65rem", marginBottom: "0.75rem" }}>
                  <div style={{ padding: "0.6rem", background: "var(--bg-primary)", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                      Lewis Relation Mass Transfer (LR)
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-cooling)", margin: "0.15rem 0" }}>
                      {output.lewisRelationFactor}x Baseline
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.35 }}>
                      Skin evaporative cooling potential scales inversely with total pressure ($h_e / h_c \propto 1/P$), accelerating occupant perspiration evaporation by {Math.round((output.lewisRelationFactor - 1) * 100)}% at {altitude} ft.
                    </div>
                  </div>

                  <div style={{ padding: "0.6rem", background: "var(--bg-primary)", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                      Virial Enhancement Factor f(p,T)
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981", margin: "0.15rem 0" }}>
                      {output.enhancementFactor} (vs 1.0000)
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.35 }}>
                      ASHRAE RP-1485 real-gas factor accounting for air-water molecular interactions. Ideal-gas Dalton models assume $f = 1.0000$ (sufficient for PMV comfort, but diverges in coil sizing).
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                  💡 <em>Open Research Context:</em> Formulations benchmarked with UC Berkeley Center for the Built Environment (CBE) and cross-validated in <a href="https://github.com/pythermalcomfort/pythermalcomfort/issues/395" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>pythermalcomfort Issue #395</a>.
                </div>
              </div>
            )}
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/psychrometric-calculator"
            toolName="Psychrometric Chart & Moist Air Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Psychrometric System Diagnostics</div>
            <Link href="/calculators/superheat-subcooling-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Check Target Superheat with Indoor Wet Bulb ({output.wetBulbF}°F)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/cfm-calculator">
              <span>Calculate Total Cooling Enthalpy Drop (Q = 4.5 × CFM × Δh)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Dew Point"
        value={`${output.dewPointF}°F`}
        unit={`(${output.relativeHumidityPercent}% RH)`}
      />
    </div>
  );
}
