"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateMiniSplitSystem,
  MiniSplitRoom,
  MiniSplitSystemOutput,
} from "@/lib/math/mini-split";
import { MiniSplitMultiZoneVisualizer } from "@/components/calculator/visualizers/MiniSplitMultiZoneVisualizer";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";

const DEFAULT_ROOMS: MiniSplitRoom[] = [
  { id: "1", name: "Master Bedroom", sqft: 240, sunExposure: "south", insulation: "good", ceilingHeight: "standard" },
  { id: "2", name: "Guest Bedroom", sqft: 160, sunExposure: "north", insulation: "average", ceilingHeight: "standard" },
  { id: "3", name: "Living & Dining", sqft: 420, sunExposure: "west", insulation: "average", ceilingHeight: "standard" },
];

export function MiniSplitTool() {
  const [rooms, setRooms] = useState<MiniSplitRoom[]>(DEFAULT_ROOMS);

  const handlePresetSelect = (presetType: "3-zone" | "2-zone" | "4-zone" | "1-zone") => {
    if (presetType === "3-zone") {
      setRooms([
        { id: "1", name: "Master Bedroom", sqft: 240, sunExposure: "south", insulation: "good", ceilingHeight: "standard" },
        { id: "2", name: "Guest Bedroom", sqft: 160, sunExposure: "north", insulation: "average", ceilingHeight: "standard" },
        { id: "3", name: "Living & Dining", sqft: 420, sunExposure: "west", insulation: "average", ceilingHeight: "standard" },
      ]);
    } else if (presetType === "2-zone") {
      setRooms([
        { id: "1", name: "Primary Suite", sqft: 300, sunExposure: "south", insulation: "good", ceilingHeight: "standard" },
        { id: "2", name: "Home Office", sqft: 180, sunExposure: "average", insulation: "average", ceilingHeight: "standard" },
      ]);
    } else if (presetType === "4-zone") {
      setRooms([
        { id: "1", name: "Living Room", sqft: 450, sunExposure: "west", insulation: "average", ceilingHeight: "standard" },
        { id: "2", name: "Kitchen / Dining", sqft: 280, sunExposure: "south", insulation: "average", ceilingHeight: "standard" },
        { id: "3", name: "Master Bedroom", sqft: 260, sunExposure: "south", insulation: "good", ceilingHeight: "standard" },
        { id: "4", name: "Guest Bedroom", sqft: 170, sunExposure: "north", insulation: "average", ceilingHeight: "standard" },
      ]);
    } else {
      setRooms([
        { id: "1", name: "Studio Living Area", sqft: 400, sunExposure: "average", insulation: "average", ceilingHeight: "standard" },
      ]);
    }
  };

  const handleAddRoom = () => {
    if (rooms.length >= 5) return;
    const newId = String(Date.now());
    const newRoom: MiniSplitRoom = {
      id: newId,
      name: `Room ${rooms.length + 1}`,
      sqft: 200,
      sunExposure: "average",
      insulation: "average",
      ceilingHeight: "standard",
    };
    setRooms([...rooms, newRoom]);
  };

  const handleRemoveRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms(rooms.filter((r) => r.id !== id));
  };

  const handleUpdateRoom = (id: string, updates: Partial<MiniSplitRoom>) => {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  // Perform Calculation
  const output: MiniSplitSystemOutput = useMemo(() => {
    return calculateMiniSplitSystem(rooms);
  }, [rooms]);

  const handleExportCsv = () => {
    const headers = "Room Name,Area (Sq Ft),Sun Exposure,Insulation,Calculated Load (BTU),Matched Indoor Head (BTU)\n";
    const rows = output.rooms
      .map(
        (r, idx) =>
          `"${r.name}",${r.sqft},"${rooms[idx]?.sunExposure || "average"}","${rooms[idx]?.insulation || "average"}",${r.calculatedLoadBtu},${r.matchedIndoorHeadBtu}`
      )
      .join("\n");
    const summaryRow = `\n"TOTAL INDOOR CONNECTED",,,,${output.totalRoomLoadBtu},${output.totalIndoorConnectedBtu}\n"RECOMMENDED OUTDOOR CONDENSER",,,,,"${output.recommendedOutdoorTonnage} Tons (${output.recommendedOutdoorCondenserBtu} BTU)"\n`;
    const blob = new Blob([headers + rows + summaryRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mini-split-${output.rooms.length}-zone-sizing.csv`;
    a.click();
  };

  return (
    <div className="calculator-card">
      {/* PRESET CHIPS */}
      <div className="preset-chips-container" role="group" aria-label="Mini-Split Zoning Scenarios">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
          <span className="preset-chips-label" style={{ margin: 0, width: "auto" }}>Sample Multi-Zone Profiles:</span>
          <button
            type="button"
            onClick={() => handlePresetSelect("3-zone")}
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
            title="Reset to 3-Zone Whole Home Default"
          >
            ↺ Reset Defaults
          </button>
        </div>

        <button onClick={() => handlePresetSelect("3-zone")} className={`preset-chip-btn ${rooms.length === 3 ? "active" : ""}`} type="button">
          🏡 3-Zone Whole Home
        </button>
        <button onClick={() => handlePresetSelect("2-zone")} className={`preset-chip-btn ${rooms.length === 2 ? "active" : ""}`} type="button">
          🏢 2-Zone Suite &amp; Office
        </button>
        <button onClick={() => handlePresetSelect("4-zone")} className={`preset-chip-btn ${rooms.length === 4 ? "active" : ""}`} type="button">
          🏰 4-Zone Large Home
        </button>
        <button onClick={() => handlePresetSelect("1-zone")} className={`preset-chip-btn ${rooms.length === 1 ? "active" : ""}`} type="button">
          🏠 1-Zone Single Room
        </button>
      </div>

      <div className="calculator-grid">
        {/* INPUT PANEL: DYNAMIC ROOM BUILDER */}
        <div className="input-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)" }}>
              Custom Zones ({rooms.length}/5)
            </span>
            {rooms.length < 5 && (
              <button
                type="button"
                onClick={handleAddRoom}
                style={{
                  background: "rgba(0, 210, 255, 0.12)",
                  border: "1px solid var(--accent-cooling)",
                  color: "var(--accent-cooling)",
                  borderRadius: "4px",
                  padding: "0.25rem 0.65rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Add Room
              </button>
            )}
          </div>

          {/* ROOM CARDS LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => handleUpdateRoom(room.id, { name: e.target.value })}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px dashed var(--border-color)",
                      color: "var(--ink)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      width: "60%",
                      padding: "0.1rem 0",
                    }}
                    aria-label={`Room ${idx + 1} Name`}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        background: "rgba(0, 210, 255, 0.1)",
                        color: "var(--accent-cooling)",
                      }}
                    >
                      {output.rooms[idx]?.matchedIndoorHeadBtu ? `${output.rooms[idx].matchedIndoorHeadBtu / 1000}k Head` : ""}
                    </span>
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRoom(room.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--accent-danger)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          padding: "0 0.2rem",
                        }}
                        title="Remove Room"
                        aria-label={`Remove ${room.name}`}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "0.5rem" }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: "0.68rem" }}>Area (Sq Ft)</label>
                    <input
                      type="number"
                      min={50}
                      max={1500}
                      value={room.sqft}
                      onChange={(e) => handleUpdateRoom(room.id, { sqft: Number(e.target.value) })}
                      className="input-number"
                      style={{ padding: "0.3rem 0.5rem", fontSize: "0.8rem" }}
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: "0.68rem" }}>Sun Exposure</label>
                    <select
                      value={room.sunExposure}
                      onChange={(e) => handleUpdateRoom(room.id, { sunExposure: e.target.value as MiniSplitRoom["sunExposure"] })}
                      className="input-number"
                      style={{ padding: "0.3rem 0.2rem", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      <option value="average">Avg (1.0×)</option>
                      <option value="south">South (1.1×)</option>
                      <option value="west">West (1.15×)</option>
                      <option value="north">North (0.95×)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: "0.68rem" }}>Insulation</label>
                    <select
                      value={room.insulation}
                      onChange={(e) => handleUpdateRoom(room.id, { insulation: e.target.value as MiniSplitRoom["insulation"] })}
                      className="input-number"
                      style={{ padding: "0.3rem 0.2rem", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      <option value="good">Good (0.9×)</option>
                      <option value="average">Avg (1.0×)</option>
                      <option value="poor">Poor (1.15×)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="output-panel">
          {/* PRIMARY RESULT CARD */}
          <div className="primary-result-card" role="region" aria-live="polite" aria-label="Mini-Split System Result">
            <div className="result-label">Recommended Outdoor Condenser</div>
            <div className="result-value" style={{ color: "var(--accent-cooling)" }}>
              {output.recommendedOutdoorTonnage} Ton ({output.recommendedOutdoorCondenserBtu / 1000}k BTU)
            </div>
            <div className="result-unit">
              Multi-Port Inverter Condenser ({output.numberOfPorts}-Port Minimum)
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
                  background: output.connectedCapacityRatioPercent > 130 ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                  color: output.connectedCapacityRatioPercent > 130 ? "var(--accent-danger)" : "var(--accent-success)",
                  border: "1px solid currentColor",
                }}
              >
                {output.connectedCapacityRatioPercent}% Connected Capacity &bull; {output.overSubscriptionStatus}
              </span>
            </div>
          </div>

          {/* MULTI-ZONE SVG SCHEMATIC VISUALIZER */}
          <MiniSplitMultiZoneVisualizer output={output} />

          {/* SECONDARY RESULTS GRID */}
          <div className="secondary-results-grid">
            <div className="secondary-result-item">
              <div className="item-label">Total Connected Indoor</div>
              <div className="item-value" style={{ color: "var(--accent-cooling)" }}>
                {output.totalIndoorConnectedBtu.toLocaleString()} BTU
              </div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Total Room Thermal Load</div>
              <div className="item-value">{output.totalRoomLoadBtu.toLocaleString()} BTU</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Indoor Zones</div>
              <div className="item-value">{output.rooms.length} Active Zones</div>
            </div>
            <div className="secondary-result-item">
              <div className="item-label">Diversity Ratio</div>
              <div className="item-value">{output.connectedCapacityRatioPercent}% Ratio</div>
            </div>
          </div>

          {/* ACTION BUTTON BAR */}
          <ActionButtonBar
            toolRoute="/calculators/mini-split-sizing"
            toolName="Mini-Split Multi-Zone Sizing Calculator"
            onExportCsv={handleExportCsv}
          />

          {/* DOWNSTREAM WORKFLOW HANDOFF */}
          <div className="handoff-card">
            <div className="handoff-title">Next Step in System Engineering</div>
            <Link href="/calculators/btu-calculator" style={{ marginBottom: "0.5rem" }}>
              <span>Cross-Check Whole-House Manual J Cooling Load</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/heat-pump-size-calculator">
              <span>Verify Cold-Climate Heating Balance Point at Winter Design Temp</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <MobileResultBar
        label={`${output.rooms.length}-Zone Mini-Split`}
        value={`${output.recommendedOutdoorTonnage}T (${output.recommendedOutdoorCondenserBtu / 1000}k)`}
        unit={`(${output.totalIndoorConnectedBtu / 1000}k Indoor)`}
      />
    </div>
  );
}
