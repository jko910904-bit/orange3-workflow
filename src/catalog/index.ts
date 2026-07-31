import type {
  ComponentRegistryEntry,
  PatternRegistryEntry,
  RecipeComponentRef,
  RecipeRegistryEntry,
  ResolvedScreen,
} from "@/types/registry";
import type { CompositionNode } from "@/types/screen-composition";

import buttonJson from "@/catalog/components/button.json";
import inputJson from "@/catalog/components/input.json";
import checkboxJson from "@/catalog/components/checkbox.json";
import tableJson from "@/catalog/components/table.json";
import cardJson from "@/catalog/components/card.json";
import badgeJson from "@/catalog/components/badge.json";
import paginationJson from "@/catalog/components/pagination.json";
import chartJson from "@/catalog/components/chart.json";

import pageHeaderJson from "@/catalog/recipes/page-header.json";
import loginFormJson from "@/catalog/recipes/login-form.json";
import searchBarJson from "@/catalog/recipes/search-bar.json";
import filterBarJson from "@/catalog/recipes/filter-bar.json";
import profileCardJson from "@/catalog/recipes/profile-card.json";
import toolbarJson from "@/catalog/recipes/toolbar.json";
import dataTableJson from "@/catalog/recipes/data-table.json";
import kpiGridJson from "@/catalog/recipes/kpi-grid.json";
import chartPanelJson from "@/catalog/recipes/chart-panel.json";
import summaryTableJson from "@/catalog/recipes/summary-table.json";

import loginPatternJson from "@/catalog/patterns/login.json";
import crudPatternJson from "@/catalog/patterns/crud.json";
import dashboardPatternJson from "@/catalog/patterns/dashboard.json";
import noticeListPatternJson from "@/catalog/patterns/notice-list.json";
import noticeDetailPatternJson from "@/catalog/patterns/notice-detail.json";
import faqPatternJson from "@/catalog/patterns/faq.json";


/** @deprecated Use ComponentRegistryEntry */
export type CatalogComponentJson = ComponentRegistryEntry;

const COMPONENTS: ComponentRegistryEntry[] = [
  buttonJson,
  inputJson,
  checkboxJson,
  tableJson,
  cardJson,
  badgeJson,
  paginationJson,
  chartJson,
].map((c) => c as ComponentRegistryEntry);

const RECIPES: RecipeRegistryEntry[] = [
  pageHeaderJson,
  loginFormJson,
  searchBarJson,
  filterBarJson,
  profileCardJson,
  toolbarJson,
  dataTableJson,
  kpiGridJson,
  chartPanelJson,
  summaryTableJson,
].map((r) => r as RecipeRegistryEntry);

const PATTERNS: PatternRegistryEntry[] = [
  loginPatternJson,
  crudPatternJson,
  dashboardPatternJson,
  noticeListPatternJson,
  noticeDetailPatternJson,
  faqPatternJson,
].map((p) => p as PatternRegistryEntry);

const componentById = new Map(COMPONENTS.map((c) => [c.id, c]));
const componentByName = new Map(
  COMPONENTS.map((c) => [(c.name || c.component || c.id).toLowerCase(), c]),
);
const recipeById = new Map(RECIPES.map((r) => [r.id, r]));
const patternById = new Map(PATTERNS.map((p) => [p.id, p]));

// —— Components ——

export function listCatalogComponentIds(): string[] {
  return COMPONENTS.map((c) => c.id);
}

export function listCatalogComponents(): ComponentRegistryEntry[] {
  return COMPONENTS;
}

export function getCatalogComponent(
  idOrName: string,
): ComponentRegistryEntry | undefined {
  const key = idOrName.toLowerCase();
  return (
    componentById.get(key) ??
    componentById.get(idOrName) ??
    componentByName.get(key)
  );
}

export function exportCatalogComponentsJson(pretty = true): string {
  return JSON.stringify(COMPONENTS, null, pretty ? 2 : undefined);
}

// —— Recipes ——

export function listRecipes(): RecipeRegistryEntry[] {
  return RECIPES;
}

export function getRecipe(id: string): RecipeRegistryEntry | undefined {
  return recipeById.get(id);
}

export function findRecipesByPrompt(prompt: string): RecipeRegistryEntry[] {
  const lower = prompt.toLowerCase();
  return RECIPES.filter((r) =>
    r.keywords.some((k) => lower.includes(k.toLowerCase())),
  );
}

