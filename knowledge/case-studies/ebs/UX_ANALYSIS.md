# Overview

**EBS AI 실습도구**형 교육 플랫폼 UX를 사례로 분석한다.  
학습자·교사가 위젯/실습 플로우를 따라가는 **가이드형 Portal** 의사결정에 초점을 둔다. EBS 브랜드·캐릭터·로고 UI는 복사하지 않는다.

관련: [`docs/01_PRODUCT_PHILOSOPHY.md`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/06_SCREEN_RECIPES.md`](../../../docs/06_SCREEN_RECIPES.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md)

# Design Philosophy

- **Learning path over free canvas** — 실습은 단계·카테고리·위젯 레시피로 유도 (Notion식 자유 ≠ 교육 운영).
- **Comfortable first for learners** — 읽기·온보딩·가이드는 Portal density.
- **Ops still Pattern-locked** — 콘텐츠/계정 관리 Admin은 Dense Admin Stack.

# UX Principles

| EBS-style education UX | JKO |
| --- | --- |
| Onboarding character / guide | Empty·First-run CTA — 캐릭터 에셋 불이식 |
| Category → tool/widget pick | Pattern/Recipe 선택 ([`05`](../../../docs/05_PATTERN_LIBRARY.md), [`06`](../../../docs/06_SCREEN_RECIPES.md)) |
| Splash → main task | 한 화면 한 목표 · `single-primary` |
| Progress / done state | Skeleton · Success feedback · 다음 실습 CTA |

# Information Architecture

- 학습자: 홈/카테고리 → 실습 도구 → 결과/저장.
- 교사·운영: 콘텐츠·권한·공지는 **별도 Admin** — Portal IA와 섞지 않음.
- 위젯 라이브러리 ≈ Component/Recipe catalog 메타포 (Figma library와 동형, 시각 복제 금지).

# Navigation

- 상단: 학습 구역 소수 + 프로필/도움말.
- 실습 중에는 chrome을 줄여 **과제 면적**을 확보 (Deference).
- 관리 메뉴를 학습자 내비에 노출하지 않음.

# Layout

- Portal Comfortable: 카드형 도구 목록은 **선택이 상호작용**일 때만 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- Admin 콘텐츠 관리: Search → Filter → Table.
- 스플래시/히어로는 온보딩 한정 — CRUD 화면에 상시 히어로 금지.

# Components

- Tool tile · progress · simple form — Kit Button/Input/Card로 compose.
- 미디어·일러스트는 콘텐츠 슬롯; Foundation color/type 변경 근거 아님.

# Patterns

- Onboarding / empty guide = `empty-cta` + 짧은 Wizard(필요 시 Page).
- Notice/FAQ는 Portal content patterns 재사용.
- 실습 저장·불러오기 = CRUD의 축소판 (목록 유지 시 Drawer).

# Interaction

- 위젯 연결·실행은 명시적 Primary; 위험 초기화는 Confirm.
- 오류는 “무엇을 고치면 되는지” 학습자 언어로 (Stripe error clarity와 교차).

# Accessibility

- 교육 공공성: 대비·키보드·대체텍스트·자막 가능성 ([`09`](../../../docs/09_ACCESSIBILITY.md)).
- 장식 모션이 학습 과제를 가리지 않음 (Apple motion restraint).

# Best Practices

1. 학습자 surface와 운영 Admin shell을 분리한다.
2. 도구 선택은 Recipe/카탈로그로 제한해 Generate식 빈 캔버스를 막는다.
3. 첫 방문은 한 CTA(시작하기)만.
4. 실습 완료 후 다음 추천 하나만.

# Anti Patterns

- EBS/펭수 등 캐릭터·로고를 Design Kit 기본 자산으로 편입.
- 학습 Portal에 Admin Dense 테이블을 그대로 노출.
- 위젯마다 다른 버튼 위계·다른 검색 위치.

# What JKO Can Learn

- **Guided Portal**: Comfortable + 제한된 선택지(Recipe).
- **Surface split**: 교육 소비자 UX ≠ 운영 Admin UX.
- **Catalog-as-curriculum**: Pattern/Recipe가 학습 경로와 동형.

# Summary

EBS형 실습 도구는 **가이드된 Portal Compose**의 좋은 사례다.  
브랜드를 베끼지 말고, surface 분리·레시피 선택·단일 CTA를 JKO Portal/Admin 규칙에 연결한다.
