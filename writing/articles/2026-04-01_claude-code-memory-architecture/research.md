## Research Notes

### Research Questions
1. Claude Code 外洩碼中的三層記憶架構（MEMORY.md 索引層、Topic Files、Raw Transcripts）具體怎麼運作？每一層的設計邏輯、觸發條件、資料流是什麼？有沒有程式碼片段或技術細節被社群分享出來？
2. autoDream 和 KAIROS daemon 機制的技術細節是什麼？autoDream 的觸發條件、記憶整合邏輯（合併觀察、移除矛盾、模糊轉確定）、Self-Healing Memory 的驗證流程具體怎麼運作？15 秒 blocking budget 是什麼意思？
3. 社群和技術分析者（如 Sebastian Raschka、Alex Kim、Hacker News 討論）對這套記憶架構的評價和洞見是什麼？有沒有人指出設計上的取捨、限制、或和其他 AI coding tool 的記憶方案做比較？

### Findings

#### 1. 三層記憶架構的具體運作方式

Claude Code 的記憶系統由兩個互補的機制組成：使用者撰寫的 CLAUDE.md 檔案，以及 Claude 自己撰寫的 Auto Memory。Auto Memory 的持久化儲存在 `~/.claude/projects/<project>/memory/` 目錄下，形成一個三層結構：

**第一層：MEMORY.md 索引層（Always Loaded）**
- MEMORY.md 是記憶目錄的「目錄檔」，每行約 150 字元，格式為 `- [Title](file.md) -- one-line hook`
- 硬性限制：只載入前 200 行或 25KB（以先到者為準），超過的部分在 session 啟動時不會被載入
- 設計邏輯：MEMORY.md 不儲存資料本身，只儲存位置指標（pointers）。這讓它能在每個 session 開始時快速載入，不浪費 context window 的空間
- 在 session 中，Claude 會持續讀寫這個目錄中的檔案，用 MEMORY.md 追蹤「什麼東西存在哪裡」

**第二層：Topic Files（On-Demand Loading）**
- 存放在同一個 memory 目錄下的獨立 markdown 檔案，如 `debugging.md`、`api-conventions.md`、`bash-and-system.md`
- 不在 session 啟動時載入，而是 Claude 需要時才用標準檔案工具去讀取
- 設計邏輯：將詳細筆記從 MEMORY.md 移出，保持索引精簡。每個 topic file 聚焦一個領域的知識

**第三層：Raw Transcripts（Selective Search）**
- Claude 的每個 session 都會產生 JSONL 格式的 transcript 檔案，存在本地端
- autoDream 在整理記憶時，會對這些 transcript 做「窄範圍搜尋」（grep narrowly），而非完整讀取
- 系統提示明確指示：「Don't exhaustively read transcripts. Look only for things you already suspect matter.」
- 設計邏輯：避免 token 浪費，只在懷疑有重要資訊時才去搜尋原始對話紀錄

**資料流**
1. Session 啟動：載入 MEMORY.md 前 200 行 + 所有 CLAUDE.md 檔案
2. Session 進行中：Claude 根據需要讀取 topic files，並在工作過程中記下新的觀察（build commands、debugging insights、architecture notes、code style preferences）
3. 使用者也可以明確要求記憶（如「remember that we use pnpm, not npm」）
4. autoDream 整理：在觸發條件滿足時，背景執行四階段整理流程（見 Research Question 2）

**官方文件確認的記憶系統全貌**

| 面向 | CLAUDE.md | Auto Memory | Session Memory | Auto Dream |
|------|-----------|-------------|----------------|------------|
| 誰寫的 | 使用者 | Claude | Claude | Claude |
| 用途 | 指令與規則 | 專案模式 | 對話連續性 | 記憶整合 |
| 頻率 | 手動 | 每 session | ~5K tokens | 24h + 5 sessions |
| 啟動載入 | 完整檔案 | 前 200 行 | 相關 sessions | N/A |

