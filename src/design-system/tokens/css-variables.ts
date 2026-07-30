import {
  densityProfiles,
  type Density,
} from "./density";
import { buildRootCssVariables, requireToken } from "./registry";

/** CSS custom properties applied under [data-density] from density profile tokens */
export function densityCssVariables(density: Density): Record<string, string> {
  const profile = densityProfiles[density];
  return {
    "--font-size-base": profile.values.fontSizeBase,
    "--control-height": profile.values.controlHeight,
    "--section-gap": profile.values.sectionGap,
    "--table-row-height": profile.values.tableRowHeight,
    "--table-header-font-size": profile.values.tableHeaderFontSize,
    "--table-header-font-weight": profile.values.tableHeaderFontWeight,
    "--table-body-font-size": profile.values.tableBodyFontSize,
    "--table-body-font-weight": profile.values.tableBodyFontWeight,
    "--popup-body-font-size": profile.values.popupBodyFontSize,
    "--cell-padding-y": requireToken("spacing.8").value,
    "--cell-padding-x": requireToken("spacing.8").value,
    "--radius-control": requireToken("radius.4").value,
  };
}

export function rootCssVariables(): Record<string, string> {
  return buildRootCssVariables();
}

/** Serialize registry CSS vars as a CSS string for :root (and optional injection) */
export function rootCssVariablesAsString(): string {
  const vars = buildRootCssVariables();
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}
