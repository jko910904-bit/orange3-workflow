# 10 — Best Practices

## Purpose

일일 운영·개발에서 반복되는 **좋은 기본값**을 모읍니다.  
Decision Tree · Principles를 대체하지 않고 **실행 팁**으로 보완합니다.

---

## Search BP

| Do | Don't |
| --- | --- |
| 검색창 **좌측**, 조회 버튼 **우측** | Search를 테이블 아래/모달 안에 중복 |
| Enter로 조회 | 조회 Primary와 등록 Primary 동시 |
| 최근 검색·제안으로 입력 최소화 | 빈 결과에 CTA 없이 “0건”만 |
| 빈 결과 → Empty Pattern (Reset / 새 등록 CTA) | Search 아래 또 Search |

관련: Rule #1–2 · Search Pattern

---

## Data Table BP

| Do | Don't |
| --- | --- |
| Search → Filter → Bulk → Table → Pagination | Filter를 Pagination 옆 등 임의 배치 |
| ≥20 → Table · &lt;20 → Card/List | 3건인데 20열 Table |
| Primary = **조회만** | 조회+등록+내보내기 모두 Primary |
| 행 상세 → **Drawer** | 행마다 풀페이지 이동 |
| 삭제 → Confirm | 툴바에서 즉시 삭제 |
| Loading = 행 Skeleton · Empty = CTA | Spinner만 화면 중앙에 영구 |

관련: Rule #8 · Data Table Pattern · [06](./06_SCREEN_RECIPES.md) 회원관리

---

## Form / CRUD BP

| Do | Don't |
| --- | --- |
| **생성 = Page** · **수정 = Drawer** | 생성/수정 모두 같은 Modal에 긴 폼 |
| Sticky Footer: 저장 Primary 하나 | Footer에 Primary 3개 |
| Validation 에러를 필드에 연결 | 상단 alert만 있고 필드 표시 없음 |
| Cancel = Secondary · 삭제 = Danger+Confirm | Form 안에 Table |
| 미저장 이탈 시 Dialog | Wizard를 Drawer에 억지로 |

관련: CRUD Pattern · Drawer vs Page

---

## Dashboard BP

| Do | Don't |
| --- | --- |
| KPI → Charts → Activity → Quick Action | 첫 화면에 전체 Data Table 강제 |
| Primary Quick Action ≤1 | KPI마다 Primary 버튼 |
| 차트 + 텍스트 요약 | 색만으로 지표 의미 |
| Activity는 Timeline과 동일 모델 | Search→Filter 목록 스택을 Dashboard에 복사 |

관련: Dashboard Pattern · Rule #3

---

## Operational tips

1. **Problem → Pattern → Component** 순으로 말하고 나서 UI
2. 새 화면 = 기존 Screen Recipe 변형인지 먼저 확인 ([06](./06_SCREEN_RECIPES.md))
3. Bulk·Export·Secondary는 Primary와 시각 경쟁시키지 않음
4. Dense Admin에서도 터치/클릭 타깃과 focus ring 유지
5. Playground에서 성공한 실험도 **Kit PR 없이** 제품에 토큰/컴포넌트 반영 금지
6. “예외”는 Decision Tree 문서에 한 줄로 남기고, 예외를 기본값으로 승격하지 않음

---

## Examples

**맞음** — 필터 Apply 전까지 테이블 고정 · Apply 후 Skeleton → 결과  
**틀림** — 타이핑마다 테이블 갱신 + Search 2개 + Empty에 CTA 없음

---

## Related docs

- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [09_ACCESSIBILITY](./09_ACCESSIBILITY.md)
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md)
