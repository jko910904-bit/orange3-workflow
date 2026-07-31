import type { DesignContract } from "@/generator/designContract";
import { totalPagesFor } from "@/generator/designContract";
import type { ScreenComposition } from "@/types/screen-composition";
import { assertChecklist, primaryCtaKind } from "./checklist";
import { resolveMaterials } from "./materials";
import type { ComposedSection, LayoutMaterials } from "./types";

function pagerProps(materials: LayoutMaterials, contract: DesignContract) {
  return {
    page: 1,
    totalPages: totalPagesFor(materials.totalCount, contract.pageSize),
    pageSize: contract.pageSize,
  };
}

function sectionsFromMaterials(
  materials: LayoutMaterials,
  contract: DesignContract,
): ComposedSection[] {
  const { archetype } = materials;
  const sections: ComposedSection[] = [];
  const ctaOwner = primaryCtaKind(archetype);
  const isEmptyList =
    materials.rows.length === 0 &&
    materials.products.length === 0 &&
    materials.notices.length === 0;

  if (materials.surface === "admin") {
    sections.push({
      id: "shell",
      kind: "shell-admin",
      props: {
        navLabel: materials.navLabel,
        title: materials.title,
      },
    });
  } else {
    sections.push({
      id: "shell",
      kind: "shell-portal",
      props: {
        navLabel: materials.navLabel,
        title: materials.title,
      },
    });
  }

  switch (archetype) {
    case "list-inquiry": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: {
            title: materials.title,
            description: materials.description,
          },
        },
        {
          id: "filters",
          kind: "filter-bar",
          props: {
            fields: materials.filterFields,
            ...(ctaOwner === "filter-bar"
              ? { primaryCta: materials.primaryCta }
              : {}),
            filterCols: contract.columnHints.filterCols,
            showError: false,
          },
        },
        {
          id: "toolbar",
          kind: "action-toolbar",
          props: {
            actions: materials.toolbarActions,
            sortOptions: materials.sortOptions,
          },
        },
        {
          id: "meta",
          kind: "result-meta",
          props: { totalCount: materials.totalCount },
        },
        {
          id: "bulk",
          kind: "bulk-bar",
          props: { selectedCount: 0, visible: false },
        },
        {
          id: "loading",
          kind: "loading-state",
          props: { active: false, rows: 4 },
        },
        {
          id: "table",
          kind: "data-table",
          props: {
            columns: materials.columns,
            rows: materials.rows,
            density: contract.density,
            selectable: true,
            stickyHeader: true,
            rowActions: true,
            detailDrawer: materials.domain === "member",
          },
        },
        {
          id: "empty",
          kind: "empty-state",
          props: {
            title: "조회 결과가 없습니다",
            description: "검색 조건을 바꿔 다시 조회해 보세요.",
            visible: isEmptyList,
          },
        },
        {
          id: "pager",
          kind: "pagination",
          props: pagerProps(materials, contract),
        },
      );
      break;
    }
    case "product-catalog": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: {
            title: materials.title,
            description: materials.description,
          },
        },
        {
          id: "filters",
          kind: "filter-bar",
          props: {
            fields: materials.filterFields,
            ...(ctaOwner === "filter-bar"
              ? { primaryCta: materials.primaryCta }
              : {}),
            filterCols: contract.columnHints.filterCols,
          },
        },
        {
          id: "toolbar",
          kind: "action-toolbar",
          props: {
            actions: materials.toolbarActions,
            sortOptions: materials.sortOptions,
            viewMode: "grid",
            showViewToggle: true,
          },
        },
        {
          id: "meta",
          kind: "result-meta",
          props: { totalCount: materials.totalCount },
        },
        {
          id: "loading",
          kind: "loading-state",
          props: { active: false, rows: 3 },
        },
        {
          id: "products",
          kind: "product-grid",
          props: {
            products: materials.products,
            cardCols: contract.columnHints.cardCols,
            viewMode: "grid",
            columns: materials.columns,
            density: contract.density,
          },
        },
        {
          id: "empty",
          kind: "empty-state",
          props: {
            title: "등록된 상품이 없습니다",
            description: "필터를 초기화하거나 다른 조건으로 검색해 보세요.",
            visible: materials.products.length === 0,
          },
        },
        {
          id: "pager",
          kind: "pagination",
          props: pagerProps(materials, contract),
        },
      );
      break;
    }
    case "dashboard-hub": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: {
            title: materials.title,
            description: materials.description,
          },
        },
        {
          id: "profile",
          kind: "profile-card",
          props: {
            profile: materials.profile ?? {
              name: "회원",
              email: "user@example.com",
              grade: "일반",
              avatarInitial: "회",
            },
          },
        },
        {
          id: "kpis",
          kind: "kpi-grid",
          props: {
            metrics: materials.metrics,
            cardCols: contract.columnHints.cardCols,
          },
        },
        {
          id: "cards",
          kind: "card-grid",
          props: {
            cards: materials.cards,
            cardCols: Math.min(3, contract.columnHints.cardCols),
            highlightFirst: true,
            ...(ctaOwner === "card-grid"
              ? { primaryCta: materials.primaryCta }
              : {}),
          },
        },
      );
      break;
    }
    case "auth": {
      sections.push(
        {
          id: "login",
          kind: "login-form",
          props: {
            title: materials.title,
            showError: true,
            saveId: true,
            rememberMe: true,
            showSecondaryAuth: true,
            ...(ctaOwner === "login-form"
              ? { primaryCta: materials.primaryCta }
              : {}),
          },
        },
        {
          id: "social",
          kind: "social-login",
          props: { providers: ["Google", "Kakao", "Naver"] },
        },
      );
      break;
    }
    case "content-list": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: {
            title: materials.title,
            description: materials.description,
          },
        },
        {
          id: "search",
          kind: "search-bar",
          props: {
            placeholder: materials.filterFields[0]?.placeholder ?? "검색",
            ...(ctaOwner === "search-bar"
              ? { primaryCta: materials.primaryCta }
              : {}),
          },
        },
        {
          id: "categories",
          kind: "category-tabs",
          props: {
            categories: ["전체", "시스템", "안내", "이벤트"],
            active: "전체",
          },
        },
        {
          id: "meta",
          kind: "result-meta",
          props: { totalCount: materials.totalCount },
        },
        {
          id: "loading",
          kind: "loading-state",
          props: { active: false, rows: 3 },
        },
        {
          id: "notices",
          kind: "notice-list",
          props: {
            notices: materials.notices,
          },
        },
        {
          id: "empty",
          kind: "empty-state",
          props: {
            title: "공지사항이 없습니다",
            description: "다른 카테고리나 검색어로 다시 찾아보세요.",
            visible: materials.notices.length === 0,
          },
        },
        {
          id: "pager",
          kind: "pagination",
          props: pagerProps(materials, contract),
        },
      );
      break;
    }
    case "content-detail": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: { title: materials.title },
        },
        {
          id: "article",
          kind: "article",
          props: { ...(materials.detail ?? {}) },
        },
        {
          id: "prev-next",
          kind: "prev-next",
          props: {
            prevTitle: "개인정보 처리방침 개정 안내",
            nextTitle: "여름 프로모션 일정 안내",
          },
        },
        {
          id: "list-action",
          kind: "list-action",
          props: { label: materials.primaryCta || "목록", showShare: true },
        },
      );
      break;
    }
    case "faq-accordion": {
      sections.push(
        {
          id: "header",
          kind: "page-header",
          props: {
            title: materials.title,
            description: materials.description,
          },
        },
        {
          id: "search",
          kind: "search-bar",
          props: {
            placeholder: materials.filterFields[0]?.placeholder ?? "검색",
            ...(ctaOwner === "search-bar"
              ? { primaryCta: materials.primaryCta }
              : {}),
          },
        },
        {
          id: "categories",
          kind: "category-tabs",
          props: {
            categories: ["전체", "회원", "주문", "배송", "결제"],
            active: "전체",
          },
        },
        {
          id: "popular-faq",
          kind: "popular-faq",
          props: { items: materials.popularFaq },
        },
        {
          id: "meta",
          kind: "result-meta",
          props: { totalCount: materials.totalCount },
        },
        {
          id: "faq",
          kind: "faq-list",
          props: { items: materials.faqItems },
        },
        {
          id: "pager",
          kind: "pagination",
          props: pagerProps(materials, contract),
        },
      );
      break;
    }
    default: {
      sections.push({
        id: "header",
        kind: "page-header",
        props: {
          title: materials.title,
          description: materials.description,
        },
      });
    }
  }

  return sections;
}

