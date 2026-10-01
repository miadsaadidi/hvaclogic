/**
 * HVACLogic Garage & Workshop Heater Sizing Computational Engine
 * Implements preliminary screening heat-loss calculations based on ASHRAE Handbook of
 * Fundamentals envelope conduction and slab-edge perimeter methods, with NEC Article 424
 * electrical circuit sizing and NFPA 54 / commercial gas unit heater capacity selection.
 */

export type GaragePreset = "1_car" | "2_car" | "2_5_car" | "3_car" | "pole_barn_shop" | "custom";
export type GarageInsulationTier = "uninsulated" | "poor" | "average" | "insulated_good";

export interface GarageHeaterInput {
  preset: GaragePreset;
  customWidthFt?: number;
  customLengthFt?: number;
  ceilingHeightFt?: number;
  isAttached?: boolean;
  insulationLevel: GarageInsulationTier;
  targetIndoorTempF?: number; // e.g. 50°F (freeze protect), 60°F (workshop), 65°F (active comfort)
  outdoorDesignTempF: number; // Winter 99% or custom outdoor design temperature
  garageDoorCount?: number; // default 1 (double door) or 2/3 (single doors)
  infiltrationAch?: number; // Optional user override for Air Changes per Hour
  warmupMarginPercent?: number; // Optional recovery/warm-up margin (default 10%, range 0-25%)
  gasEfficiency?: number; // Thermal efficiency for gas unit heaters (default 0.82)
}

export interface GarageHeaterOutput {
  floorAreaSqFt: number;
  volumeCuFt: number;
  exposedPerimeterFt: number;
  totalPerimeterFt: number;
  temperatureDifferenceDeltaT: number;
  overheadDoorLossBtu: number;
  wallLossBtu: number;
  ceilingLossBtu: number;
  conductiveLossBtu: number;
  slabEdgeLossBtu: number;
  infiltrationCfm: number;
  infiltrationLossBtu: number;
  baseSteadyStateLossBtu: number;
  warmupMarginPercent: number;
  warmupMarginBtu: number;
  totalPeakHeatLossBtu: number;
  requiredElectricKw: number;
  recommendedElectricHeaterKw: number;
  recommendedElectricAmps240V: number;
  minimumCircuitAmpacity: number;
  recommendedCircuitBreakerAmps: number;
  requiredGasOutputBtu: number;
  requiredGasInputBtu: number;
  recommendedGasHeaterBtu: number;
  deliveredGasOutputBtu: number;
  isRadiantRecommended: boolean;
  summary: string;
}

export const PRESET_DIMENSIONS: Record<Exclude<GaragePreset, "custom">, { width: number; length: number; height: number; doors: number; label: string }> = {
  "1_car": { width: 12, length: 22, height: 9, doors: 1, label: "1-Car Garage (12' × 22' = 264 sq ft)" },
  "2_car": { width: 22, length: 24, height: 9, doors: 1, label: "2-Car Garage (22' × 24' = 528 sq ft)" }, // Standard double door (16x7)
  "2_5_car": { width: 24, length: 26, height: 10, doors: 2, label: "2.5-Car Garage (24' × 26' = 624 sq ft)" },
  "3_car": { width: 24, length: 32, height: 10, doors: 3, label: "3-Car Garage (24' × 32' = 768 sq ft)" },
  pole_barn_shop: { width: 30, length: 40, height: 12, doors: 2, label: "Shop / Pole Barn (30' × 40' = 1,200 sq ft)" },
};

