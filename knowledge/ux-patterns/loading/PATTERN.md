# Overview

**Loading**은 대기 중임을 **레이아웃을 유지한 채** 보여주는 Feedback Pattern이다.  
Rule `skeleton-loading`: **Skeleton 우선**. Spinner는 짧은 액션·버튼 인라인용.

Canonical: [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) · Live: [`/patterns/loading`](/patterns/loading)

# UX Goal

사용자가 구조(표·카드·폼)를 예상한 채로 기다리며, 완료 후 **레이아웃 점프**를 최소화한다.

# User Problems

- 화면 중앙 Spinner만으로 무엇이 로딩인지 모른다
- 로드 후 높이가 튀어 스크롤이 튄다
- Empty와 Loading이 동시에 보인다
- 버튼 이중 제출을 막지 못한다

# User Tasks

- 대기 인지
- (가능하면) 취소
- 완료 후 결과 소비

# When to Use

- 초기 목록/대시보드/드로어 본문 로드
- Filter·Search 적용 후 결과 갱신
- 저장·Export 등 짧은 액션 (버튼 로딩)

# When NOT to Use

- 이미 데이터가 있을 때 전체를 Skeleton으로 깜빡이며 덮기 (부분/행 단위 선호)
- 에러를 Loading으로 위장
- 무한 Skeleton (타임아웃 → Error)

# UX Flow

```
요청 시작 → 해당 슬롯 Skeleton (또는 Progress)
→ 성공: 데이터 교체
→ 실패: Error(+Retry)
→ 0건: Empty(+CTA)
```

# Layout Structure

- **Table**: 헤더 유지 + 행 Skeleton
- **Dashboard**: KPI/Chart 자리 Skeleton
- **Drawer**: 본문 Skeleton, 헤더 유지
- **Button**: 인라인 Spinner + disabled

Admin 스택 순서·폭을 바꾸지 않는다.

# Required Components

Skeleton · Progress · Spinner(버튼) · (optional) Cancel

# Responsive Rules

- Skeleton 블록 수는 뷰포트에 맞게 축소
- Dense/Comfortable 높이 토큰 준수 — 새 높이 창작 금지

# Accessibility

- `aria-busy` · live region “불러오는 중”
- 장시간 대기 시 상태 텍스트
- 모션 축소 설정 존중 (과도한 shimmer 금지)

# Best Practices

1. Skeleton first — 중앙 Spinner 영구 금지 ([`10`](../../../docs/10_BEST_PRACTICES.md))
2. Search/Filter chrome은 유지, Data만 Skeleton
3. 재요청 시 전체 페이지 플래시 최소화
4. Material/Ant 스켈레톤 개념만 재해석
5. 타임아웃·실패는 [Error](../error/PATTERN.md)

# Anti Patterns

- Spinner만 풀스크린 영구
- Empty+Loading 동시
- Skeleton 중에도 Primary 다중 제출
- 새 shimmer 색을 Foundation에 추가

# Examples

- Live: [`/patterns/loading`](/patterns/loading)
- Data Table 로딩: [`/patterns/data-table`](/patterns/data-table)
- Dashboard: [`/screens/dashboard`](/screens/dashboard)

# Related Patterns

- [Empty State](../empty-state/PATTERN.md) · [Error](../error/PATTERN.md)
- [Data Table](../data-table/PATTERN.md) · [Dashboard](../dashboard/PATTERN.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md)
- [File Upload](../file-upload/PATTERN.md) — Progress
- [Analytics](../analytics/PATTERN.md)
