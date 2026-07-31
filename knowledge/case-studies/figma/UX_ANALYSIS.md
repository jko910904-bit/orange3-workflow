# Overview

Figma를 **디자인 협업 제품**으로 보고, multiplayer IA · Inspector · Component library UX를 분석한다.  
“Figma로 화면 그리는 법”이 아니라, **Kit·라이브러리·검수** 메타포가 JKO Compose와 어떻게 닮았는지를 추출한다.

관련: [`docs/01_PRODUCT_PHILOSOPHY.md`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/03_FOUNDATION_RULES.md`](../../../docs/03_FOUNDATION_RULES.md) · [`docs/04_COMPONENT_RULES.md`](../../../docs/04_COMPONENT_RULES.md) · [`docs/05_PATTERN_LIBRARY.md`](../../../docs/05_PATTERN_LIBRARY.md)

# Design Philosophy

- **Library over one-off** — 로컬에서 그린 일회성 프레임보다 published component가 진실.
- **Inspect = contract** — 속성 패널은 “구현 계약”을 보여 주는 UI.
- **Multiplayer presence** — 누가 어디를 보는지가 충돌을 줄인다 (운영 핸드오프와 유사).

# UX Principles

| Figma | JKO |
| --- | --- |
| Components / Variants | Design Kit Components ([`04`](../../../docs/04_COMPONENT_RULES.md)) |
| Styles / Variables | Foundation tokens — **불변** ([`03`](../../../docs/03_FOUNDATION_RULES.md)) |
| Patterns as frames of components | Pattern Library ([`05`](../../../docs/05_PATTERN_LIBRARY.md)) |
| Detach = tech debt | Generate/일회 UI = Anti Pattern |

# Information Architecture

- Pages / Sections = 제품 영역; Components 페이지 = Kit 카탈로그.
- Properties panel = 선택 객체의 진실 공급원 — JKO Playground registry와 같은 역할.
- 파일 권한이 팀 경계 — Admin 권한 IA와 비유 가능하나 UI 복제 금지.

# Navigation

- Left: layers/assets · Center: canvas · Right: inspect — **역할이 고정된 3단**.
- JKO Admin도 Search/Filter/Data처럼 **구역 역할 고정**이 학습 비용을 낮춘다.

# Layout

- Canvas는 자유, **제약(constraints)·auto layout**이 일관성을 만듦 → JKO는 Layout Rules로 동일 목표 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- 무한 캔버스를 Admin CRUD에 이식하지 말 것 — 운영은 Pattern-locked.

# Components

- Variant · property 노출 = API 설계 — Kit props도 최소·예측 가능해야 함.
- Instance swap ≈ Pattern 안에서 Component 교체 (같은 Task 유지).

# Patterns

- Design system library file ≈ JKO `src/design-system` + catalog.
- FigJam sticky = 브레인스토밍; **구현 화면은 Pattern recipe로만** ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

# Interaction

- Publish / review / accept — 변경 전파 의식 → Foundation 변경 게이트와 동형.
- Multi-cursor는 제품 기능; JKO에 커서 UI를 넣을 필요 없음.

# Accessibility

- 컴포넌트 description · 상태 프레임을 a11y 체크리스트와 함께 문서화.
- Contrast 플러그인 정신 → token 대비 검증 ([`09`](../../../docs/09_ACCESSIBILITY.md)).

# Best Practices

1. 새 화면 전: Kit/Pattern에 이미 있는지 Assets(카탈로그)부터 검색.
2. Detach(일회 수정) 대신 variant/token 요청 프로세스를 둔다.
3. Inspect 가능한 props만 제품에 노출한다.
4. “예쁜 프레임”이 아니라 **재사용 단위**로 리뷰한다.

# Anti Patterns

- Figma 파일 룩을 CSS로 픽셀 복제하며 Foundation 파괴.
- Detach된 프레임을 “새 Pattern”으로 승격.
- 라이브러리 없이 화면마다 로컬 컴포넌트 폭증.

# What JKO Can Learn

- **Component library metaphor**: Compose = instance of Kit, not redraw.
- **Inspector mindset**: props·states가 계약.
- **Publish discipline**: Foundation/Pattern 변경은 게이트 필요.

# Summary

Figma 제품 UX의 핵심 교훈은 **라이브러리·검수·재사용**.  
JKO는 이를 Foundation → Components → Patterns → Screens로 이미 구조화했다 — 분석은 그 규율을 강화하는 용도다.
