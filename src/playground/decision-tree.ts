/**
 * JKO UX Decision Tree — canonical product routing questions.
 * Korean text is source of truth; use for Pattern/Screen Compose.
 *
 * Docs: `docs/principles/ux-decision-tree.md` · master: `docs/JKO_AI_DEVELOPMENT_RULES.md`
 */

export type DecisionOutcome = {
  /** When answer is YES (or the labeled branch) */
  label: string;
  /** Ordered pattern / surface names */
  path: readonly string[];
};

export type DecisionBranch = {
  /** Branch label under a YES path (e.g. nested question) */
  question: string;
  yes: DecisionOutcome;
  no: DecisionOutcome;
};

export type DecisionNode = {
  id: string;
  /** Top-level question (Korean) */
  question: string;
  /** Simple YES path */
  yes?: DecisionOutcome;
  /** Simple NO path (when present) */
  no?: DecisionOutcome;
  /** Nested YES → sub-question (e.g. 수정 → 목록 유지?) */
  nested?: DecisionBranch;
  /** Related decision docs / code */
  related?: readonly string[];
};

export type UxDecisionTree = {
  id: "ux-decision-tree";
  title: string;
  summary: string;
  nodes: readonly DecisionNode[];
};

export const UX_DECISION_TREE: UxDecisionTree = {
  id: "ux-decision-tree",
  title: "UX Decision Tree",
  summary:
    "화면 유형을 질문으로 고르면 Pattern·Surface가 정해집니다. Never/Always·8 Rules와 함께 적용합니다.",
  nodes: [
    {
      id: "list-screen",
      question: "목록 화면인가?",
      yes: {
        label: "YES",
        path: [
          "Search Pattern",
          "Filter Pattern",
          "Data Table Pattern",
          "Pagination",
        ],
      },
      related: ["search-top", "filter-below-search", "admin-stack"],
    },
    {
      id: "edit-data",
      question: "데이터를 수정하는가?",
      nested: {
        question: "목록을 유지해야 하는가?",
        yes: { label: "YES → Drawer", path: ["Drawer"] },
        no: { label: "NO → Page", path: ["Page"] },
      },
      related: ["drawer-vs-page", "detail-drawer"],
    },
    {
      id: "delete",
      question: "삭제인가?",
      yes: { label: "YES", path: ["Confirm Dialog"] },
      related: ["delete-confirm", "overlay-surfaces"],
    },
    {
      id: "data-volume",
      question: "데이터가 20개 이상인가?",
      yes: { label: "YES", path: ["Table"] },
      no: { label: "NO", path: ["Card"] },
      related: ["admin-stack"],
    },
    {
      id: "steps",
      question: "단계가 존재하는가?",
      yes: { label: "YES", path: ["Wizard Pattern"] },
      related: ["drawer-vs-page"],
    },
    {
      id: "admin-surface",
      question: "관리자 화면인가?",
      yes: { label: "YES", path: ["Sidebar Layout"] },
      no: { label: "NO", path: ["Centered Layout"] },
      related: ["layout-admin"],
    },
    {
      id: "quick-task",
      question: "빠른 작업인가?",
      yes: { label: "YES", path: ["Modal"] },
      no: { label: "NO", path: ["Page"] },
      related: ["overlay-surfaces"],
    },
  ],
} as const;
