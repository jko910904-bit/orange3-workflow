/**
 * 디자이너처럼 판단하기 — mandatory 8-step checklist before UI compose.
 * Docs: `docs/principles/designer-judgment.md` · master: `docs/JKO_AI_DEVELOPMENT_RULES.md`
 */

export type DesignerJudgmentStep = {
  id: number;
  /** Canonical question (Korean) */
  question: string;
  /** Short English key for anchors / refs */
  key: string;
};

export type DesignerJudgment = {
  id: "designer-judgment";
  title: string;
  summary: string;
  hardConstraints: readonly string[];
  steps: readonly DesignerJudgmentStep[];
};

export const DESIGNER_JUDGMENT: DesignerJudgment = {
  id: "designer-judgment",
  title: "디자이너처럼 판단하기",
  summary:
    "화면을 생성하기 전에 Goal → Task → Pattern → Component → Foundation → Responsive → A11y 순으로 판단한다.",
  hardConstraints: [
    "새 Component 전에 기존 Component 재사용",
    "새 Color / Radius / Typography 생성 금지",
    "새 Pattern 전에 기존 Pattern 우선",
  ],
  steps: [
    {
      id: 1,
      key: "ux-goal",
      question: "이 화면의 UX Goal은 무엇인가?",
    },
    {
      id: 2,
      key: "user-task",
      question: "사용자가 수행하는 Task는 무엇인가?",
    },
    {
      id: 3,
      key: "existing-pattern",
      question: "기존 UX Pattern으로 해결 가능한가?",
    },
    {
      id: 4,
      key: "new-pattern",
      question: "새로운 Pattern이 필요한가?",
    },
    {
      id: 5,
      key: "existing-component",
      question: "기존 Component만으로 구성 가능한가?",
    },
    {
      id: 6,
      key: "foundation",
      question: "Foundation 규칙을 위반하는가?",
    },
    {
      id: 7,
      key: "responsive",
      question: "반응형을 고려했는가?",
    },
    {
      id: 8,
      key: "accessibility",
      question: "접근성을 만족하는가?",
    },
  ],
} as const;
