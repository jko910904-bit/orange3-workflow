import type { PatternId } from "@/types";
import {
  UX_PATTERNS,
  getUxPattern,
  type DocStatus as UxDocStatus,
  type UxPatternDoc,
} from "@/playground/ux-patterns";

export type { UxPatternDoc };
export {
  UX_PATTERNS,
  UX_PATTERN_BY_ID,
  UX_PATTERN_ALIASES,
  PATTERN_GROUPS,
  PATTERN_DESIGN_STATES,
  PATTERN_HREF,
  getUxPattern,
  resolveUxPatternId,
  patternsByGroup,
} from "@/playground/ux-patterns";

export type PlaygroundNavItem = {
  href: string;
  label: string;
  description: string;
};

export type NavGroup = {
  id: string;
  /** Group heading — omit for a lone section after a divider */
  label?: string;
  items: PlaygroundNavItem[];
};

/** Exact menu IA — Design Kit → Playground → Settings */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: "design-kit",
    label: "Design Kit",
    items: [
      {
        href: "/recipes",
        label: "Recipes",
        description: "업무 화면 Preview · Compose",
      },
      {
        href: "/screens",
        label: "Screens",
        description: "Live compose — Recipe에서 선택",
      },
      {
        href: "/components",
        label: "Components",
        description: "Live Preview · Variants · States",
      },
      {
        href: "/patterns",
        label: "UX Patterns",
        description: "Preview · Flow · Layout",
      },
      {
        href: "/foundations",
        label: "Foundation",
        description: "Color · Type · Radius · Spacing · …",
      },
      {
        href: "/principles",
        label: "Principles",
        description: "JKO UX Rules — 필요할 때",
      },
    ],
  },
  {
    id: "playground",
    items: [
      {
        href: "/playground",
        label: "Playground",
        description: "AI experiment only · Composer (준비 중)",
      },
    ],
  },
  {
    id: "settings",
    items: [
      {
        href: "/settings",
        label: "Settings",
        description: "Design Kit admin · Knowledge (dev)",
      },
    ],
  },
];

/** Flattened nav for secondary pages */
export const PRIMARY_NAV: PlaygroundNavItem[] = NAV_GROUPS.flatMap(
  (g) => g.items,
);

/** @deprecated Use NAV_GROUPS / PRIMARY_NAV */
export const PLAYGROUND_NAV: PlaygroundNavItem[] = PRIMARY_NAV;

export type DocStatus = UxDocStatus;

export function statusLabel(status: DocStatus): string {
  if (status === "planned") return "준비 중";
  return status;
}

export type ComponentDocEntry = {
  slug: string;
  name: string;
  registryName: string;
  summary: string;
  status: DocStatus;
};

/** Kit component list — AI does not create new components */
export const COMPONENT_DOCS: ComponentDocEntry[] = [
  {
    slug: "button",
    name: "Button",
    registryName: "Button",
    summary: "Primary actions with variants, sizes, icons, and loading.",
    status: "ready",
  },
  {
    slug: "input",
    name: "Input",
    registryName: "Input",
    summary: "Text, Email, Password, Search, Number fields.",
    status: "ready",
  },
  {
    slug: "select",
    name: "Select",
    registryName: "Select",
    summary: "단일/다중 선택 드롭다운.",
    status: "partial",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    registryName: "Checkbox",
    summary: "Binary choice for remember-me and agreements.",
    status: "ready",
  },
  {
    slug: "radio",
    name: "Radio",
    registryName: "Radio",
    summary: "단일 선택 그룹.",
    status: "planned",
  },
  {
    slug: "switch",
    name: "Switch",
    registryName: "Switch",
    summary: "온/오프 토글.",
    status: "partial",
  },
  {
    slug: "badge",
    name: "Badge",
    registryName: "Badge",
    summary: "상태·카테고리 라벨.",
    status: "partial",
  },
  {
    slug: "chip",
    name: "Chip",
    registryName: "Chip",
    summary: "필터·태그용 선택 가능한 칩.",
    status: "planned",
  },
  {
    slug: "avatar",
    name: "Avatar",
    registryName: "Avatar",
    summary: "사용자·엔티티 프로필 이미지.",
    status: "planned",
  },
  {
    slug: "card",
    name: "Card",
    registryName: "Card",
    summary:
      "Header / Body / Footer surface. DATA_DENSITY: use Card/List when item count < 20; escalate to Table at ≥ 20.",
    status: "partial",
  },
  {
    slug: "modal",
    name: "Modal",
    registryName: "Modal",
    summary: "확인·안내 대화상자 (Overlay).",
    status: "partial",
  },
  {
    slug: "drawer",
    name: "Drawer",
    registryName: "Drawer",
    summary: "측면 패널로 상세·설정을 표시합니다.",
    status: "partial",
  },
  {
    slug: "toast",
    name: "Toast",
    registryName: "Toast",
    summary: "짧은 피드백 알림 (성공·오류·정보).",
    status: "planned",
  },
  {
    slug: "table",
    name: "Table",
    registryName: "Table",
    summary: "Dense/Comfortable data table with sort and pagination.",
    status: "partial",
  },
  {
    slug: "pagination",
    name: "Pagination",
    registryName: "Pagination",
    summary: "목록 페이지 네비게이션.",
    status: "partial",
  },
  {
    slug: "tabs",
    name: "Tabs",
    registryName: "Tabs",
    summary: "콘텐츠 섹션 전환.",
    status: "partial",
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    registryName: "DatePicker",
    summary: "날짜·기간 선택.",
    status: "partial",
  },
  {
    slug: "upload",
    name: "Upload",
    registryName: "Upload",
    summary: "파일 업로드·드래그 앤 드롭.",
    status: "planned",
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    registryName: "Breadcrumb",
    summary: "계층 경로 네비게이션.",
    status: "planned",
  },
];