**Sonnet-powered 相關性選擇器**
當 Claude 需要載入記憶時，系統會把使用者的查詢和記憶清單（memory manifest）送給 Sonnet 模型，由 Sonnet 以 structured JSON 回傳最多 5 個最相關的檔案名稱。最近使用的工具也會一併傳送，以跳過不相關的參考文件。

**Sources:**
- [How Claude remembers your project - Claude Code Docs](https://code.claude.com/docs/en/memory) -- Anthropic 官方文件，完整描述 CLAUDE.md 與 Auto Memory 的運作方式、儲存結構、設定選項
- [Claude Code Memory System: MEMORY.md, Topic Files, and Automated Maintenance](https://ianlpaterson.com/blog/claude-code-memory-architecture/) -- 一位使用者分享的 4 層記憶架構實作（含 8 條設計規則、cron 維護、200 行限制的實戰教訓）
- [Claude Code Dreams: Anthropic's New Memory Feature](https://claudefa.st/blog/guide/mechanics/auto-dream) -- 詳細解說 autoDream 四階段流程、觸發條件、安全保證
- [Auto Memory and Auto Dream](https://antoniocortes.com/en/2026/03/30/auto-memory-and-auto-dream-how-claude-code-learns-and-consolidates-its-memory/) -- 社群整理的 Auto Memory 與 Auto Dream 完整技術說明
- [Reverse-Engineering Claude Code: A Deep Dive](https://sathwick.xyz/blog/claude-code.html) -- 逆向工程分析，揭露 Sonnet-powered relevance selector 和 KAIROS 的實作細節
- [claude-code-system-prompts (GitHub)](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/agent-prompt-dream-memory-consolidation.md) -- 外洩的 dream memory consolidation 系統提示全文

**Key insights:**
- 200 行 / 25KB 的硬性限制是刻意的設計，確保記憶載入不會吃掉過多 context window。超過的部分不是報錯，而是「靜默截斷」
- MEMORY.md 是索引而非資料儲存，這個設計迫使 Claude 把詳細知識分散到 topic files，形成「索引 + 按需載入」的兩級架構
- Raw transcripts 從不完整回讀到 context，只做 grep 搜尋——這是一個在 token 成本與資訊完整性之間的明確取捨
- 記憶是 machine-local 的，同一個 git repo 的所有 worktree 共享一個記憶目錄，但不跨機器同步

---

#### 2. autoDream 與 KAIROS daemon 的技術細節

**autoDream：背景記憶整理**

autoDream 是一個以 forked subagent 方式運行的背景記憶整理程序，設計靈感來自人類的 REM 睡眠——在使用者不活躍時「整理白天學到的東西」。

*觸發條件（三閘門機制）：*
三個條件必須同時滿足：
1. 距離上次整理已超過 24 小時
2. 自上次整理以來已完成 5 個以上的 session
3. 能取得 consolidation lock（檔案鎖，防止併發）
4. （額外節流）距離上次掃描已超過 10 分鐘

這個「雙閘門」設計的目的：低使用量的專案不會浪費資源做不必要的整理，而活躍開發中的專案能定期清理。

*四階段整理流程：*

**Phase 1 - Orient（定位）：**
- 讀取記憶目錄內容，開啟 MEMORY.md（索引檔）
- 掃描現有 topic files，建立當前記憶狀態的心智地圖
- 檢查 `logs/` 或 `sessions/` 子目錄中的近期條目

**Phase 2 - Gather Signal（收集訊號）：**
- 優先順序：每日 log (`logs/YYYY/MM/YYYY-MM-DD.md`) > 漂移的記憶（與當前程式碼不一致的事實） > transcript 搜尋
- 針對 JSONL transcript 做窄範圍搜尋：`grep -rn "<term>" ${TRANSCRIPTS_DIR}/ --include="*.jsonl" | tail -50`
- 關鍵約束：「Don't exhaustively read transcripts. Look only for things you already suspect matter.」
- 搜尋目標：使用者的修正（corrections）、明確的儲存指令、跨 session 的重複主題、重要的架構決策

**Phase 3 - Consolidate（整合）：**
- 將相對日期轉換為絕對日期（「yesterday」→「2026-03-15」）
- 刪除已被推翻的事實（當資訊更新時，在來源處刪除舊事實）
- 移除已刪除檔案相關的 stale debugging notes
- 合併來自多個 session 的重疊條目（如果三個 session 都記了同一個 build command 的怪異行為，合併為一條）
- 合併新資訊到現有 topic files，而非建立近似重複的檔案

**Phase 4 - Prune and Index（修剪與索引）：**
- 更新 MEMORY.md，維持 200 行 / ~25KB 的限制
- 每個條目一行，約 150 字元，格式：`- [Title](file.md) -- one-line hook`
- 移除指向不存在檔案的指標
- 縮短過長（>200 字元）的條目，將細節搬到 topic files
- 解決檔案之間的矛盾
- 永不在索引中直接嵌入記憶內容

*安全保證：*
- 唯讀專案程式碼：dream 期間只能寫入記憶檔案，不能修改 source code
- Bash 工具存取限制為 read-only commands（`ls`、`grep`、`cat`）
- Lock file 防止同一專案的併發整理
- 背景執行，不阻擋活躍 session
- 失敗時有 rollback 機制

*效能：*
- 觀察到一個案例在約 8-9 分鐘內完成 913 個 session 的記憶整理

**Self-Healing Memory（自我修復記憶）**

Self-Healing Memory 是整個記憶架構對抗「context entropy」（長時間互動中模型逐漸失去連貫性）的設計。

核心機制：
1. MEMORY.md 儲存的是指標而非資料——即使個別 topic file 有錯，索引本身不會因此失效
2. **Strict Write Discipline**：agent 必須在成功寫入檔案之後才能更新索引。這防止模型用失敗的嘗試污染自己的 context
3. **記憶視為「提示」而非「事實」**：程式碼確認 Anthropic 的 agent 被指示「treat their own memory as a hint」，要求模型在行動前對照實際程式碼驗證事實
4. 漂移記憶偵測：autoDream 的 Phase 2 會專門搜尋「與當前程式碼不一致的事實」（drifted memories），在 Phase 3 中刪除或更新

**KAIROS daemon（未發布）**

KAIROS 是 Claude Code 的「always-on」背景 agent 模式，在外洩的程式碼中被引用超過 150 次，但目前仍在 feature flag 後面，尚未公開發布。

*核心特性：*
- 持續觀察、記錄、並主動對發現的事物採取行動，不需等待使用者輸入
- 維護 append-only 的每日 log 檔案
- GitHub webhook 訂閱
- 5 分鐘 cron refresh cycles
- 每 3 秒檢查是否需要介入
- 具有標準 Claude Code 所沒有的工具權限：file pushing、push notifications、PR monitoring

**15 秒 blocking budget：**
- 任何 KAIROS 的主動行為（proactive action），如果會阻塞使用者工作流超過 15 秒，就會被自動延遲或背景化
- 這是一個 UX 設計約束：確保 daemon 「幫忙但不煩人」
- Hacker News 使用者 HeytalePazguato 評論：「The 15 second blocking budget tells me they actually thought through what it feels like to have something running in the background while you work.」

*autoDream 與 KAIROS 的關係：*
autoDream 是 KAIROS 最具體的子系統，在程式碼中位於 `services/autoDream/`。KAIROS 也包含 `/dream` skill 用於「nightly memory distillation」。autoDream 作為 forked subagent 運行的設計，防止主 agent 的「思路」被自己的維護任務污染。

**Sources:**
- [Claude Code Dreams: Anthropic's New Memory Feature](https://claudefa.st/blog/guide/mechanics/auto-dream) -- 最詳細的 autoDream 四階段流程說明，含觸發條件和安全保證
- [What Is Claude Code AutoDream?](https://www.mindstudio.ai/blog/what-is-claude-code-autodream-memory-consolidation-2) -- 從神經科學角度（synaptic homeostasis hypothesis）解釋 autoDream 設計
- [claude-code-system-prompts - dream consolidation prompt](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/agent-prompt-dream-memory-consolidation.md) -- 外洩的系統提示全文，包含四階段的完整指令
- [Reverse-Engineering Claude Code](https://sathwick.xyz/blog/claude-code.html) -- 揭露 KAIROS 的 forked subagent 實作、四階段整合、15 秒 blocking budget
- [Kuberwastaken/claude-code (GitHub)](https://github.com/Kuberwastaken/claude-code) -- 社群重建的 Claude Code 結構說明，含 KAIROS 和 autoDream 技術細節
- [Claude Code's source code appears to have leaked (VentureBeat)](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know) -- 綜合報導，含 Self-Healing Memory、Strict Write Discipline 的描述
- [Anthropic's Claude Code leak reveals autonomous agent tools (CryptoBriefing)](https://cryptobriefing.com/claude-code-leak-vulnerabilities/) -- 三層記憶設計和驗證流程的技術細節
- [Claude Code's Entire Source Code Just Leaked (Substack)](https://mattpaige68.substack.com/p/claude-codes-entire-source-code-just) -- autoDream 三閘門觸發、200 行/25KB 限制、KAIROS 獨佔工具的分析

**Key insights:**
- autoDream 以 forked subagent 運行，是成熟的工程設計——防止記憶維護任務干擾主 agent 的推理
- 「記憶視為提示」（treat memory as hint）的設計哲學意味著系統容忍記憶不完美，靠對照程式碼來自我修正
- 15 秒 blocking budget 是一個 UX 設計約束，不是技術限制——反映了 Anthropic 對「背景 agent 體驗」的深度思考
- KAIROS 的 150+ 次程式碼引用顯示這不是原型，而是接近產品化的功能，但仍被 feature flag 隱藏
- 三層上下文壓縮（MicroCompact -> AutoCompact -> Full Compact）與記憶架構是互補的：壓縮處理 session 內的 context 管理，記憶架構處理跨 session 的知識保留

---

#### 3. 社群與技術分析者的評價

**Sebastian Raschka 的分析**

Raschka 的核心論點：Claude Code 的優勢來自圍繞模型的「software harness」而非模型本身。他指出六個關鍵架構組件：
1. Repository context loading（git branch、CLAUDE.md）
2. Prompt caching（static/dynamic 分離）
3. Specialized tools（專用 Grep、Glob、LSP 而非通用 shell）
4. Context optimization（檔案去重、大結果寫入磁碟後 preview+reference）
5. Structured session memory（包含 Session Title、Current State、Task specification、Files and Functions、Workflow、Errors & Corrections、Learnings、Worklog 等欄位的 markdown）
6. Subagent parallelization（forked agents 共享 parent cache）

他的結論：「if we were to drop in other models such as DeepSeek, MiniMax, or Kimi, and optimize this a bit for these models, we would also have very strong coding performance.」——暗示記憶架構等 harness 元件是可移植的。

注意：Raschka 的文章未涉及 MEMORY.md 三層架構或 autoDream 的細節，主要聚焦在 session 內的 context 管理。

**Alex Kim 的分析**

Alex Kim 從安全和工程面分析外洩碼：
- Bash 安全：23 個編號安全檢查、18 個被封鎖的 Zsh 內建指令、Unicode zero-width space injection 防護
- Prompt cache 經濟學：promptCacheBreakDetection.ts 追蹤 14 種 cache-break 向量，「sticky latches」防止模式切換導致昂貴的 cached tokens 失效
- 反蒸餾防禦：`ANTI_DISTILLATION_CC` flag 啟用時，系統送出假工具定義（decoy tool definitions）來毒化從 API 流量竊取的訓練資料
- Undercover Mode：從 AI 撰寫的 commit 中移除內部代號（Capybara、Tengu），且「There is NO force-OFF」
- Frustration detection：用 regex 偵測使用者的粗話和情緒語言——Kim 稱之為「peak irony」，因為一家 LLM 公司用基本的 pattern matching 而非自家推理引擎

Alex Kim 未對記憶架構做深入分析。

**Hacker News 討論**

HN 討論（item 47586778）聚焦點：
- KAIROS 的 15 秒 blocking budget 被認為是「thoughtful design around user experience」
- Hook 系統（PreToolUse、PostToolUse 透過 local curl 端點觸發）被評為「clean enough to build real tooling on top of without fighting it」
- Frustration regex 被認為是「the right call」——用 LLM 偵測「wtf」這種詞太浪費
- 程式碼品質被批評為「vibe coded」，存在架構不一致性
- 討論主要集中在「undercover mode」爭議和 commit 歸屬問題，記憶系統的討論相對少

**社群使用者的實戰反饋**

GitHub Issue #34556 是最有價值的社群反饋，一位使用者在 26 天內經歷 59 次 context compaction 後，自建了三層記憶架構：
- L1: MEMORY.md（~100 行，always loaded）——指標 + 關鍵規則 + 「I Remember...」section
- L2: Topic Files（memory/*.md，按需載入）——每個 <200 行
- L3: Vault（OneDrive 同步，~200 檔案）——127 個對話 narrative、10 個架構決策紀錄、1,477 行 changelog

這位使用者的核心批評：Claude Code 在 context compaction 之間沒有真正的持久記憶，每次壓縮都失去一切未外部儲存的資訊。他主張「the files are the source of truth, and the context window is just a working copy」。

另一位使用者 @yurukusa（140+ 小時、3,500+ sessions）獨立收斂到相同的三層架構，並分享了重要教訓：
- 不要存：code patterns、architecture、paths、git history、solutions（這些已在程式碼中）
- 記憶分類本身會變成分類線索——他發現「WatchDog」標籤導致訊息被降低優先級
- PreCompact hook 自動在壓縮前儲存是關鍵

**與其他 AI Coding Tool 的記憶方案比較**

| 工具 | 記憶機制 | 特點 |
|------|---------|------|
| Claude Code | MEMORY.md 索引 + topic files + autoDream 整理 | 三層架構、背景整理、200 行限制、Sonnet 選擇器 |
| Windsurf (Cascade) | Memories + Rules | 自動產生記憶存在 ~/.codeium/windsurf/memories/，按工作區隔離。Flow awareness 追蹤 IDE 動作自動更新 context。不跨 workspace |
| Cursor | .cursorrules + Memory Bank | .cursorrules 作為 system prompt prepend。Memory Bank 是社群方案，非原生。需 MCP server 支撐跨 session 持久性 |
| GitHub Copilot | Instructions file + context | 主要靠 line-by-line suggestion，不擅長理解大型架構模式 |

Claude Code 的獨特之處：它是目前唯一有「記憶整理」機制（autoDream）的主流 AI coding tool。其他工具要不是只有「寫入」沒有「整理」，就是把記憶管理完全留給使用者。

**設計取捨與限制**

社群識別的主要取捨：
1. **200 行限制 vs. 資訊完整性**：超過 200 行的內容被靜默截斷，使用者可能不知道重要記憶「不可見」。Ian Paterson 記錄到他的 MEMORY.md 累積到 501 行才發現 60% 的內容不可見
2. **Machine-local vs. 跨裝置同步**：記憶不跨機器同步，多裝置開發者需要自己解決
3. **Context window 的根本限制**：即使有 200K token，研究顯示在約 147,000-152,000 tokens 時 context 品質就開始下降（lost-in-the-middle problem）
4. **記憶品質的 bootstrap 問題**：autoDream 需要至少 5 個 session 才觸發，新專案初期記憶品質必然較差
5. **程式碼品質爭議**：外洩碼顯示 64,464 行零測試、一個 3,167 行的函式有 486 個分支點——這引發了對記憶系統可靠性的質疑
6. **Regex 偵測 vs. LLM 推理**：用 regex 做情緒偵測被認為是務實但諷刺的選擇

**Sources:**
- [Claude Code's Real Secret Sauce Isn't the Model (Sebastian Raschka)](https://sebastianraschka.com/blog/2026/claude-code-secret-sauce.html) -- Raschka 的六大架構組件分析，論證 software harness 才是 Claude Code 優勢的來源
- [The Claude Code Source Leak (Alex Kim)](https://alex000kim.com/posts/2026-03-31-claude-code-source-leak/) -- 安全、反蒸餾、prompt cache 經濟學的技術分析
- [Hacker News Discussion](https://news.ycombinator.com/item?id=47586778) -- 社群對 KAIROS、hook 系統、frustration regex 的討論
- [Feature Request: Persistent Memory Across Context Compactions (GitHub Issue #34556)](https://github.com/anthropics/claude-code/issues/34556) -- 最有深度的社群反饋，含自建三層記憶架構、compaction 統計、hook-based 解決方案
- [awesome-claude-code-postleak-insights (GitHub)](https://github.com/nblintao/awesome-claude-code-postleak-insights) -- 策展的外洩後分析文章清單
- [Cursor vs Windsurf vs Claude Code in 2026 (DEV Community)](https://dev.to/pockit_tools/cursor-vs-windsurf-vs-claude-code-in-2026-the-honest-comparison-after-using-all-three-3gof) -- 三大 AI coding tool 的記憶與 context 管理比較
- [Cascade Memories (Windsurf Docs)](https://docs.windsurf.com/windsurf/cascade/memories) -- Windsurf 官方記憶系統文件
- [Claude Code Source Leak: Production AI Architecture Patterns (Hugging Face Forum)](https://discuss.huggingface.co/t/claude-code-source-leak-production-ai-architecture-patterns-from-512-000-lines/174846) -- 三層 context compression 和 autoDream 的架構分析
- [We Reverse-Engineered 12 Versions of Claude Code (DEV Community)](https://dev.to/kolkov/we-reverse-engineered-12-versions-of-claude-code-then-it-leaked-its-own-source-code-pij) -- 程式碼品質批評：零測試、超大函式、3.1 GB unmanaged flat files
- [Anthropic leaks its own AI coding tool's source code (Fortune)](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak-second-security-lapse-days-after-accidentally-revealing-mythos/) -- 這是 Anthropic 第三次已知的同類 build pipeline 錯誤（之前有 v0.2.8 和 v0.2.28）
- [Claude Code Memory System (Ian Paterson)](https://ianlpaterson.com/blog/claude-code-memory-architecture/) -- 實戰 4 層記憶架構，含 8 條設計規則、501 行 MEMORY.md 溢出教訓

**Key insights:**
- Raschka 的「harness vs. model」論點對文章很有價值：記憶架構是 harness 的一部分，理論上可移植到其他模型
- Claude Code 是目前唯一內建「記憶整理」（autoDream）的 AI coding tool，這是與 Cursor、Windsurf 的關鍵差異
- GitHub Issue #34556 顯示社群 power users 已經獨立發展出與 Claude Code 官方架構相似的三層記憶系統，這驗證了這種架構模式的合理性
- 記憶的 200 行硬限制是 context window 經濟學的結果——不是技術問題，而是 attention 品質的問題
- 外洩碼中的程式碼品質問題（零測試、超大函式）與記憶架構的精巧設計形成對比，值得在文章中提及
- 「記憶視為提示」（treat memory as hint）是一個可以與 OpenClaw 做比較的設計哲學
