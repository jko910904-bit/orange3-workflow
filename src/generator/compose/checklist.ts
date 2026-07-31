/**
 * Archetype section checklists — enforced in compose (not prose UI).
 * Required kinds are autofilled as stubs when missing; order is canonical.
 */

import type { DesignContract } from "@/generator/designContract";
import { totalPagesFor } from "@/generator/designContract";
import type {
  ComposedSection,
  ComposedSectionKind,
  LayoutArchetype,
  LayoutMaterials,
} from "./types";

export type ChecklistItem = {
  kind: ComposedSectionKind;
  required: boolean;
  /** Only this kind may carry the screen's primary CTA */
  primaryCta?: boolean;
  rules?: string[];
};

export const ARCHETYPE_CHECKLIST: Record<LayoutArchetype, ChecklistItem[]> = {
  "list-inquiry": [
    { kind: "shell-admin", required: true },
    {
      kind: "page-header",
      required: true,
      rules: ["no second primary button in header"],
    },
    {
      kind: "filter-bar",
      required: true,
      primaryCta: true,
      rules: [
        "only place for primary CTA (조회)",
        "filters use columnHints.filterCols",
        "search-first filter bar",
      ],
    },
    {
      kind: "action-toolbar",
      required: true,
      rules: ["생성/수정/삭제 + sort control"],
    },
    { kind: "result-meta", required: true, rules: ["총 N건"] },
    {
      kind: "bulk-bar",
      required: false,
      rules: ["선택 n건 / 삭제 stubs when multi-select"],
    },
    {
      kind: "loading-state",
      required: false,
      rules: ["skeleton preferred for list"],
    },
    {
      kind: "data-table",
      required: true,
      rules: [
        "table flush",
        "sticky thead",
        "multi-select + badges + row actions",
      ],
    },
    {
      kind: "empty-state",
      required: false,
      rules: ["visible when rows empty"],
    },
    { kind: "pagination", required: true },
  ],
  "product-catalog": [
    { kind: "shell-portal", required: true },
    { kind: "page-header", required: true },
    {
      kind: "filter-bar",
      required: true,
      primaryCta: true,
      rules: ["search + filter"],
    },
    {
      kind: "action-toolbar",
      required: true,
      rules: ["grid/list toggle + sort"],
    },
    { kind: "result-meta", required: true },
    {
      kind: "loading-state",
      required: false,
      rules: ["skeleton preferred"],
    },
    {
      kind: "product-grid",
      required: true,
      rules: ["large cards; responsive cardCols; wishlist stub"],
    },
    {
      kind: "empty-state",
      required: false,
      rules: ["visible when products empty"],
    },
    { kind: "pagination", required: true },
  ],
  "dashboard-hub": [
    { kind: "shell-portal", required: true },
    { kind: "page-header", required: true, rules: ["optional short"] },
    {
      kind: "profile-card",
      required: true,
      rules: ["personalized profile summary"],
    },
    {
      kind: "kpi-grid",
      required: true,
      rules: ["metrics / KPI cards; cardCols from contract"],
    },
    {
      kind: "card-grid",
      required: true,
      primaryCta: true,
      rules: [
        "action-cards; secondary/outline except one clear next-step",
        "no dense admin table as main",
      ],
    },
  ],
  auth: [
    { kind: "shell-portal", required: true, rules: ["or minimal"] },
    {
      kind: "login-form",
      required: true,
      primaryCta: true,
      rules: [
        "id/email, password, remember me",
        "password reset link",
        "one primary 로그인",
        "optional passkey/OTP text actions",
        "single column; error near fields; no competing primary CTAs",
      ],
    },
    {
      kind: "social-login",
      required: true,
      rules: ["Google/Kakao/Naver outline stubs"],
    },
  ],
  "content-list": [
    { kind: "shell-portal", required: true },
    { kind: "page-header", required: true },
    {
      kind: "search-bar",
      required: true,
      primaryCta: true,
    },
    {
      kind: "category-tabs",
      required: true,
      rules: ["category chips"],
    },
    { kind: "result-meta", required: true },
    {
      kind: "loading-state",
      required: false,
      rules: ["skeleton preferred"],
    },
    {
      kind: "notice-list",
      required: true,
      rules: ["sticky/중요 highlight; tags; author; date"],
    },
    {
      kind: "empty-state",
      required: false,
      rules: ["visible when notices empty"],
    },
    { kind: "pagination", required: true },
  ],
  "content-detail": [
    { kind: "shell-portal", required: true },
    { kind: "page-header", required: true },
    {
      kind: "article",
      required: true,
      rules: ["title, meta, body, attachment, reading width"],
    },
    { kind: "prev-next", required: true, rules: ["prev-next nav"] },
    {
      kind: "list-action",
      required: true,
      rules: ["목록 as secondary/outline centered; share stub"],
    },
  ],
  "faq-accordion": [
    { kind: "shell-portal", required: true },
    { kind: "page-header", required: true },
    {
      kind: "search-bar",
      required: true,
      primaryCta: true,
    },
    {
      kind: "category-tabs",
      required: false,
      rules: ["optional but preferred"],
    },
    {
      kind: "popular-faq",
      required: true,
      rules: ["popular questions section"],
    },
    { kind: "result-meta", required: true },
    { kind: "faq-list", required: true, rules: ["accordion"] },
    { kind: "pagination", required: true },
  ],
  unsupported: [],
};

