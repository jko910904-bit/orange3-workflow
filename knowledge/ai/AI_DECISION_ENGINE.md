# JKO AI Decision Engine — Master

> **목적:** 운영 화면을 **생성(Generate)**하지 않고, Design Kit + Pattern + Recipe로 **조립(Compose)**하기 위한 design-time 판단 엔진.  
> Index: [`README.md`](./README.md) · Product rules: [`docs/01–12`](../../docs/README.md) · Master summary: [`JKO_AI_DEVELOPMENT_RULES.md`](../../docs/JKO_AI_DEVELOPMENT_RULES.md)

Compose ≠ Generate. AI는 Color · Typography · Radius · Component를 발명하지 않는다.

---

## Purpose

| Do | Do not |
| --- | --- |
| Problem → Goal → Task부터 고정 | UI부터 그리기 |
| 기존 Pattern · Recipe 재사용 | 새 Pattern/토큰을 화면에서 발명 |
| Kit Component만 선택 | one-off 컴포넌트 복제 |
| Validation gate 후 Result | Never 위반 상태로 Result 출력 |
| Output Rules 섹션으로 답변 | “예쁜 화면” 설명으로 시작 |

이 엔진은 **현재 문서 + (선택) 타입 stub**이다. 런타임 LLM 파이프라인 구현이 아니다.

---

## Mandatory judgment order

```
Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result
```

| # | Step | Engine module | Fail → |
| --- | --- | --- | --- |
| 1 | **Problem** | 운영 문제 한 문장 | 중단 · 재질문 |
| 2 | **User Goal** | Q1 | Goal 없이 Pattern 금지 |
| 3 | **Task** | Tree + Rules | Task 모호 시 분기 재질문 |
| 4 | **Pattern** | [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md) | 미매칭 → RELATIONSHIPS 재탐색 |
| 5 | **Recipe** | [`SCREEN_COMPOSER.md`](./SCREEN_COMPOSER.md) | 기존 Recipe 우선 · 없으면 Recipe **문서** 제안 |
| 6 | **Component** | [`COMPONENT_SELECTOR.md`](./COMPONENT_SELECTOR.md) | Kit gap만 Foundation PR 후보 |
| 7 | **Layout** | Admin 12/1440/240/fluid · Portal | [`docs/08`](../../docs/08_LAYOUT_RULES.md) |
| 8 | **Validation** | a11y · Never · 난이도 · 유지보수 | Gate fail → Result 금지 |
| 9 | **Result** | Compose 명세 | Generate UI 금지 |

Thinking Steps 1–10 ([`JKO_AI_DEVELOPMENT_RULES`](../../docs/JKO_AI_DEVELOPMENT_RULES.md))와 정렬한다. 위 순서는 Decision Engine용으로 **Recipe 단계를 명시**한 확장이다.

---

## Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│  INPUT: Problem · User Goal · Task · Domain(admin/saas/ai)  │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
         ┌──────────────────┴──────────────────┐
         │                                     │
   DECISION TREE                         RULE ENGINE
   분기 Q&A                                IF/THEN · priority
   ([DECISION_TREE.md](./DECISION_TREE.md)) ([RULE_ENGINE.md](./RULE_ENGINE.md))
         │                                     │
         └──────────────────┬──────────────────┘
                            ▼
                  PATTERN SELECTOR
                  pattern ids · confidence · fallback
                            ▼
                  RECIPE match (recipes/)
                  reuse? / new Recipe doc?
                            ▼
                  COMPONENT SELECTOR (Kit only)
                            ▼
                  SCREEN COMPOSER (Layout + Overlay)
                            ▼
                  VALIDATION GATES
                  Q6 a11y · Q7 난이도 · Q8 유지보수 · Never
                            ▼
                  RESULT → Output Rules sections
