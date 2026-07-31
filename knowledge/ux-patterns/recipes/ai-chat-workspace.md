# Recipe: AI Chat Workspace

## Goal

JKO **Compose 보조** — Pattern/Recipe를 고르고 미리본 뒤 Apply한다. Generate로 Kit를 우회하지 않는다.

## User Tasks

- Intent 입력 · 대화
- Pattern 제안 검토
- Preview · Apply · Rollback
- Clear conversation
- (선택) History 패널

## Pattern Chain (ordered)

```
AI Chat
  → preview (kit compose proposal)
  → Confirm (Apply 덮어쓰기 / clear chat)
  → Notification (Apply / Rollback 결과)

optional: Timeline (session history) — see ai-prompt-history
targets: Data Table · Dashboard · CRUD · Settings (compose only)

Empty: 첫 프롬프트 CTA · Loading: 응답 Skeleton · Error: Retry
```

## Why this order

- Knowledge > Features; Output Rules 골격 유지 ([`ai-chat/PATTERN.md`](../ai-chat/PATTERN.md)).
- Apply 덮어쓰기·clear = Confirm; 성공 = Notification.
- Admin Search를 채팅으로 대체하지 않음.

## Layout notes (Admin sidebar vs centered)

- Split: chat | preview (kit surface).
- Playground/Admin chrome 재사용; 새 AI 전용 토큰 금지.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| Chat workspace | Page / panel |
| Apply 덮어쓰기 · clear | **Confirm** |
| Settings (AI on/off) | Settings |
| Never | Modal in Modal · Generate Primary |

## Related Recipes

- [ai-prompt-history.md](./ai-prompt-history.md)
- [ai-compose-review.md](./ai-compose-review.md)
- [admin-dashboard.md](./admin-dashboard.md)
- [admin-member-management.md](./admin-member-management.md)

## Linked Patterns

- [ai-chat/PATTERN.md](../ai-chat/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [timeline/PATTERN.md](../timeline/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- [settings/PATTERN.md](../settings/PATTERN.md)
- [permission/PATTERN.md](../permission/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
