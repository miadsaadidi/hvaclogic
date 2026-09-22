"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateAsmeExpansionTank,
  FluidType,
  PipingMaterial,
  ExpansionTankInput,
  ExpansionTankOutput,
  STANDARD_ASME_TANK_SIZES,
} from "@/lib/math/expansion-tank";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { ExpansionTankVisualizer } from "@/components/calculator/visualizers/ExpansionTankVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

const PRESETS = [
  {
    label: "🏠 Residential Boiler (60 gal, 180°F, Water, 30 psi valve)",
    systemVolumeGallons: 60,
    initialFillTempF: 60,
    maxOperatingTempF: 180,
    initialFillPressurePsig: 12,
    reliefValvePressurePsig: 30,
    safetyPressureBufferPsi: 3,
    fluidType: "water" as FluidType,
    pipingMaterial: "carbon_steel" as PipingMaterial,
  },
  {
    label: "❄️ Snow Melt Hydronic Loop (150 gal, 140°F, 50% Propylene Glycol)",
    systemVolumeGallons: 150,
    initialFillTempF: 40,
    maxOperatingTempF: 140,
    initialFillPressurePsig: 15,
    reliefValvePressurePsig: 30,
    safetyPressureBufferPsi: 3,
    fluidType: "propylene_glycol_50" as FluidType,
    pipingMaterial: "pex" as PipingMaterial,
  },
  {
    label: "🏢 Commercial Hot Water Boiler (400 gal, 200°F, Water, 50 psi valve)",
    systemVolumeGallons: 400,
    initialFillTempF: 60,
    maxOperatingTempF: 200,
    initialFillPressurePsig: 18,
    reliefValvePressurePsig: 50,
    safetyPressureBufferPsi: 5,
    fluidType: "water" as FluidType,
    pipingMaterial: "carbon_steel" as PipingMaterial,
  },
  {
    label: "🏛️ High-Rise Hydronic Loop (250 gal, 180°F, 30% Glycol, 60 psi valve)",
    systemVolumeGallons: 250,
    initialFillTempF: 55,
    maxOperatingTempF: 180,
    initialFillPressurePsig: 25,
    reliefValvePressurePsig: 60,
    safetyPressureBufferPsi: 6,
    fluidType: "propylene_glycol_30" as FluidType,
    pipingMaterial: "copper" as PipingMaterial,
  },
];

