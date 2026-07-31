# Overview

**CRUD Form**은 **등록 및 수정** Task Pattern이다.  
Form · Validation · Submit · Cancel이 핵심이며, 수정 Drawer에서는 **Sticky Footer**에 저장 Primary 하나.

```
생성 → Page
수정 → Drawer + Sticky Footer
삭제 → Confirm Dialog (폼 안에서 즉시 삭제 금지)
```

Canonical: [`docs/patterns/crud.md`](../../../docs/patterns/crud.md) · [`docs/07`](../../../docs/07_UX_DECISION_TREE.md) · Live: [`/patterns/crud`](/patterns/crud)

# UX Goal

사용자가 엔티티를 **정확히 생성·수정**하고, 검증 오류를 필드 단위로 고친 뒤 안전하게 저장한다.  
운영 실수(미저장 이탈·즉시 삭제)를 Pattern으로 막는다.

# User Problems

- 생성/수정을 긴 Modal에 몰아넣어 스크롤·포커스가 붕괴한다
- Footer에 Primary가 여러 개다
- Validation이 상단 alert만 있고 필드와 연결되지 않는다
- Form 안에 Table을 넣는다
- 삭제 Confirm 없이 Danger를 바로 실행한다
- Wizard를 Drawer에 억지로 넣는다

# User Tasks

- 필드 입력 · 수정
- Validation 확인 · 오류 수정
- Submit(저장) · Cancel(닫기)
- (수정 시) 삭제 → Confirm
- 미저장 이탈 시 확인

# When to Use

- 회원/상품/공지 등 엔티티 **등록·수정**
- Decision Tree: 등록·수정인가? YES
- 목록 유지 수정 → Drawer; 생성·다량 필드 → Page

# When NOT to Use

- **현황만** 볼 때 → Dashboard
- **조회만** 할 때 → Data Table (+ Detail 읽기 전용)
- 짧은 예/아니오 결정 → Confirm/Dialog (CRUD 전체가 아님)
- 다단계 온보딩 → Wizard **Page** (Drawer 금지 기본)

# UX Flow

```
[생성] Header CTA → CRUD Page → 입력 → Validate → Submit → 목록 복귀/토스트
[수정] 행 → Detail Drawer → 편집 → Sticky Footer 저장 → 목록 유지
[삭제] Danger → Confirm Dialog → 성공 Notification → 목록 갱신
[이탈] 더티면 Confirm · 아니면 즉시 닫기
```

목록면 Primary(조회)와 Drawer Primary(저장)는 **표면이 다르면** 각각 1개.

# Layout Structure

**Page (생성)**

```
Page Header
Form sections (12-col / Portal centered)
Sticky Footer: [Cancel Secondary] [Submit Primary]
```

**Drawer (수정)**

```
Drawer Header (제목 · 닫기)
Scrollable Form body
Sticky Footer: [Cancel] [Save Primary]  (+ Delete Danger → Confirm)
```

Admin frame: 12 / 1440 / 240 / fluid. Portal 생성은 Comfortable · centered 가능.

# Required Components

Input · Select · Checkbox · Textarea · DatePicker · Button · Form layout · Drawer · Modal(Confirm) · Notification/Snackbar · Validation message

Kit compose only — 새 Color/Type/Radius 금지.

# Responsive Rules

- Drawer: 좁은 폭에서 full-height sheet/drawer
- Sticky Footer는 키보드·세이프에리어 위에 고정
- 다단 폼은 1열로 붕괴; 라벨 상단 배치 Dense에서도 유지 가능

# Accessibility

- 모든 필드 label · `aria-invalid` · 오류 텍스트 연결
- Sticky Footer 버튼 키보드 도달
- Drawer: 포커스 트랩 · Escape · 스크림 클릭 정책 문서화
- 삭제 Confirm: 제목·본문·Danger 명시

# Best Practices

1. 생성=Page · 수정=Drawer ([`07`](../../../docs/07_UX_DECISION_TREE.md))
2. Sticky Footer 저장 Primary **하나** ([`02`](../../../docs/02_UX_PRINCIPLES.md))
3. 필드 단위 Validation — Stripe식 명확 에러 카피 재해석
4. Cancel=Secondary · Delete=Danger+Confirm
5. 섹션 제목으로 인지 부하 분할; 한 화면에 모든 도메인 우겨넣지 않기
6. 성공 후 [Notification](../notification/PATTERN.md)

# Anti Patterns

- Form 안에 Table
- Modal 안에 Modal
- Footer Primary 3개
- Wizard를 Drawer에 강제
- 즉시 삭제
- 새 Foundation 토큰으로 “예쁜 폼” 창작

# Examples

- Live: [`/patterns/crud`](/patterns/crud)
- Screen: [`/screens/member-management`](/screens/member-management) (생성 Page · 저장 Drawer)
- Docs: [`docs/06`](../../../docs/06_SCREEN_RECIPES.md) · [`docs/10`](../../../docs/10_BEST_PRACTICES.md) Form/CRUD BP

# Related Patterns

- [Detail Drawer](../detail-drawer/PATTERN.md) — 수정 surface
- [Confirm Dialog](../confirm-dialog/PATTERN.md) — 삭제·이탈
- [Data Table](../data-table/PATTERN.md) — 목록 복귀
- [Empty State](../empty-state/PATTERN.md) — 첫 등록 CTA
- [Error](../error/PATTERN.md) — 제출 실패
- [Notification](../notification/PATTERN.md) — 성공/실패 토스트
- [Settings](../settings/PATTERN.md) — 설정 폼과 구분 (도메인 엔티티 vs 환경)
- [Permission](../permission/PATTERN.md) — 필드/액션 가시성
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [saas-onboarding-wizard](../recipes/saas-onboarding-wizard.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
