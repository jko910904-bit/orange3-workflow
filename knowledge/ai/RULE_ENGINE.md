# Rule Engine

> **선언형 규칙** — IF 조건 → THEN 액션. Tree가 후보를 좁히면 Rules가 **확정·충돌 해소·Never override**를 한다.  
> Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) · Never: [`docs/11`](../../docs/11_ANTI_PATTERNS.md) · Tree: [`DECISION_TREE.md`](./DECISION_TREE.md)

Judgment order: **Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result**

Rule Engine은 Task 이후부터 Result 직전까지 개입한다. Goal/Task가 비어 있으면 규칙을 평가하지 않는다.

---

## Rule form

```ts
{
  id: string;           // 예: "R-LIST-ADMIN-STACK"
  priority: number;     // 낮을수록 먼저 (1 = highest). Never override = 0
  if: string[];         // 모두 참이어야 발화 (AND). OR는 별도 규칙으로 쪼갠다
  then: string[];       // Pattern / Overlay / Layout / Selector 지시
  never?: string[];     // 이 규칙이 금지하는 결과 (충돌 시 reject)
  gate?: "pre-pattern" | "pre-recipe" | "pre-component" | "pre-result";
  refs?: string[];      // docs / PATTERN.md / recipe 경로
}
```

Optional stub: [`src/playground/ai-decision-engine.ts`](../../src/playground/ai-decision-engine.ts)

---

## Priority bands

| Priority | Band | Examples |
| --- | --- | --- |
| **0** | **NEVER override** | Modal-in-Modal 금지 · 토큰 발명 금지 · Primary 3 금지 |
| **1–9** | Surface / safety | 삭제=Confirm · 수정+목록=Drawer · Single Primary |
| **10–49** | Pattern routing | 목록=Admin stack · ≥20=Table · 현황=Dashboard |
| **50–79** | Recipe / layout | Admin frame · Recipe reuse 우선 |
| **80–99** | Soft preference | Card vs List(<20) · density hint |

**Conflict resolution**

