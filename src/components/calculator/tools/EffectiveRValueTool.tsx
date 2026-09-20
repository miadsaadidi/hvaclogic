"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateEffectiveAssemblyThermal,
  AssemblyThermalInput,
  FramingMaterial,
  StudDepth,
  StudSpacing,
} from "@/lib/math/effective-r-value";
import { EffectiveRValueVisualizer } from "@/components/calculator/visualizers/EffectiveRValueVisualizer";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

export function EffectiveRValueTool() {
  const [framingMaterial, setFramingMaterial] = useState<FramingMaterial>("steel");
  const [studDepth, setStudDepth] = useState<StudDepth>("3.5");
  const [studSpacing, setStudSpacing] = useState<StudSpacing>(16);
  const [cavityNominalR, setCavityNominalR] = useState<number>(13);
  const [ciType, setCiType] = useState<AssemblyThermalInput["continuousInsulationType"]>("xps");
  const [ciThickness, setCiThickness] = useState<number>(1.0);
  const [customCiR, setCustomCiR] = useState<number>(5.0);

  // Available nominal R options based on stud depth
  const availableNominalRs = useMemo(() => {
    if (studDepth === "3.5") return [0, 11, 13, 15];
    if (studDepth === "5.5" || studDepth === "6.0") return [0, 19, 21];
    return [0, 25];
  }, [studDepth]);

  // Adjust cavity R if depth changes
  const handleDepthChange = (newDepth: StudDepth) => {
    setStudDepth(newDepth);
    if (newDepth === "3.5" && cavityNominalR > 15) setCavityNominalR(13);
    else if ((newDepth === "5.5" || newDepth === "6.0") && (cavityNominalR < 19 || cavityNominalR > 21)) setCavityNominalR(19);
    else if ((newDepth === "7.25" || newDepth === "8.0") && cavityNominalR !== 25) setCavityNominalR(25);
  };

  // Calculation output
  const output = useMemo(() => {
    return calculateEffectiveAssemblyThermal({
      framingMaterial,
      studDepth,
      studSpacing,
      cavityNominalR,
      continuousInsulationType: ciType,
      continuousInsulationThicknessInches: ciThickness,
      customCiRValue: customCiR,
    });
  }, [framingMaterial, studDepth, studSpacing, cavityNominalR, ciType, ciThickness, customCiR]);

  // Presets
  const applyPreset = (preset: "wood_standard" | "steel_uninsulated_ci" | "steel_with_ci" | "high_performance") => {
    if (preset === "wood_standard") {
      setFramingMaterial("wood");
      setStudDepth("3.5");
      setStudSpacing(16);
      setCavityNominalR(13);
      setCiType("none");
    } else if (preset === "steel_uninsulated_ci") {
      setFramingMaterial("steel");
      setStudDepth("3.5");
      setStudSpacing(16);
      setCavityNominalR(13);
      setCiType("none");
    } else if (preset === "steel_with_ci") {
      setFramingMaterial("steel");
      setStudDepth("3.5");
      setStudSpacing(16);
      setCavityNominalR(13);
      setCiType("xps");
      setCiThickness(1.0);
    } else if (preset === "high_performance") {
      setFramingMaterial("wood");
      setStudDepth("5.5");
      setStudSpacing(24);
      setCavityNominalR(21);
      setCiType("polyiso");
      setCiThickness(1.5);
    }
  };

  const handleCsvExport = () => {
    const headers = "Parameter,Value,Unit\n";
    const rows = [
      `Framing Material,"${output.framingMaterial === "wood" ? "Wood" : "Cold-Formed Steel"}",`,
      `Stud Size & Depth,"${output.studDescription}",`,
      `Stud Spacing,"${output.studSpacing}",in O.C.`,
      `Framing Area Fraction,"${output.framingFactorPercent}",%`,
      `Nominal Cavity R-Value,"R-${output.nominalCavityR}",hr·ft²·°F/BTU`,
      `Effective Cavity R-Value,"R-${output.effectiveCavityR.toFixed(1)}",hr·ft²·°F/BTU`,
      `Cavity Thermal Bridging Loss,"${output.cavityDeratePercent.toFixed(1)}",%`,
      `Continuous Exterior Insulation (ci),"R-${output.continuousInsulationR.toFixed(1)}",hr·ft²·°F/BTU`,
      `Base Continuous Layers (Air films/Drywall/Sheathing/Siding),"R-${output.baseContinuousLayersR.toFixed(2)}",hr·ft²·°F/BTU`,
      `Total Assembly Effective R-Value,"R-${output.totalAssemblyEffectiveR.toFixed(2)}",hr·ft²·°F/BTU`,
      `Overall Assembly U-Factor,"${output.totalAssemblyUFactor.toFixed(3)}",BTU/hr·ft²·°F`,
      `Governing Standard,"${output.standardReference}",`,
    ].join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `HVACLogic_Assembly_Thermal_Report_${output.framingMaterial}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Meta Trust Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <StandardsBadge standards={["ASHRAE 90.1", "IECC", "ASHRAE Fundamentals"]} />
        <CalculatorTrustPill customText="ASHRAE 90.1 App A &amp; Parallel-Path Physics" />
      </div>

      {/* Quick Presets Bar */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)" }}>Quick Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset("steel_uninsulated_ci")}
          style={{
            padding: "0.3rem 0.6rem",
            fontSize: "0.75rem",
            background: framingMaterial === "steel" && ciType === "none" ? "var(--surface-active)" : "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.375rem",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          Commercial Steel 2x4 (No ci)
        </button>
        <button
          type="button"
          onClick={() => applyPreset("steel_with_ci")}
          style={{
            padding: "0.3rem 0.6rem",
            fontSize: "0.75rem",
            background: framingMaterial === "steel" && ciType === "xps" ? "var(--surface-active)" : "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.375rem",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          Steel 2x4 + 1" XPS ci (R-13+5ci)
        </button>
        <button
          type="button"
          onClick={() => applyPreset("wood_standard")}
          style={{
            padding: "0.3rem 0.6rem",
            fontSize: "0.75rem",
            background: framingMaterial === "wood" && ciType === "none" ? "var(--surface-active)" : "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.375rem",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          Residential Wood 2x4 (R-13)
        </button>
        <button
          type="button"
          onClick={() => applyPreset("high_performance")}
          style={{
            padding: "0.3rem 0.6rem",
            fontSize: "0.75rem",
            background: framingMaterial === "wood" && ciType === "polyiso" ? "var(--surface-active)" : "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.375rem",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          Advanced 2x6 24" OC + 1.5" Polyiso
        </button>
      </div>

      {/* Reactive Visualizer */}
      <EffectiveRValueVisualizer output={output} />

      {/* Main Assembly Inputs Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        {/* Left Column: Framing System */}
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>🛠️</span> 1. Framing System &amp; Cavity Depth
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
              Framing Material
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setFramingMaterial("steel")}
                style={{
                  padding: "0.6rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  border: framingMaterial === "steel" ? "2px solid #ef4444" : "1px solid var(--border-color)",
                  background: framingMaterial === "steel" ? "rgba(239, 68, 68, 0.1)" : "var(--surface-subtle)",
                  color: framingMaterial === "steel" ? "#fca5a5" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                Cold-Formed Steel
              </button>
              <button
                type="button"
                onClick={() => setFramingMaterial("wood")}
                style={{
                  padding: "0.6rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  border: framingMaterial === "wood" ? "2px solid #3b82f6" : "1px solid var(--border-color)",
                  background: framingMaterial === "wood" ? "rgba(59, 130, 246, 0.1)" : "var(--surface-subtle)",
                  color: framingMaterial === "wood" ? "#93c5fd" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                Wood Studs
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
                Stud Depth (Size)
              </label>
              <select
                value={studDepth}
                onChange={(e) => handleDepthChange(e.target.value as StudDepth)}
                style={{
                  width: "100%",
                  padding: "0.55rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                  background: "var(--surface-subtle)",
                  color: "var(--ink)",
                  fontSize: "0.85rem",
                }}
              >
                <option value="3.5">2x4 (3.5" Depth)</option>
                <option value={framingMaterial === "wood" ? "5.5" : "6.0"}>
                  {framingMaterial === "wood" ? "2x6 (5.5\" Depth)" : "6.0\" Steel Stud"}
                </option>
                <option value={framingMaterial === "wood" ? "7.25" : "8.0"}>
                  {framingMaterial === "wood" ? "2x8 (7.25\" Depth)" : "8.0\" Steel Stud"}
                </option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
                Stud Spacing
              </label>
              <select
                value={studSpacing}
                onChange={(e) => setStudSpacing(Number(e.target.value) as StudSpacing)}
                style={{
                  width: "100%",
                  padding: "0.55rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                  background: "var(--surface-subtle)",
                  color: "var(--ink)",
                  fontSize: "0.85rem",
                }}
              >
                <option value={16}>16" On-Center (25% Framing)</option>
                <option value={24}>24" On-Center (22% Framing)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
              Nominal Cavity Insulation R-Value
            </label>
            <select
              value={cavityNominalR}
              onChange={(e) => setCavityNominalR(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "0.55rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color)",
                background: "var(--surface-subtle)",
                color: "var(--ink)",
                fontSize: "0.85rem",
              }}
            >
              {availableNominalRs.map((r) => (
                <option key={r} value={r}>
                  {r === 0 ? "Uninsulated (R-0)" : `R-${r} Batt / Friction Fit`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Continuous Exterior Insulation */}
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>🛡️</span> 2. Continuous Exterior Insulation (ci)
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
              Continuous Insulation Material
            </label>
            <select
              value={ciType}
              onChange={(e) => setCiType(e.target.value as AssemblyThermalInput["continuousInsulationType"])}
              style={{
                width: "100%",
                padding: "0.55rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color)",
                background: "var(--surface-subtle)",
                color: "var(--ink)",
                fontSize: "0.85rem",
              }}
            >
              <option value="none">None (Cavity Only / Unmitigated Bridge)</option>
              <option value="xps">Extruded Polystyrene (XPS - R-5.0/inch)</option>
              <option value="polyiso">Polyisocyanurate (Polyiso - R-6.0/inch)</option>
              <option value="eps">Expanded Polystyrene (EPS - R-4.0/inch)</option>
              <option value="mineral_wool">Rigid Mineral Wool Board (R-4.2/inch)</option>
              <option value="custom">Custom Nominal R-Value</option>
            </select>
          </div>

          {ciType !== "none" && ciType !== "custom" && (
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)" }}>
                  Insulation Thickness: {ciThickness.toFixed(1)} inches
                </label>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#34d399" }}>
                  = R-{output.continuousInsulationR.toFixed(1)} ci
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={ciThickness}
                onChange={(e) => setCiThickness(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--ink-muted)" }}>
                <span>0.5"</span>
                <span>1.0"</span>
                <span>1.5"</span>
                <span>2.0"</span>
                <span>3.0"</span>
                <span>4.0"</span>
              </div>
            </div>
          )}

          {ciType === "custom" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-secondary)", marginBottom: "0.3rem" }}>
                Custom Exterior Continuous R-Value
              </label>
              <input
                type="number"
                min="0"
                max="40"
                step="0.5"
                value={customCiR}
                onChange={(e) => setCustomCiR(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{
                  width: "100%",
                  padding: "0.55rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                  background: "var(--surface-subtle)",
                  color: "var(--ink)",
                  fontSize: "0.85rem",
                }}
              />
            </div>
          )}

          <div style={{ padding: "0.75rem", background: "var(--surface-subtle)", borderRadius: "0.5rem", fontSize: "0.78rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
            <strong>Continuous Layers Included:</strong> Interior Air Film (0.68) + 1/2" Gypsum (0.45) + 7/16" OSB (0.62) + Siding (0.60) + Exterior Air Film (0.17) = <strong>R-{output.baseContinuousLayersR.toFixed(2)}</strong>.
          </div>
        </div>
      </div>

      {/* Engineering Results & Derivation Summary */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Thermal Performance &amp; Bridging Derivation
        </h3>

        <div className="scenario-table" style={{ margin: "0.5rem 0 1rem" }}>
          <table>
            <thead>
              <tr>
                <th scope="col">Layer / Thermal Component</th>
                <th scope="col">Nominal Rating</th>
                <th scope="col">Effective Resistance</th>
                <th scope="col">Thermal Bridging Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cavity Insulation Layer</strong></td>
                <td>R-{output.nominalCavityR}</td>
                <td><strong>R-{output.effectiveCavityR.toFixed(1)}</strong></td>
                <td style={{ color: output.cavityDeratePercent > 40 ? "var(--accent-danger)" : "inherit" }}>
                  {output.cavityDeratePercent > 0 ? `-${output.cavityDeratePercent.toFixed(1)}% capacity lost to framing bridge` : "0% loss"}
                </td>
              </tr>
              <tr>
                <td><strong>Continuous Exterior Insulation (ci)</strong></td>
                <td>R-{output.continuousInsulationR.toFixed(1)}</td>
                <td><strong>R-{output.continuousInsulationR.toFixed(1)}</strong></td>
                <td style={{ color: "#34d399" }}>0% bridging (uninterrupted thermal break)</td>
              </tr>
              <tr>
                <td><strong>Common Unbridged Layers (Air films + Finishes)</strong></td>
                <td>R-{output.baseContinuousLayersR.toFixed(2)}</td>
                <td><strong>R-{output.baseContinuousLayersR.toFixed(2)}</strong></td>
                <td>Series sum of homogeneous materials</td>
              </tr>
              <tr style={{ background: "var(--surface-active)", fontWeight: 700 }}>
                <td><strong>WHOLE-WALL EFFECTIVE THERMAL RESISTANCE</strong></td>
                <td>R-{(output.nominalCavityR + output.continuousInsulationR + output.baseContinuousLayersR).toFixed(1)} (Unbridged)</td>
                <td style={{ color: "var(--accent-primary)", fontSize: "1.05rem" }}>
                  R-{output.totalAssemblyEffectiveR.toFixed(2)}
                </td>
                <td style={{ color: "var(--accent-primary)", fontSize: "1.05rem" }}>
                  U = {output.totalAssemblyUFactor.toFixed(3)} BTU/hr·ft²·°F
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
          <strong>Governing Standard:</strong> {output.standardReference}. In cold-formed steel construction, thermal bridging through stud flanges reduces effective cavity performance by up to 60%. Adding exterior continuous insulation (ci) creates an uninterrupted thermal break that is required by modern energy codes (IECC &amp; ASHRAE 90.1) to achieve code compliance.
        </p>
      </div>

      {/* Downstream Workflow Handoff to Heat Loss */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(30, 41, 59, 0.4) 100%)",
          border: "1px solid rgba(14, 165, 233, 0.25)",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.2rem" }}>
            Handoff to Whole-Building Heat Loss Engine
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
            Apply this calculated assembly U-factor (<strong>U-{output.totalAssemblyUFactor.toFixed(3)}</strong> / effective <strong>R-{output.totalAssemblyEffectiveR.toFixed(1)}</strong>) directly into whole-house conductive transmission &amp; equipment sizing.
          </div>
        </div>
        <Link
          href={`/calculators/heat-loss-calculator?wallMode=effective_u&wallU=${output.totalAssemblyUFactor.toFixed(4)}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.55rem 1rem",
            borderRadius: "0.5rem",
            background: "var(--accent-cooling)",
            color: "#ffffff",
            fontSize: "0.82rem",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Calculate Building Heat Loss with U-{output.totalAssemblyUFactor.toFixed(3)} →
        </Link>
      </div>

      {/* Downstream Links */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
        <span>• 1D Layer Builder: <Link href="/calculators/r-value-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Insulation R-Value &amp; U-Factor Calculator</Link></span>
        <span>• Conductive Heat Loss: <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Building Heat Loss Calculator</Link></span>
        <span>• Technical Monograph: <Link href="/guides/framing-thermal-bridging-effective-r-value" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Framing Thermal Bridging Guide</Link></span>
      </div>

      {/* Export & Actions */}
      <ActionButtonBar
        toolRoute="/calculators/effective-r-value-calculator"
        toolName="Effective R-Value &amp; Thermal Bridging Calculator"
        governingStandard="ANSI/ASHRAE/IES Standard 90.1-2022"
        onExportCsv={handleCsvExport}
      />

      {/* Mobile Sticky Bar */}
      <MobileResultBar
        label="Whole-Wall Effective R"
        value={`R-${output.totalAssemblyEffectiveR.toFixed(1)}`}
        unit={`hr·ft²·°F/BTU (U=${output.totalAssemblyUFactor.toFixed(3)})`}
      />
    </div>
  );
}
