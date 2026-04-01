# Frontend Redesign: Bold Editorial

Date: 2026-04-01
Status: Draft
Reference: Arc.net (design inspiration for premium, editorial quality)

## Overview

A comprehensive frontend redesign of sadcoder-press, shifting from the current minimal default Tailwind look to a branded, editorial-quality design with the "Violet Dusk + Amber Spark" color system, card-based layouts, refined typography, and line-based decorative elements.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Color scheme | Violet Dusk + Amber Spark | Violet conveys the "sad coder" melancholy; amber adds experimental spark |
| Gradients | None | User preference — all colors are flat/solid |
| Font | Inter (Google Fonts / Fontsource) | Clean modern sans-serif, weight 400–800 |
| Layout max-width | `max-w-4xl` (56rem) for listing pages | More room for card grids |
| Article reading width | `max-w-prose` or custom 680px | Comfortable reading line length |
| Homepage structure | Hero tagline + article cards + post cards | Mixed: brand presence + content-first |
| Navigation | Scroll with page (not sticky) | Maximize reading area |
| Decorative elements | Solid-color line dividers (no waves, no scallops) | Clean, professional, easy to implement |
| Post type distinction | Top color bar on cards | Quick visual scanning of reply/post/thread |
| Dark mode | Full support, class-based toggle | Existing mechanism, new palette |

## Color System

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#FDFAFF` | Page background (slightly warm violet-white) |
| `--bg-card` | `#FFFFFF` | Card / container background |
| `--bg-card-inner` | `#F5F3FF` | Tag backgrounds, subtle tinted areas |
| `--text-primary` | `#2E1065` (violet-950) | Headings, strong text |
| `--text-body` | `#374151` (gray-700) | Body text in prose |
| `--text-secondary` | `#6B7280` (gray-500) | Descriptions, nav items |
| `--text-muted` | `#9CA3AF` (gray-400) | Dates, metadata |
| `--brand-primary` | `#7C3AED` (violet-600) | Primary brand, logo background |
| `--brand-primary-text` | `#6D28D9` (violet-700) | Links, tag text, section labels |
| `--brand-accent` | `#FBBF24` (amber-400) | Accent color, post section |
| `--brand-accent-text` | `#D97706` (amber-600) | Accent text, post section labels |
| `--border` | `#EDE9FE` (violet-100) | Card borders, dividers |
| `--border-subtle` | `#F3F0FF` | Inner card dividers (date separator) |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#110D1B` | Page background (deep violet-black) |
| `--bg-card` | `#1C1529` | Card / container background |
| `--bg-card-inner` | `#3B1F6E` | Tag backgrounds |
| `--text-primary` | `#EDE9FE` (violet-100) | Headings, strong text |
| `--text-body` | `#D1D5DB` (gray-300) | Body text in prose |
| `--text-secondary` | `#9CA3AF` (gray-400) | Descriptions, nav items |
| `--text-muted` | `#6B7280` (gray-500) | Dates, metadata |
| `--brand-primary` | `#7C3AED` (violet-600) | Logo background (same as light) |
| `--brand-primary-text` | `#A78BFA` (violet-400) | Links, tag text, section labels |
| `--brand-accent` | `#FBBF24` (amber-400) | Accent color (same as light) |
| `--brand-accent-text` | `#FBBF24` (amber-400) | Accent text |
| `--border` | `#2D2545` | Card borders, dividers |
| `--border-subtle` | `#2D2545` | Inner card dividers |

## Typography

- **Font family**: Inter via Google Fonts or `@fontsource/inter`
- **Headings**: weight 600–800, `letter-spacing: -0.5px` on large headings
- **Body**: weight 400, default letter-spacing
- **Section labels**: 11px, uppercase, `letter-spacing: 2px`, brand color
- **Tags**: 10px, pill-shaped (`border-radius: 99px`), `padding: 2px 8px`
- **Dates/metadata**: 11–12px, muted color

### Heading Scale

| Element | Size | Weight |
|---------|------|--------|
| Hero h1 | 36px | 800 |
| Article page h1 | 32px | 800 |
| Article h2 | 22px | 700 |
| Card title | 16px | 600 |
| Post card title (thread) | 14px | 600 |

## Layout

### Global

