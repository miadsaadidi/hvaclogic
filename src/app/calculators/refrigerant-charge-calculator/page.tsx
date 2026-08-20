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
      directAnswer="A line-set refrigerant charge adjustment is an initial weighed-in amount calculated with the selected equipment manufacturer's exact line-size rate and factory allowance. It is not a universal refrigerant rule: formulas, rates, approved lengths, and final verification procedures vary by model family. Select a sourced OEM profile or enter values from the applicable installation manual, then complete the manufacturer's final charging procedure."
      formulaSnippet="Excess-length method: adjustment = max(0, actual length - factory allowance) × OEM rate. Inventory-delta method: adjustment = (OEM rate × actual length) - factory line inventory."
      authorityCitation="Selected manufacturer installation data; profile sources and revisions are shown with each result"
      toolComponent={<RefrigerantChargeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />
          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="OEM Initial Line-Set Weigh-In Methods"
              formula="Excess length: Δm = max(0, L_actual - L_factory) × r_oem | Inventory delta: Δm = (L_actual × r_oem) - m_factory-line | Initial target = nameplate charge + Δm"
              variables={[
                { symbol: "Δm", label: "Charge adjustment", description: "Refrigerant mass added to or recovered from the factory charge before final commissioning", unit: "oz" },
                { symbol: "L_actual", label: "Actual linear length", description: "Measured tubing length used by the selected OEM charging table", unit: "ft" },
                { symbol: "L_factory", label: "Factory allowance", description: "Line length already represented in the factory charge", unit: "ft" },
                { symbol: "r_oem", label: "OEM line-size rate", description: "Mass-per-length value for the exact line-size combination in the applicable manufacturer document", unit: "oz/ft" },
                { symbol: "m_factory-line", label: "Factory line inventory", description: "Factory-provided line-set refrigerant mass deducted by OEM inventory-delta formulas", unit: "oz" },
              ]}
              notes="Use linear tubing length for the charging equation. Equivalent length, capacity-specific diameter limits, lift, accessories, and oil-management requirements must still be checked in the selected equipment literature."
              sourceStandard="Manufacturer-specific installation and long-line application data"
            />
          </div>
          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, color: "var(--ink-secondary)" }}>
            <h3 style={{ color: "var(--ink)", fontSize: "1.1rem" }}>Why the calculator is profile-driven</h3>
            <p>
              Refrigerant type alone does not determine a line-set adder. The outdoor-unit family, liquid and suction diameters,
              factory allowance, permitted piping geometry, and the manufacturer's chosen equation all affect the initial weigh-in.
              HVACLogic therefore keeps each verified profile tied to a named document, revision, table, and model-family scope.
            </p>
            <p>
              R-454B and R-32 profiles also carry an A2L handling notice. The notice does not calculate room charge limits or replace
              model-specific installation, leak-detection, ventilation, recovery, evacuation, and commissioning instructions.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Verified profile</th>
                <th scope="col">Method</th>
                <th scope="col">Factory allowance</th>
                <th scope="col">Available rates</th>
                <th scope="col">Validated linear range</th>
              </tr>
            </thead>
            <tbody>
              {REFRIGERANT_CHARGE_PROFILES.map((profile) => (
                <tr key={profile.id}>
                  <td><strong>{profile.manufacturer} · {profile.refrigerant}</strong><br />{profile.modelFamily}</td>
                  <td>{profile.calculationMethod.kind === "inventory_delta" ? "Inventory delta" : "Excess length"}</td>
                  <td>{profile.factoryAllowanceFt} ft</td>
                  <td>{profile.linePairs.map((pair) => `${pair.adderRateOzPerFt} oz/ft`).join(", ")}</td>
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
            <strong>Scenario:</strong> An R-454B ICP/Carrier-family R5A5S installation uses a 5/16-inch liquid line and has
            45 ft of actual linear tubing. The cited profile specifies 0.40 oz/ft and deducts 9 oz of factory line inventory.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Calculate tubing inventory: 45 ft × 0.40 oz/ft = <strong>18 oz</strong>.</li>
              <li>Deduct the profile's factory line inventory: 18 oz - 9 oz = <strong>9 oz to add</strong>.</li>
              <li>If the unit nameplate charge is 100 oz, the initial target is 100 oz + 9 oz = <strong>109 oz</strong>.</li>
              <li>Check capacity-specific piping, equivalent-length, lift, and accessory requirements in the cited document.</li>
              <li>Complete the manufacturer's prescribed final charging procedure under its stated operating conditions.</li>
            </ol>
          </div>
          <p><strong>Safety:</strong> This is an A2L system. Qualified personnel must use equipment and procedures listed for the refrigerant and installation.</p>
        </div>
      }
    />
  );
}
