# 02 — UX Principles

## Purpose

운영 Admin/Portal에서 **매일 같은 결정을 반복하지 않도록** 8개 규칙을 고정합니다.  
영문 라벨은 코드·문서 교차 참조용이며, **한국어 문장이 canonical**입니다.

Code: `src/playground/ux-principles.ts`

---

## 8 Rules

| # | Label | Key | Rule (canonical) |
| --- | --- | --- | --- |
| 1 | **Search First** | `search-top` | 검색은 항상 가장 위에 위치한다. |
| 2 | **Filter Before Data** | `filter-below-search` | Filter는 Search 아래에 위치한다. |
| 3 | **Single Primary** | `single-primary` | Primary Button은 화면당 하나만 존재한다. |
| 4 | **Detail Drawer First** | `detail-drawer` | Detail은 새로운 페이지보다 Drawer를 우선 사용한다. |
| 5 | **Confirm Delete** | `delete-confirm` | 삭제는 Confirm Dialog를 사용한다. |
| 6 | **Skeleton Loading** | `skeleton-loading` | Loading은 Skeleton을 우선 사용한다. |
| 7 | **Empty CTA** | `empty-cta` | Empty State는 CTA를 반드시 제공한다. |
| 8 | **Admin Stack · Bulk Action** | `admin-stack` | 모든 관리자 화면은 Search → Filter → Data → Pagination 구조를 따른다. Bulk Action은 Data와 함께 둘 수 있다. |

---

## Rule 8 — Admin Stack

```
Search → Filter → Data → Pagination
```

| Region | Role |
| --- | --- |
| **Search** | 항상 최상단 (Rules 1–2) |
| **Filter** | Search 바로 아래 |
| **Data** | Table + (선택) Bulk Action toolbar |
| **Pagination** | Data 영역 아래 |

**Data Table 구현 스택**

```
Search → Filter → Bulk Action → Table → Pagination
(+ Empty · Loading)
```

Bulk Action은 Data에 속합니다. Bulk를 Filter 위로 올리거나 Search를 두 번 두지 않습니다.

---

## Sticky Footer

수정 Drawer / CRUD 폼에서 **저장**은 Sticky Footer의 **Primary 하나**입니다.

| Action | Variant |
| --- | --- |
| 저장 / Submit | Primary |
| 취소 / 닫기 | Secondary |
| 삭제 | Danger → Confirm Dialog |

Sticky Footer와 Search 조회 Primary가 **같은 화면에 동시에** 있으면 안 됩니다. 목록 화면의 Primary는 **조회**, Drawer 안의 Primary는 **저장** — 표면(surface)이 다르면 각각 1개.

---

## Bulk Action

- 행 선택 시에만 노출 (또는 disabled + 안내)
- Data Table 툴바에 위치 — Admin Stack 서사를 깨지 않음
- 삭제 Bulk → Confirm Dialog (Rule 5)
- Primary와 경쟁하는 강조 버튼을 Bulk에 여러 개 두지 않음

---

## Skeleton · Empty · Delete

| Situation | Pattern / Rule |
| --- | --- |
| 초기 로드 · 필터 적용 대기 | Skeleton (Rule 6) — Spinner는 짧은 액션용 |
| 결과 0건 · 첫 데이터 없음 | Empty + **Primary CTA** (Rule 7) — 필터가 원인이면 Reset Filter |
| 삭제 | Confirm Dialog만 (Rule 5) — Drawer에서 즉시 삭제 금지 |
| 상세 · 수정 · 빠른 확인 | Drawer 우선 (Rule 4) |

---

## Pattern Goal mapping

| Pattern | Goal | Honors |
| --- | --- | --- |
| Data Table | 데이터 조회 | Rules 1–8 |
| Dashboard | 현황 확인 | Rule 3 (Primary ≤1) |
| CRUD | 등록 및 수정 | Rules 3, 4 |

---

## Examples

**맞음 — 회원관리 목록**

1. Search (좌 입력 · 우 조회 Primary)
2. Filter
3. Bulk(선택 시) + Table
4. Pagination
5. 행 상세 → Drawer · Sticky Footer 저장

**틀림**

- Search 아래 또 Search
- Primary: 조회 + 등록 + 내보내기 동시 강조
- Empty에 “데이터 없음”만 있고 CTA 없음
- 삭제 = Drawer footer Danger 즉시 실행 (Confirm 없음)

---

## Related docs

- [01_PRODUCT_PHILOSOPHY](./01_PRODUCT_PHILOSOPHY.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [06_SCREEN_RECIPES](./06_SCREEN_RECIPES.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [08_LAYOUT_RULES](./08_LAYOUT_RULES.md)
- [10_BEST_PRACTICES](./10_BEST_PRACTICES.md)
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md)
- Detail: `docs/principles/jko-ux-principles.md`
