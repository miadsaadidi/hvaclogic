export interface ResearchPaperFormula {
  title: string;
  latex: string;
  explanation: string;
}

export interface CompanionCalculator {
  name: string;
  route: string;
  description: string;
}

export interface ResearchPaper {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  subtitle: string;
  abstract: string;
  keyFindings: string[];
  governingStandards: string[];
  formulas: ResearchPaperFormula[];
  authors: string[];
  publicationDate: string; // ISO format e.g. "2026-01-15"
  doi: string;
  reportNumber: string;
  pdfUrl: string;
  companionCalculators: CompanionCalculator[];
  bibtex: string;
  apa: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    slug: "vapor-compression-kinetics-heat-pump-derating",
    title: "Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps",
    seoTitle: "Heat Pump Derating & Cold-Climate COP",
    seoDescription: "Thermodynamic analysis of cold-climate heat pump COP derating, auxiliary electric resistance strip staging, and seasonal HSPF2 performance.",
    subtitle: "A thermodynamic evaluation of vapor-compression Carnot limits, refrigeration enthalpy drops, coefficient of performance (COP) nonlinear decline, and auxiliary resistance energy staging.",
    abstract: "A rigorous thermodynamic evaluation of cold-climate air-source heat pump (ccASHP) performance across sub-freezing ambient temperature spectra (-20°C to +10°C / -4°F to +50°F). Models vapor-compression Carnot limits, refrigeration enthalpy drops, coefficient of performance (COP) nonlinear derating curves, defrost cycle parasitic loads, and the operational cost dynamics of staging auxiliary electric resistance strip heat (COP 1.0) versus dual-fuel configurations.",
    keyFindings: [
      "At 47°F (8.3°C), modern inverter vapor-injection heat pumps deliver COPs between 3.4 and 4.2; at -5°F (-20.5°C), COP derates nonlinearly to 1.75–2.10 while nominal heating capacity drops by 32% to 44%.",
      "Engaging 10 kW auxiliary electric resistance strip elements below the thermal balance point increases electrical power draw by 300%–400%, quadrupling marginal hourly heating operating expense.",
      "Flash-injection vapor-injection scroll compressor architectures mitigate compression ratio penalties and maintain 76% of rated heating output down to 0°F (-17.8°C) without strip heat intervention.",
      "Defrost penalty coefficients derate net seasonal HSPF2 by 6.8% to 11.4% in high relative humidity sub-freezing conditions (28°F to 36°F / -2°C to +2°C) due to periodic reverse-cycle evaporator de-icing."
    ],
    governingStandards: [
      "AHRI Standard 210/240-2023",
      "ASHRAE Standard 90.1-2022",
      "DOE 10 CFR Part 430",
      "NEEP Cold Climate Heat Pump Specification v4.0"
    ],
    formulas: [
      {
        title: "Theoretical Carnot Heating COP Upper Bound",
        latex: "\\text{COP}_{\\text{Carnot}} = \\frac{T_{\\text{indoor}}}{T_{\\text{indoor}} - T_{\\text{outdoor}}} = \\frac{T_{\\text{sink}}}{T_{\\text{sink}} - T_{\\text{source}}}",
        explanation: "Defines the theoretical thermodynamic ceiling for heat transfer based on absolute thermodynamic temperatures in Kelvin."
      },
      {
        title: "Blended Operating Hourly Expense with Auxiliary Resistance",
        latex: "\\text{Cost}_{\\text{hr}} = \\left[ \\left(\\frac{Q_{\\text{load}}}{\\text{COP}(T_{\\text{amb}}) \\times 3412.14}\\right) + P_{\\text{aux}} \\right] \\times R_{\\text{kWh}}",
        explanation: "Determines total hourly electrical operating expenditure when the vapor-compression compressor and supplementary electric resistance heating strips fire simultaneously."
      },
      {
        title: "Thermal Balance Point Equivalence",
        latex: "Q_{\\text{heat loss}}(T_{\\text{balance}}) = Q_{\\text{HP capacity}}(T_{\\text{balance}}) \\implies \\text{UA} \\cdot (T_{\\text{set}} - T_{\\text{balance}}) = Q_{\\text{rated}} \\cdot f_{\\text{derate}}(T_{\\text{balance}})",
        explanation: "Calculates the exact outdoor ambient temperature threshold where building envelope heat loss exceeds primary heat pump compressor capacity, necessitating supplementary auxiliary heat."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-01-15",
    doi: "10.6084/m9.figshare.172310808",
    reportNumber: "HL-TR-2026-HP01",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    companionCalculators: [
      {
        name: "Heat Pump Running Cost Calculator",
        route: "/calculators/heat-pump-cost-calculator",
        description: "Simulate seasonal electrical consumption, balance point strip heat staging, and dual-fuel operating costs."
      },
      {
        name: "AC & Heat Pump Tonnage Calculator",
        route: "/calculators/ac-tonnage-calculator",
        description: "Determine sensible and latent thermal capacity requirements per Manual J square footage rules."
      },
      {
        name: "Refrigerant Superheat & Subcooling Calculator",
        route: "/calculators/superheat-subcooling-calculator",
        description: "Validate real-time evaporator superheat and condenser subcooling enthalpy boundaries."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_heatpump_derating,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-HP01},
  doi = {10.6084/m9.figshare.172310808},
  url = {https://hvaclogic.com/research/vapor-compression-kinetics-heat-pump-derating}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps (Technical Report No. HL-TR-2026-HP01). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.172310808`
  },
  {
    slug: "non-linear-duct-friction-loss-fitting-penalties",
    title: "Non-Linear Friction Loss Dynamics, Equivalent Length Fitting Penalties, and Dynamic Pressure Drops in Residential Duct Systems",
    seoTitle: "Duct Friction Loss & Fitting Pressure Drops",
    seoDescription: "Hydrodynamic modeling of Darcy-Weisbach duct friction, Colebrook-White roughness regimes, and ACCA Manual D equivalent length fitting penalties.",
    subtitle: "A hydrodynamic fluid flow analysis of Darcy-Weisbach friction modeling, Colebrook-White roughness regimes, and ACCA Manual D equivalent length aerodynamic penalties.",
    abstract: "A mathematical investigation of air distribution fluid mechanics in forced-air HVAC duct systems. Evaluates non-linear Darcy-Weisbach wall shear stress, Colebrook-White transitional flow friction factors, dynamic velocity pressure dissipation, and ACCA Manual D equivalent length (EL) dynamic loss penalties across standard sheet metal, spiral, and un-tensioned flexible duct configurations.",
    keyFindings: [
      "Un-tensioned flexible duct with a 15% longitudinal compression ratio exhibits a 210% increase in static friction loss relative to fully stretched duct at identical volumetric airflow (CFM).",
      "Dynamic velocity pressure losses ($P_v = (V / 4005)^2$) across sharp 90° mitered elbows without turning vanes consume up to 0.14 in.wg of external static pressure, equivalent to 75 feet of straight duct run.",
      "The available static pressure (ASP) budget for residential blowers ($0.50\\text{ in.wg}$) is dominated by component drops (air filters: 0.15–0.25 in.wg; wet cooling coils: 0.20–0.30 in.wg), leaving less than 0.10 in.wg for the entire supply and return distribution trunk.",
      "Friction rate design targets must be dynamically adjusted between 0.06 and 0.12 in.wg per 100 ft based on Total Effective Length (TEL) to prevent excessive air velocity noise ($>700\\text{ FPM}$ in branch runouts)."
    ],
    governingStandards: [
      "ACCA Manual D (3rd Edition)",
      "SMACNA HVAC Duct Construction Standards (Metal and Flexible)",
      "ASHRAE Handbook of Fundamentals (Chapter 21: Duct Design)",
      "AMCA Standard 201-02"
    ],
    formulas: [
      {
        title: "Darcy-Weisbach Duct Friction Loss Equation",
        latex: "\\Delta P_f = f \\cdot \\left(\\frac{L}{D_h}\\right) \\cdot \\left(\\frac{\\rho \\cdot V^2}{2}\\right)",
        explanation: "Fundamental fluid mechanics relationship computing frictional static pressure drop as a function of duct length, hydraulic diameter, fluid density, and mean velocity."
      },
      {
        title: "Colebrook-White Implicit Friction Factor",
        latex: "\\frac{1}{\\sqrt{f}} = -2 \\log_{10} \\left( \\frac{\\varepsilon}{3.7 D_h} + \\frac{2.51}{\\text{Re} \\sqrt{f}} \\right)",
        explanation: "Governs transitional and turbulent flow regimes inside smooth and rough duct surfaces based on Reynolds number and surface absolute roughness."
      },
      {
        title: "Total Effective Length (TEL) & Friction Rate (FR) Sizing",
        latex: "\\text{TEL} = L_{\\text{measured}} + \\sum \\text{EL}_{\\text{fittings}}, \\quad \\text{FR} = \\frac{\\text{ASP} \\times 100}{\\text{TEL}}",
        explanation: "ACCA Manual D deterministic sizing relationship computing allowable friction rate per 100 feet from measured blower available static pressure and equivalent fitting lengths."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-01-28",
    doi: "10.6084/m9.figshare.172310809",
    reportNumber: "HL-TR-2026-DUCT02",
    pdfUrl: "/whitepapers/hvaclogic_un_tensioned_airflow_paper.pdf",
    companionCalculators: [
      {
        name: "Duct Airflow & Friction Rate Sizing Calculator",
        route: "/calculators/duct-sizing-calculator",
        description: "Size round and rectangular ducts using ACCA Manual D and SMACNA friction charts."
      },
      {
        name: "Duct Friction Loss & Pressure Drop Calculator",
        route: "/calculators/duct-friction-loss-calculator",
        description: "Calculate total static pressure drop across straight duct runs and fitting assemblies."
      },
      {
        name: "Flexible Duct Sizing Chart & CFM Calculator",
        route: "/calculators/flex-duct-sizing-calculator",
        description: "Evaluate airflow capacity derating across flexible duct compression ratios."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_duct_friction,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Non-Linear Friction Loss Dynamics, Equivalent Length Fitting Penalties, and Dynamic Pressure Drops in Residential Duct Systems},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-DUCT02},
  doi = {10.6084/m9.figshare.172310809},
  url = {https://hvaclogic.com/research/non-linear-duct-friction-loss-fitting-penalties}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Non-Linear Friction Loss Dynamics, Equivalent Length Fitting Penalties, and Dynamic Pressure Drops in Residential Duct Systems (Technical Report No. HL-TR-2026-DUCT02). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.172310809`
  },
  {
    slug: "thermal-envelope-infiltration-building-heat-loss",
    title: "Deterministic Building Science & Dynamic Enclosure Infiltration Modeling for Residential Space Heating and Decarbonization Sizing",
    seoTitle: "Envelope Infiltration & Building Heat Loss",
    seoDescription: "Deterministic building science framework for residential heating loads, envelope infiltration modeling, and Manual J decarbonization sizing.",
    subtitle: "A multi-component thermodynamic study of conduction, fenestration solar heat gain coefficients (SHGC), and pressure-driven envelope infiltration loads under ACCA Manual J.",
    abstract: "Presents a deterministic building science modeling framework for residential peak heating and cooling loads under ACCA Manual J (8th Edition) and ASHRAE Fundamentals. Analyzes conductive transmission matrices across composite multi-layer wall assemblies, fenestration U-factor/SHGC ratings, stack-effect pressure infiltration, and ground-coupled sub-grade slab thermal losses.",
    keyFindings: [
      "Air leakage infiltration accounts for 28% to 42% of total peak design heat loss in pre-2000 residential enclosures, dwarfing window conductive losses.",
      "Oversizing residential heat pumps or furnaces by more than 25% over calculated Manual J peak design leads to short-cycling, 18% higher standby loss, and poor summer latent humidity extraction.",
      "Accounting for dynamic internal sensible heat gains ($230\\text{ BTU/h}$ per occupant + appliance idle wattage) reduces cooling equipment nominal tonnage requirements by up to 0.75 tons.",
      "Sub-slab perimeter insulation ($R\\text{-}10$ down to 24 inches) attenuates edge heat loss by $54\\%$, directly decreasing baseboard or hydronic radiant boiler sizing requirements."
    ],
    governingStandards: [
      "ACCA Manual J (8th Edition, Full Version)",
      "ASHRAE Standard 55-2023 (Thermal Environmental Conditions)",
      "ASTM E779 Standard Test Method for Determining Air Leakage Rate",
      "IECC 2021/2024 Residential Energy Code"
    ],
    formulas: [
      {
        title: "Multi-Zone Conductive Enclosure Transmission",
        latex: "Q_{\\text{cond}} = \\sum_{i=1}^n \\left( U_i \\times A_i \\times \\Delta T \\right) = \\sum_{i=1}^n \\left( \\frac{A_i}{R_i} \\times (T_{\\text{in}} - T_{\\text{out}}) \\right)",
        explanation: "Calculates total conductive heat transmission across all exterior envelope components (walls, ceiling, floor, glass, doors)."
      },
      {
        title: "Sensible Air Infiltration Heating Load",
        latex: "Q_{\\text{infil}} = 1.08 \\times \\text{CFM}_{\\text{infil}} \\times (T_{\\text{in}} - T_{\\text{out}}) = 1.08 \\times \\left(\\frac{\\text{ACH} \\times V_{\\text{room}}}{60}\\right) \\times \\Delta T",
        explanation: "Quantifies the sensible heating power required to warm cold infiltrating outdoor air up to conditioned indoor thermostat setpoint."
      },
      {
        title: "Overall Heat Transfer Coefficient (U-Value) Reciprocal",
        latex: "U_{\\text{assembly}} = \\frac{1}{R_{\\text{total}}} = \\frac{1}{R_{\\text{film,in}} + \\sum R_{\\text{layers}} + R_{\\text{film,out}}}",
        explanation: "Computes overall thermal transmittance of composite building envelope assemblies incorporating boundary air film resistances."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-02-10",
    doi: "10.6084/m9.figshare.172310810",
    reportNumber: "HL-TR-2026-ENV03",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    companionCalculators: [
      {
        name: "Residential Heat Loss Calculator (Manual J)",
        route: "/calculators/heat-loss-calculator",
        description: "Deterministic room-by-room and whole-house peak heating load calculations."
      },
      {
        name: "Furnace BTU & Sizing Calculator",
        route: "/calculators/furnace-btu-calculator",
        description: "Calculate AFUE-corrected furnace input and output heating requirements."
      },
      {
        name: "Insulation R-Value to U-Value Calculator",
        route: "/calculators/r-value-calculator",
        description: "Convert multi-layer material thermal resistances to overall assembly U-factors."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_envelope_heatloss,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Deterministic Building Science & Dynamic Enclosure Infiltration Modeling for Residential Space Heating and Decarbonization Sizing},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-ENV03},
  doi = {10.6084/m9.figshare.172310810},
  url = {https://hvaclogic.com/research/thermal-envelope-infiltration-building-heat-loss}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Deterministic Building Science & Dynamic Enclosure Infiltration Modeling for Residential Space Heating and Decarbonization Sizing (Technical Report No. HL-TR-2026-ENV03). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.172310810`
  },
  {
    slug: "effective-dilution-iaq-ventilation-mass-balance",
    title: "Effective Outdoor Air Dilution, Continuous Infiltration Credit, and Multi-Zone Mass-Balance Modeling under ASHRAE 62.2",
    seoTitle: "IAQ Mass Balance & Dilution Ventilation",
    seoDescription: "Mass-balance analysis of mechanical ventilation rates, continuous infiltration credits, and ASHRAE 62.2 / 62.1 indoor air quality compliance.",
    subtitle: "A mass-balance analysis of residential mechanical ventilation rates, dwelling volume air changes, and continuous versus intermittent exhaust fan duty cycles.",
    abstract: "Evaluates indoor air quality (IAQ) mechanical ventilation compliance under ASHRAE Standard 62.2-2022 and ASHRAE Standard 62.1. Examines total required ventilation rate equations ($Q_{\\text{tot}}$), continuous natural infiltration credits ($Q_{\\text{inf}}$), dwelling area square footage factors, bedroom occupancy allowances, and fan runtime efficacy adjustments for balanced ERV/HRV energy recovery ventilators.",
    keyFindings: [
      "In tight modern enclosures ($<3.0\\text{ ACH}_{50}$), mechanical ventilation must deliver at least $45\\text{ to }75\\text{ CFM}$ of continuous fresh outdoor air to maintain steady-state indoor $\\text{CO}_2$ concentrations below $1,000\\text{ PPM}$.",
      "Energy Recovery Ventilators (ERVs) with sensible recovery effectiveness $\\ge 72\\%$ reduce winter ventilation thermal conditioning penalties by up to $65\\%$ while managing indoor winter relative humidity.",
      "Intermittent mechanical ventilation strategies operating at fractional duty cycles ($<100\\%$) require non-linear airflow rate multipliers ($\ge 1.33\\times$) under ASHRAE 62.2 Section 4.5 to maintain equivalent air exchange effectiveness.",
      "Combustion air makeup requirements for non-direct vent fossil-fuel appliances must be decoupled from general dilution ventilation to prevent hazardous backdrafting under negative building depressurization."
    ],
    governingStandards: [
      "ASHRAE Standard 62.2-2022 (Ventilation for Acceptable Indoor Air Quality in Low-Rise Residential)",
      "ASHRAE Standard 62.1-2022 (Ventilation for Acceptable IAQ in Commercial Buildings)",
      "EPA Clean Air Act & Indoor airPLUS Specification",
      "NFPA 54 / ANSI Z223.1 National Fuel Gas Code"
    ],
    formulas: [
      {
        title: "ASHRAE 62.2 Total Ventilation Rate Equation",
        latex: "Q_{\\text{tot}} = 0.03 \\times A_{\\text{floor}} + 7.5 \\times (N_{\\text{bedrooms}} + 1)",
        explanation: "Governing standard equation defining minimum continuous volumetric outdoor airflow based on conditioned floor area and default occupant density."
      },
      {
        title: "Continuous Mechanical Fan Sizing with Infiltration Credit",
        latex: "Q_{\\text{fan}} = Q_{\\text{tot}} - Q_{\\text{inf}} = \\left[ 0.03 A_{\\text{floor}} + 7.5(N_{\\text{br}} + 1) \\right] - \\left( \\frac{\\text{NL} \\times wsf \\times A_{\\text{floor}}}{1000} \\right)",
        explanation: "Determines net required mechanical ventilation fan rate after applying natural infiltration credits derived from blower door envelope leakage tests."
      },
      {
        title: "Steady-State Indoor CO2 Dilution Mass-Balance",
        latex: "C_{\\text{indoor}} = C_{\\text{outdoor}} + \\frac{G_{\\text{CO2}}}{Q_{\\text{ventilation}}}",
        explanation: "Predicts indoor steady-state contaminant concentration from outdoor ambient baseline, occupant generation rate, and effective outdoor air exchange rate."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-02-24",
    doi: "10.6084/m9.figshare.172310811",
    reportNumber: "HL-TR-2026-IAQ04",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    companionCalculators: [
      {
        name: "CFM Airflow & Duct Velocity Calculator",
        route: "/calculators/cfm-calculator",
        description: "Calculate air changes per hour (ACH), velocity in FPM, and required room CFM."
      },
      {
        name: "Combustion Air Ventilation Calculator",
        route: "/calculators/combustion-air-calculator",
        description: "Size indoor and outdoor combustion air openings per NFPA 54 / IFGC."
      },
      {
        name: "Kitchen Exhaust Hood CFM Calculator",
        route: "/calculators/kitchen-hood-cfm-calculator",
        description: "Size range hood exhaust and makeup air requirements."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_iaq_ventilation,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Effective Outdoor Air Dilution, Continuous Infiltration Credit, and Multi-Zone Mass-Balance Modeling under ASHRAE 62.2},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-IAQ04},
  doi = {10.6084/m9.figshare.172310811},
  url = {https://hvaclogic.com/research/effective-dilution-iaq-ventilation-mass-balance}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Effective Outdoor Air Dilution, Continuous Infiltration Credit, and Multi-Zone Mass-Balance Modeling under ASHRAE 62.2 (Technical Report No. HL-TR-2026-IAQ04). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.172310811`
  },
  {
    slug: "thermodynamic-modeling-a2l-refrigerant-glide-r454b",
    title: "Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B & R-32)",
    subtitle: "An applied thermodynamics study of vapor-liquid phase equilibrium, bubble and dew saturation boundaries, and systemic charging diagnostics under the EPA AIM Act.",
    abstract: "Under global climate regulations, including the Kigali Amendment to the Montreal Protocol and the U.S. EPA American Innovation and Manufacturing (AIM) Act, the HVAC/R industry is undergoing a mandatory phase-down of legacy hydrofluorocarbons (HFCs), specifically R-410A. The dominant replacement refrigerants entering residential and commercial heat pump systems are ASHRAE Class A2L lower-flammability fluids: R-454B and R-32. This paper presents an exact thermodynamic phase-equilibrium modeling framework calibrated against NIST REFPROP 10.0 extended Helmholtz-energy formulations. We derive the discrete mathematical boundaries separating bubble-point liquidus curves from dew-point vaporus curves, formulate the exact differential governing equations for superheat and subcooling diagnostics, and quantify the empirical consequences of legacy trade heuristics.",
    keyFindings: [
      "Evaluating liquid-line subcooling on R-454B systems using the saturated vapor (dew-point) curve introduces a systemic mathematical error of +2.2°F (+1.22°C), resulting in an 8.5% refrigerant undercharge.",
      "Operating undercharged zeotropic systems elevates compressor discharge temperatures by up to +14.2°F (+7.9°C), risking ester lubricant thermal breakdown and degrading seasonal COP by 5.4%.",
      "Single-component A2L refrigerants (R-32) exhibit zero temperature glide and identical bubble/dew saturation states, whereas zeotropic binary blends (R-454B: 68.9% R-32 / 31.1% R-1234yf) display non-linear temperature glide between 1.5°F and 2.5°F.",
      "Differential fractionation during slow vapor-phase leaks shifts remaining liquid mass fractions toward R-1234yf, causing minor glide expansion (<0.4°F) while maintaining Class A2L lower flammability margins."
    ],
    governingStandards: [
      "EPA AIM Act (40 CFR Part 84)",
      "ASHRAE Standard 34-2022 (Designation and Safety Classification of Refrigerants)",
      "ASHRAE Standard 15-2022 (Safety Standard for Refrigeration Systems)",
      "AHRI Standard 210/240-2023",
      "NIST Standard Reference Database 23 (REFPROP 10.0)"
    ],
    formulas: [
      {
        title: "Helmholtz Free Energy Residual Formulation",
        latex: "\\alpha(\\delta, \\tau, \\mathbf{x}) = \\alpha^0(\\delta, \\tau, \\mathbf{x}) + \\alpha^r(\\delta, \\tau, \\mathbf{x}) = \\sum_{i=1}^m x_i \\alpha_i^0(\\delta_i, \\tau_i) + \\sum_{i=1}^m x_i \\ln x_i + \\alpha^r(\\delta, \\tau, \\mathbf{x})",
        explanation: "Fundamental multi-fluid thermodynamic state equation defining residual free energy from reduced density, inverse reduced temperature, and constituent mole fractions."
      },
      {
        title: "Zeotropic Phase-Change Temperature Glide",
        latex: "\\Delta T_{\\text{glide}}(P) = T_{\\text{dew}}(P, \\mathbf{y}) - T_{\\text{bubble}}(P, \\mathbf{x})",
        explanation: "Quantifies the temperature variance between saturated vapor and saturated liquid boundaries at constant absolute saturation pressure."
      },
      {
        title: "Governing Diagnostic Equations for Zeotropic Systems",
        latex: "\\text{SC}_{\\text{zeo}} = T_{\\text{bubble}}(P_{\\text{liquid}}) - T_{\\text{line,liquid}}, \\quad \\text{SH}_{\\text{zeo}} = T_{\\text{line,vapor}} - T_{\\text{dew}}(P_{\\text{suction}})",
        explanation: "Strict differential thermodynamic relations requiring bubble-point saturation for condenser subcooling and dew-point saturation for evaporator superheat."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-04",
    doi: "10.7910/DVN/SR1NZO",
    reportNumber: "HL-TR-2026-A2L05",
    pdfUrl: "/whitepapers/Thermodynamic_Modeling_A2L_Refrigerant_Glide_R454B.pdf",
    companionCalculators: [
      {
        name: "A2L Refrigerant PT Chart (R-454B, R-32, R-410A)",
        route: "/calculators/pt-chart",
        description: "Interactive saturation pressure-temperature chart with dual bubble and dew curves."
      },
      {
        name: "Refrigerant Superheat & Subcooling Calculator",
        route: "/calculators/superheat-subcooling-calculator",
        description: "Validate evaporator superheat and condenser subcooling with exact zeotropic glide compensation."
      },
      {
        name: "Refrigerant Charge & Add-On Line-Set Calculator",
        route: "/calculators/refrigerant-charge-calculator",
        description: "Compute factory weigh-in charges and long line-set liquid additions."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_a2l_glide,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B and R-32)},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-A2L05},
  doi = {10.7910/DVN/SR1NZO},
  url = {https://hvaclogic.com/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B and R-32) (Technical Report No. HL-TR-2026-A2L05). HVACLogic Open-Access Building Science. https://doi.org/10.7910/DVN/SR1NZO`
  }
];

export function getResearchPaperBySlug(slug: string): ResearchPaper | undefined {
  return RESEARCH_PAPERS.find((p) => p.slug === slug);
}

export function getAllResearchPaperSlugs(): string[] {
  return RESEARCH_PAPERS.map((p) => p.slug);
}
