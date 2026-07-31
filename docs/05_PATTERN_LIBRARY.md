# 05 — Pattern Library

## Purpose

**Pattern = UX Task 단위**입니다. 예쁜 UI 블록이 아닙니다.  
Screen을 만들기 전에 Task에 맞는 Pattern을 고릅니다.

**Expanded library (canonical 본문):** [`knowledge/ux-patterns/`](../knowledge/ux-patterns/README.md) — 각 Pattern의 `PATTERN.md`  
Code: `src/playground/ux-patterns.ts` · Live: `/patterns`

---

## Definition

각 Pattern은 최소한 다음을 가집니다.

| Field | Meaning |
| --- | --- |
| UX Goal | 사용자가 달성할 결과 |
| User Task | 조회 · 수정 · 현황 등 |
| Components | Kit 조립 순서 |
| Responsive · Accessibility | 좁은 폭 · 키보드 · 대비 |
| Best Practice | 운영 팁 |
| **States** | 아래 필수 상태 |

`PATTERN.md` 고정 목차: Overview · UX Goal · User Problems · User Tasks · When to Use · When NOT to Use · UX Flow · Layout Structure · Required Components · Responsive Rules · Accessibility · Best Practices · Anti Patterns · Examples · Related Patterns

### Required states (모든 Pattern)

`Default` · `Hover` · `Focus` · `Active` · `Disabled` · `Empty` · `Loading` · `Error` · `Responsive`

---

## Expanded catalog (knowledge)

| Pattern | Goal | PATTERN.md |
| --- | --- | --- |
| Search | 최소 입력으로 대상 도달 | [search/PATTERN.md](../knowledge/ux-patterns/search/PATTERN.md) |
| Filter | 조건으로 집합 축소 | [filter/PATTERN.md](../knowledge/ux-patterns/filter/PATTERN.md) |
| Data Table | **데이터 조회** | [data-table/PATTERN.md](../knowledge/ux-patterns/data-table/PATTERN.md) |
| CRUD Form | **등록 및 수정** | [crud-form/PATTERN.md](../knowledge/ux-patterns/crud-form/PATTERN.md) |
| Detail Drawer | 목록 유지 상세·수정 | [detail-drawer/PATTERN.md](../knowledge/ux-patterns/detail-drawer/PATTERN.md) |
| Dashboard | **현황 확인** | [dashboard/PATTERN.md](../knowledge/ux-patterns/dashboard/PATTERN.md) |
| Analytics | 지표 해석·Export | [analytics/PATTERN.md](../knowledge/ux-patterns/analytics/PATTERN.md) |
| Empty State | 원인 + CTA | [empty-state/PATTERN.md](../knowledge/ux-patterns/empty-state/PATTERN.md) |
| Loading | Skeleton 우선 | [loading/PATTERN.md](../knowledge/ux-patterns/loading/PATTERN.md) |
| Error | Retry · Help | [error/PATTERN.md](../knowledge/ux-patterns/error/PATTERN.md) |
| Confirm Dialog | **삭제** 확인 | [confirm-dialog/PATTERN.md](../knowledge/ux-patterns/confirm-dialog/PATTERN.md) |
| Notification | 비차단 피드백 | [notification/PATTERN.md](../knowledge/ux-patterns/notification/PATTERN.md) |
| File Upload | 선택·전송·검증 | [file-upload/PATTERN.md](../knowledge/ux-patterns/file-upload/PATTERN.md) |
| File Manager | 파일 탐색·운영 | [file-manager/PATTERN.md](../knowledge/ux-patterns/file-manager/PATTERN.md) |
| Calendar | 날짜축 일정 | [calendar/PATTERN.md](../knowledge/ux-patterns/calendar/PATTERN.md) |
| Timeline | 이력·Activity | [timeline/PATTERN.md](../knowledge/ux-patterns/timeline/PATTERN.md) |
| Kanban | 상태 열 워크플로 | [kanban/PATTERN.md](../knowledge/ux-patterns/kanban/PATTERN.md) |
| Settings | 환경 구성 | [settings/PATTERN.md](../knowledge/ux-patterns/settings/PATTERN.md) |
| Permission | 역할·ACL | [permission/PATTERN.md](../knowledge/ux-patterns/permission/PATTERN.md) |
| AI Chat | Compose · Apply · Rollback (**Generate 금지**) | [ai-chat/PATTERN.md](../knowledge/ux-patterns/ai-chat/PATTERN.md) |

