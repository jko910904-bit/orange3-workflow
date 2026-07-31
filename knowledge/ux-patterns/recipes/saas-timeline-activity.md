# Recipe: SaaS Timeline / Activity

## Goal

시간순 **이력·활동**을 스캔하고 이벤트 원본으로 이동한다. Dashboard Activity와 모델을 공유한다.

## User Tasks

- 활동 피드 조회
- 유형·기간 Filter
- 이벤트 상세
- (Audit) 불변 이력 확인 — 삭제 없음 또는 관리자 purge + Confirm

## Pattern Chain (ordered)

```
Filter → Timeline
            │
            ├─ Detail Drawer (이벤트 메타) / deep-link → target Recipe
            ├─ Empty / Loading / Error
            └─ optional Confirm (audit purge only)

Dashboard embed: Activity slot = Timeline Pattern (축약)
```

## Why this order

- Timeline = 이력축; Calendar(일정)·Kanban(상태)과 혼용 금지.
- Dashboard Recent Activity는 이 Recipe의 **임베드**, 별도 Pattern 발명 아님.
- AI prompt history는 [`ai-prompt-history.md`](./ai-prompt-history.md)로 특화.

## Layout notes (Admin sidebar vs centered)

- Full Page feed 또는 Dashboard 하위 섹션.
- Dense for audit; Comfortable for social activity.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 이벤트 빠른 확인 | Drawer |
| 원본 수정 | 대상 Recipe 규칙 |
| Audit purge | Confirm |
| Never | Timeline 안에 Admin Search 중첩 |

## Related Recipes

- [admin-dashboard.md](./admin-dashboard.md)
- [saas-kanban-board.md](./saas-kanban-board.md)
- [saas-notifications.md](./saas-notifications.md)
- [ai-prompt-history.md](./ai-prompt-history.md)

## Linked Patterns

- [timeline/PATTERN.md](../timeline/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
