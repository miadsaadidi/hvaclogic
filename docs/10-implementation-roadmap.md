# HVAC Lab — 5-Stage Implementation Roadmap & Execution Strategy

> **Document Status**: Approved & Enforced  
> **Version**: 1.1.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [08-engineering-source-register.md](./08-engineering-source-register.md), [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md), [03-calculators-and-features-list.md](./03-calculators-and-features-list.md), [07-master-seo-strategy.md](./07-master-seo-strategy.md)

---

## 1. 5-Stage Execution Architecture

To build HVAC Lab cleanly without wasted effort, regressions, or disconnected state management, development follows a strict **5-Stage Phased Rollout**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 0: Foundation & SEO Infrastructure                               │
│ • Unit Provider (Imp/Met) • LocalStorage Hooks • JSON-LD Schema Engine │
│ • 7-Section Layout Container • Centralized calculator-registry.ts      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: The Core 4 MVP Tools (P0 - Traffic & High CPC Anchors)        │
│ 1. Ductulator  2. BTU Load  3. AC Tonnage  4. Superheat/Subcooling     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: Workflow Connectors & Lookup Utilities (P1)                   │
│ 5. CFM Sizer  6. Flex Duct Chart  7. R-Value Sizer  8. Model Decoder   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: Heating & High-Ticket Sizing Systems (P2)                     │
│ 9. Heat Pump  10. Furnace Sizer  11. Mini-Split  12. Kitchen Hood CFM  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: Advanced Diagnostics, Psychrometrics & Hydronics (P3)         │
│ 13. PT Chart  14. Psychrometric  15. Boiler  16. Garage  17. Heat Loss │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Stage Breakdown & Deliverables

### Stage 0: Foundation & Core Infrastructure (Day 1)
* **Goal**: Establish the rock-solid framework before building individual calculators so every tool inherits universal unit switching, pre-rendered schema, strict canonical defense, zero layout shift (CLS = 0), and 7-section content layouts.
* **Core Deliverables**:
  1. **Global Registry** (`src/lib/data/calculators-registry.ts`): Single source of truth containing metadata, routes, keywords, pillar groupings, standards, and schema FAQs for all 17 calculators.
  2. **Unit System & LocalStorage Hooks**:
     * `src/lib/hooks/useLocalStorage.ts`: Type-safe browser storage persistence.
     * `src/lib/hooks/useUnitSystem.ts` & `UnitContext.tsx`: Universal reactive context handling Imperial $\leftrightarrow$ Metric conversions.
  3. **Structured Data Generator** (`src/components/seo/SchemaJsonLd.tsx`): Pre-rendered JSON-LD `@graph` injecting `WebApplication`, `BreadcrumbList`, and `FAQPage`.
  4. **7-Section Anti-Thin-Content Container** (`src/components/calculator/CalculatorContainer.tsx`): Enforces the standardized 7-section layout on every page.
  5. **Core Reusable UI Components**:
     * `DirectAnswerCard.tsx` (Target keyword snippet definition + formula).
     * `PageJumpNav.tsx` (Sticky quick-scroll pills).
     * `FormulaCard.tsx` (LaTeX display + variable table + engineering notes).
     * `MobileResultBar.tsx` (Persistent mobile dock on viewports $<768\text{px}$).
     * `ActionButtonBar.tsx` (Share link, Print job card, Export CSV, Embed modal).
     * `StandardsBadge.tsx` (Engineering compliance badges: ASHRAE, ACCA, SMACNA, EPA, IRC).

---

### Stage 1: The Core 4 MVP Tools (P0 — Traffic & High CPC Anchors)
* **Goal**: Establish organic authority, test equal-friction math and dynamic Canvas cross-section rendering on Tool #1 as the gold standard, and capture high-CPC cooling replacement leads.

| # | Calculator Route | Primary Target Keyword | Strategic Reason |
| :---: | :--- | :--- | :--- |
| **1** | `/calculators/ductulator` | `ductulator` (50,000/mo) | **Benchmark Implementation**: Tests equal-friction math, dynamic 2D Canvas cross-section rendering, aspect ratio locking, and SMACNA acoustic limits. |
| **2** | `/calculators/btu-calculator` | `btu calculator` (50,000/mo) | **Core Load Sizer**: Whole-home Manual J screening calculation that supplies upstream load data for CFM airflow and duct sizing. |
| **3** | `/calculators/ac-tonnage-calculator` | `ac tonnage calculator` (50k/mo, high bid) | **Commercial Lead Magnet**: High-CPC term matching users looking to replace central AC units with SEER2 energy cost modeling. |
| **4** | `/calculators/superheat-subcooling-calculator` | `superheat calculator` (1.0/100 comp) | **Technician Utility**: Near-zero paid competition, earning daily mobile bookmarks from field technicians for EPA charging. |

