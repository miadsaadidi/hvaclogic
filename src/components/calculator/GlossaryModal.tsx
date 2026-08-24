"use client";

import React, { useState, useMemo, useEffect } from "react";

interface GlossaryTerm {
  term: string;
  category: "Airflow" | "Refrigeration" | "Efficiency" | "Building Science";
  fullTitle: string;
  definition: string;
  ruleOfThumb?: string;
  formula?: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "CFM",
    category: "Airflow",
    fullTitle: "Cubic Feet per Minute",
    definition: "Standard volumetric flow rate of conditioned air delivered by blowers and ventilation equipment.",
    ruleOfThumb: "Standard residential cooling sizing: 400 CFM per nominal ton (350 CFM/Ton in humid zones, 450 CFM/Ton in arid zones).",
    formula: "CFM = Sensible BTU / (1.08 × ΔT)",
  },
  {
    term: "FPM",
    category: "Airflow",
    fullTitle: "Feet per Minute",
    definition: "Linear velocity of airflow travelling through supply and return ductwork.",
    ruleOfThumb: "Residential main supply trunks: 700–900 FPM; branch runouts: 600–700 FPM; return grilles: 300–450 FPM for NC < 25 acoustic silence.",
    formula: "Velocity (FPM) = Airflow (CFM) / Duct Area (sq ft)",
  },
  {
    term: "in. w.g.",
    category: "Airflow",
    fullTitle: "Inches of Water Column / Gauge",
    definition: "Non-SI unit of static pressure and duct friction loss equivalent to the pressure exerted by a 1-inch liquid water column (248.84 Pascals).",
    ruleOfThumb: "Residential duct sizing equal friction standard: 0.08 to 0.10 in. wg per 100 equivalent feet.",
    formula: "1 in. w.g. = 248.84 Pa = 0.03609 psig",
  },
  {
    term: "SEER2",
    category: "Efficiency",
    fullTitle: "Seasonal Energy Efficiency Ratio 2",
    definition: "Updated 2023 AHRI/DOE metric measuring cooling BTU output per watt-hour consumed under realistic M1 external static pressure (0.5 in. w.g.).",
    ruleOfThumb: "Modern minimum standards: 13.4 SEER2 (North) / 14.3 SEER2 (South/Southwest); premium inverter units reach 20+ SEER2.",
    formula: "SEER2 = Total Seasonal Cooling BTU / Total Watt-Hours",
  },
  {
    term: "HSPF2",
    category: "Efficiency",
    fullTitle: "Heating Seasonal Performance Factor 2",
    definition: "Heating efficiency metric for heat pumps measuring total seasonal heat delivered in BTUs divided by total electrical watt-hours consumed.",
    ruleOfThumb: "DOE 2023 national baseline standard is 7.5 HSPF2 for split systems; cold-climate heat pumps exceed 8.5 to 10+ HSPF2.",
  },
  {
    term: "COP",
    category: "Efficiency",
    fullTitle: "Coefficient of Performance",
    definition: "Thermodynamic dimensionless ratio of heat energy delivered or removed to electrical power input.",
    ruleOfThumb: "Electric resistance heat has a COP of exactly 1.0; modern heat pumps deliver a COP of 2.5 to 4.5+ depending on ambient temperatures.",
    formula: "COP = Heating Thermal Watts / Electrical Watts Input",
  },
  {
    term: "Superheat",
    category: "Refrigeration",
    fullTitle: "Vapor Superheat Temperature",
    definition: "Degrees of temperature rise of vapor refrigerant above its boiling saturation temperature at evaporator suction pressure.",
    ruleOfThumb: "Protects compressor crankcase from liquid slugging. Optimal range on fixed orifice systems: target SH ± 3°F; on TXV systems: 8°F to 14°F.",
    formula: "Actual Superheat = T_suction_line - T_sat_dew(P_suction)",
  },
  {
    term: "Subcooling",
    category: "Refrigeration",
    fullTitle: "Liquid Subcooling Temperature",
    definition: "Degrees of temperature drop of liquid refrigerant below its condensing saturation temperature at high-side liquid line pressure.",
    ruleOfThumb: "Ensures 100% solid liquid column enters the TXV metering orifice. Standard manufacturer target: 10°F ± 3°F under stabilized load.",
    formula: "Actual Subcooling = T_sat_bubble(P_liquid) - T_liquid_line",
  },
  {
    term: "A2L Refrigerants",
    category: "Refrigeration",
    fullTitle: "Mildly Flammable Lower-GWP Blends",
    definition: "EPA AIM Act compliant next-generation refrigerants (R-454B with GWP 466, R-32 with GWP 675) replacing high-GWP R-410A (GWP 2088).",
    ruleOfThumb: "Require spark-proof service tools, leak mitigation sensors, left-hand threaded recovery cylinders, and discrete glide PT modeling.",
  },
  {
    term: "Temperature Glide",
    category: "Refrigeration",
    fullTitle: "Zeotropic Boiling/Condensing Span",
    definition: "Temperature span during constant-pressure phase changes in non-azeotropic refrigerant blends (e.g. 1.5°F for R-454B, 9°F for R-407C).",
    ruleOfThumb: "Reference the Dew Point curve for suction vapor superheat and the Bubble Point curve for liquid line subcooling.",
  },
  {
    term: "ACH",
    category: "Building Science",
    fullTitle: "Air Changes per Hour",
    definition: "Measure of room air volume replacement per hour to maintain indoor air quality and remove airborne contaminants.",
    ruleOfThumb: "Tight residential home: 0.35 ACH; Classroom: 4–6 ACH; Commercial Kitchen: 15–20 ACH; Hospital Isolation: 12+ ACH.",
    formula: "ACH = (CFM × 60) / Room Volume (cu ft)",
  },
  {
    term: "R-Value",
    category: "Building Science",
    fullTitle: "Thermal Resistance",
    definition: "Measure of a construction material's resistance to conductive heat flow. The reciprocal of U-Factor.",
    ruleOfThumb: "Higher is better. 2024 IECC Climate Zone 4/5 standards: R-20+5ci exterior wall assembly, R-60 attic ceiling insulation.",
    formula: "R-Value = Thickness (inches) / Thermal Conductivity (k)",
  },
  {
    term: "U-Factor",
    category: "Building Science",
    fullTitle: "Overall Heat Transmission Coefficient",
    definition: "Rate of steady-state heat loss through an entire envelope assembly in BTU/hr per square foot per degree Fahrenheit difference.",
    ruleOfThumb: "Lower is better. High-efficiency windows: U-0.22 to U-0.28; Code exterior walls: U-0.045 to U-0.060.",
    formula: "U-Factor = 1 / Total Assembly R-Value",
  },
  {
    term: "TEL",
    category: "Airflow",
    fullTitle: "Total Equivalent Length",
    definition: "Physical straight duct length plus friction resistance of all fittings, dampers, transitions, and elbows converted into equivalent feet.",
    ruleOfThumb: "Standard 90° adjustable elbow: 10 to 30 equivalent feet depending on throat radius and turning vanes.",
    formula: "TEL = Measured Duct Run + Sum of All Fitting Equivalent Lengths",
  },
];

