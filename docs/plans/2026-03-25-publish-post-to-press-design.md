# Publish Post to Press — Design

## Overview

New skill `publish-post-to-press` that publishes social media posts from `writing/posts/` to the Astro website at `src/content/posts/`. This skill only handles website publishing. Publishing to social platforms (X/Twitter) is a separate action using the `x-account` skill.

## Decisions

- **Skill location**: `sadcoder-press/skills/` (coupled to the repo), symlinked from maelle workspace
- **Two-step publish**: website first, social platform separately
- **Directory structure**: `src/content/posts/{slug}/zh.md` + `en.md` (same as blog)
- **Title**: optional in schema (posts don't need titles)
- **Thread handling**: body preserves `---` separators, no `type` field in schema
- **List page**: shows full post content (not truncated), detail page kept for shareable links
- **publishedUrl**: shared across languages (zh.md and en.md both get the same twitter URL)

## Schema Change

`content.config.ts` posts collection — `title` changes from required to optional:

```ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    platform: z.array(z.enum(['twitter', 'threads', 'bluesky', 'mastodon'])),
    lang: z.enum(['en', 'zh']),
    tags: z.array(z.string()),
    publishedUrl: z.object({
      twitter: z.string().url().optional(),
      threads: z.string().url().optional(),
      bluesky: z.string().url().optional(),
      mastodon: z.string().url().optional(),
    }).optional(),
    draft: z.boolean().optional().default(false),
  }),
});
```

## Page Changes

### List page (`/posts/` and `/zh/posts/`)
- Render full post content for each item (like a Twitter timeline)
- No title required; if title exists, show it; otherwise show content directly
- Keep date, platform badges, tags

### Detail page (`/posts/{slug}/`)
- Keep as-is for shareable links
- If no title, use date or first line as page `<title>`

## Publish Flow (publish-post-to-press skill)

1. User specifies a post or skill lists all `status: published` posts not yet on press
2. Parse `writing/posts/{slug}.md`: split by `---lang:{code}---` into language blocks
3. Strip writing frontmatter (type/status/source etc.)
4. Infer 3-5 tags, propose to user for confirmation
5. Create `src/content/posts/{slug}/zh.md` + `en.md` with Astro frontmatter
6. Post body written as-is (thread `---` separators preserved)
7. `npm run build` to verify
8. Add `published_to_press: true` to `writing/posts/{slug}.md` frontmatter
9. Git commit & push

## Publish to X (separate action)

When user says "發到 X" or "publish to X":
1. Read English content from `src/content/posts/{slug}/en.md`
2. Use x-account skill to post (thread → twitter thread)
3. Get tweet URL
4. Write `publishedUrl.twitter` to both `en.md` and `zh.md` frontmatter
5. Git commit & push

## File Layout

```
sadcoder-press/
├── skills/
│   ├── publish-to-press/SKILL.md      # existing, moved here
│   └── publish-post-to-press/SKILL.md # new
├── writing/posts/{slug}.md             # source (post-writing output)
└── src/content/posts/{slug}/
    ├── zh.md                           # Astro content
    └── en.md
```

maelle workspace symlinks:
```
~/.openclaw/workspace/team/skills/publish-to-press -> /root/projects/sadcoder-press/skills/publish-to-press
~/.openclaw/workspace/team/skills/publish-post-to-press -> /root/projects/sadcoder-press/skills/publish-post-to-press
```