```

**상호작용:** Tree가 후보 Pattern/Surface를 좁히고, Rules가 확정·충돌 해소·Never override를 적용한다. Selector/Composer는 그 결과만 소비한다.

---

## Eight questions (명시 매핑)

| # | Question | Judgment step | How the engine answers | Primary sources |
| --- | --- | --- | --- | --- |
| **1** | 사용자의 목표는 무엇인가? | User Goal | Problem에서 도출한 **한 문장 Outcome**. Task와 혼동하지 않음 (목표=결과, Task=행동). | [`docs/01`](../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/02`](../../docs/02_UX_PRINCIPLES.md) |
| **2** | 어떤 UX Pattern을 선택해야 하는가? | Pattern | Tree 분기 + Rules THEN + [`PATTERN_SELECTOR`](./PATTERN_SELECTOR.md). 후보 → confidence → `PATTERN.md` When 검증. | [`docs/05`](../../docs/05_PATTERN_LIBRARY.md) · [`docs/07`](../../docs/07_UX_DECISION_TREE.md) · [`RELATIONSHIPS`](../ux-patterns/RELATIONSHIPS.md) |
| **3** | 어떤 Component를 사용해야 하는가? | Component | Pattern required → Kit inventory만. 발명 금지. | [`docs/04`](../../docs/04_COMPONENT_RULES.md) · [`COMPONENT_SELECTOR`](./COMPONENT_SELECTOR.md) |
| **4** | 기존 Recipe를 재사용할 수 있는가? | Recipe | Goal+Task+Domain으로 [`recipes/`](../ux-patterns/recipes/README.md) 매칭. Chain 순서 유지. | [`docs/06`](../../docs/06_SCREEN_RECIPES.md) · recipes README |
| **5** | 새로운 Recipe가 필요한가? | Recipe | Q4 실패 **그리고** 기존 Pattern chain으로 설명 가능할 때만 → **새 Recipe 문서** 제안 (새 UI/토큰 아님). Pattern 자체 발명은 별도 Kit/05 절차. | [`SCREEN_COMPOSER`](./SCREEN_COMPOSER.md) · [`docs/11`](../../docs/11_ANTI_PATTERNS.md) |
| **6** | 접근성 기준을 만족하는가? | Validation | 키보드 · 대비 · focus · Empty/Error · Overlay trap. Fail → Result 차단. | [`docs/09`](../../docs/09_ACCESSIBILITY.md) |
| **7** | 개발 난이도는 적절한가? | Validation | Kit compose로 구현 가능? 새 primitive/커스텀 레이아웃 과다면 Fail 또는 축소. | [`docs/10`](../../docs/10_BEST_PRACTICES.md) · [`docs/03`](../../docs/03_FOUNDATION_RULES.md) |
| **8** | 유지보수가 쉬운가? | Validation | Foundation → Components → Patterns → Screens 계층 유지? Recipe/Pattern id로 추적 가능? one-off면 Fail. | [`docs/01`](../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/10`](../../docs/10_BEST_PRACTICES.md) |

### Question → pipeline stage (cheat)

```
Q1 Goal ───────────► User Goal
Q2 Pattern ─────────► Pattern Selector (+ Tree/Rules)
Q3 Component ───────► Component Selector
Q4 Recipe reuse ────► Screen Composer (match)
Q5 New Recipe? ─────► Screen Composer (propose doc only)
Q6 A11y ────────────► Validation gate
Q7 Dev difficulty ──► Validation gate
Q8 Maintainability ─► Validation gate
                 └──► all pass → Result
```

---

## Dual form summary

| | Decision Tree | Rule Engine |
| --- | --- | --- |
| **형태** | 분기 질문 | `id` · priority · IF · THEN |
| **강점** | 사람이 따라가기 쉬운 라우팅 | 충돌·Never·우선순위 기계적 적용 |
| **출력** | Pattern path · Surface | 확정 action · override · reject |
| **문서** | [`DECISION_TREE.md`](./DECISION_TREE.md) | [`RULE_ENGINE.md`](./RULE_ENGINE.md) |

충돌 시 제품 고정: **수정+목록 유지 = Drawer** · **빠른 확인 = Drawer** · **빠른 작업 = Modal** · **삭제 = Confirm Dialog**.

---

## Result format (Output Rules)

Validation 통과 후 **이 순서로만** 답한다. UI 설명은 마지막.

```
## Goal              ← Q1
## User Task
## Selected Pattern  ← Q2
## Selected Components ← Q3
## Layout Structure
## Responsive Strategy
## Accessibility     ← Q6
## Development Notes ← Q7
## Reusability       ← Q4/Q5/Q8
```

Recipe id · Pattern chain · Overlay 결정을 Development Notes / Reusability에 명시한다.

---

## Never (engine-level)

- Modal 안에 Modal · Primary 3 · Search 아래 Search · Form 안에 Table
- 새 Color / Radius / Typography / (증명 없는) Component
- Pattern·Recipe 없이 Screen 발명
- UI Generator CTA / playground로 Kit mutate
- Validation fail인데 Result 출력

출처: [`docs/11_ANTI_PATTERNS.md`](../../docs/11_ANTI_PATTERNS.md)

---

## Related

| Doc | Role |
| --- | --- |
| [`RULE_ENGINE.md`](./RULE_ENGINE.md) | IF/THEN · priority · gates |
| [`DECISION_TREE.md`](./DECISION_TREE.md) | Branching Q&A |
| [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md) | Pattern pick |
| [`COMPONENT_SELECTOR.md`](./COMPONENT_SELECTOR.md) | Kit-only components |
| [`SCREEN_COMPOSER.md`](./SCREEN_COMPOSER.md) | Recipe → Screen |
| [`docs/07`](../../docs/07_UX_DECISION_TREE.md) | Product decision tree |
| [`knowledge/ux-patterns/`](../ux-patterns/README.md) | PATTERN.md · RELATIONSHIPS · recipes |
