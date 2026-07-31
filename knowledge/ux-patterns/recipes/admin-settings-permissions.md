# Recipe: Admin Settings + Permissions

## Goal

환경 구성을 저장하고, 역할·ACL을 **안전하게** 변경한다.

## User Tasks

- 설정 조회·수정 (Settings)
- 역할·권한 할당 (Permission)
- 위험 변경 확인
- 성공/실패 피드백

## Pattern Chain (ordered)

```
Settings (sections) → Permission (roles / ACL matrix or list)
                            │
                            ├─ Confirm (역할 삭제 · 광역 revoke)
                            └─ Notification (저장 완료)

Loading / Error on section save
Empty: 역할 0건 → CTA → CRUD (역할 생성 Page)
```

## Why this order

- Settings = 환경; Permission = 접근 통제 — 한 Recipe로 **연결**하되 Task는 분리 ([`RELATIONSHIPS`](../RELATIONSHIPS.md)).
- 위험 변경만 Confirm; 일반 저장은 Sticky Footer Primary 하나.
- Permission을 목록 Filter와 혼동하지 않음.

## Layout notes (Admin sidebar vs centered)

- Admin sidebar; Settings는 좌측 섹션 nav + 우측 폼 (kit compose).
- Permission 매트릭스는 Data Table 밀도 규칙 재사용 가능 — Form 안 Table 금지 시 섹션 분리.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 일반 설정 저장 | Page (Settings surface) |
| 역할 상세 편집 | Drawer 또는 Page (필드 수에 따라) |
| 역할 삭제 · 전원 revoke | Confirm |
| Never | Modal in Modal · Settings 안에 Admin Search 스택 |

## Related Recipes

- [saas-team-permissions.md](./saas-team-permissions.md)
- [saas-billing-settings.md](./saas-billing-settings.md)
- [admin-member-management.md](./admin-member-management.md)

## Linked Patterns

- [settings/PATTERN.md](../settings/PATTERN.md)
- [permission/PATTERN.md](../permission/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
