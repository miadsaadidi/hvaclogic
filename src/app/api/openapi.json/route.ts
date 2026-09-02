import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/data/calculators-registry";

export const dynamic = "force-static";

export async function GET() {
  const published = publishedCalculators();

  const openApiSpec = {
    openapi: "3.1.0",
    info: {
      title: "HVACLogic Building Science & Thermodynamic Calculation API",
      summary: "Deterministic HVAC, psychrometric, and building physics calculation specification for AI agents and engineering software.",
      description: "Official OpenAPI 3.1 specification for HVACLogic deterministic calculation algorithms. Governed by ACCA (Manual J/S/D), ASHRAE (Fundamentals, 62.1, 90.1), AHRI (210/240), and SMACNA standards. Zero server telemetry, 100% verifiable physics formulations.",
      version: "1.0.0",
      contact: {
        name: "HVACLogic Engineering Standards Committee",
        url: siteConfig.canonicalDomain,
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: siteConfig.canonicalDomain,
        description: "HVACLogic Production Edge Endpoint",
      },
    ],
    paths: Object.fromEntries(
      published.map((calc) => [
        `/calculators/${calc.id}`,
        {
          get: {
            summary: calc.name,
            description: calc.metaDescription,
            operationId: `calculate_${calc.id.replace(/-/g, "_")}`,
            externalDocs: {
              description: `Governing Engineering Standards (${calc.standards.join(", ")})`,
              url: `${siteConfig.canonicalDomain}${calc.route}`,
            },
            parameters: [
              {
                name: "unitSystem",
                in: "query",
                description: "Unit measurement system ('imperial' | 'metric')",
                required: false,
                schema: {
                  type: "string",
                  enum: ["imperial", "metric"],
                  default: "imperial",
                },
              },
            ],
            responses: {
              "200": {
                description: `Successful deterministic computation for ${calc.name}`,
                content: {
                  "text/html": {
                    schema: {
                      type: "string",
                      description: "Interactive browser and server-rendered HTML calculation interface",
                    },
                  },
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        calculatorId: { type: "string", example: calc.id },
                        formulaVersion: { type: "string", example: calc.formulaVersion },
                        standards: {
                          type: "array",
                          items: { type: "string" },
                          example: calc.standards,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ])
    ),
    components: {
      schemas: {
        CalculationError: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            error: { type: "string", example: "Invalid thermodynamic parameters" },
          },
          required: ["ok", "error"],
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
