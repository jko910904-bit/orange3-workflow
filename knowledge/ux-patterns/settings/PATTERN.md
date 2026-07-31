# Overview

**Settings**는 제품·계정·워크스페이스의 **환경 값을 조회·저장**하는 Task Pattern이다.  
도메인 엔티티 CRUD와 구분한다: Settings = 구성, CRUD = 업무 데이터.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/settings`](/patterns/settings)

# UX Goal

사용자가 설정을 **찾아 이해하고**, 안전하게 변경·저장하며, 위험 변경은 확인 후 적용한다.

# User Problems

- 설정 항목이 한 페이지에 무한 스크롤로 쌓인다
- 저장 Primary가 섹션마다 있다
- 검색 없이 항목을 못 찾는다
- 위험 설정(삭제·권한·결제)이 일반 토글과 동일한 무게로 보인다
- Admin Dense 토큰을 Portal Comfortable 설정에 무작정 적용

# User Tasks

- IA/섹션 이동 · (선택) 설정 내 Search
- 값 변경 · Validation
- Save / Cancel
- 위험 액션 → Confirm

# When to Use

- 프로필 · 알림 환경 · 테넌트/워크스페이스 구성
- Feature flag 운영(권한과 연계)

# When NOT to Use

- 회원/상품 등 업무 엔티티 → CRUD + Data Table
- 단발 빠른 결정 → Modal Confirm
- AI가 설정 토큰을 즉석 생성

# UX Flow

```
Settings nav (sections)
→ (Search within settings)
→ Form sections
→ Sticky Footer Save (Primary 하나) | Cancel
→ 위험 변경 Confirm
→ Notification 성공
```

# Layout Structure

```
┌ Settings nav │ Section form          ┐
│              │ Sticky Footer Save    │
└──────────────┴───────────────────────┘
```

Admin: sidebar 240과 별도 **settings 내부 nav** 가능. Portal: centered Comfortable.

# Required Components

Nav/Menu · Input · Switch · Select · Button · Sticky Footer · Confirm · Notification · Search(optional)

# Responsive Rules

- 내부 nav → 드롭다운/시트
- Sticky Footer 유지
- 섹션 1열 붕괴

# Accessibility

- 섹션 heading 계층
- Switch 접근 가능 label
- Save 후 상태 고지

# Best Practices

1. Sticky Footer 저장 Primary **하나** (섹션마다 저장 남발 금지)
2. 위험 구역 시각 분리 + Confirm
3. 설정 Search는 **설정 면 내부 1개** — 앱 전역 Search와 혼선 시 라벨 구분
4. Permission과 메뉴 가시성 동기화
5. Toss/Stripe 설정의 **명확한 그룹핑**만 차용

# Anti Patterns

- Primary 3개
- Form 안에 Table로 사용자 목록을 설정에 우겨넣기 (별도 Data Table 화면)
- Modal in Modal
- 새 Typography로 설정 히어로 제작

# Examples

- Live: [`/patterns/settings`](/patterns/settings)
- 권한 연계: [`/patterns/permission`](/patterns/permission)

# Related Patterns

- [CRUD Form](../crud-form/PATTERN.md) — 유사 폼, 다른 Task
- [Permission](../permission/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) · [Notification](../notification/PATTERN.md)
- [Search](../search/PATTERN.md) — 설정 내 검색 시
- [Empty State](../empty-state/PATTERN.md) · [Error](../error/PATTERN.md)
- [AI Chat](../ai-chat/PATTERN.md) — 설정 변경 제안은 Apply 전 검토
- Recipes: [admin-settings-permissions](../recipes/admin-settings-permissions.md) · [saas-billing-settings](../recipes/saas-billing-settings.md)
