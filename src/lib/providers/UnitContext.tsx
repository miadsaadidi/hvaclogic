"use client";

import React, { createContext, useContext, useMemo } from "react";
import { UnitSystem } from "@/types/calculation";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface UnitContextType {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  toggleUnitSystem: () => void;
  isMetric: boolean;
  isImperial: boolean;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const [unitSystem, setUnitSystemState] = useLocalStorage<UnitSystem>("hvaclab_unit_system", "imperial");

  const value = useMemo(
    () => ({
      unitSystem,
      setUnitSystem: (system: UnitSystem) => setUnitSystemState(system),
      toggleUnitSystem: () => setUnitSystemState((prev) => (prev === "imperial" ? "metric" : "imperial")),
      isMetric: unitSystem === "metric",
      isImperial: unitSystem === "imperial",
    }),
    [unitSystem, setUnitSystemState]
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnitSystem() {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnitSystem must be used within a UnitProvider");
  }
  return context;
}
