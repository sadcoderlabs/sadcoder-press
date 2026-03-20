## Research Notes

### Research Questions
1. 遊戲設計中的成癮機制：variable ratio reinforcement（隨機正向反饋）、progression systems、投入感（sunk cost / IKEA effect）在遊戲設計文獻裡怎麼被描述？vibe coding 的體驗對應到哪些具體機制？
2. 現有的多人 agent / collaborative AI coding 案例：有沒有已經在做「多人一起用 AI agent」的產品或實驗？非同步協作的 agent 之間怎麼互動？

---

### Findings

#### Q1：遊戲設計成癮機制 vs. Vibe Coding 體驗

##### Variable Ratio Reinforcement（隨機正向反饋）

B.F. Skinner 的操作制約理論指出，**variable ratio schedule（VR）**是所有增強排程中最能維持行為的一種——因為獎勵出現的時機完全不可預測，讓人持續投入以期待下一次命中。老虎機正是以此為核心設計：每次拉把都不知道有沒有獎，這種不確定性本身就驅動行為持續。

ScienceDirect（2023）的研究〈Engineered highs: Reward variability and frequency as potential prerequisites of behavioural addiction〉進一步指出，數位科技讓工程師能以「幾乎無限的多樣性與速度」遞送非藥物性獎勵，使許多原本在自然環境中不會成癮的活動，在數位介面下具有成癮潛力。

**Vibe coding 的對應**：
- nmn.gl 的開發者 Naman 明確指出：「等待 AI 回應的 30 秒，可視為一種 variable ratio schedule——在不可預測的間隔中隨機遞送獎勵——與老虎機、社群媒體讓人上癮的心理模式完全相同。」
- UX Collective 的文章〈The perverse incentives of Vibe Coding〉也描述：「vibe coding 運作在 variable-ratio reinforcement 的原則上。不同於固定獎勵，這種間歇性成功模式（程式跑通了！太神了！）能強力驅動持續嘗試。」
- Arxiv 研究（2025）〈Vibe Coding in Practice〉發現，在分析的文章中，最常見的體驗主題（64%）是「即時成功與 flow」，受訪者形容這個過程「快速、簡單，幾乎像魔法」，並用「dopamine hit」來描述原型完成時的感受。

##### Flow 理論與「Dark Flow」

Csikszentmihalyi 的 flow 理論定義：技能與挑戰匹配、有清楚目標與即時反饋時，人會進入完全投入的「心流」狀態。遊戲設計界以此為核心依據設計關卡難度曲線與反饋系統。

fast.ai 的文章〈Breaking the Spell of Vibe Coding〉（2026）引入「dark flow」概念（源自賭博研究文獻）：賭博機器刻意模糊輸贏的邊界，例如多線老虎機的「Loss Disguised as a Win（LDW）」——輸錢了，但機器播出勝利音效，觸發類似真實獲勝的多巴胺反應。Csikszentmihalyi 本人也定義了「junk flow」：「一種讓你成癮於表面體驗的 flow——在開始時可能是真實的 flow，但後來變成你上癮的東西，而非讓你成長的東西。」

Vibe coding 的體驗被描述為接近「dark flow / junk flow」：開發者 Armin Ronacher 在他著名的〈agent psychosis〉貼文中描述自己連續兩個月瘋狂提示 AI、構建了大量從未使用的工具，「感覺很棒，但後來意識到根本沒有用到。」

##### Progression Systems 與投入感（Sunk Cost / IKEA Effect）

**Sunk cost fallacy in games**：Medium 文章（Milijana Komad，2023）分析，漸進式遊戲透過「如果你現在放棄，你在過去投入的一切就白費了」這個心理，讓玩家繼續下去。時間、資源、情感的投入越多，越難放棄。

**IKEA Effect**：人們對自己親手（即便只是部分）完成的事物賦予更高價值。IxDF 的設計文獻指出，在遊戲化設計中，「當用戶通過不同等級或階段時，IKEA effect 會強化成就感」。