- Page max-width: `max-w-4xl` (56rem / 896px) for listing pages
- Article reading max-width: `max-w-prose` (65ch / ~680px) for reading content, or a custom `max-w-[680px]`
- Horizontal padding: `px-6` (24px)
- Page background: `--bg-page`

### Navigation

- Full-width nav within `max-w-4xl` container
- Left: Logo (28px violet square with "s" letter, `border-radius: 6px`) + "sadcoder.press" text
- Right: Blog | Posts | Language switcher | Theme toggle
- Spacing: `padding: 20px 24px`, `gap: 20px` between nav items
- Active page: `--text-primary` + `font-weight: 500`; inactive: `--text-secondary`
- Language switcher: brand primary text color
- No bottom border — separated from content by spacing

### Homepage

**Hero section:**
- `padding: 40px 24px 0`
- h1: 36px/800, `--text-primary`, `letter-spacing: -0.5px`
- Subtitle: 16px, `--text-secondary`, `max-width: 480px`

**Line divider (hero → articles):**
- `margin-top: 32px`
- Structure: long thin line (`--brand-primary`, opacity 0.15) + dot (6px circle, `--brand-primary`, opacity 0.3) + short line (`--brand-accent`, opacity 0.3)
- Height: 2px

**Articles section:**
- Section label: short line (20px, `--brand-primary`, opacity 0.4) + uppercase text ("LATEST ARTICLES")
- Grid: `grid-template-columns: 1fr 1fr`, `gap: 16px`
- Responsive: single column below `sm` breakpoint

**Line divider (articles → posts):**
- Structure: short line (`--brand-accent`, opacity 0.3) + dot (6px, `--brand-accent`, opacity 0.3) + long thin line (`--brand-accent`, opacity 0.1)
- Mirrors the first divider but with accent color, reversed direction

**Posts section:**
- Section label: short line (20px, `--brand-accent-text`, opacity 0.4) + uppercase text ("LATEST POSTS")
- Grid: `grid-template-columns: 1fr 1fr 1fr`, `gap: 12px`
- Responsive: single column below `sm`, two columns at `md`

**Footer:**
- Top border: 1px `--border`
- Left: "© 2026 sadcoderlabs"
- Right: GitHub, Twitter links
- Font size: 12px, `--text-muted`

### Blog Index Page (`/blog/`)

Same layout as homepage articles section but shows all articles (not limited to 5). Full-width `max-w-4xl` container, 2-column card grid.

### Posts Index Page (`/posts/`)

Same layout as homepage posts section but shows all posts. Full-width `max-w-4xl` container, 3-column card grid.

## Card Design

### Article Card

```
┌─────────────────────────────┐
│ [tag] [tag] [tag]           │  ← pills, --bg-card-inner bg
│                             │
│ Article Title Here          │  ← 16px/600, --text-primary
│                             │
│ Description text that       │  ← 13px/400, --text-secondary
│ spans two lines...          │
│                             │
│ ─────────────────────────── │  ← 1px --border-subtle
│ Apr 1, 2026                 │  ← 12px, --text-muted
└─────────────────────────────┘
```

- Background: `--bg-card`
- Border: 1px `--border`
- Border radius: 12px
- Padding: 20px
- Hover: border color shifts to `--brand-primary` (light: `#7C3AED`, dark: `#A78BFA`) with `transition-colors`

### Post Card — Reply

```
┌─────────────────────────────┐
│ ████████████████████████████ │  ← 3px top bar, #A78BFA (violet-400)
│ [↩ reply] [𝕏]              │  ← type + platform badges
│ @karpathy                   │  ← reply target, violet-400 text
│                             │
│ Post content preview...     │  ← 13px, --text-body
│                             │
│ ─────────────────────────── │  ← 1px --border-subtle
│ Mar 30, 2026                │  ← 11px, --text-muted
└─────────────────────────────┘
```

### Post Card — Standalone Post

```
┌─────────────────────────────┐
│ ████████████████████████████ │  ← 3px top bar, #FBBF24 (amber-400)
│ [post] [𝕏]                 │  ← type + platform badges
│                             │
│ Post content preview...     │  ← 13px, --text-body
│                             │
│ ─────────────────────────── │  ← 1px --border-subtle
│ Mar 30, 2026                │  ← 11px, --text-muted
└─────────────────────────────┘
```

### Post Card — Thread

