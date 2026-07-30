import type { ParseResult, PatternId } from "@/types";
import { getPattern, listPatterns } from "@/generator/registry";

/**
 * Mock parser — AI comes later.
 * Matches prompt keywords to Pattern Registry entries.
 */
export function parsePrompt(prompt: string): ParseResult {
  const lower = prompt.toLowerCase();
  const matched: PatternId[] = [];

  for (const pattern of listPatterns()) {
    const keys = pattern.keywords ?? [];
    if (keys.some((keyword) => lower.includes(keyword.toLowerCase()))) {
      matched.push(pattern.id);
    }
  }

  const uniqueIds = [...new Set(matched)];
  const ids: PatternId[] =
    uniqueIds.length > 0 ? uniqueIds : ["Dashboard"];

  return {
    patterns: ids
      .filter((id) => getPattern(id))
      .map((id) => ({ id })),
  };
}
