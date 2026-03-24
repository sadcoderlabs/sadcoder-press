## Research Notes

### Research Questions

1. Claude Code remote control 是什麼？官方文件怎麼描述這個功能、支援哪些操作、怎麼設定？
2. 社群怎麼用 remote control？開發者社群（Twitter、GitHub discussions、Reddit）對 remote control 的使用心得和評價，有沒有人拿來做「不只是寫程式」的事？
3. Claude Code vs 通用 agent 平台（如 OpenClaw）的定位差異：目前有沒有人討論過 coding agent 跟通用 agent 之間的界線？有什麼觀點？
4. Claude Code 的新功能 "channel" 和 "dispatch" 是什麼？官方文件怎麼描述、怎麼使用、跟 remote control 有什麼關係？

---

### Findings

#### 1. Claude Code remote control 是什麼？官方文件怎麼描述這個功能、支援哪些操作、怎麼設定？

**官方定義：** Remote Control 是 Claude Code 在 2026 年 2 月推出的功能（research preview），讓使用者可以在 claude.ai/code 或 Claude 手機 app（iOS/Android）上連線到本機正在執行的 Claude Code session，不把任何東西移到雲端。官方強調這是一個「同步層」，不是雲端運算替代品。

**支援的操作：**
- 在桌機啟動 session，從手機、平板或其他瀏覽器繼續操作
- 本地 filesystem、MCP server、工具設定全部保持可用
- 可從 terminal、瀏覽器和手機同步互動（訊息即時同步）
- 即使筆電睡眠或網路中斷，機器恢復後 session 自動重連

**三種啟動方式：**
1. **Server mode**：`claude remote-control`——專用 server，等待遠端連線，顯示 session URL 和 QR code
2. **Interactive mode**：`claude --remote-control`（或 `--rc`）——正常 interactive session + 遠端同步，本機也可打字
3. **From existing session**：`/remote-control`（或 `/rc`）——在已開啟的 session 中啟用

**主要 flags：**
- `--name "My Project"`：設定 session 名稱
- `--spawn <mode>`：`same-dir`（預設）或 `worktree`（每個遠端 session 建立獨立 git worktree）
- `--capacity <N>`：最大同時 session 數（預設 32）
- `--sandbox` / `--no-sandbox`：開關 filesystem/network isolation

**需求與限制：**
- 需要 Claude Code v2.1.51+
- 支援 Pro、Max、Team、Enterprise（Team/Enterprise 需 admin 先在後台開啟）
- API key 不支援，需 claude.ai 帳號登入
- 不等於「Claude Code on the web」（那個才是跑在雲端）

