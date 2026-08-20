# HVAC Lab — Engineering Computation Contracts, Numeric Policy & Mathematical Algorithms

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [08-engineering-source-register.md](./08-engineering-source-register.md), [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md), [03-calculators-and-features-list.md](./03-calculators-and-features-list.md)

---

## 1. Universal Numeric Policy & Computational Standards

To guarantee mathematical consistency, avoid rounding drift, and prevent cascading conversion errors across all 21 calculators, HVAC Lab enforces a strict **Universal Numeric Policy**:

### 1.1 Precision & Rounding Rules
1. **Internal Representation**: All calculations execute in IEEE 754 double-precision 64-bit floating point.
2. **Intermediate Values**: **Never round intermediate engineering calculations**. Rounding is strictly a presentation-layer concern applied at the final output boundary.
3. **Displayed Precision Guidelines**:
   * Duct Dimensions: Rounded to nearest $0.1\text{ in}$ (or $1\text{ mm}$ in SI).
   * Airflow: Rounded to nearest $1\text{ CFM}$ (or $1\text{ L/s}$, $1\text{ m}^3/\text{h}$).
   * Friction Rate: Rounded to $3\text{ decimal places}$ in Imperial ($0.082\text{ in.wg/100ft}$) or $1\text{ decimal place}$ in SI ($0.8\text{ Pa/m}$).
   * Velocity: Rounded to nearest $1\text{ FPM}$ (or $0.1\text{ m/s}$).
   * Temperatures & Superheat/Subcooling: Rounded to $1\text{ decimal place}$ ($0.1^\circ\text{F}$ or $0.1^\circ\text{C}$).
   * Pressures: Rounded to $1\text{ decimal place}$ ($0.1\text{ psig}$ or $0.01\text{ bar}$).
   * Tonnage: Rounded to $2\text{ decimal places}$ (e.g. $2.85\text{ Tons}$) with discrete nominal tonnage matching (1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0 Tons).
   * BTU/hr: Rounded to nearest $10\text{ BTU/hr}$ for room loads, $100\text{ BTU/hr}$ for whole-building sizing.
   * Psychrometric Properties: Humidity ratio $W$ to $5\text{ decimal places}$ ($0.00001\text{ lb/lb}$), Enthalpy $h$ to $2\text{ decimal places}$ ($0.01\text{ BTU/lb}$), Specific volume $v$ to $3\text{ decimal places}$ ($0.001\text{ ft}^3/\text{lb}$).
4. **URL Serialization**: Numbers serialized into URL search parameters preserve up to 4 significant digits (e.g. `?cfm=1200&friction=0.082`) to prevent data truncation upon link sharing.
5. **CSV / JSON Export**: Exports preserve unrounded raw calculation values alongside formatted display strings.

### 1.2 Canonical Physical Constants & Unit Conversion Factors

| Property | Canonical Internal Unit (IP) | SI Equivalent Unit | Exact Conversion Factor | Source Standard |
| :--- | :--- | :--- | :--- | :--- |
| **Standard Air Density ($\rho_0$)** | $0.075\text{ lb/ft}^3$ | $1.2041\text{ kg/m}^3$ | $\rho_{\text{SI}} = \rho_{\text{IP}} \times 16.018463$ | ASHRAE Fundamentals 2021 |
| **Standard Air Specific Heat ($c_p$)** | $0.240\text{ BTU/lb}\cdot^\circ\text{F}$ | $1.006\text{ kJ/kg}\cdot\text{K}$ | $c_{p,\text{SI}} = c_{p,\text{IP}} \times 4.1868$ | ASHRAE Fundamentals 2021 |
| **Standard Atmospheric Pressure** | $14.696\text{ psia}$ ($29.921\text{ in.Hg}$) | $101.325\text{ kPa}$ | $1\text{ psia} = 6.894757\text{ kPa}$ | NIST SP 811 |
| **Airflow Volume** | $1\text{ CFM}$ ($\text{ft}^3/\text{min}$) | $1\text{ m}^3/\text{h} = 0.588578\text{ CFM}$, $1\text{ L/s} = 2.11888\text{ CFM}$ | $1\text{ CFM} = 0.4719474\text{ L/s} = 1.699011\text{ m}^3/\text{h}$ | NIST SP 811 |
| **Cooling Power** | $1\text{ Ton of Refrigeration}$ | $3.516853\text{ kW}$ | $1\text{ Ton} = 12,000\text{ BTU/hr} = 3.516853\text{ kW}$ | ASHRAE Handbook |
| **Duct Pressure** | $1\text{ in. wg}$ ($60^\circ\text{F}$) | $248.84\text{ Pa}$ | $1\text{ in. wg} = 248.84\text{ Pa}$ | NIST SP 811 |
| **Refrigerant Pressure** | $1\text{ psig}$ | $1\text{ bar} = 14.5038\text{ psig}$ | $P_{\text{bar}} = (P_{\text{psig}} + 14.696) \times 0.0689476 - 1.01325$ | NIST SP 811 |

