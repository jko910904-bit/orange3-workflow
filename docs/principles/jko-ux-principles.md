# JKO UX Principles (8 operational rules)

Canonical Korean rules for operational Admin/Portal Compose.  
English labels (Search First … Bulk Action) match the master doc.

**Master:** [../JKO_AI_DEVELOPMENT_RULES.md](../JKO_AI_DEVELOPMENT_RULES.md)  
**Persona:** [senior-product-designer.md](./senior-product-designer.md) · code: `src/playground/ux-principles.ts` · index: [../UX_RULES.md](../UX_RULES.md)

Before applying these rules, complete Thinking Steps 1–10 in the master (checkpoints: [디자이너처럼 판단하기](./designer-judgment.md)).

## Rules

1. **Search First** (`search-top`) — 검색은 항상 가장 위에 위치한다.
2. **Filter Before Data** (`filter-below-search`) — Filter는 Search 아래에 위치한다.
3. **Single Primary** (`single-primary`) — Primary Button은 화면당 하나만 존재한다.
4. **Detail Drawer First** (`detail-drawer`) — Detail은 새로운 페이지보다 Drawer를 우선 사용한다.  
   → Expand with [drawer-vs-page.md](./drawer-vs-page.md) (`DRAWER_VS_PAGE`)
5. **Confirm Delete** (`delete-confirm`) — 삭제는 Confirm Dialog를 사용한다.
6. **Skeleton Loading** (`skeleton-loading`) — Loading은 Skeleton을 우선 사용한다.
7. **Empty CTA** (`empty-cta`) — Empty State는 CTA를 반드시 제공한다.
8. **Admin Stack · Bulk Action** (`admin-stack`) — 모든 관리자 화면은 Search → Filter → Data → Pagination 구조를 따른다.

## Rule 8 — Admin stack

```
Search → Filter → Data → Pagination
```

- **Search** — always top (Rules 1–2)
- **Filter** — directly under Search
- **Data** — Table (and optional Bulk Action toolbar tied to selection)
- **Pagination** — under the data region

Bulk Action may sit with Data as part of the table pattern; do not reorder to put Bulk above Filter or break the Search → Filter → Data → Pagination narrative.

**Gold standard:** Data Table Pattern (`/patterns/data-table`) — Goal: 데이터 조회  
**Screen example:** 회원관리 (`/screens/member-management`) — Search → Filter → Bulk/Table → Pagination; Detail/Edit → Drawer; Create → CRUD Page

Also: Dashboard (`/patterns/dashboard`, Goal: 현황 확인) · CRUD (`/patterns/crud`, Goal: 등록 및 수정)

## Core Patterns (Goal → Components)

| Pattern | Goal | Components (order) |
| --- | --- | --- |
| **Data Table** | 데이터 조회 | Search → Filter → Bulk Action → Table → Pagination · Empty · Loading |
| **Dashboard** | 현황 확인 | KPI → Charts → Recent Activity → Quick Action (Title = optional chrome) |
| **CRUD** | 등록 및 수정 | Form · Validation · Submit · Cancel (Drawer → Sticky Footer Submit) |

Live: `/patterns/data-table` · `/patterns/dashboard` · `/patterns/crud`

## Companion decision trees

| Topic | Doc |
| --- | --- |
| Never / Always | [never-always.md](./never-always.md) |
| **UX Decision Tree** | [ux-decision-tree.md](./ux-decision-tree.md) · live `/principles/decision-tree` |
| Drawer vs Page | [drawer-vs-page.md](./drawer-vs-page.md) |
| Button variants | [button-variants.md](./button-variants.md) |
| Modal / Drawer / Bottom Sheet | [overlay-modal-drawer-sheet.md](./overlay-modal-drawer-sheet.md) |

Live: `/principles` · `/principles/decision-tree` · `/principles#never-always`
