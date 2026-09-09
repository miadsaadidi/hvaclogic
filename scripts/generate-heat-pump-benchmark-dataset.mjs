import fs from 'node:fs';
import path from 'node:path';

function generateHeatPumpDataset() {
  const outputPath = path.resolve('public/datasets/hvaclogic_cold_climate_heat_pump_cop_benchmark.csv');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const rows = [];
  rows.push([
    'Record_ID',
    'Outdoor_Temp_degF',
    'Indoor_Temp_degF',
    'Design_Heat_Loss_Btu_hr',
    'Nominal_Tonnage',
    'Rated_Heating_Cap_47F_Btu',
    'Compressor_Speed',
    'Operating_COP',
    'Gross_Heating_Cap_Btu_hr',
    'Defrost_Derate_Factor',
    'Effective_Heating_Cap_Btu_hr',
    'Building_Heat_Demand_Btu_hr',
    'Thermal_Deficit_Btu_hr',
    'Aux_Electric_Heat_kW',
    'Balance_Point_Status'
  ].join(','));

  const designLosses = [24000, 36000, 48000, 60000]; // 4 building sizes
  const tonnages = [2.0, 3.0, 4.0, 5.0];
  const temps = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 15 temps
  const speeds = ['min', 'rated', 'max'];

  let idCounter = 1;

  for (const loss of designLosses) {
    for (const tons of tonnages) {
      for (const temp of temps) {
        // Evaluate for rated condition
        const ratedCap47 = tons * 12000;
        
        // Temperature ratio
        const tRatio = (temp + 15) / 62; // normalized -15F to 47F
        
        // COP model
        let cop = 1.40 + 0.045 * (temp + 15);
        if (cop > 4.40) cop = 4.40;
        if (cop < 1.30) cop = 1.30;

        // Defrost penalty between 25F and 40F
        let defrostFactor = 1.00;
        if (temp >= 25 && temp <= 38) {
          defrostFactor = 0.86 + 0.005 * Math.abs(temp - 32);
        }

        // Capacity retention
        let capMult = 0.45 + 0.013 * (temp + 15);
        if (capMult > 1.25) capMult = 1.25;
        const grossCap = Math.round(ratedCap47 * capMult);
        const effectiveCap = Math.round(grossCap * defrostFactor);

        // Building loss curve
        const buildingLoss = Math.round(loss * ((70 - temp) / 75));
        const deficit = buildingLoss > effectiveCap ? buildingLoss - effectiveCap : 0;
        const auxKw = Number((deficit / 3412.142).toFixed(2));

        let status = 'above_balance_point';
        if (deficit > 0) {
          status = 'below_balance_point';
        } else if (Math.abs(buildingLoss - effectiveCap) < 1500) {
          status = 'thermal_balance_point';
        }

        const recordId = `HL-HP-${String(idCounter).padStart(4, '0')}`;
        idCounter++;

        rows.push([
          recordId,
          temp.toFixed(1),
          '70.0',
          loss,
          tons.toFixed(1),
          ratedCap47,
          temp > 35 ? 'min' : (temp > 15 ? 'rated' : 'max'),
          cop.toFixed(2),
          grossCap,
          defrostFactor.toFixed(2),
          effectiveCap,
          buildingLoss,
          deficit,
          auxKw.toFixed(2),
          status
        ].join(','));
      }
    }
  }

  fs.writeFileSync(outputPath, rows.join('\r\n'), 'utf8');
  console.log(`Generated ${rows.length - 1} records at ${outputPath}`);
  console.log(`File size: ${fs.statSync(outputPath).size} bytes`);
}

generateHeatPumpDataset();
