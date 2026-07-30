import type { ComponentAiMetadata } from "@/types/ai-metadata";

/**
 * Button AI Metadata — reference implementation for all future components.
 * Design Tokens → AI Metadata → Component Registry → Parser → Renderer
 */
export const buttonAiMetadata: ComponentAiMetadata = {
  component: "Button",
  purpose: "Primary Action",
  usage: [
    "Submit Form",
    "Login",
    "Save",
    "Create",
    "Search",
    "Confirm",
    "Continue",
    "Apply",
  ],
  avoid: [
    "Cancel as Primary",
    "Delete Confirmation as Primary",
    "Navigation Link styled as Primary when Ghost/Tertiary is intended",
    "Inline text links",
  ],
  aliases: [
    "Primary Button",
    "CTA Button",
    "Action Button",
    "Submit Button",
    "Save Button",
    "Continue Button",
    "Confirm Button",
    "버튼",
    "저장 버튼",
    "제출 버튼",
  ],
  dependencies: [
    "Color",
    "Typography",
    "Spacing",
    "Radius",
    "Elevation",
    "Motion",
    "Density",
  ],
  variants: ["Primary", "Secondary", "Tertiary", "Ghost", "Danger"],
  sizes: ["S", "M", "L"],
  states: [
    "Default",
    "Hover",
    "Pressed",
    "Focus",
    "Disabled",
    "Loading",
  ],
  accessibility: [
    "Minimum Touch Area",
    "Keyboard Navigation",
    "Focus Ring",
    "Contrast AA",
    "ARIA busy when Loading",
    "Disabled prevents activation",
  ],
  aiRules: [
    {
      id: "button.primary.action",
      when: {
        anyOf: ["save", "submit", "confirm", "create", "apply", "저장", "제출", "확인", "등록"],
      },
      then: { component: "Button", variant: "Primary" },
      reason: "Destructive-safe affirmative actions use Primary.",
    },
    {
      id: "button.secondary.cancel",
      when: {
        anyOf: ["cancel", "back", "닫기", "취소", "뒤로"],
      },
      then: { component: "Button", variant: "Secondary" },
      reason: "Secondary / cancel actions must not use Primary.",
    },
    {
      id: "button.danger.delete",
      when: {
        anyOf: ["delete", "remove", "permanently", "삭제", "제거"],
      },
      then: { component: "Button", variant: "Danger" },
      reason: "Destructive actions require Danger.",
    },
    {
      id: "button.ghost.learn",
      when: {
        anyOf: [
          "learn more",
          "documentation",
          "detail",
          "더보기",
          "자세히",
          "가이드",
        ],
      },
      then: { component: "Button", variant: "Ghost" },
      reason: "Low-emphasis navigation / docs use Ghost.",
    },
    {
      id: "button.tertiary.outline",
      when: {
        anyOf: ["secondary action", "outline", "보조"],
      },
      then: { component: "Button", variant: "Tertiary" },
      reason: "Soft emphasis alternate action.",
    },
  ],
  figmaMapping: [
    "Button/Primary/M/Default",
    "Button/Primary/M/Hover",
    "Button/Primary/M/Pressed",
    "Button/Primary/M/Focus",
    "Button/Primary/M/Disabled",
    "Button/Primary/M/Loading",
    "Button/Secondary/S/Default",
    "Button/Secondary/S/Disabled",
    "Button/Tertiary/M/Default",
    "Button/Ghost/M/Default",
    "Button/Danger/M/Default",
    "Button/Danger/M/Hover",
  ],
  confidence: 0.95,
  priority: 100,
  category: "action",
  compatibleWith: ["Input", "Card", "Form", "Dialog", "Table", "Toolbar"],
  generatedByAI: false,
  version: "1.0.0",
};
