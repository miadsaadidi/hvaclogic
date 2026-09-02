"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AshraeLocationData } from "@/lib/data/ashrae-climatic-data";

interface ClimaticDataTableProps {
  locations: AshraeLocationData[];
}

export function ClimaticDataTable({ locations }: ClimaticDataTableProps) {
  const [search, setSearch] = useState("");
  const [selectedZone, setSelectedZone] = useState("ALL");

  const zones = useMemo(() => {
    const set = new Set(locations.map((l) => l.climateZone));
    return ["ALL", ...Array.from(set).sort()];
  }, [locations]);

  const filteredLocations = useMemo(() => {
    const q = search.toLowerCase().trim();
    return locations.filter((loc) => {
      const matchesSearch =
        !q ||
        loc.city.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.stateName.toLowerCase().includes(q);
      const matchesZone = selectedZone === "ALL" || loc.climateZone === selectedZone;
      return matchesSearch && matchesZone;
    });
  }, [locations, search, selectedZone]);

  return (
    <div>
      {/* Search & Filter Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "1rem 1.25rem",
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.65rem",
        }}
      >
        <div style={{ flex: "1 1 280px" }}>
          <label
            htmlFor="climatic-search"
            style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}
          >
            Search City or State:
          </label>
          <input
            id="climatic-search"
            type="text"
            placeholder="e.g. Chicago, Texas, Phoenix, Zone 5A..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 0.85rem",
              borderRadius: "0.45rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--ink)",
              fontSize: "0.88rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ flex: "0 1 200px" }}>
          <label
            htmlFor="zone-filter"
            style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}
          >
            Filter by IECC Climate Zone:
          </label>
          <select
            id="zone-filter"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 0.85rem",
              borderRadius: "0.45rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--ink)",
              fontSize: "0.88rem",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {zones.map((z) => (
              <option key={z} value={z}>
                {z === "ALL" ? "All Climate Zones" : `Zone ${z}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", alignSelf: "flex-end", paddingBottom: "0.4rem" }}>
          Showing <strong>{filteredLocations.length}</strong> meteorological stations
        </div>
      </div>

      {/* Responsive Data Table */}
      <div className="scenario-table" style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th scope="col">Station / Location</th>
              <th scope="col" style={{ textAlign: "center" }}>IECC Zone</th>
              <th scope="col" style={{ textAlign: "center" }}>Winter 99% DB</th>
              <th scope="col" style={{ textAlign: "center" }}>Winter 99.6% DB</th>
              <th scope="col" style={{ textAlign: "center" }}>Summer 0.4% DB</th>
              <th scope="col" style={{ textAlign: "center" }}>Coincident WB</th>
              <th scope="col" style={{ textAlign: "center" }}>Elevation</th>
              <th scope="col" style={{ textAlign: "right" }}>Direct Load Sizing Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((loc) => (
              <tr key={loc.id}>
                <td>
                  <strong style={{ color: "var(--ink)", display: "block", fontSize: "0.9rem" }}>
                    {loc.city}, {loc.state}
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{loc.stateName}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      padding: "0.15rem 0.45rem",
                      borderRadius: "4px",
                      background: "rgba(0, 210, 255, 0.1)",
                      color: "var(--accent-cooling)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    {loc.climateZone}
                  </span>
                </td>
                <td style={{ textAlign: "center", fontWeight: 700, color: "var(--accent-heating)" }}>
                  {loc.winterDb99}°F
                </td>
                <td style={{ textAlign: "center", color: "var(--ink-secondary)", fontSize: "0.85rem" }}>
                  {loc.winterDb996}°F
                </td>
                <td style={{ textAlign: "center", fontWeight: 700, color: "var(--accent-cooling)" }}>
                  {loc.summerDb04}°F
                </td>
                <td style={{ textAlign: "center", color: "var(--ink-secondary)", fontSize: "0.85rem" }}>
                  {loc.summerWb04}°F
                </td>
                <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  {loc.elevationFt.toLocaleString()} ft
                </td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                    <Link
                      href={`/calculators/ac-tonnage-calculator?loc=${loc.id}&outdoorTemp=${loc.summerDb04}`}
                      style={{
                        padding: "0.25rem 0.55rem",
                        borderRadius: "0.35rem",
                        background: "rgba(0, 210, 255, 0.12)",
                        color: "var(--accent-cooling)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                      title={`Size AC cooling for ${loc.city} (${loc.summerDb04}°F)`}
                    >
                      ❄️ AC Sizing
                    </Link>
                    <Link
                      href={`/calculators/heat-loss-calculator?loc=${loc.id}&outdoorTemp=${loc.winterDb99}`}
                      style={{
                        padding: "0.25rem 0.55rem",
                        borderRadius: "0.35rem",
                        background: "rgba(255, 107, 74, 0.12)",
                        color: "var(--accent-heating)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                      title={`Calculate heat loss for ${loc.city} (${loc.winterDb99}°F)`}
                    >
                      🔥 Heat Loss
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
