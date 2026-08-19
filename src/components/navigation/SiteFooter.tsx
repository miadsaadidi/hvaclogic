import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer" style={{
      borderTop: "1px solid var(--border-color)",
      background: "var(--bg-secondary)",
      padding: "3.5rem 0 2.5rem",
      marginTop: "auto",
    }}>
      <div className="site-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}>
          {/* BRAND COLUMN */}
          <div>
            <div style={{ marginBottom: "0.85rem" }}>
              <Logo size="md" showTagline={true} />
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Engineering-grade calculators, diagnostic tools, and technical references for HVAC design engineers, mechanical contractors, and building scientists.
            </p>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Standards: ASHRAE • ACCA • SMACNA • EPA
            </div>
          </div>

          {/* PILLAR 1 & 2 */}
          <div>
            <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              Airflow &amp; Cooling
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/ductulator">Digital Ductulator</Link></li>
              <li><Link href="/calculators/flex-duct-cfm-chart">Flex Duct CFM Chart</Link></li>
              <li><Link href="/calculators/cfm-calculator">HVAC CFM Sizer</Link></li>
              <li><Link href="/calculators/btu-calculator">BTU Load Master</Link></li>
              <li><Link href="/calculators/ac-tonnage-calculator">AC Tonnage Calculator</Link></li>
              <li><Link href="/calculators/ac-model-decoder">AC Model Decoder</Link></li>
              <li><Link href="/calculators/mini-split-sizing">Mini-Split Multi-Zone</Link></li>
            </ul>
          </div>

          {/* PILLAR 3 & 4 */}
          <div>
            <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              Diagnostics &amp; Heating
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/superheat-subcooling-calculator">Superheat &amp; Subcooling</Link></li>
              <li><Link href="/calculators/pt-chart">Digital PT Chart</Link></li>
              <li><Link href="/calculators/psychrometric-calculator">Psychrometric Calculator</Link></li>
              <li><Link href="/calculators/heat-pump-size-calculator">Heat Pump Sizer</Link></li>
              <li><Link href="/calculators/furnace-size-calculator">Furnace AFUE Sizer</Link></li>
              <li><Link href="/calculators/boiler-size-calculator">Boiler &amp; EDR Sizer</Link></li>
            </ul>
          </div>

          {/* BUILDING SCIENCE & VENTILATION */}
          <div>
            <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              Building Science
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/r-value-calculator">Insulation R-Value</Link></li>
              <li><Link href="/calculators/heat-loss-calculator">Heat Loss Calculator</Link></li>
              <li><Link href="/calculators/garage-heater-sizing">Garage Heater Sizer</Link></li>
              <li><Link href="/calculators/kitchen-hood-cfm">Kitchen Hood CFM</Link></li>
            </ul>
          </div>

          {/* STANDARDS & AUTHORITY */}
          <div>
            <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent-cooling)", marginBottom: "0.75rem" }}>
              Standards &amp; Trust
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li><Link href="/methodology" style={{ fontWeight: 600 }}>📐 Calculation Methodology</Link></li>
              <li><Link href="/sources" style={{ fontWeight: 600 }}>🏛️ Laboratory Sources &amp; Codes</Link></li>
              <li><Link href="/about" style={{ fontWeight: 600 }}>ℹ️ About HVACLogic</Link></li>
              <li><Link href="/privacy" style={{ fontWeight: 600 }}>🔒 Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DISCLAIMER */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}>
          <div>
            © {new Date().getFullYear()} HVAC Logic (hvaclogic.org). Open-access engineering calculators.
          </div>
          <div style={{ maxWidth: "600px", textAlign: "right" }}>
            Disclaimer: Calculations are provided for engineering screening and estimating purposes. Consult governing local building codes (IRC, IBC, IMC, IECC) and licensed mechanical engineers for permitted construction designs.
          </div>
        </div>
      </div>
    </footer>
  );
}