### 1.3 Invalid State, Edge-Case & Error Boundary Rules
* **`NaN` & `Infinity` Policy**: Mathematical functions must never leak `NaN` or `Infinity` to the UI. If inputs are out of bounds or create zero-division states (e.g. $\Delta T = 0$), calculators catch the boundary, render a friendly inline hint (`"Enter temperature difference greater than 0°F"`), and return safe `null` / fallback states.
* **Negative Value Protection**: Geometric dimensions, air volumes, absolute pressures, and heat loads must be strictly non-negative ($>0$).
* **Imperial/Metric Round-Trip Guarantee**: Converting value $X \to \text{SI} \to \text{IP}$ must satisfy $|X_{\text{final}} - X_{\text{initial}}| \le 0.001\%$.

---

## 2. Airflow & Ductwork Hydraulics Contracts

### 2.1 Round Duct Friction Loss (`SRC-DUCT-01`)
For galvanized sheet metal ductwork ($\epsilon = 0.0003\text{ ft}$), the ASHRAE/SMACNA equation for friction rate ($hf$) is:
$$hf = 0.109136 \times \frac{Q^{1.9}}{D_e^{5.02}}$$

Solving for Equivalent Round Diameter ($D_e$):
$$D_e = \left( \frac{0.109136 \times Q^{1.9}}{hf} \right)^{1 / 5.02}$$

Solving for Airflow Volume ($Q$ in CFM):
$$Q = \left( \frac{hf \times D_e^{5.02}}{0.109136} \right)^{1 / 1.9}$$

### 2.2 Huebscher Rectangular Equivalent Equation (`SRC-DUCT-02`)
To find the equivalent round diameter ($D_e$) of a rectangular duct with width $a$ and height $b$:
$$D_e = \frac{1.30 \times (a \cdot b)^{0.625}}{(a + b)^{0.25}}$$

#### Solving for Rectangular Dimension $b$ (Given $D_e$ and selected dimension $a$):
Because $b$ is non-linear in Huebscher's formula, the implementation uses **Brent's root-finding method** or **1D Newton-Raphson iteration**:
$$f(b) = \frac{1.30 \times (a \cdot b)^{0.625}}{(a + b)^{0.25}} - D_e = 0$$
* Initial Guess: $b_0 = \frac{\pi \cdot D_e^2}{4 \cdot a}$ (area equivalence).
* Convergence Tolerance: $|f(b)| \le 0.001\text{ in}$.
* Max Iterations: 20 (converges typically in 3–4 iterations).

### 2.3 Flexible Duct Compression Derating (`SRC-DUCT-03`)
$$hf_{\text{flex}} = hf_{\text{rigid}} \times \left( 1 + 2.5 \times \text{compression\_ratio} \right)$$
* Compression Ratio values: $0.00$ (Taut), $0.04$ (Standard, $1.10\times$), $0.15$ (Moderate Sag, $1.375\times$), $0.30$ (Severe Sag, $1.75\times$).

---

## 3. Refrigerant Pressure-Temperature (PT) Reference-Data Architecture

> **Engineering Mandate**: HVAC Lab abandons rough empirical power-law formulas in favor of a **Reference-Data + Monotonic Piecewise Cubic Hermite / Linear Interpolation Architecture** based on official thermodynamic data from **NIST REFPROP v10.0** and **Chemours Opteon XL41 Technical Bulletins**.

### 3.1 Refrigerant Classification & Behavior Matrix