function recipeLabels(sections: ComposedSection[]): string[] {
  return sections
    .filter((s) => s.kind !== "shell-admin" && s.kind !== "shell-portal")
    .map((s) => s.kind);
}

function nodesFromSections(sections: ComposedSection[]) {
  return sections.map((section) => ({
    id: section.id,
    component: section.kind,
    variant: "Composed",
    props: section.props,
  }));
}

/**
 * Materials (contract + prompt heuristics) → new ScreenComposition tree.
 * Checklist assert + autofill runs after section build so layouts never ship incomplete.
 */
export function composeScreen(
  prompt: string,
  contract: DesignContract,
): { composition: ScreenComposition; materials: LayoutMaterials } {
  const materials = resolveMaterials(prompt, contract);
  const rawSections = sectionsFromMaterials(materials, contract);
  const asserted = assertChecklist(
    materials.archetype,
    rawSections,
    materials,
    contract,
    { throwOnMissing: false },
  );
  const sections = asserted.sections;
  const intent =
    materials.archetype === "unsupported"
      ? "unsupported"
      : materials.archetype;

  const composition: ScreenComposition = {
    version: "1.0",
    intent,
    prompt,
    surface: materials.surface,
    recipe: recipeLabels(sections),
    nodes: nodesFromSections(sections),
    designContract: contract,
    mode: "composed",
    archetype: materials.archetype,
    title: materials.title,
    sections,
  };

  return { composition, materials };
}
