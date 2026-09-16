import fs from 'node:fs';
import path from 'node:path';

const cooktopTypes = ['gas', 'electric', 'induction'];
const cooktopWidths = [24, 30, 36, 42, 48, 60];
const mountings = ['wall', 'island'];
const ductLengths = [5, 15, 25, 40];
const elbowCounts = [1, 2, 3];
const roomVolumes = [800, 1200, 1800, 2400];

let csvContent = 'vector_id,cooktop_type,cooktop_width_in,gas_burner_btu,mounting_type,straight_duct_len_ft,elbows_90,kitchen_volume_cuft,base_thermal_cfm,mounting_multiplier,total_equivalent_length_ft,duct_adder_cfm,room_ach_cfm,final_recommended_cfm,recommended_duct_diameter_in,make_up_air_required,make_up_air_cfm_required\n';

let vectorId = 1;

for (const type of cooktopTypes) {
  for (const width of cooktopWidths) {
    for (const mounting of mountings) {
      for (const len of ductLengths) {
        for (const elbows of elbowCounts) {
          const gasBtu = type === 'gas' ? width * 1500 : 0;
          const widthFeet = width / 12;
          
          let baseThermal = 0;
          if (type === 'gas') {
            baseThermal = Math.round(gasBtu / 100);
          } else {
            baseThermal = Math.round(widthFeet * 100);
          }

          const multiplier = mounting === 'island' ? 1.30 : 1.00;
          const adjustedCfm = Math.round(baseThermal * multiplier);

          const tel = len + (elbows * 10) + 30;
          const ductAdder = tel > 30 ? Math.round((tel - 30) * 0.8) : 0;
          const volume = 1200;
          const achCfm = Math.round((volume * 15) / 60);

          const rawCfm = Math.max(adjustedCfm + ductAdder, achCfm);
          const finalCfm = Math.ceil(rawCfm / 50) * 50;

          let ductDia = 6;
          if (finalCfm > 900) ductDia = 10;
          else if (finalCfm > 600) ductDia = 8;
          else if (finalCfm > 350) ductDia = 7;

          const makeUpRequired = finalCfm > 400;
          const makeUpCfm = makeUpRequired ? finalCfm : 0;

          csvContent += `KH-VEC-${String(vectorId).padStart(4, '0')},${type},${width},${gasBtu},${mounting},${len},${elbows},${volume},${baseThermal},${multiplier.toFixed(2)},${tel},${ductAdder},${achCfm},${finalCfm},${ductDia},${makeUpRequired ? 'TRUE' : 'FALSE'},${makeUpCfm}\n`;
          vectorId++;
        }
      }
    }
  }
}

fs.mkdirSync('docs/datasets', { recursive: true });
fs.mkdirSync('public/datasets', { recursive: true });

fs.writeFileSync('public/datasets/kitchen_hood_exhaust_and_makeup_air_benchmark_2026.csv', csvContent);
fs.writeFileSync('docs/datasets/kitchen_hood_exhaust_and_makeup_air_benchmark_2026.csv', csvContent);

console.log(`✓ Successfully generated ${vectorId - 1} test vectors in kitchen_hood_exhaust_and_makeup_air_benchmark_2026.csv`);
