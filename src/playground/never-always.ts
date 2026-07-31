/**
 * JKO Never / Always — hard compose constraints.
 * Aligns with 8 UX Rules + Decision Tree (Primary=1, Search once on top, no inventing tokens).
 *
 * Docs: `docs/principles/never-always.md` · master: `docs/JKO_AI_DEVELOPMENT_RULES.md`
 */

export type NeverAlwaysRule = {
  id: string;
  /** Canonical statement (Korean) */
  statement: string;
  /** Related UX Rule keys or decision topics */
  alignsWith?: readonly string[];
};

export type NeverAlwaysRules = {
  id: "never-always";
  title: string;
  summary: string;
  never: readonly NeverAlwaysRule[];
  always: readonly NeverAlwaysRule[];
};

export const NEVER_ALWAYS: NeverAlwaysRules = {
  id: "never-always",
  title: "Never / Always",
  summary:
    "Compose 금지·필수. Primary=1 · Search는 상단에 한 번 · 토큰·Kit 발명 금지.",
  never: [
    {
      id: "no-modal-in-modal",
      statement: "Modal 안에 Modal",
      alignsWith: ["overlay-surfaces", "delete-confirm"],
    },
    {
      id: "no-three-primaries",
      statement: "Primary Button 3개",
      alignsWith: ["single-primary", "button-variants"],
    },
    {
      id: "no-search-under-search",
      statement: "Search 아래 Search",
      alignsWith: ["search-top", "filter-below-search", "admin-stack"],
    },
    {
      id: "no-table-in-form",
      statement: "Form 안에 Table",
      alignsWith: ["admin-stack", "ux-decision-tree"],
    },
    {
      id: "no-new-color",
      statement: "새로운 Color 생성",
      alignsWith: ["foundation"],
    },
    {
      id: "no-new-radius",
      statement: "새로운 Radius 생성",
      alignsWith: ["foundation"],
    },
    {
      id: "no-new-typography",
      statement: "새로운 Typography 생성",
      alignsWith: ["foundation"],
    },
  ],
  always: [
    {
      id: "use-design-kit",
      statement: "기존 Design Kit 사용",
      alignsWith: ["foundation", "pattern-before-screen"],
    },
  ],
} as const;

/** @deprecated Prefer NEVER_ALWAYS.never */
export const NEVER_RULES = NEVER_ALWAYS.never;

/** @deprecated Prefer NEVER_ALWAYS.always */
export const ALWAYS_RULES = NEVER_ALWAYS.always;
