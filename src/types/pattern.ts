export type PatternId =
  | "SearchFilterTable"
  | "ChartKpi"
  | "Login"
  | "CRUD"
  | "Dashboard"
  | "Detail"
  | "Form"
  | "Wizard";

export type PatternDefinition = {
  id: PatternId;
  name: string;
  description: string;
  /** Soft hints for mock/AI parser */
  keywords?: string[];
};

export type PatternRef = {
  id: PatternId;
};

export type ParseResult = {
  patterns: PatternRef[];
};
