# Recipe: Admin Analytics Report

## Goal

기간·세그먼트 조건으로 **지표를 해석**하고, 필요 시 표로 drill / Export한다.

## User Tasks

- 기간·세그먼트 Filter
- 지표·차트 해석
- 상세 행 조회
- Export
- Empty / Loading / Error 처리

## Pattern Chain (ordered)

```
(optional) Dashboard dive →
Filter → Analytics (charts + summary) → Data Table (drill)
                              │
                              ├─ Loading / Empty / Error
                              └─ Export → Notification (완료)

Confirm: 대량 유료 Export·되돌릴 수 없는 purge 등에만
```

## Why this order

- Analytics는 Dashboard의 **심층**이지 대체 현황면이 아님.
- Filter Before Data 원칙을 리포트에도 적용 (기간이 Search를 대체하지 않으면 Search 생략 가능 — 문서화).
- Export 성공은 Notification; Confirm으로 성공을 붙잡지 않음.

## Layout notes (Admin sidebar vs centered)

- Admin shell; Filter 상단 sticky 가능.
- Charts 위 / Table 아래가 기본 (해석 → 검증).
- Dense 허용 (운영 리포트).

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 행 상세 | Drawer (목록=리포트 표 유지) |
| Export 옵션 | Modal (빠른 작업) |
| 위험 purge | Confirm |
| 전체 리포트 공유 설정 | Settings 연계 또는 Page |

## Related Recipes

- [admin-dashboard.md](./admin-dashboard.md)
- [admin-member-management.md](./admin-member-management.md)
- [saas-billing-settings.md](./saas-billing-settings.md) — 사용량 리포트 연계 시

## Linked Patterns

- [analytics/PATTERN.md](../analytics/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
