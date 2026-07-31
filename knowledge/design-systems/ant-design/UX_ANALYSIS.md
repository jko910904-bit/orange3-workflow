# Overview

Ant Design은 **엔터프라이즈 Admin** — 고밀도 Table · Form · Filter · Pagination — 에서 검증된 UX 의사결정을 제공한다.  
Ant 시각 테마·Less 토큰을 복사하지 않고, **밀도·표 운영·폼 배치**만 추출한다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/04_COMPONENT_RULES.md`](../../../docs/04_COMPONENT_RULES.md) · [`docs/05_PATTERN_LIBRARY.md`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/10` 예정 / `JKO_AI_DEVELOPMENT_RULES`](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)

# Design Philosophy

- **Enterprise density** — 한 화면에 많은 행·필드를 다루되, 구역(Search/Filter/Table)은 흔들리지 않음.
- **Convention over invention** — 관리자 화면은 “새로움”보다 “어제와 같은 위치”.
- JKO **Operation First** · **Admin Stack**과 가장 가까운 외부 레퍼런스.

# UX Principles

| Ant Design 관행 | JKO |
| --- | --- |
| Query form 상단 | Search First + Filter Below Search |
| Table + pagination + total | Admin Stack Data + Pagination |
| Row actions / batch actions | Bulk with Data; row는 secondary |
| Drawer for edit keeping list | `detail-drawer` |
| Popconfirm for delete | `delete-confirm` |

# Information Architecture

- 목록 화면 IA: 제목/툴바 → 조회조건 → 결과 → 페이지.
- 상세는 라우트 full page vs Drawer — Ant Pro도 둘 다 쓰지만, JKO는 Decision Tree로 **목록 유지 = Drawer** 우선 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).

# Navigation

- Side menu + 다단 메뉴: 깊이는 제한하고, 선택 경로를 강조.
- Tabs는 **같은 엔티티의 하위 뷰**에만 — 검색을 탭마다 복제하지 않음 (Search 아래 Search 금지).

# Layout

- **Dense**가 기본값인 이유: 운영자는 스크롤보다 비교·선택을 원함.
- Form: label 정렬(right/left)·col span 규칙을 Pattern에 고정 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- 카드로 Table을 감싸는 장식은 최소화 — 상호작용에 필요할 때만.

# Components

- Table: sort, filter, selection, fixed columns, empty text — Kit Table 책임 범위와 맞출 것.
- Form: `validateStatus` + help — 필드 단위 피드백.
- 신규 Ant 위젯을 Kit에 추가하지 말고, 기존 Component로 compose ([`04`](../../../docs/04_COMPONENT_RULES.md)).

# Patterns

- ProTable / QueryFilter ≈ JKO CRUD · Admin List Pattern ([`05`](../../../docs/05_PATTERN_LIBRARY.md), [`06`](../../../docs/06_SCREEN_RECIPES.md)).
- Descriptions(읽기 전용 상세) → Drawer 본문 섹션으로 재사용.

# Interaction

- Batch bar는 selection > 0일 때만 — 기본 Primary와 충돌 시 batch는 secondary/danger 역할 분리.
- 원격 검색·디바운스: Search First를 지키되 요청 폭주 방지.

# Accessibility

- 고밀도라도 focus order · th/scope · checkbox label 유지.
- 색(성공/경고)만으로 상태 표시 금지 — Badge/Text 병행.

# Best Practices

1. Filter 필드는 “자주 쓰는 것”만 노출, 나머지는 접기 (progressive disclosure — GitHub 교차).
2. 컬럼 기본 노출 수를 제한하고 나머지는 column setting.
3. Empty에 “조건 초기화 / 생성” CTA (`empty-cta`).
4. Form 안에 Table 넣지 않음 ([`11` / Never](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)).

# Anti Patterns

- Ant Design 색·shadow·border-radius를 Foundation에 덮어쓰기.
- 한 화면에 Primary `저장` + `검색` + `등록` 3개.
- Filter와 Table 사이 광고성 배너·불필요 Card 중첩.

# What JKO Can Learn

- **Table/Form density**: 운영 생산성 = 익숙한 Admin Stack.
- **Query + Result 분리**: 검색 UX를 Data와 시각적으로 구분.
- **Drawer/Popconfirm 관행**: JKO 8 Rules와 이미 합치 — 문서화·일관 적용이 핵심.

# Summary

Ant Design은 JKO Admin의 **가장 가까운 운영 UX 교과서**다.  
테마가 아니라 **밀도·표·폼·배치 규약**만 Pattern Library에 흡수한다.
