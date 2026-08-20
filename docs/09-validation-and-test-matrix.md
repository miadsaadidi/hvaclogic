# HVAC Lab — Quality, Validation & Test Matrix

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [08-engineering-source-register.md](./08-engineering-source-register.md), [04-engineering-formulas-and-algorithms.md](./04-engineering-formulas-and-algorithms.md), [10-implementation-roadmap.md](./10-implementation-roadmap.md)

---

## 1. Quality Assurance & Testing Framework

To ensure that no calculator ships with mathematical errors, unhandled boundary states, conversion drift, or broken UI workflows, HVAC Lab mandates a **6-Layer Quality Assurance Matrix**:

```
Layer 1: Unit Tests (Math functions, unit conversions, string formatting via Vitest)
Layer 2: Golden Reference Tests (Independently verified engineering benchmarks)
Layer 3: Boundary & Clamp Tests (Min/Max limits, zero-division, extreme values)
Layer 4: Invalid State & Error Handling Tests (Negative values, impossible states)
Layer 5: Cross-Tool Integration Tests (URL parameter serialization & hydration)
Layer 6: End-to-End Browser Tests (Mandatory Playwright test suite for EVERY calculator)
```

---

## 2. Mandatory Per-Calculator End-to-End (E2E) Test Contract

> **MANDATORY POLICY**: Every single calculator built **must include a dedicated Playwright E2E spec file** (`tests/e2e/[calculator-id].spec.ts`) before it can be marked as complete or promoted to production.

### Standard E2E Test Suite Scope for Each Calculator:
1. **Initial Render & Hydration Test**: Verifies page loads with default preset values, pre-rendered JSON-LD schema, direct answer card, and all interactive controls active.
2. **Interactive Recalculation Flow**: Simulates user input changes (typing into numeric fields, dragging range sliders, selecting preset chips) and asserts that the primary result and engineering breakdown update accurately in real-time.
3. **Dual-Unit Toggle Verification**: Clicks Imperial $\leftrightarrow$ Metric toggle and verifies all inputs, outputs, labels, and formulas switch instantly without mathematical rounding drift.
4. **URL Parameter State Sync & Deep-Link Test**: Verifies that adjusting inputs updates the URL query string (`window.history.replaceState`) and that navigating directly to that parameterized URL hydrates the calculator inputs and outputs identically.
5. **Mobile Viewport & Sticky Result Bar Test**: Emulates mobile screen ($375\times667\text{px}$ iPhone viewport), scrolls down through inputs, and asserts that the persistent `MobileResultBar` appears with the correct live calculated value.
6. **Action Buttons Verification**: Clicks "Share Link" (asserts clipboard copy toast), "Export CSV" (asserts file download), "Print Job Card" (asserts `@media print` layout), and "Embed Tool" (asserts modal opens with clean iframe code).
7. **Accessibility & Keyboard Navigation Test**: Tabs through all interactive elements and confirms visible focus states and accessible ARIA attributes.

---

## 3. Master Golden Reference Test Suite (By Calculator)

---

### 1. `ductulator` (Digital Ductulator)
* **Test ID**: `GOLD-DUCT-01` | **E2E Spec**: `tests/e2e/ductulator.spec.ts`
* **Source Authority**: ASHRAE Handbook—Fundamentals 2021, Ch. 21 / SMACNA HVAC Duct Design
* **Inputs**:
  * Airflow ($Q$): `1,200 CFM`
  * Friction Rate ($hf$): `0.080 in. wg / 100 ft`
  * Material: Galvanized Sheet Metal ($\epsilon = 0.0003\text{ ft}$)
* **Expected Results**:
  * Equivalent Round Diameter ($D_e$): `14.2 in` ($\pm 0.1\text{ in}$)
  * Rectangular equivalent (lock height = 10 in): Width = `17.4 in` (standard fabrication size: `18" x 10"`)
  * Air Velocity in round duct: `1,087 FPM` ($\pm 5\text{ FPM}$)
