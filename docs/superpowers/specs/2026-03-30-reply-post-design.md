# Reply Post Support for sadcoder-press

## Summary

Support "reply" type posts that display a small quote card of the original tweet being replied to, above the post content.

## Changes

### 1. content.config.ts — Add `replyTo` schema

```ts
replyTo: z.object({
  url: z.string().url(),
  author: z.string(),
  content: z.string(),
}).optional(),
```

### 2. Post page `[slug].astro` — Render reply quote card

If `replyTo` exists, render a compact quote card before the post content:
- Small font, gray tones, left border accent
- Shows: "↩ In reply to @{author}" + truncated content + link to original tweet
- Sits above the post content, visually secondary

### 3. publish-post-to-press skill — Handle reply posts

New flow when user provides an already-published reply tweet URL:
1. Fetch reply content via Syndication API
2. Find original tweet from `in_reply_to` + inbox.yaml/candidates.yaml
3. Create `writing/posts/{date}_{slug}.md` with `source: engagement`, `source_tweet`, en content + zh translation
4. Create `src/content/posts/{slug}/en.md` + `zh.md` with `replyTo` frontmatter
5. Build, commit, push

### 4. Data flow

```
x-engagement → inbox.yaml (url + author + content)
→ User replies on X manually
→ User gives posted tweet URL
→ Syndication API: fetch reply content + in_reply_to
→ inbox.yaml: lookup original tweet author + content
→ Create writing/posts/ file (en + zh translation)
→ publish-post-to-press: create Astro content with replyTo
→ Build + deploy
```

### 5. replyTo content language

Original English preserved on both en and zh pages. The quote card always shows the original tweet as-is.
