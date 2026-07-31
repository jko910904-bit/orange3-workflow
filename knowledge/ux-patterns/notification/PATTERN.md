# Overview

**Notification**(Snackbar/Toast)은 **비차단**으로 성공·실패·되돌리기(Undo)를 알리는 Feedback Pattern이다.  
Confirm(차단 결정)과 역할을 분리한다. Live catalog: [`/patterns/snackbar`](/patterns/snackbar) · [`/patterns/notification`](/patterns/notification)

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md)

# UX Goal

사용자가 현재 작업을 유지한 채 **방금 일어난 결과**를 인지하고, 필요 시 Undo·상세로 이동한다.

# User Problems

- 성공마다 Modal이 떠 흐름이 끊긴다
- 토스트가 너무 많아 무시된다
- 오류를 토스트만으로 처리해 Retry가 없다
- 전역 알림 센터와 페이지 토스트가 혼선

# User Tasks

- 결과 인지 (성공/실패)
- Undo (가능 시)
- 알림 목록에서 읽음 처리 / 이동

# When to Use

- CRUD 저장·삭제 성공
- Export 완료
- 복사·짧은 액션 피드백
- 백그라운드 작업 완료

# When NOT to Use

- 삭제 **확인** → Confirm Dialog
- 페이지 로드 실패 전체를 토스트만으로 (섹션 Error+Retry 병행)
- 법적 동의·권한 부여 등 차단 필요 결정

# UX Flow

```
액션 완료
→ Toast/Snackbar (자동 dismiss 또는 Undo 윈도우)
→ (센터형) Notification list에 적재
→ Undo 시 역액션 · 만료 후 확정
```

# Layout Structure

- **Snackbar**: 화면 하단/상단 코너 — content 위, Modal보다 z 낮거나 정책 문서화
- **Notification center**: App Bar 벨 → Drawer/Popover 리스트
- Admin 12 grid를 깨지 않음; overlay만

# Required Components

Snackbar/Toast · Button(Undo/닫기) · Badge · List(센터) · Link

# Responsive Rules

- 좁은 폭: full-width bottom snackbar
- 스택 최대 개수 제한 (예: 1–3)

# Accessibility

- `aria-live="polite"` (오류는 assertive 검토)
- Undo 버튼 키보드 접근
- 자동 dismiss 시간  sufficiency · 모션 축소

# Best Practices

1. 성공 = Snackbar · 삭제 확인 = Confirm
2. Undo가 있으면 카피에 명시
3. 동일 메시지 스팸 방지 (디듀프)
4. 센터형과 토스트 IA 분리 (GitHub/Linear 재해석)
5. Single Primary 화면 규칙과 충돌하지 않게 Toast 버튼은 Tertiary/Undo

# Anti Patterns

- 성공 Confirm Modal 남발
- Modal 안 Modal + Toast 혼능
- 에러를 카피 없이 빨간 점만
- 새 알림 컬러 토큰 창작

# Examples

- Live: [`/patterns/snackbar`](/patterns/snackbar) · [`/patterns/notification`](/patterns/notification)
- CRUD 성공 연계: [`/patterns/crud`](/patterns/crud)

# Related Patterns

- [Confirm Dialog](../confirm-dialog/PATTERN.md)
- [Error](../error/PATTERN.md) · [Loading](../loading/PATTERN.md)
- [CRUD Form](../crud-form/PATTERN.md) · [Data Table](../data-table/PATTERN.md)
- [File Upload](../file-upload/PATTERN.md)
- [Dashboard](../dashboard/PATTERN.md) — 이상 알림 진입
- [AI Chat](../ai-chat/PATTERN.md) — Apply 결과 토스트
