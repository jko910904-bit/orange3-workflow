# Recipe: SaaS Team Permissions

## Goal

팀 멤버 초대·역할 부여·제거를 운영한다. Admin 회원관리와 **겹치면** 회원 Recipe를 재사용하고, 여기는 팀 스코프 ACL에 집중한다.

## User Tasks

- 멤버 목록 조회
- 초대 (생성)
- 역할 변경
- 멤버 제거
- 권한 매트릭스 확인

## Pattern Chain (ordered)

```
Search → Filter (role / status) → Data Table
                                      │
                                      ├─ Detail Drawer (역할 · 권한 요약)
                                      ├─ Permission Pattern (role matrix / presets)
                                      ├─ Confirm (제거 · 역할 강등)
                                      └─ Notification

초대: CRUD Form Modal(짧은 이메일) 또는 Page
```

## Why this order

- 팀 멤버 = Admin stack 재사용 ([`admin-member-management`](./admin-member-management.md)).
- Permission은 역할 변경의 **도메인 Pattern**; Settings 전역과 구분 가능.
- 제거 = Confirm.

## Layout notes (Admin sidebar vs centered)

- SaaS workspace Settings 하위 또는 `/team`.
- Admin sidebar 있으면 동일 12-grid.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 역할 변경 | Drawer |
| 짧은 초대 | Modal |
| 멤버 제거 | Confirm |
| 역할 템플릿 생성 | Page |

## Related Recipes

- [admin-settings-permissions.md](./admin-settings-permissions.md)
- [admin-member-management.md](./admin-member-management.md)
- [saas-onboarding-wizard.md](./saas-onboarding-wizard.md)
- [saas-billing-settings.md](./saas-billing-settings.md)

## Linked Patterns

- [permission/PATTERN.md](../permission/PATTERN.md)
- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [settings/PATTERN.md](../settings/PATTERN.md)