/** Compact kinds list for 소스 보기 metadata */
export function checklistSummary(archetype: LayoutArchetype): string[] {
  return ARCHETYPE_CHECKLIST[archetype].map((item) =>
    item.required ? item.kind : `${item.kind}?`,
  );
}

export function primaryCtaKind(
  archetype: LayoutArchetype,
): ComposedSectionKind | null {
  return (
    ARCHETYPE_CHECKLIST[archetype].find((item) => item.primaryCta)?.kind ?? null
  );
}

function stubId(kind: ComposedSectionKind): string {
  switch (kind) {
    case "shell-admin":
    case "shell-portal":
      return "shell";
    case "page-header":
      return "header";
    case "filter-bar":
      return "filters";
    case "action-toolbar":
      return "toolbar";
    case "bulk-bar":
      return "bulk";
    case "result-meta":
      return "meta";
    case "data-table":
      return "table";
    case "product-grid":
      return "products";
    case "pagination":
      return "pager";
    case "kpi-grid":
      return "kpis";
    case "card-grid":
      return "cards";
    case "profile-card":
      return "profile";
    case "login-form":
      return "login";
    case "social-login":
      return "social";
    case "search-bar":
      return "search";
    case "notice-list":
      return "notices";
    case "article":
      return "article";
    case "prev-next":
      return "prev-next";
    case "list-action":
      return "list-action";
    case "category-tabs":
      return "categories";
    case "faq-list":
      return "faq";
    case "popular-faq":
      return "popular-faq";
    case "empty-state":
      return "empty";
    case "loading-state":
      return "loading";
    default:
      return kind;
  }
}

