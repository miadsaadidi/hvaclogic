import React from "react";
import type { Metadata } from "next";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { RefrigerantChargeTool } from "@/components/calculator/tools/RefrigerantChargeTool";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { REFRIGERANT_CHARGE_PROFILES } from "@/lib/data/refrigerant-charge-profiles";

const calculator = getCalculatorById("refrigerant-charge-calculator")!;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: { canonical: `https://hvaclogic.org${calculator.route}` },
  openGraph: {
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    url: `https://hvaclogic.org${calculator.route}`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: calculator.seoTitle,
    description: calculator.metaDescription,
  },
};

export default function RefrigerantChargeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="A line-set refrigerant charge adjustment is an initial weighed-in mass calculated strictly from the selected equipment manufacturer's line-size rate and factory allowance. It is an initial field installation adjustment rather than an equipment sizing calculation: formulas, mass-per-length rates, published linear limits, and final commissioning procedures vary by OEM model family. Select a sourced OEM profile or enter values directly from the applicable installation manual, then complete the manufacturer's final subcooling or superheat verification."
      formulaSnippet="Excess-length method: Δm = max(0, L_actual - L_factory) × r_oem. Inventory-delta method: Δm = (L_actual × r_oem) - m_factory-line. Initial Target Charge = Nameplate Base + Δm."
      authorityCitation="Selected manufacturer installation and long-line application data; exact source documents and table sections are displayed with each profile"
      toolComponent={<RefrigerantChargeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />
          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Charging Methodology & OEM Calculation Methods"
              formula="Excess length: Δm = max(0, L_actual - L_factory) × r_oem | Inventory delta: Δm = (L_actual × r_oem) - m_factory-line | Initial target = nameplate charge + Δm"
              variables={[
                { symbol: "Δm", label: "Charge adjustment", description: "Refrigerant mass added to or recovered from the factory charge before final commissioning", unit: "oz" },
                { symbol: "L_actual", label: "Actual linear length", description: "Measured linear tubing length used by the selected OEM charging table", unit: "ft" },
                { symbol: "L_factory", label: "Factory allowance", description: "Line-set length already accounted for in the factory nameplate charge (typically 15 ft)", unit: "ft" },
                { symbol: "r_oem", label: "OEM line-size rate", description: "Manufacturer mass-per-length adder rate for the specific liquid and suction line combination", unit: "oz/ft" },
                { symbol: "m_factory-line", label: "Factory line inventory", description: "Factory-credited line-set refrigerant mass deducted by OEM inventory-delta formulas", unit: "oz" },
              ]}
              notes="Use actual linear tubing length for the mass-adjustment equation. Equivalent length, capacity-specific line sizing, vertical lift limits, oil traps, and long-line accessories must be checked separately in the cited manufacturer literature."
              sourceStandard="Selected Manufacturer Installation and Long-Line Application Data"
            />
          </div>
          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, color: "var(--ink-secondary)" }}>
            <h3 style={{ color: "var(--ink)", fontSize: "1.1rem" }}>Step-by-Step OEM Weigh-In Workflow</h3>
            <ol style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
              <li><strong>Identify Equipment & Model Family:</strong> Determine the exact outdoor unit model number, nominal tonnage, and manufacturer.</li>
              <li><strong>Determine Line-Set Dimensions:</strong> Measure actual liquid and vapor/suction line outside diameters installed in the field.</li>
              <li><strong>Identify OEM Factory Allowance or Inventory:</strong> Check whether the OEM uses an excess-length baseline (e.g., 15 ft allowance) or an inventory-delta credit (e.g., 9 oz factory credit).</li>
              <li><strong>Select OEM Mass Rate:</strong> Obtain the exact mass-per-length adder rate (oz/ft or g/m) from the manufacturer's published charging table for that diameter pair.</li>
              <li><strong>Calculate Initial Weigh-In:</strong> Evaluate the initial mass adjustment (&Delta;m) and determine the initial target weigh-in charge.</li>
              <li><strong>Verify Piping & Elevation Limits:</strong> Verify total linear length, calculated equivalent length, vertical separation (lift), and required long-line accessories (crankcase heaters, hard-start kits, liquid-line solenoids).</li>
              <li><strong>Perform Final Verification:</strong> Evacuate to &le; 500 microns, weigh in the initial charge, stabilize operating conditions, and verify target subcooling or superheat per OEM specifications.</li>
            </ol>
            <p>
              R-454B and R-32 profiles also carry an A2L safety notice. The notice reminds technicians to use spark-proof service equipment and verify occupied-space charge limits (ASHRAE 15 / UL 60335-2-40), but does not replace manufacturer-specific commissioning instructions.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Verified OEM Profile</th>
                <th scope="col">Method</th>
                <th scope="col">Factory Allowance / Credit</th>
                <th scope="col">Line Combinations & Rates</th>
                <th scope="col">Published Installation Range</th>
              </tr>
            </thead>
            <tbody>
              {REFRIGERANT_CHARGE_PROFILES.map((profile) => (
                <tr key={profile.id}>
                  <td>
                    <strong>{profile.manufacturer} · {profile.refrigerant}</strong>
                    <br />
                    <span style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>{profile.modelFamily} ({profile.capacityRange})</span>
                  </td>
                  <td>{profile.calculationMethod.kind === "inventory_delta" ? "Inventory delta" : "Excess length"}</td>
                  <td>{profile.calculationMethod.kind === "inventory_delta" ? `${profile.calculationMethod.factoryLineInventoryOz} oz credit (${profile.factoryAllowanceFt} ft)` : `${profile.factoryAllowanceFt} ft allowance`}</td>
                  <td>{profile.linePairs.map((pair) => `${pair.liquidLineOd} @ ${pair.adderRateOzPerFt} oz/ft`).join(", ")}</td>
                  <td>{profile.minimumLinearLengthFt}–{profile.maximumLinearLengthFt} ft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> An R-454B single-stage split system (ICP / Carrier family R5A5S 2.5-ton unit) is installed with
            a 5/16-inch liquid line and 45 ft of actual linear tubing. The manufacturer specifications (Document R5A5S-01PD, Table 4) specify
            an adder rate of 0.40 oz/ft and credit 9 oz of factory line inventory in the base charge.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", margin: "1rem 0" }}>
            <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li><strong>Calculate Total Tubing Charge:</strong> 45 ft × 0.40 oz/ft = <strong>18.0 oz</strong>.</li>
              <li><strong>Deduct Factory Line Inventory Credit:</strong> 18.0 oz − 9.0 oz = <strong>+9.0 oz adjustment</strong>.</li>
              <li><strong>Determine Initial Target Weigh-In:</strong> Assuming an illustrative factory nameplate charge of 100.0 oz, the initial total weigh-in is 100.0 oz + 9.0 oz = <strong>109.0 oz (6 lb 13.0 oz)</strong>.</li>
              <li><strong>Verify Published Installation Limits:</strong> 45 ft is within the published 15–250 ft linear limit. Check equivalent length and vertical lift against R5A5S Tables 1–3.</li>
              <li><strong>Complete Manufacturer Final Commissioning:</strong> Evacuate to &le; 500 microns, weigh in 109.0 oz, operate system for 15 minutes, and verify subcooling against the OEM rating plate target.</li>
            </ol>
          </div>
          <p><strong>A2L Safety Note:</strong> R-454B is an A2L mildly flammable refrigerant. Field technicians must utilize recovery and evacuation tools listed for A2L service and verify space volume charge limits per ASHRAE Standard 15 / UL 60335-2-40.</p>
        </div>
      }
    />
  );
}