**Sources:**
- [Continue local sessions from any device with Remote Control — Claude Code Docs](https://code.claude.com/docs/en/remote-control) — 官方文件，完整功能說明與設定步驟
- [Anthropic just released a mobile version of Claude Code called Remote Control — VentureBeat](https://venturebeat.com/orchestration/anthropic-just-released-a-mobile-version-of-claude-code-called-remote) — 媒體報導，補充上市背景與產品定位
- [Claude Code Remote Control: A 3-Minute Overview — SmartScope](https://smartscope.blog/en/generative-ai/claude/claude-code-remote-control/) — 實用比較框架（Remote Control vs SSH+tmux+Tailscale）
- [Claude Code Remote Control: Run Your Terminal from Your Phone — NxCode](https://www.nxcode.io/resources/news/claude-code-remote-control-mobile-terminal-handoff-guide-2026) — 實作心得與 gotchas

**Key insights:**
- Remote Control 的核心主張：「Claude 還是跑在你的機器上，手機只是一扇窗」，強調 local-first 而非 cloud migration
- VentureBeat 報導指出，product manager Noah Zweben 的行銷語言強調「flow state」和「lifestyle upgrade」，而非純技術功能
- 初始 rollout 僅限 Max 方案（$100-200/月），後來擴展到所有方案
- 因為 session 還是跑在本機，機器關機或睡眠就斷線，這是與 OpenClaw 的根本差距

---

#### 2. 社群怎麼用 remote control？有沒有人拿來做「不只是寫程式」的事？

**社群初始反應（2026 年 2 月）：**
- Reddit r/ClaudeAI 貼文 276 讚、86 留言，整體熱度高
- 代表性留言：「Native support > third-party workarounds every time. Every Anthropic update makes half of GitHub obsolete lol」——顯示社群期望 Anthropic 官方逐漸取代第三方 workaround
- 另有討論：「Is it different from claude.ai? I've had no issues with the web version.」——對功能必要性有疑問者
- Reddit r/ClaudeCode 有開發者深入追查 session idle 斷線 bug（GitHub issue #32982），顯示功能穩定性在早期有問題，社群自行研究並推送修復

**社群自建 workaround（早於官方）：**
- GitHub 專案 [JessyTsui/Claude-Code-Remote](https://github.com/JessyTsui/Claude-Code-Remote)：在官方 remote control 出現前，社群已自建「透過 email、Discord、Telegram 控制 Claude Code」的方案，功能與官方 channels 類似

**非寫程式的使用案例：**
- Wharton 商學院教授 Ethan Mollick（研究 AI + 創業）：在 Dispatch 上線後說「Dispatch can already meet 90% of the requirements of OpenClaw」，並用 Claude Code 做學術研究——包含「從指定 topic 做完整分析、寫 manuscript」（cannabis paper，3.5 小時完成）
- causalinf.substack.com 作者（經濟學研究者）：明確用 Dispatch 做研究論文相關工作，描述在手機上傳送任務、早上起床看到 pull request 已準備好的工作流程
- 一般非技術用戶：VentureBeat 提到「non-technical users alike flock to Claude Code」，vibe coding 浪潮帶動非開發者使用

**使用摩擦點：**
- Session 在 idle 後快速斷線（已在 v2.1.80+ 修復）
- 不像 OpenClaw 可以 24/7 常駐，機器睡眠就斷

**Sources:**
- [r/ClaudeAI: Claude Code just got Remote Control](https://www.reddit.com/r/ClaudeAI/comments/1rdr9pn/claude_code_just_got_remote_control/) — 社群初始反應，276 讚的熱門討論
- [r/ClaudeCode: Had anyone figured out why Remote Control sessions quickly die when idle?](https://www.reddit.com/r/ClaudeCode/comments/1rqjam0/had_anyone_figured_out_why_remote_control_rc/) — 深度技術討論，展示社群如何 debug 官方功能
- [GitHub: JessyTsui/Claude-Code-Remote](https://github.com/JessyTsui/Claude-Code-Remote) — 官方前的社群 workaround，印證需求存在
- [Claude Code 34: Using "Dispatch" on my phone — causalinf.substack.com](https://causalinf.substack.com/p/claude-code-34-using-dispatch-on) — 學術研究者非寫程式的使用案例

**Key insights:**
- 社群對 Remote Control 的需求早於官方，已有自建解決方案（email/Discord/Telegram bridge）
- 非寫程式用途主要集中在「長時間任務的手機監控與催促」，而非從手機發起複雜任務
- Idle session 斷線是早期最大痛點，社群自行研究修復機制，顯示 power user 密度高
- Ethan Mollick 的 90% 評語暗示學界/研究界也在觀察 Claude Code 向通用 agent 靠攏的趨勢

---

#### 3. Claude Code vs 通用 agent 平台（如 OpenClaw）的定位差異

**核心定位差異（多方觀點）：**

**DataCamp（2026/02）：**
「Claude currently represents the safe, reliable, and specialized alternative. OpenClaw represents the general-purpose, messy, and expansive option.」這個對比點出了兩者的根本差異：Claude Code 是「專門化 + 安全」，OpenClaw 是「通用 + 擴展性優先」。

**AIAgentStore.ai：**
「OpenClaw offers broader autonomy for general automation due to model flexibility and local execution; Claude Code is more autonomous in specialized coding environments.」各有擅長領域，不是誰取代誰的關係。

**架構差異（36kr 分析）：**
OpenClaw 透過本地 daemon process 實現全天候運作；Claude Code 的 Remote Control 和 Channels 都依賴 session 存活——關掉 terminal，Channels 斷線；電腦睡眠，Dispatch 停止。

**GitHub Copilot blog 的類比（可延伸到 Claude Code）：**
「Where agent mode lives in the IDE, coding agent lives in your repos.」——IDE 整合 vs 倉庫自主，兩個不同維度。Claude Code 兩者皆有（IDE plugin + terminal agent），OpenClaw 則是「chat app 作為主要入口，agents 跑在本地」。

**Reddit r/ClaudeCode 的開發者實際看法：**
「Claude Code already handles the hard parts (file editing, subagents, error iteration, memory), the thing it was actually missing was browser access.」——開發者看到 Claude Code 的強項在 coding workflow 裡的整合，而缺口是 browser access（即與外部世界的溝通橋樑），這個缺口正是 OpenClaw 等平台填補的地方。

**對立觀點：**
- 有開發者認為 OpenClaw 的「通用性」是優點，因為可以跨任務類型（coding、email、calendar 等）
- 有開發者認為 Claude Code 的「專注 coding」是優點，因為工具鏈整合更深、IDE diff 體驗更好
- 部分開發者同時使用兩者，功能互補

**Sources:**
- [OpenClaw vs Claude Code: Which Agentic Tool Should You Use in 2026? — DataCamp](https://www.datacamp.com/blog/openclaw-vs-claude-code) — 系統性比較，提出「safe/specialized vs general/messy」框架
- [Claude Code vs OpenClaw (Moltbot) — AI Agent Store](https://aiagentstore.ai/compare-ai-agents/claude-code-vs-openclaw-moltbot) — 功能面比較，指出各自的自主性側重點
- [r/ClaudeCode: Honest review about OpenClaw vs Claude Code after a month](https://www.reddit.com/r/ClaudeCode/comments/1rkn2h4/honest_review_about_openclaw_vs_claude_code_after/) — 開發者實際使用一個月的比較心得
- [OpenClaw vs. Claude Code in 5 mins — Medium (Hugo Lu)](https://medium.com/@hugolu87/openclaw-vs-claude-code-in-5-mins-1cf02124bc08) — 歷史背景（OpenClaw 從 Moltbot/Clawdbot 改名）與定位差異
- [The difference between coding agent and agent mode in GitHub Copilot — GitHub Blog](https://github.blog/developer-skills/github/less-todo-more-done-the-difference-between-coding-agent-and-agent-mode-in-github-copilot/) — 提供 IDE-integrated vs repo-level agent 的分析框架，可類比到 Claude Code vs OpenClaw
- [Claude Code: Become a "Lobster" — 36kr (en)](https://eu.36kr.com/en/p/3730899849773313) — 中文科技媒體觀點，具體點出 session 存活依賴的架構限制

**Key insights:**
- 「給 agent 一個 IDE」vs「給 agent 一台電腦」的差距，核心在於：IDE agent 的上下文是 codebase；通用 agent 的上下文是整台機器（file system、browser、messaging、calendar……）
- Claude Code 正在透過 Remote Control / Channels / Dispatch 試圖跨越這個邊界，但架構上仍受限於「session 需存活」
- 開發者社群的討論顯示，實際使用中兩者有互補性，不是零和競爭
- OpenClaw 的「always-on daemon」架構是目前 Claude Code 體系中最難複製的關鍵差異

---

#### 4. Claude Code 的新功能 "channel" 和 "dispatch" 是什麼？跟 remote control 有什麼關係？

**Channels（Claude Code 功能，research preview，v2.1.80+）：**

官方定義：「A channel is an MCP server that pushes events into your running Claude Code session, so Claude can react to things that happen while you're not at the terminal.」

Channels 的方向是**外部事件進入 Claude Code**，而不只是讓人控制 session。Channel 可以是雙向的：外部平台（Telegram、Discord）傳訊息，Claude 讀取並透過同一個 channel 回覆。

設定流程（以 Telegram 為例）：
1. 在 BotFather 建立 bot，取得 token
2. 在 Claude Code 執行 `/plugin install telegram@claude-plugins-official`
3. `/telegram:configure <token>`
4. 重啟時加上 `--channels plugin:telegram@claude-plugins-official`
5. 在 Telegram 傳訊給 bot，取得 pairing code，執行 `/telegram:access pair <code>`
6. 設定 allowlist：`/telegram:access policy allowlist`

支援平台：Telegram、Discord（research preview 初期）。每個 channel 維護獨立的 sender allowlist，即使同一個 Discord server 裡未 pair 的使用者也會被忽略。

**Dispatch（Claude Cowork / Desktop 功能，2026 年 3 月 17 日由 Felix Rieseberg 宣布）：**

官方描述：「One persistent conversation with Claude that runs on your computer. Message it from your phone. Come back to finished work.」

Dispatch 是 Claude Desktop App 內「Cowork」功能的一部分，不是 Claude Code CLI 的功能。讓使用者在手機上透過 Claude app 跟桌機上的 Cowork agent 對話，任務由桌機執行，手機只發送指令/查看結果。

重要：Anthropic 自己用 Claude Code 在一週半內寫出了 Cowork，Dispatch 是在這個基礎上疊加的手機端入口。

**三個功能的關係對比：**

| 功能 | 方向 | 入口 | 適合場景 |
|------|------|------|----------|
| Remote Control | 手機/瀏覽器 → 本機 Claude Code session | Claude app / claude.ai/code | 從手機繼續已開始的 coding 任務 |
| Channels | 外部平台（Telegram/Discord）→ Claude Code session | 你自己的 bot | CI 結果、monitoring alert、隨時發指令 |
| Dispatch | 手機 → 桌機 Cowork agent | Claude app（Dispatch tab） | 不開筆電就能指派/監控桌機任務 |

**共同的架構限制：** 三個功能都依賴本機有活躍的 session/process。電腦關機或睡眠，功能就停止。這與 OpenClaw 的 local daemon 架構不同。

**Sources:**
- [Push events into a running session with channels — Claude Code Docs](https://code.claude.com/docs/en/channels) — 官方 Channels 完整文件，含設定步驟與安全機制
- [Anthropic Update Lets You Control Claude Cowork With Your Phone — Forbes](https://www.forbes.com/sites/ronschmelzer/2026/03/20/claude-dispatch-lets-you-control-claude-cowork-with-your-phone/) — Dispatch 的媒體定位報導
- [Anthropic Launches Claude Dispatch — NDTV](https://www.ndtv.com/offbeat/anthropic-launches-claude-dispatch-this-new-claude-feature-lets-your-phone-run-your-pc-heres-how-11233014) — 含 Felix Rieseberg 的原始 tweet 內容
- [r/Anthropic: Anthropic launched a new Cowork feature called Dispatch](https://www.reddit.com/r/Anthropic/comments/1rx1z5c/anthropic_launched_a_new_cowork_feature_called/) — 社群討論，包含「Anthropic 用 Claude Code 在 1.5 週內寫出 Cowork」的資訊
- [r/singularity: Anthropic announces Dispatch](https://www.reddit.com/r/singularity/comments/1s1wnys/anthropic_announces_dispatch_control_your_claude/) — 廣泛社群反應
- [Claude Code 34: Using "Dispatch" on my phone — causalinf.substack.com](https://causalinf.substack.com/p/claude-code-34-using-dispatch-on) — 實際使用者對 Dispatch 工作流程改變的深度描述
- [r/n8n: Controlling Claude Code from Your Phone — Reddit](https://www.reddit.com/r/n8n/comments/1rzw7ai/controlling_claude_code_from_your_phone_a/) — 社群區分 Remote Control vs Channels vs Dispatch 的討論
- [Claude Code: Become a "Lobster" — 36kr (en)](https://eu.36kr.com/en/p/3730899849773313) — 最完整的三功能比較，指出共同的 session 存活依賴限制

**Key insights:**
- Channels 和 Remote Control 是 Claude Code（CLI）的功能；Dispatch 是 Claude Desktop Cowork 的功能——三者不是同一個產品線
- Channels 的定位更接近「事件驅動自動化」（CI webhook、monitoring alert），Remote Control 更接近「手動遠端操作」，Dispatch 更接近「行動端入口」
- 三個功能加起來，Anthropic 試圖把 Claude Code 從「坐在桌前才能用的 IDE agent」變成「隨時可 reach 的 agent partner」
- 但所有功能都仍然需要本機有 active session，這個根本限制讓 OpenClaw 的 always-on daemon 架構在「7×24 自動化」場景上保有優勢
- Dispatch 是最新的（2026/03/17），發布後 Ethan Mollick 說它已達到「90% of OpenClaw requirements」，顯示業界確實在用 OpenClaw 作為通用 agent 的標竿
