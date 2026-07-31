# JKO UX Rules — Index

> **Knowledge Base (preferred):** [`README.md`](./README.md) → numbered **01–12**  
> **Master summary:** [`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md)  
> This file is a **short legacy index** of satellite docs. Do not contradict the KB or master.  
> **Knowledge > Features.**

JKO is a **Design System Platform** for ops & development — not a simple UI generator.  
AI **composes** from the Design Kit; it does not invent Color · Radius · Typography · Components.

---

## Start here

1. Read **[`README.md`](./README.md)** — Knowledge Base 01–12
2. Read **[`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md)** — Thinking Steps · Output Rules
3. Cursor rule (`alwaysApply: true`): [`.cursor/rules/jko-design-system.mdc`](../.cursor/rules/jko-design-system.mdc)
4. Root: [`AGENTS.md`](../AGENTS.md)

---

## Knowledge Base map

| Topic | KB doc |
| --- | --- |
| Philosophy | [01](./01_PRODUCT_PHILOSOPHY.md) |
| 8 UX Rules | [02](./02_UX_PRINCIPLES.md) |
| Foundation | [03](./03_FOUNDATION_RULES.md) |
| Components | [04](./04_COMPONENT_RULES.md) |
| Patterns | [05](./05_PATTERN_LIBRARY.md) |
| Screens | [06](./06_SCREEN_RECIPES.md) |
| Decision Tree | [07](./07_UX_DECISION_TREE.md) |
| Layout | [08](./08_LAYOUT_RULES.md) |
| Accessibility | [09](./09_ACCESSIBILITY.md) |
| Best Practices | [10](./10_BEST_PRACTICES.md) |
| Never / Always | [11](./11_ANTI_PATTERNS.md) |
| External refs | [12](./12_REFERENCES.md) · [`knowledge/`](../knowledge/README.md) |

---

## Satellite docs (secondary)

| Topic | Doc | Code |
| --- | --- | --- |
| Never / Always | [principles/never-always.md](./principles/never-always.md) | `never-always.ts` |
| 8 UX Rules (Search First … Bulk Action) | [principles/jko-ux-principles.md](./principles/jko-ux-principles.md) | `ux-principles.ts` |
| UX Decision Tree | [principles/ux-decision-tree.md](./principles/ux-decision-tree.md) | `decision-tree.ts` |
| Designer judgment (8 checkpoints) | [principles/designer-judgment.md](./principles/designer-judgment.md) | `designer-judgment.ts` |
| Senior PD persona | [principles/senior-product-designer.md](./principles/senior-product-designer.md) | — |
| Output / reply format | [principles/screen-design-response.md](./principles/screen-design-response.md) | — |
| Drawer vs Page | [principles/drawer-vs-page.md](./principles/drawer-vs-page.md) | `navigation-rules.ts` |
| Button / Overlay | [principles/button-variants.md](./principles/button-variants.md) · [overlay-modal-drawer-sheet.md](./principles/overlay-modal-drawer-sheet.md) | `decision-rules.ts` |
| Patterns | [patterns/README.md](./patterns/README.md) | — |
| Screens | [screens/README.md](./screens/README.md) | — |
| Foundation | [foundation/README.md](./foundation/README.md) | — |
| Product philosophy | [philosophy.md](./philosophy.md) | — |

**Surface cheat sheet:** 수정+목록 유지 = **Drawer** · 빠른 확인 = **Drawer** · 빠른 작업 = **Modal** · 삭제 = **Confirm Dialog**

---

## Quick reminders (from master)

**Thinking:** Problem → Goal → Task → Pattern → Component → Layout → Interaction → Responsive → A11y → Dev/Maintain  
**Never start with UI.** Output format: Goal · User Task · Selected Pattern · Selected Components · Layout · Responsive · Accessibility · Development Notes · Reusability  
**Order:** Foundation → Components → Patterns → Screens  
**Admin stack:** Search → Filter → Data → Pagination (Bulk Action with Data)

Live: `/` · `/principles` · `/patterns` · `/screens`
