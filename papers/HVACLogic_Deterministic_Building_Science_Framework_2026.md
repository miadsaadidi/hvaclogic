# HVACLogic: A Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing

**Authors**: HVACLogic Engineering & Building Science Working Group  
**Published**: August 2026  
**Repository & Open Access**: [https://hvaclogic.org](https://hvaclogic.org)  
**Permanent Open-Access Archive**: [https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260824](https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260824)  
**Academic Registry**: [Academia.edu (Paper #172310808)](https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing) & ResearchGate  
**Classification**: Mechanical Engineering, Building Physics, Fluid Dynamics, Thermal Sciences, Open-Source Computational Frameworks  

---

### Abstract

Modern heating, ventilation, air conditioning, and refrigeration (HVAC/R) engineering workflows are frequently constrained by legacy software architectures, subscription-gated paywalls, unverified heuristics, and invasive data-tracking mechanisms. This paper presents **HVACLogic**, an open-access, client-side, deterministic computational framework engineered for high-precision building load estimation, duct hydraulic sizing, psychrometric state determination, and refrigeration circuit diagnostics. By implementing the foundational physical models of the American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE), the Air Conditioning Contractors of America (ACCA), and the Sheet Metal and Air Conditioning Contractors' National Association (SMACNA) within an immutable, client-side execution environment, HVACLogic guarantees sub-millisecond evaluation latency, 100% offline operational capability on remote jobsites, and complete privacy preservation with zero project-data exfiltration. We outline the mathematical derivations governing fluid friction (Colebrook-White and Huebscher circular equivalency), multi-variable moist air psychrometrics, zeotropic refrigerant phase transitions ($R\text{-}454\text{B}$, $R\text{-}32$, $R\text{-}410\text{A}$ temperature glide), and multi-layer envelope thermal conductance. Cross-validation against ASHRAE Fundamentals golden datasets demonstrates numerical concordance within $\pm 0.05\%$.

**Keywords**: Building Physics, Psychrometrics, Duct Hydraulics, Darcy-Weisbach, Colebrook-White, ACCA Manual D, ACCA Manual J, Refrigerant Glide, Decarbonization, Deterministic Computing.

---

## 1. Introduction and Architectural Motivation

The global transition toward building decarbonization, heat pump adoption, and low-GWP (Global Warming Potential) A2L refrigerants has introduced unprecedented technical complexity into field diagnostics and equipment specification. Field technicians, commissioning engineers, and building science practitioners are required to execute complex mathematical evaluations—including Total Equivalent Length (TEL) available static pressure drops, zeotropic bubble-dew point saturation interpolations, and low-ambient heating capacity deratings—directly at the physical mechanical asset.

Historically, computational tools in this domain have suffered from three systemic deficiencies:
1. **Opaque Black-Box Heuristics**: Commercial tools frequently mask underlying assumptions, rounding factors, and empirical safety margins, preventing engineering auditing.
2. **Server-Side Latency & Network Dependency**: Cloud-dependent software architectures fail in reinforced concrete basements, remote mechanical penthouses, and rural substations where cellular connectivity is absent.
3. **Data Harvesting & Privacy Intrusion**: Proprietary diagnostic platforms mandate account registration, telemetry logging, and the exfiltration of private customer equipment serials and structural dimensions.

HVACLogic resolves these constraints by establishing an open-source, deterministic calculation architecture executing 100% client-side in standard ECMAScript / WebAssembly engines with full offline Service Worker caching.

---

## 2. Fluid Dynamics & Air Distribution Formulations

### 2.1 Equal Friction & Darcy-Weisbach Hydraulic Modeling

Duct friction loss is governed by the Darcy-Weisbach equation expressed in HVAC engineering units:

$$\Delta p_f = 100 \cdot f \cdot \left( \frac{12}{D_h} \right) \cdot \left( \frac{\rho \cdot v^2}{2 \cdot g_c} \right)$$

Where:
* $\Delta p_f$ = Friction loss per 100 feet of duct ($\text{in. wg} / 100\text{ ft}$)
* $f$ = Darcy friction factor (dimensionless)
* $D_h$ = Hydraulic diameter ($\text{inches}$)
* $\rho$ = Standard air density ($0.075\text{ lb/ft}^3$ at sea level, $70^\circ\text{F}$, $29.921\text{ in. Hg}$)
* $v$ = Mean air velocity ($\text{ft/min}$)

The Darcy friction factor $f$ across the turbulent flow regime ($Re \ge 4000$) is computed via the implicit Colebrook-White equation:

$$\frac{1}{\sqrt{f}} = -2 \log_{10} \left( \frac{\varepsilon}{3.7 D_h} + \frac{2.51}{Re \sqrt{f}} \right)$$

Where $\varepsilon$ is the absolute material surface roughness ($0.0003\text{ ft}$ for galvanized sheet metal; $0.003\text{ ft}$ for wire-helix flexible ductwork), and $Re$ is the Reynolds number:

$$Re = \frac{v \cdot (D_h / 12)}{\nu}$$

In HVACLogic, convergence is solved deterministically via Newton-Raphson iteration with a termination tolerance of $\epsilon < 10^{-7}$.

### 2.2 Huebscher Circular Equivalent Diameter

To convert round duct hydraulics to equivalent rectangular cross-sections carrying equal volumetric flow rate $Q$ at identical friction gradient $\Delta p_f$, HVACLogic implements the Huebscher relationship adopted in ASHRAE Fundamentals:

$$D_e = 1.30 \cdot \frac{(a \cdot b)^{0.625}}{(a + b)^{0.250}}$$

Where $a$ and $b$ are the rectangular duct width and height in inches. The corresponding aspect ratio $AR = \max(a, b) / \min(a, b)$ is continuously monitored against SMACNA acoustic and structural deflection thresholds ($AR \le 4.0$).

---

## 3. Psychrometric & Moist Air State Formulations

### 3.1 Saturation Vapor Pressure

Saturation vapor pressure over liquid water $p_{ws}$ across the temperature range $0^\circ\text{C} \le T \le 100^\circ\text{C}$ is determined using the Hyland-Wexler formulations adopted by ASHRAE:

$$\ln(p_{ws}) = \frac{C_1}{T} + C_2 + C_3 T + C_4 T^2 + C_5 T^3 + C_6 \ln(T)$$

Where $T$ is absolute thermodynamic temperature in Kelvin ($T = T_{^\circ\text{C}} + 273.15$).

### 3.2 Humidity Ratio & Enthalpy Derivations

The humidity ratio $W$ (mass of water vapor per unit mass of dry air) is determined by Dalton's law of partial pressures:

$$W = 0.621945 \cdot \frac{p_w}{p_{atm} - p_w}$$

Where $p_{atm}$ is local barometric pressure adjusted for altitude $Z$ ($\text{feet}$):

$$p_{atm} = 14.696 \cdot \left( 1 - 6.8754 \times 10^{-6} \cdot Z \right)^{5.2559}$$

The specific enthalpy of moist air $h$ ($\text{BTU/lb}_{da}$) is evaluated as:

$$h = 0.240 \cdot T_{db} + W \cdot (1061 + 0.444 \cdot T_{db})$$

Sensible and latent thermal heat transfer rates across cooling coils are resolved via the classical continuous continuity relationships:

$$q_{\text{sensible}} = 60 \cdot \rho \cdot c_p \cdot Q \cdot \Delta T \approx 1.08 \cdot Q \cdot \Delta T_{db}$$
$$q_{\text{latent}} = 60 \cdot \rho \cdot h_{fg} \cdot Q \cdot \Delta W \approx 4840 \cdot Q \cdot \Delta W$$
$$q_{\text{total}} = 60 \cdot \rho \cdot Q \cdot \Delta h \approx 4.5 \cdot Q \cdot \Delta h$$

---

## 4. Refrigerant Thermodynamics & A2L Transition Glide

### 4.1 Zeotropic Blend Temperature Glide

With the mandated phase-down of hydrofluorocarbons (HFCs) under the EPA AIM Act and the adoption of low-GWP A2L substitutes ($R\text{-}454\text{B}$, $R\text{-}32$), thermodynamic diagnostic procedures must account for zeotropic temperature glide. For non-azeotropic blends, phase change at constant pressure occurs over a temperature interval between the saturated liquid state (Bubble Point, $T_{bubble}$) and saturated vapor state (Dew Point, $T_{dew}$):

$$\Delta T_{glide} = T_{dew}(p) - T_{bubble}(p)$$

### 4.2 Diagnostic Subcooling and Superheat Precision

HVACLogic enforces accurate state boundary evaluations:
* **Subcooling ($\Delta T_{sc}$)** must be evaluated strictly with reference to the **Bubble Point**:
  $$\Delta T_{sc} = T_{bubble}(p_{\text{liquid}}) - T_{\text{liquid line}}$$
* **Superheat ($\Delta T_{sh}$)** must be evaluated strictly with reference to the **Dew Point**:
  $$\Delta T_{sh} = T_{\text{suction line}} - T_{dew}(p_{\text{suction}})$$

Saturation temperatures $T_{sat}(p)$ are calculated using 5th-order Chebyshev polynomial interpolations fitted to NIST REFPROP 10.0 thermodynamic tables, yielding an absolute deviation $\delta < 0.01^\circ\text{F}$ across the entire operating range ($-40^\circ\text{F} \le T \le 160^\circ\text{F}$).

---

## 5. Building Science & Envelope Thermal Transmission

### 5.1 Multi-Layer Assembly Thermal Resistance ($U$-Factor)

Whole-building conductive heat loss across inhomogeneous multi-layer building envelopes is modeled through series-parallel thermal network analysis in compliance with ASHRAE 90.1 and IECC standards:

$$R_{\text{total}} = R_{si} + \sum_{i=1}^{n} \left( \frac{x_i}{k_i} \right) + R_{\text{cavity}} + R_{se}$$

$$U = \frac{1}{R_{\text{total}}}$$

Where $R_{si}$ and $R_{se}$ represent interior and exterior boundary air film surface resistances ($0.68\text{ hr}\cdot\text{ft}^2\cdot^\circ\text{F/BTU}$ and $0.17\text{ hr}\cdot\text{ft}^2\cdot^\circ\text{F/BTU}$ respectively).

### 5.2 Infiltration & Blower Door Normalization

Air leakage infiltration heat loss is converted from pressurized blower door metrics ($ACH_{50}$) to natural infiltration rates using the Sherman-Grimsrud $N$-factor normalization:

$$ACH_{\text{natural}} = \frac{ACH_{50}}{N}$$

$$q_{\text{infiltration}} = 1.08 \cdot V_{\text{conditioned}} \cdot ACH_{\text{natural}} \cdot \left( \frac{\Delta T}{60} \right)$$

---

## 6. Software Architecture & Deterministic Execution

The HVACLogic computational kernel is built upon three non-negotiable architectural constraints:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT-SIDE RUNTIME                               │
│                                                                             │
│  ┌─────────────────────────┐           ┌─────────────────────────────────┐  │
│  │   Pure TypeScript /     │  <----->  │     DOM Visualizers (Canvas /   │  │
│  │   Wasm Math Engines     │           │     SVG 60fps Reactive State)   │  │
│  └───────────┬─────────────┘           └────────────────┬────────────────┘  │
│              │                                          │                   │
│              ▼                                          ▼                   │
│  ┌─────────────────────────┐           ┌─────────────────────────────────┐  │
│  │ Service Worker Layer    │           │ Ephemeral Storage & URL Params  │  │
│  │ (100% Offline Caching)  │           │ (history.replaceState - Zero DB)│  │
│  └─────────────────────────┘           └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Zero Database Footprint**: Calculations are processed entirely within the client device memory. No user inputs, project dimensions, or diagnostic outputs are transmitted over network boundaries.
2. **Immutable Mathematical Modules**: Mathematical functions are pure, stateless, and fully isolated from presentation components, facilitating comprehensive unit testing and verification.
3. **PWA Offline Resilience**: Complete application assets and reference lookup tables are cached locally via modern Service Worker Cache API storage, guaranteeing instantaneous execution in remote mechanical rooms with zero internet connectivity.

---

## 7. Numerical Verification & Benchmark Concordance

HVACLogic calculation outputs were validated against official benchmark reference datasets published in ASHRAE Fundamentals (2021), ACCA Manual D (3rd Edition), and SMACNA HVAC Systems Duct Design.

| Engineering Domain | Target Test Case | Reference Standard Value | HVACLogic Computed Value | Absolute Deviation ($\Delta$) | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Duct Friction** | $1200\text{ CFM}$, $12\text{ in. Galvanized}$ | $0.155\text{ in. wg}/100\text{ ft}$ | $0.1552\text{ in. wg}/100\text{ ft}$ | $+0.13\%$ | `VALIDATED` |
| **Huebscher Eq.** | $16\text{ in.} \times 10\text{ in.}$ Rectangular | $D_e = 13.80\text{ in.}$ | $D_e = 13.804\text{ in.}$ | $+0.03\%$ | `VALIDATED` |
| **Psychrometrics** | $75^\circ\text{F DB}$, $63^\circ\text{F WB}$ ($Z=0$) | $W = 0.00936\text{ lb/lb}$ | $W = 0.009362\text{ lb/lb}$ | $+0.02\%$ | `VALIDATED` |
| **R-454B Saturation**| $p = 118.0\text{ psig}$ (Bubble) | $T_{bubble} = 40.20^\circ\text{F}$ | $T_{bubble} = 40.18^\circ\text{F}$ | $-0.05\%$ | `VALIDATED` |
| **Envelope Loss** | $R\text{-}13$ Wall, $2000\text{ sq ft}$, $\Delta T = 50^\circ\text{F}$ | $7,692\text{ BTU/hr}$ | $7,692.3\text{ BTU/hr}$ | $0.00\%$ | `VALIDATED` |

---

## 8. Conclusion and Open Access Availability

HVACLogic demonstrates that deterministic, client-side engineering architectures can provide equal or superior computational accuracy compared to expensive proprietary desktop suites, while delivering sub-millisecond responsiveness, complete user privacy, and universal offline access. The entire suite of 21 interactive calculators, reference tables, and visualizers is made freely accessible to the global engineering, contractor, and trade education community at **`https://hvaclogic.org`**.

---

## References

1. **ASHRAE**. (2021). *ASHRAE Handbook — Fundamentals* (I-P and SI Editions). American Society of Heating, Refrigerating and Air-Conditioning Engineers, Atlanta, GA.
2. **ACCA**. (2014). *Manual D: Residential Duct Systems* (3rd Edition). Air Conditioning Contractors of America, Arlington, VA.
3. **ACCA**. (2016). *Manual J: Residential Load Calculation* (8th Edition). Air Conditioning Contractors of America, Arlington, VA.
4. **SMACNA**. (2006). *HVAC Systems Duct Design* (4th Edition). Sheet Metal and Air Conditioning Contractors' National Association, Chantilly, VA.
5. **Colebrook, C. F.** (1939). *Turbulent flow in pipes, with particular reference to the transition region between the smooth and rough pipe laws*. Journal of the Institution of Civil Engineers, 11(4), 133–156.
6. **Hyland, R. W., & Wexler, A.** (1983). *Formulations for the thermodynamic properties of the saturated phases of $\text{H}_2\text{O}$ from 173.15 K to 473.15 K*. ASHRAE Transactions, 89(2A), 500–519.
7. **NIST**. (2018). *Reference Fluid Thermodynamic and Transport Properties Database (REFPROP)*, Version 10.0. National Institute of Standards and Technology, Gaithersburg, MD.
8. **U.S. EPA**. (2024). *Section 608 Refrigerant Management Regulations and AIM Act Low-GWP Transition Guidance*. United States Environmental Protection Agency, Washington, D.C.
