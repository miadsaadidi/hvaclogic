export interface StandardClause {
  clauseNumber: string;
  title: string;
  summary: string;
  governingEquation?: string;
  applicableCalculators: {
    name: string;
    route: string;
  }[];
}

export interface EngineeringStandard {
  code: string;
  organization: "ASHRAE" | "ACCA" | "SMACNA" | "AHRI" | "EPA" | "AMCA" | "NFPA" | "ICC";
  title: string;
  edition: string;
  scope: string;
  importance: string;
  clauses: StandardClause[];
}

export const ENGINEERING_STANDARDS: EngineeringStandard[] = [
  {
    code: "ASHRAE Standard 90.1",
    organization: "ASHRAE",
    title: "Energy Standard for Buildings Except Low-Rise Residential Buildings",
    edition: "2022 Edition",
    scope: "Prescribes minimum energy-efficiency design criteria for commercial buildings, covering the building envelope, HVAC systems, and service water heating.",
    importance: "An energy-efficiency standard whose legal applicability depends on adoption by the relevant jurisdiction or applicable building energy code.",
    clauses: [
      {
        clauseNumber: "Section 6.4.1",
        title: "Equipment Efficiency Metric Formulations",
        summary: "Defines unit conversion relationships and rating metrics (such as SEER2, HSPF2, EER2, and COP) referenced in equipment efficiency baselines.",
        governingEquation: "\\text{COP} = \\frac{\\text{SEER2}}{3.41214}, \\quad \\text{EER2} = \\frac{\\text{Net Capacity (BTU/h)}}{\\text{Total Power (W)}}",
        applicableCalculators: [
          { name: "Heat Pump Running Cost Calculator", route: "/calculators/heat-pump-size-calculator" },
          { name: "AC Running Cost Calculator", route: "/calculators/ac-tonnage-calculator" }
        ]
      },
      {
        clauseNumber: "Section 6.4.4",
        title: "HVAC System Ductwork and Plenum Insulation & Sealing",
        summary: "Specifies duct air-leakage test criteria and thermal insulation R-value requirements for ducts located in unconditioned spaces.",
        applicableCalculators: [
          { name: "Insulation R-Value to U-Value Calculator", route: "/calculators/r-value-calculator" },
          { name: "Duct Friction Loss Calculator", route: "/calculators/duct-friction-loss-calculator" }
        ]
      }
    ]
  },
  {
    code: "ASHRAE Standard 62.2",
    organization: "ASHRAE",
    title: "Ventilation and Acceptable Indoor Air Quality in Low-Rise Residential Buildings",
    edition: "2022 Edition",
    scope: "Defines methods for calculating continuous and intermittent mechanical outdoor air ventilation rates and local exhaust metrics for residential dwellings.",
    importance: "A consensus residential ventilation standard widely referenced by model energy codes, green building programs, and local housing standards.",
    clauses: [
      {
        clauseNumber: "Section 4.1.1",
        title: "Continuous Mechanical Ventilation Rate Method (Q_tot)",
        summary: "Reference calculation corresponding to the continuous volumetric outdoor airflow rate based on conditioned floor area and default occupant count.",
        governingEquation: "Q_{\\text{tot}} = 0.03 \\times A_{\\text{floor}} + 7.5 \\times (N_{\\text{bedrooms}} + 1)",
        applicableCalculators: [
          { name: "CFM Airflow & Duct Velocity Calculator", route: "/calculators/cfm-calculator" }
        ]
      },
      {
        clauseNumber: "Section 5.1",
        title: "Local Mechanical Exhaust Airflow Reference Rates",
        summary: "Identifies reference design airflow targets for kitchen exhaust (100 CFM intermittent / 25 CFM continuous) and bathroom exhaust (50 CFM intermittent / 20 CFM continuous).",
        applicableCalculators: [
          { name: "Kitchen Exhaust Hood CFM Calculator", route: "/calculators/kitchen-hood-cfm" }
        ]
      }
    ]
  },
  {
    code: "ACCA Manual J",
    organization: "ACCA",
    title: "Residential Load Calculation",
    edition: "8th Edition (Full Technical Version)",
    scope: "An ANSI-recognized engineering procedure for calculating sensible and latent peak heating and cooling loads for residential dwellings.",
    importance: "A residential load-calculation methodology recognized by model codes (such as IRC M1401.3 and IECC) where adopted by the local authority having jurisdiction.",
    clauses: [
      {
        clauseNumber: "Section 1-3",
        title: "Design Conditions & Envelope Conduction",
        summary: "Calculates conductive heat transfer across building envelope components using 99% heating and 1% cooling design temperatures.",
        governingEquation: "Q_{\\text{cond}} = \\sum (U \\times A \\times \\Delta T)",
        applicableCalculators: [
          { name: "Residential Heat Loss Calculator (Manual J)", route: "/calculators/heat-loss-calculator" },
          { name: "Furnace BTU Sizing Calculator", route: "/calculators/furnace-size-calculator" },
          { name: "Insulation R-Value to U-Value Calculator", route: "/calculators/r-value-calculator" }
        ]
      },
      {
        clauseNumber: "Section 4",
        title: "Sensible Infiltration & Air Exchange Load",
        summary: "Calculates estimated heating and cooling loads resulting from air infiltration through the building envelope.",
        governingEquation: "Q_{\\text{infil}} = 1.08 \\times \\text{CFM}_{\\text{infil}} \\times (T_{\\text{indoor}} - T_{\\text{outdoor}})",
        applicableCalculators: [
          { name: "Residential Heat Loss Calculator", route: "/calculators/heat-loss-calculator" },
          { name: "Garage Heater BTU Calculator", route: "/calculators/garage-heater-sizing" }
        ]
      }
    ]
  },
  {
    code: "ACCA Manual D",
    organization: "ACCA",
    title: "Residential Duct Systems Design",
    edition: "3rd Edition",
    scope: "An engineering design methodology for residential duct systems, including available static pressure budgeting, effective length calculations, and duct sizing.",
    importance: "An industry reference for residential duct design methodology, referenced by model building codes according to jurisdiction-specific adoptions.",
    clauses: [
      {
        clauseNumber: "Section 3",
        title: "Available Static Pressure (ASP) & Total Effective Length (TEL)",
        summary: "Determines design friction rate per 100 ft by accounting for component pressure losses and total equivalent length.",
        governingEquation: "\\text{FR} = \\frac{(\\text{ESP} - \\Delta P_{\\text{components}}) \\times 100}{\\text{TEL}}",
        applicableCalculators: [
          { name: "Duct Airflow & Friction Rate Sizing Calculator", route: "/calculators/ductulator" },
          { name: "Duct Friction Loss & Pressure Drop Calculator", route: "/calculators/duct-friction-loss-calculator" },
          { name: "ACCA Manual D Equivalent Length Calculator", route: "/calculators/equivalent-length-calculator" },
          { name: "Filter Sizing & Pressure Drop Calculator", route: "/calculators/filter-sizing-calculator" }
        ]
      },
      {
        clauseNumber: "Section 5",
        title: "Flexible Duct Compression and Velocity Guidelines",
        summary: "Accounts for pressure drop adjustments from duct compression and provides velocity guidelines for residential distribution branches.",
        governingEquation: "V = \\frac{\\text{CFM}}{A_{\\text{duct}}} = \\frac{\\text{CFM} \\times 144}{\\pi \\times (D/2)^2}",
        applicableCalculators: [
          { name: "Flexible Duct Sizing Chart & CFM Calculator", route: "/calculators/flex-duct-cfm-chart" },
          { name: "CFM Airflow & Duct Velocity Calculator", route: "/calculators/cfm-calculator" }
        ]
      }
    ]
  },
  {
    code: "ACCA Manual S",
    organization: "ACCA",
    title: "Residential Equipment Selection",
    edition: "2nd Edition",
    scope: "A residential equipment-selection procedure for matching heating and cooling equipment capacities to calculated peak loads.",
    importance: "Provides selection limits and procedures to help select appropriately sized equipment based on manufacturer expanded performance data and design conditions.",
    clauses: [
      {
        clauseNumber: "Section 1",
        title: "Cooling Equipment Sizing Guidelines",
        summary: "Provides guidelines for equipment capacity selection relative to calculated design loads to promote balanced comfort and dehumidification performance under stated operating conditions.",
        applicableCalculators: [
          { name: "AC & Heat Pump Tonnage Calculator", route: "/calculators/ac-tonnage-calculator" },
          { name: "Mini-Split Multi-Zone Sizing Calculator", route: "/calculators/mini-split-sizing" }
        ]
      }
    ]
  },
  {
    code: "SMACNA HVAC Duct Construction Standards",
    organization: "SMACNA",
    title: "HVAC Duct Construction Standards - Metal and Flexible",
    edition: "4th Edition",
    scope: "Industry fabrication, gauge, reinforcement, and construction guidelines for metal and flexible duct systems.",
    importance: "An industry reference standard for sheet metal fabrication, duct construction methods, and pressure-class classifications.",
    clauses: [
      {
        clauseNumber: "Chapter 2",
        title: "Rectangular & Round Duct Sizing Relationships",
        summary: "Provides hydraulic diameter equivalencies for rectangular ducts (often recommended with aspect ratios W/H <= 4:1 where practical to minimize excess surface friction and material deflection) and structural pressure-class tables.",
        governingEquation: "D_e = \\frac{1.30 \\times (a \\times b)^{0.625}}{(a + b)^{0.25}}",
        applicableCalculators: [
          { name: "Duct Airflow & Friction Rate Sizing Calculator", route: "/calculators/ductulator" },
          { name: "Duct Friction Loss Calculator", route: "/calculators/duct-friction-loss-calculator" }
        ]
      }
    ]
  },
  {
    code: "AHRI Standard 210/240",
    organization: "AHRI",
    title: "Performance Rating of Unitary Air-Conditioning & Air-Source Heat Pump Equipment",
    edition: "2023 Edition (SEER2 / HSPF2 Metric)",
    scope: "Establishes standardized laboratory rating conditions, test procedures, and calculation methods for unitary air-conditioners and air-source heat pumps.",
    importance: "Performance-rating and test-method reference for applicable residential air-conditioning and heat-pump equipment.",
    clauses: [
      {
        clauseNumber: "Section 6",
        title: "Part-Load Rating & Temperature Bin Weighting",
        summary: "Defines standardized test points and calculation procedures used to determine seasonal rating metrics (SEER2 and HSPF2) across representative temperature bins.",
        applicableCalculators: [
          { name: "Heat Pump Running Cost Calculator", route: "/calculators/heat-pump-size-calculator" },
          { name: "AC Model Number Decoder", route: "/calculators/ac-model-decoder" }
        ]
      }
    ]
  },
  {
    code: "EPA Clean Air Act Section 608",
    organization: "EPA",
    title: "National Recycling and Emission Reduction Program",
    edition: "40 CFR Part 82 Subpart F",
    scope: "Federal regulations governing technician certification, refrigerant recovery/recycling, leak-rate repair triggers, and safe handling of regulated refrigerants.",
    importance: "Federal regulatory program governing technician certification, venting prohibitions, and refrigerant reclamation across stationary refrigeration and air conditioning systems.",
    clauses: [
      {
        clauseNumber: "Section 608.156",
        title: "Refrigerant Handling & Field Calculation Methods",
        summary: "Specifies required recovery and evacuation procedures, complemented by standard field calculations for line-set charge trim adjustments and operating subcooling/superheat verification.",
        governingEquation: "\\Delta W_{\\text{refrig}} = (L_{\\text{actual}} - L_{\\text{precharged}}) \\times \\text{oz/ft}",
        applicableCalculators: [
          { name: "Refrigerant Charge Adjustment Calculator", route: "/calculators/refrigerant-charge-calculator" },
          { name: "Refrigerant Superheat & Subcooling Calculator", route: "/calculators/superheat-subcooling-calculator" },
          { name: "Refrigerant PT Chart & Saturation Calculator", route: "/calculators/pt-chart" }
        ]
      }
    ]
  },
  {
    code: "ASHRAE Standard 241",
    organization: "ASHRAE",
    title: "Control of Infectious Aerosols",
    edition: "2023 Edition",
    scope: "Establishes requirements for reducing risk of airborne pathogen transmission in buildings, defining Equivalent Clean Airflow (ECA) rates and Infection Risk Management Mode (IRMM).",
    importance: "A consensus-based engineering standard providing a framework for equivalent clean airflow and infection-risk management strategies, applicable where adopted or referenced by specific authorities or programs.",
    clauses: [
      {
        clauseNumber: "Section 5 & Table 5-1",
        title: "Equivalent Clean Airflow Calculation Method",
        summary: "Defines the method for calculating design equivalent clean airflow demand per person (ECA_p) and per unit floor area (ECA_a) during Infection Risk Management Mode (IRMM).",
        governingEquation: "ECA_i = P_z \\cdot ECA_p + A_z \\cdot ECA_a",
        applicableCalculators: [
          { name: "Filter Sizing & Static Pressure Drop Calculator", route: "/calculators/filter-sizing-calculator" },
          { name: "Ventilation Airflow & Building CFM Calculator", route: "/calculators/cfm-calculator" }
        ]
      }
    ]
  }
];

export function getStandardsByOrg(org?: string): EngineeringStandard[] {
  if (!org || org === "ALL") return ENGINEERING_STANDARDS;
  return ENGINEERING_STANDARDS.filter((s) => s.organization === org);
}

export function getAllStandardCodes(): string[] {
  return ENGINEERING_STANDARDS.map((s) => s.code);
}
