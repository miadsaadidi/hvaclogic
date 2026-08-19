# HVAC Lab — SERP Competitor Evidence & Opportunity Analysis

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [01-keyword-research-master.md](./01-keyword-research-master.md), [03-calculators-and-features-list.md](./03-calculators-and-features-list.md), [07-master-seo-strategy.md](./07-master-seo-strategy.md)

---

## 1. Competitive Audit Methodology

This document records direct observations from live SERP audits across primary target HVAC keyword clusters. All observations are based on measurable engineering, user experience, and technical attributes:
* **Mobile Responsiveness**: Layout stability on viewport widths $<480\text{px}$.
* **Data Transparency**: Presence of governing engineering equations, source citations, and variable definitions.
* **Modern Standard Support**: Inclusion of 2025/2026 EPA AIM Act low-GWP refrigerants (**R-454B**, **R-32**).
* **Friction & Gatekeeping**: Requirement for email capture, paywalls, or multi-step lead forms.
* **Offline / PWA Capability**: Ability to execute calculations without active internet connectivity.

---

## 2. Cluster-by-Cluster Competitor Evidence Register

---

### Cluster A: Airflow & Duct Sizing Tools (`ductulator`, `flex duct cfm chart`)

#### Competitor 1: CalcPanel Online Ductulator
* **Competitor URL**: `calcpanel.com/hvac/ductulator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Form-based desktop interface; non-responsive input fields on mobile screens.
  * Lacks real-time 2D duct geometry visualization.
  * No support for flexible duct compression/sag derating.
  * Does not support aspect ratio locking for height-restricted ceiling joists.
* **HVAC Lab Opportunity**: Instant solve-for modes, real-time Canvas cross-section with SMACNA acoustic threshold indicators, flexible duct sag slider (0%–30%), and 1-click printable PDF job sheets.

#### Competitor 2: Ensign Free Online Ductulator
* **Competitor URL**: `ensign.co.uk/ductulator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Uses Darcy-Weisbach equations for pressure drop.
  * Interface requires page reloads on certain parameter adjustments.
  * No offline PWA support for mechanical rooms.
* **HVAC Lab Opportunity**: Client-side reactive computation (zero reloads), full offline PWA caching, and clean URL parameter sharing.

### Cluster A3: Flexible Duct CFM & Friction Chart (`flex duct cfm chart`, `flex duct sizing`)

#### Competitor A3.1: Hart & Cooley Flexible Duct Engineering Bulletin
* **Competitor URL**: `hartandcooley.com/engineering/flex-duct-friction`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static PDF engineering charts with dense microscopic print.
  * Assumes 100% lab-installed straight tension (0% compression), giving unrealistically high CFM estimates for field installs.
  * No interactive diameter filtering or friction rate switching.
* **HVAC Lab Opportunity**: Interactive 4"–20" matrix with live SMACNA/ADC compression slider (0%, 4%, 15%, 30%), dynamic CFM recalculation, and printable 1-page truck reference card.

