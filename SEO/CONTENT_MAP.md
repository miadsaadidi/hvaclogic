# HVACLogic Master Asset Inventory & Content Map

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.1.0 (Reconciled SSOT Inventory)  
**Last Updated**: 2026-09-16  
**Operational Status**: ACTIVE / AUTHORITATIVE ASSET REGISTRY  

---

## 1. Verified Inventory Summary

- **Production Calculators**: Exactly **21** active interactive tools.
- **Canonical Research Whitepapers**: Exactly **7** peer-reviewed technical reports.
- **Educational / Student Lab Monographs**: Exactly **2** courseware laboratory monographs.
- **Open Benchmark Datasets**: Exactly **6** published datasets with minted DOIs.
- **Interactive OER Lab Modules**: Exactly **3** HTML5 client-side courseware units.
- **Engineering Master Guides**: Exactly **5** published pillar guides + **3** scheduled rollout guides.
- **Category Pillar Hubs**: Exactly **5** flat thematic category pages.
- **Directory & Governance Hubs**: Exactly **10** platform-level authority hubs.

---

## 2. Pillar Hub Pages (Level 1 Categories — Exactly 5)

| Asset ID | Title | Route / Canonical URL | Asset Type | Cluster | Search Intent | Schema | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HUB-AIR` | Airflow, Duct Sizing & Aerodynamics Hub | `https://hvaclogic.org/airflow-ducts` | Topic Hub | Airflow & Ducts | Informational / Directory | `CollectionPage`, `BreadcrumbList` | P1 | Active |
| `HUB-COOL` | Cooling Loads, AC Tonnage & Sizing Hub | `https://hvaclogic.org/cooling-loads` | Topic Hub | Cooling & Loads | Informational / Directory | `CollectionPage`, `BreadcrumbList` | P1 | Active |
| `HUB-DIAG` | Field Diagnostics, PT Charts & Psychrometrics Hub | `https://hvaclogic.org/field-diagnostics` | Topic Hub | Field Diagnostics | Informational / Directory | `CollectionPage`, `BreadcrumbList` | P1 | Active |
| `HUB-HEAT` | Heating Systems, Heat Pumps & Hydronics Hub | `https://hvaclogic.org/heating-systems` | Topic Hub | Heating Systems | Informational / Directory | `CollectionPage`, `BreadcrumbList` | P1 | Active |
| `HUB-BLDG` | Building Science, Enclosure & Infiltration Hub | `https://hvaclogic.org/building-science` | Topic Hub | Building Science | Informational / Directory | `CollectionPage`, `BreadcrumbList` | P1 | Active |

---

## 3. Production Calculators (Exactly 21 Tools)

