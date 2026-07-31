# Dashboard Pattern

Goal: **현황 확인**.

## Stack

```
KPI → Charts → Recent Activity → Quick Action
```

**Title** is optional page chrome (AdminShell breadcrumb / page title) — not a required Component.  
**Table** is not part of the Dashboard required stack (use Analytics for tabular drill-down).

## Components

KPI · Charts · Recent Activity · Quick Action

## UX Rules applied

Especially `single-primary` — Quick Action Primary is at most one.

## Compose notes

- Admin shell: 12-col / 1440 / sidebar 240 / content fluid
- Charts need a text summary alternative
- Kit tokens / components only

Live: `/patterns/dashboard` · code: `src/design-system/patterns/Dashboard.tsx`

See [README.md](./README.md) · [../UX_RULES.md](../UX_RULES.md)
