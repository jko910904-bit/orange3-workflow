/**
 * AI Screen Generator — Recipe is a reusable multi-component block
 * smaller than a Pattern, used heavily by the mock/LLM composer.
 */

export type RecipeId =
  | "SearchBar"
  | "LoginForm"
  | "FilterBar"
  | "ProfileCard"
  | "CrudToolbar"
  | "PageHeader";

export type RecipeDefinition = {
  id: RecipeId;
  name: string;
  description: string;
  /** Component.Variant recipe labels for display */
  components: string[];
  keywords: string[];
  status: "ready" | "partial" | "planned";
};

export type PatternSelection = {
  id: string;
  name: string;
  reason?: string;
};

export type GenerateResult = {
  version: "1.0";
  prompt: string;
  provider: "mock";
  pattern: PatternSelection | null;
  recipes: RecipeId[];
  components: string[];
  composition: import("./screen-composition").ScreenComposition;
  json: Record<string, unknown>;
};
