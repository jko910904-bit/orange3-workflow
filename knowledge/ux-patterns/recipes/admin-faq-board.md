# Recipe: Admin FAQ Board

## Goal

FAQ를 **검색하고 스캔**한다. Admin은 항목 CRUD; Portal은 조회·접기 중심.

## User Tasks

- 검색 (질문 키워드)
- 카테고리 Filter
- 목록 스캔 (Accordion/rows 또는 Table)
- 상세 확인 · 수정 · 삭제 (Admin)

## Pattern Chain (ordered)

```
Search → Filter (Category) → List | Data Table
                                │
                                ├─ Accordion / row expand (소량·Portal)
                                ├─ Detail Drawer (Admin 수정 · 긴 Q&A)
                                └─ Confirm → Notification

Empty CTA → CRUD Form (Page)  [Admin]
```

## Why this order

- FAQ도 Search First; 카테고리만으로 대체하지 않음.
- 소량 = List/Accordion; 대량·운영 컬럼 = Data Table 승격 ([`docs/06`](../../../docs/06_SCREEN_RECIPES.md)).
- 수정+목록 = Drawer; 삭제 = Confirm.

## Layout notes (Admin sidebar vs centered)

- Admin: sidebar + stack.
- Portal: 읽기 폭 중심; Filter는 Chip/탭으로 밀도 조절 (Comfortable).

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| Admin 수정 | Drawer |
| 신규 FAQ | Page |
| 삭제 | Confirm |
| Portal 읽기 | Inline expand 우선 · 장문은 Page |

## Related Recipes

- [admin-notice-board.md](./admin-notice-board.md)
- [admin-member-management.md](./admin-member-management.md)

## Linked Patterns

- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
