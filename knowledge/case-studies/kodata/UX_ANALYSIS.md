# Overview

**KOdata / 공공·오픈데이터·API 포털**형 제품(KOapinet-style admin–portal) UX를 사례로 분석한다.  
데이터 상품 카탈로그 · 개발가이드 · 공지/FAQ · 마이페이지 · 운영 Admin이 한 제품군에 공존할 때의 의사결정에 초점. 특정 기관 브랜드 UI는 복사하지 않는다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/05_PATTERN_LIBRARY.md`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/06_SCREEN_RECIPES.md`](../../../docs/06_SCREEN_RECIPES.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md)

# Design Philosophy

- **Two surfaces, one kit** — 이용자 Portal(Comfortable)과 운영 Admin(Dense)이 토큰·컴포넌트를 공유하되 레이아웃 Pattern은 분리.
- **Catalog is the product** — API/데이터 상품 목록이 핵심 Task(조회·신청·키 발급).
- **Trust via clarity** — 이용약관·권한·에러·한도 메시지를 숨기지 않음 (Stripe 교차).

# UX Principles

| KOdata-style | JKO |
| --- | --- |
| Portal top nav: 상품 · 가이드 · 이용안내 · 소개 | Portal shell IA 고정 ([Portal patterns](../../../src/design-system/patterns/portal/)) |
| Admin: 회원/상품/공지 CRUD | Admin Stack · Screen Recipes |
| Notice list → detail | List/Detail · Drawer or Page by Decision Tree |
| MyPage empty/filled | `empty-cta` · profile Pattern |

# Information Architecture

- Portal: 정보성(가이드/소개) vs 거래성(상품/신청/키) 구역을 내비에서 구분.
- Admin: 엔티티별 메뉴 (회원 · 상품 · 게시 · 문의) — 깊이 2단 권장.
- FAQ / 공지는 콘텐츠 Pattern으로 재사용, 상품 Table과 IA를 섞지 않음.

# Navigation

- Portal: 수평 글로벌 nav + breadcrumb + (선택) 문의 바로가기.
- Admin: sidebar + Admin Stack 본문.
- 로그인/마이페이지는 계정 클러스터로 묶어 상품 브라우징과 분리.

# Layout

- Portal wide content vs login centered ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- 상품 목록: 검색·필터 후 카드 또는 테이블 — DATA_DENSITY 규칙 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).
- Admin 회원/키 발급: Table + Drawer 수정.

# Components

- Search · Badge(상태) · Table · Form · Pagination — Kit만.
- API 키 표시: copyable + mask — 보안 카피 명확히.
- 문의 바/푸터는 shell 슬롯이지 매 페이지 새 발명 아님.

# Patterns

- Notice list/detail · FAQ · Login · MyPage = Portal pattern set.
- Product/API catalog = Search + Filter + Data (+ 신청 CRUD).
- Dashboard(운영): 신청 대기 · 장애 · 사용량 KPI → drill-down (Stripe dashboard 교훈).

# Interaction

- 신청/승인/반려: 상태머신 + Confirm for reject/delete.
- 키 재발급 등 위험 작업은 Modal Confirm — Modal in Modal 금지.
- 가이드는 읽기 전용; 샘플은 복사 CTA 하나.

# Accessibility

- 공공 서비스 기대치: 키보드 · 대비 · 폼 라벨 · 에러 연결 ([`09`](../../../docs/09_ACCESSIBILITY.md)).
- 표가 많은 Admin일수록 th/scope · skip to data.

# Best Practices

1. Portal과 Admin의 Search 위치를 각 surface 규칙에 맞게 일관화.
2. 공지 Empty = “등록 CTA”(Admin) / “알림 없음 + 가이드 링크”(Portal)로 CTA 목적 분리.
3. 상품 상세에서 신청 Primary 하나; 문서 링크는 secondary.
4. 필터(기관·카테고리·상태)는 Search 아래 한 줄 + 접기.

# Anti Patterns

- 기관 로고·특정 포털 테마색을 Foundation에 고정.
- Portal 마케팅 히어로를 Admin 대시보드에 복제.
- 이용안내·FAQ·상품 검색을 한 페이지에 삼중 Search.

# What JKO Can Learn

- **Admin↔Portal split** with shared Kit — 이 레포 Portal patterns의 존재 이유.
- **Catalog + ops CRUD**: 조회 Pattern과 승인 워크플로 분리.
- **Trust copy**: 키·권한·에러 문구의 운영 품질.

# Summary

KOdata형 제품은 JKO가 겨냥하는 **운영 Admin + 이용자 Portal** 이중 표면의 전형이다.  
브랜드가 아니라 surface 분리 · 카탈로그 조회 · 공지/FAQ/마이페이지 Pattern 재사용을 학습한다.