| Refrigerant | Classification | Composition | Normal Boiling Point | Temperature Glide | Bubble Curve Available | Dew Curve Available | Valid Pressure Range | Valid Temp Range | Max Allowed Interpolation Error |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| **R-410A** | Near-Azeotropic (A1) | R-32 (50%) / R-125 (50%) | $-60.7^\circ\text{F}$ | $<0.3^\circ\text{F}$ (Negligible) | Yes | Yes (Identical) | $10\text{--}600\text{ psig}$ | $-40^\circ\text{F}\text{ to }150^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-32** | Pure Substance (A2L) | Difluoromethane (100%) | $-61.2^\circ\text{F}$ | $0.0^\circ\text{F}$ (None) | Yes | Yes (Identical) | $10\text{--}620\text{ psig}$ | $-40^\circ\text{F}\text{ to }150^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-454B** | Zeotropic Blend (A2L) | R-32 (68.9%) / R-1234yf (31.1%) | $-59.0^\circ\text{F}$ | $\approx 1.5^\circ\text{F}$ (Glide) | **Yes (Liquid/Subcool)** | **Yes (Vapor/Superheat)** | $10\text{--}600\text{ psig}$ | $-40^\circ\text{F}\text{ to }150^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-22** | Pure Substance (A1) | Chlorodifluoromethane (100%) | $-41.4^\circ\text{F}$ | $0.0^\circ\text{F}$ (None) | Yes | Yes (Identical) | $5\text{--}400\text{ psig}$ | $-40^\circ\text{F}\text{ to }140^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-134a** | Pure Substance (A1) | 1,1,1,2-Tetrafluoroethane (100%) | $-15.1^\circ\text{F}$ | $0.0^\circ\text{F}$ (None) | Yes | Yes (Identical) | $0\text{--}300\text{ psig}$ | $-30^\circ\text{F}\text{ to }150^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-404A** | Near-Azeotropic (A1) | R-125 (44%) / R-143a (52%) / R-134a (4%) | $-51.2^\circ\text{F}$ | $<0.9^\circ\text{F}$ | Yes | Yes | $5\text{--}450\text{ psig}$ | $-50^\circ\text{F}\text{ to }130^\circ\text{F}$ | $\le 0.1^\circ\text{F}$ |
| **R-407C** | Zeotropic Blend (A1) | R-32 (23%) / R-125 (25%) / R-134a (52%) | $-46.5^\circ\text{F}$ | $\approx 9.0\text{ to }11.0^\circ\text{F}$ (High Glide) | **Yes (Liquid/Subcool)** | **Yes (Vapor/Superheat)** | $5\text{--}450\text{ psig}$ | $-40^\circ\text{F}\text{ to }140^\circ\text{F}$ | $\le 0.15^\circ\text{F}$ |

### 3.2 Interpolation Policy & Strict Out-of-Range Guardrail
* **Grid Density**: Datasets are stored in 0.5 psi increments between 0 and 650 psig.
* **Interpolation Algorithm**: Linear interpolation between adjacent table points:
  $$T(P) = T_i + \frac{P - P_i}{P_{i+1} - P_i} \cdot (T_{i+1} - T_i)$$
* **Strict Out-of-Range Policy**:
  > **RULE**: Never silently extrapolate beyond the validated dataset boundary.
  If $P < P_{\text{min}}$ or $P > P_{\text{max}}$, the interpolation engine returns an explicit `OutOfRangeError` (e.g., `"Pressure 720 psig exceeds R-410A maximum range (600 psig)"`).

### 3.3 Zeotropic Glide Handling in Field Diagnostics
* **Subcooling Calculation**: Uses the **Bubble Curve** ($T_{\text{bubble}}$ at liquid pressure $P_{\text{liquid}}$):
  $$\text{Actual Subcooling} = T_{\text{bubble}}(P_{\text{liquid}}) - T_{\text{liquid line}}$$
* **Superheat Calculation**: Uses the **Dew Curve** ($T_{\text{dew}}$ at suction pressure $P_{\text{suction}}$):
  $$\text{Actual Superheat} = T_{\text{suction line}} - T_{\text{dew}}(P_{\text{suction}})$$

---

## 4. Psychrometric Moist Air Engine Specification (`SRC-PSY-01`)

