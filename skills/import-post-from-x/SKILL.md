---
name: import-post-from-x
description: Import a manually posted tweet into sadcoder-press. Use when the user gives you a tweet URL they already posted (reply, quote, or standalone) and wants it archived on the site. Fetches content, translates, creates Astro content files with publishedUrl.
---

# Import Post from X

Import a tweet that was already posted manually on X into sadcoder-press as an archived post. This skill handles the "manual post → site archive" flow — the user posted on X first (often a reply or quote retweet that can't be done via API), and now wants the content on sadcoder-press.

## When to Use

- User gives you a tweet URL they already posted
- The tweet is a reply, quote retweet, or standalone post done manually on X
- User wants it archived on sadcoder-press

## Paths

- **Astro posts content**: `src/content/posts/`
- **Translation rules**: referenced from writer-skills at `skills/article-translation/references/translation-rules.md` (resolve via the symlinked skill path)

All paths are relative to the repository root unless noted.

## Prerequisites

- The tweet must already be posted on X
- User provides the tweet URL

## Import Steps

### Step 1: Fetch Tweet Content

Given the tweet URL (e.g., `https://x.com/sadcoderlabs/status/123`):

1. Use the Twitter Syndication API to fetch the tweet content:
   ```
   https://cdn.syndication.twimg.com/tweet-result?id={tweet_id}&token=x
   ```
2. Extract:
   - **text**: the tweet body
   - **author**: screen name
   - **created_at**: tweet timestamp
   - **in_reply_to** or **quoted_tweet**: if this is a reply or quote, extract the parent tweet's URL, author, and content

If the Syndication API fails, ask the user to paste the tweet content directly.

### Step 2: Determine Context

**If reply or quote retweet:**
- Fetch the parent/quoted tweet content via Syndication API
- Build the `replyTo` or `quotedTweet` frontmatter object:
  ```yaml
  replyTo:
    url: "https://x.com/author/status/123"
    author: "author_handle"
    content: "Original tweet text in English"
  ```
- For the Chinese content file, translate the parent tweet's `content` field to Traditional Chinese

**If standalone post:**
- No `replyTo` or `quotedTweet` needed

### Step 3: Detect Language and Translate

Detect the language of the posted tweet content.

Read translation rules from the writer-skills reference: find `translation-rules.md` via the installed skill path (typically `skills/article-translation/references/translation-rules.md` or the equivalent symlinked location). Follow all punctuation conversion, content element rules, and quality constraints defined there.

**If the tweet is in English:**
- English is the original; translate to Traditional Chinese
- `original_language: en`

**If the tweet is in Chinese:**
- Chinese is the original; translate to English
- `original_language: zh`

Present the translation to the user for confirmation before proceeding. The user may adjust the translation.

### Step 4: Propose Slug and Tags

1. Propose a slug: `{YYYY-MM-DD}_{descriptive-slug}` based on the tweet date and content
2. Propose 3-5 lowercase English tags based on the content
3. Let the user confirm or adjust both

### Step 5: Create Astro Content Files

Create directory: `src/content/posts/{slug}/`

For each language, create `{lang}.md`:

```yaml
---
date: {YYYY-MM-DD}
platform: [twitter]
lang: {lang}
tags: [{tags}]
replyTo:           # only if reply
  url: "{parent_tweet_url}"
  author: "{parent_author}"
  content: "{parent_content_in_this_language}"
publishedUrl:
  twitter: "{the_users_tweet_url}"
---

{post content in this language}
```

Notes:
- `replyTo.content` is in the same language as the file's `lang` (English content in en.md, Chinese translation in zh.md)
- `publishedUrl.twitter` is always the URL the user provided (the tweet they posted)
- Thread `---` separators in the body are preserved
- For quote retweets, use `quotedTweet` instead of `replyTo` (same structure)

### Step 6: Build Verification

```bash
npm run build
```

If build fails, fix the issue and retry.

### Step 7: Commit and Push

```bash
git add -A
git commit -m "content: import post {slug} from X"
git push origin main
```

## Notes

- All Chinese content must be Traditional Chinese (繁體中文)
- This skill does NOT create files in `writing/posts/` — sadcoder-press `src/content/posts/` is the archive for published content
- The engagement inbox (`writing/engagement/inbox.yaml`) is not updated by this skill; pending items are automatically pruned after one week by the x-engagement discovery script
- If the user's posted text differs from the original draft in inbox.yaml, always use the actually posted version (the user may have edited before posting)
