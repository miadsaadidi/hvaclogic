"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateCombustionAir,
  LouverMaterial,
  GasAppliance,
  CombustionAirInput,
  CombustionAirOutput,
  LOUVER_PRESETS,
} from "@/lib/math/combustion-air";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { CombustionAirVisualizer } from "@/components/calculator/visualizers/CombustionAirVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/seo/StandardsBadge";

const PRESETS = [
  {
    label: "🏠 Closet (80k Furnace + 40k Water Htr)",
    furnaceBtu: 80000,
    waterHtrBtu: 40000,
    boilerBtu: 0,
    length: 8,
    width: 8,
    height: 8,
    louver: "metal" as LouverMaterial,
    customLouverPct: 75,
  },
  {
    label: "🏡 Utility Room (60k Furnace + 36k Water Htr)",
    furnaceBtu: 60000,
    waterHtrBtu: 36000,
    boilerBtu: 0,
    length: 12,
    width: 10,
    height: 8,
    louver: "metal" as LouverMaterial,
    customLouverPct: 75,
  },
  {
    label: "🏢 Boiler Room (180k Boiler + 50k Water Htr)",
    furnaceBtu: 0,
    waterHtrBtu: 50000,
    boilerBtu: 180000,
    length: 14,
    width: 14,
    height: 9,
    louver: "metal" as LouverMaterial,
    customLouverPct: 75,
  },
  {
    label: "🔄 Open Basement (80k Furnace / Unconfined)",
    furnaceBtu: 80000,
    waterHtrBtu: 0,
    boilerBtu: 0,
    length: 30,
    width: 25,
    height: 8,
    louver: "metal" as LouverMaterial,
    customLouverPct: 75,
  },
];

