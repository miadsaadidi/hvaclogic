"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateCombustionAir,
  LouverMaterial,
  GasAppliance,
  CombustionAirInput,
  CombustionAirOutput,
} from "@/lib/math/combustion-air";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { CombustionAirVisualizer } from "@/components/calculator/visualizers/CombustionAirVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

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

  // Hydrate from URL
  useEffect(() => {
    const urlFurnace = Number(getParam("furnace", "80000"));
    const urlWaterHtr = Number(getParam("waterHtr", "40000"));
    const urlBoiler = Number(getParam("boiler", "0"));
    const urlLen = Number(getParam("len", "8"));
    const urlWidth = Number(getParam("width", "8"));
    const urlHeight = Number(getParam("height", "8"));
    const urlLouver = getParam("louver", "metal") as LouverMaterial;

    if (!isNaN(urlFurnace) && urlFurnace >= 0) setFurnaceBtu(urlFurnace);
    if (!isNaN(urlWaterHtr) && urlWaterHtr >= 0) setWaterHtrBtu(urlWaterHtr);
    if (!isNaN(urlBoiler) && urlBoiler >= 0) setBoilerBtu(urlBoiler);
    if (!isNaN(urlLen) && urlLen > 0) setRoomLength(urlLen);
    if (!isNaN(urlWidth) && urlWidth > 0) setRoomWidth(urlWidth);
    if (!isNaN(urlHeight) && urlHeight > 0) setRoomHeight(urlHeight);
    if (["metal", "wood", "direct_screen"].includes(urlLouver)) setLouverMaterial(urlLouver);
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
    };

    return calculateCombustionAir(input);
  }, [furnaceBtu, waterHtrBtu, boilerBtu, roomLength, roomWidth, roomHeight, louverMaterial]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = `Total Combined Gas Input,${output.totalInputBtuHr},"BTU/hr"\nMechanical Room Dimensions,"${roomLength}' x ${roomWidth}' x ${roomHeight}'",""\nRoom Volume,${output.roomVolumeCuFt},"cu ft"\nRequired Unconfined Volume,${output.requiredUnconfinedVolumeCuFt},"cu ft"\nSpace Classification,"${output.isConfinedSpace ? "CONFINED SPACE" : "UNCONFINED SPACE"}",""\nLouver Material,"${louverMaterial}",""\n\n${output.methods.map((m) => `"${m.title}",${m.netFreeAreaSqIn} sq in Net,${m.grossLouverAreaSqIn} sq in Gross,Ø ${m.recommendedRoundDuctDiameterIn}" Round`).join("\n")}\n`;
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `combustion-air-${output.totalInputBtuHr}BTU.csv`;
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
                step={10000}
                min={0}
                max={1000000}
                value={boilerBtu}
                onChange={(e) => setBoilerBtu(Number(e.target.value))}
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
                <option value="metal">Metal Louvers (75% Free Area)</option>
                <option value="wood">Wood Louvers (25% Free Area)</option>
                <option value="direct_screen">Direct Duct / Screen (100%)</option>
              </select>
            </div>
          </div>

          {/* ROOM DIMENSIONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-l">Length (Ft)</label>
              <input
                id="room-l"
                type="number"
                min={3}
                max={100}
                value={roomLength}
                onChange={(e) => setRoomLength(Number(e.target.value))}
                className="input-number"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-w">Width (Ft)</label>
              <input
                id="room-w"
                type="number"
                min={3}
                max={100}
                value={roomWidth}
                onChange={(e) => setRoomWidth(Number(e.target.value))}
                className="input-number"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="room-h">Height (Ft)</label>
              <input
                id="room-h"
                type="number"
                min={6}
                max={25}
                value={roomHeight}
                onChange={(e) => setRoomHeight(Number(e.target.value))}
                className="input-number"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Combustion Air Sizing Result">
            <div className="result-label">NFPA 54 Space Classification</div>
            <div
              className="result-value"
              style={{
                color: output.isConfinedSpace ? "var(--accent-danger)" : "var(--accent-success)",
              }}
            >
              {output.isConfinedSpace ? "CONFINED SPACE" : "UNCONFINED SPACE"}
            </div>
            <div className="result-unit">
              Enclosed Volume: <strong>{output.roomVolumeCuFt.toLocaleString()} cu ft</strong> (Requires: {output.requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft)
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
                  background: output.isConfinedSpace ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                  color: output.isConfinedSpace ? "var(--accent-danger)" : "var(--accent-success)",
                  border: "1px solid currentColor",
                }}
              >
                {output.isConfinedSpace
                  ? `Deficit: ${output.volumeDeficitCuFt.toLocaleString()} cu ft — Permanent Combustion Openings Required`
                  : "Adequate Natural Infiltration Air Available"}
              </span>
            </div>
          </div>

          <StandardsBadge standards={["NFPA 54 (National Fuel Gas)", "IFGC Section 304", "ASHRAE Standard 62.2"]} />

          {/* REACTIVE VISUALIZER */}
          <CombustionAirVisualizer output={output} />

          {/* 4-METHOD NFPA 54 SIZING TABLE */}
          <div style={{ marginTop: "0.75rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "0.85rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              NFPA 54 / IFGC Opening Sizing Options:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.78rem" }}>
              {output.methods.map((m) => (
                <div
                  key={m.methodId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.4rem 0.6rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "4px",
                  }}
                >
                  <div>
                    <strong style={{ color: "var(--ink)" }}>{m.title}</strong>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{m.location}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--accent-cooling)" }}>
                      {m.grossLouverAreaSqIn} sq in. ({m.netFreeAreaSqIn} sq in. Net)
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      Ø {m.recommendedRoundDuctDiameterIn}&quot; Round Duct
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

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
        unit={`(${output.methods[1]?.grossLouverAreaSqIn} sq in)`}
      />
    </div>
  );
}
