# List / Card Pattern

Lightweight scan list for **small** datasets.

## Data density

| Count | Surface |
| --- | --- |
| **&lt; 20** | **Card** / List Pattern |
| **≥ 20** | **Table** — escalate to [Data Table](./data-table.md) |

Source: `DATA_DENSITY_RULE` in `src/playground/decision-tree.ts` · [ux-decision-tree.md](../principles/ux-decision-tree.md)

## When to use

- 알림·멤버·피드 등 소량 스캔
- 비교·정렬·대량 선택이 주 과제가 아닐 때

## Compose notes

- Detail → Drawer (목록 유지) when editing/inspecting
- 20개 이상·정렬·벌크가 필요하면 Data Table로 승격

Live: `/patterns/list` (planned) · Component: `/components/card`  
Catalog: `list` in `src/playground/ux-patterns.ts`

See [data-table.md](./data-table.md) · [../UX_RULES.md](../UX_RULES.md)
