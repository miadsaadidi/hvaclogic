"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateDuctFrictionLoss,
  ACCA_FITTING_DATABASE,
  SelectedFitting,
  DuctFrictionLossInput,
  DuctFrictionLossOutput,
} from "@/lib/math/duct-friction-loss";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { DuctFrictionVisualizer } from "@/components/calculator/visualizers/DuctFrictionVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  {
    label: "🏠 Standard Split (0.50\" TESP)",
    supplyStraight: 60,
    returnStraight: 40,
    tesp: 0.50,
    coilDrop: 0.20,
    filterDrop: 0.10,
    smoothElbows: 3,
    miteredElbows: 0,
    conicalTakeoffs: 4,
    boots: 4,
    returnDrops: 1,
  },
  {
    label: "🏢 2-Story Long Run (0.70\" TESP)",
    supplyStraight: 90,
    returnStraight: 60,
    tesp: 0.70,
    coilDrop: 0.22,
    filterDrop: 0.15,
    smoothElbows: 5,
    miteredElbows: 0,
    conicalTakeoffs: 6,
    boots: 6,
    returnDrops: 2,
  },
  {
    label: "📉 High-Resistance Mitered (0.50\" TESP)",
    supplyStraight: 50,
    returnStraight: 30,
    tesp: 0.50,
    coilDrop: 0.20,
    filterDrop: 0.12,
    smoothElbows: 0,
    miteredElbows: 4,
    conicalTakeoffs: 4,
    boots: 4,
    returnDrops: 1,
  },
  {
    label: "⚡ High-Static ECM (0.80\" TESP)",
    supplyStraight: 75,
    returnStraight: 45,
    tesp: 0.80,
    coilDrop: 0.24,
    filterDrop: 0.18,
    smoothElbows: 4,
    miteredElbows: 0,
    conicalTakeoffs: 6,
    boots: 6,
    returnDrops: 2,
  },
];

