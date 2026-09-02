"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ashraeClimaticDataset, AshraeLocationData } from "@/lib/data/ashrae-climatic-data";

export interface AshraeClimateSelectorProps {
  onSelectLocation: (data: AshraeLocationData) => void;
  selectedLocationId?: string;
  className?: string;
  compact?: boolean;
}

export function AshraeClimateSelector({
  onSelectLocation,
  selectedLocationId,
  className = "",
  compact = false,
}: AshraeClimateSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(selectedLocationId || "il-chicago");
  const [activeLocation, setActiveLocation] = useState<AshraeLocationData>(
    () => ashraeClimaticDataset.find((l) => l.id === (selectedLocationId || "il-chicago")) || ashraeClimaticDataset[0]
  );

  useEffect(() => {
    if (selectedLocationId) {
      const match = ashraeClimaticDataset.find((l) => l.id === selectedLocationId);
      if (match) {
        setSelectedId(match.id);
        setActiveLocation(match);
      }
    }
  }, [selectedLocationId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locId = e.target.value;
    setSelectedId(locId);
    const loc = ashraeClimaticDataset.find((l) => l.id === locId);
    if (loc) {
      setActiveLocation(loc);
      onSelectLocation(loc);
    }
  };

  return (
    <div
      className={`ashrae-climate-selector ${className}`.trim()}
      style={{
        padding: compact ? "0.75rem" : "0.95rem 1.1rem",
        borderRadius: "0.65rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        marginBottom: "1.25rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.6rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1rem" }}>📍</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)" }}>
            ASHRAE Climatic Design Conditions
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              padding: "0.1rem 0.4rem",
              borderRadius: "4px",
              background: "rgba(0, 210, 255, 0.12)",
              color: "var(--accent-cooling)",
              textTransform: "uppercase",
            }}
          >
            50 States + CA
          </span>
        </div>
        <Link
          href="/ashrae-climatic-data"
          style={{
            fontSize: "0.75rem",
            color: "var(--accent-cooling)",
            textDecoration: "none",
            fontWeight: 600,
          }}
          title="Browse all 120+ ASHRAE meteorological weather stations"
        >
          View Full Climatic Database →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "1.4fr 2fr",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {/* Dropdown Selection */}
        <div>
          <label
            htmlFor="ashrae-city-select"
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            Select Regional Metro / Station:
          </label>
          <select
            id="ashrae-city-select"
            value={selectedId}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.45rem 0.65rem",
              borderRadius: "0.45rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--ink)",
              fontSize: "0.82rem",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {ashraeClimaticDataset.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.state} — {loc.city} (Zone {loc.climateZone})
              </option>
            ))}
          </select>
        </div>

        {/* Live Metrics Pill Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "0.45rem",
          }}
        >
          <div
            style={{
              padding: "0.35rem 0.5rem",
              borderRadius: "0.4rem",
              background: "rgba(255, 107, 74, 0.08)",
              border: "1px solid rgba(255, 107, 74, 0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "var(--accent-heating)", fontWeight: 600 }}>Winter 99%</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
              {activeLocation.winterDb99}°F
            </div>
          </div>

          <div
            style={{
              padding: "0.35rem 0.5rem",
              borderRadius: "0.4rem",
              background: "rgba(0, 210, 255, 0.08)",
              border: "1px solid rgba(0, 210, 255, 0.2)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "var(--accent-cooling)", fontWeight: 600 }}>Summer 0.4%</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
              {activeLocation.summerDb04}°F
            </div>
          </div>

          <div
            style={{
              padding: "0.35rem 0.5rem",
              borderRadius: "0.4rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>Coincident WB</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
              {activeLocation.summerWb04}°F
            </div>
          </div>

          <div
            style={{
              padding: "0.35rem 0.5rem",
              borderRadius: "0.4rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>IECC Zone</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-cooling)" }}>
              {activeLocation.climateZone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