export function recipeComponentLabels(
  recipe: RecipeRegistryEntry,
): string[] {
  return recipe.components.map(slotDisplayName);
}

export function slotDisplayName(slot: RecipeComponentRef): string {
  if (slot.displayName) return slot.displayName;
  const meta = getCatalogComponent(slot.componentId);
  const name = meta?.name ?? slot.componentId;
  return slot.variant ? `${name}.${slot.variant}` : name;
}

// —— Patterns ——

export function listPatternRegistry(): PatternRegistryEntry[] {
  return PATTERNS;
}

export function getPatternRegistry(
  id: string,
): PatternRegistryEntry | undefined {
  return patternById.get(id);
}

export function matchPatternByPrompt(
  prompt: string,
): PatternRegistryEntry | null {
  const lower = prompt.trim().toLowerCase().replace(/\s+/g, " ");
  if (!lower) return null;

  // Prefer Portal Login over CRUD/Dashboard when login keywords are present
  if (
    lower.includes("로그인") ||
    lower.includes("login") ||
    lower.includes("signin") ||
    lower.includes("sign in")
  ) {
    return patternById.get("Login") ?? null;
  }

  // Dashboard before CRUD when dashboard / 대시보드 keywords present
  if (
    lower.includes("대시보드") ||
    lower.includes("dashboard") ||
    lower.includes("운영현황")
  ) {
    return patternById.get("Dashboard") ?? null;
  }

  // FAQ before generic CRUD / notice
  if (
    lower.includes("자주하는 질문") ||
    lower.includes("자주 하는 질문") ||
    lower.includes("faq")
  ) {
    return patternById.get("FAQ") ?? null;
  }

  // Notice detail before notice list
  if (
    lower.includes("공지사항 상세") ||
    lower.includes("공지 상세") ||
    lower.includes("notice detail") ||
    lower.includes("notice-detail") ||
    (lower.includes("공지") && lower.includes("상세"))
  ) {
    return patternById.get("NoticeDetail") ?? null;
  }

  // Notice list (default for 공지사항)
  if (
    lower.includes("공지사항") ||
    lower.includes("notice list") ||
    (lower.includes("notice") && !lower.includes("detail"))
  ) {
    return patternById.get("NoticeList") ?? null;
  }

  let best: { pattern: PatternRegistryEntry; score: number } | null = null;

  for (const pattern of PATTERNS) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      const key = keyword.toLowerCase();
      if (lower.includes(key)) {
        // Longer keywords win ties (e.g. 마이페이지 > 페이지)
        score += Math.max(1, key.length);
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { pattern, score };
    }
  }

  return best?.pattern ?? null;
}

export function exportCatalogRecipesJson(pretty = true): string {
  return JSON.stringify(RECIPES, null, pretty ? 2 : undefined);
}

export function exportCatalogPatternsJson(pretty = true): string {
  return JSON.stringify(PATTERNS, null, pretty ? 2 : undefined);
}

// —— Resolve Pattern → Recipe → Component → Nodes ——

export function resolveRecipeNodes(
  recipe: RecipeRegistryEntry,
): CompositionNode[] {
  return recipe.components.map((slot, index) => {
    const meta = getCatalogComponent(slot.componentId);
    const componentName =
      slot.preview?.component ?? meta?.name ?? slot.componentId;

    return {
      id: `${recipe.id}-${slot.componentId}-${index}`,
      component: componentName,
      variant: slot.preview?.variant ?? slot.variant,
      size: slot.size,
      props: slot.props ?? {},
      label: slotDisplayName(slot),
    };
  });
}

/**
 * Walk Pattern → Recipes → Component Registry and build a resolved screen.
 * Changing Registry JSON changes Preview automatically via this path.
 */
export function resolvePatternScreen(
  pattern: PatternRegistryEntry,
): ResolvedScreen {
  const recipes = pattern.recipes
    .map((id) => getRecipe(id))
    .filter((r): r is RecipeRegistryEntry => Boolean(r));

  const nodes = recipes.flatMap(resolveRecipeNodes);
  const displayComponents = recipes.flatMap(recipeComponentLabels);

  const componentIds = [
    ...new Set(recipes.flatMap((r) => r.components.map((c) => c.componentId))),
  ];
  const components = componentIds
    .map((id) => getCatalogComponent(id))
    .filter((c): c is ComponentRegistryEntry => Boolean(c));

  return {
    pattern,
    recipes,
    components,
    displayComponents,
    nodes,
  };
}
