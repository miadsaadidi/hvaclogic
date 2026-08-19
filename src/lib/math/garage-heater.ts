/**
 * HVACLogic Garage & Workshop Heater Sizing Computational Engine
 * Implements ASHRAE Unit Heating Standards and ACCA Slab/Infiltration Formulations.
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
  targetIndoorTempF?: number; // e.g. 50°F (freeze protect) or 65°F (workshop comfort)
  outdoorDesignTempF: number; // e.g. -15°F to 35°F
  garageDoorCount?: number; // default 1 or 2 overhead doors
}

export interface GarageHeaterOutput {
  floorAreaSqFt: number;
  volumeCuFt: number;
  temperatureDifferenceDeltaT: number;
  conductiveLossBtu: number;
  slabEdgeLossBtu: number;
  overheadDoorLossBtu: number;
  infiltrationLossBtu: number;
  totalPeakHeatLossBtu: number;
  recommendedGasHeaterBtu: number;
  recommendedElectricHeaterKw: number;
  recommendedElectricAmps240V: number;
  recommendedCircuitBreakerAmps: number;
  isRadiantRecommended: boolean;
  summary: string;
}

const PRESET_DIMENSIONS: Record<Exclude<GaragePreset, "custom">, { width: number; length: number; height: number; doors: number }> = {
  "1_car": { width: 12, length: 22, height: 9, doors: 1 },
  "2_car": { width: 22, length: 24, height: 9, doors: 1 }, // Standard double door (16x7)
  "2_5_car": { width: 24, length: 26, height: 10, doors: 2 },
  "3_car": { width: 24, length: 32, height: 10, doors: 3 },
  pole_barn_shop: { width: 30, length: 40, height: 12, doors: 2 },
};

const INSULATION_SPECS: Record<GarageInsulationTier, { uWall: number; uCeiling: number; uDoor: number; ach: number; fSlab: number }> = {
  uninsulated: { uWall: 0.45, uCeiling: 0.45, uDoor: 1.15, ach: 1.25, fSlab: 0.60 },
  poor: { uWall: 0.12, uCeiling: 0.08, uDoor: 0.75, ach: 0.85, fSlab: 0.55 },
  average: { uWall: 0.07, uCeiling: 0.045, uDoor: 0.20, ach: 0.45, fSlab: 0.50 },
  insulated_good: { uWall: 0.048, uCeiling: 0.026, uDoor: 0.10, ach: 0.25, fSlab: 0.45 },
};

/**
 * Calculates whole-garage heat loss and sizes gas unit and electric forced-air heaters.
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
  const perimeter = 2 * (width + length);

  const tIndoor = input.targetIndoorTempF ?? 60;
  const tOutdoor = input.outdoorDesignTempF;
  const deltaT = Math.max(10, tIndoor - tOutdoor);

  const specs = INSULATION_SPECS[input.insulationLevel];

  // 1. Overhead Garage Door Loss (standard single = 8x7 = 56 sq ft, double = 16x7 = 112 sq ft)
  const overheadDoorArea = doors === 1 ? 112 : doors * 64;
  const overheadDoorLossBtu = Math.round(specs.uDoor * overheadDoorArea * deltaT);

  // 2. Above-Grade Wall Loss
  // If attached, assume 1 long wall is shared with conditioned home (0 loss)
  const exposedWallLinearFeet = input.isAttached ? perimeter - length : perimeter;
  const grossWallArea = exposedWallLinearFeet * height;
  const netWallArea = Math.max(50, grossWallArea - overheadDoorArea);
  const wallLossBtu = Math.round(specs.uWall * netWallArea * deltaT);

  // 3. Ceiling Loss
  const ceilingLossBtu = Math.round(specs.uCeiling * floorAreaSqFt * deltaT);

  // 4. Concrete Slab Edge Conduction Loss
  const slabEdgeLossBtu = Math.round(specs.fSlab * perimeter * deltaT);

  // 5. Infiltration Loss: Q = 1.08 * CFM * Delta T
  const infiltrationCfm = (volumeCuFt * specs.ach) / 60;
  const infiltrationLossBtu = Math.round(1.08 * infiltrationCfm * deltaT);

  const conductiveLossBtu = wallLossBtu + ceilingLossBtu;

  // Total Peak Loss with 1.10 warm-up recovery buffer
  const rawTotalLoss = (conductiveLossBtu + slabEdgeLossBtu + overheadDoorLossBtu + infiltrationLossBtu) * 1.10;
  const totalPeakHeatLossBtu = Math.round(rawTotalLoss);

  // Recommended Gas Unit Heater (standard sizes: 30k, 45k, 60k, 75k, 100k, 125k)
  const gasTiers = [30000, 45000, 60000, 75000, 100000, 125000, 150000, 200000];
  const requiredGasOutput = totalPeakHeatLossBtu;
  // Account for ~82% thermal efficiency of standard power-vent gas unit heaters
  const requiredGasInput = requiredGasOutput / 0.82;
  const recommendedGasHeaterBtu = gasTiers.find((tier) => tier >= requiredGasInput) || Math.ceil(requiredGasInput / 10000) * 10000;

  // Recommended Electric Forced-Air Heater (kW)
  const electricKwTiers = [3.0, 4.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0];
  const rawElectricKw = totalPeakHeatLossBtu / 3412.14;
  const recommendedElectricHeaterKw = electricKwTiers.find((kw) => kw >= rawElectricKw) || Math.ceil(rawElectricKw);

  // Electric Circuit Sizing @ 240V (Amps = Watts / 240, Circuit Breaker = Amps * 1.25)
  const electricWatts = recommendedElectricHeaterKw * 1000;
  const recommendedElectricAmps240V = Math.round((electricWatts / 240) * 10) / 10;
  const breakerTiers = [15, 20, 25, 30, 40, 50, 60, 70, 80, 100];
  const continuousAmps = recommendedElectricAmps240V * 1.25;
  const recommendedCircuitBreakerAmps = breakerTiers.find((b) => b >= continuousAmps) || Math.ceil(continuousAmps / 10) * 10;

  // Radiant tube recommendation for high ceilings (>= 12 ft)
  const isRadiantRecommended = height >= 12;

  const summary = `At ${tOutdoor}°F design temperature, total garage peak heat loss is ${totalPeakHeatLossBtu.toLocaleString()} BTU/hr for a ${floorAreaSqFt} sq ft space (${deltaT}°F ΔT). Recommended equipment: ${recommendedGasHeaterBtu.toLocaleString()} BTU Gas Unit Heater or ${recommendedElectricHeaterKw} kW Electric Heater (${recommendedElectricAmps240V}A @ 240V on a ${recommendedCircuitBreakerAmps}A breaker).`;

  return {
    floorAreaSqFt,
    volumeCuFt,
    temperatureDifferenceDeltaT: deltaT,
    conductiveLossBtu,
    slabEdgeLossBtu,
    overheadDoorLossBtu,
    infiltrationLossBtu,
    totalPeakHeatLossBtu,
    recommendedGasHeaterBtu,
    recommendedElectricHeaterKw,
    recommendedElectricAmps240V,
    recommendedCircuitBreakerAmps,
    isRadiantRecommended,
    summary,
  };
}
