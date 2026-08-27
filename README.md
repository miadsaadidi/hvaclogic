# HVACLogic — Deterministic Building Science & Thermodynamic Calculation Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-95%20Passing%20(Vitest)-brightgreen.svg)](tests/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0%20(React%2019)-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-orange.svg)](https://hvaclogic.org)

> **Live Production Platform**: [https://hvaclogic.org](https://hvaclogic.org)  
> **Academic Paper**: [`paper/paper.md`](paper/paper.md) (Submitted to the *Journal of Open Source Software*)

---

## 🌟 Overview

**HVACLogic** is an open-source, deterministic computational engineering framework designed for building science, fluid dynamics, psychrometrics, and HVAC/R field diagnostics.

Traditional mechanical design tools often rely on opaque "black-box" heuristics (such as the legacy 500 sq ft/ton rule) or require expensive proprietary desktop licenses that compromise user privacy. HVACLogic solves this by implementing peer-reviewed, first-principles thermodynamics executing **100% client-side in the browser** in $<5\text{ ms}$ on mobile device CPUs, with full offline PWA resilience and zero cloud data collection.

---

## 🚀 Key Engineering Capabilities

1. **Duct Hydraulics & Air Distribution**:
   * Solves the implicit **Darcy-Weisbach / Colebrook-White** friction equation via Newton-Raphson iteration.
   * Calculates equivalent circular diameters ($D_e$) via **Huebscher's formulation** for rectangular and flat-oval ducts.
   * Models real-world flexible duct installation penalties (4% to 30% compression and sag derating curves from **ASHRAE RP-1333** and **SMACNA**).

2. **Building Envelope Thermodynamics & Infiltration**:
   * Implements **ACCA Manual J (8th Edition)** whole-house sensible and latent heat transmission.
   * Converts certified blower door depressurization ($ACH_{50}$) to natural infiltration CFM via the **LBNL Sherman-Grimsrud** correlation with shielding and building height factors.
   * Enforces strict **ACCA Manual S** equipment capacity limits (115% single-stage cooling, 130% variable-capacity inverter modulation).

3. **Zeotropic Low-GWP A2L Refrigerant Thermodynamics**:
   * Discrete polynomial saturation models for **R-454B**, **R-32**, and **R-410A**.
   * Separates **bubble-point** (liquid subcooling) and **dew-point** (vapor superheat) curves to eliminate temperature glide errors, cross-validated against **NIST REFPROP 10.0**.

4. **Moist Air Psychrometrics**:
   * Evaluates enthalpy, dew point, wet-bulb temperature, and humidity ratio ($W$) from $-40^\circ\text{F}$ to $200^\circ\text{F}$ adhering to **Hyland-Wexler** formulations adopted in **ASHRAE Fundamentals**.

---

## 📐 Benchmark Concordance & Verification

All core mathematical functions are continuously cross-validated against golden test vectors from published industry standards:

| Engineering Domain | Test Vector | Standard Reference Value | HVACLogic Output | Absolute Deviation | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Duct Friction** | $1200\text{ CFM}$, $12\text{ in. Galvanized}$ | $0.1550\text{ in. wg}/100\text{ ft}$ | $0.1552\text{ in. wg}/100\text{ ft}$ | $+0.13\%$ | `VALIDATED` |
| **Huebscher Diameter** | $16\text{ in.} \times 10\text{ in.}$ Rectangular | $D_e = 13.800\text{ in.}$ | $D_e = 13.804\text{ in.}$ | $+0.03\%$ | `VALIDATED` |
| **Psychrometrics** | $75^\circ\text{F DB}$, $63^\circ\text{F WB}$ ($Z=0$) | $W = 0.009360\text{ lb/lb}$ | $W = 0.009362\text{ lb/lb}$ | $+0.02\%$ | `VALIDATED` |
| **R-454B Bubble Point** | $p = 118.0\text{ psig}$ | $T_{\text{bubble}} = 40.20^\circ\text{F}$ | $T_{\text{bubble}} = 40.18^\circ\text{F}$ | $-0.05\%$ | `VALIDATED` |
| **Envelope Conduction** | $R\text{-}13$ Wall, $2000\text{ sq ft}$, $\Delta T = 50^\circ\text{F}$ | $7,692.0\text{ BTU/hr}$ | $7,692.3\text{ BTU/hr}$ | $0.00\%$ | `VALIDATED` |

---

## 🧭 The 5 Pillar Hubs & 21 Calculators

```
HVACLogic (https://hvaclogic.org)
├── 📂 Airflow & Duct Sizing (/airflow-ducts)
│   ├── 🔹 /calculators/ductulator (Digital Ductulator & Sizing Engine)
│   ├── 🔹 /calculators/flex-duct-cfm-chart (Dedicated Flex Duct CFM Chart)
│   ├── 🔹 /calculators/cfm-calculator (HVAC Airflow, Sensible Heat & ACH Sizer)
│   ├── 🔹 /calculators/duct-friction-loss-calculator (Manual D TEL & Friction Loss)
│   ├── 🔹 /calculators/filter-sizing-calculator (MERV Filter Face Velocity & Pressure Drop)
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
│   ├── 🔹 /calculators/refrigerant-charge-calculator (OEM-Sourced Line-Set Initial Weigh-In)
│   └── 🔹 /calculators/psychrometric-calculator (Interactive Psychrometric Chart & Moist Air Properties)
│
├── 📂 Heating Systems & Electrification (/heating-systems)
│   ├── 🔹 /calculators/heat-pump-size-calculator (Heat Pump Sizing, Balance Point & Cold-Climate COP)
│   ├── 🔹 /calculators/furnace-size-calculator (Gas/Electric Furnace Output & AFUE Efficiency Sizer)
│   ├── 🔹 /calculators/boiler-size-calculator (Hydronic Boiler, Baseboard & Radiator EDR Sizer)
│   ├── 🔹 /calculators/garage-heater-sizing (Shop & Garage Unit Heater Sizer)
│   └── 🔹 /calculators/combustion-air-calculator (NFPA 54 / IFGC Combustion Air Sizer)
│
└── 📂 Building Science & Insulation (/building-science)
    ├── 🔹 /calculators/r-value-calculator (Insulation R-Value, U-Factor & Code Sizer)
    └── 🔹 /calculators/heat-loss-calculator (Whole-Building Conductive & Infiltration Loss)
```

---

## 🛠️ Quickstart & Local Setup

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
# Execute fast Vitest unit tests (95 tests in <5s)
npm test

# Run TypeScript typecheck
npm run typecheck
```

---

## 📖 Citation

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

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
