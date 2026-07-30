export type PatternId =
  | "SearchTable"
  | "Dashboard"
  | "CardGrid"
  | "DetailPage"
  | "Login";

export type PatternDefinition = {
  id: PatternId;
  name: string;
  description: string;
};

export type PatternRef = {
  id: PatternId;
};

export type ParseResult = {
  patterns: PatternRef[];
};
