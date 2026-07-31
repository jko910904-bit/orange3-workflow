# 08 — Layout Rules

## Purpose

Admin / Portal 화면의 **뼈대**를 고정합니다.  
검색·버튼·푸터 위치는 UX Principle과 함께 지켜집니다.

Code: `src/playground/layout-admin.ts` · Density: `DensityProvider`

---

## Admin frame (canonical)

```
Admin · 12 Grid · Desktop 1440 · Sidebar 240 · Content Fluid
```

| Spec | Value |
| --- | --- |
| Canvas max | **1440px** |
| Sidebar (LNB) | **240px** fixed |
| Content columns | **12** |
| Content track | **fluid** (`minmax(0, 1fr)`) |

```
┌─────────┬──────────────────────────────┐
│ Sidebar │  Content (12-col fluid)      │
│  240    │  max canvas 1440             │
└─────────┴──────────────────────────────┘
```

CSS vars: `--admin-canvas` · `--admin-sidebar` · `--admin-columns` · `--admin-content`

---

## Portal layout

| Spec | Rule |
| --- | --- |
| Alignment | **Centered** content (Decision Tree: 관리자? NO) |
| Density | **Comfortable** |
| Nav | Top / minimal — Admin sidebar 복제 금지가 기본 |
| Forms (login 등) | 중앙 카드 · Single Primary |

---

## Content region rules (Admin stack)

세로 순서 (Rule #8):

```
Page header (optional chrome)
→ Search
→ Filter
→ Data (Bulk + Table)
→ Pagination
```

### Search row

| Element | Placement |
| --- | --- |
| Search field | **Left** |
| Search / 조회 Button | **Right** (Primary 하나) |
| Enter | 조회 실행 |

Search 아래 또 Search 금지. Filter는 Search **아래**.

### Sticky Footer

| Context | Rule |
| --- | --- |
| Drawer / 수정 폼 | Footer sticky · Primary = **저장** 하나 |
| Cancel | Secondary |
| Delete | Danger → Confirm (footer에서 즉시 실행 금지) |

목록 스크롤과 무관하게 저장 액션이 항상 보여야 할 때 Sticky Footer를 씁니다.

---

## Grid placement tips

| Content | Span guidance |
| --- | --- |
| Full-bleed table | 12 cols |
| Filter bar | 12 cols |
| KPI row | 3+3+3+3 (→ 6+6 → 12) |
| Form (create page) | 6–8 cols centered or left-aligned in content |
| Drawer | Overlay — grid 밖, 목록 컨텍스트 유지 |

---

## Responsive strategy

| Breakpoint mindset | Admin | Portal |
| --- | --- | --- |
| Desktop | Sidebar 240 + 12-col | Centered comfortable |
| Tablet | Sidebar → overlay drawer · table horizontal scroll | Stack sections |
| Mobile | Bottom nav / hamburger · Filter → Bottom Sheet · Detail → full sheet | Single column |

Density: Admin **Dense** · Portal **Comfortable**.  
새 breakpoint 토큰을 발명하지 말고 Kit / CSS 변수를 따릅니다.

---

## Examples

**맞음** — 회원관리: sidebar 240 · Search 좌/버튼 우 · Table 12col · 상세 Drawer + Sticky Footer  
**틀림** — content max 960 임의 고정 · Search 우측 구석 · Primary 등록 버튼을 Search와 같은 줄에 또 Primary로

---

## Related docs

- [03_FOUNDATION_RULES](./03_FOUNDATION_RULES.md)
- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [09_ACCESSIBILITY](./09_ACCESSIBILITY.md)
