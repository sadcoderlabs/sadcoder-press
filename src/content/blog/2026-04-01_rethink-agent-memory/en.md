---
title: "Rethinking AI Agent Memory After the Claude Code Leak"
date: 2026-04-01
description: "How Claude Code and OpenClaw each organize AI agent memory — from cutting-edge design to hands-on practice, with applicable memory management patterns you can take away"
tags: [ai, agent, memory, claude-code, openclaw]
lang: en
---

On March 31, Claude Code's source code was accidentally leaked due to an npm packaging error. [512,000 lines of TypeScript across 1,906 files](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know), and the community had the entire architecture picked apart within hours. Most people were talking about undercover mode and frustration regex, but one word caught my attention: **autoDream**.

We've been exploring memory consolidation for AI agents on OpenClaw. Seeing how a company like Anthropic implements "dreaming" made me want to understand their approach.

## Claude Code's Memory System

Claude Code's memory is organized in three layers, from high-level summaries down to raw detail.

The top layer is MEMORY.md, a plain-text table of contents with brief descriptions. It stores no actual data, only pointers: each line is roughly 150 characters in the format `- [Title](filename.md) — one-line description`. This file is loaded in full into the context at the start of every session, [capped at 200 lines](https://code.claude.com/docs/en/memory). Anything beyond that is silently truncated.

The second layer consists of topic files. Independent markdown files like `debugging.md` and `api-conventions.md`, each focused on a specific domain of knowledge. They aren't loaded at startup. When Claude needs memory from a particular domain, [the system uses a Sonnet model to select the most relevant files from the list](https://sathwick.xyz/blog/claude-code.html) and reads them in.

The third layer is raw conversation transcripts. JSONL transcripts from each session are stored locally, but the system never reads them back into the context in full. When needed, it performs narrow grep searches only. [The system prompt reads: "Only look for things you already suspect matter."](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/agent-prompt-dream-memory-consolidation.md) A hard cap of 200 lines, on-demand loading, grep-only raw data: every layer is designed to save tokens, because [response quality starts to degrade when context window utilization gets too high](https://www.sitepoint.com/claude-code-context-management/).

But storing memory isn't enough. Memory decays. That's what autoDream is for.

Anthropic calls this mechanism "dreaming," seemingly inspired by memory consolidation during human REM sleep. autoDream [runs as a forked subagent in the background](https://sathwick.xyz/blog/claude-code.html) and performs four tasks: first, it scans the current memory state and builds a mental map; then it gathers new signals, paying special attention to "drifted memories," old facts that no longer match the current codebase; next, it consolidates by deleting superseded facts, merging overlapping entries from multiple sessions, and converting "yesterday" into "2026-03-30"; finally, it prunes the MEMORY.md index to keep it within 200 lines.

One design choice in this system stands out to me: **treat their own memory as a hint**. Claude Code's agent is required to verify its memory against the actual codebase before taking action, rather than blindly trusting what it wrote down last time. This is a form of built-in reflection.

Among mainstream AI coding tools, [only Claude Code has built-in memory consolidation](https://claudefa.st/blog/guide/mechanics/auto-dream). Cursor's Memory Bank is a community solution. Windsurf has automatic memory but no consolidation workflow. Everyone is storing memory. Claude Code went one step further: organizing it.

## How We Do It

We're also experimenting with memory consolidation on OpenClaw, but our goals and methods differ from Claude Code's. Claude Code is a productivity tool designed to better handle the tasks users need done. We use OpenClaw more like an AI agent colleague. Whether for individual or team use, what we want from memory consolidation is for this colleague to share observations and suggestions from its own perspective.

Helping users solve problems matters, of course. But we also want to give the agent personality through these everyday memories, letting it find things from its day worth sharing or even complaining about. That said, even though our goals differ, we're just getting started with memory consolidation, and learning from others' approaches is valuable.

We run a daily cron job to consolidate the previous day's session memories. The input is the agent's conversation logs with team members, supplemented by the workspace's git log to make sure nothing is missed. The output is a narrative paragraph followed by a bullet-point summary.

Next, we plan to add monthly consolidation: reviewing each day's notes at the end of every month to identify what's important. Same format, narrative plus bullet points. Each layer of consolidation makes the memory more abstract, gradually converging on what truly matters. In MEMORY.md, we have the agent read today's and yesterday's memories, with links to last month's memory files available when needed.

After studying Claude Code's approach, we realized that beyond time-based segmentation, we should also maintain domain-based memory and update MEMORY.md to make domain memories easier to find. This would give the agent different dimensions for searching through its memories.

All of these memory organization methods aim to make memories available to the agent at the right time. From a functional standpoint, domain-based memory makes a lot of sense. But what if we want to go further and give the agent personality, and even help it find insights from its memories? What's needed to bridge the gap from "memory" to "insight"?

This is why the concept of "reflection" in autoDream caught my attention. Claude Code's reflection is about verifying correctness: is this memory still accurate? We want to explore a different direction: is this memory important? Or rather, why is this memory important? Important memories should ultimately be consolidated into long-term memory through dreaming, internalized as core values, and become the foundation for future interactions with others.

## Memory Gives an Agent a Life

What we ultimately want is for the agent to have its own life memories.

Its "life" is the everyday experience of working alongside us. These memories can become the foundation for a style. Over time, the agent can discover core values and personal traits from its accumulated memories, and form its own style.

This might sound far off. But break the path down and each step is a concrete engineering problem: daily consolidation so it can remember things; monthly distillation so it can tell what matters; once it knows what matters, it develops preferences; once it has preferences, it develops perspectives.

Can reflection help an agent decide what's worth remembering longer? That's what we're going to explore next. Claude Code's autoDream demonstrated that memory consolidation can be engineered. The question ahead is whether consolidation can go beyond logical organization to incorporate value judgments, ultimately laying the foundation for an agent's individual character.
