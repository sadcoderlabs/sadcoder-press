---
name: publish-to-press
description: Publish articles from the writing workspace to sadcoder-press Astro blog. Use when the user says "publish", "發布", or asks to put a finished article on the website. Handles copying article files, adding Astro frontmatter, copying assets, and updating brief.md status.
---

# Publish to Press

Publish completed articles from the writing workspace to the sadcoder-press Astro blog.

## Paths

- **Writing workspace**: `/root/projects/sadcoder-press/writing/articles/`
- **Astro blog content**: `/root/projects/sadcoder-press/src/content/blog/`
- **Astro posts content**: `/root/projects/sadcoder-press/src/content/posts/`

## Prerequisites

- `brief.md` status must be `review` or `published`
- At least one `article.{lang}.md` must exist

## Publishing Steps

### 1. Read brief.md

Extract from brief.md:
- **Title** (from Article Info)
- **Date** (from Article Info)
- **Original language** (from Article Info)
- **Translations** (from Article Info)
- **Reader takeaway** (from Article Goals → use as `description`)

Determine target collection:
- Default: `blog`
- If the user specifies it's a social post: `posts`

### 2. Determine tags

Infer 3-5 lowercase English tags from the article content. Common tags: `ai`, `writing`, `agent-skills`, `workflow`, `open-source`.

### 3. Create Astro content directory

```
src/content/blog/{YYYY-MM-DD}_{slug}/
```

The directory name matches the writing workspace directory name.

### 4. Create content files

For each `article.{lang}.md` in the writing workspace:

1. Strip the H1 heading (first `# ...` line) from the article body
2. Prepend Astro frontmatter
3. Write to `{lang}.md` (not `article.{lang}.md`)

**Frontmatter format (blog):**
```yaml
---
title: "{title}"
date: {YYYY-MM-DD}
description: "{description}"
tags: [{tags}]
lang: {lang}
---
```

For the English version, translate the title and description to English.

### 5. Copy assets

Copy the entire `assets/` directory if it exists.

### 6. Build verification

Run `npm run build` in the project root to verify no errors.

### 7. Update brief.md

Set status to `published`. If a Publishing section doesn't exist, add one after Article Info:

```markdown
## Publishing
- Target: astro (sadcoder-press)
- Published to: src/content/blog/{YYYY-MM-DD}_{slug}/
- Published at: {today's date}
- Slug: {slug}
```

### 8. Commit and push

```bash
git -C /root/projects/sadcoder-press add -A
git -C /root/projects/sadcoder-press commit -m "content: publish {slug} to blog"
git -C /root/projects/sadcoder-press push origin main
```

## Notes

- All Chinese content must be Traditional Chinese (繁體中文)
- Image references in articles use `./assets/` relative paths; Astro handles optimization automatically
- The writing workspace originals are not deleted; they serve as the source of truth
