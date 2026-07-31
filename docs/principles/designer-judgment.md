# 디자이너처럼 판단하기

**Mandatory before any UI / Screen work.** Never skip to “generate a screen.”

**Master:** [../JKO_AI_DEVELOPMENT_RULES.md](../JKO_AI_DEVELOPMENT_RULES.md) · code: `src/playground/designer-judgment.ts` · index: [../UX_RULES.md](../UX_RULES.md)

Persona / Thinking Steps 1–10: [senior-product-designer.md](./senior-product-designer.md)  
Output Rules: [screen-design-response.md](./screen-design-response.md)

## Thinking order (8)

These questions are **checkpoints on the Senior PD master chain** — not a separate process. Master: [senior-product-designer.md](./senior-product-designer.md).

| # | Question | Master chain step |
| --- | --- | --- |
| 1 | 이 화면의 UX Goal은 무엇인가? | User Goal |
| 2 | 사용자가 수행하는 Task는 무엇인가? | User Task |
| 3 | 기존 UX Pattern으로 해결 가능한가? | UX Pattern |
| 4 | 새로운 Pattern이 필요한가? | UX Pattern |
| 5 | 기존 Component만으로 구성 가능한가? | Component |
| 6 | Foundation 규칙을 위반하는가? | Component → Development |
| 7 | 반응형을 고려했는가? | Responsive |
| 8 | 접근성을 만족하는가? | Accessibility |

Also complete from the master chain: **Problem** (before Goal) · **Layout · Interaction** (after Component) · **Development · Maintainability** (before shipping).

1. **이 화면의 UX Goal은 무엇인가?** — 사용자가 이 화면에서 달성해야 할 단일한 목표를 한 문장으로 적는다.
2. **사용자가 수행하는 Task는 무엇인가?** — 조회 · 수정 · 삭제 · 생성 · 현황 파악 등 구체적 작업을 고른다.
3. **기존 UX Pattern으로 해결 가능한가?** — `/patterns` · `docs/patterns/` · catalog를 먼저 검색한다.
4. **새로운 Pattern이 필요한가?** — 기존 Pattern으로 불가할 때만. 새 Pattern은 근거·목표·적용 규칙을 문서화한다.
5. **기존 Component만으로 구성 가능한가?** — 새 Component 전에 키트 재사용. 없으면 확장 제안이지 임의 발명이 아니다.
6. **Foundation 규칙을 위반하는가?** — Color / Radius / Typography 등 토큰 발명 금지. Dense/Comfortable·그리드 준수.
7. **반응형을 고려했는가?** — Admin Dense · Portal Comfortable · 좁은 폭에서 Overlay/스택 전환.
8. **접근성을 만족하는가?** — 키보드 · 대비 · 의미 구조 · Focus · Empty/Error 회복 경로.

## Hard constraints

- 새 Component 전에 **기존 Component 재사용**
- **새 Color / Radius / Typography 생성 금지**
- 새 Pattern 전에 **기존 Pattern 우선**

## After this checklist

1. Apply [Never / Always](./never-always.md)
2. Apply the [canonical 8 UX Rules](./jko-ux-principles.md)
3. Walk the [UX Decision Tree](./ux-decision-tree.md)
4. Compose: Foundation → Components → Patterns → Screens

Live: `/principles#designer-judgment` · `/`
