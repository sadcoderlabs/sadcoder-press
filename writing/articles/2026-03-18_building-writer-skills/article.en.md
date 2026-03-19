# How We Built Writer-Skills: A Writing Workflow Powered by AI Agent Skills

## The Problem with AI Writing

Here's how most people use AI to write articles: give it a topic, let it produce a first draft, then edit it yourself. This workflow can cut drafting time by 50-70%, which sounds great.

The problem is that the output reads like canned content. Grammatically correct, well-structured, yet indistinguishable from what anyone else could write. No perspective, no personal experience, no reason for the reader to keep going. Readers generally prefer articles with personal stories, and AI's default output is the opposite of that.

My own experience confirmed this. AI agents write poorly without guidance. Most people focus on making AI "write better," but the real issue isn't writing technique. The preparation phase determines content quality; the writing phase determines how it's expressed. This distinction changed the entire direction of how I later designed Writer-Skills.

## Lessons from the Previous Version

Writer-Skills wasn't my first attempt at using AI agents for writing. I'd previously built a skill for non-fiction writing and hit quite a few walls.

The biggest lesson: you have to prepare enough material for the AI upfront. Who is the reader? What will they gain from reading this? After writing, did you re-read it from the reader's perspective to confirm it delivers what they need? If these questions aren't answered before writing starts, no amount of revision will save it.

Another difficulty was AI's grasp of emotion. What words evoke what feelings has no simple rule you can hand to an AI. Writing is too complex to get right in one shot.

I eventually found an effective approach from Claude's [Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices): provide lots of examples. Every time I revised AI output, I recorded why the change was needed, what I changed it to, and the reasoning. Good examples and bad examples side by side, letting AI understand the difference. These revision records became teaching material themselves, converting the tacit knowledge from human editing into rules AI can learn from.

I spent several days going back and forth adjusting prompts and the skill before the output quality reached an acceptable level.

## Design Philosophy: Using AI to Extract Perspectives

After the previous version's failures, I changed direction. Instead of trying to make AI write better, I focused on having AI help authors extract the material already in their heads.

My colleagues have plenty of interesting things to share, but writing creates too much friction. Especially for people without a writing habit, facing a blank editor is hard enough just to get started.

Writer-Skills replaced the blank editor with conversation. The AI agent asks you questions, and you just answer. "What decisions did you make? Why did you choose this direction? What was unexpected?" After a round of conversation, your perspectives and concrete experiences are extracted into an outline backed by real material. Over time, users learn to run this extraction process themselves, without needing AI's guidance. The tool is more like training wheels.

## Architecture of Three Skills

Writer-Skills consists of three skills: Management, Preparation, and Writing. This split came from two different design perspectives.

Management was designed from the team's point of view. From the start, this skill was built for use by company colleagues together. It handles idea collection and team-level direction: what topics should we write about? Who are our readers? What image do we want to project? These are team-level decisions that, once made, let every author work within the same framework.

Preparation and Writing were distilled from individual writing practice. The actual workflow looks like this: a colleague casually mentions an interesting technical discovery on Slack, and the Management skill captures the idea in ideas.md. When they're ready, the Preparation skill interviews them: "What decisions did you make? Why? What was unexpected?" After the conversation, an outline with concrete material emerges. The Writing skill takes that outline and produces a first draft, which then goes through editorial review and author confirmation.

## Subagent Architecture: Researcher, Writer, Editor

![Researcher, Writer, Editor](assets/writer-editor-researcher.jpg)

The architectural design of Writer-Skills came from an external inspiration: Superpowers' [Brainstorming skill](https://github.com/obra/superpowers/tree/main/skills/brainstorming).

The Brainstorming skill has a subagent review mechanism. After completing a design, it launches an independent subagent with a pre-designed prompt to review the design document. This subagent has a different context from the main agent, so it can examine the output from a fresh angle, uninfluenced by prior conversation history.

This mechanism inspired Writer-Skills' architecture. When writing an article, we need different roles: a researcher to gather external data, a writer to turn material into prose, and an editor to review quality. Each role brings a different angle.

In Writer-Skills, these roles are implemented as independent subagents. Each subagent has its own context, uncontaminated by previous conversation history. The benefit of this separation is that each role carries its own purpose: the author wants to ship the article, the editor looks for what can be improved, and the researcher finds external data that offers different perspectives worth referencing. Their positions differ, but they all make the article better. Agent Skills' progressive disclosure mechanism fits well here: each role loads only the knowledge it needs, keeping the context window lean.

For this article, the researcher subagent spent a few minutes searching for data on the current state of AI writing and the Agent Skills ecosystem. After the first draft, the editor subagent caught several repeated paragraphs and sentence patterns that violated writing rules, issues the main agent easily overlooks during long conversations.

## For Those Who Want to Try

Writer-Skills is open source. If you use Claude Code or another tool that supports Agent Skills, you can install it directly:

```bash
npx skills add sadcoderlabs/writer-skills
```

We've already done a lot of back-and-forth tuning on the writing rules, so you shouldn't need to start from scratch. But everyone's writing style is different. After reading your first output, you'll probably want to tweak a few things. I'd suggest recording the reason behind each revision, then updating the skill's writing rules accordingly. Over time, the writing style will gradually become what you like.

This article itself was written using Writer-Skills. From collecting ideas, preparing material, interviewing to extract perspectives, to the final writing, the entire workflow ran end to end. If you've read this far and thought some sections were decent, that's self-evident proof that the skill writes reasonably well, and the days I spent tuning it weren't wasted.
