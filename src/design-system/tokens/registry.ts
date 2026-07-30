import { colorTokens } from "./color";
import { densityTokens } from "./density";
import { motionTokens } from "./motion";
import { radiusTokens } from "./radius";
import { elevationTokens, shadowTokens } from "./shadow";
import { spacingAliasTokens, spacingTokens } from "./spacing";
import { typographyTokens } from "./typography";
import type { TokenCategory, TokenEntry } from "./types";

const ALL_TOKENS: TokenEntry[] = [
  ...colorTokens,
  ...typographyTokens,
  ...spacingTokens,
  ...spacingAliasTokens,
  ...radiusTokens,
  ...elevationTokens,
  ...shadowTokens,
  ...densityTokens,
  ...motionTokens,
];

const tokenMap = new Map<string, TokenEntry>(
  ALL_TOKENS.map((token) => [token.id, token]),
);

export function listTokens(): TokenEntry[] {
  return ALL_TOKENS;
}

export function listCategories(): TokenCategory[] {
  return [
    "color",
    "typography",
    "spacing",
    "radius",
    "elevation",
    "shadow",
    "density",
    "motion",
  ];
}

export function getToken(id: string): TokenEntry | undefined {
  return tokenMap.get(id);
}

export function requireToken(id: string): TokenEntry {
  const token = getToken(id);
  if (!token) {
    throw new Error(`Unknown design token: ${id}`);
  }
  return token;
}

export function getTokensByCategory(category: TokenCategory): TokenEntry[] {
  return ALL_TOKENS.filter((token) => token.category === category);
}

export function getTokenValue(id: string): string | undefined {
  return getToken(id)?.value;
}

/** CSS var() reference string for use in component styles */
export function tokenVar(id: string): string {
  const token = requireToken(id);
  return `var(${token.cssVar})`;
}

/**
 * Compact, JSON-serializable catalog for future AI / parser context.
 */
export function getTokenCatalog(): {
  version: "1.0";
  categories: TokenCategory[];
  tokens: Array<
    Pick<TokenEntry, "id" | "category" | "value" | "cssVar" | "description" | "usage">
  >;
} {
  return {
    version: "1.0",
    categories: listCategories(),
    tokens: ALL_TOKENS.map(
      ({ id, category, value, cssVar, description, usage }) => ({
        id,
        category,
        value,
        cssVar,
        description,
        usage,
      }),
    ),
  };
}

/** Build :root CSS custom properties from the registry */
export function buildRootCssVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const token of ALL_TOKENS) {
    if (token.category === "density") continue;
    vars[token.cssVar] = token.value;
  }
  vars["--color-background"] = requireToken("color.grey.100").value;
  vars["--color-foreground"] = requireToken("color.grey.900").value;
  vars["--color-muted-foreground"] = requireToken("color.grey.600").value;
  vars["--color-border"] = requireToken("color.grey.400").value;
  vars["--color-card"] = requireToken("color.grey.0").value;
  vars["--color-primary"] = requireToken("color.primary.500").value;
  vars["--color-primary-foreground"] = requireToken("color.grey.0").value;
  vars["--color-danger"] = requireToken("color.semantic.danger").value;
  vars["--color-success"] = requireToken("color.semantic.success").value;
  vars["--color-warning"] = requireToken("color.semantic.warning").value;
  vars["--radius-md"] = requireToken("radius.8").value;
  vars["--shadow-sm"] = requireToken("elevation.1").value;
  return vars;
}
