/**
 * Drawer vs Page — canonical navigation decision rules.
 * Korean text is source of truth; use for Pattern/Screen Compose.
 */

export type NavigationOutcome = "Drawer" | "Page";

export type DrawerVsPageSide = {
  /** Question heading (Korean) */
  when: string;
  /** If-conditions that select this outcome */
  conditions: readonly string[];
  outcome: NavigationOutcome;
};

export type DrawerVsPageRule = {
  id: "drawer-vs-page";
  title: string;
  /** Canonical Korean summary */
  summary: string;
  drawer: DrawerVsPageSide;
  page: DrawerVsPageSide;
  /** Pattern / Screen application notes */
  apply: {
    detail: string;
    crud: string;
    wizard: string;
    member: string;
    dataTable: string;
  };
};

export const DRAWER_VS_PAGE: DrawerVsPageRule = {
  id: "drawer-vs-page",
  title: "Drawer vs Page",
  summary:
    "수정(+목록 유지)·빠른 확인 → Drawer. 많은 정보·Wizard·생성·목록 미유지 수정 → Page. 「빠른 확인」≠「빠른 작업」(빠른 작업=Modal, OVERLAY_RULES).",
  drawer: {
    when: "언제 Drawer를 사용하는가?",
    conditions: ["수정 (+ 목록 유지)", "빠른 확인 (상세 스캔)", "목록 유지"],
    outcome: "Drawer",
  },
  page: {
    when: "언제 Page를 사용하는가?",
    conditions: ["많은 정보", "Wizard", "생성", "수정이지만 목록을 유지하지 않을 때"],
    outcome: "Page",
  },
  apply: {
    detail: "상세·빠른 확인·수정 = Drawer (목록 유지). 풀페이지 Detail은 예외.",
    crud: "생성 → Page. 수정·빠른 확인 → Drawer.",
    wizard: "Wizard → Page.",
    member:
      "상세·수정 = Drawer (목록 유지). 회원 생성 = Page.",
    dataTable: "행 「상세」는 Drawer로 연다. 전체 페이지로 이동하지 않는다.",
  },
} as const;
