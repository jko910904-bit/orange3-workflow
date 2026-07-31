# JKO AI Decision Engine

> **Design-time decision docs** — AI는 UI를 생성하지 않는다. Pattern · Recipe · Kit으로 **Compose**한다.  
> Canonical product rules: [`docs/`](../../docs/README.md) (01–12). Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md).

충돌 시 **`docs/`가 항상 우선**. 이 트리는 Decision Engine의 **판단 절차·이중 형식(Tree / Rules)** 문서다.

---

## Mandatory judgment order

모든 문서가 같은 순서를 강제한다. **UI는 Result 이후에만.**

```
Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result
```

| Step | Ask | Doc |
| --- | --- | --- |
| Problem | 어떤 운영 문제인가? | [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) |
| User Goal | 사용자가 달성할 결과는? | Q1 |
| Task | 조회 / 수정 / 삭제 / 생성 / 현황 … | Tree + Rules |
| Pattern | 어떤 UX Pattern? | [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md) |
| Recipe | 기존 Recipe 재사용? 새 Recipe 문서? | [`SCREEN_COMPOSER.md`](./SCREEN_COMPOSER.md) |
| Component | Kit만으로? | [`COMPONENT_SELECTOR.md`](./COMPONENT_SELECTOR.md) |
| Layout | Admin 12/1440/240/fluid · Portal | [`docs/08`](../../docs/08_LAYOUT_RULES.md) |
| Validation | a11y · 난이도 · 유지보수 · Never | Gates |
| Result | Compose 명세 (Generate 아님) | Output Rules |

---

## Pipeline overview

```
Input (Problem · Goal · Task · Domain)
        │
        ├─► Decision Tree  (분기 Q&A)     ──┐
        │                                    ├─► Pattern ids · Overlay · Layout
        └─► Rule Engine    (IF/THEN · Prio) ──┘
                │
                ▼
        Pattern Selector  →  Recipe match / propose
                │
                ▼
        Component Selector (Kit only)
                │
                ▼
        Screen Composer   → Validation gates → Result
```

**Tree vs Rules:** Tree는 *어떤 질문 순서*로 갈지 안내하고, Rules는 *확정 조건*과 Never override·우선순위를 선언한다. 둘 다 통과해야 Result.

---

## Files

| File | Role |
| --- | --- |
| [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) | Master — purpose · pipeline · **8 questions** |
| [`RULE_ENGINE.md`](./RULE_ENGINE.md) | Declarative IF/THEN · priority · conflict · Never |
| [`DECISION_TREE.md`](./DECISION_TREE.md) | Branching Q&A → Pattern / Surface |
| [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md) | Goal/Task/Domain → pattern ids |
| [`COMPONENT_SELECTOR.md`](./COMPONENT_SELECTOR.md) | Pattern → Kit components only |
| [`SCREEN_COMPOSER.md`](./SCREEN_COMPOSER.md) | Recipe → Screen Compose · checklist |

Optional types stub (runtime 아님): [`src/playground/ai-decision-engine.ts`](../../src/playground/ai-decision-engine.ts)

---

## Dual form

| Form | When to use | Canonical |
| --- | --- | --- |
| **Decision Tree** | 화면 유형을 질문으로 라우팅 | [`docs/07`](../../docs/07_UX_DECISION_TREE.md) · [`DECISION_TREE.md`](./DECISION_TREE.md) |
| **Rule Engine** | 조건·우선순위·충돌·Never gate | [`RULE_ENGINE.md`](./RULE_ENGINE.md) · Never [`docs/11`](../../docs/11_ANTI_PATTERNS.md) |

관계 그래프: [`knowledge/ux-patterns/RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md)  
Recipes: [`knowledge/ux-patterns/recipes/`](../ux-patterns/recipes/README.md)

---

## For agents

1. 화면 Compose **전**에 [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md)를 연다.
2. Judgment order를 건너뛰지 않는다.
3. Pattern / Recipe / Component는 기존 Kit·`knowledge/ux-patterns`만.
4. 새 Color · Radius · Typography · Component 발명 금지.
5. UI Generator 부활 금지 — **Compose only**.
6. `orange3-workflow` 건드리지 않는다.

Cross-links: [`docs/JKO_AI_DEVELOPMENT_RULES.md`](../../docs/JKO_AI_DEVELOPMENT_RULES.md) · [`AGENTS.md`](../../AGENTS.md) · [`.cursor/rules/jko-design-system.mdc`](../../.cursor/rules/jko-design-system.mdc)
