"use client";

import React from "react";
import Link from "next/link";

interface TrendingTool {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: string;
  route: string;
  stat: string;
  tag: string;
}

const TRENDING_TOOLS: TrendingTool[] = [
  {
    id: "ductulator",
    title: "Digital Ductulator & Sizer",
    subtitle: "Equal friction sizing for round, rectangular & oval ductwork per ASHRAE & SMACNA.",
    badge: "Most Popular",
    badgeColor: "#3b82f6",
    icon: "🌀",
    route: "/calculators/ductulator",
    stat: "Colebrook-White",
    tag: "Airflow & Ducts",
  },
  {
    id: "pt-chart",
    title: "Refrigerant PT Chart (2026)",
    subtitle: "Pressure-temperature curves for low-GWP A2L (R-454B, R-32) & legacy refrigerants.",
    badge: "A2L Transition",
    badgeColor: "#10b981",
    icon: "🌡️",
    route: "/calculators/pt-chart",
    stat: "R-454B / R-32",
    tag: "Field Diagnostics",
  },
  {
    id: "flex-duct-cfm-chart",
    title: "Flex Duct CFM Sizing Chart",
    subtitle: "4\" to 20\" flexible duct CFM airflow capacities with 0% to 30% sag & compression derates.",
    badge: "Field Reference",
    badgeColor: "#f59e0b",
    icon: "📊",
    route: "/calculators/flex-duct-cfm-chart",
    stat: "4\" - 20\" Matrix",
    tag: "Airflow & Ducts",
  },
  {
    id: "combustion-air-calculator",
    title: "Combustion Air Sizer",
    subtitle: "Confined space indoor and outdoor combustion air sizing per NFPA 54 & IFGC Sec. 304.",
    badge: "Code Compliant",
    badgeColor: "#8b5cf6",
    icon: "🔥",
    route: "/calculators/combustion-air-calculator",
    stat: "NFPA 54 / IFGC",
    tag: "Heating Systems",
  },
  {
    id: "ac-model-decoder",
    title: "AC Model Number Decoder",
    subtitle: "Instant nominal tonnage, SEER2 rating, and CFM lookup for Carrier, Trane, Lennox & Daikin.",
    badge: "OEM Nameplate",
    badgeColor: "#06b6d4",
    icon: "🏷️",
    route: "/calculators/ac-model-decoder",
    stat: "7 Major Brands",
    tag: "Cooling & Loads",
  },
  {
    id: "heat-pump-size-calculator",
    title: "Heat Pump Balance Point",
    subtitle: "Thermal balance point, supplemental heat staging, and COP derating across sub-zero temps.",
    badge: "Decarbonization",
    badgeColor: "#ec4899",
    icon: "⚡",
    route: "/calculators/heat-pump-size-calculator",
    stat: "Balance Point",
    tag: "Heating Systems",
  },
];

export function TrendingToolsRibbon() {
  return (
    <section
      aria-labelledby="trending-tools-heading"
      style={{
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--accent, #3b82f6)",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>⚡</span>
          <span>High-Frequency Field Tools</span>
        </div>
        <h2
          id="trending-tools-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            margin: "0 0 0.4rem",
            letterSpacing: "-0.01em",
          }}
        >
          Top Engineering Calculators
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Instant 1-tap access to the most frequently cited HVAC sizing, airflow, and refrigerant diagnostic tools:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {TRENDING_TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.route}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
            }}
            className="trending-tool-card"
          >
            {/* Top Colored Accent Stripe */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: tool.badgeColor,
              }}
              aria-hidden="true"
            />

            {/* Header: Tag + Badge */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                }}
              >
                {tool.tag}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  backgroundColor: `${tool.badgeColor}18`,
                  color: tool.badgeColor,
                  border: `1px solid ${tool.badgeColor}33`,
                }}
              >
                {tool.badge}
              </span>
            </div>

            {/* Title with Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.4rem",
              }}
            >
              <span style={{ fontSize: "1.35rem" }} aria-hidden="true">
                {tool.icon}
              </span>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--foreground)",
                }}
              >
                {tool.title}
              </h3>
            </div>

            {/* Subtitle / Description */}
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "var(--text-muted)",
                margin: "0 0 1rem",
                flexGrow: 1,
              }}
            >
              {tool.subtitle}
            </p>

            {/* Bottom Footer: Stat Pill + Launch Link */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "0.75rem",
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  background: "var(--surface-raised)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {tool.stat}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--accent, #3b82f6)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                Launch Tool ➔
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
