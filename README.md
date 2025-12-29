## Shepherd-ITSec.github.io (Vue 3 + Quasar rewrite)

This repository used to host a Hugo site. It has been rewritten as a **Vue 3 + Quasar** site using the standard **Quasar CLI (app-vite)** setup.

### Local development

```bash
npm install
quasar dev
```

### Build

```bash
quasar build
```

The output is written to `dist/spa/`.

### Deploy (GitHub Pages)

The workflow `/.github/workflows/deploy-pages.yml` builds `dist/spa/` and deploys it to GitHub Pages.

- In your repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
- If you use a custom domain, edit `public/CNAME`.


