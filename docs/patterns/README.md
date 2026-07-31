# Patterns

**Pattern = task unit** — not a decorative UI block.

Patterns compose kit Components into a reusable UX job (데이터 조회, 현황 확인, 등록 및 수정, etc.).

## Rules

- **Pattern Before Screen** — do not invent a Screen without a Pattern
- Before a new Pattern: reuse an existing one if it covers the task
- Follow [JKO AI Development Rules](../JKO_AI_DEVELOPMENT_RULES.md) — especially Rule 8 admin stack for list/admin surfaces

## Gold standard

**Data Table Pattern** — Search → Filter → Bulk Action → Table → Pagination (+ Empty · Loading)  
Live: [`/patterns`](http://localhost:3000/patterns) · detail `/patterns/data-table`

## Three core patterns

| Pattern | Goal | Components | Doc |
| --- | --- | --- | --- |
| Data Table | 데이터 조회 | Search → Filter → Bulk → Table → Pagination · Empty · Loading | [data-table.md](./data-table.md) |
| Dashboard | 현황 확인 | KPI → Charts → Recent Activity → Quick Action | [dashboard.md](./dashboard.md) |
| CRUD | 등록 및 수정 | Form · Validation · Submit · Cancel | [crud.md](./crud.md) |

Related: [list.md](./list.md) for &lt;20 Card density.

**Density:** ≥20 → Table · &lt;20 → Card — [ux-decision-tree.md](../principles/ux-decision-tree.md)

## Code & catalog

- React: `src/design-system/patterns/`
- Catalog: `src/catalog/patterns/` · `src/playground/ux-patterns.ts`

See [../UX_RULES.md](../UX_RULES.md) · [../philosophy.md](../philosophy.md) · [../principles/designer-judgment.md](../principles/designer-judgment.md)
