# Overview

**Dashboard**는 **현황 확인** Task Pattern이다.  
장식용 위젯 모음이 아니라, 한눈에 상태를 보고 **다음 운영 Task로 점프**하게 한다.

```
KPI → Charts → Recent Activity → Quick Action
```

Canonical: [`docs/patterns/dashboard.md`](../../../docs/patterns/dashboard.md) · [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/dashboard`](/patterns/dashboard)

# UX Goal

사용자가 “지금 무엇이 중요한가?”를 **즉시 파악**하고, 필요 시 목록·상세·생성으로 이동한다.  
Search→Filter 목록 스택을 Dashboard에 복사하지 않는다.

# User Problems

- KPI만 화려하고 다음 행동이 없다
- 첫 화면에 전체 Data Table을 강제한다
- KPI마다 Primary 버튼이 있다
- 차트가 색만으로 의미를 전달한다
- Activity가 장식 피드로 끝나고 Task와 무관하다

# User Tasks

- KPI 스캔
- 차트/추세 해석
- Recent Activity 확인
- Quick Action 1회로 업무 시작
- (선택) 위젯에서 관련 목록으로 drill-down

# When to Use

- Decision Tree: **현황 확인인가?** YES
- Admin 홈 · 운영 요약 · 포털 요약(Comfortable)
- 매일 아침 “이상 있나?” 루틴

# When NOT to Use

- 주 Task가 **조회·CRUD**인 목록 화면 대체
- Analytics 심층 분석·Export가 주목적 → [Analytics](../analytics/PATTERN.md)
- 위젯 playground로 Foundation/토큰 실험

# UX Flow

```
진입 → KPI 로드(Skeleton)
→ Charts → Activity
→ Quick Action (≤1 Primary)
→ drill-down 시 Data Table / Detail / CRUD로 이동
```

# Layout Structure

```
Page Header
[ KPI grid ]
[ Charts row ]
[ Recent Activity | Quick Action / side ]
```

- Admin: 12 / 1440 / 240 / fluid — KPI는 12-col 그리드
- Portal: centered · Comfortable 가능
- Table은 drill-down 도착지이지 Dashboard 필수 스택이 아님

# Required Components

Card/Stat · Chart(kit) · List/Timeline(Activity) · Button(Quick Action) · Skeleton · Empty(위젯 단위) · Link to patterns

# Responsive Rules

- KPI: 4→2→1열 붕괴
- Charts: 스택 세로
- Quick Action은 접히지 않게 헤더 또는 하단 고정 영역 검토
- Dense Admin에서도 터치 타깃 유지

# Accessibility

- KPI 수치+텍스트 라벨 (색만으로 의미 금지)
- 차트에 요약 텍스트/테이블 대안
- Activity 리스트 키보드 탐색
- Quick Action 명확한 이름

# Best Practices

1. KPI → Charts → Activity → Quick Action 순서 고정 ([`10`](../../../docs/10_BEST_PRACTICES.md))
2. Primary Quick Action **≤1**
3. 각 KPI는 “관련 목록” 링크 1개까지
4. Activity 모델은 [Timeline](../timeline/PATTERN.md)과 공유
5. Stripe “dashboard → task” 서사 재해석 — 브랜드 룩 복사 금지
6. 위젯 Empty에도 CTA (데이터 없음 → 생성/연결)

# Anti Patterns

- 첫 화면에 Admin Stack 전체 Table 강제
- KPI마다 Primary
- Search 아래 Search를 대시보드에 이식
- 장식 그라데이션·새 토큰으로 “대시보드 스킨”
- Modal 중첩로 위젯 설정

# Examples

- Live: [`/patterns/dashboard`](/patterns/dashboard)
- Screen: [`/screens/dashboard`](/screens/dashboard)
- Recipe: [`docs/06`](../../../docs/06_SCREEN_RECIPES.md) Dashboard

# Related Patterns

- [Analytics](../analytics/PATTERN.md) — 심층·Export
- [Timeline](../timeline/PATTERN.md) — Activity
- [Data Table](../data-table/PATTERN.md) — drill-down
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md)
- [CRUD Form](../crud-form/PATTERN.md) — Quick Action 도착
- [Notification](../notification/PATTERN.md) — 이상 알림과 역할 분리
- [AI Chat](../ai-chat/PATTERN.md) — Compose 보조 (현황 대체 금지)
- Recipes: [admin-dashboard](../recipes/admin-dashboard.md) · [admin-analytics](../recipes/admin-analytics.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
