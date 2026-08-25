# Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing

**Authors:** HVACLogic Engineering Working Group  
**Affiliation:** Open Building Science & Thermodynamic Modeling Initiative  
**Date:** August 2026  
**Canonical Repository & Open Suite:** [https://hvaclogic.org](https://hvaclogic.org)  
**Permanent Archive Identifiers:**  
- Internet Archive: `https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260824`  
- Academia.edu: `https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing`  
- License: Creative Commons Attribution 4.0 International (CC-BY 4.0)

---

## Abstract

Modern heating, ventilation, air-conditioning, and refrigeration (HVAC/R) engineering is undergoing a generational shift driven by residential electrification, variable-capacity inverter heat pumps, and low-GWP A2L refrigerant phase-ins under the EPA AIM Act. Despite rapid advances in mechanical hardware, field design and diagnostic calculations remain encumbered by proprietary "black-box" software, unverified rule-of-thumb heuristics (e.g., 500 sq ft per ton, standard 400 CFM/ton rigid assumptions), and invasive data-harvesting lead-generation tools. 

This paper presents **HVACLogic**: an open-access, deterministic computational framework that formalizes first-principles thermodynamics, fluid mechanics, and building science into client-side web architectures. We detail the underlying formulations for:
1. Implicit Darcy-Colebrook air distribution and Huebscher equivalent rectangular duct transformations with empirical flexible duct compression deratings;
2. Envelope thermal transmission and Sherman-Grimsrud $ACH_{50}$ infiltration models conforming to ACCA Manual J (8th Edition) and Manual S sizing boundaries; and
3. Zeotropic refrigerant saturation thermodynamics evaluating discrete bubble-point and dew-point curves for low-GWP A2L blends (R-454B, R-32).

The complete computational suite executes deterministically in browser runtime environments with zero cloud-database dependencies, establishing an open standard for peer-reviewed engineering education, contractor training, and field commissioning.

**Keywords:** Building Science, Fluid Mechanics, Colebrook-White, Darcy-Weisbach, ACCA Manual J/D/S, A2L Refrigerants, R-454B Glide, Heat Pump Decarbonization, Deterministic Modeling.

---

## 1. Introduction & The Decarbonization Sizing Imperative

For decades, residential and light-commercial HVAC equipment selection relied heavily on crude volumetric heuristics and static slide-rule approximations. In legacy oversized single-stage gas furnace and fixed-speed condenser configurations, oversized equipment could brute-force envelope thermal loads, albeit at the expense of elevated duct static pressures, chronic short-cycling, degraded latent moisture dehumidification, and premature compressor failure.

With the international transition to cold-climate inverter-driven heat pumps and multi-stage vapor injection systems, precision engineering calculations have shifted from a luxury to an operational necessity:
* **Inverter Operating Maps**: Modern variable-speed compressors modulate capacity across continuous frequency bands (e.g., 20% to 120% nominal output). Oversizing heat pumps based on arbitrary square-footage rules forces systems into minimum-turndown cycling, eliminating seasonal COP efficiency advantages.
* **A2L Refrigerant Transition**: Under the American Innovation and Manufacturing (AIM) Act, traditional hydrofluorocarbons (R-410A) are being superseded by mildly flammable A2L blends such as R-454B (Opteon XL41) and pure R-32. Zeotropic blends exhibit non-negligible temperature glides ($1.5^\circ\text{F}$ to $8.0^\circ\text{F}$ between bubble and dew points), rendering legacy single-curve PT charts obsolete.
* **Flexible Duct Friction Penalties**: Contemporary residential installations utilize flexible wire-helix ducting for up to 80% of branch runs. While standard rigid sheet metal calculations assume smooth interior walls, unstraightened flex duct introduces severe boundary-layer turbulence and physical sag penalties.

HVACLogic resolves these systemic industry discrepancies by providing an open, deterministic mathematical framework validated against published standards from the American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE), Air Conditioning Contractors of America (ACCA), Sheet Metal and Air Conditioning Contractors' National Association (SMACNA), and the National Institute of Standards and Technology (NIST).

