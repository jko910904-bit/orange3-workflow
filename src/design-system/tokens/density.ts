import { defineToken, type TokenEntry } from "./types";

/**
 * Density ids stay `dense` | `comfortable` in code.
 * Kit naming: Compact (Admin) ↔ dense, Comfortable (Portal) ↔ comfortable.
 */
export type Density = "dense" | "comfortable";
export type Surface = "admin" | "portal";

export const surfaceToDensity: Record<Surface, Density> = {
  admin: "dense",
  portal: "comfortable",
};

export const densityToKitName: Record<Density, "Compact" | "Comfortable"> = {
  dense: "Compact",
  comfortable: "Comfortable",
};

type DensityProfile = {
  kitName: "Compact" | "Comfortable";
  surface: Surface;
  label: string;
  /** Token ids this density activates (resolved via registry at runtime) */
  tokenIds: {
    fontSizeBase: string;
    controlHeight: string;
    sectionGap: string;
    tableRowHeight: string;
    tableHeaderFontSize: string;
    tableBodyFontSize: string;
    popupBodyFontSize: string;
  };
  /** Concrete values also registered as density.* tokens for CSS */
  values: {
    fontSizeBase: string;
    controlHeight: string;
    sectionGap: string;
    tableRowHeight: string;
    tableHeaderFontSize: string;
    tableHeaderFontWeight: string;
    tableBodyFontSize: string;
    tableBodyFontWeight: string;
    popupBodyFontSize: string;
  };
};

export const densityProfiles: Record<Density, DensityProfile> = {
  dense: {
    kitName: "Compact",
    surface: "admin",
    label: "Admin / Compact (dense)",
    tokenIds: {
      fontSizeBase: "density.dense.fontSizeBase",
      controlHeight: "density.dense.controlHeight",
      sectionGap: "density.dense.sectionGap",
      tableRowHeight: "density.dense.tableRowHeight",
      tableHeaderFontSize: "density.dense.tableHeaderFontSize",
      tableBodyFontSize: "density.dense.tableBodyFontSize",
      popupBodyFontSize: "density.dense.popupBodyFontSize",
    },
    values: {
      fontSizeBase: "14px",
      controlHeight: "32px",
      sectionGap: "16px",
      tableRowHeight: "40px",
      tableHeaderFontSize: "14px",
      tableHeaderFontWeight: "500",
      tableBodyFontSize: "14px",
      tableBodyFontWeight: "500",
      popupBodyFontSize: "14px",
    },
  },
  comfortable: {
    kitName: "Comfortable",
    surface: "portal",
    label: "Portal / Comfortable",
    tokenIds: {
      fontSizeBase: "density.comfortable.fontSizeBase",
      controlHeight: "density.comfortable.controlHeight",
      sectionGap: "density.comfortable.sectionGap",
      tableRowHeight: "density.comfortable.tableRowHeight",
      tableHeaderFontSize: "density.comfortable.tableHeaderFontSize",
      tableBodyFontSize: "density.comfortable.tableBodyFontSize",
      popupBodyFontSize: "density.comfortable.popupBodyFontSize",
    },
    values: {
      fontSizeBase: "16px",
      controlHeight: "40px",
      sectionGap: "24px",
      tableRowHeight: "48px",
      tableHeaderFontSize: "16px",
      tableHeaderFontWeight: "600",
      tableBodyFontSize: "16px",
      tableBodyFontWeight: "400",
      popupBodyFontSize: "16px",
    },
  },
};

/** Flat density tokens for registry lookup */
export const densityTokens: TokenEntry[] = (
  Object.entries(densityProfiles) as [Density, DensityProfile][]
).flatMap(([density, profile]) => {
  const prefix = `density.${density}`;
  return [
    defineToken(`${prefix}.fontSizeBase`, "density", profile.values.fontSizeBase, {
      description: `${profile.label} base font size`,
    }),
    defineToken(`${prefix}.controlHeight`, "density", profile.values.controlHeight, {
      description: `${profile.label} control height (Small/Med reference)`,
    }),
    defineToken(`${prefix}.sectionGap`, "density", profile.values.sectionGap, {
      description: `${profile.label} section gap`,
    }),
    defineToken(`${prefix}.tableRowHeight`, "density", profile.values.tableRowHeight, {
      description: `${profile.label} table row height (kit)`,
      usage: ["table.row"],
    }),
    defineToken(
      `${prefix}.tableHeaderFontSize`,
      "density",
      profile.values.tableHeaderFontSize,
      { usage: ["table.header"] },
    ),
    defineToken(
      `${prefix}.tableHeaderFontWeight`,
      "density",
      profile.values.tableHeaderFontWeight,
    ),
    defineToken(
      `${prefix}.tableBodyFontSize`,
      "density",
      profile.values.tableBodyFontSize,
      { usage: ["table.body"] },
    ),
    defineToken(
      `${prefix}.tableBodyFontWeight`,
      "density",
      profile.values.tableBodyFontWeight,
    ),
    defineToken(
      `${prefix}.popupBodyFontSize`,
      "density",
      profile.values.popupBodyFontSize,
      { usage: ["popup.body"] },
    ),
  ];
});