* **Edge & Boundary Cases**:
  * Lower Bound: $Q = 10\text{ CFM}$, $hf = 0.01\text{ in.wg}$ $\to$ $D_e = 2.1\text{ in}$ (Pass).
  * Upper Bound: $Q = 50,000\text{ CFM}$, $hf = 0.50\text{ in.wg}$ $\to$ $D_e = 52.4\text{ in}$ (Pass).
* **Invalid Input Rejection**:
  * $Q = 0$ or $Q < 0$ $\to$ Validation error: `"Airflow must be greater than 0 CFM"`.
  * $hf = 0$ or $hf < 0$ $\to$ Validation error: `"Friction rate must be greater than 0 in.wg/100ft"`.

---

### 2. `flex-duct-cfm-chart` (Flex Duct Sizing Tool)
* **Test ID**: `GOLD-FLEX-01` | **E2E Spec**: `tests/e2e/flex-duct-cfm-chart.spec.ts`
* **Source Authority**: Air Diffusion Council (ADC) Flexible Duct Performance Tables
* **Inputs**:
  * Diameter ($D$): `8.0 in`
  * Friction Rate ($hf$): `0.100 in. wg / 100 ft`
  * Compression Ratio: `4%` (Standard Installation)
* **Expected Results**:
  * Airflow Capacity: `160 CFM` ($\pm 5\text{ CFM}$)
* **Derate Verification**:
  * At 15% Compression (Moderate Sag): Airflow reduces to `130 CFM` ($\approx 19\%\text{ derate}$).
  * At 30% Compression (Severe Sag): Airflow reduces to `100 CFM` ($\approx 38\%\text{ derate}$).

---

### 3. `cfm-calculator` (HVAC CFM Airflow Sizer)
* **Test ID**: `GOLD-CFM-01` | **E2E Spec**: `tests/e2e/cfm-calculator.spec.ts`
* **Source Authority**: ASHRAE Sensible Heat Equation
* **Inputs**:
  * Sensible Heat Load ($Q_{\text{sensible}}$): `36,000 BTU/hr` (3 Tons)
  * Supply Air Temp ($T_{\text{supply}}$): `55.0 °F`
  * Return Air Temp ($T_{\text{return}}$): `75.0 °F` ($\Delta T = 20.0^\circ\text{F}$)
* **Expected Results**:
  * Required Airflow: $\text{CFM} = \frac{36000}{1.08 \times 20} = 1,666.7\text{ CFM} \to \mathbf{1,667\text{ CFM}}$ ($\pm 1\text{ CFM}$).
* **Invalid Input Rejection**:
  * $T_{\text{supply}} = T_{\text{return}}$ ($\Delta T = 0$) $\to$ Error: `"Temperature difference must be greater than 0°F"`.

---

### 4. `kitchen-hood-cfm` (Kitchen Range Hood Sizer)
* **Test ID**: `GOLD-HOOD-01` | **E2E Spec**: `tests/e2e/kitchen-hood-cfm.spec.ts`
* **Source Authority**: HVI 916 / International Residential Code (IRC M1503.6)
* **Inputs**:
  * Appliance Type: Gas Cooktop
  * Total Burner Rating: `60,000 BTU/hr`
  * Mounting: Island Mount ($1.5\times$)
* **Expected Results**:
  * Base CFM: $60000 / 100 = 600\text{ CFM}$
  * Island Adjusted CFM: $600 \times 1.5 = \mathbf{900\text{ CFM}}$
  * Make-Up Air Code Alert: **TRIGGERED** (Reason: $900\text{ CFM} > 400\text{ CFM}$ threshold).

---

### 5. `btu-calculator` (Whole-Home BTU Load Master)
* **Test ID**: `GOLD-LOAD-01` | **E2E Spec**: `tests/e2e/btu-calculator.spec.ts`
* **Source Authority**: ACCA Manual J 8th Edition Screening Benchmark
* **Inputs**:
  * Conditioned Area: `2,000 sq ft`, Ceiling: `9 ft`
  * Climate Zone: Zone 4 (Design: $93^\circ\text{F}$ Summer, $15^\circ\text{F}$ Winter)
  * Insulation: Average (R-13 Walls, R-30 Ceiling, Double Low-E Glass)
  * Occupants: 4
