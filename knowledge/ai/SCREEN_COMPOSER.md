# Screen Composer

> **Recipe → Screen** — Compose only. UI Generator 아님.  
> Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) · Recipes: [`knowledge/ux-patterns/recipes/`](../ux-patterns/recipes/README.md)

Judgment order: Problem → User Goal → Task → Pattern → **Recipe** → Component → **Layout** → **Validation** → **Result**

답하는 질문:

- **Q4** 기존 Recipe를 재사용할 수 있는가?
- **Q5** 새로운 Recipe가 필요한가?
- (+ Layout · Q6–Q8 gates)

---

## Compose ≠ Generate

| Compose | Generate (금지) |
| --- | --- |
| 기존 Recipe Pattern chain 조립 | 픽셀·토큰·컴포넌트 즉석 창작 |
| Kit Component slotting | 새 Color/Radius/Typography |
| Overlay 규칙 적용 | Modal-in-Modal · ad-hoc surface |
| Recipe **문서** 제안 (필요 시) | “새 UI 키트” 제안 |

---

## Pipeline (Composer)

```
patternIds (from Pattern Selector)
        │
        ▼
┌───────────────────────┐
│ Match recipes/ index  │ ──YES──► reuse Recipe (Q4)
└───────────┬───────────┘
            │ NO
            ▼
┌───────────────────────┐
│ Pattern chain으로     │ ──YES──► propose new Recipe.md (Q5)
│ Task 설명 가능?       │         (tokens/UI 발명 금지)
└───────────┬───────────┘
            │ NO
            ▼
     Pattern/Goal 재질문 (Result 금지)
            │
            ▼
Component Selector slots
            │
            ▼
Layout (Admin / Portal)
            │
            ▼
Validation checklist → Result (Output Rules)
```

---

## Recipe reuse (Q4)

1. Domain(`admin`/`saas`/`ai`) + Task로 [`recipes/README.md`](../ux-patterns/recipes/README.md) 스캔.
2. Recipe의 **Pattern Chain**이 Selector `patternIds`와 순서 호환인지 확인.
3. Why this order · Overlay rules를 읽고 축소/확장하지 말 것 (위성 Empty/Loading만 규칙에 따라 부착).
4. Match → `recipeId` 채택 · confidence high.

| Domain | Examples |
| --- | --- |
| Admin | member-management · notice · faq · product · dashboard · analytics · settings · file-manager |
| SaaS | onboarding · billing · notifications · permissions · calendar · kanban · timeline |
| AI | chat-workspace · prompt-history · **compose-review** |

제품 요약: [`docs/06_SCREEN_RECIPES.md`](../../docs/06_SCREEN_RECIPES.md)

---

## New Recipe (Q5) — doc only

기존 Recipe가 없고, **기존 Pattern만으로** chain이 성립할 때:

1. `knowledge/ux-patterns/recipes/<domain>-<name>.md` **문서 초안**만 제안.
2. 필수 섹션: Goal · User Tasks · Pattern Chain · Why this order · Layout · Overlay rules · Related · Linked Patterns.
3. **하지 말 것:** 새 토큰 · 새 Component · 새 Pattern id · Generate UI 목업을 Recipe로 위장.
4. Pattern 자체가 없으면 Selector/05 절차 — Recipe로 Pattern을 발명하지 않음.

---

## Layout

### Admin (canonical)

```
12 Grid · Desktop 1440 · Sidebar 240 · Content fluid
```

| Spec | Value |
| --- | --- |
| Canvas max | 1440px |
| Sidebar | 240px |
| Columns | 12 |
| Content | fluid |

Admin stack 본문: Search → Filter → Data → Pagination · Bulk with Data ([`docs/02`](../../docs/02_UX_PRINCIPLES.md) · [`docs/08`](../../docs/08_LAYOUT_RULES.md)).

### Portal

Centered content · Decision Tree `admin? NO` · [`docs/08`](../../docs/08_LAYOUT_RULES.md).

### Overlay placement

| Case | Surface |
| --- | --- |
| 수정+목록 유지 · 빠른 확인 | Drawer |
| 빠른 작업 · Confirm/Delete | Modal / Confirm |
| 생성 · Wizard · 긴 폼 | Page |

---

## Slotting order (Admin list example)

```
Sidebar(240)
└─ Content (12-col fluid, max 1440)
   1. Search          ← components: Input, Button(primary)
   2. Filter          ← Checkbox/Input, Button(secondary)
   3. Data Table      ← Table, Checkbox, row actions(ghost)
   4. Pagination
   5. Empty / Loading / Error (state)
   6. Detail Drawer (overlay)
   7. Confirm (overlay, 1층)
```

Single Primary: 화면당 Primary 1 (조회 또는 Sticky 저장 — 동시 경쟁 금지 시 Rules로 해소).

---

## Output validation checklist (before Result)

### Always

- [ ] Judgment order 준수 (UI를 먼저 쓰지 않음)
- [ ] Q1 Goal · Task 명시
- [ ] Q2 Pattern ids + RECIPE id (또는 Q5 문서 제안)
- [ ] Q3 Kit components only · 토큰 발명 없음
- [ ] Layout: Admin 12/1440/240/fluid 또는 Portal
- [ ] Single Primary
- [ ] Search First · Filter below Search (목록)
- [ ] 삭제 = Confirm · 수정+목록 = Drawer
- [ ] Empty CTA · Loading Skeleton
- [ ] Modal-in-Modal 없음

### Q6 Accessibility ([`docs/09`](../../docs/09_ACCESSIBILITY.md))

- [ ] 키보드로 핵심 Task 완료 가능
- [ ] Focus visible · Overlay focus trap/escape
- [ ] 의미 있는 대비 · 라벨
- [ ] Empty / Error 회복 경로

### Q7 Development difficulty ([`docs/10`](../../docs/10_BEST_PRACTICES.md))

- [ ] Kit compose로 구현 가능
- [ ] 커스텀 레이아웃·신규 primitive 없이 가능
- [ ] 과도하면 범위 축소 후 재Compose

### Q8 Maintainability

- [ ] Foundation → Components → Patterns → Screens
- [ ] Recipe/Pattern id로 추적 가능
- [ ] one-off 스타일/컴포넌트 없음
- [ ] Playground가 Kit을 mutate하지 않음

**하나라도 Fail → Result 금지** ([`RULE_ENGINE`](./RULE_ENGINE.md) `pre-result`).

---

## Result (Output Rules)

통과 시에만:

```
## Goal
## User Task
## Selected Pattern
## Selected Components
## Layout Structure
## Responsive Strategy
## Accessibility
## Development Notes
## Reusability
```

Development Notes에 `recipeId` · Pattern chain · Overlay · 사용한 Rule/Tree node를 적는다.  
Reusability에 Q4 reuse / Q5 new Recipe doc 여부를 적는다.

---

## Cross-links

- RELATIONSHIPS: [`../ux-patterns/RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md)
- Pattern Selector: [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md)
- Component Selector: [`COMPONENT_SELECTOR.md`](./COMPONENT_SELECTOR.md)
- Decision Tree: [`DECISION_TREE.md`](./DECISION_TREE.md)
- Rule Engine: [`RULE_ENGINE.md`](./RULE_ENGINE.md)
- JKO master: [`docs/JKO_AI_DEVELOPMENT_RULES.md`](../../docs/JKO_AI_DEVELOPMENT_RULES.md)
