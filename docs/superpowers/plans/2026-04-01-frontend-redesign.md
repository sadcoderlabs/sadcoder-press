# Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign sadcoder-press from minimal Tailwind defaults to a branded "Bold Editorial" design with Violet Dusk + Amber Spark color system, card layouts, and line-based decorative elements.

**Architecture:** CSS custom properties define light/dark color tokens that swap on `.dark` class. New reusable Astro components (cards, dividers, labels) replace inline markup in pages. Layout widens to `max-w-4xl` for listing pages, narrows to `max-w-[680px]` for reading.

**Tech Stack:** Astro 6, Tailwind CSS 4, Inter font via Google Fonts, `@tailwindcss/typography`

**Spec:** `docs/superpowers/specs/2026-04-01-frontend-redesign.md`

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/components/Hero.astro` | Homepage hero section with tagline |
| `src/components/LineDivider.astro` | Decorative line + dot divider (primary/accent variants) |
| `src/components/SectionLabel.astro` | Uppercase section heading with leading line |
| `src/components/ArticleCard.astro` | Blog article card for grid layouts |
| `src/components/PostCard.astro` | Social post card with type color bar |
| `src/components/Footer.astro` | Site footer |
| `src/lib/posts.ts` | Post type detection (reply/thread/standalone) |

### Modified Files

| File | Changes |
|------|---------|
| `src/styles/global.css` | Add Inter font import, CSS custom property color tokens, typography overrides |
| `src/layouts/Base.astro` | New background colors, font family, layout variants (wide/narrow) |
| `src/components/Nav.astro` | Logo, wider container, brand colors |
| `src/components/ThemeToggle.astro` | Update text colors to brand palette |
| `src/components/LanguageSwitcher.astro` | Update text colors to brand palette |
| `src/pages/index.astro` | Full homepage redesign with hero, card grids |
| `src/pages/zh/index.astro` | Same redesign, Chinese content |
| `src/pages/blog/index.astro` | Card grid layout |
| `src/pages/zh/blog/index.astro` | Card grid layout (zh) |
| `src/pages/posts/index.astro` | Card grid with type distinction |
| `src/pages/zh/posts/index.astro` | Card grid with type distinction (zh) |
| `src/pages/blog/[slug].astro` | Narrow reading layout, updated typography |
| `src/pages/zh/blog/[slug].astro` | Same (zh) |
| `src/pages/posts/[slug].astro` | Type badges, updated styling |
| `src/pages/zh/posts/[slug].astro` | Same (zh) |
| `src/lib/utils.ts` | Add date formatting helpers |

---

### Task 1: Color System and Font

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Add Inter font and color tokens to global.css**

Replace the entire file with:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:where(.dark, .dark *));

/* Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* Color tokens — swap on .dark */
:root {
  --bg-page: #FDFAFF;
  --bg-card: #FFFFFF;
  --bg-card-inner: #F5F3FF;
  --text-primary: #2E1065;
  --text-body: #374151;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --brand-primary: #7C3AED;
  --brand-primary-text: #6D28D9;
  --brand-accent: #FBBF24;
  --brand-accent-text: #D97706;
  --border-main: #EDE9FE;
  --border-subtle: #F3F0FF;
  --tag-bg: #F5F3FF;
  --tag-text: #6D28D9;
}

.dark {
  --bg-page: #110D1B;
  --bg-card: #1C1529;
  --bg-card-inner: #3B1F6E;
  --text-primary: #EDE9FE;
  --text-body: #D1D5DB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  --brand-primary: #7C3AED;
  --brand-primary-text: #A78BFA;
  --brand-accent: #FBBF24;
  --brand-accent-text: #FBBF24;
  --border-main: #2D2545;
  --border-subtle: #2D2545;
  --tag-bg: #3B1F6E;
  --tag-text: #DDD6FE;
}

/* Typography overrides for prose */
.prose {
  --tw-prose-links: var(--brand-primary-text);
  --tw-prose-headings: var(--text-primary);
  --tw-prose-body: var(--text-body);
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  text-underline-offset: 2px;
}

.prose :where(code):not(:where(pre code, [class~="not-prose"] *)) {
  background: var(--bg-card-inner);
  color: var(--brand-primary-text);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.875em;
}

.prose :where(code):not(:where(pre code, [class~="not-prose"] *))::before,
.prose :where(code):not(:where(pre code, [class~="not-prose"] *))::after {
  content: none;
}

.prose :where(pre):not(:where([class~="not-prose"] *)) {
  background: #1C1529;
  border-radius: 8px;
}

/* Card hover */
.card-hover:hover {
  border-color: var(--brand-primary) !important;
}
```

- [ ] **Step 2: Update Base.astro with new background and font**

Replace `src/layouts/Base.astro` with:

