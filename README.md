# JKO Design System

**JKO v2.0** — Design System Platform for operational products.

Compose ≠ Generate. AI는 Color · Typography · Radius · Components를 발명하지
않습니다. 화면은 Foundation → Components → UX Patterns → Screens 순으로 키트를
조립합니다.

**Mission:** 운영·개발·유지보수하기 쉬운 실무 Design System Platform

## Source of truth (product decisions)

**[`docs/UX_RULES.md`](./docs/UX_RULES.md)** — consult first for all feature work.

Also: [`docs/README.md`](./docs/README.md) · [`AGENTS.md`](./AGENTS.md) · `.cursor/rules/jko-design-system.mdc`

## Stack

- Next.js (App Router, `src/`)
- TypeScript
- Design tokens + React components under `src/design-system/`
- Catalog JSON under `src/catalog/`

## Menu IA

```
Design Kit
├ Foundation
├ Components
├ UX Patterns
├ Principles
└ Screens
-------------------
Playground
-------------------
Settings
```

| Route | Area |
| --- | --- |
| `/` | Design System hub |
| `/foundations` | Foundation — Color, Type, Radius, Spacing, Shadow, Grid, Icon Style, Motion |
| `/components` | Components (kit list; stubs = 준비 중) |
| `/patterns` | UX Patterns (components composed into UX units) |
| `/principles` | JKO UX Rules (8 operational rules) |
| `/principles/decision-tree` | UX Decision Tree (compose decisions) |
| `/screens` | Screens (pattern combinations, static) |
| `/playground` | AI experiment only — does not mutate the Kit |
| `/playground/composer` | Future AI Composer stub (recommend/compose only) |
| `/settings` | Design Kit admin settings stub |

`/templates` redirects to `/screens` for compatibility.

## Philosophy

1. **Design Once** — tokens, components, and patterns are defined once and reused
2. **Consistency** — same kit across screens; no one-off invention
3. **Operation First** — built for admin/portal operational UX, not demo chrome
4. **Developer Friendly** — clear hierarchy for implementers and handoff
5. **Maintainable** — changes flow Foundation → Components → Patterns → Screens
6. **Pattern Before Screen** — Screens are Pattern combinations only
7. **Accessibility** — keyboard, contrast, and semantics as kit defaults
8. **Responsive** — Dense (Admin) / Comfortable (Portal) plus responsive layout

## JKO UX Rules (8)

Canonical Korean rules (`src/playground/ux-principles.ts` · `docs/UX_RULES.md`):

1. 검색은 항상 가장 위에 위치한다. (`search-top`)
2. Filter는 Search 아래에 위치한다. (`filter-below-search`)
3. Primary Button은 화면당 하나만 존재한다. (`single-primary`)
4. Detail은 새로운 페이지보다 Drawer를 우선 사용한다. (`detail-drawer`)
5. 삭제는 Confirm Dialog를 사용한다. (`delete-confirm`)
6. Loading은 Skeleton을 우선 사용한다. (`skeleton-loading`)
7. Empty State는 CTA를 반드시 제공한다. (`empty-cta`)
8. 모든 관리자 화면은 Search → Filter → Data → Pagination 구조를 따른다. (`admin-stack`)

**Admin stack:** Search → Filter → Data → Pagination  
(Bulk Action may sit with Data; do not break this narrative.)

**Core pattern stacks**
- Data Table (Goal: 데이터 조회): Search → Filter → Bulk Action → Table → Pagination · Empty · Loading
- Dashboard (Goal: 현황 확인): KPI → Charts → Recent Activity → Quick Action
- CRUD (Goal: 등록 및 수정): Form · Validation · Submit · Cancel (Sticky Footer in Drawer)

**Decision Tree:** [`docs/principles/ux-decision-tree.md`](./docs/principles/ux-decision-tree.md) · live `/principles/decision-tree`  
(수정+목록 유지=Drawer · 빠른 작업=Modal · 삭제=Confirm · ≥20=Table / &lt;20=Card)

**Foundation** — admin-only edits; AI never invents tokens  
**Components** — AI does not create new components  
**UX Patterns** — Pattern = components composed into a UX unit (Data Table is the gold standard)  
**Screens** — static Pattern combinations (회원관리, 상품관리, 공지, FAQ, Dashboard)  
**Playground** — AI experiments only; does not mutate the Design Kit  

Future AI Composer may **recommend / compose** kit resources only — never invent
tokens or components. Legacy generator code under `src/generator/` is lab-only
and is not a product CTA.

## References

Apple HIG · Material Design · Ant Design · Linear · Stripe · Toss — **inspired,
not copied**. JKO optimizes for operational UX.

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
```
