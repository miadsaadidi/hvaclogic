import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const domain = siteConfig.canonicalDomain;

  const content = `# HVACLogic — Engineering-Grade HVAC & Building Science Calculators
> Verified deterministic thermodynamic formulas, air distribution physics, refrigerant cycle diagnostics, and heat transfer equations. Governed by ASHRAE, ACCA, SMACNA, and EPA engineering standards. 100% client-side, zero tracking, open-access.

- Canonical Website: ${domain}
- Full Mathematical Specifications: ${domain}/llms-full.txt
- Climatic Design Conditions: ${domain}/ashrae-climatic-data
- Calculation Methodology: ${domain}/methodology
- Peer-Reviewed Sources & Codes: ${domain}/sources
- Verified Monograph & DOI: https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826

## Engineering Pillars & Calculator Directory

${calculatorRegistry
  .map(
    (calc) => `### [${calc.name}](${domain}${calc.route})
- **Route**: \`${calc.route}\`
- **Pillar**: ${calc.categoryName} (\`${calc.pillar}\`)
- **Governing Standards**: ${calc.standards.join(", ")}
- **Description**: ${calc.metaDescription}
- **Primary Keywords**: ${[calc.primaryKeyword, ...calc.secondaryKeywords.slice(0, 3)].join(", ")}
- **Key Capabilities**:
${calc.features.map((f) => `  - ${f}`).join("\n")}
`
  )
  .join("\n")}

## Standard Engineering Constants & Reference Baseline
- Standard Air Density (\\rho_0): 0.075 lb/ft³ at 70°F (21.1°C), 14.696 psia (101.325 kPa)
- Sensible Heat Constant (C_p \\times \\rho \\times 60): 1.08 BTU/(hr·CFM·°F) at sea level
- Total Heat / Enthalpy Constant (\\rho \\times 60): 4.50 BTU/(hr·CFM·(BTU/lb))
- Latent Heat Constant: 0.68 BTU/(hr·CFM·gr/lb)
- Latent Heat of Vaporization (Water at 70°F): 1,061 BTU/lb
- Water Heat Capacity Rate: 500 BTU/(hr·GPM·°F) (for pure water at 8.33 lb/gal)
- Atmospheric Pressure vs Altitude (P_alt): P_0 \\times (1 - 6.8754 \\times 10^{-6} \\times h)^{5.2559} psia
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
