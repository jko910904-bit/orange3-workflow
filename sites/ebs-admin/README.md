# AI 실습 도구 관리 포털 — Deploy

Standalone static admin (`index.html` · `styles.css` · `app.js`).

## Local

```bash
npx --yes serve sites/ebs-admin -l 4173 --no-clipboard
# http://127.0.0.1:4173/
```

## GitHub Pages (branch ready)

`gh-pages` branch already contains the built static files.

1. GitHub → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / folder **`/`** → Save

Expected URL:

`https://jko910904-bit.github.io/orange3-workflow/`

## Vercel (recommended custom domain / *.vercel.app)

```bash
cd sites/ebs-admin
npx vercel login
npx vercel --prod
```

Or in Vercel dashboard: **Add New Project** → import this repo → Root Directory = `sites/ebs-admin` → Deploy.

## Next.js mirror

Same files are copied to `public/ebs-admin/` so a platform deploy also serves:

`/ebs-admin/`
