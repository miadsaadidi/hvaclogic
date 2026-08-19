# HVAC Lab — 7 Mandatory SEO Engineering Rules & 10/10 SERP Standard

> **Document Status**: Approved & Enforced  
> **Version**: 1.1.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [01-keyword-research-master.md](./01-keyword-research-master.md), [02-website-architecture-routing.md](./02-website-architecture-routing.md), [03-calculators-and-features-list.md](./03-calculators-and-features-list.md), [06-powerlab-inspired-system-specs.md](./06-powerlab-inspired-system-specs.md)
> **Canonical Production Domain**: `https://hvaclogic.org`

---

## 1. Executive Summary & SEO Summary Checklist

To achieve an undeniable **10/10 SEO audit score** and systematically outrank legacy competitors, every route in HVAC Lab strictly enforces these **7 Mandatory SEO Engineering Rules**:

| SEO Pillar | Mandatory Engineering Requirement | Verification & Target Metric |
| :--- | :--- | :--- |
| **1. SSG Pre-Rendering** | Static Site Generation (`output: 'export'` or static App Router routes) with complete initial HTML DOM visibility. | `curl -s https://hvaclogic.org/calculators/ductulator` returns 100% crawlable text with JS disabled. |
| **2. Multi-Entity Schema** | Pre-rendered JSON-LD `@graph` (`WebApplication`, `FAQPage`, `BreadcrumbList`) in `<head>`. | 0 Rich Snippet syntax errors on Google Rich Results Test. |
| **3. Anti-Thin-Content** | Strict 7-section semantic layout on every single tool page. | 0 Thin-Content algorithmic penalties; $>1,200$ words of indexable technical content per tool. |
| **4. Canonical Defense** | Strict self-referencing `<link rel="canonical">` ignoring dynamic URL search params (`?cfm=...`). | Zero duplicate indexation across parameter states. |
| **5. Core Web Vitals** | Native CSS, pre-dimensioned containers, zero external font latency (`next/font`), sub-30ms INP. | `CLS = 0.000`, `LCP < 0.8s`, `INP < 30ms` (100/100 PageSpeed target). |
| **6. Silo Architecture** | 5 clean root pillar hubs + bi-directional vertical & horizontal sequential workflow handoffs. | 100% crawl coverage with zero orphaned calculator routes. |
| **7. Keyword Hierarchy** | Strict title tag formula (`[Keyword] — [Standard/Methodology] \| HVACLab`) + single semantic `<h1>`. | 50–60 character title length, 100% semantic heading structure. |

---

## 2. Rule 1: 100% Static Pre-Rendering (SSG DOM Visibility)

### The Problem
Many modern React and Next.js applications render a blank `<div>` on initial page load and hydrate text via client-side JavaScript. If search engine crawlers inspect the page before client scripts execute, they index an empty tool with zero textual context.

### The Mandatory Rule
Every calculator route must be pre-rendered using **Static Site Generation (SSG)** (`output: 'export'` or static App Router page components). 

### The Acceptance Test
When JavaScript is disabled in the browser or when executing a raw server fetch (`curl -s https://hvaclogic.org/calculators/ductulator`), the raw HTML response **MUST** contain:
1. The full `<h1>` heading and introductory lead paragraph;
2. The complete DirectAnswerCard text and governing formulas;
3. The full step-by-step engineering methodology and physical derivations;
4. The complete, static HTML reference comparison table;
5. The full worked numerical sizing example;
6. All 3–5 FAQ questions and answers in semantic HTML.

---

## 3. Rule 2: Multi-Entity Schema.org `@graph` JSON-LD

### The Problem
Generic web pages miss out on rich SERP real estate (interactive tool badges, breadcrumbs, expandable Q&A accordions).

### The Mandatory Rule
Pre-render an interconnected JSON-LD `@graph` inside the `<head>` of every single tool page containing:
1. **`WebApplication` / `SoftwareApplication`**:
   * `applicationCategory`: `"UtilitiesApplication"` or `"EngineeringApplication"`.
   * `operatingSystem`: `"All (Web Browser, PWA)"`.
   * `offers`: `{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }` (signals 100% free, ungated access).
