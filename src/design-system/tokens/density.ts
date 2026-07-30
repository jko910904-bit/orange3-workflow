export type Density = "dense" | "comfortable";

export type Surface = "admin" | "portal";

export const surfaceToDensity: Record<Surface, Density> = {
  admin: "dense",
  portal: "comfortable",
};

export const densityTokens = {
  dense: {
    label: "Admin / Dense",
    fontSizeBase: "14px",
    controlHeight: "32px",
    spaceUnit: "0.85",
    sectionGap: "1rem",
    cellPaddingY: "0.5rem",
    cellPaddingX: "0.75rem",
  },
  comfortable: {
    label: "Portal / Comfortable",
    fontSizeBase: "16px",
    controlHeight: "40px",
    spaceUnit: "1",
    sectionGap: "1.5rem",
    cellPaddingY: "0.75rem",
    cellPaddingX: "1rem",
  },
} as const;
