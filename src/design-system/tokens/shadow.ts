import { defineToken, type TokenEntry } from "./types";

/**
 * Elevation scale (4 levels) — first-class tokens for Card, Modal, Popover, Button.
 * Kit showed 4 visual steps without exact CSS; values are design-system standard
 * approximations aligned to those steps (document as kit-visual, refine if kit adds specs).
 *
 * Primary ids: elevation.1 … elevation.4
 * Aliases: shadow.1 … shadow.4 (same values) for backwards compatibility
 */
const ELEVATION_VALUES = {
  1: "0 1px 2px 0 rgb(34 34 34 / 0.06)",
  2: "0 2px 8px 0 rgb(34 34 34 / 0.10)",
  3: "0 8px 24px -2px rgb(34 34 34 / 0.12), 0 2px 6px -2px rgb(34 34 34 / 0.08)",
  4: "0 16px 40px -4px rgb(34 34 34 / 0.16), 0 4px 12px -2px rgb(34 34 34 / 0.10)",
} as const;

export const elevationTokens: TokenEntry[] = [
  defineToken("elevation.0", "elevation", "none", {
    description: "Flat — no elevation (default buttons, inline controls)",
    usage: ["button.flat", "table"],
  }),
  defineToken("elevation.1", "elevation", ELEVATION_VALUES[1], {
    description: "Level 1 — resting card / subtle lift",
    usage: ["card.rest", "button.elevated"],
  }),
  defineToken("elevation.2", "elevation", ELEVATION_VALUES[2], {
    description: "Level 2 — card hover / popover / dropdown",
    usage: ["card.hover", "popover", "dropdown"],
  }),
  defineToken("elevation.3", "elevation", ELEVATION_VALUES[3], {
    description: "Level 3 — floating panel / sticky widget",
    usage: ["floating.panel", "sticky"],
  }),
  defineToken("elevation.4", "elevation", ELEVATION_VALUES[4], {
    description: "Level 4 — modal / popup dialog",
    usage: ["modal", "popup"],
  }),
];

/** Legacy / alias ids — same CSS values as elevation.* */
export const shadowTokens: TokenEntry[] = [
  defineToken("shadow.1", "shadow", ELEVATION_VALUES[1], {
    description: "Alias → elevation.1",
    usage: ["card.rest"],
  }),
  defineToken("shadow.2", "shadow", ELEVATION_VALUES[2], {
    description: "Alias → elevation.2",
    usage: ["card.hover", "popover"],
  }),
  defineToken("shadow.3", "shadow", ELEVATION_VALUES[3], {
    description: "Alias → elevation.3",
    usage: ["floating.panel"],
  }),
  defineToken("shadow.4", "shadow", ELEVATION_VALUES[4], {
    description: "Alias → elevation.4",
    usage: ["modal", "popup"],
  }),
];
