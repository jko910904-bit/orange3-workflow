import type { PatternDefinition, PatternId } from "@/types";

export const patternRegistry: PatternDefinition[] = [
  {
    id: "SearchTable",
    name: "Search Table",
    description: "Searchable data table with filters and pagination.",
  },
  {
    id: "Dashboard",
    name: "Dashboard",
    description: "Overview metrics, charts, and summary widgets.",
  },
  {
    id: "CardGrid",
    name: "Card Grid",
    description: "Responsive grid of content cards.",
  },
  {
    id: "DetailPage",
    name: "Detail Page",
    description: "Entity detail view with sections and actions.",
  },
  {
    id: "Login",
    name: "Login",
    description: "Authentication form with credentials fields.",
  },
];

const patternMap = Object.fromEntries(
  patternRegistry.map((pattern) => [pattern.id, pattern]),
) as Record<PatternId, PatternDefinition>;

export function getPattern(id: PatternId): PatternDefinition | undefined {
  return patternMap[id];
}

export function listPatterns(): PatternDefinition[] {
  return patternRegistry;
}
