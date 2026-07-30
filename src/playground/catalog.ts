export type PlaygroundNavItem = {
  href: string;
  label: string;
  description: string;
};

export const PLAYGROUND_NAV: PlaygroundNavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "Progress · Ready status · Recent components",
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
    href: "/recipes",
    label: "Recipes",
    description: "Reusable multi-component UI blocks",
  },
  {
    href: "/patterns",
    label: "Patterns",
    description: "CRUD · Login · Dashboard · Wizard",
  },
  {
    href: "/templates",
    label: "Templates",
    description: "Dashboard · List · Detail · Form",
  },
  {
    href: "/ai-metadata",
    label: "AI Metadata",
    description: "Purpose · Aliases · Rules · Prompt examples",
  },
  {
    href: "/prompt",
    label: "Prompt Playground",
    description: "Natural language → React screen MVP",
  },
  {
    href: "/registry",
    label: "Registry Viewer",
    description: "button.json · recipes · tokens",
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

export const PATTERN_DOCS = [
  {
    id: "CRUD",
    registryId: "SearchFilterTable",
    name: "CRUD",
    description: "Member/admin management: header, filter, table, pagination.",
    components: ["Header", "Search", "Filter", "Table", "Pagination", "Button"],
    recipes: ["PageHeader", "FilterBar", "CrudToolbar"],
    status: "ready" as const,
  },
  {
    id: "Login",
    registryId: "Login",
    name: "Login",
    description: "Authentication form with credentials and submit.",
    components: ["Input.Email", "Input.Password", "Checkbox", "Button.Primary"],
    recipes: ["LoginForm"],
    status: "ready" as const,
  },
  {
    id: "Dashboard",
    registryId: "Dashboard",
    name: "Dashboard",
    description: "KPI tiles and summary widgets.",
    components: ["Card", "Button"],
    recipes: ["ProfileCard"],
    status: "ready" as const,
  },
  {
    id: "Search",
    registryId: "SearchFilterTable",
    name: "Search",
    description: "Search-first list pattern.",
    components: ["Input.Search", "Table", "Pagination"],
    recipes: ["SearchBar", "FilterBar"],
    status: "ready" as const,
  },
  {
    id: "Wizard",
    registryId: "Wizard",
    name: "Wizard",
    description: "Step-by-step process UI.",
    components: ["Card", "Button"],
    recipes: [],
    status: "ready" as const,
  },
  {
    id: "Detail",
    registryId: "Detail",
    name: "Detail",
    description: "Entity detail with sections and CTA.",
    components: ["Card", "Table", "Button"],
    recipes: ["PageHeader"],
    status: "partial" as const,
  },
  {
    id: "Form",
    registryId: "Form",
    name: "Form",
    description: "Multi-section application form.",
    components: ["Input", "Button", "Card"],
    recipes: [],
    status: "partial" as const,
  },
];
