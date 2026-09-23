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
    id: "residential",
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
    id: "snow_melt",
    label: "❄️ Snow Melt Hydronic Loop (150 gal, 140°F, 50% Glycol)",
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
    id: "commercial",
    label: "🏢 Commercial Hot Water Boiler (400 gal, 200°F, Water, 50 psi)",
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
    id: "high_rise",
    label: "🏛️ High-Rise Hydronic Loop (250 gal, 180°F, 30% Glycol, 60 psi)",
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
  const [selectedPreset, setSelectedPreset] = useState<string | null>("residential");
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
    setSelectedPreset(preset.id);
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

  const isNarrow = output.acceptanceRatio < 0.25;
  const isOptimal = output.acceptanceRatio >= 0.30 && output.acceptanceRatio <= 0.60;
  const statusColor = isNarrow ? "#f59e0b" : isOptimal ? "#10b981" : "#38bdf8";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* 1. Primary Result Hero Card: Title + Value First */}
      <div
        style={{
          background: "linear-gradient(145deg, #090e1a 0%, #0d1a2d 50%, #071f30 100%)",
          border: "1px solid var(--border-color, #1e293b)",
          borderTop: `3px solid ${statusColor}`,
          borderRadius: "0.75rem",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Recommended Commercial Tank Size (ASME-Rated)
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1.1, marginTop: "0.25rem" }}>
              {output.recommendedCommercialTankSizeGallons}{" "}
              <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "#94a3b8" }}>
                Gallons
              </span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "0.35rem" }}>
              ASHRAE Minimum Sizing Requirement: <strong style={{ color: "#38bdf8" }}>{output.totalTankVolumeGallons} Gal</strong>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                background: `${statusColor}22`,
                color: statusColor,
                border: `1px solid ${statusColor}55`,
              }}
            >
              Acceptance Ratio Ar = {output.acceptanceRatio.toFixed(3)} ({Math.round(output.acceptanceRatio * 100)}% usable)
            </span>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              Sizing: <strong style={{ color: "#f8fafc" }}>ASHRAE Ch. 15</strong> • Vessel: <strong style={{ color: "#f8fafc" }}>ASME Sec. VIII</strong>
            </div>
          </div>
        </div>

        {/* Secondary Quick Metrics Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginTop: "0.5rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "0.82rem",
          }}
        >
          <div>
            <span style={{ color: "#94a3b8" }}>Acceptance Volume (Vacc): </span>
            <strong style={{ color: "#38bdf8", fontSize: "0.95rem" }}>
              {output.acceptanceVolumeGallons} Gal
            </strong>
          </div>
          <div>
            <span style={{ color: "#94a3b8" }}>Fluid Net Expansion: </span>
            <strong style={{ color: "#34d399" }}>+{output.netFluidVolumetricExpansionPercent}%</strong>
          </div>
          <div>
            <span style={{ color: "#94a3b8" }}>Operating Range: </span>
            <strong style={{ color: "#f8fafc" }}>
              {output.initialPressurePsig} ➔ {output.maxOperatingPressurePsig} psig
            </strong>
            <span style={{ color: "#94a3b8" }}> (Relief: {output.reliefValvePressurePsig} psig)</span>
          </div>
          {output.glycolSizingPenaltyPercent > 0 && (
            <div>
              <span style={{ color: "#94a3b8" }}>Glycol Sizing Penalty: </span>
              <strong style={{ color: "#fbbf24" }}>+{output.glycolSizingPenaltyPercent}%</strong>
            </div>
          )}
        </div>
      </div>

      {/* 2. Preset Buttons with Standard System Classes and Distinct Active State */}
      <div className="preset-chips-container" role="group" aria-label="Hydronic System Archetypes">
        <label className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.4rem", display: "block" }}>
          Quick Engineering Presets
        </label>
        <div className="preset-chips-grid">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`preset-chip-btn ${isSelected ? "active" : ""}`}
                aria-pressed={isSelected}
              >
                {isSelected && <span className="preset-check-icon">✓</span>}
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Calculator Grid */}
      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          <CalculatorTrustPill customText="ASHRAE Systems Ch. 15 Sizing • ASME Sec. VIII Construction" />

          {/* CARD 1: SYSTEM FLUID & VOLUME */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "1.1rem" }}>💧</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                  1. Hydronic Fluid &amp; Volume
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVolumeEstimatorOpen(!volumeEstimatorOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-primary)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {volumeEstimatorOpen ? "✕ Close Estimator" : "📐 Estimate System Volume"}
              </button>
            </div>

            {/* SYSTEM VOLUME INPUT */}
            <div className="form-group">
              <label htmlFor="system-volume">
                <span>Total System Fluid Volume (Vs)</span>
                <span className="unit-label">Gallons</span>
              </label>
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
                  setSelectedPreset(null);
                  updateParam("vol", String(val));
                }}
                className="input-number"
              />
              <p className="input-help">
                Total liquid content in boiler heat exchanger, piping mains, and radiant/baseboard zones.
              </p>
            </div>

            {/* VOLUME ESTIMATOR DRAWER */}
            {volumeEstimatorOpen && (
              <div
                style={{
                  background: "var(--surface-raised)",
                  padding: "0.9rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                  Hydronic Loop Volume Estimator (Rule-of-Thumb)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  <div className="form-group">
                    <label htmlFor="boiler-btu" style={{ fontSize: "0.72rem" }}>
                      <span>Boiler Output</span>
                      <span className="unit-label">BTU/hr</span>
                    </label>
                    <input
                      id="boiler-btu"
                      type="number"
                      value={boilerBtu}
                      step={10000}
                      onChange={(e) => setBoilerBtu(Number(e.target.value))}
                      className="input-number"
                      style={{ height: "36px", fontSize: "0.85rem" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emitter-type" style={{ fontSize: "0.72rem" }}>
                      <span>Emitter Type</span>
                    </label>
                    <select
                      id="emitter-type"
                      value={emitterStyle}
                      onChange={(e) => setEmitterStyle(e.target.value as any)}
                      className="input-number"
                      style={{ height: "36px", fontSize: "0.85rem", cursor: "pointer" }}
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
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", width: "100%", height: "34px" }}
                >
                  Apply Estimated Volume (~{Math.round((boilerBtu / 10000) * (emitterStyle === "cast_iron" ? 3.0 : emitterStyle === "radiant_floor" ? 2.5 : 1.5))} gal)
                </button>
              </div>
            )}

            {/* FLUID & PIPING IN A 2-COLUMN GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group">
                <label htmlFor="fluid-type">
                  <span>Hydronic Fluid</span>
                  <span className="unit-label">Type &amp; Glycol %</span>
                </label>
                <select
                  id="fluid-type"
                  value={fluidType}
                  onChange={(e) => {
                    const val = e.target.value as FluidType;
                    setFluidType(val);
                    setSelectedPreset(null);
                    updateParam("fluid", val);
                  }}
                  className="input-number"
                  style={{ cursor: "pointer" }}
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

              <div className="form-group">
                <label htmlFor="pipe-material">
                  <span>Piping Material</span>
                  <span className="unit-label">Expansion α</span>
                </label>
                <select
                  id="pipe-material"
                  value={pipingMaterial}
                  onChange={(e) => {
                    setPipingMaterial(e.target.value as PipingMaterial);
                    setSelectedPreset(null);
                  }}
                  className="input-number"
                  style={{ cursor: "pointer" }}
                >
                  <option value="carbon_steel">Carbon Steel / Black Iron</option>
                  <option value="copper">Copper Tube</option>
                  <option value="pex">PEX / Barrier Plastic</option>
                </select>
              </div>
            </div>
          </div>

          {/* CARD 2: OPERATING TEMPERATURES */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "1.1rem" }}>🌡️</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                  2. Operating Temperatures (T1 ➔ T2)
                </span>
              </div>
              <span className="metric-pill">
                ΔT = {maxOperatingTempF - initialFillTempF}°F (+{output.netFluidVolumetricExpansionPercent}% expansion)
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group">
                <label htmlFor="initial-temp">
                  <span>Initial Cold Fill (T1)</span>
                  <span className="unit-label">°F</span>
                </label>
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
                    setSelectedPreset(null);
                    updateParam("t1", String(val));
                  }}
                  className="input-number"
                />
                <p className="input-help">Cold fill water temp (50°F to 65°F).</p>
              </div>

              <div className="form-group">
                <label htmlFor="max-temp">
                  <span>Max Operating Temp (T2)</span>
                  <span className="unit-label">°F</span>
                </label>
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
                    setSelectedPreset(null);
                    updateParam("t2", String(val));
                  }}
                  className="input-number"
                />
                <p className="input-help">Aquastat high limit (180°F to 200°F).</p>
              </div>
            </div>
          </div>

          {/* CARD 3: ASME PRESSURE SCHEDULE */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "1.1rem" }}>⚖️</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                  3. ASME Pressure Schedule (P1 ➔ P2 ➔ Relief)
                </span>
              </div>
              <span className="metric-pill">
                P2 = {reliefValvePressurePsig - safetyPressureBufferPsi} psig ({(reliefValvePressurePsig - safetyPressureBufferPsi + 14.7).toFixed(1)} psia)
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group">
                <label htmlFor="fill-pressure">
                  <span>Cold Fill / Precharge (P1)</span>
                  <span className="unit-label">psig</span>
                </label>
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
                    setSelectedPreset(null);
                    updateParam("p1", String(val));
                  }}
                  className="input-number"
                />
                <p className="input-help">Static head + 4–5 psi cushion.</p>
              </div>

              <div className="form-group">
                <label htmlFor="relief-pressure">
                  <span>Safety Relief Valve (Prelief)</span>
                  <span className="unit-label">psig</span>
                </label>
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
                    setSelectedPreset(null);
                    updateParam("prelief", String(val));
                  }}
                  className="input-number"
                />
                <p className="input-help">Relief valve rating (30, 50, or 75 psig).</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="safety-buffer">
                <span>Safety Pressure Buffer Margin</span>
                <span className="unit-label">psi below relief valve</span>
              </label>
              <input
                id="safety-buffer"
                type="number"
                min={2}
                max={20}
                step={0.5}
                value={safetyPressureBufferPsi}
                onChange={(e) => {
                  setSafetyPressureBufferPsi(Number(e.target.value));
                  setSelectedPreset(null);
                }}
                className="input-number"
              />
              <p className="input-help">
                Protects relief valve from weeping at peak temperature: P2 = Prelief - Buffer ={" "}
                <strong>{reliefValvePressurePsig - safetyPressureBufferPsi} psig</strong> ({((reliefValvePressurePsig - safetyPressureBufferPsi) + 14.7).toFixed(1)} psia).
              </p>
            </div>
          </div>

          {/* WARNING NOTES */}
          {output.warningNotes.length > 0 && (
            <div style={{ marginTop: "0.25rem" }}>
              {output.warningNotes.map((note, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.4)",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 0.85rem",
                    fontSize: "0.78rem",
                    color: "#fbbf24",
                    marginBottom: "0.4rem",
                    display: "flex",
                    gap: "0.45rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>⚠️</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
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
                background: "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                borderRadius: showDerivation ? "0.375rem 0.375rem 0 0" : "0.375rem",
                padding: "0.6rem 0.85rem",
                width: "100%",
                color: "var(--ink)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>🔬 View ASHRAE Ch. 15 Sizing Derivation &amp; ASME Pressure Limits</span>
              <span style={{ color: "var(--accent-primary)" }}>{showDerivation ? "▲ Hide" : "▼ Expand"}</span>
            </button>

            {showDerivation && (
              <div
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderTop: "none",
                  borderRadius: "0 0 0.375rem 0.375rem",
                  padding: "0.85rem",
                  fontSize: "0.8rem",
                  color: "var(--ink)",
                  lineHeight: "1.6",
                }}
              >
                <div style={{ color: "var(--ink)", fontWeight: 700, marginBottom: "0.4rem" }}>
                  1. Acceptance Volume (Vacc) per ASHRAE Ch. 15 (Eq. 13 &amp; 14):
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.6rem 0.8rem", borderRadius: "6px" }}>
                  Vacc = Vs × [(ν₂ / ν₁ - 1) - 3·α·ΔT]<br />
                  Vacc = {systemVolumeGallons} × [({output.maxSpecificVolumeCuFtPerLb.toFixed(6)} / {output.initialSpecificVolumeCuFtPerLb.toFixed(6)} - 1) - {(output.pipingVolumetricExpansionGallons / systemVolumeGallons).toFixed(6)}]<br />
                  Vacc = <strong style={{ color: "#38bdf8" }}>{output.acceptanceVolumeGallons} gal</strong>
                </div>

                <div style={{ color: "var(--ink)", fontWeight: 700, margin: "0.6rem 0 0.4rem" }}>
                  2. Acceptance Ratio (Ar) from Boyle&apos;s Law:
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.6rem 0.8rem", borderRadius: "6px" }}>
                  Ar = 1 - (P₁ / P₂) [absolute pressure in psia]<br />
                  Ar = 1 - ({output.initialPressurePsia} psia / {output.maxOperatingPressurePsia} psia)<br />
                  Ar = <strong style={{ color: "#fbbf24" }}>{output.acceptanceRatio.toFixed(3)}</strong>
                </div>

                <div style={{ color: "var(--ink)", fontWeight: 700, margin: "0.6rem 0 0.4rem" }}>
                  3. Total Minimum Tank Volume (Vt) per ASHRAE Ch. 15:
                </div>
                <div style={{ fontFamily: "monospace", background: "#090d16", border: "1px solid #1e293b", color: "#f8fafc", padding: "0.6rem 0.8rem", borderRadius: "6px" }}>
                  Vt = Vacc / Ar = {output.acceptanceVolumeGallons} / {output.acceptanceRatio.toFixed(3)} ={" "}
                  <strong style={{ color: "#38bdf8" }}>{output.totalTankVolumeGallons} gal</strong><br />
                  Selected Commercial ASME Standard Size:{" "}
                  <strong style={{ color: "#34d399" }}>{output.recommendedCommercialTankSizeGallons} gal</strong>
                </div>
              </div>
            )}
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER - PLACED AFTER GRAPH/SCHEMAS */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/expansion-tank-calculator"
            toolName="ASHRAE / ASME Hydronic Expansion Tank Calculator"
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
        unit={`(ASHRAE min: ${output.totalTankVolumeGallons} gal)`}
      />
    </div>
  );
}
