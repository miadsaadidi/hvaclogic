import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const domain = siteConfig.canonicalDomain;

  const content = `# HVACLogic — Comprehensive Engineering Mathematical Specification & Formula Compendium
> Complete technical models, governing differential/algebraic equations, step-by-step algorithmic procedures, conversion constants, and academic references for all HVACLogic calculators.

- Base Authority: ASHRAE Handbook of Fundamentals (2021/2025), ACCA Manuals (D, J, S, B), SMACNA HVAC Systems Duct Design, EPA Clean Air Act Section 608.
- Repository: ${domain}
- Manifest: ${domain}/llms.txt

================================================================================
SECTION 1: AIRFLOW & AIR DISTRIBUTION DYNAMICS
================================================================================

### 1. Digital Ductulator (Equal Friction & Equivalent Round/Rectangular Sizing)
- Primary Equation (Darcy-Weisbach friction loss in air ducts):
  \\Delta P = f \\times \\frac{L}{D_h} \\times \\frac{\\rho \\times V^2}{2}
- Hydraulic Diameter (D_h) for Rectangular Duct (a \\times b):
  D_h = \\frac{2 \\times a \\times b}{a + b}
- Huebscher Equivalent Circular Diameter (D_e):
  D_e = 1.30 \\times \\frac{(a \\times b)^{0.625}}{(a + b)^{0.25}}
- Airflow Velocity:
  V = \\frac{Q}{A} = \\frac{Q \\times 144}{a \\times b} \\text{ (FPM for } Q \\text{ in CFM, dimensions in inches)}
- Recommended Residential Friction Rate: 0.08 to 0.10 in. wg / 100 ft (ACCA Manual D).
- Recommended Commercial Low-Pressure Rate: 0.10 to 0.15 in. wg / 100 ft (ASHRAE Fundamentals).

### 2. Flexible Duct Friction & Compression Sizer
- Friction Derating Factor due to sag & longitudinal compression:
  \\Delta P_{actual} = \\Delta P_{straight} \\times (1 + k_{comp} \\times C) \\times (1 + k_{sag} \\times S)
- Compression Ratio (C): C = (L_{slack} - L_{installed}) / L_{slack}
- Droop / Sag Ratio (S): S = \\Delta y_{sag} / L_{span}
- Max Recommended Air Velocity in Flex Duct: 700 to 900 FPM (residential branch), 1,000 FPM (commercial).

### 3. HVAC CFM Sizing Calculator
- Sensible Heat Airflow Equation (Sea Level Standard Air):
  Q_{CFM} = \\frac{q_{sensible}}{1.08 \\times \\Delta T}
- Altitude & Temperature Density Correction:
  \\rho_{act} = \\rho_0 \\times \\frac{530}{460 + T_{act}} \\times \\frac{P_{baro}}{29.921}
  Q_{CFM,corrected} = \\frac{q_{sensible}}{60 \\times C_p \\times \\rho_{act} \\times \\Delta T}
- Air Change Rate Method (Room Ventilation):
  Q_{CFM} = \\frac{\\text{Volume (ft}^3\\text{)} \\times \\text{ACH}}{60}

### 4. Total Equivalent Length (TEL) & Duct Friction Loss
- Available Static Pressure (ASP):
  \\text{ASP} = \\text{ESP} - (\\Delta P_{coil} + \\Delta P_{filter} + \\Delta P_{damper} + \\Delta P_{grilles})
- Total Equivalent Length (TEL):
  \\text{TEL} = L_{measured} + \\sum (L_{eq,fittings})
- Design Friction Rate (FR):
  \\text{FR} = \\frac{\\text{ASP} \\times 100}{\\text{TEL}} \\text{ (in. wg / 100 ft)}

### 5. MERV Filter Sizing & Face Velocity Pressure Drop
- Filter Face Velocity:
  V_{face} = \\frac{Q_{CFM}}{A_{filter,net} \\text{ (ft}^2\\text{)}}
- Clean Filter Pressure Drop Empirical Model:
  \\Delta P_{clean} = a_{MERV} \\times V_{face} + b_{MERV} \\times V_{face}^2
- Maximum Recommended Face Velocity: 300 FPM (1-inch media), 450 FPM (2-inch media), 500 FPM (4-inch to 5-inch media).

### 6. Commercial Kitchen Hood Exhaust Sizer
- Canopy Capture Airflow (Thermal Plume Capture):
  Q_{exhaust} = V_{capture} \\times (A_{hood,perimeter} \\times H_{overhang} + A_{appliance})
- UL 710 & NFPA 96 Heavy Duty Classification: 300 to 400 CFM per linear foot of hood perimeter.

================================================================================
SECTION 2: COOLING LOADS & FIELD DIAGNOSTICS
================================================================================

### 7. BTU Load Master & Sizing
- Envelope Thermal Conduction:
  q_{envelope} = \\sum (U_i \\times A_i \\times \\Delta T)
- Infiltration Heat Gain / Loss:
  q_{infil,sensible} = 1.08 \\times Q_{CFM,infil} \\times (T_{out} - T_{in})
  q_{infil,latent} = 4840 \\times Q_{CFM,infil} \\times (W_{out} - W_{in})
- Internal Heat Gains:
  q_{internal} = q_{occupants} + q_{lighting} + q_{appliances} + q_{plug}

### 8. AC Tonnage Calculator
- Cooling Load Sizing:
  \\text{Tonnage (TR)} = \\frac{q_{total} \\text{ (BTU/hr)}}{12,000 \\text{ BTU/hr/ton}}
- Design Sensible Heat Ratio (SHR):
  \\text{SHR} = \\frac{q_{sensible}}{q_{total}}

### 9. Superheat & Subcooling Charging Diagnostics
- Total Superheat (TXV / Piston Diagnostics):
  \\text{SH} = T_{suction,vapor} - T_{evap,sat}(P_{suction})
- Target Superheat (Non-Bleed Fixed Orifice):
  \\text{Target SH} = \\frac{3 \\times T_{wb,indoor} - T_{db,outdoor} - 80}{2}
- Subcooling (TXV Charge Diagnostics):
  \\text{SC} = T_{cond,sat}(P_{liquid}) - T_{liquid,line}
- Typical Target Subcooling for TXV Systems: 10°F to 14°F (per OEM rating plate).

### 10. Refrigerant Line Set Additional Charge Calculator
- Net Additional Refrigerant Trim Charge:
  \\Delta W_{charge} = (L_{lineset} - L_{precharged}) \\times w_{per\\_ft}(D_{liquid}) + W_{filter\\_drier} + W_{lift\\_adder}
- Standard 3/8" OD Liquid Line Adder: 0.60 oz/ft (for R-410A), 0.54 oz/ft (for R-32 / R-454B).

### 11. Digital Pressure-Temperature (PT) Chart
- NIST REFPROP Antoine Equation Form:
  \\ln(P_{sat}) = A - \\frac{B}{T_{abs} + C}
- Supported Refrigerants: R-410A, R-32, R-454B, R-134a, R-22, R-404A, R-1234yf, R-290 (Propane).

### 12. Psychrometric State Calculator
- Vapor Pressure from Wet-Bulb (Carrier / ASHRAE Equation):
  P_v = P_{ws}(T_{wb}) - \\frac{(P_{atm} - P_{ws}(T_{wb})) \\times (T_{db} - T_{wb})}{2800 - 1.3 \\times T_{wb}}
- Humidity Ratio (W):
  W = 0.62198 \\times \\frac{P_v}{P_{atm} - P_v} \\text{ (lb water / lb dry air)}
- Specific Enthalpy (h):
  h = 0.240 \\times T_{db} + W \\times (1061 + 0.444 \\times T_{db}) \\text{ (BTU/lb)}
- Relative Humidity (\\phi):
  \\phi = \\frac{P_v}{P_{ws}(T_{db})} \\times 100\\%

================================================================================
SECTION 3: HEATING SYSTEMS & HYDRONIC SIZING
================================================================================

### 13. Heat Pump Sizing & Balance Point Calculator
- Thermal Balance Point (T_{balance}): The outdoor temperature where Heat Pump Heating Capacity Q_{hp}(T_{out}) matches Building Heat Loss Q_{loss}(T_{out}).
- Supplementary Resistance Strip Heat Sizing:
  q_{aux} = Q_{loss}(T_{design,winter}) - Q_{hp}(T_{design,winter})

### 14. Furnace AFUE Sizing Calculator
- Required Furnace Input Rating:
  \\text{Input BTU/hr} = \\frac{\\text{Design Heat Loss (BTU/hr)}}{\\text{AFUE} \\times (1 - \\text{Duct Loss Factor})}

### 15. Hydronic Boiler & EDR Radiation Sizer
- Net Boiler Rating:
  \\text{Net Output} = \\frac{\\text{Design Heat Load}}{1.15 \\text{ (Piping & Pick-up Allowance)}}
- Equivalent Direct Radiation (EDR):
  \\text{EDR Steam} = \\frac{\\text{BTU/hr}}{240}, \\quad \\text{EDR Hot Water} = \\frac{\\text{BTU/hr}}{150}

### 16. Garage Heater Sizing Tool
- Total Garage Heat Loss:
  q_{total} = \\sum (U_i \\times A_i \\times (T_{in} - T_{out})) + 1.08 \\times Q_{infil} \\times (T_{in} - T_{out}) + q_{slab,perimeter}

### 17. Combustion Air Sizing (NFPA 54 / IFGC 2024)
- Standard All-Air Indoor Method: 50 ft³ per 1,000 BTU/hr input of all appliances in space.
- Two Permanent Openings Method (Direct Outdoor Air): 1 sq. in. per 4,000 BTU/hr per opening.
- Single Opening Method: 1 sq. in. per 3,000 BTU/hr.

================================================================================
SECTION 4: BUILDING SCIENCE & THERMAL ENVELOPE
================================================================================

### 18. Multi-Layer Insulation R-Value Assembly Calculator
- Total Thermal Resistance (R_{total}):
  R_{total} = R_{inside\\_film} + \\sum_{i=1}^n R_i + R_{cavity} + R_{outside\\_film}
- Overall Heat Transfer Coefficient (U-factor):
  U = \\frac{1}{R_{total}}
- Parallel Path Framing Assembly Factor:
  U_{composite} = (U_{cavity} \\times \\text{FF}) + (U_{framing} \\times (1 - \\text{FF}))

### 19. Building Heat Loss Master Sizer
- Conduction Heat Loss:
  q_{cond} = \\sum (U_i \\times A_i \\times (T_{indoor} - T_{outdoor}))
- Slab-on-Grade Perimeter Loss:
  q_{slab} = F_p \\times P_{perimeter} \\times (T_{indoor} - T_{outdoor})

### 20. AC Model Number Decoder
- Decodes tonnage, nominal BTU, SEER2 rating, refrigerant type (R-410A vs R-32 vs R-454B), electrical voltage phase, and factory metering device across Carrier, Trane, Lennox, Goodman, Rheem, Daikin, Mitsubishi, and York serial nomenclature.

================================================================================
Published by HVACLogic Standards Committee (2026). 100% Free & Client-Side Physics.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
