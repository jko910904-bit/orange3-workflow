import { defineToken, type TokenEntry } from "./types";

/** Kit spacing scale: 4, 8, 16, 20, 32, 40, 60, 72, 80, 120 */
export const spacingTokens: TokenEntry[] = [
  defineToken("spacing.4", "spacing", "4px", {
    description: "spacing.md predecessor — micro gap",
    usage: ["input.helper.gap", "input.button.gap"],
  }),
  defineToken("spacing.8", "spacing", "8px", {
    description: "Button horizontal gap / cell padding",
    usage: ["button.gap.x", "table.cell.padding"],
  }),
  defineToken("spacing.16", "spacing", "16px", {
    description: "Kit spacing.md = 16px",
    usage: ["section.gap.compact", "gutter.portal"],
  }),
  defineToken("spacing.20", "spacing", "20px", {
    usage: ["popup.padding", "button.large.padX"],
  }),
  defineToken("spacing.32", "spacing", "32px", {
    usage: ["section.gap"],
  }),
  defineToken("spacing.40", "spacing", "40px", {
    usage: ["admin.content.padX"],
  }),
  defineToken("spacing.60", "spacing", "60px"),
  defineToken("spacing.72", "spacing", "72px"),
  defineToken("spacing.80", "spacing", "80px"),
  defineToken("spacing.120", "spacing", "120px"),
];

/** Named aliases used in kit copy (spacing.md = 16) */
export const spacingAliasTokens: TokenEntry[] = [
  defineToken("spacing.md", "spacing", "16px", {
    description: "Alias for spacing.16 (kit: spacing.md = 16px)",
  }),
];
