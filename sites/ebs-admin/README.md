# AI 실습 도구 관리 포털 — Deploy

Standalone static admin (`index.html` · `styles.css` · `app.js`).

> **404 note:** `https://jko910904-bit.github.io/orange3-workflow/` returns **404** until GitHub Pages is enabled once in repo Settings. The `gh-pages` branch alone is not enough.

## Production (open this)

**https://ebs-admin-portal.vercel.app/**

> Note: `github.io` is 404 until Pages is enabled. Temporary file hosts / tunnels are fallbacks only.

## Local

```bash
npx --yes serve sites/ebs-admin -l 4173 --no-clipboard
# http://127.0.0.1:4173/
```

## Enable GitHub Pages (permanent)

1. GitHub → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / folder **`/`** → Save

Then open:

`https://jko910904-bit.github.io/orange3-workflow/`

(Alternative) Source: **GitHub Actions** — workflow `.github/workflows/deploy-ebs-admin-pages.yml` deploys `sites/ebs-admin`.

## Vercel (already deployed)

Project: `jeonkyoungok/ebs-admin-portal`  
URL: **https://ebs-admin-portal.vercel.app/**

```bash
cd sites/ebs-admin
npx vercel --prod
```

## Next.js mirror

Same files are copied to `public/ebs-admin/` for platform deploys. Do **not** expect `/ebs-admin/` on the existing Workflow Editor Vercel app — that SPA catch-all overrides static files.
