# Recipe: Admin Dashboard

## Goal

운영 **현황을 한눈에** 보고, 필요 시 Analytics 또는 목록 Task로 drill-down한다.

## User Tasks

- 현황 확인 (KPI)
- 추세 스캔 (Charts)
- 최근 활동 확인
- Quick Action 1회 (생성/이동)
- (선택) Analytics 심층

## Pattern Chain (ordered)

```
Dashboard Pattern
  KPI → Charts → Activity (Timeline) → Quick Action (≤1 Primary)
        │
        ├─ Empty / Loading on widgets
        ├─ drill → Data Table (목록 화면 Recipe)
        └─ dive → Analytics (admin-analytics)

Optional aid: AI Chat (Compose only — 현황 대체 금지)
```

## Why this order

- Dashboard 필수 스택은 KPI→Charts→Activity→Quick Action ([`dashboard/PATTERN.md`](../dashboard/PATTERN.md)).
- Table은 Dashboard 필수 아님 — 심화·목록은 별도 Recipe.
- Single Primary: Quick Action 하나만 filled.

## Layout notes (Admin sidebar vs centered)

- Admin shell; content = widget grid (12-col).
- KPI 행 4→2→1; Charts 아래 Activity.
- Title = page chrome (스택 Components 아님).

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| Quick Action → 생성 | Page (CRUD) |
| 위젯 설정 | Modal 1층 (중첩 금지) |
| drill 행 상세 | 목록 Recipe의 Drawer |
| Never | Dashboard 위에 Admin Search 스택 전체 강제 |

## Related Recipes

- [admin-analytics.md](./admin-analytics.md)
- [admin-member-management.md](./admin-member-management.md)
- [saas-timeline-activity.md](./saas-timeline-activity.md)
- [ai-chat-workspace.md](./ai-chat-workspace.md)

## Linked Patterns

- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [analytics/PATTERN.md](../analytics/PATTERN.md)
- [timeline/PATTERN.md](../timeline/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [ai-chat/PATTERN.md](../ai-chat/PATTERN.md)
