---
title: "Integrating Claude Remote Control with OpenClaw"
date: 2026-03-24
description: "Turning Claude Code into an OpenClaw-like experience with one command, testing the bridging process and interface differences, and personal reflections on when tools become too convenient"
tags: [ai, agent, openclaw, claude-code, remote-control]
lang: en
---

When I discovered that Claude Code had added a remote control feature, an idea clicked: if I set up remote control in the same workspace, I could talk to my AI agent from both the Claude App and Discord. So I told my OpenClaw agent: "Set up a daemon with this command."

```
claude remote-control --permission-mode bypassPermissions
```

I pointed it to the workspace directory, and OpenClaw spun up a persistent service called "Claude remote." I opened the Claude App on my phone, connected, and a green-lit session appeared, ready for conversation.

Claude could access every resource on this VPS, with exactly the same capabilities as my original OpenClaw setup. All credentials live in a 1Password vault, accessed by the agent only when needed. They're not sitting in the filesystem, so bypassPermissions was an acceptable risk for me.

The whole setup took less than ten minutes.

## First Impression: This Is Still Claude Code, Not OpenClaw

At first, the experience was almost indistinguishable from regular Claude Code. It could write code, edit files, run commands. But it lacked the sense of wonder I felt when I first used OpenClaw. OpenClaw and Claude Code have nearly identical capabilities, but Claude Code helps me **write code**, while OpenClaw helps me **solve problems**, using its ability to write code as a means to build tools and get things done.

The first gap I noticed was that Claude Code wasn't picking up the markdown files that OpenClaw had carefully structured as its prompt.

When OpenClaw starts up, it dynamically merges all the `.md` files in the workspace directory, adds the currently available tools, and assembles a complete system prompt. That prompt contains your preferences, your memory, your skill catalog, your tool configurations, and even the AI agent's self-description. Claude Code doesn't read any of these files.

