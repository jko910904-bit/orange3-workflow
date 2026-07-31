# JKO UX Patterns — Pattern Library (expanded)

> **Pattern = Task 단위** (UI 키트 덤프 아님).  
> Compose ≠ Generate · Knowledge > Features · Kit 재사용 우선.

이 폴더는 JKO Pattern Library의 **확장 본문**이다.  
제품 규칙 요약은 [`docs/05_PATTERN_LIBRARY.md`](../../docs/05_PATTERN_LIBRARY.md) · 8 Rules [`docs/02`](../../docs/02_UX_PRINCIPLES.md) · Decision Tree [`docs/07`](../../docs/07_UX_DECISION_TREE.md).

**Canonical per pattern:** `PATTERN.md`  
`UX_ANALYSIS.md`가 있으면 → PATTERN.md 포인터(레거시).

---

## Philosophy

1. **운영성 · 개발 생산성 · 유지보수 · 재사용**이 비주얼보다 우선이다.
2. 화면 전에 Task → Pattern → Component → Layout 순으로 고른다.
3. Admin frame: **12 grid · 1440 canvas · sidebar 240 · content fluid** ([`08`](../../docs/08_LAYOUT_RULES.md)).
4. Never/Always · Modal-in-Modal · Primary 3 · Search 아래 Search · Form 안 Table · 새 토큰 금지 ([`11`](../../docs/11_ANTI_PATTERNS.md)).
5. 외부 DS/제품(Material · Apple · Ant · Linear · Stripe · Toss)은 **영감·의사결정만** — 비주얼/브랜드/토큰 복사 금지.

---

## How to use

1. User Task를 정한다 (조회 / 수정 / 현황 / 생성 / 삭제 …).
2. 아래 인덱스에서 Pattern을 고른다.
3. `PATTERN.md`의 When / Flow / Layout / Related를 읽고 **Recipe**(ordered chain)로 compose.
4. Live 확인: `/patterns/[id]` · `/screens/...`

### Relationships & Recipes

| Doc | What |
| --- | --- |
| **[RELATIONSHIPS.md](./RELATIONSHIPS.md)** | Pattern upstream/downstream · satellites · overlay graph |
| **[recipes/](./recipes/README.md)** | Screen Recipes by domain (Admin / SaaS / AI) — **expanded source** |
| [`docs/06_SCREEN_RECIPES.md`](../../docs/06_SCREEN_RECIPES.md) | Product summary · points here for full chains |

---

## Pattern index (20)

### Core Task

| Pattern | Goal | Doc | Live |
| --- | --- | --- | --- |
| **Search** | 최소 입력으로 대상 도달 | [search/PATTERN.md](./search/PATTERN.md) | `/patterns/search` |
| **Filter** | 조건으로 집합 축소 | [filter/PATTERN.md](./filter/PATTERN.md) | `/patterns/filter` |
| **Data Table** | **데이터 조회** | [data-table/PATTERN.md](./data-table/PATTERN.md) | `/patterns/data-table` |
| **CRUD Form** | **등록 및 수정** | [crud-form/PATTERN.md](./crud-form/PATTERN.md) | `/patterns/crud` |
| **Detail Drawer** | 목록 유지 상세·수정 | [detail-drawer/PATTERN.md](./detail-drawer/PATTERN.md) | `/patterns/detail` |
| **Dashboard** | **현황 확인** | [dashboard/PATTERN.md](./dashboard/PATTERN.md) | `/patterns/dashboard` |
| **Analytics** | 지표 해석·Export | [analytics/PATTERN.md](./analytics/PATTERN.md) | `/patterns/analytics` |

### Feedback

| Pattern | Goal | Doc | Live |
| --- | --- | --- | --- |
| **Empty State** | 원인 + **CTA** | [empty-state/PATTERN.md](./empty-state/PATTERN.md) | `/patterns/empty` |
| **Loading** | **Skeleton** 우선 | [loading/PATTERN.md](./loading/PATTERN.md) | `/patterns/loading` |
| **Error** | Retry · Help | [error/PATTERN.md](./error/PATTERN.md) | `/patterns/error` |
| **Confirm Dialog** | **삭제** 등 비가역 확인 | [confirm-dialog/PATTERN.md](./confirm-dialog/PATTERN.md) | `/patterns/dialog` |
| **Notification** | 비차단 성공/실패/Undo | [notification/PATTERN.md](./notification/PATTERN.md) | `/patterns/notification` · `/patterns/snackbar` |

### Workflow / Domain

| Pattern | Goal | Doc | Live |
| --- | --- | --- | --- |
| **File Upload** | 선택·전송·검증 | [file-upload/PATTERN.md](./file-upload/PATTERN.md) | (CRUD/File Manager 연계) |
| **File Manager** | 탐색·운영 | [file-manager/PATTERN.md](./file-manager/PATTERN.md) | `/patterns/file-manager` |
| **Calendar** | 날짜축 일정 | [calendar/PATTERN.md](./calendar/PATTERN.md) | `/patterns/calendar` |
| **Timeline** | 이력·Activity | [timeline/PATTERN.md](./timeline/PATTERN.md) | `/patterns/timeline` |
| **Kanban** | 상태 열 워크플로 | [kanban/PATTERN.md](./kanban/PATTERN.md) | (문서 canonical) |
| **Settings** | 환경 구성 | [settings/PATTERN.md](./settings/PATTERN.md) | `/patterns/settings` |
| **Permission** | 역할·ACL | [permission/PATTERN.md](./permission/PATTERN.md) | `/patterns/permission` |

### JKO

| Pattern | Goal | Doc | Live |
| --- | --- | --- | --- |
| **AI Chat** | Compose 검토·Apply·Rollback (**Generate 금지**) | [ai-chat/PATTERN.md](./ai-chat/PATTERN.md) | `/patterns/ai` |

---

## Goal → stack (core three)

| Pattern | Goal | Stack |
| --- | --- | --- |
| Data Table | 데이터 조회 | Search → Filter → Bulk → Table → Pagination → Empty → Loading |
| Dashboard | 현황 확인 | KPI → Charts → Recent Activity → Quick Action |
| CRUD Form | 등록 및 수정 | Form → Validation → Submit → Cancel (+ Sticky Footer) |

Surface: **수정+목록 유지 / 빠른 확인 = Drawer** · **빠른 작업 = Modal** · **삭제 = Confirm**.

Canonical list-ops chain: `Search → Filter → Data Table → Detail Drawer → Confirm` — see [RELATIONSHIPS](./RELATIONSHIPS.md) · [admin-member-management](./recipes/admin-member-management.md).

---

## Legacy folders

| Path | Note |
| --- | --- |
| `crud/` · `detail/` | → [crud-form](./crud-form/PATTERN.md) · [detail-drawer](./detail-drawer/PATTERN.md) |
| `list/` | 밀도 분기(&lt;20) 메모 — Table과 Decision Tree로 연계 |

---

## Cross-links (inspiration only)

| Need | See |
| --- | --- |
| Enterprise table/form | [`../design-systems/ant-design`](../design-systems/ant-design/UX_ANALYSIS.md) |
| Speed / keyboard | [`../case-studies/linear`](../case-studies/linear/UX_ANALYSIS.md) |
| Error / dashboard→task | [`../case-studies/stripe`](../case-studies/stripe/UX_ANALYSIS.md) |
| Single CTA / short flows | [`../case-studies/toss`](../case-studies/toss/UX_ANALYSIS.md) |

충돌 시 **`docs/` 01–12가 우선**. `orange3-workflow`는 명시 요청 없으면 비범위.
