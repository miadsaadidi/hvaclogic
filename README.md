# HVACLogic - Deterministic Building Science & Thermodynamic Calculation Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-117%20Passing%20(Vitest)-brightgreen.svg)](tests/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0%20(React%2019)-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%20(Strict)-blue.svg)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-orange.svg)](https://hvaclogic.org)
[![Academia.edu](https://img.shields.io/badge/Academia.edu-Paper%20%23172310808-red.svg)](https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing)
[![OER Commons](https://img.shields.io/badge/OER%20Commons-Courseware%20Index-green.svg)](https://oercommons.org/courses/hvaclogic-deterministic-building-science-thermodynamic-modeling-suite)

> **Live Production Platform**: [https://hvaclogic.org](https://hvaclogic.org)  
> **Academic Whitepaper**: [Academia.edu Paper #172310808](https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing)  
> **Open Courseware Resource**: [OER Commons Course Resource](https://oercommons.org/courses/hvaclogic-deterministic-building-science-thermodynamic-modeling-suite)  
> **JOSS Paper Preprint**: [`paper/paper.md`](paper/paper.md) (Submitted to the *Journal of Open Source Software*)

---

## Overview

**HVACLogic** is an open-source, deterministic computational engineering framework designed for building science, fluid dynamics, psychrometrics, and HVAC/R field diagnostics.

Traditional mechanical design tools often rely on opaque "black-box" heuristics (such as the legacy 500 sq ft/ton rule) or require expensive proprietary desktop licenses that compromise user privacy. HVACLogic solves this by implementing peer-reviewed, first-principles thermodynamics executing **100% client-side in the browser** in $<5\text{ ms}$ on mobile device CPUs, with full offline PWA resilience and zero cloud database tracking.

---

## Key Engineering Capabilities

1. **Duct Hydraulics & Air Distribution**:
   * Solves the implicit **Darcy-Weisbach / Colebrook-White** friction equation via Newton-Raphson iteration.
   * Calculates equivalent circular diameters ($D_e$) via **Huebscher's formulation** for rectangular and flat-oval ducts.
   * Models real-world flexible duct installation penalties (4% to 30% compression and sag derating curves from **ASHRAE RP-1333** and **SMACNA**).

2. **Building Envelope Thermodynamics & Infiltration**:
   * Implements **ACCA Manual J (8th Edition)** whole-house sensible and latent heat transmission.
   * Converts certified blower door depressurization ($ACH_{50}$) to natural infiltration CFM via the **LBNL Sherman-Grimsrud** correlation with shielding and building height factors.
   * Enforces strict **ACCA Manual S** equipment capacity limits (115% single-stage cooling, 130% variable-capacity inverter modulation).

3. **Zeotropic Low-GWP A2L Refrigerant Thermodynamics**:
   * Discrete polynomial saturation models for **R-454B**, **R-32**, **R-410A**, and **R-22**.
   * Separates **bubble-point** (liquid subcooling) and **dew-point** (vapor superheat) curves to eliminate temperature glide errors, cross-validated against **NIST REFPROP 10.0**.

4. **Moist Air Psychrometrics**:
   * Evaluates enthalpy, dew point, wet-bulb temperature, and humidity ratio ($W$) from $-40^\circ\text{F}$ to $200^\circ\text{F}$ adhering to **Hyland-Wexler** formulations adopted in **ASHRAE Fundamentals**.

5. **Heating Systems & Electrification Sizing**:
   * Evaluates cold-climate heat pump capacity degradation, coefficient of performance (COP), and thermal/economic balance point intersections.
   * Solves hydronic boiler sizing via baseboard output and radiator Equivalent Direct Radiation (EDR).
   * Verifies NFPA 54 / IFGC combustion air requirements for mechanical rooms.

---

## Benchmark Concordance & Verification

All core mathematical functions are continuously cross-validated against golden test vectors from published industry standards:

| Engineering Domain | Test Vector | Standard Reference Value | HVACLogic Output | Absolute Deviation | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Duct Friction** | $1200\text{ CFM}$, $12\text{ in. Galvanized}$ | $0.1550\text{ in. wg}/100\text{ ft}$ | $0.1552\text{ in. wg}/100\text{ ft}$ | $+0.13\%$ | `VALIDATED` |
| **Huebscher Diameter** | $16\text{ in.} \times 10\text{ in.}$ Rectangular | $D_e = 13.800\text{ in.}$ | $D_e = 13.804\text{ in.}$ | $+0.03\%$ | `VALIDATED` |
| **Psychrometrics** | $75^\circ\text{F DB}$, $63^\circ\text{F WB}$ ($Z=0$) | $W = 0.009360\text{ lb/lb}$ | $W = 0.009362\text{ lb/lb}$ | $+0.02\%$ | `VALIDATED` |
| **R-454B Bubble Point** | $p = 118.0\text{ psig}$ | $T_{\text{bubble}} = 40.20^\circ\text{F}$ | $T_{\text{bubble}} = 40.18^\circ\text{F}$ | $-0.05\%$ | `VALIDATED` |
| **Envelope Conduction** | $R\text{-}13$ Wall, $2000\text{ sq ft}$, $\Delta T = 50^\circ\text{F}$ | $7,692.0\text{ BTU/hr}$ | $7,692.3\text{ BTU/hr}$ | $0.00\%$ | `VALIDATED` |

---

## Repository Architecture

```
hvaclogic/
├── src/
│   ├── app/
│   │   ├── (categories)/              # 5 category pillar routes
│   │   │   ├── airflow-ducts/
│   │   │   ├── cooling-loads/
│   │   │   ├── field-diagnostics/
│   │   │   ├── heating-systems/
│   │   │   └── building-science/
│   │   ├── calculators/               # 21 interactive calculator tool pages
│   │   ├── guides/                    # Engineering guides hub & detail pages
│   │   │   ├── page.tsx               # Filterable guides directory
│   │   │   └── [slug]/page.tsx        # Structured technical guide page
│   │   ├── methodology/               # Verification & mathematical proofs
│   │   └── sources/                   # Standards citations & authority registers
│   ├── components/
│   │   └── calculator/
│   │       ├── tools/                 # Interactive UI components with presets & URL state
│   │       └── visualizers/           # Reactive live SVG engineering diagrams
│   └── lib/
│       ├── math/                      # Pure TypeScript thermodynamic physics engines
│       ├── data/                      # Standards registers, guides, and calculator catalogs
│       └── seo/                       # Schema.org JSON-LD graph generators
├── tests/
│   ├── e2e/                           # Playwright end-to-end integration tests
│   └── lib/math/                      # Vitest unit test suites (117 tests)
└── paper/
    └── paper.md                       # Academic manuscript for JOSS submission
```

---

## The 5 Pillar Hubs & 21 Calculators

```
HVACLogic (https://hvaclogic.org)
├── Airflow & Duct Sizing (/airflow-ducts)
│   ├── /calculators/ductulator (Digital Ductulator & Sizing Engine)
│   ├── /calculators/flex-duct-cfm-chart (Dedicated Flex Duct CFM Chart)
│   ├── /calculators/cfm-calculator (HVAC Airflow, Sensible Heat & ACH Sizer)
│   ├── /calculators/duct-friction-loss-calculator (Manual D TEL & Friction Loss)
│   ├── /calculators/filter-sizing-calculator (MERV Filter Face Velocity & Pressure Drop)
│   └── /calculators/kitchen-hood-cfm (Kitchen Range Hood & Make-Up Air Sizer)
│
├── Cooling & Load Sizing (/cooling-loads)
│   ├── /calculators/btu-calculator (Whole-Home & Room BTU Load Master)
│   ├── /calculators/ac-tonnage-calculator (AC Sizer & Room Capacity Tool)
│   ├── /calculators/ac-model-decoder (HVAC Model Number Tonnage Decoder)
│   └── /calculators/mini-split-sizing (Multi-Zone Ductless Sizer & Inverter Matcher)
│
├── Field Diagnostics & Refrigeration (/field-diagnostics)
│   ├── /calculators/superheat-subcooling-calculator (Target Superheat & Subcooling Diagnostic)
│   ├── /calculators/pt-chart (Digital Refrigerant PT Chart: R-454B, R-32, R-410A, R-22)
│   ├── /calculators/refrigerant-charge-calculator (OEM-Sourced Line-Set Initial Weigh-In)
│   └── /calculators/psychrometric-calculator (Interactive Psychrometric Chart & Moist Air Properties)
│
├── Heating Systems & Electrification (/heating-systems)
│   ├── /calculators/heat-pump-size-calculator (Heat Pump Sizing, Balance Point & Cold-Climate COP)
│   ├── /calculators/furnace-size-calculator (Gas/Electric Furnace Output & AFUE Efficiency Sizer)
│   ├── /calculators/boiler-size-calculator (Hydronic Boiler, Baseboard & Radiator EDR Sizer)
│   ├── /calculators/garage-heater-sizing (Shop & Garage Unit Heater Sizer)
│   └── /calculators/combustion-air-calculator (NFPA 54 / IFGC Combustion Air Sizer)
│
└── Building Science & Insulation (/building-science)
    ├── /calculators/r-value-calculator (Insulation R-Value, U-Factor & Code Sizer)
    └── /calculators/heat-loss-calculator (Whole-Building Conductive & Infiltration Loss)
```

---

## Engineering Guides Hub (/guides)

HVACLogic features an extensive library of peer-reviewed engineering guides combining theoretical formulas, code references, and direct companion calculator links:

| Guide | Primary Domain | Core Standards Referenced |
| :--- | :--- | :--- |
| **Air Distribution & Duct Hydraulics** | Duct Design | ASHRAE Fundamentals Ch. 21, ACCA Manual D, SMACNA |
| **Cooling Load Calculation: Manual J & S** | Load Sizing | ACCA Manual J (8th Ed), ACCA Manual S, ANSI/ASHRAE 183 |
| **Heat Pumps, Heating Systems & Electrification** | Electrification | ASHRAE Systems & Equipment, AHRI 210/240, NEEP ccASHP |
| **Field Diagnostics & A2L Refrigerant Transition** | Refrigeration | ASHRAE Standard 15 & 34, EPA Section 608, NIST REFPROP |
| **Psychrometrics & Building Moisture Physics** | Psychrometrics | ASHRAE Fundamentals Ch. 1, Hyland-Wexler, ASTM E96 |
| **Ventilation, Makeup Air & Depressurization** | Ventilation | ASHRAE Standard 62.2, IRC M1503, NFPA 54 / IFGC |
| **Filtration Hydraulics & Static Pressure** | Indoor Air Quality | ASHRAE Standard 52.2, AHRI 680, NAFA Guidelines |
| **Multi-Split & VRF Diversity Sizing** | VRF Systems | AHRI Standard 1230, ASHRAE Standard 15, OEM Engineering Manuals |

---

## Quickstart & Local Setup

### Prerequisites
* **Node.js** $\ge 18.17.0$
* **npm** $\ge 9.0.0$

### 1. Clone the Repository
```bash
git clone https://github.com/miadsaadidi/hvaclogic.git
cd hvaclogic
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Test Suites
```bash
# Execute fast Vitest unit tests (117 tests in <5s)
npm test

# Run TypeScript typecheck
npm run typecheck
```

---

## Citation

If you use `HVACLogic` in your academic research, building performance audits, or mechanical engineering coursework, please cite our paper:

```bibtex
@article{Inside2026_HVACLogic,
  author = {Miad Inside},
  title = {{HVACLogic}: A Deterministic Computational Framework for Building Science, Air Distribution, and Thermodynamic Sizing},
  journal = {Journal of Open Source Software},
  year = {2026},
  url = {https://hvaclogic.org}
}
```

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
