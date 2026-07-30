# Design Kit

AI-powered Design System screen generator.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/             # Next.js App Router
components/      # App-level UI
design-system/   # Tokens, components, variants
templates/       # Dashboard, List, Detail, Form
catalog/         # JSON catalogs for AI
ai/              # Generation pipeline
lib/             # Shared utilities
```

Legacy static site files are preserved under `_archive/legacy-static/`.
