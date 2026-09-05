export interface GuideEquation {
  label: string;
  formula: string;
  explanation?: string;
}

export interface CompanionCalculator {
  name: string;
  route: string;
  description: string;
}

export type GuideCategory =
  | "Airflow & Ducts"
  | "Cooling Loads"
  | "Heating & Heat Pumps"
  | "Diagnostics & PT"
  | "Building Science"
  | "Ventilation & IAQ"
  | "VRF & Multi-Split";

export interface EngineeringGuide {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: GuideCategory;
  pillar: string;
  targetRoute: string;
  readingTime: string;
  difficulty: "Fundamental" | "Intermediate" | "Advanced";
  standards: string[];
  keyEquations: GuideEquation[];
  keyTakeaways: string[];
  companionCalculators: CompanionCalculator[];
  status: "published" | "scheduled";
  scheduledDate: string; // ISO date format "YYYY-MM-DD"
  color: string;
  icon: string;
}

export const ENGINEERING_GUIDES: EngineeringGuide[] = [
  {
    slug: "air-distribution-duct-hydraulics",
    title: "Air Distribution & Duct Hydraulics: Master Design Guide",
    shortTitle: "Air Distribution & Duct Hydraulics",
    summary:
      "Comprehensive fluid mechanics reference for sizing HVAC supply and return ductwork, evaluating Colebrook-White friction rates, Huebscher equivalent diameters, and ACCA Manual D available static pressure workflows.",
    category: "Airflow & Ducts",
    pillar: "airflow-ducts",
    targetRoute: "/airflow-ducts",
    readingTime: "12 min read",
    difficulty: "Advanced",
    standards: ["ASHRAE Fundamentals Ch. 21", "ACCA Manual D", "SMACNA HVAC Duct Design"],
    keyEquations: [
      {
        label: "Darcy-Weisbach Duct Friction Loss",
        formula: "Δpf = 100 × f × (12 / Dh) × (ρ × v² / (2 × gc))",
        explanation: "Computes total linear pressure drop per 100 feet of round conduit.",
      },
      {
        label: "Huebscher Equivalent Diameter",
        formula: "De = 1.30 × ((a × b)^0.625) / ((a + b)^0.25)",
        explanation: "Converts rectangular duct dimensions (a × b) to hydraulic equivalent round diameter.",
      },
      {
        label: "Manual D Friction Rate Formula",
        formula: "FR = (ASP × 100) / TEL",
        explanation: "Derives design friction rate from net available static pressure and total effective length.",
      },
    ],
    keyTakeaways: [
      "Smooth galvanized metal roughness (ε = 0.0003 ft) yields ~10× less boundary shear loss than wire-helix flex duct.",
      "ASHRAE RP-1333 proves that 15% longitudinal flex duct compression and 2\" sag increases pressure drop by +170%.",
      "Using legacy 0.10\" friction rules on modern ECM blowers (0.50\" TESP) chokes airflow and burns out blower modules.",
    ],
    companionCalculators: [
      {
        name: "Digital Ductulator",
        route: "/calculators/ductulator",
        description: "Equal friction and velocity reduction duct sizing.",
      },
      {
        name: "Flex Duct CFM Chart",
        route: "/calculators/flex-duct-cfm-chart",
        description: "RP-1333 sag and compression deratings.",
      },
      {
        name: "Duct Friction Loss (TEL)",
        route: "/calculators/duct-friction-loss-calculator",
        description: "Available static pressure and equivalent length solver.",
      },
    ],
    status: "published",
    scheduledDate: "2026-08-28",
    color: "#00d2ff",
    icon: "🌀",
  },
  {
    slug: "cooling-load-manual-j-s-sizing",
    title: "Cooling Load Calculations & Equipment Sizing: ACCA Manual J & S Engineering Guide",
    shortTitle: "ACCA Manual J & S Cooling Load Guide",
    summary:
      "Deterministic methodology for calculating peak residential sensible and latent cooling loads, evaluating Sensible Heat Ratios (SHR), and selecting equipment matching expanded manufacturer performance tables.",
    category: "Cooling Loads",
    pillar: "cooling-loads",
    targetRoute: "/cooling-loads",
    readingTime: "14 min read",
    difficulty: "Advanced",
    standards: ["ACCA Manual J (8th Edition)", "ACCA Manual S", "ASHRAE Standard 55"],
    keyEquations: [
      {
        label: "Envelope Conductive Heat Gain",
        formula: "Q_sensible = U × A × (T_outdoor - T_indoor) + CLTD",
        explanation: "Calculates steady-state conductive heat flux across opaque building envelope assemblies.",
      },
      {
        label: "Sensible Heat Ratio (SHR)",
        formula: "SHR = Q_sensible / (Q_sensible + Q_latent)",
        explanation: "Measures the fraction of total cooling capacity dedicated to dry-bulb temperature reduction.",
      },
      {
        label: "ACCA Manual S Capacity Sizing Gate",
        formula: "0.95 × Q_design ≤ Q_capacity_net ≤ 1.15 × Q_design (1.30 for Inverters)",
        explanation: "Enforces strict limits against equipment oversizing to prevent humidity and short-cycling failure.",
      },
    ],
    keyTakeaways: [
      "The legacy 500 sq ft/ton rule oversizes modern IECC tight envelopes (<3 ACH50) by 50%–100%.",
      "Short 6-minute cooling cycles fail to reach coil dew points, leaving indoor relative humidity above 65%.",
      "Manual S equipment selection must evaluate expanded manufacturer performance at outdoor summer design dry-bulb.",
    ],
    companionCalculators: [
      {
        name: "BTU Load Master",
        route: "/calculators/btu-calculator",
        description: "Block load and manual J envelope screening.",
      },
      {
        name: "AC Tonnage Calculator",
        route: "/calculators/ac-tonnage-calculator",
        description: "Manual S sizing gates and SEER2 operating cost.",
      },
      {
        name: "AC Model Decoder",
        route: "/calculators/ac-model-decoder",
        description: "Decode tonnage and electrical specs from serial tags.",
      },
    ],
    status: "published",
    scheduledDate: "2026-08-29",
    color: "#38bdf8",
    icon: "❄️",
  },
  {
    slug: "heating-systems-heat-pumps-electrification",
    title: "Heating Systems, Heat Pumps & Electrification: Master Engineering Guide",
    shortTitle: "Heating Systems & Heat Pump Sizing",
    summary:
      "Engineering principles of residential heating, cold-climate air-source heat pump COP derating curves, auxiliary strip staging, hydronic condensing boiler dew points, and NFPA 54 combustion air sizing.",
    category: "Heating & Heat Pumps",
    pillar: "heating-systems",
    targetRoute: "/heating-systems",
    readingTime: "15 min read",
    difficulty: "Advanced",
    standards: ["AHRI Standard 210/240", "ASHRAE Standard 90.1", "NFPA 54 / IFGC", "NEEP ccASHP v4.0"],
    keyEquations: [
      {
        label: "Building Total Heat Loss",
        formula: "Q_heat_loss = Σ(U × A × ΔT) + (1.08 × CFM_infiltration × ΔT)",
        explanation: "Combines total structural transmission loss with sensible outdoor infiltration heating load.",
      },
      {
        label: "Heat Pump Thermal Balance Point",
        formula: "Q_heat_pump_output(T_ambient) = Q_building_loss(T_ambient)",
        explanation: "Identifies the outdoor ambient threshold below which supplemental strip or duel-fuel heat engages.",
      },
      {
        label: "NFPA 54 Confined Space Volume Rule",
        formula: "V_required = 50 cu ft × (Input_BTUH / 1,000)",
        explanation: "Determines minimum room air volume required to prevent deadly CO accumulation and burner starvation.",
      },
    ],
    keyTakeaways: [
      "Pairing 95% AFUE condensing boilers with 180°F baseboards reduces actual efficiency to 86% by preventing latent condensation.",
      "Cold-climate inverter heat pumps maintain COPs >1.8 down to -5°F, avoiding 4× expensive electric strip staging.",
      "Peak COP degradation occurs at 35°F high-RH due to frequent reverse-cycle defrost de-icing cycles.",
    ],
    companionCalculators: [
      {
        name: "Heat Pump Sizer",
        route: "/calculators/heat-pump-size-calculator",
        description: "Thermal balance point and dual-fuel staging.",
      },
      {
        name: "Furnace AFUE Sizer",
        route: "/calculators/furnace-size-calculator",
        description: "Output BTU and steady-state efficiency.",
      },
      {
        name: "Boiler & EDR Sizer",
        route: "/calculators/boiler-size-calculator",
        description: "Hydronic baseboard and cast-iron radiation.",
      },
    ],
    status: "published",
    scheduledDate: "2026-08-30",
    color: "#f97316",
    icon: "🔥",
  },
  {
    slug: "field-diagnostics-a2l-refrigerant-transition",
    title: "Field Diagnostics & A2L Refrigerant Transition Master Guide",
    shortTitle: "Field Diagnostics & A2L Refrigerant Guide",
    summary:
      "A complete technician and engineering manual for EPA 608 Section 608 compliance, managing non-linear zeotropic temperature glide in R-454B and R-32, target superheat/subcooling charging, and line-set weigh-in adjustments.",
    category: "Diagnostics & PT",
    pillar: "field-diagnostics",
    targetRoute: "/field-diagnostics",
    readingTime: "13 min read",
    difficulty: "Advanced",
    standards: ["EPA Clean Air Act Sec. 608", "NIST REFPROP 10.0", "AHRI Standard 210/240", "ASHRAE Standard 34"],
    keyEquations: [
      {
        label: "Zeotropic Subcooling Formulation",
        formula: "Subcooling = T_bubble(P_liquid) - T_liquid_line",
        explanation: "Subcooling MUST be calculated exclusively using bubble point saturation temperature.",
      },
      {
        label: "Zeotropic Superheat Formulation",
        formula: "Superheat = T_suction_line - T_dew(P_suction)",
        explanation: "Superheat MUST be calculated exclusively using dew point saturation temperature.",
      },
      {
        label: "Refrigerant Line Set Length Adjustment",
        formula: "Added Charge (oz) = (L_actual - L_factory_precharge) × Oz_per_Foot",
        explanation: "Standard 0.6 oz/ft liquid-line adjustment for residential runs exceeding 15 feet.",
      },
    ],
    keyTakeaways: [
      "Using mid-point or average PT charts on zeotropic A2L blends (R-454B glide 1.5°F–2.5°F) creates a 2.2°F diagnostic error.",
      "Fixed-orifice metering devices require target superheat charging derived from indoor wet-bulb and outdoor dry-bulb.",
      "Failing to weigh in extra charge on 50 ft line sets creates a 1.3 lb deficit, spiking compressor discharge temps >225°F.",
    ],
    companionCalculators: [
      {
        name: "Superheat & Subcooling",
        route: "/calculators/superheat-subcooling-calculator",
        description: "Bubble and dew point saturation diagnostic solver.",
      },
      {
        name: "Digital PT Chart",
        route: "/calculators/pt-chart",
        description: "NIST REFPROP saturation curves for 10 refrigerants.",
      },
      {
        name: "Refrigerant Line Set Charge",
        route: "/calculators/refrigerant-charge-calculator",
        description: "Factory trim and extended length weigh-in sizer.",
      },
    ],
    status: "published",
    scheduledDate: "2026-09-05",
    color: "#10b981",
    icon: "🔧",
  },
  {
    slug: "psychrometrics-building-envelope-physics",
    title: "Psychrometrics & Building Envelope Physics Master Guide",
    shortTitle: "Psychrometrics & Building Science Guide",
    summary:
      "Fundamental thermodynamics of moist air, ASHRAE Hyland-Wexler formulations, parallel-path R-value thermal bridging, and LBNL Sherman-Grimsrud blower door infiltration modeling.",
    category: "Building Science",
    pillar: "building-science",
    targetRoute: "/building-science",
    readingTime: "14 min read",
    difficulty: "Advanced",
    standards: ["ASHRAE Handbook of Fundamentals Ch. 1", "ASHRAE Standard 90.1", "IECC 2021/2024", "ASTM E779"],
    keyEquations: [
      {
        label: "Hyland-Wexler Water Vapor Saturation Pressure",
        formula: "ln(p_ws) = C1/T + C2 + C3*T + C4*T² + C5*T³ + C6*ln(T)",
        explanation: "Evaluates exact saturation vapor pressure over liquid water from absolute temperature in Kelvin.",
      },
      {
        label: "Parallel-Path Assembly U-Factor",
        formula: "U_overall = (FF × U_framing) + ((1 - FF) × U_cavity)",
        explanation: "Derates nominal cavity insulation to account for 2D thermal bridging across wall framing studs.",
      },
      {
        label: "LBNL Sherman-Grimsrud Infiltration Conversion",
        formula: "CFM_natural = (ACH50 × Volume_conditioned) / (60 × N_factor)",
        explanation: "Converts 50 Pa pressurized blower door leakage to continuous natural infiltration CFM.",
      },
    ],
    keyTakeaways: [
      "Lowering a thermostat to 68°F without extending run-time increases indoor relative humidity above 80% due to sensible cooling.",
      "Standard 2x6 16\" O.C. wall assemblies suffer 22%–25% thermal framing factors, reducing effective cavity R-values by 30%.",
      "Modern tight envelopes require dedicated mechanical ventilation (ASHRAE 62.2) to maintain indoor air quality.",
    ],
    companionCalculators: [
      {
        name: "Psychrometric Calculator",
        route: "/calculators/psychrometric-calculator",
        description: "Enthalpy, dew point, wet-bulb, and humidity ratio.",
      },
      {
        name: "Insulation R-Value",
        route: "/calculators/r-value-calculator",
        description: "Parallel path framing factor and U-factor derating.",
      },
      {
        name: "Heat Loss Calculator",
        route: "/calculators/heat-loss-calculator",
        description: "Whole-building conductive and infiltration loss.",
      },
    ],
    status: "scheduled",
    scheduledDate: "2026-09-06",
    color: "#8b5cf6",
    icon: "🏢",
  },
  {
    slug: "ventilation-makeup-air-depressurization",
    title: "Residential & Commercial Ventilation & Make-Up Air Engineering Guide",
    shortTitle: "Ventilation & Make-Up Air Guide",
    summary:
      "Design principles for whole-house mechanical ventilation, calculating balanced fresh air exchange under ASHRAE 62.2, and sizing interlocked make-up air systems to prevent kitchen range hood backdrafting.",
    category: "Ventilation & IAQ",
    pillar: "airflow-ducts",
    targetRoute: "/guides/ventilation-makeup-air-depressurization",
    readingTime: "11 min read",
    difficulty: "Intermediate",
    standards: ["ASHRAE Standard 62.2-2022", "IRC Section M1503.6", "HVI 916", "IMC Chapter 5"],
    keyEquations: [
      {
        label: "ASHRAE 62.2 Total Ventilation Requirement",
        formula: "Q_tot = (0.03 × A_floor) + (7.5 × (N_bedrooms + 1))",
        explanation: "Specifies required continuous whole-house mechanical outdoor airflow in CFM.",
      },
      {
        label: "Make-Up Air Threshold Gate",
        formula: "Q_exhaust > 400 CFM ⇒ Interlocked MUA Required",
        explanation: "IRC M1503.6 mandate requiring dedicated tempered make-up air for exhaust fans exceeding 400 CFM.",
      },
    ],
    keyTakeaways: [
      "Exhaust-only range hoods (>600 CFM) create -15 to -30 Pa envelope depressurization, backdrafting atmospheric gas water heaters.",
      "Energy Recovery Ventilators (ERVs) exchange both sensible heat and latent moisture, preventing summer humidity spikes.",
      "Make-up air diffusers must be positioned to prevent thermal short-circuiting into kitchen exhaust hoods.",
    ],
    companionCalculators: [
      {
        name: "Kitchen Hood CFM Sizer",
        route: "/calculators/kitchen-hood-cfm",
        description: "Cooktop BTU make-up air and duct sizing solver.",
      },
      {
        name: "Combustion Air Sizer",
        route: "/calculators/combustion-air-calculator",
        description: "NFPA 54 louver and direct-to-outside air calculations.",
      },
      {
        name: "HVAC CFM Sizer",
        route: "/calculators/cfm-calculator",
        description: "Room volume and air exchange rate calculator.",
      },
    ],
    status: "scheduled",
    scheduledDate: "2026-09-07",
    color: "#06b6d4",
    icon: "💨",
  },
  {
    slug: "filtration-hydraulics-iaq-static-pressure",
    title: "Filtration Hydraulics & IAQ Static Pressure Master Guide",
    shortTitle: "Filtration Hydraulics & MERV Sizing",
    summary:
      "Hydrodynamic analysis of air filter media, evaluating face velocity limits, pleat geometry, MERV 8 vs MERV 13 pressure drop curves, and blower motor electrical wattage penalties.",
    category: "Ventilation & IAQ",
    pillar: "airflow-ducts",
    targetRoute: "/guides/filtration-hydraulics-iaq-static-pressure",
    readingTime: "11 min read",
    difficulty: "Intermediate",
    standards: ["ASHRAE Standard 52.2-2024", "ACCA Manual D Appendix 3", "AHAM AC-1"],
    keyEquations: [
      {
        label: "Filter Media Face Velocity",
        formula: "v_face = Q_cfm / A_gross_filter_sqft",
        explanation: "Determines approach speed of airflow across gross filter frame area in feet per minute (FPM).",
      },
      {
        label: "Quadratic Static Pressure Resistance Curve",
        formula: "Δp_filter = k × (v_face / 300)^1.85",
        explanation: "Models nonlinear resistance increase as face velocity accelerates through dense fibrous media.",
      },
    ],
    keyTakeaways: [
      "Installing 1-inch MERV 13 filters in restrictive return grilles creates up to 0.35\" wg static drop, choking airflow below 300 CFM/ton.",
      "Upgrading to 4-inch deep-pleat media quadruples surface area, reducing pressure drop by 60% while maintaining MERV 13 capture.",
      "ECM blower motors ramp up wattage exponentially to fight high filter static, increasing energy costs and acoustic noise.",
    ],
    companionCalculators: [
      {
        name: "MERV Filter Pressure Drop",
        route: "/calculators/filter-sizing-calculator",
        description: "Face velocity, media depth, and initial pressure drop.",
      },
      {
        name: "Digital Ductulator",
        route: "/calculators/ductulator",
        description: "Equal friction and return trunk sizing.",
      },
      {
        name: "HVAC CFM Sizer",
        route: "/calculators/cfm-calculator",
        description: "Target airflow and velocity calculator.",
      },
    ],
    status: "scheduled",
    scheduledDate: "2026-09-08",
    color: "#ec4899",
    icon: "🛡️",
  },
  {
    slug: "multi-split-vrf-diversity-sizing",
    title: "Multi-Split & Inverter Heat Pump Diversity Sizing Guide",
    shortTitle: "Multi-Split & Inverter Diversity Guide",
    summary:
      "Engineering manual for designing variable refrigerant flow (VRF) and ductless mini-split systems, calculating indoor-to-outdoor unit capacity ratios (diversity), and managing compressor modulation.",
    category: "VRF & Multi-Split",
    pillar: "cooling-loads",
    targetRoute: "/guides/multi-split-vrf-diversity-sizing",
    readingTime: "12 min read",
    difficulty: "Advanced",
    standards: ["AHRI Standard 1230", "ACCA Manual S Section 5", "ASHRAE Standard 15"],
    keyEquations: [
      {
        label: "Multi-Zone Connected Capacity Ratio",
        formula: "Ratio_connected = Σ(Indoor_Head_Capacities) / Outdoor_Condenser_Capacity",
        explanation: "Evaluates multi-zone sizing ratio (typically 100% to 130% for residential diversity).",
      },
      {
        label: "Inverter Modulation Turndown Ratio",
        formula: "Turndown = Q_min_modulated / Q_nominal_capacity",
        explanation: "Measures compressor ability to throttle down (typically 25%–35% of nominal output) to prevent short-cycling.",
      },
    ],
    keyTakeaways: [
      "Over-subscribing indoor head capacity by 115%–130% keeps variable-speed inverter compressors in their peak efficiency sweet spot.",
      "Single mini-split heads sized larger than minimum room load will cycle on/off on their internal temperature sensors, losing dehumidification.",
      "Long vertical refrigerant lift (>50 ft) requires dedicated oil traps to prevent compressor lubrication failure.",
    ],
    companionCalculators: [
      {
        name: "Mini-Split Multi-Zone",
        route: "/calculators/mini-split-sizing",
        description: "Multi-zone diversity ratio and head capacity solver.",
      },
      {
        name: "Heat Pump Sizer",
        route: "/calculators/heat-pump-size-calculator",
        description: "Cold-climate capacity derating and balance points.",
      },
      {
        name: "BTU Load Master",
        route: "/calculators/btu-calculator",
        description: "Room-by-room Manual J cooling and heating loads.",
      },
    ],
    status: "scheduled",
    scheduledDate: "2026-09-09",
    color: "#eab308",
    icon: "⚡",
  },
];

export function getAllGuides(): EngineeringGuide[] {
  return ENGINEERING_GUIDES;
}

export function getPublishedGuides(): EngineeringGuide[] {
  return ENGINEERING_GUIDES.filter((g) => g.status === "published");
}

export function getScheduledGuides(): EngineeringGuide[] {
  return ENGINEERING_GUIDES.filter((g) => g.status === "scheduled");
}

export function getGuideBySlug(slug: string): EngineeringGuide | undefined {
  return ENGINEERING_GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByPillar(pillar: string): EngineeringGuide[] {
  return ENGINEERING_GUIDES.filter((g) => g.pillar === pillar);
}
