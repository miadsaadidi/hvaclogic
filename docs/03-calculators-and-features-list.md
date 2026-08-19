# HVAC Lab — Master Calculator Specifications & Feature Contracts

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [08-engineering-source-register.md](./08-engineering-source-register.md), [04-engineering-formulas-and-algorithms.md](./04-engineering-formulas-and-algorithms.md), [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md), [10-implementation-roadmap.md](./10-implementation-roadmap.md)

---

## 1. Standardized Calculator Specification Contract

This document provides the canonical, authoritative specification for every calculator in HVAC Lab. All specifications adhere to the standard 22-field engineering contract.

---

## 2. Master Calculator Specifications (All 17 Calculators)

---

### 1. `ductulator` — Digital Ductulator & Air Duct Sizing Engine
* **ID**: `ductulator`
* **Name**: Digital Ductulator & Air Duct Sizing Tool
* **Route**: `/calculators/ductulator`
* **Pillar**: `/airflow-ducts`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `Low`
* **Primary Keyword**: `ductulator`
* **Secondary Keywords**: `duct sizing calculator`, `mcquay duct sizer`, `air duct design calculator`, `duct sizer`
* **Primary Persona**: HVAC Design Engineers, Mechanical Contractors, Sheet Metal Fabricators
* **Primary Intent**: Transactional / Professional Utility
* **Purpose**: Computes equivalent round/rectangular duct dimensions, air velocity, and friction loss across multiple duct materials with real-time 2D cross-section rendering.
* **Inputs**:
  * `solveMode`: Enum (`friction` | `airflow` | `diameter` | `velocity`), default: `friction`, required: `true`.
  * `cfm`: Float, unit: `CFM`, default: `1200`, min: `10`, max: `50000`, required: `true`, validation: `> 0`, source: User / URL param.
  * `friction`: Float, unit: `in.wg/100ft`, default: `0.08`, min: `0.01`, max: `1.0`, required: `true`, validation: `> 0`, source: User / Preset.
  * `material`: Enum (`galv` | `flex` | `board` | `spiral`), default: `galv`, required: `true`.
  * `aspectLock`: Enum (`none` | `lock_height` | `lock_width` | `ratio_1_1` | `ratio_1_2` | `ratio_1_3`), default: `none`.
  * `lockedDimension`: Float, unit: `in`, default: `10`, min: `3`, max: `96`, required: `false`.
* **Outputs**:
  * `roundDiameter`: `in`, precision: `0.1 in`, rounding: `round(val, 1)`, formula: `SRC-DUCT-01`.
  * `rectangularWidth`: `in`, precision: `0.1 in`, rounding: `round(val, 1)`, formula: `SRC-DUCT-02`.
  * `rectangularHeight`: `in`, precision: `0.1 in`, rounding: `round(val, 1)`, formula: `SRC-DUCT-02`.
  * `velocityFpm`: `FPM`, precision: `1 FPM`, rounding: `round(val, 0)`, formula: `$V = Q \cdot 144 / A$`.
  * `velocityCategory`: Enum (`quiet` | `moderate` | `noisy`), threshold: `SRC-DUCT-04`.
* **Assumptions**: Standard air density $\rho = 0.075\text{ lb/ft}^3$, clean galvanized roughness $\epsilon = 0.0003\text{ ft}$.
* **Calculation Method**: Direct analytical solution for round diameter; 1D Newton-Raphson on Huebscher equation for rectangular equivalence.
* **Engineering References**: `SRC-DUCT-01`, `SRC-DUCT-02`, `SRC-DUCT-04` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Airflow 10–50,000 CFM; Diameter 3–60 inches; Friction 0.01–1.0 in.wg/100ft.
* **Warnings**: Triggered when residential velocity $> 700\text{ FPM}$ or aspect ratio $> 4:1$.
* **Errors**: Rejects non-positive CFM or friction values with inline helper message.
* **Safety Notes**: Acoustic comfort advisory; oversized ducting reduces static pressure but increases installed cost.
* **URL Parameters**: `?cfm=1200&friction=0.08&material=galv` (synced via `history.replaceState`).
* **Cross-Tool Handoffs**: Receives `?cfm=` from `cfm-calculator`.
* **Offline Requirements**: Fully offline capable (pure client-side polynomial math).
* **Accessibility Requirements**: Sliders operable via keyboard arrow keys; Canvas cross-section accompanied by dynamic `aria-label` text equivalent.
* **Analytics Events**: `calculator_started`, `result_generated`, `preset_selected`, `share_clicked`, `print_exported`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-DUCT-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Huebscher equation is verified up to $4:1$ aspect ratios; extreme flat ducts ($>4:1$) experience elevated edge turbulence.

---

### 2. `flex-duct-cfm-chart` — Dedicated Flex Duct CFM & Friction Chart
* **ID**: `flex-duct-cfm-chart`
* **Name**: Flexible Duct CFM & Friction Drop Chart
* **Route**: `/calculators/flex-duct-cfm-chart`
* **Pillar**: `/airflow-ducts`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `Low`
* **Primary Keyword**: `flex duct cfm chart`
* **Secondary Keywords**: `hvac ductwork sizing chart`, `duct sizing chart`, `flex duct sizing`
* **Primary Persona**: HVAC Installers, Residential Technicians, Code Inspectors
* **Primary Intent**: Navigational / Field Lookup
* **Purpose**: Interactive, filterable CFM capacity grid for flexible duct runs across standard diameters with real-time installation sag/compression derating.
* **Inputs**:
  * `compressionRatio`: Enum (`0%` | `4%` | `15%` | `30%`), default: `4%`, required: `true`, source: User toggle.
  * `targetFriction`: Enum (`0.05` | `0.08` | `0.10` | `0.15`), default: `0.10`, required: `true`.
* **Outputs**:
  * `capacityGrid`: Array of CFM capacities for diameters 4" through 20" across all friction rates.
