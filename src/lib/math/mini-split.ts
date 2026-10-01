/**
 * HVACLogic Mini-Split Multi-Zone Sizing Computational Engine
 *
 * This computational engine implements a preliminary room cooling-load screening model
 * and multi-zone candidate indoor head matching workflow.
 *
 * Technical References:
 *   - ANSI/AHRI Standard 1230 (Performance Rating of Variable Refrigerant Flow Multi-Split Air-Conditioning and Heat Pump Equipment)
 *   - ANSI/ACCA Manual J (Residential Load Calculation reference methodology)
 *   - ANSI/ACCA Manual S (Residential Equipment Selection reference methodology)
 *
 * Important Engineering Note:
 * This model provides preliminary load screening estimates. Final equipment selection,
 * line-length allowances, and port combinations must be verified using the specific
 * manufacturer's approved combination and capacity tables.
 */

export interface MiniSplitRoom {
  id: string;
  name: string;
  sqft: number;
  sunExposure: "north" | "average" | "south" | "west";
  insulation: "good" | "average" | "poor";
  ceilingHeight: "standard" | "high" | "vaulted"; // 8ft (1.0x), 9-10ft (1.1x), >10ft (1.2x)
}

export interface MatchedRoomOutput {
  id: string;
  name: string;
  sqft: number;
  calculatedLoadBtu: number;
  matchedIndoorHeadBtu: number; // Candidate nominal sizes: 6000, 9000, 12000, 18000, 24000
  headTypeRecommendation: "Wall-Mount" | "Ceiling Cassette" | "Floor Console";
}

export interface MiniSplitSystemOutput {
  rooms: MatchedRoomOutput[];
  totalRoomLoadBtu: number;
  totalIndoorConnectedBtu: number;
  recommendedOutdoorCondenserBtu: number;
  recommendedOutdoorTonnage: number;
  numberOfPorts: number;
  connectedCapacityRatioPercent: number; // e.g. 100% to 130%
  overSubscriptionStatus: "Preliminary Matched Range (100–130%)" | "Under-Connected (<100%)" | "High Connected Ratio (>130% - Verify Manufacturer Data)";
  summary: string;
}

export const INDOOR_HEAD_SIZES_BTU = [6000, 9000, 12000, 18000, 24000];
export const OUTDOOR_CONDENSER_SIZES_BTU = [18000, 24000, 30000, 36000, 42000, 48000];

/**
 * Calculates individual room preliminary screening cooling load (BTU/hr)
 * Q_room = Area * 25 * F_sun * F_ins * F_ceiling
 */
export function calculateRoomLoadBtu(room: MiniSplitRoom): number {
  const sqft = Math.max(50, Math.min(2500, room.sqft));
  let btu = sqft * 25; // 25 BTU/sq ft screening baseline

  // Sun Exposure factor (F_sun)
  if (room.sunExposure === "north") btu *= 0.95;
  else if (room.sunExposure === "south") btu *= 1.10;
  else if (room.sunExposure === "west") btu *= 1.15;

  // Building Envelope Insulation factor (F_ins)
  if (room.insulation === "good") btu *= 0.90;
  else if (room.insulation === "poor") btu *= 1.15;

  // Ceiling Height factor (F_ceiling)
  if (room.ceilingHeight === "high") btu *= 1.10;
  else if (room.ceilingHeight === "vaulted") btu *= 1.20;

  return Math.round(btu);
}

/**
 * Matches room screening load to candidate standard indoor head capacity.
 * Note: Actual head selection must be verified against manufacturer model availability.
 */
export function matchIndoorHeadBtu(loadBtu: number): number {
  for (const head of INDOOR_HEAD_SIZES_BTU) {
    if (head >= loadBtu) {
      return head;
    }
  }
  return 24000;
}

/**
 * Calculates candidate multi-zone mini-split system capacities, total indoor head load,
 * and illustrative outdoor multi-port condenser preliminary sizing.
 */
export function calculateMiniSplitSystem(rooms: MiniSplitRoom[]): MiniSplitSystemOutput {
  if (!rooms || rooms.length === 0) {
    return {
      rooms: [],
      totalRoomLoadBtu: 0,
      totalIndoorConnectedBtu: 0,
      recommendedOutdoorCondenserBtu: 18000,
      recommendedOutdoorTonnage: 1.5,
      numberOfPorts: 2,
      connectedCapacityRatioPercent: 100,
      overSubscriptionStatus: "Preliminary Matched Range (100–130%)",
      summary: "Add one or more rooms to estimate multi-zone mini-split system capacity.",
    };
  }

  const matchedRooms: MatchedRoomOutput[] = rooms.map((r) => {
    const load = calculateRoomLoadBtu(r);
    const head = matchIndoorHeadBtu(load);
    return {
      id: r.id,
      name: r.name,
      sqft: r.sqft,
      calculatedLoadBtu: load,
      matchedIndoorHeadBtu: head,
      headTypeRecommendation: head >= 18000 ? "Ceiling Cassette" : "Wall-Mount",
    };
  });

  const totalRoomLoadBtu = matchedRooms.reduce((acc, r) => acc + r.calculatedLoadBtu, 0);
  const totalIndoorConnectedBtu = matchedRooms.reduce((acc, r) => acc + r.matchedIndoorHeadBtu, 0);
  const portCount = matchedRooms.length;

  // Illustrative outdoor multi-port condenser preliminary sizing
  // Multi-split inverter systems typically support 100% to 130% connected capacity ratios depending on manufacturer guidelines
  let recommendedOutdoorCondenserBtu = 18000;
  for (const cond of OUTDOOR_CONDENSER_SIZES_BTU) {
    if (cond * 1.30 >= totalIndoorConnectedBtu) {
      recommendedOutdoorCondenserBtu = cond;
      break;
    }
    recommendedOutdoorCondenserBtu = cond;
  }

  const recommendedOutdoorTonnage = Number((recommendedOutdoorCondenserBtu / 12000).toFixed(1));
  const connectedCapacityRatioPercent = Math.round((totalIndoorConnectedBtu / recommendedOutdoorCondenserBtu) * 100);

  let overSubscriptionStatus: MiniSplitSystemOutput["overSubscriptionStatus"] = "Preliminary Matched Range (100–130%)";
  if (connectedCapacityRatioPercent < 100) {
    overSubscriptionStatus = "Under-Connected (<100%)";
  } else if (connectedCapacityRatioPercent > 130) {
    overSubscriptionStatus = "High Connected Ratio (>130% - Verify Manufacturer Data)";
  }

  const summary = `A ${portCount}-zone system requiring ${totalIndoorConnectedBtu.toLocaleString()} BTU total candidate indoor capacity paired with an illustrative ${recommendedOutdoorTonnage}-Ton (${recommendedOutdoorCondenserBtu.toLocaleString()} BTU) outdoor multi-port condenser (${connectedCapacityRatioPercent}% connected ratio).`;

  return {
    rooms: matchedRooms,
    totalRoomLoadBtu,
    totalIndoorConnectedBtu,
    recommendedOutdoorCondenserBtu,
    recommendedOutdoorTonnage,
    numberOfPorts: Math.max(portCount, portCount <= 2 ? 2 : portCount <= 4 ? 4 : 5),
    connectedCapacityRatioPercent,
    overSubscriptionStatus,
    summary,
  };
}

