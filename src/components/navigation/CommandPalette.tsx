"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { CalculatorMeta } from "@/types/calculation";

interface SearchItem {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  route: string;
  description: string;
  keywords: string[];
}

const CATEGORY_NAMES: Record<string, string> = {
  airflow: "Airflow & Ducts",
  "cooling-loads": "Cooling Loads",
  "field-diagnostics": "Diagnostics & PT",
  "heating-systems": "Heating & Heat Pumps",
  "building-science": "Building Science",
};

const EXTRA_KEYWORDS: Record<string, string[]> = {
  ductulator: ["duct sizing", "round duct", "rectangular duct", "friction rate", "cfm", "velocity", "fpm", "ashrae duct", "static pressure"],
  "btu-calculator": ["manual j", "cooling load", "heating load", "sq ft", "heat loss", "heat gain", "tonnage sizing", "btu per hour"],
  "ac-tonnage-calculator": ["manual s", "ac size", "seer2", "operating cost", "climate zone", "room tons", "tonnage calculator"],
  "superheat-subcooling-calculator": ["subcooling", "superheat", "r410a", "r454b", "r32", "txv", "piston", "orifice", "epa 608", "glide", "charge"],
  "cfm-calculator": ["airflow", "cfm per ton", "sensible heat", "latent heat", "air changes", "ach", "room cfm"],
  "flex-duct-cfm-chart": ["flexible duct", "duct sag", "friction loss", "derating", "flex sizing", "compression"],
  "r-value-calculator": ["insulation", "u-factor", "wall assembly", "iecc", "r value", "thermal resistance", "energy code"],
  "ac-model-decoder": ["serial number", "model number", "carrier", "trane", "lennox", "goodman", "york", "decoded tons", "btu tonnage"],
  "pt-chart": ["pressure temperature", "bubble point", "dew point", "saturation pressure", "r22", "r134a", "r404a", "r407c"],
  "heat-pump-sizing-calculator": ["heat pump", "balance point", "hspf2", "cop", "supplemental heat", "dual fuel", "strip heat"],
  "combustion-air-calculator": ["furnace combustion", "gas boiler", "nfpa 54", "confined space", "louvers", "makeup air"],
  "duct-friction-loss-calculator": ["equivalent length", "fittings", "elbows", "dampers", "total equivalent length", "smacna"],
  "psychrometric-calculator": ["enthalpy", "wet bulb", "dry bulb", "relative humidity", "dew point", "grains of moisture", "humidity ratio"],
  "filter-sizing-calculator": ["merv rating", "face velocity", "filter pressure drop", "air filter cfm", "filter area"],
  "mini-split-sizing-calculator": ["ductless mini split", "multi zone", "inverter ac", "single zone", "heat pump ductless"],
  "refrigerant-charge-calculator": ["line set adder", "factory charge", "liquid line ounces", "additional refrigerant", "weigh in charge"],
  "refrigeration-cycle-diagnostics": ["delta t", "temperature drop", "evaporator delta", "condenser delta", "coil split", "hvac troubleshooting"],
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K or ⌘+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Search items list
  const searchItems: SearchItem[] = useMemo(() => {
    return calculatorRegistry.map((calc: CalculatorMeta) => {
      const extra = EXTRA_KEYWORDS[calc.id] || [];
      return {
        id: calc.id,
        name: calc.name,
        category: calc.pillar,
        categoryName: calc.categoryName,
        route: calc.route,
        description: calc.metaDescription,
        keywords: [calc.name.toLowerCase(), calc.metaDescription.toLowerCase(), ...(calc.secondaryKeywords || []), ...extra],
      };
    });
  }, []);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchItems;
    const q = query.toLowerCase().trim();
    return searchItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      );
    });
  }, [query, searchItems]);

  const handleSelect = (route: string) => {
    setIsOpen(false);
    router.push(route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex].route);
      }
    }
  };

  return (
    <>
      {/* Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="action-btn"
        style={{
          height: "36px",
          padding: "0 0.75rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.8rem",
          color: "var(--ink-secondary)",
          background: "var(--surface)",
          borderColor: "var(--border-color)",
        }}
        aria-label="Search calculators and tools (Ctrl+K)"
        title="Search calculators (Ctrl+K)"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="search-text-desktop" style={{ display: "none" }}>Search tools...</span>
        <kbd style={{
          fontSize: "0.65rem",
          padding: "0.15rem 0.35rem",
          background: "var(--surface-raised)",
          border: "1px solid var(--border-color)",
          borderRadius: "4px",
          color: "var(--text-muted)",
        }}>
          ⌘K
        </kbd>
      </button>

      <style jsx>{`
        @media (min-width: 640px) {
          .search-text-desktop {
            display: inline !important;
          }
        }
      `}</style>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="command-palette-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search HVAC calculators"
        >
          <div
            className="command-palette-modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="command-palette-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cooling)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search calculators (e.g. duct, seer2, superheat, cfm, r-value)..."
                className="command-palette-input"
              />
              <kbd style={{
                fontSize: "0.7rem",
                padding: "0.15rem 0.4rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
                color: "var(--text-muted)",
              }}>
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="command-palette-results">
              {filteredResults.length === 0 ? (
                <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  No calculators found matching &ldquo;{query}&rdquo;.
                </div>
              ) : (
                filteredResults.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`command-palette-item ${idx === selectedIndex ? "selected" : ""}`}
                    onClick={() => handleSelect(item.route)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", minWidth: 0 }}>
                      <span className="item-name" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.description}
                      </span>
                    </div>

                    <span style={{
                      fontSize: "0.7rem",
                      padding: "0.15rem 0.45rem",
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "4px",
                      color: "var(--text-muted)",
                      marginLeft: "0.75rem",
                      flexShrink: 0,
                    }}>
                      {item.categoryName}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