* **Expected Results**:
  * Sensible Cooling Load: `28,500 BTU/hr` ($\pm 10\%$)
  * Total Cooling Load: `34,200 BTU/hr` $\to$ **2.85 Tons** (Nominal recommendation: **3.0 Ton System**)
  * Total Heating Load: `48,000 BTU/hr` ($\pm 10\%$).

---

### 6. `ac-tonnage-calculator` (AC Tonnage Sizer)
* **Test ID**: `GOLD-TON-01` | **E2E Spec**: `tests/e2e/ac-tonnage-calculator.spec.ts`
* **Source Authority**: ACCA Manual S Sizing Heuristics
* **Inputs**:
  * Floor Area: `1,500 sq ft`
  * Climate: Moderate (Zone 4)
* **Expected Results**:
  * Calculated Tonnage: `2.5 Tons (30,000 BTU/hr)`
  * Recommended Airflow: `1,000 CFM` (at 400 CFM/ton).

---

### 7. `ac-model-decoder` (HVAC Model Number Decoder)
* **Test ID**: `GOLD-MODEL-01` | **E2E Spec**: `tests/e2e/ac-model-decoder.spec.ts`
* **Source Authority**: OEM Nomenclature Manuals (Carrier, Trane, Goodman, Lennox, Rheem, York)
* **Test Cases**:
  1. Input: `"4TTR6036A1000A"` (Trane) $\to$ Brand: `Trane / American Standard`, Capacity: **36,000 BTU / 3.0 Tons**, Airflow: `1,200 CFM`.
  2. Input: `"GSX160241FE"` (Goodman) $\to$ Brand: `Goodman / Amana`, Capacity: **24,000 BTU / 2.0 Tons**, Airflow: `800 CFM`.
  3. Input: `"24ABC648A003"` (Carrier) $\to$ Brand: `Carrier / Bryant`, Capacity: **48,000 BTU / 4.0 Tons**, Airflow: `1,600 CFM`.
  4. Input: `"XC21-060-230"` (Lennox) $\to$ Brand: `Lennox`, Capacity: **60,000 BTU / 5.0 Tons**, Airflow: `2,000 CFM`.
  5. Input: `"RA1618AJ1NA"` (Rheem) $\to$ Brand: `Rheem / Ruud`, Capacity: **18,000 BTU / 1.5 Tons**, Airflow: `600 CFM`.
  6. Input: `"INVALID123XYZ"` $\to$ Result: `null` (Clean fallback prompt without crashing).

---

### 8. `mini-split-sizing` (Mini-Split Multi-Zone Sizer)
* **Test ID**: `GOLD-MS-01` | **E2E Spec**: `tests/e2e/mini-split-sizing.spec.ts`
* **Source Authority**: Ductless Multi-Zone Inverter Engineering Manuals
* **Inputs**:
  * Zone 1 (Master Bedroom, 300 sq ft): `9,000 BTU/hr`
  * Zone 2 (Living Room, 500 sq ft): `15,000 BTU/hr`
  * Zone 3 (Office, 200 sq ft): `7,000 BTU/hr`
* **Expected Results**:
  * Total Connected Head Capacity: `31,000 BTU/hr`
  * Recommended Outdoor Condenser: **30,000 to 36,000 BTU Multi-Port Unit** (Diversity factor $1.03\times$).

---

### 9. `superheat-subcooling-calculator` (Diagnostic Tool)
* **Test ID**: `GOLD-SHSC-01` | **E2E Spec**: `tests/e2e/superheat-subcooling-calculator.spec.ts`
* **Source Authority**: EPA Section 608 Study Guide / AHRI Standard 210/240
* **Fixed Orifice Mode Test**:
  * Outdoor Dry Bulb ($T_{\text{db,out}}$): `95.0 °F`
  * Indoor Return Wet Bulb ($T_{\text{wb,in}}$): `67.0 °F`
  * Refrigerant: **R-410A**
  * Suction Pressure: `118.0 psig` $\to T_{\text{sat}} = 40.0^\circ\text{F}$
  * Suction Line Temp: `54.0 °F`
  * **Calculations**:
    * $\text{Target Superheat} = \frac{3 \times 67 - 95 - 80}{2} = \mathbf{13.0^\circ\text{F}}$
    * $\text{Actual Superheat} = 54.0 - 40.0 = \mathbf{14.0^\circ\text{F}}$
    * $\text{Diagnosis}: |\text{Actual} - \text{Target}| = 1.0^\circ\text{F} \le 3^\circ\text{F} \implies$ 🟢 **Optimal Charge**.
