/**
 * JKO UX Rules — canonical operational UX rules (8).
 * Korean `statement` is source of truth; `key` + English `label` for cross-refs
 * (Search First … Admin Stack · Bulk Action).
 *
 * Master: `docs/JKO_AI_DEVELOPMENT_RULES.md`
 * Decision trees (re-exported below):
 * - Full tree → `decision-tree.ts` (`UX_DECISION_TREE`)
 * - Drawer vs Page → `navigation-rules.ts` (`DRAWER_VS_PAGE`)
 * - Button variants · Modal/Drawer/Bottom Sheet → `decision-rules.ts`
 *
 * Docs: `docs/principles/jko-ux-principles.md` · index `docs/UX_RULES.md`
 */

export { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
export type {
  DrawerVsPageRule,
  DrawerVsPageSide,
  NavigationOutcome,
} from "@/playground/navigation-rules";

export { BUTTON_RULES, OVERLAY_RULES } from "@/playground/decision-rules";
export type {
  ButtonRules,
  ButtonVariantRule,
  OverlayRules,
  OverlaySide,
} from "@/playground/decision-rules";

export { NEVER_ALWAYS, NEVER_RULES, ALWAYS_RULES } from "@/playground/never-always";
export type {
  NeverAlwaysRule,
  NeverAlwaysRules,
} from "@/playground/never-always";

export { UX_DECISION_TREE } from "@/playground/decision-tree";
export type {
  DecisionNode,
  DecisionOutcome,
  DecisionBranch,
  UxDecisionTree,
} from "@/playground/decision-tree";

export type UxPrinciple = {
  id: number;
  /** Short English key for code refs */
  key: string;
  /** Canonical statement (Korean) */
  statement: string;
};

/** Canonical JKO UX Rules (8). Prefer this name in new code. */
export const JKO_UX_RULES: readonly UxPrinciple[] = [
  {
    id: 1,
    key: "search-top",
    statement: "검색은 항상 가장 위에 위치한다.",
  },
  {
    id: 2,
    key: "filter-below-search",
    statement: "Filter는 Search 아래에 위치한다.",
  },
  {
    id: 3,
    key: "single-primary",
    statement: "Primary Button은 화면당 하나만 존재한다.",
  },
  {
    id: 4,
    key: "detail-drawer",
    statement: "Detail은 새로운 페이지보다 Drawer를 우선 사용한다.",
  },
  {
    id: 5,
    key: "delete-confirm",
    statement: "삭제는 Confirm Dialog를 사용한다.",
  },
  {
    id: 6,
    key: "skeleton-loading",
    statement: "Loading은 Skeleton을 우선 사용한다.",
  },
  {
    id: 7,
    key: "empty-cta",
    statement: "Empty State는 CTA를 반드시 제공한다.",
  },
  {
    id: 8,
    key: "admin-stack",
    statement:
      "모든 관리자 화면은 Search → Filter → Data → Pagination 구조를 따른다.",
  },
] as const;

/** @deprecated Use `JKO_UX_RULES` — alias kept for existing imports */
export const JKO_UX_PRINCIPLES = JKO_UX_RULES;

export const JKO_UX_PRINCIPLE_BY_ID: Record<number, UxPrinciple> =
  Object.fromEntries(JKO_UX_RULES.map((p) => [p.id, p]));

export const JKO_UX_PRINCIPLE_BY_KEY: Record<string, UxPrinciple> =
  Object.fromEntries(JKO_UX_RULES.map((p) => [p.key, p]));

/** Rules the Data Table Pattern live preview must honor (all 8) */
export const DATA_TABLE_UX_PRINCIPLE_IDS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/** Dashboard — single primary if any CTA; overview stack (not Search→Filter list) */
export const DASHBOARD_UX_PRINCIPLE_IDS = [3] as const;

/** CRUD Pattern — single primary Submit, Drawer for edit */
export const CRUD_UX_PRINCIPLE_IDS = [3, 4] as const;

export function getUxPrinciple(idOrKey: number | string): UxPrinciple | undefined {
  if (typeof idOrKey === "number") return JKO_UX_PRINCIPLE_BY_ID[idOrKey];
  return JKO_UX_PRINCIPLE_BY_KEY[idOrKey];
}
