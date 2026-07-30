import type { ComponentAiMetadata } from "@/types/ai-metadata";

export const checkboxAiMetadata: ComponentAiMetadata = {
  component: "Checkbox",
  purpose: "Binary Choice",
  usage: ["Remember me", "Agree to terms", "Multi-select row", "Filter option"],
  avoid: ["Single exclusive choice (use Radio)", "Submit action"],
  aliases: ["Check", "Remember me", "약관 동의", "로그인 유지", "체크박스"],
  dependencies: ["Color", "Typography", "Spacing", "Motion"],
  variants: ["Default"],
  sizes: ["S", "M"],
  states: ["Default", "Hover", "Focus", "Checked", "Disabled", "Indeterminate"],
  accessibility: [
    "Keyboard Navigation",
    "Focus Ring",
    "Label association",
    "ARIA checked",
  ],
  aiRules: [
    {
      id: "checkbox.remember",
      when: { anyOf: ["remember", "로그인 유지", "keep me", "약관", "동의"] },
      then: { component: "Checkbox" },
      reason: "Opt-in / remember flows use Checkbox.",
    },
  ],
  figmaMapping: [
    "Checkbox/Default",
    "Checkbox/Checked",
    "Checkbox/Disabled",
  ],
  confidence: 0.9,
  priority: 70,
  category: "input",
  compatibleWith: ["Input", "Button", "Form", "Login"],
  generatedByAI: false,
  version: "1.0.0",
};
