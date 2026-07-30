import { defineToken, type TokenEntry } from "./types";

/**
 * Elevation / shadow — Kit shows 4 visual levels without exact CSS strings.
 * These are approximate values for MVP; refine when kit provides specs.
 */
export const shadowTokens: TokenEntry[] = [
  defineToken("shadow.1", "shadow", "0 1px 2px 0 rgb(0 0 0 / 0.06)", {
    description: "Elevation 1 (approx) — subtle lift",
    usage: ["card.rest"],
  }),
  defineToken("shadow.2", "shadow", "0 2px 8px 0 rgb(0 0 0 / 0.08)", {
    description: "Elevation 2 (approx)",
    usage: ["card.hover", "dropdown"],
  }),
  defineToken(
    "shadow.3",
    "shadow",
    "0 8px 16px -2px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.08)",
    {
      description: "Elevation 3 (approx)",
      usage: ["floating.panel"],
    },
  ),
  defineToken(
    "shadow.4",
    "shadow",
    "0 16px 32px -4px rgb(0 0 0 / 0.16), 0 4px 12px -2px rgb(0 0 0 / 0.1)",
    {
      description: "Elevation 4 (approx) — popup / modal",
      usage: ["popup"],
    },
  ),
];
