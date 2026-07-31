# Overview

Notion은 **유연한 블록·DB·페이지 트리**로 팀 문서를 조립하는 제품이다.  
JKO와의 관계는 **유사점이 아니라 대조(contrast)** 가 핵심이다: Notion flexible ≠ JKO Pattern-locked.

관련: [`docs/01_PRODUCT_PHILOSOPHY.md`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/05_PATTERN_LIBRARY.md`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/06_SCREEN_RECIPES.md`](../../../docs/06_SCREEN_RECIPES.md) · [`docs/11_ANTI_PATTERNS.md`](../../../docs/11_ANTI_PATTERNS.md)

# Design Philosophy

- Notion: **빈 페이지에서 블록을 조합**해 매 워크스페이스가 다른 IA를 만든다.
- JKO: **미리 정의된 Pattern recipe**로 같은 Task는 같은 화면 구조를 강제한다.
- `Compose ≠ Generate` — Notion식 자유 조립을 Admin 운영 화면에 적용하면 유지보수가 붕괴한다.

# UX Principles

| Notion | JKO |
| --- | --- |
| Slash menu로 임의 블록 | Kit Component만 · Pattern 먼저 ([`05`](../../../docs/05_PATTERN_LIBRARY.md)) |
| 사용자 정의 DB view | 저장된 Filter는 파라미터 — 새 Screen 타입 아님 |
| 페이지 중첩 무한 | IA 깊이 제한 · Decision Tree ([`07`](../../../docs/07_UX_DECISION_TREE.md)) |
| WYSIWYG 창의성 | Consistency Over Creativity ([`01`](../../../docs/01_PRODUCT_PHILOSOPHY.md)) |

# Information Architecture

- Notion: sidebar pages = 팀이 만든 임의 트리.
- JKO: product IA는 설계자가 Pattern/Screen Recipe로 고정 — 운영자가 레이아웃을 재발명하지 않음.
- 배울 점(제한적): 즐겨찾기·최근 항목으로 **목적지 단축**은 shell에 가능.

# Navigation

- Toggle page · breadcrumb — 위치 표시는 참고.
- 전역 검색은 문서 검색; JKO 화면 Search는 **해당 엔티티 조회** (혼동 금지).

# Layout

- 블록 세로 스택의 가독성은 Portal 콘텐츠(공지 본문)에만 부분 참고.
- Admin에 Notion 풀폭 문서 레이아웃 + 임의 embed를 넣지 말 것 ([`08`](../../../docs/08_LAYOUT_RULES.md)).

# Components

- Callout / toggle = 콘텐츠 패턴이지 Kit 신규 근거가 아님.
- DB table UI ≈ Data Table — 그러나 Notion 셀 타입 폭증을 Kit에 이식하지 않음.

# Patterns

- Template gallery ≈ Screen Recipes — **선택지 제한**이 JKO에 더 가깝다.
- Linked DB = 같은 Pattern의 다른 필터 인스턴스.

# Interaction

- Inline `/` 생성은 파워유저용; 운영 Admin의 기본 경로는 명시적 Button/Menu.
- Realtime multiplayer는 Figma 케이스와 유사 — JKO 필수 기능 아님.

# Accessibility

- 블록 단위 포커스·랜드마크가 흔들리기 쉬운 제품 — JKO는 고정 landmark(Search/Filter/Data)로 안정화 ([`09`](../../../docs/09_ACCESSIBILITY.md)).

# Best Practices

1. “유연하면 좋다”를 운영 Admin 기본값으로 쓰지 않는다.
2. 문서형 Portal(공지 상세)만 Comfortable 읽기 레이아웃을 허용한다.
3. 사용자 커스텀 컬럼/위젯 요구는 Pattern 확장 게이트로 처리한다.
4. Empty 템플릿 선택 UI가 필요하면 Recipe 목록으로 — 빈 캔버스 금지.

# Anti Patterns

- Notion 스타일 빈 페이지 + slash로 Admin 화면 생성 (AI Generate와 동일 위험).
- 매 고객사마다 다른 Table 스택 순서 (Search/Filter 위치 변경).
- Foundation 토큰을 페이지별 “테마 블록”으로 오버라이드.

# What JKO Can Learn

- **Contrast lesson**: 유연한 블록 ≠ 운영 Design System.
- **Template gallery**: 제한된 Recipe 선택이 Compose UX에 유용.
- **Readability** (Portal only): 긴 본문 타이포 리듬 — 단 token 범위 내.

# Summary

Notion은 **하지 말아야 할 유연함**을 보여주는 케이스 스터디다.  
JKO는 Pattern-locked · Foundation immutable로 운영 일관성을 지킨다. 템플릿 선택 UX만 선택적으로 참고한다.