[A comparison article from DataCamp](https://www.datacamp.com/blog/openclaw-vs-claude-code) framed it well: Claude Code is "safe, reliable, and specialized," while OpenClaw is "general-purpose, messy, and expansive." That gap was immediately obvious in the remote control experience.

## Bridging the Gap: One CLAUDE.md Away

So I asked Claude to do one thing: study OpenClaw's system prompt structure.

After it finished, I asked it to write a `CLAUDE.md` that translated OpenClaw's prompt architecture into a format Claude Code could understand. The `CLAUDE.md` looked roughly like this:

```markdown
# CLAUDE.md

## Runtime Environment

This workspace is shared by Claude Code and OpenClaw:
- Claude Code: the current runtime, handling interactive conversations and task execution
- OpenClaw: running on the same machine, handling scheduled tasks and notifications
- Both share the same files (memory, persona settings, tool lists, etc.)

## Before Starting a Conversation

Read the following files for full context:
1. SOUL.md - Persona and communication style
2. USER.md - User background
3. TOOLS.md - Environment settings, APIs, local tool notes
4. MEMORY.md - Long-term memory

## Project Structure

├── memory/          # Daily notes
├── 10-projects/     # Active projects
├── 30-resources/
│   ├── skills/      # Custom skills
│   ├── cron-jobs/   # Scheduled tasks
│   └── scripts/     # Utility scripts
└── canvas/          # Working drafts
```

After writing `CLAUDE.md`, it was getting closer. Then I created a symbolic link from OpenClaw's skills directory to `.claude/skills/`, restarted remote control, and everything felt familiar.

Claude started reading my memory files, using my custom skills, and responding in the tone I was used to. Its behavior was already very close to the original OpenClaw. Especially after adding [playwright-cli](https://github.com/microsoft/playwright-cli) as a browser, the frustration of Claude Code's WebFetch stopping to ask for permission every time dropped significantly.

This surprised me too. One `CLAUDE.md` plus one skills symlink, and the bridging threshold was far lower than I expected.

## Model Vendors Pushing Forward

After bridging, I started interacting with it through the Claude App. Unlike Discord or Slack, the Claude App was natively designed as an interface for talking to agents, so interactions like tool usage are presented a bit better than in messaging apps built for human-to-human communication. One interesting discovery: neither Discord nor Slack can interrupt an agent mid-execution (like telling it to stop), since messaging apps never needed that feature. But on the Claude App, you can stop the agent's execution at any time.

![Claude Desktop App connected to an openclaw-remote-control session](./assets/claude-app-openclaw-session.png)

Some newer interface features aren't available in Claude Code yet. For example, the Chat interface now supports [interactive diagrams](https://www.youtube.com/watch?v=Ii99RU3mOJM) for explaining concepts. If these tools eventually become available to general-purpose agents like OpenClaw, that would be even more convenient. General-purpose messaging apps would need significantly more modification to add these features compared to a purpose-built app.

Anthropic has recently rolled out three related features in rapid succession. [Remote Control](https://code.claude.com/docs/en/remote-control) lets you connect back to a local Claude Code session from your phone or browser. [Channels](https://code.claude.com/docs/en/channels) pushes events from external platforms (Telegram, Discord) into a Claude Code session, enabling event-driven automation. [Dispatch](https://www.forbes.com/sites/ronschmelzer/2026/03/20/claude-dispatch-lets-you-control-claude-cowork-with-your-phone/) extends the Cowork feature in Claude Desktop, letting you assign tasks to your desktop from your phone. Together, Anthropic is trying to transform Claude Code from "an IDE agent you can only use at your desk" into "an agent partner you can reach anytime."

Wharton professor Ethan Mollick [said on X](https://x.com/emollick/status/2034067677157679379) after Dispatch launched that it could already handle 90% of what he previously used OpenClaw for. I still use OpenClaw more often, but the gap is clearly shrinking.

## Missing Features and Solid Infrastructure

So where exactly is that remaining gap?

When I use OpenClaw on Slack/Discord, different tasks go in different channels. Writing in one channel, project management in another, with threads for focused discussions within each. The Claude App currently only has one session. You can't create a second session for parallel work, and you can't even `/new` to clear the session's memory.

Scheduling is another gap. OpenClaw has a full cron job system for automated scheduled tasks. Claude Code has a `loop` command for simple repetition, but it's far from a proper scheduling tool. The Claude Desktop version already has scheduling, but it hasn't been connected to the remote control architecture yet.

The mobile experience also needs polish. Every time I reconnect to a session from my phone, I have to wait a while before the conversation history appears. It looks like there's no caching, and it reloads everything from scratch.

But these are ultimately things that "haven't been built yet," not things that "can't be built."

After this trial, I got the sense that LLM vendors already have the infrastructure needed to build something very close to OpenClaw. The only question is where they choose to focus their attention and which direction they want to move.

One `CLAUDE.md`, one skills symlink, one startup command. If that's enough to replicate 60-70% of OpenClaw, the infrastructure is clearly solid. The question becomes whether entering this space has strategic value for them.

But perhaps looking at it the other way around, they've tried before but were too cautious. The emergence of OpenClaw and its market reception may have given them more confidence to move in this direction.

## The Value of the Experiment

Our team uses OpenClaw every day. Every member uses it as a work and life assistant. Company operations run through OpenClaw in Slack too, from leave requests and calendars to idea management. But we're not opposed to trying other tools, which is exactly why we tried Claude remote control.

OpenClaw is fundamentally a bold experiment. It gives an agent a full computer and lets it freely solve problems. That's dangerous, with plenty of security concerns. But beneath the danger, many interesting things are happening.

Even with security concerns, experiments like this still deliver value. It's like when humans first harnessed fire as a tool. It was unstable and dangerous, but amid the chaos and fumbling, someone could still stare into the flame, their mind racing with visions of all the ways fire would shape the future.

I'm grateful that a project like OpenClaw exists. If you ask friends outside this industry, you'll find that almost no one uses anything like it. I feel fortunate to have glimpsed what the future might look like, and to reconsider: if life becomes overwhelmingly convenient, what remains that's truly valuable?

These aren't answers you can find by having your agent do deep research. They're conclusions each person has to arrive at through their own reflection.
