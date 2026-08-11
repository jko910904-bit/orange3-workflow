# AGENTS.md

## Cursor Cloud specific instructions

### What this project is
This repo is a single, **static client-only web app** — the "Orange3 Workflow Editor" (an EBS-branded, Orange3-style visual data-mining workflow builder UI). Everything runs in the browser (vanilla HTML/CSS/JS in one large `index.html`). There is **no backend, no database, no bundler, and no build step**. State is kept in `localStorage`; demo login is hardcoded (`1234` / `5678`).

### Running it (development)
- Start the dev server with `npm run dev` (aliases: `npm start`, `npm run dev:orange`). All delegate to `orange-local` and run `npx --yes serve` on **http://127.0.0.1:8080/**.
- Port **8080 is intentional** — do not switch to 3000 (comments in `package.json`/`.vscode` reserve 3000 for an unrelated "JKO" project).
- No install step is required to run: the only runtime dependency is the `serve` static server, fetched via `npx`.

### Two serve roots (non-obvious)
- Repo root (`/index.html` + `/assets`) is the **Vercel production** root (`vercel.json` SPA rewrite; `.vercelignore` excludes `orange-local/`).
- `orange-local/` is the **local dev mirror** and is what `npm run dev` actually serves. The two `index.html` files are byte-identical. If you edit the app for local preview, edit `orange-local/index.html`; keep the root copy in sync for Vercel deploys.

### Lint / test / build
- There is **no linter, no test suite, and no build** configured (no `.github/`, no test scripts, no bundler). "Building" the app is a no-op; "running" it means serving the static files and exercising the UI in a browser.

### The SPA fallback is Vercel-only
Local `serve` returns 404 for unknown deep routes; the `/(.*) -> /index.html` rewrite only applies on Vercel. This does not affect local dev because the app is served from `/`.