export const INSULATION_SPECS: Record<GarageInsulationTier, { label: string; uWall: number; uCeiling: number; uDoor: number; ach: number; fSlab: number; description: string }> = {
  uninsulated: {
    label: "Uninsulated",
    uWall: 0.45, // Uninsulated 2x4 framing / metal skin (R-2.2)
    uCeiling: 0.45, // Open rafters / roof deck
    uDoor: 1.15, // Single uninsulated steel or wood panel roll-up door
    ach: 1.25, // High leakage / loose construction
    fSlab: 0.60, // Uninsulated concrete slab perimeter
    description: "Uninsulated stud walls, open ceiling rafters, non-insulated roll-up door, high air infiltration.",
  },
  poor: {
    label: "Poor",
    uWall: 0.12, // R-7 to R-8 batt insulation
    uCeiling: 0.08, // R-11 ceiling
    uDoor: 0.75, // Basic non-thermal break door
    ach: 0.85, // Moderate drafts
    fSlab: 0.55, // Uninsulated slab edge
    description: "R-7/8 partial wall batts, minimal ceiling insulation, older sectional door.",
  },
  average: {
    label: "Average",
    uWall: 0.07, // Standard R-13 2x4 cavity insulation with drywall
    uCeiling: 0.045, // R-19 to R-22 blown/batt ceiling
    uDoor: 0.20, // R-6 to R-8 insulated polyurethane/polystyrene core sectional door
    ach: 0.45, // Standard weatherstripped garage
    fSlab: 0.50, // Standard on-grade concrete slab edge
    description: "Drywalled R-13 walls, R-19 ceiling, R-6 insulated sectional overhead door, standard perimeter seals.",
  },
  insulated_good: {
    label: "Good / Well Insulated",
    uWall: 0.048, // R-19 to R-21 2x6 wall assembly
    uCeiling: 0.026, // R-38 blown attic insulation
    uDoor: 0.10, // Premium R-12 to R-16 injected foam commercial door
    ach: 0.25, // Tight weatherstripping & sealed penetrations
    fSlab: 0.45, // Insulated slab edge / conditioned foundation
    description: "R-19/21 2x6 walls, R-38 ceiling, R-12+ injected foam insulated door, tight perimeter gaskets.",
  },
};

/**
 * Calculates whole-garage steady-state heat loss, recovery margin, and equipment sizing.
 */