* **Assumptions**: ADC testing standards; 4% compression represents careful residential installation with supports every 4 ft.
* **Calculation Method**: $hf_{\text{flex}} = hf_{\text{rigid}} \cdot (1 + 2.5 \cdot \text{sag\_ratio})$ (`SRC-DUCT-03`).
* **Engineering References**: `SRC-DUCT-03` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Diameters 4" to 20"; Friction 0.05 to 0.15 in.wg/100ft.
* **Warnings**: Prominently warns when flex duct runs exceed 14 ft equivalent length or suffer $>15\%$ compression.
* **Errors**: N/A (discrete bounded matrix).
* **Safety Notes**: Recommends keeping flexible duct runs short ($<15\text{ ft}$) and taut to prevent high static pressure drop and restricted airflow.
* **URL Parameters**: `?compression=4&friction=0.10`.
* **Cross-Tool Handoffs**: 1-click handoff to `/calculators/ductulator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Standard HTML `<table>` with `scope="col"` and `scope="row"` headers.
* **Analytics Events**: `calculator_started`, `preset_selected`, `print_exported`, `csv_exported`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-FLEX-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Does not model dynamic bends or duct kinks; assumes continuous uniform sag.

---

### 3. `cfm-calculator` — HVAC CFM & Airflow Sizer
* **ID**: `cfm-calculator`
* **Name**: HVAC CFM & Airflow Calculator
* **Route**: `/calculators/cfm-calculator`
* **Pillar**: `/airflow-ducts`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `Low`
* **Primary Keyword**: `air duct cfm calculator`
* **Secondary Keywords**: `cfm calculator hvac`, `cfm chart for duct`
* **Primary Persona**: HVAC Technicians, Balancing Engineers, Homeowners
* **Primary Intent**: Technical / Sizing
* **Purpose**: Computes required airflow volume (CFM) across 4 standard methods: Sensible Heat equation, Duct Velocity & Area, Room Air Changes per Hour (ACH), and Cooling Tonnage rules.
* **Inputs**:
  * `calcMethod`: Enum (`sensible_heat` | `velocity_area` | `room_ach` | `tonnage`), default: `sensible_heat`.
  * `btu`: Float, unit: `BTU/hr`, default: `36000`, min: `1000`, max: `500000`, validation: `> 0`.
  * `deltaT`: Float, unit: `°F`, default: `20`, min: `5`, max: `80`, validation: `> 0`.
  * `roomVolume`: Float, unit: `cu ft`, default: `2400`, min: `100`, max: `100000`.
  * `ach`: Float, unit: `ACH`, default: `6.0`, min: `0.5`, max: `60.0`.
  * `tonnage`: Float, unit: `Tons`, default: `3.0`, min: `0.5`, max: `25.0`.
* **Outputs**:
  * `calculatedCfm`: `CFM`, precision: `1 CFM`, rounding: `round(val, 0)`.
  * `supplyNeckSize`: Recommended round diffuser neck diameter (in).
* **Assumptions**: Standard sea-level air density ($1.08 = 60 \cdot 0.075 \cdot 0.240$).
* **Calculation Method**: $\text{CFM} = Q / (1.08 \cdot \Delta T)$ (`SRC-CFM-01`).
* **Engineering References**: `SRC-CFM-01`, `SRC-CFM-02`, `SRC-CFM-03` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: CFM 50 to 50,000; $\Delta T$ 5°F to 80°F.
* **Warnings**: Warns if $\Delta T < 10^\circ\text{F}$ (unusually low temperature drop) or $\Delta T > 30^\circ\text{F}$ for AC cooling.
* **Errors**: Rejects $\Delta T \le 0$ with inline error message.
* **Safety Notes**: Verifies that fan CFM matches coil freeze-up protection requirements ($>350\text{ CFM/ton}$).
* **URL Parameters**: `?method=sensible_heat&btu=36000&deltaT=20`.
* **Cross-Tool Handoffs**: Receives `?btu=` from `btu-calculator`; passes `?cfm=` to `ductulator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Numeric inputs paired with `inputmode="decimal"` and explicit `<label>` tags.
* **Analytics Events**: `calculator_started`, `result_generated`, `handoff_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-CFM-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Standard constant $1.08$ assumes sea-level density; elevation derating recommended above 2,000 ft.

---

### 4. `kitchen-hood-cfm` — Kitchen Range Hood CFM Sizer
* **ID**: `kitchen-hood-cfm`
* **Name**: Kitchen Range Hood CFM & Make-Up Air Sizer
* **Route**: `/calculators/kitchen-hood-cfm`
* **Pillar**: `/airflow-ducts`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `High`
* **Primary Keyword**: `kitchen hood cfm calculator`
* **Secondary Keywords**: `range hood cfm calculator`, `range hood make up air`
* **Primary Persona**: Kitchen Designers, HVAC Contractors, Homeowners
* **Primary Intent**: Commercial / Code Compliance
* **Purpose**: Sizes kitchen range hood exhaust airflow based on cooktop BTU or linear width and provides automatic International Residential Code (IRC M1503.6) make-up air warnings.
* **Inputs**:
  * `cooktopType`: Enum (`gas` | `electric`), default: `gas`.
  * `gasBtu`: Float, unit: `BTU/hr`, default: `60000`, min: `10000`, max: `150000`.
  * `cooktopWidthInches`: Float, unit: `in`, default: `36`, min: `24`, max: `72`.
  * `mounting`: Enum (`wall` | `island`), default: `wall`.
  * `ductLengthFt`: Float, unit: `ft`, default: `15`, min: `1`, max: `100`.
  * `elbows90`: Integer, default: `1`, min: `0`, max: `10`.
* **Outputs**:
  * `requiredCfm`: `CFM`, precision: `10 CFM`, rounding: `ceil(val / 10) * 10`.
  * `makeupAirRequired`: Boolean (`true` if $\text{CFM} > 400$).
  * `equivalentDuctLength`: `ft`.
* **Assumptions**: 100 CFM per 10k BTU gas; 100 CFM/linear ft electric; $1.5\times$ multiplier for island hoods.
* **Calculation Method**: `SRC-HOOD-01`, `SRC-HOOD-02`.
* **Engineering References**: `SRC-HOOD-01`, `SRC-HOOD-02` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Cooktops 10k to 150k BTU; Widths 24" to 72".
* **Warnings**: Prominent IRC M1503.6 Make-Up Air Notice displayed whenever exhaust $> 400\text{ CFM}$.
* **Errors**: Rejects non-positive BTU or width values.
* **Safety Notes**: Carbon monoxide backdrafting risk advisory when operating high-CFM hoods near non-direct vent appliances.
* **URL Parameters**: `?type=gas&btu=60000&mount=island`.
* **Cross-Tool Handoffs**: Passes `?cfm=` to `ductulator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Code warning rendered with high-contrast badge and distinct icon.
* **Analytics Events**: `calculator_started`, `result_generated`, `validation_error`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-HOOD-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Local municipal codes may enforce make-up air thresholds below 400 CFM (e.g. 300 CFM in certain Canadian/US jurisdictions).

