# HVACLogic Keyword Operating System & Intent Matrix

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.0.0  
**Last Updated**: 2026-09-16  
**Operational Status**: ACTIVE / AUTHORITATIVE KEYWORD SYSTEM  

---

## 1. Pillar 1: Airflow, Duct Sizing & Aerodynamics (`/airflow-ducts`)

| Target Asset | Primary Query | Secondary Queries | Search Intent | Volume Tier | Difficulty | Cannibalization Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/calculators/ductulator` | `ductulator` | `duct sizing calculator`, `mcquay duct sizer`, `air duct design calculator`, `duct sizer` | Transactional Engineering | High (10k–50k/mo) | Medium | Target ONLY on `/calculators/ductulator`. Pillar hub targets high-level overview. |
| `/calculators/flex-duct-cfm-chart` | `flex duct cfm chart` | `flexible duct air flow chart`, `6 flex duct cfm`, `8 flex duct cfm`, `14 flex duct cfm`, `cfm chart for flex duct` | Field Lookup / Sizing | High (5k–20k/mo) | Low-Med | Focus exclusively on flexible duct sizing tables & sag deratings. |
| `/calculators/cfm-calculator` | `air duct cfm calculator` | `cfm calculator hvac`, `cfm chart for duct`, `sensible heat airflow`, `room ach calculator` | Technical Sizing | High (10k–30k/mo) | Medium | Solves airflow volume from dimensions, heat load (1.08*dT), and ACH. |
| `/calculators/kitchen-hood-cfm` | `kitchen hood cfm calculator` | `range hood cfm calculator`, `range hood make up air`, `how many cfm for range hood`, `irc m1503.6 make up air` | Code Compliance | Medium (2k–8k/mo) | Low | Covers gas burner BTU and IRC Section M1503.6 make-up air thresholds. |
| `/calculators/duct-friction-loss-calculator` | `duct friction loss calculator` | `duct tel meaning`, `what is duct tel`, `total equivalent length hvac`, `acca manual d friction rate`, `available static pressure calculator` | Transactional Engineering | Medium (2k–6k/mo) | Low-Med | Owns ACCA Manual D TEL fitting tables and available static pressure equations. |
| `/calculators/filter-sizing-calculator` | `merv filter pressure drop calculator` | `hvac filter size calculator`, `filter face velocity calculator`, `merv 13 static pressure drop`, `air filter cfm calculator` | Technical Sizing | Medium (1k–4k/mo) | Low | Owns face velocity (FPM) limits and pleat depth pressure drop curves. |
| `/research/non-linear-duct-friction-loss-fitting-penalties` | `darcy weisbach duct friction` | `colebrook white duct roughness`, `flexible duct friction factor rp 1333`, `equivalent length dynamic loss` | Engineering Research | Low (100–500/mo) | Low | High-authority academic monograph citing fluid mechanics governing equations. |

---

## 2. Pillar 2: Cooling Loads, AC Tonnage & Sizing (`/cooling-loads`)

| Target Asset | Primary Query | Secondary Queries | Search Intent | Volume Tier | Difficulty | Cannibalization Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/calculators/btu-calculator` | `btu calculator` | `btu estimator`, `british thermal unit calculator`, `hvac load calculator`, `cooling btu calculator` | Commercial Sizing | Very High (50k–150k/mo) | High | Whole-home square footage, insulation, climate zone load estimation. |
| `/calculators/ac-tonnage-calculator` | `btus ac` | `aircon capacity`, `aircon cooling capacity`, `ac tonnage calculator`, `how many tons of ac do i need` | Commercial Sizing | Very High (30k–80k/mo) | High | Tonnage matching (1.5T–5T) and SEER2 operating cost modeling. |
| `/calculators/ac-model-decoder` | `how to find ac tonnage` | `carrier nomenclature tonnage`, `carrier tonnage by model number`, `trane model number tonnage`, `lennox ac tonnage by model number`, `ac model decoder` | Field Lookup / Decoder | High (5k–15k/mo) | Low-Med | Regular expression decoding of manufacturer nameplates and BTU codes. |
| `/calculators/mini-split-sizing` | `mini split sizing calculator` | `ductless mini split sizing`, `multi zone mini split sizing`, `mini split btu calculator`, `ductless ac sizing` | Multi-Zone Sizing | High (5k–20k/mo) | Medium | Multi-room zone builder with inverter over-subscription ratio gauge. |

---

## 3. Pillar 3: Field Diagnostics, PT Charts & Refrigeration (`/field-diagnostics`)

