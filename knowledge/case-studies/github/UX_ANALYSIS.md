# Overview

GitHub는 **고밀도 데이터 + 다층 내비게이션 + progressive disclosure**의 대표 제품 UX다.  
Octocat·다크 테마를 복사하지 않고, 코드/이슈/PR을 매일 다루는 운영자형 IA만 추출한다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/07_UX_DECISION_TREE.md`](../../../docs/07_UX_DECISION_TREE.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md)

# Design Philosophy

- **Everything is a list until you open it** — 기본은 스캔 가능한 행; 상세는 다음 깊이.
- **Context never fully disappears** — repo header · tab · path가 위치를 고정.
- Power-user density without losing wayfinding.

# UX Principles

| GitHub | JKO |
| --- | --- |
| Repo tabs (Code/Issues/PR) | 엔티티 하위 뷰 — Search를 탭마다 복제하지 않음 |
| Filters + search on lists | `search-top` + `filter-below-search` |
| Conversation + metadata column | Detail Drawer / 2-pane ([`07`](../../../docs/07_UX_DECISION_TREE.md)) |
| Flash / banner for global state | Alert + Empty/Error patterns |

# Information Architecture

- Org → Repo → Object(type) → Thread — 깊이 제한과 breadcrumb.
- Label · milestone · assignee는 **필터 축**이지 새 IA 트리 전체가 아님.
- JKO Screen Recipe도 엔티티 중심 유지 ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

# Navigation

- Global: search · create · profile.
- Local: sticky repo nav — 스크롤해도 맥락 유지.
- “Code search”와 “이슈 리스트 검색”을 한 필드에 섞지 않는 분리 의식 → Admin에서 Search 아래 Search 금지와 맞닿음.

# Layout

- Dense table/list + optional right meta rail.
- Diff/PR은 특수 도메인 — 일반 CRUD에 diff UI를 억지 이식하지 말 것.
- Admin Dense 정당화 레퍼런스 ([`08`](../../../docs/08_LAYOUT_RULES.md)).

# Components

- Label chips · status icons · counter badges — semantic만.
- Pagination / “Load more” — 데이터셋 크기에 맞게 Pattern 선택.
- File tree progressive disclosure ≈ Filter advanced 접기.

# Patterns

- Issues list = Data Table / List Pattern.
- PR review ≈ 상세+액션; 병합은 Confirm 성격.
- Projects board = 칸반은 별도 Pattern — 기본 Admin Stack을 대체하지 않음.

# Interaction

- Keyboard shortcuts for triage (Linear와 교차) — 마우스 경로 병행.
- Inline comment = 맥락 유지 편집; 전체 페이지 이탈 최소화 → Drawer First.

# Accessibility

- 밀도↑여도 focus order · skip link · table headers 유지 ([`09`](../../../docs/09_ACCESSIBILITY.md)).
- 색맹 대비: status는 텍스트/아이콘 병행.

# Best Practices

1. 리스트 기본 컬럼을 최소화하고 나머지는 설정/펼침.
2. 필터 상태는 URL/쿼리로 공유 가능하게.
3. 상세에서 목록 스크롤 위치를 잃지 않게 (Drawer).
4. 위험 액션(force, delete)은 Confirm.

# Anti Patterns

- GitHub 다크 크로마·마크다운 렌더 미학을 Portal에 복제.
- 한 화면에 Code nav + 전역 검색 + 리스트 검색 삼중 검색.
- Discussions/Wiki/Actions를 모두 넣은 “만능 Admin” IA.

# What JKO Can Learn

- **Dense data + navigation**: 위치 고정 헤더 + 리스트 중심.
- **Progressive disclosure**: advanced filter · secondary columns.
- **Triage speed**: 목록 유지한 채 처리 (Drawer).

# Summary

GitHub에서 배울 것은 테마가 아니라 **밀도 있는 목록 운영과 드러내기/숨기기 규율**.  
JKO Admin Stack · Detail Drawer · Filter 접기와 직접 연결된다.
