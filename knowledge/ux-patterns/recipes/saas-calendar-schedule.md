# Recipe: SaaS Calendar Schedule

## Goal

날짜축으로 **일정·예약**을 조회·생성·수정·취소한다.

## User Tasks

- 월/주/일 스캔
- 범위·담당 Filter
- 일정 상세 · 수정
- 생성 · 취소/삭제

## Pattern Chain (ordered)

```
Filter (range / owner / type) → Calendar
                                    │
                                    ├─ Detail Drawer | Modal (짧은 일정)
                                    ├─ CRUD Form (반복·복잡한 일정 = Page)
                                    └─ Confirm (삭제·취소) → Notification

Empty: 해당 기간 없음 + CTA 생성
Loading: 뷰 전환 Skeleton
```

## Why this order

- Calendar = 날짜축 Task; Timeline/Kanban과 대체하지 않음 ([`RELATIONSHIPS`](../RELATIONSHIPS.md)).
- 빠른 생성 = Modal; 복잡 = Page; 목록 유지 상세 = Drawer.
- Search는 제목 검색이 필요할 때만 Calendar **위**에 추가.

## Layout notes (Admin sidebar vs centered)

- SaaS app shell; calendar full content width.
- Comfortable default; Dense는 리소스 스케줄링 ops.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 빠른 확인·짧은 수정 | Drawer 또는 Modal |
| 복잡/반복 일정 | Page |
| 삭제·취소 | Confirm |
| Never | Modal in Modal (참석자 검색을 Confirm 안에 넣지 않음) |

## Related Recipes

- [saas-kanban-board.md](./saas-kanban-board.md)
- [saas-timeline-activity.md](./saas-timeline-activity.md)
- [saas-notifications.md](./saas-notifications.md)

## Linked Patterns

- [calendar/PATTERN.md](../calendar/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [search/PATTERN.md](../search/PATTERN.md)
