# Overview

Apple 제품 UX(특히 Human Interface Guidelines의 정보 계층·타이포·여백·모션)를 **의사결정 관점**으로만 분석한다.  
시각 스타일·브랜드 에셋을 JKO에 이식하지 않는다.

관련 JKO 문서: [`docs/01_PRODUCT_PHILOSOPHY.md`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/03_FOUNDATION_RULES.md`](../../../docs/03_FOUNDATION_RULES.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md)

# Design Philosophy

- **Clarity first** — 한 화면에 한 주요 메시지. 장식보다 읽히는 구조.
- **Deference** — UI chrome이 content를 이기지 않음. Admin에서는 Data(Table)가 hero.
- **Depth as meaning** — 레이어(Modal/Drawer)는 “중요도·맥락 유지”를 위해 쓰고, 장식용 그림자가 아님.
- Consistency Over Creativity와 맞닿음: 같은 Task면 같은 계층 규칙을 반복.

# UX Principles

| Apple 측 원칙 | JKO 대응 |
| --- | --- |
| Visual hierarchy | Typography scale은 Foundation만 ([`03`](../../../docs/03_FOUNDATION_RULES.md)) |
| Generous but intentional space | Spacing token; Admin은 Dense, Portal은 Comfortable |
| Restraint in motion | Transition은 상태 전환 신호만 — 장식 애니 금지에 가깝게 |
| Single focus CTA | [`single-primary`](../../../docs/02_UX_PRINCIPLES.md) |

# Information Architecture

- Primary / Secondary / Tertiary 텍스트 역할이 고정되면 스캔 비용이 떨어진다.
- JKO Screen Recipe는 “페이지마다 새 계층”이 아니라 Pattern 조합으로 IA를 재사용한다 ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

# Navigation

- Apple식 global nav는 Consumer 앱 중심 — JKO Admin은 **사이드 + Admin Stack**이 기본 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- 배울 점: nav 항목 수를 줄이고, 현재 위치를 항상 드러낸다 (breadcrumb / selected state).

# Layout

- **여백 = 계층**. 같은 밀도면 그룹 간 간격 > 그룹 내 간격.
- Admin Dense에서도 “숨 쉴 여백”은 Filter와 Data 사이 등 **구역 경계**에만 집중.
- Full-bleed marketing hero는 Portal 랜딩에만 해당 — 운영 Admin에 이식하지 않음.

# Components

- 버튼·입력의 **명확한  affording**(눌림·비활성·포커스)만 참고.
- 새 컴포넌트·새 radius를 만들지 않음 ([`04`](../../../docs/04_COMPONENT_RULES.md)).

# Patterns

- Onboarding / empty의 “한 문장 + 한 CTA”는 [`empty-cta`](../../../docs/02_UX_PRINCIPLES.md)와 정렬.
- Wizard는 단계가 명확할 때만; 일상 CRUD는 Drawer/Page Decision Tree ([`07`](../../../docs/07_UX_DECISION_TREE.md)).

# Interaction

- Motion: duration 짧게, easing 일관, **의미 있는 상태 변화**에만.
- 제스처·hover 의존 UI는 키보드·터치 Admin 환경에서 보조로만.

# Accessibility

- Dynamic Type 정신 → JKO는 token type scale + 충분한 touch/click target.
- Contrast·Focus ring은 Foundation/A11y 규칙 준수 (KB 09가 있으면 우선; 없으면 [`JKO_AI_DEVELOPMENT_RULES.md`](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)).

# Best Practices

1. 제목 1 · 본문 1 · Primary 1로 첫 스크롤을 정리한다.
2. Secondary action은 text/ghost로 강도를 낮춘다.
3. Drawer/Modal 안에서도 동일한 type hierarchy를 유지한다.
4. Skeleton으로 레이아웃 점프를 막는다 (`skeleton-loading`).

# Anti Patterns

- SF Pro / Apple 색 / glass·blur를 Kit에 추가.
- Marketing 카피 톤으로 운영 에러 메시지를 작성.
- 모션으로 “고급스러움”을 증명하려다 작업 속도를 깎음.

# What JKO Can Learn

- **Hierarchy**: Data 구역이 시각적 무게 중심이어야 한다.
- **Typography & space**: 새 타입이 아니라 **역할 배정**(title/body/meta)과 spacing 리듬.
- **Motion restraint**: 상태 피드백만 — Compose 생산성을 해치지 않는 선.

# Summary

Apple에서 가져올 것은 룩이 아니라 **절제된 계층과 여백 의사결정**.  
JKO는 Foundation 불변 + Pattern-first로 그 결정을 운영 Admin에 고정한다.
