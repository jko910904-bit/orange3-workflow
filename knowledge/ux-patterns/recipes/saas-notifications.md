# Recipe: SaaS Notifications Center

## Goal

알림을 **스캔·필터·읽음 처리**하고, 필요 시 원본 Task로 이동한다. Toast/Snackbar와 **역할 분리**.

## User Tasks

- 알림 목록 조회
- 유형·읽음 Filter
- 상세 / deep-link
- 모두 읽음 · 삭제
- (설정) 알림 채널 on/off → Settings

## Pattern Chain (ordered)

```
Notification inbox (list)
  Filter (type / unread) → List | Data Table
       │
       ├─ Detail Drawer or deep-link → target Recipe (Table/Drawer/Page)
       ├─ Confirm (전체 삭제)
       └─ Notification toast = 시스템 피드백 (inbox와 혼동 금지)

Settings section: 채널 preference (별도 저장 Primary)
```

## Why this order

- Inbox = 조회 Task; toast Notification Pattern = **비차단 피드백** ([`notification/PATTERN.md`](../notification/PATTERN.md)).
- Filter before list; Search는 대량일 때만 상단 추가.
- 삭제는 Confirm; 읽음 처리는 Confirm 불필요.

## Layout notes (Admin sidebar vs centered)

- App Bar 진입 패널 또는 `/notifications` Page.
- Dense list; 모바일은 full Page.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 알림 본문 짧은 확인 | Drawer / panel |
| 원본 수정 | 해당 Recipe overlay 규칙 |
| 전체 삭제 | Confirm |
| Preference | Settings Page |

## Related Recipes

- [admin-settings-permissions.md](./admin-settings-permissions.md)
- [admin-dashboard.md](./admin-dashboard.md)
- [saas-timeline-activity.md](./saas-timeline-activity.md)

## Linked Patterns

- [notification/PATTERN.md](../notification/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [settings/PATTERN.md](../settings/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