```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  lang: 'en' | 'zh';
  description?: string;
  image?: string;
  narrow?: boolean;
}

const { title, lang, description, image, narrow = false } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
const ogImage = image ? new URL(image, Astro.site).href : undefined;
const maxWidth = narrow ? 'max-w-[680px]' : 'max-w-4xl';
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <link rel="canonical" href={canonicalUrl} />
    {description && <meta name="description" content={description} />}
    <meta property="og:title" content={title} />
    <meta property="og:url" content={canonicalUrl} />
    {description && <meta property="og:description" content={description} />}
    {ogImage && <meta property="og:image" content={ogImage} />}
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={title} />
    {description && <meta name="twitter:description" content={description} />}
    {ogImage && <meta name="twitter:image" content={ogImage} />}
    <script is:inline>
      const theme = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      })();
      document.documentElement.classList.toggle('dark', theme === 'dark');
    </script>
  </head>
  <body class="min-h-screen transition-colors" style="background: var(--bg-page); color: var(--text-body); font-family: 'Inter', system-ui, sans-serif;">
    <Nav lang={lang} />
    <main class={`${maxWidth} mx-auto px-6 pb-16`}>
      <slot />
    </main>
    <Footer lang={lang} />
  </body>
</html>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors. The site now has the Inter font and color tokens, but pages still use old classes (visual mismatch is expected at this stage).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Base.astro
git commit -m "feat: add color system and Inter font"
```

---

### Task 2: Navigation Redesign

**Files:**
- Modify: `src/components/Nav.astro`
- Modify: `src/components/ThemeToggle.astro`
- Modify: `src/components/LanguageSwitcher.astro`

- [ ] **Step 1: Rewrite Nav.astro**

Replace `src/components/Nav.astro` with:

```astro
---
import LanguageSwitcher from './LanguageSwitcher.astro';
import ThemeToggle from './ThemeToggle.astro';

interface Props {
  lang: 'en' | 'zh';
}

const { lang } = Astro.props;

const prefix = lang === 'en' ? '' : '/zh';
const currentPath = Astro.url.pathname;

const labels = {
  en: { blog: 'Blog', posts: 'Posts' },
  zh: { blog: '部落格', posts: '動態' },
};

const t = labels[lang];

function isActive(href: string): boolean {
  return currentPath === href || currentPath.startsWith(href.replace(/\/$/, '') + '/');
}
---

<nav class="max-w-4xl mx-auto px-6 py-5">
  <div class="flex items-center justify-between">
    <a href={`${prefix}/`} class="flex items-center gap-2 no-underline">
      <div class="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold text-white" style="background: var(--brand-primary);">s</div>
      <span class="font-semibold text-sm" style="color: var(--text-primary);">sadcoder.press</span>
    </a>
    <div class="flex items-center gap-5">
      <a
        href={`${prefix}/blog/`}
        class:list={[
          'text-sm transition-colors',
          isActive(`${prefix}/blog/`) ? 'font-medium' : '',
        ]}
        style={isActive(`${prefix}/blog/`) ? 'color: var(--text-primary);' : 'color: var(--text-secondary);'}
      >
        {t.blog}
      </a>
      <a
        href={`${prefix}/posts/`}
        class:list={[
          'text-sm transition-colors',
          isActive(`${prefix}/posts/`) ? 'font-medium' : '',
        ]}
        style={isActive(`${prefix}/posts/`) ? 'color: var(--text-primary);' : 'color: var(--text-secondary);'}
      >
        {t.posts}
      </a>
      <LanguageSwitcher lang={lang} />
      <ThemeToggle />
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Update ThemeToggle.astro colors**

Replace the button element's class in `src/components/ThemeToggle.astro`:

```astro
<button
  id="theme-toggle"
  type="button"
  class="text-sm transition-colors"
  style="color: var(--text-secondary);"
  aria-label="Toggle theme"
>
```

The `<script>` block stays the same.

- [ ] **Step 3: Update LanguageSwitcher.astro colors**

Replace the `<a>` tag in `src/components/LanguageSwitcher.astro`:

```astro
<a href={alternatePath} class="text-sm transition-colors" style="color: var(--brand-primary-text);">
  {label}
</a>
```

The script block stays the same.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/ThemeToggle.astro src/components/LanguageSwitcher.astro
git commit -m "feat: redesign navigation with logo and brand colors"
```

---

### Task 3: Utility Functions

**Files:**
- Modify: `src/lib/utils.ts`
- Create: `src/lib/posts.ts`

- [ ] **Step 1: Add date formatting helpers to utils.ts**

Add to the end of `src/lib/utils.ts`:

```typescript
/**
 * Format a date for display.
 * English: "Apr 1, 2026"
 * Chinese: "2026/4/1"
 */
export function formatDate(date: Date, lang: 'en' | 'zh'): string {
  if (lang === 'zh') {
    return date.toLocaleDateString('zh-TW');
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
```

- [ ] **Step 2: Create post type detection utility**

Create `src/lib/posts.ts`:

```typescript
import type { CollectionEntry } from 'astro:content';

export type PostType = 'reply' | 'thread' | 'post';

/**
 * Detect post type from content and frontmatter.
 * - reply: has replyTo field
 * - thread: content has --- separators (multiple segments)
 * - post: everything else
 */
export function getPostType(post: CollectionEntry<'posts'>, rawContent?: string): PostType {
  if (post.data.replyTo) return 'reply';
  if (rawContent) {
    const segments = rawContent.split(/\n---\n/);
    if (segments.length > 1) return 'thread';
  }
  return 'post';
}

/**
 * Count segments in a thread post.
 */
export function getThreadCount(rawContent: string): number {
  return rawContent.split(/\n---\n/).length;
}

/** Top bar color for each post type */
export const postTypeColors: Record<PostType, { bar: string; badgeBg: string; badgeText: string }> = {
  reply: { bar: '#A78BFA', badgeBg: '#7C3AED', badgeText: 'white' },
  post: { bar: '#FBBF24', badgeBg: '#D97706', badgeText: 'white' },
  thread: { bar: '#7C3AED', badgeBg: '#7C3AED', badgeText: 'white' },
};

/** Labels for post types */
export const postTypeLabels: Record<PostType, { en: string; zh: string }> = {
  reply: { en: '↩ reply', zh: '↩ 回覆' },
  post: { en: 'post', zh: '貼文' },
  thread: { en: '🧵 thread', zh: '🧵 串文' },
};

/** Platform badge colors */
export const platformColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  twitter: { bg: '#1D4ED8', text: 'white', darkBg: '#1E40AF', darkText: '#93C5FD' },
  threads: { bg: '#000000', text: 'white', darkBg: '#333333', darkText: '#E5E5E5' },
  bluesky: { bg: '#0085FF', text: 'white', darkBg: '#0066CC', darkText: '#99CCFF' },
  mastodon: { bg: '#6364FF', text: 'white', darkBg: '#4F46E5', darkText: '#C7D2FE' },
};
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils.ts src/lib/posts.ts
git commit -m "feat: add date formatting and post type detection utilities"
```

---

### Task 4: Shared Decorative Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/LineDivider.astro`
- Create: `src/components/SectionLabel.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Hero.astro**

Create `src/components/Hero.astro`:

```astro
---
interface Props {
  lang: 'en' | 'zh';
}

const { lang } = Astro.props;

const content = {
  en: {
    title: 'Experiments in',
    titleLine2: 'AI agent engineering.',
    subtitle: 'We build with AI agents, break things, and write about what we learn.',
  },
  zh: {
    title: '探索',
    titleLine2: 'AI agent 工程實驗。',
    subtitle: '我們用 AI agent 開發、踩坑，然後把學到的寫下來。',
  },
};

const t = content[lang];
---

<div class="pt-10 pb-0">
  <h1 class="text-4xl font-extrabold leading-tight tracking-tight" style="color: var(--text-primary);">
    {t.title}<br />{t.titleLine2}
  </h1>
  <p class="mt-3.5 text-base max-w-[480px]" style="color: var(--text-secondary);">
    {t.subtitle}
  </p>
</div>
```

- [ ] **Step 2: Create LineDivider.astro**

Create `src/components/LineDivider.astro`:

```astro
---
interface Props {
  variant?: 'primary' | 'accent';
}

const { variant = 'primary' } = Astro.props;

const isPrimary = variant === 'primary';
---

<div class="flex items-center gap-3 my-8">
  {isPrimary ? (
    <>
      <div class="h-0.5 flex-1 rounded" style="background: var(--brand-primary); opacity: 0.15;"></div>
      <div class="w-1.5 h-1.5 rounded-full" style="background: var(--brand-primary); opacity: 0.3;"></div>
      <div class="h-0.5 w-10 rounded" style="background: var(--brand-accent); opacity: 0.3;"></div>
    </>
  ) : (
    <>
      <div class="h-0.5 w-10 rounded" style="background: var(--brand-accent); opacity: 0.3;"></div>
      <div class="w-1.5 h-1.5 rounded-full" style="background: var(--brand-accent); opacity: 0.3;"></div>
      <div class="h-0.5 flex-1 rounded" style="background: var(--brand-accent); opacity: 0.1;"></div>
    </>
  )}
</div>
```

- [ ] **Step 3: Create SectionLabel.astro**

Create `src/components/SectionLabel.astro`:

```astro
---
interface Props {
  label: string;
  color?: 'primary' | 'accent';
}

const { label, color = 'primary' } = Astro.props;
const lineColor = color === 'primary' ? 'var(--brand-primary)' : 'var(--brand-accent-text)';
const textColor = color === 'primary' ? 'var(--brand-primary-text)' : 'var(--brand-accent-text)';
---

<div class="flex items-center gap-2.5 mb-5">
  <div class="h-px w-5" style={`background: ${lineColor}; opacity: 0.4;`}></div>
  <span class="text-[11px] uppercase tracking-[2px] font-semibold" style={`color: ${textColor};`}>{label}</span>
</div>
```

- [ ] **Step 4: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
interface Props {
  lang: 'en' | 'zh';
}

const { lang } = Astro.props;
---

<footer class="max-w-4xl mx-auto px-6 pb-8">
  <div class="h-px mb-5" style="background: var(--border-main);"></div>
  <div class="flex justify-between items-center">
    <span class="text-xs" style="color: var(--text-muted);">© 2026 sadcoderlabs</span>
    <div class="flex gap-4">
      <a href="https://github.com/sadcoderlabs" target="_blank" rel="noopener noreferrer" class="text-xs transition-colors" style="color: var(--text-muted);">GitHub</a>
      <a href="https://x.com/sadcoderlabs" target="_blank" rel="noopener noreferrer" class="text-xs transition-colors" style="color: var(--text-muted);">Twitter</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds. Components are defined but not yet used in pages.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/components/LineDivider.astro src/components/SectionLabel.astro src/components/Footer.astro
git commit -m "feat: add Hero, LineDivider, SectionLabel, and Footer components"
```

---

### Task 5: Article Card Component

**Files:**
- Create: `src/components/ArticleCard.astro`

- [ ] **Step 1: Create ArticleCard.astro**

