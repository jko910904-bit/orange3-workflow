import type { CompositionNode, ScreenComposition } from "@/types/screen-composition";
import { mockGenerate } from "@/generator/pipeline/mockGenerate";

/**
 * Prompt → ScreenComposition via the shared Mock Parser rules.
 */
export function parsePromptToComposition(prompt: string): ScreenComposition {
  return mockGenerate(prompt).composition;
}

/** @deprecated Prefer mockGenerate for full Pattern/Recipe/Components result */
export function parsePromptNodes(prompt: string): CompositionNode[] {
  return parsePromptToComposition(prompt).nodes;
}