1. Priority 0(Never)이 항상 이긴다 → THEN 무효 · Result 차단.
2. 같은 band면 **더 구체적 IF**(조건 수↑) 우선.
3. Overlay 고정 문장과 모순되면 product fixed wins: Drawer / Modal / Confirm ([`docs/07`](../../docs/07_UX_DECISION_TREE.md)).
4. Pattern chain 순서는 [`RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md) 준수 — Search 위에 Filter 배치 등 THEN으로도 불가.

---

## Core rules (declarative)

### Never overrides (P0)

| id | IF | THEN | NEVER |
| --- | --- | --- | --- |
| `R-NEVER-MODAL-IN-MODAL` | 어떤 Overlay 중첩 제안이든 | Confirm/Modal은 **1층만** | Modal 안에 Modal |
| `R-NEVER-MULTI-PRIMARY` | Primary 후보 ≥ 3 | Primary **1** · 나머지 Secondary/Ghost/Danger | Primary Button 3개 |
| `R-NEVER-SEARCH-UNDER-SEARCH` | Search 중복 배치 | Search **최상단 1회** · 조건은 Filter | Search 아래 Search |
| `R-NEVER-FORM-TABLE` | Form 안에 Table 배치 | 목록 화면과 CRUD 표면 **분리** | Form 안에 Table |
| `R-NEVER-INVENT-TOKEN` | Color/Radius/Typography/Shadow 신규 | Kit/Foundation 토큰만 | 새 토큰 생성 |
| `R-NEVER-INVENT-COMPONENT` | Kit gap 증명 없음 | 기존 Component만 · gap은 PR 후보 문서화 | 새 Component 화면 발명 |
| `R-NEVER-SKIP-PATTERN` | Pattern/Recipe 없이 Screen | Judgment order로 복귀 | Pattern 없이 Screen |

### Surface & safety (P1–9)

| id | priority | IF | THEN |
| --- | --- | --- | --- |
| `R-DELETE-CONFIRM` | 1 | Task = 삭제 OR Bulk 삭제 | **Confirm Dialog** · 건수 명시 · Danger + Confirm |
| `R-EDIT-KEEP-LIST-DRAWER` | 2 | 수정 AND 목록 유지 | **Detail Drawer** + Sticky Footer |
| `R-QUICK-VIEW-DRAWER` | 3 | 빠른 확인 (상세 스캔 · 목록 유지) | **Drawer** (Modal 아님) |
| `R-QUICK-ACTION-MODAL` | 4 | 빠른 작업 (짧은 결정 · 포커스 차단) | **Modal** (Drawer 아님) |
| `R-CREATE-PAGE` | 5 | 생성 AND 긴 폼/목록 미유지 | **Page** + CRUD Form |
| `R-SINGLE-PRIMARY` | 6 | 화면 Compose | Primary **정확히 1** (`single-primary`) |
| `R-EMPTY-CTA` | 7 | Empty State | CTA 필수 (`empty-cta`) |
| `R-LOADING-SKELETON` | 8 | Loading | Skeleton (`skeleton-loading`) |

### Pattern routing (P10–49)

| id | priority | IF | THEN |
| --- | --- | --- | --- |
| `R-LIST-ADMIN-STACK` | 10 | 목록 화면 | Search → Filter → Data Table (+ Pagination · Empty · Loading) |
| `R-DASHBOARD` | 11 | 현황 확인 | Dashboard (KPI → Charts → Activity → Quick Action) |
| `R-CRUD` | 12 | 등록 · 수정 (폼 Task) | CRUD Form · 생성=Page · 수정+목록=Drawer |
| `R-TABLE-GE-20` | 20 | 데이터 ≥ 20 | **Table** (Data Table Pattern) |
| `R-CARD-LT-20` | 21 | 데이터 < 20 AND 카드 적합 | Card / List (Table 강제 아님) |
| `R-WIZARD-PAGE` | 22 | 단계 존재 | Wizard → **Page** (풀 페이지) |
| `R-ADMIN-LAYOUT` | 30 | 관리자 화면 | Sidebar Layout **240 + fluid** · 12/1440 |
| `R-PORTAL-LAYOUT` | 31 | 비관리자 · 포털 | Centered Portal layout |
| `R-FILTER-BELOW-SEARCH` | 15 | Filter 사용 | Filter는 Search **아래** (`filter-below-search`) |
| `R-SEARCH-FIRST` | 14 | 조회·목록 | Search 최상단 (`search-top`) |

### Recipe & compose (P50–79)

| id | priority | IF | THEN |
| --- | --- | --- | --- |
| `R-RECIPE-REUSE` | 50 | Goal+Task가 기존 Recipe와 일치 | 해당 Recipe chain **재사용** (Q4=YES) |
| `R-RECIPE-PROPOSE-DOC` | 55 | 기존 Recipe 없음 AND Pattern chain으로 설명 가능 | **새 Recipe md** 제안 · UI/토큰 발명 금지 (Q5) |
| `R-KIT-ONLY-COMPONENTS` | 60 | Component 선택 | [`COMPONENT_SELECTOR`](./COMPONENT_SELECTOR.md) · catalog/kit만 |
| `R-ADMIN-FRAME` | 65 | Domain = admin | Layout 12 grid · 1440 · sidebar 240 · content fluid |

---

## Validation gates (before Result)

모든 gate 통과 전 Result 금지. Q6–Q8 매핑.

| Gate | Checks | Fail action |
| --- | --- | --- |
| **pre-pattern** | Goal(Q1) · Task 존재 · Tree/Rules 후보 ≥ 1 | 재질문 |
| **pre-recipe** | Pattern ids 확정 · RELATIONSHIPS 순서 OK | Pattern Selector 재실행 |
| **pre-component** | required components ⊆ Kit · 토큰 발명 없음 (Q3) | Kit-only로 축소 또는 gap 문서화 |
| **pre-result** | Q6 a11y · Q7 난이도 · Q8 유지보수 · Never P0 · Single Primary · Overlay 규칙 | Result 차단 · 수정 지시 |

### pre-result checklist (요약)

- [ ] 키보드 · focus · 대비 · Empty CTA · Error Retry ([`docs/09`](../../docs/09_ACCESSIBILITY.md))
- [ ] Kit compose로 구현 가능 · 과한 커스텀 없음 (Q7)
- [ ] Pattern/Recipe id로 추적 · one-off 없음 (Q8)
- [ ] Never P0 전부 통과
- [ ] Primary 1 · 삭제=Confirm · 수정+목록=Drawer

---

## Evaluation algorithm (design-time)

```
1. Require Problem, User Goal (Q1), Task
2. Collect candidate answers from Decision Tree walk
3. Load rules where IF ⊆ facts; sort by priority asc
4. Apply THEN in order; on NEVER hit → reject that THEN
5. Emit Pattern ids → Pattern Selector
6. Recipe reuse (R-RECIPE-REUSE) else propose doc (R-RECIPE-PROPOSE-DOC)
7. Component Selector → Layout
8. Run Validation gates (Q6–Q8)
9. Result = Output Rules only if all gates pass
```

---

## Cross-links

- Tree companion: [`DECISION_TREE.md`](./DECISION_TREE.md)
- Product tree: [`docs/07_UX_DECISION_TREE.md`](../../docs/07_UX_DECISION_TREE.md)
- Anti-patterns: [`docs/11_ANTI_PATTERNS.md`](../../docs/11_ANTI_PATTERNS.md)
- UX principles (8 Rules): [`docs/02_UX_PRINCIPLES.md`](../../docs/02_UX_PRINCIPLES.md)
- Existing code rules (button/overlay): `src/playground/decision-rules.ts` · `never-always.ts`
