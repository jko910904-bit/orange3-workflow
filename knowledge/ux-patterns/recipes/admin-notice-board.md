# Recipe: Admin Notice Board

## Goal

공지 목록을 **검색·분류·스캔**하고, 상세를 **빠르게 읽거나** (Portal) **긴 본문을 Page**로 연다. Admin에서는 작성·수정·삭제도 포함한다.

## User Tasks

- 조회 / 검색 / 카테고리·상태 Filter
- 상세 읽기
- 작성 · 수정 · 게시 상태 변경
- 삭제

## Pattern Chain (ordered)

```
Search → Filter (Category / Status / Date) → Data Table | List
                                              │
                                              ├─ Detail Drawer (빠른 확인 · Admin 짧은 수정)
                                              ├─ Detail Page (긴 본문 · Portal 읽기)
                                              └─ Confirm (삭제) → Notification

작성: CRUD Form (Page)
Loading / Empty / Error on list surface
```

## Why this order

- 공지도 **Search First**; 카테고리는 Filter (Search 복제 금지).
- 건수 ≥20 또는 운영 컬럼 필요 → **Data Table**; 소량 스캔 → List/rows.
- 목록 유지 수정 = Drawer; 긴 읽기/SEO성 Portal = Page 허용 ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

## Layout notes (Admin sidebar vs centered)

- **Admin:** sidebar + Admin stack (회원관리와 동일 골격).
- **Portal board:** 상단 App chrome · content centered/max-width 읽기 폭 가능 — 목록은 여전히 Search top.
- Pagination: Table과 세트; List도 페이지/더보기 규칙 문서화.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| Admin 짧은 상세·수정 | Drawer |
| 긴 본문 / Portal 읽기 | Page |
| 삭제 | Confirm |
| 작성 | Page (Drawer에 장문 작성 금지) |

## Related Recipes

- [admin-faq-board.md](./admin-faq-board.md)
- [admin-member-management.md](./admin-member-management.md)
- [admin-product-catalog.md](./admin-product-catalog.md)

## Linked Patterns

- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
