# Overview

**Kanban**은 **상태 열(Column)** 위에서 카드를 이동하며 워크플로를 운영하는 Task Pattern이다.  
조회 Table의 대체재가 아니라, **상태가 1차 스캔 축**이고 이동이 핵심 Task일 때 쓴다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/07`](../../../docs/07_UX_DECISION_TREE.md)  
(Live 전용 id 없을 수 있음 — Pattern 문서를 canonical로 사용 · 유사 밀도는 `/patterns/list`)

# UX Goal

사용자가 작업 항목의 **현재 단계**를 한눈에 보고, 드래그/액션으로 다음 상태로 옮기며 병목을 발견한다.

# User Problems

- 상태 필터만 있는 Table로 병목이 안 보인다
- 열·카드 Primary가 난립한다
- 카드 상세가 매번 풀페이지로 나간다
- 권한 없는 상태 전이가 조용히 실패한다
- Search가 보드 아래·열마다 중복된다

# User Tasks

- 보드 스캔 (열 단위)
- 검색·필터로 카드 축소
- 카드 이동 (상태 전이)
- 카드 상세 (Drawer)
- 생성 · 삭제(Confirm)

# When to Use

- 문의/티켓 · 콘텐츠 검수 · 배포 단계 등 **상태 머신** 운영
- 열이 3–7개로 안정적일 때

# When NOT to Use

- 대량 ≥20×다컬럼 조회·Bulk 회계성 작업 → Data Table
- 날짜가 주축 → Calendar
- 단순 현황 KPI → Dashboard
- 열이 수시로 사용자 정의로 폭발해 Pattern이 무너질 때 (설정과 분리)

# UX Flow

```
Search → Filter
→ Board (columns Skeleton→cards)
→ Drag/Move → (필요 시 Confirm for risky transition)
→ Card click → Detail Drawer → CRUD 저장
→ Empty column CTA (만들기) 선택적
```

# Layout Structure

```
Header (생성 Secondary/Primary 정책 준수)
Search
Filter
[ Column ][ Column ][ Column ] …  horizontal scroll
```

Admin 12 / 1440 / 240 / fluid — 보드는 content fluid 영역. 열 헤더에 카운트.

# Required Components

Input.Search · Filter · Column · Card · Badge · Drawer · Button · Confirm · Empty · Skeleton

# Responsive Rules

- 좁은 폭: 열 스와이프 또는 열 선택 드롭다운+단일 열 뷰
- 드래그 대안: 카드 메뉴 “상태 변경”
- Dense 카드 패딩 토큰 준수

# Accessibility

- 키보드로 상태 변경 동등 동작 필수 (드래그 only 금지)
- 열 `aria-label` + 카드 위치 안내
- Drawer 포커스 트랩

# Best Practices

1. Search First — 열 내부 미니 Search 남발 금지
2. 상세 = Drawer · 삭제 = Confirm
3. 상태 전이 실패 = Error+권한 메시지
4. Primary는 “카드 만들기” 등 **하나**
5. Linear 보드의 속도·키보드 영감만 — 스킨 복사 금지
6. 카드 &lt;20/열 권장; 과다 시 Filter 강화 또는 Table 뷰 토글

# Anti Patterns

- Form 안에 Kanban
- Modal in Modal (이동 확인+편집)
- Primary 3개
- Foundation에 열별 새 컬러 창작 (기존 Badge/토큰)
- Empty CTA 없는 빈 열(운영상 필요 시 CTA)

# Examples

- 문서 canonical: 본 PATTERN.md
- 상세 연계: [`/patterns/detail`](/patterns/detail) · 목록 밀도: [`/patterns/list`](/patterns/list)
- 조회 전환: [`/patterns/data-table`](/patterns/data-table)

# Related Patterns

- [Data Table](../data-table/PATTERN.md) · [List 밀도](../list/UX_ANALYSIS.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md)
- [Search](../search/PATTERN.md) · [Filter](../filter/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) · [Permission](../permission/PATTERN.md)
- [Timeline](../timeline/PATTERN.md) · [Calendar](../calendar/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md)
- Recipes: [saas-kanban-board](../recipes/saas-kanban-board.md)
