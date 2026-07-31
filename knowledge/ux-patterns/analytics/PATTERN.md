# Overview

**Analytics**는 지표를 **해석·비교·내보내기**하는 Task Pattern이다.  
Dashboard가 “현황 스냅샷”이라면 Analytics는 “질문→필터→차트/표→Export” 루프다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/analytics`](/patterns/analytics)

# UX Goal

사용자가 기간·차원·지표를 바꿔 **왜 이런 수치인가**를 이해하고, 필요 시 표로 검증·Export한다.

# User Problems

- Dashboard와 Analytics가 구분되지 않아 홈이 분석 도구로 비대해진다
- Filter 없이 차트만 있어 질문을 바꿀 수 없다
- Export가 Primary 경쟁을 일으킨다
- 표와 차트 숫자가 불일치한다
- 로딩·빈 구간 처리가 없다

# User Tasks

- 기간/차원 Filter
- KPI·차트 해석
- 표로 drill / 정렬
- Export
- (선택) 이상 구간에서 목록으로 이동

# When to Use

- 리포트 · 매출/트래픽 분석 · 운영 지표 심층
- Export·비교가 주 Task일 때
- Dashboard Quick Action “상세 분석” 도착지

# When NOT to Use

- 매일 3초 현황만 → Dashboard
- CRUD 조회 목록을 차트로 포장할 때
- AI가 지표를 “생성”한다고 토큰/차트를 즉석 발명할 때

# UX Flow

```
Filter(기간·세그먼트) → Apply
→ KPI + Charts (Skeleton)
→ (Optional) Summary Table
→ Export (Secondary)
→ 이상 클릭 → Data Table / Detail
```

# Layout Structure

```
Header (제목 · Export Secondary)
Filter bar
KPI strip
Charts grid
Summary Table (필요 시 — Admin stack 축약 가능)
```

Admin 12 / 1440 / 240 / fluid. Table이 주가 되면 Data Table Pattern으로 승격·분리.

# Required Components

Filter controls · Stat/KPI · Chart · Table · Button(Export) · Empty · Skeleton · Date range

# Responsive Rules

- Filter: 접기 Sheet
- Charts 1열 스택
- Export는 overflow menu로 옮겨 Primary 경쟁 방지

# Accessibility

- 차트 대체 텍스트/데이터 테이블
- 색+패턴/라벨
- Export 성공/실패를 Notification으로 고지

# Best Practices

1. Dashboard ⊂ 요약, Analytics ⊂ 질문·Export — IA 분리
2. Filter below header; Search가 있으면 Search First 유지
3. Export는 Secondary/메뉴
4. 차트와 Table 동일 쿼리 소스
5. Linear/Stripe의 “명확한 숫자” 규율만 차용

# Anti Patterns

- KPI마다 Primary
- Search 없는 거대한 차트 월
- Form 안 Chart+Table 혼합 CRUD
- 새 차트 색 팔레트를 Foundation에 추가

# Examples

- Live: [`/patterns/analytics`](/patterns/analytics)
- Screen 연계: [`/screens/dashboard`](/screens/dashboard) → 상세 분석 진입
- 관련 BP: [`docs/10`](../../../docs/10_BEST_PRACTICES.md) Dashboard BP 확장

# Related Patterns

- [Dashboard](../dashboard/PATTERN.md)
- [Filter](../filter/PATTERN.md) · [Data Table](../data-table/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md)
- [Notification](../notification/PATTERN.md) — Export 완료
- [Timeline](../timeline/PATTERN.md) — 이벤트 상관
- Recipes: [admin-analytics](../recipes/admin-analytics.md) · [admin-dashboard](../recipes/admin-dashboard.md)
