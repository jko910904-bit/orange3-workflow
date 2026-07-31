# 11 — Anti-Patterns

## Purpose

Compose 시 **절대 하지 말 것 / 항상 할 것**을 한곳에 고정합니다.  
위반은 “스타일 취향”이 아니라 **운영·일관성 장애**입니다.

Code: `src/playground/never-always.ts`

---

## Never

| Never | Why | Aligns with |
| --- | --- | --- |
| **Modal 안에 Modal** | 포커스·탈출 경로 붕괴 · 결정 계층 모호 | Overlay · Confirm Delete |
| **Primary Button 3개** | 다음 행동 불명 · Rule #3 위반 | `single-primary` · Button rules |
| **Search 아래 Search** | Admin stack 붕괴 · 중복 조회 | Rules #1–2, #8 |
| **Form 안에 Table** | Task 혼선 (CRUD vs Data Table) | Decision Tree · Admin stack |
| **새로운 Color 생성** | Foundation 오염 | Foundation |
| **새로운 Radius 생성** | 일관성 붕괴 | Foundation |
| **새로운 Typography 생성** | 타입 스케일 붕괴 | Foundation |

### Extended never (동일 정신)

| Never | Note |
| --- | --- |
| 새로운 Shadow / Spacing step 발명 | Foundation과 동일 |
| Kit gap 증명 없는 **새 Component** | [04](./04_COMPONENT_RULES.md) |
| Drawer에서 Confirm 없이 **즉시 삭제** | Rule #5 |
| Pattern 없이 Screen 발명 | [01](./01_PRODUCT_PHILOSOPHY.md) · [06](./06_SCREEN_RECIPES.md) |
| Playground 실험으로 Design Kit mutate | Kit 경계 |
| 「빠른 확인」을 Modal로, 「빠른 작업」을 Drawer로 혼동 | [07](./07_UX_DECISION_TREE.md) |

---

## Always

| Always | Why |
| --- | --- |
| **기존 Design Kit 사용** | Foundation → Components → Patterns → Screens |
| Thinking Steps 후 UI | Problem → Pattern → Component → Layout → UI |
| Output Rules 섹션으로 설계 답변 | Goal · Task · Pattern · Components · … |
| Empty에 CTA · Loading에 Skeleton · 삭제에 Confirm | Rules #5–7 |
| Detail/수정+목록유지 = Drawer | Rule #4 · Decision Tree |

---

## Why (cross-ref table)

| Anti-pattern | Fix |
| --- | --- |
| Modal in Modal | 한 focus surface · 삭제만 Confirm Dialog |
| 3 Primaries | Primary 1 · 나머지 Secondary/Ghost/Tertiary |
| Search under Search | Search 한 번, 최상단 · 조건은 Filter |
| Table in Form | 목록=Data Table 화면 · 폼=CRUD 표면 분리 |
| Invent tokens | Kit 토큰만 · gap이면 Foundation PR |
| Skip Pattern | [05](./05_PATTERN_LIBRARY.md)에서 Task 매핑 |

---

## Examples

**Never 예시**

```
[Modal “저장”]
  └─ [Modal “정말 저장?”]   ← 금지
Primary: 조회 | 등록 | 내보내기   ← 금지 (3 Primary)
Search
  └─ Search (글로벌)         ← 금지
Form
  └─ Table (회원 선택)       ← 금지 — 별도 목록/Picker Pattern
```

**Always 예시**

```
Design Kit Button/Input/Table
Search → Filter → Table → Pagination
행 상세 → Drawer · 삭제 → Confirm
Empty → “회원 등록” CTA
```

---

## Related docs

- [01_PRODUCT_PHILOSOPHY](./01_PRODUCT_PHILOSOPHY.md)
- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [03_FOUNDATION_RULES](./03_FOUNDATION_RULES.md)
- [04_COMPONENT_RULES](./04_COMPONENT_RULES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- Detail: `docs/principles/never-always.md`
