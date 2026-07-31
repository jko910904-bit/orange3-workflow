/**
 * Design contracts for kit-bound composition (playground / deferred Composer).
 * Setup inputs become hard layout/token rules (not vibes) flowing
 * generate → preview → 소스 보기.
 */

import { ADMIN_LAYOUT } from "@/playground/layout-admin";

export type DesignResolutionId = "fhd" | "qhd" | "laptop";
export type DesignSurface = "admin" | "portal";
export type DesignThemeId = "default" | "apple";
export type DesignDensity = "dense" | "comfortable";

/** Visible list/grid items per page (notice, member, FAQ, product). */
export type DesignPageSize = 10 | 20 | 30 | 50;

export const DESIGN_PAGE_SIZES: readonly DesignPageSize[] = [
  10, 20, 30, 50,
] as const;

export const DEFAULT_PAGE_SIZE: DesignPageSize = 10;

export function totalPagesFor(
  totalCount: number,
  pageSize: number,
): number {
  return Math.max(1, Math.ceil(Math.max(0, totalCount) / Math.max(1, pageSize)));
}

export type DesignResolution = {
  id: DesignResolutionId;
  label: string;
  width: number;
  height: number;
};

export const DESIGN_RESOLUTIONS: Record<DesignResolutionId, DesignResolution> =
  {
    fhd: { id: "fhd", label: "FHD", width: 1920, height: 1080 },
    qhd: { id: "qhd", label: "QHD", width: 2560, height: 1440 },
    laptop: { id: "laptop", label: "Laptop", width: 1440, height: 900 },
  };

/** Admin / Bootstrap 12-column grid — aligns with ADMIN_LAYOUT.columns */
export const DESIGN_GRID_COLUMNS = ADMIN_LAYOUT.columns;

/** Admin desktop canvas (px) — aligns with ADMIN_LAYOUT.canvas */
export const DESIGN_ADMIN_CANVAS = ADMIN_LAYOUT.canvas;

/** Admin LNB width (px) — aligns with ADMIN_LAYOUT.sidebar */
export const DESIGN_ADMIN_SIDEBAR = ADMIN_LAYOUT.sidebar;

/**
 * Filter/card column suggestions from content width.
 * width ≥ 1440 → denser; 1200 mid; 960 roomier.
 */
export type ColumnHints = {
  /** Suggested filter-field columns (Admin filter strip). */
  filterCols: number;
  /** Suggested card/KPI columns. */
  cardCols: number;
};

export function columnHintsFromWidth(width: number): ColumnHints {
  if (width >= 1440) return { filterCols: 5, cardCols: 4 };
  if (width >= 1200) return { filterCols: 4, cardCols: 3 };
  return { filterCols: 3, cardCols: 2 };
}

/**
 * Density from surface:
 * - Admin → dense
 * - Portal → comfortable (laptop tightness via isTightComfortable / CSS)
 */
export function densityFromSetup(surface: DesignSurface): DesignDensity {
  if (surface === "admin") return "dense";
  return "comfortable";
}

/** True when Portal + laptop — slightly tighter comfortable overrides. */
export function isTightComfortable(
  surface: DesignSurface,
  resolution: DesignResolutionId,
): boolean {
  return surface === "portal" && resolution === "laptop";
}

export type DesignSetupSnapshot = {
  resolution: DesignResolutionId;
  /** Content max-width (px): 960 | 1200 | 1440 */
  width: number;
  /** Grid gutter (px): 16 | 24 | 32 */
  gap: number;
  primary: string;
  secondary: string;
  theme: DesignThemeId;
  surface: DesignSurface;
  /** Items visible per page — default 10. */
  pageSize?: DesignPageSize;
};

/** Full contract attached to GenerateResult / Composition for 소스 보기. */
export type DesignContract = {
  resolution: DesignResolution;
  grid: {
    columns: typeof DESIGN_GRID_COLUMNS;
    alignment: "center";
    width: number;
    gap: number;
  };
  color: {
    primary: string;
    secondary: string;
  };
  theme: DesignThemeId;
  surface: DesignSurface;
  density: DesignDensity;
  /** Portal+laptop → slightly tighter comfortable row/padding. */
  densityTight: boolean;
  columnHints: ColumnHints;
  /** Visible list/grid items per screen. */
  pageSize: DesignPageSize;
};

export function buildDesignContract(setup: DesignSetupSnapshot): DesignContract {
  const resolution =
    DESIGN_RESOLUTIONS[setup.resolution] ?? DESIGN_RESOLUTIONS.fhd;
  const density = densityFromSetup(setup.surface);
  const pageSize =
    setup.pageSize && DESIGN_PAGE_SIZES.includes(setup.pageSize)
      ? setup.pageSize
      : DEFAULT_PAGE_SIZE;
  return {
    resolution,
    grid: {
      columns: DESIGN_GRID_COLUMNS,
      alignment: "center",
      width: setup.width,
      gap: setup.gap,
    },
    color: {
      primary: setup.primary,
      secondary: setup.secondary,
    },
    theme: setup.theme,
    surface: setup.surface,
    density,
    densityTight: isTightComfortable(setup.surface, setup.resolution),
    columnHints: columnHintsFromWidth(setup.width),
    pageSize,
  };
}

/** Density CSS values exposed as --preview-density-* / --preview-font-*. */
function densityPreviewVars(
  density: DesignDensity,
  tight: boolean,
): Record<string, string> {
  if (density === "dense") {
    return {
      "--preview-density-row": "40px",
      "--preview-density-section": "14px",
      "--preview-density-filter-pad": "12px",
      "--preview-font-body": "14px",
      "--table-row-height": "40px",
      "--section-gap": "16px",
      "--font-size-base": "14px",
    };
  }
  /* comfortable — laptop portal slightly tighter */
  if (tight) {
    return {
      "--preview-density-row": "44px",
      "--preview-density-section": "20px",
      "--preview-density-filter-pad": "14px",
      "--preview-font-body": "15px",
      "--table-row-height": "44px",
      "--section-gap": "20px",
      "--font-size-base": "15px",
    };
  }
  return {
    "--preview-density-row": "48px",
    "--preview-density-section": "24px",
    "--preview-density-filter-pad": "16px",
    "--preview-font-body": "16px",
    "--table-row-height": "48px",
    "--section-gap": "24px",
    "--font-size-base": "16px",
  };
}

/**
 * CSS variables for the preview root.
 * Always sets primary/secondary bridges, grid, density, and column hints.
 */
export function designContractCssVariables(
  contract: DesignContract,
): Record<string, string> {
  const { grid, color, columnHints, density, densityTight } = contract;
  return {
    "--preview-width": `${grid.width}px`,
    "--preview-gap": `${grid.gap}px`,
    "--preview-columns": String(grid.columns),
    /* aliases kept for older preview CSS */
    "--preview-content-width": `${grid.width}px`,
    "--preview-cols": String(grid.columns),
    "--preview-primary": color.primary,
    "--preview-secondary": color.secondary,
    "--portal-blue": color.primary,
    "--portal-blue-dark": color.secondary,
    "--admin-blue": color.primary,
    "--admin-blue-dark": color.secondary,
    "--color-primary-500": color.primary,
    "--color-primary-700": color.secondary,
    "--preview-filter-cols": String(columnHints.filterCols),
    "--preview-card-cols": String(columnHints.cardCols),
    ...densityPreviewVars(density, densityTight),
  };
}