---

### 5. `btu-calculator` — Whole-Home & Room BTU Load Master
* **ID**: `btu-calculator`
* **Name**: BTU Heating & Cooling Load Calculator
* **Route**: `/calculators/btu-calculator`
* **Pillar**: `/cooling-loads`
* **Status**: `planned` | **Launch Phase**: `2` | **Risk Level**: `Medium`
* **Primary Keyword**: `btu calculator`
* **Secondary Keywords**: `btu estimator`, `british thermal unit calculator`, `hvac load calculator`
* **Primary Persona**: Homeowners, HVAC Sales Contractors, Estimators
* **Primary Intent**: Commercial / Sizing
* **Purpose**: Multi-factor residential heating and cooling load calculation estimating sensible and latent gains, total cooling tonnage, and heating BTU requirements.
* **Inputs**:
  * `areaSqFt`: Float, unit: `sq ft`, default: `2000`, min: `100`, max: `10000`.
  * `ceilingHeightFt`: Float, unit: `ft`, default: `9`, min: `7`, max: `25`.
  * `climateZone`: Enum (`zone_1` through `zone_7`), default: `zone_4`.
  * `insulationGrade`: Enum (`poor` | `average` | `excellent`), default: `average`.
  * `windowQuality`: Enum (`single_pane` | `double_clear` | `double_low_e`), default: `double_low_e`.
  * `occupants`: Integer, default: `4`, min: `1`, max: `30`.
* **Outputs**:
  * `sensibleCoolingBtu`: `BTU/hr`, precision: `100 BTU/hr`.
  * `latentCoolingBtu`: `BTU/hr`, precision: `100 BTU/hr`.
  * `totalCoolingTonnage`: `Tons`, precision: `0.1 Ton`.
  * `totalHeatingBtu`: `BTU/hr`, precision: `100 BTU/hr`.
* **Assumptions**: ACCA Manual J simplified block load modeling; standard internal gains (230 BTU/hr sensible per occupant).
* **Calculation Method**: `SRC-LOAD-01`.
* **Engineering References**: `SRC-LOAD-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Area 100 to 10,000 sq ft; Ceiling heights 7 to 25 ft.
* **Warnings**: Screening disclaimer: Not an ACCA-certified Manual J replacement for permitted construction.
* **Errors**: Rejects non-positive area or ceiling height.
* **Safety Notes**: Oversizing causes short-cycling and high indoor humidity; undersizing causes failure to maintain setpoint.
* **URL Parameters**: `?area=2000&zone=4&insulation=average`.
* **Cross-Tool Handoffs**: Passes `?btu=` to `cfm-calculator` and `ac-tonnage-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Load breakdown donut chart backed by an accessible data table.
* **Analytics Events**: `calculator_started`, `result_generated`, `handoff_clicked`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-LOAD-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Does not model room-by-room duct layout or complex architectural overhangs.

---

### 6. `ac-tonnage-calculator` — AC Tonnage & Room Capacity Sizer
* **ID**: `ac-tonnage-calculator`
* **Name**: AC Tonnage & Room Capacity Calculator
* **Route**: `/calculators/ac-tonnage-calculator`
* **Pillar**: `/cooling-loads`
* **Status**: `planned` | **Launch Phase**: `2` | **Risk Level**: `Medium`
* **Primary Keyword**: `btus ac`
* **Secondary Keywords**: `aircon capacity`, `aircon cooling capacity`, `ac tonnage calculator`
* **Primary Persona**: Homeowners, Real Estate Agents, HVAC Installers
* **Primary Intent**: Commercial / Equipment Sizing
* **Purpose**: Matches conditioned floor area and regional climate factors to standard residential AC tonnage sizes and computes SEER2 annual energy operating costs.
* **Inputs**:
  * `areaSqFt`: Float, unit: `sq ft`, default: `1500`, min: `100`, max: `6000`.
  * `climateSeverity`: Enum (`mild` | `moderate` | `hot_humid` | `extreme_heat`), default: `moderate`.
  * `seerRating`: Float, unit: `SEER2`, default: `15.0`, min: `10.0`, max: `26.0`.
  * `electricRate`: Float, unit: `$/kWh`, default: `0.16`, min: `0.05`, max: `0.60`.
* **Outputs**:
  * `recommendedTonnage`: `Tons` (discrete step: 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0).
  * `recommendedBtu`: `BTU/hr`.
  * `annualCoolingCost`: `$/yr`, precision: `$1`.
* **Assumptions**: 500–600 sq ft/ton moderate; 350–450 sq ft/ton hot/humid; 1,000 full-load cooling hours/year.
* **Calculation Method**: `SRC-CFM-03`.
* **Engineering References**: `SRC-CFM-03` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: 100 to 6,000 sq ft.
* **Warnings**: Informs user of short-cycling risks if choosing larger tonnage than calculated.
* **Errors**: Rejects non-positive square footage.
* **Safety Notes**: AC capacity must balance sensible load with adequate runtime for dehumidification.
* **URL Parameters**: `?area=1500&climate=moderate&seer=15`.
* **Cross-Tool Handoffs**: Links to `ac-model-decoder#model-decoder`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Sliders support keyboard incrementing.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-TON-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Rule-of-thumb square foot sizing; Manual J required for official sizing.

