import { defineToken, type TokenEntry } from "./types";

/**
 * Kit typography scale (H1–Caption2).
 * Base size for body text is density-overridden (14px Admin / 16px Portal).
 */
export const typographyTokens: TokenEntry[] = [
  defineToken("typography.fontFamily.sans", "typography", "var(--font-geist-sans), system-ui, sans-serif", {
    description: "Default UI font stack",
  }),
  defineToken("typography.fontFamily.mono", "typography", "var(--font-geist-mono), ui-monospace, monospace", {
    description: "Monospace stack",
  }),

  defineToken("typography.h1.fontSize", "typography", "48px", {
    description: "H1 size",
    usage: ["page.title"],
  }),
  defineToken("typography.h1.lineHeight", "typography", "58px", {
    description: "H1 line-height (~120%)",
  }),
  defineToken("typography.h1.fontWeight", "typography", "700", {
    description: "H1 Bold",
  }),
  defineToken("typography.h1.letterSpacing", "typography", "-0.02em", {
    description: "H1 letter-spacing -2%",
  }),

  defineToken("typography.h2.fontSize", "typography", "32px", {
    usage: ["section.title"],
  }),
  defineToken("typography.h2.lineHeight", "typography", "38px"),
  defineToken("typography.h2.fontWeight", "typography", "600"),
  defineToken("typography.h2.letterSpacing", "typography", "-0.02em"),

  defineToken("typography.h3.fontSize", "typography", "24px", {
    usage: ["card.title"],
  }),
  defineToken("typography.h3.lineHeight", "typography", "28px"),
  defineToken("typography.h3.fontWeight", "typography", "600"),
  defineToken("typography.h3.letterSpacing", "typography", "-0.01em"),

  defineToken("typography.h4.fontSize", "typography", "21px", {
    usage: ["table.title", "popup.title"],
  }),
  defineToken("typography.h4.lineHeight", "typography", "25px"),
  defineToken("typography.h4.fontWeight", "typography", "600"),
  defineToken("typography.h4.letterSpacing", "typography", "-0.01em"),

  defineToken("typography.body2.fontSize", "typography", "18px", {
    usage: ["button.large"],
  }),
  defineToken("typography.body2.lineHeight", "typography", "26px"),
  defineToken("typography.body2.fontWeight", "typography", "400"),
  defineToken("typography.body2.letterSpacing", "typography", "0"),

  defineToken("typography.body3.fontSize", "typography", "16px", {
    description: "Portal body / Medium button",
    usage: ["body.portal", "button.medium"],
  }),
  defineToken("typography.body3.lineHeight", "typography", "24px"),
  defineToken("typography.body3.fontWeight", "typography", "400"),
  defineToken("typography.body3.letterSpacing", "typography", "0"),

  defineToken("typography.caption1.fontSize", "typography", "14px", {
    description: "Admin body / Small button / Caption1",
    usage: ["body.admin", "button.small", "caption", "input"],
  }),
  defineToken("typography.caption1.lineHeight", "typography", "20px"),
  defineToken("typography.caption1.fontWeight", "typography", "500"),
  defineToken("typography.caption1.letterSpacing", "typography", "0.01em"),

  defineToken("typography.caption2.fontSize", "typography", "12px", {
    usage: ["help.text", "label", "button.xsmall"],
  }),
  defineToken("typography.caption2.lineHeight", "typography", "17px"),
  defineToken("typography.caption2.fontWeight", "typography", "500"),
  defineToken("typography.caption2.letterSpacing", "typography", "0.01em"),

  defineToken("typography.fontWeight.regular", "typography", "400"),
  defineToken("typography.fontWeight.medium", "typography", "500"),
  defineToken("typography.fontWeight.semibold", "typography", "600"),
  defineToken("typography.fontWeight.bold", "typography", "700"),
];