* **TXV Mode Test (Zeotropic Glide R-454B)**:
  * Refrigerant: **R-454B**
  * Liquid Pressure: `335.0 psig` $\to \text{Bubble Temp } T_{\text{bubble}} = 104.2^\circ\text{F}$
  * Liquid Line Temp: `94.0 °F`
  * Manufacturer Target Subcooling: `10.0 °F`
  * **Calculations**:
    * $\text{Actual Subcooling} = 104.2 - 94.0 = \mathbf{10.2^\circ\text{F}}$
    * $\text{Diagnosis}: |10.2 - 10.0| = 0.2^\circ\text{F} \implies$ 🟢 **Optimal Charge**.

---

### 10. `pt-chart` (Refrigerant Pressure-Temperature Chart)
* **Test ID**: `GOLD-PT-01` | **E2E Spec**: `tests/e2e/pt-chart.spec.ts`
* **Source Authority**: NIST REFPROP v10.0 / Chemours Opteon XL41 Data
* **Test Points (Pressure $\to$ Saturation Temp)**:
  1. **R-410A**: $118.0\text{ psig} \to 40.0^\circ\text{F} \pm 0.1^\circ\text{F}$; $335.0\text{ psig} \to 103.5^\circ\text{F} \pm 0.1^\circ\text{F}$.
  2. **R-32**: $120.0\text{ psig} \to 38.6^\circ\text{F} \pm 0.1^\circ\text{F}$; $340.0\text{ psig} \to 102.1^\circ\text{F} \pm 0.1^\circ\text{F}$.
  3. **R-454B (Bubble)**: $335.0\text{ psig} \to 104.2^\circ\text{F} \pm 0.1^\circ\text{F}$.
  4. **R-454B (Dew)**: $118.0\text{ psig} \to 41.5^\circ\text{F} \pm 0.1^\circ\text{F}$.
  5. **R-22**: $68.5\text{ psig} \to 40.0^\circ\text{F} \pm 0.1^\circ\text{F}$; $226.0\text{ psig} \to 110.0^\circ\text{F} \pm 0.1^\circ\text{F}$.
  6. **R-134a**: $35.0\text{ psig} \to 40.0^\circ\text{F} \pm 0.1^\circ\text{F}$; $124.0\text{ psig} \to 100.0^\circ\text{F} \pm 0.1^\circ\text{F}$.

---

### 11. `psychrometric-calculator` (Moist Air State Point Solver)
* **Test ID**: `GOLD-PSY-01` | **E2E Spec**: `tests/e2e/psychrometric-calculator.spec.ts`
* **Source Authority**: ASHRAE Handbook—Fundamentals 2021, Ch. 1, Table 1
* **Inputs**:
  * Dry Bulb Temp ($T_{\text{db}}$): `75.0 °F`
  * Relative Humidity ($\text{RH}$): `50.0 %`
  * Atmospheric Pressure ($P_{\text{atm}}$): `14.696 psia` (Sea Level)
* **Expected Results**:
  * Wet Bulb Temp ($T_{\text{wb}}$): `62.5 °F` ($\pm 0.1^\circ\text{F}$)
  * Dew Point Temp ($T_{\text{dp}}$): `55.1 °F` ($\pm 0.1^\circ\text{F}$)
  * Humidity Ratio ($W$): `0.00927 lb/lb` = `64.9 grains/lb` ($\pm 0.2\text{ grains/lb}$)
  * Enthalpy ($h$): `28.12 BTU/lb` ($\pm 0.05\text{ BTU/lb}$)
  * Specific Volume ($v$): `13.68 ft³/lb` ($\pm 0.02\text{ ft}^3/\text{lb}$).

---

