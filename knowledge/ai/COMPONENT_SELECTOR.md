# Component Selector

> Pattern required components → **Design Kit only**.  
> Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) · Rules: [`docs/04_COMPONENT_RULES.md`](../../docs/04_COMPONENT_RULES.md)

Judgment order: Problem → User Goal → Task → Pattern → Recipe → **Component** → Layout → Validation → Result

답하는 질문: **Q3 — 어떤 Component를 사용해야 하는가?**

---

## Principle

```
Compose from Kit ≠ Invent UI
```

| Allowed | Forbidden |
| --- | --- |
| `src/design-system/components/` | 화면 전용 one-off 복제 |
| `src/catalog/components/` metadata | 새 Color / Radius / Typography |
| Ant/Kit wrappers already in DS | Kit gap 증명 없는 새 Component |
| Pattern이 요구하는 최소 집합 | “비슷한 버튼” 변형 남발 |

Foundation 오염 = Validation fail ([`docs/03`](../../docs/03_FOUNDATION_RULES.md) · [`docs/11`](../../docs/11_ANTI_PATTERNS.md)).

---

## Inputs / Outputs

**In:** `patternIds[]` (ordered) · Recipe chain · overlay kinds · density hint  

**Out:**

```ts
{
  components: { id: string; role: string; variantHints?: string[] }[];
  missing: string[];     // Kit에 없음 → gap 후보 (발명 금지, 문서화만)
  forbiddenAttempts: string[]; // 거부된 발명 요청
}
```

---

## Kit inventory (current)

| Component | Catalog / Kit | Typical Pattern use |
| --- | --- | --- |
| **Button** | button | Primary 1 · Secondary · Danger(+Confirm) · Ghost/Tertiary |
| **Input** | input | Search · CRUD fields |
| **Checkbox** | checkbox | 행 선택 · Filter 옵션 · 동의 |
| **Card** | card | KPI · <20 List · 요약 |
| **Table** | table | ≥20 Data Table |
| **Pagination** | pagination | Table/List 페이지 |
| **Badge** | badge | 상태 · 카운트 |
| **Chart** | chart | Dashboard / Analytics |

Overlay primitives (Drawer · Modal · Confirm)는 Pattern/overlay 규칙 + 기존 Kit/Ant 래퍼로 Compose한다. **새 primitive 발명 금지.**

Button variant 규칙: [`docs/04`](../../docs/04_COMPONENT_RULES.md) · `src/playground/decision-rules.ts` · Rule `R-SINGLE-PRIMARY`.

---

## Pattern → Component map

| Pattern id | Required (minimum) | Notes |
| --- | --- | --- |
| `search` | Input · Button(primary=조회) | Search 최상단 1회 |
| `filter` | Input/Checkbox/Select-from-kit · Button(secondary=초기화) | Search 아래 |
| `data-table` | Table · Checkbox(선택) · Pagination · Button | ≥20 · Bulk → Confirm |
| `detail-drawer` | Form fields(Input…) · Button(sticky primary=저장) | 목록 유지 |
| `confirm-dialog` | Button(danger) · Button(secondary=취소) | Modal 1층 |
| `crud-form` | Input · Checkbox · Button | Page 또는 Drawer 임베드 |
| `dashboard` | Card · Chart · Button(quick action ≤1 primary) | KPI 카드 |
| `analytics` | Chart · Table · Filter controls | Export=Secondary/Tertiary |
| `empty-state` | Button(CTA) | CTA 필수 |
| `loading` | Skeleton (kit pattern) | Spinner-only 남발 금지 |
| `error` | Button(Retry) | |
| `notification` | (toast/banner kit) | Confirm 밖 |
| `settings` / `permission` | Input · Checkbox · Button | 저장 Confirm 필요할 수 있음 |
| `file-manager` / `file-upload` | Button · Table/List · Confirm | |
| `calendar` / `kanban` / `timeline` | Card/List + Drawer triggers | Kit 블록 재사용 |
| `ai-chat` | Input · Button · Confirm(Apply/Clear) | Generate UI 아님 · Compose Apply |

맵에 없는 요청 → Pattern Selector로 복귀. Component로 Pattern을 대체하지 않는다.

---

## Selection steps

```
1. Expand each patternId → required set (table above)
2. Intersect with Kit inventory
3. Apply variant rules (single primary · danger only with confirm)
4. If missing.length > 0:
     - Do NOT invent
     - Document gap (API · states · a11y) for Foundation/Kit PR
     - Prefer reduce scope to Kit-feasible compose
5. Emit components[] to Screen Composer
6. pre-component gate ([RULE_ENGINE](./RULE_ENGINE.md))
```

---

## Never (component-level)

- 새로운 Color · Radius · Typography · Shadow step
- Primary 3개
- Form 안에 Table을 “편해서” 넣기
- Modal 안 Modal용 커스텀 레이어
- Playground 실험으로 Design Kit mutate

---

## Hand-off

```
components[] (kit ids + roles)
        → SCREEN_COMPOSER Layout slotting
        → Validation Q7 (구현 난이도 = Kit로 충분한가)
```

Related: [`COMPONENT` catalog](../../src/catalog/components/) · [`docs/04`](../../docs/04_COMPONENT_RULES.md) · [`docs/03`](../../docs/03_FOUNDATION_RULES.md)
