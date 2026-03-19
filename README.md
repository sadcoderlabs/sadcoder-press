# sadcoder-press

Blog + social posts site built with Astro 6, Tailwind CSS 4, deployed on Vercel.

## Content Structure

All content lives in `src/content/`. There are two collections:

### Blog (`src/content/blog/`)

Long-form articles.

### Posts (`src/content/posts/`)

Short social network posts (Twitter, Threads, Bluesky, Mastodon).

## File Naming Convention

Each article or post is a **directory** named with the format:

```
YYYY-MM-DD_slug/
```

Inside each directory:

```
src/content/blog/
  2026-03-19_hello-world/
    en.md            # English version
    zh.md            # 中文版本
    assets/          # Images and other assets (optional)
      cover.png
```

- **`YYYY-MM-DD`** — the publish date
- **`slug`** — URL-friendly identifier, used in the final URL
- **`en.md` / `zh.md`** — one file per language; you can have just one or both
- **`assets/`** — shared assets for both language versions

The same convention applies to posts:

```
src/content/posts/
  2026-03-19_first-post/
    en.md
    zh.md
```

### URLs

URLs are derived from the slug only (date prefix and language are stripped):

| File path | URL |
|-----------|-----|
| `blog/2026-03-19_hello-world/en.md` | `/blog/hello-world/` |
| `blog/2026-03-19_hello-world/zh.md` | `/zh/blog/hello-world/` |
| `posts/2026-03-19_first-post/en.md` | `/posts/first-post/` |
| `posts/2026-03-19_first-post/zh.md` | `/zh/posts/first-post/` |

### Blog Frontmatter

```yaml
---
title: "Hello World"
date: 2026-03-19
description: "A short description of the article."
tags: ["intro", "welcome"]
lang: en          # en or zh
draft: false      # optional, defaults to false
---
```

### Post Frontmatter

```yaml
---
title: "Launched our new site!"
date: 2026-03-19
platform: ["twitter", "bluesky"]    # twitter, threads, bluesky, mastodon
tags: ["launch", "announcement"]
lang: en
draft: false                         # optional
publishedUrl:                        # optional, add after publishing
  twitter: "https://x.com/..."
  bluesky: "https://bsky.app/..."
---
```

## i18n

- Default language: **English** (no URL prefix)
- Secondary language: **中文** (URL prefix `/zh/`)

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.
