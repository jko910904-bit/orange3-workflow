# Recipe: SaaS Kanban Board

## Goal

상태 열 워크플로로 카드를 **이동·상세·삭제**한다.

## User Tasks

- 보드/담당 Filter
- 카드 스캔 · DnD 상태 변경
- 상세 · 수정
- 카드/열 삭제
- (선택) Activity Timeline 섹션

## Pattern Chain (ordered)

```
Filter → Kanban
           │
           ├─ Detail Drawer (카드 상세·CRUD 짧은 수정)
           ├─ Notification (이동 성공 / 권한 실패)
           ├─ Confirm (카드·열 삭제)
           └─ optional Timeline (카드 이력)

Empty column CTA → 카드 생성 Modal/Page
Permission: 열/액션 가시성
```

## Why this order

- Kanban = 상태 열 Task — Calendar/Timeline과 역할 분리.
- DnD 이동은 Confirm 불필요(가역); 삭제는 Confirm.
- 상세+목록(보드) 유지 = Drawer.

## Layout notes (Admin sidebar vs centered)

- Horizontal scroll columns; top Filter bar.
- Dense cards for ops boards.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 카드 상세·수정 | Drawer |
| 빠른 카드 생성 | Modal |
| 삭제 | Confirm |
| 보드 설정 | Settings / Modal 1층 |

## Related Recipes

- [saas-calendar-schedule.md](./saas-calendar-schedule.md)
- [saas-timeline-activity.md](./saas-timeline-activity.md)
- [saas-team-permissions.md](./saas-team-permissions.md)
- [admin-member-management.md](./admin-member-management.md)

## Linked Patterns

- [kanban/PATTERN.md](../kanban/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [timeline/PATTERN.md](../timeline/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [permission/PATTERN.md](../permission/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
