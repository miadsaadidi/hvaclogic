"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculateChargingDiagnostic, MeteringDevice } from "@/lib/math/superheat-subcooling";
import { REFRIGERANTS } from "@/lib/math/refrigerants";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { RefrigerantCircuitVisualizer } from "@/components/calculator/visualizers/RefrigerantCircuitVisualizer";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const CHARGING_PRESETS = [
  {
    label: "R-410A TXV (Normal 10°F SC)",
    refrig: "r410a",
    metering: "txv_eev" as MeteringDevice,
    suctionP: 118,
    suctionT: 52,
    liquidP: 335,
    liquidT: 93.5,
    targetSC: 10,
    wbIn: 67,
    dbOut: 95,
  },
  {
    label: "R-454B A2L New System (Optimal)",
    refrig: "r454b",
    metering: "txv_eev" as MeteringDevice,
    suctionP: 118,
    suctionT: 52,
    liquidP: 335,
    liquidT: 94,
    targetSC: 10,
    wbIn: 67,
    dbOut: 95,
  },
  {
    label: "R-410A Piston (Fixed Orifice 13°F Target)",
    refrig: "r410a",
    metering: "fixed_orifice" as MeteringDevice,
    suctionP: 118,
    suctionT: 54,
    liquidP: 335,
    liquidT: 94,
    targetSC: 10,
    wbIn: 67,
    dbOut: 95,
  },
  {
    label: "Fault: Active Undercharge / Leak",
    refrig: "r410a",
    metering: "txv_eev" as MeteringDevice,
    suctionP: 98,
    suctionT: 64,
    liquidP: 240,
    liquidT: 82,
    targetSC: 10,
    wbIn: 67,
    dbOut: 95,
  },
  {
    label: "Fault: Restricted Liquid Line Drier",
    refrig: "r410a",
    metering: "txv_eev" as MeteringDevice,
    suctionP: 105,
    suctionT: 65,
    liquidP: 375,
    liquidT: 90,
    targetSC: 10,
    wbIn: 67,
    dbOut: 95,
  },
];