### 12. `heat-pump-size-calculator` (Balance Point & Backup Heat)
* **Test ID**: `GOLD-HP-01` | **E2E Spec**: `tests/e2e/heat-pump-size-calculator.spec.ts`
* **Source Authority**: ASHRAE Systems & Equipment / NEEP Cold-Climate Sizing
* **Inputs**:
  * Building Heat Loss @ $15^\circ\text{F}$ design: `45,000 BTU/hr`
  * Heat Pump Rated Heating @ $47^\circ\text{F}$: `36,000 BTU/hr`
  * Heat Pump Output @ $17^\circ\text{F}$: `22,000 BTU/hr`
* **Expected Results**:
  * Thermal Balance Point: `28.5 °F` ($\pm 1.0^\circ\text{F}$)
  * Auxiliary Electric Heat Strip Needed @ $15^\circ\text{F}$: $\frac{45,000 - 20,500}{3,412} = \mathbf{7.2\text{ kW}}$ (Select **8 kW or 10 kW strip**).

---

### 13. `furnace-size-calculator` (AFUE Output Sizer)
* **Test ID**: `GOLD-FURN-01` | **E2E Spec**: `tests/e2e/furnace-size-calculator.spec.ts`
* **Source Authority**: DOE 10 CFR Part 430
* **Inputs**:
  * Furnace Input Rating: `80,000 BTU/hr`
  * Efficiency: `96% AFUE` (Condensing Gas)
* **Expected Results**:
  * Net Delivered Heat Output: $80,000 \times 0.96 = \mathbf{76,800\text{ BTU/hr}}$.

---

### 14. `boiler-size-calculator` (Hydronic Boiler & EDR Sizer)
* **Test ID**: `GOLD-BOIL-01` | **E2E Spec**: `tests/e2e/boiler-size-calculator.spec.ts`
* **Source Authority**: Hydronics Institute / I=B=R Rating Guidelines
* **Inputs**:
  * Installed Baseboard Footage: `100 linear feet` (Fin-tube)
  * Average Water Temperature: `180 °F` ($550\text{ BTU/hr per ft}$)
* **Expected Results**:
  * Radiation Capacity: $100 \times 550 = \mathbf{55,000\text{ BTU/hr}}$
  * Recommended Boiler Net Output (with 15% piping/pickup factor): $55,000 \times 1.15 = \mathbf{63,250\text{ BTU/hr}}$.

---

### 15. `garage-heater-sizing` (Shop & Garage Heater Sizer)
* **Test ID**: `GOLD-GARAGE-01` | **E2E Spec**: `tests/e2e/garage-heater-sizing.spec.ts`
* **Source Authority**: Modine Sizing Guide / ASHRAE 90.1
* **Inputs**:
  * Dimensions: 2-Car Garage (`24 ft x 24 ft x 10 ft`), Area: `576 sq ft`, Volume: `5,760 cu ft`
  * Insulation: Semi-Insulated (R-11 Walls, R-19 Ceiling, Insulated Garage Door)
  * Outdoor Design: `20 °F`, Inside Target: `65 °F` ($\Delta T = 45^\circ\text{F}$)
* **Expected Results**:
  * Required Heating Output: `28,500 BTU/hr` ($\pm 1,500\text{ BTU/hr}$) $\to$ Recommend **30,000 to 45,000 BTU Gas Unit Heater** or **7.5–10 kW Electric Heater**.

---

