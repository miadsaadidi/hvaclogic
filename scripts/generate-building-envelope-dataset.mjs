import fs from 'node:fs';
import path from 'node:path';

// Define the multi-parameter dimensions: 5 CZ x 4 Walls x 3 Windows x 3 Infiltration x 3 Sizes = 540 Scenarios

const climateZones = [
  { id: 'CZ-2', name: 'Hot-Humid (Orlando/Houston)', summerDb: 95, summerWb: 78, winterDb: 35, wOut: 0.0195, ceilU: 0.033 },
  { id: 'CZ-3', name: 'Warm (Atlanta/Dallas)', summerDb: 93, summerWb: 75, winterDb: 25, wOut: 0.0165, ceilU: 0.026 },
  { id: 'CZ-4', name: 'Mixed (DC/St. Louis)', summerDb: 90, summerWb: 74, winterDb: 15, wOut: 0.0150, ceilU: 0.026 },
  { id: 'CZ-5', name: 'Cold (Chicago/Denver)', summerDb: 88, summerWb: 72, winterDb: 0, wOut: 0.0135, ceilU: 0.020 },
  { id: 'CZ-6', name: 'Very Cold (Minneapolis/Helena)', summerDb: 86, summerWb: 70, winterDb: -15, wOut: 0.0125, ceilU: 0.020 }
];

const wallAssemblies = [
  { id: 'R-11_2x4_16OC_Legacy', description: '2x4 16OC Cavity R-11 (25% framing factor, uninsulated headers)', effectiveU: 0.106 },
  { id: 'R-19_2x6_16OC_Standard', description: '2x6 16OC Cavity R-19 (22% framing factor)', effectiveU: 0.063 },
  { id: 'R-21_2x6_24OC_Advanced', description: '2x6 24OC Cavity R-21 Advanced Framing (16% framing factor)', effectiveU: 0.052 },
  { id: 'R-20+5ci_HighPerformance', description: '2x6 Cavity R-20 + R-5 Continuous Exterior Polyiso (ci)', effectiveU: 0.040 }
];

const fenestrations = [
  { id: 'Single_Clear_Aluminum', description: 'Single Glazed Clear Aluminum Frame (Legacy)', uFactor: 1.05, shgc: 0.72 },
  { id: 'Double_Clear_Metal', description: 'Double Glazed Clear Metal Frame with Thermal Break', uFactor: 0.48, shgc: 0.58 },
  { id: 'Double_LowE_Argon_Vinyl', description: 'Double Glazed Low-E Argon Vinyl Frame (Modern Code)', uFactor: 0.28, shgc: 0.24 }
];

const infiltrationLevels = [
  { id: 'Leaky_Legacy_8.5ACH50', description: 'Pre-1990 Leaky Envelope', ach50: 8.5 },
  { id: 'Code_Baseline_3.5ACH50', description: 'IECC 2018/2021 Standard Enclosure', ach50: 3.5 },
  { id: 'Tight_Performance_1.2ACH50', description: 'High-Performance Aerosol-Sealed Enclosure', ach50: 1.2 }
];

const dwellingSizes = [
  { id: 'Compact_1500sqft', floorArea: 1500, volume: 12000, grossWallArea: 1400, fenArea: 210, ceilArea: 1500, occupants: 3, baseInternalSensible: 2100 },
  { id: 'Suburban_2500sqft', floorArea: 2500, volume: 21250, grossWallArea: 2000, fenArea: 320, ceilArea: 2500, occupants: 4, baseInternalSensible: 2500 },
  { id: 'Large_3600sqft', floorArea: 3600, volume: 32400, grossWallArea: 2600, fenArea: 450, ceilArea: 3600, occupants: 5, baseInternalSensible: 2900 }
];

const indoorWinterDb = 70; // °F
const indoorSummerDb = 75; // °F
const indoorSummerW = 0.0100; // 50% RH at 75°F (grains: 70 grains/lb)
const nFactor = 18.2; // Sherman-Grimsrud LBL correlation for 2-story residential
const solarIntensityAvg = 65; // BTU/(hr*ft²) average solar irradiance on windows
const internalShadingCoeff = 0.80; // Blinds / interior shades

