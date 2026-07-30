export type PlaygroundNavItem = {
  href: string;
  label: string;
  description: string;
};

export const PLAYGROUND_NAV: PlaygroundNavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "Design System × AI Screen Generator overview",
  },
  {
    href: "/foundations",
    label: "Foundations",
    description: "Tokens · Color · Typography · Spacing · Density",
  },
  {
    href: "/components",
    label: "Components",
    description: "Variant · Size · State · Code · AI Metadata",
  },
  {
    href: "/patterns",
    label: "Patterns",
    description: "SearchFilterTable · ChartKpi · Login · …",
  },
  {
    href: "/templates",
    label: "Templates",
    description: "Dashboard · List · Detail · Form (roadmap)",
  },
  {
    href: "/ai-metadata",
    label: "AI Metadata",
    description: "Purpose · Aliases · Rules · Figma mapping",
  },
  {
    href: "/prompt",
    label: "Prompt Playground",
    description: "Natural language → component recipe simulation",
  },
  {
    href: "/registry",
    label: "Registry Viewer",
    description: "JSON export for MCP / RAG / Agents",
  },
];

export type ComponentDocEntry = {
  slug: string;
  name: string;
  registryName: string;
  summary: string;
  status: "ready" | "partial" | "planned";
};

export const COMPONENT_DOCS: ComponentDocEntry[] = [
  {
    slug: "button",
    name: "Button",
    registryName: "Button",
    summary: "Primary actions with variants, sizes, icons, and loading.",
    status: "ready",
  },
  {
    slug: "input",
    name: "Input",
    registryName: "Input",
    summary: "Text, Email, Password, Search, Number fields.",
    status: "ready",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    registryName: "Checkbox",
    summary: "Binary choice for remember-me and agreements.",
    status: "ready",
  },
  {
    slug: "card",
    name: "Card",
    registryName: "Card",
    summary: "Header / Body / Footer surface with elevation.",
    status: "partial",
  },
  {
    slug: "table",
    name: "Table",
    registryName: "Table",
    summary: "Dense/Comfortable data table with sort and pagination.",
    status: "partial",
  },
];
