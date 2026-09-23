"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateEquivalentLength,
  ACCA_MANUAL_D_FITTINGS,
  SelectedAccumulatorFitting,
  EquivalentLengthInput,
  EquivalentLengthOutput,
  FittingGroup,
} from "@/lib/math/equivalent-length";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { EquivalentLengthVisualizer } from "@/components/calculator/visualizers/EquivalentLengthVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";
import { StepDerivationDrawer, DerivationStep } from "@/components/calculator/StepDerivationDrawer";

interface PresetConfig {
  label: string;
  description: string;
  straightSupply: number;
  straightReturn: number;
  tesp: number;
  coilDrop: number;
  filterDrop: number;
  fittings: SelectedAccumulatorFitting[];
}

const PRESETS: PresetConfig[] = [
  {
    label: "🏠 Standard Single-Story (0.50\" TESP)",
    description: "Typical 1,800 sq ft residential split system with aerodynamic radius fittings and conical spin-in takeoffs.",
    straightSupply: 60,
    straightReturn: 40,
    tesp: 0.50,
    coilDrop: 0.20,
    filterDrop: 0.10,
    fittings: [
      { id: "p1_1", fittingDefId: "g1_starting_collar_shoe", equivalentLengthFt: 15, quantity: 1, systemSide: "supply" },
      { id: "p1_2", fittingDefId: "g2_elbow_90_radius_smooth", equivalentLengthFt: 10, quantity: 2, systemSide: "supply" },
      { id: "p1_3", fittingDefId: "g3_takeoff_conical_spinin", equivalentLengthFt: 15, quantity: 1, systemSide: "supply" },
      { id: "p1_4", fittingDefId: "g3_round_elbow_90_smooth", equivalentLengthFt: 12, quantity: 1, systemSide: "supply" },
      { id: "p1_5", fittingDefId: "g4_boot_90_angle", equivalentLengthFt: 30, quantity: 1, systemSide: "supply" },
      { id: "p1_6", fittingDefId: "g5_return_ceiling_collar", equivalentLengthFt: 20, quantity: 1, systemSide: "return" },
      { id: "p1_7", fittingDefId: "g5_return_drop_90_vaned", equivalentLengthFt: 15, quantity: 1, systemSide: "return" },
    ],
  },
  {
    label: "🏢 2-Story Long Runout (0.70\" TESP)",
    description: "Extended critical trunk run to upper floor with multi-segment elbows and higher-static variable speed blower.",
    straightSupply: 95,
    straightReturn: 65,
    tesp: 0.70,
    coilDrop: 0.24,
    filterDrop: 0.14,
    fittings: [
      { id: "p2_1", fittingDefId: "g1_starting_collar_conical", equivalentLengthFt: 10, quantity: 1, systemSide: "supply" },
      { id: "p2_2", fittingDefId: "g2_elbow_90_radius_standard", equivalentLengthFt: 15, quantity: 3, systemSide: "supply" },
      { id: "p2_3", fittingDefId: "g2_transition_gradual", equivalentLengthFt: 10, quantity: 2, systemSide: "supply" },
      { id: "p2_4", fittingDefId: "g3_takeoff_conical_spinin", equivalentLengthFt: 15, quantity: 1, systemSide: "supply" },
      { id: "p2_5", fittingDefId: "g3_round_elbow_90_4piece", equivalentLengthFt: 20, quantity: 2, systemSide: "supply" },
      { id: "p2_6", fittingDefId: "g4_boot_end", equivalentLengthFt: 25, quantity: 1, systemSide: "supply" },
      { id: "p2_7", fittingDefId: "g5_return_ceiling_collar", equivalentLengthFt: 20, quantity: 2, systemSide: "return" },
      { id: "p2_8", fittingDefId: "g5_return_drop_45_angle", equivalentLengthFt: 15, quantity: 1, systemSide: "return" },
    ],
  },
  {
    label: "⚠️ High-Resistance Unvaned Mitered (0.50\" TESP)",
    description: "Common installation error using unvaned square mitered elbows and straight takeoffs, resulting in choked friction rates.",
    straightSupply: 55,
    straightReturn: 35,
    tesp: 0.50,
    coilDrop: 0.20,
    filterDrop: 0.12,
    fittings: [
      { id: "p3_1", fittingDefId: "g1_starting_collar_flush", equivalentLengthFt: 35, quantity: 1, systemSide: "supply" },
      { id: "p3_2", fittingDefId: "g2_elbow_90_mitered_novanes", equivalentLengthFt: 50, quantity: 2, systemSide: "supply" },
      { id: "p3_3", fittingDefId: "g3_takeoff_straight_collar", equivalentLengthFt: 35, quantity: 1, systemSide: "supply" },
      { id: "p3_4", fittingDefId: "g4_boot_90_angle", equivalentLengthFt: 30, quantity: 1, systemSide: "supply" },
      { id: "p3_5", fittingDefId: "g5_return_panning_cavity", equivalentLengthFt: 35, quantity: 1, systemSide: "return" },
      { id: "p3_6", fittingDefId: "g5_return_drop_90_unvaned", equivalentLengthFt: 50, quantity: 1, systemSide: "return" },
    ],
  },
];

