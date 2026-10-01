"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateGarageHeater,
  GaragePreset,
  GarageInsulationTier,
  GarageHeaterInput,
  GarageHeaterOutput,
  INSULATION_SPECS,
} from "@/lib/math/garage-heater";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { GarageHeaterVisualizer } from "@/components/calculator/visualizers/GarageHeaterVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/seo/StandardsBadge";
import { AshraeClimateSelector } from "@/components/calculator/AshraeClimateSelector";
import { ashraeClimaticDataset } from "@/lib/data/ashrae-climatic-data";

const PRESETS = [
  {
    label: "🚗 2-Car Attached (22x24 / Avg Ins)",
    preset: "2_car" as GaragePreset,
    height: 9,
    attached: true,
    insulation: "average" as GarageInsulationTier,
    targetTemp: 60,
    outdoorTemp: 10,
    warmupMargin: 10,
    ach: 0.45,
    locationId: "oh-columbus",
  },
  {
    label: "🚙 1-Car Compact (12x22 / Poor Ins)",
    preset: "1_car" as GaragePreset,
    height: 9,
    attached: true,
    insulation: "poor" as GarageInsulationTier,
    targetTemp: 55,
    outdoorTemp: 15,
    warmupMargin: 10,
    ach: 0.85,
    locationId: "pa-pittsburgh",
  },
  {
    label: "🚛 3-Car Detached (24x32 / Insulated)",
    preset: "3_car" as GaragePreset,
    height: 10,
    attached: false,
    insulation: "insulated_good" as GarageInsulationTier,
    targetTemp: 65,
    outdoorTemp: 0,
    warmupMargin: 10,
    ach: 0.25,
    locationId: "mn-minneapolis",
  },
  {
    label: "🚜 1,200 sq ft Shop (30x40 / 14ft Unins)",
    preset: "pole_barn_shop" as GaragePreset,
    height: 14,
    attached: false,
    insulation: "uninsulated" as GarageInsulationTier,
    targetTemp: 60,
    outdoorTemp: 0,
    warmupMargin: 15,
    ach: 1.25,
    locationId: "il-chicago",
  },
];

