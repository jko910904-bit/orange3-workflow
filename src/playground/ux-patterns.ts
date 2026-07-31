import type { PatternId } from "@/types";

export type DocStatus = "ready" | "partial" | "planned";

/** Material / SaaS-inspired taxonomy groups */
export type PatternGroupId =
  | "navigation"
  | "task"
  | "feedback"
  | "workflow"
  | "jko";

export const PATTERN_GROUPS: {
  id: PatternGroupId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "navigation",
    label: "Navigation",
    blurb: "어디인지 알리고, 다음 목적지로 이동하게 합니다.",
  },
  {
    id: "task",
    label: "Core Task",
    blurb: "조회·비교·편집 등 핵심 업무 단위입니다.",
  },
  {
    id: "feedback",
    label: "Feedback",
    blurb: "결과·상태·오류를 명확히 전달합니다.",
  },
  {
    id: "workflow",
    label: "Workflow / Domain",
    blurb: "다단계·일정·권한·파일 등 도메인 작업 흐름입니다.",
  },
  {
    id: "jko",
    label: "JKO",
    blurb: "AI Compose 전용 작업 단위입니다.",
  },
];

/** Required interaction / system states on every pattern detail page */
export const PATTERN_DESIGN_STATES = [
  "Default",
  "Hover",
  "Focus",
  "Active",
  "Disabled",
  "Empty",
  "Loading",
  "Error",
  "Responsive",
] as const;

export type PatternDesignState = (typeof PATTERN_DESIGN_STATES)[number];

/**
 * UX Pattern = task unit (not a pretty UI block).
 * Metadata schema required on every entry.
 */
export type UxPatternDoc = {
  id: string;
  name: string;
  description: string;
  useCase: string;
  uxGoal: string;
  /** Product goals — shown as Goal on detail (esp. Data Table) */
  goals: string[];
  /** User tasks — shown as User Task on detail */
  userTasks: string[];
  includedComponents: string[];
  /** Feature parts inside the pattern (Sticky Header, Sort, …) */
  parts: string[];
  responsiveRule: string;
  accessibilityRule: string;
  bestPractice: string;
  /** Structured best-practice bullets (detail page list when present) */
  bestPractices?: string[];
  relatedPatterns: string[];
  group: PatternGroupId;
  recipes: string[];
  /** Live DS pattern via ScreenRenderer when set */
  registryId?: PatternId;
  surface?: "admin" | "portal";
  /** Dedicated compose demo (Compose, not Generate) */
  composePreview?: "DataTable" | "Search" | "Dashboard" | "Form";
  status: DocStatus;
  /** Legacy / alternate ids that resolve to this pattern */
  aliases?: string[];
};

