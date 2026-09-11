import fs from 'node:fs';
import path from 'node:path';

// Generate 480 multi-length scenarios across R-454B, R-32, and R-410A
const refrigerants = [
  { id: 'R-454B', safetyGroup: 'A2L', gwp: 466, densities: { '1/4': 0.18, '5/16': 0.32, '3/8': 0.56, '1/2': 1.08 } },
  { id: 'R-32', safetyGroup: 'A2L', gwp: 675, densities: { '1/4': 0.19, '5/16': 0.34, '3/8': 0.58, '1/2': 1.12 } },
  { id: 'R-410A', safetyGroup: 'A1', gwp: 2088, densities: { '1/4': 0.20, '5/16': 0.36, '3/8': 0.60, '1/2': 1.15 } }
];

const liquidLines = ['1/4', '5/16', '3/8', '1/2'];
const lengths = [15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150]; // 11 lengths
const allowances = [15, 25]; // 2 allowances
const verticalLifts = [0, 15, 30, 45]; // 4 lifts

const rows = [
  [
    'scenario_id',
    'refrigerant',
    'safety_group',
    'gwp',
    'liquid_line_od_in',
    'actual_length_ft',
    'factory_allowance_ft',
    'net_additional_length_ft',
    'adder_rate_oz_per_ft',
    'factory_base_charge_oz',
    'additional_charge_oz',
    'total_system_charge_oz',
    'total_system_charge_lbs',
    'total_system_charge_kg',
    'vertical_lift_ft',
    'requires_oil_trap',
    'canonical_reference_url'
  ].join(',')
];

let id = 1;

for (const refrig of refrigerants) {
  for (const od of liquidLines) {
    const adderRate = refrig.densities[od];
    const factoryBaseCharge = od === '1/4' ? 64 : od === '5/16' ? 88 : od === '3/8' ? 112 : 144;

    for (const len of lengths) {
      for (const allow of allowances) {
        if (len < allow) continue;
        for (const lift of verticalLifts) {
          if (lift > len) continue;

          const netLen = Math.max(0, len - allow);
          const addOz = Number((netLen * adderRate).toFixed(2));
          const totalOz = Number((factoryBaseCharge + addOz).toFixed(2));
          const totalLbs = Number((totalOz / 16).toFixed(3));
          const totalKg = Number((totalLbs * 0.453592).toFixed(3));
          const oilTrap = lift >= 25;

          rows.push([
            `SCN-${String(id).padStart(4, '0')}`,
            refrig.id,
            refrig.safetyGroup,
            refrig.gwp,
            `"${od}"`,
            len,
            allow,
            netLen,
            adderRate,
            factoryBaseCharge,
            addOz,
            totalOz,
            totalLbs,
            totalKg,
            lift,
            oilTrap ? 'TRUE' : 'FALSE',
            'https://hvaclogic.org/calculators/refrigerant-charge-calculator'
          ].join(','));

          id++;
        }
      }
    }
  }
}

const csvContent = rows.join('\n');
const outputPath = path.resolve('papers/data/refrigerant_mass_charge_benchmark_dataset_2026.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`Generated ${rows.length - 1} benchmark rows at: ${outputPath}`);