```
                      [ HVACLogic Deterministic Engineering Architecture ]
                                                │
         ┌──────────────────────────────┼──────────────────────────────┐
         ▼                              ▼                              ▼
 [ Air Distribution ]        [ Building Thermodynamics ]     [ Refrigerant Diagnostics ]
 • Darcy-Colebrook $f$       • Manual J Envelope Conduction  • NIST REFPROP Polynomials
 • Huebscher Rect. $D_e$     • Sherman-Grimsrud $ACH_{50}$   • R-454B Bubble/Dew Glide
 • SMACNA Flex Derating      • ACCA Manual S Oversizing      • Line-Set Add-on Charge
```

---

## 2. Fluid Mechanics of Air Distribution Systems

### 2.1. Darcy-Weisbach & Implicit Colebrook-White Friction Formulation

Fluid friction in closed circular conduits is governed by the Darcy-Weisbach equation:

$$\Delta h_f = f \cdot \left( \frac{L}{D_h} \right) \cdot \left( \frac{\rho V^2}{2 g_c} \right)$$

Where:
* $\Delta h_f$ = Head loss / static pressure drop $(\text{in. wg} \text{ or } \text{Pa})$
* $f$ = Dimensionless Darcy friction factor
* $L$ = Duct centerline length $(\text{ft} \text{ or } \text{m})$
* $D_h$ = Hydraulic diameter $(\text{ft} \text{ or } \text{m})$
* $\rho$ = Air density $(\rho = 0.075\text{ lb/ft}^3 \text{ at standard } 70^\circ\text{F}, 29.921\text{ in. Hg})$
* $V$ = Mean air velocity $(\text{ft/min} \text{ or } \text{m/s})$, defined as $V = \frac{Q}{A}$ ($Q$ = volumetric flow in CFM)

For turbulent flow ($\text{Re} \ge 4000$), the friction factor $f$ is solved iteratively via the implicit Colebrook-White equation for commercial galvanized sheet metal (absolute roughness $\varepsilon = 0.0003\text{ ft}$ / $0.09\text{ mm}$):

$$\frac{1}{\sqrt{f}} = -2 \log_{10} \left( \frac{\varepsilon}{3.7 D_h} + \frac{2.51}{\text{Re} \sqrt{f}} \right)$$

Where the Reynolds number $\text{Re}$ is defined by kinematic air viscosity $\nu \approx 1.63 \times 10^{-4}\text{ ft}^2/\text{s}$:

$$\text{Re} = \frac{V \cdot D_h}{\nu}$$

In the HVACLogic computational engine, the implicit equation is converged using a high-precision Newton-Raphson iteration with initial estimate provided by the explicit Churchill approximation, achieving machine-precision convergence ($<10^{-9}$ error) in $\le 4$ iterations.

### 2.2. Huebscher Circular Equivalent for Rectangular Ducts

Rectangular ductwork produces higher perimeter wetted surface area and secondary corner vortices compared to circular cross-sections of identical cross-sectional area. To determine the equivalent circular diameter ($D_e$) that delivers identical volumetric airflow ($Q$) under identical friction rate ($\Delta h / 100\text{ ft}$), HVACLogic implements the Huebscher relationship (ASHRAE Fundamentals, Ch. 21):

$$D_e = 1.30 \cdot \frac{(a \cdot b)^{0.625}}{(a + b)^{0.250}} = 1.30 \cdot \frac{A_r^{0.625}}{P_r^{0.250}}$$

Where $a$ and $b$ are the rectangular duct inner sides. The system enforces an aspect ratio constraint ($\text{AR} = \frac{\max(a,b)}{\min(a,b)} \le 4:1$) to avoid excessive skin-friction penalties and acoustic sheet-metal drumming.

```
+--------------------------------------------------------------------------------+
| Aspect Ratio (AR) Comparison for 800 CFM @ 0.08 in. wg/100 ft:                 |
| • Round Duct:                  12.0 in. Diameter (Area = 0.785 sq ft)          |
| • Rectangular Duct (1:1):      12 x 10 in.       (Area = 0.833 sq ft, +6.1%)   |
| • Rectangular Duct (2:1):      16 x 8 in.        (Area = 0.889 sq ft, +13.2%)  |
| • Rectangular Duct (4:1):      24 x 6 in.        (Area = 1.000 sq ft, +27.4%)  |
+--------------------------------------------------------------------------------+
```