export function GlossaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCat = selectedCat === "All" || t.category === selectedCat;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.fullTitle.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCat]);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="action-btn"
        style={{
          height: "36px",
          padding: "0 0.65rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.78rem",
          color: "var(--ink)",
          background: "var(--surface)",
          borderColor: "var(--border-color)",
        }}
        title="Open HVAC Engineering Field Glossary"
        aria-label="HVAC Glossary"
      >
        <span style={{ fontSize: "0.9rem" }}>📖</span>
        <span className="glossary-btn-text" style={{ display: "none" }}>Glossary</span>
      </button>

      <style jsx>{`
        @media (min-width: 900px) {
          .glossary-btn-text {
            display: inline !important;
          }
        }
      `}</style>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="command-palette-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HVAC Field Glossary"
        >
          <div
            style={{
              width: "100%",
              maxWidth: "920px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "1rem",
              padding: "1.75rem 2rem",
              boxShadow: "var(--shadow-lg), 0 0 50px rgba(0, 210, 255, 0.12)",
              animation: "fadeIn 0.15s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.4rem" }}>📖</span>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    HVAC Engineering Field Glossary
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                    Official technical definitions, formulas, and rules of thumb (ASHRAE, ACCA, EPA, AHRI).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Search Input & Category Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center" }}>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search term or acronym (e.g. CFM, SEER2, Superheat, A2L)..."
                style={{
                  flex: "1 1 240px",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--ink)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {["All", "Airflow", "Refrigeration", "Efficiency", "Building Science"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: selectedCat === cat ? "var(--accent-cooling)" : "var(--border-color)",
                      background: selectedCat === cat ? "var(--accent-cooling)" : "var(--surface-raised)",
                      color: selectedCat === cat ? "#ffffff" : "var(--ink-secondary)",
                      transition: "all 120ms ease",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Terms List */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "1rem",
                paddingRight: "0.25rem",
              }}
            >
              {filteredTerms.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  No terms found matching &ldquo;{search}&rdquo;.
                </div>
              ) : (
                filteredTerms.map((item) => (
                  <div
                    key={item.term}
                    style={{
                      padding: "1rem 1.15rem",
                      borderRadius: "0.65rem",
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cooling)" }}>
                          {item.term}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--ink)", fontWeight: 600 }}>
                          • {item.fullTitle}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: "rgba(0, 210, 255, 0.1)",
                          color: "var(--accent-cooling)",
                          border: "1px solid rgba(0, 210, 255, 0.2)",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45 }}>
                      {item.definition}
                    </p>

                    {item.ruleOfThumb && (
                      <div
                        style={{
                          marginTop: "0.35rem",
                          padding: "0.4rem 0.6rem",
                          background: "var(--bg-primary)",
                          borderLeft: "2px solid var(--accent-primary)",
                          borderRadius: "3px",
                          fontSize: "0.75rem",
                          color: "var(--ink)",
                          lineHeight: 1.4,
                        }}
                      >
                        💡 <strong>Rule of Thumb:</strong> {item.ruleOfThumb}
                      </div>
                    )}

                    {item.formula && (
                      <div
                        style={{
                          marginTop: "0.2rem",
                          padding: "0.35rem 0.55rem",
                          background: "var(--bg-primary)",
                          borderRadius: "3px",
                          fontFamily: "ui-monospace, monospace",
                          fontSize: "0.73rem",
                          color: "var(--accent-cooling)",
                        }}
                      >
                        {item.formula}
                      </div>
                    )}
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