| Target Asset | Primary Query | Secondary Queries | Search Intent | Volume Tier | Difficulty | Cannibalization Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/calculators/pt-chart` | `pt chart` | `454b pt chart`, `refrigerant pt chart`, `454b pressure temperature chart`, `r454b pressure temp chart`, `a2l refrigerant pressure chart`, `r32 pt chart`, `r410a pt chart` | Field Lookup / Diagnostic | High (10k–40k/mo) | Low-Med | Interactive digital PT chart covering R-454B, R-32, R-410A, and R-22. |
| `/calculators/superheat-subcooling-calculator` | `superheat calculator` | `subcooling calculator`, `hvac charging calculator`, `target superheat fixed orifice`, `txv subcooling calculator` | Field Diagnostic / EPA | High (5k–15k/mo) | Low-Med | Diagnostic calculator isolating overcharge, undercharge, and airflow faults. |
| `/calculators/psychrometric-calculator` | `psychrometric calculator` | `psychrometric chart calculator`, `moist air properties`, `dew point calculator`, `wet bulb calculator`, `enthalpy calculator` | Engineering Calculation | High (5k–25k/mo) | Medium | Solves complete state point from any 2 inputs with altitude barometric scaling. |
| `/calculators/refrigerant-charge-calculator` | `refrigerant charge calculator` | `line set charge calculator`, `additional refrigerant calculator`, `r454b charge calculator`, `r32 line set charge` | Field Installation | Medium (1k–5k/mo) | Low | Initial weigh-in calculation based on OEM line set liquid displacement. |
| `/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b` | `r454b temperature glide` | `a2l refrigerant fractionation`, `nist refprop r454b saturation`, `dew point vs bubble point subcooling` | Engineering Research | Low-Med (200–800/mo) | Low | Groundbreaking 2026 A2L research paper with verified DOI. |
| `/research/ashrae-hyland-wexler-moist-air-psychrometrics` | `ashrae hyland wexler formula` | `psychrometric saturation vapor pressure equations`, `numerical wet bulb bisection solver` | Engineering Research | Low (100–400/mo) | Low | Pure mathematical formulation paper deposited on SSRN (`10.2139/ssrn.7430738`). |

---

## 4. Pillar 4: Heating Systems, Heat Pumps & Hydronics (`/heating-systems`)

| Target Asset | Primary Query | Secondary Queries | Search Intent | Volume Tier | Difficulty | Cannibalization Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/calculators/heat-pump-size-calculator` | `heat pump size calculator` | `heat pump sizing`, `cold climate heat pump sizing`, `heat pump balance point`, `auxiliary heat strip sizing`, `heat strip size in kw calculator` | Electrification / Sizing | High (10k–30k/mo) | Medium | Thermal balance point curves, cold-climate derates, and aux strip sizing. |
| `/calculators/furnace-size-calculator` | `furnace size calculator` | `furnace btu calculator`, `what size furnace do i need`, `gas furnace sizing`, `afue calculator` | Replacement Sizing | High (10k–30k/mo) | Medium | Input vs Output BTU sizing across 80% to 98% AFUE efficiency ratings. |
| `/calculators/boiler-size-calculator` | `boiler size calculator` | `hydronic heating calculator`, `baseboard sizing`, `radiator edr calculator`, `boiler btu calculator`, `cast iron radiator btu` | Hydronics / Commercial | Medium (2k–8k/mo) | Low-Med | Fin-tube baseboard linear feet, cast-iron EDR, and DHW priority sizing. |
| `/calculators/garage-heater-sizing` | `garage heater sizing calculator` | `shop heater sizing`, `garage heater btu calculator`, `electric garage heater sizing`, `gas garage heater btu` | DIY / Commercial | Medium (2k–7k/mo) | Low | Concrete slab edge losses, overhead doors, and garage unit heater sizing. |
| `/calculators/combustion-air-calculator` | `combustion air calculator` | `combustion air requirements`, `nfpa 54 combustion air sizing`, `two permanent openings method` | Code Compliance | Medium (1k–3k/mo) | Low | NFPA 54 / IFGC indoor volume and outdoor louver opening sizing. |
| `/research/vapor-compression-kinetics-heat-pump-derating` | `heat pump cop derating subfreezing` | `cold climate heat pump carnot limit`, `flash vapor injection heating cop` | Engineering Research | Low (100–300/mo) | Low | Foundational heat pump thermodynamics report. |
| `/research/cold-climate-heat-pump-balance-point-lab` | `heat pump balance point calculation lab` | `heat pump defrost degradation penalty`, `supplemental electric resistance sizing` | Educational Lab | Low (100–300/mo) | Low | Open-access student lab and Figshare benchmark dataset. |

---

## 5. Pillar 5: Building Science & Enclosure Infiltration (`/building-science`)

| Target Asset | Primary Query | Secondary Queries | Search Intent | Volume Tier | Difficulty | Cannibalization Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/calculators/heat-loss-calculator` | `heat loss calculator` | `manual j heat loss`, `building heat loss calculator`, `room by room heat loss`, `envelope heat loss calculator` | Engineering Sizing | High (5k–20k/mo) | Medium | Detailed room-by-room conductive envelope and air infiltration calculation. |
| `/calculators/r-value-calculator` | `r value calculator` | `r value to u value calculator`, `insulation r value calculator`, `wall assembly u factor`, `r value chart` | Engineering Conversion | High (5k–15k/mo) | Low-Med | Multi-layer composite wall assembly thermal resistance and U-factor reciprocal. |
| `/research/thermal-envelope-infiltration-building-heat-loss` | `stack effect infiltration heat loss` | `acca manual j infiltration modeling`, `sub slab perimeter heat loss modeling` | Engineering Research | Low (100–300/mo) | Low | Technical monograph on building science infiltration dynamics. |

---

## 6. Cannibalization Prevention & Internal Anchor Rules

1. **Exact Match Anchors**: Link text for high-intent queries must strictly target the designated canonical URL.
2. **Never target `ductulator` to `/airflow-ducts`**: The keyword `ductulator` must strictly resolve to `/calculators/ductulator`.
3. **Never target `pt chart` to `/field-diagnostics`**: The query `pt chart` must strictly resolve to `/calculators/pt-chart`.
4. **Pillar Hub Scope**: Pillar hubs target broad educational and category overview terms (e.g., *"HVAC airflow engineering"*, *"refrigeration field diagnostics"*).