export const UX_PATTERNS: UxPatternDoc[] = [
  // ─── Navigation ───────────────────────────────────────────
  {
    id: "app-bar",
    name: "App Bar",
    description:
      "상단 글로벌 바 — 검색·알림·프로필·글로벌 액션으로 앱 전역 작업을 수행합니다.",
    useCase: "모든 Admin/Portal 화면의 최상위 탐색·계정·글로벌 액션",
    uxGoal: "현재 컨텍스트를 유지한 채 전역 작업에 즉시 접근한다",
    goals: [
      "전역 검색·알림·프로필에 빠르게 도달한다",
      "현재 앱/제품 컨텍스트를 유지한다",
    ],
    userTasks: ["검색", "알림 확인", "프로필", "글로벌 액션"],
    includedComponents: ["Input.Search", "Button", "Avatar", "Badge", "Menu"],
    parts: ["Top Nav", "Search", "Notification", "Profile", "Global Action"],
    responsiveRule: "좁은 폭에서는 검색을 아이콘으로 접고 햄버거/드로어로 연결합니다.",
    accessibilityRule: "랜드마크 banner, 알림은 aria-live, 프로필 메뉴는 Escape로 닫힙니다.",
    bestPractice: "페이지 제목을 App Bar에 중복하지 말고, 전역 액션만 둡니다.",
    relatedPatterns: ["navigation-drawer", "search", "notification"],
    group: "navigation",
    recipes: [],
    status: "planned",
  },
  {
    id: "navigation-rail",
    name: "Navigation Rail",
    description:
      "아이콘+라벨 1차 내비. 활성 항목으로 현재 영역을 표시합니다.",
    useCase: "Admin 데스크톱 1차 IA (5–7개 최상위 영역)",
    uxGoal: "주요 영역 간 전환을 한 번의 탭으로 끝낸다",
    goals: ["1차 목적지로 빠르게 이동한다", "현재 활성 영역을 분명히 한다"],
    userTasks: ["영역 이동", "활성 확인"],
    includedComponents: ["Button", "Badge", "Icon"],
    parts: ["Primary Nav", "Icon+Label", "Active"],
    responsiveRule: "태블릿 이하에서는 Navigation Drawer 또는 Bottom Navigation으로 대체합니다.",
    accessibilityRule: "nav 랜드마크, aria-current=page로 활성 항목을 표시합니다.",
    bestPractice: "라벨을 숨기지 마세요. 아이콘만으로는 업무 의미가 약합니다.",
    relatedPatterns: ["navigation-drawer", "bottom-navigation", "breadcrumb"],
    group: "navigation",
    recipes: [],
    status: "planned",
  },
  {
    id: "navigation-drawer",
    name: "Navigation Drawer",
    description:
      "확장/축소 가능한 사이드 내비. 중첩 메뉴로 2–3depth IA를 담습니다.",
    useCase: "Admin LNB, 복잡한 계층 메뉴",
    uxGoal: "깊은 IA에서도 위치를 잃지 않고 이동한다",
    goals: ["계층 메뉴를 펼쳐 목적지로 이동한다", "작업 공간을 확보하기 위해 접는다"],
    userTasks: ["Expand", "Collapse", "Nested Menu 이동"],
    includedComponents: ["Button", "Badge", "Divider"],
    parts: ["Expand", "Collapse", "Nested Menu"],
    responsiveRule: "모바일에서는 오버레이 드로어로 전환하고 스크림으로 닫습니다.",
    accessibilityRule: "포커스 트랩(오버레이), Escape 닫기, 중첩은 aria-expanded.",
    bestPractice: "활성 leaf와 상위 그룹을 함께 하이라이트합니다.",
    relatedPatterns: ["navigation-rail", "app-bar", "breadcrumb"],
    group: "navigation",
    recipes: [],
    status: "planned",
  },
  {
    id: "bottom-navigation",
    name: "Bottom Navigation",
    description: "모바일 1차 목적지용 하단 탭 내비.",
    useCase: "Portal/모바일 앱의 핵심 3–5개 목적지",
    uxGoal: "한 손 조작으로 핵심 화면에 도달한다",
    goals: ["엄지 영역에서 핵심 화면을 전환한다"],
    userTasks: ["탭 전환", "활성 확인"],
    includedComponents: ["Button", "Badge", "Icon"],
    parts: ["Mobile", "Icon+Label", "Active"],
    responsiveRule: "데스크톱에서는 Navigation Rail/Drawer로 대체합니다.",
    accessibilityRule: "aria-current, 터치 타깃 최소 48px.",
    bestPractice: "항목은 5개 이하. 배지로 미확인만 표시합니다.",
    relatedPatterns: ["navigation-rail", "app-bar"],
    group: "navigation",
    recipes: [],
    status: "planned",
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "현재 위치와 상위 경로를 보여 부모로 되돌아가게 합니다.",
    useCase: "3depth 이상 Admin/Portal 상세·목록",
    uxGoal: "계층을 한눈에 파악하고 상위 목록으로 복귀한다",
    goals: ["현재 위치를 안다", "부모 경로로 한 번에 이동한다"],
    userTasks: ["Current Location 확인", "Parent Nav"],
    includedComponents: ["Link", "Button"],
    parts: ["Current Location", "Parent Nav"],
    responsiveRule: "좁은 폭에서는 중간 단계를 접고 마지막·루트만 노출합니다.",
    accessibilityRule: "nav + aria-label=Breadcrumb, 현재 페이지는 링크가 아닙니다.",
    bestPractice: "페이지 제목과 마지막 crumb를 중복하지 마세요.",
    relatedPatterns: ["navigation-drawer", "detail", "list"],
    group: "navigation",
    recipes: [],
    status: "planned",
  },

  // ─── Core task ────────────────────────────────────────────
  {
    id: "search",
    name: "Search Pattern",
    description:
      "필드·자동완성·최근·제안·결과로 대상을 빠르게 찾는 UX 작업 단위입니다.",
    useCase: "목록·전역 검색에서 키워드로 대상을 좁힐 때",
    uxGoal: "최소 입력으로 원하는 결과에 도달한다",
    goals: ["키워드로 대상을 찾는다", "최근·제안으로 입력을 줄인다"],
    userTasks: ["입력", "Autocomplete", "Recent", "Suggestion", "Result"],
    includedComponents: ["Input.Search", "Button", "List", "Badge"],
    parts: ["Field", "Autocomplete", "Recent", "Suggestion", "Result"],
    responsiveRule: "모바일에서는 전체 화면 검색 시트로 확장합니다.",
    accessibilityRule: "combobox 패턴, 결과 목록은 listbox/option, Escape로 닫기.",
    bestPractice:
      "검색창 좌측 정렬 · 검색 버튼 우측 · Enter 지원 · 최근 검색 제공. 빈 결과는 Empty State Pattern으로 연결합니다.",
    bestPractices: [
      "검색창은 좌측 정렬",
      "검색 버튼은 우측",
      "Enter 지원",
      "최근 검색 제공",
    ],
    relatedPatterns: ["filter", "data-table", "empty", "list"],
    group: "task",
    recipes: ["search-bar"],
    composePreview: "Search",
    surface: "admin",
    status: "ready",
    aliases: ["search-pattern"],
  },
  {
    id: "filter",
    name: "Filter Pattern",
    description:
      "카테고리·상태·기간·태그로 집합을 좁히고 Reset/Apply로 확정합니다.",
    useCase: "대량 목록에서 조건 조합으로 조회할 때",
    uxGoal: "관련 없는 행을 배제하고 비교 가능한 집합만 남긴다",
    goals: ["조건으로 집합을 좁힌다", "적용·초기화를 명시적으로 한다"],
    userTasks: ["Category", "Status", "Date Range", "Tag", "Reset", "Apply"],
    includedComponents: ["Select", "Input", "DatePicker", "Chip", "Button"],
    parts: ["Category", "Status", "Date Range", "Tag", "Reset", "Apply"],
    responsiveRule:
      "모바일에서는 필터를 Bottom Sheet로 모읍니다 (OVERLAY_RULES). 데스크톱은 인라인/Drawer.",
    accessibilityRule: "Apply 전까지 결과가 바뀌면 안내, Reset은 명확한 레이블.",
    bestPractice: "Apply 전까지 테이블을 바꾸지 않는 확정형 필터를 기본으로 합니다.",
    relatedPatterns: ["search", "data-table", "analytics"],
    group: "task",
    recipes: ["filter-bar", "data-table"],
    registryId: "SearchFilterTable",
    surface: "admin",
    status: "ready",
  },
  {
    id: "data-table",
    name: "Data Table Pattern",
    description:
      "데이터 조회를 위한 관리 목록 UX 작업 단위입니다. Search → Filter → Data → Pagination 순으로 Compose하고, Empty·Loading 상태를 제공합니다 (JKO Rule #8). DATA_DENSITY: 건수 ≥20 → Table; <20 → Card/List.",
    useCase:
      "회원·계약·상품 등 행 단위 데이터를 검색·필터하고, 정렬·선택 후 대량 삭제할 때",
    uxGoal: "데이터 조회",
    goals: ["데이터 조회"],
    userTasks: ["검색", "필터", "정렬", "선택", "삭제"],
    /** Vertical stack + required states — Rule #8: Search → Filter → Data → Pagination */
    includedComponents: [
      "Search",
      "Filter",
      "Bulk Action",
      "Table",
      "Pagination",
      "Empty",
      "Loading",
    ],
    parts: [
      "Search",
      "Filter",
      "Bulk Action",
      "Sticky Header",
      "Sort",
      "Multi Select",
      "Table",
      "Pagination",
      "Empty",
      "Loading",
    ],
    responsiveRule:
      "좁은 폭에서는 가로 스크롤을 허용하고, 필터는 접힌 패널·시트로 이동합니다. 핵심 열만 우선 노출합니다.",
    accessibilityRule:
      "테이블 헤더와 셀 관계(scope), 정렬 버튼 aria-sort, 체크박스는 행 선택 레이블, 벌크 바는 선택 변경 시 안내합니다. Loading은 aria-busy.",
    bestPractice:
      "JKO UX Rule #8: Search → Filter → Data → Pagination. Bulk는 Data와 함께. DATA_DENSITY: 건수 ≥20 → Table(이 패턴); <20 → Card/List. Empty(+CTA)·Loading(Skeleton). BUTTON_RULES: Primary=조회만, Danger=삭제(Confirm), Secondary=초기화. 행 「상세」는 Drawer(목록 유지).",
    relatedPatterns: ["search", "filter", "empty", "loading", "dialog", "detail"],
    group: "task",
    recipes: ["page-header", "filter-bar", "toolbar", "data-table"],
    composePreview: "DataTable",
    surface: "admin",
    status: "ready",
  },
  {
    id: "list",
    name: "List Pattern",
    description:
      "아바타·제목·설명·메타·액션으로 구성된 행 목록 UX 단위입니다. DATA_DENSITY: 건수 <20 → List/Card; ≥20 → Data Table로 승격.",
    useCase: "알림·멤버·피드처럼 카드형보다 가벼운 스캔 목록 (소량 <20)",
    uxGoal: "행을 스캔하고 단일 액션을 바로 실행한다",
    goals: ["항목을 빠르게 스캔한다", "행 단위 액션을 실행한다"],
    userTasks: ["스캔", "선택", "행 액션"],
    includedComponents: ["Avatar", "Badge", "Button", "Checkbox", "Card"],
    parts: ["Avatar", "Title", "Description", "Metadata", "Action", "Card"],
    responsiveRule: "메타데이터는 작은 화면에서 2줄로 접습니다.",
    accessibilityRule: "리스트는 ul/li 또는 grid+row, 액션 버튼에 명확한 이름.",
    bestPractice:
      "DATA_DENSITY_RULE: 데이터가 20개 미만이면 List/Card. 20개 이상·비교·정렬이 필요하면 Data Table Pattern으로 승격. 상세는 Drawer(목록 유지).",
    relatedPatterns: ["data-table", "detail", "notification", "empty"],
    group: "task",
    recipes: [],
    status: "planned",
  },
  {
    id: "detail",
    name: "Detail Pattern",
    description:
      "Drawer·사이드 패널·탭·활동·이력으로 목록 항목의 상세를 봅니다. DRAWER_VS_PAGE: 상세·빠른 확인 = Drawer.",
    useCase: "목록에서 행을 열어 상세·이력을 확인할 때 (목록 유지)",
    uxGoal: "컨텍스트를 유지한 채 상세를 읽고 후속 액션을 한다",
    goals: ["목록 컨텍스트를 유지한다", "상세·이력을 한 패널에서 본다"],
    userTasks: ["상세 열기", "탭 전환", "Activity", "History"],
    includedComponents: ["Drawer", "Tabs", "Card", "Button", "Badge"],
    parts: ["Drawer", "Side Panel", "Tabs", "Activity", "History"],
    responsiveRule:
      "모바일에서는 풀스크린 시트·Bottom Sheet로 전환합니다. 데스크톱 Admin은 Drawer 우선 (OVERLAY_RULES).",
    accessibilityRule: "포커스 이동·트랩, Escape 닫기, 탭은 키보드로 전환.",
    bestPractice:
      "DRAWER_VS_PAGE / OVERLAY_RULES: 수정·빠른 확인·목록 유지 → Drawer. 많은 정보·생성·Wizard → Page. 목록 선택 상태를 Detail과 동기화.",
    relatedPatterns: ["data-table", "list", "timeline", "crud"],
    group: "task",
    recipes: ["page-header"],
    registryId: "Detail",
    surface: "admin",
    status: "partial",
    aliases: ["detail-drawer"],
  },
  {
    id: "crud",
    name: "CRUD Pattern",
    description:
      "등록 및 수정을 위한 폼 UX 작업 단위입니다. Form · Validation · Submit · Cancel. 생성 → Page, 수정 → Drawer(Sticky Footer Submit).",
    useCase: "엔티티 생성(Page)·수정(Drawer) 화면",
    uxGoal: "등록 및 수정",
    goals: ["등록 및 수정"],
    userTasks: ["Form", "Validation", "Submit", "Cancel"],
    includedComponents: ["Form", "Validation", "Submit", "Cancel"],
    parts: ["Form Section", "Validation", "Submit", "Cancel", "Sticky Footer"],
    responsiveRule:
      "섹션은 세로 스택. Drawer 컨텍스트에서는 Submit을 Sticky Footer에 둡니다 (모바일·좁은 패널).",
    accessibilityRule:
      "에러는 필드와 연결되어 낭독, Submit 중 중복 제출 방지. Sticky Footer는 키보드로 도달 가능.",
    bestPractice:
      "DRAWER_VS_PAGE: 생성 → Page. 수정·빠른 확인 → Drawer. BUTTON_RULES: Submit=Primary 하나, Cancel=Secondary. Sticky Footer = 저장 하나. 위험한 변경은 Dialog로 확인.",
    relatedPatterns: ["dialog", "detail", "data-table", "settings"],
    group: "task",
    recipes: ["page-header", "login-form"],
    registryId: "Form",
    composePreview: "Form",
    surface: "admin",
    status: "ready",
    aliases: ["crud-form"],
  },
  {
    id: "dashboard",
    name: "Dashboard Pattern",
    description:
      "현황 확인을 위한 UX 작업 단위입니다. KPI → Charts → Recent Activity → Quick Action 순으로 Compose합니다. Title은 page chrome(선택).",
    useCase: "Admin 홈·운영 현황, 업무 시작 대시보드",
    uxGoal: "현황 확인",
    goals: ["현황 확인"],
    userTasks: ["KPI", "Charts", "Recent Activity", "Quick Action"],
    /** Vertical stack order — must match live preview (Title = optional chrome) */
    includedComponents: [
      "KPI",
      "Charts",
      "Recent Activity",
      "Quick Action",
    ],
    parts: [
      "Title (page chrome, optional)",
      "KPI",
      "Charts",
      "Recent Activity",
      "Quick Action",
    ],
    responsiveRule:
      "Admin shell: 12-col / max 1440 / sidebar 240 / content fluid. KPI는 4→2→1열, Charts·Activity·Quick Action은 세로 스택.",
    accessibilityRule:
      "차트는 텍스트 요약을 제공하고, Recent Activity는 시간순 목록으로 낭독합니다. Quick Action은 명확한 버튼 이름.",
    bestPractice:
      "JKO UX: KPI → Charts → Recent Activity → Quick Action. Title은 Admin page chrome만(필수 Components 아님). Primary는 있으면 하나만. Table은 Dashboard 필수 스택이 아님(요약은 Analytics). Kit 토큰만.",
    relatedPatterns: ["analytics", "timeline", "data-table"],
    group: "task",
    recipes: ["page-header", "kpi-grid", "chart-panel"],
    registryId: "Dashboard",
    composePreview: "Dashboard",
    surface: "admin",
    status: "ready",
  },
  {
    id: "analytics",
    name: "Analytics Pattern",
    description:
      "KPI·필터·차트·테이블·내보내기로 지표를 분석하는 작업 단위입니다.",
    useCase: "리포트·성과 분석 화면",
    uxGoal: "기간·조건에 맞는 지표를 해석하고 내보낸다",
    goals: ["조건을 바꿔 지표를 비교한다", "근거 테이블과 함께 내보낸다"],
    userTasks: ["KPI", "Filters", "Charts", "Table", "Export"],
    includedComponents: ["Card", "Chart", "Select", "DatePicker", "Table", "Button"],
    parts: ["KPI", "Filters", "Charts", "Table", "Export"],
    responsiveRule: "차트·테이블은 세로 스택, 필터는 상단 고정 스크롤.",
    accessibilityRule: "차트 대안 텍스트, 필터 Apply 후 결과 변경 안내.",
    bestPractice: "차트와 동일 조건의 테이블을 항상 제공합니다.",
    relatedPatterns: ["dashboard", "filter", "data-table"],
    group: "task",
    recipes: ["kpi-grid", "chart-panel"],
    registryId: "ChartKpi",
    surface: "admin",
    status: "ready",
  },

  // ─── Feedback ─────────────────────────────────────────────
  {
    id: "dialog",
    name: "Dialog Pattern",
    description:
      "Confirm·Warning·Delete·Success 등 결정을 요구하는 모달 UX 단위입니다. OVERLAY_RULES: 짧은 결정 → Modal; 모바일 선택/필터는 Bottom Sheet.",
    useCase: "삭제·이탈·되돌릴 수 없는 변경 전 확인",
    uxGoal: "위험을 인지한 뒤 의도적으로 결정한다",
    goals: ["결정을 강제한다", "파괴적 액션을 보호한다"],
    userTasks: ["Confirm", "Warning", "Delete", "Success"],
    includedComponents: ["Modal", "Button"],
    parts: ["Confirm", "Warning", "Delete", "Success"],
    responsiveRule:
      "모바일에서는 Bottom Sheet형 다이얼로그를 허용합니다. 데스크톱 Admin은 Modal 우선 (OVERLAY_RULES).",
    accessibilityRule: "포커스 트랩, 초기 포커스, Escape/스크림(파괴적이면 비활성 가능).",
    bestPractice:
      "삭제 버튼은 Danger, 기본 포커스는 안전한 액션에 둡니다. OVERLAY_RULES: 짧은 결정·포커스 차단 → Modal. 삭제는 Confirm Dialog(Modal).",
    relatedPatterns: ["snackbar", "data-table", "crud"],
    group: "feedback",
    recipes: [],
    status: "planned",
    aliases: ["confirm"],
  },
  {
    id: "snackbar",
    name: "Snackbar Pattern",
    description: "Success·Error·Undo를 짧게 알리는 피드백 토스트입니다.",
    useCase: "저장 완료, 네트워크 오류, 실행 취소",
    uxGoal: "흐름을 막지 않고 결과를 전달한다",
    goals: ["결과를 방해 없이 알린다", "가능하면 Undo를 제공한다"],
    userTasks: ["Success", "Error", "Undo"],
    includedComponents: ["Toast", "Button"],
    parts: ["Success", "Error", "Undo"],
    responsiveRule: "하단 안전 영역 위에 배치, 한 번에 하나.",
    accessibilityRule: "role=status 또는 alert, 충분한 표시 시간.",
    bestPractice: "에러만 수동 닫기를 강제하고, 성공은 자동 닫기를 기본으로 합니다.",
    relatedPatterns: ["dialog", "error", "loading"],
    group: "feedback",
    recipes: [],
    status: "planned",
  },
  {
    id: "empty",
    name: "Empty State Pattern",
    description:
      "일러스트·설명·Primary CTA로 빈 상태를 다음 행동으로 이끕니다.",
    useCase: "검색 결과 없음, 첫 데이터 없음, 권한 없음(안내형)",
    uxGoal: "빈 이유를 이해하고 다음 행동을 시작한다",
    goals: ["왜 비었는지 설명한다", "Primary CTA로 회복한다"],
    userTasks: ["원인 이해", "Primary CTA"],
    includedComponents: ["Card", "Button"],
    parts: ["Illustration", "Description", "Primary CTA"],
    responsiveRule: "일러스트는 축소, 텍스트·CTA 우선.",
    accessibilityRule: "의미 있는 제목+설명, 장식 이미지는 aria-hidden.",
    bestPractice: "필터가 원인일 때는 Reset Filter CTA를 제공합니다.",
    relatedPatterns: ["data-table", "search", "error", "loading"],
    group: "feedback",
    recipes: [],
    status: "planned",
  },
  {
    id: "loading",
    name: "Loading Pattern",
    description: "Skeleton·Spinner·Progress Bar로 대기 상태를 표현합니다.",
    useCase: "초기 로드, 필터 적용, 내보내기 진행",
    uxGoal: "대기 중에도 레이아웃을 안정적으로 유지한다",
    goals: ["레이아웃 시프트를 막는다", "진행 정도를 알린다"],
    userTasks: ["대기", "진행 확인"],
    includedComponents: ["Card", "Progress"],
    parts: ["Skeleton", "Spinner", "Progress Bar"],
    responsiveRule: "스켈레톤 열 수는 뷰포트에 맞춥니다.",
    accessibilityRule: "aria-busy, 진행바는 valuemin/valuemax/valuenow.",
    bestPractice: "테이블에는 행 스켈레톤, 짧은 액션에는 버튼 Spinner.",
    relatedPatterns: ["data-table", "empty", "error"],
    group: "feedback",
    recipes: [],
    status: "planned",
  },
  {
    id: "error",
    name: "Error Pattern",
    description: "에러 아이콘·재시도·도움말 링크로 실패에서 회복합니다.",
    useCase: "로드 실패, 권한 오류, 타임아웃",
    uxGoal: "실패 원인을 이해하고 재시도하거나 도움을 받는다",
    goals: ["실패를 명확히 한다", "Retry/Help로 회복 경로를 준다"],
    userTasks: ["원인 확인", "Retry", "Help Link"],
    includedComponents: ["Card", "Button"],
    parts: ["Error Icon", "Retry", "Help Link"],
    responsiveRule: "풀폭 메시지 카드, CTA는 스택.",
    accessibilityRule: "role=alert, 포커스를 제목 또는 Retry로 이동.",
    bestPractice: "기술 코드를 사용자 문구 뒤에 작게 둡니다.",
    relatedPatterns: ["empty", "loading", "snackbar"],
    group: "feedback",
    recipes: [],
    status: "planned",
  },

  // ─── Workflow / domain ────────────────────────────────────
  {
    id: "wizard",
    name: "Wizard Pattern",
    description:
      "Stepper·Progress·Previous/Next로 다단계 절차를 완수합니다. DRAWER_VS_PAGE: Wizard → Page.",
    useCase: "온보딩, 계약 신청, 다단계 설정 (풀 Page)",
    uxGoal: "복잡한 입력을 단계로 나눠 완료율을 높인다",
    goals: ["진행률을 본다", "이전/다음으로 안전하게 이동한다"],
    userTasks: ["Stepper", "Progress", "Previous", "Next"],
    includedComponents: ["Card", "Button", "Input"],
    parts: ["Stepper", "Progress", "Previous", "Next"],
    responsiveRule: "스텝퍼는 가로→세로 요약으로 전환합니다.",
    accessibilityRule: "현재 단계 aria-current, 미완료 단계는 건너뛰기 제한 시 안내.",
    bestPractice:
      "DRAWER_VS_PAGE: Wizard → Page. 단계마다 저장 지점을 두거나 이탈 시 Dialog로 확인.",
    relatedPatterns: ["crud", "dialog", "settings"],
    group: "workflow",
    recipes: [],
    registryId: "Wizard",
    surface: "admin",
    status: "ready",
  },
  {
    id: "calendar",
    name: "Calendar Pattern",
    description: "Month/Week/Day 뷰와 이벤트·드로어로 일정을 관리합니다.",
    useCase: "예약·배포 일정·이벤트 관리",
    uxGoal: "시간축에서 이벤트를 찾고 상세를 연다",
    goals: ["기간 뷰를 전환한다", "이벤트를 열어 상세를 본다"],
    userTasks: ["Month", "Week", "Day", "Event", "Drawer"],
    includedComponents: ["DatePicker", "Badge", "Button", "Drawer"],
    parts: ["Month", "Week", "Day", "Event", "Drawer"],
    responsiveRule: "모바일 기본은 Agenda/Day, 데스크톱은 Month.",
    accessibilityRule: "날짜 그리드 키보드 탐색, 이벤트는 버튼/링크로 열기.",
    bestPractice: "이벤트 클릭은 Detail/Drawer Pattern으로 연결합니다.",
    relatedPatterns: ["detail", "timeline", "dialog"],
    group: "workflow",
    recipes: [],
    status: "planned",
  },
  {
    id: "timeline",
    name: "Timeline Pattern",
    description: "Activity·History·Log를 시간순으로 나열합니다.",
    useCase: "감사 로그, 변경 이력, 최근 활동",
    uxGoal: "무엇이 언제 일어났는지 추적한다",
    goals: ["시간순으로 이력을 읽는다", "관련 상세로 이동한다"],
    userTasks: ["Activity", "History", "Log"],
    includedComponents: ["Avatar", "Badge", "Card"],
    parts: ["Activity", "History", "Log"],
    responsiveRule: "세로 타임라인 유지, 메타는 접기.",
    accessibilityRule: "ol 시간순, 각 항목에 날짜·시간 텍스트.",
    bestPractice: "Dashboard Recent Activity와 동일 데이터 모델을 공유합니다.",
    relatedPatterns: ["dashboard", "detail", "notification"],
    group: "workflow",
    recipes: [],
    status: "planned",
  },
  {
    id: "notification",
    name: "Notification Pattern",
    description: "읽음/안읽음과 행 액션으로 알림을 처리합니다.",
    useCase: "인앱 알림 센터, App Bar 드롭다운",
    uxGoal: "미확인을 처리하고 관련 작업으로 이동한다",
    goals: ["미확인을 구분한다", "알림에서 바로 액션한다"],
    userTasks: ["Read", "Unread", "Action"],
    includedComponents: ["Badge", "Avatar", "Button", "Tabs"],
    parts: ["Read", "Unread", "Action"],
    responsiveRule: "드롭다운→풀페이지 리스트로 확장.",
    accessibilityRule: "미확인 개수 라이브 업데이트, 리스트 키보드 탐색.",
    bestPractice: "액션 후 Snackbar로 결과를 알립니다.",
    relatedPatterns: ["app-bar", "list", "snackbar", "timeline"],
    group: "workflow",
    recipes: [],
    status: "planned",
  },
  {
    id: "permission",
    name: "Permission Pattern",
    description: "Role·Matrix·Inheritance로 권한을 설계·검토합니다.",
    useCase: "역할 관리, 메뉴/기능 권한 매트릭스",
    uxGoal: "누가 무엇을 할 수 있는지 검증하고 조정한다",
    goals: ["역할별 권한을 비교한다", "상속 관계를 이해한다"],
    userTasks: ["Role", "Matrix", "Inheritance"],
    includedComponents: ["Table", "Checkbox", "Switch", "Badge"],
    parts: ["Role", "Matrix", "Inheritance"],
    responsiveRule: "매트릭스는 가로 스크롤, 역할 고정 열.",
    accessibilityRule: "체크박스마다 역할·권한 이름, 변경은 저장 전 요약.",
    bestPractice: "위험 권한 변경은 Dialog로 확인합니다.",
    relatedPatterns: ["data-table", "settings", "dialog"],
    group: "workflow",
    recipes: [],
    status: "planned",
  },
  {
    id: "file-manager",
    name: "File Manager Pattern",
    description: "폴더·업로드·미리보기·드래그 앤 드롭으로 파일을 관리합니다.",
    useCase: "첨부·에셋·문서 저장소",
    uxGoal: "파일을 찾고 올리고 미리본 뒤 정리한다",
    goals: ["폴더를 탐색한다", "업로드·미리보기를 수행한다"],
    userTasks: ["Folder", "Upload", "Preview", "Drag & Drop"],
    includedComponents: ["Upload", "Table", "Breadcrumb", "Button"],
    parts: ["Folder", "Upload", "Preview", "Drag & Drop"],
    responsiveRule: "그리드/리스트 토글, 모바일은 리스트 기본.",
    accessibilityRule: "드롭존 키보드 대안(파일 선택), 업로드 진행 상태.",
    bestPractice: "실패 파일은 Error/Retry, 성공은 Snackbar.",
    relatedPatterns: ["breadcrumb", "empty", "dialog", "snackbar"],
    group: "workflow",
    recipes: [],
    status: "planned",
  },
  {
    id: "settings",
    name: "Settings Pattern",
    description: "Category·Section·Save로 환경설정을 구성합니다.",
    useCase: "계정·테넌트·알림·보안 설정",
    uxGoal: "설정을 찾아 변경하고 저장한다",
    goals: ["카테고리로 설정을 찾는다", "변경을 저장한다"],
    userTasks: ["Category", "Section", "Save"],
    includedComponents: ["Input", "Switch", "Select", "Button", "Tabs"],
    parts: ["Category", "Section", "Save"],
    responsiveRule: "좌측 카테고리→상단 탭/아코디언.",
    accessibilityRule: "미저장 이탈 시 Dialog, 섹션 헤딩 계층.",
    bestPractice: "즉시 저장 vs 명시적 Save를 제품 단위로 통일합니다.",
    relatedPatterns: ["crud", "permission", "dialog"],
    group: "workflow",
    recipes: [],
    status: "planned",
    aliases: ["setting"],
  },

  // ─── JKO-only ─────────────────────────────────────────────
  {
    id: "ai",
    name: "AI Pattern",
    description:
      "AI Prompt·Result·Version Compare·Apply·Rollback으로 Compose 결과를 검토·적용합니다.",
    useCase: "키트 기반 Compose 결과 검토 및 버전 비교",
    uxGoal: "생성(Generate)이 아니라 Compose 결과를 안전하게 적용·롤백한다",
    goals: [
      "프롬프트로 패턴을 조립한다",
      "버전을 비교한 뒤 Apply 또는 Rollback한다",
    ],
    userTasks: ["AI Prompt", "AI Result", "Version Compare", "Apply", "Rollback"],
    includedComponents: ["Input", "Button", "Card", "Tabs"],
    parts: ["AI Prompt", "AI Result", "Version Compare", "Apply", "Rollback"],
    responsiveRule: "프롬프트/결과 스플릿→세로 스택.",
    accessibilityRule: "Apply/Rollback은 확인 Dialog, 결과 영역 aria-live.",
    bestPractice: "키트에 없는 토큰·컴포넌트를 발명하지 않습니다. Compose only.",
    relatedPatterns: ["dialog", "snackbar", "crud"],
    group: "jko",
    recipes: [],
    status: "planned",
  },
];