export function ExpansionTankTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [systemVolumeGallons, setSystemVolumeGallons] = useState<number>(80);
  const [initialFillTempF, setInitialFillTempF] = useState<number>(60);
  const [maxOperatingTempF, setMaxOperatingTempF] = useState<number>(180);
  const [initialFillPressurePsig, setInitialFillPressurePsig] = useState<number>(12);
  const [reliefValvePressurePsig, setReliefValvePressurePsig] = useState<number>(30);
  const [safetyPressureBufferPsi, setSafetyPressureBufferPsi] = useState<number>(3);
  const [fluidType, setFluidType] = useState<FluidType>("water");
  const [pipingMaterial, setPipingMaterial] = useState<PipingMaterial>("carbon_steel");
  const [showDerivation, setShowDerivation] = useState<boolean>(false);
  const [volumeEstimatorOpen, setVolumeEstimatorOpen] = useState<boolean>(false);

  // Estimator Helper State
  const [boilerBtu, setBoilerBtu] = useState<number>(100000);
  const [emitterStyle, setEmitterStyle] = useState<"copper_fin" | "cast_iron" | "radiant_floor">("copper_fin");

  // Hydrate from URL
  useEffect(() => {
    const urlVol = Number(getParam("vol", "80"));
    const urlT1 = Number(getParam("t1", "60"));
    const urlT2 = Number(getParam("t2", "180"));
    const urlP1 = Number(getParam("p1", "12"));
    const urlPrelief = Number(getParam("prelief", "30"));
    const urlFluid = getParam("fluid", "water") as FluidType;

    if (!isNaN(urlVol) && urlVol > 0) setSystemVolumeGallons(urlVol);
    if (!isNaN(urlT1) && urlT1 >= 32) setInitialFillTempF(urlT1);
    if (!isNaN(urlT2) && urlT2 > 40) setMaxOperatingTempF(urlT2);
    if (!isNaN(urlP1) && urlP1 >= 5) setInitialFillPressurePsig(urlP1);
    if (!isNaN(urlPrelief) && urlPrelief > urlP1) setReliefValvePressurePsig(urlPrelief);
    if (urlFluid) setFluidType(urlFluid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setSystemVolumeGallons(preset.systemVolumeGallons);
    setInitialFillTempF(preset.initialFillTempF);
    setMaxOperatingTempF(preset.maxOperatingTempF);
    setInitialFillPressurePsig(preset.initialFillPressurePsig);
    setReliefValvePressurePsig(preset.reliefValvePressurePsig);
    setSafetyPressureBufferPsi(preset.safetyPressureBufferPsi);
    setFluidType(preset.fluidType);
    setPipingMaterial(preset.pipingMaterial);

    updateParam("vol", String(preset.systemVolumeGallons));
    updateParam("t1", String(preset.initialFillTempF));
    updateParam("t2", String(preset.maxOperatingTempF));
    updateParam("p1", String(preset.initialFillPressurePsig));
    updateParam("prelief", String(preset.reliefValvePressurePsig));
    updateParam("fluid", preset.fluidType);
  };

  const applyEstimatedVolume = () => {
    // Standard rule of thumb:
    // Copper finned-tube baseboard: ~1.5 gal / 10,000 BTU
    // Cast iron radiators: ~3.0 gal / 10,000 BTU
    // Radiant floor PEX: ~2.5 gal / 10,000 BTU
    let factor = 1.5;
    if (emitterStyle === "cast_iron") factor = 3.0;
    if (emitterStyle === "radiant_floor") factor = 2.5;

    const estimated = Math.round((boilerBtu / 10000) * factor);
    setSystemVolumeGallons(Math.max(10, estimated));
    updateParam("vol", String(Math.max(10, estimated)));
    setVolumeEstimatorOpen(false);
  };

  const inputData: ExpansionTankInput = useMemo(
    () => ({
      systemVolumeGallons,
      initialFillTempF,
      maxOperatingTempF,
      initialFillPressurePsig,
      reliefValvePressurePsig,
      safetyPressureBufferPsi,
      fluidType,
      pipingMaterial,
    }),
    [
      systemVolumeGallons,
      initialFillTempF,
      maxOperatingTempF,
      initialFillPressurePsig,
      reliefValvePressurePsig,
      safetyPressureBufferPsi,
      fluidType,
      pipingMaterial,
    ]
  );

  const output: ExpansionTankOutput = useMemo(() => calculateAsmeExpansionTank(inputData), [inputData]);

  const handleExportCsv = () => {
    const headers = [
      "System Volume (gal)",
      "Fluid Type",
      "Initial Temp (°F)",
      "Max Temp (°F)",
      "Fill Pressure (psig)",
      "Relief Valve (psig)",
      "Safety Buffer (psi)",
      "Calculated Tank Volume (gal)",
      "Recommended Commercial Size (gal)",
      "Acceptance Volume (gal)",
      "Acceptance Ratio",
      "Glycol Sizing Penalty (%)",
    ];
    const row = [
      systemVolumeGallons,
      fluidType,
      initialFillTempF,
      maxOperatingTempF,
      initialFillPressurePsig,
      reliefValvePressurePsig,
      safetyPressureBufferPsi,
      output.totalTankVolumeGallons,
      output.recommendedCommercialTankSizeGallons,
      output.acceptanceVolumeGallons,
      output.acceptanceRatio.toFixed(3),
      output.glycolSizingPenaltyPercent,
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ASME_Expansion_Tank_Sizing_${systemVolumeGallons}gal.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-card">
        {/* INPUTS COLUMN */}
        <div className="calculator-inputs">
          <div className="inputs-header">
            <h2 className="inputs-title">ASME Expansion Tank Design Inputs</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
              <CalculatorTrustPill customText="ASME BPVC Section VIII Div 1 • ASHRAE Systems Ch. 15 Compliant" />
            </div>
          </div>

          {/* PRESET CHIPS */}
          <div className="preset-container">
            <label className="input-label" style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              Quick Engineering Presets
            </label>
            <div className="preset-pills" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className="preset-chip"
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.35rem 0.6rem",
                    background: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "0.375rem",
                    color: "var(--ink-secondary)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* SYSTEM VOLUME INPUT */}
          <div className="input-group" style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="system-volume" className="input-label">
                Total System Fluid Volume (Vs)
              </label>
              <button
                type="button"
                onClick={() => setVolumeEstimatorOpen(!volumeEstimatorOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-cooling)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {volumeEstimatorOpen ? "Hide Estimator" : "📐 Estimate from Boiler & Emitters"}
              </button>
            </div>
            <div className="input-with-unit">
              <input
                id="system-volume"
                type="number"
                min={1}
                max={5000}
                step={1}
                value={systemVolumeGallons}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSystemVolumeGallons(val);
                  updateParam("vol", String(val));
                }}
                className="number-input"
              />
              <span className="input-unit">Gallons</span>
            </div>
            <span className="input-hint">
              Total liquid content in boiler heat exchanger, piping mains, and radiant/baseboard zones.
            </span>
          </div>

          {/* VOLUME ESTIMATOR DRAWER */}
          {volumeEstimatorOpen && (
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                padding: "0.85rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                marginBottom: "1rem",
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#38bdf8", marginBottom: "0.5rem" }}>
                Hydronic Loop Volume Estimator
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <div>
                  <label className="input-label" style={{ fontSize: "0.72rem" }}>
                    Boiler Rating (BTU/hr)
                  </label>
                  <input
                    type="number"
                    value={boilerBtu}
                    step={10000}
                    onChange={(e) => setBoilerBtu(Number(e.target.value))}
                    className="number-input"
                    style={{ fontSize: "0.8rem", padding: "0.3rem" }}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: "0.72rem" }}>
                    Emitter Type
                  </label>
                  <select
                    value={emitterStyle}
                    onChange={(e) => setEmitterStyle(e.target.value as any)}
                    className="number-input"
                    style={{ fontSize: "0.8rem", padding: "0.3rem" }}
                  >
                    <option value="copper_fin">Copper Fin-Tube (1.5 gal/10k)</option>
                    <option value="radiant_floor">Radiant Floor PEX (2.5 gal/10k)</option>
                    <option value="cast_iron">Cast Iron Radiator (3.0 gal/10k)</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={applyEstimatedVolume}
                className="action-btn action-btn-primary"
                style={{ fontSize: "0.75rem", padding: "0.35rem 0.8rem", width: "100%" }}
              >
                Apply Estimated Volume (~{Math.round((boilerBtu / 10000) * (emitterStyle === "cast_iron" ? 3.0 : emitterStyle === "radiant_floor" ? 2.5 : 1.5))} gal)
              </button>
            </div>
          )}

          {/* FLUID SELECTION & PIPING */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label htmlFor="fluid-type" className="input-label">
                Hydronic Fluid Type
              </label>
              <select
                id="fluid-type"
                value={fluidType}
                onChange={(e) => {
                  const val = e.target.value as FluidType;
                  setFluidType(val);
                  updateParam("fluid", val);
                }}
                className="number-input"
              >
                <option value="water">Pure Water (0% Glycol)</option>
                <option value="propylene_glycol_20">20% Propylene Glycol</option>
                <option value="propylene_glycol_30">30% Propylene Glycol</option>
                <option value="propylene_glycol_40">40% Propylene Glycol</option>
                <option value="propylene_glycol_50">50% Propylene Glycol</option>
                <option value="ethylene_glycol_20">20% Ethylene Glycol</option>
                <option value="ethylene_glycol_30">30% Ethylene Glycol</option>
                <option value="ethylene_glycol_40">40% Ethylene Glycol</option>
                <option value="ethylene_glycol_50">50% Ethylene Glycol</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="pipe-material" className="input-label">
                Piping Material
              </label>
              <select
                id="pipe-material"
                value={pipingMaterial}
                onChange={(e) => setPipingMaterial(e.target.value as PipingMaterial)}
                className="number-input"
              >
                <option value="carbon_steel">Carbon Steel / Black Iron</option>
                <option value="copper">Copper Tube</option>
                <option value="pex">PEX / Barrier Plastic</option>
              </select>
            </div>
          </div>

          {/* TEMPERATURES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label htmlFor="initial-temp" className="input-label">
                Initial Fill Temp (T1)
              </label>
              <div className="input-with-unit">
                <input
                  id="initial-temp"
                  type="number"
                  min={32}
                  max={120}
                  step={1}
                  value={initialFillTempF}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setInitialFillTempF(val);
                    updateParam("t1", String(val));
                  }}
                  className="number-input"
                />
                <span className="input-unit">°F</span>
              </div>
              <span className="input-hint">Cold water filling temperature (typically 50°F to 65°F).</span>
            </div>

            <div className="input-group">
              <label htmlFor="max-temp" className="input-label">
                Max Operating Temp (T2)
              </label>
              <div className="input-with-unit">
                <input
                  id="max-temp"
                  type="number"
                  min={initialFillTempF + 5}
                  max={240}
                  step={1}
                  value={maxOperatingTempF}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxOperatingTempF(val);
                    updateParam("t2", String(val));
                  }}
                  className="number-input"
                />
                <span className="input-unit">°F</span>
              </div>
              <span className="input-hint">High limit aquastat setpoint (typically 180°F to 200°F).</span>
            </div>
          </div>

          {/* PRESSURES: P1 & PRELIEF */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label htmlFor="fill-pressure" className="input-label">
                Initial Cold Fill Pressure (P1)
              </label>
              <div className="input-with-unit">
                <input
                  id="fill-pressure"
                  type="number"
                  min={5}
                  max={100}
                  step={1}
                  value={initialFillPressurePsig}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setInitialFillPressurePsig(val);
                    updateParam("p1", String(val));
                  }}
                  className="number-input"
                />
                <span className="input-unit">psig</span>
              </div>
              <span className="input-hint">Static head + 4-5 psi cushion. Diaphragm must be precharged to match P1.</span>
            </div>

            <div className="input-group">
              <label htmlFor="relief-pressure" className="input-label">
                Boiler Relief Valve (Prelief)
              </label>
              <div className="input-with-unit">
                <input
                  id="relief-pressure"
                  type="number"
                  min={initialFillPressurePsig + 10}
                  max={150}
                  step={5}
                  value={reliefValvePressurePsig}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setReliefValvePressurePsig(val);
                    updateParam("prelief", String(val));
                  }}
                  className="number-input"
                />
                <span className="input-unit">psig</span>
              </div>
              <span className="input-hint">ASME safety relief valve rating (typically 30 psig, 50 psig, or 75 psig).</span>
            </div>
          </div>

          {/* SAFETY BUFFER */}
          <div className="input-group">
            <label htmlFor="safety-buffer" className="input-label">
              Safety Pressure Buffer (Margin below Relief Valve)
            </label>
            <div className="input-with-unit">
              <input
                id="safety-buffer"
                type="number"
                min={2}
                max={20}
                step={0.5}
                value={safetyPressureBufferPsi}
                onChange={(e) => setSafetyPressureBufferPsi(Number(e.target.value))}
                className="number-input"
              />
              <span className="input-unit">psi</span>
            </div>
            <span className="input-hint">
              Protects relief valve from weeping at peak temperature: P2 = Prelief - Buffer ={" "}
              {reliefValvePressurePsig - safetyPressureBufferPsi} psig.
            </span>
          </div>

          {/* WARNING NOTES */}
          {output.warningNotes.length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              {output.warningNotes.map((note, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.4)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.75rem",
                    color: "#fbbf24",
                    marginBottom: "0.4rem",
                    display: "flex",
                    gap: "0.4rem",
                  }}
                >
                  <span>⚠️</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OUTPUTS COLUMN */}
        <div className="calculator-results">
          <div className="primary-result-card">
            <div className="primary-label">Recommended Commercial ASME Tank</div>
            <div className="primary-value" style={{ color: "var(--accent-cooling)" }}>
              {output.recommendedCommercialTankSizeGallons} Gallons
            </div>
            <div className="primary-subvalue">
              ASME Calculated Minimum Volume: <strong>{output.totalTankVolumeGallons} Gal</strong>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  background: output.acceptanceRatio >= 0.25 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                  color: output.acceptanceRatio >= 0.25 ? "#34d399" : "#fbbf24",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Acceptance Ratio Ar = {output.acceptanceRatio.toFixed(3)} ({Math.round(output.acceptanceRatio * 100)}% usable)
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASME BPVC Section VIII", "ASHRAE Systems Ch. 15", "Uniform Mechanical Code"]} />

          {/* DYNAMIC SVG TANK & PRESSURE VISUALIZER */}
          <ExpansionTankVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Acceptance Volume (Vacc)</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.acceptanceVolumeGallons} Gallons
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Fluid Volumetric Expansion</div>
              <div className="item-value">+{output.netFluidVolumetricExpansionPercent}%</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Peak Operating Pressure (P2)</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.maxOperatingPressurePsig} psig ({output.maxOperatingPressurePsia} psia)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Air Precharge Pressure (P1)</div>
              <div className="item-value">{output.initialPressurePsig} psig (Pre-fill)</div>
            </div>
          </div>

          {/* STEP-BY-STEP ASME DERIVATION DRAWER */}
          <div style={{ marginTop: "1rem" }}>
            <button
              type="button"
              onClick={() => setShowDerivation(!showDerivation)}
              style={{
                background: "rgba(30, 41, 59, 0.6)",
                border: "1px solid var(--border-color)",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.8rem",
                width: "100%",
                color: "var(--ink-primary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>🔬 View ASME Section VIII Equation Derivation</span>
              <span>{showDerivation ? "▲" : "▼"}</span>
            </button>

            {showDerivation && (
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid var(--border-color)",
                  borderTop: "none",
                  borderRadius: "0 0 0.375rem 0.375rem",
                  padding: "0.85rem",
                  fontSize: "0.78rem",
                  color: "var(--ink-secondary)",
                  lineHeight: "1.6",
                }}
              >
                <div style={{ color: "#f8fafc", fontWeight: 700, marginBottom: "0.4rem" }}>
                  1. Acceptance Volume (Vacc):
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.55rem 0.75rem", borderRadius: "4px" }}>
                  Vacc = Vs × [(ν₂ / ν₁ - 1) - 3·α·ΔT]<br />
                  Vacc = {systemVolumeGallons} × [({output.maxSpecificVolumeCuFtPerLb.toFixed(6)} / {output.initialSpecificVolumeCuFtPerLb.toFixed(6)} - 1) - {output.pipingVolumetricExpansionGallons / systemVolumeGallons}]<br />
                  Vacc = <strong style={{ color: "#38bdf8" }}>{output.acceptanceVolumeGallons} gal</strong>
                </div>

                <div style={{ color: "#f8fafc", fontWeight: 700, margin: "0.6rem 0 0.4rem" }}>
                  2. Acceptance Ratio (Ar) from Boyle&apos;s Law:
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.55rem 0.75rem", borderRadius: "4px" }}>
                  Ar = 1 - (P₁ / P₂) [absolute pressure in psia]<br />
                  Ar = 1 - ({output.initialPressurePsia} psia / {output.maxOperatingPressurePsia} psia)<br />
                  Ar = <strong style={{ color: "#fbbf24" }}>{output.acceptanceRatio.toFixed(3)}</strong>
                </div>

                <div style={{ color: "#f8fafc", fontWeight: 700, margin: "0.6rem 0 0.4rem" }}>
                  3. Total Minimum Tank Volume (Vt):
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.55rem 0.75rem", borderRadius: "4px" }}>
                  Vt = Vacc / Ar = {output.acceptanceVolumeGallons} / {output.acceptanceRatio.toFixed(3)} ={" "}
                  <strong style={{ color: "#38bdf8" }}>{output.totalTankVolumeGallons} gal</strong><br />
                  Selected Commercial ASME Standard Size:{" "}
                  <strong style={{ color: "#34d399" }}>{output.recommendedCommercialTankSizeGallons} gal</strong>
                </div>
              </div>
            )}
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/expansion-tank-calculator"
            toolName="ASME Hydronic Expansion Tank Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Upstream & Downstream Hydronic System Workflows</div>
            <Link href="/calculators/boiler-size-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Size Hydronic Boiler, Net AHRI Load & Baseboards</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/equivalent-length-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate Hydronic Piping Equivalent Length & Friction Loss</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-loss-calculator">
              <span>Verify Building Thermal Heat Loss with ACCA Manual J</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Tank Volume"
        value={`${output.recommendedCommercialTankSizeGallons} Gal`}
        unit={`(ASME: ${output.totalTankVolumeGallons} gal)`}
      />
    </div>
  );
}
