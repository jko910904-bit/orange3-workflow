import { defineToken, type TokenEntry } from "./types";
import { ADMIN_LAYOUT } from "@/playground/layout-admin";

/**
 * Admin layout grid tokens — Foundation Grid.
 * AI must not invent canvas / sidebar / column counts.
 */
export const layoutTokens: TokenEntry[] = [
  defineToken("admin.canvas", "layout", `${ADMIN_LAYOUT.canvas}px`, {
    description: "Admin desktop canvas / max frame width",
    usage: ["admin.shell.maxWidth", "admin.preview.frame"],
  }),
  defineToken("admin.sidebar", "layout", `${ADMIN_LAYOUT.sidebar}px`, {
    description: "Admin LNB / sidebar fixed width",
    usage: ["admin.shell.sidebar", "admin.lnb.width"],
  }),
  defineToken("admin.columns", "layout", String(ADMIN_LAYOUT.columns), {
    description: "Admin content-area 12-column grid",
    usage: ["admin.content.grid", "admin.filter.grid"],
  }),
  defineToken("admin.content", "layout", ADMIN_LAYOUT.content, {
    description:
      "Admin content is fluid — fills remaining width after sidebar (1fr / calc(100% - sidebar))",
    usage: ["admin.shell.content", "admin.content.track"],
  }),
];
