/**
 * JSON Registry contracts — Component → Recipe → Pattern
 * IDs are stable references; Preview resolves through the catalog loaders.
 */

import type { DesignContract } from "@/generator/designContract";
import type { AiRule, TokenDependencyCategory } from "./ai-metadata";
import type { CompositionNode, ScreenComposition } from "./screen-composition";

/** Component Registry id (matches filename stem), e.g. "button" */
export type ComponentId = string;

/** Recipe Registry id, e.g. "login-form" */
export type RecipeId = string;

/** Pattern Registry id, e.g. "Login" */
export type RegistryPatternId = string;

export type ComponentRegistryEntry = {
  id: ComponentId;
  name: string;
  /** @deprecated Prefer `name` — kept for older catalog consumers */
  component?: string;
  category: string;
  purpose: string;
  aliases: string[];
  variants: string[];
  sizes: string[];
  states: string[];
  dependencies: TokenDependencyCategory[] | string[];
  accessibility: string[];
  aiRules: AiRule[];
  figmaMapping: string[];
  usage?: string[];
  avoid?: string[];
  compatibleWith?: string[];
  promptExamples?: string[];
  confidence?: number;
  priority?: number;
  generatedByAI?: boolean;
  version?: string;
};

/**
 * ID-based slot inside a Recipe.
 * `componentId` points at Component Registry; Preview uses `preview.component` when set.
 */
export type RecipeComponentRef = {
  componentId: ComponentId;
  variant?: string;
  size?: string;
  /** Human label shown in Playground / AI output */
  displayName?: string;
  props?: Record<string, unknown>;
  /** Override React preview mapping (e.g. KpiCards, Chart) */
  preview?: {
    component: string;
    variant?: string;
  };
};

export type RecipeRegistryEntry = {
  id: RecipeId;
  name: string;
  description: string;
  components: RecipeComponentRef[];
  keywords: string[];
  status: "ready" | "partial" | "planned";
};

export type PatternRegistryEntry = {
  id: RegistryPatternId;
  name: string;
  description: string;
  /** Recipe Registry ids (order = composition order) */
  recipes: RecipeId[];
  keywords: string[];
  surface: "admin" | "portal";
  intent: string;
  status?: "ready" | "partial" | "planned";
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
  composition: ScreenComposition;
  /** Design setup contract — grid, density, tokens (소스 보기 / preview) */
  designContract?: DesignContract;
  json: Record<string, unknown>;
};

/** Resolved graph for debugging / Registry Viewer */
export type ResolvedScreen = {
  pattern: PatternRegistryEntry;
  recipes: RecipeRegistryEntry[];
  components: ComponentRegistryEntry[];
  displayComponents: string[];
  nodes: CompositionNode[];
};
