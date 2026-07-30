import { colors, semanticColors } from "./colors";
import { densityTokens, type Density } from "./density";
import { radius } from "./radius";
import { shadow } from "./shadow";
import { spacingScale } from "./spacing";
import { fontFamilies, fontWeights, lineHeights } from "./typography";

/** CSS custom properties applied under [data-density] */
export function densityCssVariables(density: Density): Record<string, string> {
  const d = densityTokens[density];
  return {
    "--font-size-base": d.fontSizeBase,
    "--control-height": d.controlHeight,
    "--space-unit": d.spaceUnit,
    "--section-gap": d.sectionGap,
    "--cell-padding-y": d.cellPaddingY,
    "--cell-padding-x": d.cellPaddingX,
  };
}

export function rootCssVariables(): Record<string, string> {
  return {
    "--color-background": semanticColors.background,
    "--color-foreground": semanticColors.foreground,
    "--color-muted": semanticColors.muted,
    "--color-muted-foreground": semanticColors.mutedForeground,
    "--color-border": semanticColors.border,
    "--color-card": semanticColors.card,
    "--color-primary": semanticColors.primary,
    "--color-primary-foreground": semanticColors.primaryForeground,
    "--color-danger": semanticColors.danger,
    "--color-success": semanticColors.success,
    "--color-warning": semanticColors.warning,
    "--color-zinc-900": colors.zinc[900],
    "--font-sans": fontFamilies.sans,
    "--font-mono": fontFamilies.mono,
    "--font-weight-regular": fontWeights.regular,
    "--font-weight-medium": fontWeights.medium,
    "--font-weight-semibold": fontWeights.semibold,
    "--line-height-normal": lineHeights.normal,
    "--radius-sm": radius.sm,
    "--radius-md": radius.md,
    "--radius-lg": radius.lg,
    "--shadow-sm": shadow.sm,
    "--shadow-md": shadow.md,
    "--space-1": spacingScale[1],
    "--space-2": spacingScale[2],
    "--space-3": spacingScale[3],
    "--space-4": spacingScale[4],
    "--space-6": spacingScale[6],
    "--space-8": spacingScale[8],
  };
}
