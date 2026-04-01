---
date: 2026-04-01
platform: [twitter]
lang: en
tags: [ai, agent, memory, claude-code, openclaw]
publishedUrl:
  twitter: "https://x.com/sadcoderlabs/status/2039234979348222115"
---

Claude Code's source code was accidentally leaked via an npm packaging error. 512K lines of TypeScript. Most people focused on undercover mode, but autoDream caught my attention. It's the only mainstream AI coding tool with built-in memory consolidation. 🧵

---

Claude Code's memory has three layers. MEMORY.md is an index, loaded at startup, capped at 200 lines. Second: topic files, domain-specific markdown loaded on demand via Sonnet. Third: raw transcripts, grep-only, never read back in full. Every layer saves tokens.

---

autoDream runs as a background subagent. Four steps: scan memory state, find 'drifted memories' mismatched with the codebase, consolidate into topic files (delete contradictions, merge overlaps, fix relative dates), prune MEMORY.md to 200 lines / 25KB.

---

The design choice that stood out most: treat memory as a hint. The agent is required to verify its memory against the actual codebase before acting. Memory is a clue, not a fact.

---

We do memory consolidation on OpenClaw too, in a different direction. What we want to explore: is this memory important? Why? Let the agent develop preferences and perspectives from its memories.

Full analysis 👇
https://sadcoder-press.vercel.app/blog/rethink-agent-memory/
