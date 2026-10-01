/**
 * HVACLogic Furnace Sizing & Preliminary Heating Load Computational Engine
 *
 * Technical References:
 * - ANSI/ACCA Manual J (8th Edition) - Residential Load Calculation Principles (Reference framework)
 * - ANSI/ACCA Manual S (3rd Edition) - Residential Equipment Selection
 * - ANSI/AHRI Standard 260 / AHRI Directory - Residential Furnace Rating Standards
 * - U.S. DOE 10 CFR Part 430 - Energy Conservation Program: Annual Fuel Utilization Efficiency (AFUE)
 *
 * NOTE: This calculator provides a preliminary screening estimate based on square footage,
 * climate zone, and building envelope characteristics. It is not a substitute for an authoritative,
 * room-by-room ACCA Manual J load calculation and OEM equipment selection via Manual S.
 */

export type HeatingClimateZone = 1 | 2 | 3 | 4 | 5;
export type InsulationGrade = "poor" | "average" | "good" | "spray_foam";
export type SunExposure = "shaded" | "average" | "sunny";

export interface FurnaceBtuInput {
  floorAreaSqFt: number;
  climateZone: HeatingClimateZone;
  ceilingHeightFeet?: number;
  insulationGrade?: InsulationGrade;
  sunExposure?: SunExposure;
  afueRatingPercent?: number; // 80, 92, 96, 98%
  temperatureRiseF?: number; // Representative 35°F to 65°F delta T
}

export interface FurnaceBtuOutput {
  floorAreaSqFt: number;
  estimatedHeatingLoadBtu: number;
  requiredOutputBtu: number; // Retained for backward-compatibility; equals estimatedHeatingLoadBtu
  approximateInputRequirementBtu: number;
  afueRatingPercent: number;
  candidateNominalInputBtu: number; // Primary candidate nominal rating
  candidateNominalRange: string; // Range (e.g., "80,000 to 100,000 BTU/hr")
  nominalFurnaceModelBtu: number; // Retained alias for candidateNominalInputBtu
  typicalCabinetWidthRange: string;
  recommendedCabinetWidth: string; // Retained alias
  theoreticalHeatingCfm: number;
  requiredHeatingCfm: number; // Retained alias
  flueExhaustType: "Metal B-Vent Chimney" | "PVC / CPVC Direct Vent (Condensing)";
  explanation: string;
  screeningDisclaimers: string[];
}

/**
 * Preliminary screening heating factors (BTU/hr per sq ft of heated living space).
 * Application screening baselines for residential screening estimates only.
 */
export const CLIMATE_ZONE_BTU_FACTORS: Record<
  HeatingClimateZone,
  { btuPerSqFt: number; label: string; outdoorDesignTemp: string; description: string }
> = {
  1: {
    btuPerSqFt: 30,
    label: "Zone 1: Deep South & Coastal (FL, Gulf Coast, SoCal)",
    outdoorDesignTemp: "35°F to 40°F",
    description: "Mild winter climates with low seasonal heating degree days.",
  },
  2: {
    btuPerSqFt: 35,
    label: "Zone 2: Moderate South & Sunbelt (TX, GA, NC, AZ)",
    outdoorDesignTemp: "25°F to 30°F",
    description: "Moderate winter heating demand with occasional cold fronts.",
  },
  3: {
    btuPerSqFt: 40,
    label: "Zone 3: Mid-Atlantic & Central (VA, MO, KS, KY)",
    outdoorDesignTemp: "15°F to 20°F",
    description: "Balanced four-season climates with steady winter heating loads.",
  },
  4: {
    btuPerSqFt: 50,
    label: "Zone 4: Northern & Midwest (PA, OH, IL, NY, CO)",
    outdoorDesignTemp: "0°F to 10°F",
    description: "Cold winter climates with prolonged sub-freezing heating demand.",
  },
  5: {
    btuPerSqFt: 60,
    label: "Zone 5: Sub-Zero Extreme North (MN, WI, ND, ME, MT)",
    outdoorDesignTemp: "-10°F to -25°F",
    description: "Severe sub-zero winter design conditions requiring robust heating capacity.",
  },
};

/**
 * Documented insulation screening multipliers based on typical envelope thermal resistance.
 */
export const INSULATION_FACTORS: Record<
  InsulationGrade,
  { multiplier: number; label: string; description: string }
> = {
  poor: {
    multiplier: 1.25,
    label: "Poor (Pre-1980, uninsulated 2x4 framing, single-pane glass)",
    description: "High envelope leakage and minimal thermal resistance (1.25x load factor).",
  },
  average: {
    multiplier: 1.00,
    label: "Average (1980–2005, R-13 walls, R-30 attic, double-pane glass)",
    description: "Baseline standard construction envelope (1.00x factor).",
  },
  good: {
    multiplier: 0.85,
    label: "Good (2006–Present, R-19+ walls, R-49 attic, Low-E glass)",
    description: "Tightly constructed modern building envelope (0.85x load factor).",
  },
  spray_foam: {
    multiplier: 0.70,
    label: "High Performance / Spray Foam Sealed Envelope",
    description: "Continuous air barrier with dense insulation (0.70x load factor).",
  },
};

// Standard residential gas furnace candidate nominal input ratings (BTU/hr)
export const CANDIDATE_FURNACE_SIZES = [40000, 60000, 80000, 100000, 120000, 140000];

/**
 * Calculates a preliminary furnace sizing estimate based on square footage,
 * climate zone, and simplified envelope screening factors.
 */