2. **`BreadcrumbList`**: Full hierarchical path (`Home` $\to$ `Airflow & Ducts` $\to$ `Digital Ductulator`).
3. **`FAQPage`**: 3–5 targeted long-tail Q&As per tool (matching high-intent "People Also Ask" search queries).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Digital Ductulator & Air Duct Sizing Tool",
      "url": "https://hvaclogic.org/calculators/ductulator",
      "description": "Professional online ductulator for HVAC engineers and technicians. Calculate duct diameter, rectangular dimensions, friction rate, and velocity.",
      "applicationCategory": "EngineeringApplication",
      "operatingSystem": "All (Web Browser, PWA)",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hvaclogic.org/" },
        { "@type": "ListItem", "position": 2, "name": "Airflow & Ducts", "item": "https://hvaclogic.org/airflow-ducts" },
        { "@type": "ListItem", "position": 3, "name": "Digital Ductulator", "item": "https://hvaclogic.org/calculators/ductulator" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What friction rate should I use to size residential ductwork?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "According to ACCA Manual D guidelines, the standard friction rate for residential supply ductwork is 0.08 to 0.10 inches of water column (in. wg) per 100 feet, while return air ducts are typically sized at 0.05 to 0.08 in. wg for quieter airflow."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 4. Rule 3: The 7-Section Anti-Thin-Content Blueprint

To eliminate any risk of algorithmic thin-content penalties (Google Helpful Content System), every calculator page must structurally contain these **7 pre-rendered semantic sections**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. SEMANTIC HEADER                                                          │
│ • Breadcrumb trail (Home > Pillar Hub > Current Tool)                       │
│ • Category eyebrow badge + Exact-Match Target Keyword <h1>                  │
│ • Authoritative introductory paragraph + Cited Standards (ASHRAE/ACCA/SMACNA)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. INTERACTIVE TOOL UI (#calculator-tool)                                   │
│ • DirectAnswerCard (Target keyword snippet definition + formula)            │
│ • Sticky PageJumpNav quick-scroll pills                                     │
│ • 1-Click Preset Scenario Chips                                             │
│ • Tactile Range Sliders + Numeric Stepper Inputs + Unit Switcher            │
│ • Dynamic Visualizer (Canvas Duct Cross-Section / Pressure Gauge / Donut)   │
│ • Live Result Card + Action Bar (Share, Print Job Card, Export CSV, Embed)  │
│ • Persistent MobileResultBar docking on mobile viewports                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. ENGINEERING METHODOLOGY & PHYSICS DERIVATIONS (#how-to-guide)            │
│ • Step-by-step practical sizing guide with numbered procedure               │
│ • Formal mathematical models ($LaTeX$) with variable definitions            │
│ • Constant derivations (e.g. $1.08 = 60 \cdot \rho \cdot c_p$)              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. STATIC HTML REFERENCE COMPARISON TABLE (#sizing-matrix)                  │
│ • 100% crawlable, structured <table> with <th> scope headers                │
│ • Standard engineering lookup matrix (e.g. CFM vs Diameter vs Friction)    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. WORKED NUMERICAL SIZING EXAMPLE (#worked-example)                        │
│ • Concrete, real-world scenario with actual numbers                         │
│ • Step-by-step mathematical walkthrough leading to the final result         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. SCHEMA-BACKED FAQ ACCORDION (#faq-section)                               │
│ • 3–5 targeted long-tail Q&As matching People Also Ask search queries       │
│ • Semantic <details> and <summary> markup mirrored in FAQPage JSON-LD       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. CONTEXTUAL TOPIC SILO FOOTER (#related-tools)                            │
│ • Sequential workflow handoff buttons (e.g. BTU -> CFM -> Ductulator)       │
│ • Upward link to parent pillar hub and sibling tools                        │
│ • Engineering standards compliance badges (ASHRAE, ACCA, SMACNA, EPA, IRC)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Rule 4: Canonical Defense on Dynamic URL Parameters

### The Problem
Technicians and users share URLs containing custom calculation states (e.g. `/calculators/ductulator?cfm=1200&friction=0.08&material=galv`). If search bots crawl these links across forums or social media, it can generate hundreds of duplicate URL variations and dilute domain authority.

### The Mandatory Rule
1. Every calculator page `<head>` must enforce a strict, self-referencing canonical tag pointing **exclusively to the root slug without query parameters**:
   ```html
   <!-- Rendered on https://hvaclogic.org/calculators/ductulator?cfm=1200&friction=0.08 -->
   <link rel="canonical" href="https://hvaclogic.org/calculators/ductulator" />
   ```
2. Interactive state updates in the browser must update the address bar via `window.history.replaceState` rather than triggering browser navigations.

---

## 6. Rule 5: Perfect Core Web Vitals (Zero Layout Shift & Speed)

### The Problem
Legacy competitor sites (Calculator.net, EngineeringToolBox) suffer from intrusive programmatic ads, layout shifts, slow web font rendering, and heavy bundle execution.

### The Mandatory Engineering Standards:
* **`CLS = 0.000` (Zero Layout Shift)**:
  * Explicitly declare `min-height` and fixed aspect-ratio containers for all input panels, dynamic Canvas visualizers, and result cards so content never jumps when values recalculate.
* **`LCP < 0.8s` (Instant First Paint)**:
  * Zero external font delays using `next/font` with local font subsets (Inter / Outfit).
  * Zero third-party blocking tracking scripts.
  * Inline critical SVG icons and CSS tokens.
* **`INP < 30ms` (Instant Interaction)**:
  * Client-side calculations execute on pure TypeScript math functions without heavy dependencies or charting bloat.

---

## 7. Rule 6: Strict Internal Linking & Topical Silo Architecture

```
                                    [ https://hvaclogic.org ]
                                                │
   ┌────────────────────┬───────────────────────┼───────────────────────┬────────────────────┐
   ▼                    ▼                       ▼                       ▼                    ▼
[/airflow-ducts]     [/cooling-loads]     [/field-diagnostics]   [/heating-systems]    [/building-science]
   │                    │                       │                       │                    │
   ├── /ductulator      ├── /btu-calculator     ├── /superheat-subcool  ├── /heat-pump-size  ├── /r-value-calc
   ├── /flex-duct-chart ├── /ac-tonnage-calc    ├── /pt-chart           ├── /furnace-size    └── /heat-loss-calc
   ├── /cfm-calculator  ├── /ac-model-decoder   └── /psychrometric-calc ├── /boiler-size
   └── /kitchen-hood-cfm└── /mini-split-sizing                          └── /garage-heater
```

### Sequential Workflow Handoff Pipeline (Horizontal Silos):
Every tool includes direct 1-click handoff buttons passing parameters along standard engineering design workflows:
$$\mathbf{Whole\text{-}Home\text{ }BTU\text{ }Load}\xrightarrow{\text{?btu=36000}}\mathbf{CFM\text{ }Airflow\text{ }Sizer}\xrightarrow{\text{?cfm=1200}}\mathbf{Digital\text{ }Ductulator}$$

---

## 8. Rule 7: Keyword-Engineered Title & Heading Hierarchy

### Strict Title Tag Formula (50–60 Characters):
```
[Primary Target Keyword] — [Standard/Methodology] | HVACLogic
```

#### Production Title Tag Examples:
* `/calculators/ductulator`: `Ductulator & Air Duct Sizing (Equal Friction) | HVACLogic` (58 chars)
* `/calculators/flex-duct-cfm-chart`: `Flex Duct CFM Chart & Ductwork Sizing | HVACLogic` (50 chars)
* `/calculators/cfm-calculator`: `HVAC CFM Calculator — Airflow & Sensible Heat | HVACLogic` (56 chars)
* `/calculators/ac-model-decoder`: `How to Find AC Tonnage — Model Number Decoder | HVACLogic` (56 chars)
* `/calculators/superheat-subcooling-calculator`: `Superheat & Subcooling Calculator — HVAC Charging | HVACLogic` (59 chars)
* `/calculators/btu-calculator`: `BTU Calculator & AC Heat Load (Manual J Sizing) | HVACLogic` (57 chars)
* `/calculators/pt-chart`: `Refrigerant PT Chart — R454B, R32, R410A Saturation | HVACLogic` (60 chars)

### Heading Hierarchy Rules:
1. **Single `<h1>` per page**: Exactly matches the primary intent keyword and tool name.
2. **Semantic `<h2>` tags**: Structured consistently across all 7 sections (`How to Calculate...`, `Typical Sizing Benchmarks`, `Formulas & Physics`, `Frequently Asked Questions`, `Related Tools`).
3. **Semantic `<h3>` tags**: Sub-methods, variable breakdowns, and specific scenario callouts.