#### Competitor A3.2: PickHVAC Flex Duct Sizing Table
* **Competitor URL**: `pickhvac.com/duct/flex-sizing`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Only lists 3 standard diameters (6", 8", 10") at fixed 0.05 and 0.10 in.wg.
  * Missing 4", 5", 7", 9", 12", 14", 16", 18", and 20" sizes.
  * No visual representation of duct deflection or velocity noise.
* **HVAC Lab Opportunity**: Complete 12-diameter matrix, live SVG catenary sag visualizer with hanger straps and core helix, and acoustic comfort pill badges.

### Cluster A4: Kitchen Range Hood CFM & Make-Up Air (`kitchen hood cfm calculator`, `range hood make up air`)

#### Competitor A4.1: Proline Range Hoods CFM Calculator
* **Competitor URL**: `prolinerangehoods.com/cfm-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Calculates gas BTU ($100\text{ CFM per 10k BTU}$) and electric linear width ($100\text{ CFM per linear foot}$).
  * Completely ignores **International Residential Code (IRC) Section M1503.6** make-up air damper requirements.
  * Does not calculate duct equivalent length static pressure losses ($90^\circ$ elbows, transitions, roof caps).
* **HVAC Lab Opportunity**: Automatic IRC Section M1503.6 make-up air code alert for exhaust $>400\text{ CFM}$, duct equivalent length calculator, island hood open-air capture penalty multiplier ($1.30\times$), and round duct size recommendation (6", 8", 10").

#### Competitor A4.2: Fantech Range Hood & Make-Up Air Guide
* **Competitor URL**: `fantech.net/kitchen-ventilation`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Detailed engineering guide on motorized make-up air dampers.
  * Static text and PDF diagrams without an instant sizing tool.
* **HVAC Lab Opportunity**: Interactive make-up air damper sizing, live SVG hood canopy capture visualizer with thermal plume and backdraft protection alerts.

### Cluster A2: HVAC Airflow Volume & Velocity (`cfm calculator`, `hvac cfm calculator`)

#### Competitor A1: PickHVAC CFM Calculator
* **Competitor URL**: `pickhvac.com/calculator/cfm`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Basic room volume calculator ($L \times W \times H \times ACH / 60$).
  * Lacks duct cross-sectional velocity calculation ($CFM = FPM \times Area$).
  * No sensible heat thermal equation mode ($CFM = Q / (1.08 \times \Delta T)$).
  * No acoustic velocity indicators or duct sizing handoffs.
* **HVAC Lab Opportunity**: 5-in-1 multi-mode engine: (1) Duct Velocity & Area, (2) Sensible Thermal Load, (3) Room ACH Air Turnover, (4) Nominal Tonnage ($400\text{ CFM/ton}$), and (5) Electric Heat Strip CFM.

#### Competitor A2: EngineeringToolBox Airflow Volume
* **Competitor URL**: `engineeringtoolbox.com/airflow-ducts-d_233.html`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Raw static text equations without interactive input forms.
  * Clunky desktop-only interface filled with intrusive advertisements.
  * No room air turnover cycle time or acoustic noise classification.
* **HVAC Lab Opportunity**: Interactive animated room & duct circulation SVG visualizer, instant mode switching, and SMACNA acoustic rating pills (`🟢 Whisper Quiet`, `🟡 Standard`, `🔴 High Velocity`).

#### Competitor A3: OmniCalculator Airflow / CFM
* **Competitor URL**: `omnicalculator.com/physics/airflow`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Generic physics tool disconnected from residential HVAC equipment standards.
  * No cross-links to duct sizing tools or cooling tonnage calculators.
* **HVAC Lab Opportunity**: Instant presets for residential living (5 ACH), kitchens (8 ACH), commercial offices (6 ACH), cleanrooms (20 ACH), and direct workflow handoff to `/calculators/ductulator?cfm=...`.

---

### Cluster B: AC Tonnage & Model Number Decoding (`how to find ac tonnage`)

#### Competitor 3: Trane & Carrier Educational Guides
* **Competitor URL**: `trane.com/residential/en/resources/how-to-find-ac-tonnage`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static long-form blog articles explaining model numbers in text paragraphs.
  * No interactive input field or regex parsing utility.
  * Users must manually read 15-character serial strings and cross-reference static tables.
* **HVAC Lab Opportunity**: Instant interactive regex decoder matching Carrier, Trane, Goodman, Lennox, Rheem, and York serial strings to immediately output nominal tonnage, BTU, and recommended CFM airflow.

#### Competitor 4: Tonnage Calculator AC
* **Competitor URL**: `tonnagecalculatorac.com`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Single input box calculating flat 20 BTU/sq ft with zero climate or insulation adjustments.
  * No visual equipment schematics or ACCA Manual S verification.
* **HVAC Lab Opportunity**: 5-zone US climate matrix, whole-house sensible vs latent load breakdowns, interactive 3D/2D visualizer, and direct workflow handoff to CFM and duct sizing.

### Cluster B2: Mini-Split Multi-Zone Sizing (`mini split sizing calculator`, `multi zone mini split sizing`)

#### Competitor B2.1: eComfort / Power Equipment Direct Multi-Zone Sizer
* **Competitor URL**: `ecomfort.com/mini-split-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * E-commerce wizard optimized for adding products to a shopping cart.
  * Fixed room step flow without showing total system diversity or simultaneous load curves.
  * Does not calculate over-subscription ratio ($100\%\text{--}130\%$ inverter capacity).
* **HVAC Lab Opportunity**: Dynamic multi-zone room builder (add/remove up to 6 custom rooms), individual indoor head matching (6k, 9k, 12k, 18k, 24k BTU), total combined load summing, outdoor multi-port condenser sizing, and inverter diversity / over-subscription percentage gauge.

#### Competitor B2.2: Sylvane Ductless Mini-Split Sizing Guide
* **Competitor URL**: `sylvane.com/mini-split-sizing-guide`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static room square footage lookup table (100–250 sq ft = 9k BTU, 250–400 sq ft = 12k BTU).
  * No interactive tool to model a multi-room house (e.g. 3 bedrooms + living room).
* **HVAC Lab Opportunity**: Interactive multi-room floor plan visualizer showing linesets connecting outdoor multi-port condenser to indoor heads with live capacity and BTU distribution breakdown.

---

### Cluster C: Field Charging Diagnostics & PT Charts (`superheat calculator`, `pt chart`)

#### Competitor 5: HVAC School Online Calculators
* **Competitor URL**: `hvacrschool.com/calculators`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Good technical accuracy for legacy refrigerants (R-410A, R-22).
  * Missing next-generation A2L low-GWP refrigerants (**R-454B** with bubble/dew glide).
  * No visual pressure gauge needles or fault-isolation checklists.
* **HVAC Lab Opportunity**: Full support for R-454B and R-32, discrete bubble/dew curve toggles for zeotropic blends, and non-definitive decision-support diagnostic advice.

#### Competitor 6: Solver360 HVAC Calculator
* **Competitor URL**: `solver360.com/hvac`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Basic text inputs with single-point subtraction.
  * Lacks offline field capability when cellular data is unavailable.
* **HVAC Lab Opportunity**: Service Worker offline caching, tactile sliders with numeric steppers, and EPA boundary condition warnings.

#### Competitor C3: Danfoss Ref Tools / Emerson Copeland Mobile PT
* **Competitor URL**: `danfoss.com/ref-tools`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Native app download required (cannot be accessed instantly via web search in browser).
  * Clunky slider precision on small mobile touchscreens.
* **HVAC Lab Opportunity**: Zero-install web tool with instant client-side NIST equations, interactive manifold pressure gauge visualizer, bubble/dew curve switches, and 1-click printable PT truck cards.

#### Competitor C4: National Refrigerants Pocket PT Wheel / PDF Chart
* **Competitor URL**: `refrigerants.com/pt-chart`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static printed paper slide-rules or microscopic 6-point font PDF tables.
  * Difficult to read in dark attics or direct outdoor sunlight.
* **HVAC Lab Opportunity**: High-contrast dark mode with high-visibility cyan/amber needles, instant two-way lookup (Pressure ↔ Saturation Temp), and full exportable CSV lookup matrix.

---

### Cluster D: Whole-Home BTU & Load Sizing (`btu calculator`, `hvac load calculator`)

#### Competitor 7: ServiceTitan / LoadCalc
* **Competitor URL**: `servicetitan.com/tools/hvac-load-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Requires user email and phone number submission before displaying calculated load results.
  * Gated workflow causes high bounce rates for quick engineering estimates.
* **HVAC Lab Opportunity**: 100% free, ungated, instant client-side calculation with interactive SVG heat gain breakdown donut charts and direct workflow handoff to CFM airflow sizing.

### Cluster D2: Furnace Sizing & Heating BTU (`furnace btu calculator`, `furnace sizing calculator`)

#### Competitor D2.1: PickHVAC Furnace Sizing Calculator
* **Competitor URL**: `pickhvac.com/furnace/sizing-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Simple square footage multiplier (30 to 60 BTU/sq ft).
  * Fails to differentiate between **Input BTU** (gas burned) and **Output BTU** (usable heat into rooms).
  * Lacks AFUE efficiency dropdown (80% standard vs 96%+ two-stage condensing).
* **HVAC Lab Opportunity**: Dual Input/Output BTU metrics, 80% to 98% AFUE efficiency selector, envelope heat loss modifiers (insulation, window glazing, ceiling heights), and required blower airflow ($\text{CFM} = \text{Output BTU} / (1.08 \times \Delta T)$).

#### Competitor D2.2: HVAC.com What Size Furnace Do I Need
* **Competitor URL**: `hvac.com/resources/what-size-furnace-do-i-need`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static educational blog post with regional climate map graphics.
  * No interactive tool to test custom home dimensions or furnace cabinet sizing.
* **HVAC Lab Opportunity**: Interactive 5-zone US climate selector, interactive condensing heat exchanger visualizer with flame animation, and standard cabinet width matcher (14.5", 17.5", 21", 24.5").

### Cluster D3: Heat Pump Sizing & Thermal Balance Point (`heat pump size calculator`, `heat pump balance point`)

#### Competitor D3.1: NEEP Cold Climate Air-Source Heat Pump (ccASHP) List
* **Competitor URL**: `neep.org/heating-electrification/ccashp-product-list`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Excellent raw engineering database with multi-ambient test points (47°F, 17°F, 5°F, -5°F).
  * Clunky data-grid interface that does not plot the building heat loss intersection or calculate the thermal balance point.
* **HVAC Lab Opportunity**: Interactive graphical Thermal Balance Point intersection visualizer comparing building heat loss curves directly against inverter heating capacity curves ($47^\circ\text{F}\text{--}-15^\circ\text{F}$).

#### Competitor D3.2: Energy Vanguard Heat Pump Sizing Guide
* **Competitor URL**: `energyvanguard.com/blog/how-to-size-a-heat-pump`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Authoritative educational article detailing cooling vs. heating load oversizing dilemmas.
  * No interactive calculation tool to model supplementary electric heat strip requirements (kW).
* **HVAC Lab Opportunity**: Automatic auxiliary electric heat strip sizer ($kW = \frac{\text{Deficit BTU}}{3,412.14}$), dual-fuel balance point selector, and cooling vs heating oversizing check (ACCA Manual S compliance).

---

### Cluster E: Moist Air Psychrometrics (`psychrometric calculator`)

#### Competitor 8: PsychroSim / FlyCarpet
* **Competitor URL**: `psychrosim.com`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Complex desktop interfaces with tiny text controls and Java-era visual layouts.
  * Difficult to operate on touchscreens or mobile viewports.
* **HVAC Lab Opportunity**: Mobile-responsive ASHRAE-standard thermodynamic engine supporting all 7 standard 2-property input pairs, barometric pressure/altitude compensation, and lightweight canvas process tracing.

#### Competitor E2: EngineeringToolBox Moist Air Psychrometric Properties
* **Competitor URL**: `engineeringtoolbox.com/psychrometric-properties-d_145.html`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static equations and tables with heavy advertising.
  * No interactive visual chart with live state point crosshair tracking.
* **HVAC Lab Opportunity**: Live interactive SVG psychrometric state chart, dual IP (°F, BTU/lb) and SI (°C, kJ/kg) unit systems, and dew point comfort rating pills.

#### Competitor E3: TruTech Tools / Testo Psychrometric App
* **Competitor URL**: `trutechtools.com/psychrometrics`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * App-only or paid software subscription required.
* **HVAC Lab Opportunity**: 100% free, zero-login, client-side ASHRAE Fundamentals formulation with instant state point resolver.

### Cluster F: Building Science & Insulation R-Value (`r value for insulation`, `r value calculator`, `u factor calculator`)

#### Competitor F1: Insulation Institute R-Value Calculator
* **Competitor URL**: `insulationinstitute.org/im-a-homeowner/about-insulation/how-much-do-you-need`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Basic static climate map showing recommended DOE levels (e.g. R-38 or R-49 in attics).
  * Cannot construct multi-layer wall or roof assemblies (drywall + cavity + continuous foam + siding).
  * Lacks $U$-factor calculation ($U = 1 / R_{\text{total}}$) or thermal bridging reduction modeling.
* **HVAC Lab Opportunity**: Dynamic multi-layer assembly stack builder with 15+ standard construction materials, live $R_{\text{total}}$ and $U$-factor calculations, and **IECC 2021 / 2024 Climate Zone compliance badges (Zones 1–7)**.

#### Competitor F2: CalculatorSoup / OmniCalculator R-Value
* **Competitor URL**: `calculatorsoup.com/calculators/construction/r-value.php`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Generic arithmetic addition table with zero building science context.
  * No visual cross-section of the wall/roof assembly or heat flux vector arrows.
* **HVAC Lab Opportunity**: Interactive SVG cross-section visualizer displaying material layer textures, conductive heat transmission arrows, and indoor-to-outdoor temperature decay gradients.

### Cluster F2: Whole-Building Heat Loss & Infiltration (`heat loss calculator`, `building heat loss calculator`)

#### Competitor F2.1: Slant/Fin Heat Loss Calculator (Hydronic Explorer)
* **Competitor URL**: `slantfin.com/heat-loss-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Legacy desktop Windows software or mobile app with tiny dialog forms.
  * Lacks blower door air infiltration leakage modeling ($1.08 \times \text{CFM} \times \Delta T$).
  * Cannot adjust window U-factors or SHGC ratings dynamically.
* **HVAC Lab Opportunity**: Instant zero-install web application combining conductive envelope losses ($U \times A \times \Delta T$) across walls/ceilings/windows/slabs with blower door air leakage infiltration ($\text{ACH50} \rightarrow \text{ACH}_{\text{nat}}$), interactive SVG heat loss donut chart, and direct heating equipment handoffs.

#### Competitor F2.2: BuildGreenSmart Building Heat Loss Estimator
* **Competitor URL**: `buildgreensmart.com/heat-loss`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Simple spreadsheet-style table requiring manual U-factor entry.
  * No presets for common construction vintages (1960s uninsulated vs 2020s tight envelope).
* **HVAC Lab Opportunity**: Instant building vintage presets, conductive vs infiltration percentage breakdown, and equipment sizing recommendations (BTU/hr and kW).

### Cluster G: Hydronic Heating Boilers & Radiator Sizing (`boiler size calculator`, `baseboard sizing`, `radiator edr calculator`)

#### Competitor G1: Weil-McLain / SupplyHouse Boiler Sizing Guide
* **Competitor URL**: `supplyhouse.com/boiler-sizing`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Simple rule-of-thumb square footage lookup table (e.g. 50 BTU/sq ft).
  * Fails to support fin-tube baseboard linear footage or cast-iron radiator EDR measuring.
  * Ignores indirect water heater domestic hot water (DHW) priority zoning switches.
* **HVAC Lab Opportunity**: Multi-method boiler sizing engine supporting (1) Fin-Tube Baseboard Linear Footage, (2) Cast-Iron Radiator EDR (Hot Water & Steam), and (3) Heat Loss Load, with DHW Priority controller logic and standard AHRI / I=B=R Net Piping pick-up factors (1.15x).

#### Competitor G2: Burnham / U.S. Boiler EDR Calculator
* **Competitor URL**: `usboiler.net/edr-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static PDF chart of radiator section dimensions with no live calculation.
* **HVAC Lab Opportunity**: Live interactive EDR section accumulator (column, tube, wall radiators), hot water vs steam rating toggle, and visual hydronic loop schematic with boiler, expansion tank, and circulator pump.

### Cluster H: Garage & Workshop Heater Sizing (`garage heater sizing calculator`, `garage heater btu calculator`, `shop heater sizing`)

#### Competitor H1: Northern Tool / Mr. Heater Sizing Calculator
* **Competitor URL**: `northerntool.com/shop/tools/heater-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Basic $\text{Volume} \times \Delta T \times \text{Insulation Factor}$ simplified equation.
  * Completely ignores massive conductive slab edge perimeter heat loss ($F_p \times \text{Perimeter} \times \Delta T$).
  * Fails to distinguish between attached garages (shared warm wall) vs detached exposed shops.
  * No electrical circuit breaker sizing ($A = \frac{\text{Watts}}{240\text{V}}$) for electric unit heaters.
* **HVAC Lab Opportunity**: Comprehensive garage envelope model accounting for uninsulated concrete slabs, overhead door perimeter leakage, attached vs detached wall buffering, freeze-protection ($50^\circ\text{F}$) vs workshop ($65^\circ\text{F}$) setpoints, and dual Gas Unit Heater (BTU/hr) vs Electric Forced-Air (kW / 240V Amps) equipment recommendations.

#### Competitor H2: Modine Hot Dawg Sizing Guide
* **Competitor URL**: `modinehvac.com/hot-dawg-garage-heater`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static sizing chart with 30k, 45k, 60k, 75k, 100k, 125k unit tiers.
  * No interactive calculation tool.
* **HVAC Lab Opportunity**: Live interactive garage sizing tool with 1-car, 2-car, 3-car, and pole barn presets, overhead garage door R-value adjustments, and SVG suspended unit heater throw cone visualizer.

### Cluster I: Duct Total Equivalent Length (TEL) & Friction Loss Sizer (`duct friction loss calculator`, `total equivalent length hvac`, `acca manual d friction rate`)

#### Competitor I1: EngineeringToolBox Duct Fittings Loss Guide
* **Competitor URL**: `engineeringtoolbox.com/duct-equivalent-length-d_1052.html`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static text tables of fitting equivalent lengths.
  * No interactive accumulator or calculation of Available Static Pressure (ASP) or Design Friction Rate (FR).
* **HVAC Lab Opportunity**: Interactive Manual D fitting stack builder (elbows, takeoffs, dampers, boots), automatic Available Static Pressure solver ($\text{ASP} = \text{TESP} - \Delta P_{\text{devices}}$), and exact Design Friction Rate solver ($\text{FR} = \frac{\text{ASP} \times 100}{\text{TEL}}$).

### Cluster J: Combustion Air & Confined Space Sizer (`combustion air calculator`, `nfpa 54 combustion air`, `confined space combustion air`)

#### Competitor J1: GoodCalculators Combustion Air Calculator
* **Competitor URL**: `goodcalculators.com/combustion-air-calculator`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Simple input of total BTU with fixed single opening output.
  * Fails to support multi-appliance accumulation (e.g. Furnace + Water Heater + Boiler).
  * Ignores metal vs wood louver free area reduction factors (75% metal vs 25% wood).
  * No confined vs unconfined space volume threshold test ($50\text{ cu ft/1,000 BTU}$).
* **HVAC Lab Opportunity**: Full NFPA 54 / National Fuel Gas Code and IFGC compliance engine supporting multi-appliance stacks, confined space threshold testing, vertical vs horizontal outdoor ducts, indoor 2-opening methods, metal/wood louver free area derating, and SVG mechanical room visualizer.

### Cluster K: MERV Air Filter Sizing & Pressure Drop Sizer (`merv filter pressure drop calculator`, `hvac filter size calculator`, `filter face velocity calculator`)

#### Competitor K1: FilterBuy & AirCycler Filter Pressure Drop Guides
* **Competitor URL**: `filterbuy.com/resources/air-filter-pressure-drop`
* **Last Reviewed**: 2026-08-19
* **Measurable Observations**:
  * Static descriptive articles warning about MERV 13 static pressure without an interactive calculation tool.
  * No face velocity calculation (FPM = CFM / Area) or media thickness derating (1" vs 2" vs 4" media).
* **HVAC Lab Opportunity**: Interactive filter sizing engine solving Face Velocity (FPM), initial clean pressure drop ($\Delta P_{\text{clean}}$), loaded dirty filter drop ($\Delta P_{\text{loaded}}$), 1" vs 2" vs 4" deep pleat media comparisons, and blower static pressure budget warnings.

---

## 3. The 10/10 Product Value Proposition

```
┌─────────────────────────┬──────────────────────────────────────────┬────────────────────────────────────────────────────────┐
│ Dimension               │ Prevailing Competitor State              │ HVAC Lab 10/10 Standard                                │
├─────────────────────────┼──────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ Performance & Speed     │ Page reloads, server-side form posts     │ Instant client-side computation (<10ms update latency) │
│ Mobile Field Usability  │ Desktop-first layouts, unscaled tables   │ Responsive mobile dock (MobileResultBar) + 44px targets│
│ Modern Standards        │ R-22 and R-410A legacy data only         │ A2L Ready: R-454B, R-32, ASHRAE 2021, IECC 2024        │
│ Offline Reliability     │ Web-only; fails in basements & attics    │ Crawler-safe PWA engine with pre-cached math tables    │
│ Transparency & Trust    │ Black-box numbers with zero citations    │ Complete formula cards, variable tables & standards    │
│ Gating & Privacy        │ Forced email/phone capture for results   │ 100% ungated, privacy-first, zero PII collection       │
└─────────────────────────┴──────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```
