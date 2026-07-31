# Recipe: SaaS Billing Settings

## Goal

플랜·결제·청구 정보를 **조회·변경**하고, 해지·다운그레이드 등 위험 액션을 안전하게 처리한다.

## User Tasks

- 현재 플랜·사용량 확인
- 결제 수단·세금 정보 수정
- 플랜 변경 · 해지
- 인보이스 목록 조회 (선택 Table)

## Pattern Chain (ordered)

```
Settings (Billing section)
  → optional Analytics/usage summary (read-only widgets)
  → CRUD Form fields (결제 정보)
  → Confirm (해지 · 다운그레이드 · 좌석 대량 축소)
  → Notification

Invoices: Search → Data Table → Detail Drawer (PDF/meta)
```

## Why this order

- Billing은 Settings Task; 위험 변경만 Confirm.
- 사용량 위젯은 Dashboard/Analytics **읽기 compose** — 새 토큰 금지.
- 인보이스 목록은 Admin stack 축소판.

## Layout notes (Admin sidebar vs centered)

- SaaS Settings: section nav + form (Admin과 동일 구조 가능).
- 금액·날짜 정렬 규칙은 Data Table BP 재사용.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 결제 정보 편집 | Settings Page |
| 플랜 비교 선택 | Modal 또는 Page (정보량) |
| 해지/되돌릴 수 없는 변경 | **Confirm** |
| 인보이스 상세 | Drawer |

## Related Recipes

- [admin-settings-permissions.md](./admin-settings-permissions.md)
- [admin-analytics.md](./admin-analytics.md)
- [saas-team-permissions.md](./saas-team-permissions.md)

## Linked Patterns

- [settings/PATTERN.md](../settings/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [analytics/PATTERN.md](../analytics/PATTERN.md)
- [search/PATTERN.md](../search/PATTERN.md)
