"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CalculatorMeta } from "@/types/calculation";

interface HomeSearchFilterProps {
  calculators: CalculatorMeta[];
}

const CATEGORY_META: Record<string, { label: string; icon: string; color: string }> = {
  all: { label: "All Calculators", icon: "⚡", color: "var(--accent-primary)" },
  "airflow-ducts": { label: "Airflow & Ducts", icon: "🌀", color: "#00d2ff" },
  "cooling-loads": { label: "Cooling Loads", icon: "❄️", color: "#38bdf8" },
  "field-diagnostics": { label: "Diagnostics & PT", icon: "🔧", color: "#10b981" },
  "heating-systems": { label: "Heating & Heat Pumps", icon: "🔥", color: "#ff6b4a" },
  "building-science": { label: "Building Science", icon: "🏢", color: "#8b5cf6" },
};

const CALCULATOR_METRICS: Record<string, { metric: string; icon: string }> = {
  ductulator: { metric: "Equal Friction • Round/Rect • Velocity", icon: "🌀" },
  "flex-duct-cfm-chart": { metric: "Sag Derating • Friction • SMACNA", icon: "📏" },
  "cfm-calculator": { metric: "Sensible Heat • 400 CFM/Ton • ACH", icon: "💨" },
  "kitchen-hood-cfm": { metric: "Cooktop BTU • Island Hood • Make-Up Air", icon: "🍳" },
  "btu-calculator": { metric: "Manual J • Sq Ft • Tonnage Sizing", icon: "🏠" },
  "ac-tonnage-calculator": { metric: "Manual S • SEER2 • Cost Modeling", icon: "❄️" },
  "ac-model-decoder": { metric: "Serial/Model • Nominal Tonnage", icon: "🔍" },
  "mini-split-sizing": { metric: "Multi-Zone • Inverter Diversity", icon: "⚡" },
  "superheat-subcooling-calculator": { metric: "TXV / Piston • NIST REFPROP PT", icon: "🔧" },
  "pt-chart": { metric: "Glide • Bubble/Dew • R-454B A2L", icon: "📊" },
  "psychrometric-calculator": { metric: "Enthalpy • Wet Bulb • Humidity", icon: "💧" },
  "furnace-size-calculator": { metric: "80% vs 96% AFUE • Blower CFM", icon: "🔥" },
  "heat-pump-size-calculator": { metric: "Balance Point • ccASHP • Backup kW", icon: "⚡" },
  "boiler-size-calculator": { metric: "Baseboard Ft • Radiator EDR • DHW", icon: "♨️" },
  "garage-heater-sizing": { metric: "Slab Losses • Gas BTU • 240V Amps", icon: "🚗" },
  "r-value-calculator": { metric: "Series/Parallel • U-Factor • IECC", icon: "🏢" },
  "heat-loss-calculator": { metric: "Envelope Transmission • ACH Drafts", icon: "🏡" },
};

