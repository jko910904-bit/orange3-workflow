# Recipe: AI Compose Review & Apply

## Goal

AI가 제안한 **Pattern chain / Screen Recipe**를 검토하고 Kit compose 결과에 Apply한다. (Chat workspace의 핵심 하위 흐름)

## User Tasks

- Goal · Task · Pattern 제안 확인 (Output Rules)
- Preview 검토
- Apply · Rollback
- 거절 (Anti-Pattern / 새 토큰 제안 시)

## Pattern Chain (ordered)

```
AI Chat (proposal)
  → human review (Goal → Task → Pattern → Components …)
  → preview on kit surface
  → Confirm (Apply 덮어쓰기)
  → Notification
  → optional Rollback → Notification

Permission: Apply 가능 역할만 Confirm CTA 노출
```

## Why this order

- Compose ≠ Generate; 사람이 Pattern을 확정한 뒤 Apply.
- Confirm은 덮어쓰기 순간에만; 매 메시지마다 Confirm 금지.
- Rollback은 Notification+액션 — Confirm과 역할 분리 가능(제품 정책 문서화).

## Layout notes (Admin sidebar vs centered)

- Review pane + preview; Playground `/patterns` · `/screens`와 연계 가능.
- 제안 텍스트는 Output Rules 섹션 골격 권장.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| Review workspace | Page / split |
| Apply overwrite | Confirm |
| 대상 화면이 Drawer인 Recipe | preview만 — 실 Apply는 해당 surface |
| Never | Modal in Modal · Primary = Generate |

## Related Recipes

- [ai-chat-workspace.md](./ai-chat-workspace.md)
- [ai-prompt-history.md](./ai-prompt-history.md)
- [admin-member-management.md](./admin-member-management.md)
- [admin-dashboard.md](./admin-dashboard.md)

## Linked Patterns

- [ai-chat/PATTERN.md](../ai-chat/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [permission/PATTERN.md](../permission/PATTERN.md)
- [data-table/PATTERN.md](../data-table/PATTERN.md)
- [dashboard/PATTERN.md](../dashboard/PATTERN.md)
- [crud-form/PATTERN.md](../crud-form/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [error/PATTERN.md](../error/PATTERN.md)
- Relationships: [../RELATIONSHIPS.md](../RELATIONSHIPS.md)
- Recipes index: [./README.md](./README.md)