/** Minimal props so autofilled stubs still render coherently */
export function stubSection(
  kind: ComposedSectionKind,
  materials: LayoutMaterials,
  contract: DesignContract,
): ComposedSection {
  const id = stubId(kind);
  const owner = primaryCtaKind(materials.archetype);
  const withPrimary =
    owner === kind ? { primaryCta: materials.primaryCta } : {};

  switch (kind) {
    case "shell-admin":
    case "shell-portal":
      return {
        id,
        kind,
        props: { navLabel: materials.navLabel, title: materials.title },
      };
    case "page-header":
      return {
        id,
        kind,
        props: {
          title: materials.title,
          description: materials.description,
        },
      };
    case "filter-bar":
      return {
        id,
        kind,
        props: {
          fields: materials.filterFields,
          filterCols: contract.columnHints.filterCols,
          showError: false,
          ...withPrimary,
        },
      };
    case "action-toolbar":
      return {
        id,
        kind,
        props: {
          actions: materials.toolbarActions,
          sortOptions: materials.sortOptions,
          viewMode:
            materials.archetype === "product-catalog" ? "grid" : undefined,
        },
      };
    case "bulk-bar":
      return {
        id,
        kind,
        props: { selectedCount: 0, visible: false },
      };
    case "result-meta":
      return {
        id,
        kind,
        props: { totalCount: materials.totalCount },
      };
    case "data-table":
      return {
        id,
        kind,
        props: {
          columns: materials.columns,
          rows: materials.rows,
          density: contract.density,
          selectable: true,
          stickyHeader: true,
          rowActions: true,
          detailDrawer: materials.domain === "member",
        },
      };
    case "product-grid":
      return {
        id,
        kind,
        props: {
          products: materials.products,
          cardCols: contract.columnHints.cardCols,
          viewMode: "grid",
        },
      };
    case "pagination":
      return {
        id,
        kind,
        props: {
          page: 1,
          totalPages: totalPagesFor(materials.totalCount, contract.pageSize),
          pageSize: contract.pageSize,
        },
      };
    case "kpi-grid":
      return {
        id,
        kind,
        props: {
          metrics: materials.metrics,
          cardCols: contract.columnHints.cardCols,
        },
      };
    case "card-grid":
      return {
        id,
        kind,
        props: {
          cards: materials.cards,
          cardCols: Math.min(3, contract.columnHints.cardCols),
          highlightFirst: true,
          ...withPrimary,
        },
      };
    case "profile-card":
      return {
        id,
        kind,
        props: {
          profile: materials.profile ?? {
            name: "회원",
            email: "user@example.com",
            grade: "일반",
            avatarInitial: "회",
          },
        },
      };
    case "login-form":
      return {
        id,
        kind,
        props: {
          title: materials.title,
          showError: true,
          saveId: true,
          rememberMe: true,
          showSecondaryAuth: true,
          ...withPrimary,
        },
      };
    case "social-login":
      return {
        id,
        kind,
        props: {
          providers: ["Google", "Kakao", "Naver"],
        },
      };
    case "search-bar":
      return {
        id,
        kind,
        props: {
          placeholder: materials.filterFields[0]?.placeholder ?? "검색",
          ...withPrimary,
        },
      };
    case "notice-list":
      return {
        id,
        kind,
        props: { notices: materials.notices },
      };
    case "article":
      return {
        id,
        kind,
        props: { ...(materials.detail ?? {}) },
      };
    case "prev-next":
      return {
        id,
        kind,
        props: {
          prevTitle: "개인정보 처리방침 개정 안내",
          nextTitle: "여름 프로모션 일정 안내",
        },
      };
    case "list-action":
      return {
        id,
        kind,
        props: { label: materials.primaryCta || "목록", showShare: true },
      };
    case "category-tabs":
      return {
        id,
        kind,
        props: {
          categories:
            materials.archetype === "faq-accordion"
              ? ["전체", "회원", "주문", "배송", "결제"]
              : ["전체", "시스템", "안내", "이벤트"],
          active: "전체",
        },
      };
    case "faq-list":
      return {
        id,
        kind,
        props: { items: materials.faqItems },
      };
    case "popular-faq":
      return {
        id,
        kind,
        props: { items: materials.popularFaq },
      };
    case "empty-state":
      return {
        id,
        kind,
        props: {
          title: "조회 결과가 없습니다",
          description: "검색 조건을 바꿔 다시 조회해 보세요.",
          visible:
            materials.rows.length === 0 &&
            materials.products.length === 0 &&
            materials.notices.length === 0,
        },
      };
    case "loading-state":
      return {
        id,
        kind,
        props: { active: false, rows: 3 },
      };
    default:
      return { id, kind, props: {} };
  }
}