export function HomeSearchFilter({ calculators }: HomeSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: calculators.length };
    for (const calc of calculators) {
      counts[calc.pillar] = (counts[calc.pillar] || 0) + 1;
    }
    return counts;
  }, [calculators]);

  const filteredCalculators = useMemo(() => {
    return calculators.filter((calc) => {
      const matchesCategory = selectedCategory === "all" || calc.pillar === selectedCategory;
      const meta = CALCULATOR_METRICS[calc.id];
      const searchTarget = `${calc.name} ${calc.categoryName} ${calc.metaDescription} ${meta?.metric ?? ""} ${(calc.secondaryKeywords || []).join(" ")}`.toLowerCase();
      const matchesSearch = !searchQuery.trim() || searchTarget.includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [calculators, searchQuery, selectedCategory]);

  return (
    <section style={{ marginTop: "1.25rem", marginBottom: "3.5rem" }}>
      {/* Search Header Input Bar */}
      <div style={{ maxWidth: "720px", margin: "0 auto 1.5rem", position: "relative" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "var(--surface)",
            borderRadius: "9999px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.16)",
            transition: "all 0.2s ease",
          }}
          className="search-input-container"
        >
          <span
            style={{
              paddingLeft: "1.1rem",
              paddingRight: "0.4rem",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            🔍
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search all ${calculators.length} calculators (e.g. 'duct sizing', 'seer2', 'superheat', 'r-value', 'cfm')...`}
            aria-label="Search HVAC calculators"
            style={{
              width: "100%",
              padding: "0.85rem 0.5rem 0.85rem 0.25rem",
              background: "transparent",
              border: "none",
              color: "var(--ink)",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingRight: "1rem" }}>
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "0.2rem 0.4rem",
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : (
              <span className="search-shortcut-badge">
                Ctrl K
              </span>
            )}
          </div>
        </div>

        {/* Live Filter / Result status badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0.75rem 0" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Showing {filteredCalculators.length} of {calculators.length} engineering tools
          </span>
          {searchQuery && (
            <span style={{ fontSize: "0.75rem", color: "var(--accent-cooling)", fontWeight: 600 }}>
              Filtered by &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter calculators by category"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {Object.entries(CATEGORY_META).map(([key, cat]) => {
          const isActive = selectedCategory === key;
          const count = categoryCounts[key] || 0;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                border: `1px solid ${isActive ? cat.color : "var(--border-color)"}`,
                background: isActive ? cat.color : "var(--surface)",
                color: isActive ? "#ffffff" : "var(--ink)",
                boxShadow: isActive ? `0 4px 14px ${cat.color}35` : "var(--shadow-sm)",
                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "0.05rem 0.4rem",
                  borderRadius: "999px",
                  background: isActive ? "rgba(0, 0, 0, 0.25)" : "var(--bg-primary)",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtered Cards Grid */}
      {filteredCalculators.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3.5rem 1.5rem",
            background: "var(--surface)",
            borderRadius: "0.85rem",
            border: "1px dashed var(--border-color)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <p style={{ fontSize: "1.3rem", margin: "0 0 0.5rem" }}>🔍 No matching calculators found</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0 0 1.25rem" }}>
            Try searching for terms like &quot;ductulator&quot;, &quot;seer2&quot;, &quot;tonnage&quot;, &quot;superheat&quot;, &quot;r-value&quot;, or &quot;cfm&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              background: "var(--surface-raised)",
              color: "var(--accent-cooling)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.35rem",
          }}
        >
          {filteredCalculators.map((calc) => {
            const catInfo = CATEGORY_META[calc.pillar] ?? { label: calc.categoryName, icon: "⚡", color: "var(--accent-primary)" };
            const meta = CALCULATOR_METRICS[calc.id];
            const color = catInfo.color;

            return (
              <Link
                key={calc.id}
                href={calc.route}
                className="powerlab-card-link"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.35rem",
                  borderRadius: "0.85rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderTop: `3.5px solid ${color}`,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Top Row: Category Label + Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: color,
                    }}
                  >
                    {calc.categoryName}
                  </span>
                  <span style={{ fontSize: "1.35rem" }}>{meta?.icon ?? catInfo.icon}</span>
                </div>

                {/* Calculator Title */}
                <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)" }}>
                  {calc.name}
                </h3>

                {/* Metric Pill Badge */}
                {meta && (
                  <div
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      background: `${color}12`,
                      color: color,
                      border: `1px solid ${color}28`,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {meta.metric}
                  </div>
                )}

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.45,
                    margin: "0 0 1rem",
                    flex: 1,
                  }}
                >
                  {calc.metaDescription}
                </p>

                {/* Standards Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.75rem" }}>
                  {calc.standards.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-color)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "3px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.7rem",
                    borderTop: "1px solid var(--border-subtle)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: color,
                  }}
                >
                  <span>Launch Tool</span>
                  <span className="card-arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

