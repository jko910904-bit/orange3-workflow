# Recipe: SaaS Onboarding Wizard

## Goal

신규 워크스페이스/계정의 **필수 설정을 단계적으로** 완료하고 첫 성공 상태(Empty CTA 해소)로 인도한다.

## User Tasks

- 다단계 입력 (조직 · 프로필 · 초대 …)
- 검증 · 제출
- 건너뛰기(허용 시 Secondary)
- 완료 후 홈/Dashboard

## Pattern Chain (ordered)

```
CRUD Form (stepped Page) → Validation → Submit
        │
        ├─ Error (필드/스텝)
        ├─ optional File Upload (로고)
        └─ Notification → Dashboard | Empty CTA on first list

Confirm: 이탈·데이터 손실 시에만
```

## Why this order

- Wizard = **Page** CRUD surface — Drawer에 강제하지 않음 ([`crud-form`](../crud-form/PATTERN.md)).
- Primary = 다음/완료 하나; 스텝당 Single Primary.
- 온보딩 종료 후 운영 목록은 해당 Admin/SaaS Recipe로 handoff.

## Layout notes (Admin sidebar vs centered)

- **Centered** 또는 narrow column (SaaS marketing-adjacent) — Admin sidebar는 보통 숨김/축소.
- Comfortable density; 한 스텝 한 Job.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 전체 Wizard | **Page** |
| 이탈 | Confirm |
| 약관 빠른 확인 | Modal 1층 |
| Never | Modal in Modal · 스텝마다 새 토큰 |

## Related Recipes

- [saas-team-permissions.md](./saas-team-permissions.md)
- [saas-billing-settings.md](./saas-billing-settings.md)
- [admin-dashboard.md](./admin-dashboard.md)
- [admin-file-manager.md](./admin-file-manager.md)

## Linked Patterns

- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [file-upload/PATTERN.md](../file-upload/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [settings/PATTERN.md](../settings/PATTERN.md)
