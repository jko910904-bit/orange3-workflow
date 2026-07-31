# Overview

**Filter**는 Search로 좁힌(또는 전체) 집합을 **조건으로 더 축소**하는 Task Pattern이다.  
항상 Search **아래**에만 둔다 (`filter-below-search`). Category · Status · Date · Reset · Apply 역할을 분리한다.

Canonical: [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/filter`](/patterns/filter)

# UX Goal

사용자가 **상태·기간·카테고리 등 구조화된 조건**으로 결과 집합을 의도대로 줄인다.  
검색어 없이도 “미처리만 / 이번 달만” 같은 운영 질문을 답한다.

# User Problems

- 조건이 많아 화면을 절반 이상 차지한다
- Filter가 Search 위·Pagination 옆 등 임의 배치되어 스택이 깨진다
- Apply 없이 타이핑마다 테이블이 갱신되어 인지 부하·요청 폭주
- Reset이 없어 조건을 되돌리지 못한다
- Filter 0건인데 Empty CTA가 없다

# User Tasks

- 카테고리 / 상태 / 날짜 등 조건 선택
- Apply (또는 제품 표준의 즉시 적용)
- Reset으로 초기화
- (선택) 고급 조건 펼치기 / 접기

# When to Use

- Data Table · List · Analytics 상단에서 집합을 줄일 때
- Admin Stack의 Search 직후 블록
- Export 전 범위 한정 (Analytics와 조합)

# When NOT to Use

- Search를 Filter로 대체해 텍스트 축을 없애면서 Filter를 최상단에 올릴 때 (Search First 유지)
- Form 안의 필드 그룹을 Filter Pattern이라 부를 때
- Dashboard KPI 카드마다 미니 Filter를 복제할 때
- Modal 안에 Modal급 고급 Filter를 중첩할 때

# UX Flow

```
Search (유지)
→ Filter 조건 선택
→ Apply (표준) 또는 즉시 적용
→ Data Skeleton
→ Table/List 갱신
→ 0건이면 Empty(Reset Filter CTA)
```

제품에서 **Apply 모델 vs 즉시 적용** 중 하나만 표준화한다.

# Layout Structure

```
[ Search ]
[ Filter: chips/selects | 더보기 | Reset | Apply ]
[ Bulk + Table ]
[ Pagination ]
```

- 기본 한 줄 + progressive disclosure (“더보기”)
- Admin 12 / 1440 / 240 / fluid
- Filter가 폼 그리드로 콘텐츠 절반 이상을 먹지 않게 함

# Required Components

| Role | Kit |
| --- | --- |
| 조건 | Select · Checkbox · Chip · DatePicker (Kit) |
| 적용 | Button Apply |
| 초기화 | Button Reset (Secondary) |
| 접기 | Disclosure / “더보기” |
| 후속 | Data Table · Empty · Loading |

신규 Component·토큰 금지 — Kit compose만.

# Responsive Rules

- Mobile: Filter를 Sheet/Drawer로 접을 수 있음 (목록 유지 맥락이면 하단 Sheet 우선 검토)
- 접힌 상태에서도 “활성 필터 개수” Badge로 상태 노출
- Search보다 위로 올리지 않음

# Accessibility

- 각 컨트롤에 보이는 label
- Apply/Reset은 명확한 버튼명
- 펼침 영역 `aria-expanded`
- 결과 갱신 시 live region 권장

# Best Practices

1. 자주 쓰는 조건만 1차 노출 (Ant/GitHub progressive disclosure를 **재해석**)
2. 활성 필터는 Chip으로 요약 · 개별 제거 가능
3. Reset은 항상 Secondary; Primary는 조회(Search) 또는 Apply 중 **화면당 하나**
4. Filter 변경 중에는 Data Skeleton (`skeleton-loading`)
5. Stripe식 명확한 상태 카피는 가져오되 브랜드 컬러는 복사하지 않는다

# Anti Patterns

- Filter를 Search 위에 배치
- Search 아래 또 Search + Filter 혼재 중복
- Primary 3개 (Apply · 등록 · 내보내기 동시 filled)
- Form 안에 Table을 Filter 결과로 중첩
- 필터 0건에 CTA 없음

# Examples

- Live: [`/patterns/filter`](/patterns/filter)
- Screen: [`/screens/member-management`](/screens/member-management) · [`/screens/product-management`](/screens/product-management)
- Analytics와 조합: [`/patterns/analytics`](/patterns/analytics)

# Related Patterns

- [Search](../search/PATTERN.md) — 바로 위
- [Data Table](../data-table/PATTERN.md) — 적용 대상
- [Analytics](../analytics/PATTERN.md) — 기간·지표 Filter
- [Empty State](../empty-state/PATTERN.md) — Reset CTA
- [Loading](../loading/PATTERN.md)
- [Dashboard](../dashboard/PATTERN.md) — 현황면 Filter는 KPI와 역할 분리
- [Settings](../settings/PATTERN.md) — 설정 저장 ≠ 목록 Filter
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [admin-product-catalog](../recipes/admin-product-catalog.md) · [admin-analytics](../recipes/admin-analytics.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
