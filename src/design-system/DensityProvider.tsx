"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  densityCssVariables,
  densityProfiles,
  densityToKitName,
  surfaceToDensity,
  type Density,
  type Surface,
} from "@/design-system/tokens";

type DensityContextValue = {
  density: Density;
  surface: Surface;
  kitName: "Compact" | "Comfortable";
  label: string;
  setSurface: (surface: Surface) => void;
};

const DensityContext = createContext<DensityContextValue | null>(null);

type DensityProviderProps = {
  children: ReactNode;
  defaultSurface?: Surface;
};

export function DensityProvider({
  children,
  defaultSurface = "admin",
}: DensityProviderProps) {
  const [surface, setSurfaceState] = useState<Surface>(defaultSurface);
  const density = surfaceToDensity[surface];
  const profile = densityProfiles[density];

  const setSurface = useCallback((next: Surface) => {
    setSurfaceState(next);
  }, []);

  const value = useMemo(
    () => ({
      density,
      surface,
      kitName: densityToKitName[density],
      label: profile.label,
      setSurface,
    }),
    [density, surface, profile.label, setSurface],
  );

  const style = densityCssVariables(density) as CSSProperties;

  return (
    <DensityContext.Provider value={value}>
      <div data-density={density} data-surface={surface} style={style}>
        {children}
      </div>
    </DensityContext.Provider>
  );
}

export function useDensity() {
  const ctx = useContext(DensityContext);
  if (!ctx) {
    throw new Error("useDensity must be used within DensityProvider");
  }
  return ctx;
}
