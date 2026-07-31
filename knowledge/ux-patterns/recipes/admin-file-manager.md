# Recipe: Admin File Manager

## Goal

파일을 **탐색·업로드·삭제**한다. Upload는 전송 Task, Manager는 운영 Task로 compose.

## User Tasks

- 폴더/목록 탐색
- 검색·타입 Filter
- 업로드
- 메타 상세
- 삭제 (단건·Bulk)

## Pattern Chain (ordered)

```
File Manager
  Search → Filter → File list/grid
       │
       ├─ File Upload (toolbar / dropzone) → Loading / Error → list refresh
       ├─ Detail Drawer (메타 · 이름 수정)
       └─ Confirm (삭제) → Notification

Empty State (+ Upload CTA)
```

## Why this order

- Upload → Manager 완료 흐름 ([`RELATIONSHIPS`](../RELATIONSHIPS.md)).
- 삭제는 Confirm; 업로드 실패는 Error/Notification — Confirm으로 대체하지 않음.
- Search First 유지 (경로 브라우징만으로 검색을 없애지 말 것 — 대량 시).

## Layout notes (Admin sidebar vs centered)

- Admin shell; 좌측 트리(선택) + 우측 list/grid — kit 레이아웃만.
- Dense list for ops; Comfortable grid for media preview.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 메타·짧은 수정 | Drawer |
| 업로드 진행 | Inline progress (Modal 중첩 금지) |
| 삭제 | Confirm |
| 이동/복사 대상 선택 | Modal 1층 |

## Related Recipes

- [admin-product-catalog.md](./admin-product-catalog.md)
- [admin-member-management.md](./admin-member-management.md)
- [saas-onboarding-wizard.md](./saas-onboarding-wizard.md) — 로고 업로드 등

## Linked Patterns

- [file-manager/PATTERN.md](../file-manager/PATTERN.md)
- [file-upload/PATTERN.md](../file-upload/PATTERN.md)
- [search/PATTERN.md](../search/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
