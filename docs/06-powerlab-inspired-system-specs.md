# HVAC Lab — Software Architecture, UI Components & Design System

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [02-website-architecture-routing.md](./02-website-architecture-routing.md), [03-calculators-and-features-list.md](./03-calculators-and-features-list.md), [12-quality-safety-accessibility.md](./12-quality-safety-accessibility.md)

---

## 1. Technical Stack & Component Architecture

HVAC Lab adapts the proven architectural, component, and performance patterns of **`PowerLab`** (`D:\powerlab`):

* **Framework**: Next.js 15 (App Router) + React 19 + TypeScript 5.9+.
* **Styling**: Pure Vanilla CSS in `globals.css` with a centralized design token system (zero Tailwind runtime overhead).
* **Rendering Strategy**: 100% Pre-rendered Static Pages (SSG) for all 17 calculator routes, category pillar hubs, and reference documentation.
* **State Management**: React 19 hooks (`useState`, `useMemo`, `useCallback`) synchronized with URL search params via `window.history.replaceState`.
* **Testing & QA**: Vitest for computational & unit test suites; Playwright for browser E2E workflows.

---

## 2. Standard 10-Tier Page Anatomy

Every calculator page renders a consistent 10-tier layout:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Pre-rendered JSON-LD Graph (WebApplication + FAQPage + BreadcrumbList)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Breadcrumb Navigation Trail (Home > Pillar Hub > Current Tool)           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Header Block (Category Eyebrow + H1 Title + Intro Description)          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. DirectAnswerCard (Target Keyword + Featured Snippet Text + Formula)      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. Sticky PageJumpNav Pills (#calculator, #how-to, #matrix, #formula, #faq) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. Interactive Calculator Engine (#calculator-tool)                         │
│    ├── Preset Chips (1-Click standard scenarios)                            │
│    ├── Dual Input Controls (Tactile Sliders + Numeric Stepper Inputs)       │
│    ├── Dynamic Canvas/SVG Visualizer (Cross-section, Gauge, Donut)          │
│    ├── Primary Result Card + Secondary Engineering Outputs                  │
│    ├── Action Button Bar (Share Link, Print Job Card, Export CSV, Embed)    │
│    ├── Downstream Workflow Handoff Links (e.g., BTU -> CFM -> Ductulator)   │
│    └── Mobile Sticky Result Bar (Persistent bottom bar on mobile screens)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. How-To Step-by-Step Practical Sizing Guide (#how-to-guide)               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 8. Benchmark Reference Sizing Table / Matrix (#sizing-matrix)               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 9. FormulaCard with LaTeX, Variable Table & Engineering Notes (#formula-math)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 10. FAQ Section with Expandable <details> Accordions (#faq-section)         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 11. Contextual Related Tools Cross-Links (#related-tools)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 12. Engineering Standards Compliance Badge (ASHRAE, ACCA, SMACNA, EPA, IRC) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Centralized Registry Architecture: `calculator-registry.ts`

```typescript
export type PillarId =
  | 'airflow-ducts'
  | 'cooling-loads'
  | 'field-diagnostics'
  | 'heating-systems'
  | 'building-science';

export type CalculatorStatus =
  | 'planned'
  | 'engineering-review'
  | 'development'
  | 'validation'
  | 'beta'
  | 'production';

export type StandardId = 'ASHRAE' | 'ACCA' | 'SMACNA' | 'EPA' | 'AHRI' | 'IRC' | 'IECC' | 'DOE' | 'NIST';

export interface CalculatorMeta {
  id: string;
  name: string;
  pillar: PillarId;
  route: string;

  status: CalculatorStatus;
  launchPhase: 1 | 2 | 3;
  riskLevel: 'low' | 'medium' | 'high';

  primaryKeyword: string;
  secondaryKeywords: string[];
  primaryIntent: string;

  seoTitle: string;
  metaDescription: string;

  categoryName: string;
  categoryRoute: string;

  features: string[];
  relatedCalculatorIds: string[];
  standards: StandardId[];

  formulaVersion: string;
  dataVersion: string;
  lastEngineeringReview: string;

  requiresReferenceDataset: boolean;
  offlineEligible: boolean;
  testStatus: 'not-started' | 'partial' | 'validated';

  analyticsEvents: string[];
}
```

---

## 4. UI/UX Design System & Thermal Theme Tokens

```css
:root {
  /* Surface & Base */
  --bg-primary: #0b0f19;
  --bg-secondary: #111827;
  --surface: #1a2234;
  --surface-raised: #222d44;
  --border-color: #2e3b52;
  --border-subtle: #1e293b;

  /* Typography */
  --ink: #f8fafc;
  --ink-secondary: #94a3b8;
  --text-muted: #64748b;

  /* HVAC Thermal Accent Gradients */
  --accent-cooling: #00d2ff;       /* Coolant Cyan */
  --accent-cooling-glow: rgba(0, 210, 255, 0.25);
  --accent-heating: #ff6b4a;       /* Thermal Amber/Crimson */
  --accent-heating-glow: rgba(255, 107, 74, 0.25);
  --accent-primary: #38bdf8;       /* Electric Sky */
  --accent-success: #10b981;       /* Refrigerant Normal Green */
  --accent-warning: #f59e0b;       /* Caution / Derate Amber */
  --accent-danger: #ef4444;        /* Overcharge / Noise Red */

  /* Glassmorphism & Elevation */
  --glass-bg: rgba(26, 34, 52, 0.75);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(14px);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.5);
  --glow-primary: 0 0 20px rgba(56, 189, 248, 0.2);
}

[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --surface: #ffffff;
  --surface-raised: #f8fafc;
  --border-color: #cbd5e1;
  --border-subtle: #e2e8f0;
  --ink: #0f172a;
  --ink-secondary: #334155;
  --text-muted: #64748b;
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(0, 0, 0, 0.08);
  --accent-cooling: #0284c7;
  --accent-heating: #ea580c;
  --accent-primary: #0284c7;
}
```

---

## 5. Performance Budgets & Core Web Vitals Targets

### 5.1 Lab Performance Targets (Lighthouse / Synthetic)
* **Lighthouse Performance Score**: $\ge 95$ across all calculator routes.
* **Lighthouse Accessibility Score**: $100$ (WCAG 2.2 AA).
* **Initial Route JavaScript Bundle**: $\le 120\text{ KB}$ (gzipped).
* **Global CSS Bundle**: $\le 25\text{ KB}$ (unminified, zero unused CSS).

### 5.2 Field Core Web Vitals Targets (75th Percentile)
* **Largest Contentful Paint (LCP)**: $\le 2.5\text{ seconds}$ (target: $<1.2\text{s}$).
* **Interaction to Next Paint (INP)**: $\le 200\text{ milliseconds}$ (target: $<50\text{ms}$).
* **Cumulative Layout Shift (CLS)**: $\le 0.10$ (target: $<0.02$).
