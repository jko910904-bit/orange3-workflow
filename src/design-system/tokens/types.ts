export type TokenCategory =
  | "color"
  | "typography"
  | "spacing"
  | "radius"
  | "elevation"
  | "shadow"
  | "density"
  | "motion";

/**
 * Generator-friendly token entry.
 * Components and AI must resolve values via id / cssVar — never hardcode kit values.
 */
export type TokenEntry = {
  /** Dot-path id, e.g. "color.primary.500" */
  id: string;
  category: TokenCategory;
  /** Resolved CSS value */
  value: string;
  /** CSS custom property name, e.g. "--color-primary-500" */
  cssVar: string;
  description?: string;
  /** Soft hints for future component/AI usage */
  usage?: string[];
};

export function idToCssVar(id: string): string {
  return `--${id.replace(/\./g, "-")}`;
}

export function defineToken(
  id: string,
  category: TokenCategory,
  value: string,
  meta?: Pick<TokenEntry, "description" | "usage">,
): TokenEntry {
  return {
    id,
    category,
    value,
    cssVar: idToCssVar(id),
    ...meta,
  };
}