/** @deprecated Prefer UxPatternDoc from ux-patterns — kept for developer stats */
export type PatternDocEntry = {
  id: string;
  name: string;
  description: string;
  components: string[];
  recipes: string[];
  registryId?: PatternId;
  surface?: "admin" | "portal";
  status: DocStatus;
};

function toPatternDocEntry(p: UxPatternDoc): PatternDocEntry {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    components: p.includedComponents,
    recipes: p.recipes,
    registryId: p.registryId,
    surface: p.surface,
    status: p.status,
  };
}

/**
 * UX Patterns — Task units (Material/SaaS · JKO).
 * Source of truth: `@/playground/ux-patterns`.
 */
export const PATTERN_DOCS: PatternDocEntry[] =
  UX_PATTERNS.map(toPatternDocEntry);

/** One step in a Screen UX Flow (primary structure for Screens docs) */
export type ScreenFlowStep = {
  /** Stable id for keys / deep links */
  id: string;
  /** Vertical flow label — e.g. 조회, 검색, 상세 */
  label: string;
  /** Patterns composed at this step */
  patterns: string[];
  /** How this step maps to UX Patterns / JKO rules */
  mapping: string;
};

export type ScreenDocEntry = {
  id: string;
  name: string;
  description: string;
  /**
   * Primary UX Flow — ordered vertical steps (Screen structure).
   * Prefer documenting the flow over a flat pattern list.
   */
  uxFlow?: ScreenFlowStep[];
  /** Flat Pattern names (legacy / index cards) — derived from flow when possible */
  patterns: string[];
  status: DocStatus;
  /** Alternate route ids that resolve to this screen */
  aliases?: string[];
};

/** @deprecated Use ScreenDocEntry */
export type TemplateDocEntry = ScreenDocEntry;

