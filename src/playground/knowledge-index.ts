/**
 * JKO Knowledge Explorer — unified searchable index (Phase 1).
 * Sources: UX_PATTERNS · COMPONENT_DOCS · RECIPE_CATALOG · decision rules.
 * Recipe Browser detail = Phase 2 (`/recipes`, `/recipes/[id]`).
 */

import { COMPONENT_DOCS } from "@/playground/catalog";
import { BUTTON_RULES, OVERLAY_RULES } from "@/playground/decision-rules";
import { UX_DECISION_TREE } from "@/playground/decision-tree";
import { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
import { NEVER_ALWAYS } from "@/playground/never-always";
import {
  RECIPE_CATALOG,
  type RecipeBrowseCategory,
  type RecipeCatalogEntry,
} from "@/playground/recipe-catalog";
import { UX_PATTERNS } from "@/playground/ux-patterns";
import { JKO_UX_RULES } from "@/playground/ux-principles";

export type KnowledgeKind =
  | "pattern"
  | "component"
  | "recipe"
  | "decision-rule";

export type KnowledgeEntry = {
  id: string;
  kind: KnowledgeKind;
  title: string;
  summary: string;
  tags?: string[];
  href?: string;
  meta?: Record<string, string>;
  /** Precomputed lowercase blob for client filter */
  searchText: string;
};

export type RecipeCategory = RecipeBrowseCategory;

export type RecipeIndexEntry = {
  id: string;
  name: string;
  category: RecipeCategory;
  patternChain: string;
  knowledgePath: string;
  /** Live screen when documented under /screens */
  liveScreenHref?: string;
  /** Recipe Browser detail */
  recipeHref: string;
};

function toIndexEntry(r: RecipeCatalogEntry): RecipeIndexEntry {
  return {
    id: r.id,
    name: r.title,
    category: r.category,
    patternChain: r.patternChain,
    knowledgePath: r.knowledgePath ?? "",
    liveScreenHref: r.liveHref,
    recipeHref: `/recipes/${r.id}`,
  };
}

/** Derived from RECIPE_CATALOG (18 screen recipes). */
export const RECIPE_INDEX: readonly RecipeIndexEntry[] =
  RECIPE_CATALOG.map(toIndexEntry);

function flattenParts(parts: unknown[]): string[] {
  const out: string[] = [];
  for (const p of parts) {
    if (p == null) continue;
    if (typeof p === "string") {
      out.push(p);
    } else if (Array.isArray(p)) {
      out.push(...flattenParts(p));
    } else if (typeof p === "number" || typeof p === "boolean") {
      out.push(String(p));
    }
  }
  return out;
}

function blob(...parts: unknown[]) {
  return flattenParts(parts).join(" ").toLowerCase();
}

function patternEntries(): KnowledgeEntry[] {
  return UX_PATTERNS.map((p) => ({
    id: `pattern:${p.id}`,
    kind: "pattern" as const,
    title: p.name,
    summary: p.description,
    tags: [p.group, p.status, ...(p.aliases ?? [])],
    href: `/patterns/${p.id}`,
    meta: {
      group: p.group,
      useCase: p.useCase,
      status: p.status,
    },
    searchText: blob(
      p.id,
      p.name,
      p.description,
      p.useCase,
      p.uxGoal,
      p.goals,
      p.userTasks,
      p.includedComponents,
      p.parts,
      p.aliases,
      p.group,
      p.relatedPatterns,
    ),
  }));
}

function componentEntries(): KnowledgeEntry[] {
  return COMPONENT_DOCS.map((c) => ({
    id: `component:${c.slug}`,
    kind: "component" as const,
    title: c.name,
    summary: c.summary,
    tags: [c.status, c.registryName],
    href: `/components/${c.slug}`,
    meta: {
      registryName: c.registryName,
      status: c.status,
      slug: c.slug,
    },
    searchText: blob(c.slug, c.name, c.summary, c.registryName, c.status),
  }));
}

function recipeEntries(): KnowledgeEntry[] {
  return RECIPE_INDEX.map((r) => ({
    id: `recipe:${r.id}`,
    kind: "recipe" as const,
    title: r.name,
    summary: r.patternChain,
    tags: [r.category],
    href: r.recipeHref,
    meta: {
      category: r.category,
      patternChain: r.patternChain,
      knowledgePath: r.knowledgePath,
      ...(r.liveScreenHref ? { liveScreen: r.liveScreenHref } : {}),
    },
    searchText: blob(
      r.id,
      r.name,
      r.category,
      r.patternChain,
      r.knowledgePath,
      "recipe",
      "업무 화면",
    ),
  }));
}

function decisionRuleEntries(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  for (const rule of JKO_UX_RULES) {
    entries.push({
      id: `decision-rule:ux-${rule.key}`,
      kind: "decision-rule",
      title: `UX Rule #${rule.id}: ${rule.key}`,
      summary: rule.statement,
      tags: ["jko-ux-rules", rule.key],
      href: "/principles",
      meta: { group: "JKO UX Rules", key: rule.key },
      searchText: blob(
        "ux rule",
        String(rule.id),
        rule.key,
        rule.statement,
        "jko",
      ),
    });
  }

  for (const rule of NEVER_ALWAYS.never) {
    entries.push({
      id: `decision-rule:never-${rule.id}`,
      kind: "decision-rule",
      title: `Never: ${rule.statement}`,
      summary: NEVER_ALWAYS.summary,
      tags: ["never", ...(rule.alignsWith ?? [])],
      href: "/principles#never-always",
      meta: { group: "Never", side: "never" },
      searchText: blob(
        "never",
        rule.id,
        rule.statement,
        rule.alignsWith,
        NEVER_ALWAYS.title,
      ),
    });
  }

  for (const rule of NEVER_ALWAYS.always) {
    entries.push({
      id: `decision-rule:always-${rule.id}`,
      kind: "decision-rule",
      title: `Always: ${rule.statement}`,
      summary: NEVER_ALWAYS.summary,
      tags: ["always", ...(rule.alignsWith ?? [])],
      href: "/principles#never-always",
      meta: { group: "Always", side: "always" },
      searchText: blob(
        "always",
        rule.id,
        rule.statement,
        rule.alignsWith,
        NEVER_ALWAYS.title,
      ),
    });
  }

  for (const node of UX_DECISION_TREE.nodes) {
    const pathBits = [
      ...(node.yes?.path ?? []),
      ...(node.no?.path ?? []),
      ...(node.nested?.yes.path ?? []),
      ...(node.nested?.no.path ?? []),
    ];
    entries.push({
      id: `decision-rule:tree-${node.id}`,
      kind: "decision-rule",
      title: node.question,
      summary: pathBits.length
        ? `→ ${pathBits.join(" · ")}`
        : UX_DECISION_TREE.summary,
      tags: ["decision-tree", ...(node.related ?? [])],
      href: "/principles/decision-tree",
      meta: { group: "UX Decision Tree", nodeId: node.id },
      searchText: blob(
        "decision tree",
        node.id,
        node.question,
        node.nested?.question,
        pathBits,
        node.related,
      ),
    });
  }

  entries.push({
    id: `decision-rule:${BUTTON_RULES.id}`,
    kind: "decision-rule",
    title: BUTTON_RULES.title,
    summary: BUTTON_RULES.summary,
    tags: ["button", ...BUTTON_RULES.variants.map((v) => v.variant)],
    href: "/principles#button-rules",
    meta: { group: "Button variants" },
    searchText: blob(
      BUTTON_RULES.id,
      BUTTON_RULES.title,
      BUTTON_RULES.summary,
      BUTTON_RULES.variants.map((v) => [v.variant, v.when, ...v.conditions]),
      Object.values(BUTTON_RULES.apply),
    ),
  });

  for (const v of BUTTON_RULES.variants) {
    entries.push({
      id: `decision-rule:button-${v.variant}`,
      kind: "decision-rule",
      title: `Button · ${v.variant}`,
      summary: v.when,
      tags: ["button", v.variant],
      href: "/principles#button-rules",
      meta: { group: "Button variants", variant: v.variant },
      searchText: blob(
        "button",
        v.variant,
        v.when,
        v.conditions,
        v.note,
      ),
    });
  }

  entries.push({
    id: `decision-rule:${OVERLAY_RULES.id}`,
    kind: "decision-rule",
    title: OVERLAY_RULES.title,
    summary: OVERLAY_RULES.summary,
    tags: ["overlay", "modal", "drawer", "bottom-sheet"],
    href: "/principles#overlay-rules",
    meta: { group: "Overlay surfaces" },
    searchText: blob(
      OVERLAY_RULES.id,
      OVERLAY_RULES.title,
      OVERLAY_RULES.summary,
      OVERLAY_RULES.modal.when,
      OVERLAY_RULES.modal.conditions,
      OVERLAY_RULES.drawer.when,
      OVERLAY_RULES.drawer.conditions,
      OVERLAY_RULES.bottomSheet.when,
      OVERLAY_RULES.bottomSheet.conditions,
      Object.values(OVERLAY_RULES.apply),
    ),
  });

  for (const side of [
    OVERLAY_RULES.modal,
    OVERLAY_RULES.drawer,
    OVERLAY_RULES.bottomSheet,
  ]) {
    entries.push({
      id: `decision-rule:overlay-${side.kind.toLowerCase().replace(/\s+/g, "-")}`,
      kind: "decision-rule",
      title: `Overlay · ${side.kind}`,
      summary: side.when,
      tags: ["overlay", side.kind.toLowerCase()],
      href: "/principles#overlay-rules",
      meta: { group: "Overlay surfaces", kind: side.kind },
      searchText: blob("overlay", side.kind, side.when, side.conditions),
    });
  }

  entries.push({
    id: `decision-rule:${DRAWER_VS_PAGE.id}`,
    kind: "decision-rule",
    title: DRAWER_VS_PAGE.title,
    summary: DRAWER_VS_PAGE.summary,
    tags: ["drawer", "page", "navigation"],
    href: "/principles#drawer-vs-page",
    meta: { group: "Drawer vs Page" },
    searchText: blob(
      DRAWER_VS_PAGE.id,
      DRAWER_VS_PAGE.title,
      DRAWER_VS_PAGE.summary,
      DRAWER_VS_PAGE.drawer.when,
      DRAWER_VS_PAGE.drawer.conditions,
      DRAWER_VS_PAGE.page.when,
      DRAWER_VS_PAGE.page.conditions,
      Object.values(DRAWER_VS_PAGE.apply),
    ),
  });

  return entries;
}

export const KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  ...patternEntries(),
  ...componentEntries(),
  ...recipeEntries(),
  ...decisionRuleEntries(),
];

export type KnowledgeKindFilter = KnowledgeKind | "all";

export function countByKind(
  entries: readonly KnowledgeEntry[] = KNOWLEDGE_ENTRIES,
): Record<KnowledgeKind | "all", number> {
  const counts: Record<KnowledgeKind | "all", number> = {
    all: entries.length,
    pattern: 0,
    component: 0,
    recipe: 0,
    "decision-rule": 0,
  };
  for (const e of entries) {
    counts[e.kind] += 1;
  }
  return counts;
}

export function searchKnowledge(
  query: string,
  kindFilter: KnowledgeKindFilter = "all",
  entries: readonly KnowledgeEntry[] = KNOWLEDGE_ENTRIES,
): KnowledgeEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter((e) => {
    if (kindFilter !== "all" && e.kind !== kindFilter) return false;
    if (!q) return true;
    return e.searchText.includes(q) || e.title.toLowerCase().includes(q);
  });
}

export const KIND_LABELS: Record<KnowledgeKind, string> = {
  pattern: "Pattern",
  component: "Component",
  recipe: "Recipe",
  "decision-rule": "Decision Rule",
};
