import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import {
  evaluateAssemblyCondensation,
  STANDARD_WALL_ASSEMBLIES,
  EnvironmentalConditions,
} from "@/lib/math/envelope-condensation";

export const metadata: Metadata = {
  title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Guide",
  description:
    "Technical reference connecting moist air psychrometrics, vapor pressure diffusion gradients, 1-D thermal transmission, Glaser method condensation planes, and building assembly vapor retarders.",
  keywords: [
    "psychrometrics",
    "building envelope",
    "vapor pressure",
    "vapor diffusion",
    "interstitial condensation",
    "Glaser method",
    "dew point",
    "vapor retarder",
    "hydrothermal modeling",
    "thermal bridging",
    "building science",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/psychrometrics-building-envelope-physics`,
  },
  openGraph: {
    title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Guide",
    description:
      "Technical reference connecting moist air psychrometrics, vapor pressure diffusion gradients, 1-D thermal transmission, Glaser method condensation planes, and building assembly vapor retarders.",
    url: `${siteConfig.canonicalDomain}/guides/psychrometrics-building-envelope-physics`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psychrometrics & Building Envelope Physics: Condensation Dynamics Guide",
    description:
      "Technical reference on moist air psychrometrics, vapor diffusion resistance, Glaser condensation modeling, and building assembly vapor retarders.",
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
      "Technical reference connecting moist air psychrometric properties, vapor pressure diffusion resistance, 1-D thermal transmission, and simplified Glaser-method interstitial condensation modeling.",
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
      { "@type": "Thing", name: "Building Envelope Thermal Performance" },
      { "@type": "Thing", name: "Vapor Retarder Classifications (IRC / IBC)" },
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
            IRC Sec. R702.7
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Psychrometrics &amp; Building Envelope Physics: Condensation Dynamics &amp; Hydrothermal Gradients
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          A technical reference detailing how moist air thermodynamics, vapor pressure gradients, and multi-layer wall assembly thermal transmission interact in steady-state models of interstitial condensation and moisture control.
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
            Explore psychrometric state points and multi-layer assembly thermal calculations.
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
          1. The Thermodynamic Basis: Moist Air &amp; Building Enclosures
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Building envelope analysis applies <strong>moist air psychrometrics</strong> to multi-layered assemblies. While HVAC systems condition bulk indoor dry-bulb temperature and relative humidity, the enclosure separates distinct indoor and outdoor thermodynamic states.
        </p>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          In simplified 1-D modeling, assemblies experience two coupled gradients:
        </p>
        <ol style={{ lineHeight: 1.7, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Thermal Gradient:</strong> Modeled using steady-state conductive heat transfer principles, where temperature drops across material layers in proportion to each layer&apos;s thermal resistance (R-value).
          </li>
          <li>
            <strong>Vapor Pressure Gradient:</strong> Modeled using steady-state vapor-diffusion resistance principles, where partial vapor pressure drops across layers in proportion to each material&apos;s vapor resistance ($Z = 1/M$).
          </li>
        </ol>
        <p style={{ lineHeight: 1.7 }}>
          When the calculated local vapor pressure (P_v) at a material interface equals or exceeds the saturation vapor pressure (P_ws) corresponding to the interface temperature, the simplified steady-state model predicts condensation at that plane.
        </p>
      </section>

      {/* Section 2: Mathematical Foundations */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. Mathematical Formulations: Conduction, Diffusion &amp; Glaser Method
        </h2>

        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginBottom: "1.5rem" }}>
          <FormulaCard
            title="ASHRAE Hyland-Wexler Saturation Formulation"
            formula="\ln(p_{ws}) = \frac{C_8}{T} + C_9 + C_{10}T + C_{11}T^2 + C_{12}T^3 + C_{13}\ln(T)"
            sourceStandard="ASHRAE Handbook of Fundamentals (Psychrometric formulation over liquid water)"
            variables={[
              { symbol: "p_{ws}", label: "Saturation Vapor Pressure", description: "Saturation vapor pressure of pure water", unit: "psia" },
              { symbol: "T", label: "Absolute Temperature", description: "Thermodynamic dry-bulb temperature", unit: "°R (°F + 459.67)" },
              { symbol: "C_8..C_{13}", label: "Thermodynamic Coefficients", description: "Hyland-Wexler coefficients over liquid water", unit: "dimensionless" },
            ]}
            notes="Reference formulation for moist air psychrometric properties above 32°F (0°C); separate formulation coefficients apply over ice."
          />
          <FormulaCard
            title="1-D Steady-State Interface Temperature Model"
            formula="T_i = T_{\text{inside}} - (T_{\text{inside}} - T_{\text{outside}}) \times \frac{\sum_{j=1}^i R_j}{R_{\text{total}}}"
            sourceStandard="ASHRAE Handbook of Fundamentals (1-D series resistance model)"
            variables={[
              { symbol: "T_i", label: "Interface Temperature", description: "Calculated temperature at the boundary between layers i and i+1", unit: "°F" },
              { symbol: "R_j", label: "Layer Thermal Resistance", description: "1-D thermal resistance of individual layer", unit: "hr·ft²·°F/Btu" },
              { symbol: "R_{\text{total}}", label: "Total 1-D Assembly R-Value", description: "Series sum of material layer and air film resistances", unit: "hr·ft²·°F/Btu" },
            ]}
            notes="Assumes idealized 1-D series heat conduction without accounting for framing thermal bridges, fasteners, or 2D/3D bypasses."
          />
          <FormulaCard
            title="Steady-State Vapor-Diffusion Resistance Model"
            formula="P_{v,i} = P_{v,\text{in}} - (P_{v,\text{in}} - P_{v,\text{out}}) \times \frac{\sum_{j=1}^i (1 / M_j)}{\sum_{j=1}^n (1 / M_j)}"
            sourceStandard="ASHRAE Fundamentals Ch. 26 & EN ISO 13788 (Glaser diffusion model)"
            variables={[
              { symbol: "P_{v,i}", label: "Interface Vapor Pressure", description: "Modeled partial vapor pressure at interface i", unit: "in.Hg (or psia)" },
              { symbol: "M_j", label: "Water Vapor Permeance", description: "Perm rating of layer (e.g., tested per ASTM E96 standard methods)", unit: "US Perms (grain/hr·ft²·in.Hg)" },
              { symbol: "1/M_j", label: "Vapor Resistance (Rep)", description: "Resistance to vapor transmission through layer j", unit: "Rep (hr·ft²·in.Hg/grain)" },
            ]}
            notes="Distributes vapor pressure across layers based on diffusion resistance, assuming purely diffusion-driven vapor flow."
          />
          <FormulaCard
            title="Glaser Interstitial Condensation Mass Flux (Model Formulation)"
            formula="g_c = \frac{P_{v,\text{in}} - P_{ws,i}}{Z_{\text{in} \to i}} - \frac{P_{ws,i} - P_{v,\text{out}}}{Z_{i \to \text{out}}}"
            sourceStandard="EN ISO 13788 & ASHRAE Fundamentals Ch. 26 (Glaser method)"
            variables={[
              { symbol: "g_c", label: "Modeled Condensation Rate", description: "Theoretical condensation mass flux at condensing interface i", unit: "grains / (hr·ft²)" },
              { symbol: "P_{ws,i}", label: "Saturation Vapor Pressure at Plane", description: "Saturated vapor pressure at interface temperature T_i", unit: "in.Hg" },
              { symbol: "Z", label: "Cumulative Vapor Resistance", description: "Vapor resistance between boundary and condensing plane", unit: "Rep" },
            ]}
            notes="Idealized steady-state calculation; does not account for transient weather, moisture storage (sorption), capillary suction, or air leakage."
          />
        </div>

        {/* Methodology & Limitations Callout */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
            Methodology &amp; Model Limitations (Glaser Method)
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
            The Glaser calculation presented here is a simplified, steady-state, one-dimensional vapor-diffusion model. Key limitations include:
          </p>
          <ul style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginTop: "0.5rem", paddingLeft: "1.25rem", marginBottom: 0 }}>
            <li>Assumes steady-state thermal and vapor boundary conditions rather than dynamic hourly climatic data.</li>
            <li>Models 1-D vapor diffusion only; does not model bulk air leakage (convective vapor transport), which is often the dominant moisture transport mechanism in field assemblies.</li>
            <li>Neglects hygrothermal sorption, liquid capillary suction, rain-water intrusion, and material moisture storage capacity.</li>
            <li>Does not model 2-D or 3-D thermal bridging at structural framing, fasteners, corners, and window interfaces.</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Hydrothermal Case Study */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. Hydrothermal Case Study: Cold Climate (Zone 5/6) Winter Steady-State Scenario
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          To illustrate how the 1-D Glaser method evaluates interface conditions, the table below compares two sample wall configurations under steady-state winter boundary conditions (Indoor: 70°F @ 40% RH, P_v,in ≈ 0.295 in.Hg; Outdoor: 10°F @ 80% RH, P_v,out ≈ 0.051 in.Hg):
        </p>

        <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-hover, rgba(255,255,255,0.04))", textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Assembly Configuration</th>
                <th style={{ padding: "0.75rem 1rem" }}>1-D Assembly R-Value</th>
                <th style={{ padding: "0.75rem 1rem" }}>Evaluated Plane</th>
                <th style={{ padding: "0.75rem 1rem" }}>Interface Temp ($T$)</th>
                <th style={{ padding: "0.75rem 1rem" }}>Model Local RH</th>
                <th style={{ padding: "0.75rem 1rem" }}>Model Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                  Standard 2x6 + R-20 Batt + Kraft (Class II) + OSB
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>~R-23.4</td>
                <td style={{ padding: "0.75rem 1rem" }}>OSB sheathing interface</td>
                <td style={{ padding: "0.75rem 1rem", color: "#f87171" }}>
                  ~14.4°F
                </td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#f87171" }}>
                  {coldCavityResult.maxRelativeHumidityPercent}%
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span style={{ padding: "0.2rem 0.5rem", borderRadius: "0.25rem", background: "rgba(239, 68, 68, 0.15)", color: "#f87171", fontSize: "0.78rem", fontWeight: 700 }}>
                    {coldCavityResult.hasInterstitialCondensation ? "Condensation Predicted" : "Elevated Moisture Index"}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                  Continuous ci 2x6 + R-20 Batt + R-7.5 Exterior Continuous (ci)
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>~R-30.9</td>
                <td style={{ padding: "0.75rem 1rem" }}>OSB sheathing interface</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34d399", fontWeight: 700 }}>
                  ~27.9°F
                </td>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#34d399" }}>
                  {highPerfResult.maxRelativeHumidityPercent}%
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span style={{ padding: "0.2rem 0.5rem", borderRadius: "0.25rem", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "0.78rem", fontWeight: 700 }}>
                    No Condensation Predicted (Under Model Assumptions)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          <strong>Analytical Takeaway:</strong> In the standard assembly, the cold sheathing temperature (~14.4°F) lowers the saturation vapor pressure (P_ws ≈ 0.082 in.Hg) below the local vapor pressure (P_v), predicting condensation. Adding R-7.5 continuous exterior insulation (ci) warms the OSB sheathing interface to approximately 27.9°F in this 1-D model, raising the local saturation vapor pressure (P_ws ≈ 0.151 in.Hg). Because local vapor pressure remains below saturation (P_v &lt; P_ws), the model predicts no condensation under these specific steady-state assumptions.
        </p>
      </section>

      {/* Section 4: Vapor Retarder Classes & Code References */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. Vapor Retarder Classifications (IRC Section R702.7 &amp; Building Standards)
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Model building codes (such as the International Residential Code, Section R702.7) categorize vapor retarder materials based on water vapor permeance tested in accordance with standard test methods (such as ASTM E96):
        </p>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: "1.5rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f87171", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class I Vapor Impermeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>&le; 0.1 Perm</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Sheet polyethylene (e.g., 6-mil poly), unperforated foil, sheet metal. Often referenced for severe heating climates; may limit inward drying in cooling-dominated environments.
            </p>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class II Vapor Semi-Impermeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>0.1 &lt; Perm &le; 1.0</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Kraft paper facing on fiberglass batts, smart polyamide variable-permeance membranes, bituminized paper. Frequently used in mixed and cold climate framing.
            </p>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              Class III Vapor Semi-Permeable
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>1.0 &lt; Perm &le; 10.0</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Latex paint over drywall, fiberboard, plywood. Permitted by IRC provisions under specific climate zones, continuous exterior insulation levels, or ventilated cladding conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Inward Vapor Drive Considerations */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Inward Solar Vapor Drive Considerations in Warm and Humid Climates
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          Moisture problems can occur when vapor-control and drying strategies are inappropriate for the climate and wall assembly. In warm, humid, or cooling-dominated climates:
        </p>
        <ul style={{ lineHeight: 1.7, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Solar Vapor Drive:</strong> Rain saturation of porous reservoir claddings (such as brick veneer, stucco, or fiber cement) followed by solar radiation can elevate the moisture vapor pressure behind the cladding.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Inward Migration:</strong> Vapor moves inward toward the air-conditioned interior space where lower vapor pressures exist.
          </li>
          <li>
            <strong>Interior Vapor Retarder Trapping:</strong> If an impermeable interior layer (such as sheet poly or impermeable vinyl wall covering) is present on the interior conditioned side, inward-driven vapor can accumulate on the cooled interior surface, elevating moisture content and contributing to mold risk over extended periods.
          </li>
        </ul>
        <p style={{ lineHeight: 1.7 }}>
          <strong>Design Consideration:</strong> Vapor-control strategies in cooling-dominated and mixed climates must account for climate, assembly configuration, moisture sources, drying potential, and applicable code requirements. Interior Class I vapor retarders can require special consideration where inward vapor drive or drying limitations are concerns.
        </p>
      </section>

      {/* Section 6: Related Internal Links */}
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
              Psychrometric state point calculations: dry bulb, wet bulb, dew point, enthalpy, and humidity ratio.
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
              Parallel-path thermal bridging and assembly R-value calculations.
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
              Simplified conductive transmission and infiltration heat loss calculations.
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
              Thermodynamic state points across sea level and high altitudes.
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
