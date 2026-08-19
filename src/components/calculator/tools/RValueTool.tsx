"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateAssemblyThermal,
  calculateLayerRValue,
  MaterialLayer,
  STANDARD_BUILDING_MATERIALS,
  AssemblyInput,
  AssemblyOutput,
} from "@/lib/math/r-value";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { RValueAssemblyVisualizer } from "@/components/calculator/visualizers/RValueAssemblyVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

const DEFAULT_WALL_LAYERS: MaterialLayer[] = [
  { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
  { id: "2", materialKey: "rockwool_mineral_wool", name: "5.5\" Rockwool Batt", thicknessInches: 5.5, rValuePerInch: 4.0, calculatedRValue: 22.0 },
  { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
  { id: "4", materialKey: "polyiso_continuous", name: "1\" Polyiso (ci)", thicknessInches: 1.0, rValuePerInch: 6.0, calculatedRValue: 6.0 },
  { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
];

export function RValueTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [assemblyType, setAssemblyType] = useState<AssemblyInput["assemblyType"]>("exterior_wall");
  const [climateZone, setClimateZone] = useState<AssemblyInput["climateZone"]>(5);
  const [layers, setLayers] = useState<MaterialLayer[]>(DEFAULT_WALL_LAYERS);
  const [selectedNewMaterial, setSelectedNewMaterial] = useState<string>("fiberglass_batt");

  // Hydrate from URL
  useEffect(() => {
    const urlZone = Number(getParam("zone", "5")) as AssemblyInput["climateZone"];
    const urlType = getParam("type", "exterior_wall") as AssemblyInput["assemblyType"];

    if ([1, 2, 3, 4, 5, 6, 7].includes(urlZone)) setClimateZone(urlZone);
    if (["exterior_wall", "attic_ceiling", "floor_crawlspace", "basement_wall"].includes(urlType)) setAssemblyType(urlType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (presetKey: "2x6_hp_wall" | "r49_attic" | "2x4_builder_wall" | "spray_foam_roof") => {
    if (presetKey === "2x6_hp_wall") {
      setAssemblyType("exterior_wall");
      setClimateZone(5);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "rockwool_mineral_wool", name: "5.5\" Rockwool Batt", thicknessInches: 5.5, rValuePerInch: 4.0, calculatedRValue: 22.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "1\" Polyiso (ci)", thicknessInches: 1.0, rValuePerInch: 6.0, calculatedRValue: 6.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ]);
    } else if (presetKey === "r49_attic") {
      setAssemblyType("attic_ceiling");
      setClimateZone(5);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "cellulose_loose_fill", name: "14\" Cellulose Loose-Fill", thicknessInches: 14.0, rValuePerInch: 3.5, calculatedRValue: 49.0 },
      ]);
    } else if (presetKey === "2x4_builder_wall") {
      setAssemblyType("exterior_wall");
      setClimateZone(3);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "fiberglass_batt", name: "3.5\" Fiberglass Batt (R-13)", thicknessInches: 3.5, rValuePerInch: 3.71, calculatedRValue: 13.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ]);
    } else {
      setAssemblyType("attic_ceiling");
      setClimateZone(4);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "closed_cell_foam", name: "4.0\" Closed-Cell Spray Foam", thicknessInches: 4.0, rValuePerInch: 6.5, calculatedRValue: 26.0 },
      ]);
    }
  };

  const handleAddLayer = () => {
    if (layers.length >= 7) return;
    const meta = STANDARD_BUILDING_MATERIALS[selectedNewMaterial];
    if (!meta) return;
    const newId = String(Date.now());
    const rVal = calculateLayerRValue(meta.key, meta.defaultThicknessInches);
    const newLayer: MaterialLayer = {
      id: newId,
      materialKey: meta.key,
      name: meta.name,
      thicknessInches: meta.defaultThicknessInches,
      rValuePerInch: meta.rPerInch,
      calculatedRValue: rVal,
    };
    setLayers([...layers, newLayer]);
  };

  const handleRemoveLayer = (id: string) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter((l) => l.id !== id));
  };

  const handleUpdateThickness = (id: string, thickness: number) => {
    setLayers(
      layers.map((l) => {
        if (l.id !== id) return l;
        const newR = calculateLayerRValue(l.materialKey, thickness);
        return { ...l, thicknessInches: thickness, calculatedRValue: newR };
      })
    );
  };

  // Perform Calculation
  const output: AssemblyOutput = useMemo(() => {
    return calculateAssemblyThermal({
      assemblyType,
      climateZone,
      layers,
      includeAirFilms: true,
    });
  }, [assemblyType, climateZone, layers]);

  const handleExportCsv = () => {
    const headers = "Layer Position,Material Name,Thickness (Inches),R-Value per Inch,Calculated R-Value\n";
    const rows = layers
      .map((l, idx) => `${idx + 1},"${l.name}",${l.thicknessInches},${l.rValuePerInch},${l.calculatedRValue}`)
      .join("\n");
    const summaryRow = `\n"AIR FILMS (Interior + Exterior)",,,,"0.85"\n"TOTAL ASSEMBLY R-VALUE",,,,"${output.totalRValue}"\n"OVERALL U-FACTOR (BTU/hr·ft²·°F)",,,,"${output.overallUFactor}"\n"IECC ZONE ${climateZone} COMPLIANCE",,,,"${output.isIeccCompliant ? "COMPLIANT" : "NON-COMPLIANT"}"\n`;
    const blob = new Blob([headers + rows + summaryRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assembly-R${output.totalRValue}-thermal-report.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Insulation Assembly Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Assembly Configurations:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect("2x6_hp_wall")}
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
            title="Reset to 2x6 High-Performance Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        <button onClick={() => handlePresetSelect("2x6_hp_wall")} className={`preset-chip-btn ${assemblyType === "exterior_wall" && layers.length === 5 ? "active" : ""}`} type="button">
          🏡 2x6 High-Perf Wall (R-30.5)
        </button>
        <button onClick={() => handlePresetSelect("r49_attic")} className={`preset-chip-btn ${assemblyType === "attic_ceiling" && layers.length === 2 ? "active" : ""}`} type="button">
          ❄️ R-49 Attic Cellulose
        </button>
        <button onClick={() => handlePresetSelect("2x4_builder_wall")} className={`preset-chip-btn ${assemblyType === "exterior_wall" && layers.length === 4 ? "active" : ""}`} type="button">
          🏠 2x4 Builder Wall (R-15.5)
        </button>
        <button onClick={() => handlePresetSelect("spray_foam_roof")} className={`preset-chip-btn ${layers.some((l) => l.materialKey === "closed_cell_foam") ? "active" : ""}`} type="button">
          🏗️ Spray Foam Roof (R-27)
        </button>
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL: LAYER STACK BUILDER */}
        <div className="input-panel">
          {/* ASSEMBLY & CLIMATE ZONE SELECTORS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="assembly-type-select">
                <span>Assembly Type</span>
                <span className="unit-label">Element</span>
              </label>
              <select
                id="assembly-type-select"
                value={assemblyType}
                onChange={(e) => {
                  const val = e.target.value as AssemblyInput["assemblyType"];
                  setAssemblyType(val);
                  updateParam("type", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="exterior_wall">Exterior Above-Grade Wall</option>
                <option value="attic_ceiling">Attic / Roof Ceiling</option>
                <option value="floor_crawlspace">Floor Over Crawlspace/Basement</option>
                <option value="basement_wall">Basement Foundation Wall</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="climate-zone-select">
                <span>IECC Climate Zone</span>
                <span className="unit-label">Zones 1–7</span>
              </label>
              <select
                id="climate-zone-select"
                value={climateZone}
                onChange={(e) => {
                  const val = Number(e.target.value) as AssemblyInput["climateZone"];
                  setClimateZone(val);
                  updateParam("zone", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={1}>Zone 1 (Very Hot - Miami, HI)</option>
                <option value={2}>Zone 2 (Hot - Houston, Phoenix)</option>
                <option value={3}>Zone 3 (Warm - Atlanta, Dallas)</option>
                <option value={4}>Zone 4 (Mixed - DC, Seattle, KC)</option>
                <option value={5}>Zone 5 (Cold - Chicago, Boston)</option>
                <option value={6}>Zone 6 (Very Cold - Minneapolis)</option>
                <option value={7}>Zone 7 (Subarctic - Duluth, AK)</option>
              </select>
            </div>
          </div>

          {/* ADD LAYER BAR */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
            <select
              value={selectedNewMaterial}
              onChange={(e) => setSelectedNewMaterial(e.target.value)}
              className="input-number"
              style={{ flex: 1, padding: "0.3rem 0.5rem", fontSize: "0.8rem", cursor: "pointer" }}
              aria-label="Select Material to Add"
            >
              {Object.values(STANDARD_BUILDING_MATERIALS)
                .filter((m) => m.category !== "air_film")
                .map((m) => (
                  <option key={m.key} value={m.key}>
                    + {m.name} {m.rPerInch > 0 ? `(R-${m.rPerInch}/in)` : ""}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={handleAddLayer}
              disabled={layers.length >= 7}
              style={{
                background: "rgba(0, 210, 255, 0.12)",
                border: "1px solid var(--accent-cooling)",
                color: "var(--accent-cooling)",
                borderRadius: "4px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: layers.length >= 7 ? "not-allowed" : "pointer",
                opacity: layers.length >= 7 ? 0.5 : 1,
              }}
            >
              Add Layer
            </button>
          </div>

          {/* LAYER CARDS STACK */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {layers.map((layer, idx) => {
              const meta = STANDARD_BUILDING_MATERIALS[layer.materialKey];
              const isFixed = meta?.fixedThickness;

              return (
                <div
                  key={layer.id}
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.2rem" }}>
                      {idx + 1}. {layer.name}
                    </div>
                    {!isFixed ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                          type="number"
                          min={0.5}
                          max={20}
                          step={0.5}
                          value={layer.thicknessInches}
                          onChange={(e) => handleUpdateThickness(layer.id, Number(e.target.value))}
                          className="input-number"
                          style={{ width: "65px", padding: "0.15rem 0.35rem", fontSize: "0.75rem" }}
                          aria-label={`${layer.name} Thickness`}
                        />
                        <span style={{ fontSize: "0.72rem", color: "var(--ink-secondary)" }}>
                          Inches &bull; @ R-{layer.rValuePerInch}/in
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        Standard Thickness &bull; Fixed Layer
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "var(--accent-cooling)",
                        minWidth: "55px",
                        textAlign: "right",
                      }}
                    >
                      R-{layer.calculatedRValue}
                    </span>
                    {layers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLayer(layer.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--accent-danger)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                        title="Remove Layer"
                        aria-label={`Remove ${layer.name}`}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Assembly R-Value Result">
            <div className="result-label">Total Assembly Thermal Resistance</div>
            <div className="result-value" style={{ color: "var(--accent-cooling)" }}>
              R-{output.totalRValue.toFixed(1)}
            </div>
            <div className="result-unit">
              Overall U-Factor: <strong>{output.overallUFactor.toFixed(3)} BTU/hr·ft²·°F</strong> (U = 1 / R)
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
                  background: output.isIeccCompliant ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                  color: output.isIeccCompliant ? "var(--accent-success)" : "var(--accent-danger)",
                  border: "1px solid currentColor",
                }}
              >
                {output.complianceStatusBadge}
              </span>
            </div>
          </div>

          {/* R-VALUE SVG CROSS SECTION VISUALIZER */}
          <RValueAssemblyVisualizer output={output} layers={layers} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Overall U-Factor</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.overallUFactor.toFixed(3)} U-Value
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">IECC Zone {climateZone} Code Min</div>
              <div className="item-value">R-{output.ieccRequiredRValue} (U-{output.ieccMaxUFactor})</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Active Layers</div>
              <div className="item-value">{layers.length} Layers + Air Films</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Annual Heat Transmission</div>
              <div className="item-value">{output.annualHeatLossBtuPerSqFt.toLocaleString()} BTU/ft²</div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/r-value-calculator"
            toolName="Insulation R-Value & U-Factor Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in Building Science &amp; Sizing</div>
            <Link href="/calculators/btu-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate Whole-House Manual J Heating &amp; Cooling Load</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/furnace-size-calculator">
              <span>Size Replacement Condensing Furnace for Insulated Envelope</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Assembly R-Value"
        value={`R-${output.totalRValue.toFixed(1)}`}
        unit={`(U-${output.overallUFactor.toFixed(3)})`}
      />
    </div>
  );
}
