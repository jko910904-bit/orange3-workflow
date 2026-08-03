# EduOps Admin Dashboard (standalone)

JKO Design Kit **compose** preview — separate from the Next.js Playground (`:3000`).

## Goal

교육 운영자가 학습·콘텐츠·실습 현황을 한눈에 보고 다음 Task로 이동합니다.

## Stack

```
KPI → Charts → Recent Activity → Quick Action
```

- Pattern: Dashboard (`knowledge/ux-patterns/dashboard`)
- Recipe: Admin Dashboard
- Tokens: Foundation only (`src/design-system/tokens`)
- Layout: Admin shell · Dense · 12 / 1440 / 240 / fluid
- Brand: EduOps (EBS 캐릭터·로고 불이식)

## Run (isolated server)

```bash
# from repo root — does NOT use port 3000
npx --yes serve sites/ebs-admin -l 4173 --no-clipboard
```

Open: http://127.0.0.1:4173/