export function GarageHeaterTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [preset, setPreset] = useState<GaragePreset>("2_car");
  const [customWidth, setCustomWidth] = useState<number>(22);
  const [customLength, setCustomLength] = useState<number>(24);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);
  const [isAttached, setIsAttached] = useState<boolean>(true);
  const [insulation, setInsulation] = useState<GarageInsulationTier>("average");
  const [targetTemp, setTargetTemp] = useState<number>(60);
  const [outdoorTemp, setOutdoorTemp] = useState<number>(10);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("oh-columbus");
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const [warmupMargin, setWarmupMargin] = useState<number>(10);
  const [customAch, setCustomAch] = useState<number>(0.45);

  // Hydrate from URL
  useEffect(() => {
    const urlPreset = getParam("preset", "2_car") as GaragePreset;
    const urlHeight = Number(getParam("height", "9"));
    const urlOutdoor = Number(getParam("outTemp", "10"));
    const urlLoc = getParam("loc", "oh-columbus");

    if (["1_car", "2_car", "2_5_car", "3_car", "pole_barn_shop", "custom"].includes(urlPreset)) setPreset(urlPreset);
    if (!isNaN(urlHeight) && urlHeight >= 8) setCeilingHeight(urlHeight);
    if (!isNaN(urlOutdoor)) setOutdoorTemp(urlOutdoor);
    if (urlLoc) {
      setSelectedLocationId(urlLoc);
      const matched = ashraeClimaticDataset.find((l) => l.id === urlLoc);
      if (matched && matched.winterDb99 !== urlOutdoor && !isNaN(urlOutdoor)) {
        setIsManualOverride(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetSelect = (p: typeof PRESETS[0]) => {
    setPreset(p.preset);
    setCeilingHeight(p.height);
    setIsAttached(p.attached);
    setInsulation(p.insulation);
    setTargetTemp(p.targetTemp);
    setOutdoorTemp(p.outdoorTemp);
    setWarmupMargin(p.warmupMargin);
    setCustomAch(p.ach);
    setSelectedLocationId(p.locationId);
    setIsManualOverride(false);

    updateParam("preset", p.preset);
    updateParam("height", p.height);
    updateParam("outTemp", p.outdoorTemp);
    updateParam("loc", p.locationId);
  };

  const activeStation = useMemo(() => {
    return ashraeClimaticDataset.find((l) => l.id === selectedLocationId) || ashraeClimaticDataset[0];
  }, [selectedLocationId]);

  // Perform Calculation
  const output: GarageHeaterOutput = useMemo(() => {
    const input: GarageHeaterInput = {
      preset,
      customWidthFt: customWidth,
      customLengthFt: customLength,
      ceilingHeightFt: ceilingHeight,
      isAttached,
      insulationLevel: insulation,
      targetIndoorTempF: targetTemp,
      outdoorDesignTempF: outdoorTemp,
      warmupMarginPercent: warmupMargin,
      infiltrationAch: customAch,
      gasEfficiency: 0.82,
    };
    return calculateGarageHeater(input);
  }, [preset, customWidth, customLength, ceilingHeight, isAttached, insulation, targetTemp, outdoorTemp, warmupMargin, customAch]);

  const handleExportCsv = () => {
    const headers = "Parameter,Value,Unit,Engineering Notes\n";
    const rows = [
      `Garage Configuration,"${preset}","","Screening geometry"`,
      `Floor Area,${output.floorAreaSqFt},"sq ft","${output.floorAreaSqFt} sq ft slab area"`,
      `Volume,${output.volumeCuFt},"cu ft","${ceilingHeight} ft clear height"`,
      `Attached to Conditioned House,"${isAttached ? "Yes" : "No"}","","Exposed perimeter: ${output.exposedPerimeterFt} ft / Total: ${output.totalPerimeterFt} ft"`,
      `Insulation Level,"${insulation}","","${INSULATION_SPECS[insulation].description}"`,
      `Target Setpoint,${targetTemp},"°F","Thermostat operating temperature"`,
      `Outdoor Design Temperature,${outdoorTemp},"°F","${isManualOverride ? "Manual Override" : `ASHRAE Station: ${activeStation.city}, ${activeStation.state}`}"`,
      `Temperature Differential (Delta T),${output.temperatureDifferenceDeltaT},"°F","(T_indoor - T_outdoor)"`,
      `Overhead Door Conduction Loss,${output.overheadDoorLossBtu},"BTU/hr","U=${INSULATION_SPECS[insulation].uDoor}"`,
      `Exposed Wall Conduction Loss,${output.wallLossBtu},"BTU/hr","U=${INSULATION_SPECS[insulation].uWall}"`,
      `Ceiling Conduction Loss,${output.ceilingLossBtu},"BTU/hr","U=${INSULATION_SPECS[insulation].uCeiling}"`,
      `Concrete Slab Edge Conduction Loss,${output.slabEdgeLossBtu},"BTU/hr","F_slab=${INSULATION_SPECS[insulation].fSlab} BTU/hr·ft·°F"`,
      `Air Infiltration Leakage Loss,${output.infiltrationLossBtu},"BTU/hr","${output.infiltrationCfm} CFM @ ${customAch} ACH"`,
      `BASE STEADY-STATE HEAT LOSS,${output.baseSteadyStateLossBtu},"BTU/hr","Unmultiplied envelope + infiltration demand"`,
      `Warm-up / Recovery Margin,${output.warmupMarginBtu},"BTU/hr","${output.warmupMarginPercent}% intermittent recovery allowance"`,
      `TOTAL DESIGN PEAK HEAT LOSS,${output.totalPeakHeatLossBtu},"BTU/hr","Governing required heating capacity"`,
      `Calculated Electric Heating Power,${output.requiredElectricKw},"kW","Total BTU/hr / 3412.14"`,
      `Recommended Electric Unit Heater,${output.recommendedElectricHeaterKw},"kW","Nearest standard commercial size tier"`,
      `Operating Current @ 240V 1-Ph,${output.recommendedElectricAmps240V},"Amps","I = Watts / 240V"`,
      `NEC Continuous Load MCA,${output.minimumCircuitAmpacity},"Amps","125% continuous duty per NEC Article 424"`,
      `Recommended 2-Pole Circuit Breaker,${output.recommendedCircuitBreakerAmps},"Amps","Standard commercial OCPD tier"`,
      `Required Gas Heater Delivered Output,${output.requiredGasOutputBtu},"BTU/hr","Delivered net heating capacity"`,
      `Required Gas Input Rating (@82% eff),${output.requiredGasInputBtu},"BTU/hr","Fuel input demand"`,
      `Recommended Gas Unit Heater Tier,${output.recommendedGasHeaterBtu},"BTU/hr","Standard nominal commercial gas unit heater"`,
      `Delivered Gas Heat Output,${output.deliveredGasOutputBtu},"BTU/hr","Nominal rating × 82% thermal efficiency"`,
    ].join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `garage-heater-sizing-${output.floorAreaSqFt}sqft.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Garage Space Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Garage Scenarios:</span>
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
            title="Reset to 2-Car Attached Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePresetSelect(p)}
            className={`preset-chip-btn ${preset === p.preset && insulation === p.insulation && outdoorTemp === p.outdoorTemp ? "active" : ""}`}
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

          {/* ASHRAE CLIMATE SELECTOR */}
          <AshraeClimateSelector
            compact={true}
            selectedLocationId={selectedLocationId}
            onSelectLocation={(loc) => {
              setSelectedLocationId(loc.id);
              setOutdoorTemp(loc.winterDb99);
              setIsManualOverride(false);
              updateParam("outTemp", loc.winterDb99);
              updateParam("loc", loc.id);
            }}
          />

          {/* PRESET & CEILING HEIGHT */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="preset-select">
                <span>Garage Dimensions</span>
                <span className="unit-label">Layout</span>
              </label>
              <select
                id="preset-select"
                value={preset}
                onChange={(e) => {
                  const val = e.target.value as GaragePreset;
                  setPreset(val);
                  updateParam("preset", val);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="1_car">1-Car (12&apos; &times; 22&apos; = 264 sq ft)</option>
                <option value="2_car">2-Car (22&apos; &times; 24&apos; = 528 sq ft)</option>
                <option value="2_5_car">2.5-Car (24&apos; &times; 26&apos; = 624 sq ft)</option>
                <option value="3_car">3-Car (24&apos; &times; 32&apos; = 768 sq ft)</option>
                <option value="pole_barn_shop">Shop / Barn (30&apos; &times; 40&apos; = 1,200 sq ft)</option>
                <option value="custom">Custom Dimensions...</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="height-input">
                <span>Ceiling Height</span>
                <span className="unit-label">Feet</span>
              </label>
              <input
                id="height-input"
                type="number"
                min={8}
                max={24}
                value={ceilingHeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCeilingHeight(val);
                  updateParam("height", val);
                }}
                className="input-number"
              />
            </div>
          </div>

          {/* CUSTOM DIMENSIONS IF APPLICABLE */}
          {preset === "custom" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-w">Width (Feet)</label>
                <input
                  id="custom-w"
                  type="number"
                  min={10}
                  max={100}
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="input-number"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="custom-l">Length (Feet)</label>
                <input
                  id="custom-l"
                  type="number"
                  min={10}
                  max={150}
                  value={customLength}
                  onChange={(e) => setCustomLength(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            </div>
          )}

          {/* ATTACHED & INSULATION LEVEL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="attached-select">
                <span>Building Attachment</span>
                <span className="unit-label">Wall</span>
              </label>
              <select
                id="attached-select"
                value={isAttached ? "yes" : "no"}
                onChange={(e) => setIsAttached(e.target.value === "yes")}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="yes">Attached (1 Warm Shared Wall)</option>
                <option value="no">Detached (4 Cold Exterior Walls)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="insulation-select">
                <span>Insulation Level</span>
                <span className="unit-label">Quality</span>
              </label>
              <select
                id="insulation-select"
                value={insulation}
                onChange={(e) => {
                  const val = e.target.value as GarageInsulationTier;
                  setInsulation(val);
                  setCustomAch(INSULATION_SPECS[val].ach);
                }}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value="uninsulated">Uninsulated (R-0 / Metal Door / 1.25 ACH)</option>
                <option value="poor">Poor (R-7 Wall / Uninsulated Door / 0.85 ACH)</option>
                <option value="average">Average (R-13 Wall / R-6 Door / 0.45 ACH)</option>
                <option value="insulated_good">Good (R-19 Wall / R-38 Ceil / 0.25 ACH)</option>
              </select>
            </div>
          </div>

          {/* TEMPERATURE CONTROLS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="target-temp-select">
                <span>Target Thermostat</span>
                <span className="unit-label">&deg;F Setpoint</span>
              </label>
              <select
                id="target-temp-select"
                value={targetTemp}
                onChange={(e) => setTargetTemp(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={50}>50&deg;F (Freeze Protection / Storage)</option>
                <option value={55}>55&deg;F (Light Utility Work)</option>
                <option value={60}>60&deg;F (Comfortable Workshop)</option>
                <option value={65}>65&deg;F (Active Living / Home Gym)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label htmlFor="outdoor-temp-input" style={{ margin: 0 }}>
                  <span>Outdoor Design Temp</span>
                  <span className="unit-label">&deg;F</span>
                </label>
                {isManualOverride && (
                  <button
                    type="button"
                    onClick={() => {
                      setOutdoorTemp(activeStation.winterDb99);
                      setIsManualOverride(false);
                      updateParam("outTemp", activeStation.winterDb99);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--accent-cooling)",
                      fontSize: "0.68rem",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                    }}
                    title="Reset to ASHRAE station temperature"
                  >
                    ↺ Reset ({activeStation.winterDb99}&deg;F)
                  </button>
                )}
              </div>
              <input
                id="outdoor-temp-input"
                type="number"
                min={-35}
                max={50}
                value={outdoorTemp}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setOutdoorTemp(val);
                  setIsManualOverride(val !== activeStation.winterDb99);
                  updateParam("outTemp", val);
                }}
                className="input-number"
              />
              {isManualOverride && (
                <div style={{ fontSize: "0.68rem", color: "var(--accent-heating)", marginTop: "0.2rem", fontWeight: 600 }}>
                  ⚡ Manual Override active (Station: {activeStation.city} is {activeStation.winterDb99}&deg;F)
                </div>
              )}
            </div>
          </div>

          {/* ADVANCED RECOVERY MARGIN & INFILTRATION ACH */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="margin-select">
                <span>Warm-up / Door Margin</span>
                <span className="unit-label">% Recovery</span>
              </label>
              <select
                id="margin-select"
                value={warmupMargin}
                onChange={(e) => setWarmupMargin(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={0}>0% (Pure Steady-State Load)</option>
                <option value={10}>10% (Standard Garage Warm-up)</option>
                <option value={15}>15% (Moderate Door Opening)</option>
                <option value={20}>20% (Frequent Door Cycling)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="ach-select">
                <span>Infiltration Rate</span>
                <span className="unit-label">ACH</span>
              </label>
              <select
                id="ach-select"
                value={customAch}
                onChange={(e) => setCustomAch(Number(e.target.value))}
                className="input-number"
                style={{ cursor: "pointer" }}
              >
                <option value={0.25}>0.25 ACH (Tight / Sealed)</option>
                <option value={0.45}>0.45 ACH (Average Weatherstripped)</option>
                <option value={0.85}>0.85 ACH (Loose / Older Seals)</option>
                <option value={1.25}>1.25 ACH (Drafty / Unsealed)</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Garage Heater Calculation Result">
            <div className="result-label">Calculated Design Heat Loss &amp; Sizing</div>
            <div className="result-value" style={{ color: "var(--accent-heating)" }}>
              {output.totalPeakHeatLossBtu.toLocaleString()} BTU/hr
            </div>
            <div className="result-unit" style={{ marginTop: "0.2rem" }}>
              Steady-State Base: <strong>{output.baseSteadyStateLossBtu.toLocaleString()} BTU/hr</strong> ({output.requiredElectricKw} kW net) + {output.warmupMarginPercent}% margin (&Delta;T = {output.temperatureDifferenceDeltaT}&deg;F)
            </div>
            <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: "rgba(255, 107, 0, 0.12)",
                  color: "var(--accent-heating)",
                  border: "1px solid currentColor",
                }}
              >
                Recommended Gas Unit: {output.recommendedGasHeaterBtu.toLocaleString()} BTU/hr Input ({output.deliveredGasOutputBtu.toLocaleString()} BTU delivered)
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: "rgba(56, 189, 248, 0.12)",
                  color: "var(--accent-cooling)",
                  border: "1px solid currentColor",
                }}
              >
                Recommended Electric Unit: {output.recommendedElectricHeaterKw} kW ({output.recommendedCircuitBreakerAmps}A 2-Pole Breaker)
              </span>
            </div>
          </div>

          <StandardsBadge standards={["ASHRAE", "DOE", "NFPA"]} />

          {/* GARAGE HEATER SVG VISUALIZER */}
          <GarageHeaterVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Gas Unit Heater (Nominal Input)</div>
              <div className="item-value" style={{ color: "var(--accent-heating)" }}>
                {output.recommendedGasHeaterBtu.toLocaleString()} BTU/hr
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Electric Heater Output</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.recommendedElectricHeaterKw} kW ({output.recommendedElectricAmps240V}A @ 240V)
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">NEC 240V Circuit Breaker</div>
              <div className="item-value">{output.recommendedCircuitBreakerAmps}A 2-Pole (MCA {output.minimumCircuitAmpacity}A)</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Slab &amp; Door Conduction</div>
              <div className="item-value">
                {(output.slabEdgeLossBtu + output.overheadDoorLossBtu).toLocaleString()} BTU/hr
              </div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/garage-heater-sizing"
            toolName="Garage & Workshop Heater Sizing Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Steps in Heating &amp; Equipment Sizing</div>
            <Link href="/calculators/btu-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Size Residential Room &amp; Whole-House BTU Heating Capacity</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/furnace-size-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Compare Gas Unit Heaters vs High-Efficiency Furnaces</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-loss-calculator">
              <span>Calculate Whole-Home Thermal Heat Loss &amp; Infiltration</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Garage Peak Demand"
        value={`${output.totalPeakHeatLossBtu.toLocaleString()} BTU/hr`}
        unit={`(${output.recommendedGasHeaterBtu.toLocaleString()} BTU Gas / ${output.recommendedElectricHeaterKw} kW)`}
      />
    </div>
  );
}
