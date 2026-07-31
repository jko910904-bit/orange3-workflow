import { listPatternRegistry } from "@/catalog";
import type { PatternDefinition, PatternId } from "@/types";

/**
 * Pattern Registry bridge — JSON catalog is the source of truth.
 * Extra design-system demo patterns remain for ScreenRenderer previews.
 */
const EXTRA_PATTERNS: PatternDefinition[] = [
  {
    id: "SearchFilterTable",
    name: "Search + Filter + Table",
    description: "Filter bar composed with data table, checkbox, and pagination.",
    keywords: ["search", "filter", "table", "list", "목록", "검색"],
  },
  {
    id: "ChartKpi",
    name: "Chart + KPI",
    description: "KPI metric cards with summary charts.",
    keywords: ["chart", "kpi", "통계", "차트", "지표"],
  },
  {
    id: "Detail",
    name: "Detail",
    description: "Entity detail view with sections and sidebar actions.",
    keywords: ["detail", "상세", "상품상세"],
  },
  {
    id: "Form",
    name: "Form",
    description: "Multi-section form with labeled fields and submit.",
    keywords: ["form", "신청", "등록", "작성"],
  },
  {
    id: "Wizard",
    name: "Wizard",
    description: "Step-by-step process flow with navigation actions.",
    keywords: ["wizard", "step", "절차", "온보딩", "프로세스"],
  },
];

function fromCatalog(): PatternDefinition[] {
  return listPatternRegistry().map((p) => ({
    id: p.id as PatternId,
    name: p.name,
    description: p.description,
    keywords: p.keywords,
  }));
}

export const patternRegistry: PatternDefinition[] = [
  ...fromCatalog(),
  ...EXTRA_PATTERNS,
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