인덱스·철학: [`knowledge/ux-patterns/README.md`](../knowledge/ux-patterns/README.md)

---

## Catalog summary

### Navigation

| Pattern | Goal (요약) |
| --- | --- |
| App Bar | 전역 검색·알림·프로필 |
| Navigation Rail / Drawer | Admin 1차·계층 IA |
| Bottom Navigation | 모바일 핵심 3–5 목적지 |
| Breadcrumb | 계층 위치 · 상위 복귀 |

### Core Task

| Pattern | Goal | Stack / Notes |
| --- | --- | --- |
| **Search** | 최소 입력으로 대상 도달 | Field · Autocomplete · Recent · Result |
| **Filter** | 조건으로 집합 축소 | Category · Status · Date · Reset · Apply |
| **Data Table** | **데이터 조회** | Search → Filter → Bulk → Table → Pagination · Empty · Loading |
| **List** | 소량 스캔 | DATA_DENSITY: **&lt;20** → List/Card · **≥20** → Table |
| **Detail Drawer** | 목록 유지한 채 상세 | Drawer 우선 |
| **CRUD Form** | **등록 및 수정** | Form · Validation · Submit · Cancel · Sticky Footer |
| **Dashboard** | **현황 확인** | KPI → Charts → Recent Activity → Quick Action |
| **Analytics** | 지표 해석·내보내기 | KPI · Filters · Charts · Table · Export |

### Feedback

| Pattern | Goal |
| --- | --- |
| **Confirm Dialog** | Confirm · Warning · Delete (Modal) |
| **Notification / Snackbar** | Success · Error · Undo (비차단) |
| **Empty State** | 원인 설명 + **Primary CTA** |
| **Loading** | Skeleton 우선 · Spinner · Progress |
| **Error** | Retry · Help Link |

### Workflow / Domain

| Pattern | Goal |
| --- | --- |
| **Wizard** | 다단계 — **Page** (Drawer 금지가 기본) |
| Calendar · Timeline · Kanban | 일정 · 이력 · 상태 보드 |
| Permission · File Upload · File Manager · Settings | 권한 · 업로드 · 파일 · 설정 |

### JKO

| Pattern | Goal |
| --- | --- |
| **AI Chat** | Compose 결과 검토 · Apply · Rollback — Generate 금지 · 토큰/컴포넌트 발명 금지 |

---

## Goal → Task (core three)

| Pattern | Goal | User Task | Components (order) |
| --- | --- | --- | --- |
| **Data Table** | 데이터 조회 | 검색 · 필터 · 정렬 · 선택 · 삭제 | Search → Filter → Bulk → Table → Pagination · Empty · Loading |
| **Dashboard** | 현황 확인 | KPI · Charts · Activity · Quick Action | KPI → Charts → Recent Activity → Quick Action |
| **CRUD Form** | 등록 및 수정 | Form · Validation · Submit · Cancel | Form · Validation · Submit · Cancel (+ Sticky Footer on Drawer edit) |

---

## Surface cheat sheet

| Intent | Pattern / Surface |
| --- | --- |
| 수정 + 목록 유지 | Detail Drawer / CRUD → **Drawer** |
| 빠른 확인 | Detail Drawer → **Drawer** |
| 빠른 작업 (짧은 결정) | Confirm Dialog → **Modal** |
| 삭제 | Confirm Dialog → **Confirm** |
| 생성 · Wizard · 많은 정보 | **Page** |

---

## Examples

**조회 Task** → Data Table Pattern (Search First … Admin Stack)  
**현황 Task** → Dashboard Pattern (KPI first, Table은 필수 스택 아님)  
**등록 Task** → CRUD Page · **수정 Task** → CRUD/Detail Drawer

Live screens: `/screens/member-management` · `/screens/dashboard` · `/screens/product-management` · `/screens/notice` · `/screens/faq`

---

## Related docs

- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [04_COMPONENT_RULES](./04_COMPONENT_RULES.md)
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [10_BEST_PRACTICES](./10_BEST_PRACTICES.md)
- Expanded: [`knowledge/ux-patterns/README.md`](../knowledge/ux-patterns/README.md)
- Satellite: `docs/patterns/` · `/patterns`
