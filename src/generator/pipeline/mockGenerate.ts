import { findRecipesByPrompt, getRecipe } from "@/catalog";
import { getPattern, listPatterns } from "@/generator/registry";
import { parsePromptToComposition } from "@/generator/parser/parseComposition";
import type { GenerateResult, PatternSelection, RecipeId } from "@/types/recipe";
import type { PatternId } from "@/types";
import type { CompositionNode, ScreenComposition } from "@/types/screen-composition";

function pickPattern(prompt: string): PatternSelection | null {
  const lower = prompt.toLowerCase();

  // CRUD / member management → SearchFilterTable (presented as CRUD)
  if (
    ["회원", "관리", "crud", "목록", "list", "member"].some((k) =>
      lower.includes(k),
    )
  ) {
    const p = getPattern("SearchFilterTable");
    return p
      ? { id: "CRUD", name: "CRUD", reason: `Mapped from ${p.id}` }
      : null;
  }

  if (["login", "로그인", "signin"].some((k) => lower.includes(k))) {
    return { id: "Login", name: "Login", reason: "Auth keywords" };
  }

  if (["dashboard", "대시보드"].some((k) => lower.includes(k))) {
    return { id: "Dashboard", name: "Dashboard" };
  }

  if (["wizard", "절차", "온보딩"].some((k) => lower.includes(k))) {
    return { id: "Wizard", name: "Wizard" };
  }

  if (["상세", "detail"].some((k) => lower.includes(k))) {
    return { id: "Detail", name: "Detail" };
  }

  if (["form", "신청", "등록"].some((k) => lower.includes(k))) {
    return { id: "Form", name: "Form" };
  }

  if (["search", "검색"].some((k) => lower.includes(k))) {
    return { id: "Search", name: "Search", reason: "SearchFilterTable" };
  }

  // fallback via pattern registry keywords
  for (const p of listPatterns()) {
    if (p.keywords?.some((k) => lower.includes(k.toLowerCase()))) {
      return { id: p.id, name: p.name };
    }
  }

  return null;
}

function buildCrudComposition(prompt: string): {
  composition: ScreenComposition;
  components: string[];
  recipes: RecipeId[];
} {
  const recipes: RecipeId[] = ["PageHeader", "FilterBar", "CrudToolbar"];
  const components = [
    "Header",
    "Search",
    "Filter",
    "Table",
    "Pagination",
    "Primary Button",
  ];

  const nodes: CompositionNode[] = [
    {
      id: "crud-header-action",
      component: "Button",
      variant: "Primary",
      size: "M",
      props: { children: "회원 등록" },
    },
    {
      id: "crud-search",
      component: "Input",
      variant: "Search",
      size: "S",
      props: { label: "검색", placeholder: "이름 / 이메일" },
    },
    {
      id: "crud-filter",
      component: "Input",
      variant: "Text",
      size: "S",
      props: { label: "필터", placeholder: "상태" },
    },
    {
      id: "crud-query",
      component: "Button",
      variant: "Primary",
      size: "S",
      props: { children: "조회" },
    },
    {
      id: "crud-reset",
      component: "Button",
      variant: "Ghost",
      size: "S",
      props: { children: "초기화" },
    },
  ];

  return {
    recipes,
    components,
    composition: {
      version: "1.0",
      intent: "crud",
      prompt,
      surface: "admin",
      recipe: components,
      nodes,
    },
  };
}

/**
 * Mock generator — rule-based stand-in for LLM providers.
 * Prompt → Recipe Selection → Pattern Selection → Components → Composition
 */
export function mockGenerate(prompt: string): GenerateResult {
  const pattern = pickPattern(prompt);
  const matchedRecipes = findRecipesByPrompt(prompt);

  if (pattern?.id === "CRUD" || pattern?.id === "Search") {
    const crud = buildCrudComposition(prompt);
    const json = {
      prompt,
      pattern: pattern,
      recipes: crud.recipes.map((id) => getRecipe(id)),
      components: crud.components,
      nodes: crud.composition.nodes.map((n) => ({
        id: n.id,
        component: n.component,
        variant: n.variant,
      })),
    };
    return {
      version: "1.0",
      prompt,
      provider: "mock",
      pattern,
      recipes: crud.recipes,
      components: crud.components,
      composition: crud.composition,
      json,
    };
  }

  // Login & others: reuse composition parser + attach recipes
  const composition = parsePromptToComposition(prompt);
  const recipeIds = matchedRecipes.map((r) => r.id);
  const components =
    composition.recipe.length > 0
      ? composition.recipe
      : matchedRecipes.flatMap((r) => r.components);

  // Attach pattern id for ScreenRenderer when possible
  const patternIdForRender = mapPatternToRegistryId(pattern?.id);
  if (patternIdForRender && composition.intent === "unknown") {
    composition.intent = patternIdForRender;
  }

  return {
    version: "1.0",
    prompt,
    provider: "mock",
    pattern,
    recipes: recipeIds,
    components: [...new Set(components)],
    composition,
    json: {
      prompt,
      pattern,
      recipes: matchedRecipes,
      components: [...new Set(components)],
      nodes: composition.nodes.map((n) => ({
        id: n.id,
        component: n.component,
        variant: n.variant,
      })),
    },
  };
}

function mapPatternToRegistryId(id?: string | null): PatternId | undefined {
  if (!id) return undefined;
  if (id === "CRUD" || id === "Search") return "SearchFilterTable";
  if (id === "Login") return "Login";
  if (id === "Dashboard") return "Dashboard";
  if (id === "Detail") return "Detail";
  if (id === "Form") return "Form";
  if (id === "Wizard") return "Wizard";
  return listPatterns().find((p) => p.id === id)?.id;
}

export async function generateFromPrompt(
  prompt: string,
  provider: "mock" = "mock",
): Promise<GenerateResult> {
  if (provider !== "mock") {
    throw new Error(`Provider ${provider} is not wired yet. Use mock.`);
  }
  return mockGenerate(prompt);
}
