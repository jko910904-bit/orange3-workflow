# Overview

**Permission**은 **누가 무엇을 할 수 있는지**를 조회·부여·회수하는 Task Pattern이다.  
UI 숨김만으로 끝내지 않고, 거부 상태·감사·Confirm을 운영 가능하게 만든다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/permission`](/patterns/permission)

# UX Goal

관리자가 역할·권한을 **정확히 할당**하고, 사용자는 거부 시 **왜/다음에 무엇을** 할지 안다.

# User Problems

- 버튼만 숨겨 장애로 오해한다
- 역할·권한 매트릭스가 Form+Table 중첩으로 붕괴한다
- 권한 회수에 Confirm이 없다
- Data Table 액션과 권한 상태가 불일치한다

# User Tasks

- 역할/사용자 검색
- 권한 매트릭스 조회·토글
- 저장 · 회수 Confirm
- 거부 화면에서 도움/요청

# When to Use

- Admin 역할 관리 · 메뉴/액션 ACL
- 공유 링크·파일 권한 (File Manager와 조합)
- 403 경험 UX

# When NOT to Use

- 단순 프로필 이름 수정 → CRUD/Settings
- 모든 버튼을 권한 Pattern 문서로 대체 (Kit Button 규칙과 병행)
- AI가 임의로 새 역할 토큰/컬러 생성

# UX Flow

```
Search → (Filter: role)
→ Matrix / role detail Drawer
→ Toggle permissions → Save
→ Revoke → Confirm
→ Subject 사용자 화면: 403 Error + Help (Empty로 위장 금지)
```

# Layout Structure

```
Admin stack-ish:
Search → Filter → Role table OR Matrix
Detail Drawer: permissions checklist
Sticky Footer Save
```

매트릭스가 크면 Data Table Pattern으로 역할 목록을 분리하고 Drawer에서 권한 편집.

# Required Components

Input.Search · Table/Matrix · Checkbox/Switch · Drawer · Button · Confirm · Alert(403) · Empty

# Responsive Rules

- 매트릭스 → 역할 선택 후 체크리스트로 붕괴
- Sticky Footer 유지

# Accessibility

- 체크박스 그룹명 = permission scope
- 거부 메시지 `role="alert"`
- 키보드로 매트릭스 탐색

# Best Practices

1. 숨김 vs disabled+툴팁 정책을 제품 표준으로 문서화
2. 회수·삭제급 변경 = Confirm
3. 감사 [Timeline](../timeline/PATTERN.md) 연계
4. 403 ≠ Empty
5. Ant Admin 권한 매트릭스 개념만 재해석

# Anti Patterns

- Form 안에 거대 Table 매트릭스+인라인 사용자 CRUD 혼재
- 즉시 권한 박탈
- Primary 3개
- 오류를 Empty CTA “만들기”로 오도

# Examples

- Live: [`/patterns/permission`](/patterns/permission)
- 설정: [`/patterns/settings`](/patterns/settings)
- 목록 액션: [`/patterns/data-table`](/patterns/data-table)

# Related Patterns

- [Settings](../settings/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md)
- [Data Table](../data-table/PATTERN.md) · [Detail Drawer](../detail-drawer/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) · [Error](../error/PATTERN.md)
- [File Manager](../file-manager/PATTERN.md)
- [Timeline](../timeline/PATTERN.md) — 감사
- [Empty State](../empty-state/PATTERN.md) — 혼동 금지
- Recipes: [admin-settings-permissions](../recipes/admin-settings-permissions.md) · [saas-team-permissions](../recipes/saas-team-permissions.md)
