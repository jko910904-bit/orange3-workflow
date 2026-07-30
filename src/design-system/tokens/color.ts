import { defineToken, type TokenEntry } from "./types";

/** Kit color tokens — Primary / Secondary / Greyscale / Semantic */
export const colorTokens: TokenEntry[] = [
  // Primary
  defineToken("color.primary.100", "color", "#ECF2FE", {
    description: "Primary light surface",
    usage: ["button.tertiary.bg", "table.row.hover"],
  }),
  defineToken("color.primary.500", "color", "#2C6EF2", {
    description: "Primary brand",
    usage: ["button.primary.bg", "link", "tab.active"],
  }),
  defineToken("color.primary.700", "color", "#104AC5", {
    description: "Primary hover / emphasis",
    usage: ["button.primary.hover"],
  }),
  defineToken("color.primary.900", "color", "#093895", {
    description: "Primary deepest",
  }),

  // Secondary
  defineToken("color.secondary.500", "color", "#2E4176", {
    description: "Secondary navy",
    usage: ["button.secondary.bg"],
  }),
  defineToken("color.secondary.700", "color", "#202D52", {
    description: "Secondary dark",
    usage: ["button.secondary.hover"],
  }),
  defineToken("color.secondary.900", "color", "#000000", {
    description: "Secondary black",
  }),

  // Greyscale (kit functional labels)
  defineToken("color.grey.0", "color", "#FFFFFF", {
    description: "White / card",
    usage: ["surface.card", "button.ghost.bg"],
  }),
  defineToken("color.grey.50", "color", "#F8F8F8", {
    description: "Table header / soft bg",
    usage: ["table.header.bg"],
  }),
  defineToken("color.grey.100", "color", "#F5F5F5", {
    description: "Page background",
    usage: ["surface.background"],
  }),
  defineToken("color.grey.200", "color", "#EEEEEE", {
    description: "Muted fill",
  }),
  defineToken("color.grey.300", "color", "#DDDDDD", {
    description: "Subtle border",
  }),
  defineToken("color.grey.400", "color", "#BDBDBD", {
    description: "Border / line",
    usage: ["border.default", "input.border"],
  }),
  defineToken("color.grey.500", "color", "#999999", {
    description: "Placeholder / weak text",
  }),
  defineToken("color.grey.600", "color", "#757575", {
    description: "Inactive font",
    usage: ["text.inactive"],
  }),
  defineToken("color.grey.700", "color", "#666666", {
    description: "Body secondary / table body",
    usage: ["text.secondary", "table.body"],
  }),
  defineToken("color.grey.800", "color", "#444444", {
    description: "Strong secondary text",
  }),
  defineToken("color.grey.900", "color", "#222222", {
    description: "Active font / headings",
    usage: ["text.active", "popup.title"],
  }),

  // Semantic
  defineToken("color.semantic.danger", "color", "#EB5D5D", {
    description: "Error / danger / delete / required",
    usage: ["input.error", "badge.hot"],
  }),
  defineToken("color.semantic.warning", "color", "#F9A825", {
    description: "Caution / warning",
  }),
  defineToken("color.semantic.success", "color", "#00C853", {
    description: "Success / in progress",
  }),
  defineToken("color.semantic.info", "color", "#0091EA", {
    description: "Information / positive",
    usage: ["badge.new"],
  }),

  // Semantic surfaces from kit table pattern
  defineToken("color.surface.rowHover", "color", "#F1F6FF", {
    description: "Table row hover",
    usage: ["table.row.hover"],
  }),
  defineToken("color.surface.rowError", "color", "#FFECEC", {
    description: "Table row error",
    usage: ["table.row.error"],
  }),
  defineToken("color.overlay.dim", "color", "rgba(0, 0, 0, 0.6)", {
    description: "Popup dimmed overlay",
    usage: ["popup.overlay"],
  }),
];

/** Convenience map: id → value (for components that already know the id) */
export const colorValues = Object.fromEntries(
  colorTokens.map((t) => [t.id, t.value]),
) as Record<string, string>;
