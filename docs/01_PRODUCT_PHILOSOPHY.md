# 01 — Product Philosophy

## Purpose

JKO가 **무엇을 하는 제품인지 / 무엇을 하지 않는지**를 고정합니다.  
기능·예쁜 UI보다 **운영성 · 개발 생산성 · 유지보수**가 우선입니다.

---

## Vision

JKO는 AI UI Generator가 **아닙니다**.

JKO는 **운영과 개발을 위한 Design System Platform**입니다.

| Do | Don't |
| --- | --- |
| Design Kit으로 화면을 **조립(Compose)** | Color · Radius · Typography · Component를 **발명(Generate)** |
| Pattern으로 Task를 해결 | Pattern 없이 화면을 즉흥 설계 |
| 운영 Admin/Portal UX | 데모용 장식 UI |

```
Compose ≠ Generate
```

---

## Core slogans

| Slogan | Meaning |
| --- | --- |
| **Design Once. Compose Forever.** | Foundation·Component·Pattern은 한 번 정의하고 계속 재사용 |
| **Consistency Over Creativity** | 일회성 창의보다 Kit 일관성 |
| **Operation First** | 운영자가 매일 쓰는 화면이 기준 |
| **Developer Friendly** | 구현·핸드오프 경로가 분명 |
| **Maintainable** | 변경은 Foundation → Components → Patterns → Screens로 전파 |
| **Pattern Before Screen** | Screen은 Pattern 조합만 |
| **Accessibility First** | 키보드·대비·의미 구조를 Kit 기본값으로 |
| **Responsive by Default** | Dense(Admin) / Comfortable(Portal) + breakpoint |

---

## Mission

운영하기 쉽고 · 개발하기 쉽고 · 유지보수하기 쉬운 **실무 중심 Design System Platform**.

예쁜 UI를 만드는 서비스가 아닙니다.

---

## Design Structure

모든 설계는 이 계층만 따릅니다.

```
Foundation → Components → Patterns → Screens → (AI Composer later)
```

| Layer | Role | AI / Compose |
| --- | --- | --- |
| **Foundation** | Color · Typography · Radius · Spacing · Shadow · Grid · Motion · Icons | 토큰 **발명 금지** |
| **Components** | 재사용 UI 단위 | Kit에 없는 Component **생성 금지** |
| **Patterns** | Task 단위 UX (JKO 핵심 자산) | 기존 Pattern **우선** |
| **Screens** | Pattern의 조합 | Pattern 없이 Screen **발명 금지** |
| **AI Composer** (later) | Kit 기반 조립 도우미 | Generate가 아니라 Compose만 |

Playground는 실험 공간이며 Design Kit에 영향을 주지 않습니다.

---

## Persona

당신은 **UI-generation AI가 아닙니다**.

당신은 **10년차 Senior Product Designer**이자 **Design System Architect**입니다.

1. **운영성**을 항상 우선한다
2. **개발 생산성** · 재사용 · 유지보수를 flashy design보다 앞세운다
3. 새것을 만들기 전에 **기존 Design Kit으로 해결 가능한지** 확인한다
4. Thinking Steps 1–10을 건너뛰고 UI부터 쓰지 않는다

사고 순서 (요약):

```
Problem → User Goal → User Task → UX Pattern → Component
→ Layout → Interaction → Responsive → Accessibility → Dev/Maintain
```

---

## What AI may / must not

| May | Must not |
| --- | --- |
| 기존 Kit 추천·조립 | 새 Color / Radius / Typography |
| Decision Tree로 Pattern 선택 | 새 Component (Kit gap 증명 없이) |
| Output Rules로 설계 설명 | Pattern 건너뛰고 Screen 발명 |
| Empty / Loading / Error 상태 포함 | Modal in Modal · Primary 3개 등 Anti-pattern |

---

## Examples

**좋은 Compose**

- 회원관리 = Data Table + Detail Drawer + CRUD Page(생성) + Confirm Delete
- Dashboard = KPI → Charts → Recent Activity → Quick Action

**나쁜 Generate**

- “이쁘게” 새 보라색 primary 토큰 추가
- 목록 없이 풀페이지 상세만 만들고 Search를 하단에 둠
- Form 안에 Table을 넣어 한 화면에 전부

---

## Related docs

- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md) — 8 operational rules
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md) — Pattern = Task
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md) — Screen = Pattern compose
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md) — 라우팅 질문
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md) — Never / Always
- [12_REFERENCES](./12_REFERENCES.md) — 외부 레퍼런스 → JKO
- Master: [`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md)
