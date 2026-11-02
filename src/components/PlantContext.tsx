"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PLANTS, type PlantId } from "@/lib/content";

type PlantContextValue = {
  plantId: PlantId;
  setPlantId: (id: PlantId) => void;
  plant: (typeof PLANTS)[number];
};

const PlantContext = createContext<PlantContextValue | null>(null);

export function PlantProvider({ children }: { children: ReactNode }) {
  const [plantId, setPlantId] = useState<PlantId>("olivi");
  const value = useMemo(() => {
    const plant = PLANTS.find((p) => p.id === plantId) ?? PLANTS[0];
    return { plantId, setPlantId, plant };
  }, [plantId]);

  return (
    <PlantContext.Provider value={value}>{children}</PlantContext.Provider>
  );
}

export function usePlant() {
  const ctx = useContext(PlantContext);
  if (!ctx) {
    throw new Error("usePlant must be used within PlantProvider");
  }
  return ctx;
}