export function DuctFrictionTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [supplyStraight, setSupplyStraight] = useState<number>(60);
  const [returnStraight, setReturnStraight] = useState<number>(40);
  const [tesp, setTesp] = useState<number>(0.50);
  const [coilDrop, setCoilDrop] = useState<number>(0.20);
  const [filterDrop, setFilterDrop] = useState<number>(0.10);
  const [supplyRegDrop, setSupplyRegDrop] = useState<number>(0.03);
  const [returnGrilleDrop, setReturnGrilleDrop] = useState<number>(0.03);

  // Common fitting counts
  const [smoothElbows, setSmoothElbows] = useState<number>(3);
  const [miteredElbows, setMiteredElbows] = useState<number>(0);
  const [conicalTakeoffs, setConicalTakeoffs] = useState<number>(4);
  const [boots, setBoots] = useState<number>(4);
  const [returnDrops, setReturnDrops] = useState<number>(1);

  // Hydrate from URL
  useEffect(() => {
    const urlSupply = Number(getParam("supStr", "60"));
    const urlReturn = Number(getParam("retStr", "40"));
    const urlTesp = Number(getParam("tesp", "0.50"));

    if (!isNaN(urlSupply) && urlSupply >= 0) setSupplyStraight(urlSupply);
    if (!isNaN(urlReturn) && urlReturn >= 0) setReturnStraight(urlReturn);
    if (!isNaN(urlTesp) && urlTesp > 0) setTesp(urlTesp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (p: typeof PRESETS[0]) => {
    setSupplyStraight(p.supplyStraight);
    setReturnStraight(p.returnStraight);
    setTesp(p.tesp);
    setCoilDrop(p.coilDrop);
    setFilterDrop(p.filterDrop);
    setSmoothElbows(p.smoothElbows);
    setMiteredElbows(p.miteredElbows);
    setConicalTakeoffs(p.conicalTakeoffs);
    setBoots(p.boots);
    setReturnDrops(p.returnDrops);

    updateParam("supStr", p.supplyStraight);
    updateParam("retStr", p.returnStraight);
    updateParam("tesp", p.tesp);
  };

  // Perform Calculation
  const output: DuctFrictionLossOutput = useMemo(() => {
    const supplyFittings: SelectedFitting[] = [
      { fittingId: "plenum_supply_straight", quantity: 1 },
      { fittingId: "elbow_90_smooth", quantity: smoothElbows },
      { fittingId: "elbow_90_mitered_novanes", quantity: miteredElbows },
      { fittingId: "branch_takeoff_conical", quantity: conicalTakeoffs },
      { fittingId: "register_boot_90", quantity: boots },
    ];

    const returnFittings: SelectedFitting[] = [
      { fittingId: "return_air_drop_90", quantity: returnDrops },
      { fittingId: "return_grille_boot", quantity: 1 },
    ];

    const input: DuctFrictionLossInput = {
      straightDuctSupplyFt: supplyStraight,
      straightDuctReturnFt: returnStraight,
      supplyFittings,
      returnFittings,
      blowerTespInWg: tesp,
      evaporatorCoilDropInWg: coilDrop,
      filterDropInWg: filterDrop,
      supplyRegisterDropInWg: supplyRegDrop,
      returnGrilleDropInWg: returnGrilleDrop,
    };

    return calculateDuctFrictionLoss(input);
  }, [
    supplyStraight,
    returnStraight,
    tesp,
    coilDrop,
    filterDrop,
    supplyRegDrop,
    returnGrilleDrop,
    smoothElbows,
    miteredElbows,
    conicalTakeoffs,
    boots,
    returnDrops,
  ]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = `Blower Rated TESP,${tesp},"in. wg"\nEvaporator Coil Drop,${coilDrop},"in. wg"\nAir Filter Drop,${filterDrop},"in. wg"\nRegister & Grille Drops,${supplyRegDrop + returnGrilleDrop},"in. wg"\nTotal Component Losses,${output.totalComponentLossInWg},"in. wg"\n\nAVAILABLE STATIC PRESSURE (ASP),${output.availableStaticPressureAspInWg},"in. wg"\nSupply Straight Length,${output.supplyStraightLengthFt},"ft"\nSupply Fittings Length,${output.supplyFittingsLengthFt},"ft"\nTotal Supply TEL,${output.totalSupplyLengthFt},"ft"\nReturn Straight Length,${output.returnStraightLengthFt},"ft"\nReturn Fittings Length,${output.returnFittingsLengthFt},"ft"\nTotal Return TEL,${output.totalReturnLengthFt},"ft"\nTOTAL EQUIVALENT LENGTH (TEL),${output.totalEquivalentLengthTelFt},"ft"\n\nDESIGN FRICTION RATE (FR),${output.designFrictionRateFr},"in. wg / 100 ft"\nFRICTION RATE STATUS,"${output.frictionRateStatus}",""\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `duct-friction-rate-TEL-${output.totalEquivalentLengthTelFt}ft.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Duct System Configurations">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Ductwork Scenarios:</span>
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
            title="Reset to Standard Split Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePresetSelect(p)}
            className={`preset-chip-btn ${supplyStraight === p.supplyStraight && tesp === p.tesp ? "active" : ""}`}
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
          {/* STATIC PRESSURE BUDGET (TESP vs COMPONENTS) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="tesp-input">
                <span>Blower Rated TESP</span>
                <span className="unit-label">in. wg</span>
              </label>
              <input
                id="tesp-input"
                type="number"
                step={0.05}
                min={0.20}
                max={1.50}
                value={tesp}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTesp(val);
                  updateParam("tesp", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="coil-input">
                <span>A/C Coil Drop</span>
                <span className="unit-label">in. wg</span>
              </label>
              <input
                id="coil-input"
                type="number"
                step={0.02}
                min={0.05}
                max={0.50}
                value={coilDrop}
                onChange={(e) => setCoilDrop(Number(e.target.value))}
                className="input-number"
              />
            </div>
          </div>

          {/* FILTER & REGISTER DROPS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="filter-select">
                <span>Air Filter Type</span>
                <span className="unit-label">Drop</span>
              </label>
              <select
                id="filter-select"
                value={filterDrop}
                onChange={(e) => setFilterDrop(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={0.08}>4&quot; Deep Pleated Media (0.08&quot;)</option>
                <option value={0.10}>Standard 1&quot; MERV 8 (0.10&quot;)</option>
                <option value={0.15}>Standard 1&quot; MERV 11 (0.15&quot;)</option>
                <option value={0.22}>High Efficiency MERV 13 (0.22&quot;)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="grille-input">
                <span>Registers Drop</span>
                <span className="unit-label">in. wg</span>
              </label>
              <input
                id="grille-input"
                type="number"
                step={0.01}
                min={0.01}
                max={0.10}
                value={supplyRegDrop}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSupplyRegDrop(val);
                  setReturnGrilleDrop(val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* STRAIGHT DUCT RUNS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="sup-straight">
                <span>Supply Straight Run</span>
                <span className="unit-label">Feet</span>
              </label>
              <input
                id="sup-straight"
                type="number"
                min={0}
                max={300}
                value={supplyStraight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSupplyStraight(val);
                  updateParam("supStr", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="ret-straight">
                <span>Return Straight Run</span>
                <span className="unit-label">Feet</span>
              </label>
              <input
                id="ret-straight"
                type="number"
                min={0}
                max={300}
                value={returnStraight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setReturnStraight(val);
                  updateParam("retStr", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* FITTINGS ACCUMULATOR */}
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
              Fitting Quantities (Appendix 3 Equivalent Lengths):
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="smooth-elbows">90° Smooth Elbows (10ft ea)</label>
                <input
                  id="smooth-elbows"
                  type="number"
                  min={0}
                  max={20}
                  value={smoothElbows}
                  onChange={(e) => setSmoothElbows(Number(e.target.value))}
                  className="input-number"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="mitered-elbows">90° Mitered No-Vane (45ft ea)</label>
                <input
                  id="mitered-elbows"
                  type="number"
                  min={0}
                  max={20}
                  value={miteredElbows}
                  onChange={(e) => setMiteredElbows(Number(e.target.value))}
                  className="input-number"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="conical-takeoffs">Conical Takeoffs (15ft ea)</label>
                <input
                  id="conical-takeoffs"
                  type="number"
                  min={0}
                  max={20}
                  value={conicalTakeoffs}
                  onChange={(e) => setConicalTakeoffs(Number(e.target.value))}
                  className="input-number"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="boots-input">Register Boots (30ft ea)</label>
                <input
                  id="boots-input"
                  type="number"
                  min={0}
                  max={20}
                  value={boots}
                  onChange={(e) => setBoots(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="ACCA Manual D Friction Rate Result">
            <div className="result-label">Design Friction Rate (FR)</div>
            <div
              className="result-value"
              style={{
                color:
                  output.frictionRateStatus === "optimal"
                    ? "var(--accent-success)"
                    : output.frictionRateStatus === "critical_undersized"
                    ? "var(--accent-danger)"
                    : "#f59e0b",
              }}
            >
              {output.designFrictionRateFr.toFixed(3)}&quot; w.g. / 100 ft
            </div>
            <div className="result-unit">
              Available Static Pressure: <strong>{output.availableStaticPressureAspInWg.toFixed(3)}&quot; w.g.</strong> (TEL = {output.totalEquivalentLengthTelFt} ft)
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
                    output.frictionRateStatus === "optimal"
                      ? "rgba(16, 185, 129, 0.12)"
                      : output.frictionRateStatus === "critical_undersized"
                      ? "rgba(239, 68, 68, 0.12)"
                      : "rgba(245, 158, 11, 0.12)",
                  color:
                    output.frictionRateStatus === "optimal"
                      ? "var(--accent-success)"
                      : output.frictionRateStatus === "critical_undersized"
                      ? "var(--accent-danger)"
                      : "#f59e0b",
                  border: "1px solid currentColor",
                }}
              >
                {output.frictionRateStatus === "optimal"
                  ? "✓ Optimal ACCA Manual D Friction Rate (0.06 to 0.12 in.wg)"
                  : output.frictionRateStatus === "borderline_low"
                  ? "⚠️ Low Friction Rate (<0.05): Requires Oversized Ducts"
                  : "⚠️ High Friction Rate (>0.12): High Velocity & Noise Risk"}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ACCA Manual D®", "ASHRAE Fundamentals Ch. 21", "SMACNA"]} />

          {/* REACTIVE VISUALIZER */}
          <DuctFrictionVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Total Equivalent Length</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.totalEquivalentLengthTelFt} Feet
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Component Drop Losses</div>
              <div className="item-value">{output.totalComponentLossInWg.toFixed(3)}&quot; w.g.</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Supply TEL</div>
              <div className="item-value">{output.totalSupplyLengthFt} ft</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Return TEL</div>
              <div className="item-value">{output.totalReturnLengthFt} ft</div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/duct-friction-loss-calculator"
            toolName="Duct Friction Loss & Total Equivalent Length (TEL) Sizer"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Airflow Distribution</div>
            <Link href={`/calculators/ductulator?friction=${output.designFrictionRateFr.toFixed(3)}`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Duct Diameters at {output.designFrictionRateFr.toFixed(3)}&quot; Friction Rate in Digital Ductulator</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/flex-duct-cfm-chart">
              <span>Derate Flexible Duct Sag &amp; Friction Drops</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Design Friction Rate"
        value={`${output.designFrictionRateFr.toFixed(3)}" w.g.`}
        unit={`(TEL: ${output.totalEquivalentLengthTelFt} ft)`}
      />
    </div>
  );
}
