"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateAssemblyThermal,
  calculateLayerRValue,
  getSurfaceAirFilms,
  MaterialLayer,
  STANDARD_BUILDING_MATERIALS,
  ZONE_HDD_BASELINES,
  AssemblyInput,
  AssemblyOutput,
} from "@/lib/math/r-value";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { RValueAssemblyVisualizer } from "@/components/calculator/visualizers/RValueAssemblyVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

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
  const [includeAirFilms, setIncludeAirFilms] = useState<boolean>(true);
  const [selectedNewMaterial, setSelectedNewMaterial] = useState<string>("fiberglass_batt");

  // Hydrate from URL
  useEffect(() => {
    const urlZone = Number(getParam("zone", "5")) as AssemblyInput["climateZone"];
    const urlType = getParam("type", "exterior_wall") as AssemblyInput["assemblyType"];

    if ([1, 2, 3, 4, 5, 6, 7, 8].includes(urlZone)) setClimateZone(urlZone);
    if (["exterior_wall", "attic_ceiling", "floor_crawlspace", "basement_wall"].includes(urlType)) setAssemblyType(urlType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (presetKey: "2x6_hp_wall" | "chicago_ci_wall" | "r49_attic" | "2x4_builder_wall") => {
    if (presetKey === "2x6_hp_wall") {
      setAssemblyType("exterior_wall");
      setClimateZone(5);
      setIncludeAirFilms(true);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "rockwool_mineral_wool", name: "5.5\" Rockwool Batt", thicknessInches: 5.5, rValuePerInch: 4.0, calculatedRValue: 22.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "1\" Polyiso (ci)", thicknessInches: 1.0, rValuePerInch: 6.0, calculatedRValue: 6.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ]);
    } else if (presetKey === "chicago_ci_wall") {
      setAssemblyType("exterior_wall");
      setClimateZone(5);
      setIncludeAirFilms(true);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "fiberglass_hd_batt", name: "5.5\" R-21 HD Cavity Batt", thicknessInches: 5.5, rValuePerInch: 3.82, calculatedRValue: 21.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "3\" Polyiso Continuous (ci)", thicknessInches: 3.0, rValuePerInch: 6.0, calculatedRValue: 18.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ]);
    } else if (presetKey === "r49_attic") {
      setAssemblyType("attic_ceiling");
      setClimateZone(5);
      setIncludeAirFilms(true);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "cellulose_loose_fill", name: "14\" Cellulose Loose-Fill", thicknessInches: 14.0, rValuePerInch: 3.5, calculatedRValue: 49.0 },
      ]);
    } else {
      setAssemblyType("exterior_wall");
      setClimateZone(3);
      setIncludeAirFilms(true);
      setLayers([
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "fiberglass_batt", name: "3.5\" Fiberglass Batt (R-13)", thicknessInches: 3.5, rValuePerInch: 3.71, calculatedRValue: 13.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ]);
    }
  };

  const handleAddLayer = () => {
    if (layers.length >= 8) return;
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
      includeAirFilms,
    });
  }, [assemblyType, climateZone, layers, includeAirFilms]);

  const airFilms = useMemo(() => getSurfaceAirFilms(assemblyType), [assemblyType]);

  const handleExportCsv = () => {
    const headers = "Layer Position,Material Name,Thickness (Inches),R-Value per Inch,Calculated R-Value\n";
    const rows = layers
      .map((l, idx) => `${idx + 1},"${l.name}",${l.thicknessInches},${l.rValuePerInch},${l.calculatedRValue}`)
      .join("\n");
    const summaryRow = `\n"SURFACE AIR FILMS (Interior + Exterior)",,,,"${output.airFilmRValue}"\n"1-D LAYER STACK R-VALUE (hr·ft²·°F/BTU)",,,,"${output.totalRValue}"\n"1-D STACK U-FACTOR (BTU/hr·ft²·°F)",,,,"${output.overallUFactor}"\n"CLIMATE BASELINE (HDD65)",,,,"${output.hddBase65}"\n"ANNUAL HEAT TRANSMISSION (BTU/ft²·yr)",,,,"${output.annualHeatLossBtuPerSqFt}"\n"IECC ZONE ${climateZone} PRESCRIPTIVE REFERENCE",,,,"${output.ieccPrescriptiveTarget}"\n`;
    const blob = new Blob([headers + rows + summaryRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `1d-stack-R${output.totalRValue}-thermal-report.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Insulation Assembly Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Standard 1-D Layer Presets:</span>
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

        <button onClick={() => handlePresetSelect("2x6_hp_wall")} className={`preset-chip-btn ${layers.length === 5 && layers.some((l) => l.calculatedRValue === 22.0) ? "active" : ""}`} type="button">
          🏡 2x6 High-Perf Wall (R-30.5)
        </button>
        <button onClick={() => handlePresetSelect("chicago_ci_wall")} className={`preset-chip-btn ${layers.some((l) => l.thicknessInches === 3.0 && l.materialKey === "polyiso_continuous") ? "active" : ""}`} type="button">
          ❄️ Chicago CI Wall (R-41.5)
        </button>
        <button onClick={() => handlePresetSelect("r49_attic")} className={`preset-chip-btn ${assemblyType === "attic_ceiling" ? "active" : ""}`} type="button">
          🏗️ R-49 Attic Cellulose (R-50.2)
        </button>
        <button onClick={() => handlePresetSelect("2x4_builder_wall")} className={`preset-chip-btn ${layers.length === 4 && layers.some((l) => l.calculatedRValue === 13.0) ? "active" : ""}`} type="button">
          🏠 2x4 Builder Wall (R-15.5)
        </button>
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL: LAYER STACK BUILDER */}
        <div className="input-panel">
          <CalculatorTrustPill />
          {/* ASSEMBLY & CLIMATE ZONE SELECTORS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="assembly-type-select">
                <span>Assembly Orientation</span>
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
                <option value="exterior_wall">Exterior Above-Grade Wall (Vertical)</option>
                <option value="attic_ceiling">Attic / Roof Ceiling (Upward Heat Flow)</option>
                <option value="floor_crawlspace">Floor Over Crawlspace (Downward Flow)</option>
                <option value="basement_wall">Basement Wall (Vertical)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="climate-zone-select">
                <span>IECC Climate Zone</span>
                <span className="unit-label">HDD Baseline</span>
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
                <option value={1}>Zone 1: Miami / HI (500 HDD)</option>
                <option value={2}>Zone 2: Houston / Phoenix (1,500 HDD)</option>
                <option value={3}>Zone 3: Atlanta / Dallas (2,800 HDD)</option>
                <option value={4}>Zone 4: DC / Seattle (4,500 HDD)</option>
                <option value={5}>Zone 5: Chicago / Boston (6,000 HDD)</option>
                <option value={6}>Zone 6: Minneapolis (7,500 HDD)</option>
                <option value={7}>Zone 7: Duluth / Fargo (9,000 HDD)</option>
                <option value={8}>Zone 8: Fairbanks AK (12,000 HDD)</option>
              </select>
            </div>
          </div>

          {/* SURFACE AIR FILM TOGGLE */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0, 210, 255, 0.05)", border: "1px solid rgba(0, 210, 255, 0.15)", borderRadius: "0.375rem", padding: "0.45rem 0.75rem", marginBottom: "0.75rem", fontSize: "0.75rem" }}>
            <div>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>Surface Air Film Resistances:</span>
              <span style={{ color: "var(--ink-secondary)", marginLeft: "0.4rem" }}>
                R_in ({airFilms.rInterior}) + R_out ({airFilms.rExterior}) = <strong>R-{airFilms.totalAirFilmR}</strong>
              </span>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", margin: 0 }}>
              <input
                type="checkbox"
                checked={includeAirFilms}
                onChange={(e) => setIncludeAirFilms(e.target.checked)}
              />
              <span>Include in 1-D Sum</span>
            </label>
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
              disabled={layers.length >= 8}
              style={{
                background: "rgba(0, 210, 255, 0.12)",
                border: "1px solid var(--accent-cooling)",
                color: "var(--accent-cooling)",
                borderRadius: "4px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: layers.length >= 8 ? "not-allowed" : "pointer",
                opacity: layers.length >= 8 ? 0.5 : 1,
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
                          min={0.25}
                          max={24}
                          step={0.25}
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
                      R-{layer.calculatedRValue.toFixed(2)}
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

          <div style={{ marginTop: "0.75rem", fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            * Note: 1-D series summation (R_stack = &Sigma; R_i + R_films) models heat flow perpendicular through continuous layers. For walls with wood or steel framing thermal bridging, use the <Link href="/calculators/effective-r-value-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Effective R-Value Calculator</Link>.
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="1-D Layer Stack R-Value Result">
            <div className="result-label">1-D Layer Stack Thermal Resistance (R_stack)</div>
            <div className="result-value" style={{ color: "var(--accent-cooling)" }}>
              R-{output.totalRValue.toFixed(2)}
            </div>
            <div className="result-unit">
              1-D Stack U-Factor: <strong>{output.overallUFactor.toFixed(4)} BTU/hr·ft²·°F</strong> (U = 1 / R_stack)
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
                  border: "1px solid currentColor",
                }}
              >
                1-D Series Model (Continuous Layers + Air Films)
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASHRAE Fundamentals Ch. 25 & 26", "IECC 2021 / 2024 Table R402.1.2"]} />

          {/* R-VALUE SVG CROSS SECTION VISUALIZER */}
          <RValueAssemblyVisualizer output={output} layers={layers} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">1-D Stack U-Factor</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.overallUFactor.toFixed(4)} U-Value
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">IECC Zone {climateZone} Benchmark</div>
              <div className="item-value" style={{ fontSize: "0.85rem" }}>{output.ieccPrescriptiveTarget}</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Material Layers + Films</div>
              <div className="item-value">R-{output.layerSumRValue.toFixed(2)} + R-{output.airFilmRValue.toFixed(2)}</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Annual Heat Loss ({output.hddBase65.toLocaleString()} HDD)</div>
              <div className="item-value">{output.annualHeatLossBtuPerSqFt.toLocaleString()} BTU/ft²·yr</div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/r-value-calculator"
            toolName="Insulation R-Value & U-Factor 1-D Stack Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Steps in Envelope Sizing &amp; Thermal Bridging</div>
            <Link href="/calculators/effective-r-value-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate 2D Parallel-Path &amp; Steel Framing Effective R-Value</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-loss-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Calculate Building Envelope Heat Loss &amp; Infiltration CFM</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/btu-calculator">
              <span>Calculate Whole-House Manual J Heating &amp; Cooling Load</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="1-D Stack R-Value"
        value={`R-${output.totalRValue.toFixed(2)}`}
        unit={`(U-${output.overallUFactor.toFixed(4)})`}
      />
    </div>
  );
}