Create `src/components/ArticleCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
}

const { title, description, date, tags, href } = Astro.props;
---

<a href={href} class="block rounded-xl p-5 border transition-colors no-underline card-hover" style={`background: var(--bg-card); border-color: var(--border-main);`}>
  <div class="flex flex-wrap gap-1.5 mb-3">
    {tags.map((tag) => (
      <span class="text-[10px] px-2 py-0.5 rounded-full" style="background: var(--tag-bg); color: var(--tag-text);">{tag}</span>
    ))}
  </div>
  <h3 class="text-base font-semibold leading-snug" style="color: var(--text-primary);">{title}</h3>
  <p class="mt-2 text-[13px] leading-relaxed" style="color: var(--text-secondary);">{description}</p>
  <div class="mt-3.5 pt-3 border-t" style="border-color: var(--border-subtle);">
    <span class="text-xs" style="color: var(--text-muted);">{date}</span>
  </div>
</a>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ArticleCard.astro
git commit -m "feat: add ArticleCard component"
```

---

### Task 6: Post Card Component

**Files:**
- Create: `src/components/PostCard.astro`

- [ ] **Step 1: Create PostCard.astro**

Create `src/components/PostCard.astro`:

```astro
---
import type { PostType } from '../lib/posts';
import { postTypeColors, postTypeLabels, platformColors } from '../lib/posts';

interface Props {
  type: PostType;
  platforms: string[];
  content: string;
  date: string;
  href: string;
  replyAuthor?: string;
  threadTitle?: string;
  threadCount?: number;
  lang: 'en' | 'zh';
}

const { type, platforms, content, date, href, replyAuthor, threadTitle, threadCount, lang } = Astro.props;
const colors = postTypeColors[type];
const typeLabel = postTypeLabels[type][lang];
---

<a href={href} class="block rounded-xl p-4 border transition-colors no-underline relative overflow-hidden card-hover" style={`background: var(--bg-card); border-color: var(--border-main);`}>
  <!-- Top color bar -->
  <div class="absolute top-0 left-0 w-full h-[3px]" style={`background: ${colors.bar};`}></div>

  <!-- Badges -->
  <div class="flex items-center gap-1.5 mb-2.5 mt-1">
    <span class="text-[10px] px-2 py-px rounded-full" style={`background: ${colors.badgeBg}; color: ${colors.badgeText};`}>{typeLabel}</span>
    {platforms.map((p) => {
      const pc = platformColors[p] || platformColors.twitter;
      const label = p === 'twitter' ? '𝕏' : p;
      return (
        <>
          <span class="text-[10px] px-2 py-px rounded-full dark:hidden" style={`background: ${pc.bg}; color: ${pc.text};`}>{label}</span>
          <span class="text-[10px] px-2 py-px rounded-full hidden dark:inline" style={`background: ${pc.darkBg}; color: ${pc.darkText};`}>{label}</span>
        </>
      );
    })}
  </div>

  <!-- Reply target -->
  {type === 'reply' && replyAuthor && (
    <div class="text-[11px] font-medium mb-1.5" style="color: var(--brand-primary-text);">@{replyAuthor}</div>
  )}

  <!-- Thread title -->
  {type === 'thread' && threadTitle && (
    <div class="text-sm font-semibold leading-snug mb-1.5" style="color: var(--text-primary);">{threadTitle}</div>
  )}

  <!-- Content preview -->
  <div class="text-[13px] leading-relaxed line-clamp-3" style="color: var(--text-body);">{content}</div>

  <!-- Footer -->
  <div class="mt-2.5 pt-2 border-t flex justify-between items-center" style="border-color: var(--border-subtle);">
    <span class="text-[11px]" style="color: var(--text-muted);">{date}</span>
    {type === 'thread' && threadCount && (
      <span class="text-[11px]" style="color: var(--brand-primary-text);">{threadCount} posts</span>
    )}
  </div>
</a>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/PostCard.astro
git commit -m "feat: add PostCard component with type distinction"
```

---

### Task 7: Homepage Redesign

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/zh/index.astro`

- [ ] **Step 1: Rewrite English homepage**

Replace `src/pages/index.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import LineDivider from '../components/LineDivider.astro';
import SectionLabel from '../components/SectionLabel.astro';
import ArticleCard from '../components/ArticleCard.astro';
import PostCard from '../components/PostCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../lib/utils';
import { getPostType, getThreadCount } from '../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

const lang = 'en';

