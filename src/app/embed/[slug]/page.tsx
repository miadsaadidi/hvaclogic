import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCalculatorById, calculatorRegistry } from "@/lib/data/calculators-registry";
import { siteConfig } from "@/lib/site-config";

// Tool Components
import { DuctulatorTool } from "@/components/calculator/tools/DuctulatorTool";
import { AcTonnageTool } from "@/components/calculator/tools/AcTonnageTool";
import { HeatLossTool } from "@/components/calculator/tools/HeatLossTool";
import { SuperheatSubcoolingTool } from "@/components/calculator/tools/SuperheatSubcoolingTool";
import { DuctFrictionTool } from "@/components/calculator/tools/DuctFrictionTool";
import { CfmCalculatorTool } from "@/components/calculator/tools/CfmCalculatorTool";
import { FlexDuctChartTool } from "@/components/calculator/tools/FlexDuctChartTool";
import { RefrigerantChargeTool } from "@/components/calculator/tools/RefrigerantChargeTool";
import { FurnaceBtuTool } from "@/components/calculator/tools/FurnaceBtuTool";
import { HeatPumpSizeTool } from "@/components/calculator/tools/HeatPumpSizeTool";
import { BoilerSizeTool } from "@/components/calculator/tools/BoilerSizeTool";
import { GarageHeaterTool } from "@/components/calculator/tools/GarageHeaterTool";
import { MiniSplitTool } from "@/components/calculator/tools/MiniSplitTool";
import { FilterSizingTool } from "@/components/calculator/tools/FilterSizingTool";
import { KitchenHoodTool } from "@/components/calculator/tools/KitchenHoodTool";
import { CombustionAirTool } from "@/components/calculator/tools/CombustionAirTool";
import { RValueTool } from "@/components/calculator/tools/RValueTool";
import { PsychrometricTool } from "@/components/calculator/tools/PsychrometricTool";
import { PtChartTool } from "@/components/calculator/tools/PtChartTool";
import { AcModelDecoderTool } from "@/components/calculator/tools/AcModelDecoderTool";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return calculatorRegistry.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorById(slug);

  if (!calculator) {
    return { title: "Embed Tool Not Found | HVACLogic" };
  }

  return {
    title: `${calculator.name} (Embed Widget) | HVACLogic`,
    description: `Embeddable responsive calculation widget for ${calculator.name}.`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${siteConfig.canonicalDomain}${calculator.route}`,
    },
  };
}

function renderToolComponent(id: string) {
  switch (id) {
    case "ductulator":
      return <DuctulatorTool />;
    case "ac-tonnage-calculator":
      return <AcTonnageTool />;
    case "heat-loss-calculator":
      return <HeatLossTool />;
    case "superheat-subcooling-calculator":
      return <SuperheatSubcoolingTool />;
    case "duct-friction-loss-calculator":
      return <DuctFrictionTool />;
    case "cfm-calculator":
      return <CfmCalculatorTool />;
    case "flex-duct-cfm-chart":
    case "flex-duct-sizing-calculator":
      return <FlexDuctChartTool />;
    case "refrigerant-charge-calculator":
      return <RefrigerantChargeTool />;
    case "furnace-btu-calculator":
      return <FurnaceBtuTool />;
    case "heat-pump-cost-calculator":
    case "heat-pump-sizing-calculator":
      return <HeatPumpSizeTool />;
    case "boiler-size-calculator":
      return <BoilerSizeTool />;
    case "garage-heater-calculator":
      return <GarageHeaterTool />;
    case "mini-split-sizing-calculator":
      return <MiniSplitTool />;
    case "filter-sizing-calculator":
      return <FilterSizingTool />;
    case "kitchen-hood-cfm-calculator":
      return <KitchenHoodTool />;
    case "combustion-air-calculator":
      return <CombustionAirTool />;
    case "r-value-calculator":
      return <RValueTool />;
    case "psychrometric-calculator":
      return <PsychrometricTool />;
    case "pt-chart-calculator":
      return <PtChartTool />;
    case "ac-model-decoder":
      return <AcModelDecoderTool />;
    default:
      return <DuctulatorTool />;
  }
}

export default async function EmbedCalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorById(slug);

  if (!calculator) {
    notFound();
  }

  const canonicalUrl = `${siteConfig.canonicalDomain}${calculator.route}`;

  return (
    <div
      style={{
        padding: "0.75rem",
        background: "var(--bg-primary)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-titillium, sans-serif)",
      }}
    >
      {/* Top Embed Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0.75rem",
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1rem" }}>⚡</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink)" }}>
            {calculator.name}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "0.15rem 0.45rem",
              borderRadius: "4px",
              background: "rgba(56, 189, 248, 0.1)",
              color: "var(--accent-cooling)",
            }}
          >
            {calculator.standards.join(" • ")}
          </span>
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            Full Version ↗
          </a>
        </div>
      </header>

      {/* Calculator Body */}
      <main style={{ flex: 1 }}>
        {renderToolComponent(calculator.id)}
      </main>

      {/* Attribution Flywheel Footer */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0.75rem",
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.5rem",
          marginTop: "0.75rem",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}
      >
        <span>
          Powered by{" "}
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent-cooling)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            HVACLogic Open Engineering Suite
          </a>
        </span>
        <span>🛡️ 100% Client-Side Physics • Zero Tracking</span>
      </footer>
    </div>
  );
}