---

### 7. `ac-model-decoder` — HVAC Model Number Tonnage Decoder
* **ID**: `ac-model-decoder`
* **Name**: HVAC Model Number Tonnage Decoder
* **Route**: `/calculators/ac-model-decoder`
* **Pillar**: `/cooling-loads`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `Low`
* **Primary Keyword**: `how to find ac tonnage`
* **Secondary Keywords**: `how to find tonnage of ac unit`, `hvac model number decoder`
* **Primary Persona**: Homeowners looking at unit nameplates, Replacement Sales Techs
* **Primary Intent**: High Commercial / Replacement
* **Purpose**: Regex pattern matcher that scans condenser and air handler model numbers to automatically detect brand, nominal BTU, and tonnage capacity.
* **Inputs**:
  * `modelString`: String, default: `"4TTR6036A1000A"`, required: `true`, validation: `length >= 5`.
* **Outputs**:
  * `detectedBrand`: String (e.g. `Trane / American Standard`).
  * `nominalBtu`: `BTU/hr` (e.g. `36,000 BTU/hr`).
  * `nominalTonnage`: `Tons` (e.g. `3.0 Tons`).
  * `nominalCfm`: `CFM` (e.g. `1,200 CFM`).
  * `confidence`: Enum (`high` | `medium` | `fallback`).
* **Assumptions**: Two-digit numbers divisible by 6 or 12 (18, 24, 30, 36, 42, 48, 60) denote nominal capacity.
* **Calculation Method**: `SRC-MODEL-01` regex parsing.
* **Engineering References**: `SRC-MODEL-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Standard residential HVAC model strings (Carrier, Trane, Goodman, Lennox, Rheem, York).
* **Warnings**: Warns user if serial number (S/N) was entered instead of model number (M/N).
* **Errors**: Returns helpful prompt if no valid capacity token is identified.
* **Safety Notes**: Always turn off disconnect switch before opening electrical service panels to read data plates.
* **URL Parameters**: `?model=4TTR6036`.
* **Cross-Tool Handoffs**: Passes `?tonnage=` and `?cfm=` to `cfm-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Interactive visual diagram of data plate locator has complete text instructions.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-MODEL-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Commercial packaged rooftop units or obscure legacy brands may require manual lookup.

---

### 8. `mini-split-sizing` — Mini-Split Multi-Zone Sizer
* **ID**: `mini-split-sizing`
* **Name**: Mini-Split Multi-Zone Sizing Calculator
* **Route**: `/calculators/mini-split-sizing`
* **Pillar**: `/cooling-loads`
* **Status**: `planned` | **Launch Phase**: `2` | **Risk Level**: `Medium`
* **Primary Keyword**: `mini split sizing calculator`
* **Secondary Keywords**: `ductless mini split sizing`, `multi zone mini split sizing`
* **Primary Persona**: Homeowners, HVAC Contractors, Electricians
* **Primary Intent**: Commercial / Multi-Zone Sizing
* **Purpose**: Sizes indoor head units across up to 8 individual rooms and matches them to outdoor multi-port inverter condensers with diversity factors.
* **Inputs**:
  * `zones`: Array of `{ name: string, areaSqFt: number, sunExposure: string, usage: string }`.
* **Outputs**:
  * `zoneRecommendations`: Array of recommended indoor heads (7k, 9k, 12k, 18k, 24k BTU).
  * `totalConnectedBtu`: `BTU/hr`.
  * `recommendedOutdoorCondenser`: `BTU/hr` with 100%–130% over-subscription check.
* **Assumptions**: Inverter variable-speed compressors accommodate 100%–130% connected indoor capacity.
* **Calculation Method**: `SRC-LOAD-01` per-zone load summing.
* **Engineering References**: `SRC-LOAD-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: 1 to 8 zones; Total capacity 9k to 60k BTU.
* **Warnings**: Informs user if total connected capacity exceeds 130% of outdoor condenser rating.
* **Errors**: Rejects empty zone list or zones with zero area.
* **Safety Notes**: Ensure electrical service panel has adequate 240V breaker capacity for outdoor unit.
* **URL Parameters**: JSON-encoded zone state in URL hash.
* **Cross-Tool Handoffs**: Passes total BTU to `heat-pump-size-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Zone addition/removal buttons announced via `aria-live`.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-MS-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Assumes single multi-zone outdoor unit; does not size branch-box distribution systems.

---

### 9. `superheat-subcooling-calculator` — Target Superheat & Subcooling Diagnostic Tool
* **ID**: `superheat-subcooling-calculator`
* **Name**: Target Superheat & Subcooling Charging Calculator
* **Route**: `/calculators/superheat-subcooling-calculator`
* **Pillar**: `/field-diagnostics`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `High`
* **Primary Keyword**: `superheat calculator`
* **Secondary Keywords**: `subcooling calculator`, `hvac charging calculator`
* **Primary Persona**: EPA Certified Field Technicians, Service Managers
* **Primary Intent**: Field Diagnostic / EPA Service
* **Purpose**: Evaluates fixed orifice and TXV refrigerant charge states across modern A2L (**R-454B**, **R-32**) and legacy gases (**R-410A**, **R-22**) with comprehensive fault analysis.
* **Inputs**:
  * `meteringDevice`: Enum (`fixed_orifice` | `txv_eev`), default: `txv_eev`.
  * `refrigerant`: Enum (`r454b` | `r32` | `r410a` | `r22` | `r134a` | `r404a` | `r407c`), default: `r410a`.
  * `outdoorDb`: Float, unit: `°F`, default: `95.0`, min: `55.0`, max: `115.0`.
  * `indoorWb`: Float, unit: `°F`, default: `67.0`, min: `50.0`, max: `76.0`.
  * `suctionPressure`: Float, unit: `psig`, default: `118.0`, min: `10.0`, max: `600.0`.
  * `suctionTemp`: Float, unit: `°F`, default: `54.0`, min: `-20.0`, max: `120.0`.
  * `liquidPressure`: Float, unit: `psig`, default: `335.0`, min: `20.0`, max: `650.0`.
  * `liquidTemp`: Float, unit: `°F`, default: `94.0`, min: `30.0`, max: `150.0`.
  * `targetSubcooling`: Float, unit: `°F`, default: `10.0`, min: `5.0`, max: `20.0`.
