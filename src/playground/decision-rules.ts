/**
 * JKO decision rules — Button variants & Modal / Drawer / Bottom Sheet.
 * Korean text is source of truth; use for Component/Pattern/Screen Compose.
 */

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "tertiary";

export type ButtonVariantRule = {
  variant: ButtonVariant;
  /** Question heading (Korean) */
  when: string;
  conditions: readonly string[];
  /** Optional note under the when/conditions */
  note?: string;
};

export type ButtonRules = {
  id: "button-variants";
  title: string;
  summary: string;
  variants: readonly ButtonVariantRule[];
  apply: {
    member: string;
    dataTable: string;
    stickyFooter: string;
  };
};

export const BUTTON_RULES: ButtonRules = {
  id: "button-variants",
  title: "Button — when which variant?",
  summary:
    "화면당 Primary 1개. Primary=핵심 진행(조회·저장·다음·확인). Secondary=보조(취소·초기화·닫기). Danger=파괴적(삭제).",
  variants: [
    {
      variant: "primary",
      when: "언제 Primary를 사용하는가?",
      conditions: [
        "화면의 핵심 다음 행동 1개 (조회, 저장, 다음, 확인의 긍정 진행)",
        "Sticky Footer 저장, Search의 검색/조회 버튼",
        "화면당 Primary는 원칙적으로 1개 (JKO UX Principles #3)",
      ],
    },
    {
      variant: "secondary",
      when: "언제 Secondary를 사용하는가?",
      conditions: [
        "보조 행동 (취소, 초기화, 닫기, 더보기, 내보내기 등)",
        "Primary와 함께 있을 때 시각적으로 경쟁하지 않음",
      ],
    },
    {
      variant: "danger",
      when: "언제 Danger를 사용하는가?",
      conditions: [
        "파괴적·되돌리기 어려운 행동 (삭제, 해지, 영구 제거)",
        "Confirm Dialog의 삭제 확정 버튼",
      ],
    },
    {
      variant: "ghost",
      when: "Ghost / Tertiary (선택)",
      conditions: [
        "Ghost: 덜 강조된 보조 액션, 툴바·선택 해제 등",
        "Tertiary: 테이블 행 액션·아웃라인 보조 (선택)",
      ],
      note: "DS에 ghost·tertiary가 있음. 행 단위 액션은 Ghost/Tertiary를 우선하고 Primary와 경쟁시키지 않는다.",
    },
  ],
  apply: {
    member:
      "Primary = 조회·저장만. Danger = 삭제. Secondary = 취소·초기화·닫기.",
    dataTable:
      "Primary = 조회만. Danger = 삭제(Confirm). Secondary = 초기화. 내보내기 = Tertiary/Secondary.",
    stickyFooter:
      "Sticky Footer Primary = 저장 하나. 취소는 Secondary. 삭제는 Danger(+ Confirm Dialog).",
  },
} as const;

export type OverlayKind = "Modal" | "Drawer" | "Bottom Sheet";

export type OverlaySide = {
  kind: OverlayKind;
  when: string;
  conditions: readonly string[];
};

export type OverlayRules = {
  id: "overlay-surfaces";
  title: string;
  summary: string;
  modal: OverlaySide;
  drawer: OverlaySide;
  bottomSheet: OverlaySide;
  apply: {
    dialog: string;
    detail: string;
    delete: string;
    adminDesktop: string;
  };
};

export const OVERLAY_RULES: OverlayRules = {
  id: "overlay-surfaces",
  title: "Modal vs Drawer vs Bottom Sheet",
  summary:
    "빠른 작업·짧은 결정·포커스 차단 → Modal. 수정·빠른 확인·목록 유지 → Drawer. 모바일 선택/필터/액션 → Bottom Sheet. 「빠른 작업」≠「빠른 확인」.",
  modal: {
    kind: "Modal",
    when: "언제 Modal을 사용하는가?",
    conditions: [
      "빠른 작업 (짧은 결정·포커스 차단) — UX Decision Tree",
      "Confirm / Warning / Delete / Success 등 결정이 필요한 짧은 대화",
      "포커스를 가두고 배경 맥락을 잠시 차단해야 할 때",
      "삭제는 Confirm Dialog(Modal) — JKO UX Rules #5",
    ],
  },
  drawer: {
    kind: "Drawer",
    when: "언제 Drawer를 사용하는가?",
    conditions: [
      "수정 (+ 목록 유지)",
      "빠른 확인 (상세 스캔 — ≠ 빠른 작업)",
      "목록 유지",
    ],
  },
  bottomSheet: {
    kind: "Bottom Sheet",
    when: "언제 Bottom Sheet를 사용하는가?",
    conditions: [
      "모바일에서 선택지·필터·짧은 액션 시트",
      "엄지 영역 우선, 부분 높이 오버레이",
      "데스크톱 Admin에서는 Drawer/Modal 우선 — Bottom Sheet는 반응형 대안",
    ],
  },
  apply: {
    dialog:
      "Dialog Pattern = Modal. Confirm·Warning·Delete·Success. Danger 확정 + 안전 액션 기본 포커스.",
    detail:
      "Detail Pattern = Drawer (DRAWER_VS_PAGE와 동일). 모바일에서는 풀스크린/Bottom Sheet 전환 가능.",
    delete: "삭제 확정은 항상 Confirm Dialog(Modal). Drawer 안에서 바로 삭제하지 않는다.",
    adminDesktop:
      "데스크톱 Admin: Drawer / Modal 우선. Bottom Sheet는 좁은 폭·모바일 대응용.",
  },
} as const;
