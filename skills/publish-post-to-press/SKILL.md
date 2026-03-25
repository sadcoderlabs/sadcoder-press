---
name: publish-post-to-press
description: Publish social media posts from writing workspace to sadcoder-press Astro site. Use when the user says "發布貼文", "publish post", or asks to put a finished post on the website. Handles splitting multilingual content, adding Astro frontmatter, and updating source status.
---

# Publish Post to Press

Publish completed social media posts from the writing workspace to the sadcoder-press Astro site.

## Paths

- **Writing posts**: `writing/posts/`
- **Astro posts content**: `src/content/posts/`

All paths are relative to the repository root.

## Prerequisites

- Post file must exist in `writing/posts/{slug}.md`
- Post `status` in frontmatter must be `published`
- Post must not already have `published_to_press: true`

## Publishing Steps

### 1. Select Post

If the user specifies a post, use that. Otherwise, list all posts in `writing/posts/` where `status: published` and `published_to_press` is not true. Let the user pick.

### 2. Parse Source File

Read `writing/posts/{slug}.md`:

1. Extract YAML frontmatter (type, status, source, platforms, original_language, translations, etc.)
2. Split body by `---lang:{code}---` to get per-language content blocks
3. The first block (before any `---lang:` separator) is the original language
4. Each subsequent `---lang:{code}---` block is a translation

### 3. Determine Tags

Infer 3-5 lowercase English tags from the post content. Propose to user for confirmation.

### 4. Create Astro Content Files

Create directory: `src/content/posts/{slug}/`

For each language block, create `{lang}.md` with frontmatter:

```yaml
---
date: {YYYY-MM-DD}  # from slug date
platform: [{platforms}]  # from source frontmatter
lang: {lang}
tags: [{tags}]
---
```

Notes:
- No `title` field (optional in schema, posts don't need it)
- Post body is written as-is after frontmatter
- Thread `---` separators in the body are preserved (they render as `<hr>` in HTML)
- Do not add `publishedUrl` yet — that comes later when actually published to social platforms

### 5. Build Verification

```bash
npm run build
```

If build fails, fix the issue and retry.

### 6. Update Source File

Add `published_to_press: true` to the frontmatter of `writing/posts/{slug}.md`.

### 7. Commit and Push

```bash
git add -A
git commit -m "content: publish post {slug} to press"
git push origin main
```

## Publishing to X (Separate Action)

This skill does NOT publish to social platforms. When the user wants to publish a post to X:

1. Read the English content from `src/content/posts/{slug}/en.md`
2. Use the `x-account` skill to post the content
   - For threads: post as a Twitter thread
   - For single posts: post as a single tweet
   - Only publish the English version
3. After posting, get the tweet URL
4. Write `publishedUrl.twitter: "{url}"` to BOTH `en.md` and `zh.md` frontmatter
5. Commit and push:
   ```bash
   git add -A
   git commit -m "meta: add twitter url for post {slug}"
   git push origin main
   ```

## Notes

- All Chinese content must be Traditional Chinese (繁體中文)
- Writing workspace originals are not deleted; they are the source of truth
- The `published_to_press` flag prevents double-publishing
