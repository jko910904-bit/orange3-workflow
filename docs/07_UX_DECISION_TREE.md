# 07 — UX Decision Tree

## Purpose

화면 유형을 **질문으로 고르면** Pattern · Surface가 정해집니다.  
예쁜 UI를 고르는 트리가 아니라 **운영 Task 라우팅**입니다.

Code: `src/playground/decision-tree.ts` · companions: `navigation-rules.ts` · `decision-rules.ts`  
Live: `/principles/decision-tree`

---

## How to use

1. 위에서부터 해당 질문에 YES인 경로를 탄다
2. Never/Always · 8 Rules와 함께 적용한다
3. 충돌 시: **수정+목록 유지 = Drawer** · **빠른 확인 = Drawer** · **빠른 작업 = Modal** · **삭제 = Confirm**

---

## Full tree

### 목록 화면인가?

**YES** → Search Pattern → Filter Pattern → Data Table Pattern  
(Bulk → Table → Pagination · Empty · Loading)

### 현황 확인인가?

**YES** → Dashboard Pattern  
(KPI → Charts → Recent Activity → Quick Action)

### 등록 · 수정인가?

**YES** → CRUD Pattern (Form · Validation · Submit · Cancel)  
- **생성** → Page  
- **수정** → Drawer + Sticky Footer

### 데이터를 수정하는가?

**YES** → 목록을 유지해야 하는가?

| 목록 유지 | Surface |
| --- | --- |
| **YES** | **Drawer** |
| **NO** | **Page** |

### 삭제인가?

**YES** → **Confirm Dialog** (Modal)

### 데이터가 20개 이상인가?

| 건수 | Prefer |
| --- | --- |
| **≥ 20** | **Table** (Data Table Pattern) |
| **&lt; 20** | **Card** / List Pattern |

### 단계가 존재하는가?

**YES** → **Wizard Pattern** → **Page** (풀 페이지)

### 관리자 화면인가?

| Admin? | Layout |
| --- | --- |
| **YES** | **Sidebar Layout** (240 + fluid) |
| **NO** | **Centered Layout** (Portal) |

### 빠른 작업인가?

| 빠른 작업? | Surface |
| --- | --- |
| **YES** | **Modal** |
| **NO** | **Page** (또는 맥락에 따라 Drawer — “빠른 확인”과 구분) |

> **빠른 작업 ≠ 빠른 확인**  
> 빠른 작업 = 짧은 결정·포커스 차단 → Modal  
> 빠른 확인 = 상세 스캔·목록 유지 → Drawer

---

## Drawer vs Page

| Drawer | Page |
| --- | --- |
| 수정 (+ 목록 유지) | 많은 정보 |
| 빠른 확인 | Wizard |
| 목록 유지 | 생성 |
| | 수정이지만 목록 미유지 |

Apply: 행 「상세」= Drawer · 회원 생성 = Page · Wizard = Page

---

## Modal vs Drawer vs Bottom Sheet

| Surface | When |
| --- | --- |
| **Modal** | 빠른 작업 · Confirm/Warning/Delete/Success · 포커스 차단 |
| **Drawer** | 수정 · 빠른 확인 · 목록 유지 |
| **Bottom Sheet** | 모바일 선택·필터·짧은 액션 · Admin desktop에서는 Drawer/Modal 우선 |

삭제: 항상 Confirm Dialog. Drawer 안에서 즉시 삭제 금지.  
Modal 안에 Modal 금지.

---

## Alignment reminders

- Primary = **1** (Rule #3)
- Search **한 번**, **맨 위** (Rules #1–2, #8)
- Color / Radius / Typography **발명 금지**

---

## Examples

| Situation | Path |
| --- | --- |
| 회원 500건 목록 + 행 수정 | 목록 YES → Data Table · 수정+목록유지 → Drawer |
| 온보딩 3단계 | 단계 YES → Wizard → Page |
| 알림 8건 | &lt;20 → Card/List |
| “삭제할까요?” | 삭제 YES → Confirm Modal |
| Portal FAQ | Admin? NO → Centered · Search → List |

---

## Related docs

- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md)
- [08_LAYOUT_RULES](./08_LAYOUT_RULES.md)
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md)
- Detail: `docs/principles/ux-decision-tree.md` · `drawer-vs-page.md` · `overlay-modal-drawer-sheet.md`