* **Outputs**:
  * `actualSuperheat`: `°F`, precision: `0.1 °F`.
  * `targetSuperheat`: `°F` (fixed orifice mode).
  * `actualSubcooling`: `°F`, precision: `0.1 °F` (TXV mode).
  * `diagnosticIndication`: Enum (`optimal` | `possible_undercharge` | `possible_overcharge` | `possible_low_airflow`).
  * `actionChecklist`: Array of diagnostic verification steps.
* **Assumptions**: Steady-state operation (system running $\ge 15\text{ minutes}$); accurate digital gauges and calibrated pipe clamps.
* **Calculation Method**: `SRC-SHSC-01`, `SRC-SHSC-02`, `SRC-REFRIG-01`.
* **Engineering References**: `SRC-SHSC-01`, `SRC-SHSC-02`, `SRC-REFRIG-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Pressures 10 to 650 psig; Temperatures -20°F to 150°F.
* **Warnings**: A2L safety notice for R-454B / R-32; non-definitive diagnostic decision-support disclaimer.
* **Errors**: Rejects wet bulb $> 76^\circ\text{F}$ or outdoor dry bulb $< 55^\circ\text{F}$ for target superheat charging.
* **Safety Notes**: Decision support only; never add refrigerant without checking indoor airflow and manufacturer data.
* **URL Parameters**: `?mode=txv&refrig=r410a&p_liq=335&t_liq=94`.
* **Cross-Tool Handoffs**: 1-click link to `/calculators/pt-chart?refrigerant=r454b`.
* **Offline Requirements**: Fully offline capable via pre-cached PT tables.
* **Accessibility Requirements**: Diagnostic status uses distinct geometric icons and explicit text badges.
* **Analytics Events**: `calculator_started`, `result_generated`, `validation_error`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-SHSC-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Does not account for microchannel coil charging sensitivities.

---

### 10. `pt-chart` — Digital Refrigerant PT Chart
* **ID**: `pt-chart`
* **Name**: Digital Refrigerant Pressure-Temperature Chart
* **Route**: `/calculators/pt-chart`
* **Pillar**: `/field-diagnostics`
* **Status**: `planned` | **Launch Phase**: `1` | **Risk Level**: `High`
* **Primary Keyword**: `pt chart`
* **Secondary Keywords**: `refrigerant pt chart`, `r410a pt chart`, `r32 pt chart`, `r454b pt chart`
* **Primary Persona**: Field Technicians, Trade Students, Instructors
* **Primary Intent**: Navigational / Field Lookup
* **Purpose**: High-precision interactive pressure-to-saturation-temperature lookup across all major refrigerants with discrete bubble/dew curve support for zeotropic blends.
* **Inputs**:
  * `refrigerant`: Enum (`r454b` | `r32` | `r410a` | `r22` | `r134a` | `r404a` | `r407c`), default: `r410a`.
  * `pressurePsig`: Float, unit: `psig`, default: `118.0`, min: `0.0`, max: `650.0`.
  * `temperatureF`: Float, unit: `°F`, default: `40.0`, min: `-60.0`, max: `160.0`.
  * `solveTarget`: Enum (`temp_from_pressure` | `pressure_from_temp`), default: `temp_from_pressure`.
* **Outputs**:
  * `satTempF`: `°F`, precision: `0.1 °F`.
  * `satTempC`: `°C`, precision: `0.1 °C`.
  * `bubbleTemp`: `°F` (for zeotropes).
  * `dewTemp`: `°F` (for zeotropes).
* **Assumptions**: NIST REFPROP v10.0 saturation data; standard sea-level gauge reference.
* **Calculation Method**: Linear interpolation on 0.5 psi pre-computed NIST grid (`SRC-REFRIG-01`).
* **Engineering References**: `SRC-REFRIG-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Pressures 0 to 650 psig; Temperatures -60°F to 160°F.
* **Warnings**: Warns if pressure is near critical point where saturation curves diverge.
* **Errors**: Explicit `OutOfRangeError` if pressure exceeds maximum calibrated table bound (no silent extrapolation).
* **Safety Notes**: A2L flammability reminder for R-454B and R-32.
* **URL Parameters**: `?refrig=r454b&psig=118`.
* **Cross-Tool Handoffs**: Links to `superheat-subcooling-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Interactive slider paired with numeric input box and accessible data table.
* **Analytics Events**: `calculator_started`, `result_generated`, `unit_changed`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-PT-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Gauge pressures assume 14.696 psia atmospheric reference.

---

### 11. `psychrometric-calculator` — Interactive Psychrometric Chart & Air Properties
* **ID**: `psychrometric-calculator`
* **Name**: Psychrometric Chart & Moist Air Calculator
* **Route**: `/calculators/psychrometric-calculator`
* **Pillar**: `/field-diagnostics`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `High`
* **Primary Keyword**: `psychrometric calculator`
* **Secondary Keywords**: `psychrometric chart calculator`, `moist air properties`
* **Primary Persona**: Mechanical Engineers, HVAC Designers, Building Scientists
* **Primary Intent**: Engineering / Psychrometrics
* **Purpose**: Thermodynamic state point solver accepting any 2 independent moist air properties with altitude compensation and clean canvas process line tracing.
* **Inputs**:
  * `inputPair`: Enum (Pair 1 through Pair 7, e.g. `tdb_rh`, `tdb_twb`, `tdb_tdp`, `tdb_w`, `tdb_h`, `twb_rh`, `tdp_rh`).
  * `val1`: Float (Primary input 1).
  * `val2`: Float (Primary input 2).
  * `pressureMode`: Enum (`sea_level` | `elevation` | `custom_pressure`), default: `sea_level`.
  * `elevationFt`: Float, unit: `ft`, default: `0`, min: `-1000`, max: `15000`.
* **Outputs**:
  * `dryBulb`: `°F`, precision: `0.1 °F`.
  * `wetBulb`: `°F`, precision: `0.1 °F`.
  * `dewPoint`: `°F`, precision: `0.1 °F`.
  * `relativeHumidity`: `%`, precision: `0.1 %`.
  * `humidityRatio`: `lb/lb` and `grains/lb`, precision: `0.00001 lb/lb`.
  * `enthalpy`: `BTU/lb`, precision: `0.01 BTU/lb`.
  * `specificVolume`: `ft³/lb`, precision: `0.001 ft³/lb`.
* **Assumptions**: ASHRAE Handbook—Fundamentals 2021 formulation for ideal moist air mixtures.
* **Calculation Method**: `SRC-PSY-01`, `SRC-PSY-02`.
* **Engineering References**: `SRC-PSY-01`, `SRC-PSY-02` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Dry Bulb -40°F to 200°F; Pressure 10.0 to 16.0 psia; Elevation -1,000 to 15,000 ft.
* **Warnings**: Condensation / supersaturation warning when relative humidity reaches 100%.
* **Errors**: Rejects impossible physical states ($T_{\text{wb}} > T_{\text{db}}$ or $T_{\text{dp}} > T_{\text{db}}$).
* **Safety Notes**: Mold growth risk notice when sustained indoor relative humidity exceeds 60%.
* **URL Parameters**: `?pair=tdb_rh&v1=75&v2=50&elev=0`.
* **Cross-Tool Handoffs**: Passes enthalpy delta to `cfm-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Canvas state point visualizer accompanied by structured HTML results table.
* **Analytics Events**: `calculator_started`, `result_generated`, `unit_changed`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-PSY-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Standard ASHRAE ideal gas formulations diverge at extreme high pressures ($>50\text{ psia}$).

