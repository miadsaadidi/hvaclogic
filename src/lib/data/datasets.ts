export interface DatasetVariable {
  name: string;
  type: "string" | "number" | "boolean";
  unit?: string;
  description: string;
}

export interface DatasetRepository {
  platform: "figshare" | "huggingface" | "dataverse" | "archive" | "zenodo";
  name: string;
  url: string;
  doi?: string;
}

export interface CompanionLink {
  name: string;
  url: string;
  description?: string;
}

export interface BenchmarkDataset {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  methodology: string;
  primaryDoi?: string;
  secondaryDoi?: string;
  publicationDate: string;
  lastUpdated: string;
  recordCount: number;
  filename: string;
  fileSizeBytes: number;
  jsonFilename?: string;
  jsonFileSizeBytes?: number;
  format: "CSV" | "CSV / JSON";
  license: string;
  licenseName: string;
  governingStandards: string[];
  companionCalculators: CompanionLink[];
  companionResearch: CompanionLink[];
  repositories: DatasetRepository[];
  variables: DatasetVariable[];
  previewRows: Record<string, string | number | boolean>[];
}

export const BENCHMARK_DATASETS: BenchmarkDataset[] = [
  {
    slug: "ashrae-hyland-wexler-psychrometric-benchmark",
    title: "ASHRAE Hyland-Wexler Moist Air Psychrometric Benchmark Dataset",
    subtitle: "420 thermodynamic state points tabulated across sea-level and elevated altitudes.",
    seoTitle: "ASHRAE Hyland-Wexler Psychrometric Benchmark Dataset (420 Points)",
    seoDescription: "Open benchmark dataset of 420 thermodynamic psychrometric state points computed via ASHRAE Hyland-Wexler formulations across sea level to 5,000 ft altitude.",
    description: "Tabular engineering dataset providing 420 deterministic thermodynamic state points computed via the ASHRAE Hyland-Wexler formulation. The dataset tabulates dry-bulb temperature, relative humidity, atmospheric pressure, water vapor saturation pressure, dew point, numerical wet-bulb temperature, humidity ratio, specific enthalpy, specific volume, and moist air density.",
    methodology: "Computed using pure client-side TypeScript formulations of the ASHRAE Hyland-Wexler equations (ASHRAE Fundamentals Chapter 1). Wet-bulb temperatures are solved numerically via Newton-Raphson energy-balance iteration to an absolute enthalpy tolerance of 1e-6 BTU/lb. Saturation pressures are evaluated against pure liquid water (0°C to 200°C) and ice (-100°C to 0°C) boundary relations.",
    primaryDoi: "10.6084/m9.figshare.33456928",
    publicationDate: "2026-09-07",
    lastUpdated: "2026-09-07",
    recordCount: 420,
    filename: "hvaclogic_ashrae_hyland_wexler_psychrometric_benchmark.csv",
    fileSizeBytes: 40977,
    format: "CSV",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "ASHRAE Handbook - Fundamentals (Chapter 1, Psychrometrics)",
      "ASHRAE Standard 55-2023 (Thermal Environmental Conditions for Human Occupancy)",
      "ISO 7730 (Ergonomics of the Thermal Environment)"
    ],
    companionCalculators: [
      {
        name: "Interactive Psychrometric Chart Calculator",
        url: "/calculators/psychrometric-calculator",
        description: "Solve any thermodynamic state point from two atmospheric variables and barometric pressure."
      }
    ],
    companionResearch: [
      {
        name: "Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics",
        url: "/research/ashrae-hyland-wexler-moist-air-psychrometrics",
        description: "Technical whitepaper detailing the mathematical formulations and numerical energy-balance solvers."
      }
    ],
    repositories: [
      {
        platform: "figshare",
        name: "Figshare Data Repository",
        url: "https://doi.org/10.6084/m9.figshare.33456928",
        doi: "10.6084/m9.figshare.33456928"
      }
    ],
    variables: [
      { name: "State_ID", type: "string", description: "Unique sequential state identifier (HL-PSY-0001 to HL-PSY-0420)" },
      { name: "Dry_Bulb_degF", type: "number", unit: "°F", description: "Dry-bulb ambient air temperature (-10.0°F to 120.0°F)" },
      { name: "Relative_Humidity_Pct", type: "number", unit: "%", description: "Relative humidity ratio of vapor pressure to saturation pressure (10% to 100%)" },
      { name: "Altitude_ft", type: "number", unit: "ft", description: "Elevation above sea level (0 ft sea level or 5,000 ft altitude)" },
      { name: "Barometric_Pressure_psia", type: "number", unit: "psia", description: "Local atmospheric barometric pressure" },
      { name: "Saturation_Pressure_psia", type: "number", unit: "psia", description: "Water vapor saturation pressure over liquid water or ice" },
      { name: "Vapor_Pressure_psia", type: "number", unit: "psia", description: "Partial water vapor pressure in moist air mixture" },
      { name: "Dew_Point_degF", type: "number", unit: "°F", description: "Dew point temperature corresponding to vapor pressure" },
      { name: "Wet_Bulb_degF", type: "number", unit: "°F", description: "Thermodynamic wet-bulb temperature via numerical iteration" },
      { name: "Humidity_Ratio_lb_lb", type: "number", unit: "lb_w / lb_da", description: "Mass of water vapor per unit mass of dry air" },
      { name: "Humidity_Ratio_grains_lb", type: "number", unit: "grains / lb_da", description: "Moisture content in grains per pound of dry air (7000 grains/lb)" },
      { name: "Specific_Enthalpy_Btu_lb", type: "number", unit: "BTU / lb_da", description: "Total moist air enthalpy per pound of dry air" },
      { name: "Specific_Volume_cuft_lb", type: "number", unit: "ft³ / lb_da", description: "Specific volume of moist air mixture per pound dry air" },
      { name: "Moist_Air_Density_lb_cuft", type: "number", unit: "lb / ft³", description: "Total moist air density" }
    ],
    previewRows: [
      { State_ID: "HL-PSY-0001", Dry_Bulb_degF: -10.0, Relative_Humidity_Pct: 10, Altitude_ft: 0, Barometric_Pressure_psia: 14.696, Saturation_Pressure_psia: 0.01083, Dew_Point_degF: -46.76, Wet_Bulb_degF: -11.70, Humidity_Ratio_grains_lb: 0.32, Specific_Enthalpy_Btu_lb: -2.352, Moist_Air_Density_lb_cuft: 0.0882 },
      { State_ID: "HL-PSY-0002", Dry_Bulb_degF: -10.0, Relative_Humidity_Pct: 20, Altitude_ft: 0, Barometric_Pressure_psia: 14.696, Saturation_Pressure_psia: 0.01083, Dew_Point_degF: -36.66, Wet_Bulb_degF: -11.52, Humidity_Ratio_grains_lb: 0.64, Specific_Enthalpy_Btu_lb: -2.303, Moist_Air_Density_lb_cuft: 0.0882 },
      { State_ID: "HL-PSY-0003", Dry_Bulb_degF: -10.0, Relative_Humidity_Pct: 30, Altitude_ft: 0, Barometric_Pressure_psia: 14.696, Saturation_Pressure_psia: 0.01083, Dew_Point_degF: -30.35, Wet_Bulb_degF: -11.33, Humidity_Ratio_grains_lb: 0.96, Specific_Enthalpy_Btu_lb: -2.255, Moist_Air_Density_lb_cuft: 0.0882 },
      { State_ID: "HL-PSY-0004", Dry_Bulb_degF: -10.0, Relative_Humidity_Pct: 40, Altitude_ft: 0, Barometric_Pressure_psia: 14.696, Saturation_Pressure_psia: 0.01083, Dew_Point_degF: -25.70, Wet_Bulb_degF: -11.14, Humidity_Ratio_grains_lb: 1.28, Specific_Enthalpy_Btu_lb: -2.206, Moist_Air_Density_lb_cuft: 0.0882 },
      { State_ID: "HL-PSY-0005", Dry_Bulb_degF: -10.0, Relative_Humidity_Pct: 50, Altitude_ft: 0, Barometric_Pressure_psia: 14.696, Saturation_Pressure_psia: 0.01083, Dew_Point_degF: -22.04, Wet_Bulb_degF: -10.95, Humidity_Ratio_grains_lb: 1.61, Specific_Enthalpy_Btu_lb: -2.158, Moist_Air_Density_lb_cuft: 0.0882 }
    ]
  },
  {
    slug: "cold-climate-heat-pump-cop-derating",
    title: "Cold-Climate Heat Pump COP Derating & Heating Load Balance Point Dataset",
    subtitle: "240 deterministic simulation points across variable ambient temperatures (-15°F to 50°F).",
    seoTitle: "Cold-Climate Heat Pump COP Derating & Balance Point Dataset",
    seoDescription: "Open benchmark dataset of 240 simulation points modeling cold-climate heat pump inverter modulation, COP derating, and supplemental heat across -15°F to 50°F.",
    description: "Empirical and thermodynamic performance matrix modeling variable-speed inverter air-source heat pumps. The dataset evaluates compressor capacity retention, Coefficient of Performance (COP) degradation, latent defrost penalties, building heating balance points, and auxiliary electric resistance strip staging requirements.",
    methodology: "Simulations model residential heating loads per ACCA Manual J and heat pump capacity curves conforming to AHRI 210/240 and NEEP cold-climate specifications. Defrost degradation is modeled below 40°F with dynamic frost accumulation curves and timed reverse-cycle penalties.",
    primaryDoi: "10.6084/m9.figshare.33477430",
    publicationDate: "2026-09-09",
    lastUpdated: "2026-09-09",
    recordCount: 240,
    filename: "hvaclogic_cold_climate_heat_pump_cop_benchmark.csv",
    fileSizeBytes: 24056,
    format: "CSV",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "ACCA Manual S (Residential Equipment Selection)",
      "AHRI Standard 210/240-2023 (Performance Rating of Heat Pumps)",
      "NEEP Cold Climate Air Source Heat Pump Specification (Version 4.0)"
    ],
    companionCalculators: [
      {
        name: "Heat Pump Size & Balance Point Calculator",
        url: "/calculators/heat-pump-size-calculator",
        description: "Calculate thermal balance point, low-ambient COP derating, and backup heat staging."
      }
    ],
    companionResearch: [
      {
        name: "Interactive Engineering Lab: Cold-Climate Heat Pump Balance Points",
        url: "/research/cold-climate-heat-pump-balance-point-lab",
        description: "Thermodynamic modeling of cold-climate inverter derating, balance points, and auxiliary loads."
      }
    ],
    repositories: [
      {
        platform: "figshare",
        name: "Figshare Data Repository",
        url: "https://doi.org/10.6084/m9.figshare.33477430",
        doi: "10.6084/m9.figshare.33477430"
      }
    ],
    variables: [
      { name: "Record_ID", type: "string", description: "Unique simulation vector identifier (HL-HP-0001 to HL-HP-0240)" },
      { name: "Outdoor_Temp_degF", type: "number", unit: "°F", description: "Outdoor ambient dry-bulb temperature (-15.0°F to 50.0°F)" },
      { name: "Indoor_Temp_degF", type: "number", unit: "°F", description: "Conditioned space indoor design setpoint (70.0°F)" },
      { name: "Design_Heat_Loss_Btu_hr", type: "number", unit: "BTU/h", description: "Building envelope peak design heating load" },
      { name: "Nominal_Tonnage", type: "number", unit: "Tons", description: "Heat pump nominal equipment frame (2.0 to 5.0 Tons)" },
      { name: "Rated_Heating_Cap_47F_Btu", type: "number", unit: "BTU/h", description: "Rated heating capacity at AHRI 47°F rating point" },
      { name: "Compressor_Speed", type: "string", description: "Inverter operating state (min, intermediate, max)" },
      { name: "Operating_COP", type: "number", unit: "ratio", description: "Instantaneous thermodynamic Coefficient of Performance" },
      { name: "Gross_Heating_Cap_Btu_hr", type: "number", unit: "BTU/h", description: "Uncorrected compressor thermal output before defrost derate" },
      { name: "Defrost_Derate_Factor", type: "number", unit: "fraction", description: "Latent frost accumulation penalty factor (0.82 to 1.00)" },
      { name: "Effective_Heating_Cap_Btu_hr", type: "number", unit: "BTU/h", description: "Net deliverable heating power to building envelope" },
      { name: "Building_Heat_Demand_Btu_hr", type: "number", unit: "BTU/h", description: "Envelope thermal loss demand at current ambient temperature" },
      { name: "Thermal_Deficit_Btu_hr", type: "number", unit: "BTU/h", description: "Unmet heating demand below thermal balance point" },
      { name: "Aux_Electric_Heat_kW", type: "number", unit: "kW", description: "Electric resistance backup heat required to maintain indoor temperature" },
      { name: "Balance_Point_Status", type: "string", description: "Regime classification (above_balance_point, below_balance_point)" }
    ],
    previewRows: [
      { Record_ID: "HL-HP-0001", Outdoor_Temp_degF: -15.0, Indoor_Temp_degF: 70.0, Nominal_Tonnage: 2.0, Operating_COP: 1.40, Effective_Heating_Cap_Btu_hr: 10800, Building_Heat_Demand_Btu_hr: 27200, Aux_Electric_Heat_kW: 4.81, Balance_Point_Status: "below_balance_point" },
      { Record_ID: "HL-HP-0002", Outdoor_Temp_degF: -10.0, Indoor_Temp_degF: 70.0, Nominal_Tonnage: 2.0, Operating_COP: 1.63, Effective_Heating_Cap_Btu_hr: 12360, Building_Heat_Demand_Btu_hr: 25600, Aux_Electric_Heat_kW: 3.88, Balance_Point_Status: "below_balance_point" },
      { Record_ID: "HL-HP-0003", Outdoor_Temp_degF: -5.0, Indoor_Temp_degF: 70.0, Nominal_Tonnage: 2.0, Operating_COP: 1.85, Effective_Heating_Cap_Btu_hr: 13920, Building_Heat_Demand_Btu_hr: 24000, Aux_Electric_Heat_kW: 2.95, Balance_Point_Status: "below_balance_point" },
      { Record_ID: "HL-HP-0004", Outdoor_Temp_degF: 0.0, Indoor_Temp_degF: 70.0, Nominal_Tonnage: 2.0, Operating_COP: 2.07, Effective_Heating_Cap_Btu_hr: 15480, Building_Heat_Demand_Btu_hr: 22400, Aux_Electric_Heat_kW: 2.03, Balance_Point_Status: "below_balance_point" },
      { Record_ID: "HL-HP-0005", Outdoor_Temp_degF: 5.0, Indoor_Temp_degF: 70.0, Nominal_Tonnage: 2.0, Operating_COP: 2.30, Effective_Heating_Cap_Btu_hr: 17040, Building_Heat_Demand_Btu_hr: 20800, Aux_Electric_Heat_kW: 1.10, Balance_Point_Status: "below_balance_point" }
    ]
  },
  {
    slug: "refrigerant-mass-charge-low-gwp",
    title: "Next-Generation Low-GWP Refrigerant Line-Set Mass Addition & Velocity Gradient Benchmark Dataset",
    subtitle: "816 deterministic calculation points modeling liquid refrigerant mass addition and hydrostatic elevation lift penalties.",
    seoTitle: "Low-GWP Refrigerant Line-Set Mass Addition Benchmark Dataset (816 Points)",
    seoDescription: "Open benchmark dataset of 816 system scenarios for R-454B, R-32, R-410A, and R-134a calculating liquid line mass addition and oil trap requirements.",
    description: "Multi-parameter engineering benchmark evaluating low-GWP A2L blends (R-454B, R-32) and legacy refrigerants (R-410A, R-134a) across standardized ASTM B280 liquid line diameters (1/4\", 5/16\", 3/8\", 1/2\"), line-set lengths from 15 ft to 150 ft, and vertical elevation risers up to 45 ft with oil trap flags.",
    methodology: "Computes saturated liquid density and internal volume displacement across standardized seamless copper refrigeration tubing dimensions per ASTM B280. Evaluates factory trim allowances against line length extensions and calculates vertical liquid column hydrostatic head penalties.",
    primaryDoi: "10.6084/m9.figshare.33640444",
    publicationDate: "2026-09-11",
    lastUpdated: "2026-09-11",
    recordCount: 816,
    filename: "refrigerant_mass_charge_benchmark_dataset_2026.csv",
    fileSizeBytes: 115580,
    format: "CSV",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "ASHRAE Standard 15-2022 (Safety Standard for Refrigeration Systems)",
      "ASHRAE Standard 34-2022 (Designation and Safety Classification of Refrigerants)",
      "ASTM B280 (Standard Specification for Seamless Copper Tube for Field Service)",
      "EPA AIM Act Compliance Guidelines"
    ],
    companionCalculators: [
      {
        name: "Refrigerant Charge & Line-Set Weigh-In Sizer",
        url: "/calculators/refrigerant-charge-calculator",
        description: "Calculate factory trim adjustment and line-set mass addition for R-454B, R-32, and R-410A."
      },
      {
        name: "A2L PT Chart & Temperature Glide Calculator",
        url: "/calculators/pt-chart",
        description: "Saturation temperature lookup with bubble and dew point glide compensation."
      }
    ],
    companionResearch: [
      {
        name: "Deterministic Vapor-Compression Refrigerant Mass Sizing",
        url: "/research/deterministic-vapor-compression-refrigerant-mass-sizing",
        description: "Governing formulations for low-GWP A2L line-set mass addition and liquid displacement mechanics."
      }
    ],
    repositories: [
      {
        platform: "figshare",
        name: "Figshare Data Repository",
        url: "https://doi.org/10.6084/m9.figshare.33640444",
        doi: "10.6084/m9.figshare.33640444"
      }
    ],
    variables: [
      { name: "scenario_id", type: "string", description: "Unique simulation vector identifier (SCN-0001 to SCN-0816)" },
      { name: "refrigerant", type: "string", description: "Refrigerant chemical designation (R-454B, R-32, R-410A, R-134a)" },
      { name: "safety_group", type: "string", description: "ASHRAE Standard 34 flammability and toxicity classification (A2L, A1)" },
      { name: "gwp", type: "number", description: "100-year Global Warming Potential per IPCC Assessment Report 6" },
      { name: "liquid_line_od_in", type: "string", unit: "in", description: "Liquid line copper outside diameter (1/4\", 5/16\", 3/8\", 1/2\")" },
      { name: "actual_length_ft", type: "number", unit: "ft", description: "Total installed one-way liquid line length (15 ft to 150 ft)" },
      { name: "factory_allowance_ft", type: "number", unit: "ft", description: "Manufacturer pre-charged factory line-set length allowance" },
      { name: "net_additional_length_ft", type: "number", unit: "ft", description: "Line length exceeding factory pre-charge requiring field addition" },
      { name: "adder_rate_oz_per_ft", type: "number", unit: "oz/ft", description: "Refrigerant mass adder rate per linear foot" },
      { name: "factory_base_charge_oz", type: "number", unit: "oz", description: "Factory condensing unit pre-charge in ounces" },
      { name: "additional_charge_oz", type: "number", unit: "oz", description: "Calculated additional refrigerant mass to weigh in" },
      { name: "total_system_charge_oz", type: "number", unit: "oz", description: "Total operating system charge in ounces" },
      { name: "total_system_charge_lbs", type: "number", unit: "lbs", description: "Total operating system charge in pounds" },
      { name: "total_system_charge_kg", type: "number", unit: "kg", description: "Total operating system charge in kilograms" },
      { name: "vertical_lift_ft", type: "number", unit: "ft", description: "Vertical elevation difference between indoor coil and outdoor unit" },
      { name: "requires_oil_trap", type: "boolean", description: "Flag indicating mandatory suction riser oil trap per manufacturer specification" }
    ],
    previewRows: [
      { scenario_id: "SCN-0001", refrigerant: "R-454B", safety_group: "A2L", liquid_line_od_in: "1/4", actual_length_ft: 15, factory_allowance_ft: 15, adder_rate_oz_per_ft: 0.18, total_system_charge_oz: 64, total_system_charge_lbs: 4.0, vertical_lift_ft: 0, requires_oil_trap: false },
      { scenario_id: "SCN-0002", refrigerant: "R-454B", safety_group: "A2L", liquid_line_od_in: "1/4", actual_length_ft: 15, factory_allowance_ft: 15, adder_rate_oz_per_ft: 0.18, total_system_charge_oz: 64, total_system_charge_lbs: 4.0, vertical_lift_ft: 15, requires_oil_trap: false },
      { scenario_id: "SCN-0003", refrigerant: "R-454B", safety_group: "A2L", liquid_line_od_in: "1/4", actual_length_ft: 20, factory_allowance_ft: 15, adder_rate_oz_per_ft: 0.18, total_system_charge_oz: 64.9, total_system_charge_lbs: 4.056, vertical_lift_ft: 0, requires_oil_trap: false },
      { scenario_id: "SCN-0004", refrigerant: "R-454B", safety_group: "A2L", liquid_line_od_in: "1/4", actual_length_ft: 20, factory_allowance_ft: 15, adder_rate_oz_per_ft: 0.18, total_system_charge_oz: 64.9, total_system_charge_lbs: 4.056, vertical_lift_ft: 15, requires_oil_trap: false },
      { scenario_id: "SCN-0005", refrigerant: "R-454B", safety_group: "A2L", liquid_line_od_in: "1/4", actual_length_ft: 25, factory_allowance_ft: 15, adder_rate_oz_per_ft: 0.18, total_system_charge_oz: 65.8, total_system_charge_lbs: 4.113, vertical_lift_ft: 0, requires_oil_trap: false }
    ]
  },
  {
    slug: "building-envelope-thermal-transmission",
    title: "Building Envelope Thermal Transmission, Fenestration SHGC, and Infiltration Sizing Benchmark Matrix",
    subtitle: "540 deterministic state vectors across ASHRAE Climate Zones 1–7 evaluating conduction, solar gains, and ACH50 infiltration.",
    seoTitle: "Building Envelope Thermal Transmission & Infiltration Benchmark Matrix (540 Vectors)",
    seoDescription: "Open benchmark dataset of 540 building envelope scenarios calculating Fourier conductive heat loss, solar SHGC, and ACH50 infiltration per ACCA Manual J.",
    description: "Multi-parameter residential building science benchmark calculating Fourier conductive transmission across composite wall and roof assemblies, fenestration Solar Heat Gain Coefficients (SHGC), and pressure-driven envelope infiltration per ACCA Manual J (8th Edition).",
    methodology: "Evaluates heat transfer across 540 distinct residential envelope configurations covering ASHRAE Climate Zones 1 through 7. Conductive losses are calculated via Fourier multi-layer series thermal resistance ($U = 1/R_{\\text{total}}$). Infiltration is derived from building blower-door ACH50 depressurization ratings coupled with Sherman-Grimsrud LBL infiltration modeling.",
    primaryDoi: "10.6084/m9.figshare.33702643",
    secondaryDoi: "10.57967/hf/10401",
    publicationDate: "2026-09-13",
    lastUpdated: "2026-09-13",
    recordCount: 540,
    filename: "building_envelope_thermal_transmission_benchmark_dataset_2026.csv",
    fileSizeBytes: 140932,
    jsonFilename: "building_envelope_thermal_transmission_benchmark_dataset_2026.json",
    jsonFileSizeBytes: 769775,
    format: "CSV / JSON",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "ACCA Manual J (8th Edition, Residential Load Calculation)",
      "ASHRAE Handbook - Fundamentals (Chapters 14–18, Building Heat Transmission)",
      "ASTM E779 Standard Test Method for Determining Air Leakage Rate",
      "IECC 2021/2024 Residential Energy Efficiency Code"
    ],
    companionCalculators: [
      {
        name: "BTU Heating & Cooling Load Calculator",
        url: "/calculators/btu-calculator",
        description: "Calculate room-by-room and whole-house peak heating and cooling loads."
      }
    ],
    companionResearch: [
      {
        name: "Student Laboratory Manual: Building Envelope Thermal Transmission",
        url: "/research/student-lab-building-envelope-thermal-transmission",
        description: "Laboratory exercise in Fourier conduction, fenestration SHGC modeling, and ACH50 infiltration sizing."
      },
      {
        name: "Deterministic Building Science & Dynamic Enclosure Infiltration Modeling",
        url: "/research/thermal-envelope-infiltration-building-heat-loss",
        description: "Technical whitepaper evaluating residential envelope heat loss dynamics."
      }
    ],
    repositories: [
      {
        platform: "figshare",
        name: "Figshare Data Repository",
        url: "https://doi.org/10.6084/m9.figshare.33702643",
        doi: "10.6084/m9.figshare.33702643"
      },
      {
        platform: "huggingface",
        name: "Hugging Face Datasets",
        url: "https://huggingface.co/datasets/miadinside/building-envelope-thermal-transmission-benchmark-2026",
        doi: "10.57967/hf/10401"
      }
    ],
    variables: [
      { name: "scenario_id", type: "string", description: "Unique building physics scenario vector (ENV-0001 to ENV-0540)" },
      { name: "climate_zone", type: "string", description: "ASHRAE Climate Zone classification (CZ-1 through CZ-7)" },
      { name: "climate_zone_name", type: "string", description: "Regional climate description (e.g. Hot-Humid, Cold)" },
      { name: "outdoor_winter_db_f", type: "number", unit: "°F", description: "ACCA Manual J 99% winter outdoor design temperature" },
      { name: "outdoor_summer_db_f", type: "number", unit: "°F", description: "ACCA Manual J 1% summer outdoor design dry-bulb" },
      { name: "outdoor_summer_wb_f", type: "number", unit: "°F", description: "ACCA Manual J 1% summer outdoor coincident wet-bulb" },
      { name: "indoor_winter_setpoint_f", type: "number", unit: "°F", description: "Winter indoor thermostat setpoint (70°F)" },
      { name: "indoor_summer_setpoint_f", type: "number", unit: "°F", description: "Summer indoor thermostat setpoint (75°F)" },
      { name: "floor_area_sqft", type: "number", unit: "sq ft", description: "Conditioned floor area (1,500 to 3,600 sq ft)" },
      { name: "dwelling_volume_cuft", type: "number", unit: "cu ft", description: "Conditioned building volume (12,000 to 32,400 cu ft)" },
      { name: "wall_effective_u_factor", type: "number", unit: "BTU/(h·ft²·°F)", description: "Overall opaque wall thermal transmittance" },
      { name: "fenestration_u_factor", type: "number", unit: "BTU/(h·ft²·°F)", description: "Window glazing overall thermal transmittance" },
      { name: "fenestration_shgc", type: "number", unit: "fraction", description: "Fenestration Solar Heat Gain Coefficient" },
      { name: "infiltration_ach50", type: "number", unit: "ACH50", description: "Measured envelope air tightness at 50 Pa pressure" },
      { name: "infiltration_design_cfm", type: "number", unit: "CFM", description: "Equivalent natural air infiltration airflow" },
      { name: "total_peak_heating_load_btu_h", type: "number", unit: "BTU/h", description: "Total peak heating design load per Manual J" },
      { name: "total_cooling_peak_load_btu_h", type: "number", unit: "BTU/h", description: "Total peak cooling design load per Manual J" },
      { name: "calculated_cooling_tonnage", type: "number", unit: "Tons", description: "Calculated equipment cooling capacity required" },
      { name: "rule_of_thumb_tonnage_500sqft", type: "number", unit: "Tons", description: "Heuristic estimate (1 Ton / 500 sq ft)" },
      { name: "heuristic_oversize_percentage", type: "number", unit: "%", description: "Percentage oversizing error of heuristic vs calculated" }
    ],
    previewRows: [
      { scenario_id: "ENV-0001", climate_zone: "CZ-2", floor_area_sqft: 1500, wall_effective_u_factor: 0.106, fenestration_u_factor: 1.05, fenestration_shgc: 0.72, infiltration_ach50: 8.5, total_peak_heating_load_btu_h: 19391, total_cooling_peak_load_btu_h: 27684, calculated_cooling_tonnage: 2.31, rule_of_thumb_tonnage_500sqft: 3.0, heuristic_oversize_percentage: 29.9 },
      { scenario_id: "ENV-0002", climate_zone: "CZ-2", floor_area_sqft: 2500, wall_effective_u_factor: 0.106, fenestration_u_factor: 1.05, fenestration_shgc: 0.72, infiltration_ach50: 8.5, total_peak_heating_load_btu_h: 30457, total_cooling_peak_load_btu_h: 42715, calculated_cooling_tonnage: 3.56, rule_of_thumb_tonnage_500sqft: 5.0, heuristic_oversize_percentage: 40.4 },
      { scenario_id: "ENV-0003", climate_zone: "CZ-2", floor_area_sqft: 3600, wall_effective_u_factor: 0.106, fenestration_u_factor: 1.05, fenestration_shgc: 0.72, infiltration_ach50: 8.5, total_peak_heating_load_btu_h: 42993, total_cooling_peak_load_btu_h: 60000, calculated_cooling_tonnage: 5.00, rule_of_thumb_tonnage_500sqft: 7.2, heuristic_oversize_percentage: 44.0 },
      { scenario_id: "ENV-0004", climate_zone: "CZ-2", floor_area_sqft: 1500, wall_effective_u_factor: 0.106, fenestration_u_factor: 1.05, fenestration_shgc: 0.72, infiltration_ach50: 3.5, total_peak_heating_load_btu_h: 17315, total_cooling_peak_load_btu_h: 23974, calculated_cooling_tonnage: 2.00, rule_of_thumb_tonnage_500sqft: 3.0, heuristic_oversize_percentage: 50.0 },
      { scenario_id: "ENV-0005", climate_zone: "CZ-2", floor_area_sqft: 2500, wall_effective_u_factor: 0.106, fenestration_u_factor: 1.05, fenestration_shgc: 0.72, infiltration_ach50: 3.5, total_peak_heating_load_btu_h: 26779, total_cooling_peak_load_btu_h: 36139, calculated_cooling_tonnage: 3.01, rule_of_thumb_tonnage_500sqft: 5.0, heuristic_oversize_percentage: 66.1 }
    ]
  },
  {
    slug: "combustion-air-confined-space",
    title: "Confined Space Combustion Air Infiltration, Opening Free Area, and Gross Louver Sizing Benchmark Matrix",
    subtitle: "540 vectors evaluating appliance combustion air requirements per NFPA 54 and IFGC Section 304.",
    seoTitle: "Confined Space Combustion Air Sizing Benchmark Matrix (540 Vectors)",
    seoDescription: "Open benchmark dataset of 540 combustion air vectors calculating confined space thresholds, free area openings, and louver sizing per NFPA 54.",
    description: "Standardized sizing matrix for appliance combustion air requirements per NFPA 54 / National Fuel Gas Code and IFGC Section 304. Evaluates confined space cubic volume thresholds (50 cu ft / 1,000 BTU/h), net free area openings, and louver gross dimensional sizing across metal, wood, and direct screen configurations.",
    methodology: "Calculates volume sufficiency for fuel gas appliance rooms across burner firing rates from 25,000 to 300,000 BTU/h. Opening net free areas are calculated per code standards: All Air from Indoors (1 sq in / 1,000 BTU/h), Outdoor Vertical Ducts (1 sq in / 4,000 BTU/h), Outdoor Horizontal Ducts (1 sq in / 2,000 BTU/h), and Single Outdoor Opening (1 sq in / 3,000 BTU/h).",
    primaryDoi: "10.6084/m9.figshare.33753856",
    secondaryDoi: "10.57967/hf/10454",
    publicationDate: "2026-09-15",
    lastUpdated: "2026-09-15",
    recordCount: 540,
    filename: "combustion_air_and_confined_space_benchmark_2026.csv",
    fileSizeBytes: 43150,
    format: "CSV",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "NFPA 54 / ANSI Z223.1 (National Fuel Gas Code)",
      "International Fuel Gas Code (IFGC Section 304)",
      "CSA B149.1 (Natural Gas and Propane Installation Code)"
    ],
    companionCalculators: [
      {
        name: "Combustion Air & Confined Space Sizer",
        url: "/calculators/combustion-air-calculator",
        description: "Calculate room volume confinement, required free area, and louver dimensions."
      }
    ],
    companionResearch: [
      {
        name: "Multi-Zone Mass-Balance Ventilation and Continuous IAQ Dilution",
        url: "/research/effective-dilution-iaq-ventilation-mass-balance",
        description: "Technical paper analyzing building enclosure infiltration and combustion air dynamics."
      }
    ],
    repositories: [
      {
        platform: "figshare",
        name: "Figshare Data Repository",
        url: "https://doi.org/10.6084/m9.figshare.33753856",
        doi: "10.6084/m9.figshare.33753856"
      },
      {
        platform: "huggingface",
        name: "Hugging Face Datasets",
        url: "https://huggingface.co/datasets/miadinside/combustion-air-and-confined-space-benchmark-2026",
        doi: "10.57967/hf/10454"
      }
    ],
    variables: [
      { name: "vector_id", type: "string", description: "Unique combustion scenario vector (CA-VEC-0001 to CA-VEC-0540)" },
      { name: "total_input_btu", type: "number", unit: "BTU/h", description: "Total appliance burner input firing rate (25,000 to 300,000 BTU/h)" },
      { name: "room_len_ft", type: "number", unit: "ft", description: "Enclosure room length in feet" },
      { name: "room_wid_ft", type: "number", unit: "ft", description: "Enclosure room width in feet" },
      { name: "room_hgt_ft", type: "number", unit: "ft", description: "Enclosure room ceiling height in feet" },
      { name: "room_vol_cuft", type: "number", unit: "cu ft", description: "Enclosure interior cubic volume" },
      { name: "req_unconfined_vol_cuft", type: "number", unit: "cu ft", description: "Code required unconfined threshold volume (50 cu ft / 1,000 BTU/h)" },
      { name: "is_confined_space", type: "boolean", description: "Flag indicating whether room volume is deficient under NFPA 54" },
      { name: "vol_deficit_cuft", type: "number", unit: "cu ft", description: "Net cubic volume deficiency requiring exterior combustion air" },
      { name: "louver_type", type: "string", description: "Louver construction material (metal, wood, direct_screen)" },
      { name: "indoor_2op_net_sqin", type: "number", unit: "sq in", description: "Net free area required for all-air-from-indoors two-opening method" },
      { name: "indoor_2op_gross_sqin", type: "number", unit: "sq in", description: "Gross louver area accounting for free area ratio" },
      { name: "outdoor_vert_2op_net_sqin", type: "number", unit: "sq in", description: "Net free area for outdoor vertical ducts (1 sq in / 4,000 BTU/h)" },
      { name: "outdoor_vert_2op_gross_sqin", type: "number", unit: "sq in", description: "Gross louver opening area for vertical ducts" },
      { name: "outdoor_horiz_2op_net_sqin", type: "number", unit: "sq in", description: "Net free area for outdoor horizontal ducts (1 sq in / 2,000 BTU/h)" },
      { name: "outdoor_horiz_2op_gross_sqin", type: "number", unit: "sq in", description: "Gross louver opening area for horizontal ducts" },
      { name: "outdoor_single_net_sqin", type: "number", unit: "sq in", description: "Net free area for direct single opening to outdoors" },
      { name: "outdoor_single_gross_sqin", type: "number", unit: "sq in", description: "Gross louver opening area for single opening" }
    ],
    previewRows: [
      { vector_id: "CA-VEC-0001", total_input_btu: 25000, room_vol_cuft: 288, req_unconfined_vol_cuft: 1250, is_confined_space: true, vol_deficit_cuft: 962, louver_type: "metal", indoor_2op_net_sqin: 100, indoor_2op_gross_sqin: 133, outdoor_vert_2op_net_sqin: 10, outdoor_vert_2op_gross_sqin: 13 },
      { vector_id: "CA-VEC-0002", total_input_btu: 25000, room_vol_cuft: 288, req_unconfined_vol_cuft: 1250, is_confined_space: true, vol_deficit_cuft: 962, louver_type: "wood", indoor_2op_net_sqin: 100, indoor_2op_gross_sqin: 400, outdoor_vert_2op_net_sqin: 10, outdoor_vert_2op_gross_sqin: 40 },
      { vector_id: "CA-VEC-0003", total_input_btu: 25000, room_vol_cuft: 288, req_unconfined_vol_cuft: 1250, is_confined_space: true, vol_deficit_cuft: 962, louver_type: "direct_screen", indoor_2op_net_sqin: 100, indoor_2op_gross_sqin: 100, outdoor_vert_2op_net_sqin: 10, outdoor_vert_2op_gross_sqin: 10 },
      { vector_id: "CA-VEC-0004", total_input_btu: 25000, room_vol_cuft: 384, req_unconfined_vol_cuft: 1250, is_confined_space: true, vol_deficit_cuft: 866, louver_type: "metal", indoor_2op_net_sqin: 100, indoor_2op_gross_sqin: 133, outdoor_vert_2op_net_sqin: 10, outdoor_vert_2op_gross_sqin: 13 },
      { vector_id: "CA-VEC-0005", total_input_btu: 25000, room_vol_cuft: 384, req_unconfined_vol_cuft: 1250, is_confined_space: true, vol_deficit_cuft: 866, louver_type: "wood", indoor_2op_net_sqin: 100, indoor_2op_gross_sqin: 400, outdoor_vert_2op_net_sqin: 10, outdoor_vert_2op_gross_sqin: 40 }
    ]
  },
  {
    slug: "kitchen-hood-exhaust-makeup-air",
    title: "Kitchen Range Hood Exhaust Aerodynamics, Capture Velocity, and Make-Up Air Sizing Benchmark Matrix",
    subtitle: "433 empirical vectors evaluating cooktop thermal plumes, duct TEL penalties, and make-up air interlocks.",
    seoTitle: "Kitchen Range Hood CFM & Make-Up Air Benchmark Dataset (433 Vectors)",
    seoDescription: "Open benchmark dataset of 433 kitchen exhaust vectors evaluating cooktop thermal plumes, duct equivalent length friction, and make-up air interlocks.",
    description: "Computational capture-efficiency matrix for residential and light-commercial kitchen range hoods under IRC Section M1503.6 and ASHRAE Standard 62.2. Models thermal plume buoyant velocity, total equivalent length (TEL) static pressure loss compensation, and mandatory make-up air interlock thresholds.",
    methodology: "Calculates exhaust airflow requirements across gas, electric, and induction cooktops. Gas burner output is sized at 1 CFM per 100 BTU/h, electric/induction cooktops at 10 CFM per linear inch of width, with island hood multiplier (1.33x) and ACCA Manual D equivalent duct length static friction adders. Make-up air interlocks are flagged for systems exceeding 400 CFM per IRC M1503.6.",
    publicationDate: "2026-09-15",
    lastUpdated: "2026-09-15",
    recordCount: 433,
    filename: "kitchen_hood_exhaust_and_makeup_air_benchmark_2026.csv",
    fileSizeBytes: 33002,
    format: "CSV",
    license: "https://creativecommons.org/licenses/by/4.0/",
    licenseName: "CC BY 4.0 International",
    governingStandards: [
      "IRC Section M1503.6 (Make-Up Air Requirements)",
      "ASHRAE Standard 62.2-2022 (Ventilation and Acceptable Indoor Air Quality)",
      "ACCA Manual D (Residential Duct Systems)"
    ],
    companionCalculators: [
      {
        name: "Kitchen Range Hood CFM & Make-Up Air Sizer",
        url: "/calculators/kitchen-hood-cfm",
        description: "Calculate cooktop capture CFM, duct friction loss, and code make-up air CFM."
      }
    ],
    companionResearch: [
      {
        name: "Multi-Zone Mass-Balance Ventilation and Continuous IAQ Dilution",
        url: "/research/effective-dilution-iaq-ventilation-mass-balance",
        description: "Technical report evaluating indoor airflow dynamics, dilution mechanics, and ventilation balance."
      }
    ],
    repositories: [],
    variables: [
      { name: "vector_id", type: "string", description: "Unique kitchen ventilation vector (KH-VEC-0001 to KH-VEC-0433)" },
      { name: "cooktop_type", type: "string", description: "Cooktop energy source (gas, electric, induction)" },
      { name: "cooktop_width_in", type: "number", unit: "in", description: "Cooktop linear width (24\", 30\", 36\", 48\", 60\")" },
      { name: "gas_burner_btu", type: "number", unit: "BTU/h", description: "Total aggregate gas burner firing rate in BTU/h" },
      { name: "mounting_type", type: "string", description: "Hood installation spatial geometry (wall, island)" },
      { name: "straight_duct_len_ft", type: "number", unit: "ft", description: "Straight exhaust duct physical run length" },
      { name: "elbows_90", type: "number", description: "Number of 90-degree smooth sheet metal elbows installed" },
      { name: "kitchen_volume_cuft", type: "number", unit: "cu ft", description: "Kitchen enclosure interior cubic volume" },
      { name: "base_thermal_cfm", type: "number", unit: "CFM", description: "Thermal plume capture airflow baseline" },
      { name: "mounting_multiplier", type: "number", description: "Mounting capture multiplier (1.00 for wall, 1.33 for island)" },
      { name: "total_equivalent_length_ft", type: "number", unit: "ft", description: "Total equivalent length (TEL) of exhaust duct run" },
      { name: "duct_adder_cfm", type: "number", unit: "CFM", description: "Static pressure friction compensation airflow adder" },
      { name: "room_ach_cfm", type: "number", unit: "CFM", description: "Room air exchange airflow baseline (15 ACH)" },
      { name: "final_recommended_cfm", type: "number", unit: "CFM", description: "Final recommended exhaust fan airflow capacity" },
      { name: "recommended_duct_diameter_in", type: "number", unit: "in", description: "Recommended round duct diameter to maintain velocity below 1,500 FPM" },
      { name: "make_up_air_required", type: "boolean", description: "Flag indicating mandatory make-up air interlock under IRC M1503.6 (> 400 CFM)" },
      { name: "make_up_air_cfm_required", type: "number", unit: "CFM", description: "Dedicated make-up air supply airflow required" }
    ],
    previewRows: [
      { vector_id: "KH-VEC-0001", cooktop_type: "gas", cooktop_width_in: 24, gas_burner_btu: 36000, mounting_type: "wall", straight_duct_len_ft: 5, elbows_90: 1, total_equivalent_length_ft: 45, final_recommended_cfm: 400, recommended_duct_diameter_in: 7, make_up_air_required: false, make_up_air_cfm_required: 0 },
      { vector_id: "KH-VEC-0002", cooktop_type: "gas", cooktop_width_in: 24, gas_burner_btu: 36000, mounting_type: "wall", straight_duct_len_ft: 5, elbows_90: 2, total_equivalent_length_ft: 55, final_recommended_cfm: 400, recommended_duct_diameter_in: 7, make_up_air_required: false, make_up_air_cfm_required: 0 },
      { vector_id: "KH-VEC-0003", cooktop_type: "gas", cooktop_width_in: 24, gas_burner_btu: 36000, mounting_type: "wall", straight_duct_len_ft: 5, elbows_90: 3, total_equivalent_length_ft: 65, final_recommended_cfm: 400, recommended_duct_diameter_in: 7, make_up_air_required: false, make_up_air_cfm_required: 0 },
      { vector_id: "KH-VEC-0004", cooktop_type: "gas", cooktop_width_in: 24, gas_burner_btu: 36000, mounting_type: "wall", straight_duct_len_ft: 15, elbows_90: 1, total_equivalent_length_ft: 55, final_recommended_cfm: 400, recommended_duct_diameter_in: 7, make_up_air_required: false, make_up_air_cfm_required: 0 },
      { vector_id: "KH-VEC-0005", cooktop_type: "gas", cooktop_width_in: 24, gas_burner_btu: 36000, mounting_type: "wall", straight_duct_len_ft: 15, elbows_90: 2, total_equivalent_length_ft: 65, final_recommended_cfm: 400, recommended_duct_diameter_in: 7, make_up_air_required: false, make_up_air_cfm_required: 0 }
    ]
  }
];

export function getDatasetBySlug(slug: string): BenchmarkDataset | undefined {
  return BENCHMARK_DATASETS.find((d) => d.slug === slug);
}

export function getAllDatasetSlugs(): string[] {
  return BENCHMARK_DATASETS.map((d) => d.slug);
}
