# Overview

**Empty State**는 데이터·결과가 **없을 때** 원인과 **다음 행동(CTA)**을 제공하는 Feedback Pattern이다.  
Rule `empty-cta`: Empty에는 **반드시 Primary CTA**.

Canonical: [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) · Live: [`/patterns/empty`](/patterns/empty)

# UX Goal

사용자가 “왜 비었는지”를 이해하고 **한 번의 행동**으로 회복한다 (생성 · 필터 초기화 · 권한 요청 · 재시도).

# User Problems

- “0건” / 빈 테이블만 있고 할 일이 없다
- 첫 사용 Empty와 필터 결과 Empty가 구분되지 않는다
- CTA가 없거나 Secondary만 있다
- 장식 일러스트만 있고 운영 문구가 없다

# User Tasks

- 원인 파악 (아직 데이터 없음 / 필터 과다 / 권한 / 오류)
- CTA 실행
- (선택) 도움 링크

# When to Use

- Data Table · List · Dashboard 위젯 · File Manager · Search 결과 0건
- 첫 엔티티 생성 유도
- 필터/검색으로 결과 없음

# When NOT to Use

- 로딩 중 (→ Loading Skeleton)
- 권한 거부를 Empty로 위장 (→ Error/Permission 명확히)
- 마케팅 랜딩 히어로를 Admin Empty로 이식

# UX Flow

```
영역 마운트 → 데이터 없음 판정
→ 원인 카피 + Primary CTA (+ optional Secondary)
→ CTA → CRUD 생성 / Reset Filter / 문의
```

# Layout Structure

```
(상위 Search/Filter 유지)
[ Empty: icon/illustration(kit) · 제목 · 설명 · CTA ]
```

- Table 영역 중앙; 전체 페이지를 삼키지 않고 **Data 슬롯**에 배치
- Admin Dense에서도 CTA 터치 타깃 유지

# Required Components

Empty container · Typography · Button(Primary CTA) · (optional) Button Secondary · Link Help

# Responsive Rules

- CTA full-width on narrow
- 일러스트는 축소·숨김 가능, **카피+CTA는 유지**

# Accessibility

- 상태 텍스트가 이미지에만 있지 않음
- CTA는 실제 Button
- `aria-live`로 결과 없음 고지 가능

# Best Practices

1. 원인별 카피: “아직 회원이 없습니다” vs “조건에 맞는 결과가 없습니다”
2. 필터 원인이면 CTA = **필터 초기화**
3. 첫 데이터면 CTA = **등록** (CRUD Page)
4. Toss/Stripe식 짧은 문장 — 브랜드 카피 톤 복사 금지
5. 위젯 단위 Empty도 CTA 규칙 동일

# Anti Patterns

- CTA 없는 Empty
- Primary 3개
- Empty인데 Spinner 동시 표시
- Search 아래 또 Search로 “다시 찾아보라”만 제시

# Examples

- Live: [`/patterns/empty`](/patterns/empty)
- Screen: 회원 0건 [`/screens/member-management`](/screens/member-management)
- Rules: [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) Rule 7

# Related Patterns

- [Data Table](../data-table/PATTERN.md) · [Search](../search/PATTERN.md) · [Filter](../filter/PATTERN.md)
- [CRUD Form](../crud-form/PATTERN.md) — 생성 CTA
- [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md)
- [File Manager](../file-manager/PATTERN.md) · [Permission](../permission/PATTERN.md)
- [Dashboard](../dashboard/PATTERN.md)
