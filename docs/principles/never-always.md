# Never / Always

Hard compose constraints for JKO Design System Platform.

**Master:** [../JKO_AI_DEVELOPMENT_RULES.md](../JKO_AI_DEVELOPMENT_RULES.md) · code: `src/playground/never-always.ts` · index: [../UX_RULES.md](../UX_RULES.md)

Aligns with [UX Principles](./jko-ux-principles.md) (Search First · Single Primary · …) and [UX Decision Tree](./ux-decision-tree.md): **Primary = 1**, **Search once on top**, **no inventing tokens**.

## Never

- Modal 안에 Modal
- Primary Button 3개
- Search 아래 Search
- Form 안에 Table
- 새로운 Color 생성
- 새로운 Radius 생성
- 새로운 Typography 생성

## Always

- 기존 Design Kit 사용

## Why (cross-refs)

| Never / Always | Aligns with |
| --- | --- |
| Modal 안에 Modal | Overlay rules — one focus surface; delete = Confirm Dialog only |
| Primary Button 3개 | Rule **#3** `single-primary` · Button decision tree |
| Search 아래 Search | Rules **#1–2**, **#8** — Search once, top of admin stack |
| Form 안에 Table | Decision Tree — list = Data Table stack; form = CRUD (no nested table) |
| 새로운 Color / Radius / Typography | Mandate — do not invent Foundation tokens |
| Always: Design Kit | Foundation → Components → Patterns → Screens |

## Live

`/principles#never-always` · `/principles` · hub `/`