export function calculateGarageHeater(input: GarageHeaterInput): GarageHeaterOutput {
  let width = 22;
  let length = 24;
  let height = input.ceilingHeightFt ?? 9;
  let doors = input.garageDoorCount ?? 1;

  if (input.preset !== "custom") {
    const p = PRESET_DIMENSIONS[input.preset];
    width = p.width;
    length = p.length;
    height = input.ceilingHeightFt ?? p.height;
    doors = input.garageDoorCount ?? p.doors;
  } else {
    width = Math.max(10, input.customWidthFt ?? 20);
    length = Math.max(10, input.customLengthFt ?? 20);
  }

  const floorAreaSqFt = width * length;
  const volumeCuFt = floorAreaSqFt * height;
  const totalPerimeterFt = 2 * (width + length);

  const tIndoor = input.targetIndoorTempF ?? 60;
  const tOutdoor = input.outdoorDesignTempF;
  const deltaT = Math.max(5, tIndoor - tOutdoor);

  const specs = INSULATION_SPECS[input.insulationLevel];
  const ach = input.infiltrationAch !== undefined && input.infiltrationAch > 0 ? input.infiltrationAch : specs.ach;
  const warmupMarginPercent = input.warmupMarginPercent !== undefined && input.warmupMarginPercent >= 0 ? input.warmupMarginPercent : 10;
  const gasEff = input.gasEfficiency !== undefined && input.gasEfficiency > 0.5 ? input.gasEfficiency : 0.82;

  // 1. Overhead Garage Door Conduction Loss
  // Standard single door = 8'x7' (56 sq ft) or double door = 16'x7' (112 sq ft)
  const overheadDoorArea = doors === 1 ? 112 : doors * 64;
  const overheadDoorLossBtu = Math.round(specs.uDoor * overheadDoorArea * deltaT);

  // 2. Above-Grade Wall Conduction Loss
  // If attached, assume 1 shared wall with conditioned home (0 net transmission loss)
  const exposedPerimeterFt = input.isAttached ? totalPerimeterFt - length : totalPerimeterFt;
  const grossWallArea = exposedPerimeterFt * height;
  const netWallArea = Math.max(50, grossWallArea - overheadDoorArea);
  const wallLossBtu = Math.round(specs.uWall * netWallArea * deltaT);

  // 3. Ceiling Conduction Loss
  const ceilingLossBtu = Math.round(specs.uCeiling * floorAreaSqFt * deltaT);

  // 4. Concrete Slab Edge Conduction Loss (ASHRAE perimeter method: Q = F_p * P * Delta T)
  const slabEdgeLossBtu = Math.round(specs.fSlab * totalPerimeterFt * deltaT);

  // 5. Infiltration Draft Loss: Q = 1.08 * CFM * Delta T
  const infiltrationCfm = Math.round(((volumeCuFt * ach) / 60) * 100) / 100;
  const infiltrationLossBtu = Math.round(1.08 * infiltrationCfm * deltaT);

  const conductiveLossBtu = wallLossBtu + ceilingLossBtu;
  const baseSteadyStateLossBtu = wallLossBtu + ceilingLossBtu + overheadDoorLossBtu + slabEdgeLossBtu + infiltrationLossBtu;

  // Warm-up / Recovery Margin
  const warmupMarginBtu = Math.round(baseSteadyStateLossBtu * (warmupMarginPercent / 100));
  const totalPeakHeatLossBtu = baseSteadyStateLossBtu + warmupMarginBtu;

  // 6. Electric Forced-Air Unit Heater Sizing (kW)
  // 1 kW = 3412.14 BTU/hr
  const requiredElectricKw = Math.round((totalPeakHeatLossBtu / 3412.14) * 100) / 100;
  const electricKwTiers = [3.0, 4.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0, 25.0, 30.0];
  const recommendedElectricHeaterKw = electricKwTiers.find((kw) => kw >= requiredElectricKw) || Math.ceil(requiredElectricKw);

  // Electrical Circuit Parameters @ 240V 1-Phase
  const electricWatts = recommendedElectricHeaterKw * 1000;
  const recommendedElectricAmps240V = Math.round((electricWatts / 240) * 10) / 10;
  // NEC Article 424 continuous duty rule: Minimum Circuit Ampacity (MCA) = 125% of load current
  const minimumCircuitAmpacity = Math.round(recommendedElectricAmps240V * 1.25 * 10) / 10;
  const breakerTiers = [15, 20, 25, 30, 40, 50, 60, 70, 80, 100];
  const recommendedCircuitBreakerAmps = breakerTiers.find((b) => b >= minimumCircuitAmpacity) || Math.ceil(minimumCircuitAmpacity / 10) * 10;

  // 7. Gas Unit Heater Sizing (BTU/hr Input Rating)
  // Standard discrete commercial/residential power-vent gas unit heater tiers (BTU/hr input)
  const gasTiers = [30000, 45000, 60000, 75000, 100000, 125000, 150000, 200000, 250000];
  const requiredGasOutputBtu = totalPeakHeatLossBtu;
  const requiredGasInputBtu = Math.round(requiredGasOutputBtu / gasEff);
  const recommendedGasHeaterBtu = gasTiers.find((tier) => tier >= requiredGasInputBtu) || Math.ceil(requiredGasInputBtu / 10000) * 10000;
  const deliveredGasOutputBtu = Math.round(recommendedGasHeaterBtu * gasEff);

  // Radiant tube recommendation for high ceiling applications (>= 12 ft)
  const isRadiantRecommended = height >= 12;

  const summary = `At ${tOutdoor}°F outdoor design temp, steady-state heat loss is ${baseSteadyStateLossBtu.toLocaleString()} BTU/hr for a ${floorAreaSqFt} sq ft space (${deltaT}°F ΔT). With a ${warmupMarginPercent}% warm-up margin, design demand is ${totalPeakHeatLossBtu.toLocaleString()} BTU/hr (${requiredElectricKw} kW). Available equipment: ${recommendedGasHeaterBtu.toLocaleString()} BTU/hr Gas Unit Heater (delivering ${deliveredGasOutputBtu.toLocaleString()} BTU/hr @ ${(gasEff * 100).toFixed(0)}% eff) or ${recommendedElectricHeaterKw} kW Electric Unit Heater (${recommendedElectricAmps240V}A @ 240V, MCA ${minimumCircuitAmpacity}A on a ${recommendedCircuitBreakerAmps}A 2-pole breaker).`;

  return {
    floorAreaSqFt,
    volumeCuFt,
    exposedPerimeterFt,
    totalPerimeterFt,
    temperatureDifferenceDeltaT: deltaT,
    overheadDoorLossBtu,
    wallLossBtu,
    ceilingLossBtu,
    conductiveLossBtu,
    slabEdgeLossBtu,
    infiltrationCfm,
    infiltrationLossBtu,
    baseSteadyStateLossBtu,
    warmupMarginPercent,
    warmupMarginBtu,
    totalPeakHeatLossBtu,
    requiredElectricKw,
    recommendedElectricHeaterKw,
    recommendedElectricAmps240V,
    minimumCircuitAmpacity,
    recommendedCircuitBreakerAmps,
    requiredGasOutputBtu,
    requiredGasInputBtu,
    recommendedGasHeaterBtu,
    deliveredGasOutputBtu,
    isRadiantRecommended,
    summary,
  };
}