* **Mandatory QA Gate**: Vitest unit/golden reference tests + dedicated Playwright E2E spec for each tool (`tests/e2e/ductulator.spec.ts`, `btu-calculator.spec.ts`, `ac-tonnage-calculator.spec.ts`, `superheat-subcooling.spec.ts`).

---

### Stage 2: Workflow Connectors & High-Volume Lookup Tools (P1)
* **Goal**: Complete the interconnected calculation pipeline ($\text{BTU Load} \rightarrow \text{CFM Airflow} \rightarrow \text{Duct Sizing}$) and add high-intent lookup utilities.

| # | Calculator Route | Primary Target Keyword | Strategic Reason |
| :---: | :--- | :--- | :--- |
| **5** | `/calculators/cfm-calculator` | `cfm calculator hvac` | **Workflow Bridge**: Connects sensible heat and room volume directly to the Ductulator. |
| **6** | `/calculators/flex-duct-cfm-chart` | `flex duct cfm chart` | **High Search Demand**: Filterable sizing matrix with installation sag derating and printable PDF field cards. |
| **7** | `/calculators/r-value-calculator` | `r value for insulation` (50,000/mo) | **Building Science Anchor**: Multi-layer assembly thermal resistance ($R_{\text{total}}$), $U$-factor, and IECC code compliance. |
| **8** | `/calculators/ac-model-decoder` | `how to find ac tonnage` (0.0 comp, 97 MAD bid) | **High Utility Decoder**: Regex decoder for Carrier, Trane, Lennox, Goodman, Rheem, and York data tags. |

---

### Stage 3: Heating & High-Ticket Sizing Systems (P2)
* **Goal**: Focus on high-ticket equipment replacement and winter heating season demand.

| # | Calculator Route | Primary Target Keyword | Strategic Reason |
| :---: | :--- | :--- | :--- |
| **9** | `/calculators/heat-pump-size-calculator` | `heat pump size calculator` | **Electrification Sizer**: Sizing thermal balance points and low-ambient heating derate curves (47°F, 17°F, -5°F). |
| **10** | `/calculators/furnace-size-calculator` | `furnace size calculator` | **Heating Core**: Sizing AFUE-rated gas and electric furnaces by design temperature rise. |
| **11** | `/calculators/mini-split-sizing` | `mini split sizing calculator` | **Multi-Zone Sizing**: Multi-room capacity allocation for ductless split systems with inverter over-subscription. |
| **12** | `/calculators/kitchen-hood-cfm` | `kitchen hood cfm calculator` | **Remodeling & Code Alert**: Range hood sizing with mandatory IRC M1503.6 make-up air warnings ($>400\text{ CFM}$). |

---

### Stage 4: Advanced Diagnostics, Psychrometrics & Hydronics (P3)
* **Goal**: Complete the 17-tool catalog with specialized engineering utilities.

| # | Calculator Route | Primary Target Keyword | Strategic Reason |
| :---: | :--- | :--- | :--- |
| **13** | `/calculators/pt-chart` | `pressure temperature chart` | **A2L Transition Tool**: Interactive saturation curves for R-454B, R-32, R-410A, and R-22 with bubble/dew glide. |
| **14** | `/calculators/psychrometric-calculator` | `psychrometric calculator` | **Engineering Authority**: Moist air properties with altitude compensation and interactive canvas psychrometric chart. |
| **15** | `/calculators/boiler-size-calculator` | `boiler size calculator` | **Hydronics Core**: Baseboard length, cast-iron EDR, and indirect DHW tank priority sizing. |
| **16** | `/calculators/garage-heater-sizing` | `garage heater sizing calculator` | **Seasonal DIY**: Sizing unit and radiant infrared heaters for uninsulated shops accounting for slab losses. |
| **17** | `/calculators/heat-loss-calculator` | `heat loss calculator` | **Envelope Sizing**: Blower door infiltration ($ACH_{50}$) and whole-structure conductive heat loss. |

---

## 3. Complete Quality & Playwright E2E Gate Policy

For each calculator in every stage:
1. Mathematical unit and golden reference tests executed via Vitest (`npm run test`).
2. Dedicated Playwright E2E spec executed (`tests/e2e/[calculator-id].spec.ts`).
3. Verification of 7-section content pre-rendering with JS disabled.
4. Schema validation with 0 errors on Google Rich Results test.
