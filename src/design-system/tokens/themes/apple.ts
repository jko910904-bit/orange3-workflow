/** Preview theme ids — never claim “official Apple Design System”. */
export type PreviewThemeId = "default" | "apple";

export const APPLE_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';

/** System-like blue used when Apple-inspired + default 파랑 swatch. */
export const APPLE_BLUE = {
  primary: "#007AFF",
  secondary: "#0066D6",
} as const;

/**
 * Soft style token overrides for the generator preview root.
 * Applied under [data-theme="apple"] (UI label: 「소프트」) — system fonts only.
 */
export const applePreviewCssVariables: Record<string, string> = {
  "--typography-fontFamily-sans": APPLE_FONT_STACK,

  /* Controls ~10px, cards ~14px */
  "--radius-4": "10px",
  "--radius-8": "12px",
  "--radius-16": "16px",
  "--radius-sm": "10px",
  "--radius-md": "12px",
  "--radius-lg": "16px",
  "--radius-control": "10px",
  "--preview-radius-control": "10px",
  "--preview-radius-card": "14px",

  /* Softer greys (iOS-ish neutrals) */
  "--color-grey-50": "#F9F9FB",
  "--color-grey-100": "#F2F2F7",
  "--color-grey-200": "#E5E5EA",
  "--color-grey-300": "#D1D1D6",
  "--color-grey-400": "#C7C7CC",
  "--color-grey-500": "#8E8E93",
  "--color-grey-600": "#636366",
  "--color-grey-700": "#48484A",
  "--color-grey-800": "#3A3A3C",
  "--color-grey-900": "#1C1C1E",

  /* Admin / Portal chrome bridges (shells read these with fallbacks) */
  "--preview-line": "#E5E5EA",
  "--preview-muted": "#8E8E93",
  "--preview-lnb": "#F2F2F7",
  "--preview-surface-soft": "#F9F9FB",

  /* Default system blue — primary picker still overrides --preview-primary */
  "--color-primary-100": "#E5F1FF",
  "--color-primary-500": APPLE_BLUE.primary,
  "--color-primary-700": APPLE_BLUE.secondary,
  "--color-primary-900": "#0040A8",

  /* Slightly softer elevation */
  "--elevation-1": "0 1px 3px 0 rgb(0 0 0 / 0.06)",
  "--elevation-2": "0 2px 10px 0 rgb(0 0 0 / 0.08)",
  "--elevation-3":
    "0 8px 28px -4px rgb(0 0 0 / 0.10), 0 2px 8px -2px rgb(0 0 0 / 0.06)",
  "--elevation-4":
    "0 16px 40px -6px rgb(0 0 0 / 0.12), 0 4px 12px -2px rgb(0 0 0 / 0.08)",

  /* Mild control padding via spacing used by button horizontal padding */
  "--spacing-16": "18px",
  "--spacing-18": "20px",
  "--spacing-20": "22px",
};
