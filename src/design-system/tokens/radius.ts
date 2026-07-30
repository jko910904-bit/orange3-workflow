import { defineToken, type TokenEntry } from "./types";

/** Kit radius: R4 / R8 / R16 */
export const radiusTokens: TokenEntry[] = [
  defineToken("radius.4", "radius", "4px", {
    description: "R4 — buttons, inputs (kit default)",
    usage: ["button", "input"],
  }),
  defineToken("radius.8", "radius", "8px", {
    description: "R8 — cards / panels",
    usage: ["card", "panel"],
  }),
  defineToken("radius.16", "radius", "16px", {
    description: "R16 — large surfaces / portal emphasis",
    usage: ["hero", "modal.soft"],
  }),
  // Aliases
  defineToken("radius.sm", "radius", "4px", {
    description: "Alias → radius.4",
  }),
  defineToken("radius.md", "radius", "8px", {
    description: "Alias → radius.8",
  }),
  defineToken("radius.lg", "radius", "16px", {
    description: "Alias → radius.16",
  }),
];
