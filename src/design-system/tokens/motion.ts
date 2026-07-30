import { defineToken, type TokenEntry } from "./types";

/**
 * Basic motion tokens for hover/focus transitions and future Framer Motion defaults.
 * Generator-queryable; components should reference these ids only.
 */
export const motionTokens: TokenEntry[] = [
  defineToken("motion.duration.fast", "motion", "120ms", {
    description: "Quick feedback (hover, toggle)",
    usage: ["button.hover", "checkbox"],
  }),
  defineToken("motion.duration.normal", "motion", "200ms", {
    description: "Standard UI transition",
    usage: ["card", "tab", "popover"],
  }),
  defineToken("motion.duration.slow", "motion", "320ms", {
    description: "Enter/exit emphasis (modal, drawer)",
    usage: ["modal", "page.transition"],
  }),

  defineToken(
    "motion.easing.standard",
    "motion",
    "cubic-bezier(0.4, 0, 0.2, 1)",
    {
      description: "Standard easing (most interactions)",
      usage: ["button", "card"],
    },
  ),
  defineToken("motion.easing.enter", "motion", "cubic-bezier(0, 0, 0.2, 1)", {
    description: "Decelerate — elements entering",
    usage: ["modal.enter", "popover.enter"],
  }),
  defineToken("motion.easing.exit", "motion", "cubic-bezier(0.4, 0, 1, 1)", {
    description: "Accelerate — elements exiting",
    usage: ["modal.exit", "popover.exit"],
  }),
];