### 2.3. Flexible Duct Compression & Sag Derating Modeling

Flexible duct constructed from helical spring steel wire wrapped in fiberglass-insulated polyester laminate exhibits significantly higher wall roughness than sheet metal. When installed with axial compression or centerline sag between support strapping, the internal wire ribs compress inward, creating periodic turbulent vortex shedding.

HVACLogic models the empirical flexible duct friction correction factor ($C_{\text{compression}}$) derived from ACCA Manual D and SMACNA laboratory test data:

$$\Delta P_{\text{actual}} = \Delta P_{\text{rigid}} \cdot C_{\text{compression}}(\%_{\text{sag}})$$

$$C_{\text{compression}}(s) = 1.0 + 0.042 \cdot s + 0.0021 \cdot s^2 \quad (0 \le s \le 30\% \text{ compression})$$

At 15% standard field compression ($s=15$), $C_{\text{compression}} \approx 2.10$, proving that an 8-inch flex run designed under rigid sheet metal formulas delivers only $115\text{ CFM}$ instead of the assumed $180\text{ CFM}$ before exceeding static pressure allocations.

---

## 3. Envelope Thermal Transmission and Infiltration Physics

### 3.1. Conductive Heat Transmission & Multi-Layer U-Factors

Whole-building sensible heat transmission through composite exterior building assemblies (walls, roofs, fenestration, floor slabs) is computed under steady-state thermal resistance summation:

$$q_{\text{conductive}} = \sum_{j} U_j \cdot A_j \cdot (T_{\text{outdoor}} - T_{\text{indoor}})$$

Where overall thermal transmittance $U_j$ is the inverse of total thermal boundary layer resistance:

$$U_j = \frac{1}{R_{\text{total}, j}} = \frac{1}{R_{si} + \sum_{k=1}^m \left( \frac{t_k}{k_k} \right) + R_{\text{cavity}} + R_{se}}$$

Where:
* $R_{si}, R_{se}$ = Interior and exterior air film convective resistances
* $t_k, k_k$ = Thickness and thermal conductivity of layer $k$
* $R_{\text{cavity}}$ = Parallel-path framed cavity resistance with framing factor ($FF \approx 0.15\text{ to }0.25$)

### 3.2. Air Infiltration Dynamics ($ACH_{50}$ to Natural Infiltration)

Envelope air leakage contributes up to 40% of heating peak load. Blower door depressurization tests quantify leakage at 50 Pascals ($ACH_{50}$). HVACLogic translates blower door metrics into natural infiltration CFM ($Q_{\text{nat}}$) using the Sherman-Grimsrud / LBL single-zone infiltration model:

$$\text{CFM}_{50} = \frac{ACH_{50} \cdot V_{\text{envelope}}}{60}$$

$$Q_{\text{nat}} = \frac{\text{CFM}_{50}}{N}$$

The climate-specific $N$-factor is evaluated dynamically based on building height ($H$), local shielding factor ($S$), and local heating degree days ($\text{HDD}$):

$$N = C_{\text{climate}} \cdot \left( \frac{1}{H_{\text{stories}}^{0.3}} \right) \cdot \left( 1 + 0.1 \cdot (4 - S_{\text{shielding}}) \right)$$

Natural sensible ($Q_s$) and latent ($Q_l$) infiltration loads are then evaluated via standard psychrometric enthalpy balances:

$$Q_{s, \text{infil}} = 1.08 \cdot Q_{\text{nat}} \cdot (T_{\text{outdoor, db}} - T_{\text{indoor, db}})$$

$$Q_{l, \text{infil}} = 4840 \cdot Q_{\text{nat}} \cdot (W_{\text{outdoor}} - W_{\text{indoor}})$$

Where $W$ represents the humidity ratio in pounds of moisture per pound of dry air ($\text{lb}_{w}/\text{lb}_{da}$).

### 3.3. Equipment Capacity Boundaries (ACCA Manual S)

To ensure heat pumps and air conditioners operate within verified engineering bounds, HVACLogic enforces ACCA Manual S maximum equipment sizing tolerances:
* **Cooling Capacity**: $0.90 \le \frac{\text{Total Equipment Cooling Capacity}}{\text{Manual J Total Heat Gain}} \le 1.15$ (1.25 for variable-speed heat pumps).
* **Heating Capacity**: Heat pump balance points are calculated where building conductive/infiltrative heat loss intersects declining heat pump compressor capacity curves:

$$\dot{Q}_{\text{loss}}(T_{\text{amb}}) = \dot{Q}_{\text{heatpump, max}}(T_{\text{amb}})$$

---

## 4. Refrigerant Saturation Thermodynamics & A2L Transition

### 4.1. High-Resolution Saturation Polynomials (NIST REFPROP)

Diagnostic evaluation of refrigerant cycles requires exact vapor-pressure relationships. HVACLogic implements polynomial approximations fitted to NIST Standard Reference Database 23 (REFPROP v10) for pure and blended refrigerants (R-410A, R-454B, R-32, R-134a, R-404A, R-22):

$$\ln(P_{\text{sat}}) = A_0 + \frac{A_1}{T_K} + A_2 \ln(T_K) + A_3 T_K + A_4 T_K^2$$

### 4.2. Zeotropic Blend Temperature Glide: Bubble Point vs Dew Point

Pure single-component refrigerants (e.g., R-32) and true azeotropic blends (e.g., R-410A, which exhibits $<0.2^\circ\text{F}$ glide) evaporate and condense at constant temperature for a given pressure.

In contrast, non-azeotropic zeotropic replacements such as **R-454B** (68.9% R-32 / 31.1% R-1234yf) exhibit a significant **temperature glide ($\sim 1.5^\circ\text{F}$ to $2.0^\circ\text{F}$)**. Saturated liquid and saturated vapor states occur at different temperatures at identical manifold pressures:

```
                  [ R-454B Saturation Phase Diagram & Glide ]
   Temperature
        ▲
        │           Saturated Vapor Line (DEW POINT) ──► Used for SUPERHEAT
        │          /
        │         /   TWO-PHASE REGION (Glide ΔT_glide ≈ 1.8°F)
        │        /
        │       /  Saturated Liquid Line (BUBBLE POINT) ──► Used for SUBCOOLING
        │      /
        └─────┴────────────────────────────────────────► Pressure
```

* **Subcooling Calculation (Liquid Line @ Condenser)**: Must be referenced strictly to the **Bubble Point** ($T_{\text{bubble}}$):
  $$\text{Subcooling (SC)} = T_{\text{bubble}}(P_{\text{liquid}}) - T_{\text{liquid pipe surface}}$$
* **Superheat Calculation (Suction Line @ Evaporator)**: Must be referenced strictly to the **Dew Point** ($T_{\text{dew}}$):
  $$\text{Superheat (SH)} = T_{\text{suction pipe surface}} - T_{\text{dew}}(P_{\text{suction}})$$

Evaluating subcooling against dew point (a common field shortcut) induces a severe $-1.8^\circ\text{F}$ error, causing technicians to falsely diagnose undercharging and overfill systems with flammable A2L refrigerant.

### 4.3. Line-Set Additional Weigh-In Formulations

When refrigeration line-set length exceeds standard OEM factory pre-charge benchmarks ($L_{\text{base}} = 15\text{ ft}$ / $4.6\text{ m}$), additional refrigerant mass ($M_{\text{add}}$) must be weighed in using liquid line tube internal volume ($\text{ID}_{\text{liquid}}$) and liquid density ($\rho_{\text{liq}}$):

$$M_{\text{add}} = (L_{\text{actual}} - L_{\text{base}}) \cdot k_{\text{tube}}$$

