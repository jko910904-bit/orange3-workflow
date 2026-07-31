# Overview

Toss(토스) 계열 제품 UX에서 **정보 계층 · CTA 단일화 · 짧은 과금/가입/이체형 플로우** 의사결정을 분석한다.  
브랜드 일러스트·모션·색을 복사하지 않는다.

관련: [`docs/01_PRODUCT_PHILOSOPHY.md`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/07_UX_DECISION_TREE.md`](../../../docs/07_UX_DECISION_TREE.md)

# Design Philosophy

- **한 화면 한 질문** — 사용자가 “지금 무엇을 하면 되는지”가 즉시 보여야 한다.
- **신뢰 = 명확한 다음 행동** — 금융·민감 작업일수록 카피가 구체적이다 (Stripe와 교차).
- Consumer comfort가 기본이지만, JKO는 surface별로 Dense/Comfortable을 분리한다.

# UX Principles

| Toss | JKO |
| --- | --- |
| 강한 Primary 하나 | `single-primary` |
| 단계 축소 · 불필요 필드 제거 | Form Pattern minimal fields |
| Bottom sheet / full screen step | Sheet는 반응형 대안; Admin은 Drawer/Modal ([`07`](../../../docs/07_UX_DECISION_TREE.md)) |
| Empty → 유도 CTA | `empty-cta` |

# Information Architecture

- 홈 = 상태 요약 + 자주 쓰는 목적지(소수).
- 상세 설명은 progressive disclosure (접기/다음 화면).
- Portal 공지·FAQ·마이페이지도 “읽기 → 행동” 순서를 유지 ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

# Navigation

- 하단 탭은 핵심 3–5개만 — Admin side nav도 1차 목적지를 과다 노출하지 않음.
- 뒤로가기로 맥락 복귀; 중첩 모달로 스택을 쌓지 않음.

# Layout

- 큰 제목 + 짧은 본문 + CTA 블록이 첫 뷰포트 골격.
- Admin에 consumer 카드 콜라주·히어로를 이식하지 말 것 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- Portal Comfortable에서만 “숨 쉬는” 여백을 허용.

# Components

- List row = 제목 · 메타 · chevron — 스캔 친화.
- 금액/상태 강조는 semantic token만 (새 색 금지).
- Button 위계: Primary 1 · Secondary text/ghost.

# Patterns

- Onboarding / consent = Wizard(Page) 후보 — Drawer에 긴 약관 우겨넣기 금지.
- 이체 확인 ≈ Confirm Dialog 정신 확장 (`delete-confirm`와 같은 “되돌리기 어려운 작업”).
- FAQ 아코디언 = Portal FAQ Pattern 재사용.

# Interaction

- 탭/클릭 후 즉시 피드백 (disabled + loading text).
- 에러는 필드 옆 + 사람이 읽을 문장 (원인·다음 행동).

# Accessibility

- 큰 터치 영역 정신 → Portal; Admin은 키보드·포커스 우선 ([`09`](../../../docs/09_ACCESSIBILITY.md)).
- 색만으로 성공/실패 구분 금지.

# Best Practices

1. 첫 화면에 Secondary CTA를 경쟁시키지 않는다.
2. 긴 설명은 “자세히”로 미룬다.
3. 완료 화면에 다음 Task 하나만 제시한다.
4. 운영 Admin에서는 Toss식 풀스크린 스텝보다 Admin Stack을 지킨다.

# Anti Patterns

- Toss 블루·캐릭터·풀블리드 마케팅을 Kit에 추가.
- Portal 카피 톤을 Admin 테이블 헤더에 감정적으로 이식.
- Primary 버튼 여러 개로 “선택지 제공”이라고 포장.

# What JKO Can Learn

- **Info hierarchy**: 제목·본문·CTA 역할 고정.
- **CTA discipline**: Single Primary와 같은 문제 의식.
- **Simple flows**: 필드·단계 최소화 — Pattern recipe에 반영.

# Summary

Toss에서 가져올 것은 브랜드가 아니라 **짧고 읽히는 플로우와 CTA 절제**.  
JKO는 이를 Portal Comfortable과 8 Rules 안에 흡수하고, Admin Dense는 Ant/Linear 축을 유지한다.
