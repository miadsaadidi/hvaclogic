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
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Standards: ASHRAE • ACCA • SMACNA • EPA
            </div>
            <a
              href="https://www.google.com/preferences/source?q=hvaclogic.org"
              target="_blank"
              rel="noopener noreferrer"
              className="google-pin-button"
              title="Pin HVACLogic on Google Preferences"
              aria-label="Pin HVACLogic to your Google Preferences (opens in a new tab)"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "0.5rem",
                fontSize: "0.78125rem",
                fontWeight: 600,
                color: "var(--ink)",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                textDecoration: "none",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Pin on Google</span>
              <span aria-hidden="true" style={{ fontSize: "0.8rem", marginLeft: "0.1rem" }}>📌</span>
            </a>
          </div>

          {/* PILLAR 1: AIRFLOW & DUCTS */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/airflow-ducts" style={{ color: "inherit", textDecoration: "none" }}>Airflow &amp; Ducts →</Link>
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/ductulator">Digital Ductulator</Link></li>
              <li><Link href="/calculators/flex-duct-cfm-chart">Flex Duct CFM Chart</Link></li>
              <li><Link href="/calculators/cfm-calculator">HVAC CFM Sizer</Link></li>
              <li><Link href="/calculators/duct-friction-loss-calculator">Duct Friction Loss (TEL)</Link></li>
              <li><Link href="/calculators/filter-sizing-calculator">MERV Filter Pressure Drop</Link></li>
              <li><Link href="/calculators/kitchen-hood-cfm">Kitchen Hood CFM Sizer</Link></li>
            </ul>
          </div>

          {/* PILLAR 2 & 3: COOLING & DIAGNOSTICS */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/cooling-loads" style={{ color: "inherit", textDecoration: "none" }}>Cooling</Link> &amp; <Link href="/field-diagnostics" style={{ color: "inherit", textDecoration: "none" }}>Diagnostics →</Link>
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/btu-calculator">BTU Load Master</Link></li>
              <li><Link href="/calculators/ac-tonnage-calculator">AC Tonnage Calculator</Link></li>
              <li><Link href="/calculators/ac-model-decoder">AC Model Decoder</Link></li>
              <li><Link href="/calculators/mini-split-sizing">Mini-Split Multi-Zone</Link></li>
              <li><Link href="/calculators/superheat-subcooling-calculator">Superheat &amp; Subcooling</Link></li>
              <li><Link href="/calculators/pt-chart">Digital PT Chart</Link></li>
              <li><Link href="/calculators/psychrometric-calculator">Psychrometric Calculator</Link></li>
              <li><Link href="/calculators/refrigerant-charge-calculator">Refrigerant Line Set Charge</Link></li>
            </ul>
          </div>

          {/* PILLAR 4 & 5: HEATING & BUILDING SCIENCE */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", marginBottom: "0.75rem" }}>
              <Link href="/heating-systems" style={{ color: "inherit", textDecoration: "none" }}>Heating</Link> &amp; <Link href="/building-science" style={{ color: "inherit", textDecoration: "none" }}>Building Science →</Link>
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.8125rem" }}>
              <li><Link href="/calculators/heat-pump-size-calculator">Heat Pump Sizer</Link></li>
              <li><Link href="/calculators/furnace-size-calculator">Furnace AFUE Sizer</Link></li>
              <li><Link href="/calculators/boiler-size-calculator">Boiler &amp; EDR Sizer</Link></li>
              <li><Link href="/calculators/garage-heater-sizing">Garage Heater Sizer</Link></li>
              <li><Link href="/calculators/combustion-air-calculator">Combustion Air Sizer</Link></li>
              <li><Link href="/calculators/r-value-calculator">Insulation R-Value</Link></li>
              <li><Link href="/calculators/heat-loss-calculator">Heat Loss Calculator</Link></li>
            </ul>
          </div>

          {/* STANDARDS & AUTHORITY */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent-cooling)", marginBottom: "0.75rem" }}>
              Standards &amp; Trust
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8125rem" }}>
              <li><Link href="/research" style={{ fontWeight: 600, color: "var(--accent-cooling)" }}>🎓 Research &amp; Whitepapers</Link></li>
              <li><Link href="/standards" style={{ fontWeight: 600 }}>📜 Standards &amp; Codes Matrix</Link></li>
              <li><Link href="/ashrae-climatic-data" style={{ fontWeight: 600 }}>📍 ASHRAE Climatic Design Data</Link></li>
              <li><Link href="/methodology" style={{ fontWeight: 600 }}>📐 Calculation Methodology</Link></li>
              <li><Link href="/sources" style={{ fontWeight: 600 }}>🏛️ Laboratory Sources &amp; Codes</Link></li>
              <li><Link href="/developers" style={{ fontWeight: 600 }}>🔌 API &amp; Embed Widgets</Link></li>
              <li><Link href="/about" style={{ fontWeight: 600 }}>ℹ️ About HVACLogic</Link></li>
              <li><Link href="/privacy" style={{ fontWeight: 600 }}>🔒 Privacy Policy</Link></li>
              <li>
                <a
                  href="https://www.google.com/preferences/source?q=hvaclogic.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)" }}
                  title="Pin HVACLogic to your Google preferences to see accurate calculations first"
                >
                  📌 Pin on Google
                </a>
              </li>
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
