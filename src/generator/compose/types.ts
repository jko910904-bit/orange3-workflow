/**
 * Materials-driven screen composition.
 * Heuristics become layout decisions (filters/columns/sections) — not user-facing essays.
 */

import type { DesignContract, DesignSurface } from "@/generator/designContract";

export type LayoutArchetype =
  | "list-inquiry"
  | "product-catalog"
  | "auth"
  | "dashboard-hub"
  | "content-list"
  | "content-detail"
  | "faq-accordion"
  | "unsupported";

export type DomainId =
  | "product"
  | "member"
  | "contract"
  | "order"
  | "notice"
  | "faq"
  | "account"
  | "generic";

export type FilterFieldSpec = {
  id: string;
  label: string;
  kind: "text" | "select" | "date";
  placeholder?: string;
  options?: string[];
};

export type ColumnSpec = {
  key: string;
  label: string;
  align?: "left" | "right";
  /** Render cell value as a status/role badge */
  badge?: "status" | "role";
};

export type MetricSpec = {
  label: string;
  value: string;
  delta?: string;
};

export type ActionCardSpec = {
  title: string;
  description: string;
  action: string;
};

export type FaqItemSpec = {
  question: string;
  answer: string;
};

export type NoticeRow = {
  no: string;
  title: string;
  date: string;
  pinned?: boolean;
  tags?: string[];
  author?: string;
  category?: string;
};

export type ProductCardSpec = {
  id: string;
  name: string;
  price: string;
  category: string;
  status?: string;
  imageLabel?: string;
  wishlisted?: boolean;
};

export type ProfileSpec = {
  name: string;
  email: string;
  grade: string;
  avatarInitial?: string;
};

export type ToolbarAction = {
  id: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

/** Internal materials resolved from prompt + DesignContract */
export type LayoutMaterials = {
  archetype: LayoutArchetype;
  domain: DomainId;
  surface: DesignSurface;
  title: string;
  description?: string;
  primaryCta: string;
  /** Filter field count capped by contract.columnHints.filterCols */
  filterFields: FilterFieldSpec[];
  columns: ColumnSpec[];
  rows: Record<string, string>[];
  totalCount: number;
  metrics: MetricSpec[];
  cards: ActionCardSpec[];
  faqItems: FaqItemSpec[];
  popularFaq: FaqItemSpec[];
  notices: NoticeRow[];
  products: ProductCardSpec[];
  profile?: ProfileSpec;
  sortOptions: string[];
  toolbarActions: ToolbarAction[];
  detail?: {
    title: string;
    meta: string;
    body: string[];
    attachment?: string;
  };
  navLabel: string;
};

export type ComposedSectionKind =
  | "shell-admin"
  | "shell-portal"
  | "page-header"
  | "filter-bar"
  | "action-toolbar"
  | "bulk-bar"
  | "result-meta"
  | "data-table"
  | "product-grid"
  | "pagination"
  | "kpi-grid"
  | "card-grid"
  | "profile-card"
  | "login-form"
  | "social-login"
  | "search-bar"
  | "notice-list"
  | "article"
  | "prev-next"
  | "list-action"
  | "category-tabs"
  | "faq-list"
  | "popular-faq"
  | "empty-state"
  | "loading-state";

export type ComposedSection = {
  id: string;
  kind: ComposedSectionKind;
  props?: Record<string, unknown>;
};

export type ComposeInput = {
  prompt: string;
  contract: DesignContract;
};