/** Canonical id → doc */
export const UX_PATTERN_BY_ID: Record<string, UxPatternDoc> =
  Object.fromEntries(UX_PATTERNS.map((p) => [p.id, p]));

/** Legacy / alias id → canonical id */
export const UX_PATTERN_ALIASES: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const p of UX_PATTERNS) {
    map[p.id] = p.id;
    for (const a of p.aliases ?? []) {
      map[a] = p.id;
    }
  }
  // Extra screen-era labels without dedicated pages
  map.kanban = "data-table";
  return map;
})();

export function resolveUxPatternId(idOrAlias: string): string | undefined {
  return UX_PATTERN_ALIASES[idOrAlias];
}

export function getUxPattern(idOrAlias: string): UxPatternDoc | undefined {
  const id = resolveUxPatternId(idOrAlias);
  return id ? UX_PATTERN_BY_ID[id] : undefined;
}

export function patternsByGroup(group: PatternGroupId): UxPatternDoc[] {
  return UX_PATTERNS.filter((p) => p.group === group);
}

/** Screen composition label → pattern href */
export const PATTERN_HREF: Record<string, string> = {
  Search: "/patterns/search",
  "Search Pattern": "/patterns/search",
  Filter: "/patterns/filter",
  "Filter Pattern": "/patterns/filter",
  "Data Table": "/patterns/data-table",
  "Data Table Pattern": "/patterns/data-table",
  "Detail Drawer": "/patterns/detail",
  Detail: "/patterns/detail",
  "Detail Pattern": "/patterns/detail",
  "CRUD Form": "/patterns/crud",
  CRUD: "/patterns/crud",
  "CRUD Pattern": "/patterns/crud",
  "Sticky Footer": "/patterns/crud",
  Dashboard: "/patterns/dashboard",
  "Dashboard Pattern": "/patterns/dashboard",
  Analytics: "/patterns/analytics",
  "Analytics Pattern": "/patterns/analytics",
  Wizard: "/patterns/wizard",
  "Wizard Pattern": "/patterns/wizard",
  Empty: "/patterns/empty",
  "Empty State": "/patterns/empty",
  "Empty State Pattern": "/patterns/empty",
  Loading: "/patterns/loading",
  "Loading Pattern": "/patterns/loading",
  Confirm: "/patterns/dialog",
  Dialog: "/patterns/dialog",
  "Dialog Pattern": "/patterns/dialog",
  List: "/patterns/list",
  "List Pattern": "/patterns/list",
  Timeline: "/patterns/timeline",
  "Timeline Pattern": "/patterns/timeline",
  Snackbar: "/patterns/snackbar",
  "Snackbar Pattern": "/patterns/snackbar",
  Notification: "/patterns/notification",
  "Notification Pattern": "/patterns/notification",
  Settings: "/patterns/settings",
  "Settings Pattern": "/patterns/settings",
  Calendar: "/patterns/calendar",
  "Calendar Pattern": "/patterns/calendar",
  "Empty Pattern": "/patterns/empty",
  // Screen-only composition labels
  "Product Grid": "/patterns/data-table",
  Board: "/patterns/list",
  Accordion: "/patterns/list",
  KPI: "/patterns/analytics",
  "Recent Activity": "/patterns/timeline",
  "Bulk Action": "/patterns/data-table",
};
