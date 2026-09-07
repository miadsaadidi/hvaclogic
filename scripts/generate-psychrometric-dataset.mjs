import fs from 'fs';
import path from 'path';

// Pure Hyland-Wexler implementation ported directly from src/lib/math/psychrometric.ts
function getBarometricPressurePsia(altitudeFeet = 0) {
  const h = Math.max(-1000, Math.min(15000, altitudeFeet));
  return 14.696 * Math.pow(1 - 6.8754e-6 * h, 5.2559);
}

function getSaturationVaporPressurePsia(tempF) {
  const tRankine = tempF + 459.67;
  if (tempF >= 32) {
    const c8 = -1.0440397e4;
    const c9 = -1.129465e1;
    const c10 = -2.7022355e-2;
    const c11 = 1.289036e-5;
    const c12 = -2.4780681e-9;
    const c13 = 6.5459673;
    const lnPws =
      c8 / tRankine +
      c9 +
      c10 * tRankine +
      c11 * Math.pow(tRankine, 2) +
      c12 * Math.pow(tRankine, 3) +
      c13 * Math.log(tRankine);
    return Math.exp(lnPws);
  } else {
    const c1 = -1.0214165e4;
    const c2 = -4.8932428;
    const c3 = -5.3765794e-3;
    const c4 = 1.9202377e-7;
    const c5 = 3.5575832e-10;
    const c6 = -9.0344688e-14;
    const c7 = 4.1635019;
    const lnPws =
      c1 / tRankine +
      c2 +
      c3 * tRankine +
      c4 * Math.pow(tRankine, 2) +
      c5 * Math.pow(tRankine, 3) +
      c6 * Math.pow(tRankine, 4) +
      c7 * Math.log(tRankine);
    return Math.exp(lnPws);
  }
}

function getDewPointF(vaporPressurePsia) {
  const p = Math.max(0.0001, vaporPressurePsia);
  const alpha = Math.log(p);
  if (p >= 0.08865) {
    return 100.45 + 33.193 * alpha + 2.319 * Math.pow(alpha, 2) + 0.17074 * Math.pow(alpha, 3) + 1.2063 * Math.pow(p, 0.1984);
  } else {
    return 90.12 + 26.142 * alpha + 0.8927 * Math.pow(alpha, 2);
  }
}

function getHumidityRatio(vaporPressurePsia, barometricPressurePsia) {
  const pda = barometricPressurePsia - vaporPressurePsia;
  if (pda <= 0.001) return 0.00001;
  return 0.621945 * (vaporPressurePsia / pda);
}

function getSpecificEnthalpyBtuPerLb(dryBulbF, humidityRatio) {
  return 0.24 * dryBulbF + humidityRatio * (1061 + 0.444 * dryBulbF);
}

function getSpecificVolumeCuFtPerLb(dryBulbF, humidityRatio, barometricPressurePsia) {
  const tRankine = dryBulbF + 459.67;
  const gasConstantAir = 53.352;
  const pPsf = barometricPressurePsia * 144;
  return (gasConstantAir * tRankine * (1 + 1.607858 * humidityRatio)) / pPsf;
}

function solveWetBulbF(dryBulbF, humidityRatio, barometricPressurePsia) {
  let low = -40;
  let high = dryBulbF;
  let mid = dryBulbF;

  for (let i = 0; i < 35; i++) {
    mid = (low + high) / 2;
    const pwsTwb = getSaturationVaporPressurePsia(mid);
    const wsTwb = getHumidityRatio(pwsTwb, barometricPressurePsia);
    const num = (1093 - 0.556 * mid) * wsTwb - 0.24 * (dryBulbF - mid);
    const den = 1093 + 0.444 * dryBulbF - mid;
    const wTarget = num / den;

    if (Math.abs(wTarget - humidityRatio) < 1e-6) break;
    if (wTarget < humidityRatio) low = mid;
    else high = mid;
  }
  return mid;
}

function generateDataset() {
  const rows = [
    [
      'State_ID',
      'Dry_Bulb_degF',
      'Relative_Humidity_Pct',
      'Altitude_ft',
      'Barometric_Pressure_psia',
      'Saturation_Pressure_psia',
      'Vapor_Pressure_psia',
      'Dew_Point_degF',
      'Wet_Bulb_degF',
      'Humidity_Ratio_lb_lb',
      'Humidity_Ratio_grains_lb',
      'Specific_Enthalpy_Btu_lb',
      'Specific_Volume_cuft_lb',
      'Moist_Air_Density_lb_cuft'
    ].join(',')
  ];

  let id = 1;
  const temps = [-10, 0, 10, 20, 30, 40, 50, 60, 65, 70, 72, 75, 78, 80, 85, 90, 95, 100, 105, 110, 120];
  const rhList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const altitudes = [0, 5280]; // Sea level & Denver, CO

  for (const alt of altitudes) {
    const pAtm = getBarometricPressurePsia(alt);
    for (const db of temps) {
      for (const rh of rhList) {
        const pws = getSaturationVaporPressurePsia(db);
        const pw = (rh / 100) * pws;
        const dp = getDewPointF(pw);
        const w = getHumidityRatio(pw, pAtm);
        const wGrains = w * 7000;
        const h = getSpecificEnthalpyBtuPerLb(db, w);
        const v = getSpecificVolumeCuFtPerLb(db, w, pAtm);
        const rho = (1 + w) / v;
        const wb = solveWetBulbF(db, w, pAtm);

        rows.push([
          `HL-PSY-${String(id++).padStart(4, '0')}`,
          db.toFixed(1),
          rh.toFixed(0),
          alt,
          pAtm.toFixed(4),
          pws.toFixed(5),
          pw.toFixed(5),
          dp.toFixed(2),
          wb.toFixed(2),
          w.toFixed(6),
          wGrains.toFixed(2),
          h.toFixed(3),
          v.toFixed(3),
          rho.toFixed(4)
        ].join(','));
      }
    }
  }

  const outDir = path.resolve('d:/HVACLab/public/datasets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'hvaclogic_ashrae_hyland_wexler_psychrometric_benchmark.csv');
  fs.writeFileSync(outPath, rows.join('\n'), 'utf8');
  console.log(`Generated benchmark dataset with ${rows.length - 1} states at: ${outPath}`);
}

generateDataset();