const headers = [
  'scenario_id',
  'climate_zone',
  'climate_zone_name',
  'outdoor_winter_db_f',
  'outdoor_summer_db_f',
  'outdoor_summer_wb_f',
  'indoor_winter_setpoint_f',
  'indoor_summer_setpoint_f',
  'floor_area_sqft',
  'dwelling_volume_cuft',
  'wall_assembly_id',
  'wall_effective_u_factor',
  'fenestration_id',
  'fenestration_u_factor',
  'fenestration_shgc',
  'infiltration_ach50',
  'infiltration_design_cfm',
  'heating_conduction_loss_btu_h',
  'heating_infiltration_loss_btu_h',
  'total_peak_heating_load_btu_h',
  'summer_conduction_gain_btu_h',
  'summer_fenestration_solar_gain_btu_h',
  'summer_sensible_infiltration_btu_h',
  'summer_internal_sensible_gain_btu_h',
  'total_cooling_sensible_load_btu_h',
  'total_cooling_latent_load_btu_h',
  'total_cooling_peak_load_btu_h',
  'calculated_cooling_tonnage',
  'rule_of_thumb_tonnage_500sqft',
  'heuristic_oversize_percentage',
  'sensible_heat_ratio_shr',
  'canonical_reference_url'
];

const rows = [headers.join(',')];
const jsonRecords = [];

let counter = 1;

for (const cz of climateZones) {
  for (const wall of wallAssemblies) {
    for (const fen of fenestrations) {
      for (const inf of infiltrationLevels) {
        for (const size of dwellingSizes) {
          const scenarioId = `ENV-${String(counter).padStart(4, '0')}`;

          // Infiltration design CFM per Sherman-Grimsrud LBL conversion
          const achNat = inf.ach50 / nFactor;
          const infilCfm = Number(((achNat * size.volume) / 60).toFixed(1));

          // 1. Heating Loads
          const deltaTHeat = indoorWinterDb - cz.winterDb;
          const netWallArea = size.grossWallArea - size.fenArea;
          const qWallHeat = wall.effectiveU * netWallArea * deltaTHeat;
          const qFenHeat = fen.uFactor * size.fenArea * deltaTHeat;
          const qCeilHeat = cz.ceilU * size.ceilArea * deltaTHeat;
          const qFloorHeat = 0.038 * size.floorArea * deltaTHeat; // Ground-coupled / crawlspace loss
          const qCondHeat = Math.round(qWallHeat + qFenHeat + qCeilHeat + qFloorHeat);
          const qInfilHeat = Math.round(1.08 * infilCfm * deltaTHeat);
          const qTotalHeat = qCondHeat + qInfilHeat;

          // 2. Cooling Loads
          const deltaTCool = Math.max(0, cz.summerDb - indoorSummerDb);
          const qWallCool = wall.effectiveU * netWallArea * (deltaTCool + 8); // Sol-air exterior bump
          const qFenCoolCond = fen.uFactor * size.fenArea * deltaTCool;
          const qCeilCool = cz.ceilU * size.ceilArea * (deltaTCool + 24); // Attic radiative effect
          const qCondCool = Math.round(qWallCool + qFenCoolCond + qCeilCool);

          // Solar heat gain through fenestration
          const qFenSolar = Math.round(size.fenArea * fen.shgc * solarIntensityAvg * internalShadingCoeff);

          // Sensible infiltration cooling
          const qInfilCoolSens = Math.round(1.08 * infilCfm * deltaTCool);

          // Internal sensible gain (occupants + appliances)
          const qIntSens = Math.round(size.baseInternalSensible + (size.occupants * 230));

          // Total sensible cooling load
          const qSensCool = qCondCool + qFenSolar + qInfilCoolSens + qIntSens;

          // Latent cooling load: infiltration moisture + occupant respiration (200 BTU/h/person)
          const deltaW = Math.max(0, cz.wOut - indoorSummerW);
          const qInfilCoolLat = 4840 * infilCfm * deltaW;
          const qOccupantLat = size.occupants * 200;
          const qLatCool = Math.round(qInfilCoolLat + qOccupantLat);

          // Total cooling load
          const qCoolTotal = qSensCool + qLatCool;

          // Equipment sizing metrics
          const calcTonnage = Number((qCoolTotal / 12000).toFixed(2));
          const ruleTonnage = Number((size.floorArea / 500).toFixed(2));
          const oversizePct = Number((((ruleTonnage - calcTonnage) / calcTonnage) * 100).toFixed(1));
          const shr = Number((qSensCool / qCoolTotal).toFixed(3));

          const record = {
            scenario_id: scenarioId,
            climate_zone: cz.id,
            climate_zone_name: cz.name,
            outdoor_winter_db_f: cz.winterDb,
            outdoor_summer_db_f: cz.summerDb,
            outdoor_summer_wb_f: cz.summerWb,
            indoor_winter_setpoint_f: indoorWinterDb,
            indoor_summer_setpoint_f: indoorSummerDb,
            floor_area_sqft: size.floorArea,
            dwelling_volume_cuft: size.volume,
            wall_assembly_id: wall.id,
            wall_effective_u_factor: wall.effectiveU,
            fenestration_id: fen.id,
            fenestration_u_factor: fen.uFactor,
            fenestration_shgc: fen.shgc,
            infiltration_ach50: inf.ach50,
            infiltration_design_cfm: infilCfm,
            heating_conduction_loss_btu_h: qCondHeat,
            heating_infiltration_loss_btu_h: qInfilHeat,
            total_peak_heating_load_btu_h: qTotalHeat,
            summer_conduction_gain_btu_h: qCondCool,
            summer_fenestration_solar_gain_btu_h: qFenSolar,
            summer_sensible_infiltration_btu_h: qInfilCoolSens,
            summer_internal_sensible_gain_btu_h: qIntSens,
            total_cooling_sensible_load_btu_h: qSensCool,
            total_cooling_latent_load_btu_h: qLatCool,
            total_cooling_peak_load_btu_h: qCoolTotal,
            calculated_cooling_tonnage: calcTonnage,
            rule_of_thumb_tonnage_500sqft: ruleTonnage,
            heuristic_oversize_percentage: oversizePct,
            sensible_heat_ratio_shr: shr,
            canonical_reference_url: 'https://hvaclogic.org/calculators/btu-calculator'
          };

          jsonRecords.push(record);

          rows.push([
            scenarioId,
            cz.id,
            `"${cz.name}"`,
            cz.winterDb,
            cz.summerDb,
            cz.summerWb,
            indoorWinterDb,
            indoorSummerDb,
            size.floorArea,
            size.volume,
            wall.id,
            wall.effectiveU,
            fen.id,
            fen.uFactor,
            fen.shgc,
            inf.ach50,
            infilCfm,
            qCondHeat,
            qInfilHeat,
            qTotalHeat,
            qCondCool,
            qFenSolar,
            qInfilCoolSens,
            qIntSens,
            qSensCool,
            qLatCool,
            qCoolTotal,
            calcTonnage,
            ruleTonnage,
            oversizePct,
            shr,
            'https://hvaclogic.org/calculators/btu-calculator'
          ].join(','));

          counter++;
        }
      }
    }
  }
}

