# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

sadcoder-press is a bilingual (English + Chinese) static blog built with Astro 6, Tailwind CSS 4, and deployed on Vercel. It hosts long-form blog articles and short-form social media posts for sadcoderlabs.

## Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

Node.js >= 22.12.0 required.

## Architecture

- **Framework**: Astro 6 (static output, zero client-side JS by default)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` plugin, with `@tailwindcss/typography` for prose
- **i18n**: English is default (no URL prefix), Chinese uses `/zh/` prefix. Configured in `astro.config.mjs`
- **Dark mode**: `.dark` class on `<html>`, persisted in localStorage, inline script in `Base.astro` prevents flash

### Content Collections

Two collections defined in `src/content.config.ts` with Zod validation:

- **blog** (`src/content/blog/`): Long-form articles. Required frontmatter: `title`, `date`, `description`, `tags`, `lang`
- **posts** (`src/content/posts/`): Social posts. Required frontmatter: `date`, `platform`, `lang`, `tags`

Both support optional `draft: true` (excluded from build).

### Content Directory Convention

All content lives in date-prefixed directories: `YYYY-MM-DD_slug/`

```
src/content/blog/2026-03-24_my-article/
├── en.md       # English version
├── zh.md       # Chinese version (optional)
└── assets/     # Images (optional)
```

The slug is extracted by `src/lib/utils.ts:getSlug()` which strips the date prefix from the directory name. Example: `2026-03-19_hello-world/en` → `hello-world`.

### Routing

Pages use Astro dynamic routes with `getStaticPaths()`:

- `src/pages/blog/[slug].astro` → `/blog/{slug}/`
- `src/pages/posts/[slug].astro` → `/posts/{slug}/`
- `src/pages/zh/blog/[slug].astro` → `/zh/blog/{slug}/`
- `src/pages/zh/posts/[slug].astro` → `/zh/posts/{slug}/`

### Key Components

- `src/layouts/Base.astro` — Main HTML wrapper, dark mode script, max-width `3xl`
- `src/components/Nav.astro` — Language-aware navigation
- `src/components/ThemeToggle.astro` — Light/dark toggle
- `src/components/LanguageSwitcher.astro` — Mirrors current page to alternate language

## Writing Workspace

The `writing/` directory is a pre-publication workspace separate from deployed content. It integrates with AI writing skills (`.agents/skills/`) for article preparation, writing, and translation.

- `writing/articles/` — Article briefs and drafts
- `writing/posts/` — Social post drafts
- `writing/profiles/` — Author voice profiles
- `writing/ideas.md` — Idea pool with status tracking
- `writing/writing-rules.md` — Anti-AI-writing patterns to avoid
- `writing/social-style-guide.md` — Voice rules for social posts

### Writing Rules (must follow when writing content)

- No dash-connected contrasts ("not A — but B")
- No hollow opening questions ("Have you ever wondered...?")
- No filler phrases ("actually", "in fact", "interestingly")
- No summary sentences restating what a paragraph just said
- No transition filler ("Let's dive deeper", "Moving on to")
- No listicle structure when prose is more natural
- Limit em-dashes to 1-2 per article
- Every claim must come from author-sourced materials; never fabricate
- Be specific: numbers over adjectives, names over categories, stories over summaries

## Deployment

Push to `main` → Vercel auto-deploys. Fully static site, no server-side rendering.

## License

MIT (code) + CC BY-NC-SA 4.0 (content).
