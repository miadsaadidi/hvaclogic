"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { decodeAcModel, POPULAR_MODEL_PRESETS, DecodedAcModelOutput } from "@/lib/math/ac-model-decoder";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { DataPlateVisualizer } from "@/components/calculator/visualizers/DataPlateVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { GooglePreferredBanner } from "@/components/calculator/GooglePreferredBanner";
import { CalculatorTrustPill } from "@/components/calculator/CalculatorTrustPill";
import { StandardsBadge } from "@/components/calculator/StandardsBadge";

export function AcModelDecoderTool() {
  const { getParam, updateParam } = useHydrateParams();

  // State
  const [modelInput, setModelInput] = useState<string>("24ACC636A003");
  const [serialInput, setSerialInput] = useState<string>("3218E12345");
  const [selectedBrand, setSelectedBrand] = useState<string>("auto");

  // Hydrate from URL query params
  useEffect(() => {
    const urlModel = getParam("model", "24ACC636A003");
    const urlSerial = getParam("serial", "3218E12345");
    const urlBrand = getParam("brand", "auto");

    setModelInput(urlModel || "24ACC636A003");
    setSerialInput(urlSerial || "3218E12345");
    setSelectedBrand(urlBrand || "auto");
  }, [getParam]);

  const handleModelChange = (val: string) => {
    setModelInput(val);
    updateParam("model", val);
  };

  const handleSerialChange = (val: string) => {
    setSerialInput(val);
    updateParam("serial", val);
  };

  const handleBrandChange = (val: string) => {
    setSelectedBrand(val);
    updateParam("brand", val);
  };

  const handlePresetSelect = (preset: typeof POPULAR_MODEL_PRESETS[0]) => {
    setModelInput(preset.model);
    setSerialInput(preset.serial);
    setSelectedBrand("auto");
    updateParam("model", preset.model);
    updateParam("serial", preset.serial);
    updateParam("brand", "auto");
  };

  // Perform Calculation
  const decoded: DecodedAcModelOutput = useMemo(() => {
    return decodeAcModel(modelInput, serialInput, selectedBrand);
  }, [modelInput, serialInput, selectedBrand]);

  const handleExportCsv = () => {
    const headers = "Model Number,Serial Number,Brand,Equipment Type,Nominal Tonnage,BTU/hr,Airflow CFM,Estimated Year\n";
    const row = `"${decoded.rawModelNumber}","${decoded.rawSerialNumber || ""}","${decoded.brand}","${decoded.equipmentType}",${decoded.nominalTonnage},${decoded.nominalBtu},${decoded.nominalAirflowCfm},"${decoded.manufactureYear || "N/A"}"\n`;
    const blob = new Blob([headers + row], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ac-decoder-${decoded.rawModelNumber || "model"}.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* QUICK PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Popular HVAC Brand Model Presets">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Brand Presets:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect(POPULAR_MODEL_PRESETS[0])}
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
            title="Reset to Carrier 3-Ton default sample"
          >
            ↺ Reset Defaults
          </button>
        </div>

        {POPULAR_MODEL_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetSelect(preset)}
            className={`preset-chip-btn ${modelInput.toUpperCase() === preset.model.toUpperCase() ? "active" : ""}`}
            type="button"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL */}
        <div className="input-panel">
          <CalculatorTrustPill />
          {/* BRAND SELECTOR */}
          <div className="form-group">
            <label htmlFor="brand-select">
              <span>Brand / Manufacturer</span>
              <span className="unit-label">Nomenclature Family</span>
            </label>
            <select
              id="brand-select"
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="input-number"
              style={{ cursor: "pointer" }}
            >
              <option value="auto">✨ Auto-Detect from Model Prefix</option>
              <option value="Carrier">Carrier / Bryant / Payne</option>
              <option value="Trane">Trane / American Standard</option>
              <option value="Goodman">Goodman / Amana / Daikin</option>
              <option value="Lennox">Lennox / Armstrong / Ducane</option>
              <option value="Rheem">Rheem / Ruud / WeatherKing</option>
              <option value="York">York / Coleman / Luxaire</option>
            </select>
          </div>

          {/* MODEL NUMBER INPUT */}
          <div className="form-group">
            <label htmlFor="model-input">
              <span>Model Number (M/N)</span>
              <span className="unit-label">Required</span>
            </label>
            <input
              id="model-input"
              type="text"
              value={modelInput}
              onChange={(e) => handleModelChange(e.target.value)}
              placeholder="e.g. 24ACC636A003, 4TTR4036, GSX14036..."
              className="input-number"
              style={{ textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}
              aria-label="AC Model Number input"
            />
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Find on the metallic rating sticker on the outdoor unit or air handler cabinet.
            </span>
          </div>

          {/* SERIAL NUMBER INPUT */}
          <div className="form-group">
            <label htmlFor="serial-input">
              <span>Serial Number (S/N)</span>
              <span className="unit-label">Optional (Age/Year)</span>
            </label>
            <input
              id="serial-input"
              type="text"
              value={serialInput}
              onChange={(e) => handleSerialChange(e.target.value)}
              placeholder="e.g. 3218E12345, 1805123456..."
              className="input-number"
              style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              aria-label="AC Serial Number input for manufacture date"
            />
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Enables exact manufacture year &amp; build week extraction.
            </span>
          </div>

          {/* CAPACITY REFERENCE QUICK MATRIX */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "0.5rem", padding: "0.75rem", marginTop: "0.5rem" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Standard BTU Digits Quick Key:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.35rem", fontSize: "0.7rem", color: "var(--ink-secondary)" }}>
              <div><strong>18</strong> = 1.5 Tons</div>
              <div><strong>24</strong> = 2.0 Tons</div>
              <div><strong>30</strong> = 2.5 Tons</div>
              <div><strong>36</strong> = 3.0 Tons</div>
              <div><strong>42</strong> = 3.5 Tons</div>
              <div><strong>48</strong> = 4.0 Tons</div>
              <div><strong>60</strong> = 5.0 Tons</div>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Decoded AC Capacity">
            <div className="result-label">Decoded Nominal Capacity</div>
            <div className="result-value">{decoded.nominalTonnage} Tons</div>
            <div className="result-unit">
              Nominal Cooling: <strong>{decoded.nominalBtu.toLocaleString()} BTU/hr</strong> ({decoded.nominalAirflowCfm} CFM airflow)
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  background: "rgba(0, 210, 255, 0.12)",
                  color: "var(--accent-cooling)",
                  border: "1px solid rgba(0, 210, 255, 0.3)",
                }}
              >
                Digits &lsquo;{decoded.tonnageDigits}&rsquo; = {decoded.nominalBtu / 1000}k BTU ({decoded.equipmentType})
              </span>
            </div>
          </div>

          <StandardsBadge standards={["AHRI Standard 210/240", "OEM Data Plate Standards"]} />

          {/* RATING PLATE VISUALIZER */}
          <DataPlateVisualizer decoded={decoded} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Airflow Requirement</div>
              <div className="item-value">{decoded.nominalAirflowCfm} CFM</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Equipment Age</div>
              <div className="item-value" style={{ color: decoded.manufactureYear ? "var(--accent-success)" : "var(--text-muted)" }}>
                {decoded.manufactureYear ? `${decoded.manufactureYear} (${new Date().getFullYear() - decoded.manufactureYear} yrs)` : "Enter S/N"}
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Estimated Efficiency</div>
              <div className="item-value">{decoded.estimatedSeer ? `${decoded.estimatedSeer} SEER` : "Standard Tier"}</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Electrical Service</div>
              <div className="item-value" style={{ fontSize: "0.85rem" }}>{decoded.electricalVoltage}</div>
            </div>
          </div>

          {/* GOOGLE PREFERRED SOURCE BANNER */}
          <GooglePreferredBanner />

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/ac-model-decoder"
            toolName="AC Model & Serial Number Decoder"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Sizing &amp; Verification</div>
            <Link href={`/calculators/ductulator?cfm=${decoded.nominalAirflowCfm}&friction=0.08`} style={{ marginBottom: "0.5rem" }}>
              <span>Size Ductwork for Decoded Airflow ({decoded.nominalAirflowCfm} CFM)</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/ac-tonnage-calculator">
              <span>Calculate Required Tonnage from Room Square Footage</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH FLEX INTERACTIVE VISUAL GUIDE CARDS */}
      <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.4rem" }}>
          🔍 How to Locate Your HVAC Rating Nameplate
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          HVAC equipment data plates are aluminum or weather-resistant vinyl stickers located in specific standard locations.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* Card 1: Outdoor Condenser */}
          <div
            style={{
              flex: "1 1 320px",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "4px solid var(--accent-cooling)",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🏠</span>
              <strong style={{ fontSize: "1rem", color: "var(--ink)" }}>Outdoor Condenser / Heat Pump</strong>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Look on the <strong>rear or side corner</strong> above the refrigerant service valves, or directly behind the electrical disconnect panel. The model number (M/N) and serial number (S/N) are stamped at the top of the metal foil plate.
            </p>
            <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.75rem", color: "var(--accent-cooling)", fontWeight: 700 }}>
              Location: Exterior cabinet sheet metal (Service Panel)
            </div>
          </div>

          {/* Card 2: Indoor Air Handler / Furnace */}
          <div
            style={{
              flex: "1 1 320px",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "4px solid var(--accent-heating)",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🏢</span>
              <strong style={{ fontSize: "1rem", color: "var(--ink)" }}>Indoor Air Handler / Furnace Coil</strong>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Remove the <strong>upper front access panel</strong> or inspect the left/right outer casing of the furnace or air handler blower compartment. Evaporator cased coils have their own separate data plate on the front delta plate.
            </p>
            <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.75rem", color: "var(--accent-heating)", fontWeight: 700 }}>
              Location: Inside front blower door or coil casing
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label="Decoded AC"
        value={`${decoded.nominalTonnage} Tons`}
        unit={`(${decoded.nominalBtu.toLocaleString()} BTU)`}
      />
    </div>
  );
}
