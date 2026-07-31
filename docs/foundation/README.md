# Foundation

Foundation tokens are **immutable by AI compose**.

Categories: Color · Typography · Radius · Spacing · Shadow · Grid · Icon Style · Motion

## Rules

- **Admin-only edits** to Foundation
- AI / Compose must **reuse** existing tokens — never invent Color / Radius / Typography
- Changes propagate: Foundation → Components → Patterns → Screens

## Admin grid (reference)

```
Admin · 12 Grid · Desktop 1440 · Sidebar 240 · Content Fluid
```

Code: `src/playground/layout-admin.ts`  
CSS vars: `--admin-canvas`, `--admin-sidebar`, `--admin-columns`, `--admin-content`  
Live: `/foundations#grid`

Tokens live under `src/design-system/tokens/`.

See [../UX_RULES.md](../UX_RULES.md) · [../philosophy.md](../philosophy.md)
