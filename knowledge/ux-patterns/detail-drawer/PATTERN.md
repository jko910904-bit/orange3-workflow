# Overview

**Detail Drawer**는 **목록을 유지한 채** 상세 확인·수정을 수행하는 Surface/Task Pattern이다.  
Rule `detail-drawer`: Detail은 새 Page보다 **Drawer 우선**.

```
빠른 확인 = Drawer
수정 + 목록 유지 = Drawer
빠른 작업(짧은 결정) = Modal  ← 혼동 금지
```

Canonical: [`docs/07`](../../../docs/07_UX_DECISION_TREE.md) · Live: [`/patterns/detail`](/patterns/detail)

# UX Goal

사용자가 리스트 컨텍스트를 잃지 않고 **한 건의 상세를 스캔·편집**한다.  
행 → Drawer → 저장/닫기 루프로 운영 속도를 유지한다.

# User Problems

- 행마다 풀페이지 이동으로 필터·스크롤 위치를 잃는다
- Drawer와 Modal·Page 기준이 팀마다 다르다
- Drawer 안에 또 Modal을 중첩한다
- 저장 Primary가 헤더·푸터·본문에 중복된다
- 읽기 전용 상세와 편집 모드가 구분되지 않는다

# User Tasks

- 행에서 상세 열기
- 스크롤 스캔 · 섹션 이동
- (선택) 인라인 편집 / CRUD Form 모드
- 저장 · 취소 · 삭제(Confirm)
- 닫고 목록 계속

# When to Use

- 목록 유지가 필요할 때 (수정·빠른 확인)
- Data Table / List / Kanban 카드의 상세
- 정보가 Page 분량보다 적고 단일 엔티티일 때

# When NOT to Use

- **생성** 기본 → CRUD **Page**
- **Wizard / 다단계** → Page
- **삭제만** → Confirm Dialog (Drawer 본문에서 즉시 삭제 금지)
- 매우 긴 본문 Portal 읽기(공지 전문 등) → Page 허용 ([`06`](../../../docs/06_SCREEN_RECIPES.md))
- 짧은 예/아니오 → Modal

# UX Flow

```
목록 행 액션/클릭
→ Drawer open (포커스 트랩)
→ 읽기 또는 편집
→ Save(Sticky Footer) | Cancel | Delete→Confirm
→ Close → 목록 상태 유지 (가능하면 selection/scroll 복원)
```

# Layout Structure

```
목록(Search→Filter→Table)  |  Drawer overlay
                           |  Header
                           |  Body (sections)
                           |  Sticky Footer (편집 시)
```

- Admin: 목록은 12-col fluid 유지, Drawer는 우측 overlay
- 폭: 제품 표준 하나로 고정 (콘텐츠 과밀 시 섹션 분할, 폭 남발 금지)

# Required Components

Drawer · Typography/sections · Description list · Button · (편집 시) Form fields · Sticky Footer · Modal(Confirm) · Skeleton

# Responsive Rules

- &lt; tablet: Drawer → full-screen sheet (여전히 목록 “아래/뒤”에 유지되는 느낌)
- Footer sticky + safe area
- 본문만 스크롤, 헤더/푸터 고정

# Accessibility

- `role="dialog"` 또는 동등 · `aria-modal`
- 포커스 트랩 · 초기 포커스 · Escape 닫기
- 열림/닫힘 상태 안내
- 스크림 클릭 닫기 정책을 키보드와 동일하게

# Best Practices

1. 빠른 확인과 수정을 같은 Drawer 셸에서 모드로 구분
2. Sticky Footer 저장 Primary 하나
3. 상세 필드 과다 시 탭/섹션 — progressive disclosure (GitHub 재해석)
4. 삭제·이탈은 Confirm
5. Loading은 Drawer 본문 Skeleton
6. Apple deference: chrome보다 **내용 계층**

# Anti Patterns

- Modal 안에 Modal (Drawer 위 확인은 Confirm 1층만)
- 생성 긴 폼을 Drawer에 몰아넣기
- Primary 3개
- 목록을 완전히 unmount 하는 “가짜 Drawer”
- 새 토큰으로 Drawer 스킨 창작

# Examples

- Live: [`/patterns/detail`](/patterns/detail)
- Screen: [`/screens/member-management`](/screens/member-management) Step Drawer
- Screen: [`/screens/notice`](/screens/notice) (짧은 상세 Drawer / 긴 본문 Page 분기)

# Related Patterns

- [Data Table](../data-table/PATTERN.md) — 진입
- [CRUD Form](../crud-form/PATTERN.md) — 편집 본문
- [Confirm Dialog](../confirm-dialog/PATTERN.md)
- [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md)
- [Timeline](../timeline/PATTERN.md) — 상세 내 이력 섹션
- [Permission](../permission/PATTERN.md) — 액션 노출
- [File Manager](../file-manager/PATTERN.md) / [File Upload](../file-upload/PATTERN.md) — 첨부 섹션
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [admin-notice-board](../recipes/admin-notice-board.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
