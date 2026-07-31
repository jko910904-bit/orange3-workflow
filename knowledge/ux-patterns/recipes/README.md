# Screen Recipes — Pattern combinations

> **Recipe = ordered Pattern chain that solves a Task** — not a UI mock.  
> Relationships graph: [`../RELATIONSHIPS.md`](../RELATIONSHIPS.md) · Docs summary: [`docs/06_SCREEN_RECIPES.md`](../../../docs/06_SCREEN_RECIPES.md)

Each file: Goal · User Tasks · Pattern Chain · Why this order · Layout · Overlay rules · Related Recipes · Linked Patterns.

**Count:** 18 recipes (Admin 8 · SaaS 7 · AI 3)

---

## How to use

1. Pick **User Task** (조회 / 수정 / 삭제 / 현황 / 온보딩 …).
2. Open a Recipe below — follow the **Pattern Chain** in order.
3. Read each `PATTERN.md` for When / Layout / Anti.
4. Compose with Design Kit only — no new tokens.

Overlay cheat: **수정+목록 = Drawer** · **빠른 작업 = Modal** · **삭제 = Confirm** · **긴 생성 = Page**.

---

## Admin

| Recipe | Pattern chain (short) | File |
| --- | --- | --- |
| Member management | Search → Filter → Data Table → Detail Drawer → Confirm (+ Loading/Empty) | [admin-member-management.md](./admin-member-management.md) |
| Notice board | Search → Filter/Category → Table/List → Detail Drawer/Page | [admin-notice-board.md](./admin-notice-board.md) |
| FAQ board | Search → Filter → List/Table → Detail Drawer | [admin-faq-board.md](./admin-faq-board.md) |
| Product catalog | Search → Filter → Table/Card grid → Detail Drawer | [admin-product-catalog.md](./admin-product-catalog.md) |
| Dashboard | KPI → Charts → Activity → Quick Action → (Analytics) | [admin-dashboard.md](./admin-dashboard.md) |
| Analytics report | Filter → Analytics → Table drill → Export | [admin-analytics.md](./admin-analytics.md) |
| Settings + Permissions | Settings → Permission → Confirm | [admin-settings-permissions.md](./admin-settings-permissions.md) |
| File manager | File Manager + File Upload → Confirm | [admin-file-manager.md](./admin-file-manager.md) |

---

## SaaS

| Recipe | Pattern chain (short) | File |
| --- | --- | --- |
| Onboarding wizard | CRUD Form (steps) → Empty CTA → Notification | [saas-onboarding-wizard.md](./saas-onboarding-wizard.md) |
| Billing settings | Settings → Confirm → Notification | [saas-billing-settings.md](./saas-billing-settings.md) |
| Notifications center | Notification + Filter → Detail Drawer | [saas-notifications.md](./saas-notifications.md) |
| Team permissions | Permission → Confirm → Notification | [saas-team-permissions.md](./saas-team-permissions.md) |
| Calendar schedule | Calendar → Detail Drawer/Modal → Confirm | [saas-calendar-schedule.md](./saas-calendar-schedule.md) |
| Kanban board | Kanban → Detail Drawer → Confirm | [saas-kanban-board.md](./saas-kanban-board.md) |
| Timeline / activity | Timeline → Detail Drawer · Dashboard Activity | [saas-timeline-activity.md](./saas-timeline-activity.md) |

---

## AI

| Recipe | Pattern chain (short) | File |
| --- | --- | --- |
| AI Chat workspace | AI Chat → Confirm (clear/Apply) · optional Timeline | [ai-chat-workspace.md](./ai-chat-workspace.md) |
| Prompt / version history | Timeline + AI Chat → Confirm | [ai-prompt-history.md](./ai-prompt-history.md) |
| Compose review & Apply | AI Chat → preview → Confirm → Notification | [ai-compose-review.md](./ai-compose-review.md) |

---

## Cross-links

- Pattern index: [`../README.md`](../README.md)
- Relationships: [`../RELATIONSHIPS.md`](../RELATIONSHIPS.md)
- Live screens (where present): `/screens/...`
- Never invent UI before Goal → Task → Pattern ([`AGENTS.md`](../../../AGENTS.md))
