import { describe, it, expect } from "vitest";
import {
  calculateRoomLoadBtu,
  matchIndoorHeadBtu,
  calculateMiniSplitSystem,
  MiniSplitRoom,
} from "./mini-split";

describe("Mini-Split Multi-Zone Sizing Engine", () => {
  it("calculates room thermal load and matches appropriate indoor head sizes", () => {
    // 200 sq ft bedroom, average sun/insulation -> ~5,000 BTU -> matches 6k or 9k head
    const room1: MiniSplitRoom = {
      id: "1",
      name: "Guest Bedroom",
      sqft: 200,
      sunExposure: "average",
      insulation: "average",
      ceilingHeight: "standard",
    };
    const load1 = calculateRoomLoadBtu(room1);
    expect(load1).toBe(5000);
    expect(matchIndoorHeadBtu(load1)).toBe(6000);

    // 450 sq ft living room, west sun -> 450 * 25 * 1.15 = 12,937 BTU -> matches 18k head
    const room2: MiniSplitRoom = {
      id: "2",
      name: "Living Room",
      sqft: 450,
      sunExposure: "west",
      insulation: "average",
      ceilingHeight: "standard",
    };
    const load2 = calculateRoomLoadBtu(room2);
    expect(load2).toBe(12937);
    expect(matchIndoorHeadBtu(load2)).toBe(18000);
  });

  it("sizes a 3-zone home and calculates inverter over-subscription ratio accurately", () => {
    const rooms: MiniSplitRoom[] = [
      { id: "1", name: "Primary Bed", sqft: 250, sunExposure: "south", insulation: "good", ceilingHeight: "standard" }, // ~6,188 BTU -> 9k head
      { id: "2", name: "Guest Bed", sqft: 180, sunExposure: "north", insulation: "average", ceilingHeight: "standard" }, // ~4,275 BTU -> 6k head
      { id: "3", name: "Living Room", sqft: 400, sunExposure: "west", insulation: "average", ceilingHeight: "standard" }, // ~11,500 BTU -> 12k head
    ];

    const system = calculateMiniSplitSystem(rooms);
    expect(system.rooms.length).toBe(3);
    // Total indoor = 9k + 6k + 12k = 27k BTU
    expect(system.totalIndoorConnectedBtu).toBe(27000);
    // 27k / 1.30 = 20.7k -> rounds to 24k BTU condenser
    expect(system.recommendedOutdoorCondenserBtu).toBe(24000);
    expect(system.recommendedOutdoorTonnage).toBe(2.0);
    // Connected ratio = 27k / 24k = 113% (Optimal 100-130%)
    expect(system.connectedCapacityRatioPercent).toBe(113);
    expect(system.overSubscriptionStatus).toBe("Optimal Match (100–130%)");
  });
});