const csvOutput = rows.join('\n');

// Write CSV outputs
const papersCsvPath = path.resolve('papers/data/building_envelope_thermal_transmission_benchmark_dataset_2026.csv');
const publicCsvPath = path.resolve('public/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.csv');

fs.writeFileSync(papersCsvPath, csvOutput, 'utf8');
fs.writeFileSync(publicCsvPath, csvOutput, 'utf8');

// Write JSON outputs
const papersJsonPath = path.resolve('papers/data/building_envelope_thermal_transmission_benchmark_dataset_2026.json');
const publicJsonPath = path.resolve('public/datasets/building_envelope_thermal_transmission_benchmark_dataset_2026.json');

const jsonOutput = JSON.stringify({
  metadata: {
    title: 'Benchmark Matrix: Building Envelope Thermal Transmission, Fenestration SHGC, and Infiltration Sizing per ACCA Manual J',
    identifier: 'FIG-04',
    total_records: jsonRecords.length,
    generated_at: new Date().toISOString(),
    governing_standards: ['ACCA Manual J (8th Edition)', 'ASHRAE Handbook of Fundamentals', 'IECC 2021/2024'],
    canonical_url: 'https://hvaclogic.org/calculators/btu-calculator',
    license: 'CC BY 4.0'
  },
  records: jsonRecords
}, null, 2);

fs.writeFileSync(papersJsonPath, jsonOutput, 'utf8');
fs.writeFileSync(publicJsonPath, jsonOutput, 'utf8');

console.log(`Successfully generated ${jsonRecords.length} benchmark records at:`);
console.log(`- ${papersCsvPath}`);
console.log(`- ${publicCsvPath}`);
console.log(`- ${papersJsonPath}`);
console.log(`- ${publicJsonPath}`);
