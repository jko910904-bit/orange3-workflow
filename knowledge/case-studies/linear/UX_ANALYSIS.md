# Overview

Linear는 **속도 · 고밀도 레이아웃 · 키보드 중심** 이슈 트래킹 UX로 유명하다.  
다크 UI·브랜드 모션을 복사하지 않고, “운영자가 손을 키보드에서 안 떼고 일하는” 의사결정만 본다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/08_LAYOUT_RULES.md`](../../../docs/08_LAYOUT_RULES.md) · [`docs/JKO_AI_DEVELOPMENT_RULES.md`](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)

# Design Philosophy

- **Speed as a feature** — 로딩·클릭 깊이·모달 중첩이 적을수록 좋다.
- **Keyboard-first power users** — 단축키는 파워유저용이지, 마우스를 대체하는 유일한 경로가 되면 안 됨(a11y 병행).
- Dense list + peek detail — JKO Drawer First와 유사한 “목록 유지”.

# UX Principles

| Linear | JKO |
| --- | --- |
| Command menu로 전역 이동/생성 | 전역 검색은 제품 범위에 따라; 화면 Search First와 혼동 금지 |
| List + side peek | `detail-drawer` |
| Minimal chrome | Deference — Data 중심 |
| Optimistic UI | Skeleton/완료 피드백과 균형 ([`skeleton-loading`](../../../docs/02_UX_PRINCIPLES.md)) |

# Information Architecture

- Issue = 행; 속성은 인라인 칩/필드로 **점진 공개**.
- 필터는 리스트 상단 한 줄 — Filter Below Search 정신.
- 뷰(커스텀 필터 저장)는 “같은 Pattern의 파라미터”이지 새 화면 타입이 아님.

# Navigation

- 빠른 팀/프로젝트 전환: 맥락 스위처는 shell에, Task UI는 본문에.
- URL이 상태를 반영하면 공유·복귀 비용↓ — Screen Recipe에도 유리.

# Layout

- **Dense rows**, 좁은 gutter, 고정 헤더.
- Comfortable Portal과 혼용하지 말 것 — density는 surface 역할에 묶는다 ([`08`](../../../docs/08_LAYOUT_RULES.md)).
- Peek 패널 폭은 콘텐츠 최소치를 보장.

# Components

- Inline edit · select · status — Kit 범위 내에서만; 새 “Linear-like” 위젯 남발 금지.
- Toast는 비차단; 파괴적 액션은 Confirm.

# Patterns

- Triage / inbox = 우선순위 큐 — Dashboard Pattern의 “처리 대기” KPI와 연결 가능 ([`05`](../../../docs/05_PATTERN_LIBRARY.md)).
- Create issue modal = 빠른 생성 → JKO Modal = 빠른 작업 ([`07`](../../../docs/07_UX_DECISION_TREE.md)).

# Interaction

- `⌘K` 류: 문서화된 단축키 표 + 포커스 트랩 준수.
- 연속 작업(다음 이슈): Drawer 유지 + 데이터만 교체하면 왕복 클릭 감소.

# Accessibility

- 단축키 ≠ 접근성 완료. Tab 순서·aria-keyshortcuts·스크린리더 이름 병행.
- 고대비·포커스 링을 다크 테마 핑에 종속시키지 말 것 (Foundation 불변).

# Best Practices

1. 목록에서 상세까지 클릭 1–2회.
2. 생성은 Modal, 수정+목록 유지는 Drawer.
3. 키보드로 Search 포커스 가능한지 확인.
4. 네트워크 지연 시 Skeleton으로 레이아웃 고정.

# Anti Patterns

- Linear 다크 팔레트·보라 액센트를 Kit에 추가.
- 단축키만 있고 버튼 경로가 없는 핵심 작업.
- Command palette에 비즈니스 CRUD 전체를 숨겨 Admin Stack을 붕괴.

# What JKO Can Learn

- **Speed**: 깊이·중첩·대기 시간을 줄이는 것이 UX 품질.
- **Dense layout**: Admin Dense의 정당성.
- **Keyboard**: 파워 운영자 생산성 — 다만 Kit·a11y와 함께.

# Summary

Linear는 “빨리 처리하는 운영자” UX의 레퍼런스다.  
JKO는 속도·밀도·키보드를 **Pattern과 Decision Tree 안에** 넣고, 브랜드 비주얼은 버린다.
