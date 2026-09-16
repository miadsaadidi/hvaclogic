import fs from 'node:fs';
import path from 'node:path';

// Generate 540 deterministic test vectors across appliance inputs, room sizes, and louver materials
const applianceInputs = [25000, 40000, 60000, 80000, 100000, 125000, 150000, 180000, 200000, 250000];
const roomLengths = [6, 8, 10, 12, 15, 20];
const roomWidths = [6, 8, 10, 12, 15, 20];
const roomHeight = 8;
const louverTypes = ['metal', 'wood', 'direct_screen'];

const louverMults = {
  metal: 1.333,
  wood: 4.0,
  direct_screen: 1.0,
};

let csvContent = 'vector_id,total_input_btu,room_len_ft,room_wid_ft,room_hgt_ft,room_vol_cuft,req_unconfined_vol_cuft,is_confined_space,vol_deficit_cuft,louver_type,indoor_2op_net_sqin,indoor_2op_gross_sqin,outdoor_vert_2op_net_sqin,outdoor_vert_2op_gross_sqin,outdoor_horiz_2op_net_sqin,outdoor_horiz_2op_gross_sqin,outdoor_single_net_sqin,outdoor_single_gross_sqin\n';

let vectorId = 1;

for (const btu of applianceInputs) {
  for (const len of roomLengths) {
    for (const wid of roomWidths) {
      for (const louver of louverTypes) {
        const vol = len * wid * roomHeight;
        const reqVol = (btu / 1000) * 50;
        const isConfined = vol < reqVol;
        const deficit = Math.max(0, reqVol - vol);
        const mult = louverMults[louver];

        // Method 1: Indoor 2 Openings (1 sq in / 1,000 BTU, min 100 sq in)
        const indoorNet = Math.max(100, Math.round(btu / 1000));
        const indoorGross = Math.round(indoorNet * mult);

        // Method 2: Outdoor Vertical 2 Openings (1 sq in / 4,000 BTU, min 10 sq in)
        const vertNet = Math.max(10, Math.round(btu / 4000));
        const vertGross = Math.round(vertNet * mult);

        // Method 3: Outdoor Horizontal 2 Openings (1 sq in / 2,000 BTU, min 10 sq in)
        const horizNet = Math.max(10, Math.round(btu / 2000));
        const horizGross = Math.round(horizNet * mult);

        // Method 4: Outdoor Single Opening (1 sq in / 3,000 BTU, min 10 sq in)
        const singleNet = Math.max(10, Math.round(btu / 3000));
        const singleGross = Math.round(singleNet * mult);

        csvContent += `CA-VEC-${String(vectorId).padStart(4, '0')},${btu},${len},${wid},${roomHeight},${vol},${reqVol},${isConfined ? 'TRUE' : 'FALSE'},${deficit},${louver},${indoorNet},${indoorGross},${vertNet},${vertGross},${horizNet},${horizGross},${singleNet},${singleGross}\n`;
        vectorId++;

        if (vectorId > 540) break;
      }
      if (vectorId > 540) break;
    }
    if (vectorId > 540) break;
  }
  if (vectorId > 540) break;
}

fs.mkdirSync('docs/datasets', { recursive: true });
fs.mkdirSync('public/datasets', { recursive: true });

fs.writeFileSync('public/datasets/combustion_air_and_confined_space_benchmark_2026.csv', csvContent);
fs.writeFileSync('docs/datasets/combustion_air_and_confined_space_benchmark_2026.csv', csvContent);

console.log(`✓ Successfully generated ${vectorId - 1} benchmark vectors in combustion_air_and_confined_space_benchmark_2026.csv`);
