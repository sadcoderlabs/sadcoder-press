# Review Report — Fact-Check (Round 1)

## Summary

- **Status:** Issues Found
- **Issues count:** 3 issues identified
- **Overview:** The article's factual claims are largely accurate and well-sourced. The three issues found are all incorrect link attributions — the claims themselves are reasonable but the hyperlinks pointed to sources that did not actually contain the referenced information. One claim was also slightly overstated with a specific "150K tokens" number not supported by the linked source.

## Changes

### 1. Incorrect link for "forked subagent" claim

- **Location:** "Claude Code 的記憶系統" section, paragraph about autoDream
- **Claim:** autoDream runs as a "forked subagent" in the background
- **Original:** > autoDream [以 forked subagent 的方式在背景執行](https://claudefa.st/blog/guide/mechanics/auto-dream)
- **Revised:** > autoDream [以 forked subagent 的方式在背景執行](https://sathwick.xyz/blog/claude-code.html)
- **Reason:** The claudefa.st article describes autoDream as running in a "separate process" but does not use the term "forked subagent." The sathwick.xyz reverse-engineering blog is the source that actually describes the forked subagent architecture.

### 2. Unsupported "150K tokens" claim with wrong source link

- **Location:** "Claude Code 的記憶系統" section, paragraph about token economy
- **Claim:** Context window quality degrades beyond approximately 150K tokens
- **Original:** > 因為 [context window 超過約 150K tokens 後，回答品質就會開始下降](https://discuss.huggingface.co/t/claude-code-source-leak-production-ai-architecture-patterns-from-512-000-lines/174846)
- **Revised:** > 因為 [context window 使用量過高時，回答品質就會開始下降](https://www.sitepoint.com/claude-code-context-management/)
- **Reason:** The Hugging Face forum article contains no mention of 150K tokens or any specific token threshold. The specific "147,000-152,000 tokens" figure in research.md was not traceable to that source. Revised to remove the unverifiable number and link to a source that does discuss context quality degradation.

### 3. Incorrect link for "only AI coding tool with memory consolidation" claim

- **Location:** "Claude Code 的記憶系統" section, final paragraph
- **Claim:** Claude Code is the only mainstream AI coding tool with built-in memory consolidation
- **Original:** > 目前主流的 AI coding tool 裡，[只有 Claude Code 內建了記憶整理機制](https://dev.to/pockit_tools/cursor-vs-windsurf-vs-claude-code-in-2026-the-honest-comparison-after-using-all-three-3gof)
- **Revised:** > 目前主流的 AI coding tool 裡，[只有 Claude Code 內建了記憶整理機制](https://claudefa.st/blog/guide/mechanics/auto-dream)
- **Reason:** The dev.to comparison article does not discuss memory consolidation mechanisms. The revised link points to the claudefa.st article which details autoDream as a unique memory consolidation feature.

## Verified Claims (No Issues Found)

1. Leak date: March 31 — Confirmed by VentureBeat, The Register, Fortune
2. 512,000 lines of TypeScript, 1,906 files — Confirmed by VentureBeat and CryptoBriefing
3. npm packaging error — Confirmed by Anthropic's own statement
4. MEMORY.md 200-line / 25KB limit — Confirmed by official docs
5. Sonnet-powered relevance selector — Confirmed by sathwick.xyz
6. System prompt: "only look for things you already suspect matter" — Confirmed via GitHub source
7. autoDream four-phase process — Confirmed by claudefa.st and sathwick.xyz
8. REM sleep inspiration — Confirmed by claudefa.st and MindStudio
9. "Treat memory as hint" design philosophy — Confirmed by VentureBeat
10. Cursor Memory Bank is a community solution — Confirmed by community forum
11. Windsurf has auto memory but no consolidation — Confirmed by Windsurf docs
