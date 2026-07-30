import type {
  AiRule,
  ComponentAiMetadata,
  ComponentCatalogJson,
} from "@/types/ai-metadata";
import { toCatalogJson } from "@/types/ai-metadata";
import { buttonAiMetadata } from "@/design-system/components/button/button.meta";

/**
 * Component Registry — AI Metadata layer between Tokens and Renderer.
 *
 * Design Tokens → AI Metadata → Component Registry → Prompt Parser → Renderer
 *
 * Extensible: add `*.meta.ts` per component and register in COMPONENT_REGISTRY.
 */
const COMPONENT_REGISTRY: ComponentAiMetadata[] = [buttonAiMetadata];

const componentMap = new Map(
  COMPONENT_REGISTRY.map((entry) => [entry.component, entry]),
);

export function listComponents(): ComponentAiMetadata[] {
  return [...COMPONENT_REGISTRY];
}

export function getComponent(
  name: string,
): ComponentAiMetadata | undefined {
  return componentMap.get(name);
}

export function exportComponentCatalog(): ComponentCatalogJson[] {
  return COMPONENT_REGISTRY.map(toCatalogJson);
}

export function exportComponentCatalogJson(pretty = true): string {
  return JSON.stringify(
    exportComponentCatalog(),
    null,
    pretty ? 2 : undefined,
  );
}

export function searchComponentsByAlias(
  query: string,
): ComponentAiMetadata[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return COMPONENT_REGISTRY.filter(
    (c) =>
      c.component.toLowerCase().includes(q) ||
      c.aliases.some((a) => a.toLowerCase().includes(q)) ||
      c.usage.some((u) => u.toLowerCase().includes(q)) ||
      c.purpose.toLowerCase().includes(q),
  ).sort((a, b) => b.priority - a.priority);
}

function ruleMatches(rule: AiRule, prompt: string): boolean {
  const lower = prompt.toLowerCase();
  const { anyOf, allOf } = rule.when;
  const anyOk =
    !anyOf || anyOf.length === 0
      ? false
      : anyOf.some((k) => lower.includes(k.toLowerCase()));
  const allOk =
    !allOf || allOf.length === 0
      ? true
      : allOf.every((k) => lower.includes(k.toLowerCase()));

  if (anyOf && anyOf.length > 0 && allOf && allOf.length > 0) {
    return anyOk && allOk;
  }
  if (anyOf && anyOf.length > 0) return anyOk;
  if (allOf && allOf.length > 0) return allOk;
  return false;
}

export type AiRuleMatchResult = {
  component: string;
  rule: AiRule;
  metadata: ComponentAiMetadata;
};

/** Evaluate AI Rules across the registry for a natural-language prompt */
export function matchComponentRules(prompt: string): AiRuleMatchResult[] {
  const hits: AiRuleMatchResult[] = [];
  for (const meta of COMPONENT_REGISTRY) {
    for (const rule of meta.aiRules) {
      if (ruleMatches(rule, prompt)) {
        hits.push({ component: meta.component, rule, metadata: meta });
      }
    }
  }
  return hits.sort(
    (a, b) => b.metadata.priority - a.metadata.priority,
  );
}

export { buttonAiMetadata };
