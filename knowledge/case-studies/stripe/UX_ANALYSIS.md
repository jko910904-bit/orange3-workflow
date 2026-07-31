# Overview

Stripe Dashboard는 **결제·계정 운영**에서 Form · Error · Dashboard 명확성으로 정평이 있다.  
Stripe 브랜드 일러스트·그라데이션을 복사하지 않고, **명확한 피드백·정보 구조**만 추출한다.

관련: [`docs/02_UX_PRINCIPLES.md`](../../../docs/02_UX_PRINCIPLES.md) · [`docs/05_PATTERN_LIBRARY.md`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/06_SCREEN_RECIPES.md`](../../../docs/06_SCREEN_RECIPES.md) · [`docs/JKO_AI_DEVELOPMENT_RULES.md`](../../../docs/JKO_AI_DEVELOPMENT_RULES.md)

# Design Philosophy

- **Clarity under risk** — 돈·권한이 걸린 작업일수록 라벨·에러·확인이 구체적이어야 한다.
- **Dashboard as status, not decoration** — KPI는 “지금 무엇을 해야 하는가”로 이어진다.
- Developer-friendly copy: 원인 → 조치 한 줄.

# UX Principles

| Stripe | JKO |
| --- | --- |
| Inline + summary errors | Form Pattern 필드 에러 + (선택) 상단 요약 |
| Destructive confirm | `delete-confirm` / 위험 작업 Confirm |
| Empty with next step | `empty-cta` |
| Clear primary in forms | `single-primary` |

# Information Architecture

- Overview → Object list → Object detail → Nested logs/events.
- “Settings”는 위험도별로 섹션 분리 (읽기 / 쓰기 / 불가역).
- JKO Screen Recipe도 엔티티 중심 IA를 유지 ([`06`](../../../docs/06_SCREEN_RECIPES.md)).

# Navigation

- 좌측: 제품 영역; 상단: 계정·검색.
- 상세에서 목록으로의 breadcrumb/back이 항상 있음 — Drawer/Page 모두 적용.

# Layout

- Dashboard: KPI 행 → 차트/표 → 활동. 한 섹션 한 질문.
- Form: 논리 그룹(카드가 필요하면 “제출 단위”로만).
- Admin Grid 규칙 준수 ([`08`](../../../docs/08_LAYOUT_RULES.md)).

# Components

- Banner/Alert: 페이지 수준 이슈; Toast: 단기 성공.
- Copyable ID · status badge — meta 정보 스캔용 (Foundation color semantic만).
- Table + side detail 패턴은 Drawer로 매핑.

# Patterns

- Onboarding checklist = Empty/First-run CTA의 확장.
- Dispute/Review queue = Admin List + Bulk/Row actions.
- API-ish 상세(이벤트 타임라인)는 progressive disclosure.

# Interaction

- 저장 실패 시 스크롤·포커스를 첫 에러 필드로.
- 불가역 작업: 타이핑 확인 또는 명확한 Confirm — Modal 중첩 금지.

# Accessibility

- Error는 `aria-describedby` / `aria-invalid`로 필드와 연결.
- 색만으로 decline/success 구분 금지.
- 키보드로 전 폼 제출·취소 가능.

# Best Practices

1. 에러 메시지에 **무엇·왜·다음 행동**을 넣는다.
2. KPI 클릭 시 필터된 리스트로 연결 (장식 KPI 금지).
3. 위험 설정은 Primary를 초록 “저장”만 두지 말고 위험도는 라벨로 드러낸다.
4. Loading은 Skeleton; 제출 중 버튼 disabled + 상태 텍스트.

# Anti Patterns

- Stripe 마케팅 랜딩 레이아웃을 Admin에 이식.
- “Something went wrong” 한 줄로 끝.
- 차트만 있고 Drill-down Task가 없는 Dashboard.

# What JKO Can Learn

- **Form/Error clarity**: 운영 사고 예방 = 구체적 피드백.
- **Dashboard purpose**: 숫자 → Task(리스트/드로어) 연결.
- **Risk-aware confirm**: Confirm Delete 정신을 설정·결제성 작업으로 확장.

# Summary

Stripe에서 배울 것은 그라데이션이 아니라 **명확한 상태·에러·대시보드→작업 연결**.  
JKO Pattern(Form · Dashboard · CRUD)에 그대로 녹인다.
