# Overview

**Data Table**은 JKO 운영 UX의 **척추**다. Goal은 **데이터 조회**.  
Admin Stack gold standard:

```
Search → Filter → Bulk Action → Table → Pagination
(+ Empty · Loading)
```

Canonical: [`docs/patterns/data-table.md`](../../../docs/patterns/data-table.md) · [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/data-table`](/patterns/data-table)

# UX Goal

사용자가 조건으로 찾고, 결과를 **스캔·정렬·선택**하며, 행 액션(상세·수정·삭제)으로 이어간다.  
Table이 hero이고 chrome은 defer한다.

# User Problems

- 스택 순서가 깨져 매번 어디를 봐야 할지 모른다
- ≥20건인데 Card로 스캔 비용이 폭발한다
- Primary가 조회·등록·삭제·내보내기에 동시에 있다
- 행마다 풀페이지로 나가 목록 컨텍스트를 잃는다
- 삭제 확인 없이 즉시 지워진다
- Loading이 Spinner만, Empty에 CTA가 없다

# User Tasks

- 검색 · 필터 · 정렬
- 행 스캔 · 선택 (Bulk)
- 상세/수정 (Drawer)
- 삭제 (Confirm)
- 페이지 이동

# When to Use

- 관리자 목록 · 회원/상품/주문 등 **조회** 주 Task
- 데이터 밀도 **≥ 20** (Decision Tree)
- Bulk 작업이 필요한 운영 화면

# When NOT to Use

- **현황 확인**만 필요할 때 → [Dashboard](../dashboard/PATTERN.md) (첫 화면에 전체 Table 강제 금지)
- **&lt; 20**건 스캔 → List/Card
- Form 안에 편집용 Table을 넣는 경우 (Never)
- Kanban/캘린더가 Task 모델에 더 맞을 때

# UX Flow

```
Search → Filter → (선택 시 Bulk) → Table → Pagination
         ↘ Empty(+CTA) / Loading(Skeleton)
행 클릭/상세 → Detail Drawer (목록 유지)
삭제 → Confirm Dialog
생성 → CRUD Page (목록 떠남)
수정 저장 → Drawer Sticky Footer Primary
```

8 Rules 전부 적용 — 특히 `admin-stack`, `detail-drawer`, `delete-confirm`, `skeleton-loading`, `empty-cta`, `single-primary`.

# Layout Structure

```
┌ Sidebar 240 ┬ Content fluid (max 1440, 12-col) ┐
│             │ Header (등록 Secondary 가능)      │
│             │ Search                            │
│             │ Filter                            │
│             │ Bulk toolbar (selection>0)        │
│             │ Table (sticky header optional)    │
│             │ Pagination                        │
└─────────────┴───────────────────────────────────┘
```

- 카드로 Table을 장식 중첩하지 않음
- Bulk는 Data와 함께 — Filter 위로 올리지 않음

# Required Components

Search · Filter · Checkbox · Button(Bulk) · Table · Badge · Pagination · Empty · Skeleton · Drawer · Modal(Confirm)

Kit만 사용 ([`04`](../../../docs/04_COMPONENT_RULES.md)).

# Responsive Rules

- Dense Admin 기본; 좁은 폭에서는 핵심 컬럼만 · 나머지는 Drawer/숨김
- Horizontal scroll 허용 시 sticky 첫 컬럼 검토
- Pagination은 Table 아래 고정 순서 유지
- Mobile에서 Bulk는 선택 시에만 하단 바로 노출 가능

# Accessibility

- `th` · scope · 정렬 버튼명
- 행 Checkbox에 접근 가능한 label
- 키보드로 행 포커스 · Drawer 포커스 트랩
- 대비·focus ring Dense에서도 유지 ([`09`](../../../docs/09_ACCESSIBILITY.md))

# Best Practices

1. 기본 컬럼 최소화 + column setting
2. 숫자·날짜 정렬/포맷 규칙 통일
3. 행 액션은 overflow menu — Primary 경쟁 방지
4. selection=0이면 Bulk 숨김 또는 disabled
5. Ant density · Linear 속도는 **스택·키보드**로 재해석 — 테마 복사 금지
6. 상세 필드는 Drawer로 progressive disclosure

# Anti Patterns

- Form 안에 Table
- Search 없는 “예쁜 테이블만”
- Primary 3개
- 행마다 풀페이지 상세 (목록 유지 필요 시)
- Spinner만 영구 · Empty CTA 없음
- Modal 안 Modal

# Examples

- Live: [`/patterns/data-table`](/patterns/data-table)
- Screen: [`/screens/member-management`](/screens/member-management) · [`/screens/product-management`](/screens/product-management)
- Docs: [`docs/06`](../../../docs/06_SCREEN_RECIPES.md) 회원관리 · [`docs/10`](../../../docs/10_BEST_PRACTICES.md) Data Table BP

# Related Patterns

- [Search](../search/PATTERN.md) · [Filter](../filter/PATTERN.md)
- [Detail Drawer](../detail-drawer/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md)
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md)
- [Dashboard](../dashboard/PATTERN.md) — drill-down 도착지
- [Analytics](../analytics/PATTERN.md) — 표+차트 조합
- [Permission](../permission/PATTERN.md) — 행/액션 권한
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [admin-product-catalog](../recipes/admin-product-catalog.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
