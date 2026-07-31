# Decision Tree (AI form)

> **분기 Q&A** — 화면 유형을 질문으로 라우팅한다. 예쁜 UI 트리가 아니라 **운영 Task 라우팅**.  
> Product canonical: [`docs/07_UX_DECISION_TREE.md`](../../docs/07_UX_DECISION_TREE.md)  
> Graph: [`knowledge/ux-patterns/RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md)  
> Rules companion: [`RULE_ENGINE.md`](./RULE_ENGINE.md) · Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md)

Judgment order: **Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result**

Tree는 **Task → Pattern** 구간에 답한다 (Q2). Goal(Q1)이 없으면 진입하지 않는다. 확정·Never는 Rule Engine.

---

## How to walk

1. Problem · User Goal · Task를 한 줄씩 적는다.
2. 아래 질문을 **위에서부터** YES인 경로를 탄다 (복수 YES 가능 — 목록+삭제 등).
3. 나온 Pattern path를 [`PATTERN_SELECTOR.md`](./PATTERN_SELECTOR.md)에 넘긴다.
4. Overlay/Surface는 Rules P1–9와 교차 검증한다.
5. 충돌 시 고정: **수정+목록 유지 = Drawer** · **빠른 확인 = Drawer** · **빠른 작업 = Modal** · **삭제 = Confirm**.

Code mirror: `src/playground/decision-tree.ts` · Live: `/principles/decision-tree`

---

## Full tree (flowchart)

```
                    [Goal · Task 확정]
                            │
                            ▼
                   목록 화면인가?
                      │         │
                     YES        NO
                      │         │
                      ▼         ▼
            Search → Filter   현황 확인인가?
            → Data Table         │
            (+ Bulk/Empty/      YES → Dashboard
              Loading/Pag.)      │     (KPI→Charts→Activity→Quick Action)
                                 NO
                                  │
                                  ▼
                          등록 · 수정인가?
                             │         │
                            YES        NO ──► (아래 특수 분기)
                             │
                             ▼
                      CRUD Form
                   생성? → Page
                   수정? → 목록 유지?
                            │      │
                           YES     NO
                            │      │
                         Drawer   Page
```

### 삭제 · 건수 · 단계 · 관리자 · 빠른 작업

```
데이터 수정인가? ──YES──► 목록 유지? ──YES──► Drawer
                              └──NO───► Page

삭제인가? ──YES──► Confirm Dialog (Modal)   [R-DELETE-CONFIRM]

데이터 ≥ 20인가?
  YES → Table (Data Table Pattern)
  NO  → Card / List Pattern

단계가 존재하는가? ──YES──► Wizard Pattern → Page

관리자 화면인가?
  YES → Sidebar Layout (240 + fluid) · Admin 12/1440
  NO  → Centered Portal Layout

빠른 작업인가?
  YES → Modal
  NO  → Page (또는 “빠른 확인”이면 Drawer — 혼동 금지)
```

> **빠른 작업 ≠ 빠른 확인**  
> 빠른 작업 = 짧은 결정·포커스 차단 → **Modal**  
> 빠른 확인 = 상세 스캔·목록 유지 → **Drawer**

---

## Node → Pattern / Rule map

| Node id | Question | YES path (Patterns / Surface) | Rule ids |
| --- | --- | --- | --- |
| `list-screen` | 목록 화면인가? | Search → Filter → Data Table | `R-LIST-ADMIN-STACK` · `R-SEARCH-FIRST` · `R-FILTER-BELOW-SEARCH` |
| `dashboard` | 현황 확인인가? | Dashboard | `R-DASHBOARD` |
| `crud` | 등록 · 수정인가? | CRUD Form · 생성=Page · 수정+목록=Drawer | `R-CRUD` · `R-CREATE-PAGE` · `R-EDIT-KEEP-LIST-DRAWER` |
| `edit-keep-list` | 목록을 유지해야 하는가? | Drawer / Page | `R-EDIT-KEEP-LIST-DRAWER` |
| `delete` | 삭제인가? | Confirm Dialog | `R-DELETE-CONFIRM` |
| `data-ge-20` | 데이터가 20개 이상인가? | Table / Card·List | `R-TABLE-GE-20` · `R-CARD-LT-20` |
| `wizard` | 단계가 존재하는가? | Wizard → Page | `R-WIZARD-PAGE` |
| `admin` | 관리자 화면인가? | Sidebar 240+fluid / Portal | `R-ADMIN-LAYOUT` · `R-PORTAL-LAYOUT` |
| `quick-action` | 빠른 작업인가? | Modal / Page | `R-QUICK-ACTION-MODAL` |
| `quick-view` | 빠른 확인인가? | Drawer | `R-QUICK-VIEW-DRAWER` |

---

## Drawer vs Page (Tree leaf)

| Drawer | Page |
| --- | --- |
| 수정 (+ 목록 유지) | 많은 정보 · Wizard |
| 빠른 확인 | 생성 |
| 목록 유지 | 수정이지만 목록 미유지 |

Apply: 행 「상세」= Drawer · 회원 생성 = Page · Wizard = Page

---

## Modal vs Drawer vs Confirm

| Surface | When | RELATIONSHIPS |
| --- | --- | --- |
| **Modal** | 빠른 작업 · Confirm/Warning/Delete | Overlay · 1층만 |
| **Drawer** | 수정+목록 · 빠른 확인 | Data Table → Detail Drawer |
| **Confirm** | 삭제 · 위험 확정 | Drawer/Table → Confirm · Modal-in-Modal 금지 |

위성: Loading(Skeleton) · Empty(+CTA) · Error(+Retry) · Notification(성공, Confirm 밖) — [`RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md)

---

## After the tree

```
Tree outcomes (pattern path · surface · layout hint)
        │
        ▼
Rule Engine (priority · Never · conflict)     ← 확정
        │
        ▼
Pattern Selector → Recipe → Components → Layout → Validation → Result
```

Tree만으로 Result를 내지 않는다. Q6–Q8 Validation은 [`RULE_ENGINE.md`](./RULE_ENGINE.md) gates.

---

## Domain hints (Admin / SaaS / AI)

| Domain | Typical YES nodes | Example Recipe |
| --- | --- | --- |
| **admin** | list-screen · admin · data-ge-20 | [admin-member-management](../ux-patterns/recipes/admin-member-management.md) |
| **saas** | wizard · crud · settings-like | [saas-onboarding-wizard](../ux-patterns/recipes/saas-onboarding-wizard.md) |
| **ai** | (chat workspace · confirm apply) | [ai-compose-review](../ux-patterns/recipes/ai-compose-review.md) |

AI domain도 **Compose review**이지 UI Generate가 아니다.

---

## Cross-links

- Master 8 questions: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) (Q2)
- Pattern bodies: [`knowledge/ux-patterns/*/PATTERN.md`](../ux-patterns/README.md)
- Recipes: [`knowledge/ux-patterns/recipes/`](../ux-patterns/recipes/README.md)
- Layout: [`docs/08_LAYOUT_RULES.md`](../../docs/08_LAYOUT_RULES.md)
- Anti-patterns: [`docs/11_ANTI_PATTERNS.md`](../../docs/11_ANTI_PATTERNS.md)
