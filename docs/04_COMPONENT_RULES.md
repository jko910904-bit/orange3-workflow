# 04 — Component Rules

## Purpose

Component는 **재사용 UI만**입니다. Pattern/Screen Compose는 Kit Component만 사용합니다.  
Kit gap이 증명되기 전에는 새 Component를 만들지 않습니다.

Kit: `src/design-system/components/` · Catalog: `src/catalog/components/`

---

## Reuse only

| Rule | Detail |
| --- | --- |
| Prefer kit | Button · Input · Checkbox · Card · Table · Pagination … |
| No one-off | 화면 전용 “비슷한 버튼” 복제 금지 |
| Gap proof | 새 Component 필요 시: 기존으로 불가 이유 · API · 상태 · a11y를 문서화 후 Foundation/Kit PR |
| Playground ≠ Kit | Playground 실험이 Design Kit을 mutate하지 않음 |

---

## Kit inventory (current)

| Component | Typical use |
| --- | --- |
| **Button** | Primary / Secondary / Danger / Ghost / Tertiary 액션 |
| **Input** | 텍스트 · Search · 폼 필드 |
| **Checkbox** | 행 선택 · 동의 · 필터 옵션 |
| **Card** | KPI · 요약 · 소량 List(<20) 컨테이너 |
| **Table** | ≥20 행 · 정렬 · 선택 · Admin 목록 |
| **Pagination** | Table / List 페이지 이동 |
| **Badge** (catalog) | 상태 · 카운트 |
| **Chart** (catalog) | Dashboard / Analytics 요약 |

패턴 조립에 Drawer · Modal · Tabs 등은 Pattern/overlay 규칙과 함께 Kit·Ant 래퍼를 재사용합니다. **새 primitive를 화면에서 발명하지 않습니다.**

---

## Button — when which variant

Source: `BUTTON_RULES` · `src/playground/decision-rules.ts`  
UX Rule #3: Primary는 화면(또는 표면)당 **1개**.

| Variant | When |
| --- | --- |
| **Primary** | 핵심 다음 행동 1개 — 조회 · 저장 · 다음 · 확인 |
| **Secondary** | 취소 · 초기화 · 닫기 · 보조 (Primary와 시각 경쟁 금지) |
| **Danger** | 삭제 · 해지 · 영구 제거 — Confirm Dialog와 함께 |
| **Ghost / Tertiary** | 툴바 · 행 액션 · 덜 강조된 보조 — Primary와 경쟁 금지 |

### Apply cheat sheet

| Surface | Mapping |
| --- | --- |
| Data Table | Primary = 조회만 · Danger = 삭제(Confirm) · Secondary = 초기화 · Export = Tertiary/Secondary |
| Sticky Footer | Primary = 저장 하나 · Cancel = Secondary · Delete = Danger + Confirm |
| 회원관리 | Primary = 조회·저장(표면별) · Danger = 삭제 |

---

## When to use which (common)

| Need | Prefer |
| --- | --- |
| 대량 행 비교·정렬·선택 | **Table** (+ Pagination) |
| 소량(<20) 스캔 | **Card** / List Pattern |
| 키워드 찾기 | **Input.Search** + Search Pattern |
| 상태 토글 · 행 선택 | **Checkbox** |
| KPI 한 덩어리 | **Card** |
| 파괴 확정 | **Modal** Confirm + Danger Button |

---

## New component gate

새 Component를 제안하기 전에:

1. 기존 Component 조합으로 가능한가?
2. Pattern 단위로 이미 존재하는가?
3. Foundation 토큰만으로 style gap이 해결되는가?
4. a11y 상태(Default→Error)를 Kit와 동일하게 정의할 수 있는가?

하나라도 “예, 기존으로 가능”이면 **신규 금지**.

---

## Examples

**맞음** — 목록 조회 = `Input` + `Button(primary)` + `Table` + `Pagination`  
**틀림** — “SearchBarV2”를 화면 폴더에 새로 만들고 primary 색을 hex로 고정

---

## Related docs

- [03_FOUNDATION_RULES](./03_FOUNDATION_RULES.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md) — Overlay / density
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md)
- Detail: `docs/principles/button-variants.md`
