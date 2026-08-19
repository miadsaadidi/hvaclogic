# HVAC Lab — Website Architecture, Routing & Technical SEO Blueprint

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [03-calculators-and-features-list.md](./03-calculators-and-features-list.md), [07-master-seo-strategy.md](./07-master-seo-strategy.md), [06-powerlab-inspired-system-specs.md](./06-powerlab-inspired-system-specs.md)
> **Canonical Production Domain**: `https://hvaclogic.org`

---

## 1. Information Architecture & Sitemap Tree

The website architecture uses **5 flat, high-authority category silos** without unnecessary `/category/` URL prefixes to maximize PageRank distribution and maintain clean hierarchy:

```
HVAC Lab (https://hvaclogic.org/)
├── 🧭 Global Navigation & Quick Command Palette (Ctrl+K / Cmd+K)
├── 🧰 All Calculators Hub (/calculators)
│
├── 📂 Pillar Hub 1: Airflow & Duct Sizing (/airflow-ducts)
│   ├── 🔹 /calculators/ductulator (Digital Ductulator & Sizing Engine #cfm-chart)
│   ├── 🔹 /calculators/flex-duct-cfm-chart (Dedicated Flex Duct CFM & Friction Drop Tool)
│   ├── 🔹 /calculators/cfm-calculator (HVAC Airflow, Sensible Heat & ACH Sizer)
│   └── 🔹 /calculators/kitchen-hood-cfm (Kitchen Range Hood & Make-Up Air Sizer)
│
├── 📂 Pillar Hub 2: Cooling & Load Sizing (/cooling-loads)
│   ├── 🔹 /calculators/btu-calculator (Whole-Home & Room BTU Load Master)
│   ├── 🔹 /calculators/ac-tonnage-calculator (AC Sizer & Room Capacity Tool #model-decoder)
│   ├── 🔹 /calculators/ac-model-decoder (Dedicated HVAC Model Number Tonnage Decoder)
│   └── 🔹 /calculators/mini-split-sizing (Multi-Zone Ductless Sizer & Inverter Matcher)
│
├── 📂 Pillar Hub 3: Field Diagnostics & Refrigeration (/field-diagnostics)
│   ├── 🔹 /calculators/superheat-subcooling-calculator (Target Superheat / Subcooling Charging Diagnostic)
│   ├── 🔹 /calculators/pt-chart (Interactive Digital Refrigerant Pressure-Temperature Tool)
│   └── 🔹 /calculators/psychrometric-calculator (Interactive Psychrometric Chart & Moist Air Properties)
│
├── 📂 Pillar Hub 4: Heating Systems & Electrification (/heating-systems)
│   ├── 🔹 /calculators/heat-pump-size-calculator (Heat Pump Sizing, Balance Point & Cold-Climate COP)
│   ├── 🔹 /calculators/furnace-size-calculator (Gas/Electric Furnace Output & AFUE Efficiency Sizer)
│   ├── 🔹 /calculators/boiler-size-calculator (Hydronic Boiler, Baseboard & Radiator EDR Sizer)
│   └── 🔹 /calculators/garage-heater-sizing (Shop & Garage Unit Heater Sizer)
│
├── 📂 Pillar Hub 5: Building Science & Insulation (/building-science)
│   ├── 🔹 /calculators/r-value-calculator (Insulation R-Value, U-Factor & Code Sizer)
│   └── 🔹 /calculators/heat-loss-calculator (Whole-Building Conductive & Infiltration Loss)
│
├── 📚 Engineering Reference Hub (/reference)
│   ├── 📑 /reference/formulas (HVAC Formulas Cheat Sheet with LaTeX derivations)
│   └── 📑 /reference/standards (ASHRAE 62.2, ACCA Manual J/D, IECC Climate Zones)
│
└── 📄 Utility Pages
    ├── /about
    ├── /contact
    ├── /privacy
    └── /terms
```

*(For full input/output/validation specs of each calculator, refer to the canonical specification in [03-calculators-and-features-list.md](./03-calculators-and-features-list.md).)*

---

## 2. Technical SEO Guardrails & Indexation Defenses

### 2.1 Flat Category Silos (No `/category/` Prefix)
* Category pillar pages exist at the root level (`/airflow-ducts`, `/cooling-loads`, `/field-diagnostics`, `/heating-systems`, `/building-science`).
* Eliminates directory bloat, distributes link equity directly from root, and delivers clean URLs to users and search crawlers.

### 2.2 Canonical Defense on URL Parameters
* Users and technicians share deep-links with serialized inputs (e.g. `?cfm=1200&friction=0.08`).
* **Canonical Defense**: Every calculator page head must render a strict, self-referencing `<link rel="canonical">` tag pointing **exclusively to the clean canonical path** without query strings or hash fragments:
  ```html
  <link rel="canonical" href="https://hvaclogic.org/calculators/ductulator" />
  ```
* Client-side parameter updates use `window.history.replaceState` to maintain smooth interactive state without creating browser history clutter.

### 2.3 Standalone Sub-Tool Routing (Anti-Cannibalization)
* High-volume secondary search queries are given distinct, top-level canonical URLs rather than nested sub-paths:
  * `/calculators/flex-duct-cfm-chart` (Target: `flex duct cfm chart`, `hvac ductwork sizing chart`)
  * `/calculators/ac-model-decoder` (Target: `how to find ac tonnage`, `how to find tonnage of ac unit`)
  * `/calculators/pt-chart` (Target: `refrigerant pt chart`, `r410a pt chart`, `r32 pt chart`)

### 2.4 Service Worker & Offline Data Lifecycle
* **Navigation Requests (`Request.mode === 'navigate'`)**: Configured strictly as **Network-First** to ensure search engine crawlers and users always receive fresh, pre-rendered static HTML.
* **Static Assets (`.js`, `.css`, `.woff2`, `.svg`)**: Configured as **Cache-First** with versioned hash-busting.
* **Cache Invalidation & Versioning**: Caches are namespaced (e.g. `hvaclogic-v1.0.0-assets`). On service worker activation (`activate` event), all outdated cache namespaces are systematically purged.
* **Stale Dataset Notification**: If a new thermodynamic dataset version (`dataVersion`) is deployed, the client-side app displays a non-blocking toast notification prompting the user to refresh.

---

## 3. Schema.org Semantic Markup Architecture

> **Policy Note**: HVAC Lab separates **Schema.org semantic markup** (which enriches search engine machine comprehension) from **Google-supported rich-result eligibility**. We do not invent fake aggregate ratings or reviews for rich snippet badges.

### 3.1 `WebApplication` Schema Template
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
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
}
</script>
```

### 3.2 `BreadcrumbList` Schema Template
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://hvaclogic.org/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Airflow & Ducts",
      "item": "https://hvaclogic.org/airflow-ducts"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Digital Ductulator",
      "item": "https://hvaclogic.org/calculators/ductulator"
    }
  ]
}
</script>
```

### 3.3 `FAQPage` Schema Template
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What friction rate should I use to size residential ductwork?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to ACCA Manual D, the standard friction rate for residential supply ductwork is 0.08 to 0.10 in. wg per 100 ft, while return trunks are typically sized at 0.05 to 0.08 in. wg for quieter airflow."
      }
    }
  ]
}
</script>
```
