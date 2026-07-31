export { parsePrompt, parsePromptToComposition } from "./parser";
export { getPattern, listPatterns, patternRegistry } from "./registry";
export { ScreenRenderer } from "./renderer/ScreenRenderer";
export { CompositionRenderer } from "./renderer/CompositionRenderer";
export { ComposedScreen } from "./renderer/ComposedScreen";
export { mockGenerate, generateFromPrompt } from "./pipeline";
export {
  composeScreen,
  resolveMaterials,
  suggestSurfaceFromPrompt,
  classifyArchetype,
  ARCHETYPE_CHECKLIST,
  assertChecklist,
  checklistSummary,
  type LayoutArchetype,
  type LayoutMaterials,
  type ComposedSection,
} from "./compose";
export {
  buildDesignContract,
  columnHintsFromWidth,
  densityFromSetup,
  designContractCssVariables,
  DESIGN_GRID_COLUMNS,
  DESIGN_PAGE_SIZES,
  DESIGN_RESOLUTIONS,
  DEFAULT_PAGE_SIZE,
  isTightComfortable,
  totalPagesFor,
  type ColumnHints,
  type DesignContract,
  type DesignDensity,
  type DesignPageSize,
  type DesignResolution,
  type DesignResolutionId,
  type DesignSetupSnapshot,
  type DesignSurface,
  type DesignThemeId,
} from "./designContract";