```
┌─────────────────────────────┐
│ ████████████████████████████ │  ← 3px top bar, #7C3AED (violet-600)
│ [🧵 thread] [𝕏]            │  ← type + platform badges
│                             │
│ Thread Title                │  ← 14px/600, --text-primary
│ First post preview...       │  ← 13px, --text-secondary
│                             │
│ ─────────────────────────── │  ← 1px --border-subtle
│ Apr 1, 2026      5 posts    │  ← date left, count right
└─────────────────────────────┘
```

### Post Type Color Mapping

| Type | Top bar color | Badge bg | Badge text |
|------|--------------|----------|------------|
| Reply | `#A78BFA` (violet-400) | `#7C3AED` | white |
| Standalone post | `#FBBF24` (amber-400) | `#D97706` | white |
| Thread | `#7C3AED` (violet-600) | `#7C3AED` | white |

### Platform Badge Colors

| Platform | Light bg | Light text | Dark bg | Dark text |
|----------|---------|------------|---------|-----------|
| Twitter/X | `#1D4ED8` | white | `#1E40AF` | `#93C5FD` |

Additional platforms (Threads, Bluesky, Mastodon) follow the same pattern with their respective brand colors.

## Decorative Line Dividers

Two variations used consistently throughout the site:

**Primary divider** (used after hero, between major sections):
```
────────────────────────────── ● ═══════
  long line (brand-primary,    dot   short line (brand-accent,
  opacity 0.15)              6px     opacity 0.3)
```

**Accent divider** (used before posts section):
```
═══════ ● ──────────────────────────────
 short   dot   long line (brand-accent,
 line   6px    opacity 0.1)
```

Both are `height: 2px` lines with `border-radius`. The dot is a 6px circle. Opacity keeps them subtle.

## Article Detail Page

- Navigation: same as all pages
- Container: `max-w-prose` or custom 680px (narrower than listing pages)
- Header: tags → h1 (32px/800) → date (14px, muted)
- Divider: simple 1px `--border` line
- Body: Tailwind Typography plugin (`prose dark:prose-invert`) with custom overrides:
  - Link color: `--brand-primary-text`
  - Link style: underline with `text-underline-offset: 2px`
  - Inline code: `--bg-card-inner` background, `--brand-primary-text` color, 4px radius
  - Code blocks: `--bg-card` (dark) background with syntax highlighting, 8px radius
  - Headings: `--text-primary` color

## Post Detail Page

- Same narrow container as article page (`max-w-3xl`)
- Top: type badge + platform badges
- If reply: show reply context (target author in `--brand-primary-text`)
- Body: rendered markdown with prose styling
- Footer: published links to external platforms

## Responsive Behavior

| Breakpoint | Articles grid | Posts grid | Container padding |
|------------|--------------|-----------|-------------------|
| < 640px (mobile) | 1 column | 1 column | `px-4` (16px) |
| 640–768px (sm) | 2 columns | 1 column | `px-6` (24px) |
| 768px+ (md) | 2 columns | 2 columns | `px-6` (24px) |
| 1024px+ (lg) | 2 columns | 3 columns | `px-6` (24px) |

## Dark Mode

Uses the existing `.dark` class toggle on `<html>`, persisted in localStorage. The inline script in `Base.astro` prevents flash. All color tokens switch via `dark:` Tailwind variants.

Code blocks use the dark card background (`#1C1529`) in both light and dark modes for consistency — code always appears on a dark surface.

## Scope

### In Scope

- Color system implementation (CSS custom properties or Tailwind config)
- Inter font loading
- Navigation redesign (logo + layout)
- Homepage redesign (hero + card grids + line dividers)
- Blog index page (card grid)
- Posts index page (card grid with type distinction)
- Article detail page (typography + code block styling)
- Post detail page (type badges + reply context)
- Dark mode color updates
- Responsive card grid breakpoints
- Footer

### Out of Scope

- Content schema changes (no frontmatter changes needed)

### Post Type Detection Logic

Post type is derived at render time from existing data:

- **Reply**: post has `replyTo` field populated
- **Thread**: post content contains `---` (horizontal rule) separators that split it into multiple segments. Count segments by splitting on `\n---\n`; if segments > 1, it's a thread.
- **Standalone post**: neither reply nor thread
- New pages or routes
- JavaScript interactions beyond existing theme toggle
- SEO/meta tag changes
- Animation or motion design
- RSS feed changes
