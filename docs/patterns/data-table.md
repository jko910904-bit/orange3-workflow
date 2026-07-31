# Data Table Pattern

**Gold standard** admin list surface. Goal: **데이터 조회**.

## Stack

```
Search → Filter → Bulk Action → Table → Pagination
```

Required states (preview-togglable): **Empty** · **Loading** (Skeleton).

UX Rule #8 narrative (`Search → Filter → Data → Pagination`) maps Data = Bulk Action + Table.

## Components

Search · Filter · Bulk Action · Table · Pagination · Empty · Loading

## Goals

- 데이터 조회 — 조건으로 찾고, 결과를 스캔하고, 행 액션으로 이어간다

## UX Rules applied

All 8 — especially `search-top`, `filter-below-search`, `single-primary`, `detail-drawer`, `delete-confirm`, `skeleton-loading`, `empty-cta`, `admin-stack`.

## Compose notes

- **DATA_DENSITY:** 건수 **≥ 20 → Table** (this pattern); **&lt; 20 → Card/List** — see [ux-decision-tree.md](../principles/ux-decision-tree.md)
- Detail / Edit → Drawer (목록 유지)
- Delete → Confirm Dialog
- Loading → Skeleton; Empty → CTA

Live: `/patterns/data-table` · code: `src/design-system/patterns/DataTable.tsx` · catalog id `data-table`

See [README.md](./README.md) · [list.md](./list.md) · [../UX_RULES.md](../UX_RULES.md)
