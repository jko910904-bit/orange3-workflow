# Overview

**Calendar**는 시간축 위에 **일정·예약·마감**을 조회·생성하는 Task Pattern이다.  
목록 Table의 대체재가 아니라, **날짜가 주 스캔 축**일 때 선택한다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/calendar`](/patterns/calendar)

# UX Goal

사용자가 특정 날짜/주/월에서 **무엇이 있는지** 보고, 슬롯을 선택해 상세·생성으로 이어간다.

# User Problems

- 일정을 Table로만 봐 날짜 밀도를 못 느낀다
- 뷰(월/주/일) 전환마다 Search가 중복된다
- 생성 Modal에 긴 CRUD를 우겨넣는다
- 타임존·종일 이벤트가 모호하다

# User Tasks

- 월/주/일 뷰 전환
- 날짜·이벤트 스캔
- 필터(캘린더/유형)
- 슬롯 클릭 → 생성/상세
- 드래그 이동(제품이 허용할 때) + 확인

# When to Use

- 예약 · 캠페인 일정 · 운영 마감 캘린더
- 날짜가 1차 IA일 때

# When NOT to Use

- 순수 엔티티 조회(회원 목록 등) → Data Table
- 이력 감사 로그 → Timeline
- 상태 워크플로 보드 → Kanban

# UX Flow

```
Toolbar(뷰 · today · Filter)
→ Calendar grid load(Skeleton)
→ 이벤트 클릭 → Detail Drawer
→ 빈 슬롯 → CRUD (짧은 건 Modal 가능 / 긴 건 Page)
→ 삭제 → Confirm
```

# Layout Structure

```
Header + View switch
Filter (calendars · types)
Calendar canvas
(optional) Side mini list of selected day
```

Admin 12 / 1440 / 240 / fluid. Portal Comfortable 가능.

# Required Components

Button(뷰) · Filter · Calendar grid(kit) · Drawer · Modal/Page Form · Empty · Skeleton · Confirm

# Responsive Rules

- 월뷰 → 리스트 어젠다로 붕괴 가능
- 툴바 액션 overflow
- 터치 드래그는 모바일에서 비활성 검토

# Accessibility

- 키보드로 날짜 이동 · Enter 선택
- 이벤트 이름·시간 텍스트 (색만 금지)
- Drawer/Dialog 포커스

# Best Practices

1. Filter below toolbar; 이중 Search 금지
2. 상세는 Drawer 우선
3. 생성 길면 Page — Modal에 Wizard 금지
4. 충돌/중복은 Error 카피로
5. Apple/Google 캘린더 인터랙션은 **영감만**, 비주얼·제스처 복사 금지

# Anti Patterns

- Form 안 풀 캘린더+Table 중첩
- Primary 3개 (오늘·생성·내보내기 filled)
- 삭제 즉시
- 새 캘린더 전용 컬러 스케일을 Foundation에 추가 (Badge 토큰 재사용)

# Examples

- Live: [`/patterns/calendar`](/patterns/calendar)
- 상세: [`/patterns/detail`](/patterns/detail)

# Related Patterns

- [Timeline](../timeline/PATTERN.md) · [Kanban](../kanban/PATTERN.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md)
- [Filter](../filter/PATTERN.md) · [Confirm Dialog](../confirm-dialog/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md)
- [Dashboard](../dashboard/PATTERN.md) — 오늘 일정 위젯
- Recipes: [saas-calendar-schedule](../recipes/saas-calendar-schedule.md)