**Vibe coding 的對應**：
- 每一輪 prompt-response 都是「投入」——你花時間描述需求、調整提示、等待輸出，這些都是 sunk cost，讓人更想繼續到「終於跑通」的那一刻。
- AI 生成的程式碼雖非自己手寫，但用戶往往感覺「這是我的想法，我引導出來的」——符合 IKEA effect 的邏輯，對結果有強烈所有感。
- Gacha 遊戲研究（Academia.edu，2023）顯示，near-miss effect（差一點就成功）也顯著強化持續行為——vibe coding 的「AI 的答案差一點就對了，再試一次」也對應這個機制。

##### 對立/批評觀點

並非所有人都認為 vibe coding 本質上像遊戲成癮：
- wave-access.com 的分析認為，vibe coding 的核心轉變是「從自己寫程式，到決定把哪個大任務交給 AI，然後驗證結果是否正確」——這是職責的轉移，不一定是成癮性設計。
- Wikipedia 的 vibe coding 條目指出，這是一種「軟體開發實踐」，本質是生產力工具的使用模式。批評者認為上癮感來自開發者自身的心理投射，而非工具設計刻意為之。

**Sources:**
- [Breaking the Spell of Vibe Coding — fast.ai](https://www.fast.ai/posts/2026-01-28-dark-flow/) — 核心參考：「dark flow」與「junk flow」框架，詳細分析 vibe coding 為何讓開發者上癮，並對比真實 flow 與賭博性心流的差異
- [Vibe Coding Is Creating Braindead Coders — nmn.gl](https://nmn.gl/blog/vibe-coding-gambling) — 開發者親身告白，明確點出 variable ratio schedule 在 AI 等待中的運作
- [The perverse incentives of Vibe Coding — UX Collective](https://uxdesign.cc/the-perverse-incentives-of-vibe-coding-23efbaf75aee) — 從 UX/產品設計角度分析 vibe coding 的 variable-ratio reinforcement 機制
- [Vibe Coding in Practice: Motivations, Challenges, and a Future Outlook — arXiv](https://arxiv.org/html/2510.00328v1) — 灰色文獻系統性回顧，64% 主題為「即時成功與 flow」，含 dopamine hit 描述
- [Engineered highs: Reward variability and frequency — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0306460323000217) — 學術研究，說明數位獎勵可工程化設計成癮潛力
- [The Exploitation of the Sunk Cost Fallacy in Video Game Design — Medium](https://medium.com/@milijanakomad/product-design-and-psychology-the-exploitation-of-the-sunk-cost-fallacy-in-video-game-design-d60385e39fec) — 遊戲設計如何利用 sunk cost fallacy 留住玩家
- [Gacha Mechanics in Video Game Design — Academia.edu](https://www.academia.edu/105465335/Product_design_and_psychology_Exploring_Gacha_Mechanics_in_Video_Game_Design) — near-miss effect 與 sunk cost 在 gacha 遊戲中的研究
- [The flow theory applied to game design — Game Developer](https://www.gamedeveloper.com/design/the-flow-applied-to-game-design) — Csikszentmihalyi flow 理論在遊戲設計的標準應用說明
- [Flow Experience in Gameful Approaches — Tandfonline](https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2470279) — 2025 系統性文獻回顧，flow 理論在遊戲化設計的研究現狀
- [Variable Ratio Schedule — Discovery ABA](https://www.discoveryaba.com/aba-therapy/variable-ratio-examples-and-schedule) — VR schedule 的基礎心理學解釋，含老虎機案例

**Key insights:**
- Vibe coding 的等待-回應週期（prompt → wait → output）在心理上等同於老虎機的拉把-等待-結果，是 variable ratio schedule 的數位化實作
- 「差一點就成功」（near-miss effect）在 vibe coding 中以「AI 快跑通了，再 debug 一次」的形式出現，強化持續投入
- 用戶對 AI 生成結果的「所有感」（IKEA effect）可能高於對純機器輸出的感受，因為 prompt 工程本身是一種「參與建造」
- fast.ai 提出的「dark flow / junk flow」是比「成癮」更精確的框架：體驗上像 flow，但不讓你成長，且你事後往往感到空虛
- 批評觀點：有別於成癮論，部分研究者認為 vibe coding 只是工具使用模式的轉移，上癮感是個體差異，而非工具設計刻意造成

---

#### Q2：多人 Agent / Collaborative AI Coding 的現有案例

##### 學術/研究層：多 Agent 協作系統

**ChatDev**（OpenBMB/清華大學）是最早期的代表性研究。ChatDev 1.0 設計了一個「虛擬軟體公司」，包含 CEO、CTO、工程師、測試員等角色，各由 LLM 扮演，透過 chat chain（溝通鏈）協作完成整個軟體開發週期。arXiv 論文（2307.07924）說明其核心是「communicative dehallucination」機制，讓 agent 在溝通中互相校正幻覺。

ChatDev 2.0（2025）引入 MacNet（Multi-Agent Collaboration Networks），允許 agent 之間以複雜的拓撲結構溝通，而不只是線性鏈條。2025 年 NeurIPS 論文《Multi-Agent Collaboration via Evolving Orchestration》被接受。

**AutoGen**（微軟）是多 agent 非同步協作的代表框架。它明確支援 human-in-the-loop 監督，讓 agent 在協作過程中能隨時與人互動。Codecademy 分析指出 AutoGen「為多 agent 協作與非同步任務執行量身打造」。

##### 商業產品層：單人 → 多人 agent 演進

**Devin**（Cognition AI）：世界首個「完全自主」AI 軟體工程師。後期版本加入多 agent 能力，一個 Devin 可以 dispatch 任務給其他 Devin。Devin 透過 Slack 整合進入團隊工作流，讓人類用熟悉的介面指派任務、接收進度更新——這是「人類+AI agent 非同步協作」的實際商業形態。

**Cursor 2.0**（2025 年底）：引入 parallel agents 功能，最多可同時啟動 8 個 agent 在同一個 codebase 的隔離分支上工作。用 Git worktrees 避免 agent 互相踩踏。這是「多 agent 平行作業同一 repo」的具體技術方案，但目前還是單一使用者控制多個 agent，而非多個人類同時協作。

**GitHub Copilot Coding Agent**（2025-2026）：從 in-editor 助手演化成整合進 GitHub 平台的非同步 coding agent。GitHub Blog 的文章〈What's new with GitHub Copilot coding agent〉描述了「repository-native orchestration」與「multi-agent workflows that stay inspectable, predictable, and collaborative」的設計模式。GitHub Copilot Spaces 讓團隊共享知識庫與文件，維持團隊一致性。

**0x2AI**（實驗性專案）：由社群開發者構建的「多引擎 AI 協作平台」，讓 Claude、Gemini、Codex 透過共享聊天室即時協作，在 demo 中展示 5 個 AI 引擎同時診斷與修復程式碼 bug。

**Agentmaxxing（2026）**：新興實踐，描述「盡可能平行跑最多 AI coding agent」的策略——Claude Code、Codex、Gemini CLI、Cursor 各自處理不同任務，人類負責 review 和 merge 結果。vibecoding.app 的文章是最早正式命名這個實踐的文章之一。

##### 多人「一起 vibe coding」的現狀

**Google AI Studio**（2026 年 3 月，剛發布）：開始支援用戶一起在共享、互動的環境中協作 vibe code 多人即時遊戲——這是最接近「多人 vibe coding」的商業產品實驗。

目前大多數工具仍是**單人使用 agent**，而非**多人共同使用同一 agent**。多人協作的主要形式是：
1. 透過版本控制（Git PR review）讓 AI agent 在異步流程中介入（Devin、GitHub Copilot agent）
2. 多個 agent 平行執行，由單一人類 orchestrate（Cursor 2.0、agentmaxxing）
3. 學術系統中的多 agent 角色扮演（ChatDev）

**非同步 agent 互動機制**：
- Chat chain：agent 透過結構化對話輪流交棒（ChatDev）
- Task dispatch：主 agent 把子任務分派給其他 agent（Devin multi-agent）
- Worktree isolation：各 agent 在獨立分支工作，最後由人類 merge（Cursor 2.0）
- Message queue/Slack integration：人類與 agent 透過既有溝通工具非同步互動（Devin）

**Sources:**
- [ChatDev: Communicative Agents for Software Development — arXiv](https://arxiv.org/abs/2307.07924) — 多 agent 協作軟體開發的學術奠基論文，chat chain 與角色分工機制
- [ChatDev GitHub Repo (OpenBMB)](https://github.com/OpenBMB/ChatDev) — ChatDev 1.0/2.0 的實作細節，含 MacNet 多 agent 網路拓撲說明
- [Devin AI — Wikipedia](https://en.wikipedia.org/wiki/Devin_AI) — Devin 的演化歷程，包含多 agent dispatch 能力的加入
- [Devin — devin.ai](https://devin.ai/) — 官方說明 Devin 如何與人類團隊非同步協作（migration/refactoring 任務模型）
- [Cursor 2.0 Parallel Agents — DevOps.com](https://devops.com/cursor-2-0-brings-faster-ai-coding-and-multi-agent-workflows/) — Cursor 2.0 多 agent 平行功能介紹
- [Parallel Agents — Cursor Docs](https://cursor.com/docs/configuration/worktrees) — Git worktrees 隔離多 agent 的技術方案
- [What's new with GitHub Copilot coding agent — GitHub Blog](https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-coding-agent/) — GitHub Copilot 的 repository-native orchestration 與多 agent 設計模式
- [Agentmaxxing — vibecoding.app](https://vibecoding.app/blog/agentmaxxing) — 新興的「平行跑多個 AI agent」實踐命名與描述
- [r/ClaudeAI: Multi-agent orchestration — Reddit](https://www.reddit.com/r/ClaudeAI/comments/1pgmiox/multiagent_orchestration_is_the_future_of_ai/) — 社群討論，含 0x2AI 多引擎協作 demo
- [Google AI Studio real-time multiplayer vibe coding — Gnoppix Forum](https://forum.gnoppix.org/t/google-ai-studio-now-lets-you-vibe-code-real-time-multiplayer-games/5127) — Google AI Studio 最新多人 vibe coding 功能（2026 年 3 月）
- [AI Multi-Agent Development Platforms 2025 — CoCoding.ai](https://cocoding.ai/blog/vibe-coding-platform-guide-2025/) — 2025 年多 agent 平台全景概覽

**Key insights:**
- 目前「多人 vibe coding」幾乎還不存在——現有產品的「多 agent」是單人控制多 agent，而非多人協同
- 最接近「多人版」的形態是：Devin 透過 Slack 整合進人類團隊，在 PR/issue 的異步流程中作為「team member」存在
- Cursor 2.0 的 parallel agents + Git worktrees 是技術上最成熟的「多 agent 不互相踩踏」解法，但仍是單人視角
- ChatDev 的角色分工（CEO/CTO/工程師）提供了一個想像框架：如果多人 vibe coding，每個人也許代表不同「角色」或「視角」
- Google AI Studio 的多人協作功能（2026 年 3 月剛發布）是最接近「多人一起 vibe code」的商業實驗，值得持續追蹤
- Agentmaxxing 作為一種新興個人實踐，可能是「多人版」的前身：現在一個人 orchestrate 多個 agent，未來可能多個人 orchestrate 共享的 agent 網路