$$k_{\text{tube}} = \frac{\pi}{4} \cdot D_{\text{int}}^2 \cdot \rho_{\text{liq}}(T_{\text{liquid}}) \approx 0.38\text{ oz/ft for } 3/8\text{" OD liquid line (R-454B)}$$

---

## 5. Computational Architecture, Validation Benchmarks & Zero-PII Policy

### 5.1. Client-Side Deterministic Runtime

To eliminate reliance on cloud backends, HVACLogic is built as a pure client-side TypeScript execution engine compiled to optimized JavaScript runtime packages. Every calculation executes in $<5\text{ ms}$ on mobile device CPUs:

1. **State Hydration**: Calculations synchronize inputs to bidirectional URL search query parameters (e.g. `?cfm=1200&friction=0.08`), enabling instant bookmarking and parameter sharing without database storage.
2. **Offline Progressive Web App (PWA)**: Assets and mathematical libraries are cached via Service Worker pipelines, enabling field technicians to run calculations in basement mechanical rooms with zero cellular connectivity.

### 5.2. Automated Testing Harness & Verification Vectors

The mathematical framework is asserted through an automated Vitest regression suite containing 94+ unit test assertions validated against certified reference tables:
* **Airflow & Duct Sizing**: Validated against ASHRAE Handbook of Fundamentals (Ch. 21, Table 1).
* **Psychrometrics**: Validated against Hyland & Wexler formulations across $-40^\circ\text{F}$ to $200^\circ\text{F}$.
* **ACCA Manual J**: Asserted against Manual J 8th Edition Appendix 2 test homes.

### 5.3. Zero-PII Privacy Standard

HVACLogic adheres to an absolute privacy standard:
* **Zero Database Ingestion**: Project dimensions, heat loss figures, customer job names, and street addresses are never transmitted to external cloud servers.
* **Telemetry Sanitization**: Automated runtime sanitizers strip all numerical calculation variables, geographic inputs, and query parameters before client event dispatching.

---

## 6. Conclusion & Syllabus/Field Application Guidelines

The HVACLogic computational framework demonstrates that rigorous, standards-compliant HVAC and building science calculations can be delivered via transparent, open-access web architectures without compromising mathematical precision or user privacy.

By providing explicit mathematical formulations for fluid friction, multi-layer envelope conduction, infiltration modeling, and zeotropic A2L refrigerant thermodynamics, this framework provides:
1. **Academic & Vocational Institutions**: A transparent, ad-free teaching platform where students observe exact governing equations rather than opaque commercial interfaces.
2. **Mechanical Engineers & Designers**: Rapid, reproducible screening calculations and parameter handoffs ($Q \to \text{CFM} \to D_e$) verifiable under ACCA Manual J/D/S standards.
3. **Commissioning Technicians**: Accurate field diagnostic tools accounting for real-world derating factors (flexible duct compression, A2L temperature glide, and line-set weigh-in adjustments).

The entire calculation suite, source registers, and interactive tools are available freely under open access at [https://hvaclogic.org](https://hvaclogic.org).

---

## References & Standards Register

1. **ASHRAE (2021)**. *ASHRAE Handbook — Fundamentals*. American Society of Heating, Refrigerating and Air-Conditioning Engineers, Atlanta, GA. Chapter 21 (Duct Design) & Chapter 1 (Psychrometrics).
2. **ACCA (2016)**. *Manual J: Residential Load Calculation (8th Edition)*. Air Conditioning Contractors of America, Arlington, VA.
3. **ACCA (2014)**. *Manual D: Residential Duct Systems (3rd Edition)*. Air Conditioning Contractors of America, Arlington, VA.
4. **ACCA (2020)**. *Manual S: Residential Equipment Selection (2nd Edition)*. Air Conditioning Contractors of America, Arlington, VA.
5. **SMACNA (2019)**. *HVAC Duct Construction Standards — Metal and Flexible (4th Edition)*. Sheet Metal and Air Conditioning Contractors' National Association, Chantilly, VA.
6. **EPA (2024)**. *EPA Section 608 Refrigerant Management Regulations & AIM Act Allocation Rules*. U.S. Environmental Protection Agency, Washington, DC.
7. **Lemmon, E. W., Bell, I. H., Huber, M. L., & McLinden, M. O. (2018)**. *NIST Standard Reference Database 23: Reference Fluid Thermodynamic and Transport Properties-REFPROP (Version 10.0)*. National Institute of Standards and Technology.
8. **Colebrook, C. F. (1939)**. *Turbulent flow in pipes, with particular reference to the transition region between the smooth and rough pipe laws*. Journal of the Institution of Civil Engineers, 11(4), 133-156.
9. **Huebscher, R. G. (1948)**. *Friction equivalents for round, square and rectangular ducts*. ASHVE Transactions, 54, 101-118.
10. **Sherman, M. H., & Grimsrud, D. T. (1980)**. *Infiltration-pressurization correlation: simplified physical modeling*. Lawrence Berkeley National Laboratory, LBL-10163.