const blogPosts = (await getCollection('blog', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);

const socialPosts = (await getCollection('posts', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);

const socialPostsWithType = socialPosts.map((post) => {
  const filePath = path.join('src/content/posts', post.id + '.md');
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
  const type = getPostType(post, body);
  const threadCount = type === 'thread' ? getThreadCount(body) : undefined;
  const firstLine = body.split(/\n---\n/)[0].trim();
  return { post, type, threadCount, firstLine };
});
---

<Base title="sadcoder.press" lang={lang}>
  <Hero lang={lang} />
  <LineDivider variant="primary" />

  <section>
    <SectionLabel label="Latest Articles" color="primary" />
    {blogPosts.length === 0 && <p style="color: var(--text-muted);">No posts yet.</p>}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {blogPosts.map((post) => (
        <ArticleCard
          title={post.data.title}
          description={post.data.description}
          date={formatDate(post.data.date, lang)}
          tags={post.data.tags}
          href={`/blog/${getSlug(post.id)}/`}
        />
      ))}
    </div>
  </section>

  <LineDivider variant="accent" />

  <section>
    <SectionLabel label="Latest Posts" color="accent" />
    {socialPosts.length === 0 && <p style="color: var(--text-muted);">No posts yet.</p>}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {socialPostsWithType.map(({ post, type, threadCount, firstLine }) => (
        <PostCard
          type={type}
          platforms={post.data.platform}
          content={firstLine}
          date={formatDate(post.data.date, lang)}
          href={`/posts/${getSlug(post.id)}/`}
          replyAuthor={post.data.replyTo?.author}
          threadTitle={post.data.title}
          threadCount={threadCount}
          lang={lang}
        />
      ))}
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Rewrite Chinese homepage**

Replace `src/pages/zh/index.astro` with the same structure, changing:
- `const lang = 'zh';`
- `<Base title="sadcoder.press" lang={lang}>` (title stays English — it's the site name)
- `<SectionLabel label="最新文章" color="primary" />`
- `<SectionLabel label="最新動態" color="accent" />`
- All `href` paths prefixed with `/zh/`
- Empty states: `"尚無文章。"` and `"尚無動態。"`

```astro
---
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
import LineDivider from '../../components/LineDivider.astro';
import SectionLabel from '../../components/SectionLabel.astro';
import ArticleCard from '../../components/ArticleCard.astro';
import PostCard from '../../components/PostCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../../lib/utils';
import { getPostType, getThreadCount } from '../../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

const lang = 'zh';

const blogPosts = (await getCollection('blog', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);

const socialPosts = (await getCollection('posts', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);

const socialPostsWithType = socialPosts.map((post) => {
  const filePath = path.join('src/content/posts', post.id + '.md');
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
  const type = getPostType(post, body);
  const threadCount = type === 'thread' ? getThreadCount(body) : undefined;
  const firstLine = body.split(/\n---\n/)[0].trim();
  return { post, type, threadCount, firstLine };
});
---

<Base title="sadcoder.press" lang={lang}>
  <Hero lang={lang} />
  <LineDivider variant="primary" />

  <section>
    <SectionLabel label="最新文章" color="primary" />
    {blogPosts.length === 0 && <p style="color: var(--text-muted);">尚無文章。</p>}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {blogPosts.map((post) => (
        <ArticleCard
          title={post.data.title}
          description={post.data.description}
          date={formatDate(post.data.date, lang)}
          tags={post.data.tags}
          href={`/zh/blog/${getSlug(post.id)}/`}
        />
      ))}
    </div>
  </section>

  <LineDivider variant="accent" />

  <section>
    <SectionLabel label="最新動態" color="accent" />
    {socialPosts.length === 0 && <p style="color: var(--text-muted);">尚無動態。</p>}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {socialPostsWithType.map(({ post, type, threadCount, firstLine }) => (
        <PostCard
          type={type}
          platforms={post.data.platform}
          content={firstLine}
          date={formatDate(post.data.date, lang)}
          href={`/zh/posts/${getSlug(post.id)}/`}
          replyAuthor={post.data.replyTo?.author}
          threadTitle={post.data.title}
          threadCount={threadCount}
          lang={lang}
        />
      ))}
    </div>
  </section>
</Base>
```

- [ ] **Step 3: Verify build and visual check**

Run: `npm run build && npm run preview`
Expected: Build succeeds. Open `http://localhost:4321/` and verify:
- Hero text shows with brand colors
- Article cards display in 2-column grid
- Post cards display in 3-column grid with type color bars
- Line dividers render between sections
- Footer appears at bottom

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/pages/zh/index.astro
git commit -m "feat: redesign homepage with hero, card grids, and dividers"
```

---

### Task 8: Blog Index Pages

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/zh/blog/index.astro`

- [ ] **Step 1: Rewrite English blog index**

Replace `src/pages/blog/index.astro` with:

```astro
---
import Base from '../../layouts/Base.astro';
import SectionLabel from '../../components/SectionLabel.astro';
import ArticleCard from '../../components/ArticleCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../../lib/utils';

const lang = 'en';

const posts = (await getCollection('blog', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Base title="Blog" lang={lang}>
  <div class="pt-10">
    <SectionLabel label="All Articles" color="primary" />
    {posts.length === 0 && <p style="color: var(--text-muted);">No posts yet.</p>}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <ArticleCard
          title={post.data.title}
          description={post.data.description}
          date={formatDate(post.data.date, lang)}
          tags={post.data.tags}
          href={`/blog/${getSlug(post.id)}/`}
        />
      ))}
    </div>
  </div>
</Base>
```

- [ ] **Step 2: Rewrite Chinese blog index**

Replace `src/pages/zh/blog/index.astro` with the same structure:
- `const lang = 'zh';`
- `<SectionLabel label="所有文章" color="primary" />`
- `href={`/zh/blog/${getSlug(post.id)}/`}`
- Empty state: `"尚無文章。"`

```astro
---
import Base from '../../../layouts/Base.astro';
import SectionLabel from '../../../components/SectionLabel.astro';
import ArticleCard from '../../../components/ArticleCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../../../lib/utils';

const lang = 'zh';

const posts = (await getCollection('blog', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Base title="部落格" lang={lang}>
  <div class="pt-10">
    <SectionLabel label="所有文章" color="primary" />
    {posts.length === 0 && <p style="color: var(--text-muted);">尚無文章。</p>}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <ArticleCard
          title={post.data.title}
          description={post.data.description}
          date={formatDate(post.data.date, lang)}
          tags={post.data.tags}
          href={`/zh/blog/${getSlug(post.id)}/`}
        />
      ))}
    </div>
  </div>
</Base>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro src/pages/zh/blog/index.astro
git commit -m "feat: redesign blog index pages with card grid"
```

---

### Task 9: Posts Index Pages

**Files:**
- Modify: `src/pages/posts/index.astro`
- Modify: `src/pages/zh/posts/index.astro`

- [ ] **Step 1: Rewrite English posts index**

Replace `src/pages/posts/index.astro` with:

```astro
---
import Base from '../../layouts/Base.astro';
import SectionLabel from '../../components/SectionLabel.astro';
import PostCard from '../../components/PostCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../../lib/utils';
import { getPostType, getThreadCount } from '../../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

const lang = 'en';

const posts = (await getCollection('posts', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postsWithType = posts.map((post) => {
  const filePath = path.join('src/content/posts', post.id + '.md');
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
  const type = getPostType(post, body);
  const threadCount = type === 'thread' ? getThreadCount(body) : undefined;
  const firstLine = body.split(/\n---\n/)[0].trim();
  return { post, type, threadCount, firstLine };
});
---

<Base title="Posts" lang={lang}>
  <div class="pt-10">
    <SectionLabel label="All Posts" color="accent" />
    {posts.length === 0 && <p style="color: var(--text-muted);">No posts yet.</p>}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {postsWithType.map(({ post, type, threadCount, firstLine }) => (
        <PostCard
          type={type}
          platforms={post.data.platform}
          content={firstLine}
          date={formatDate(post.data.date, lang)}
          href={`/posts/${getSlug(post.id)}/`}
          replyAuthor={post.data.replyTo?.author}
          threadTitle={post.data.title}
          threadCount={threadCount}
          lang={lang}
        />
      ))}
    </div>
  </div>
</Base>
```

- [ ] **Step 2: Rewrite Chinese posts index**

Replace `src/pages/zh/posts/index.astro` with the same structure:
- `const lang = 'zh';`
- `<SectionLabel label="所有動態" color="accent" />`
- `href={`/zh/posts/${getSlug(post.id)}/`}`
- Empty state: `"尚無動態。"`

```astro
---
import Base from '../../../layouts/Base.astro';
import SectionLabel from '../../../components/SectionLabel.astro';
import PostCard from '../../../components/PostCard.astro';
import { getCollection } from 'astro:content';
import { getSlug, formatDate } from '../../../lib/utils';
import { getPostType, getThreadCount } from '../../../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

const lang = 'zh';

const posts = (await getCollection('posts', ({ data }) => data.lang === lang && !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postsWithType = posts.map((post) => {
  const filePath = path.join('src/content/posts', post.id + '.md');
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
  const type = getPostType(post, body);
  const threadCount = type === 'thread' ? getThreadCount(body) : undefined;
  const firstLine = body.split(/\n---\n/)[0].trim();
  return { post, type, threadCount, firstLine };
});
---

<Base title="動態" lang={lang}>
  <div class="pt-10">
    <SectionLabel label="所有動態" color="accent" />
    {posts.length === 0 && <p style="color: var(--text-muted);">尚無動態。</p>}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {postsWithType.map(({ post, type, threadCount, firstLine }) => (
        <PostCard
          type={type}
          platforms={post.data.platform}
          content={firstLine}
          date={formatDate(post.data.date, lang)}
          href={`/zh/posts/${getSlug(post.id)}/`}
          replyAuthor={post.data.replyTo?.author}
          threadTitle={post.data.title}
          threadCount={threadCount}
          lang={lang}
        />
      ))}
    </div>
  </div>
</Base>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/posts/index.astro src/pages/zh/posts/index.astro
git commit -m "feat: redesign posts index pages with type-distinguished card grid"
```

---

### Task 10: Article Detail Pages

**Files:**
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/pages/zh/blog/[slug].astro`

- [ ] **Step 1: Rewrite English article detail page**

Replace `src/pages/blog/[slug].astro` with:

```astro
---
import Base from '../../layouts/Base.astro';
import { getCollection, render } from 'astro:content';
import { getImage } from 'astro:assets';
import { getSlug, formatDate } from '../../lib/utils';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft);
  return posts.map((post) => ({
    params: { slug: getSlug(post.id) },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);

let ogImage: string | undefined;
if (post.data.image) {
  const optimized = await getImage({ src: post.data.image, format: 'jpg', width: 1200 });
  ogImage = optimized.src;
}
---

<Base title={post.data.title} lang="en" description={post.data.description} image={ogImage} narrow>
  <article class="pt-8">
    <div class="flex flex-wrap gap-1.5 mb-4">
      {post.data.tags.map((tag) => (
        <span class="text-[10px] px-2 py-0.5 rounded-full" style="background: var(--tag-bg); color: var(--tag-text);">{tag}</span>
      ))}
    </div>
    <h1 class="text-[32px] font-extrabold leading-tight tracking-tight" style="color: var(--text-primary);">{post.data.title}</h1>
    <p class="mt-3 text-sm" style="color: var(--text-muted);">{formatDate(post.data.date, 'en')}</p>
    <div class="my-6 h-px" style="background: var(--border-main);"></div>
    <div class="prose dark:prose-invert max-w-none">
      <Content />
    </div>
  </article>
</Base>
```

- [ ] **Step 2: Rewrite Chinese article detail page**

Replace `src/pages/zh/blog/[slug].astro` with the same structure, changing:
- `data.lang === 'zh'`
- `lang="zh"`
- `formatDate(post.data.date, 'zh')`

```astro
---
import Base from '../../../layouts/Base.astro';
import { getCollection, render } from 'astro:content';
import { getImage } from 'astro:assets';
import { getSlug, formatDate } from '../../../lib/utils';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'zh' && !data.draft);
  return posts.map((post) => ({
    params: { slug: getSlug(post.id) },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);

let ogImage: string | undefined;
if (post.data.image) {
  const optimized = await getImage({ src: post.data.image, format: 'jpg', width: 1200 });
  ogImage = optimized.src;
}
---

<Base title={post.data.title} lang="zh" description={post.data.description} image={ogImage} narrow>
  <article class="pt-8">
    <div class="flex flex-wrap gap-1.5 mb-4">
      {post.data.tags.map((tag) => (
        <span class="text-[10px] px-2 py-0.5 rounded-full" style="background: var(--tag-bg); color: var(--tag-text);">{tag}</span>
      ))}
    </div>
    <h1 class="text-[32px] font-extrabold leading-tight tracking-tight" style="color: var(--text-primary);">{post.data.title}</h1>
    <p class="mt-3 text-sm" style="color: var(--text-muted);">{formatDate(post.data.date, 'zh')}</p>
    <div class="my-6 h-px" style="background: var(--border-main);"></div>
    <div class="prose dark:prose-invert max-w-none">
      <Content />
    </div>
  </article>
</Base>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/[slug].astro src/pages/zh/blog/[slug].astro
git commit -m "feat: redesign article detail pages with narrow layout and brand typography"
```

---

### Task 11: Post Detail Pages

**Files:**
- Modify: `src/pages/posts/[slug].astro`
- Modify: `src/pages/zh/posts/[slug].astro`

- [ ] **Step 1: Rewrite English post detail page**

Replace `src/pages/posts/[slug].astro` with:

```astro
---
import Base from '../../layouts/Base.astro';
import { getCollection, render } from 'astro:content';
import { getSlug, formatDate } from '../../lib/utils';
import { getPostType, postTypeColors, postTypeLabels, platformColors } from '../../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => data.lang === 'en' && !data.draft);
  return posts.map((post) => ({
    params: { slug: getSlug(post.id) },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const pageTitle = post.data.title || `Post — ${formatDate(post.data.date, 'en')}`;

const filePath = path.join('src/content/posts', post.id);
const rawContent = fs.readFileSync(filePath, 'utf-8');
const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
const type = getPostType(post, body);
const colors = postTypeColors[type];
const typeLabel = postTypeLabels[type].en;
---

<Base title={pageTitle} lang="en" narrow>
  <article class="pt-8">
    {post.data.title && (
      <h1 class="text-[32px] font-extrabold leading-tight tracking-tight mb-4" style="color: var(--text-primary);">{post.data.title}</h1>
    )}
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[10px] px-2 py-px rounded-full" style={`background: ${colors.badgeBg}; color: ${colors.badgeText};`}>{typeLabel}</span>
      {post.data.platform.map((p) => {
        const pc = platformColors[p] || platformColors.twitter;
        const label = p === 'twitter' ? '𝕏' : p;
        return (
          <span class="text-[10px] px-2 py-px rounded-full dark:hidden" style={`background: ${pc.bg}; color: ${pc.text};`}>{label}</span>
          <span class="text-[10px] px-2 py-px rounded-full hidden dark:inline" style={`background: ${pc.darkBg}; color: ${pc.darkText};`}>{label}</span>
        );
      })}
      <span class="text-sm ml-auto" style="color: var(--text-muted);">{formatDate(post.data.date, 'en')}</span>
    </div>
    {post.data.replyTo && (
      <a href={post.data.replyTo.url} target="_blank" rel="noopener noreferrer" class="block mb-4 px-3 py-2 border-l-2 rounded-r text-sm no-underline transition-colors" style={`border-color: var(--brand-primary); background: var(--bg-card-inner);`}>
        <span class="text-xs" style="color: var(--text-muted);">↩ In reply to <span class="font-medium" style="color: var(--brand-primary-text);">@{post.data.replyTo.author}</span></span>
        <p class="mt-1 mb-0 line-clamp-3 text-xs leading-relaxed" style="color: var(--text-secondary);">{post.data.replyTo.content}</p>
      </a>
    )}
    <div class="prose dark:prose-invert max-w-none mb-6">
      <Content />
    </div>
    {post.data.publishedUrl && (
      <div class="pt-4 mt-6 border-t" style="border-color: var(--border-main);">
        <h2 class="text-sm font-semibold mb-2" style="color: var(--text-muted);">Published on</h2>
        <div class="flex gap-3">
          {Object.entries(post.data.publishedUrl).map(([platform, url]) => (
            <a href={url} target="_blank" rel="noopener noreferrer" class="text-sm capitalize hover:underline" style="color: var(--brand-primary-text);">
              {platform}
            </a>
          ))}
        </div>
      </div>
    )}
  </article>
</Base>
```

- [ ] **Step 2: Rewrite Chinese post detail page**

Replace `src/pages/zh/posts/[slug].astro` with the same structure, changing:
- `data.lang === 'zh'`
- `lang="zh"`
- `formatDate(post.data.date, 'zh')`
- `postTypeLabels[type].zh`
- Reply label: `"↩ 回覆"` instead of `"↩ In reply to"`
- Published section title: `"發布於"` instead of `"Published on"`

```astro
---
import Base from '../../../layouts/Base.astro';
import { getCollection, render } from 'astro:content';
import { getSlug, formatDate } from '../../../lib/utils';
import { getPostType, postTypeColors, postTypeLabels, platformColors } from '../../../lib/posts';
import fs from 'node:fs';
import path from 'node:path';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => data.lang === 'zh' && !data.draft);
  return posts.map((post) => ({
    params: { slug: getSlug(post.id) },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const pageTitle = post.data.title || `動態 — ${formatDate(post.data.date, 'zh')}`;

const filePath = path.join('src/content/posts', post.id);
const rawContent = fs.readFileSync(filePath, 'utf-8');
const body = rawContent.replace(/^---[\s\S]*?---\n/, '');
const type = getPostType(post, body);
const colors = postTypeColors[type];
const typeLabel = postTypeLabels[type].zh;
---

<Base title={pageTitle} lang="zh" narrow>
  <article class="pt-8">
    {post.data.title && (
      <h1 class="text-[32px] font-extrabold leading-tight tracking-tight mb-4" style="color: var(--text-primary);">{post.data.title}</h1>
    )}
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[10px] px-2 py-px rounded-full" style={`background: ${colors.badgeBg}; color: ${colors.badgeText};`}>{typeLabel}</span>
      {post.data.platform.map((p) => {
        const pc = platformColors[p] || platformColors.twitter;
        const label = p === 'twitter' ? '𝕏' : p;
        return (
          <span class="text-[10px] px-2 py-px rounded-full dark:hidden" style={`background: ${pc.bg}; color: ${pc.text};`}>{label}</span>
          <span class="text-[10px] px-2 py-px rounded-full hidden dark:inline" style={`background: ${pc.darkBg}; color: ${pc.darkText};`}>{label}</span>
        );
      })}
      <span class="text-sm ml-auto" style="color: var(--text-muted);">{formatDate(post.data.date, 'zh')}</span>
    </div>
    {post.data.replyTo && (
      <a href={post.data.replyTo.url} target="_blank" rel="noopener noreferrer" class="block mb-4 px-3 py-2 border-l-2 rounded-r text-sm no-underline transition-colors" style={`border-color: var(--brand-primary); background: var(--bg-card-inner);`}>
        <span class="text-xs" style="color: var(--text-muted);">↩ 回覆 <span class="font-medium" style="color: var(--brand-primary-text);">@{post.data.replyTo.author}</span></span>
        <p class="mt-1 mb-0 line-clamp-3 text-xs leading-relaxed" style="color: var(--text-secondary);">{post.data.replyTo.content}</p>
      </a>
    )}
    <div class="prose dark:prose-invert max-w-none mb-6">
      <Content />
    </div>
    {post.data.publishedUrl && (
      <div class="pt-4 mt-6 border-t" style="border-color: var(--border-main);">
        <h2 class="text-sm font-semibold mb-2" style="color: var(--text-muted);">發布於</h2>
        <div class="flex gap-3">
          {Object.entries(post.data.publishedUrl).map(([platform, url]) => (
            <a href={url} target="_blank" rel="noopener noreferrer" class="text-sm capitalize hover:underline" style="color: var(--brand-primary-text);">
              {platform}
            </a>
          ))}
        </div>
      </div>
    )}
  </article>
</Base>
```

- [ ] **Step 3: Verify build and full visual check**

Run: `npm run build && npm run preview`
Expected: Build succeeds. Open the site and verify all pages:
- Homepage (en + zh): hero, cards, dividers, footer
- Blog index: card grid
- Posts index: card grid with type colors
- Article detail: narrow layout, styled prose
- Post detail: type badges, reply context
- Toggle dark mode: all pages display correctly

- [ ] **Step 4: Commit**

```bash
git add src/pages/posts/[slug].astro src/pages/zh/posts/[slug].astro
git commit -m "feat: redesign post detail pages with type badges and brand colors"
```

---

### Task 12: Final Build Verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 2: Visual verification checklist**

Run `npm run preview` and check:
- [ ] Homepage (en): hero, article cards, post cards, dividers, footer
- [ ] Homepage (zh): same layout, Chinese text
- [ ] Blog index (en + zh): card grid
- [ ] Posts index (en + zh): card grid with type colors
- [ ] Article detail (en + zh): narrow layout, prose styling, code blocks
- [ ] Post detail — reply (en + zh): reply badge, reply context
- [ ] Post detail — thread (en + zh): thread badge
- [ ] Post detail — standalone (en + zh): post badge
- [ ] Dark mode toggle works on all pages
- [ ] Responsive: resize to mobile width, cards stack to single column

- [ ] **Step 3: Fix any issues found**

Address visual bugs or build errors discovered during verification.

- [ ] **Step 4: Final commit (if needed)**

```bash
git add -A
git commit -m "fix: address visual issues from redesign verification"
```
