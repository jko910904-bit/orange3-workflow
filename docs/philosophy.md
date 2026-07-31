# JKO v2.0 Philosophy — Compose ≠ Generate

JKO is a **Design System Platform** for operational products (Admin / Portal), not a simple AI UI generator.

AI does **not** invent Color · Typography · Radius · Components. Screens are assembled from the kit in order:

```
Foundation → Components → UX Patterns → Screens
```

**Mission:** 운영·개발·유지보수하기 쉬운 실무 Design System Platform

## 8 platform principles

1. **Design Once** — tokens, components, and patterns are defined once and reused
2. **Consistency** — same kit across screens; no one-off invention
3. **Operation First** — built for admin/portal operational UX, not demo chrome
4. **Developer Friendly** — clear hierarchy for implementers and handoff
5. **Maintainable** — changes flow Foundation → Components → Patterns → Screens
6. **Pattern Before Screen** — Screens are Pattern combinations only
7. **Accessibility** — keyboard, contrast, and semantics as kit defaults
8. **Responsive** — Dense (Admin) / Comfortable (Portal) plus responsive layout

## What AI may do

- **Recommend / compose** existing kit resources (Foundation · Components · Patterns)
- Follow [JKO AI Development Rules](./JKO_AI_DEVELOPMENT_RULES.md) (master) and decision trees

## What AI must not do

- Invent new Color / Radius / Typography (or other Foundation tokens)
- Create new Components outside the kit
- Skip Patterns and invent Screens from scratch
- Treat Playground / legacy generator as the product

## Admin layout (reference)

```
Admin · 12 Grid · Desktop 1440 · Sidebar 240 · Content Fluid
```

Source: `src/playground/layout-admin.ts` · Foundations `/foundations#grid`

## References

Apple HIG · Material Design · Ant Design · Linear · Stripe · Toss — **inspired, not copied**. JKO optimizes for operational UX.

**Master:** [JKO_AI_DEVELOPMENT_RULES.md](./JKO_AI_DEVELOPMENT_RULES.md) · index: [UX_RULES.md](./UX_RULES.md)
