# HVAC Logic — Engineering Calculators & Building Science Suite

> **Canonical Production URL**: `https://hvaclogic.org`  
> **Platform Overview**: An engineering-grade suite of 17 specialized HVAC, refrigeration, airflow, and building science calculators built with Next.js 15, React 19, TypeScript, Vanilla CSS design tokens, and a crawler-safe PWA engine.

---

## 📚 Complete Project Documentation Suite (12 Canonical Documents)

All system documentation, keyword research, engineering formulas, architectural specs, and SEO strategies are indexed in the [`/docs`](./docs/README.md) directory:

| Document | Description | Relative Link |
| :--- | :--- | :--- |
| **01. Master Keyword Research** | 2,712 keyword dataset analysis, monthly search volumes, paid competition vs SEO difficulty, and search intent taxonomy. | [01-keyword-research-master.md](./docs/01-keyword-research-master.md) |
| **02. Website Architecture & Routing** | 5 flat category pillar hubs (`/airflow-ducts`, `/cooling-loads`, etc.), canonical defense on URL params, and Schema.org templates. | [02-website-architecture-routing.md](./docs/02-website-architecture-routing.md) |
| **03. Master Calculator Specifications** | Authoritative 22-field specification contract for all 17 calculators across all 3 launch phases. | [03-calculators-and-features-list.md](./docs/03-calculators-and-features-list.md) |
| **04. Engineering Formulas & Algorithms** | Universal numeric policy, Huebscher duct equations, NIST-referenced refrigerant PT interpolation, and ASHRAE psychrometric engine. | [04-engineering-formulas-and-algorithms.md](./docs/04-engineering-formulas-and-algorithms.md) |
| **05. Competitor Analysis & 10/10 Specs** | Timestamped SERP competitor evidence (CalcPanel, Ensign, Trane, ServiceTitan) and 10/10 product value propositions. | [05-competitive-analysis-and-calculator-specs.md](./docs/05-competitive-analysis-and-calculator-specs.md) |
| **06. PowerLab-Inspired Architecture** | Next.js 15 App Router architecture, 10-tier page anatomy, `DirectAnswerCard`, `calculator-registry.ts`, and thermal design system. | [06-powerlab-inspired-system-specs.md](./docs/06-powerlab-inspired-system-specs.md) |
| **07. Master SEO & Organic Strategy** | 6-pillar SEO & organic growth blueprint, topical authority flow, rich schema graphs, and viral embed strategy. | [07-master-seo-strategy.md](./docs/07-master-seo-strategy.md) |
| **08. Engineering Source Register** | Authoritative register of all external citations (ASHRAE, ACCA, SMACNA, EPA, AHRI, IRC, NIST) with verification status tags. | [08-engineering-source-register.md](./docs/08-engineering-source-register.md) |
| **09. Quality & Validation Test Matrix** | 6-layer QA framework, Golden Reference benchmarks, boundary limits, invalid state rejection, and cross-tool integration tests. | [09-validation-and-test-matrix.md](./docs/09-validation-and-test-matrix.md) |
| **10. Phased Implementation Roadmap** | 3-phase launch roadmap, engineering risk classifications (Low, Medium, High), and release gate tracking matrix. | [10-implementation-roadmap.md](./docs/10-implementation-roadmap.md) |
| **11. Analytics & KPI Plan** | Privacy-preserving telemetry event dictionary, zero-PII policies, and 4-tier KPI framework (SEO, Product, Authority, Commercial). | [11-analytics-and-kpi-plan.md](./docs/11-analytics-and-kpi-plan.md) |
| **12. Quality, Safety & Accessibility** | Diagnostic decision-support guardrails, A2L/combustion safety notices, and WCAG 2.2 AA accessibility standards. | [12-quality-safety-accessibility.md](./docs/12-quality-safety-accessibility.md) |

---

## 🧭 The 5 Pillar Hubs & 17 Calculators

```
HVAC Lab (https://hvaclab.org)
├── 📂 Airflow & Duct Sizing (/airflow-ducts)
│   ├── 🔹 /calculators/ductulator (Digital Ductulator & Sizing Engine)
│   ├── 🔹 /calculators/flex-duct-cfm-chart (Dedicated Flex Duct CFM Chart)
│   ├── 🔹 /calculators/cfm-calculator (HVAC Airflow, Sensible Heat & ACH Sizer)
│   └── 🔹 /calculators/kitchen-hood-cfm (Kitchen Range Hood & Make-Up Air Sizer)
│
├── 📂 Cooling & Load Sizing (/cooling-loads)
│   ├── 🔹 /calculators/btu-calculator (Whole-Home & Room BTU Load Master)
│   ├── 🔹 /calculators/ac-tonnage-calculator (AC Sizer & Room Capacity Tool)
│   ├── 🔹 /calculators/ac-model-decoder (HVAC Model Number Tonnage Decoder)
│   └── 🔹 /calculators/mini-split-sizing (Multi-Zone Ductless Sizer & Inverter Matcher)
│
├── 📂 Field Diagnostics & Refrigeration (/field-diagnostics)
│   ├── 🔹 /calculators/superheat-subcooling-calculator (Target Superheat & Subcooling Diagnostic)
│   ├── 🔹 /calculators/pt-chart (Digital Refrigerant PT Chart: R-454B, R-32, R-410A, R-22)
│   └── 🔹 /calculators/psychrometric-calculator (Interactive Psychrometric Chart & Moist Air Properties)
│
├── 📂 Heating Systems & Electrification (/heating-systems)
│   ├── 🔹 /calculators/heat-pump-size-calculator (Heat Pump Sizing, Balance Point & Cold-Climate COP)
│   ├── 🔹 /calculators/furnace-size-calculator (Gas/Electric Furnace Output & AFUE Efficiency Sizer)
│   ├── 🔹 /calculators/boiler-size-calculator (Hydronic Boiler, Baseboard & Radiator EDR Sizer)
│   └── 🔹 /calculators/garage-heater-sizing (Shop & Garage Unit Heater Sizer)
│
└── 📂 Building Science & Insulation (/building-science)
    ├── 🔹 /calculators/r-value-calculator (Insulation R-Value, U-Factor & Code Sizer)
    └── 🔹 /calculators/heat-loss-calculator (Whole-Building Conductive & Infiltration Loss)
```