export function calculateFurnaceBtu(input: FurnaceBtuInput): FurnaceBtuOutput {
  const area = Math.max(100, input.floorAreaSqFt);
  const zone = input.climateZone || 3;
  const ceiling = Math.max(7, Math.min(24, input.ceilingHeightFeet || 8));
  const insulation = input.insulationGrade || "average";
  const sun = input.sunExposure || "average";
  const afue = Math.max(78, Math.min(99, input.afueRatingPercent || 96));
  const tempRise = Math.max(25, Math.min(70, input.temperatureRiseF || 45));

  // 1. Base climate screening BTU/sq ft
  const baseBtuPerSqFt = CLIMATE_ZONE_BTU_FACTORS[zone]?.btuPerSqFt ?? 40;

  // 2. Ceiling height modifier
  // Bounded volume/envelope factor: +4% per foot above 8 ft baseline (rather than multiplying the entire load by height/8)
  const ceilingMultiplier = Number((1 + (ceiling - 8) * 0.04).toFixed(3));

  // 3. Documented insulation multiplier
  const insMultiplier = INSULATION_FACTORS[insulation]?.multiplier ?? 1.0;

  // 4. Solar exposure screening factor
  const sunMultiplier = sun === "shaded" ? 1.05 : sun === "sunny" ? 0.95 : 1.00;

  // Estimated space heating load (BTU/hr)
  const estimatedHeatingLoadBtu = Math.round(area * baseBtuPerSqFt * ceilingMultiplier * insMultiplier * sunMultiplier);

  // Approximate input rating required (illustrative estimate using seasonal AFUE as a benchmark ratio)
  const approximateInputRequirementBtu = Math.round(estimatedHeatingLoadBtu / (afue / 100));

  // Select candidate nominal furnace size (upper tier) and candidate range
  let candidateNominalInputBtu = CANDIDATE_FURNACE_SIZES[CANDIDATE_FURNACE_SIZES.length - 1];
  let candidateNominalRange = "120k to 140k BTU/hr Input";

  for (let i = 0; i < CANDIDATE_FURNACE_SIZES.length; i++) {
    const size = CANDIDATE_FURNACE_SIZES[i];
    if (size >= approximateInputRequirementBtu) {
      candidateNominalInputBtu = size;
      if (i === 0) {
        candidateNominalRange = "40k to 60k BTU/hr Input";
      } else {
        const lower = CANDIDATE_FURNACE_SIZES[i - 1];
        candidateNominalRange = `${lower / 1000}k to ${size / 1000}k BTU/hr Input`;
      }
      break;
    }
  }

  // Typical cabinet width ranges (informational guidance across major manufacturers)
  let typicalCabinetWidthRange = "17.5\" (Typical B-Cabinet)";
  if (candidateNominalInputBtu <= 40000) typicalCabinetWidthRange = "14.5\" (Typical A-Cabinet)";
  else if (candidateNominalInputBtu <= 60000) typicalCabinetWidthRange = "14.5\" to 17.5\" (Typical A/B-Cabinet)";
  else if (candidateNominalInputBtu <= 80000) typicalCabinetWidthRange = "17.5\" to 21.0\" (Typical B/C-Cabinet)";
  else if (candidateNominalInputBtu <= 100000) typicalCabinetWidthRange = "21.0\" (Typical C-Cabinet)";
  else typicalCabinetWidthRange = "21.0\" to 24.5\" (Typical C/D-Cabinet)";

  // Theoretical heating airflow CFM = Estimated Load / (1.08 × Delta T)
  const theoreticalHeatingCfm = Math.round(estimatedHeatingLoadBtu / (1.08 * tempRise));

  const flueExhaustType = afue >= 90 ? "PVC / CPVC Direct Vent (Condensing)" : "Metal B-Vent Chimney";

  const screeningDisclaimers = [
    "Preliminary Screening Estimate: Square footage methods provide an approximate sizing range only and cannot substitute for an ACCA Manual J load calculation.",
    "AFUE vs. Rated Output: AFUE is a seasonal laboratory rating. Verify exact steady-state heating output on the manufacturer's submittal data sheet.",
    "Airflow & Static Pressure: Theoretical CFM is based on the selected temperature rise (ΔT); field airflow depends on duct static pressure and blower curve.",
    "Venting & Code: Confirm local mechanical code and venting requirements (Category I B-Vent vs. Category IV PVC/CPVC) prior to equipment selection.",
  ];

  const explanation = `For an illustrative ${area.toLocaleString()} sq ft home in ${CLIMATE_ZONE_BTU_FACTORS[zone].label}, the preliminary estimated heating load is ~${estimatedHeatingLoadBtu.toLocaleString()} BTU/hr. At ${afue}% AFUE, candidate nominal furnace ratings typically fall in the ${candidateNominalRange} range. Theoretical heating airflow at a ${tempRise}°F rise is approximately ${theoreticalHeatingCfm.toLocaleString()} CFM. Verify final sizing with a formal Manual J calculation and OEM submittal data.`;

  return {
    floorAreaSqFt: area,
    estimatedHeatingLoadBtu,
    requiredOutputBtu: estimatedHeatingLoadBtu,
    approximateInputRequirementBtu,
    afueRatingPercent: afue,
    candidateNominalInputBtu,
    candidateNominalRange,
    nominalFurnaceModelBtu: candidateNominalInputBtu,
    typicalCabinetWidthRange,
    recommendedCabinetWidth: typicalCabinetWidthRange,
    theoreticalHeatingCfm,
    requiredHeatingCfm: theoreticalHeatingCfm,
    flueExhaustType,
    explanation,
    screeningDisclaimers,
  };
}
