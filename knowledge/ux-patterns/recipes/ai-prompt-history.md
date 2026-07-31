# Recipe: AI Prompt / Version History

## Goal

프롬프트·응답·Apply 버전을 **시간순으로 비교·복원**한다. 새 히스토리 Foundation을 만들지 않고 Timeline + AI Chat을 compose한다.

## User Tasks

- 세션/버전 목록 스캔
- 버전 상세 · diff 미리보기
- 복원 (Rollback)
- 삭제 · clear

## Pattern Chain (ordered)

```
Filter (session / date) → Timeline (prompt versions)
                              │
                              ├─ Detail Drawer (prompt · response · applied recipe id)
                              ├─ AI Chat (재실행 / 이어쓰기)
                              ├─ Confirm (restore overwrite · delete version · clear)
                              └─ Notification

Compare: 두 버전 선택 → preview side-by-side (kit layout only — 새 토큰 금지)
```

## Why this order

- History = Timeline Task; Chat = compose surface.
- Restore/delete = Confirm (비가역·덮어쓰기).
- Version compare는 kit split pane — 별도 Pattern 발명 아님.

## Layout notes (Admin sidebar vs centered)

- Left Timeline list · right Chat/preview (workspace와 동일 골격).
- Dense audit-friendly list.

## Overlay rules (Drawer/Modal/Page)

| Task | Surface |
| --- | --- |
| 버전 메타 | Drawer |
| 복원·삭제·clear | Confirm |
| 이어쓰기 | AI Chat Page/panel |
| Never | Generate로 히스토리 UI 즉석 창작 |

## Related Recipes

- [ai-chat-workspace.md](./ai-chat-workspace.md)
- [ai-compose-review.md](./ai-compose-review.md)
- [saas-timeline-activity.md](./saas-timeline-activity.md)

## Linked Patterns

- [timeline/PATTERN.md](../timeline/PATTERN.md)
- [ai-chat/PATTERN.md](../ai-chat/PATTERN.md)
- [filter/PATTERN.md](../filter/PATTERN.md)
- [detail-drawer/PATTERN.md](../detail-drawer/PATTERN.md)
- [confirm-dialog/PATTERN.md](../confirm-dialog/PATTERN.md)
- [notification/PATTERN.md](../notification/PATTERN.md)
- [empty-state/PATTERN.md](../empty-state/PATTERN.md)
- [loading/PATTERN.md](../loading/PATTERN.md)