### 4.1 Atmospheric Pressure & Altitude Support
The engine must compute local atmospheric pressure from user elevation ($Z$ in feet) or accept direct barometric pressure:
$$P_{\text{atm}} = 14.696 \times \left( 1 - 6.8754 \times 10^{-6} \times Z \right)^{5.2559} \quad [\text{psia}]$$
* Options:
  1. Default Sea Level ($Z = 0\text{ ft}$, $P = 14.696\text{ psia}$ / $101.325\text{ kPa}$).
  2. Elevation Entry ($Z = -1,000\text{ to }15,000\text{ ft}$).
  3. Direct Barometric Pressure Entry ($10.0\text{ to }16.0\text{ psia}$ / $20.0\text{ to }32.0\text{ in.Hg}$).

### 4.2 ASHRAE Saturation Vapor Pressure Equations
For Dry Bulb Temperature $T$ ($^\circ\text{R} = T_{^\circ\text{F}} + 459.67$):

#### Over Ice ($-148^\circ\text{F} \le T \le 32^\circ\text{F}$):
$$\ln(P_{\text{ws}}) = \frac{C_1}{T} + C_2 + C_3 \cdot T + C_4 \cdot T^2 + C_5 \cdot T^3 + C_6 \cdot T^4 + C_7 \cdot \ln(T)$$
Where $C_1 = -10214.165$, $C_2 = -4.8932428$, $C_3 = -0.53765794\times 10^{-2}$, $C_4 = 0.19202377\times 10^{-6}$, $C_5 = 0.35575832\times 10^{-9}$, $C_6 = -0.90344688\times 10^{-13}$, $C_7 = 4.1635019$.

#### Over Liquid Water ($32^\circ\text{F} \le T \le 392^\circ\text{F}$):
$$\ln(P_{\text{ws}}) = \frac{C_8}{T} + C_9 + C_{10} \cdot T + C_{11} \cdot T^2 + C_{12} \cdot T^3 + C_{13} \cdot \ln(T)$$
Where $C_8 = -10440.397$, $C_9 = -11.29465$, $C_{10} = -0.027022355$, $C_{11} = 0.1289036\times 10^{-4}$, $C_{12} = -0.24780681\times 10^{-8}$, $C_{13} = 6.5459673$.

### 4.3 Supported 2-Property Input Combinations & Solvers

| Input Pair | Primary Inputs | Solver Type | Numerical Method | Convergence Tolerance | Max Iterations | Validation Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Pair 1** | $T_{\text{db}} + \text{RH}$ | Direct Analytical | Exact substitution | N/A | 1 | $\text{RH} \in [0.1\%, 100\%]$, $T_{\text{db}} \in [-40^\circ\text{F}, 200^\circ\text{F}]$ |
| **Pair 2** | $T_{\text{db}} + T_{\text{wb}}$ | Iterative Root Finder | Newton-Raphson on $W(T_{\text{wb}})$ | $|W_{k+1} - W_k| \le 10^{-6}$ | 25 | $T_{\text{wb}} \le T_{\text{db}}$, $T_{\text{wb}} \ge T_{\text{dp}}$ |
| **Pair 3** | $T_{\text{db}} + T_{\text{dp}}$ | Direct Analytical | Exact substitution via $P_v = P_{\text{ws}}(T_{\text{dp}})$ | N/A | 1 | $T_{\text{dp}} \le T_{\text{db}}$ (Dew point cannot exceed Dry Bulb) |
| **Pair 4** | $T_{\text{db}} + W$ | Direct Analytical | Exact substitution via $P_v = \frac{P_{\text{atm}} \cdot W}{0.62198 + W}$ | N/A | 1 | $W \ge 0$, $P_v \le P_{\text{ws}}(T_{\text{db}})$ |
| **Pair 5** | $T_{\text{db}} + h$ | Direct Analytical | $W = \frac{h - 0.240 \cdot T_{\text{db}}}{1061 + 0.444 \cdot T_{\text{db}}}$ | N/A | 1 | $h \ge h_{\text{dry}}(T_{\text{db}})$, $W \le W_{\text{sat}}(T_{\text{db}})$ |
| **Pair 6** | $T_{\text{wb}} + \text{RH}$ | 1D Root Finder | Brent's method solving $T_{\text{db}}$ | $|T_{\text{db},k+1} - T_{\text{db},k}| \le 0.001^\circ\text{F}$ | 30 | $\text{RH} \in [0.1\%, 100\%]$ |
| **Pair 7** | $T_{\text{dp}} + \text{RH}$ | Direct Analytical | $P_{\text{ws}}(T_{\text{db}}) = P_{\text{ws}}(T_{\text{dp}}) / (\text{RH} / 100)$ | Exact inverse $P_{\text{ws}}$ | N/A | $\text{RH} \in [0.1\%, 100\%]$ |