export function SuperheatSubcoolingTool() {
  const { isMetric } = useUnitSystem();
  const { getNumberParam, getParam, updateParam } = useHydrateParams();

  // State
  const [refrig, setRefrig] = useState<string>("r410a");
  const [metering, setMetering] = useState<MeteringDevice>("txv_eev");
  const [suctionP, setSuctionP] = useState<number>(118);
  const [suctionT, setSuctionT] = useState<number>(52);
  const [liquidP, setLiquidP] = useState<number>(335);
  const [liquidT, setLiquidT] = useState<number>(93.5);
  const [targetSC, setTargetSC] = useState<number>(10);
  const [wbIn, setWbIn] = useState<number>(67);
  const [dbOut, setDbOut] = useState<number>(95);
  const [timerSeconds, setTimerSeconds] = useState<number>(900); // 15 mins
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // EPA 15-Minute Countdown Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  // Hydrate from URL
  useEffect(() => {
    const urlRefrig = getParam("refrig", "r410a") || "r410a";
    const urlMetering = ((getParam("metering", "txv_eev") as MeteringDevice) || "txv_eev") as MeteringDevice;
    const urlSuctionP = getNumberParam("suction_p", 118);
    const urlSuctionT = getNumberParam("suction_t", 52);
    const urlLiquidP = getNumberParam("liquid_p", 335);
    const urlLiquidT = getNumberParam("liquid_t", 93.5);
    const urlTargetSC = getNumberParam("target_sc", 10);
    const urlWb = getNumberParam("wb", 67);
    const urlDb = getNumberParam("db", 95);

    setRefrig(urlRefrig);
    setMetering(urlMetering);
    setSuctionP(urlSuctionP);
    setSuctionT(urlSuctionT);
    setLiquidP(urlLiquidP);
    setLiquidT(urlLiquidT);
    setTargetSC(urlTargetSC);
    setWbIn(urlWb);
    setDbOut(urlDb);
  }, [getNumberParam, getParam]);

  const handleRefrigChange = (val: string) => {
    setRefrig(val);
    updateParam("refrig", val);
  };

  const handleMeteringChange = (val: MeteringDevice) => {
    setMetering(val);
    updateParam("metering", val);
  };

  const handlePreset = (p: typeof CHARGING_PRESETS[0]) => {
    setRefrig(p.refrig);
    setMetering(p.metering);
    setSuctionP(p.suctionP);
    setSuctionT(p.suctionT);
    setLiquidP(p.liquidP);
    setLiquidT(p.liquidT);
    setTargetSC(p.targetSC);
    setWbIn(p.wbIn);
    setDbOut(p.dbOut);

    updateParam("refrig", p.refrig);
    updateParam("metering", p.metering);
    updateParam("suction_p", p.suctionP);
    updateParam("suction_t", p.suctionT);
  };

  const result = useMemo(() => {
    return calculateChargingDiagnostic({
      refrigerantId: refrig,
      meteringDevice: metering,
      suctionPressurePsig: suctionP,
      suctionLineTempF: suctionT,
      liquidPressurePsig: liquidP,
      liquidLineTempF: liquidT,
      targetSubcoolingF: targetSC,
      indoorWetBulbF: wbIn,
      outdoorDryBulbF: dbOut,
    });
  }, [refrig, metering, suctionP, suctionT, liquidP, liquidT, targetSC, wbIn, dbOut]);

  const currentRefrigMeta = REFRIGERANTS[refrig] || REFRIGERANTS.r410a;

  // Status styling colors
  const statusBg =
    result.diagnostic.badgeColor === "success"
      ? "rgba(34, 197, 94, 0.12)"
      : result.diagnostic.badgeColor === "warning"
      ? "rgba(234, 179, 8, 0.12)"
      : result.diagnostic.badgeColor === "danger"
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(56, 189, 248, 0.12)";

  const statusBorder =
    result.diagnostic.badgeColor === "success"
      ? "var(--accent-success)"
      : result.diagnostic.badgeColor === "warning"
      ? "var(--accent-warning)"
      : result.diagnostic.badgeColor === "danger"
      ? "var(--accent-danger)"
      : "var(--accent-primary)";

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Field Diagnostic Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Quick Diagnostic Presets:</span>
          <button
            type="button"
            onClick={() => handlePreset(CHARGING_PRESETS[0])}
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
            title="Reset to Normal R-410A TXV standard default"
          >
            ↺ Reset Defaults
          </button>
        </div>
        {CHARGING_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePreset(p)}
            className={`preset-chip-btn ${
              refrig === p.refrig &&
              metering === p.metering &&
              suctionP === p.suctionP &&
              suctionT === p.suctionT
                ? "active"
                : ""
            }`}
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
          {/* REFRIGERANT SELECTOR */}
          <div className="form-group">
            <label htmlFor="refrig-select">
              <span>Refrigerant Type</span>
              {currentRefrigMeta.safetyClass === "A2L" && (
                <span id="a2l-badge" style={{ fontSize: "0.75rem", color: "#f59e0b", fontWeight: 700, background: "rgba(245, 158, 11, 0.15)", padding: "0.15rem 0.45rem", borderRadius: "4px" }}>
                  A2L Mildly Flammable
                </span>
              )}
            </label>
            <select
              id="refrig-select"
              value={refrig}
              onChange={(e) => handleRefrigChange(e.target.value)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="r410a">R-410A (Puron / Standard Residential)</option>
              <option value="r454b">R-454B (Opteon XL41 — 2025+ A2L Standard)</option>
              <option value="r32">R-32 (Daikin / Mini-Split A2L)</option>
              <option value="r22">R-22 (Legacy Freon)</option>
              <option value="r134a">R-134a (Medium Temp / Auto)</option>
              <option value="r404a">R-404A (Commercial Low Temp)</option>
              <option value="r407c">R-407C (Zeotropic Retrofit)</option>
            </select>
          </div>

          {/* METERING DEVICE TOGGLE */}
          <div className="form-group">
            <label><span>Metering Device Type</span></label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                className={`preset-chip-btn ${metering === "txv_eev" ? "active" : ""}`}
                style={{ padding: "0.6rem", textAlign: "center", justifyContent: "center" }}
                onClick={() => handleMeteringChange("txv_eev")}
              >
                TXV / EEV (Subcooling)
              </button>
              <button
                type="button"
                className={`preset-chip-btn ${metering === "fixed_orifice" ? "active" : ""}`}
                style={{ padding: "0.6rem", textAlign: "center", justifyContent: "center" }}
                onClick={() => handleMeteringChange("fixed_orifice")}
              >
                Fixed Orifice / Piston (Superheat)
              </button>
            </div>
          </div>

          {/* SUCTION LINE (VAPOR) INPUTS */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.625rem", padding: "0.875rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🔵 Suction Line (Vapor) Measurements
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="suction-p-input"><span>Suction Pressure (psig)</span></label>
                <input
                  id="suction-p-input"
                  type="number"
                  min="5"
                  max="600"
                  step="1"
                  value={suctionP}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 10;
                    setSuctionP(v);
                    updateParam("suction_p", v);
                  }}
                  className="input-number"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="suction-t-input"><span>Suction Line Temp (°F)</span></label>
                <input
                  id="suction-t-input"
                  type="number"
                  min="-20"
                  max="120"
                  step="0.5"
                  value={suctionT}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    setSuctionT(v);
                    updateParam("suction_t", v);
                  }}
                  className="input-number"
                />
              </div>
            </div>
          </div>

          {/* LIQUID LINE INPUTS */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.625rem", padding: "0.875rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-heating)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🔴 Liquid Line (High Side) Measurements
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="liquid-p-input"><span>Liquid Pressure (psig)</span></label>
                <input
                  id="liquid-p-input"
                  type="number"
                  min="20"
                  max="650"
                  step="1"
                  value={liquidP}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 20;
                    setLiquidP(v);
                    updateParam("liquid_p", v);
                  }}
                  className="input-number"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="liquid-t-input"><span>Liquid Line Temp (°F)</span></label>
                <input
                  id="liquid-t-input"
                  type="number"
                  min="40"
                  max="160"
                  step="0.5"
                  value={liquidT}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 40;
                    setLiquidT(v);
                    updateParam("liquid_t", v);
                  }}
                  className="input-number"
                />
              </div>
            </div>
          </div>

          {/* CONDITIONAL TARGET INPUTS */}
          {metering === "fixed_orifice" ? (
            <div style={{ background: "rgba(56, 189, 248, 0.05)", border: "1px dashed var(--accent-primary)", borderRadius: "0.625rem", padding: "0.875rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                Target Superheat Environmental Conditions
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="wb-in-input"><span>Indoor Return WB (°F)</span></label>
                  <input
                    id="wb-in-input"
                    type="number"
                    min="50"
                    max="76"
                    step="0.5"
                    value={wbIn}
                    onChange={(e) => setWbIn(parseFloat(e.target.value) || 67)}
                    className="input-number"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="db-out-input"><span>Outdoor Ambient DB (°F)</span></label>
                  <input
                    id="db-out-input"
                    type="number"
                    min="55"
                    max="115"
                    step="1"
                    value={dbOut}
                    onChange={(e) => setDbOut(parseFloat(e.target.value) || 95)}
                    className="input-number"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="target-sc-input">
                <span>Manufacturer Nameplate Subcooling Target (°F)</span>
                <span className="unit-label">Typical: 10°F ± 3°F</span>
              </label>
              <input
                id="target-sc-input"
                type="number"
                min="5"
                max="20"
                step="0.5"
                value={targetSC}
                onChange={(e) => setTargetSC(parseFloat(e.target.value) || 10)}
                className="input-number"
              />
            </div>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY DIAGNOSTIC STATUS CARD */}
          <div
            className="primary-result-card"
            style={{ background: statusBg, border: `2px solid ${statusBorder}` }}
            role="region"
            aria-live="polite"
            aria-label="Diagnostic Charging Status"
          >
            <div className="result-label" style={{ color: "var(--ink-secondary)" }}>Field Diagnostic Result</div>
            <div className="result-value" style={{ fontSize: "1.5rem", marginTop: "0.25rem", color: "var(--ink)" }}>
              {result.diagnostic.statusLabel}
            </div>
            <div className="result-unit" style={{ color: "var(--ink)", marginTop: "0.5rem", lineHeight: 1.4 }}>
              {result.diagnostic.summary}
            </div>
          </div>

          <StandardsBadge standards={["EPA Section 608 Protocol", "AHRI 210/240", "NIST REFPROP V10"]} />

          {/* DUAL GAUGE NUMERICAL RESULTS */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Actual Superheat</div>
              <div className="item-value">{result.actualSuperheatF}°F</div>
              <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                Dew Sat: {result.evaporatorSatTempF}°F
              </div>
            </div>

            <div className="secondary-result-item">
              <div className="item-label">
                {metering === "fixed_orifice" ? "Target Superheat" : "Actual Subcooling"}
              </div>
              <div className="item-value">
                {metering === "fixed_orifice"
                  ? `${result.targetSuperheatF}°F`
                  : `${result.actualSubcoolingF}°F`}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                {metering === "fixed_orifice"
                  ? `Delta: ${result.superheatDeltaF !== undefined && result.superheatDeltaF > 0 ? "+" : ""}${result.superheatDeltaF}°F`
                  : `Bubble Sat: ${result.condenserSatTempF}°F`}
              </div>
            </div>

            {metering === "txv_eev" && (
              <div className="secondary-result-item">
                <div className="item-label">Target Subcooling</div>
                <div className="item-value">{result.targetSubcoolingF}°F</div>
                <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                  Delta: {result.subcoolingDeltaF !== undefined && result.subcoolingDeltaF > 0 ? "+" : ""}${result.subcoolingDeltaF}°F
                </div>
              </div>
            )}

            <div className="secondary-result-item">
              <div className="item-label">Refrigerant Safety</div>
              <div className="item-value" style={{ fontSize: "0.95rem" }}>
                {currentRefrigMeta.safetyClass}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                {currentRefrigMeta.hasGlide ? `Glide: ${currentRefrigMeta.glideF}°F` : "Azeotropic / Pure"}
              </div>
            </div>
          </div>

          {/* REFRIGERANT CIRCUIT VISUAL SCHEMA */}
          <RefrigerantCircuitVisualizer
            refrigerant={refrig}
            meteringDevice={metering}
            suctionPressure={suctionP}
            suctionTemp={suctionT}
            suctionSatTemp={result.evaporatorSatTempF}
            superheat={result.actualSuperheatF}
            liquidPressure={liquidP}
            liquidTemp={liquidT}
            liquidSatTemp={result.condenserSatTempF ?? 0}
            subcooling={result.actualSubcoolingF ?? 0}
            statusBadgeColor={result.diagnostic.badgeColor}
            diagnosticSummary={result.diagnostic.primaryDiagnosis}
          />

          {/* ACTIONABLE FIELD CHECKLIST CARD */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "0.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              🛠️ Diagnostic Finding & Action Items
            </h3>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: statusBorder, marginBottom: "0.75rem" }}>
              {result.diagnostic.primaryDiagnosis}
            </p>
            <ul style={{ paddingLeft: "1.2rem", fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              {result.diagnostic.recommendedChecks.map((chk, i) => (
                <li key={i}>{chk}</li>
              ))}
            </ul>

            {result.diagnostic.safetyNotice && (
              <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", background: "rgba(245, 158, 11, 0.1)", borderLeft: "3px solid #f59e0b", borderRadius: "4px", fontSize: "0.75rem", color: "var(--ink)" }}>
                {result.diagnostic.safetyNotice}
              </div>
            )}

            {/* EPA 15-MINUTE SYSTEM STABILIZATION TIMER */}
            <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--ink)" }}>
                  <span>⏱️</span>
                  <span>EPA Stabilization Timer</span>
                </div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.95rem", fontWeight: 700, color: timerSeconds === 0 ? "var(--accent-success)" : "var(--accent-cooling)" }}>
                  {timerSeconds === 0 ? "✓ Stabilized (15m)" : `${Math.floor(timerSeconds / 60)}:${(timerSeconds % 60).toString().padStart(2, "0")}`}
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
                EPA Section 608 protocol: Systems must run for 15 minutes before logging final manifold pressures.
              </p>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                    background: timerRunning ? "rgba(234, 179, 8, 0.15)" : "rgba(0, 210, 255, 0.15)",
                    border: `1px solid ${timerRunning ? "var(--accent-warning)" : "var(--accent-cooling)"}`,
                    color: timerRunning ? "var(--accent-warning)" : "var(--accent-cooling)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {timerRunning ? "⏸ Pause" : timerSeconds < 900 && timerSeconds > 0 ? "▶ Resume" : "▶ Start 15m Timer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(900);
                  }}
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-muted)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/superheat-subcooling-calculator"
            toolName="Superheat & Subcooling Calculator"
          />

          {/* PT CHART HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Need Exact PT Saturation Curves?</div>
            <Link href={`/calculators/pt-chart?refrig=${refrig}`}>
              <span>Open Interactive Digital PT Chart for {currentRefrigMeta.name}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label={metering === "fixed_orifice" ? "Superheat" : "Subcooling"}
        value={
          metering === "fixed_orifice"
            ? `${result.actualSuperheatF}°F (Tgt ${result.targetSuperheatF}°F)`
            : `${result.actualSubcoolingF}°F (Tgt ${result.targetSubcoolingF}°F)`
        }
        unit={result.diagnostic.statusLabel}
      />
    </div>
  );
}
