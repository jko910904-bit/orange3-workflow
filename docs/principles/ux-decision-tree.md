# UX Decision Tree

Canonical product routing questions for Compose (not Generate).

**Source of truth:** `src/playground/decision-tree.ts` · **Master:** [../JKO_AI_DEVELOPMENT_RULES.md](../JKO_AI_DEVELOPMENT_RULES.md) · index: [../UX_RULES.md](../UX_RULES.md)

Use with [Never / Always](./never-always.md), [8 UX Rules](./jko-ux-principles.md), and companion trees below.

## Tree

### 목록 화면인가?

**YES** → Search Pattern → Filter Pattern → Data Table Pattern (Bulk → Table → Pagination · Empty · Loading)

### 현황 확인인가?

**YES** → Dashboard Pattern (KPI → Charts → Recent Activity → Quick Action)

### 등록·수정인가?

**YES** → CRUD Pattern (Form · Validation · Submit · Cancel) — 생성=Page · 수정=Drawer+Sticky Footer

### 데이터를 수정하는가?

**YES** → 목록을 유지해야 하는가?

- **YES** → Drawer
- **NO** → Page

### 삭제인가?

**YES** → Confirm Dialog

### 데이터가 20개 이상인가?

- **YES** → Table
- **NO** → Card

### 단계가 존재하는가?

**YES** → Wizard Pattern

### 관리자 화면인가?

- **YES** → Sidebar Layout
- **NO** → Centered Layout

### 빠른 작업인가?

- **YES** → Modal
- **NO** → Page

## Companion trees

| Topic | Doc | Code |
| --- | --- | --- |
| Drawer vs Page | [drawer-vs-page.md](./drawer-vs-page.md) | `navigation-rules.ts` |
| Button variants | [button-variants.md](./button-variants.md) | `decision-rules.ts` |
| Modal / Drawer / Sheet | [overlay-modal-drawer-sheet.md](./overlay-modal-drawer-sheet.md) | `decision-rules.ts` |
| Never / Always | [never-always.md](./never-always.md) | `never-always.ts` |

## Alignment reminders

- **Primary = 1** (Rule #3) — never three Primaries
- **Search once, on top** (Rules #1–2, #8)
- **No inventing Color / Radius / Typography** — Always use the Design Kit

## Live

`/principles/decision-tree` · `/principles#decision-tree`
