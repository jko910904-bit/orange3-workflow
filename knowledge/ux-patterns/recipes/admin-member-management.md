# Recipe: Admin Member Management

## Goal

회원(사용자) 데이터를 **조회 · 상세 확인 · 수정 · 생성 · 삭제**한다. 목록 컨텍스트를 유지한 채 운영한다.

## User Tasks

- 조회 (검색·필터·페이지)
- 상세 / 빠른 확인
- 수정 (목록 유지)
- 생성 (목록 이탈 허용)
- 삭제 (단건·Bulk)
- 상태 확인 (Empty / Loading / Error)

## Pattern Chain (ordered)

```
Search → Filter → Data Table → Detail Drawer → Confirm Dialog
                      │
                      ├─ Loading (Skeleton)
                      ├─ Empty State (+ CTA → CRUD Form Page)
                      └─ Error (+ Retry)

생성: Empty CTA / Toolbar Secondary → CRUD Form (Page)
저장 성공 · 삭제 완료 → Notification
```

## Why this order

1. **Search First** — 대상 도달이 최상단 Task.
2. **Filter Before Data** — 조건은 Search 아래.
3. **Data Table** — 조회 본문 + Pagination + Bulk.
4. **Detail Drawer** — 수정+목록 유지 / 빠른 확인 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).
5. **Confirm** — 삭제만; 성공 피드백은 Notification.
6. **Satellites** — Empty CTA · Skeleton · Retry는 Table 표면.

## Layout notes (Admin sidebar vs centered)

- **Admin shell:** 12 grid · 1440 · sidebar 240 · content fluid ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- Stack vertical: Search → Filter → Bulk(선택 시) → Table → Pagination.
- Drawer: content 우측 오버레이; 목록 unmount 금지.
- 생성 Page: Admin content 전체 폭; Sticky Footer Primary=저장 하나.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 상세·수정 | **Drawer** |
| 삭제·이탈 | **Confirm Dialog** |
| 생성 (긴 폼) | **Page** |
| 빠른 1필드 작업 | Modal 허용 (드묾) |
| Never | Modal in Modal · Drawer 안 화면급 Search |

## Related Recipes

- [admin-notice-board.md](./admin-notice-board.md) — 동일 Admin stack, 본문 길이 분기
- [admin-product-catalog.md](./admin-product-catalog.md) — Filter 비중 ↑
- [admin-settings-permissions.md](./admin-settings-permissions.md) — 역할로 행 액션 제어
- [saas-team-permissions.md](./saas-team-permissions.md) — 팀 초대와 연계 시

## Linked Patterns

- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- Relationships: [../RELATIONSHIPS.md](../RELATIONSHIPS.md)
