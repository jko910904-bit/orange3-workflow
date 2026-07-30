import recipesJson from "@/catalog/recipes/recipes.json";
import buttonJson from "@/catalog/components/button.json";
import inputJson from "@/catalog/components/input.json";
import checkboxJson from "@/catalog/components/checkbox.json";
import tableJson from "@/catalog/components/table.json";
import cardJson from "@/catalog/components/card.json";
import type { RecipeDefinition, RecipeId } from "@/types/recipe";

export type CatalogComponentJson = typeof buttonJson;

const COMPONENT_FILES: Record<string, CatalogComponentJson> = {
  button: buttonJson as CatalogComponentJson,
  input: inputJson as CatalogComponentJson,
  checkbox: checkboxJson as CatalogComponentJson,
  table: tableJson as CatalogComponentJson,
  card: cardJson as CatalogComponentJson,
};

export function listCatalogComponentIds(): string[] {
  return Object.keys(COMPONENT_FILES);
}

export function getCatalogComponent(
  id: string,
): CatalogComponentJson | undefined {
  const key = id.toLowerCase();
  if (COMPONENT_FILES[key]) return COMPONENT_FILES[key];
  return Object.values(COMPONENT_FILES).find(
    (c) => c.component.toLowerCase() === key,
  );
}

export function listCatalogComponents(): CatalogComponentJson[] {
  return Object.values(COMPONENT_FILES);
}

export function exportCatalogComponentsJson(pretty = true): string {
  return JSON.stringify(listCatalogComponents(), null, pretty ? 2 : undefined);
}

export function listRecipes(): RecipeDefinition[] {
  return recipesJson as RecipeDefinition[];
}

export function getRecipe(id: RecipeId): RecipeDefinition | undefined {
  return listRecipes().find((r) => r.id === id);
}

export function findRecipesByPrompt(prompt: string): RecipeDefinition[] {
  const lower = prompt.toLowerCase();
  return listRecipes().filter((r) =>
    r.keywords.some((k) => lower.includes(k.toLowerCase())),
  );
}
