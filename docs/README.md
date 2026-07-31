# JKO Knowledge Base

> **Knowledge > Features**  
> 기능·화면 구현보다 **UX Decision + Pattern**이 우선입니다.  
> 새 UI를 만들기 전에 이 Knowledge Base를 읽고, Pattern을 고른 뒤 Design Kit으로 Compose합니다.

JKO는 AI UI Generator가 아닙니다. **운영·개발·유지보수를 위한 Design System Platform**입니다.

```
Compose ≠ Generate
```

---

## Start here (agents / implementers)

1. 이 인덱스(`docs/README.md`)를 연다
2. 작업에 해당하는 **01–12** 문서를 읽는다
3. Master 요약이 필요하면 [`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md)
4. UI 전에 Thinking Steps + Output Rules로 답한다

---

## Knowledge Base (01–12)

| # | Doc | Focus |
| --- | --- | --- |
| 01 | [PRODUCT_PHILOSOPHY](./01_PRODUCT_PHILOSOPHY.md) | Vision · Compose ≠ Generate · Persona · Design Structure |
| 02 | [UX_PRINCIPLES](./02_UX_PRINCIPLES.md) | 8 Rules · Admin Stack · Sticky Footer · Bulk · Empty CTA |
| 03 | [FOUNDATION_RULES](./03_FOUNDATION_RULES.md) | Tokens 불변 · Color/Type/Radius/Spacing · Admin Grid |
| 04 | [COMPONENT_RULES](./04_COMPONENT_RULES.md) | Kit 재사용 · Button variants · 신규 Component 금지 |
| 05 | [PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md) | Pattern = Task 단위 · Catalog · States |
| 06 | [SCREEN_RECIPES](./06_SCREEN_RECIPES.md) | Screen = Pattern compose · 회원/공지/상품/FAQ/Dashboard |
| 07 | [UX_DECISION_TREE](./07_UX_DECISION_TREE.md) | Drawer vs Page · Table vs Card · Modal/Drawer/Sheet |
| 08 | [LAYOUT_RULES](./08_LAYOUT_RULES.md) | Admin 12-grid · Portal · Sticky Footer · Responsive |
| 09 | [ACCESSIBILITY](./09_ACCESSIBILITY.md) | Focus · Labels · Contrast · Keyboard · States |
| 10 | [BEST_PRACTICES](./10_BEST_PRACTICES.md) | Search · Table · Form/CRUD · Dashboard BP |
| 11 | [ANTI_PATTERNS](./11_ANTI_PATTERNS.md) | Never / Always · 금지 패턴 |
| 12 | [REFERENCES](./12_REFERENCES.md) | → [`knowledge/`](../knowledge/README.md) design-systems · case-studies · ux-patterns |

---

## Reading order by task

| 하려는 일 | 읽을 문서 |
| --- | --- |
| “이 화면이 맞는가?” 판단 | 01 → 02 → 07 |
| Pattern 고르기 | 05 → 06 → 07 |
| Component / Button / Overlay | 04 → 07 → 11 |
| Layout / Grid | 08 → 03 |
| A11y / Empty / Loading | 09 → 02 → 10 |
| “하면 안 되는 것” | 11 → 03 |

---

## Priority

| Priority | Meaning |
| --- | --- |
| **1. Knowledge** | Philosophy · Principles · Decision · Pattern |
| **2. Compose** | Foundation → Components → Patterns → Screens |
| **3. Features** | 구현·데모·Playground — Knowledge를 바꾸지 않음 |

Playground 실험은 Design Kit을 변형하지 않습니다.  
`orange3-workflow`는 명시 요청 없으면 건드리지 않습니다.

---

## Related (legacy / satellite)

| Doc | Role |
| --- | --- |
| [`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md) | Master 요약 + Output Rules (에이전트 필수) |
| [`UX_RULES.md`](./UX_RULES.md) | 구 satellite 인덱스 (KB로 리다이렉트) |
| [`philosophy.md`](./philosophy.md) | 제품 철학 단문 |
| `principles/` · `patterns/` · `screens/` · `foundation/` | 상세·라이브 연동 보조 |
| [`knowledge/`](../knowledge/README.md) | 외부 DS/제품 UX 분석 (inspiration only · never copy) |
| [`references/`](../references/README.md) | Legacy stub → `knowledge/` |

Live: `/` · `/principles` · `/patterns` · `/screens`  
Code: `src/playground/*` · Kit: `src/design-system/`
