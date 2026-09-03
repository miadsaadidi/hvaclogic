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
    scope: "Prescribes minimum energy efficiency requirements for building envelope, HVAC systems, service water heating, and power distribution.",
    importance: "Mandated across commercial building codes and municipal energy compliance baselines internationally.",
    clauses: [
      {
        clauseNumber: "Section 6.4.1",
        title: "Minimum Equipment Efficiency Requirements",
        summary: "Mandates minimum SEER2, HSPF2, EER2, and COP metrics for air-cooled, water-cooled, and heat pump unitary packages.",
        governingEquation: "\\text{COP} = \\frac{\\text{SEER2}}{3.41214}, \\quad \\text{EER2} = \\frac{\\text{Net Capacity (BTU/h)}}{\\text{Total Power (W)}}",
        applicableCalculators: [
          { name: "Heat Pump Running Cost Calculator", route: "/calculators/heat-pump-cost-calculator" },
          { name: "AC Running Cost Calculator", route: "/calculators/ac-tonnage-calculator" }
        ]
      },
      {
        clauseNumber: "Section 6.4.4",
        title: "HVAC System Ductwork and Plenum Insulation & Sealing",
        summary: "Enforces maximum allowable duct air leakage thresholds and minimum R-value thermal barrier requirements for unconditioned space.",
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
    scope: "Defines minimum continuous and intermittent mechanical outdoor air ventilation rates and local exhaust metrics to maintain acceptable residential IAQ.",
    importance: "The foundational ventilation standard cited by IECC, IRC, ENERGY STAR, and LEED for Homes.",
    clauses: [
      {
        clauseNumber: "Section 4.1.1",
        title: "Total Required Ventilation Rate (Q_tot)",
        summary: "Defines baseline continuous volumetric outdoor airflow based on conditioned floor area and default occupant density.",
        governingEquation: "Q_{\\text{tot}} = 0.03 \\times A_{\\text{floor}} + 7.5 \\times (N_{\\text{bedrooms}} + 1)",
        applicableCalculators: [
          { name: "CFM Airflow & Duct Velocity Calculator", route: "/calculators/cfm-calculator" },
          { name: "Combustion Air Ventilation Calculator", route: "/calculators/combustion-air-calculator" }
        ]
      },
      {
        clauseNumber: "Section 5.1",
        title: "Local Mechanical Exhaust Airflow Requirements",
        summary: "Mandates 100 CFM intermittent / 25 CFM continuous for kitchens and 50 CFM intermittent / 20 CFM continuous for bathrooms.",
        applicableCalculators: [
          { name: "Kitchen Exhaust Hood CFM Calculator", route: "/calculators/kitchen-hood-cfm-calculator" }
        ]
      }
    ]
  },
  {
    code: "ACCA Manual J",
    organization: "ACCA",
    title: "Residential Load Calculation",
    edition: "8th Edition (Full Technical Version)",
    scope: "The ANSI-recognized standard protocol for calculating sensible and latent peak heating and cooling loads for residential dwellings.",
    importance: "Mandatory compliance required by the International Residential Code (IRC M1401.3) and IECC for equipment sizing.",
    clauses: [
      {
        clauseNumber: "Section 1-3",
        title: "Design Conditions & Envelope Conduction",
        summary: "Calculates conductive heat transfer through multi-layer assemblies using 99% heating and 1% cooling dry-bulb/wet-bulb design temperatures.",
        governingEquation: "Q_{\\text{cond}} = \\sum (U \\times A \\times \\Delta T)",
        applicableCalculators: [
          { name: "Residential Heat Loss Calculator (Manual J)", route: "/calculators/heat-loss-calculator" },
          { name: "Furnace BTU Sizing Calculator", route: "/calculators/furnace-btu-calculator" },
          { name: "Insulation R-Value to U-Value Calculator", route: "/calculators/r-value-calculator" }
        ]
      },
      {
        clauseNumber: "Section 4",
        title: "Sensible Infiltration & Air Exchange Load",
        summary: "Computes heating and cooling penalties from stack and wind driven air infiltration through envelope leakage paths.",
        governingEquation: "Q_{\\text{infil}} = 1.08 \\times \\text{CFM}_{\\text{infil}} \\times (T_{\\text{indoor}} - T_{\\text{outdoor}})",
        applicableCalculators: [
          { name: "Residential Heat Loss Calculator", route: "/calculators/heat-loss-calculator" },
          { name: "Garage Heater BTU Calculator", route: "/calculators/garage-heater-calculator" }
        ]
      }
    ]
  },
  {
    code: "ACCA Manual D",
    organization: "ACCA",
    title: "Residential Duct Systems Design",
    edition: "3rd Edition",
    scope: "The comprehensive engineering procedure for sizing residential supply trunks, return paths, runouts, and selecting blower speeds.",
    importance: "Required by IRC Section M1601 to ensure proper static pressure budgets and quiet, balanced airflow distribution.",
    clauses: [
      {
        clauseNumber: "Section 3",
        title: "Available Static Pressure (ASP) & Total Effective Length (TEL)",
        summary: "Determines allowable friction rate per 100 ft by subtracting internal and external component pressure drops from blower total external static.",
        governingEquation: "\\text{FR} = \\frac{(\\text{ESP} - \\Delta P_{\\text{components}}) \\times 100}{\\text{TEL}}",
        applicableCalculators: [
          { name: "Duct Airflow & Friction Rate Sizing Calculator", route: "/calculators/duct-sizing-calculator" },
          { name: "Duct Friction Loss & Pressure Drop Calculator", route: "/calculators/duct-friction-loss-calculator" },
          { name: "Filter Sizing & Pressure Drop Calculator", route: "/calculators/filter-sizing-calculator" }
        ]
      },
      {
        clauseNumber: "Section 5",
        title: "Flexible Duct Compression and Velocity Limitations",
        summary: "Applies non-linear friction multipliers for un-tensioned flex duct and limits branch runout velocities to prevent air turbulence noise.",
        governingEquation: "V = \\frac{\\text{CFM}}{A_{\\text{duct}}} = \\frac{\\text{CFM} \\times 144}{\\pi \\times (D/2)^2}",
        applicableCalculators: [
          { name: "Flexible Duct Sizing Chart & CFM Calculator", route: "/calculators/flex-duct-sizing-calculator" },
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
    scope: "Validates that selected HVAC heating and cooling equipment matches sensible and latent design loads within allowable percentage tolerances.",
    importance: "Prevents severe short-cycling, humidity issues, and premature compressor failure caused by oversizing.",
    clauses: [
      {
        clauseNumber: "Section 1",
        title: "Cooling Equipment Sizing Limits",
        summary: "Limits total cooling capacity to 115% of calculated Manual J load (or 125% for variable-capacity heat pumps) to guarantee latent dehumidification.",
        applicableCalculators: [
          { name: "AC & Heat Pump Tonnage Calculator", route: "/calculators/ac-tonnage-calculator" },
          { name: "Mini-Split Multi-Zone Sizing Calculator", route: "/calculators/mini-split-calculator" }
        ]
      }
    ]
  },
  {
    code: "SMACNA HVAC Duct Construction Standards",
    organization: "SMACNA",
    title: "HVAC Duct Construction Standards - Metal and Flexible",
    edition: "4th Edition",
    scope: "Structural, gauge, joint, and pressure-class specifications for metal, fiberglass, and flexible duct systems.",
    importance: "The universal benchmark for commercial and residential sheet metal fabrication and air distribution integrity.",
    clauses: [
      {
        clauseNumber: "Chapter 2",
        title: "Rectangular & Round Duct Pressure Classes",
        summary: "Defines maximum aspect ratios ($W/H \\le 4:1$) and hydraulic diameter equivalencies to maintain structural rigidity under static pressure.",
        governingEquation: "D_e = \\frac{1.30 \\times (a \\times b)^{0.625}}{(a + b)^{0.25}}",
        applicableCalculators: [
          { name: "Duct Airflow & Friction Rate Sizing Calculator", route: "/calculators/duct-sizing-calculator" },
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
    scope: "Establishes standardized testing conditions (M1 testing with higher minimum external static pressure) for residential heat pumps and split AC units.",
    importance: "Federally referenced standard defining official energy guide labels and rebate qualification criteria.",
    clauses: [
      {
        clauseNumber: "Section 6",
        title: "Part-Load Rating & Multi-Stage Compressor Curves",
        summary: "Defines seasonal HSPF2 and SEER2 performance weighting across temperature bins (47°F, 35°F, 17°F, and 5°F).",
        applicableCalculators: [
          { name: "Heat Pump Running Cost Calculator", route: "/calculators/heat-pump-cost-calculator" },
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
    scope: "Governs handling, recovery, leak rate inspection triggers, and phase-down transition rules for high-GWP and A2L mildly flammable refrigerants.",
    importance: "Federal law governing technician certification and refrigerant charge management across R-410A, R-32, and R-454B systems.",
    clauses: [
      {
        clauseNumber: "Section 608.156",
        title: "Evacuation & Charge Verification Requirements",
        summary: "Mandates vacuum micron thresholds ($<500\\text{ microns}$) and precise factory charge line-set trim adjustments.",
        governingEquation: "\\Delta W_{\\text{refrig}} = (L_{\\text{actual}} - L_{\\text{precharged}}) \\times \\text{oz/ft}",
        applicableCalculators: [
          { name: "Refrigerant Charge Adjustment Calculator", route: "/calculators/refrigerant-charge-calculator" },
          { name: "Refrigerant Superheat & Subcooling Calculator", route: "/calculators/superheat-subcooling-calculator" },
          { name: "Refrigerant PT Chart & Saturation Calculator", route: "/calculators/pt-chart-calculator" }
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
