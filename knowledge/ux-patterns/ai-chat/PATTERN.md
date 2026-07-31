# Overview

**AI Chat**은 JKO 전용 **Compose 보조** Pattern이다.  
대화로 Screen/Pattern **조합안을 검토·Apply·Rollback**한다. **Generate로 토큰·컴포넌트를 발명하지 않는다.**

```
Compose ≠ Generate
```

Canonical: [`docs/01`](../../../docs/01_PRODUCT_PHILOSOPHY.md) · [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · Live: [`/patterns/ai`](/patterns/ai)

# UX Goal

사용자가 자연어로 **의도를 주고**, 시스템이 **기존 Design Kit + Pattern**으로 조립한 결과를 보여 주며, 적용·되돌리기를 통제한다.

# User Problems

- AI가 예쁜 새 UI·새 컬러를 만들어 Kit가 분기된다
- Apply가 확인 없이 운영 화면에 덮어쓴다
- 채팅이 Admin Stack(Search/Table)을 대체하려 한다
- 실패가 Empty/성공 토스트로 모호하다

# User Tasks

- 의도 입력 (조회 화면 · 대시보드 등)
- 제안 Pattern/Component 검토
- Apply · Rollback
- (선택) 관련 Knowledge/문서 링크 열기

# When to Use

- Playground / 내부 Compose 보조
- Screen Recipe 선택·변형 제안
- Pattern 매핑 설명 (“이 Task면 Data Table”)

# When NOT to Use

- 생산 Admin의 일상 조회를 채팅으로 대체
- Foundation(Color/Type/Radius) 생성 요청 수락
- orange3-workflow 등 명시 범위 밖 시스템 변경
- 고객 대면 Portal의 핵심 IA를 AI Chat으로 치환

# UX Flow

```
Prompt
→ 의도 분류 (Task → Pattern 후보)  [Decision Tree 정합]
→ Compose preview (Kit only)
→ 사용자 검토
→ Apply (확인) / Discard
→ Notification · Rollback 가능 윈도우
→ 거부(토큰 발명 요청) 시 Error/설명 + Knowledge 링크
```

# Layout Structure

```
[ Chat thread ] [ Preview canvas ]
  prompts         Pattern compose
  citations       Apply / Rollback bar
```

Admin/Playground frame. Preview는 `/patterns/*` · `/screens/*`와 동일 Kit.

# Required Components

Input · Button · List(messages) · Preview surface · Banner/Alert · Notification · Confirm(Apply 덮어쓰기 시)

# Responsive Rules

- 좁은 폭: Chat/Preview 탭 전환
- Apply bar sticky

# Accessibility

- 메시지 리스트 live region (polite)
- Preview 키보드 포커스
- Apply Confirm 명시

# Best Practices

1. **Knowledge > Features** — 답변 전 Pattern 고르기
2. 출력은 Output Rules 섹션 골격 권장 (Goal→…→UI)
3. 거절: 새 Color/Radius/Typography · Modal in Modal 제안
4. Apply 전 diff/요약
5. Notion식 free-form 블록 생성과 **대비** — JKO는 Pattern-locked ([`knowledge/case-studies/notion`](../../case-studies/notion/UX_ANALYSIS.md))
6. Material/Ant 영감은 **분석 링크**로만

# Anti Patterns

- Generate로 Kit 우회
- 토큰/컴포넌트 즉석 발명
- Admin 목록 Search를 채팅으로 대체
- Apply 즉시 · Rollback 없음
- Primary 3개 (Send·Apply·Generate)

# Examples

- Live: [`/patterns/ai`](/patterns/ai)
- Philosophy: [`docs/01`](../../../docs/01_PRODUCT_PHILOSOPHY.md)
- Catalog: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) JKO AI Pattern
- Screens compose: [`/screens`](/screens) · Recipes [`docs/06`](../../../docs/06_SCREEN_RECIPES.md)

# Related Patterns

- [Data Table](../data-table/PATTERN.md) · [Dashboard](../dashboard/PATTERN.md) · [CRUD Form](../crud-form/PATTERN.md) — 조립 대상
- [Empty State](../empty-state/PATTERN.md) · [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) — Apply 덮어쓰기
- [Notification](../notification/PATTERN.md) — Apply/Rollback 결과
- [Settings](../settings/PATTERN.md) — AI 기능 on/off
- [Permission](../permission/PATTERN.md) — Apply 권한
- [Timeline](../timeline/PATTERN.md) — prompt / version history
- Recipes: [ai-chat-workspace](../recipes/ai-chat-workspace.md) · [ai-compose-review](../recipes/ai-compose-review.md) · [ai-prompt-history](../recipes/ai-prompt-history.md)
- Graph: [RELATIONSHIPS.md](../RELATIONSHIPS.md)
