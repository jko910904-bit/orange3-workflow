# Overview

**Error**는 실패·장애·거부 상태를 **원인 + 회복 행동**으로 전달하는 Feedback Pattern이다.  
로딩 실패 · 제출 실패 · 권한 거부 · 네트워크 오류를 Empty/Loading과 혼동하지 않는다.

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · [`docs/09`](../../../docs/09_ACCESSIBILITY.md) · Live: [`/patterns/error`](/patterns/error)

# UX Goal

사용자가 “무엇이 실패했는지”를 알고 **Retry · 도움 · 우회 Task**로 복구한다.

# User Problems

- 빨간 배너만 있고 Retry가 없다
- 필드 오류와 페이지 오류가 뒤섞인다
- 권한 없음을 Empty로 보여 혼란
- 기술 스택 트레이스를 그대로 노출

# User Tasks

- 오류 메시지 이해
- Retry
- Help / 문의 링크
- (폼) 필드 수정 후 재제출

# When to Use

- 목록/대시보드 로드 실패
- CRUD Submit 실패 (필드+요약)
- 파일 업로드 실패
- 403/권한 · 5xx · 타임아웃

# When NOT to Use

- 정상 0건 → Empty
- 대기 중 → Loading
- 삭제 확인 → Confirm (에러 아님)
- 성공 피드백 → Notification

# UX Flow

```
실패 감지
→ 범위 결정 (페이지 / 섹션 / 필드 / 토스트)
→ 메시지 + Retry/Help
→ 성공 시 해당 Pattern 정상 상태 복귀
```

# Layout Structure

| Scope | Placement |
| --- | --- |
| 페이지 | Content 중앙 Error panel |
| 섹션 | 위젯/Table 슬롯 치환 |
| 필드 | 인라인 validation |
| 전역 | Notification/Snackbar |

Admin chrome(Search 등)은 유지하고 Data 슬롯만 Error로 치환하는 편이 운영에 유리하다.

# Required Components

Alert/Message · Button(Retry) · Link(Help) · (폼) field error · Notification

# Responsive Rules

- Retry CTA 접근성 유지 (하단 고정 가능)
- 긴 기술 메시지 truncate + “자세히”

# Accessibility

- `role="alert"` 또는 live assertive (치명적일 때)
- 색만으로 오류 표시 금지
- 포커스를 오류 요약/첫 필드로 이동

# Best Practices

1. Stripe식 **명확·행동 가능** 카피 재해석
2. Retry · Help Link 기본 ([`05`](../../../docs/05_PATTERN_LIBRARY.md) catalog)
3. 필드 오류는 제출 요약과 연결
4. 권한은 [Permission](../permission/PATTERN.md)과 메시지 공유
5. 사용자용 메시지 ≠ raw exception

# Anti Patterns

- Retry 없는 블로킹 오류
- Modal 안 Modal로 오류 중첩
- Empty로 오류 위장
- Primary 3개 (재시도·문의·홈 모두 filled)

# Examples

- Live: [`/patterns/error`](/patterns/error)
- Form 연계: [`/patterns/crud`](/patterns/crud)
- A11y: [`docs/09`](../../../docs/09_ACCESSIBILITY.md)

# Related Patterns

- [Loading](../loading/PATTERN.md) · [Empty State](../empty-state/PATTERN.md)
- [Notification](../notification/PATTERN.md)
- [CRUD Form](../crud-form/PATTERN.md) · [File Upload](../file-upload/PATTERN.md)
- [Permission](../permission/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) — 확인 ≠ 에러
