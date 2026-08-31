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
    secondaryKeywords: ["duct sizing calculator", "mcquay duct sizer", "air duct design calculator", "duct sizer"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "Ductulator — Online HVAC Duct Sizing Calculator | HVACLogic",
    metaDescription: "Free online ductulator for HVAC engineers. Size round, rectangular & oval ducts via equal friction (Colebrook-White). Real-time 2D visualizer.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Equal friction round diameter and velocity calculation",
      "Huebscher rectangular duct equivalence with aspect ratio locking",
      "Flexible duct installation sag and compression derating (0% to 30%)",
      "SMACNA acoustic noise limits and residential velocity alerts",
      "Real-time 2D Canvas cross-section with velocity gradient visualization",
    ],
    relatedCalculatorIds: ["flex-duct-cfm-chart", "cfm-calculator", "btu-calculator"],
    standards: ["ASHRAE", "SMACNA", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What friction rate should I use to size residential ductwork?",
        answer: "According to ACCA Manual D guidelines, standard residential supply ductwork is sized at a friction rate of 0.08 to 0.10 in. wg per 100 ft, while return trunks are typically sized at 0.05 to 0.08 in. wg for quieter airflow."
      },
      {
        question: "How do you calculate rectangular duct size from round duct diameter?",
        answer: "Huebscher's formula determines equivalent rectangular dimensions: De = 1.30 * (a * b)^0.625 / (a + b)^0.25, where 'a' and 'b' are rectangular duct width and height in inches."
      },
      {
        question: "Why does flexible duct have lower airflow capacity than sheet metal?",
        answer: "Flexible duct has a corrugated inner core and often suffers from installation sag or compression. Sags of 4% to 15% increase friction drop by 15% to 60% compared to smooth galvanized sheet metal."
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
    secondaryKeywords: ["hvac ductwork sizing chart", "duct sizing chart", "flex duct sizing", "cfm chart for duct"],
    primaryIntent: "Navigational / Field Lookup",
    seoTitle: "Flex Duct CFM Chart — 4\" to 20\" Sizing Guide | HVACLogic",
    metaDescription: "Interactive flexible duct CFM capacity chart for 4\" to 20\" round ducts. Compare airflow across 0.05–0.15\" wg friction rates with installation sag derating.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Interactive CFM capacity matrix for diameters 4\" through 20\"",
      "Simultaneous comparison across 0.05, 0.08, 0.10, and 0.15 in.wg friction rates",
      "Dynamic sag slider adjusting capacity for 0%, 4%, 15%, and 30% compression",
      "One-click printable 1-page PDF reference card for truck clipboards",
    ],
    relatedCalculatorIds: ["ductulator", "cfm-calculator"],
    standards: ["ACCA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How many CFM can a 6-inch flex duct handle?",
        answer: "A standard 6-inch flexible duct carries approximately 75 to 85 CFM at a 0.08 to 0.10 in. wg friction rate under proper installation tension (4% compression)."
      },
      {
        question: "How many CFM can an 8-inch flex duct handle?",
        answer: "An 8-inch flexible duct carries approximately 150 to 160 CFM at a 0.10 in. wg friction rate, making it suitable for larger bedrooms or living room supply runs."
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
    seoTitle: "HVAC CFM Calculator — Airflow & Duct Sizing | HVACLogic",
    metaDescription: "Calculate HVAC airflow (CFM) from duct size, air velocity (FPM), sensible heat load (1.08 × ΔT), or room ACH. Free client-side precision.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Sensible heat airflow method: CFM = BTU / (1.08 * Delta T)",
      "Velocity and duct cross-section method: CFM = Velocity * Area",
      "Room Air Changes per Hour (ACH) turnover calculator",
      "Cooling tonnage standard rule (350 to 450 CFM/ton)",
      "Direct 1-click workflow handoff to the Digital Ductulator",
    ],
    relatedCalculatorIds: ["ductulator", "btu-calculator", "ac-tonnage-calculator"],
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How do you calculate CFM from BTU and Delta T?",
        answer: "Use the sensible heat formula: CFM = Sensible BTU/hr / (1.08 * Delta T). For example, a 36,000 BTU cooling coil with a 20°F temperature drop requires CFM = 36,000 / (1.08 * 20) = 1,667 CFM."
      },
      {
        question: "What is the standard CFM per ton of air conditioning?",
        answer: "The nominal industry benchmark is 400 CFM per ton of cooling. In humid climates, systems are often set to 350 CFM/ton for enhanced dehumidification, while dry/arid climates use up to 450 CFM/ton."
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
    seoTitle: "Kitchen Range Hood CFM Calculator & Make-Up Air | HVACLogic",
    metaDescription: "Calculate required kitchen range hood CFM for gas and electric cooktops. Check mandatory IRC Section M1503.6 make-up air code requirements.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Gas cooktop BTU method (100 CFM per 10k BTU) vs electric linear width method",
      "Wall-mount vs island hood open-air capture penalty multiplier (1.30x)",
      "Equivalent duct length and static pressure friction estimation",
      "Automatic IRC M1503.6 make-up air code alerts for exhaust > 400 CFM",
      "Recommended round rigid duct diameter sizing (6\", 7\", 8\", 10\")",
    ],
    relatedCalculatorIds: ["ductulator", "cfm-calculator", "flex-duct-cfm-chart"],
    standards: ["HVI", "IRC", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How many CFM do I need for a gas range hood?",
        answer: "The Home Ventilating Institute (HVI) standard requires 100 CFM for every 10,000 BTU of total cooktop burner rating. For example, a 60,000 BTU gas stove requires at least 600 CFM."
      },
      {
        question: "When is make-up air legally required for a kitchen range hood?",
        answer: "Under International Residential Code (IRC) Section M1503.6, make-up air is legally mandatory whenever a kitchen exhaust hood operates above 400 CFM to prevent house depressurization and deadly backdrafting of carbon monoxide from water heaters and furnaces."
      },
      {
        question: "Why do island range hoods require more CFM than wall hoods?",
        answer: "Island hoods lack a back wall to contain rising thermal grease plumes and are exposed to 360-degree kitchen cross-drafts. Industry standards recommend 30% higher CFM and a canopy that overlaps the cooktop by 3 inches on each side."
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
    secondaryKeywords: ["total equivalent length hvac", "acca manual d friction rate", "available static pressure calculator", "duct fitting equivalent length"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "Duct Friction Loss & TEL Sizer — ACCA Manual D | HVACLogic",
    metaDescription: "Calculate ACCA Manual D Total Equivalent Length (TEL), Available Static Pressure (ASP), and Design Friction Rate (FR) for residential HVAC duct design.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "ACCA Manual D Appendix 3 fitting accumulator (elbows, takeoffs, dampers, boots)",
      "Available Static Pressure (ASP) solver accounting for wet coils, MERV filters, and registers",
      "Exact Design Friction Rate (FR = (ASP * 100) / TEL) in.wg per 100 ft",
      "Interactive SVG duct system schematic with static pressure drop gradient",
      "Optimal vs High-Resistance fitting warnings (e.g. mitered no-vane elbow penalties)",
    ],
    relatedCalculatorIds: ["ductulator", "flex-duct-cfm-chart", "cfm-calculator"],
    standards: ["ACCA", "ASHRAE", "SMACNA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is Total Equivalent Length (TEL) in duct design?",
        answer: "Total Equivalent Length (TEL) represents the total aerodynamic resistance of the longest supply and return duct runs combined, converting fitting turbulence into equivalent feet of straight ductwork: TEL = Straight Length + Sum of Fitting Equivalent Lengths."
      },
      {
        question: "How do you calculate Available Static Pressure (ASP)?",
        answer: "Available Static Pressure is the static pressure remaining to push air through ductwork after deducting pressure drops across system components: ASP = Blower TESP - (Coil Drop + Filter Drop + Register Drops + Device Drops)."
      },
      {
        question: "What is a good design friction rate for residential ductwork?",
        answer: "Under ACCA Manual D guidelines, optimal residential friction rates fall between 0.06 and 0.12 in. wg per 100 ft. A friction rate below 0.05 requires excessively oversized ductwork, while above 0.15 causes high air velocity hiss and noise."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
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
    seoTitle: "MERV Filter Pressure Drop & Sizing Tool | HVACLogic",
    metaDescription: "Calculate HVAC air filter face velocity (FPM) and static pressure drops across 1-inch, 2-inch, and 4-inch deep MERV 8 to MERV 16 pleated media.",
    categoryName: "Airflow & Ducts",
    categoryRoute: "/airflow-ducts",
    features: [
      "Face Velocity (FPM = CFM / Area) compliance checks against ASHRAE 52.2 and ACCA Manual D",
      "Initial clean static pressure drop and loaded filter resistance curves",
      "Media depth derating: 1-inch vs 2-inch vs 4-inch deep pleats (cuts pressure drop up to 62%)",
      "Single filter slot vs multi-grille return configurations (e.g. dual return grilles)",
      "Interactive SVG air intake filter visualizer with face velocity gauge and pressure drop bar",
    ],
    relatedCalculatorIds: ["duct-friction-loss-calculator", "cfm-calculator", "ductulator"],
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is the maximum recommended face velocity for an HVAC air filter?",
        answer: "For standard 1-inch residential pleated filters, ACCA Manual D and ASHRAE recommend a maximum face velocity of 300 FPM (Feet Per Minute). Deep pleated 4-inch or 5-inch media filters can safely handle up to 450 to 500 FPM without excessive static pressure drop or particle blow-through."
      },
      {
        question: "Does a 1-inch MERV 13 filter restrict airflow and damage furnaces?",
        answer: "Yes, when installed in standard 1-inch filter grilles at high face velocities (>350 FPM), a 1-inch MERV 13 filter often creates 0.25 to 0.35 in. wg of static pressure drop on its own. This consumes over 50% of the entire blower static pressure budget, causing ECM blower motor overheating, limit switch tripping, and frozen evaporator coils."
      },
      {
        question: "Why does a 4-inch deep media filter have lower pressure drop than a 1-inch filter?",
        answer: "A 4-inch deep filter has up to 4 times more total pleated media surface area folded inside the same frame opening. This dramatically lowers the true air velocity passing through the filter fibers, cutting static pressure drop by up to 62% while lasting 6 to 12 months."
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
    seoTitle: "BTU Calculator & AC Heat Load (Manual J Sizing) | HVACLogic",
    metaDescription: "Estimate whole-home and room heating and cooling loads (BTU/hr and Tons) based on square footage, climate zone, insulation quality, and window exposure.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Sensible and latent cooling load breakdown (BTU/hr and Tons)",
      "Climate zone design temperature adjustments (Zones 1 through 7)",
      "Envelope insulation quality (R-13 to R-21+ walls, R-30 to R-60 ceilings)",
      "Window solar heat gain and internal occupant/appliance loads",
      "Interactive SVG load distribution donut chart",
    ],
    relatedCalculatorIds: ["ac-tonnage-calculator", "cfm-calculator", "mini-split-sizing"],
    standards: ["ACCA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How many BTUs do I need per square foot?",
        answer: "As a broad rule of thumb, residential spaces require approximately 20 to 30 BTU/hr per square foot for cooling, depending on climate zone, ceiling height, and insulation quality."
      },
      {
        question: "How many BTUs are in 1 Ton of air conditioning?",
        answer: "1 Ton of refrigeration equals exactly 12,000 BTU/hr of cooling capacity."
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
    seoTitle: "AC Tonnage Calculator & Cooling Capacity Sizer | HVACLogic",
    metaDescription: "Match room and home square footage to required air conditioning tonnage (1.5 to 5.0 Tons) with regional climate adjustments and SEER2 operating cost modeling.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Square footage to AC tonnage matching (100 to 6,000 sq ft)",
      "Regional climate multipliers (Mild, Moderate, Hot/Humid, Extreme Desert)",
      "SEER2 operating cost estimator comparing 10-SEER to 20+ SEER2 inverters",
      "Nominal airflow CFM requirement matching (400 CFM/ton)",
    ],
    relatedCalculatorIds: ["ac-model-decoder", "btu-calculator", "cfm-calculator"],
    standards: ["ACCA", "AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What size AC unit do I need for a 2,000 sq ft house?",
        answer: "In a moderate climate with average insulation, a 2,000 sq ft house typically requires a 3.0 to 3.5 Ton AC system (36,000 to 42,000 BTU/hr)."
      },
      {
        question: "What happens if an AC unit is oversized?",
        answer: "An oversized AC cools the space too quickly and shuts off before running long enough to remove indoor humidity, causing a cold, clammy indoor environment and premature compressor wear."
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
    secondaryKeywords: ["how to find tonnage of ac unit", "hvac model number decoder", "ac model decoder"],
    primaryIntent: "High Commercial / Nameplate Decoder",
    seoTitle: "AC Model Decoder — Tonnage & SEER Lookup | HVACLogic",
    metaDescription: "Decode Carrier, Trane, Lennox, Goodman, Rheem & York model numbers. Instant nominal tonnage, SEER rating, manufacture date, and nominal airflow CFM.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Regex parser for Carrier, Bryant, Trane, American Standard, Lennox, Goodman, Amana, Rheem, Ruud, and York",
      "Instant nominal capacity detection (18 = 1.5T, 24 = 2.0T, 30 = 2.5T, 36 = 3.0T, 42 = 3.5T, 48 = 4.0T, 60 = 5.0T)",
      "Recommended nominal airflow CFM output",
      "Interactive visual guide for locating condenser and air handler data plates",
    ],
    relatedCalculatorIds: ["ac-tonnage-calculator", "cfm-calculator"],
    standards: ["AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
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
    seoTitle: "Mini-Split Sizing — Multi-Zone Inverter | HVACLogic",
    metaDescription: "Size multi-zone ductless mini-split systems. Match room heat loads to indoor wall/cassette heads (6k to 24k BTU) and outdoor multi-port condensers.",
    categoryName: "Cooling & Loads",
    categoryRoute: "/cooling-loads",
    features: [
      "Dynamic multi-room builder for up to 6 custom heating & cooling zones",
      "Individual indoor head matching (6k, 9k, 12k, 18k, 24k BTU)",
      "Outdoor multi-port inverter condenser sizing (18k to 48k BTU / 1.5 to 4.0 Tons)",
      "Inverter diversity & over-subscription ratio gauge (100%–130% optimal connected capacity)",
      "Live interactive multi-room floor plan lineset schematic visualizer",
    ],
    relatedCalculatorIds: ["btu-calculator", "ac-tonnage-calculator", "heat-pump-size-calculator"],
    standards: ["AHRI", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What size mini-split indoor head do I need for a bedroom?",
        answer: "A standard bedroom (150 to 250 sq ft) typically requires a 6,000 or 9,000 BTU indoor head unit. Master bedrooms or rooms with high solar heat gain often require a 12,000 BTU head."
      },
      {
        question: "What is mini-split inverter over-subscription (diversity ratio)?",
        answer: "Inverter multi-split systems allow total indoor head capacity to exceed outdoor condenser capacity by 100% to 130% (e.g. 36,000 BTU of indoor heads connected to a 30,000 BTU outdoor unit). Because individual rooms peak at different times of day, the modulating inverter balances refrigerant delivery dynamically."
      },
      {
        question: "Can I mix wall-mounted heads and ceiling cassettes on one outdoor condenser?",
        answer: "Yes, multi-port outdoor condensers support any mix of indoor unit types—including high-wall units, 4-way ceiling cassettes, floor consoles, and concealed ducted units."
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
    seoTitle: "Superheat & Subcooling Charging Sizer | HVACLogic",
    metaDescription: "Calculate target superheat (fixed orifice) and target subcooling (TXV) across R-454B, R-32, R-410A, and R-22 with EPA fault isolation guidance.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Dual mode: Fixed Orifice Target Superheat & TXV Target Subcooling",
      "NIST REFPROP-referenced PT data for R-454B, R-32, R-410A, R-22, R-134a, R-404A, R-407C",
      "Zeotropic glide handling (discrete Bubble/Dew curves for R-454B and R-407C)",
      "Color-coded diagnostic indicator with investigative action checklists",
      "A2L refrigerant safety callouts and EPA Section 608 boundary checks",
    ],
    relatedCalculatorIds: ["pt-chart", "psychrometric-calculator"],
    standards: ["EPA", "AHRI", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How do you calculate target superheat on a fixed orifice system?",
        answer: "The standard EPA/ACCA equation is: Target Superheat = (3 * Indoor Wet Bulb - Outdoor Dry Bulb - 80) / 2. This formula is valid when indoor wet bulb is 50°F to 76°F and outdoor dry bulb is 55°F to 115°F."
      },
      {
        question: "How do you calculate subcooling on a TXV system?",
        answer: "Actual Subcooling = Saturation Temperature (from liquid pressure) - Actual Liquid Line Temperature. Compare this against the manufacturer data plate target (typically 10°F ± 3°F)."
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
    primaryKeyword: "pt chart",
    secondaryKeywords: ["refrigerant pt chart", "r410a pt chart", "r32 pt chart", "r454b pt chart"],
    primaryIntent: "Navigational / Field Lookup",
    seoTitle: "Refrigerant PT Chart — R-454B, R-32 & R-410A | HVACLogic",
    metaDescription: "Interactive digital Pressure-Temperature chart for R-454B, R-32, R-410A, R-22 and 30+ refrigerants. Instant bubble and dew point saturation curves.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Interactive pressure slider (0 to 650 psig) with instant saturation temperature output",
      "Support for 2025/2026 EPA A2L transition refrigerants (R-454B Opteon XL41, R-32)",
      "Discrete Bubble Point (liquid) and Dew Point (vapor) curves for zeotropic blends",
      "Unit toggle: psig, psia, bar, kPa <-> °F, °C",
    ],
    relatedCalculatorIds: ["superheat-subcooling-calculator", "psychrometric-calculator"],
    standards: ["NIST", "EPA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is the boiling point of R-454B at atmospheric pressure?",
        answer: "R-454B has a normal boiling point of approximately -59.0°F (-50.6°C) at sea level (14.696 psia)."
      },
      {
        question: "What is temperature glide in zeotropic refrigerants like R-454B and R-407C?",
        answer: "Temperature glide is the temperature difference between the bubble point (where evaporation starts) and dew point (where condensation finishes) at a constant pressure."
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
    secondaryKeywords: ["psychrometric chart calculator", "moist air properties", "dew point calculator", "wet bulb calculator", "enthalpy calculator"],
    primaryIntent: "Engineering / Psychrometrics",
    seoTitle: "Psychrometric Calculator & Moist Air Properties | HVACLogic",
    metaDescription: "Calculate moist air thermodynamic properties from any 2 inputs (Dry Bulb, Wet Bulb, Dew Point, RH, Enthalpy) with altitude barometric compensation.",
    categoryName: "Field Diagnostics",
    categoryRoute: "/field-diagnostics",
    features: [
      "Calculates complete thermodynamic state point from any 2 input parameters (DB + RH, DB + WB, DB + DewPoint)",
      "Barometric pressure adjustment based on altitude elevation (-1,000 to 15,000 ft)",
      "Outputs: Humidity Ratio (grains/lb), Enthalpy (BTU/lb), Specific Volume, Air Density, and Vapor Pressure",
      "Interactive SVG psychrometric state chart with saturation curve and comfort zone boundary",
      "ASHRAE Standard 55 thermal comfort zone classification",
    ],
    relatedCalculatorIds: ["superheat-subcooling-calculator", "cfm-calculator", "pt-chart"],
    standards: ["ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How do you calculate dew point from dry bulb and relative humidity?",
        answer: "First calculate the actual water vapor pressure: Pv = (RH / 100) * Pws(Tdb), where Pws is saturation vapor pressure via the ASHRAE Hyland-Wexler equation. Then calculate dew point temperature: Tdp = 100.45 + 33.193 * ln(Pv) + 2.319 * [ln(Pv)]^2."
      },
      {
        question: "Why is enthalpy important in HVAC cooling calculations?",
        answer: "Specific enthalpy (h) measures the total heat content (sensible heat of dry air + latent heat of moisture) per pound of dry air (BTU/lb). Total air conditioner cooling capacity is directly calculated by multiplying air mass flow rate by total enthalpy drop across the cooling coil: Q_total = 4.5 * CFM * Delta_h."
      },
      {
        question: "How does altitude affect psychrometric air properties?",
        answer: "At higher elevations, barometric atmospheric pressure drops (e.g. 12.1 psia in Denver vs 14.7 psia at sea level). Lower pressure expands air volume, decreases air density, and increases the humidity ratio for the same relative humidity."
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
      "additional refrigerant calculator",
      "r454b charge calculator",
      "r32 line set charge",
    ],
    primaryIntent: "Field Installation / Initial Weigh-In",
    seoTitle: "Refrigerant Line Set Charge Calculator | HVACLogic",
    metaDescription: "Estimate the manufacturer-specified initial refrigerant weigh-in adjustment for R-454B, R-32, and R-410A line sets using sourced OEM profiles.",
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
    standards: ["EPA", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-20",
    requiresReferenceDataset: true,
    offlineEligible: true,
    testStatus: "validated",
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
    secondaryKeywords: ["heat pump sizing", "cold climate heat pump sizing", "heat pump balance point", "heat pump vs heat loss", "auxiliary heat strip sizing"],
    primaryIntent: "Commercial / Electrification",
    seoTitle: "Heat Pump Sizing & Thermal Balance Point | HVACLogic",
    metaDescription: "Calculate heat pump thermal balance point, cold-climate low-ambient heating capacity (47°F, 17°F, -5°F), and auxiliary electric backup heat strip sizing.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Thermal balance point intersection between building heat loss and heat pump output",
      "Low-ambient inverter heating derate curves (Cold-Climate ccASHP vs Standard Inverter vs Single-Stage)",
      "Auxiliary electric backup heat strip requirement sizing (kW)",
      "ACCA Manual S cooling oversizing compliance verification",
      "Interactive 10-point temperature performance curve matrix",
    ],
    relatedCalculatorIds: ["furnace-size-calculator", "btu-calculator", "ac-tonnage-calculator"],
    standards: ["ASHRAE", "AHRI", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is a heat pump thermal balance point?",
        answer: "The thermal balance point is the exact outdoor temperature where your home's heat loss equals the maximum heating capacity of the heat pump. Below this temperature, the heat pump can no longer heat the home alone and supplemental auxiliary heat strips must turn on."
      },
      {
        question: "How do cold-climate heat pumps work below 0°F?",
        answer: "Cold-climate air-source heat pumps (ccASHP) use advanced variable-speed inverter compressors, flash vapor injection, and larger outdoor coils to maintain 75% to 100% of their rated heating capacity down to -5°F (-20°C)."
      },
      {
        question: "What size auxiliary heat strip do I need for my heat pump?",
        answer: "Auxiliary heat strips are sized to cover the exact heating deficit between the building's heat loss at winter design temperature and the heat pump's output: kW = (Design Heat Loss - Heat Pump Output @ Design) / 3,412.14."
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
    secondaryKeywords: ["furnace btu calculator", "what size furnace do i need", "gas furnace sizing", "afue calculator"],
    primaryIntent: "Commercial / Heating Replacement",
    seoTitle: "Furnace Sizing Calculator — AFUE & BTU | HVACLogic",
    metaDescription: "Calculate required furnace input and output BTU based on home square footage, climate zone, and AFUE efficiency (80% vs 96% condensing).",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Input vs. Output BTU calculation with 80% to 98% AFUE efficiency selector",
      "5-zone regional US climate load modeling (30 to 60 BTU/sq ft)",
      "Envelope modifiers for ceiling height (8ft to 24ft) and insulation grades",
      "Nominal furnace model matching (40k, 60k, 80k, 100k, 120k BTU) and cabinet width",
      "Required blower airflow CFM verification (CFM = Output / (1.08 * Delta T))",
    ],
    relatedCalculatorIds: ["btu-calculator", "cfm-calculator", "ac-tonnage-calculator"],
    standards: ["ACCA", "AHRI", "DOE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is the difference between furnace input and output BTU?",
        answer: "Input BTU is the total fuel energy consumed per hour at the burners, while Output BTU is the usable heat delivered into the home after combustion efficiency losses: Output BTU = Input BTU * (AFUE / 100)."
      },
      {
        question: "What size furnace do I need for a 2,000 sq ft house?",
        answer: "In a moderate climate (Zone 3/4), a 2,000 sq ft home requires approximately 80,000 to 100,000 Output BTU. With a 96% high-efficiency condensing furnace, an 80,000 or 100,000 Input BTU unit is typically recommended."
      },
      {
        question: "What is the difference between 80% and 96% AFUE furnaces?",
        answer: "An 80% AFUE furnace loses 20% of fuel energy up a metal B-vent chimney. A 96% condensing furnace extracts latent heat from exhaust gases using a secondary stainless steel heat exchanger, venting cooler gases through PVC pipe and saving 15% to 20% on heating bills."
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
    secondaryKeywords: ["hydronic heating calculator", "baseboard sizing", "radiator edr calculator", "boiler btu calculator", "cast iron radiator btu"],
    primaryIntent: "High Commercial / Hydronics",
    seoTitle: "Boiler Sizing Calculator — Baseboard & EDR | HVACLogic",
    metaDescription: "Size residential hydronic heating boilers based on fin-tube baseboard linear footage, cast-iron radiator EDR, and indirect domestic hot water priority.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "Multi-method sizing engine: Fin-Tube Baseboard linear feet, Cast-Iron Radiator EDR, or Heat Loss (BTU/hr)",
      "Hot water vs low-pressure steam rating conversion (150 vs 240 BTU/hr per sq ft EDR)",
      "Domestic Hot Water (DHW) indirect tank pickup with priority zone controller override",
      "I=B=R and AHRI Net Rating piping/pickup factors (1.15x water / 1.33x steam)",
      "Interactive SVG hydronic piping loop schematic with boiler, expansion tank, and circulator",
      "1-Click CSV engineering submittal export",
    ],
    relatedCalculatorIds: ["heat-loss-calculator", "furnace-size-calculator", "heat-pump-size-calculator"],
    standards: ["ASHRAE", "AHRI"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How many BTUs does one linear foot of fin-tube baseboard produce?",
        answer: "Standard residential copper fin-tube baseboard produces approximately 550 to 600 BTU/hr per linear foot when operating at 180°F average water temperature. At lower condensing temperatures (e.g. 140°F), heat output drops to approximately 330 BTU/hr per linear foot."
      },
      {
        question: "What is Radiator EDR (Equivalent Direct Radiation)?",
        answer: "EDR measures the heating surface area of cast-iron radiators. In hydronic hot water systems (170°F–180°F), 1 sq ft of EDR produces 150 BTU/hr. In low-pressure steam systems (215°F), 1 sq ft of EDR produces 240 BTU/hr."
      },
      {
        question: "How does DHW Priority affect boiler sizing?",
        answer: "With a Priority Zone Relay, the boiler temporarily shuts off space heating circulators when the indirect water heater calls for heat. Because domestic hot water calls typically last under 15 minutes, the home does not cool down and the boiler does NOT require extra BTU capacity for domestic water."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
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
    seoTitle: "Garage Heater Sizing — Shop BTU & kW Sizer | HVACLogic",
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
    relatedCalculatorIds: ["heat-loss-calculator", "furnace-size-calculator", "boiler-size-calculator"],
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What size heater do I need for a 2-car garage?",
        answer: "A standard 2-car garage (approx. 480 to 576 sq ft) with average insulation in a cold climate typically requires a 30,000 to 45,000 BTU gas unit heater or a 5.0 to 7.5 kW electric heater (requiring a dedicated 30A to 40A 240V circuit)."
      },
      {
        question: "Is a gas unit heater or electric heater better for a garage?",
        answer: "Gas unit heaters (e.g. Modine Hot Dawg or Mr. Heater Big Maxx) have lower operating costs in cold climates and heat up uninsulated spaces much faster. Electric unit heaters have lower upfront installation costs (no gas line or chimney venting needed) but require heavy 240V electrical service."
      },
      {
        question: "Why do uninsulated concrete garage slabs cause high heat loss?",
        answer: "Concrete has very low thermal resistance (R-0.08 per inch). Uninsulated slab edges in contact with frozen ground act as a giant thermal heat sink, accounting for up to 35% of total winter garage heat loss."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
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
    secondaryKeywords: ["nfpa 54 combustion air", "confined space combustion air", "furnace combustion air requirements", "water heater combustion air opening"],
    primaryIntent: "High Commercial / Code Compliance",
    seoTitle: "Combustion Air Sizer — NFPA 54 & IFGC Spaces | HVACLogic",
    metaDescription: "Size mechanical room combustion air openings per NFPA 54 and IFGC. Instant 50 cu ft/1,000 BTU confined space test and indoor/outdoor louver duct sizing.",
    categoryName: "Heating Systems",
    categoryRoute: "/heating-systems",
    features: [
      "NFPA 54 & IFGC standard 50 cu ft per 1,000 BTU/hr confined space threshold test",
      "Multi-appliance gas input load accumulator (furnaces, boilers, water heaters, unit heaters)",
      "4 standard NFPA 54 combustion air methods (Indoor 2 openings, Outdoor vertical 2 openings, Outdoor horizontal 2 openings, Outdoor single opening)",
      "Louver free area derating (Metal 75% vs Wood 25%) and round duct diameter sizing",
      "Interactive SVG mechanical room visualizer with upper/lower air intake ducts and volume gauge",
    ],
    relatedCalculatorIds: ["furnace-size-calculator", "boiler-size-calculator", "garage-heater-sizing"],
    standards: ["NFPA", "IFGC", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "What is a confined space according to NFPA 54 / IFGC?",
        answer: "A confined space has an enclosed volume less than 50 cubic feet per 1,000 BTU/hr of the total combined input rating of all fuel-burning appliances installed in that room (e.g. an 80,000 BTU furnace + 40,000 BTU water heater requires at least 6,000 cu ft)."
      },
      {
        question: "How do you size combustion air openings for indoor air?",
        answer: "When drawing combustion air from adjacent indoor spaces, NFPA 54 requires two permanent openings: one within 12 inches of the top and one within 12 inches of the bottom of the enclosure. Each opening must have a minimum net free area of 1 sq in. per 1,000 BTU/hr (never less than 100 sq in. each)."
      },
      {
        question: "Why do wood louvers require much larger openings than metal louvers?",
        answer: "Wooden louvers have thicker slats that block airflow, providing only 20% to 25% net free area compared to 75% for thin metal louvers. Therefore, gross opening dimensions with wood louvers must be 4 times larger than the calculated net free area."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  },

  // -------------------------------------------------------------
  // PILLAR 5: BUILDING SCIENCE & INSULATION
  // -------------------------------------------------------------
  {
    id: "r-value-calculator",
    name: "Insulation R-Value & U-Factor Calculator",
    pillar: "building-science",
    route: "/calculators/r-value-calculator",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "r value for insulation",
    secondaryKeywords: ["r value calculator", "u factor calculator", "thermal resistance", "wall r value", "attic insulation r value"],
    primaryIntent: "Informational / Energy Code",
    seoTitle: "R-Value & U-Factor Insulation Calculator | HVACLogic",
    metaDescription: "Build multi-layer wall, roof, and floor assemblies to calculate total R-value (R-total) and overall U-factor with IECC 2021/2024 climate zone compliance checks.",
    categoryName: "Building Science",
    categoryRoute: "/building-science",
    features: [
      "Dynamic multi-layer assembly builder (siding, continuous foam, sheathing, cavity batt/spray foam, drywall, air films)",
      "Total assembly thermal resistance R-total and overall U-factor (U = 1 / R_total)",
      "IECC 2021 / 2024 Energy Code prescriptive minimum compliance checks (Climate Zones 1 to 7)",
      "Interactive SVG cross-section visualizer showing thermal textures and indoor-to-outdoor temperature gradient",
      "Annual heat loss transmission estimator (BTU/sq ft per year)",
    ],
    relatedCalculatorIds: ["btu-calculator", "furnace-size-calculator", "heat-pump-size-calculator"],
    standards: ["IECC", "ASHRAE"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How do you convert insulation R-value to U-factor?",
        answer: "U-factor is the exact mathematical reciprocal of total assembly R-value: U = 1 / R_total. For example, an R-20 wall assembly has an overall U-factor of 1 / 20 = 0.050 BTU/hr·ft²·°F. Lower U-factors mean better thermal insulation."
      },
      {
        question: "What is the difference between cavity insulation and continuous insulation (ci)?",
        answer: "Cavity insulation sits between wood or steel studs (subject to thermal bridging through the studs). Continuous insulation (ci) runs uninterrupted across structural members (like exterior polyiso or XPS foam boards), preventing thermal bridging and drastically lowering overall assembly U-factor."
      },
      {
        question: "What R-value is required by IECC 2021/2024 energy codes?",
        answer: "For residential exterior walls in northern Climate Zones 4–8, IECC 2021/2024 requires a minimum of R-20+5ci (R-20 cavity + R-5 continuous foam) or R-13+10ci. In attics and ceilings, IECC mandates R-49 to R-60."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
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
    secondaryKeywords: ["building heat loss calculator", "heat loss estimator", "home heat loss calculator", "conductive heat loss"],
    primaryIntent: "Technical / Envelope & Infiltration",
    seoTitle: "Building Heat Loss & Infiltration Sizer | HVACLogic",
    metaDescription: "Calculate whole-building peak heat loss combining envelope conductive transmission (U * A * Delta T) and blower door air infiltration leakage.",
    categoryName: "Building Science",
    categoryRoute: "/building-science",
    features: [
      "Conductive transmission heat loss solver across walls, ceilings, windows, doors, and foundation slabs",
      "Air infiltration heat loss modeling using natural air changes per hour (ACHnat) and CFM leakage",
      "Interactive SVG heat loss donut chart and envelope component percentage distribution",
      "Heating equipment sizing recommendations (Furnace BTU/hr and Heat Pump Tonnage)",
      "1-Click CSV engineering report submittal export",
    ],
    relatedCalculatorIds: ["r-value-calculator", "btu-calculator", "furnace-size-calculator", "heat-pump-size-calculator"],
    standards: ["ASHRAE", "ACCA"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      {
        question: "How is conductive envelope heat loss calculated?",
        answer: "Conductive heat loss follows Fourier's law of thermal conduction: Q = U * A * Delta T, where U is the assembly U-factor (1 / R-value), A is surface area in square feet, and Delta T is the indoor-to-outdoor temperature difference."
      },
      {
        question: "How does air infiltration affect building heat loss?",
        answer: "Infiltration heat loss is calculated as Q = 1.08 * CFM * Delta T. In older unsealed homes (>10 ACH50), cold air infiltration can represent 30% to 45% of total winter heating demand."
      },
      {
        question: "What is the difference between whole-building heat loss and heating equipment capacity?",
        answer: "Heat loss is the exact rate of thermal energy leaving the structure under 99% design weather conditions. Heating equipment (furnaces or heat pumps) is typically sized with a 15% to 25% safety margin above peak heat loss (ACCA Manual S)."
      }
    ],
    analyticsEvents: ["calculator_started", "result_generated", "preset_selected", "share_clicked"]
  }
];

export const publishedCalculators = () =>
  calculatorRegistry.filter((c) => c.status === "production" || c.status === "beta");

export const getCalculatorById = (id: string) =>
  calculatorRegistry.find((c) => c.id === id);

export const getCalculatorsByPillar = (pillar: string) =>
  publishedCalculators().filter((c) => c.pillar === pillar);