export function CombustionAirTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [furnaceBtu, setFurnaceBtu] = useState<number>(80000);
  const [waterHtrBtu, setWaterHtrBtu] = useState<number>(40000);
  const [boilerBtu, setBoilerBtu] = useState<number>(0);
  const [roomLength, setRoomLength] = useState<number>(8);
  const [roomWidth, setRoomWidth] = useState<number>(8);
  const [roomHeight, setRoomHeight] = useState<number>(8);
  const [louverMaterial, setLouverMaterial] = useState<LouverMaterial>("metal");
  const [customLouverPct, setCustomLouverPct] = useState<number>(75);

  // Hydrate from URL
  useEffect(() => {
    const urlFurnace = Number(getParam("furnace", "80000"));
    const urlWaterHtr = Number(getParam("waterHtr", "40000"));
    const urlBoiler = Number(getParam("boiler", "0"));
    const urlLen = Number(getParam("len", "8"));
    const urlWidth = Number(getParam("width", "8"));
    const urlHeight = Number(getParam("height", "8"));
    const urlLouver = getParam("louver", "metal") as LouverMaterial;
    const urlCustomPct = Number(getParam("louverPct", "75"));

    if (!isNaN(urlFurnace) && urlFurnace >= 0) setFurnaceBtu(urlFurnace);
    if (!isNaN(urlWaterHtr) && urlWaterHtr >= 0) setWaterHtrBtu(urlWaterHtr);
    if (!isNaN(urlBoiler) && urlBoiler >= 0) setBoilerBtu(urlBoiler);
    if (!isNaN(urlLen) && urlLen > 0) setRoomLength(urlLen);
    if (!isNaN(urlWidth) && urlWidth > 0) setRoomWidth(urlWidth);
    if (!isNaN(urlHeight) && urlHeight > 0) setRoomHeight(urlHeight);
    if (["metal", "wood", "direct_screen", "custom"].includes(urlLouver)) setLouverMaterial(urlLouver);
    if (!isNaN(urlCustomPct) && urlCustomPct > 0 && urlCustomPct <= 100) setCustomLouverPct(urlCustomPct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (p: typeof PRESETS[0]) => {
    setFurnaceBtu(p.furnaceBtu);
    setWaterHtrBtu(p.waterHtrBtu);
    setBoilerBtu(p.boilerBtu);
    setRoomLength(p.length);
    setRoomWidth(p.width);
    setRoomHeight(p.height);
    setLouverMaterial(p.louver);
    setCustomLouverPct(p.customLouverPct);

    updateParam("furnace", p.furnaceBtu);
    updateParam("waterHtr", p.waterHtrBtu);
    updateParam("boiler", p.boilerBtu);
    updateParam("len", p.length);
    updateParam("width", p.width);
    updateParam("height", p.height);
    updateParam("louver", p.louver);
  };

  // Perform Calculation
  const output: CombustionAirOutput = useMemo(() => {
    const appliances: GasAppliance[] = [
      { id: "furnace", name: "Gas Furnace", inputBtuHr: furnaceBtu },
      { id: "water_heater", name: "Water Heater", inputBtuHr: waterHtrBtu },
      { id: "boiler", name: "Boiler / Unit Heater", inputBtuHr: boilerBtu },
    ];

    const input: CombustionAirInput = {
      appliances,
      roomLengthFt: roomLength,
      roomWidthFt: roomWidth,
      roomHeightFt: roomHeight,
      louverMaterial,
      customLouverPercent: customLouverPct,
    };

    return calculateCombustionAir(input);
  }, [furnaceBtu, waterHtrBtu, boilerBtu, roomLength, roomWidth, roomHeight, louverMaterial, customLouverPct]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit,Engineering Notes\n";
    const rows = [
      `Total Combined Gas Input,${output.totalInputBtuHr},"BTU/hr","Sum of nameplate appliance input ratings"`,
      `Mechanical Room Dimensions,"${roomLength}' x ${roomWidth}' x ${roomHeight}'","","Length x Width x Ceiling Height"`,
      `Enclosed Room Volume,${output.roomVolumeCuFt},"cu ft","Calculated volume"`,
      `Required Unconfined Volume,${output.requiredUnconfinedVolumeCuFt},"cu ft","NFPA 54 Standard Method (50 cu ft / 1,000 BTU/hr)"`,
      `Space Classification,"${output.isConfinedSpace ? "CONFINED SPACE" : "UNCONFINED SPACE"}","","${output.volumePercentageOfRequired}% of required volume"`,
      `Volume Deficit,${output.volumeDeficitCuFt},"cu ft","Volume short of unconfined threshold"`,
      `Louver Specification,"${output.louverDescription}","","${output.louverFreeAreaPercentage}% assumed/specified free area"`,
      `\n--- NFPA 54 / IFGC OPENING SIZING OPTIONS ---`,
      ...output.methods.map(
        (m) =>
          `"${m.title}",${m.netFreeAreaSqIn} sq in Net Free Area,${m.grossLouverAreaSqIn} sq in Gross Louver,"Equivalent Ø ${m.calculatedRoundDiameterIn} in (Standard Trade Ø ${m.recommendedRoundDuctDiameterIn} in)"`
      ),
    ].join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `combustion-air-sizing-${output.totalInputBtuHr}BTU.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Combustion Air Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Mechanical Room Scenarios:</span>
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
            title="Reset to Closet Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((p, idx) => (
          <button
            key={p.label}
            data-testid={`preset-btn-${idx}`}
            onClick={() => handlePresetSelect(p)}
            className={`preset-chip-btn ${furnaceBtu === p.furnaceBtu && roomLength === p.length ? "active" : ""}`}
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

          {/* APPLIANCE BTU LOADS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="furnace-input">
                <span>Furnace Input</span>
                <span className="unit-label">BTU/hr</span>
              </label>
              <input
                id="furnace-input"
                type="number"
                inputMode="decimal"
                step={5000}
                min={0}
                max={500000}
                value={furnaceBtu}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFurnaceBtu(val);
                  updateParam("furnace", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="waterhtr-input">
                <span>Water Heater</span>
                <span className="unit-label">BTU/hr</span>
              </label>
              <input
                id="waterhtr-input"
                type="number"
                inputMode="decimal"
                step={2000}
                min={0}
                max={200000}
                value={waterHtrBtu}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWaterHtrBtu(val);
                  updateParam("waterHtr", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* BOILER / EXTRA APPLIANCE & LOUVER MATERIAL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="boiler-input">
                <span>Boiler / Unit Htr</span>
                <span className="unit-label">BTU/hr</span>
              </label>
              <input
                id="boiler-input"
                type="number"
                inputMode="decimal"
                step={10000}
                min={0}
                max={1000000}
                value={boilerBtu}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBoilerBtu(val);
                  updateParam("boiler", val);
                }}
                className="input-number"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="louver-select">
                <span>Louver Type</span>
                <span className="unit-label">Free Area</span>
              </label>
              <select
                id="louver-select"
                value={louverMaterial}
                onChange={(e) => {
                  const val = e.target.value as LouverMaterial;
                  setLouverMaterial(val);
                  updateParam("louver", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="metal">Metal Louvers (Assumed 75% Free Area)</option>
                <option value="wood">Wood Louvers (Assumed 25% Free Area)</option>
                <option value="direct_screen">Direct Screen / Duct (100% Free Area)</option>
                <option value="custom">Custom Free Area Percentage...</option>
              </select>
            </div>
          </div>

          {/* CUSTOM LOUVER FREE AREA INPUT IF SELECTED */}
          {louverMaterial === "custom" && (
            <div className="form-group" style={{ marginBottom: "0.5rem" }}>
              <label htmlFor="custom-louver-pct">
                <span>Specified Manufacturer Free Area</span>
                <span className="unit-label">% Free Area</span>
              </label>
              <input
                id="custom-louver-pct"
                type="number"
                min={10}
                max={100}
                value={customLouverPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomLouverPct(val);
                  updateParam("louverPct", val);
                }}
                className="input-number"
              />
            </div>
          )}

          {/* ROOM DIMENSIONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-l">Length (Ft)</label>
              <input
                id="room-l"
                type="number"
                inputMode="decimal"
                min={3}
                max={100}
                value={roomLength}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRoomLength(val);
                  updateParam("len", val);
                }}
                className="input-number"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-w">Width (Ft)</label>
              <input
                id="room-w"
                type="number"
                inputMode="decimal"
                min={3}
                max={100}
                value={roomWidth}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRoomWidth(val);
                  updateParam("width", val);
                }}
                className="input-number"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-h">Height (Ft)</label>
              <input
                id="room-h"
                type="number"
                inputMode="decimal"
                min={6}
                max={25}
                value={roomHeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRoomHeight(val);
                  updateParam("height", val);
                }}
                className="input-number"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Combustion Air Sizing Result">
            <div className="result-label">NFPA 54 / IFGC Space Classification</div>
            <div
              className="result-value"
              style={{
                color: output.isConfinedSpace ? "var(--accent-danger)" : "var(--accent-success)",
              }}
            >
              {output.isConfinedSpace ? "CONFINED SPACE" : "UNCONFINED SPACE"}
            </div>
            <div className="result-unit">
              Enclosed Volume: <strong>{output.roomVolumeCuFt.toLocaleString()} cu ft</strong> (Threshold: {output.requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft)
            </div>
            <div style={{ marginTop: "0.4rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: output.isConfinedSpace ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                  color: output.isConfinedSpace ? "var(--accent-danger)" : "var(--accent-success)",
                  border: "1px solid currentColor",
                }}
              >
                {output.isConfinedSpace
                  ? `Volume Deficit: ${output.volumeDeficitCuFt.toLocaleString()} cu ft — Permanent Openings Sized Below`
                  : "Meets Standard Method (50 cu ft / 1k BTU). Infiltration rate must be ≥ 0.40 ACH"}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["NFPA", "IFGC"]} />

          {/* REACTIVE VISUALIZER */}
          <CombustionAirVisualizer output={output} />

          {/* 4-METHOD NFPA 54 SIZING TABLE */}
          <div style={{ marginTop: "0.75rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ink)" }}>
                NFPA 54 / IFGC Opening Sizing Methods ({output.louverFreeAreaPercentage}% Louver Free Area):
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.78rem" }}>
              {output.methods.map((m) => (
                <div
                  key={m.methodId}
                  style={{
                    padding: "0.55rem 0.7rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div>
                      <strong style={{ color: "var(--ink)", fontSize: "0.82rem" }}>{m.title}</strong>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{m.location}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--accent-heating)", marginTop: "0.15rem" }}>{m.codeRule}</div>
                    </div>
                    <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: 700, color: "var(--accent-cooling)", fontSize: "0.88rem" }}>
                        {m.netFreeAreaSqIn} sq in. Net Free Area
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                        Gross: <strong>{m.grossLouverAreaSqIn} sq in.</strong> (Ø {m.calculatedRoundDiameterIn}&quot; equiv / Ø {m.recommendedRoundDuctDiameterIn}&quot; trade)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/combustion-air-calculator"
            toolName="Combustion Air & Confined Space Sizer (NFPA 54 / IFGC)"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Heating System Sizing</div>
            <Link href="/calculators/furnace-size-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Size Furnace Input &amp; Output BTU (80% vs 96% AFUE)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/boiler-size-calculator">
              <span>Size Hydronic Boilers &amp; Radiator EDR</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Combustion Air"
        value={output.isConfinedSpace ? "Confined Space" : "Unconfined"}
        unit={`(${output.methods[1]?.grossLouverAreaSqIn} sq in gross)`}
      />
    </div>
  );
}