---

### 12. `heat-pump-size-calculator` — Heat Pump Sizing & Balance Point Tool
* **ID**: `heat-pump-size-calculator`
* **Name**: Heat Pump Sizing & Balance Point Tool
* **Route**: `/calculators/heat-pump-size-calculator`
* **Pillar**: `/heating-systems`
* **Status**: `planned` | **Launch Phase**: `2` | **Risk Level**: `Medium`
* **Primary Keyword**: `heat pump size calculator`
* **Secondary Keywords**: `heat pump sizing`, `cold climate heat pump sizing`
* **Primary Persona**: Homeowners, Electrification Planners, HVAC Contractors
* **Primary Intent**: Commercial / Electrification
* **Purpose**: Solves thermal balance points, models cold-climate heating capacity derate curves (47°F, 17°F, -5°F), and sizes auxiliary electric backup heat strips.
* **Inputs**:
  * `designHeatLossBtu`: Float, unit: `BTU/hr`, default: `45000`, min: `5000`, max: `200000`.
  * `outdoorDesignTemp`: Float, unit: `°F`, default: `15.0`, min: `-25.0`, max: `45.0`.
  * `heatPumpRating47`: Float, unit: `BTU/hr`, default: `36000`, min: `12000`, max: `60000`.
  * `compressorType`: Enum (`standard_inverter` | `cold_climate_hyper_heat`), default: `cold_climate_hyper_heat`.
* **Outputs**:
  * `thermalBalancePoint`: `°F`, precision: `0.5 °F`.
  * `capacityAtDesignTemp`: `BTU/hr`.
  * `auxiliaryHeatNeededKw`: `kW`, precision: `0.5 kW`.
* **Assumptions**: Linear building heat loss line; manufacturer capacity derate curves based on NEEP database.
* **Calculation Method**: `SRC-HP-01`.
* **Engineering References**: `SRC-HP-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Design temps -25°F to 45°F; Heat loss 5k to 200k BTU/hr.
* **Warnings**: Warns if thermal balance point is above 35°F (suggesting undersized heat pump or high heat loss).
* **Errors**: Rejects design temp higher than indoor setpoint (70°F).
* **Safety Notes**: Backup electric heat strips require dedicated high-amperage electrical service.
* **URL Parameters**: `?loss=45000&design_t=15&hp_btu=36000`.
* **Cross-Tool Handoffs**: Receives `?btu=` from `btu-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Interactive balance point chart backed by an accessible tabular breakdown.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-HP-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Economic balance point calculation requires user input of relative local electricity and gas prices.

---

### 13. `furnace-size-calculator` — Gas & Electric Furnace Output Sizer
* **ID**: `furnace-size-calculator`
* **Name**: Furnace Sizing & AFUE Efficiency Calculator
* **Route**: `/calculators/furnace-size-calculator`
* **Pillar**: `/heating-systems`
* **Status**: `planned` | **Launch Phase**: `2` | **Risk Level**: `Medium`
* **Primary Keyword**: `furnace size calculator`
* **Secondary Keywords**: `gas furnace sizing`, `furnace btu calculator`
* **Primary Persona**: Homeowners, Heating Contractors
* **Primary Intent**: Commercial / High-Ticket Replacement
* **Purpose**: Calculates delivered heating output from nameplate input BTU and AFUE efficiency rating and cross-checks blower temperature rise limits.
* **Inputs**:
  * `inputBtu`: Float, unit: `BTU/hr`, default: `80000`, min: `20000`, max: `250000`.
  * `afue`: Float, unit: `%`, default: `96.0`, min: `80.0`, max: `98.5`.
  * `blowerCfm`: Float, unit: `CFM`, default: `1200`, min: `400`, max: `3000`.
* **Outputs**:
  * `netDeliveredBtu`: `BTU/hr`, precision: `100 BTU/hr`.
  * `calculatedTempRise`: `°F`, precision: `0.5 °F`.
  * `tempRiseStatus`: Enum (`normal` | `too_high` | `too_low`).
