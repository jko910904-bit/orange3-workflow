# Overview

**Confirm Dialog**는 **되돌리기 어려운 결정**(특히 **삭제**)을 Modal로 한 번 더 확인하는 Pattern이다.  
Rule `delete-confirm`. 빠른 작업(짧은 결정) = Modal · 빠른 확인(상세 스캔) = Drawer — 혼동 금지.

Canonical: [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/07`](../../../docs/07_UX_DECISION_TREE.md) · Live: [`/patterns/dialog`](/patterns/dialog)

# UX Goal

사용자가 파괴적/비가역 액션의 **대상·결과**를 읽고 명시적으로 동의하거나 취소한다.

# User Problems

- 툴바/Drawer에서 즉시 삭제된다
- 확인 문구에 대상명이 없어 잘못 지운다
- Modal 안에 또 Modal이 뜬다
- Confirm과 긴 CRUD Form을 한 Modal에 섞는다
- Primary가 삭제와 저장에 동시에 filled다

# User Tasks

- 경고 읽기 (대상 식별자 포함)
- 확인 (Danger) / 취소 (Secondary)
- (선택) “이해함” 체크 후 활성화

# When to Use

- **삭제** (단건·Bulk)
- 미저장 이탈
- 권한 박탈 · 게시 취소 등 비가역에 가까운 운영 액션
- Decision Tree: 삭제인가? YES → Confirm

# When NOT to Use

- 단순 성공 알림 → Notification
- 상세 읽기 → Detail Drawer
- 긴 등록 폼 → CRUD Page
- 정보성 공지 → Non-blocking Banner/Snackbar

# UX Flow

```
Danger/삭제 클릭
→ Modal open (포커스 트랩)
→ 대상명·결과 설명
→ 취소 | 삭제(Danger)
→ 성공 시 close + Notification + 목록 갱신
```

# Layout Structure

```
Scrim
└ Modal
   Title (삭제 확인)
   Body (대상 · 결과 · 되돌리기 여부)
   Footer: [취소 Secondary] [삭제 Danger]  ← Primary filled 남용 금지; Danger가 강조
```

한 층만. Never: Modal in Modal.

# Required Components

Modal/Dialog · Typography · Button · (optional) Checkbox · Focus trap

# Responsive Rules

- 좁은 폭: bottom sheet형 Dialog 허용 — 그래도 중첩 Modal 금지
- 버튼 full-width 스택 가능; **취소가 실수 클릭에 유리한 위치** 검토

# Accessibility

- `role="alertdialog"` 권장
- 초기 포커스: 취소 또는 본문 (실수 삭제 방지 정책 문서화)
- Escape = 취소
- 대상명을 accessible name에 포함

# Best Practices

1. 삭제 = Confirm만 ([`02`](../../../docs/02_UX_PRINCIPLES.md) Rule 5)
2. 본문에 **무엇을** 지우는지 명시
3. Bulk면 건수 표시
4. Drawer 저장 Primary와 Confirm Danger를 같은 시각 계층으로 경쟁시키지 않음
5. Linear식 빠른 확인감은 **짧은 카피**로, 스킵 Confirm은 금지

# Anti Patterns

- 즉시 삭제
- Modal 안 Modal
- Confirm 안에 Table/Form 전체
- Primary 3개
- 성공까지 Confirm을 붙잡음 (성공은 Notification)

# Examples

- Live: [`/patterns/dialog`](/patterns/dialog)
- Screen: [`/screens/member-management`](/screens/member-management) 삭제 스텝
- Decision: [`docs/07`](../../../docs/07_UX_DECISION_TREE.md)

# Related Patterns

- [CRUD Form](../crud-form/PATTERN.md) · [Detail Drawer](../detail-drawer/PATTERN.md)
- [Data Table](../data-table/PATTERN.md) — Bulk 삭제
- [Notification](../notification/PATTERN.md) — 완료
- [Permission](../permission/PATTERN.md) — 삭제 권한
- [Error](../error/PATTERN.md) — 삭제 API 실패
- [File Manager](../file-manager/PATTERN.md) — 파일 삭제
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [ai-compose-review](../recipes/ai-compose-review.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
