# Overview

Material Design의 **상태(state) · 접근성 · 네비게이션 패턴 · 반응형** 의사결정을 분석한다.  
Material 색·모션·FAB 미학을 복사하지 않는다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/07_UX_DECISION_TREE.md`](../../../docs/07_UX_DECISION_TREE.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md) · [`docs/JKO_AI_DEVELOPMENT_RULES.md`](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)

# Design Philosophy

- **System of states** — 모든 interactive 요소는 enabled / disabled / hover / focus / pressed / error를 가진다.
- **Predictable navigation** — Top app bar / Navigation rail / Drawer는 “어디에 무엇을 두는지”의 패턴이다.
- **Adaptive layout** — breakpoint별로 구조를 바꾸되, Task(조회·수정)는 유지.

# UX Principles

| Material | JKO |
| --- | --- |
| Clear affordance + state | Kit Component 상태 완비 ([`04`](../../../docs/04_COMPONENT_RULES.md)) |
| Landmark regions | Admin Stack 구역 ([`admin-stack`](../../../docs/02_UX_PRINCIPLES.md)) |
| Responsive navigation | Dense Admin / Comfortable Portal ([`08`](../../../docs/08_LAYOUT_RULES.md)) |
| Error & helper text | Form Pattern에 inline error |

# Information Architecture

- Destination(주요 화면) vs Action(생성·필터)을 분리한다.
- FAB = Material의 “대표 생성” — JKO에서는 **화면당 Single Primary**로 동일 역할을 페이지 헤더/툴바에 둔다 (FAB 복제 금지).

# Navigation

- **Navigation drawer / rail / bar** 전환 논리를 참고: 좁은 폭에서는 접기, 넓은 폭에서는 상시.
- 중첩 목적지는 progressive disclosure (하위는 펼침 또는 별도 섹션).
- JKO Portal vs Admin shell 분리는 Material의 adaptive nav와 같은 문제 의식 ([`08`](../../../docs/08_LAYOUT_RULES.md)).

# Layout

- Grid·margin·gutter는 “시스템”으로 고정 — JKO Admin 12-grid와 철학 공유.
- Bottom sheet ≈ 모바일 temporary surface — JKO Decision Tree의 Sheet 슬롯 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).

# Components

- Text Field의 label / helper / error / supporting text 분리 → Form Pattern에 매핑.
- Snackbar = 비차단 피드백; 삭제는 여전히 Confirm Dialog (`delete-confirm`).
- Data Table의 selection + bulk bar = Admin Bulk Action과 정렬.

# Patterns

- List → Detail: Material list + detail pane ≈ JKO **Detail Drawer First**.
- Search은 top; filter chips는 search 아래 — Rules 1–2와 일치.

# Interaction

- Ripple 등 브랜드 모션 제외.
- Focus 이동 순서·Esc로 닫기·scrim 클릭 정책은 Overlay 규칙으로 문서화 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).

# Accessibility

- **가장 큰 학습 포인트**: 색만으로 상태 전달 금지, label 필수, touch target, keyboard.
- Live region으로 토스트/에러 알림 — 스크린리더 사용자 운영 시나리오에 필수.
- 대비·포커스 가시성은 Foundation + a11y checklist.

# Best Practices

1. Component 스펙에 state matrix를 먼저 적는다.
2. Nav 축소 시에도 현재 destination을 잃지 않는다.
3. Error는 필드 옆 + (필요 시) 요약 — Stripe 문서와 교차 참고.
4. Breakpoint 변경 시 Task 흐름(Search→Filter→Data)을 깨지 않는다.

# Anti Patterns

- Material Theme Builder 팔레트를 Foundation에 병합.
- FAB + Header Primary 동시 → Primary 2개 위반.
- 상태 없는 “예쁜” 버튼만 추가.

# What JKO Can Learn

- **States**: Kit 컴포넌트는 상태 표가 기본 산출물.
- **A11y**: 운영 Admin일수록 키보드·라벨·에러 연관이 생산성.
- **Navigation / Responsive**: shell은 adaptive, Pattern(Task)은 고정.

# Summary

Material에서 가져올 것은 리플과 인디고가 아니라 **상태·접근성·적응형 내비 의사결정**.  
JKO는 이를 Foundation 불변 · Pattern-first · Single Primary 안에 흡수한다.