* **Assumptions**: DOE test procedure AFUE rating standard.
* **Calculation Method**: `SRC-FURN-01`, `SRC-CFM-01`.
* **Engineering References**: `SRC-FURN-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: 20k to 250k BTU input; AFUE 80% to 98.5%.
* **Warnings**: Informs user if calculated temperature rise exceeds typical $40^\circ\text{F}\text{--}70^\circ\text{F}$ data plate range (risk of high-limit trip).
* **Errors**: Rejects non-positive input BTU or AFUE outside 70%–100%.
* **Safety Notes**: Fuel gas combustion requires certified flue venting and fresh combustion air.
* **URL Parameters**: `?btu_in=80000&afue=96&cfm=1200`.
* **Cross-Tool Handoffs**: Passes `?cfm=` to `ductulator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Sliders support keyboard navigation.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-FURN-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Does not model multi-stage gas valve modulation.

---

### 14. `boiler-size-calculator` — Hydronic Boiler & Radiator Sizer
* **ID**: `boiler-size-calculator`
* **Name**: Hydronic Boiler & Baseboard Sizing Calculator
* **Route**: `/calculators/boiler-size-calculator`
* **Pillar**: `/heating-systems`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `Medium`
* **Primary Keyword**: `boiler size calculator`
* **Secondary Keywords**: `hydronic heating calculator`, `baseboard sizing`
* **Primary Persona**: Hydronic Heating Contractors, Plumbers, Homeowners
* **Primary Intent**: High Commercial / Hydronics
* **Purpose**: Sizes residential hydronic heating boilers based on baseboard linear footage, cast-iron radiator Equivalent Direct Radiation (EDR), and domestic hot water indirect tank allowances.
* **Inputs**:
  * `baseboardLinearFt`: Float, unit: `ft`, default: `100`, min: `0`, max: `1000`.
  * `waterTemp`: Float, unit: `°F`, default: `180`, min: `130`, max: `200`.
  * `radiatorEdrSqFt`: Float, unit: `sq ft EDR`, default: `0`, min: `0`, max: `2000`.
  * `dhwPriority`: Boolean, default: `false`.
* **Outputs**:
  * `radiationBtu`: `BTU/hr`.
  * `pipingPickupFactor`: `BTU/hr` (15% standard adder).
  * `recommendedNetBoilerBtu`: `BTU/hr`.
* **Assumptions**: 550 BTU/hr per ft copper fin-tube @ 180°F AWT; 150 BTU/hr per sq ft hot water EDR; 15% piping/pickup factor.
* **Calculation Method**: `SRC-BOIL-VERIFY-01`.
* **Engineering References**: `SRC-BOIL-VERIFY-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Baseboard 0 to 1,000 ft; EDR 0 to 2,000 sq ft.
* **Warnings**: Advises user that modern condensing boilers achieve maximum efficiency only at lower return water temperatures ($<130^\circ\text{F}$).
* **Errors**: Rejects total radiation input equal to zero.
* **Safety Notes**: Hydronic boilers require functional pressure relief valves (30 psi standard) and backflow preventers.
* **URL Parameters**: `?ft=100&temp=180&edr=0`.
* **Cross-Tool Handoffs**: N/A.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: All input controls accessible via standard keyboard navigation.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-BOIL-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Steam boiler sizing requires steam-specific EDR calculations (240 BTU/sq ft EDR).

---

### 15. `garage-heater-sizing` — Garage & Workshop Heater Sizer
* **ID**: `garage-heater-sizing`
* **Name**: Garage & Workshop Heater Sizing Calculator
* **Route**: `/calculators/garage-heater-sizing`
* **Pillar**: `/heating-systems`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `Low`
* **Primary Keyword**: `garage heater sizing calculator`
* **Secondary Keywords**: `shop heater sizing`, `garage heater btu calculator`
* **Primary Persona**: DIY Homeowners, Workshop Enthusiasts, Heating Contractors
* **Primary Intent**: Commercial / DIY Heating
* **Purpose**: Calculates required heating capacity for attached and detached garages/shops accounting for uninsulated concrete slab losses and overhead door infiltration.
* **Inputs**:
  * `presetSize`: Enum (`1_car` | `2_car` | `3_car` | `custom`), default: `2_car`.
  * `lengthFt`: Float, default: `24`, min: `10`, max: `100`.
  * `widthFt`: Float, default: `24`, min: `10`, max: `100`.
  * `heightFt`: Float, default: `10`, min: `8`, max: `20`.
  * `insulationLevel`: Enum (`uninsulated` | `semi_insulated` | `fully_insulated`), default: `semi_insulated`.
  * `outdoorDesignTemp`: Float, unit: `°F`, default: `20`, min: `-30`, max: `50`.
  * `targetInsideTemp`: Float, unit: `°F`, default: `65`, min: `45`, max: `75`.
* **Outputs**:
  * `requiredBtu`: `BTU/hr`, precision: `1000 BTU/hr`.
  * `requiredElectricKw`: `kW`, precision: `0.5 kW`.
  * `recommendedHeaterType`: String (e.g. `45,000 BTU Gas Unit Heater or 7.5 kW Forced Air Electric`).
* **Assumptions**: 45 BTU/sqft uninsulated; 25–30 BTU/sqft semi-insulated; 15–20 BTU/sqft well-insulated.
* **Calculation Method**: `SRC-GARAGE-VERIFY-01`.
* **Engineering References**: `SRC-GARAGE-VERIFY-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: 100 to 10,000 sq ft; $\Delta T$ 10°F to 80°F.
* **Warnings**: Highlights extreme heat loss from uninsulated metal overhead doors.
* **Errors**: Rejects target inside temp $\le$ outdoor design temp.
* **Safety Notes**: Forced-air garage heaters must be mounted at least 8 ft above floor level in automotive shops to prevent ignition of gasoline vapors (NFPA 30A).
* **URL Parameters**: `?size=2_car&insul=semi&out_t=20&in_t=65`.
* **Cross-Tool Handoffs**: N/A.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Preset buttons announce state change to screen readers.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-GARAGE-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Assumes closed garage doors; opening large overhead doors creates immediate cold air influx.

---

