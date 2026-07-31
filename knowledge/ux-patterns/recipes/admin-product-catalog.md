# Recipe: Admin Product Catalog

## Goal

상품(카탈로그)을 **필터·조회**하고 상세/수정한다. 시각 스캔이 중요하면 Card grid, 운영 밀도면 Table.

## User Tasks

- 조회 · 검색 · 속성 Filter (카테고리·재고·상태)
- 상세 · 수정
- 생성 · 삭제
- (선택) 이미지 첨부 → File Upload

## Pattern Chain (ordered)

```
Search → Filter → Data Table | Card grid
                      │
                      ├─ Detail Drawer (상세·수정)
                      ├─ Confirm (삭제) → Notification
                      └─ Loading / Empty / Error

생성: CRUD Form (Page)
첨부 섹션: File Upload (Drawer 또는 Form 섹션) — 새 토큰 금지
```

## Why this order

- Search First 유지; Filter 비중이 커도 Search **위**에 두지 않음.
- Card grid는 Data Table의 **밀도 분기**이지 별도 Foundation이 아님.
- 목록 유지 수정 = Drawer; 생성 = Page.

## Layout notes (Admin sidebar vs centered)

- Admin sidebar + fluid content.
- Card grid: 12-col responsive (예: 4→2→1); Filter는 grid 위 고정 스택.
- Dense 운영 vs Comfortable 카탈로그 미리보기 — DensityProvider만 사용.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 상세·수정 | Drawer |
| 생성 | Page |
| 삭제 | Confirm |
| 빠른 상태 토글 | Modal 또는 행 액션 + Notification (Confirm if irreversible) |

## Related Recipes

- [admin-member-management.md](./admin-member-management.md)
- [admin-file-manager.md](./admin-file-manager.md) — 에셋 관리 분리 시
- [admin-dashboard.md](./admin-dashboard.md) — KPI → catalog drill

## Linked Patterns

- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [file-upload/PATTERN.md](../file-upload/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
