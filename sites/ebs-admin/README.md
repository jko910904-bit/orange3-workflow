# AI 실습 도구 관리 포털 — Deploy

Standalone static admin (`index.html` · `styles.css` · `app.js`).

> **404 note:** `https://jko910904-bit.github.io/orange3-workflow/` returns **404** until GitHub Pages is enabled once in repo Settings. The `gh-pages` branch alone is not enough.

## Working preview (open this)

Live tunnel (no GitHub Pages / Vercel required):

**https://b9ad238dc9d3d7.lhr.life/**

Backup: **https://nicholas-uniprotkb-wma-usc.trycloudflare.com/**

> Note: `github.io` is 404 until Pages is enabled. File hosts like `litter.catbox.moe` are often blocked on KR networks.

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

## Vercel (recommended custom domain / *.vercel.app)

```bash
cd sites/ebs-admin
npx vercel login
npx vercel --prod
```

Or in Vercel dashboard: **Add New Project** → import this repo → Root Directory = `sites/ebs-admin` → Deploy.

## Next.js mirror

Same files are copied to `public/ebs-admin/` for platform deploys. Do **not** expect `/ebs-admin/` on the existing Workflow Editor Vercel app — that SPA catch-all overrides static files.
