"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/brand/Logo";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { UnitConverterModal } from "@/components/calculator/UnitConverterModal";
import { GlossaryModal } from "@/components/calculator/GlossaryModal";

export function SiteHeader() {
  const { isMetric, toggleUnitSystem } = useUnitSystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="site-header"
      style={{
        borderBottom: "1px solid var(--border-color)",
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="site-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "1rem",
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Logo size="md" showTagline={false} />
        </Link>

        {/* CONTROLS CLUSTER */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
          {/* SEARCH COMMAND PALETTE */}
          <CommandPalette />

          {/* GUIDES HUB LINK */}
          <Link
            href="/guides"
            className="action-btn header-extra-util"
            style={{
              height: "36px",
              padding: "0 0.65rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--ink)",
              alignItems: "center",
              gap: "0.3rem",
            }}
            title="Browse all 8 HVAC engineering guides"
          >
            <span>📚</span>
            <span>Guides</span>
          </Link>

          {/* UNIT CONVERTER POPUP (Desktop & Tablet) */}
          <div className="header-extra-util">
            <UnitConverterModal />
          </div>

          {/* FIELD GLOSSARY MODAL (Desktop & Tablet) */}
          <div className="header-extra-util">
            <GlossaryModal />
          </div>

          {/* UNIT SYSTEM TOGGLE */}
          <button
            type="button"
            onClick={toggleUnitSystem}
            className="action-btn"
            style={{
              height: "36px",
              padding: "0 0.65rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: isMetric ? "rgba(0, 210, 255, 0.15)" : "var(--surface)",
              color: isMetric ? "var(--accent-cooling)" : "var(--ink)",
              borderColor: isMetric ? "var(--accent-cooling)" : "var(--border-color)",
            }}
            title="Toggle between Imperial (IP) and Metric (SI) engineering units"
          >
            {isMetric ? "🌐 Metric" : "📐 Imperial"}
          </button>

          {/* THEME TOGGLE */}
          <ThemeToggle />

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="action-btn"
            style={{ height: "36px", padding: "0 0.65rem", display: "inline-flex" }}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>
      </div>

      <style jsx>{`
        .header-extra-util {
          display: none;
        }
        @media (min-width: 640px) {
          .header-extra-util {
            display: inline-flex;
          }
        }
      `}</style>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: "1.25rem",
            background: "var(--surface)",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          {/* Mobile Quick Utilities */}
          <div style={{ display: "flex", gap: "0.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <UnitConverterModal />
            <GlossaryModal />
          </div>

          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 700, color: "var(--accent-cooling)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>📚</span> Master Engineering Guides
          </Link>
          <Link
            href="/airflow-ducts"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>🌀</span> Airflow &amp; Duct Sizing
          </Link>
          <Link
            href="/cooling-loads"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>❄️</span> Cooling &amp; Load Sizing
          </Link>
          <Link
            href="/field-diagnostics"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>🔧</span> Field Diagnostics &amp; PT Charts
          </Link>
          <Link
            href="/heating-systems"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>🔥</span> Heating &amp; Heat Pump Systems
          </Link>
          <Link
            href="/building-science"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>🏢</span> Building Science &amp; Insulation
          </Link>
        </div>
      )}
    </header>
  );
}
