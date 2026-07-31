/**
 * Screen composition — Prompt Parser output consumed by Renderer.
 * Nodes reference Component Registry ids + variants (e.g. Button.Primary).
 * Composed mode carries sections built from DesignContract materials.
 */

import type { DesignContract } from "../generator/designContract";
import type {
  ComposedSection,
  LayoutArchetype,
} from "../generator/compose/types";

export type CompositionNode = {
  /** Stable React key */
  id: string;
  /** Registry component name */
  component: "Button" | "Input" | "Checkbox" | string;
  /** Variant / kind from AI Metadata (Primary, Email, Password…) */
  variant?: string;
  size?: string;
  props?: Record<string, unknown>;
  label?: string;
};

export type ScreenComposition = {
  version: "1.0";
  intent: string;
  prompt: string;
  surface: "admin" | "portal";
  /** Human-readable recipe e.g. Button.Primary, Input.Email */
  recipe: string[];
  nodes: CompositionNode[];
  /** Setup snapshot — shown in 소스 보기 Composition tab when present */
  designContract?: DesignContract;
  /**
   * composed = materials-driven new layout (default generate path)
   * reference = optional Real Example short-circuit
   */
  mode?: "composed" | "reference";
  archetype?: LayoutArchetype;
  title?: string;
  sections?: ComposedSection[];
};
