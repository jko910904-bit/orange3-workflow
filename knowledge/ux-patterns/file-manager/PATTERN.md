# Overview

**File Manager**는 저장소 내 파일을 **탐색·검색·정렬·이동/삭제·다운로드**하는 Task Pattern이다.  
업로드 한 방(Upload)과 달리 **목록 운영**이 중심이며 Admin Stack 정신을 파일 도메인에 적용한다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/file-manager`](/patterns/file-manager)

# UX Goal

사용자가 원하는 파일을 **찾고**, 메타를 확인하며, 안전한 액션(다운로드·삭제·이동)을 수행한다.

# User Problems

- 폴더 트리가 깊어 위치를 잃는다
- Search가 없고 썸네일만 있다
- 삭제가 Confirm 없다
- Bulk와 단건 액션 Primary가 난립한다
- Upload와 Manager UI가 한 화면에 중복 Search를 만든다

# User Tasks

- 폴더/경로 탐색 · Breadcrumb
- 검색 · 필터(유형·기간)
- 정렬 · 뷰 전환(리스트/그리드) — 밀도 규칙 준수
- 업로드 진입 · 다운로드 · 삭제(Confirm) · 이동/이름변경

# When to Use

- 자료실 · 첨부 보관소 · 미디어 라이브러리 운영
- 다수 파일 ≥20 → 리스트/테이블 밀도

# When NOT to Use

- 폼에 파일 1–3개만 첨부 → File Upload 섹션
- 현황 KPI만 → Dashboard
- Kanban으로 파일 상태 보드가 더 적합할 때(워크플로) → Kanban

# UX Flow

```
(Search → Filter) → File list/grid → Pagination/infinite(제품 표준 하나)
행/카드 → Detail Drawer(메타·미리보기)
업로드 → File Upload flow
삭제 → Confirm
```

# Layout Structure

```
Header (업로드 Secondary/메뉴 · 뷰 토글)
Search
Filter (type · date)
[ Tree optional | File Table/Grid ]
Pagination
```

Admin 12 / 1440 / 240 / fluid. Tree는 sidebar 내부가 아니라 content 분할로도 가능 — LNB와 역할 혼선 주의.

# Required Components

Input.Search · Filter · Table or Grid · Breadcrumb · Button · Drawer · Modal(Confirm) · Upload entry · Empty · Skeleton

# Responsive Rules

- Tree 숨김 → 경로 Sheet
- Grid→List 자동 붕괴 가능
- Bulk 바 선택 시 노출

# Accessibility

- 그리드/리스트 `aria` 선택 모델
- 미리보기 Drawer 포커스 트랩
- 파일명  Truncate 시 title/accessible name

# Best Practices

1. Search First 유지 — Upload 드롭존을 Search 위에 두지 않음
2. 삭제 Confirm · Bulk 동일
3. &lt;20이면 카드, ≥20이면 Table ([`07`](../../../docs/07_UX_DECISION_TREE.md))
4. Primary는 “업로드” 또는 “조회” 중 화면당 하나
5. Empty CTA = 업로드

# Anti Patterns

- Search 아래 Search (경로 검색+전역 검색 중복)
- Form 안 풀 File Manager
- Modal in Modal
- 새 파일 아이콘 컬러 체계 창작

# Examples

- Live: [`/patterns/file-manager`](/patterns/file-manager)
- Upload 연계: [File Upload PATTERN](../file-upload/PATTERN.md)

# Related Patterns

- [File Upload](../file-upload/PATTERN.md)
- [Search](../search/PATTERN.md) · [Filter](../filter/PATTERN.md) · [Data Table](../data-table/PATTERN.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [Confirm Dialog](../confirm-dialog/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md)
- [Permission](../permission/PATTERN.md) — 다운로드/삭제 권한
- Recipes: [admin-file-manager](../recipes/admin-file-manager.md)
