# Shepherd IT Sec Website

Modern website for Shepherd IT Sec built with Vue 3, Quasar Framework, and TypeScript.

## Features

- 🌐 **Bilingual Support**: English and German (i18n)
- 📱 **Responsive Design**: Mobile-first, modern UI
- 🎨 **Brand Colors**: Custom color scheme matching Shepherd IT Sec branding
- 📝 **Blog System**: Markdown-based blog posts
- 📄 **CV Display**: Embedded PDF viewer for curriculum vitae
- 📅 **Appointment Booking**: Integration with Easy!Appointments system
- 🌙 **Dark Theme**: Optimized dark mode experience

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Quasar Framework** - Vue.js based framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool (via Quasar CLI)
- **Vue Router** - Client-side routing
- **Markdown-it** - Markdown rendering for blog posts
- **Highlight.js** - Code syntax highlighting

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
# or
quasar dev
```

The site will be available at `http://localhost:9000` (or the port shown in the terminal).

### Build

Build for production:

```bash
npm run build
# or
quasar build
```

The output is written to `dist/spa/`.

## Project Structure

```
src/
├── boot/           # Quasar boot files (i18n)
├── components/     # Vue components
├── composables/    # Vue composables (useI18n)
├── content/        # Markdown blog posts
├── css/            # Global styles
├── i18n/           # Translation files (en-US, de-DE)
├── layouts/        # Layout components
├── pages/          # Page components
├── router/         # Vue Router configuration
└── site/           # Site configuration and content utilities
```

## Deployment

### GitHub Pages

The site is automatically deployed to GitHub Pages via GitHub Actions:

1. Push to the `main` or `master` branch
2. The workflow `/.github/workflows/deploy-pages.yml` builds and deploys automatically
3. Ensure **Pages → Build and deployment → Source** is set to **GitHub Actions** in repository settings

### Custom Domain

The custom domain is configured via `public/CNAME`. The site is available at:
- https://www.schaefer-itsec.com
- https://schaefer-itsec.com

## Configuration

### Brand Colors

The primary brand color is defined in `src/css/quasar.variables.scss`:
- Primary: `#168F8B` (rgb(22, 143, 139))
- Secondary: `#4ECDC4`
- Accent: `#64B5F6`

### Internationalization

Translation files are located in `src/i18n/`:
- `en-US.ts` - English translations
- `de-DE.ts` - German translations

Add new translations by updating these files and using the `useI18n()` composable in components.

### Blog Posts

Blog posts are written in Markdown and stored in `src/content/posts/`. Each post should include frontmatter:

```markdown
---
title: "Post Title"
date: 2023-05-08T15:30:23+02:00
draft: false
tag: ['tag1', 'tag2']
---

Post content here...
```

## License

Private project - Shepherd IT Sec
