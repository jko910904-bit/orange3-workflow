# Overview

**Timeline**은 시간 순 **이력·이벤트·감사 로그**를 스캔하는 Task Pattern이다.  
Dashboard Recent Activity와 동일 모델을 공유할 수 있다. Live: [`/patterns/timeline`](/patterns/timeline)

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md)

# UX Goal

사용자가 “무엇이 언제 일어났는지”를 **시간 순으로** 이해하고, 필요 시 관련 상세로 이동한다.

# User Problems

- 이력이 Table 정렬만으로 맥락이 약하다
- Activity가 장식 피드로 끝나고 링크가 없다
- 필터 없이 전체가 한 줄로 섞인다
- 로딩/빈 구간 처리 없음

# User Tasks

- 스크롤 스캔
- 기간·유형 Filter
- 이벤트 클릭 → Detail
- (선택) 관련 알림/파일 열기

# When to Use

- 감사 로그 · 상태 변경 이력 · 주문 트래킹
- Dashboard Recent Activity
- Detail Drawer 내 “변경 이력” 섹션

# When NOT to Use

- 대량 운영 조회·Bulk → Data Table
- 일정 계획 → Calendar
- 상태 열 이동 워크플로 → Kanban

# UX Flow

```
(Filter 기간/유형) → Timeline load(Skeleton)
→ 이벤트 스캔 → Detail Drawer / deep link
→ 0건 Empty(+CTA: 필터 초기화)
```

# Layout Structure

```
Filter (optional, below Search if any)
Vertical spine + event rows (time · actor · summary · link)
Pagination or “더 보기”
```

Drawer 안에서는 sticky 헤더 + 스크롤 본문.

# Required Components

List/Timeline · Filter · Link/Button · Skeleton · Empty · Drawer

# Responsive Rules

- 타임 라벨 상단 배치로 1열 붕괴
- Dense에서 행 높이 토큰 준수

# Accessibility

- 목록 의미론 (`ol`/`ul` 또는 동등)
- 시간 datetime 접근 가능
- 링크 목적 명확

# Best Practices

1. Dashboard Activity와 스키마 공유
2. 각 행에 **대상 링크** 1개
3. 상대시간+절대시간 툴팁
4. Linear/GitHub 활동 피드의 **밀도·명확성**만 차용
5. Search가 필요하면 Search First

# Anti Patterns

- Activity를 Primary 버튼 나열로 대체
- Form 안 무한 Timeline
- Empty CTA 없음
- 새 타임라인 전용 그라데이션

# Examples

- Live: [`/patterns/timeline`](/patterns/timeline)
- Dashboard Activity: [`/screens/dashboard`](/screens/dashboard) · [`/patterns/dashboard`](/patterns/dashboard)

# Related Patterns

- [Dashboard](../dashboard/PATTERN.md) · [Analytics](../analytics/PATTERN.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [Notification](../notification/PATTERN.md)
- [Filter](../filter/PATTERN.md) · [Data Table](../data-table/PATTERN.md)
- [Calendar](../calendar/PATTERN.md) · [Kanban](../kanban/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md)
- Recipes: [saas-timeline-activity](../recipes/saas-timeline-activity.md) · [ai-prompt-history](../recipes/ai-prompt-history.md)
