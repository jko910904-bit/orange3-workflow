/**
 * Screen Recipe catalog (Phase 2) — business-task entry for ops users.
 * Sourced from knowledge/ux-patterns/recipes/*.md + README (18 recipes).
 * Kit UI-block recipes remain in `@/catalog` / `/registry`.
 */

import { COMPONENT_DOCS } from "@/playground/catalog";
import { BUTTON_RULES, OVERLAY_RULES } from "@/playground/decision-rules";
import { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
import { getUxPattern, resolveUxPatternId } from "@/playground/ux-patterns";
import { JKO_UX_RULES } from "@/playground/ux-principles";

export type RecipeBrowseCategory = "admin" | "saas" | "ai" | "workflow";

export type RecipePatternRef = {
  id: string;
  name: string;
  href?: string;
};

export type RecipeComponentRef = {
  slug?: string;
  name: string;
  href?: string;
};

export type RecipeDecisionRuleRef = {
  id: string;
  title: string;
  summary?: string;
  href?: string;
};

export type RecipeCatalogEntry = {
  id: string;
  title: string;
  category: RecipeBrowseCategory;
  eyebrow?: string;
  goal: string;
  userTasks: string[];
  patterns: RecipePatternRef[];
  components: RecipeComponentRef[];
  decisionRules: RecipeDecisionRuleRef[];
  why: string;
  patternChain: string;
  knowledgePath?: string;
  liveHref?: string;
};

/** Knowledge / MD aliases → canonical UX_PATTERNS id */
const PATTERN_ALIAS_MAP: Record<string, string> = {
  "detail-drawer": "detail",
  "confirm-dialog": "dialog",
  confirm: "dialog",
  "crud-form": "crud",
  "empty-state": "empty",
  "ai-chat": "ai",
  "file-upload": "file-manager",
  kanban: "data-table",
  list: "list",
};

function patternRef(idOrAlias: string): RecipePatternRef {
  const mapped = PATTERN_ALIAS_MAP[idOrAlias] ?? idOrAlias;
  const canonical = resolveUxPatternId(mapped) ?? resolveUxPatternId(idOrAlias);
  const doc = canonical ? getUxPattern(canonical) : getUxPattern(idOrAlias);
  if (doc) {
    return {
      id: doc.id,
      name: doc.name.replace(/\s+Pattern$/, ""),
      href: `/patterns/${doc.id}`,
    };
  }
  // Documented in knowledge but no dedicated pattern page yet
  const label = idOrAlias
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { id: idOrAlias, name: label };
}

function patterns(...ids: string[]): RecipePatternRef[] {
  const seen = new Set<string>();
  const out: RecipePatternRef[] = [];
  for (const id of ids) {
    const ref = patternRef(id);
    if (seen.has(ref.id)) continue;
    seen.add(ref.id);
    out.push(ref);
  }
  return out;
}

function componentsFromNames(...names: string[]): RecipeComponentRef[] {
  const byName = new Map(
    COMPONENT_DOCS.map((c) => [c.name.toLowerCase(), c]),
  );
  const bySlug = new Map(COMPONENT_DOCS.map((c) => [c.slug, c]));
  const seen = new Set<string>();
  const out: RecipeComponentRef[] = [];
  for (const name of names) {
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const doc =
      byName.get(key) ??
      bySlug.get(key) ??
      byName.get(key.replace(/\s+/g, ""));
    if (doc) {
      out.push({
        slug: doc.slug,
        name: doc.name,
        href: `/components/${doc.slug}`,
      });
    } else {
      out.push({ name });
    }
  }
  return out;
}

function rule(
  id: string,
  title: string,
  summary?: string,
  href = "/principles",
): RecipeDecisionRuleRef {
  return { id, title, summary, href };
}

function uxRule(key: string): RecipeDecisionRuleRef {
  const r = JKO_UX_RULES.find((x) => x.key === key);
  if (!r) {
    return rule(`ux-${key}`, key, undefined, "/principles");
  }
  return rule(
    `ux-${r.key}`,
    `UX Rule #${r.id}: ${r.key}`,
    r.statement,
    "/principles",
  );
}

const RULE_SEARCH = () => uxRule("search-top");
const RULE_FILTER = () => uxRule("filter-below-search");
const RULE_PRIMARY = () => uxRule("single-primary");
const RULE_DRAWER = () => uxRule("detail-drawer");
const RULE_DELETE = () => uxRule("delete-confirm");
const RULE_SKELETON = () => uxRule("skeleton-loading");
const RULE_EMPTY = () => uxRule("empty-cta");
const RULE_ADMIN = () => uxRule("admin-stack");

const RULE_DRAWER_VS_PAGE = (): RecipeDecisionRuleRef =>
  rule(
    DRAWER_VS_PAGE.id,
    DRAWER_VS_PAGE.title,
    DRAWER_VS_PAGE.summary,
    "/principles#drawer-vs-page",
  );

const RULE_OVERLAY = (): RecipeDecisionRuleRef =>
  rule(
    OVERLAY_RULES.id,
    OVERLAY_RULES.title,
    OVERLAY_RULES.summary,
    "/principles#overlay-rules",
  );

const RULE_BUTTON = (): RecipeDecisionRuleRef =>
  rule(
    BUTTON_RULES.id,
    BUTTON_RULES.title,
    BUTTON_RULES.summary,
    "/principles#button-rules",
  );

const RULE_TREE = (): RecipeDecisionRuleRef =>
  rule(
    "decision-tree",
    "UX Decision Tree",
    "수정+목록 유지 = Drawer · 빠른 작업 = Modal · 삭제 = Confirm · 긴 생성 = Page",
    "/principles/decision-tree",
  );

export const RECIPE_CATEGORY_LABELS: Record<RecipeBrowseCategory, string> = {
  admin: "관리",
  saas: "SaaS",
  ai: "AI",
  workflow: "Workflow",
};

export const RECIPE_CATEGORY_EYEBROW: Record<RecipeBrowseCategory, string> = {
  admin: "Admin",
  saas: "SaaS",
  ai: "AI",
  workflow: "Workflow",
};

/**
 * 18 screen recipes — business titles first.
 * Count: Admin 8 · SaaS 4 · Workflow 3 · AI 3
 */
export const RECIPE_CATALOG: readonly RecipeCatalogEntry[] = [
  // ─── Admin (8) ───────────────────────────────────────────
  {
    id: "member-management",
    title: "회원관리",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "회원(사용자) 데이터를 조회 · 상세 확인 · 수정 · 생성 · 삭제한다. 목록 컨텍스트를 유지한 채 운영한다.",
    userTasks: [
      "조회 (검색·필터·페이지)",
      "상세 / 빠른 확인",
      "수정 (목록 유지)",
      "생성 (목록 이탈 허용)",
      "삭제 (단건·Bulk)",
      "상태 확인 (Empty / Loading / Error)",
    ],
    patterns: patterns(
      "search",
      "filter",
      "data-table",
      "detail-drawer",
      "confirm-dialog",
      "crud-form",
      "empty-state",
      "loading",
      "error",
      "notification",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Pagination",
      "Drawer",
      "Modal",
      "Badge",
      "Toast",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_ADMIN(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_DRAWER_VS_PAGE(),
      RULE_TREE(),
    ],
    why:
      "Search First → Filter Before Data → Data Table(조회·Bulk) → Detail Drawer(수정+목록 유지) → Confirm(삭제만). Empty CTA·Skeleton·Retry는 Table 표면 위성.",
    patternChain:
      "Search → Filter → Data Table → Detail Drawer → Confirm (+ Loading/Empty)",
    knowledgePath:
      "knowledge/ux-patterns/recipes/admin-member-management.md",
    liveHref: "/screens/member-management",
  },
  {
    id: "notice-board",
    title: "공지관리",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "공지 목록을 검색·분류·스캔하고, 상세를 빠르게 읽거나(Portal) 긴 본문을 Page로 연다. Admin에서는 작성·수정·삭제도 포함한다.",
    userTasks: [
      "조회 / 검색 / 카테고리·상태 Filter",
      "상세 읽기",
      "작성 · 수정 · 게시 상태 변경",
      "삭제",
    ],
    patterns: patterns(
      "search",
      "filter",
      "data-table",
      "list",
      "detail-drawer",
      "crud-form",
      "confirm-dialog",
      "empty-state",
      "loading",
      "notification",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Card",
      "Drawer",
      "Modal",
      "Badge",
      "Pagination",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_DRAWER_VS_PAGE(),
      RULE_TREE(),
    ],
    why:
      "공지도 Search First; 카테고리는 Filter(Search 복제 금지). ≥20건·운영 컬럼 → Data Table; 소량 → List. 목록 유지 수정 = Drawer; 긴 읽기/Portal = Page.",
    patternChain:
      "Search → Filter/Category → Table/List → Detail Drawer/Page",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-notice-board.md",
    liveHref: "/screens/notice",
  },
  {
    id: "faq-board",
    title: "FAQ",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "FAQ를 검색하고 스캔한다. Admin은 항목 CRUD; Portal은 조회·접기 중심.",
    userTasks: [
      "검색 (질문 키워드)",
      "카테고리 Filter",
      "목록 스캔 (Accordion/rows 또는 Table)",
      "상세 확인 · 수정 · 삭제 (Admin)",
    ],
    patterns: patterns(
      "search",
      "filter",
      "data-table",
      "list",
      "detail-drawer",
      "crud-form",
      "confirm-dialog",
      "empty-state",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Card",
      "Drawer",
      "Modal",
      "Badge",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_EMPTY(),
    ],
    why:
      "FAQ도 Search First; 카테고리만으로 대체하지 않음. 소량 = List/Accordion; 대량 = Data Table. 수정+목록 = Drawer; 삭제 = Confirm.",
    patternChain: "Search → Filter → List/Table → Detail Drawer",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-faq-board.md",
    liveHref: "/screens/faq",
  },
  {
    id: "product-catalog",
    title: "상품관리",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "상품(카탈로그)을 필터·조회하고 상세/수정한다. 시각 스캔이 중요하면 Card grid, 운영 밀도면 Table.",
    userTasks: [
      "조회 · 검색 · 속성 Filter (카테고리·재고·상태)",
      "상세 · 수정",
      "생성 · 삭제",
      "(선택) 이미지 첨부 → File Upload",
    ],
    patterns: patterns(
      "search",
      "filter",
      "data-table",
      "detail-drawer",
      "crud-form",
      "confirm-dialog",
      "file-upload",
      "empty-state",
      "loading",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Card",
      "Drawer",
      "Modal",
      "Upload",
      "Badge",
      "Pagination",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_ADMIN(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_DRAWER_VS_PAGE(),
    ],
    why:
      "Search First 유지; Filter 비중이 커도 Search 위에 두지 않음. Card grid는 Data Table 밀도 분기. 목록 유지 수정 = Drawer; 생성 = Page.",
    patternChain: "Search → Filter → Table/Card grid → Detail Drawer",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-product-catalog.md",
    liveHref: "/screens/product-management",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "운영 현황을 한눈에 보고, 필요 시 Analytics 또는 목록 Task로 drill-down한다.",
    userTasks: [
      "현황 확인 (KPI)",
      "추세 스캔 (Charts)",
      "최근 활동 확인",
      "Quick Action 1회 (생성/이동)",
      "(선택) Analytics 심층",
    ],
    patterns: patterns(
      "dashboard",
      "analytics",
      "timeline",
      "data-table",
      "crud-form",
      "empty-state",
      "loading",
      "notification",
      "ai-chat",
    ),
    components: componentsFromNames(
      "Card",
      "Button",
      "Badge",
      "Table",
      "Toast",
    ),
    decisionRules: [
      RULE_PRIMARY(),
      RULE_BUTTON(),
      RULE_SKELETON(),
      RULE_EMPTY(),
      RULE_OVERLAY(),
    ],
    why:
      "Dashboard 필수 스택은 KPI → Charts → Activity → Quick Action. Table은 Dashboard 필수 아님 — 심화·목록은 별도 Recipe. Single Primary: Quick Action 하나만 filled.",
    patternChain:
      "KPI → Charts → Activity → Quick Action → (Analytics)",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-dashboard.md",
    liveHref: "/screens/dashboard",
  },
  {
    id: "analytics-report",
    title: "Analytics",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "기간·세그먼트 조건으로 지표를 해석하고, 필요 시 표로 drill / Export한다.",
    userTasks: [
      "기간·세그먼트 Filter",
      "지표·차트 해석",
      "상세 행 조회",
      "Export",
      "Empty / Loading / Error 처리",
    ],
    patterns: patterns(
      "analytics",
      "filter",
      "dashboard",
      "data-table",
      "detail-drawer",
      "empty-state",
      "loading",
      "error",
      "notification",
      "confirm-dialog",
    ),
    components: componentsFromNames(
      "Select",
      "Date Picker",
      "Button",
      "Card",
      "Table",
      "Drawer",
      "Modal",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_OVERLAY(),
      RULE_SKELETON(),
    ],
    why:
      "Analytics는 Dashboard의 심층이지 대체 현황면이 아님. Filter Before Data를 리포트에도 적용. Export 성공은 Notification; Confirm으로 성공을 붙잡지 않음.",
    patternChain: "Filter → Analytics → Table drill → Export",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-analytics.md",
    liveHref: "/screens/analytics",
  },
  {
    id: "settings-permissions",
    title: "Settings",
    category: "admin",
    eyebrow: "Admin",
    goal: "환경 구성을 저장하고, 역할·ACL을 안전하게 변경한다.",
    userTasks: [
      "설정 조회·수정 (Settings)",
      "역할·권한 할당 (Permission)",
      "위험 변경 확인",
      "성공/실패 피드백",
    ],
    patterns: patterns(
      "settings",
      "permission",
      "confirm-dialog",
      "notification",
      "crud-form",
      "data-table",
      "empty-state",
      "error",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Switch",
      "Button",
      "Table",
      "Modal",
      "Tabs",
      "Toast",
    ),
    decisionRules: [
      RULE_PRIMARY(),
      RULE_DELETE(),
      RULE_EMPTY(),
      RULE_OVERLAY(),
      RULE_BUTTON(),
    ],
    why:
      "Settings = 환경; Permission = 접근 통제 — 한 Recipe로 연결하되 Task는 분리. 위험 변경만 Confirm; 일반 저장은 Sticky Footer Primary 하나.",
    patternChain: "Settings → Permission → Confirm",
    knowledgePath:
      "knowledge/ux-patterns/recipes/admin-settings-permissions.md",
    liveHref: "/screens/settings",
  },
  {
    id: "file-manager",
    title: "File manager",
    category: "admin",
    eyebrow: "Admin",
    goal:
      "파일을 탐색·업로드·삭제한다. Upload는 전송 Task, Manager는 운영 Task로 compose.",
    userTasks: [
      "폴더/목록 탐색",
      "검색·타입 Filter",
      "업로드",
      "메타 상세",
      "삭제 (단건·Bulk)",
    ],
    patterns: patterns(
      "file-manager",
      "file-upload",
      "search",
      "filter",
      "detail-drawer",
      "confirm-dialog",
      "empty-state",
      "loading",
      "error",
      "notification",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Upload",
      "Drawer",
      "Modal",
      "Card",
      "Toast",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_EMPTY(),
      RULE_SKELETON(),
    ],
    why:
      "Upload → Manager 완료 흐름. 삭제는 Confirm; 업로드 실패는 Error/Notification. Search First 유지(경로 브라우징만으로 검색을 없애지 말 것).",
    patternChain: "File Manager + File Upload → Confirm",
    knowledgePath: "knowledge/ux-patterns/recipes/admin-file-manager.md",
    liveHref: "/screens/file-manager",
  },

  // ─── SaaS (4) ────────────────────────────────────────────
  {
    id: "onboarding-wizard",
    title: "Onboarding",
    category: "saas",
    eyebrow: "SaaS",
    goal:
      "신규 워크스페이스/계정의 필수 설정을 단계적으로 완료하고 첫 성공 상태(Empty CTA 해소)로 인도한다.",
    userTasks: [
      "다단계 입력 (조직 · 프로필 · 초대 …)",
      "검증 · 제출",
      "건너뛰기(허용 시 Secondary)",
      "완료 후 홈/Dashboard",
    ],
    patterns: patterns(
      "wizard",
      "crud-form",
      "empty-state",
      "confirm-dialog",
      "notification",
      "file-upload",
      "error",
      "dashboard",
      "settings",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Checkbox",
      "Upload",
      "Modal",
      "Toast",
    ),
    decisionRules: [
      RULE_PRIMARY(),
      RULE_BUTTON(),
      RULE_EMPTY(),
      RULE_DRAWER_VS_PAGE(),
      RULE_OVERLAY(),
    ],
    why:
      "Wizard = Page CRUD surface — Drawer에 강제하지 않음. Primary = 다음/완료 하나; 스텝당 Single Primary. 온보딩 종료 후 운영 목록은 해당 Admin/SaaS Recipe로 handoff.",
    patternChain: "CRUD Form (steps) → Empty CTA → Notification",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-onboarding-wizard.md",
    liveHref: "/screens/onboarding",
  },
  {
    id: "billing-settings",
    title: "Billing",
    category: "saas",
    eyebrow: "SaaS",
    goal:
      "플랜·결제·청구 정보를 조회·변경하고, 해지·다운그레이드 등 위험 액션을 안전하게 처리한다.",
    userTasks: [
      "현재 플랜·사용량 확인",
      "결제 수단·세금 정보 수정",
      "플랜 변경 · 해지",
      "인보이스 목록 조회 (선택 Table)",
    ],
    patterns: patterns(
      "settings",
      "confirm-dialog",
      "notification",
      "crud-form",
      "data-table",
      "detail-drawer",
      "analytics",
      "search",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Card",
      "Drawer",
      "Modal",
      "Toast",
    ),
    decisionRules: [
      RULE_DELETE(),
      RULE_PRIMARY(),
      RULE_DRAWER(),
      RULE_OVERLAY(),
      RULE_BUTTON(),
    ],
    why:
      "Billing은 Settings Task; 위험 변경만 Confirm. 사용량 위젯은 Dashboard/Analytics 읽기 compose. 인보이스 목록은 Admin stack 축소판.",
    patternChain: "Settings → Confirm → Notification",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-billing-settings.md",
    liveHref: "/screens/billing",
  },
  {
    id: "notifications-center",
    title: "Notifications",
    category: "saas",
    eyebrow: "SaaS",
    goal:
      "알림을 스캔·필터·읽음 처리하고, 필요 시 원본 Task로 이동한다. Toast/Snackbar와 역할 분리.",
    userTasks: [
      "알림 목록 조회",
      "유형·읽음 Filter",
      "상세 / deep-link",
      "모두 읽음 · 삭제",
      "(설정) 알림 채널 on/off → Settings",
    ],
    patterns: patterns(
      "notification",
      "filter",
      "data-table",
      "list",
      "detail-drawer",
      "confirm-dialog",
      "settings",
      "empty-state",
    ),
    components: componentsFromNames(
      "Select",
      "Button",
      "Badge",
      "Table",
      "Drawer",
      "Modal",
      "Switch",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_EMPTY(),
      RULE_OVERLAY(),
    ],
    why:
      "Inbox = 조회 Task; toast Notification Pattern = 비차단 피드백. Filter before list; Search는 대량일 때만 상단 추가. 삭제는 Confirm; 읽음 처리는 Confirm 불필요.",
    patternChain: "Notification + Filter → Detail Drawer",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-notifications.md",
    liveHref: "/screens/notifications",
  },
  {
    id: "team-permissions",
    title: "Team permissions",
    category: "saas",
    eyebrow: "SaaS",
    goal:
      "팀 멤버 초대·역할 부여·제거를 운영한다. Admin 회원관리와 겹치면 회원 Recipe를 재사용하고, 여기는 팀 스코프 ACL에 집중한다.",
    userTasks: [
      "멤버 목록 조회",
      "초대 (생성)",
      "역할 변경",
      "멤버 제거",
      "권한 매트릭스 확인",
    ],
    patterns: patterns(
      "permission",
      "search",
      "filter",
      "data-table",
      "detail-drawer",
      "confirm-dialog",
      "crud-form",
      "notification",
      "settings",
    ),
    components: componentsFromNames(
      "Input",
      "Select",
      "Button",
      "Table",
      "Drawer",
      "Modal",
      "Badge",
      "Avatar",
      "Toast",
    ),
    decisionRules: [
      RULE_SEARCH(),
      RULE_FILTER(),
      RULE_ADMIN(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_OVERLAY(),
    ],
    why:
      "팀 멤버 = Admin stack 재사용. Permission은 역할 변경의 도메인 Pattern; Settings 전역과 구분. 제거 = Confirm.",
    patternChain: "Permission → Confirm → Notification",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-team-permissions.md",
    liveHref: "/screens/team-permissions",
  },

  // ─── Workflow (3) — visible screen type for ops ─────────
  {
    id: "calendar-schedule",
    title: "Calendar",
    category: "workflow",
    eyebrow: "Workflow",
    goal: "날짜축으로 일정·예약을 조회·생성·수정·취소한다.",
    userTasks: [
      "월/주/일 스캔",
      "범위·담당 Filter",
      "일정 상세 · 수정",
      "생성 · 취소/삭제",
    ],
    patterns: patterns(
      "calendar",
      "filter",
      "detail-drawer",
      "crud-form",
      "confirm-dialog",
      "empty-state",
      "loading",
      "notification",
      "search",
    ),
    components: componentsFromNames(
      "Date Picker",
      "Select",
      "Button",
      "Drawer",
      "Modal",
      "Input",
      "Badge",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_DRAWER_VS_PAGE(),
      RULE_OVERLAY(),
      RULE_EMPTY(),
    ],
    why:
      "Calendar = 날짜축 Task; Timeline/Kanban과 대체하지 않음. 빠른 생성 = Modal; 복잡 = Page; 목록 유지 상세 = Drawer.",
    patternChain: "Calendar → Detail Drawer/Modal → Confirm",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-calendar-schedule.md",
    liveHref: "/screens/calendar",
  },
  {
    id: "kanban-board",
    title: "Kanban",
    category: "workflow",
    eyebrow: "Workflow",
    goal: "상태 열 워크플로로 카드를 이동·상세·삭제한다.",
    userTasks: [
      "보드/담당 Filter",
      "카드 스캔 · DnD 상태 변경",
      "상세 · 수정",
      "카드/열 삭제",
      "(선택) Activity Timeline 섹션",
    ],
    patterns: patterns(
      "kanban",
      "filter",
      "detail-drawer",
      "confirm-dialog",
      "crud-form",
      "timeline",
      "notification",
      "permission",
      "empty-state",
    ),
    components: componentsFromNames(
      "Select",
      "Button",
      "Card",
      "Badge",
      "Drawer",
      "Modal",
      "Avatar",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_EMPTY(),
      RULE_OVERLAY(),
    ],
    why:
      "Kanban = 상태 열 Task — Calendar/Timeline과 역할 분리. DnD 이동은 Confirm 불필요(가역); 삭제는 Confirm. 상세+보드 유지 = Drawer.",
    patternChain: "Kanban → Detail Drawer → Confirm",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-kanban-board.md",
    liveHref: "/screens/kanban",
  },
  {
    id: "timeline-activity",
    title: "Timeline",
    category: "workflow",
    eyebrow: "Workflow",
    goal:
      "시간순 이력·활동을 스캔하고 이벤트 원본으로 이동한다. Dashboard Activity와 모델을 공유한다.",
    userTasks: [
      "활동 피드 조회",
      "유형·기간 Filter",
      "이벤트 상세",
      "(Audit) 불변 이력 확인 — 삭제 없음 또는 관리자 purge + Confirm",
    ],
    patterns: patterns(
      "timeline",
      "filter",
      "dashboard",
      "detail-drawer",
      "empty-state",
      "loading",
      "confirm-dialog",
      "notification",
    ),
    components: componentsFromNames(
      "Select",
      "Date Picker",
      "Button",
      "Badge",
      "Drawer",
      "Card",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_SKELETON(),
      RULE_EMPTY(),
    ],
    why:
      "Timeline = 이력축; Calendar(일정)·Kanban(상태)과 혼용 금지. Dashboard Recent Activity는 이 Recipe의 임베드. AI prompt history는 별도 Recipe.",
    patternChain: "Timeline → Detail Drawer · Dashboard Activity",
    knowledgePath: "knowledge/ux-patterns/recipes/saas-timeline-activity.md",
    liveHref: "/screens/timeline",
  },

  // ─── AI (3) ──────────────────────────────────────────────
  {
    id: "ai-chat-workspace",
    title: "AI Chat",
    category: "ai",
    eyebrow: "AI",
    goal:
      "JKO Compose 보조 — Pattern/Recipe를 고르고 미리본 뒤 Apply한다. Generate로 Kit를 우회하지 않는다.",
    userTasks: [
      "Intent 입력 · 대화",
      "Pattern 제안 검토",
      "Preview · Apply · Rollback",
      "Clear conversation",
      "(선택) History 패널",
    ],
    patterns: patterns(
      "ai-chat",
      "confirm-dialog",
      "notification",
      "timeline",
      "empty-state",
      "loading",
      "error",
      "settings",
      "permission",
      "data-table",
      "dashboard",
      "crud-form",
    ),
    components: componentsFromNames(
      "Input",
      "Button",
      "Card",
      "Tabs",
      "Modal",
      "Toast",
      "Drawer",
    ),
    decisionRules: [
      RULE_PRIMARY(),
      RULE_DELETE(),
      RULE_EMPTY(),
      RULE_OVERLAY(),
      RULE_TREE(),
    ],
    why:
      "Knowledge > Features; Output Rules 골격 유지. Apply 덮어쓰기·clear = Confirm; 성공 = Notification. Admin Search를 채팅으로 대체하지 않음.",
    patternChain:
      "AI Chat → Confirm (clear/Apply) · optional Timeline",
    knowledgePath: "knowledge/ux-patterns/recipes/ai-chat-workspace.md",
  },
  {
    id: "prompt-history",
    title: "Prompt history",
    category: "ai",
    eyebrow: "AI",
    goal:
      "프롬프트·응답·Apply 버전을 시간순으로 비교·복원한다. 새 히스토리 Foundation을 만들지 않고 Timeline + AI Chat을 compose한다.",
    userTasks: [
      "세션/버전 목록 스캔",
      "버전 상세 · diff 미리보기",
      "복원 (Rollback)",
      "삭제 · clear",
    ],
    patterns: patterns(
      "timeline",
      "ai-chat",
      "filter",
      "detail-drawer",
      "confirm-dialog",
      "notification",
      "empty-state",
      "loading",
    ),
    components: componentsFromNames(
      "Select",
      "Button",
      "Card",
      "Drawer",
      "Modal",
      "Tabs",
      "Toast",
    ),
    decisionRules: [
      RULE_FILTER(),
      RULE_DRAWER(),
      RULE_DELETE(),
      RULE_SKELETON(),
      RULE_OVERLAY(),
    ],
    why:
      "History = Timeline Task; Chat = compose surface. Restore/delete = Confirm(비가역·덮어쓰기). Version compare는 kit split pane — 별도 Pattern 발명 아님.",
    patternChain: "Timeline + AI Chat → Confirm",
    knowledgePath: "knowledge/ux-patterns/recipes/ai-prompt-history.md",
  },
  {
    id: "compose-review",
    title: "Compose review",
    category: "ai",
    eyebrow: "AI",
    goal:
      "AI가 제안한 Pattern chain / Screen Recipe를 검토하고 Kit compose 결과에 Apply한다.",
    userTasks: [
      "Goal · Task · Pattern 제안 확인 (Output Rules)",
      "Preview 검토",
      "Apply · Rollback",
      "거절 (Anti-Pattern / 새 토큰 제안 시)",
    ],
    patterns: patterns(
      "ai-chat",
      "confirm-dialog",
      "notification",
      "permission",
      "data-table",
      "dashboard",
      "crud-form",
      "empty-state",
      "error",
    ),
    components: componentsFromNames(
      "Button",
      "Card",
      "Tabs",
      "Modal",
      "Badge",
      "Toast",
    ),
    decisionRules: [
      RULE_PRIMARY(),
      RULE_DELETE(),
      RULE_TREE(),
      RULE_OVERLAY(),
      RULE_BUTTON(),
    ],
    why:
      "Compose ≠ Generate; 사람이 Pattern을 확정한 뒤 Apply. Confirm은 덮어쓰기 순간에만; 매 메시지마다 Confirm 금지. Rollback은 Notification+액션.",
    patternChain: "AI Chat → preview → Confirm → Notification",
    knowledgePath: "knowledge/ux-patterns/recipes/ai-compose-review.md",
  },
] as const;

export const RECIPE_BY_ID: Record<string, RecipeCatalogEntry> =
  Object.fromEntries(RECIPE_CATALOG.map((r) => [r.id, r]));

export function getScreenRecipe(id: string): RecipeCatalogEntry | undefined {
  return RECIPE_BY_ID[id];
}

export function listScreenRecipes(): readonly RecipeCatalogEntry[] {
  return RECIPE_CATALOG;
}

export function countRecipesByCategory(
  recipes: readonly RecipeCatalogEntry[] = RECIPE_CATALOG,
): Record<RecipeBrowseCategory | "all", number> {
  const counts: Record<RecipeBrowseCategory | "all", number> = {
    all: recipes.length,
    admin: 0,
    saas: 0,
    ai: 0,
    workflow: 0,
  };
  for (const r of recipes) {
    counts[r.category] += 1;
  }
  return counts;
}

export type RecipeCategoryFilter = RecipeBrowseCategory | "all";

export function searchScreenRecipes(
  query: string,
  categoryFilter: RecipeCategoryFilter = "all",
  recipes: readonly RecipeCatalogEntry[] = RECIPE_CATALOG,
): RecipeCatalogEntry[] {
  const q = query.trim().toLowerCase();
  return recipes.filter((r) => {
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    if (!q) return true;
    const blob = [
      r.id,
      r.title,
      r.goal,
      r.patternChain,
      r.why,
      r.eyebrow,
      r.category,
      ...r.userTasks,
      ...r.patterns.map((p) => `${p.id} ${p.name}`),
      ...r.components.map((c) => c.name),
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}

/** Split patternChain into ordered step labels for UI. */
export function patternChainSteps(chain: string): string[] {
  return chain
    .split(/→|->/)
    .map((s) => s.replace(/\([^)]*\)/g, "").trim())
    .filter(Boolean);
}