function isDevLike(): boolean {
  return typeof process !== "undefined" && process.env.NODE_ENV !== "production";
}

function enforcePrimaryCta(
  archetype: LayoutArchetype,
  sections: ComposedSection[],
  materials: LayoutMaterials,
  warnings: string[],
): ComposedSection[] {
  const owner = primaryCtaKind(archetype);
  if (!owner) {
    return sections.map((section) => {
      if (!section.props || !("primaryCta" in section.props)) return section;
      const props = { ...section.props };
      delete props.primaryCta;
      return { ...section, props };
    });
  }

  let ownerSeen = false;
  const next = sections.map((section) => {
    const props = { ...(section.props ?? {}) };
    if (section.kind === owner) {
      ownerSeen = true;
      props.primaryCta = materials.primaryCta;
      return { ...section, props };
    }
    if ("primaryCta" in props) {
      warnings.push(
        `[checklist] stripped primaryCta from ${section.kind} (owner: ${owner})`,
      );
      delete props.primaryCta;
      return { ...section, props };
    }
    return section;
  });

  if (!ownerSeen) {
    warnings.push(`[checklist] primary CTA owner missing: ${owner}`);
  }

  return next;
}

export type ChecklistAssertResult = {
  sections: ComposedSection[];
  /** Compact kinds for json / 소스 보기 */
  checklist: string[];
  warnings: string[];
  filled: ComposedSectionKind[];
};

/**
 * Reorder to checklist order, autofill missing required stubs,
 * enforce single primary-CTA owner. Warns (or throws in mock-strict) in non-prod.
 */
export function assertChecklist(
  archetype: LayoutArchetype,
  sections: ComposedSection[],
  materials: LayoutMaterials,
  contract: DesignContract,
  options?: { throwOnMissing?: boolean },
): ChecklistAssertResult {
  const items = ARCHETYPE_CHECKLIST[archetype];
  const warnings: string[] = [];
  const filled: ComposedSectionKind[] = [];

  if (items.length === 0) {
    return {
      sections,
      checklist: checklistSummary(archetype),
      warnings,
      filled,
    };
  }

  const byKind = new Map<ComposedSectionKind, ComposedSection>();
  for (const section of sections) {
    if (!byKind.has(section.kind)) {
      byKind.set(section.kind, section);
    }
  }

  function takeShellMatch(
    wanted: ComposedSectionKind,
  ): ComposedSection | undefined {
    if (wanted !== "shell-admin" && wanted !== "shell-portal") return undefined;
    const exact = byKind.get(wanted);
    if (exact) {
      byKind.delete(wanted);
      return exact;
    }
    const alt = wanted === "shell-admin" ? "shell-portal" : "shell-admin";
    const other = byKind.get(alt);
    if (other) {
      byKind.delete(alt);
      return other;
    }
    return undefined;
  }

  const ordered: ComposedSection[] = [];
  for (const item of items) {
    const existing =
      takeShellMatch(item.kind) ??
      (() => {
        const found = byKind.get(item.kind);
        if (found) byKind.delete(item.kind);
        return found;
      })();
    if (existing) {
      ordered.push(existing);
      continue;
    }
    if (item.required) {
      warnings.push(`[checklist] missing required section: ${item.kind}`);
      filled.push(item.kind);
      ordered.push(stubSection(item.kind, materials, contract));
    }
  }

  // Preferred-but-optional kinds already present stay; extras after checklist order
  for (const leftover of byKind.values()) {
    ordered.push(leftover);
  }

  const withCta = enforcePrimaryCta(archetype, ordered, materials, warnings);

  if (warnings.length > 0 && isDevLike()) {
    for (const w of warnings) {
      console.warn(w);
    }
    if (options?.throwOnMissing && filled.length > 0) {
      throw new Error(
        `Archetype ${archetype} missing required sections: ${filled.join(", ")}`,
      );
    }
  }

  return {
    sections: withCta,
    checklist: checklistSummary(archetype),
    warnings,
    filled,
  };
}
