# Overview

**Search**는 Admin/Portal에서 **대상 엔티티에 최소 입력으로 도달**하는 Task 단위 Pattern이다.  
UI 장식이 아니라 Admin Stack의 **고정 입구**다. Rule `search-top`으로 위치·역할을 잠근다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/02`](../../../docs/02_UX_PRINCIPLES.md) · Live: [`/patterns/search`](/patterns/search)

# UX Goal

사용자가 **키워드·식별자만으로** 원하는 행·문서를 빠르게 찾는다.  
조회 Task의 첫 단계이며, Filter·Data보다 위에 있어야 한다.

# User Problems

- 목록이 길어서 스크롤만으로는 대상을 못 찾는다
- 전역 검색과 화면 검색이 섞여 결과가 어디인지 헷갈린다
- 검색 결과가 0건인데 다음 행동이 없다
- Search가 테이블 아래·모달 안·컬럼마다 중복되어 인지 부하가 커진다

# User Tasks

- 키워드 / ID / 제목 입력
- Enter 또는 조회 제출
- (선택) 최근 검색·자동완성 선택
- 결과 영역에서 스캔 → Detail / CRUD로 이어가기

# When to Use

- 목록·카탈로그·공지 등 **조회**가 주 Task인 화면
- Admin Stack의 최상단 블록이 필요할 때
- ≥20건 성격의 Data Table 앞단
- Portal 게시판에서 제목/본문 검색이 필요할 때

# When NOT to Use

- Dashboard **현황 확인** 화면의 KPI 구역을 Search로 대체할 때
- 이미 Filter만으로 충분하고 텍스트 축이 없을 때 (그래도 “검색 대체 Filter”를 위에 두지 말 것)
- Form 필드 안의 미니 검색을 화면 Search로 격상할 때
- 마케팅 히어로형 초대형 검색을 Admin에 이식할 때

# UX Flow

```
포커스 → 입력 → (Autocomplete/Recent) → 제출(Enter/조회)
→ Data Loading(Skeleton) → 결과 갱신
→ 0건이면 Empty(+CTA) / 있으면 Table·List 스캔
```

1. Search는 콘텐츠 컬럼 **최상단**
2. 제출 후 결과만 Skeleton — Search 자체는 유지
3. Primary는 화면당 하나: 목록면이면 **조회**, 등록 Primary와 동시 filled 금지

# Layout Structure

```
[ Page Header (optional) ]
[ Search  ← full width of content column ]
[ Filter ]
[ Data … ]
```

- Admin: 12-col fluid · canvas 1440 · sidebar 240 ([`08`](../../../docs/08_LAYOUT_RULES.md))
- 입력 좌 · 조회 버튼 우 (있으면)
- Dense에서도 한 줄 높이 유지

# Required Components

| Role | Kit |
| --- | --- |
| 입력 | Input (Search) |
| 제출 | Button (조회 — Primary **또는** 헤더 등록이 Primary면 Secondary) |
| 제안 | Autocomplete / Recent (Kit 범위) |
| 후속 | Data Table · List · Empty · Loading |

Foundation 토큰·신규 Color/Type/Radius 생성 금지.

# Responsive Rules

- 좁은 폭: Search full-bleed 한 줄; 조회 버튼은 아이콘+라벨 또는 Enter-only로 축약 가능
- 전역 App Bar 검색과 **같은 화면에서 이중 Search 금지**
- Tablet 이하에서도 Filter보다 위 순서 유지

# Accessibility

- `<label>` 또는 `aria-label` 필수
- Combobox면 listbox 패턴 · Escape로 닫기 ([`09`](../../../docs/09_ACCESSIBILITY.md))
- 결과 갱신 시 상태 안내(`aria-live` 권장)
- 포커스: 제출 후 결과 영역으로 이동 가능하면 운영 생산성 ↑

# Best Practices

1. Placeholder에 검색 축을 명시한다 (이름 / 회원ID / 제목)
2. 원격 검색은 debounce; 로딩은 **결과 Skeleton** (`skeleton-loading`)
3. 0건 → Empty CTA (조건 초기화 / 생성) — “0건”만 금지
4. 기본 포커스를 Search에 둘지는 제품별로 문서화
5. Material/Linear식 속도감은 **위치 규율**로 가져오고 비주얼은 복사하지 않는다

# Anti Patterns

- Search 아래 또 Search ([`11`](../../../docs/11_ANTI_PATTERNS.md))
- 테이블 컬럼 헤더마다 미니 검색 남발
- 조회·등록·내보내기 모두 Primary
- Empty에 CTA 없음
- Form 안·Modal 안에 화면급 Search를 중첩

# Examples

- Live Pattern: [`/patterns/search`](/patterns/search)
- Screen: [`/screens/member-management`](/screens/member-management) (조회 체인 입구)
- Screen: [`/screens/notice`](/screens/notice) · [`/screens/product-management`](/screens/product-management)
- Recipe: [`docs/06`](../../../docs/06_SCREEN_RECIPES.md) 회원관리 Step 2

# Related Patterns

- [Filter](../filter/PATTERN.md) — Search 바로 아래
- [Data Table](../data-table/PATTERN.md) — 조회 본문
- [Empty State](../empty-state/PATTERN.md) — 0건 CTA
- [Loading](../loading/PATTERN.md) — 결과 Skeleton
- [Detail Drawer](../detail-drawer/PATTERN.md) — 행 선택 후
- [CRUD Form](../crud-form/PATTERN.md) — Empty CTA → 생성
- [Dashboard](../dashboard/PATTERN.md) — 현황면; Search와 역할 분리
- [Notification](../notification/PATTERN.md) — 전역 알림과 혼동 금지
- Recipes: [admin-member-management](../recipes/admin-member-management.md) · [admin-notice-board](../recipes/admin-notice-board.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
