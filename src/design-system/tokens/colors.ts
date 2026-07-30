export const colors = {
  white: "#ffffff",
  black: "#09090b",
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  red: {
    50: "#fef2f2",
    500: "#ef4444",
    600: "#dc2626",
  },
  green: {
    50: "#f0fdf4",
    500: "#22c55e",
    600: "#16a34a",
  },
  amber: {
    50: "#fffbeb",
    500: "#f59e0b",
    600: "#d97706",
  },
} as const;

export const semanticColors = {
  background: colors.zinc[50],
  foreground: colors.zinc[900],
  muted: colors.zinc[100],
  mutedForeground: colors.zinc[500],
  border: colors.zinc[200],
  card: colors.white,
  primary: colors.blue[600],
  primaryForeground: colors.white,
  danger: colors.red[600],
  success: colors.green[600],
  warning: colors.amber[600],
} as const;
