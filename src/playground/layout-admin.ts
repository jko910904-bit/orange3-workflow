/**
 * Admin layout grid — canonical desktop frame for Admin surfaces.
 *
 * ```
 * Admin · 12 Grid · Desktop 1440 · Sidebar 240 · Content Fluid
 * ```
 *
 * CSS vars (also registered as design tokens under category `layout`):
 * - `--admin-canvas`  — max frame width
 * - `--admin-sidebar` — fixed LNB width
 * - `--admin-columns` — content-area column count
 * - `--admin-content` — fluid track (`minmax(0, 1fr)`)
 *
 * Source of truth for foundations `/foundations#grid` and Admin shell CSS.
 */

export const ADMIN_LAYOUT = {
  /** Desktop canvas / max frame (px) */
  canvas: 1440,
  /** Fixed LNB / sidebar width (px) */
  sidebar: 240,
  /** 12-column grid inside the content area */
  columns: 12,
  /** Content fills remaining width after sidebar */
  content: "fluid",
} as const;

export type AdminLayout = typeof ADMIN_LAYOUT;

/** CSS custom property names */
export const ADMIN_LAYOUT_CSS_VAR_NAMES = {
  canvas: "--admin-canvas",
  sidebar: "--admin-sidebar",
  columns: "--admin-columns",
  content: "--admin-content",
} as const;

/** Resolved CSS variable map for inline / shell application */
export const ADMIN_LAYOUT_CSS_VARS: Record<string, string> = {
  [ADMIN_LAYOUT_CSS_VAR_NAMES.canvas]: `${ADMIN_LAYOUT.canvas}px`,
  [ADMIN_LAYOUT_CSS_VAR_NAMES.sidebar]: `${ADMIN_LAYOUT.sidebar}px`,
  [ADMIN_LAYOUT_CSS_VAR_NAMES.columns]: String(ADMIN_LAYOUT.columns),
  /** Fluid content track next to fixed sidebar */
  [ADMIN_LAYOUT_CSS_VAR_NAMES.content]: "minmax(0, 1fr)",
};

/** Shell grid template: fixed sidebar + fluid content */
export const ADMIN_SHELL_GRID_COLUMNS = `var(--admin-sidebar, ${ADMIN_LAYOUT.sidebar}px) var(--admin-content, minmax(0, 1fr))`;

/** Content-area 12-col template */
export const ADMIN_CONTENT_GRID_COLUMNS = `repeat(var(--admin-columns, ${ADMIN_LAYOUT.columns}), minmax(0, 1fr))`;

export function adminContentWidthExpr(
  sidebarPx: number = ADMIN_LAYOUT.sidebar,
): string {
  return `calc(100% - ${sidebarPx}px)`;
}