/** Screens = Pattern combinations (static documentation) */
export const SCREEN_DOCS: ScreenDocEntry[] = [
  {
    id: "member-management",
    aliases: ["member"],
    name: "회원관리",
    description:
      "Admin 12-grid (1440 · sidebar 240 · content fluid). Search → Filter → Data → Pagination → Drawer. 상세·수정은 Drawer, 생성은 Page (DRAWER_VS_PAGE · admin-stack).",
    uxFlow: [
      {
        id: "list",
        label: "조회",
        patterns: ["Data Table Pattern", "Search Pattern", "Filter Pattern"],
        mapping:
          "Admin stack (Rule #8): Search → Filter → Data → Pagination. Primary = 조회 하나 (Rule #3).",
      },
      {
        id: "search",
        label: "검색",
        patterns: ["Data Table Pattern", "Search Pattern"],
        mapping:
          "Search BP: input left · button right · Enter로 조회. Rule #1 — Search 최상단.",
      },
      {
        id: "filter",
        label: "필터",
        patterns: ["Data Table Pattern", "Filter Pattern"],
        mapping:
          "Filter below Search. Data Table 스택: Search → Filter → Bulk → Table → Pagination (+ Empty · Loading).",
      },
      {
        id: "table",
        label: "테이블",
        patterns: ["Data Table Pattern"],
        mapping:
          "Table (+ Pagination). 「상세」→ Drawer (목록 유지). 풀페이지 이동 금지.",
      },
      {
        id: "drawer",
        label: "Drawer",
        patterns: ["Detail Pattern"],
        mapping:
          "DRAWER_VS_PAGE: 상세·수정·빠른 확인 → Drawer (목록 유지).",
      },
      {
        id: "create",
        label: "생성",
        patterns: ["CRUD Pattern"],
        mapping:
          "DRAWER_VS_PAGE: 생성 → Page. CRUD Pattern: Form · Validation · Submit · Cancel.",
      },
      {
        id: "save",
        label: "저장",
        patterns: ["Detail Pattern", "Dialog Pattern", "CRUD Pattern"],
        mapping:
          "Sticky Footer in Drawer — CRUD Submit=Primary 하나, Cancel=Secondary. 삭제가 있으면 Confirm Dialog.",
      },
    ],
    patterns: [
      "Data Table Pattern",
      "Search Pattern",
      "Filter Pattern",
      "Detail Pattern",
      "CRUD Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "product-management",
    name: "상품관리",
    description:
      "Filter + Data Table + Detail Pattern을 조합한 카탈로그 관리 화면입니다.",
    patterns: ["Filter Pattern", "Data Table Pattern", "Detail Pattern"],
    status: "ready",
  },
  {
    id: "notice",
    name: "공지사항",
    description: "Search + List + Detail Pattern을 조합한 공지 목록·상세입니다.",
    patterns: ["Search Pattern", "List Pattern", "Detail Pattern"],
    status: "ready",
  },
  {
    id: "faq",
    name: "FAQ",
    description: "Search + List Pattern을 조합한 FAQ 화면입니다.",
    patterns: ["Search Pattern", "List Pattern"],
    status: "ready",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description:
      "KPI → Charts → Recent Activity → Quick Action. Title = page chrome(optional). Admin shell(12 / 1440 / sidebar 240 / content fluid).",
    uxFlow: [
      {
        id: "kpi",
        label: "KPI",
        patterns: ["Dashboard Pattern", "Analytics Pattern"],
        mapping: "KPI Card 행 — 핵심 지표 스캔. Kit Card만 사용.",
      },
      {
        id: "charts",
        label: "Charts",
        patterns: ["Dashboard Pattern", "Analytics Pattern"],
        mapping: "요약 차트(막대 등). 텍스트 대안 제공.",
      },
      {
        id: "activity",
        label: "Recent Activity",
        patterns: ["Dashboard Pattern", "Timeline Pattern"],
        mapping: "Recent Activity — 시간순 목록. Timeline Pattern과 동일 모델.",
      },
      {
        id: "quick-action",
        label: "Quick Action",
        patterns: ["Dashboard Pattern"],
        mapping:
          "Quick Action — Primary 하나(있으면). Secondary로 보조 액션.",
      },
    ],
    patterns: [
      "Dashboard Pattern",
      "Analytics Pattern",
      "Timeline Pattern",
    ],
    status: "ready",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    description:
      "Wizard Page surface: 조직 → 프로필 → 초대 → 완료. Single Primary = 다음/완료.",
    patterns: ["Wizard Pattern", "CRUD Pattern", "Empty Pattern"],
    status: "ready",
  },
  {
    id: "team-permissions",
    name: "팀 권한",
    description:
      "Search → Filter → Table → Drawer(역할) → Confirm(제거). Admin stack 재사용.",
    patterns: [
      "Search Pattern",
      "Filter Pattern",
      "Data Table Pattern",
      "Detail Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "settings",
    name: "설정 · 권한",
    description:
      "Settings 섹션 + 보안 Confirm + 역할 ACL 요약. Sticky Footer Primary 하나.",
    patterns: ["CRUD Pattern", "Dialog Pattern", "Settings Pattern"],
    status: "ready",
  },
  {
    id: "timeline",
    name: "활동 타임라인",
    description:
      "Filter → Timeline list → Detail Drawer. Dashboard Activity와 동일 모델.",
    patterns: ["Timeline Pattern", "Filter Pattern", "Detail Pattern"],
    status: "ready",
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Filter → KPI/Charts → Table drill → Export. Dashboard 심층 리포트.",
    patterns: [
      "Analytics Pattern",
      "Filter Pattern",
      "Dashboard Pattern",
      "Data Table Pattern",
    ],
    status: "ready",
  },
  {
    id: "notifications",
    name: "알림함",
    description:
      "Filter → 알림 목록 → Detail Drawer. 읽음 Confirm 불필요 · 삭제 Confirm.",
    patterns: [
      "Notification Pattern",
      "Filter Pattern",
      "Data Table Pattern",
      "Detail Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "billing",
    name: "결제 · 청구",
    description:
      "플랜·결제 정보 Settings + 인보이스 Table. 다운그레이드·해지 = Confirm.",
    patterns: [
      "Settings Pattern",
      "CRUD Pattern",
      "Data Table Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "file-manager",
    name: "파일 관리",
    description:
      "Search → Filter → Table → Drawer. Upload Modal · 삭제 Confirm.",
    patterns: [
      "Search Pattern",
      "Filter Pattern",
      "Data Table Pattern",
      "Detail Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "calendar",
    name: "캘린더",
    description:
      "월간 날짜축 · 담당 Filter · Drawer 상세. 빠른 생성 = Modal.",
    patterns: [
      "Calendar Pattern",
      "Filter Pattern",
      "Detail Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
  {
    id: "kanban",
    name: "칸반",
    description:
      "상태 열 보드 · 버튼 이동(DnD 없음) · Drawer 상세 · 삭제 Confirm.",
    patterns: [
      "Data Table Pattern",
      "Filter Pattern",
      "Detail Pattern",
      "Dialog Pattern",
    ],
    status: "ready",
  },
];

/** @deprecated Use SCREEN_DOCS */
export const TEMPLATE_DOCS = SCREEN_DOCS;

export function getScreenDoc(idOrAlias: string): ScreenDocEntry | undefined {
  return SCREEN_DOCS.find(
    (s) => s.id === idOrAlias || s.aliases?.includes(idOrAlias),
  );
}

/** Foundation section order for the kit docs */
export const FOUNDATION_SECTIONS = [
  {
    id: "color",
    title: "Color",
    kind: "tokens" as const,
    tokenCategory: "color" as const,
    blurb: "시맨틱·팔레트 색상. AI는 새 색을 발명하지 않습니다.",
  },
  {
    id: "typography",
    title: "Typography",
    kind: "tokens" as const,
    tokenCategory: "typography" as const,
    blurb: "타입 스케일·웨이트. AI는 새 폰트 스택을 발명하지 않습니다.",
  },
  {
    id: "radius",
    title: "Radius",
    kind: "tokens" as const,
    tokenCategory: "radius" as const,
    blurb: "모서리 반경 토큰. AI는 새 radius 값을 발명하지 않습니다.",
  },
  {
    id: "spacing",
    title: "Spacing",
    kind: "tokens" as const,
    tokenCategory: "spacing" as const,
    blurb: "간격 스케일. Dense(Admin) / Comfortable(Portal)과 함께 씁니다.",
  },
  {
    id: "shadow",
    title: "Shadow",
    kind: "tokens" as const,
    tokenCategory: "shadow" as const,
    blurb: "고도·그림자. elevation 토큰과 함께 표면 계층을 표현합니다.",
  },
  {
    id: "grid",
    title: "Grid",
    kind: "stub" as const,
    blurb:
      "Admin layout: Desktop 1440 · 12 columns · Sidebar 240 · Content fluid. Portal grids may differ. AI does not invent grid rules.",
  },
  {
    id: "icon-style",
    title: "Icon Style",
    kind: "stub" as const,
    blurb:
      "아이콘 스트로크·사이즈·정렬 규칙 (문서 스텁). AI는 새 아이콘 스타일을 발명하지 않습니다.",
  },
  {
    id: "motion",
    title: "Motion",
    kind: "tokens" as const,
    tokenCategory: "motion" as const,
    blurb: "duration·easing. 컴포넌트 전환은 이 토큰만 참조합니다.",
  },
] as const;

/** Resolve pattern by id or legacy alias */
export { getUxPattern as findPatternDoc };
