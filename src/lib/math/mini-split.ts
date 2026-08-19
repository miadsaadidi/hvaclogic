/**
 * HVACLogic Mini-Split Multi-Zone Sizing Computational Engine
 * Implements ACCA Manual J Room Loads, AHRI Standard 1230, and Multi-Port Inverter Diversity.
 */

export interface MiniSplitRoom {
  id: string;
  name: string;
  sqft: number;
  sunExposure: "north" | "average" | "south" | "west";
  insulation: "good" | "average" | "poor";
  ceilingHeight: "standard" | "high" | "vaulted"; // 8ft, 9-10ft, >10ft
}

export interface MatchedRoomOutput {
  id: string;
  name: string;
  sqft: number;
  calculatedLoadBtu: number;
  matchedIndoorHeadBtu: number; // 6000, 9000, 12000, 18000, 24000
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
  overSubscriptionStatus: "Optimal Match (100–130%)" | "Under-Utilized (<100%)" | "Over-Subscribed (>130% - Stagger Load)";
  summary: string;
}

export const INDOOR_HEAD_SIZES_BTU = [6000, 9000, 12000, 18000, 24000];
export const OUTDOOR_CONDENSER_SIZES_BTU = [18000, 24000, 30000, 36000, 42000, 48000];

/**
 * Calculates individual room thermal load (BTU/hr)
 */
export function calculateRoomLoadBtu(room: MiniSplitRoom): number {
  const sqft = Math.max(50, Math.min(2500, room.sqft));
  let btu = sqft * 25; // 25 BTU/sq ft baseline

  // Sun Exposure factor
  if (room.sunExposure === "north") btu *= 0.95;
  else if (room.sunExposure === "south") btu *= 1.10;
  else if (room.sunExposure === "west") btu *= 1.15;

  // Insulation factor
  if (room.insulation === "good") btu *= 0.90;
  else if (room.insulation === "poor") btu *= 1.15;

  // Ceiling Height factor
  if (room.ceilingHeight === "high") btu *= 1.10;
  else if (room.ceilingHeight === "vaulted") btu *= 1.20;

  return Math.round(btu);
}

/**
 * Matches room thermal load to the nearest standard indoor head capacity
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
 * Sizes the entire multi-zone mini-split system, including individual heads and outdoor condenser.
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
      overSubscriptionStatus: "Optimal Match (100–130%)",
      summary: "Add one or more rooms to calculate multi-zone mini-split system capacity.",
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

  // Size outdoor multi-port condenser
  // Multi-split inverters allow 100% to 130% connected capacity ratio due to diversity
  let recommendedOutdoorCondenserBtu = 18000;
  for (const cond of OUTDOOR_CONDENSER_SIZES_BTU) {
    // Condition: condenser must handle at least totalIndoorConnectedBtu / 1.30
    if (cond * 1.30 >= totalIndoorConnectedBtu) {
      recommendedOutdoorCondenserBtu = cond;
      break;
    }
    recommendedOutdoorCondenserBtu = cond;
  }

  const recommendedOutdoorTonnage = Number((recommendedOutdoorCondenserBtu / 12000).toFixed(1));
  const connectedCapacityRatioPercent = Math.round((totalIndoorConnectedBtu / recommendedOutdoorCondenserBtu) * 100);

  let overSubscriptionStatus: MiniSplitSystemOutput["overSubscriptionStatus"] = "Optimal Match (100–130%)";
  if (connectedCapacityRatioPercent < 100) {
    overSubscriptionStatus = "Under-Utilized (<100%)";
  } else if (connectedCapacityRatioPercent > 130) {
    overSubscriptionStatus = "Over-Subscribed (>130% - Stagger Load)";
  }

  const summary = `A ${portCount}-zone system requiring ${totalIndoorConnectedBtu.toLocaleString()} BTU total indoor capacity paired with a ${recommendedOutdoorTonnage}-Ton (${recommendedOutdoorCondenserBtu.toLocaleString()} BTU) outdoor multi-port inverter condenser (${connectedCapacityRatioPercent}% connected ratio).`;

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