### 4.4 Impossible State & Boundary Handling
* **Constraint Violation**: If $T_{\text{wb}} > T_{\text{db}}$ or $T_{\text{dp}} > T_{\text{db}}$, the system throws a user-facing validation error: `"Wet Bulb / Dew Point cannot exceed Dry Bulb temperature"`.
* **Supersaturation**: If calculated relative humidity exceeds $100.0\%$, values are clamped at saturation ($100\%$) with a condensation warning.

---

## 5. AC Model Number Decoder Pattern Matcher (`SRC-MODEL-01`)

```typescript
export interface DecodedACModel {
  brand: string;
  rawModel: string;
  nominalBtu: number;
  tonnage: number;
  recommendedCfm: number;
  confidence: 'high' | 'medium' | 'fallback';
}

const BRAND_SPECS = [
  {
    brand: 'Carrier / Bryant / Payne',
    regex: /(?:24|25|38)[A-Z0-9]{2,4}(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  },
  {
    brand: 'Trane / American Standard',
    regex: /4[TXW][A-Z0-9]{3}(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  },
  {
    brand: 'Goodman / Amana / Daikin',
    regex: /G[A-Z]{2,4}[0-9]{1,2}(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  },
  {
    brand: 'Lennox',
    regex: /(?:XC|XP|EL|ML|SL)[0-9]{2,4}[A-Z0-9]?(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  },
  {
    brand: 'Rheem / Ruud',
    regex: /R[A-Z]{2,4}[0-9]{0,2}(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  },
  {
    brand: 'York / Coleman / Luxaire',
    regex: /(?:YC|TC|CC|YC)[A-Z0-9]{1,3}(018|024|030|036|042|048|060|18|24|30|36|42|48|60)/i
  }
];

export function decodeACModelNumber(input: string): DecodedACModel | null {
  const clean = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length < 5) return null;

  for (const spec of BRAND_SPECS) {
    const match = clean.match(spec.regex);
    if (match && match[1]) {
      const code = parseInt(match[1], 10);
      return formatResult(spec.brand, clean, code, 'high');
    }
  }

  // Universal Fallback: Search for isolated capacity tokens
  const fallbackMatch = clean.match(/(?:^|[A-Z])(018|024|030|036|042|048|060|18|24|30|36|42|48|60)(?:[A-Z0-9]|$)/);
  if (fallbackMatch && fallbackMatch[1]) {
    const code = parseInt(fallbackMatch[1], 10);
    return formatResult('Standard Residential Condenser', clean, code, 'medium');
  }

  return null;
}

function formatResult(brand: string, rawModel: string, code: number, confidence: 'high' | 'medium'): DecodedACModel {
  const nominalBtu = code * 1000;
  const tonnage = nominalBtu / 12000;
  return {
    brand,
    rawModel,
    nominalBtu,
    tonnage,
    recommendedCfm: tonnage * 400,
    confidence
  };
}
```

---

## 6. Refrigerant Line-Set Initial Weigh-In (`SRC-CHARGE-01`–`03`)

The charge engine selects one of two manufacturer-defined methods. It never selects a rate from refrigerant type alone.

### Excess-length method

$$\Delta m = \max(0, L_{actual} - L_{factory})r_{OEM}$$

### Inventory-delta method

$$\Delta m = L_{actual}r_{OEM} - m_{factory-line}$$

For either method, the initial target is $m_{target}=m_{nameplate}+\Delta m$. Negative inventory-delta results are preserved as a recovery instruction; no raw intermediate is rounded. The engine validates the selected profile's linear and vertical boundaries, returns structured errors for invalid state, and always returns the source and required final-charge procedure with a successful result.
