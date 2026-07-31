export type PropDef = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type RelatedPatternLink = {
  id: string;
  name: string;
  href: string;
  note?: string;
};

export type TokenEntry = {
  name: string;
  role: string;
};

/**
 * Primary TOC — Preview-first. Definition / Best Practice / Decision Rule
 * are collapsed disclosures (not primary nav targets).
 */
export const DETAIL_SECTION_IDS = [
  "preview",
  "variants",
  "states",
  "properties",
  "code",
] as const;

export type DetailSectionId = (typeof DETAIL_SECTION_IDS)[number];

export const DETAIL_SECTION_LABELS: Record<DetailSectionId, string> = {
  preview: "Live Preview",
  variants: "Variants",
  states: "States",
  properties: "Properties",
  code: "Code",
};

/** Priority slugs with full Preview-first detail pages */
export const RICH_COMPONENT_SLUGS = [
  "button",
  "input",
  "select",
  "table",
] as const;

export type RichComponentSlug = (typeof RICH_COMPONENT_SLUGS)[number];

export function isRichComponentSlug(slug: string): slug is RichComponentSlug {
  return (RICH_COMPONENT_SLUGS as readonly string[]).includes(slug);
}