| Asset ID | Calculator Name | Route / Canonical URL | Pillar Hub | Primary Keyword | Search Intent | Governing Standard | Schema | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CALC-01` | Digital Ductulator & Air Duct Sizing Tool | `/calculators/ductulator` | `airflow-ducts` | `ductulator` | Transactional Engineering | ASHRAE, SMACNA, ACCA | `WebApplication` | P1 (Core) |
| `CALC-02` | Flexible Duct CFM & Friction Drop Chart | `/calculators/flex-duct-cfm-chart` | `airflow-ducts` | `flex duct cfm chart` | Field Lookup / Sizing | ACCA Manual D, ASHRAE | `WebApplication` | P1 (Core) |
| `CALC-03` | HVAC CFM & Airflow Sizing Calculator | `/calculators/cfm-calculator` | `airflow-ducts` | `air duct cfm calculator` | Technical Sizing | ASHRAE, ACCA | `WebApplication` | P1 (Core) |
| `CALC-04` | Kitchen Range Hood CFM & Make-Up Air Sizer | `/calculators/kitchen-hood-cfm` | `airflow-ducts` | `kitchen hood cfm calculator` | Code Compliance | IRC M1503.6, HVI | `WebApplication` | P2 |
| `CALC-05` | Duct Friction Loss & TEL Calculator | `/calculators/duct-friction-loss-calculator` | `airflow-ducts` | `duct friction loss calculator` | Transactional Engineering | ACCA Manual D, SMACNA | `WebApplication` | P1 (Core) |
| `CALC-06` | MERV Filter Sizing & Static Pressure Drop Tool | `/calculators/filter-sizing-calculator` | `airflow-ducts` | `merv filter pressure drop calculator` | Technical Sizing | ASHRAE 52.2, ACCA | `WebApplication` | P2 |
| `CALC-07` | BTU Heating & Cooling Load Calculator | `/calculators/btu-calculator` | `cooling-loads` | `btu calculator` | Commercial Sizing | ACCA Manual J, ASHRAE | `WebApplication` | P1 (Core) |
| `CALC-08` | AC Tonnage & Room Capacity Sizer | `/calculators/ac-tonnage-calculator` | `cooling-loads` | `btus ac` | Commercial Sizing | ACCA Manual S, AHRI | `WebApplication` | P1 (Core) |
| `CALC-09` | HVAC Model Number Tonnage Decoder | `/calculators/ac-model-decoder` | `cooling-loads` | `how to find ac tonnage` | Field Service / Decoder | AHRI Standards | `WebApplication` | P1 (Core) |
| `CALC-10` | Mini-Split Multi-Zone Sizing Calculator | `/calculators/mini-split-sizing` | `cooling-loads` | `mini split sizing calculator` | Multi-Zone Sizing | AHRI 1230, ACCA | `WebApplication` | P1 (Core) |
| `CALC-11` | Target Superheat & Subcooling Calculator | `/calculators/superheat-subcooling-calculator` | `field-diagnostics` | `superheat calculator` | Field Diagnostic / EPA | EPA 608, AHRI, ACCA | `WebApplication` | P1 (Core) |
| `CALC-12` | Digital Refrigerant PT Chart (A2L / R-454B) | `/calculators/pt-chart` | `field-diagnostics` | `pt chart` | Field Lookup / Diagnostic | NIST REFPROP, EPA AIM | `WebApplication` | P1 (Core) |
| `CALC-13` | Psychrometric Chart & Moist Air Sizer | `/calculators/psychrometric-calculator` | `field-diagnostics` | `psychrometric calculator` | Engineering Calculation | ASHRAE Hyland-Wexler | `WebApplication` | P1 (Core) |
| `CALC-14` | Refrigerant Line Set Charge & Weigh-In Tool | `/calculators/refrigerant-charge-calculator` | `field-diagnostics` | `refrigerant charge calculator` | Installation / Weigh-In | EPA AIM Act, ASHRAE 15 | `WebApplication` | P2 |
| `CALC-15` | Heat Pump Sizing & Balance Point Tool | `/calculators/heat-pump-size-calculator` | `heating-systems` | `heat pump size calculator` | Electrification / Sizing | AHRI 210/240, NEEP | `WebApplication` | P1 (Core) |
| `CALC-16` | Furnace Sizing & AFUE Efficiency Calculator | `/calculators/furnace-size-calculator` | `heating-systems` | `furnace size calculator` | Commercial Replacement | ACCA Manual J, DOE | `WebApplication` | P1 (Core) |
| `CALC-17` | Hydronic Boiler & Baseboard Sizing Tool | `/calculators/boiler-size-calculator` | `heating-systems` | `boiler size calculator` | Hydronics / Commercial | AHRI Net, I=B=R | `WebApplication` | P2 |
| `CALC-18` | Garage & Workshop Heater Sizing Tool | `/calculators/garage-heater-sizing` | `heating-systems` | `garage heater sizing calculator` | Commercial / DIY | ACCA Manual J | `WebApplication` | P2 |
| `CALC-19` | Combustion Air Ventilation Calculator | `/calculators/combustion-air-calculator` | `heating-systems` | `combustion air calculator` | Code Compliance | NFPA 54, IFGC | `WebApplication` | P2 |
| `CALC-20` | Building Heat Loss & Infiltration Sizer | `/calculators/heat-loss-calculator` | `building-science` | `heat loss calculator` | Engineering Sizing | ACCA Manual J (8th Ed) | `WebApplication` | P1 (Core) |
| `CALC-21` | Insulation R-Value to U-Value Converter | `/calculators/r-value-calculator` | `building-science` | `r value calculator` | Engineering Conversion | ASHRAE 90.1, IECC | `WebApplication` | P2 |

---

## 4. Research & Whitepaper Classification (Exactly 9 Monographs)

### 4.1 Canonical Research Whitepapers (7)
| Asset ID | Monograph Title | Route / Canonical URL | Technical Report ID | Verified DOI / Repository | Pillar | Companion Calculator |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `RES-HP-01` | Thermal Degradation Kinetics & Heat Pump COP Derating | `/research/vapor-compression-kinetics-heat-pump-derating` | `HL-TR-2026-HP01` | Academia.edu / PDF | `heating-systems` | `heat-pump-size-calculator` |
| `RES-DUCT-02` | Non-Linear Duct Friction Loss & Equivalent Length Penalties | `/research/non-linear-duct-friction-loss-fitting-penalties` | `HL-TR-2026-DUCT02` | Academia.edu / PDF | `airflow-ducts` | `duct-friction-loss-calculator` |
| `RES-ENV-03` | Deterministic Building Science & Enclosure Infiltration | `/research/thermal-envelope-infiltration-building-heat-loss` | `HL-TR-2026-ENV03` | Academia.edu / PDF | `building-science` | `heat-loss-calculator` |
| `RES-IAQ-04` | Effective Dilution IAQ Ventilation & Mass-Balance | `/research/effective-dilution-iaq-ventilation-mass-balance` | `HL-TR-2026-IAQ04` | Academia.edu / PDF | `airflow-ducts` | `cfm-calculator` |
| `RES-A2L-05` | Thermodynamic Phase-Equilibrium & Zeotropic A2L Glide | `/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b` | `HL-TR-2026-A2L05` | `10.7910/DVN/SR1NZO` | `field-diagnostics` | `pt-chart`, `superheat-subcooling-calculator` |
| `RES-PSY-04` | ASHRAE Hyland-Wexler Psychrometrics & Numerical Solvers | `/research/ashrae-hyland-wexler-moist-air-psychrometrics` | `HL-TR-2026-PSY04` | `10.2139/ssrn.7430738` | `field-diagnostics` | `psychrometric-calculator` |
| `RES-REF-01` | Deterministic Vapor-Compression Refrigerant Mass Sizing | `/research/deterministic-vapor-compression-refrigerant-mass-sizing` | `HL-TR-2026-REF01` | `10.6084/m9.figshare.33640444` | `field-diagnostics` | `refrigerant-charge-calculator` |

### 4.2 Educational / Student Laboratory Courseware Monographs (2)
| Asset ID | Monograph Title | Route / Canonical URL | Courseware Report ID | Verified DOI / Repository | Primary Companion Tool |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `RES-LAB-01` | Cold-Climate Heat Pump Balance Point Thermodynamics Lab | `/research/cold-climate-heat-pump-balance-point-lab` | `HL-TR-2026-HP02` | `10.6084/m9.figshare.33477430` | `heat-pump-size-calculator` |
| `RES-LAB-02` | Building Envelope Thermal Transmission Lab Manual | `/research/student-lab-building-envelope-thermal-transmission` | `HL-LAB-2026-ENV02` | `10.57967/hf/10401` & `10.6084/m9.figshare.33702643` | `btu-calculator`, `r-value-calculator` |

---

## 5. Benchmark Open Datasets (Exactly 6 Datasets + /datasets Hub)

| Asset ID | Dataset Title | Route / Canonical URL | Minted DataCite DOI | Repository | Format | Schema | Primary Companion Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `DATA-HUB` | Open Benchmark Datasets & Engineering Matrices | `/datasets` | — | Internal Hub | Index | `CollectionPage`, `ItemList` | All 6 Datasets |
| `DATA-PSY-01` | ASHRAE Hyland-Wexler Psychrometric Benchmark (420 Points) | `/datasets/ashrae-hyland-wexler-psychrometric-benchmark` | `10.6084/m9.figshare.33456928` | Figshare | CSV | `Dataset` | `psychrometric-calculator` / `RES-PSY-04` |
| `DATA-HP-02` | Cold-Climate Heat Pump COP Derating Matrix (240 Points) | `/datasets/cold-climate-heat-pump-cop-derating` | `10.6084/m9.figshare.33477430` | Figshare | CSV | `Dataset` | `heat-pump-size-calculator` / `RES-LAB-01` |
| `DATA-REF-03` | Next-Gen Low-GWP Refrigerant Line-Set Mass Addition (816 Points) | `/datasets/refrigerant-mass-charge-low-gwp` | `10.6084/m9.figshare.33640444` | Figshare | CSV | `Dataset` | `refrigerant-charge-calculator` / `RES-REF-01` |
| `DATA-ENV-04` | Building Envelope Thermal Transmission Matrix (540 Vectors) | `/datasets/building-envelope-thermal-transmission` | `10.6084/m9.figshare.33702643` & `10.57967/hf/10401` | Figshare & Hugging Face | CSV / JSON | `Dataset` | `btu-calculator` / `RES-LAB-02` |
| `DATA-CA-05` | Confined Space Combustion Air & Louver Sizing Benchmark (540 Vectors) | `/datasets/combustion-air-confined-space` | `10.6084/m9.figshare.33753856` & `10.57967/hf/10454` | Figshare & Hugging Face | CSV | `Dataset` | `combustion-air-calculator` / `RES-IAQ-04` |
| `DATA-KH-06` | Kitchen Range Hood CFM & Make-Up Air Benchmark Matrix (433 Vectors) | `/datasets/kitchen-hood-exhaust-makeup-air` | — | Internal / CC BY 4.0 | CSV | `Dataset` | `kitchen-hood-cfm` / `RES-IAQ-04` |

---

## 6. Interactive OER Courseware Lab Units (Exactly 3 HTML5 Labs)

| Asset ID | Module Title | Physical File Path | Primary Companion Tool | License |
| :--- | :--- | :--- | :--- | :--- |
| `OER-LAB-01` | Interactive Duct Aerodynamics & Friction Sizing Lab | `public/oer-modules/duct-aerodynamics-lab.html` | `/calculators/ductulator` | CC BY-NC-SA 4.0 |
| `OER-LAB-02` | Cold-Climate Heat Pump Balance Point Interactive Lab | `public/oer-modules/heat-pump-balance-point-lab.html` | `/calculators/heat-pump-size-calculator` | CC BY-NC-SA 4.0 |
| `OER-LAB-03` | Building Envelope Thermal Transmission Simulation Lab | `public/oer-modules/building-envelope-thermal-transmission-lab.html` | `/calculators/btu-calculator` | CC BY-NC-SA 4.0 |

---

## 7. Directory & Authority Hubs (Exactly 10 Hubs)

| Route | Title | Schema | Role |
| :--- | :--- | :--- | :--- |
| `/calculators` | Calculators Master Directory | `CollectionPage` | Master searchable directory of all 21 tools |
| `/guides` | Engineering Guides Hub | `CollectionPage` | Master index of 5 live + 3 scheduled guides |
| `/research` | Research Monographs & Datasets Hub | `CollectionPage` | Academic research library & dataset portal |
| `/standards` | Governing Standards Matrix | `ItemPage` | Standard cross-reference (ASHRAE, ACCA, EPA, SMACNA) |
| `/sources` | Engineering Bibliography & Sources | `ItemPage` | Formulations, constants, and textbook citations |
| `/glossary` | HVAC & Thermodynamic Glossary | `DefinedTermSet` | Semantic definitions of 150+ terms |
| `/developers` | Developer API & Embed Portal | `TechArticle` | Widget documentation & JSON API endpoints |
| `/ashrae-climatic-data` | ASHRAE Climatic Design Conditions | `ItemPage` | Design dry-bulb and wet-bulb temperatures |
| `/about` | About HVACLogic & Authors | `AboutPage` | Institutional credentials & editorial governance |
| `/privacy` | Privacy & Security Policy | `PrivacyPolicy` | Verification of 100% client-side computing |
