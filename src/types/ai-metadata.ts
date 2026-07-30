/**
 * AI Metadata — Generator / MCP / RAG searchable contract.
 * Components ship design + AI understanding in one registry entry.
 */

export type TokenDependencyCategory =
  | "Color"
  | "Typography"
  | "Spacing"
  | "Radius"
  | "Shadow"
  | "Elevation"
  | "Motion"
  | "Density"
  | "Grid";

export type AiRuleMatch = {
  /** Match if prompt contains any of these (case-insensitive) */
  anyOf?: string[];
  /** Match if prompt contains all of these */
  allOf?: string[];
};

export type AiRuleAction = {
  component: string;
  variant?: string;
  size?: string;
  state?: string;
};

export type AiRule = {
  id: string;
  when: AiRuleMatch;
  then: AiRuleAction;
  reason?: string;
};

export type ComponentAiMetadata = {
  /** Registry id, e.g. "Button" */
  component: string;
  purpose: string;
  usage: string[];
  avoid: string[];
  /** Natural-language prompt aliases */
  aliases: string[];
  dependencies: TokenDependencyCategory[];
  variants: string[];
  sizes: string[];
  states: string[];
  accessibility: string[];
  aiRules: AiRule[];
  /** Figma node naming conventions */
  figmaMapping: string[];

  // —— Generator / Agent fields ——
  /** 0–1 selection confidence baseline */
  confidence: number;
  /** Higher = preferred when multiple match */
  priority: number;
  category: string;
  compatibleWith: string[];
  generatedByAI: boolean;
  version: string;
};

/** JSON-serializable catalog entry for export / RAG ingest */
export type ComponentCatalogJson = {
  component: string;
  purpose: string;
  aliases: string[];
  usage: string[];
  avoid: string[];
  variants: string[];
  sizes: string[];
  states: string[];
  dependencies: TokenDependencyCategory[];
  accessibility: string[];
  aiRules: AiRule[];
  figmaMapping: string[];
  confidence: number;
  priority: number;
  category: string;
  compatibleWith: string[];
  generatedByAI: boolean;
  version: string;
};

export function toCatalogJson(
  meta: ComponentAiMetadata,
): ComponentCatalogJson {
  return {
    component: meta.component,
    purpose: meta.purpose,
    aliases: meta.aliases,
    usage: meta.usage,
    avoid: meta.avoid,
    variants: meta.variants,
    sizes: meta.sizes,
    states: meta.states,
    dependencies: meta.dependencies,
    accessibility: meta.accessibility,
    aiRules: meta.aiRules,
    figmaMapping: meta.figmaMapping,
    confidence: meta.confidence,
    priority: meta.priority,
    category: meta.category,
    compatibleWith: meta.compatibleWith,
    generatedByAI: meta.generatedByAI,
    version: meta.version,
  };
}
