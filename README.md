# AI Screen Generator (Design Kit)

Natural-language prompts compose a Design System into production screens.

## Pipeline

```
Prompt → Pattern selection → Layout generation → React Screen
```

## Stack

- Next.js (App Router, `src/`)
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
src/
  app/                 # Next.js App Router
  design-system/
    tokens/
    components/
    patterns/
    templates/
  generator/
    parser/
    layout-engine/
    renderer/
  ai/
    prompts/
    schemas/
  types/
  utils/
```

Legacy static site files are preserved under `_archive/legacy-static/`.