### 16. `r-value-calculator` — Insulation R-Value & U-Factor Sizer
* **ID**: `r-value-calculator`
* **Name**: Insulation R-Value & U-Factor Calculator
* **Route**: `/calculators/r-value-calculator`
* **Pillar**: `/building-science`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `Low`
* **Primary Keyword**: `r value for insulation`
* **Secondary Keywords**: `r value calculator`, `u factor calculator`, `thermal resistance`
* **Primary Persona**: Architects, Energy Auditors, Insulation Contractors, Homeowners
* **Primary Intent**: Informational / Energy Audit / Code Compliance
* **Purpose**: Stacks multi-layer building envelope assemblies (siding, continuous foam, cavity insulation, drywall) to compute total $R_{\text{total}}$, overall $U$-factor, and IECC code compliance.
* **Inputs**:
  * `assemblyType`: Enum (`exterior_wall` | `attic_roof` | `floor_crawlspace`), default: `exterior_wall`.
  * `layers`: Array of `{ materialId: string, thicknessInches: number, rValue: number }`.
  * `climateZone`: Enum (`zone_1` through `zone_7`), default: `zone_4`.
* **Outputs**:
  * `totalRValue`: `hr·ft²·°F/BTU`, precision: `0.1`.
  * `overallUFactor`: `BTU/hr·ft²·°F`, precision: `0.001`.
  * `ieccCodeCompliance`: Enum (`meets_code` | `below_code`).
  * `prescriptiveCodeTarget`: String (e.g. `IECC 2021 Zone 4 Target: R-20 cavity or R-13 + 5 ci`).
* **Assumptions**: 1D series thermal resistance ($R_{\text{total}} = \sum R_i$); framing factor 25% for 16" o.c. wood studs.
* **Calculation Method**: `SRC-ENV-01`.
* **Engineering References**: `SRC-ENV-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: $R$-value 1 to 100; Thickness 0.25 to 24 inches.
* **Warnings**: Advises user on thermal bridging losses across uninsulated wood/steel framing studs.
* **Errors**: Rejects assembly with zero layers.
* **Safety Notes**: Proper vapor retarder placement (Class I/II/III) is essential to prevent moisture condensation inside wall cavities.
* **URL Parameters**: Hash-encoded layer list.
* **Cross-Tool Handoffs**: Passes $U$-factor to `heat-loss-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Layer table allows keyboard reordering and deletion.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-RVAL-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: 1-dimensional model does not perform 2D finite-element thermal bridge simulation.

---

### 17. `heat-loss-calculator` — Building Heat Loss Calculator
* **ID**: `heat-loss-calculator`
* **Name**: Building Heat Loss & Infiltration Calculator
* **Route**: `/calculators/heat-loss-calculator`
* **Pillar**: `/building-science`
* **Status**: `planned` | **Launch Phase**: `3` | **Risk Level**: `Medium`
* **Primary Keyword**: `heat loss calculator`
* **Secondary Keywords**: `building heat loss calculator`, `heat loss estimator`
* **Primary Persona**: Building Performance Contractors, Energy Raters, Mechanical Engineers
* **Primary Intent**: Technical / Energy Audit
* **Purpose**: Combines conductive envelope heat losses ($\sum U \cdot A \cdot \Delta T$) with air infiltration leakage ($1.08 \cdot \text{CFM}_{\text{inf}} \cdot \Delta T$) to calculate peak building heat loss.
* **Inputs**:
  * `wallArea`: Float, unit: `sq ft`, default: `1800`.
  * `wallUFactor`: Float, default: `0.060`.
  * `roofArea`: Float, unit: `sq ft`, default: `1500`.
  * `roofUFactor`: Float, default: `0.026` (R-38).
  * `windowArea`: Float, unit: `sq ft`, default: `250`.
  * `windowUFactor`: Float, default: `0.30`.
  * `airTightness`: Enum (`tight_new` | `average_modern` | `leaky_older`), default: `average_modern`.
  * `deltaT`: Float, unit: `°F`, default: `50` (70°F inside, 20°F outside).
* **Outputs**:
  * `conductiveLossBtu`: `BTU/hr`.
  * `infiltrationLossBtu`: `BTU/hr`.
  * `totalPeakHeatLossBtu`: `BTU/hr`, precision: `100 BTU/hr`.
  * `totalHeatLossKw`: `kW`, precision: `0.1 kW`.
* **Assumptions**: Conductive $Q = U \cdot A \cdot \Delta T$; Infiltration based on estimated air change rate ($0.35\text{ ACH}$ average).
* **Calculation Method**: `SRC-ENV-01`, `SRC-CFM-01`.
* **Engineering References**: `SRC-ENV-01`, `SRC-CFM-01` in [08-engineering-source-register.md](./08-engineering-source-register.md).
* **Validity Range**: Floor areas 100 to 20,000 sq ft; $\Delta T$ 10°F to 100°F.
* **Warnings**: Air leakage often accounts for $>30\%$ of total heat loss in older homes.
* **Errors**: Rejects negative areas or $\Delta T \le 0$.
* **Safety Notes**: Tightly sealed buildings ($<3\text{ ACH50}$) require dedicated mechanical ventilation (HRV/ERV) to comply with ASHRAE 62.2.
* **URL Parameters**: `?wall_a=1800&roof_a=1500&dt=50`.
* **Cross-Tool Handoffs**: Passes total heating load to `boiler-size-calculator` and `furnace-size-calculator`.
* **Offline Requirements**: Fully offline capable.
* **Accessibility Requirements**: Loss distribution rendered as an accessible data table alongside visual charts.
* **Analytics Events**: `calculator_started`, `result_generated`, `share_clicked`.
* **Schema Strategy**: `WebApplication`, `BreadcrumbList`, `FAQPage`.
* **Acceptance Tests**: `GOLD-LOSS-01` in [09-validation-and-test-matrix.md](./09-validation-and-test-matrix.md).
* **Known Limitations**: Simplified infiltration estimation; blower door CFM50 multipoint depressurization test required for exact leakage measurement.
