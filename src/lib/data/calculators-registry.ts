import { CalculatorMeta } from "@/types/calculation";

export const calculatorRegistry: CalculatorMeta[] = [
  // -------------------------------------------------------------
  // PILLAR 1: AIRFLOW & DUCT SIZING
  // -------------------------------------------------------------
  {
    id: "ductulator",
    name: "Digital Ductulator & Air Duct Sizing Tool",
    pillar: "airflow-ducts",
    route: "/calculators/ductulator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "ductulator",
    secondaryKeywords: ["duct sizing calculator", "air duct sizing tool", "air duct design calculator", "equal friction duct sizer", "round rectangular duct sizing"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "Ductulator — HVAC Air Duct Sizing Tool",
    metaDescription: "Free online ductulator for HVAC duct sizing. Size round and rectangular air ducts via equal friction and Huebscher's formula. Real-time 2D visualizer.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Equal friction round diameter and velocity calculation",
      "Huebscher rectangular duct equivalence with aspect ratio locking",
      "Flexible duct installation sag and compression derating (0% to 30%)",
      "Velocity range design targets and flow area indicators",
      "Real-time 2D Canvas cross-section with dimension annotations",
    ],
    relatedCalculatorIds: ["duct-friction-loss-calculator", "equivalent-length-calculator", "flex-duct-cfm-chart", "cfm-calculator", "boiler-size-calculator"],
    researchSlug: "non-linear-duct-friction-loss-fitting-penalties",
    oerModuleUrl: "/oer-modules/duct-aerodynamics-lab.html",
    standards: ["ASHRAE", "SMACNA", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "What friction rate is commonly used to size residential ductwork?",
        answer: "A friction rate of 0.08 to 0.10 in. wg per 100 ft is a common starting design range for residential supply trunks, while return trunks are often sized at 0.05 to 0.08 in. wg. Actual design friction rate depends on equipment available static pressure (ASP), total equivalent length (TEL), component pressure drops, and airflow requirements."
      },
      {
        question: "How do you calculate rectangular duct dimensions from equivalent round diameter?",
        answer: "Huebscher's formula determines equivalent rectangular dimensions: De = 1.30 * (a * b)^0.625 / (a + b)^0.25, where 'a' and 'b' are rectangular duct width and height in inches carrying equivalent airflow at the same friction loss rate."
      },
      {
        question: "Why does flexible duct airflow capacity differ from rigid sheet metal?",
        answer: "Flexible duct has a helical wire and corrugated inner surface that exhibits higher friction than smooth sheet metal. Field conditions such as installation sag, bends, and longitudinal compression (e.g. 4% to 15% compression) significantly increase resistance and reduce delivered airflow."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "print_exported"]
  },
  {
    id: "flex-duct-cfm-chart",
    name: "Flexible Duct CFM & Friction Drop Chart",
    pillar: "airflow-ducts",
    route: "/calculators/flex-duct-cfm-chart",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "flex duct cfm chart",
    secondaryKeywords: ["flex duct cfm chart", "flexible duct air flow chart", "6 flex duct cfm", "8 flex duct cfm", "14 flex duct cfm", "cfm chart for flex duct", "flexible duct air flow chart"],
    primaryIntent: "Navigational / Field Lookup",
    seoTitle: "Flex Duct CFM Chart: Sizing 4\" to 20\" Flexible Ducts",
    metaDescription: "Flexible duct CFM chart for 4-in to 20-in ducts. Compare airflow across 0.05–0.15 in. wg friction with modeled 0%–30% sag deratings from ASHRAE RP-1333 data.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Interactive CFM capacity matrix for diameters 4\" through 20\"",
      "Simultaneous comparison across 0.05, 0.08, 0.10, and 0.15 in.wg friction rates",
      "Dynamic sag slider adjusting capacity for 0%, 4%, 15%, and 30% compression",
      "One-click printable 1-page PDF reference card for truck clipboards",
    ],
    relatedCalculatorIds: ["ductulator", "cfm-calculator", "duct-friction-loss-calculator", "boiler-size-calculator"],
    researchSlug: "non-linear-duct-friction-loss-fitting-penalties",
    standards: ["ACCA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How many CFM can a 6-inch flexible duct handle?",
        answer: "Under a 4% modeled compression reference baseline, a standard 6-inch flexible duct carries approximately 84 CFM at 0.08 in. wg per 100 ft friction and 98 CFM at 0.10 in. wg per 100 ft (compared to ~90 CFM and 105 CFM when fully stretched)."
      },
      {
        question: "How many CFM can an 8-inch flexible duct handle?",
        answer: "Under a 4% modeled compression reference baseline, an 8-inch flexible duct carries approximately 177 CFM at 0.08 in. wg per 100 ft friction and 205 CFM at 0.10 in. wg per 100 ft (compared to ~190 CFM and 220 CFM when fully stretched)."
      },
      {
        question: "How does flexible duct installation sag impact air flow capacity?",
        answer: "According to laboratory test data from ASHRAE Research Project RP-1333, longitudinal compression and sag significantly increase internal friction loss (e.g. 1.15× at 4% compression, 1.60× at 15% sag, and 2.20× at 30% sag). Under constant available static pressure, 15% attic sag reduces delivered airflow capacity by approximately 22% compared to fully stretched manufacturer ratings."
      }
    ],
    analyticsEvents: ["calculator_started", "preset_selected", "print_exported", "csv_exported"]
  },
  {
    id: "cfm-calculator",
    name: "HVAC CFM & Airflow Calculator",
    pillar: "airflow-ducts",
    route: "/calculators/cfm-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "air duct cfm calculator",
    secondaryKeywords: ["cfm calculator hvac", "cfm chart for duct", "sensible heat airflow"],
    primaryIntent: "Technical / Sizing",
    seoTitle: "HVAC CFM Calculator — Airflow & Duct Sizing",
    metaDescription: "Calculate HVAC airflow (CFM) from duct size, velocity (FPM), sensible load (1.08 × ΔT), room ACH, or tonnage benchmarks. Runs locally in your browser.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Sensible heat airflow method: CFM = Sensible BTU/hr ÷ (1.08 × ΔT)",
      "Fluid velocity and duct cross-section method: CFM = Velocity (FPM) × Area (sq ft)",
      "Room Air Changes per Hour (ACH) dimensional turnover conversion",
      "Nominal cooling tonnage benchmark comparisons (350, 400, and 450 CFM/ton)",
      "Direct 1-click workflow handoff to the Digital Ductulator",
    ],
    relatedCalculatorIds: ["ductulator", "btu-calculator", "kitchen-hood-cfm", "filter-sizing-calculator"],
    researchSlug: "effective-dilution-iaq-ventilation-mass-balance",
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Calculation Mode & Parameters",
        instruction: "Choose between duct velocity, sensible thermal load, room ACH volume, nominal cooling tonnage, or electric strip temperature rise.",
      },
      {
        stepNumber: 2,
        title: "Enter Dimensional & Thermal Values",
        instruction: "Input measured or design parameters such as duct dimensions, air velocity (FPM), sensible BTU/hr, temperature split (ΔT), or room dimensions.",
      },
      {
        stepNumber: 3,
        title: "Review Airflow & Design Guidelines",
        instruction: "Evaluate volumetric airflow (CFM), metric flow (m³/h), representative velocity guidelines, and nominal equipment tonnage benchmarks.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate CFM from BTU and temperature split (Delta T)?",
        answer: "Use the sensible heat formula: CFM = Sensible BTU/hr ÷ (1.08 × ΔT). The 1.08 constant is an engineering factor derived from standard sea-level air properties (0.075 lb/ft³ density × 0.24 BTU/lb·°F specific heat × 60 min/hr). For example, a 36,000 BTU/hr sensible load with a 20°F coil delta requires CFM = 36,000 ÷ (1.08 × 20) ≈ 1,667 CFM."
      },
      {
        question: "What is the standard CFM per ton of air conditioning?",
        answer: "In residential HVAC design, 400 CFM per ton of nominal cooling capacity is a standard industry rule-of-thumb benchmark. In humid climates, lower airflow rates (~350 CFM/ton) are often selected to enhance latent moisture removal, whereas dry arid climates may target ~450 CFM/ton for higher sensible heat ratios. Actual equipment airflow must be verified using manufacturer performance data."
      },
      {
        question: "How is CFM calculated from room volume and ACH?",
        answer: "CFM is calculated as: CFM = (Room Volume in cu ft × ACH) ÷ 60. This is a mathematical dimensional conversion. The required ACH rate must be selected based on specific room function, occupancy, and applicable standards (e.g. ASHRAE 62.1 or 62.2)."
      },
      {
        question: "How does air velocity relate to CFM in ductwork?",
        answer: "Volumetric airflow is the product of linear air velocity and duct cross-sectional area: CFM = Velocity (FPM) × Area (sq ft). For round ducts, Area = π × (Diameter / 24)². For rectangular ducts, Area = (Width × Height) ÷ 144."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "handoff_clicked"]
  },
  {
    id: "kitchen-hood-cfm",
    name: "Kitchen Range Hood CFM & Make-Up Air Sizer",
    pillar: "airflow-ducts",
    route: "/calculators/kitchen-hood-cfm",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "kitchen hood cfm calculator",
    secondaryKeywords: ["range hood cfm calculator", "range hood make up air", "how many cfm for range hood", "kitchen exhaust sizing"],
    primaryIntent: "Commercial / Code Compliance",
    seoTitle: "Kitchen Range Hood CFM & Make-Up Air Tool",
    metaDescription: "Size kitchen range hood CFM for gas and electric cooktops using HVI width guidance. Evaluate make-up-air requirements under applicable IRC provisions.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "HVI linear width method (100 CFM/ft wall, 150 CFM/ft island)",
      "Gas cooktop field benchmark (100 CFM per 10,000 BTU/hr burner rating)",
      "Equivalent duct length & estimated static pressure friction loss (in. wg)",
      "IRC Section M1503.6 make-up air review trigger (> 400 CFM)",
      "Illustrative rigid metal duct diameter sizing (6\", 7\", 8\", 10\")",
    ],
    relatedCalculatorIds: ["cfm-calculator", "ductulator", "combustion-air-calculator"],
    researchSlug: "effective-dilution-iaq-ventilation-mass-balance",
    datasetSlug: "kitchen-hood-exhaust-makeup-air",
    datasetUrl: "/datasets/kitchen_hood_exhaust_and_makeup_air_benchmark_2026.csv",
    standards: ["HVI", "IRC", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Cooktop Fuel & Mounting Style",
        instruction: "Choose between gas, electric, or induction cooktops and select wall, under-cabinet, or island mounting.",
      },
      {
        stepNumber: 2,
        title: "Input Dimensional & Burner Parameters",
        instruction: "Enter cooktop width (inches), total burner BTU/hr (for gas ranges), straight duct length, and fitting counts.",
      },
      {
        stepNumber: 3,
        title: "Review Airflow & Code Criteria",
        instruction: "Evaluate recommended exhaust CFM, illustrative duct diameter, estimated static pressure loss, and IRC make-up air review triggers.",
      },
    ],
    faqs: [
      {
        question: "How do you size range hood CFM for a gas stove?",
        answer: "In residential design, a common industry field rule of thumb is 100 CFM for every 10,000 BTU/hr of total cooktop burner rating. Additionally, HVI recommends at least 100 CFM per linear foot of cooktop width for wall hoods and 150 CFM per linear foot for island hoods. For pro-style ranges, always consult the appliance manufacturer's specified CFM requirements."
      },
      {
        question: "When does kitchen exhaust trigger a make-up air code review?",
        answer: "Under model building codes such as IRC Section M1503.6, exhaust hoods operating above 400 CFM trigger a make-up air review. In tight modern homes, an interlocked make-up air system may be required by the local authority having jurisdiction (AHJ) to prevent home depressurization and combustion appliance backdrafting."
      },
      {
        question: "Why do island range hoods require higher CFM than wall hoods?",
        answer: "Island hoods lack a vertical backsplash or wall boundary to help funnel rising thermal plumes into the canopy. To capture grease and smoke against ambient kitchen cross-drafts, HVI recommends 150 CFM per linear foot of width (compared to 100 CFM/ft for wall hoods) along with an oversized canopy."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "validation_error"]
  },
  {
    id: "duct-friction-loss-calculator",
    name: "Duct Friction Loss & Total Equivalent Length (TEL) Sizer",
    pillar: "airflow-ducts",
    route: "/calculators/duct-friction-loss-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "duct friction loss calculator",
    secondaryKeywords: ["duct friction loss calculator", "duct tel meaning", "what is duct tel", "total equivalent length hvac", "acca manual d friction rate", "available static pressure calculator"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "Duct Friction Loss & TEL Calculator (ACCA Manual D)",
    metaDescription: "Calculate duct friction loss rate using Darcy-Weisbach and Colebrook models. Evaluate Available Static Pressure (ASP) and design friction rate concepts.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Representative ACCA Manual D Appendix 3 fitting accumulator (elbows, takeoffs, dampers, boots)",
      "Available Static Pressure (ASP) solver accounting for coils, air filters, and grilles at design airflow",
      "Calculated Design Friction Rate (FR = (ASP * 100) / TEL) in.wg per 100 ft based on entered assumptions",
      "Interactive SVG duct system schematic with static pressure drop gradient",
      "Representative fitting resistance indicators (e.g. mitered no-vane vs smooth radius elbows)",
    ],
    relatedCalculatorIds: ["ductulator", "equivalent-length-calculator", "filter-sizing-calculator", "flex-duct-cfm-chart", "boiler-size-calculator"],
    researchSlug: "non-linear-duct-friction-loss-fitting-penalties",
    oerModuleUrl: "/oer-modules/duct-aerodynamics-lab.html",
    standards: ["ACCA", "ASHRAE", "SMACNA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "What is Duct TEL and what does it represent in duct sizing?",
        answer: "In HVAC duct sizing, duct TEL stands for Total Equivalent Length. It quantifies the dynamic friction resistance of straight duct runs combined with representative equivalent lengths of all inline fittings (elbows, transitions, branch takeoffs, and register boots) along the evaluated design path: TEL = L_straight + sum(L_fittings). TEL is the denominator in the design friction rate formula: FR = (ASP × 100) / TEL."
      },
      {
        question: "How is Available Static Pressure (ASP) determined?",
        answer: "Available Static Pressure is the static pressure budget remaining for the duct distribution system after deducting pressure losses across equipment components at design airflow: ASP = Blower Rated TESP - (Coil Drop + Filter Drop + Supply Register Drop + Return Grille Drop + Other Device Drops)."
      },
      {
        question: "What is a typical design friction rate for residential duct systems?",
        answer: "Common residential design friction rates frequently fall between 0.06 and 0.12 in. wg per 100 ft. A calculated friction rate below 0.05 in. wg/100 ft requires larger duct cross-sections to deliver required airflow, while higher friction rates (e.g. above 0.15 in. wg/100 ft) require higher static pressure and may increase air velocity and potential noise."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },
  {
    id: "equivalent-length-calculator",
    name: "Equivalent Length & Total Effective Length (TEL) Calculator",
    pillar: "airflow-ducts",
    route: "/calculators/equivalent-length-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "equivalent length calculator",
    secondaryKeywords: ["duct equivalent length calculator", "total effective length calculator", "tel calculator hvac", "acca manual d equivalent length", "duct fitting equivalent length", "total equivalent length calculator"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "Equivalent Length & TEL Calculator (ACCA Manual D)",
    metaDescription: "Calculate duct Total Effective Length (TEL) and fitting equivalent lengths referencing ACCA Manual D methodology to determine design friction rates.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "ACCA Manual D-based representative fitting equivalent length accumulator (Groups 1–5)",
      "Critical circulation path decomposition: straight footage vs fitting equivalent length",
      "Available Static Pressure (ASP = TESP - CVP) solver for coils, filters, and grilles at design airflow",
      "Design Friction Rate (FR = (ASP * 100) / TEL) calculation based on entered assumptions",
      "Representative fitting resistance analysis comparing vaned vs unvaned elbows and takeoff archetypes",
      "Direct 1-click workflow handoff to Digital Ductulator and Duct Friction Loss Sizer",
    ],
    relatedCalculatorIds: ["duct-friction-loss-calculator", "ductulator", "flex-duct-cfm-chart", "cfm-calculator", "boiler-size-calculator"],
    researchSlug: "non-linear-duct-friction-loss-fitting-penalties",
    oerModuleUrl: "/oer-modules/duct-aerodynamics-lab.html",
    standards: ["ACCA", "ASHRAE", "SMACNA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-09-22",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How is Total Effective Length (TEL) determined in duct sizing?",
        answer: "Total Effective Length (TEL) is calculated for the applicable critical circulation path (the highest-resistance run from the furthest return grille to the furthest supply register). It combines straight duct lengths and representative fitting equivalent lengths: TEL = (L_straight_supply + sum(EL_supply_fittings)) + (L_straight_return + sum(EL_return_fittings))."
      },
      {
        question: "Why do fittings frequently represent a substantial portion of total duct resistance?",
        answer: "Every time moving air changes direction or cross-section, dynamic turbulence and pressure losses occur. In reference methodologies such as ACCA Manual D, these losses are converted into equivalent linear feet of straight duct. For example, a standard unvaned 90° rectangular mitered elbow has a representative equivalent length of 50 ft, contributing as much resistance as 50 feet of straight ductwork."
      },
      {
        question: "What is the difference between a mitered elbow with vanes vs without vanes?",
        answer: "In ACCA Manual D reference tables, a standard 90° rectangular mitered elbow without vanes has a representative equivalent length of 50 ft. Adding turning vanes guides airflow around the turn, reducing representative equivalent length to 10 ft."
      },
      {
        question: "How does Total Effective Length determine duct sizing friction rate?",
        answer: "Total Effective Length is the denominator in the design friction rate formula: FR = (ASP × 100) / TEL. A higher TEL reduces the allowable friction rate per 100 ft, requiring larger duct cross-sections to deliver required design airflow within the blower's available static pressure."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "handoff_clicked", "share_clicked"]
  },
  {
    id: "filter-sizing-calculator",
    name: "MERV Air Filter Sizing & Static Pressure Drop Sizer",
    pillar: "airflow-ducts",
    route: "/calculators/filter-sizing-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "merv filter pressure drop calculator",
    secondaryKeywords: ["hvac filter size calculator", "filter face velocity calculator", "merv 13 static pressure drop", "air filter cfm calculator"],
    primaryIntent: "Commercial / Technical Sizing",
    seoTitle: "MERV Filter Pressure Drop & Sizing Tool",
    metaDescription: "Calculate HVAC air filter face velocity (FPM) and static pressure drops across 1-inch, 2-inch, and 4-inch deep MERV 8 to MERV 16 pleated media.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Filter face velocity calculation (FPM = CFM / Total Face Area) across nominal grille dimensions",
      "Clean filter airflow resistance estimation model across MERV 4 to MERV 16 ratings",
      "Media depth comparison across 1-inch, 2-inch, 4-inch, and 5-inch deep pleat geometries",
      "Multi-grille parallel return air configuration modeling (assumes balanced distribution)",
      "Interactive SVG intake visualizer with face velocity and static pressure drop indicators",
    ],
    relatedCalculatorIds: ["duct-friction-loss-calculator", "cfm-calculator", "ductulator"],
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "What is a recommended face velocity guideline for residential HVAC air filters?",
        answer: "For standard 1-inch residential pleated filters, staying near or below 300 FPM (Feet Per Minute) is a common design rule of thumb to moderate static pressure drop across the media. Deeper 4-inch or 5-inch media filters pack greater pleat surface area into the frame, typically allowing face velocities up to 400–500 FPM with moderate pressure drop. Always verify specific velocity ratings and resistance curves from the filter manufacturer's technical submittal."
      },
      {
        question: "Why do high-MERV 1-inch filters often produce elevated static pressure drops?",
        answer: "High-efficiency media such as MERV 13 captures smaller particles with denser fiber matrices. In a shallow 1-inch filter frame with limited pleat area, higher airflow velocities through the media fibers create significant aerodynamic drag. At face velocities above 350 FPM, clean resistance can reach 0.25 to 0.35 in. w.g., consuming a large fraction of the blower's available static pressure budget."
      },
      {
        question: "How does a 4-inch deep media filter reduce airflow resistance compared to a 1-inch filter?",
        answer: "A 4-inch deep media filter contains several times more total pleat surface area folded within the same opening dimensions. This distributes the airflow over a much larger media surface, reducing the true through-media air velocity and yielding substantially lower static pressure drop for equivalent MERV ratings, while providing greater dust holding capacity."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },

  // -------------------------------------------------------------
  // PILLAR 2: COOLING & LOAD SIZING
  // -------------------------------------------------------------
  {
    id: "btu-calculator",
    name: "BTU Heating & Cooling Load Calculator",
    pillar: "cooling-loads",
    route: "/calculators/btu-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "medium",
    primaryKeyword: "btu calculator",
    secondaryKeywords: ["btu estimator", "british thermal unit calculator", "hvac load calculator"],
    primaryIntent: "Commercial / Heat Load Sizing",
    seoTitle: "BTU Load Calculator — Heating & Cooling Sizer",
    metaDescription: "Estimate whole-home and room heating and cooling loads (BTU/hr and Tons) based on square footage, climate zone, insulation quality, and window exposure.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Preliminary sensible and latent cooling load breakdown (BTU/hr and Tons)",
      "IECC climate zone screening benchmarks (Zones 1 through 7)",
      "Envelope insulation quality adjustments (R-11 to R-60 reference tiers)",
      "Fenestration performance and internal occupant/appliance gain modeling",
      "Interactive SVG load distribution donut chart",
    ],
    relatedCalculatorIds: ["heat-loss-calculator", "ac-tonnage-calculator", "mini-split-sizing", "cfm-calculator"],
    researchSlug: "student-lab-building-envelope-thermal-transmission",
    oerModuleUrl: "/oer-modules/building-envelope-thermal-transmission-lab.html",
    datasetSlug: "building-envelope-thermal-transmission",
    datasetUrl: "/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.csv",
    standards: ["ACCA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How many BTUs do I need per square foot?",
        answer: "As a broad preliminary screening guideline, residential cooling typically ranges from 14 to 26 BTU/hr per square foot depending on IECC climate zone, ceiling height, and insulation levels. However, true heating and cooling loads require a full ACCA Manual J load calculation based on verified envelope assemblies and local design weather conditions."
      },
      {
        question: "How many BTUs are in 1 Ton of air conditioning?",
        answer: "1 Ton of refrigeration equals exactly 12,000 BTU/hr of cooling capacity."
      },
      {
        question: "Why is an ACCA Manual J calculation required instead of square-footage rules of thumb?",
        answer: "Square-footage rules of thumb overlook critical thermal characteristics such as window orientation, solar heat gain coefficient (SHGC), air infiltration rates (ACH50), duct location, and local outdoor design temperatures. Sizing equipment on simple square footage often leads to oversized cooling systems that short-cycle and fail to adequately dehumidify indoor air."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "handoff_clicked", "share_clicked"]
  },
  {
    id: "ac-tonnage-calculator",
    name: "AC Tonnage & Room Capacity Calculator",
    pillar: "cooling-loads",
    route: "/calculators/ac-tonnage-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "medium",
    primaryKeyword: "btus ac",
    secondaryKeywords: ["aircon capacity", "aircon cooling capacity", "ac tonnage calculator"],
    primaryIntent: "Commercial / AC Sizing",
    seoTitle: "AC Tonnage Calculator: Sizing & SEER2 Cost",
    metaDescription: "Estimate residential AC cooling capacity (1.5 to 5.0 Tons) and SEER2 operating costs using regional climate factors and ceiling height adjustments.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Preliminary AC tonnage screening estimates (1.5 to 5.0 Tons)",
      "Regional climate screening factors (Mild, Moderate, Hot/Humid, Desert)",
      "SEER2 annual operating cost model across efficiency tiers",
      "Nominal design airflow reference guidelines (400 CFM/ton)",
    ],
    relatedCalculatorIds: ["btu-calculator", "ac-model-decoder", "mini-split-sizing", "heat-pump-size-calculator"],
    researchSlug: "vapor-compression-kinetics-heat-pump-derating",
    standards: ["ACCA", "AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "What size AC unit do I need for a 2,000 sq ft house?",
        answer: "In a moderate climate with standard insulation and 8-foot ceilings, preliminary screening models typically indicate a 3.0 to 3.5 Ton AC system (36,000 to 42,000 BTU/hr). However, actual equipment capacity must be determined by a formal ACCA Manual J load calculation accounting for window solar gains, insulation levels, air infiltration, and local outdoor design temperatures."
      },
      {
        question: "What happens if an air conditioning unit is oversized?",
        answer: "An oversized AC unit satisfies the thermostat too quickly, resulting in short operating cycles. Because air conditioning requires adequate runtime to cool the evaporator coil below the indoor dew point, short-cycling reduces moisture removal and often leaves the home feeling cool but humid and clammy."
      },
      {
        question: "How is annual SEER2 operating cost calculated?",
        answer: "Annual cooling operating cost is estimated using Equivalent Full-Load Hours (EFLH): Annual Cost = (Nominal BTU/hr × Cooling Hours) / (SEER2 × 1,000) × Electricity Rate ($/kWh). This provides a preliminary comparative estimate between different efficiency tiers."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "share_clicked"]
  },
  {
    id: "ac-model-decoder",
    name: "HVAC Model Number Tonnage Decoder",
    pillar: "cooling-loads",
    route: "/calculators/ac-model-decoder",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "how to find ac tonnage",
    secondaryKeywords: ["how to find ac tonnage", "carrier nomenclature tonnage", "carrier tonnage by model number", "trane model number tonnage", "lennox ac tonnage by model number", "ac model decoder", "ac model number tonnage"],
    primaryIntent: "High Commercial / Nameplate Decoder",
    seoTitle: "AC Model Number Tonnage Decoder: Carrier, Trane, Lennox",
    metaDescription: "Decode supported manufacturer model-number patterns (Carrier, Trane, Lennox, Goodman, Rheem, Daikin) to identify nominal tonnage, BTU capacity, and series.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Regex parser for Carrier, Bryant, Trane, American Standard, Lennox, Goodman, Amana, Rheem, Ruud, Daikin, ICP, and York",
      "Instant nominal capacity detection (18 = 1.5T, 24 = 2.0T, 30 = 2.5T, 36 = 3.0T, 42 = 3.5T, 48 = 4.0T, 60 = 5.0T)",
      "Recommended nominal airflow CFM output (400 CFM per ton)",
      "Interactive visual guide for locating condenser and air handler data plates",
    ],
    relatedCalculatorIds: ["ac-tonnage-calculator", "btu-calculator", "mini-split-sizing"],
    standards: ["AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "Where do I find the model number on my air conditioner?",
        answer: "Look for the metal manufacturer data plate on the side of your outdoor condenser unit or on the access panel of your indoor air handler/furnace. Look for the label marked 'M/N' or 'Model No.'"
      },
      {
        question: "How do I tell the tonnage from an AC model number?",
        answer: "Look for a 2-digit number divisible by 6 or 12 in the middle of the model string. For example, '4TTR6036' contains '36' which equals 36,000 BTU / 12,000 = 3.0 Tons."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "share_clicked"]
  },
  {
    id: "mini-split-sizing",
    name: "Mini-Split Multi-Zone Sizing Calculator",
    pillar: "cooling-loads",
    route: "/calculators/mini-split-sizing",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "mini split sizing calculator",
    secondaryKeywords: ["ductless mini split sizing", "multi zone mini split sizing", "mini split btu calculator", "ductless ac sizing"],
    primaryIntent: "Commercial / Multi-Zone Sizing",
    seoTitle: "Mini-Split Sizing: Multi-Zone Inverter Tool",
    metaDescription: "Estimate multi-zone ductless mini-split sizing. Match room screening loads to candidate indoor heads (6k to 24k BTU) and supported outdoor unit configurations.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Custom multi-room builder for up to 5 zoned residential spaces",
      "Candidate indoor head capacity matching (6k, 9k, 12k, 18k, 24k BTU)",
      "Illustrative outdoor multi-port condenser preliminary sizing (18k to 48k BTU / 1.5 to 4.0 Tons)",
      "Connected capacity ratio gauge (100%–130% preliminary design range)",
      "Multi-zone layout lineset schematic visualizer",
    ],
    relatedCalculatorIds: ["btu-calculator", "heat-pump-size-calculator", "ac-tonnage-calculator"],
    standards: ["AHRI", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Define Custom Zones & Room Dimensions",
        instruction: "Enter square footage, solar exposure orientation, ceiling height, and insulation quality for each conditioned room.",
      },
      {
        stepNumber: 2,
        title: "Calculate Room Screening Heat Loads",
        instruction: "Review preliminary screening load estimates (BTU/hr) based on HVACLogic area and exposure factors.",
      },
      {
        stepNumber: 3,
        title: "Match Candidate Indoor Head Capacities",
        instruction: "Select candidate nominal indoor heads (6k, 9k, 12k, 18k, or 24k BTU/hr) and preferred unit styles.",
      },
      {
        stepNumber: 4,
        title: "Evaluate Outdoor Multi-Port Condenser & Connected Ratio",
        instruction: "Review the illustrative outdoor condenser size and connected capacity ratio (typically 100%–130%), then verify against manufacturer combination tables.",
      },
    ],
    faqs: [
      {
        question: "What size mini-split indoor head do I need for a bedroom?",
        answer: "A standard bedroom (150 to 250 sq ft) typically evaluates to a preliminary screening load requiring a 6,000 or 9,000 BTU candidate indoor head unit. Larger suites or rooms with high solar heat gain often match a 12,000 BTU head. Actual equipment selection must be verified using a detailed load calculation and manufacturer performance data."
      },
      {
        question: "What is mini-split inverter connected capacity ratio (diversity)?",
        answer: "Multi-zone inverter mini-split systems frequently allow total connected indoor head capacity to exceed outdoor condenser rated capacity by 100% to 130% (e.g. 27,000 BTU of candidate indoor heads paired with a 24,000 BTU outdoor unit). Because individual zones peak at different times of day, the modulating inverter balances refrigerant delivery dynamically. Acceptable connected combinations are governed by manufacturer submittal tables."
      },
      {
        question: "Can I mix wall-mounted heads and ceiling cassettes on one outdoor condenser?",
        answer: "Many multi-port ductless systems support combinations of wall-mounted units, ceiling cassettes, floor consoles, and concealed ducted units. However, compatibility is manufacturer- and model-series-specific and must be verified against the manufacturer's approved combination and capacity tables."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },

  // -------------------------------------------------------------
  // PILLAR 3: FIELD DIAGNOSTICS & REFRIGERATION
  // -------------------------------------------------------------
  {
    id: "superheat-subcooling-calculator",
    name: "Target Superheat & Subcooling Charging Calculator",
    pillar: "field-diagnostics",
    route: "/calculators/superheat-subcooling-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "high",
    primaryKeyword: "superheat calculator",
    secondaryKeywords: ["subcooling calculator", "hvac charging calculator", "refrigerant charging diagnostic"],
    primaryIntent: "Field Diagnostic / EPA Service",
    seoTitle: "Superheat & Subcooling Charging Calculator",
    metaDescription: "Calculate target superheat (fixed orifice) and target subcooling (TXV) across R-454B, R-32, R-410A, and R-22 with field diagnostic guidance.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Dual mode: Fixed Orifice Target Superheat & TXV Target Subcooling",
      "NIST REFPROP-referenced PT data for R-454B, R-32, R-410A, R-22, R-134a, R-404A, R-407C",
      "Zeotropic glide handling (discrete Bubble/Dew saturation curves for R-454B and R-407C)",
      "Multi-point diagnostic cross-referencing with field action checklists",
      "A2L refrigerant safety callouts and safe handling best practices",
    ],
    relatedCalculatorIds: ["pt-chart", "refrigerant-charge-calculator", "psychrometric-calculator"],
    researchSlug: "thermodynamic-modeling-a2l-refrigerant-glide-r454b",
    standards: ["EPA", "AHRI", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Refrigerant & Metering Device",
        instruction: "Choose your refrigerant (e.g., R-454B, R-410A, R-32, R-22) and metering device type (TXV/EEV or Fixed Orifice/Piston).",
      },
      {
        stepNumber: 2,
        title: "Enter Manifold Pressures & Line Temperatures",
        instruction: "Input low-side suction pressure and suction line temperature; input high-side liquid pressure and liquid line temperature.",
      },
      {
        stepNumber: 3,
        title: "Provide Operating Conditions or Target Values",
        instruction: "For fixed orifice systems, enter indoor wet bulb and outdoor dry bulb temperatures; for TXV systems, enter manufacturer data plate target subcooling.",
      },
      {
        stepNumber: 4,
        title: "Review Superheat, Subcooling & Diagnostic Findings",
        instruction: "Evaluate actual vs. target values, saturation temperatures (dew and bubble points), and recommended field diagnostic checks.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate target superheat on a fixed orifice system?",
        answer: "Use the standard field diagnostic correlation: Target Superheat = (3 * Indoor Wet Bulb - Outdoor Dry Bulb - 80) / 2. This formula is applicable when indoor wet bulb is 50°F to 76°F and outdoor dry bulb is 55°F to 115°F. Always verify against manufacturer-specific charging charts when available."
      },
      {
        question: "How do you calculate subcooling on a TXV system?",
        answer: "Actual Subcooling = Condenser Bubble Saturation Temperature (from liquid pressure) - Actual Liquid Line Temperature. Compare this against the manufacturer data plate target (commonly 10°F ± 3°F illustrative tolerance band)."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "validation_error", "share_clicked"]
  },
  {
    id: "pt-chart",
    name: "Digital Refrigerant Pressure-Temperature Chart",
    pillar: "field-diagnostics",
    route: "/calculators/pt-chart",
    status: "production",
    launchPhase: 1,
    riskLevel: "high",
    primaryKeyword: "refrigerant pt chart",
    secondaryKeywords: ["r454b pt chart", "r32 pt chart", "pressure temperature chart", "r410a pt chart", "bubble point vs dew point", "refrigerant temperature glide", "r454b saturation pressure", "r22 pt chart"],
    primaryIntent: "Navigational / Field Lookup",
    seoTitle: "Refrigerant PT Chart & Saturation Calculator",
    metaDescription: "Interactive refrigerant Pressure-Temperature (PT) chart for R-454B, R-32, R-410A, R-22, and zeotropic blends. Instant bubble and dew point saturation lookups.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Interactive pressure slider (0 to 650 psig) with instant saturation temperature output",
      "Support for 2025/2026 EPA A2L transition refrigerants (R-454B, R-32)",
      "Discrete Bubble Point (liquid) and Dew Point (vapor) curves for zeotropic blends",
      "Unit toggle: psig, psia, bar, kPa <-> °F, °C",
    ],
    relatedCalculatorIds: ["superheat-subcooling-calculator", "refrigerant-charge-calculator", "psychrometric-calculator"],
    researchSlug: "thermodynamic-modeling-a2l-refrigerant-glide-r454b",
    standards: ["NIST", "ASHRAE", "AHRI", "EPA"],
    formulaVersion: "1.1.0",
    dataVersion: "2025.1-v10.0",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Refrigerant",
        instruction: "Choose the target refrigerant (e.g., R-454B, R-32, R-410A, R-22, R-134a, R-404A, or R-407C) to load its verified thermophysical property dataset.",
      },
      {
        stepNumber: 2,
        title: "Select Lookup Direction & Engineering Units",
        instruction: "Choose whether to calculate saturation temperature from manifold pressure (Pressure → Sat. Temp) or required pressure from temperature (Sat. Temp → Pressure), and select preferred units (PSIG, PSIA, Bar, kPa, °F, °C).",
      },
      {
        stepNumber: 3,
        title: "Select Phase Basis for Zeotropic Blends",
        instruction: "For refrigerants with temperature glide (such as R-454B or R-407C), select the Dew Point curve for suction vapor superheat or the Bubble Point curve for liquid subcooling.",
      },
      {
        stepNumber: 4,
        title: "Read Equilibrium Saturation Properties",
        instruction: "Evaluate the resulting saturation temperature, absolute pressure, metric equivalents, and operating phase zone on the digital manifold gauge display.",
      },
      {
        stepNumber: 5,
        title: "Apply Reference Data to System Diagnostics",
        instruction: "Use the saturation state to evaluate evaporator coil heat transfer, prevent coil icing (<32°F), or verify system charging against manufacturer target superheat and subcooling tables.",
      },
    ],
    faqs: [
      {
        question: "What is the boiling point of R-454B at atmospheric pressure?",
        answer: "As a zeotropic blend, R-454B boils over a temperature range rather than at a single constant temperature. At standard atmospheric pressure (14.696 psia / 0 psig), its bubble point is approximately -60.0°F and its dew point is approximately -58.5°F, exhibiting a ~1.5°F temperature glide."
      },
      {
        question: "What is temperature glide in zeotropic refrigerants like R-454B and R-407C?",
        answer: "Temperature glide is the temperature difference between the bubble point (where saturated liquid begins boiling) and dew point (where saturated vapor finishes condensing) at a constant pressure."
      },
      {
        question: "What is the typical operating pressure for R-454B on high and low sides?",
        answer: "Operating pressure depends on evaporating and condensing temperatures dictated by ambient weather and indoor heat load. At typical residential cooling design conditions (45°F evaporating and 115°F condensing), R-454B operates around 123 to 132 psig suction pressure (dew) and 375 to 395 psig liquid line pressure (bubble), roughly 3% to 5% lower than R-410A at identical saturation temperatures."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "unit_changed"]
  },
  {
    id: "psychrometric-calculator",
    name: "Psychrometric Chart & Moist Air Calculator",
    pillar: "field-diagnostics",
    route: "/calculators/psychrometric-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "psychrometric calculator",
    secondaryKeywords: ["psychrometric chart calculator", "moist air properties", "dew point calculator", "wet bulb calculator", "humidity ratio calculator", "moist air enthalpy", "specific volume of moist air", "air density calculator", "altitude psychrometric calculator"],
    primaryIntent: "Engineering / Psychrometrics",
    seoTitle: "Psychrometric Chart & Moist Air Calculator",
    metaDescription: "Calculate moist air thermodynamic properties from supported input pairs (DB+RH, DB+WB, DB+DP) with barometric altitude adjustment.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Calculates moist air thermodynamic state point from supported input pairs (DB+RH, DB+WB, DB+DP)",
      "Standard-atmosphere barometric pressure adjustment based on altitude elevation (-1,000 to 15,000 ft)",
      "Outputs: Humidity Ratio (grains/lb), Specific Enthalpy (BTU/lb), Specific Volume, Air Density, and Vapor Pressure",
      "Interactive SVG psychrometric state chart with saturation curve and comfort zone boundary",
      "ASHRAE Standard 55 representative thermal comfort condition classification",
    ],
    relatedCalculatorIds: ["superheat-subcooling-calculator", "btu-calculator", "heat-loss-calculator"],
    researchSlug: "ashrae-hyland-wexler-moist-air-psychrometrics",
    datasetSlug: "ashrae-hyland-wexler-psychrometric-benchmark",
    datasetUrl: "/datasets/hvaclogic_ashrae_hyland_wexler_psychrometric_benchmark.csv",
    standards: ["ASHRAE"],
    formulaVersion: "1.1.0",
    dataVersion: "2025.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Input Mode & Enter Air Parameters",
        instruction: "Select one of the three supported parameter pairs: Dry Bulb + Relative Humidity (DB+RH), Dry Bulb + Wet Bulb (DB+WB), or Dry Bulb + Dew Point (DB+DP), and enter measured values.",
      },
      {
        stepNumber: 2,
        title: "Specify Altitude or Barometric Pressure",
        instruction: "Enter the site elevation above sea level (-1,000 to 15,000 ft) to apply standard atmospheric barometric pressure compensation.",
      },
      {
        stepNumber: 3,
        title: "Calculate Saturation Vapor Pressure",
        instruction: "The engine solves saturation vapor pressure using ASHRAE Hyland-Wexler formulations over liquid water or ice.",
      },
      {
        stepNumber: 4,
        title: "Resolve Equilibrium Moist Air Properties",
        instruction: "Evaluate the resulting dew point, wet bulb, specific enthalpy, humidity ratio (grains/lb), specific volume, and moist air density.",
      },
      {
        stepNumber: 5,
        title: "Review State on Interactive Chart & Export",
        instruction: "Inspect the state point on the interactive SVG psychrometric chart relative to the ASHRAE 55 comfort zone, and export data as CSV.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate dew point from dry bulb and relative humidity?",
        answer: "First calculate the actual water vapor partial pressure: P_w = (RH / 100) * P_ws(T_db), where P_ws is saturation vapor pressure via the ASHRAE Hyland-Wexler equation. Then calculate dew point temperature using the empirical formulation: T_dp = 100.45 + 33.193 * ln(P_w) + 2.319 * [ln(P_w)]^2 (with P_w in psia)."
      },
      {
        question: "Why is enthalpy important in HVAC cooling calculations?",
        answer: "Specific enthalpy (h) measures the total heat content (sensible heat of dry air + latent heat of moisture) per pound of dry air (BTU/lb). Total air conditioner cooling capacity across a coil is evaluated by multiplying mass airflow by the enthalpy difference: Q_total = 4.5 * CFM * Delta_h (under standard sea-level air density)."
      },
      {
        question: "How does altitude affect psychrometric air properties?",
        answer: "At higher elevations, barometric atmospheric pressure drops (e.g., 12.1 psia in Denver vs 14.7 psia at sea level). Lower total pressure increases the humidity ratio for a given relative humidity and decreases moist air density."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "unit_changed"]
  },
  {
    id: "refrigerant-charge-calculator",
    name: "Refrigerant Line Set Charge & Weigh-In Calculator",
    pillar: "field-diagnostics",
    route: "/calculators/refrigerant-charge-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "medium",
    primaryKeyword: "refrigerant charge calculator",
    secondaryKeywords: [
      "line set charge calculator",
      "refrigerant line-set adjustment",
      "additional refrigerant calculator",
      "r454b charge calculator",
      "r32 charge calculator",
      "r410a line-set charge",
      "oem refrigerant charge adjustment",
      "refrigerant weigh-in calculator",
    ],
    primaryIntent: "Field Installation / Initial Weigh-In",
    seoTitle: "Refrigerant Line Set Charge & Weigh-In Calculator",
    metaDescription: "Calculate OEM-specified line-set refrigerant charge adjustments and weigh-in targets for R-454B, R-32, and R-410A using verified manufacturer data.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Versioned OEM charging profiles with exact source and model-family scope",
      "R-454B, R-32, and R-410A initial line-set weigh-in calculations",
      "Custom OEM-rate mode for equipment manuals not included in the profile library",
      "Factory allowance, line-size, length, and vertical-limit validation",
      "Final-charge verification handoff to superheat and subcooling diagnostics",
    ],
    relatedCalculatorIds: ["superheat-subcooling-calculator", "pt-chart", "ac-model-decoder"],
    researchSlug: "deterministic-vapor-compression-refrigerant-mass-sizing",
    datasetSlug: "refrigerant-mass-charge-low-gwp",
    datasetUrl: "/datasets/refrigerant_mass_charge_benchmark_dataset_2026.csv",
    standards: ["EPA", "AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-20",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Verified OEM Profile or Custom Manual Mode",
        instruction: "Choose the specific manufacturer model family (e.g., ICP R5A5S R-454B or Daikin AG-TP-110 R-32) or select Custom OEM mode to enter specifications directly from your unit's installation guide."
      },
      {
        stepNumber: 2,
        title: "Select Installed Line-Set Outside Diameters",
        instruction: "Specify the exact liquid line and suction/vapor line outside diameter combination installed on the job site."
      },
      {
        stepNumber: 3,
        title: "Enter Linear Tubing Length and Nameplate Charge",
        instruction: "Input the measured linear line-set length in feet (or meters) and the factory base charge indicated on the outdoor unit rating plate."
      },
      {
        stepNumber: 4,
        title: "Calculate Initial Weighed-In Mass Adjustment",
        instruction: "Evaluate the initial refrigerant mass adjustment using the manufacturer's specified calculation method (excess length or inventory delta credit)."
      },
      {
        stepNumber: 5,
        title: "Verify Published Installation & Piping Limits",
        instruction: "Check total equivalent length, vertical separation (lift), oil trap requirements, and long-line accessory criteria against the manufacturer's published engineering limits."
      },
      {
        stepNumber: 6,
        title: "Perform Final Subcooling or Superheat Commissioning",
        instruction: "Evacuate the system to under 500 microns, weigh in the calculated target charge, operate under stabilized load conditions, and verify final charge against the OEM subcooling or superheat charging chart."
      }
    ],
    faqs: [
      {
        question: "How is an initial line-set refrigerant adjustment calculated?",
        answer: "Use the exact formula, factory allowance, and line-size rate published for the selected outdoor-unit family. HVACLogic treats this as an initial weigh-in estimate and requires the manufacturer's final charging procedure afterward.",
      },
      {
        question: "Can one refrigerant adder rate be used for every R-454B or R-32 system?",
        answer: "No. Rates and formulas vary by manufacturer, model family, line sizes, factory allowance, and installation limits. Select a verified OEM profile or enter the rate from the applicable equipment manual.",
      },
      {
        question: "Does this calculator replace subcooling or superheat verification?",
        answer: "No. The result is an initial weighed-in adjustment. Complete the final charge using the selected manufacturer's prescribed subcooling, superheat, approach, or automatic commissioning procedure.",
      },
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"],
  },

  // -------------------------------------------------------------
  // PILLAR 4: HEATING SYSTEMS & ELECTRIFICATION
  // -------------------------------------------------------------
  {
    id: "heat-pump-size-calculator",
    name: "Heat Pump Sizing & Balance Point Tool",
    pillar: "heating-systems",
    route: "/calculators/heat-pump-size-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "heat pump size calculator",
    secondaryKeywords: [
      "heat pump sizing",
      "cold climate heat pump sizing",
      "heat pump balance point",
      "heat pump vs heat loss",
      "auxiliary heat strip sizing",
      "heat strip size in kw calculator",
      "dual fuel economic balance point",
      "heat pump thermal balance point",
    ],
    primaryIntent: "Commercial / Electrification",
    seoTitle: "Heat Pump Sizing & Thermal Balance Point Calculator",
    metaDescription: "Calculate heat pump thermal balance point, cold-climate heating capacities (47°F, 17°F, 5°F), aux heat strip sizing (kW), and dual-fuel economic crossover.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Authoritative thermal balance point intersection between building heat loss and heat pump output",
      "Cold-climate low-ambient illustrative performance curves (47°F, 17°F, 5°F, and -5°F)",
      "Supplemental auxiliary electric heat strip sizing: exact continuous kW deficit and modular stage selection",
      "Preliminary ACCA Manual S cooling/heating capacity ratio evaluation",
      "Dual-fuel economic balance point calculation based on electric and natural gas parity COP",
      "Interactive temperature performance curve visualizer with balance point marker",
    ],
    relatedCalculatorIds: ["heat-strip-size-calculator", "heat-loss-calculator", "furnace-size-calculator", "btu-calculator", "ac-tonnage-calculator"],
    researchSlug: "cold-climate-heat-pump-balance-point-lab",
    oerModuleUrl: "/oer-modules/heat-pump-balance-point-lab.html",
    datasetSlug: "cold-climate-heat-pump-cop-derating",
    datasetUrl: "/datasets/hvaclogic_cold_climate_heat_pump_cop_benchmark.csv",
    standards: ["ASHRAE", "AHRI", "ACCA"],
    formulaVersion: "1.1.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Enter Building Design Heating & Cooling Loads",
        instruction: "Input the ACCA Manual J winter heating load (BTU/hr) and summer design cooling load (BTU/hr) for the structure.",
      },
      {
        stepNumber: 2,
        title: "Select Winter Design Temperature and Indoor Setpoint",
        instruction: "Specify the 99% winter outdoor design temperature for your ASHRAE climate zone and desired indoor thermostat setpoint (typically 70°F).",
      },
      {
        stepNumber: 3,
        title: "Choose Nominal Heat Pump Capacity & Compressor Profile",
        instruction: "Select nominal cooling tonnage and choose an illustrative engineering profile: Cold-Climate Inverter, Standard Inverter, Two-Stage, or Single-Stage.",
      },
      {
        stepNumber: 4,
        title: "Calculate Exact Thermal Balance Point",
        instruction: "Evaluate the exact outdoor temperature where structure heat loss intersects maximum heat pump heating output.",
      },
      {
        stepNumber: 5,
        title: "Determine Low-Ambient Heating Deficit & Auxiliary Heat Strip kW",
        instruction: "Assess the net heating capacity deficit at the winter design temperature and evaluate the continuous resistance kW required alongside standard modular stage sizes (5, 8, 10, 15, 20 kW).",
      },
      {
        stepNumber: 6,
        title: "Evaluate Preliminary ACCA Manual S Sizing Ratios",
        instruction: "Review preliminary cooling and heating sizing ratios against ACCA Manual S design guidance prior to final selection with OEM submittal data.",
      },
      {
        stepNumber: 7,
        title: "Calculate Dual-Fuel Economic Balance Point (Optional)",
        instruction: "Enter local electricity and natural gas utility tariffs along with backup furnace AFUE to compute the cost-optimal fuel switching temperature.",
      },
    ],
    faqs: [
      {
        question: "What is a heat pump thermal balance point?",
        answer: "The thermal balance point is the outdoor temperature at which the building's heat loss exactly equals the maximum heating output of the heat pump. Below this temperature, supplemental auxiliary heating (electric resistance strips or fossil-fuel backup) is required to maintain indoor temperature."
      },
      {
        question: "How do cold-climate inverter heat pumps perform at low ambient temperatures?",
        answer: "Cold-climate air-source heat pumps (ccASHP) utilize variable-speed inverter compressors and enhanced vapor injection to deliver substantial heating output down to 5°F and -5°F, significantly lowering the thermal balance point compared to standard single-stage equipment."
      },
      {
        question: "How is supplemental auxiliary electric heat strip size (kW) calculated?",
        answer: "Auxiliary heat strip sizing calculates the net heating deficit at the 99% winter design temperature: Deficit (BTU/hr) = Building Heat Loss @ Design Temp - Heat Pump Output @ Design Temp. The required continuous electrical capacity is Deficit / 3,412.14 BTU/kWh, which is then mapped to standard modular equipment increments (such as 5 kW, 8 kW, 10 kW, 15 kW, or 20 kW)."
      },
      {
        question: "What is the difference between thermal balance point and economic balance point?",
        answer: "The thermal balance point is determined purely by thermodynamics (when heat pump output equals building heat loss). The economic balance point applies to dual-fuel hybrid systems and marks the outdoor temperature where operating the heat pump costs exactly the same per delivered BTU as operating the backup gas/oil furnace based on current utility tariffs."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },
  {
    id: "furnace-size-calculator",
    name: "Furnace Sizing & AFUE Efficiency Calculator",
    pillar: "heating-systems",
    route: "/calculators/furnace-size-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "furnace size calculator",
    secondaryKeywords: [
      "furnace btu calculator",
      "furnace sizing",
      "gas furnace sizing",
      "furnace output btu",
      "afue calculator",
      "residential furnace sizing",
      "heating load estimate",
    ],
    primaryIntent: "Commercial / Heating Replacement",
    seoTitle: "Furnace Sizing Calculator — Heating BTU & AFUE",
    metaDescription: "Estimate residential furnace sizing, heating BTU requirements, and AFUE efficiency (80% vs 96% condensing) based on home area, climate zone, and envelope.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Preliminary heating load screening based on floor area and 5 US climate zones (30 to 60 BTU/sq ft)",
      "Documented envelope adjustments for bounded ceiling height volume and insulation grades",
      "Candidate nominal furnace input range matching (40k, 60k, 80k, 100k, 120k, 140k BTU/hr)",
      "80% non-condensing vs. 90%–98% condensing AFUE efficiency evaluation",
      "Theoretical heating airflow CFM calculation across selectable temperature rise (ΔT)",
    ],
    relatedCalculatorIds: ["heat-loss-calculator", "heat-pump-size-calculator", "heat-strip-size-calculator", "combustion-air-calculator", "boiler-size-calculator"],
    researchSlug: "thermal-envelope-infiltration-building-heat-loss",
    standards: ["ACCA", "AHRI", "DOE"],
    formulaVersion: "1.1.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Enter Heated Living Space",
        instruction: "Input the conditioned floor area in square feet to establish the baseline building footprint.",
      },
      {
        stepNumber: 2,
        title: "Select Geographic Climate Zone or ASHRAE City",
        instruction: "Choose your regional heating zone (30 to 60 BTU/sq ft) or pick an ASHRAE weather station for local 99% winter outdoor design temperature.",
      },
      {
        stepNumber: 3,
        title: "Specify Ceiling Height and Insulation Quality",
        instruction: "Enter room ceiling height and envelope insulation grade to apply bounded volume and thermal resistance modifiers.",
      },
      {
        stepNumber: 4,
        title: "Select Target AFUE Rating Tier",
        instruction: "Choose between standard 80% non-condensing (metal chimney) and 92%–98% condensing high-efficiency (PVC direct vent) furnace options.",
      },
      {
        stepNumber: 5,
        title: "Review Candidate Nominal Sizing Range and Airflow",
        instruction: "Evaluate the estimated heating load, candidate nominal furnace size range, and theoretical airflow CFM at your target temperature rise.",
      },
      {
        stepNumber: 6,
        title: "Verify Final Selection Against Manufacturer Submittal Data",
        instruction: "Confirm equipment capacity against an ACCA Manual J load calculation and manufacturer-rated steady-state heating output using ACCA Manual S.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between furnace input and output BTU?",
        answer: "Input BTU is the total chemical fuel energy consumed per hour at the burner manifold. Output BTU is the usable steady-state heat transferred into the air stream. AFUE is a seasonal laboratory rating used as an annual efficiency benchmark, whereas exact output must be verified from the manufacturer's rating plate."
      },
      {
        question: "What size furnace do I need for a 2,000 sq ft house?",
        answer: "Square footage alone provides only a preliminary screening estimate. In a moderate-to-cold climate (Zone 3/4), a 2,000 sq ft home typically has an estimated heating load of 80,000 to 100,000 BTU/hr, corresponding to a candidate 100,000 to 120,000 BTU/hr input furnace. Final sizing must be verified with an ACCA Manual J load calculation."
      },
      {
        question: "What is the mechanical difference between 80% and 96% AFUE furnaces?",
        answer: "An 80% AFUE furnace utilizes a single heat exchanger and vents hot exhaust (300°F+) through a metal B-vent chimney flue. A 96% condensing furnace adds a secondary stainless steel condensing heat exchanger to extract latent heat from water vapor in the flue gas, cooling exhaust below 120°F and venting through PVC pipe."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },
  {
    id: "boiler-size-calculator",
    name: "Hydronic Boiler & Baseboard Sizing Calculator",
    pillar: "heating-systems",
    route: "/calculators/boiler-size-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "boiler size calculator",
    secondaryKeywords: [
      "hydronic boiler sizing",
      "baseboard sizing calculator",
      "radiator edr calculator",
      "boiler btu calculator",
      "cast iron radiator btu",
      "boiler doe heating capacity",
      "hydronic heating sizing",
    ],
    primaryIntent: "High Commercial / Hydronics",
    seoTitle: "Boiler Sizing Calculator — Hydronic Baseboard & EDR",
    metaDescription: "Calculate hydronic boiler sizing, required DOE heating capacity, fin-tube baseboard BTU/ft, radiator EDR, and I=B=R piping/pickup factors.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Multi-method hydronic sizing: Copper Fin-Tube Baseboard, Cast-Iron Radiator EDR, or Whole-House Heat Loss",
      "Water-temperature derating for baseboard (180°F standard down to 120°F low-temp condensing)",
      "Distinct hot-water (150 BTU/sq ft EDR) and low-pressure steam (240 BTU/sq ft EDR) rating paths",
      "I=B=R piping and pick-up factor application (1.15x hot water / 1.33x steam) to derive required DOE Heating Capacity",
      "Domestic Hot Water (DHW) indirect tank recovery and priority relay control evaluation",
      "Interactive SVG hydronic piping loop schematic and CSV engineering submittal export",
    ],
    relatedCalculatorIds: ["expansion-tank-calculator", "heat-loss-calculator", "furnace-size-calculator", "combustion-air-calculator", "ductulator", "duct-friction-loss-calculator"],
    standards: ["AHRI", "ACCA", "DOE"],
    formulaVersion: "1.1.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Sizing Method & Heating Medium",
        instruction: "Choose between Fin-Tube Baseboard footage, Cast-Iron Radiator EDR, or Whole-House Heat Loss, and select Hydronic Hot Water or Low-Pressure Steam.",
      },
      {
        stepNumber: 2,
        title: "Enter Emitter Dimensions or Design Heat Loss",
        instruction: "Input total active baseboard linear footage, radiator square footage of EDR, or building envelope peak heat loss.",
      },
      {
        stepNumber: 3,
        title: "Specify Average Water Temperature (AWT)",
        instruction: "Select supply water operating temperature (180°F standard down to 120°F low-temperature) to apply rated BTU/ft emitter derating.",
      },
      {
        stepNumber: 4,
        title: "Configure Indirect Domestic Hot Water (DHW) Controls",
        instruction: "Indicate whether an indirect water heater is connected and if a DHW Priority Zone Controller manages space heating during recovery calls.",
      },
      {
        stepNumber: 5,
        title: "Calculate Net Radiation Demand & Required DOE Capacity",
        instruction: "Evaluate total Net AHRI load and apply the standard I=B=R piping and pick-up allowance (1.15x for water, 1.33x for steam) to determine required minimum DOE Heating Capacity.",
      },
      {
        stepNumber: 6,
        title: "Verify Equipment Selection Against Manufacturer Submittal Data",
        instruction: "Match the required DOE Heating Capacity to certified manufacturer ratings in the AHRI directory and verify building heat loss via ACCA Manual J.",
      },
    ],
    faqs: [
      {
        question: "How many BTUs does one linear foot of fin-tube baseboard produce?",
        answer: "Standard residential 3/4-inch copper fin-tube baseboard produces approximately 580 BTU/hr per linear foot at 180°F average water temperature (AWT) with 65°F entering air. At lower operating temperatures, output derates to ~450 BTU/hr-ft at 160°F, ~330 BTU/hr-ft at 140°F, and ~210 BTU/hr-ft at 120°F."
      },
      {
        question: "What is the difference between Hot Water EDR and Steam EDR?",
        answer: "Equivalent Direct Radiation (EDR) measures cast-iron radiator heating surface area. In hydronic hot water systems operating at 170°F–180°F AWT, 1 sq ft of EDR produces 150 BTU/hr. In low-pressure steam systems operating at 215°F (1 psig), 1 sq ft of EDR produces 240 BTU/hr."
      },
      {
        question: "How does a DHW Priority Relay affect boiler sizing?",
        answer: "A DHW Priority Zone Controller temporarily pauses space-heating circulators during domestic hot water calls. Under typical residential conditions where recovery calls are brief, space temperature does not drop noticeably, allowing the boiler to be sized without an additional domestic hot water capacity adder."
      },
      {
        question: "What is the I=B=R piping and pick-up factor?",
        answer: "The I=B=R piping and pick-up allowance (1.15 for hot water, 1.33 for steam) accounts for heat absorption by distribution piping and initial system warm-up from a cold start. Multiplying the net radiation load by this factor yields the minimum required DOE Heating Capacity."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },
  {
    id: "expansion-tank-calculator",
    name: "ASHRAE Hydronic Expansion Tank Sizing Calculator",
    pillar: "heating-systems",
    route: "/calculators/expansion-tank-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "expansion tank calculator",
    secondaryKeywords: ["hydronic expansion tank sizing", "asme expansion tank calculator", "boiler expansion tank sizing", "glycol expansion tank calculator", "amtrol sizing calculator"],
    primaryIntent: "Professional Engineering / Hydronics",
    seoTitle: "ASHRAE Hydronic Expansion Tank Calculator — Glycol Derating",
    metaDescription: "Size closed-loop diaphragm and bladder expansion tanks using ASHRAE technical references with optional commercial vessel rating considerations.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "ASHRAE Systems & Equipment Ch. 15 closed-loop diaphragm sizing equations (Eq. 13 & 14)",
      "Specific volume and density thermodynamic curves for water and 20%-50% propylene/ethylene glycol",
      "Boyle's Law acceptance ratio (Ar = 1 - P1/P2) in absolute pressure (psia)",
      "Piping thermal expansion compensation for carbon steel, copper, and PEX",
      "Interactive SVG cross-section visualizer showing bladder inflation and operating pressure spectrum",
      "Commercial ASME Section VIII standard tank size selector (2.1 to 528 gallons)",
      "1-Click CSV engineering submittal export",
    ],
    relatedCalculatorIds: ["boiler-size-calculator", "heat-loss-calculator", "equivalent-length-calculator", "combustion-air-calculator"],
    standards: ["ASHRAE", "ASME"],
    formulaVersion: "1.0.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Enter System Fluid Volume & Glycol Concentration",
        instruction: "Input total hydronic fluid volume (in gallons or liters) and select pure water or propylene/ethylene glycol concentration (0% to 50%).",
      },
      {
        stepNumber: 2,
        title: "Set Initial Fill & Maximum Operating Temperatures",
        instruction: "Specify the initial cold fill temperature (typically 40°F–60°F) and the peak design loop operating temperature (e.g. 180°F for fin-tube, 120°F–140°F for condensing/radiant).",
      },
      {
        stepNumber: 3,
        title: "Configure Pressure Schedule & Safety Relief Valve Rating",
        instruction: "Input the cold fill / pre-charge pressure (psig), relief valve setpoint (e.g. 30 psig or 50 psig), and safety buffer below relief pressure.",
      },
      {
        stepNumber: 4,
        title: "Select Piping Material for Volumetric Expansion Allowance",
        instruction: "Choose pipe material (Carbon Steel, Copper, or PEX) to compute the thermal expansion allowance of the distribution piping network.",
      },
      {
        stepNumber: 5,
        title: "Review Acceptance Volume (Vacc) & Boyle's Law Acceptance Ratio (Ar)",
        instruction: "Verify the calculated expanded fluid volume and the acceptance ratio derived from absolute pressure constraints.",
      },
      {
        stepNumber: 6,
        title: "Select Minimum Calculated Volume & Candidate ASME Tank Model",
        instruction: "Review the minimum gross shell volume and choose an appropriate standard ASME Section VIII or residential diaphragm tank model.",
      },
    ],
    faqs: [
      {
        question: "Why does glycol require a larger expansion tank than pure water?",
        answer: "Propylene and ethylene glycol solutions have higher thermal volumetric expansion coefficients than pure water. A 50% propylene glycol mixture expands ~65% more than pure water across heating temperature ranges, requiring a significantly larger expansion tank."
      },
      {
        question: "What is the Acceptance Ratio (Ar) in expansion tank sizing?",
        answer: "Acceptance ratio (Ar = 1 - P1/P2) represents the usable fraction of the tank's total volume. P1 is the initial cold fill precharge and P2 is the maximum operating pressure (both in absolute psia). A narrower pressure band lowers Ar, requiring a larger physical tank shell."
      },
      {
        question: "Where should the expansion tank be connected in a hydronic system?",
        answer: "The expansion tank should be connected on the suction side of the circulator pump at the 'Point of No Pressure Change' (PONPC). Pumping away from the expansion tank ensures that pump head is added to the system pressure, preventing cavitation and air binding."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "print_exported"]
  },
  {
    id: "garage-heater-sizing",
    name: "Garage & Workshop Heater Sizing Calculator",
    pillar: "heating-systems",
    route: "/calculators/garage-heater-sizing",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "garage heater sizing calculator",
    secondaryKeywords: ["shop heater sizing", "garage heater btu calculator", "electric garage heater sizing", "gas garage heater btu"],
    primaryIntent: "Commercial / DIY Heating",
    seoTitle: "Garage Heater Sizing — Shop BTU & kW Sizer",
    metaDescription: "Size gas unit heaters, forced-air electric heaters, and radiant tubes for 1 to 3-car garages. ACCA Manual J & ASHRAE heat loss with slab insulation derating.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "1-car, 2-car, 2.5-car, 3-car, and custom pole barn shop dimension geometry",
      "Concrete uninsulated slab edge perimeter conduction and overhead door thermal losses",
      "Gas unit heater (30k–125k BTU/hr) vs electric forced-air (3kW–20kW / 240V Amps) recommendations",
      "Interactive SVG garage cross-section visualizer with ceiling throw cone and heat loss flow vectors",
      "Freeze-protection (50°F) vs active workshop comfort (65°F) setpoint modes",
    ],
    relatedCalculatorIds: ["heat-loss-calculator", "combustion-air-calculator", "r-value-calculator"],
    standards: ["ASHRAE", "DOE", "NFPA"],
    formulaVersion: "1.0.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Garage Geometry & Clear Height",
        instruction: "Choose a standard layout (1-car, 2-car, 2.5-car, 3-car, pole barn) or enter custom length, width, and clear ceiling height.",
      },
      {
        stepNumber: 2,
        title: "Specify Attachment & Insulation Level",
        instruction: "Select whether the garage is attached (with a warm shared wall) or detached, and specify wall, ceiling, door, and slab insulation quality.",
      },
      {
        stepNumber: 3,
        title: "Set Indoor Thermostat & Outdoor Design Temperature",
        instruction: "Choose your indoor target setpoint (50°F freeze protection to 65°F active workshop) and select an ASHRAE winter 99% weather station or input custom outdoor design conditions.",
      },
      {
        stepNumber: 4,
        title: "Configure Intermittent Recovery Margin & Infiltration Drafts",
        instruction: "Select an optional warm-up margin (0% to 20%) to account for garage door opening recovery, and configure estimated air infiltration (ACH).",
      },
      {
        stepNumber: 5,
        title: "Review Steady-State & Total Design Heat Loss",
        instruction: "Evaluate the itemized conduction losses through walls, ceiling, roll-up overhead doors, concrete slab edges, and air infiltration.",
      },
      {
        stepNumber: 6,
        title: "Select Commercial Gas or Electric Heating Equipment",
        instruction: "Compare nominal gas unit heater input ratings (BTU/hr) against delivered output, and review electric unit heater kW with NEC 125% continuous circuit breaker requirements.",
      },
    ],
    faqs: [
      {
        question: "What size heater do I need for a 2-car garage?",
        answer: "For a typical 2-car garage (approx. 500–550 sq ft) with average insulation in a cold climate (10°F outdoor design temp), the calculated steady-state heat loss is approximately 8,000 to 10,000 BTU/hr (2.4 to 3.0 kW). In practice, homeowners install a standard 30,000 BTU/hr gas unit heater or a 3.0 to 5.0 kW electric unit heater to ensure fast intermittent warm-up when overhead doors are opened."
      },
      {
        question: "Is a gas unit heater or electric heater better for a garage?",
        answer: "Gas unit heaters (e.g. Modine Hot Dawg or Mr. Heater Big Maxx) provide lower operating costs in cold climates and deliver high heating capacity for rapid warm-up, but require gas piping and proper venting (Category I or III/IV). Electric unit heaters offer lower installation complexity (no venting or gas lines) but require a dedicated 240V 2-pole circuit (e.g., 20A for 3 kW, 30A for 5 kW)."
      },
      {
        question: "Why does concrete slab-edge conduction account for high garage heat loss?",
        answer: "Uninsulated on-grade concrete slabs in direct contact with frozen soil have high thermal conductance (F-factors of 0.50 to 0.60 BTU/hr·ft·°F). In a 2-car garage, perimeter slab-edge conduction can represent 25% to 30% of total steady-state heat loss, plus significant transient thermal lag when warming up from unheated conditions."
      },
      {
        question: "When is a radiant tube heater recommended for a garage or workshop?",
        answer: "Radiant tube infrared heaters are ideal for high-ceiling shops (≥12 ft clear height) because they heat concrete floors, tools, and occupants directly without blowing air or stratifying heat at the ceiling. They require adequate ceiling clearance to combustibles per manufacturer listings."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "print_exported"]
  },
  {
    id: "combustion-air-calculator",
    name: "Combustion Air & Confined Space Sizer (NFPA 54 / IFGC)",
    pillar: "heating-systems",
    route: "/calculators/combustion-air-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "combustion air calculator",
    secondaryKeywords: [
      "nfpa 54 combustion air",
      "ifgc combustion air",
      "confined space combustion air",
      "furnace combustion air requirements",
      "gas appliance combustion air",
      "combustion air opening size",
      "combustion air louver sizing"
    ],
    primaryIntent: "High Commercial / Code Compliance",
    seoTitle: "Combustion Air Sizing Chart & Calculator: NFPA 54",
    metaDescription: "Evaluate mechanical room combustion air openings under NFPA 54 and IFGC reference methods, including standard 50 cu ft/1,000 BTU confined space checks.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "NFPA 54 & IFGC standard 50 cu ft per 1,000 BTU/hr confined space threshold test",
      "Multi-appliance gas input load accumulator (furnaces, boilers, water heaters, unit heaters)",
      "4 standard NFPA 54 combustion air methods (Indoor 2 openings, Outdoor vertical 2 openings, Outdoor horizontal 2 openings, Outdoor single opening)",
      "Louver free area derating (Metal 75% vs Wood 25% vs Custom %) and equivalent round duct diameter sizing",
      "Interactive SVG mechanical room visualizer with upper/lower air intake ducts and volume gauge",
    ],
    relatedCalculatorIds: ["furnace-size-calculator", "boiler-size-calculator", "kitchen-hood-cfm", "garage-heater-sizing"],
    standards: ["NFPA", "IFGC"],
    formulaVersion: "1.0.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Enter Nameplate Appliance Input Ratings",
        instruction: "Input the fuel input BTU/hr rating for all gas appliances in the space (furnace, water heater, boiler, unit heater).",
      },
      {
        stepNumber: 2,
        title: "Input Mechanical Room Enclosure Dimensions",
        instruction: "Enter the clear length, width, and ceiling height of the enclosed mechanical closet or utility room in feet.",
      },
      {
        stepNumber: 3,
        title: "Evaluate Confined vs. Unconfined Space Threshold",
        instruction: "Review the calculated room volume against the standard NFPA 54 / IFGC threshold (50 cu ft per 1,000 BTU/hr total input).",
      },
      {
        stepNumber: 4,
        title: "Select Code-Approved Combustion Air Method",
        instruction: "Choose between Indoor Air (2 openings to communicating space), Outdoor Vertical Ducts (2 openings), Outdoor Horizontal Ducts (2 openings), or Outdoor Single Opening.",
      },
      {
        stepNumber: 5,
        title: "Specify Louver Material or Manufacturer Free Area",
        instruction: "Select metal louvers (assumed 75% free area), wood louvers (assumed 25%), direct wire screen (100%), or enter a custom manufacturer free-area percentage.",
      },
      {
        stepNumber: 6,
        title: "Review Required Net Free Area & Gross Opening Dimensions",
        instruction: "Evaluate the required unobstructed net free area (sq in.) and corresponding gross louver opening dimensions.",
      },
      {
        stepNumber: 7,
        title: "Inspect Equivalent Circular Duct Diameters",
        instruction: "Check the equivalent geometric round duct diameter and standard commercial trade duct sizes for intake duct runs.",
      },
      {
        stepNumber: 8,
        title: "Verify Opening Locations & Clearances",
        instruction: "Ensure upper openings commence within 12 inches of the ceiling and lower openings commence within 12 inches of the floor per NFPA 54 / IFGC.",
      },
    ],
    faqs: [
      {
        question: "What is a confined space according to NFPA 54 / IFGC?",
        answer: "Under NFPA 54 Section 9.3 and IFGC Section 304, a space is classified as confined if its enclosed volume is less than 50 cubic feet per 1,000 BTU/hr of the total combined input rating of all fuel-burning appliances installed in that room (e.g. an 80,000 BTU furnace + 40,000 BTU water heater requires at least 6,000 cu ft)."
      },
      {
        question: "How do you size combustion air openings for indoor air?",
        answer: "When drawing combustion air from adjacent indoor spaces, NFPA 54 requires two permanent openings: one commencing within 12 inches of the top and one within 12 inches of the bottom of the enclosure. Each opening must have a minimum net free area of 1 sq in. per 1,000 BTU/hr of total appliance input, with a code minimum of 100 sq in. each."
      },
      {
        question: "Why do wood louvers require much larger openings than metal louvers?",
        answer: "Wood louvers have thicker slats and frames that obstruct airflow, typically providing only 20% to 25% net free area compared to approximately 75% for thin metal louvers. Gross opening dimensions with wood louvers must therefore be 4 times the required net free area."
      },
      {
        question: "What does NFPA 54 require for outdoor combustion air ducts?",
        answer: "For outdoor air via vertical ducts, NFPA 54 requires two openings sized at 1 sq in. net free area per 4,000 BTU/hr total input. For horizontal ducts penetrating exterior walls, the code requires 1 sq in. net free area per 2,000 BTU/hr total input for each opening."
      },
      {
        question: "What are the rules for the single outdoor opening method?",
        answer: "Under NFPA 54 §9.3.3.2 and IFGC §304.6.2, a single opening direct to the outdoors or through a vertical/horizontal duct must have a minimum net free area of 1 sq in. per 3,000 BTU/hr total input, commence within the top 12 inches of the space, and meet specified equipment clearances (1 inch sides/back, 6 inches front)."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "print_exported"]
  },

  // -------------------------------------------------------------
  // PILLAR 5: BUILDING SCIENCE & INSULATION
  // -------------------------------------------------------------
  {
    id: "effective-r-value-calculator",
    name: "Thermal Bridging & Effective R-Value Calculator",
    pillar: "building-science",
    route: "/calculators/effective-r-value-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "effective r value calculator",
    secondaryKeywords: [
      "whole wall r value",
      "thermal bridging calculator",
      "steel stud r value",
      "wood stud thermal bridging",
      "effective cavity r value",
      "whole wall u factor",
      "continuous insulation r value",
      "steel framing thermal performance"
    ],
    primaryIntent: "Technical / Building Science Calculation",
    seoTitle: "Effective R-Value & Thermal Bridging Calculator: Wood/Steel",
    metaDescription: "Estimate whole-wall effective R-value and assembly U-factor accounting for framing thermal bridging referencing ASHRAE 90.1 Appendix A and IECC.",
    categoryName: "Building Science",
    categoryRoute: "/building-science",
    features: [
      "Parallel-path isothermal planes solver for wood stud wall assemblies (16\" & 24\" O.C.)",
      "ASHRAE 90.1-2022 Normative Appendix A Table A9.2-2 cold-formed steel stud derating lookup matrix",
      "Continuous exterior insulation (ci) modeling across XPS, EPS, Polyiso, and Mineral Wool",
      "Reactive SVG assembly cross-section with live thermal bridging heat flux indicators",
      "1-Click CSV engineering report submittal export",
    ],
    relatedCalculatorIds: ["r-value-calculator", "heat-loss-calculator", "btu-calculator"],
    researchSlug: "student-lab-building-envelope-thermal-transmission",
    datasetUrl: "/datasets/framing-thermal-bridging-assembly-factors.csv",
    standards: ["ASHRAE", "IECC"],
    formulaVersion: "1.0.0",
    dataVersion: "2026.1",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    howToSteps: [
      {
        stepNumber: 1,
        title: "Select Structural Framing System",
        instruction: "Choose between Cold-Formed Steel Studs (ASHRAE 90.1 Appendix A method) or Wood Studs (Parallel-Path Isothermal Planes model).",
      },
      {
        stepNumber: 2,
        title: "Specify Stud Depth & On-Center Spacing",
        instruction: "Select framing member depth (2x4 / 3.5 in., 2x6 / 6.0 in., 2x8 / 8.0 in.) and spacing (16 in. O.C. or 24 in. O.C.).",
      },
      {
        stepNumber: 3,
        title: "Enter Nominal Cavity Insulation R-Value",
        instruction: "Select the product rated nominal cavity batt or blown insulation (e.g. R-13, R-19, R-21, R-25).",
      },
      {
        stepNumber: 4,
        title: "Configure Continuous Exterior Insulation (ci)",
        instruction: "Select continuous insulation material (Polyiso, XPS, EPS, Mineral Wool) and thickness to establish an unbroken exterior thermal break.",
      },
      {
        stepNumber: 5,
        title: "Review Effective Cavity R-Value & Thermal Derating",
        instruction: "Evaluate the bridged cavity resistance (R_eff_cavity) and percentage reduction caused by metal/wood stud heat conduction.",
      },
      {
        stepNumber: 6,
        title: "Compute Whole-Wall Assembly U-Factor & Effective R-Value",
        instruction: "Review the resulting whole-wall assembly U-factor (BTU/hr·ft²·°F) and overall effective assembly R-value (R_eff = 1 / U).",
      },
      {
        stepNumber: 7,
        title: "Compare Against Energy Code Prescriptive U-Factor Limits",
        instruction: "Compare the calculated whole-wall U-factor against prescriptive maximum U-factor benchmarks for your specific IECC / ASHRAE 90.1 climate zone.",
      },
      {
        stepNumber: 8,
        title: "Export Engineering Submittal Report",
        instruction: "Generate a formatted CSV calculation report detailing layer resistances, framing factors, and normative standard citations.",
      },
    ],
    faqs: [
      {
        question: "Why is the effective R-value of a steel stud wall lower than nominal cavity insulation?",
        answer: "Steel has a thermal conductivity over 300 times higher than wood (~314 BTU·in/hr·ft²·°F). Heat conducts rapidly through the steel stud flanges and web, bypassing the cavity insulation. Per ASHRAE 90.1 Appendix A Table A9.2-2, an R-13 fiberglass batt in a 3.5-inch steel stud at 16 inches on-center has an effective cavity resistance of only R-6.0—a 53.8% performance loss. An R-19 batt in a 6-inch steel stud drops to R-7.1 (a 62.6% loss)."
      },
      {
        question: "How does continuous insulation (ci) mitigate framing thermal bridging?",
        answer: "Continuous exterior insulation (such as rigid foam or mineral wool board) runs uninterrupted across the exterior faces of all framing members. Because it is unbroken by structural studs, it provides a full-plane thermal break that substantially reduces direct framing heat conduction, raising effective whole-wall R-value and lowering assembly U-factors to meet modern energy codes."
      },
      {
        question: "What is the formula for calculating whole-wall assembly U-factor?",
        answer: "For wood framing, the parallel-path equation is: U_assembly = (f_framing / R_framing_path) + (f_cavity / R_cavity_path). For cold-formed steel framing per ASHRAE 90.1 Appendix A, U_assembly = 1 / (R_base_layers + R_ci + R_eff_cavity), where R_eff_cavity is the empirically derived cavity resistance from Table A9.2-2."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "print_exported"]
  },
  {
    id: "r-value-calculator",
    name: "Insulation R-Value & U-Factor Calculator",
    pillar: "building-science",
    route: "/calculators/r-value-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "r value for insulation",
    secondaryKeywords: ["r value calculator", "u factor calculator", "thermal resistance calculator", "wall r value stack", "insulation u value"],
    primaryIntent: "Informational / Energy Code",
    seoTitle: "R-Value & U-Factor Insulation Calculator",
    metaDescription: "Build multi-layer wall, roof, and floor assemblies to calculate 1-D series R-value (R_stack) and overall U-factor with selected IECC reference benchmarks.",
    categoryName: "Building Science",
    categoryRoute: "/building-science",
    features: [
      "Dynamic multi-layer assembly builder (siding, continuous foam, sheathing, cavity batt/spray foam, drywall, air films)",
      "1-D series total assembly thermal resistance R_stack and overall U-factor (U = 1 / R_stack)",
      "Orientation-aware ASHRAE surface air film resistances (vertical walls, upward attic, downward crawlspace)",
      "IECC 2021 / 2024 prescriptive minimum benchmark comparisons across Climate Zones 1 to 8",
      "Interactive SVG cross-section visualizer showing thermal layers and indoor-to-outdoor temperature gradient",
      "Climate zone annual conductive heat transmission estimator (BTU/sq ft per year based on HDD65)",
    ],
    relatedCalculatorIds: ["effective-r-value-calculator", "heat-loss-calculator", "btu-calculator", "garage-heater-sizing"],
    researchSlug: "student-lab-building-envelope-thermal-transmission",
    oerModuleUrl: "/oer-modules/building-envelope-thermal-transmission-lab.html",
    datasetUrl: "/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.csv",
    standards: ["ASHRAE", "IECC"],
    formulaVersion: "1.1.0",
    dataVersion: "1.1.0",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How do you calculate 1-D series total assembly R-value and U-factor?",
        answer: "Total 1-D series thermal resistance sums all homogeneous material layers plus boundary surface air films: R_stack = sum(R_layer) + R_in_film + R_out_film. The 1-D U-factor is the exact mathematical reciprocal: U_stack = 1 / R_stack. For example, an assembly with R_stack = 41.52 hr·ft²·°F/BTU has a U-factor of 1 / 41.52 = 0.0241 BTU/hr·ft²·°F."
      },
      {
        question: "What is the difference between 1-D layer stack R-value and 2D effective whole-assembly R-value?",
        answer: "A 1-D layer stack calculates the thermal resistance through continuous, uninterrupted cross-sections. In wood and steel framing, studs create repeating thermal bridges where heat flows around cavity insulation. Whole-wall assembly performance must be calculated using 2D parallel-path methods to account for framing fraction and bridging."
      },
      {
        question: "Why are interior and exterior surface air films included in R-value calculations?",
        answer: "Thin boundary layers of stagnant or moving air adhere to building surfaces, providing measurable thermal resistance. Per ASHRAE Fundamentals Ch. 26, interior still air provides R-0.68 (vertical walls) and exterior 15 mph wind provides R-0.17, adding R-0.85 total surface air film resistance to wall stacks."
      },
      {
        question: "What are the IECC 2021/2024 prescriptive insulation requirements for residential walls?",
        answer: "Under IECC 2021/2024 Table R402.1.2, wood-framed walls in Climate Zones 4–5 require a minimum of R-20+5ci (R-20 cavity + R-5 continuous foam) or R-13+10ci (maximum assembly U-0.045). In attics and ceilings, IECC mandates R-49 to R-60."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "csv_exported"]
  },
  {
    id: "heat-loss-calculator",
    name: "Building Heat Loss & Infiltration Calculator",
    pillar: "building-science",
    route: "/calculators/heat-loss-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "heat loss calculator",
    secondaryKeywords: ["building heat loss calculator", "heat loss estimator", "home heat loss calculator", "heating load calculator", "infiltration heat loss", "envelope heat loss", "BTU/hr heat loss", "building heat loss estimator"],
    primaryIntent: "Technical / Envelope & Infiltration",
    seoTitle: "Building Heat Loss & Infiltration Calculator",
    metaDescription: "Estimate whole-building peak heat loss combining envelope conductive transmission (U * A * Delta T), slab perimeter F-factors, and air infiltration leakage.",
    categoryName: "Building Science",
    categoryRoute: "/building-science",
    features: [
      "Conductive transmission heat loss solver across walls, ceilings, windows, doors, and foundation slabs",
      "Slab-on-grade perimeter conduction modeling via linear F-factors (ASHRAE / ACCA)",
      "Air infiltration sensible heat loss modeling using natural air changes per hour (ACHnat) and CFM leakage",
      "Interactive SVG envelope heat flux visualizer and component percentage distribution",
      "1-Click CSV engineering report submittal export",
    ],
    relatedCalculatorIds: ["heat-pump-size-calculator", "heat-strip-size-calculator", "effective-r-value-calculator", "btu-calculator", "furnace-size-calculator"],
    researchSlug: "thermal-envelope-infiltration-building-heat-loss",
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.1.0",
    dataVersion: "1.1.0",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How is conductive envelope heat loss calculated?",
        answer: "Conductive heat loss is calculated using Fourier's heat transfer equation: Q = U * A * Delta T, where U is the surface assembly U-factor (1 / R_effective), A is net surface area in square feet, and Delta T is the difference between indoor setpoint and outdoor 99% design temperature."
      },
      {
        question: "How does air infiltration affect building heat loss?",
        answer: "Air infiltration heat loss is calculated using the sensible air equation: Q = 1.08 * CFM * Delta T. Airflow entering through envelope leakage is derived from building volume and natural air changes per hour (ACHnat = ACH50 / N-factor)."
      },
      {
        question: "What is the difference between preliminary heat loss and ACCA Manual J load calculation?",
        answer: "This calculator provides a preliminary whole-building screening estimate based on simplified geometric baselines. A formal ACCA Manual J calculation evaluates room-by-room boundary areas, directional solar heat gains, internal loads, and duct transmission to size equipment per ACCA Manual S."
      },
      {
        question: "How is slab-on-grade foundation heat loss modeled?",
        answer: "Slab foundation heat loss occurs primarily through the exposed slab edge perimeter. Per ASHRAE Fundamentals and ACCA Manual J Table 4A, slab loss is modeled as Q = F * Perimeter * Delta T, where F is the linear edge heat-loss factor (e.g., F-0.50 BTU/hr·ft·°F for uninsulated slab edges)."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked", "csv_exported"]
  },
  {
    id: "heat-strip-size-calculator",
    name: "Heat Pump Auxiliary Electric Heat Strip Sizing Calculator",
    pillar: "heating-systems",
    route: "/calculators/heat-strip-size-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "heat strip size calculator",
    secondaryKeywords: [
      "heat strip size in kw calculator",
      "auxiliary heat strip sizing",
      "heat pump backup heat calculator",
      "electric heat strip kw sizing",
      "heat pump supplemental heat calculator",
      "resistance heat strip calculator",
      "heat strip ampacity calculator"
    ],
    primaryIntent: "Technical / Sizing & Electrical Compliance",
    seoTitle: "Heat Pump Auxiliary Electric Heat Strip Sizing Calculator",
    metaDescription: "Estimate heat pump auxiliary electric heat strip deficit (kW), emergency backup sizing, NEC Article 424 circuit ampacity guidelines, and temperature rise.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Thermal heating deficit solver: kW = (Design Heat Loss - Delivered HP Output) / 3,412",
      "Smallest standard manufactured nominal element selection algorithm (4.8 to 20.0 kW)",
      "100% Emergency backup sizing mode covering peak building design heat loss",
      "NEC Article 424 continuous load calculation: Full Load Amps (FLA) and 125% MCA",
      "Multi-circuit branch partitioning reference for heavy resistance loads (>48A FLA)",
      "Blower airflow delivery and sensible temperature rise screening",
    ],
    relatedCalculatorIds: [
      "heat-pump-size-calculator",
      "heat-loss-calculator",
      "furnace-size-calculator",
      "ductulator",
      "cfm-calculator"
    ],
    standards: ["ASHRAE", "ACCA", "NFPA"],
    formulaVersion: "1.1.0",
    dataVersion: "1.1.0",
    lastEngineeringReview: "2026-10-01",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "unit-tested",
    faqs: [
      {
        question: "How do you calculate auxiliary heat strip size for a heat pump?",
        answer: "Auxiliary heat strips are sized to satisfy the thermal capacity deficit between the home's peak winter design heat loss and the heat pump's delivered heating output at local design conditions: Theoretical kW = (Design Heat Loss BTU/hr - Delivered HP Output BTU/hr) / 3,412.142. Standard nominal elements (e.g. 5.0, 7.5, 10.0 kW) are then selected to cover this deficit."
      },
      {
        question: "What is the difference between auxiliary heat and emergency heat?",
        answer: "Auxiliary heat operates automatically in tandem with the heat pump compressor when outdoor temperatures drop below the thermal balance point. Emergency heat locks out the compressor entirely (e.g. during mechanical failure) and relies 100% on electric resistance elements to heat the structure."
      },
      {
        question: "What electrical breaker and wire size does a 10 kW heat strip require?",
        answer: "A 10 kW electric heat strip at 240V draws 41.67A Full Load Amps (FLA). Under NEC Article 424.3(B), continuous space heating requires 125% ampacity: MCA = 41.67A * 1.25 = 52.08A. A standard installation typically references a 60A 2-pole breaker and 6 AWG copper conductor (75°C), but must always be confirmed against the air handler nameplate."
      },
      {
        question: "Why do larger heat strips (15 kW and 20 kW) require multi-circuit feeds?",
        answer: "NEC 424.22(B) limits individual branch circuits for electric resistance heating equipment to a maximum of 48A FLA (protected by a 60A overcurrent device). A 15 kW element draws 62.5A and a 20 kW element draws 83.3A, requiring the unit to be subdivided into multiple branch circuits per manufacturer nameplate specifications."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "csv_exported"]
  }
];

const enrichCalculatorGovernance = (c: CalculatorMeta): CalculatorMeta => ({
  ...c,
  author: c.author || "Miad S.",
  validationStatus:
    c.validationStatus || (c.status === "production" ? "partially-verified" : "pending-validation"),
  regulatoryJurisdictionScope: c.regulatoryJurisdictionScope || "Model (State Adopted)",
});

export const publishedCalculators = () =>
  calculatorRegistry
    .filter((c) => c.status === "production" || c.status === "beta")
    .map(enrichCalculatorGovernance);

export const getCalculatorById = (id: string) => {
  const calc = calculatorRegistry.find((c) => c.id === id);
  return calc ? enrichCalculatorGovernance(calc) : undefined;
};

export const getCalculatorsByPillar = (pillar: string) =>
  publishedCalculators().filter((c) => c.pillar === pillar);