export function EquivalentLengthTool() {
  const { getNumberParam } = useHydrateParams();

  // Inputs
  const [straightSupply, setStraightSupply] = useState(60);
  const [straightReturn, setStraightReturn] = useState(40);
  const [tesp, setTesp] = useState(0.50);
  const [coilDrop, setCoilDrop] = useState(0.20);
  const [filterDrop, setFilterDrop] = useState(0.10);
  const [supplyRegDrop, setSupplyRegDrop] = useState(0.03);
  const [returnGrilleDrop, setReturnGrilleDrop] = useState(0.03);
  const [otherDrop, setOtherDrop] = useState(0.00);

  // Fittings accumulator state
  const [selectedFittings, setSelectedFittings] = useState<SelectedAccumulatorFitting[]>(
    PRESETS[0].fittings
  );

  // Palette filter
  const [paletteFilter, setPaletteFilter] = useState<FittingGroup | "all">("all");
  const [targetSide, setTargetSide] = useState<"supply" | "return">("supply");

  // Custom fitting modal/inputs
  const [customName, setCustomName] = useState("");
  const [customEqLength, setCustomEqLength] = useState(25);

  // Hydrate from URL query parameters if present
  useEffect(() => {
    setStraightSupply(getNumberParam("straightSupply", 60));
    setStraightReturn(getNumberParam("straightReturn", 40));
    setTesp(getNumberParam("tesp", 0.50));
    setCoilDrop(getNumberParam("coilDrop", 0.20));
    setFilterDrop(getNumberParam("filterDrop", 0.10));
  }, [getNumberParam]);

  // Execute math calculation
  const output: EquivalentLengthOutput = useMemo(() => {
    const input: EquivalentLengthInput = {
      straightSupplyFt: straightSupply,
      straightReturnFt: straightReturn,
      fittings: selectedFittings,
      blowerTespInWg: tesp,
      coilPressureDropInWg: coilDrop,
      filterPressureDropInWg: filterDrop,
      supplyRegisterPressureDropInWg: supplyRegDrop,
      returnGrillePressureDropInWg: returnGrilleDrop,
      otherAccessoriesDropInWg: otherDrop,
    };
    return calculateEquivalentLength(input);
  }, [
    straightSupply,
    straightReturn,
    selectedFittings,
    tesp,
    coilDrop,
    filterDrop,
    supplyRegDrop,
    returnGrilleDrop,
    otherDrop,
  ]);

  // Fitting handlers
  const handleAddCatalogFitting = (fittingDefId: string, defaultLength: number) => {
    setSelectedPresetIndex(null);
    const newId = `fit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setSelectedFittings((prev) => [
      ...prev,
      {
        id: newId,
        fittingDefId,
        equivalentLengthFt: defaultLength,
        quantity: 1,
        systemSide: targetSide,
      },
    ]);
  };

  const handleAddCustomFitting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    setSelectedPresetIndex(null);
    const newId = `custom_${Date.now()}`;
    setSelectedFittings((prev) => [
      ...prev,
      {
        id: newId,
        fittingDefId: "custom",
        customName: customName.trim(),
        equivalentLengthFt: customEqLength,
        quantity: 1,
        systemSide: targetSide,
      },
    ]);
    setCustomName("");
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedPresetIndex(null);
    setSelectedFittings((prev) =>
      prev
        .map((f) => {
          if (f.id === id) {
            const nextQty = Math.max(0, f.quantity + delta);
            return { ...f, quantity: nextQty };
          }
          return f;
        })
        .filter((f) => f.quantity > 0)
    );
  };

  const handleRemoveFitting = (id: string) => {
    setSelectedPresetIndex(null);
    setSelectedFittings((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearFittings = () => {
    setSelectedPresetIndex(null);
    setSelectedFittings([]);
  };

  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(0);

  const handleApplyPreset = (preset: PresetConfig, index: number) => {
    setSelectedPresetIndex(index);
    setStraightSupply(preset.straightSupply);
    setStraightReturn(preset.straightReturn);
    setTesp(preset.tesp);
    setCoilDrop(preset.coilDrop);
    setFilterDrop(preset.filterDrop);
    setSelectedFittings(preset.fittings);
  };

  const filteredCatalog = useMemo(() => {
    if (paletteFilter === "all") return ACCA_MANUAL_D_FITTINGS;
    return ACCA_MANUAL_D_FITTINGS.filter((f) => f.group === paletteFilter);
  }, [paletteFilter]);

  const supplyRunFittings = useMemo(
    () => selectedFittings.filter((f) => f.systemSide === "supply"),
    [selectedFittings]
  );
  const returnRunFittings = useMemo(
    () => selectedFittings.filter((f) => f.systemSide === "return"),
    [selectedFittings]
  );

  // Derivation steps for drawer
  const derivationSteps: DerivationStep[] = [
    {
      stepNumber: 1,
      title: "Supply Critical Path Total Effective Length",
      formulaLatex: "\\text{TEL}_{\\text{supply}} = L_{\\text{straight, supply}} + \\sum \\text{EL}_{\\text{supply fittings}}",
      substitutionLatex: `${output.straightSupplyFt} + ${output.fittingsSupplyFt}`,
      resultText: `${output.totalSupplyTelFt} \\text{ ft eq}`,
      governingStandard: "ACCA Manual D (Fitting Methodology)",
    },
    {
      stepNumber: 2,
      title: "Return Critical Path Total Effective Length",
      formulaLatex: "\\text{TEL}_{\\text{return}} = L_{\\text{straight, return}} + \\sum \\text{EL}_{\\text{return fittings}}",
      substitutionLatex: `${output.straightReturnFt} + ${output.fittingsReturnFt}`,
      resultText: `${output.totalReturnTelFt} \\text{ ft eq}`,
      governingStandard: "ACCA Manual D (Fitting Methodology)",
    },
    {
      stepNumber: 3,
      title: "Cumulative Total Effective Length (TEL)",
      formulaLatex: "\\text{TEL} = \\text{TEL}_{\\text{supply}} + \\text{TEL}_{\\text{return}}",
      substitutionLatex: `${output.totalSupplyTelFt} + ${output.totalReturnTelFt}`,
      resultText: `${output.cumulativeTelFt} \\text{ ft eq}`,
      governingStandard: "ACCA Manual D Section 3",
    },
    {
      stepNumber: 4,
      title: "Available Static Pressure (ASP) Budget",
      formulaLatex: "\\text{ASP} = \\text{TESP} - \\sum \\Delta P_{\\text{components}}",
      substitutionLatex: `${output.blowerTespInWg.toFixed(2)} - ${output.totalComponentDropInWg.toFixed(3)}`,
      resultText: `${output.availableStaticPressureAspInWg.toFixed(3)} \\text{ in. wg}`,
      governingStandard: "ACCA Manual D Section 3",
    },
    {
      stepNumber: 5,
      title: "ACCA Manual D Design Friction Rate (FR)",
      formulaLatex: "\\text{FR} = \\frac{\\text{ASP} \\times 100}{\\text{TEL}}",
      substitutionLatex: `\\frac{${output.availableStaticPressureAspInWg.toFixed(3)} \\times 100}{${output.cumulativeTelFt}}`,
      resultText: `${output.designFrictionRateFr.toFixed(3)} \\text{ in. wg / 100 ft}`,
      governingStandard: "ACCA Manual D Section 3",
    },
  ];

  const getStatusColor = () => {
    switch (output.statusBadgeColor) {
      case "emerald":
        return "#10b981";
      case "amber":
        return "#f59e0b";
      case "rose":
        return "#ef4444";
      case "blue":
        return "#3b82f6";
      default:
        return "#10b981";
    }
  };
  const statusColor = getStatusColor();

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
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ink-secondary, #94a3b8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ACCA Manual D Total Effective Length (TEL)
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1.1, marginTop: "0.25rem" }}>
              {output.cumulativeTelFt}{" "}
              <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--ink-secondary, #94a3b8)" }}>
                ft eq
              </span>
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
              {output.frictionRateStatus}
            </span>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-secondary, #94a3b8)" }}>
              Recommended Target: <strong style={{ color: "#f8fafc" }}>0.06 - 0.12&quot;</strong> / 100 ft
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
            <span style={{ color: "var(--ink-secondary, #94a3b8)" }}>Design Friction Rate (FR): </span>
            <strong style={{ color: statusColor, fontSize: "0.95rem" }}>
              {output.designFrictionRateFr.toFixed(3)}&quot; w.g. / 100 ft
            </strong>
          </div>
          <div>
            <span style={{ color: "var(--ink-secondary, #94a3b8)" }}>Available Static (ASP): </span>
            <strong style={{ color: "#38bdf8" }}>{output.availableStaticPressureAspInWg.toFixed(3)}&quot; w.g.</strong>
          </div>
          <div>
            <span style={{ color: "var(--ink-secondary, #94a3b8)" }}>Fitting Drag: </span>
            <strong style={{ color: "#fca5a5" }}>
              {output.fittingLengthTotalFt} ft ({output.fittingRatioPercent}%)
            </strong>
            <span style={{ color: "var(--ink-secondary, #94a3b8)" }}> | Straight: </span>
            <strong style={{ color: "#93c5fd" }}>{output.straightLengthTotalFt} ft</strong>
          </div>
        </div>
      </div>

      {/* 2. Preset Buttons with Standard System Classes and Distinct Active State */}
      <div className="preset-chips-container" role="group" aria-label="ACCA Manual D Archetypes">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>
            📐 Sample Design Archetypes:
          </span>
          {selectedPresetIndex !== null && (
            <span style={{ fontSize: "0.75rem", color: "var(--accent-cooling)", fontWeight: 700 }}>
              ✓ Selected Archetype #{selectedPresetIndex + 1}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {PRESETS.map((preset, idx) => {
            const isSelected = selectedPresetIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset, idx)}
                className={`preset-chip-btn ${isSelected ? "active" : ""}`}
                title={preset.description}
                aria-pressed={isSelected}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Visualizer (Graph / Schemas) */}
      <EquivalentLengthVisualizer output={output} />

      {/* 4. Google Preferred Banner & Standards Badge Moved AFTER Graph / Schemas */}
      <GooglePreferredBanner />
      <StandardsBadge standards={["ACCA Manual D", "ASHRAE Ch. 21", "SMACNA"]} />

      {/* Main Form Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {/* Left Column: Straight Runs & Pressure Budget */}
        <div
          style={{
            background: "var(--card-bg, #0f172a)",
            border: "1px solid var(--border-color, #1e293b)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ borderBottom: "1px solid var(--border-color, #334155)", paddingBottom: "0.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "var(--ink, #f8fafc)" }}>
              1. Straight Duct Runs (Linear Footage)
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary, #94a3b8)", margin: "0.25rem 0 0 0" }}>
              Measured physical distance along the most aerodynamically demanding critical path.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#93c5fd", display: "block", marginBottom: "0.25rem" }}>
                Supply Straight Duct (ft)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                step="5"
                value={straightSupply}
                onChange={(e) => setStraightSupply(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#5eead4", display: "block", marginBottom: "0.25rem" }}>
                Return Straight Duct (ft)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                step="5"
                value={straightReturn}
                onChange={(e) => setStraightReturn(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              />
            </div>
          </div>

          {/* Component Static Pressure Drop Budget */}
          <div style={{ borderBottom: "1px solid var(--border-color, #334155)", paddingBottom: "0.5rem", marginTop: "0.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "var(--ink, #f8fafc)" }}>
              2. Available Static Pressure (ASP) Budget
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary, #94a3b8)", margin: "0.25rem 0 0 0" }}>
              Blower Total External Static Pressure (TESP) minus internal component losses.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#f8fafc", display: "block", marginBottom: "0.25rem" }}>
                Blower TESP (in. wg)
              </label>
              <input
                type="number"
                min="0.10"
                max="1.50"
                step="0.05"
                value={tesp}
                onChange={(e) => setTesp(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", display: "block", marginBottom: "0.25rem" }}>
                Wet Evaporator Coil (in. wg)
              </label>
              <input
                type="number"
                min="0.00"
                max="0.50"
                step="0.02"
                value={coilDrop}
                onChange={(e) => setCoilDrop(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", display: "block", marginBottom: "0.25rem" }}>
                Air Filter Drop (in. wg)
              </label>
              <input
                type="number"
                min="0.02"
                max="0.40"
                step="0.02"
                value={filterDrop}
                onChange={(e) => setFilterDrop(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", display: "block", marginBottom: "0.25rem" }}>
                Supply Register (in. wg)
              </label>
              <input
                type="number"
                min="0.01"
                max="0.10"
                step="0.01"
                value={supplyRegDrop}
                onChange={(e) => setSupplyRegDrop(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", display: "block", marginBottom: "0.25rem" }}>
                Return Grille (in. wg)
              </label>
              <input
                type="number"
                min="0.01"
                max="0.10"
                step="0.01"
                value={returnGrilleDrop}
                onChange={(e) => setReturnGrilleDrop(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", display: "block", marginBottom: "0.25rem" }}>
                Other Devices / Damper (in. wg)
              </label>
              <input
                type="number"
                min="0.00"
                max="0.15"
                step="0.01"
                value={otherDrop}
                onChange={(e) => setOtherDrop(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid var(--border-color, #334155)",
                  borderRadius: "0.4rem",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                }}
              />
            </div>
          </div>

          {/* Quick Static Pressure Readout */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--ink-secondary)" }}>Total Component Losses</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fca5a5" }}>
                -{output.totalComponentDropInWg.toFixed(3)}&quot; w.g.
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--ink-secondary)" }}>Available Static Pressure (ASP)</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#38bdf8" }}>
                {output.availableStaticPressureAspInWg.toFixed(3)}&quot; w.g.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fitting Catalog Palette */}
        <div
          style={{
            background: "var(--card-bg, #0f172a)",
            border: "1px solid var(--border-color, #1e293b)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "var(--ink, #f8fafc)" }}>
                3. ACCA Manual D Fitting Library
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary, #94a3b8)", margin: "0.2rem 0 0 0" }}>
                Select standard aerodynamic fittings to add to the critical run.
              </p>
            </div>

            {/* Target Side Toggle */}
            <div style={{ display: "flex", background: "var(--surface-bg, #1e293b)", padding: "0.15rem", borderRadius: "0.4rem" }}>
              <button
                type="button"
                onClick={() => setTargetSide("supply")}
                style={{
                  background: targetSide === "supply" ? "#0284c7" : "transparent",
                  color: targetSide === "supply" ? "#ffffff" : "#94a3b8",
                  border: "none",
                  borderRadius: "0.3rem",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ➔ Supply Side
              </button>
              <button
                type="button"
                onClick={() => setTargetSide("return")}
                style={{
                  background: targetSide === "return" ? "#0d9488" : "transparent",
                  color: targetSide === "return" ? "#ffffff" : "#94a3b8",
                  border: "none",
                  borderRadius: "0.3rem",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ➔ Return Side
              </button>
            </div>
          </div>

          {/* Group Filter Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {[
              { id: "all", label: "All Fittings" },
              { id: "group1_supply_trunk", label: "Plenum Takeoffs" },
              { id: "group2_trunk_elbows", label: "Trunk Elbows" },
              { id: "group3_branch_runouts", label: "Branch Takeoffs" },
              { id: "group4_supply_boots", label: "Register Boots" },
              { id: "group5_return_fittings", label: "Return Fittings" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPaletteFilter(tab.id as FittingGroup | "all")}
                style={{
                  background: paletteFilter === tab.id ? "rgba(56, 189, 248, 0.15)" : "var(--surface-bg, #1e293b)",
                  border: `1px solid ${paletteFilter === tab.id ? "#38bdf8" : "#334155"}`,
                  color: paletteFilter === tab.id ? "#38bdf8" : "#cbd5e1",
                  borderRadius: "0.35rem",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Fitting Selection List */}
          <div
            style={{
              maxHeight: "260px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              paddingRight: "0.25rem",
            }}
          >
            {filteredCatalog.map((fitting) => (
              <div
                key={fitting.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0.75rem",
                  background: "var(--surface-bg, #1e293b)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "0.4rem",
                }}
              >
                <div style={{ flex: 1, paddingRight: "0.5rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f8fafc" }}>
                    {fitting.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--ink-secondary)" }}>
                    {fitting.description}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color:
                        fitting.resistanceCategory === "severe"
                          ? "#ef4444"
                          : fitting.resistanceCategory === "high"
                          ? "#f97316"
                          : "#38bdf8",
                      background: "rgba(0, 0, 0, 0.3)",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "0.25rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    +{fitting.defaultEqLengthFt} ft
                  </span>

                  <button
                    type="button"
                    onClick={() => handleAddCatalogFitting(fitting.id, fitting.defaultEqLengthFt)}
                    style={{
                      background: targetSide === "supply" ? "#0284c7" : "#0d9488",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "0.3rem",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    + Add to {targetSide === "supply" ? "Supply" : "Return"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Fitting Adder */}
          <form
            onSubmit={handleAddCustomFitting}
            style={{
              display: "flex",
              gap: "0.4rem",
              alignItems: "center",
              background: "rgba(15, 23, 42, 0.6)",
              padding: "0.5rem",
              borderRadius: "0.4rem",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
            }}
          >
            <input
              type="text"
              placeholder="Custom fitting name (e.g. 60° offset boot)..."
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              style={{
                flex: 1,
                padding: "0.35rem 0.5rem",
                background: "var(--surface-bg, #1e293b)",
                border: "1px solid #334155",
                borderRadius: "0.3rem",
                color: "#ffffff",
                fontSize: "0.75rem",
              }}
            />
            <input
              type="number"
              min="1"
              max="200"
              placeholder="ft"
              value={customEqLength}
              onChange={(e) => setCustomEqLength(Number(e.target.value))}
              style={{
                width: "60px",
                padding: "0.35rem 0.5rem",
                background: "var(--surface-bg, #1e293b)",
                border: "1px solid #334155",
                borderRadius: "0.3rem",
                color: "#ffffff",
                fontSize: "0.75rem",
                textAlign: "center",
              }}
            />
            <button
              type="submit"
              disabled={!customName.trim()}
              style={{
                background: "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.3rem",
                padding: "0.35rem 0.7rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: customName.trim() ? "pointer" : "not-allowed",
                opacity: customName.trim() ? 1 : 0.5,
              }}
            >
              + Add Custom
            </button>
          </form>
        </div>
      </div>

      {/* Selected Fittings Accumulator Table */}
      <div
        style={{
          background: "var(--card-bg, #0f172a)",
          border: "1px solid var(--border-color, #1e293b)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--ink, #f8fafc)" }}>
              4. Active Critical Run Fitting Accumulator ({selectedFittings.length} entries)
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", margin: "0.2rem 0 0 0" }}>
              Total Fitting Drag: {output.fittingLengthTotalFt} equivalent feet ({output.fittingRatioPercent}% of cumulative TEL).
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearFittings}
            style={{
              background: "transparent",
              color: "#f87171",
              border: "1px solid rgba(248, 113, 113, 0.3)",
              borderRadius: "0.35rem",
              padding: "0.25rem 0.6rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Clear All Fittings
          </button>
        </div>

        {selectedFittings.length === 0 ? (
          <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--ink-secondary)", fontSize: "0.85rem" }}>
            No fittings currently selected. Choose fittings from the catalog above to build your critical duct run.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {/* Supply Run List */}
            <div style={{ background: "rgba(2, 132, 199, 0.05)", border: "1px solid rgba(2, 132, 199, 0.2)", borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                <span>Supply Run Fittings ({supplyRunFittings.length})</span>
                <span>+{output.fittingsSupplyFt} ft eq</span>
              </div>

              {supplyRunFittings.length === 0 ? (
                <div style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", padding: "0.5rem 0" }}>No supply fittings added.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {supplyRunFittings.map((item) => {
                    const def = ACCA_MANUAL_D_FITTINGS.find((f) => f.id === item.fittingDefId);
                    const name = item.customName || def?.name || "Fitting";
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "var(--surface-bg, #1e293b)",
                          padding: "0.4rem 0.6rem",
                          borderRadius: "0.35rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        <span style={{ flex: 1, color: "#e2e8f0" }}>{name}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ color: "#7dd3fc", fontWeight: 700 }}>
                            {item.equivalentLengthFt * item.quantity} ft
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              style={{ width: "20px", height: "20px", borderRadius: "3px", border: "1px solid #475569", background: "#334155", color: "#fff", cursor: "pointer" }}
                            >
                              -
                            </button>
                            <span style={{ minWidth: "16px", textAlign: "center", fontWeight: 700 }}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              style={{ width: "20px", height: "20px", borderRadius: "3px", border: "1px solid #475569", background: "#334155", color: "#fff", cursor: "pointer" }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFitting(item.id)}
                            style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", fontSize: "0.85rem", padding: "0 0.2rem" }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Return Run List */}
            <div style={{ background: "rgba(13, 148, 136, 0.05)", border: "1px solid rgba(13, 148, 136, 0.2)", borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                <span>Return Run Fittings ({returnRunFittings.length})</span>
                <span>+{output.fittingsReturnFt} ft eq</span>
              </div>

              {returnRunFittings.length === 0 ? (
                <div style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", padding: "0.5rem 0" }}>No return fittings added.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {returnRunFittings.map((item) => {
                    const def = ACCA_MANUAL_D_FITTINGS.find((f) => f.id === item.fittingDefId);
                    const name = item.customName || def?.name || "Fitting";
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "var(--surface-bg, #1e293b)",
                          padding: "0.4rem 0.6rem",
                          borderRadius: "0.35rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        <span style={{ flex: 1, color: "#e2e8f0" }}>{name}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ color: "#5eead4", fontWeight: 700 }}>
                            {item.equivalentLengthFt * item.quantity} ft
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              style={{ width: "20px", height: "20px", borderRadius: "3px", border: "1px solid #475569", background: "#334155", color: "#fff", cursor: "pointer" }}
                            >
                              -
                            </button>
                            <span style={{ minWidth: "16px", textAlign: "center", fontWeight: 700 }}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              style={{ width: "20px", height: "20px", borderRadius: "3px", border: "1px solid #475569", background: "#334155", color: "#fff", cursor: "pointer" }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFitting(item.id)}
                            style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", fontSize: "0.85rem", padding: "0 0.2rem" }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Aerodynamic Optimization Recommendations Card */}
      {output.optimizations.length > 0 && (
        <div
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "0.75rem",
            padding: "1rem 1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#fbbf24", fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.4rem" }}>
            <span>⚡</span>
            <span>Manual D Aerodynamic Friction Optimizations Found ({output.optimizations.length})</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#fef3c7", margin: "0 0 0.75rem 0" }}>
            High-resistance fittings are inflating your Total Effective Length (TEL). Upgrading these fittings reduces duct resistance and increases your design friction rate budget.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {output.optimizations.map((opt, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  borderRadius: "0.4rem",
                  padding: "0.6rem 0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#fcd34d", marginBottom: "0.2rem" }}>
                  <span>{opt.fittingName}</span>
                  <span style={{ color: "#34d399" }}>Save {opt.potentialSavingsFt} ft TEL</span>
                </div>
                <div style={{ color: "var(--ink-secondary)", fontSize: "0.72rem" }}>{opt.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action & Handoff Bar */}
      <div
        style={{
          background: "linear-gradient(145deg, #090e1a 0%, #0d1a2d 100%)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
              Airflow Cluster Workflow Handoff
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>
              Directly export this design friction rate ({output.designFrictionRateFr.toFixed(3)}&quot; w.g./100 ft) into sizing engines.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link
            href={`/calculators/ductulator?frictionRate=${output.designFrictionRateFr.toFixed(3)}`}
            style={{
              flex: 1,
              minWidth: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0.7rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.85rem",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>➔ Transfer to Digital Ductulator</span>
            <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>({output.designFrictionRateFr.toFixed(3)}&quot;)</span>
          </Link>

          <Link
            href={`/calculators/duct-friction-loss-calculator?blowerTesp=${output.blowerTespInWg}&straightSupply=${output.straightSupplyFt}&straightReturn=${output.straightReturnFt}`}
            style={{
              flex: 1,
              minWidth: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "var(--surface-bg, #1e293b)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38bdf8",
              textDecoration: "none",
              padding: "0.7rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.85rem",
              transition: "background 0.15s ease",
            }}
          >
            <span>➔ Open in Duct Friction Loss Tool</span>
          </Link>
        </div>
      </div>

      <StepDerivationDrawer
        toolName="ACCA Manual D TEL & Friction Rate Derivation"
        steps={derivationSteps}
        governingStandard="ACCA Manual D (3rd Edition)"
      />

      <ActionButtonBar
        toolRoute="/calculators/equivalent-length-calculator"
        toolName="ACCA Manual D Equivalent Length & TEL Fitting Accumulator"
        governingStandard="ANSI/ACCA Manual D (Fitting Methodologies)"
        inputs={{
          "Blower TESP": `${tesp} in. wg`,
          "Coil Drop": `${coilDrop} in. wg`,
          "Filter Drop": `${filterDrop} in. wg`,
          "Straight Supply Run": `${straightSupply} ft`,
          "Straight Return Run": `${straightReturn} ft`,
          "Supply Fitting Drag": `${output.fittingsSupplyFt} ft eq`,
          "Return Fitting Drag": `${output.fittingsReturnFt} ft eq`,
        }}
        outputs={{
          "Total Effective Length (TEL)": `${output.cumulativeTelFt} ft`,
          "Available Static Pressure (ASP)": `${output.availableStaticPressureAspInWg.toFixed(3)} in. wg`,
          "Design Friction Rate": `${output.designFrictionRateFr.toFixed(3)} in. wg / 100 ft`,
          "Fitting Drag Ratio": `${output.fittingRatioPercent}%`,
          "Sizing Evaluation": output.frictionRateStatus,
        }}
      />

      <CalculatorTrustPill />

      {/* Mobile Sticky Results Bar */}
      <MobileResultBar
        label="Total Effective Length"
        value={`${output.cumulativeTelFt} ft`}
        unit={`(FR: ${output.designFrictionRateFr.toFixed(3)}" w.g./100')`}
      />
    </div>
  );
}