### 16. `r-value-calculator` (Assembly R-Value & U-Factor)
* **Test ID**: `GOLD-RVAL-01` | **E2E Spec**: `tests/e2e/r-value-calculator.spec.ts`
* **Source Authority**: ASHRAE Handbook—Fundamentals / IECC 2021
* **Inputs**:
  * Assembly: $2\times6$ Wood Stud Wall (16" o.c.)
  * Exterior Siding (R-0.8) + 1/2" OSB (R-0.62) + R-20 Cavity Batt + 1/2" Drywall (R-0.45) + Interior/Exterior Air Films (R-0.85)
* **Expected Results**:
  * Clear Wall $R$-value: $R-22.7$
  * Framing Factored Assembly $R_{\text{effective}}$: **R-18.4**
  * Assembly $U$-factor: $U = 1 / 18.4 = \mathbf{0.054\text{ BTU/hr}\cdot\text{ft}^2\cdot^\circ\text{F}}$.

---

### 17. `heat-loss-calculator` (Whole-Building Loss Sizer)
* **Test ID**: `GOLD-LOSS-01` | **E2E Spec**: `tests/e2e/heat-loss-calculator.spec.ts`
* **Source Authority**: ASHRAE Fundamentals / Blower Door Air Infiltration Equations
* **Inputs**:
  * Total Envelope Conductive Loss: $U \times A = 400\text{ BTU/hr}\cdot^\circ\text{F}$
  * Infiltration Rate: $150\text{ CFM}$
  * Design $\Delta T$: $50^\circ\text{F}$ ($70^\circ\text{F}$ indoor, $20^\circ\text{F}$ outdoor)
* **Expected Results**:
  * Conductive Loss: $400 \times 50 = 20,000\text{ BTU/hr}$
  * Infiltration Loss: $1.08 \times 150 \times 50 = 8,100\text{ BTU/hr}$
  * Total Heat Loss: $\mathbf{28,100\text{ BTU/hr}}$ ($\pm 100\text{ BTU/hr}$).

---

### 21. `refrigerant-charge-calculator` (Initial Line-Set Weigh-In)
* **Test IDs**: `GOLD-CHARGE-01` through `GOLD-CHARGE-03` | **E2E Spec**: `tests/e2e/refrigerant-charge.spec.ts`
* **GOLD-CHARGE-01 — R-454B inventory delta**: 45 ft, 5/16 in liquid, 0.40 oz/ft, 9 oz factory inventory → **add 9.0 oz**; 100 oz nameplate → **109.0 oz initial target**.
* **GOLD-CHARGE-02 — R-32 excess length**: 65 ft, 15 ft factory allowance, 0.58 oz/ft → **add 29.0 oz** and display the A2L notice.
* **GOLD-CHARGE-03 — Custom OEM rate**: 45 ft, 15 ft allowance, 0.60 oz/ft, non-empty manual reference → **add 18.0 oz**; an empty reference must return `missing_manual_reference`.
* **Boundary coverage**: Exact allowance, below-inventory recovery, maximum linear length, long-line warning, outdoor-unit vertical limits, invalid rate/base charge, unknown profile/pair, and unrounded fractional output.
* **Shared workflow coverage**: URL hydration, CSV availability, dialog semantics/focus restoration, branded `?embed=true` preview, contractor metadata, and print-media result visibility.

---

## 4. Cross-Tool Integration & Workflow Test Suite

| Test ID | Workflow | Step 1 (Origin) | Transferred Parameters | Step 2 (Destination) | Verification Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `INT-FLOW-01` | Sizing to Airflow | `btu-calculator` outputs $36,000\text{ BTU/hr}$ | `?btu=36000` | `cfm-calculator` mounts | CFM calculator automatically initializes with $36,000\text{ BTU}$ and calculates $1,667\text{ CFM}$ at $\Delta T = 20^\circ\text{F}$. |
| `INT-FLOW-02` | Airflow to Ducting | `cfm-calculator` outputs $1,200\text{ CFM}$ | `?cfm=1200` | `ductulator` mounts | Ductulator automatically initializes with $1,200\text{ CFM}$ and displays $14.2\text{ in}$ round duct @ $0.08\text{ in.wg}$. |
| `INT-FLOW-03` | Decoder to Airflow | `ac-model-decoder` decodes $48,000\text{ BTU}$ (4 Tons) | `?tonnage=4.0&cfm=1600` | `cfm-calculator` mounts | CFM calculator populates with $1,600\text{ CFM}$ nominal cooling airflow. |
| `INT-FLOW-04` | Charging Refrigerant | `superheat-subcooling-calculator` | `?refrigerant=r454b` | `pt-chart` mounts | PT chart mounts directly on R-454B with bubble/dew curve toggle active. |

---

## 5. Test Execution Protocol

### 1. Mathematical Unit & Golden Reference Tests:
```bash
npm run test
```

### 2. End-to-End Browser & Workflow Tests (Playwright):
```bash
npm run test:e2e
```
*(Runs the per-calculator E2E specs across the configured desktop and mobile browser profiles.)*
