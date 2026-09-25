import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import {
  evaluateAssemblyCondensation,
  STANDARD_WALL_ASSEMBLIES,
  EnvironmentalConditions,
} from "@/lib/math/envelope-condensation";

export const metadata: Metadata = {
  title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Master Guide",
  description:
    "Comprehensive engineering guide connecting moist air psychrometrics (ASHRAE Hyland-Wexler) with building enclosure heat and moisture transfer, Glaser condensation planes, and vapor retarder physics.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/psychrometrics-building-envelope-physics`,
  },
  openGraph: {
    title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Master Guide",
    description:
      "Comprehensive engineering guide connecting moist air psychrometrics (ASHRAE Hyland-Wexler) with building enclosure heat and moisture transfer, Glaser condensation planes, and vapor retarder physics.",
    url: `${siteConfig.canonicalDomain}/guides/psychrometrics-building-envelope-physics`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Guide",
    description:
      "Engineering guide to ASHRAE Fundamentals moist air thermodynamics, Glaser dew point method, and building assembly vapor retarders.",
  },
  other: {
    "citation_title": "Psychrometrics & Building Envelope Physics: Hydrothermal Gradients and Interstitial Condensation Modeling",
    "citation_author": "HVACLogic Building Science Research Group",
    "citation_publication_date": "2026/09/25",
    "citation_technical_report_number": "HL-TR-2026-PSYCH02",
    "citation_publisher": "HVACLogic",
  },
};

export default function PsychrometricsBuildingEnvelopeGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Psychrometrics & Building Envelope Physics: Condensation Dynamics & Hydrothermal Gradients",
    description:
      "Engineering reference connecting moist air psychrometrics, ASHRAE Hyland-Wexler thermodynamic formulations, Fourier heat conduction, and Glaser method interstitial condensation modeling in building enclosures.",
    url: `${siteConfig.canonicalDomain}/guides/psychrometrics-building-envelope-physics`,
    author: {
      "@type": "Organization",
      name: "HVACLogic Engineering Group",
      url: siteConfig.canonicalDomain,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.canonicalDomain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.canonicalDomain}/icon.svg`,
      },
    },
    datePublished: "2026-09-25T00:00:00.000Z",
    dateModified: "2026-09-25T00:00:00.000Z",
    about: [
      { "@type": "Thing", name: "ASHRAE Handbook of Fundamentals Chapter 1 (Psychrometrics)" },
      { "@type": "Thing", name: "ASHRAE Handbook of Fundamentals Chapter 26 (Moisture Management)" },
      { "@type": "Thing", name: "Glaser Dew Point Method (EN ISO 13788)" },
      { "@type": "Thing", name: "Building Envelope Thermal Bridging" },
      { "@type": "Thing", name: "Vapor Retarder Classes (IRC / IBC / IECC)" },
    ],
  };

  // Pre-calculate sample benchmark scenarios for visual tabular matrix
  const winterCondition: EnvironmentalConditions = {
    indoorDryBulbF: 70,
    indoorRelativeHumidityPercent: 40,
    outdoorDryBulbF: 10,
    outdoorRelativeHumidityPercent: 80,
  };

  const coldCavityResult = evaluateAssemblyCondensation(
    STANDARD_WALL_ASSEMBLIES["2x6-wood-kraft-batt"].layers,
    winterCondition
  );

  const highPerfResult = evaluateAssemblyCondensation(
    STANDARD_WALL_ASSEMBLIES["high-performance-continuous-ci"].layers,
    winterCondition
  );

  return (
    <article style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1rem", color: "var(--ink)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <Link href="/guides" style={{ color: "inherit", textDecoration: "none" }}>Guides</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <span style={{ color: "var(--ink)" }}>Psychrometrics &amp; Building Science</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}>
            Building Science &amp; Enclosure Physics
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            ASHRAE Fundamentals Ch. 1 &amp; 26
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
            Glaser Method (EN ISO 13788)
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            IECC 2024 / IRC Sec. R702.7
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Psychrometrics &amp; Building Envelope Physics: Condensation Dynamics &amp; Hydrothermal Gradients
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          A rigorous engineering reference detailing how moist air thermodynamics, vapor pressure gradients, and multi-layer wall assembly thermal transmission intersect to govern interstitial condensation, mold formation, and building envelope durability.
        </p>
      </header>

      {/* Quick Navigation Callout */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderLeft: "4px solid var(--accent-primary)",
          borderRadius: "0.5rem",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Interactive Companion Engines</div>
          <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            Explore full thermodynamic psychrometric properties and multi-layer assembly R-values.
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link
            href="/calculators/psychrometric-calculator"
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "0.375rem",
              background: "var(--accent-primary)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Psychrometric Calculator →
          </Link>
          <Link
            href="/calculators/effective-r-value-calculator"
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "0.375rem",
              background: "var(--surface-hover, rgba(255,255,255,0.08))",
              border: "1px solid var(--border-color)",
              color: "var(--ink)",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Effective R-Value Tool →
          </Link>
        </div>
      </div>

      {/* Section 1: The Psychrometric-Envelope Nexus */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          1. The Thermodynamic Nexus: Moist Air &amp; Building Enclosures
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Building envelope engineering is fundamentally an applied exercise in <strong>moist air psychrometrics</strong>. While space conditioning systems modulate bulk dry-bulb temperature (T_db) and relative humidity (&phi;), the building envelope acts as a dynamic semi-permeable membrane separating two distinct thermodynamic states.
        </p>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Every building assembly experiences two simultaneous, coupled thermodynamic gradients:
        </p>
        <ol style={{ lineHeight: 1.7, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Thermal Gradient (T(x)):</strong> Governed by Fourier&apos;s law of conductive heat transfer, temperature drops across successive material layers in direct proportion to each layer&apos;s thermal resistance (R-value).
          </li>
          <li>
            <strong>Vapor Pressure Gradient (P_v(x)):</strong> Governed by Fick&apos;s law of diffusion, partial vapor pressure drops across layers in proportion to each material&apos;s vapor resistance (the reciprocal of its permeance rating, Z = 1/M).
          </li>
        </ol>
        <p style={{ lineHeight: 1.7 }}>
          When the local partial vapor pressure (P_v) within a wall assembly equals or exceeds the saturated vapor pressure (P_ws) corresponding to the local material temperature, water vapor transforms into liquid condensate. This phenomenon—<strong>interstitial condensation</strong>—is the primary cause of concealed structural rot, fungal mold propagation, and insulation degradation in modern buildings.
        </p>
      </section>

      {/* Section 2: Mathematical Foundations */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. Mathematical Formulations: Conduction, Diffusion &amp; Glaser Method
        </h2>

        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginBottom: "1.5rem" }}>
          <FormulaCard
            title="ASHRAE Hyland-Wexler Saturation Pressure"
            formula="ln(p_{ws}) = \frac{C_8}{T} + C_9 + C_{10}T + C_{11}T^2 + C_{12}T^3 + C_{13}\ln(T)"
            sourceStandard="ASHRAE Handbook of Fundamentals 2021 (Ch. 1, Eq. 5)"
            variables={[
              { symbol: "p_{ws}", label: "Saturation Vapor Pressure", description: "Vapor pressure of pure water over flat liquid surface", unit: "psia" },
              { symbol: "T", label: "Absolute Temperature", description: "Thermodynamic dry-bulb temperature", unit: "°R (°F + 459.67)" },
              { symbol: "C_8..C_{13}", label: "Thermodynamic Coefficients", description: "Empirical Hyland-Wexler constants over liquid water", unit: "dimensionless" },
            ]}
            notes="Standard thermodynamic formulation for moist air calculations from -20°F to 140°F."
          />
          <FormulaCard
            title="Steady-State Interface Temperature Gradient"
            formula="T_i = T_{\text{inside}} - (T_{\text{inside}} - T_{\text{outside}}) \times \frac{\sum_{j=1}^i R_j}{R_{\text{total}}}"
            sourceStandard="ASHRAE Handbook of Fundamentals 2021 (Ch. 26 & 27)"
            variables={[
              { symbol: "T_i", label: "Interface Temperature", description: "Temperature at the boundary between material layers i and i+1", unit: "°F" },
              { symbol: "R_j", label: "Layer Thermal Resistance", description: "Thermal resistance of each individual material layer", unit: "hr·ft²·°F/Btu" },
              { symbol: "R_{\text{total}}", label: "Total Assembly R-Value", description: "Series sum of all material layer and air film R-values", unit: "hr·ft²·°F/Btu" },
            ]}
            notes="Governed by Fourier's law of steady-state 1D conductive heat transfer."
          />
          <FormulaCard
            title="Fickian Vapor Pressure Diffusion Gradient"
            formula="P_{v,i} = P_{v,\text{in}} - (P_{v,\text{in}} - P_{v,\text{out}}) \times \frac{\sum_{j=1}^i (1 / M_j)}{\sum_{j=1}^n (1 / M_j)}"
            sourceStandard="ASHRAE Fundamentals Ch. 26 (Eq. 2 & 3)"
            variables={[
              { symbol: "P_{v,i}", label: "Interface Vapor Pressure", description: "Partial water vapor pressure at interface i", unit: "in.Hg (or psia)" },
              { symbol: "M_j", label: "Water Vapor Permeance", description: "Perm rating of individual layer tested per ASTM E96", unit: "US Perms (grain/hr·ft²·in.Hg)" },
              { symbol: "1/M_j", label: "Vapor Resistance (Rep)", description: "Resistance to vapor transmission through layer j", unit: "Rep (hr·ft²·in.Hg/grain)" },
            ]}
            notes="Allocates vapor pressure drop across cumulative vapor flow resistance."
          />
          <FormulaCard
            title="Glaser Interstitial Condensation Mass Flux"
            formula="g_c = \frac{P_{v,\text{in}} - P_{ws,i}}{Z_{\text{in} \to i}} - \frac{P_{ws,i} - P_{v,\text{out}}}{Z_{i \to \text{out}}}"
            sourceStandard="EN ISO 13788 & ASHRAE Fundamentals Ch. 26"
            variables={[
              { symbol: "g_c", label: "Condensation Mass Flux", description: "Rate of liquid water condensation accumulating at condensing interface i", unit: "grains / (hr·ft²)" },
              { symbol: "P_{ws,i}", label: "Saturation Vapor Pressure at Plane", description: "Saturated vapor pressure at interface temperature T_i", unit: "in.Hg" },
              { symbol: "Z", label: "Cumulative Vapor Resistance", description: "Vapor resistance from interior/exterior boundary to condensation plane", unit: "Rep" },
            ]}
            notes="Condensation accumulates when vapor inward flux exceeds outward drying potential."
          />
        </div>
      </section>

      {/* Section 3: Diagnostic Assembly Comparison Matrix */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. Hydrothermal Case Study: Cold Climate (Zone 5/6) Winter Performance
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          To demonstrate the real-world application of the Glaser Dew Point Method, the table below compares two standard residential exterior wall assemblies subjected to winter design conditions (Indoor: 70°F @ 40% RH, $P_v = 0.295$ in.Hg, Dew Point = 44.6°F; Outdoor: 10°F @ 80% RH, $P_v = 0.051$ in.Hg, Dew Point = 5.2°F).
        </p>

        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-hover, rgba(255,255,255,0.04))", textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Assembly Configuration</th>
                <th style={{ padding: "0.75rem 1rem" }}>Total Assembly R-Value</th>
                <th style={{ padding: "0.75rem 1rem" }}>Critical Plane</th>
                <th style={{ padding: "0.75rem 1rem" }}>Critical Plane Temp ($T$)</th>
                <th style={{ padding: "0.75rem 1rem" }}>Local RH at Interface</th>
                <th style={{ padding: "0.75rem 1rem" }}>Condensation Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                  Standard 2x6 + R-20 Batt + Kraft (Class II) + OSB
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>R-{coldCavityResult.totalRValue}</td>
                <td style={{ padding: "0.75rem 1rem" }}>Interior face of OSB</td>
                <td style={{ padding: "0.75rem 1rem", color: "#f87171" }}>
                  {coldCavityResult.profile.find((p) => p.interfaceName.includes("OSB"))?.temperatureF}°F
                </td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#f87171" }}>
                  {coldCavityResult.maxRelativeHumidityPercent}%
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span style={{ padding: "0.2rem 0.5rem", borderRadius: "0.25rem", background: "rgba(239, 68, 68, 0.15)", color: "#f87171", fontSize: "0.78rem", fontWeight: 700 }}>
                    {coldCavityResult.hasInterstitialCondensation ? "Liquid Condensation" : "Severe Moisture Risk"}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                  High-Perf 2x6 + R-20 Batt + R-7.5 Continuous ci (Polyiso)
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>R-{highPerfResult.totalRValue}</td>
                <td style={{ padding: "0.75rem 1rem" }}>Interior face of OSB</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34d399", fontWeight: 700 }}>
                  {highPerfResult.profile.find((p) => p.interfaceName.includes("OSB"))?.temperatureF}°F
                </td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#34d399" }}>
                  {highPerfResult.maxRelativeHumidityPercent}%
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span style={{ padding: "0.2rem 0.5rem", borderRadius: "0.25rem", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "0.78rem", fontWeight: 700 }}>
                    100% Safe (No Condensation)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          <strong>Key Engineering Takeaway:</strong> Adding R-7.5 continuous exterior insulation (ci) shifts the thermal gradient outward, elevating the condensing plane (OSB structural sheathing) from an unsafe 13.9°F to a protected 27.8°F. This warms the sheathing safely above the indoor dew point, eliminating winter interstitial condensation risk without requiring an interior polyethylene vapor barrier.
        </p>
      </section>

      {/* Section 4: Vapor Retarder Classes & Code Compliance */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. Vapor Retarder Classifications per IRC Table R702.7.1 &amp; ASHRAE 90.1
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Building codes classify vapor control materials strictly based on their water vapor permeance tested via ASTM E96 (Procedure A - Desiccant Method):
        </p>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: "1.5rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f87171", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class I Vapor Impermeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>&le; 0.1 Perm</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Sheet polyethylene (6-mil poly), unperforated foil, sheet metal. Strictly required in severe arctic zones (Zone 7/8), but creates severe inward condensation traps in cooling-dominated climates.
            </p>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class II Vapor Semi-Impermeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>0.1 &lt; Perm &le; 1.0</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Kraft paper facing on fiberglass batts, smart polyamide vapor membranes (variable perm), bituminized paper. The standard baseline for mixed and cold climate wood framing.
            </p>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class III Vapor Semi-Permeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>1.0 &lt; Perm &le; 10.0</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Latex paint over 1/2&quot; drywall, fiberboard, plywood. Permitted by IRC R702.7.2 when continuous exterior insulation (ci) or ventilated claddings provide required thermal mitigation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Reverse Summer Condensation Physics */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Failure Mode Analysis: Inward Solar Vapor Drive in Hot-Humid Climates
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          A catastrophic failure occurs when cold-climate building practices (such as installing interior 6-mil poly or impermeable vinyl wallpaper) are applied in <strong>IECC Climate Zones 1, 2, and 3</strong>.
        </p>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          During summer cooling operation:
        </p>
        <ul style={{ lineHeight: 1.7, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Solar Vapor Drive:</strong> Rain saturates reservoir claddings (brick veneer, stucco, fiber cement). Subsequent intense solar radiation heats the wet reservoir to 120°F–140°F, driving partial vapor pressures behind the cladding to extraordinary levels (P_v &gt; 1.5 to 2.0 in.Hg).
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Inward Migration:</strong> Vapor rapidly diffuses inward across the cavity insulation toward the chilled interior space conditioned to 72°F (P_ws = 0.791 in.Hg).
          </li>
          <li>
            <strong>Condensation Behind Interior Poly/Wallpaper:</strong> If the interior wall surface contains an impermeable Class I vapor retarder, moisture cannot dry to the indoors. Liquid water condenses copiously directly behind the drywall/polyethylene boundary, causing rapid toxic mold outbreak (<em>Stachybotrys chartarum</em>) within 48 to 72 hours.
          </li>
        </ul>
        <p style={{ lineHeight: 1.7 }}>
          <strong>Design Rule:</strong> In cooling-dominated and mixed climates, interior vapor barriers (Class I) are strictly prohibited. Walls must be designed with <em>inward drying potential</em> by utilizing Class III interior finishes and exterior ventilated rainscreens.
        </p>
      </section>

      {/* Section 6: Related Internal Knowledge Graph Links */}
      <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          Related Engineering Calculators &amp; Research Datasets
        </h3>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          <Link
            href="/calculators/psychrometric-calculator"
            style={{
              padding: "1rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.25rem" }}>
              Psychrometric Solver →
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
              Full ASHRAE Hyland-Wexler state points: dry bulb, wet bulb, dew point, enthalpy, and humidity ratio.
            </div>
          </Link>

          <Link
            href="/calculators/effective-r-value-calculator"
            style={{
              padding: "1rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.25rem" }}>
              Effective R-Value Tool →
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
              ASHRAE 90.1 Appendix A framing derating and parallel-path thermal bridging calculator.
            </div>
          </Link>

          <Link
            href="/calculators/heat-loss-calculator"
            style={{
              padding: "1rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.25rem" }}>
              Building Heat Loss Sizer →
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
              Direct whole-building conductive transmission and infiltration heat loss engine.
            </div>
          </Link>

          <Link
            href="/datasets/ashrae-hyland-wexler-psychrometric-benchmark"
            style={{
              padding: "1rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.25rem" }}>
              Psychrometric Benchmark Dataset →
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
              420 verified thermodynamic state points across sea level and high altitudes.
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
