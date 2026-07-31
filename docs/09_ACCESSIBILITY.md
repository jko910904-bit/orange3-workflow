# 09 — Accessibility

## Purpose

JKO는 **Accessibility First**입니다.  
예쁜 UI보다 **키보드 · 대비 · 레이블 · 상태 · 회복 경로**가 우선입니다.  
Material 등의 **상태 모델**에서 영감을 받되 API·카피를 베끼지 않습니다.

---

## Principles

| Principle | JKO practice |
| --- | --- |
| Perceivable | 대비는 **Foundation 토큰**으로 — 임의 hex로 대비 깨지 않음 |
| Operable | 모든 핵심 액션 **키보드** 도달 · Focus 가시 |
| Understandable | 레이블 · 에러 연결 · Empty/Error 문구 + CTA |
| Robust | 시맨틱 랜드마크 · 테이블 scope · Dialog focus trap |

---

## Focus

| Rule | Detail |
| --- | --- |
| Visible focus | Kit focus ring만 — outline 제거 금지 |
| Trap | Modal / Overlay Drawer: focus trap + Escape 닫기 |
| Restore | 닫힌 뒤 트리거로 포커스 복귀 |
| Sticky Footer | 저장 버튼이 Tab 순서로 도달 가능 |
| Danger dialog | 초기 포커스는 **안전 액션**(취소) 우선 |

---

## Labels & semantics

| Control | Requirement |
| --- | --- |
| Input | `<label>` 또는 aria-label · 에러는 `aria-describedby` |
| Icon-only button | 접근 가능한 이름 필수 |
| Table | th scope · sort = `aria-sort` |
| Nav | `nav` · 활성 = `aria-current` |
| Live regions | 알림·벌크 선택 변경은 과도하지 않게 aria-live |
| Decorative | 장식 이미지 `aria-hidden` |

---

## Contrast via tokens

- Text / border / interactive 색은 **semantic tokens**만
- Disabled는 “안 보이는 회색”이 아니라 Kit disabled 토큰
- Chart는 **색만으로 의미 전달 금지** — 텍스트 요약·패턴 병행

---

## Keyboard

| Surface | Keys |
| --- | --- |
| Search | Enter = 조회 |
| Menu / Listbox | Arrow · Escape |
| Dialog | Escape · Tab cycle |
| Table | 논리 Tab · 행 액션 이름 명확 |
| Tabs (Detail) | Arrow로 탭 전환 |

마우스-only 제스처(드래그만)에는 **키보드 대안**을 둡니다.

---

## States (Material-inspired, JKO-owned)

모든 인터랙티브 / Pattern에 아래를 설계합니다 (복사 아님 — Kit 토큰으로 구현).

| State | Expectation |
| --- | --- |
| Default | 기본 |
| Hover | 포인터 환경 |
| Focus | 키보드 가시 |
| Active / Pressed | 눌림 |
| Disabled | 비활성 + 이유 가능하면 툴팁/헬프 |
| Empty | 설명 + **CTA** (Rule #7) |
| Loading | Skeleton + `aria-busy` |
| Error | 필드 연결 · `role=alert` when blocking · Retry |
| Responsive | 터치 타깃 · 좁은 폭에서 포커스 유실 없음 |

---

## Empty · Loading · Error (a11y)

| Pattern | A11y note |
| --- | --- |
| Empty | 제목+설명 낭독 가능 · CTA는 실제 Button |
| Loading | Skeleton이 layout shift 방지 · `aria-busy` |
| Error | 포커스를 제목 또는 Retry로 · 기술 코드는 보조 텍스트 |

---

## Examples

**맞음** — Confirm Delete: 포커스 트랩 · 기본 포커스=취소 · Danger에 이름 “회원 삭제”  
**틀림** — `outline: none` · 아이콘만 있는 삭제 · Empty에 `<div>없음</div>`만

---

## Related docs

- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md) — Empty CTA · Skeleton · Confirm
- [03_FOUNDATION_RULES](./03_FOUNDATION_RULES.md) — tokens / contrast
- [04_COMPONENT_RULES](./04_COMPONENT_RULES.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md) — required states
- [10_BEST_PRACTICES](./10_BEST_PRACTICES.md)
- [12_REFERENCES](./12_REFERENCES.md)
