# 06 — Screen Recipes

## Purpose

**Screen = Pattern의 조합**입니다. Pattern 없이 화면을 발명하지 않습니다.  
아래 Recipe는 운영에서 반복되는 조립 순서입니다.

**Expanded source (canonical chains):** [`knowledge/ux-patterns/recipes/`](../knowledge/ux-patterns/recipes/README.md)  
**Pattern graph:** [`knowledge/ux-patterns/RELATIONSHIPS.md`](../knowledge/ux-patterns/RELATIONSHIPS.md)

Code: `src/playground/catalog.ts` (`SCREEN_DOCS`) · Live: `/screens`

---

## Rule

```
Screen := Pattern₁ → Pattern₂ → … (+ states)   // ordered chain = Recipe
```

- Layout은 [08_LAYOUT_RULES](./08_LAYOUT_RULES.md) (Admin / Portal)
- Interaction은 [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- Primary · Search · Delete는 [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- Full Admin / SaaS / AI recipes: [`knowledge/ux-patterns/recipes/`](../knowledge/ux-patterns/recipes/README.md)

---

## Recipe: 회원관리 (Admin)

**Goal:** 회원 데이터 조회 · 상세 확인 · 수정 · 생성 · 삭제  
**Layout:** Admin 12 / 1440 / sidebar 240 / content fluid  
**Full recipe:** [`admin-member-management.md`](../knowledge/ux-patterns/recipes/admin-member-management.md)

### Pattern chain

```
Search → Filter → Data Table → Detail Drawer → Confirm Dialog
(+ Loading / Empty · 생성 Page · Notification)
```

| Step | Label | Patterns | Mapping |
| --- | --- | --- | --- |
| 1 | 조회 | Data Table · Search · Filter | Admin stack: Search → Filter → Data → Pagination · Primary = 조회 |
| 2 | 검색 | Search · Data Table | 입력 좌 · 버튼 우 · Enter · Search 최상단 |
| 3 | 필터 | Filter · Data Table | Filter below Search · Bulk → Table → Pagination |
| 4 | 테이블 | Data Table | 행 「상세」→ Drawer (목록 유지) · 풀페이지 이동 금지 |
| 5 | Drawer | Detail | 상세 · 수정 · 빠른 확인 |
| 6 | 생성 | CRUD | **Page** (목록 미유지 생성) |
| 7 | 저장 | Detail · CRUD · Dialog | Sticky Footer Primary=저장 · Cancel=Secondary · 삭제=Confirm |

**Components (kit):** Input · Button · Select/Chip(Filter) · Table · Pagination · Drawer · Form fields · Modal

---

## Recipe: 공지사항

**Goal:** 공지 목록 스캔 · 상세 읽기  
**Surface:** Portal 또는 Admin board  
**Full recipe:** [`admin-notice-board.md`](../knowledge/ux-patterns/recipes/admin-notice-board.md)

```
Search → List → Detail
```

| Step | Patterns | Notes |
| --- | --- | --- |
| 목록 | Search · List | 건수 ≥20이면 Data Table로 승격 |
| 상세 | Detail | 빠른 확인 = Drawer · 긴 본문 Portal은 Page 허용 |

---

## Recipe: 상품관리

**Goal:** 카탈로그 조회 · 필터 · 상세/수정  
**Full recipe:** [`admin-product-catalog.md`](../knowledge/ux-patterns/recipes/admin-product-catalog.md)

```
Filter → Data Table → Detail (Drawer)
```

| Step | Patterns | Notes |
| --- | --- | --- |
| 필터·목록 | Filter · Data Table | Search First 유지 (Search 있으면 최상단) |
| 상세·수정 | Detail · CRUD | 목록 유지 → Drawer · Sticky Footer |
| 생성 | CRUD | Page |

---

## Recipe: FAQ

**Goal:** 질문 검색 · 스캔  
**Full recipe:** [`admin-faq-board.md`](../knowledge/ux-patterns/recipes/admin-faq-board.md)

```
Search → List (Accordion/rows)
```

| Step | Patterns | Notes |
| --- | --- | --- |
| 검색 | Search | 좌 입력 · 우 조회 · Empty CTA |
| 목록 | List | 소량이면 Card/Accordion · 대량이면 Table |

---

## Recipe: Dashboard

**Goal:** 현황 확인  
**Layout:** Admin shell  
**Full recipe:** [`admin-dashboard.md`](../knowledge/ux-patterns/recipes/admin-dashboard.md)

```
KPI → Charts → Recent Activity → Quick Action
```

| Step | Patterns | Notes |
| --- | --- | --- |
| KPI | Dashboard · Analytics | Card KPI 행 · 4→2→1 열 |
| Charts | Dashboard · Analytics | 텍스트 대안 필수 |
| Recent Activity | Dashboard · Timeline | 시간순 |
| Quick Action | Dashboard | Primary **하나**(있으면) |

Title은 page chrome(선택) — 필수 Components 스택이 아님.  
Table은 Dashboard 필수 스택이 아님 (심화는 Analytics).

---

## Pattern chain cheat sheet

| Screen | Chain | Expanded |
| --- | --- | --- |
| 회원관리 | Search → Filter → Data Table → Detail Drawer → Confirm · CRUD Page(생성) | [recipe](../knowledge/ux-patterns/recipes/admin-member-management.md) |
| 공지 | Search → Filter → Table/List → Detail Drawer/Page | [recipe](../knowledge/ux-patterns/recipes/admin-notice-board.md) |
| 상품 | Search → Filter → Data Table/Cards → Drawer | [recipe](../knowledge/ux-patterns/recipes/admin-product-catalog.md) |
| FAQ | Search → Filter → List/Table | [recipe](../knowledge/ux-patterns/recipes/admin-faq-board.md) |
| Dashboard | KPI → Charts → Activity → Quick Action | [recipe](../knowledge/ux-patterns/recipes/admin-dashboard.md) |
| Analytics | Filter → Analytics → Table · Export | [recipe](../knowledge/ux-patterns/recipes/admin-analytics.md) |
| File Manager | File Manager + Upload → Confirm | [recipe](../knowledge/ux-patterns/recipes/admin-file-manager.md) |
| Settings + Permission | Settings → Permission → Confirm | [recipe](../knowledge/ux-patterns/recipes/admin-settings-permissions.md) |
| SaaS collab | Calendar / Kanban / Timeline recipes | [index](../knowledge/ux-patterns/recipes/README.md#saas) |
| AI Chat | AI Chat → Confirm · Timeline history | [index](../knowledge/ux-patterns/recipes/README.md#ai) |

---

## Examples

**맞음** — 회원 수정: 목록 유지 + Drawer + Sticky Footer 저장  
**틀림** — 회원 수정을 새 탭 풀페이지로 보내고 Search를 Drawer 안에 또 둠

---

## Related docs

- Expanded recipes: [`knowledge/ux-patterns/recipes/`](../knowledge/ux-patterns/recipes/README.md)
- Relationships: [`knowledge/ux-patterns/RELATIONSHIPS.md`](../knowledge/ux-patterns/RELATIONSHIPS.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [08_LAYOUT_RULES](./08_LAYOUT_RULES.md)
- [10_BEST_PRACTICES](./10_BEST_PRACTICES.md)
- Detail: `docs/screens/README.md`
