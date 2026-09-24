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

export interface ResearchRepositoryLink {
  platform: "academia" | "figshare" | "dataverse" | "ssrn" | "archive" | "huggingface" | "bibsonomy";
  label: string;
  url: string;
  badge?: string;
}

export interface ResearchPaperTable {
  title: string;
  subtitle?: string;
  standardReference?: string;
  headers: string[];
  rows: (string | number)[][];
  footnote?: string;
}

export interface ResearchPaperSection {
  title: string;
  content: string[];
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
  doi?: string;
  reportNumber: string;
  pdfUrl: string;
  repositories?: ResearchRepositoryLink[];
  companionCalculators: CompanionCalculator[];
  tables?: ResearchPaperTable[];
  technicalSections?: ResearchPaperSection[];
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
    reportNumber: "HL-TR-2026-HP01",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93",
      },
    ],
    companionCalculators: [
      {
        name: "Heat Pump Sizing & Running Cost Calculator",
        route: "/calculators/heat-pump-size-calculator",
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
  url = {https://hvaclogic.com/research/vapor-compression-kinetics-heat-pump-derating}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps (Technical Report No. HL-TR-2026-HP01). HVACLogic Open-Access Building Science. https://www.academia.edu/172310808`
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
    reportNumber: "HL-TR-2026-DUCT02",
    pdfUrl: "/whitepapers/hvaclogic_un_tensioned_airflow_paper.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93",
      },
    ],
    companionCalculators: [
      {
        name: "Digital Ductulator Sizing Tool",
        route: "/calculators/ductulator",
        description: "Size round and rectangular ducts using ACCA Manual D and SMACNA friction charts."
      },
      {
        name: "Duct Friction Loss & Pressure Drop Calculator",
        route: "/calculators/duct-friction-loss-calculator",
        description: "Calculate total static pressure drop across straight duct runs and fitting assemblies."
      },
      {
        name: "Flexible Duct Sizing Chart & CFM Calculator",
        route: "/calculators/flex-duct-cfm-chart",
        description: "Evaluate airflow capacity derating across flexible duct compression ratios."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_duct_friction,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Non-Linear Friction Loss Dynamics, Equivalent Length Fitting Penalties, and Dynamic Pressure Drops in Residential Duct Systems},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-DUCT02},
  url = {https://hvaclogic.com/research/non-linear-duct-friction-loss-fitting-penalties}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Non-Linear Friction Loss Dynamics, Equivalent Length Fitting Penalties, and Dynamic Pressure Drops in Residential Duct Systems (Technical Report No. HL-TR-2026-DUCT02). HVACLogic Open-Access Building Science. https://www.academia.edu/172310808`
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
    reportNumber: "HL-TR-2026-ENV03",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93",
      },
    ],
    companionCalculators: [
      {
        name: "Residential Heat Loss Calculator (Manual J)",
        route: "/calculators/heat-loss-calculator",
        description: "Deterministic room-by-room and whole-house peak heating load calculations."
      },
      {
        name: "Furnace BTU & Sizing Calculator",
        route: "/calculators/furnace-size-calculator",
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
  url = {https://hvaclogic.com/research/thermal-envelope-infiltration-building-heat-loss}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Deterministic Building Science & Dynamic Enclosure Infiltration Modeling for Residential Space Heating and Decarbonization Sizing (Technical Report No. HL-TR-2026-ENV03). HVACLogic Open-Access Building Science. https://www.academia.edu/172310808`
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
    reportNumber: "HL-TR-2026-IAQ04",
    pdfUrl: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93",
      },
    ],
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
        route: "/calculators/kitchen-hood-cfm",
        description: "Size range hood exhaust and makeup air requirements."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_iaq_ventilation,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Effective Outdoor Air Dilution, Continuous Infiltration Credit, and Multi-Zone Mass-Balance Modeling under ASHRAE 62.2},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-IAQ04},
  url = {https://hvaclogic.com/research/effective-dilution-iaq-ventilation-mass-balance}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Effective Outdoor Air Dilution, Continuous Infiltration Credit, and Multi-Zone Mass-Balance Modeling under ASHRAE 62.2 (Technical Report No. HL-TR-2026-IAQ04). HVACLogic Open-Access Building Science. https://www.academia.edu/172310808`
  },
  {
    slug: "thermodynamic-modeling-a2l-refrigerant-glide-r454b",
    title: "Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B & R-32)",
    seoTitle: "A2L Refrigerant Glide Modeling & Diagnostics",
    seoDescription: "Phase-equilibrium and temperature glide modeling for R-454B and R-32 systems, calibrated against NIST REFPROP formulations under the EPA AIM Act.",
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
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93",
      },
    ],
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
  },
  {
    slug: "ashrae-hyland-wexler-moist-air-psychrometrics",
    title: "Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics and Numerical Energy-Balance Solvers for Building Sizing and Field Diagnostics",
    seoTitle: "ASHRAE Hyland-Wexler Psychrometric Formulations",
    seoDescription: "Governing ASHRAE Hyland-Wexler saturation polynomials, logarithmic dew point inversion, and numerical energy-balance bisection wet-bulb solvers.",
    subtitle: "A computational thermodynamics evaluation of Hyland-Wexler moist air saturation polynomials, logarithmic dew-point inversion, and numerical energy-balance wet-bulb convergence.",
    abstract: "Accurate evaluation of moist air thermodynamic properties is fundamental to building energy simulation, Sensible Heat Ratio (SHR) load splitting, and HVAC equipment sizing. Simplified quadratic approximations or linear psychrometric shortcuts introduce significant cumulative errors (often exceeding 5% to 8%) when applied across non-standard barometric elevations and elevated moisture contents. This monograph details the mathematical implementation of governing ASHRAE Fundamentals (Chapter 1) Hyland-Wexler formulations for saturation vapor pressure across liquid water (32°F to 392°F) and sub-freezing ice (-148°F to 32°F). We establish the numerical inversion framework for dew-point determination via logarithmic pressure polynomials and derive a 1D numerical energy-balance bisection solver for wet-bulb equilibrium convergence without closed-form algebraic solutions. Complete algorithmic architectures for humidity ratio (W), grains of moisture per pound of dry air, specific enthalpy (h), specific volume (v), and moist air density (rho) are validated against experimental thermodynamic tables.",
    keyFindings: [
      "Neglecting barometric altitude decay in high-elevation regions (e.g., Denver, CO at 5,280 ft, 12.15 psia) creates a 17.3% density over-prediction and systematic fan mass-flow sizing deficits.",
      "Linear psychrometric approximations introduce up to 8.4% error in humidity ratio (W) and latent enthalpy calculations during peak summer conditions (95°F DB / 78°F WB).",
      "Numerical bisection energy-balance solver for wet-bulb temperature converges to within 0.01°F in fewer than 25 iterations without external numerical library overhead.",
      "Maintaining indoor absolute moisture below 65 grains/lb (55°F dew point at 75°F DB) prevents dust mite proliferation and structural condensation risk under ASHRAE Standard 55."
    ],
    governingStandards: [
      "ASHRAE Handbook of Fundamentals (Chapter 1: Psychrometrics)",
      "ASHRAE Standard 55-2023 (Thermal Environmental Conditions for Human Occupancy)",
      "ACCA Manual J (8th Edition: Residential Load Calculation)",
      "NIST Standard Reference Database 23 (REFPROP 10.0)"
    ],
    formulas: [
      {
        title: "Hyland-Wexler Saturation Vapor Pressure Over Liquid Water",
        latex: "\\ln(P_{ws}) = \\frac{C_8}{T} + C_9 + C_{10}T + C_{11}T^2 + C_{12}T^3 + C_{13}\\ln(T)",
        explanation: "Governing ASHRAE polynomial formulation computing absolute saturation vapor pressure over absolute Rankine temperature (32°F to 392°F)."
      },
      {
        title: "Humidity Ratio and Absolute Moisture Grain Weight",
        latex: "W = 0.621945 \\cdot \\left[ \\frac{P_w}{P_{atm} - P_w} \\right], \\quad W_{grains} = W \\times 7000",
        explanation: "Calculates mass ratio of water vapor per unit mass of dry air and converts to standard engineering grains per pound."
      },
      {
        title: "Numerical Energy-Balance Wet-Bulb Equilibrium",
        latex: "W = \\frac{(1093 - 0.556 T_{wb})W_{s,wb} - 0.24(T_{db} - T_{wb})}{1093 + 0.444 T_{db} - T_{wb}}",
        explanation: "Dynamic adiabatic saturation equilibrium equation solved iteratively via 1D bisection root-finding to within 0.01°F convergence."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-07",
    doi: "10.2139/ssrn.7430738",
    reportNumber: "HL-TR-2026-PSY04",
    pdfUrl: "/whitepapers/hvaclogic_psychrometrics_hyland_wexler_paper.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/174361730/Thermodynamic_Formulations_of_ASHRAE_Hyland_Wexler_Moist_Air_Psychrometrics_and_Numerical_Energy_Balance_Solvers_for_Building_Sizing_and_Field_Diagnostics",
        badge: "DA 93",
      },
      {
        platform: "ssrn",
        label: "Read on SSRN",
        url: "https://ssrn.com/abstract=7430738",
        badge: "DA 92",
      },
      {
        platform: "figshare",
        label: "View Dataset (Figshare)",
        url: "https://figshare.com/articles/dataset/ASHRAE_Hyland-Wexler_Moist_Air_Psychrometric_Benchmark_Dataset_420_Thermodynamic_State_Points_Across_Sea-Level_and_Elevated_Altitudes/33456928?file=68285407",
        badge: "DA 91",
      },
    ],
    companionCalculators: [
      {
        name: "Psychrometric & Moist Air Calculator",
        route: "/calculators/psychrometric-calculator",
        description: "Interactive psychrometric state evaluation using pure ASHRAE Hyland-Wexler formulations."
      },
      {
        name: "Residential Heat Loss Calculator (Manual J)",
        route: "/calculators/heat-loss-calculator",
        description: "Whole-building conductive and infiltration heating load sizing per ACCA Manual J."
      },
      {
        name: "AC & Heat Pump Tonnage Calculator",
        route: "/calculators/ac-tonnage-calculator",
        description: "Determine sensible and latent thermal capacity requirements per Manual J rules."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_psychrometrics,
  author = {{HVACLogic Research Group} and Saadidi, Miad},
  title = {Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics and Numerical Energy-Balance Solvers for Building Sizing and Field Diagnostics},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-PSY04},
  doi = {10.2139/ssrn.7430738},
  url = {https://hvaclogic.com/research/ashrae-hyland-wexler-moist-air-psychrometrics},
  note = {Available at SSRN: https://ssrn.com/abstract=7430738}
}`,
    apa: `HVACLogic Research Group, & Saadidi, M. (2026). Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics and Numerical Energy-Balance Solvers for Building Sizing and Field Diagnostics (Technical Report No. HL-TR-2026-PSY04). HVACLogic Open-Access Building Science. SSRN Electronic Journal. https://doi.org/10.2139/ssrn.7430738`
  },
  {
    slug: "cold-climate-heat-pump-balance-point-lab",
    title: "Interactive Engineering Lab: Thermodynamic Modeling of Cold-Climate Heat Pump Balance Points, Inverter COP Deratings, and Supplemental Electric Resistance Loads",
    seoTitle: "Heat Pump Balance Point & COP Lab Monograph",
    seoDescription: "Laboratory courseware and benchmark dataset on inverter heat pump COP derating curves, latent defrost penalties, and thermal balance point solutions.",
    subtitle: "A computational laboratory framework for modeling non-linear vapor-compression heating deratings, defrost cycle penalties (30°F to 38°F), and electric resistance staging.",
    abstract: "As building electrification accelerates, air-source heat pump (ASHP) systems must provide primary space heating across extreme sub-freezing ambient temperatures. Unlike combustion furnaces whose thermal heat output remains invariant to outdoor temperature, the heating capacity and Coefficient of Performance (COP) of vapor-compression heat pumps degrade monotonically as outdoor temperatures fall. This interactive laboratory exercise guides engineering and technology students through the quantitative analysis of cold-climate inverter-driven heat pump dynamics. Students formulate building envelope heat loss lines, overlay variable-speed compressor heating capacity curves across -15°F to 55°F (-26°C to 13°C), calculate the exact thermodynamic thermal balance point, evaluate latent defrost degradation penalties between 30°F and 38°F, and quantify supplemental electric resistance strip sizing (COP = 1.0) to prevent winter grid peaks.",
    keyFindings: [
      "Inverter heat pump thermal balance point (T_bal) determines whether seasonal electric bills remain affordable; undersizing equipment forces 10 kW resistance strips to engage at 36°F rather than 14°F.",
      "Latent defrost cycle degradation causes the lowest operational COP (1.85–2.20) to occur between 30°F and 38°F due to repeated reverse-cycle hot-gas coil defrost sequences.",
      "Cold-climate inverters maintaining 80%+ rated capacity at -5°F reduce winter peak electrical demand by up to 68% compared to single-stage baseline heat pumps.",
      "Sizing heat pumps strictly on summer cooling capacity creates severe winter capacity deficits, requiring oversized auxiliary resistance banks that overload electrical panels."
    ],
    governingStandards: [
      "AHRI Standard 210/240-2023 (Unitary Air-Conditioner and Air-Source Heat Pump Equipment)",
      "NEEP Cold Climate Air-Source Heat Pump Specification (Version 4.0)",
      "ACCA Manual S (Residential Equipment Selection, 2nd Edition)",
      "ACCA Manual J (Residential Load Calculation, 8th Edition)"
    ],
    formulas: [
      {
        title: "Thermal Balance Point Intersection",
        latex: "q_{\\text{loss}}(T_{bal}) = q_{hp,max}(T_{bal}) \\implies (UA_{eff} + 1.08 \\cdot CFM_{inf})(T_{indoor} - T_{bal}) = q_{hp,max}(T_{bal})",
        explanation: "Equilibrium condition where building envelope heat loss demand precisely equals maximum heat pump heating output."
      },
      {
        title: "Defrost Cycle Degradation Penalty",
        latex: "q_{hp,effective}(T_{oa}) = q_{hp,gross}(T_{oa}) \\cdot Factor_{defrost}(T_{oa}), \\quad Factor_{defrost} \\in [0.85, 1.00]",
        explanation: "Empirical derating factor accounting for frost formation on outdoor coil fins and thermal energy consumed during reverse-cycle de-icing."
      },
      {
        title: "Supplemental Electric Resistance Strip Requirement",
        latex: "kW_{aux} = \\frac{q_{\\text{loss}}(T_{oa}) - q_{hp,max}(T_{oa})}{3412.142}",
        explanation: "Direct electrical deficit in kilowatts required when ambient outdoor temperatures fall below the thermal balance point."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-09",
    doi: "10.6084/m9.figshare.33477430",
    reportNumber: "HL-TR-2026-HP02",
    pdfUrl: "/whitepapers/Student_Lab_01_Heat_Pump_Balance_Point_Thermodynamics.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/175267664/Interactive_Engineering_Lab_Thermodynamic_Modeling_of_Cold_Climate_Heat_Pump_Balance_Points_Inverter_COP_Deratings_and_Supplemental_Electric_Resistance_Loads",
        badge: "DA 93",
      },
      {
        platform: "figshare",
        label: "View Dataset (Figshare)",
        url: "https://figshare.com/articles/dataset/Cold-Climate_Heat_Pump_COP_Derating_Heating_Load_Balance_Point_Dataset_360_Simulation_Points_Across_Variable_Ambient_Temperatures_-15_F_to_50_F_/33477430?file=68350960",
        badge: "DA 91",
      },
    ],
    companionCalculators: [
      {
        name: "Heat Pump Sizing & Balance Point Calculator",
        route: "/calculators/heat-pump-size-calculator",
        description: "Interactive heat pump sizing, balance point simulation, and cold-climate COP curve evaluation."
      },
      {
        name: "Residential Heat Loss Calculator (Manual J)",
        route: "/calculators/heat-loss-calculator",
        description: "Whole-building envelope conductive and infiltration heating load sizing per ACCA Manual J."
      },
      {
        name: "ACCA Manual J Cooling Load & BTU Calculator",
        route: "/calculators/btu-calculator",
        description: "Calculate peak heating and cooling loads with sensible and latent splits."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_hp_balance_lab,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Interactive Engineering Lab: Thermodynamic Modeling of Cold-Climate Heat Pump Balance Points, Inverter COP Deratings, and Supplemental Electric Resistance Loads},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-HP02},
  doi = {10.6084/m9.figshare.33477430},
  url = {https://hvaclogic.com/research/cold-climate-heat-pump-balance-point-lab}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Interactive Engineering Lab: Thermodynamic Modeling of Cold-Climate Heat Pump Balance Points, Inverter COP Deratings, and Supplemental Electric Resistance Loads (Technical Report No. HL-TR-2026-HP02). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.33477430`
  },
  {
    slug: "deterministic-vapor-compression-refrigerant-mass-sizing",
    title: "Deterministic Vapor-Compression Refrigerant Mass Sizing and Liquid Line Displacement Mechanics for Next-Generation Low-GWP Split Systems",
    seoTitle: "Refrigerant Mass Sizing & Liquid Line Displacement",
    seoDescription: "Closed-form mathematical formulations for split-system refrigerant mass charge addition, liquid line displacement, and hydrostatic lift penalties.",
    subtitle: "Closed-form governing equations for refrigerant line-set mass addition, ASTM B280 liquid line displacement, and hydrostatic elevation lift penalties under ASHRAE Standard 15.",
    abstract: "With the global implementation of the AIM Act and Kigali Amendment, vapor-compression building systems are rapidly transitioning from legacy hydrofluorocarbons to mildly flammable lower-GWP A2L alternatives (R-454B and R-32). This paper derives the deterministic governing formulations for refrigerant line-set mass addition, liquid line volumetric displacement, and hydrostatic vertical column corrections across residential and commercial split installations.",
    keyFindings: [
      "Liquid line volumetric displacement accounts for 85%–92% of required field charge additions beyond factory allowances, scaling linearly with ASTM B280 internal cross-sectional area.",
      "Vertical liquid risers over 20 ft impose a hydrostatic downward pressure drop of 0.433 * SG psi/ft, risking premature flash gas at the expansion device without mass compensation.",
      "ASHRAE Standard 15 flammability compliance mandates strict charge mass verification to ensure releasable volume never exceeds 25% of the Lower Flammability Limit (LFL).",
      "Suction risers exceeding 25 ft require mandatory inverted oil traps and minimum gas velocities of 1,500 FPM to ensure continuous polyolester (POE) oil return to the compressor."
    ],
    governingStandards: [
      "ASHRAE Standard 15-2022",
      "ASHRAE Standard 34-2022",
      "AHRI Standard 210/240-2023",
      "EPA Clean Air Act Section 608"
    ],
    formulas: [
      {
        title: "Net Line-Set Mass Addition",
        latex: "\\Delta m = \\max(0, L_{\\text{actual}} - L_{\\text{allowance}}) \\cdot R_{\\text{adder}} + \\Delta m_{\\text{vertical}}",
        explanation: "Calculates required additional field refrigerant mass based on physical line length beyond factory pre-charged limits."
      },
      {
        title: "Liquid Tube Cross-Sectional Area",
        latex: "A_{\\text{int}} = \\frac{\\pi}{4} (OD - 2 \\cdot t_{\\text{wall}})^2",
        explanation: "Calculates internal volumetric displacement capacity of ASTM B280 seamless copper tubing."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-11",
    reportNumber: "HL-TR-2026-REF01",
    pdfUrl: "/whitepapers/Vapor_Compression_Refrigerant_Mass_Sizing.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/175390832/Deterministic_Vapor_Compression_Refrigerant_Mass_Sizing_and_Liquid_Line_Displacement_Mechanics_for_Next_Generation_Low_GWP_Split_Systems",
        badge: "DA 93",
      },
      {
        platform: "figshare",
        label: "View Benchmark Dataset (Figshare)",
        url: "https://doi.org/10.6084/m9.figshare.33640444",
        badge: "DA 91",
      }
    ],
    companionCalculators: [
      {
        name: "Refrigerant Mass Charge Calculator",
        route: "/calculators/refrigerant-charge-calculator",
        description: "Calculate line-set liquid mass addition, factory allowances, and oil trap requirements."
      },
      {
        name: "Superheat & Subcooling Calculator",
        route: "/calculators/superheat-subcooling-calculator",
        description: "Diagnose operating charge with A2L zeotropic temperature glide compensation."
      },
      {
        name: "A2L Refrigerant PT Chart",
        route: "/calculators/pt-chart",
        description: "Interactive saturation pressure-temperature lookup for low-GWP refrigerants."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_refrigerant_charge,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Deterministic Vapor-Compression Refrigerant Mass Sizing and Liquid Line Displacement Mechanics for Next-Generation Low-GWP Split Systems},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-REF01},
  doi = {10.6084/m9.figshare.33640444},
  url = {https://hvaclogic.org/research/deterministic-vapor-compression-refrigerant-mass-sizing}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Deterministic Vapor-Compression Refrigerant Mass Sizing and Liquid Line Displacement Mechanics for Next-Generation Low-GWP Split Systems (Technical Report No. HL-TR-2026-REF01). HVACLogic Open-Access Building Science. https://doi.org/10.6084/m9.figshare.33640444`
  },
  {
    slug: "student-lab-building-envelope-thermal-transmission",
    title: "Student Laboratory Manual: Building Envelope Thermal Transmission, Fenestration SHGC Modeling, and Infiltration Sizing per ACCA Manual J",
    seoTitle: "Building Envelope Thermal Transmission Lab Manual",
    seoDescription: "Undergraduate laboratory manual and deterministic calculations for building envelope U-factors, fenestration SHGC, and ACH50 infiltration sizing per Manual J.",
    subtitle: "An interactive engineering laboratory curriculum contrasting 1975 versus 2025 IECC envelopes and demonstrating the physical failure of empirical 1-ton-per-500-sq-ft shortcuts.",
    abstract: "Accurate determination of residential peak cooling and heating thermal loads is fundamental to mechanical equipment selection, indoor humidity control, and decarbonization. This laboratory manual guides engineering and technology students through the quantitative formulation of multi-layer Fourier conduction, fenestration solar heat gains (SHGC), and pressure-driven blower door air leakage (ACH50) normalized via Sherman-Grimsrud LBL correlation factors. A comparative case study of a 2,500 sq ft home illustrates why legacy contractor heuristics oversize equipment by 80% to 120%, resulting in short-cycling and latent moisture extraction failure.",
    keyFindings: [
      "Legacy rules of thumb (1 ton / 500 sq ft) specify 5.0 tons for a 2,500 sq ft modern home whose true Manual J peak cooling load is only 2.20 tons (a 127% oversizing error).",
      "Continuous exterior polyisocyanurate insulation (R-5) combined with dense-pack cavity batt reduces whole-wall assembly U-factor from 0.143 to 0.038 BTU/(hr·ft²·°F), a 73% conductive load reduction.",
      "Upgrading fenestration to Low-E Argon units (U-0.28, SHGC 0.22) cuts direct solar radiative heat gain by 73% on west-facing glazing exposures.",
      "Blower door tightness improvements from 9.5 ACH50 to 2.0 ACH50 with balanced mechanical ventilation decrease sensible infiltration loads by 79% while protecting indoor relative humidity."
    ],
    governingStandards: [
      "ACCA Manual J (8th Edition)",
      "ASHRAE Handbook — Fundamentals (2021)",
      "IECC 2021 / 2024 Residential Energy Provisions",
      "ASTM E779 Standard Test Method for Determining Air Leakage Rate by Fan Pressurization"
    ],
    formulas: [
      {
        title: "Multi-Layer Assembly Thermal Resistance & Reciprocal U-Factor",
        latex: "U_{\\text{assembly}} = \\frac{1}{R_{\\text{si}} + \\sum_{i=1}^n \\frac{x_i}{k_i} + R_{\\text{cavity}} + R_{\\text{se}}}",
        explanation: "Evaluates overall heat transmittance across composite wall or ceiling assemblies by inverting total series-parallel thermal resistance."
      },
      {
        title: "Fenestration Conductive and Solar Radiation Heat Gain",
        latex: "Q_{\\text{fenestration}} = U \\cdot A \\cdot (T_{\\text{outdoor}} - T_{\\text{indoor}}) + A \\cdot \\text{SHGC} \\cdot E_{\\text{solar}} \\cdot \\text{IAC}",
        explanation: "Decouples conductive temperature differential heat transfer from direct and diffuse solar irradiance transmitted through glazing."
      },
      {
        title: "Pressure-Driven Natural Infiltration Heat Load",
        latex: "Q_{\\text{inf, sensible}} = 1.08 \\cdot \\left(\\frac{\\text{ACH}_{50} \\cdot V_{\\text{building}}}{60 \\cdot N}\\right) \\cdot (T_{\\text{outdoor}} - T_{\\text{indoor}})",
        explanation: "Converts empirical blower door depressurization metrics (ACH50 at 50 Pa) into continuous natural design infiltration CFM via climate-specific LBL correlation factors."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-13",
    reportNumber: "HL-LAB-2026-ENV02",
    pdfUrl: "/whitepapers/Student_Lab_02_Building_Envelope_Thermal_Transmission.pdf",
    repositories: [
      {
        platform: "academia",
        label: "Read on Academia.edu",
        url: "https://www.academia.edu/175459983/Student_Laboratory_Manual_Building_Envelope_Thermal_Transmission_Fenestration_SHGC_Modeling_and_Infiltration_Sizing_per_ACCA_Manual_J",
        badge: "DA 93",
      },
      {
        platform: "archive",
        label: "Internet Archive Monograph",
        url: "https://archive.org/details/hl-lab-2026-env02-student-laboratory-manual-building-envelope-thermal-transmi",
        badge: "DA 96",
      },
      {
        platform: "huggingface",
        label: "Hugging Face Dataset (DOI 10.57967/hf/10401)",
        url: "https://doi.org/10.57967/hf/10401",
        badge: "DA 91",
      },
      {
        platform: "figshare",
        label: "Figshare Dataset (DOI 10.6084/m9.figshare.33702643)",
        url: "https://doi.org/10.6084/m9.figshare.33702643",
        badge: "DA 91",
      }
    ],
    companionCalculators: [
      {
        name: "Heating & Cooling BTU Load Calculator",
        route: "/calculators/btu-calculator",
        description: "Calculate whole-house heating and cooling loads, room-by-room CFM, and Manual J sensible/latent distributions."
      },
      {
        name: "Wall & Roof Assembly R-Value Calculator",
        route: "/calculators/r-value-calculator",
        description: "Determine multi-layer composite assembly U-factors, thermal bridging, and insulation R-values."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_student_lab_02,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {Student Laboratory Manual: Building Envelope Thermal Transmission, Fenestration SHGC Modeling, and Infiltration Sizing per ACCA Manual J},
  institution = {HVACLogic Open Educational Resources & Monograph Series},
  year = {2026},
  number = {HL-LAB-2026-ENV02},
  doi = {10.57967/hf/10401},
  url = {https://hvaclogic.org/research/student-lab-building-envelope-thermal-transmission}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). Student Laboratory Manual: Building Envelope Thermal Transmission, Fenestration SHGC Modeling, and Infiltration Sizing per ACCA Manual J (Courseware Report No. HL-LAB-2026-ENV02). HVACLogic Open Educational Resources. https://doi.org/10.57967/hf/10401`
  },
  {
    slug: "cold-formed-steel-framing-thermal-factors",
    title: "ANSI/ASHRAE/IES Standard 90.1 Cold-Formed Steel Stud Framing Factors & Cavity Insulation Thermal Bridging Deratings",
    seoTitle: "Steel Stud Framing Factors & Cavity R-Value Deratings",
    seoDescription: "Empirical analysis of ASHRAE 90.1 Table A9.2-1 framing factors (Fc), cold-formed steel thermal bridging, and continuous exterior insulation requirements.",
    subtitle: "A rigorous building science evaluation of two-dimensional thermal fin effects, empirical framing correction factors (Fc), and whole-wall assembly U-factor compliance under ANSI/ASHRAE/IES Standard 90.1 and IECC.",
    abstract: "Evaluates the severe two-dimensional thermal bridging physics inherent to cold-formed steel (CFS) stud building envelopes. Because the thermal conductivity of structural carbon steel (k ≈ 45.0 W/m·K / 31.2 BTU/hr·ft·°F) is over 1,180 times greater than typical batt insulation (k ≈ 0.038 W/m·K / 0.026 BTU/hr·ft·°F), steel studs act as highly efficient heat sinks and thermal fins. This monograph examines the finite-difference modeling underlying ANSI/ASHRAE/IES Standard 90.1 Normative Appendix A (Table A9.2-1 and Table A3.3-1), derives the empirical framing correction factor (Fc), tabulates verified effective cavity R-values across 3.5-inch, 6.0-inch, and 8.0-inch depths at 16-inch and 24-inch on-center spacings, and demonstrates why continuous exterior insulation (ci) is mathematically required to achieve contemporary code compliance under IECC 2024.",
    keyFindings: [
      "The thermal conductivity of cold-formed steel (k ≈ 45 W/m·K) exceeds glass fiber insulation by a factor of 1,184, inducing intensive two-dimensional heat flux pinching across stud flanges that violates one-dimensional Fourier assumptions.",
      "Per ASHRAE 90.1 Table A9.2-1, nominal R-13 cavity insulation in a 3.5-inch steel stud wall at 16-inch on-center spacing is derated by 53.8% to an effective cavity resistance of R-6.0 (framing factor Fc = 0.46).",
      "In 6.0-inch steel studs @ 16-inch on-center spacing, nominal R-19 fiberglass batt delivers an effective cavity resistance of only R-7.1 (a 62.6% thermal loss, Fc = 0.37), highlighting diminishing returns of cavity insulation without continuous exterior insulation.",
      "Continuous exterior insulation (ci) installed across the exterior sheathing plane is unaffected by stud thermal bridging, functioning in pure series and providing a 100% effective thermal barrier (effective R-value = nominal R-value).",
      "Under IECC 2024 Table C402.1.4, meeting the Climate Zone 5-6 steel-framed wall prescriptive limit (U ≤ 0.064 BTU/hr·ft²·°F) requires at least R-13 cavity + R-7.5 ci or R-20 cavity + R-3.8 ci, proving that code compliance is physically unattainable with cavity insulation alone."
    ],
    governingStandards: [
      "ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A, Tables A3.3-1 & A9.2-1)",
      "ASHRAE Handbook—Fundamentals 2021 (Chapters 25 & 27)",
      "IECC 2021/2024 Commercial & Residential Building Provisions (Table C402.1.4)",
      "AISI S240-20 / AISI S100-16 North American Specification for Cold-Formed Steel"
    ],
    formulas: [
      {
        title: "Empirical Cavity Thermal Correction Factor (Fc)",
        latex: "R_{\\text{cavity, eff}} = R_{\\text{cavity, nom}} \\times F_c \\quad \\iff \\quad F_c = \\frac{R_{\\text{cavity, eff}}}{R_{\\text{cavity, nom}}}",
        explanation: "Governs the non-linear derating of nominal cavity insulation batts subjected to two-dimensional lateral heat pinching through steel web and flange conductive paths."
      },
      {
        title: "Steel-to-Insulation Thermal Conductivity Ratio (Thermal Fin Pinning)",
        latex: "\\kappa_{\\text{thermal}} = \\frac{k_{\\text{steel}}}{k_{\\text{insulation}}} = \\frac{45.0\\text{ W}/(\\text{m}\\cdot\\text{K})}{0.038\\text{ W}/(\\text{m}\\cdot\\text{K})} \\approx 1184",
        explanation: "Quantifies the massive thermal conductivity disparity driving heat toward the conductive steel stud path rather than through the insulating cavity."
      },
      {
        title: "Whole-Wall Assembly U-Factor with Continuous Exterior Insulation (ci)",
        latex: "U_{\\text{assembly}} = \\frac{1}{R_{\\text{int air}} + R_{\\text{gypsum}} + (R_{\\text{cavity, nom}} \\cdot F_c) + R_{\\text{sheathing}} + R_{\\text{ci}} + R_{\\text{cladding}} + R_{\\text{ext air}}}",
        explanation: "Computes the total assembly overall heat transmission coefficient combining parallel-bridged cavity layers and unbridged continuous exterior insulation layers in series."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-19",
    reportNumber: "HL-TR-2026-STEEL01",
    pdfUrl: "/whitepapers/Student_Lab_02_Building_Envelope_Thermal_Transmission.pdf",
    repositories: [
      {
        platform: "academia",
        label: "HVACLogic Series on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93"
      }
    ],
    companionCalculators: [
      {
        name: "Building Envelope Thermal Bridging & Effective R-Value Calculator",
        route: "/calculators/effective-r-value-calculator",
        description: "Simulate parallel-path framing thermal bridging, continuous exterior insulation, and whole-wall U-factors per ASHRAE 90.1."
      },
      {
        name: "Insulation R-Value & U-Factor Sizing Calculator",
        route: "/calculators/r-value-calculator",
        description: "Stack multi-layer homogeneous building envelope materials and determine cumulative thermal resistance."
      },
      {
        name: "Building Heat Loss & Manual J Infiltration Sizer",
        route: "/calculators/heat-loss-calculator",
        description: "Model building enclosure Fourier conductive transmission and infiltration loads for space heating design."
      }
    ],
    tables: [
      {
        title: "ASHRAE 90.1 Table A9.2-1 & Table A3.3-1: Cold-Formed Steel Framing Correction Factors (Fc) & Effective Cavity R-Values",
        subtitle: "Normative effective cavity thermal resistance values for steel stud wall systems.",
        standardReference: "ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A",
        headers: ["Stud Depth", "Stud Spacing", "Nominal Cavity R", "Effective Cavity R (hr·ft²·°F/BTU)", "Framing Factor (Fc)", "Cavity Derate Loss (%)"],
        rows: [
          ["3.5 in (2x4 steel)", "16 in O.C.", "R-11", "R-5.5", "0.50", "50.0%"],
          ["3.5 in (2x4 steel)", "16 in O.C.", "R-13", "R-6.0", "0.46", "53.8%"],
          ["3.5 in (2x4 steel)", "16 in O.C.", "R-15", "R-6.4", "0.43", "57.3%"],
          ["3.5 in (2x4 steel)", "24 in O.C.", "R-11", "R-6.6", "0.60", "40.0%"],
          ["3.5 in (2x4 steel)", "24 in O.C.", "R-13", "R-7.2", "0.55", "44.6%"],
          ["3.5 in (2x4 steel)", "24 in O.C.", "R-15", "R-7.8", "0.52", "48.0%"],
          ["6.0 in (2x6 steel)", "16 in O.C.", "R-19", "R-7.1", "0.37", "62.6%"],
          ["6.0 in (2x6 steel)", "16 in O.C.", "R-21", "R-7.4", "0.35", "64.8%"],
          ["6.0 in (2x6 steel)", "24 in O.C.", "R-19", "R-8.6", "0.45", "54.7%"],
          ["6.0 in (2x6 steel)", "24 in O.C.", "R-21", "R-9.0", "0.43", "57.1%"],
          ["8.0 in (2x8 steel)", "16 in O.C.", "R-25", "R-7.8", "0.31", "68.8%"],
          ["8.0 in (2x8 steel)", "24 in O.C.", "R-25", "R-9.6", "0.38", "61.6%"]
        ],
        footnote: "Values derived from ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A, Table A9.2-1 & Table A3.3-1. Framing factor Fc = R_effective / R_nominal."
      },
      {
        title: "Continuous Exterior Insulation (ci) Prescriptive Minimums under IECC 2024 / ASHRAE 90.1",
        subtitle: "Above-grade commercial steel-framed wall assembly U-factor and continuous insulation prescriptive targets.",
        standardReference: "IECC 2024 Table C402.1.4 & ASHRAE 90.1-2022",
        headers: ["Climate Zone", "Assembly U-Factor Limit", "Steel Framing Prescriptive Option", "Effective Whole-Wall R-Value", "Status"],
        rows: [
          ["Zones 1–2", "U ≤ 0.084", "R-13 + R-3.8 ci", "R-12.3", "Compliant"],
          ["Zone 3", "U ≤ 0.077", "R-13 + R-5.0 ci", "R-13.5", "Compliant"],
          ["Zone 4", "U ≤ 0.064", "R-13 + R-7.5 ci", "R-16.0", "Compliant"],
          ["Zones 5–6", "U ≤ 0.064", "R-19 + R-7.5 ci", "R-17.1", "Compliant"],
          ["Zones 7–8", "U ≤ 0.052", "R-13 + R-10.0 ci", "R-19.5", "Compliant"]
        ],
        footnote: "Derived from IECC 2024 Commercial Table C402.1.4 and ASHRAE Standard 90.1-2022 Building Envelope Requirements."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_steel_framing_factors,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {ANSI/ASHRAE/IES Standard 90.1 Cold-Formed Steel Stud Framing Factors and Cavity Insulation Thermal Bridging Deratings},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-STEEL01},
  url = {https://hvaclogic.org/research/cold-formed-steel-framing-thermal-factors}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). ANSI/ASHRAE/IES Standard 90.1 Cold-Formed Steel Stud Framing Factors and Cavity Insulation Thermal Bridging Deratings (Technical Report No. HL-TR-2026-STEEL01). HVACLogic Open-Access Building Science. https://hvaclogic.org/research/cold-formed-steel-framing-thermal-factors`
  },
  {
    slug: "ashrae-241-equivalent-clean-airflow",
    title: "ANSI/ASHRAE Standard 241-2023: Equivalent Clean Airflow (ECA), Infection Risk Management Mode (IRMM), and Pathogen Mitigation Architecture",
    seoTitle: "ASHRAE 241 Equivalent Clean Airflow & Pathogen Mitigation",
    seoDescription: "Engineering monograph and normative calculation framework for ANSI/ASHRAE Standard 241-2023. Models Table 5-1 ECA baselines, MERV filtration, and in-room HEPA air cleaners.",
    subtitle: "A deterministic engineering framework for modeling multi-zone equivalent clean airflow (ECA_i), aerosol particle capture efficiency, and infection risk management in commercial, educational, and healthcare buildings.",
    abstract: "ANSI/ASHRAE Standard 241-2023, Control of Infectious Aerosols, establishes the first consensus-based national standard for mitigating disease transmission via airborne pathogen droplet nuclei in the built environment. This engineering monograph articulates the core mathematical formulations governing Equivalent Clean Airflow (ECA) during Infection Risk Management Mode (IRMM). We model the normative Table 5-1 baseline clean airflow per person (ECA_p) and per unit floor area (ECA_a), quantify the single-pass removal efficiencies of central recirculation air filters (MERV 8 through MERV 16/HEPA) on 1–3 µm infectious bioaerosols, evaluate room air mixing effectiveness for in-room portable air cleaners (CADR), and formalize the equivalent clean airflow contribution of upper-room UV-C germicidal irradiation systems. An integrated open dataset benchmarks 12 common space archetypes across varying occupancy densities and filtration topologies, demonstrating how targeted filtration and supplemental air cleaning satisfy IRMM targets with 60% lower thermal energy penalties than 100% outdoor air dilution.",
    keyFindings: [
      "ASHRAE 241 Table 5-1 mandates 20–30 L/s/person (42.4–63.6 CFM/person) of equivalent clean airflow in schools, assembly spaces, and gyms during IRMM, representing a 2.5× to 4× increase over ASHRAE 62.1 baseline ventilation.",
      "Meeting IRMM targets solely through outdoor air dilution increases heating/cooling coil loads by 250%–400%, whereas upgrading central filtration to MERV 13 (85% bioaerosol efficiency) satisfies over 70% of required ECA without increasing outdoor air thermal penalties.",
      "Standard MERV 8 filters capture only ~20% of 1–3 µm infectious bioaerosol droplet nuclei, producing a critical compliance deficit in typical commercial and educational recirculation systems.",
      "Supplemental in-room portable HEPA air cleaners deployed at a room mixing effectiveness of ε_mix = 0.9 provide cost-effective localized ECA delivery, bridging deficits in spaces with fixed central AHU duct static pressure constraints.",
      "Upper-room UV-C germicidal irradiation provides high-equivalent clean air exchange rates (up to 15–20 ACH equivalent) in crowded public assembly and healthcare zones with minimal operating fan power."
    ],
    governingStandards: [
      "ANSI/ASHRAE Standard 241-2023: Control of Infectious Aerosols",
      "ANSI/ASHRAE Standard 62.1-2022: Ventilation for Acceptable Indoor Air Quality",
      "ANSI/ASHRAE Standard 52.2-2017: Method of Testing General Ventilation Air-Cleaning Devices for Removal Efficiency by Particle Size",
      "CDC Core Recommendations for Reducing Exposure to Respiratory Pathogens in Indoor Environments (2024)"
    ],
    formulas: [
      {
        title: "Required Zone Equivalent Clean Airflow Rate (ECA_i)",
        latex: "ECA_i = P_z \\cdot ECA_p + A_z \\cdot ECA_a",
        explanation: "Normative equation from ANSI/ASHRAE Standard 241-2023 Section 5 determining the mandatory clean airflow demand during Infection Risk Management Mode (IRMM) as a function of zone population (P_z) and floor area (A_z)."
      },
      {
        title: "Central Recirculation Filter Pathogen Removal Rate",
        latex: "ECA_{\\text{recirc}} = V_{\\text{recirc}} \\cdot \\eta_{\\text{filter}}",
        explanation: "Quantifies equivalent clean airflow delivered by central HVAC mechanical filtration, where η_filter is the single-pass capture efficiency for 1–3 µm bioaerosol droplet nuclei (e.g. 0.85 for MERV 13)."
      },
      {
        title: "Total Delivered Multi-Technology Equivalent Clean Airflow",
        latex: "ECA_{\\text{delivered}} = V_{ot} + (V_{\\text{recirc}} \\cdot \\eta_{\\text{filter}}) + (\\text{CADR}_{\\text{in-room}} \\cdot \\varepsilon_{\\text{mix}}) + ECA_{\\text{uv-c}}",
        explanation: "Summates pathogen-free outdoor ventilation air (V_ot), central filtered recirculated air, in-room portable air cleaner CADR scaled by room mixing factor ε_mix, and upper-room UV-C germicidal irradiation."
      },
      {
        title: "Equivalent Air Changes per Hour (ACH_equiv)",
        latex: "\\text{ACH}_{\\text{equiv}} = \\frac{ECA_{\\text{total}} \\times 60}{V_{\\text{room}}} = \\frac{ECA_{\\text{total}} \\times 60}{A_z \\times H_{\\text{ceiling}}}",
        explanation: "Normalizes volumetric clean airflow delivery to room cubic volume to evaluate pathogen dilution and clearance kinetics against CDC and ASHRAE ventilation benchmarks."
      }
    ],
    authors: ["HVACLogic Research Group", "Miad S."],
    publicationDate: "2026-09-23",
    reportNumber: "HL-TR-2026-AIR241",
    pdfUrl: "/whitepapers/HVACLogic_ASHRAE_241_Clean_Airflow_Monograph.pdf",
    repositories: [
      {
        platform: "academia",
        label: "HVACLogic Series on Academia.edu",
        url: "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        badge: "DA 93"
      },
      {
        platform: "figshare",
        label: "Figshare Benchmark Dataset",
        url: "https://doi.org/10.6084/m9.figshare.33977425",
        badge: "DOI 10.6084/m9.figshare.33977425"
      }
    ],
    companionCalculators: [
      {
        name: "Filter Sizing & Static Pressure Drop Calculator",
        route: "/calculators/filter-sizing-calculator",
        description: "Size MERV 13+ filters, calculate face velocity, and evaluate initial clean vs. loaded static pressure drops per ASHRAE 52.2."
      },
      {
        name: "Ventilation Airflow & Building CFM Calculator",
        route: "/calculators/cfm-calculator",
        description: "Determine building envelope sensible/latent airflow requirements and room air exchange rates."
      },
      {
        name: "ACCA Manual D Equivalent Length & Fitting Accumulator",
        route: "/calculators/equivalent-length-calculator",
        description: "Calculate total effective length (TEL) and verify available static pressure (ASP) budget for filtration upgrades."
      }
    ],
    tables: [
      {
        title: "ANSI/ASHRAE Standard 241-2023 Table 5-1 Minimum Equivalent Clean Airflow Rates",
        subtitle: "Normative Infection Risk Management Mode (IRMM) clean airflow baselines per occupant and floor area.",
        standardReference: "ANSI/ASHRAE Standard 241-2023 Table 5-1",
        headers: ["Occupancy Category", "Space Type", "ECA_p (L/s/person)", "ECA_p (CFM/person)", "ECA_a (CFM/sq ft)", "Default Density (occ/1000 ft²)"],
        rows: [
          ["Educational", "Classroom (Ages 5–8)", "20", "42.4", "0.12", "25"],
          ["Educational", "Classroom (Age 9+ & Lecture)", "20", "42.4", "0.12", "35"],
          ["Commercial", "General Office Space", "15", "31.8", "0.12", "5"],
          ["Commercial", "Conference / Meeting Room", "15", "31.8", "0.16", "50"],
          ["Healthcare", "Patient Room", "25", "53.0", "0.20", "4"],
          ["Healthcare", "Outpatient Exam Room", "25", "53.0", "0.20", "10"],
          ["Commercial", "Retail & Department Store", "15", "31.8", "0.12", "15"],
          ["Public Assembly", "Restaurant Dining", "20", "42.4", "0.18", "70"],
          ["Public Assembly", "Fitness Gym / Aerobics", "30", "63.6", "0.30", "40"],
          ["Public Assembly", "Place of Worship", "15", "31.8", "0.12", "100"],
          ["Residential", "Residential Common Areas", "10", "21.2", "0.10", "10"]
        ],
        footnote: "Values excerpted from ANSI/ASHRAE Standard 241-2023 Table 5-1. 1 L/s = 2.11888 CFM."
      },
      {
        title: "Bioaerosol Droplet Nuclei (1–3 µm) Removal Efficiency by Filter Rating",
        subtitle: "Single-pass mechanical filtration efficiencies and equivalent clean air multiplier factors.",
        standardReference: "ASHRAE Standard 52.2 & ASHRAE 241 Appendix A",
        headers: ["Filter Rating", "Bioaerosol Removal (1–3 µm)", "Typical Clean ΔP (in. wg)", "ASHRAE 241 Suitability", "Engineering Role"],
        rows: [
          ["MERV 8", "20%", "0.12", "Non-Compliant Baseline", "Coarse pre-filter only; large dust & pollen capture."],
          ["MERV 11", "50%", "0.18", "Marginal", "Partial droplet nuclei reduction; insufficient for high-density IRMM."],
          ["MERV 13", "85%", "0.25", "Normative Baseline", "ASHRAE 241 recommended central AHU minimum."],
          ["MERV 14", "90%", "0.30", "High Performance", "Commercial healthcare and premium corporate facilities."],
          ["MERV 15", "95%", "0.34", "Advanced Protection", "High-exposure clinical environments and clean rooms."],
          ["MERV 16 / HEPA", "≥99.97%", "0.50–1.00", "Maximum Efficiency", "Critical isolation suites and standalone in-room air cleaners."]
        ],
        footnote: "Single-pass capture efficiencies based on ASHRAE 52.2 particle size efficiency curves (E1: 0.3–1.0 µm, E2: 1.0–3.0 µm)."
      }
    ],
    bibtex: `@techreport{hvaclogic_2026_ashrae_241_clean_airflow,
  author = {{HVACLogic Research Group} and S., Miad},
  title = {ANSI/ASHRAE Standard 241-2023: Equivalent Clean Airflow (ECA), Infection Risk Management Mode (IRMM), and Pathogen Mitigation Architecture},
  institution = {HVACLogic Open-Access Building Science Monograph Series},
  year = {2026},
  number = {HL-TR-2026-AIR241},
  url = {https://hvaclogic.org/research/ashrae-241-equivalent-clean-airflow}
}`,
    apa: `HVACLogic Research Group, & S., M. (2026). ANSI/ASHRAE Standard 241-2023: Equivalent Clean Airflow (ECA), Infection Risk Management Mode (IRMM), and Pathogen Mitigation Architecture (Technical Report No. HL-TR-2026-AIR241). HVACLogic Open-Access Building Science. https://hvaclogic.org/research/ashrae-241-equivalent-clean-airflow`
  }
];

export interface ResearchDataset {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  doi: string;
  repository: string;
  repositoryUrl?: string;
  format: string;
  downloadUrl?: string;
  publicationDate: string;
  recordCount: number;
}

export const RESEARCH_DATASETS: ResearchDataset[] = [
  {
    slug: "ashrae-hyland-wexler-psychrometric-benchmark-dataset",
    title: "ASHRAE Hyland-Wexler Moist Air Psychrometric Benchmark Dataset",
    subtitle: "420 verified thermodynamic state points across standard sea-level and elevated altitude barometric regimes.",
    description: "Comprehensive benchmark matrix tabulating dry bulb, relative humidity, barometric pressure, saturation pressure, vapor pressure, dew point, numerical wet bulb, humidity ratio (grains/lb), enthalpy, specific volume, and air density.",
    doi: "10.6084/m9.figshare.33456928",
    repository: "Figshare",
    repositoryUrl: "https://figshare.com/articles/dataset/ASHRAE_Hyland-Wexler_Moist_Air_Psychrometric_Benchmark_Dataset_420_Thermodynamic_State_Points_Across_Sea-Level_and_Elevated_Altitudes/33456928?file=68285407",
    format: "CSV",
    downloadUrl: "/datasets/hvaclogic_ashrae_hyland_wexler_psychrometric_benchmark.csv",
    publicationDate: "2026-09-07",
    recordCount: 420
  },
  {
    slug: "cold-climate-heat-pump-cop-balance-point-dataset",
    title: "Cold-Climate Heat Pump COP Derating & Heating Load Balance Point Dataset",
    subtitle: "240 deterministic simulation points across variable ambient temperatures (-15°F to 55°F).",
    description: "Multi-parameter performance matrix modeling variable-speed compressor capacity retention, COP degradation, latent defrost penalties, thermal balance point intersections, and supplemental electric resistance heating strip requirements.",
    doi: "10.6084/m9.figshare.33477430",
    repository: "Figshare",
    repositoryUrl: "https://figshare.com/articles/dataset/Cold-Climate_Heat_Pump_COP_Derating_Heating_Load_Balance_Point_Dataset_360_Simulation_Points_Across_Variable_Ambient_Temperatures_-15_F_to_50_F_/33477430?file=68350960",
    format: "CSV",
    downloadUrl: "/datasets/hvaclogic_cold_climate_heat_pump_cop_benchmark.csv",
    publicationDate: "2026-09-09",
    recordCount: 240
  },
  {
    slug: "zeotropic-a2l-refrigerant-phase-equilibrium-dataset",
    title: "Thermodynamic Phase-Equilibrium and Temperature Glide Modeling of A2L Refrigerants (R-454B & R-32)",
    subtitle: "Saturation pressure-temperature equilibrium matrix and zeotropic glide compensation curves.",
    description: "NIST REFPROP-benchmarked saturation curves for R-454B and R-32 evaluating bubble-point subcooling and dew-point superheat across sub-freezing to high-ambient condensing regimes.",
    doi: "10.7910/DVN/SR1NZO",
    repository: "Harvard Dataverse",
    format: "Tabular / Replication Data",
    publicationDate: "2026-09-04",
    recordCount: 150
  },
  {
    slug: "next-generation-low-gwp-refrigerant-charge-benchmark-dataset",
    title: "Next-Generation Low-GWP Refrigerant Line-Set Mass Addition & Velocity Gradient Benchmark Dataset",
    subtitle: "816 deterministic calculation points modeling liquid refrigerant mass addition and hydrostatic elevation lift penalties.",
    description: "Multi-parameter engineering benchmark evaluating low-GWP A2L blends (R-454B, R-32) and legacy R-410A across standardized ASTM B280 liquid line diameters (1/4\", 5/16\", 3/8\", 1/2\"), line-set lengths from 15 ft to 150 ft, and vertical elevation risers up to 45 ft with oil trap flags.",
    doi: "10.6084/m9.figshare.33640444",
    repository: "Figshare",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33640444",
    format: "CSV",
    downloadUrl: "/datasets/refrigerant_mass_charge_benchmark_dataset_2026.csv",
    publicationDate: "2026-09-11",
    recordCount: 816
  },
  {
    slug: "building-envelope-thermal-transmission-benchmark-dataset",
    title: "Building Envelope Thermal Transmission, Fenestration SHGC & Infiltration Benchmark Matrix (Figshare)",
    subtitle: "540 deterministic state vectors across ASHRAE Climate Zones 2–6 evaluating conduction, solar gains, and ACH50 infiltration.",
    description: "Multi-parameter residential building science benchmark calculating Fourier conductive transmission across composite wall and roof assemblies, fenestration Solar Heat Gain Coefficients (SHGC), and pressure-driven envelope infiltration per ACCA Manual J (8th Edition).",
    doi: "10.6084/m9.figshare.33702643",
    repository: "Figshare",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33702643",
    format: "CSV",
    downloadUrl: "/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.csv",
    publicationDate: "2026-09-13",
    recordCount: 540
  },
  {
    slug: "building-envelope-thermal-transmission-huggingface-dataset",
    title: "Building Envelope Thermal Transmission & Infiltration Benchmark Matrix (Hugging Face)",
    subtitle: "540 deterministic state vectors across ASHRAE Climate Zones 2–6 on Hugging Face Datasets.",
    description: "Hugging Face Open Dataset repository containing 540 deterministic engineering vectors evaluating Fourier conduction, solar SHGC, and ACH50 infiltration sizing under ACCA Manual J (8th Edition). Includes complete dataset card, column dictionary, and automated Python / Pandas loading scripts.",
    doi: "10.57967/hf/10401",
    repository: "Hugging Face",
    repositoryUrl: "https://huggingface.co/datasets/miadinside/building-envelope-thermal-transmission-benchmark-2026",
    format: "CSV / JSON",
    downloadUrl: "/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.csv",
    publicationDate: "2026-09-13",
    recordCount: 540
  },
  {
    slug: "ashrae-241-clean-airflow-benchmark-dataset",
    title: "ANSI/ASHRAE Standard 241-2023 Equivalent Clean Airflow (ECA) Benchmark Dataset",
    subtitle: "178 deterministic infection risk management state vectors across 11 commercial, educational, and healthcare space archetypes.",
    description: "Multi-parameter pathogen mitigation benchmark evaluating Table 5-1 ECA baseline demand, mechanical filter bioaerosol capture across MERV 8–16/HEPA, in-room air cleaners, and upper-room UV-C irradiation under ANSI/ASHRAE Standard 241-2023.",
    doi: "10.6084/m9.figshare.33977425",
    repository: "Figshare",
    repositoryUrl: "https://figshare.com/articles/dataset/ANSI_ASHRAE_Standard_241-2023_Equivalent_Clean_Airflow_ECA_Benchmark_Dataset/33977425",
    format: "CSV",
    downloadUrl: "/datasets/ashrae_241_equivalent_clean_airflow_benchmark_2026.csv",
    publicationDate: "2026-09-23",
    recordCount: 178
  }
];

export function getResearchPaperBySlug(slug: string): ResearchPaper | undefined {
  return RESEARCH_PAPERS.find((p) => p.slug === slug);
}

export function getAllResearchPaperSlugs(): string[] {
  return RESEARCH_PAPERS.map((p) => p.slug);
}

