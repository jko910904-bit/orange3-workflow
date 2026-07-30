import type { ParseResult, PatternId } from "@/types";
import { getPattern } from "@/generator/registry";

const KEYWORD_MAP: { keywords: string[]; id: PatternId }[] = [
  { keywords: ["login", "로그인", "auth"], id: "Login" },
  { keywords: ["dashboard", "대시보드", "overview"], id: "Dashboard" },
  { keywords: ["list", "table", "search", "목록", "검색"], id: "SearchTable" },
  { keywords: ["detail", "상세"], id: "DetailPage" },
  { keywords: ["card", "grid", "카드"], id: "CardGrid" },
];

/**
 * Mock parser — AI comes later.
 * Picks registry patterns from simple keywords; falls back to Dashboard + CardGrid.
 */
export function parsePrompt(prompt: string): ParseResult {
  const lower = prompt.toLowerCase();
  const matched = KEYWORD_MAP.filter(({ keywords }) =>
    keywords.some((keyword) => lower.includes(keyword)),
  ).map(({ id }) => id);

  const uniqueIds = [...new Set(matched)];
  const ids: PatternId[] =
    uniqueIds.length > 0 ? uniqueIds : ["Dashboard", "CardGrid"];

  return {
    patterns: ids
      .filter((id) => getPattern(id))
      .map((id) => ({ id })),
  };
}
