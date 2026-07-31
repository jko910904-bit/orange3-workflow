/**
 * JKO AI Decision Engine — design-time types stub (not a runtime LLM pipeline).
 *
 * Docs: knowledge/ai/AI_DECISION_ENGINE.md
 * Judgment: Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result
 */

export type Domain = "admin" | "saas" | "ai";

export type Confidence = "high" | "medium" | "low";

export type OverlayKind = "drawer" | "modal" | "confirm";

export type ValidationGate =
  | "pre-pattern"
  | "pre-recipe"
  | "pre-component"
  | "pre-result";

/** Declarative rule — see knowledge/ai/RULE_ENGINE.md */
export type DecisionRule = {
  id: string;
  /** Lower runs first. 0 = NEVER override */
  priority: number;
  if: readonly string[];
  then: readonly string[];
  never?: readonly string[];
  gate?: ValidationGate;
  refs?: readonly string[];
};

/** One step in the mandatory judgment order */
export type DecisionStepId =
  | "problem"
  | "user-goal"
  | "task"
  | "pattern"
  | "recipe"
  | "component"
  | "layout"
  | "validation"
  | "result";

export type DecisionStep = {
  id: DecisionStepId;
  /** Korean prompt / checkpoint */
  ask: string;
  /** Linked eight-question ids (1–8), if any */
  questions?: readonly number[];
};

export const JUDGMENT_ORDER: readonly DecisionStep[] = [
  { id: "problem", ask: "어떤 운영 문제인가?" },
  { id: "user-goal", ask: "사용자의 목표는 무엇인가?", questions: [1] },
  { id: "task", ask: "User Task는 무엇인가? (조회/수정/삭제/생성/현황…)" },
  { id: "pattern", ask: "어떤 UX Pattern을 선택해야 하는가?", questions: [2] },
  {
    id: "recipe",
    ask: "기존 Recipe 재사용인가, 새 Recipe 문서가 필요한가?",
    questions: [4, 5],
  },
  {
    id: "component",
    ask: "어떤 Kit Component를 사용하는가?",
    questions: [3],
  },
  { id: "layout", ask: "Admin 12/1440/240/fluid 또는 Portal인가?" },
  {
    id: "validation",
    ask: "a11y · 난이도 · 유지보수 · Never를 통과하는가?",
    questions: [6, 7, 8],
  },
  { id: "result", ask: "Output Rules로 Compose 명세만 출력" },
] as const;

export type PatternSelectorResult = {
  patternIds: readonly string[];
  overlays: readonly OverlayKind[];
  confidence: Confidence;
  fallbacks: readonly string[];
  rationale: string;
  refs: readonly string[];
};

export type ComponentSelectorResult = {
  components: readonly {
    id: string;
    role: string;
    variantHints?: readonly string[];
  }[];
  missing: readonly string[];
  forbiddenAttempts: readonly string[];
};

export type ComposerResult = {
  recipeId?: string;
  /** Q5 — propose new recipe doc path, not new UI tokens */
  proposedRecipeDoc?: string;
  layout: "admin-sidebar" | "portal-centered";
  patterns: PatternSelectorResult;
  components: ComponentSelectorResult;
  gatesPassed: boolean;
};
