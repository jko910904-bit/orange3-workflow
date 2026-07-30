/**
 * Screen composition — Prompt Parser output consumed by Renderer.
 * Nodes reference Component Registry ids + variants (e.g. Button.Primary).
 */

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
};
