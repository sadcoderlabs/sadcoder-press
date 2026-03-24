# Writing Brief

## Article Info
- Title: Claude Code Remote Control vs OpenClaw：給 Agent 一台電腦跟給它一個 IDE 有什麼不同？
- Author: Yuren Ju
- Style: default
- Date: 2026-03-24
- Status: ready
- Original language: zh
- Translations: en

## Publishing
<!-- Managed by publishing tools. Leave empty during writing. -->

## Target Audience
- Who: 正在用 OpenClaw 或對 OpenClaw 有興趣的開發者
- Background: 已經用過 AI coding agent（如 Claude Code、Cursor），可能也用過 OpenClaw 透過聊天平台操控 agent；對 agent 能做什麼有基本認知
- Prior state: 感受過 OpenClaw + Opus 跟其他 agent 的體驗差距，但不一定能說清楚差異在哪；聽過 Claude Code remote control，好奇它跟 OpenClaw 搭配起來會怎樣

## Source Ideas
- Yuren Ju 在 #writing 提出 (2026-03-24)：想寫 Claude Code remote control 跟 OpenClaw 一起使用的文章

## Article Goals
- Reader takeaway: 理解「給 agent 一台電腦」vs「給 agent 一個 IDE」的根本差異，以及 remote control 搭配 OpenClaw 能在多大程度上彌合這個差距
- Goal alignment: 直接展示 OpenClaw 的核心設計哲學——自由給 agent 一台電腦來解決問題，而不只是寫程式。透過跟 Anthropic 官方產品的實測對比，讓讀者更具體理解 OpenClaw 的價值

## Outline

### 1. 開場：一個簡單的實驗
**Purpose:** 勾起讀者好奇心——用一行指令就能把 Claude Code 變成類 OpenClaw 的體驗？
**Materials:**
- 作者實測：跟 OpenClaw agent 說「幫我建一個 daemon」，一行 `claude remote-control --permission-mode bypassPermissions`
- 結果：Desktop/手機 Claude App 都能連進去，權限等同原本 OpenClaw
- 設定：VPS 上跑、credential 放 1Password vault

### 2. 第一印象的落差：像 Claude Code，不像 OpenClaw
**Purpose:** 帶出「給 agent 一個 IDE」vs「給 agent 一台電腦」的核心問題
**Materials:**
- 作者體驗：剛開始用感覺跟一般 Claude Code 很像，沒有 OpenClaw 那種感覺
- 原因：Claude 沒有拿到 OpenClaw 的 prompt 結構
- Research：DataCamp 框架——「safe/specialized vs general/messy」

### 3. 橋接：讓 Claude 變成 OpenClaw
**Purpose:** 全文核心段落——具體展示橋接過程，讓讀者理解兩者的差距其實在哪裡
**Materials:**
- 請 Claude 研究 OpenClaw system prompt 結構（runtime 動態 merge .md + tools）
- 用 CLAUDE.md 橋接 prompt
- Symbolic link 到 OpenClaw 的 skills 目錄
- 重啟後行為非常接近
- **Aha moment**：做完 CLAUDE.md + skills 指定就非常相似了，門檻比預期低
- 實際 CLAUDE.md 範例（需脫敏後使用）：展示橋接結構——執行環境說明（Claude Code + OpenClaw 共用）、開始對話前讀取的檔案清單（SOUL.md/USER.md/TOOLS.md/MEMORY.md）、PARA 專案結構（memory/、skills/、cron-jobs/）、skill 觸發規則、1Password 整合、commit 自動化等。讓讀者具體看到「一份 CLAUDE.md 如何讓 Claude Code 擁有 OpenClaw 的脈絡」

### 4. 好處：Agent-first 的 UI
**Purpose:** 公平呈現 Claude App 做得好的地方
**Materials:**
- Claude App 從設計之初就是跟 agent 對話的 UI，資訊呈現比 Discord 方便
- 截圖：`assets/claude-app-openclaw-session.png` — Claude Desktop App 連上 "openclaw-remote-control" session，展示讀 skill、查行事曆、查專案的實際畫面
- Research：Remote Control / Channels / Dispatch 三功能比較表
- Research：Ethan Mollick 說 Dispatch 達到「90% of OpenClaw requirements」

### 5. 還差什麼：多 session、排程、細節打磨
**Purpose:** 誠實呈現目前的差距，但框架是「還沒做」而非「做不到」
**Materials:**
- 不能多 session 處理不同工作；Discord 用頻道切分、thread 聚焦，Claude App 沒有
- Schedule 在 remote control 上還不能用；有 loop 但跟 schedule 差距大；Desktop 版已有，remote control 還沒有
- 手機連結 session 要等，疑似無快取
- 作者判斷：這些是「還沒做、還沒調校」，不是做不到
- Research：always-on daemon 架構是 Claude Code 最難複製的差異

### 6. 模型廠商的基礎建設優勢
**Purpose:** 拉高視角——這不只是工具比較，而是產業結構的問題
**Materials:**
- 作者核心觀點：「模型廠商原本就有基礎建設，只是注意力放在哪裡」
- 只要簡單橋接就能逼近，代表距離不遠
- 問題不是 OpenClaw 能不能提供價值，而是模型廠商想不想做、要不要搶這個市場

### 7. 收尾：OpenClaw 的價值在於大膽實驗
**Purpose:** 給出作者的立場——不是誰取代誰，而是生態系的正向循環
**Materials:**
- OpenClaw「大膽但危險」，在危險底下有很多有趣的事
- Claude/OpenAI 做 Computer Use 比較謹慎；OpenClaw 這種第三方可以大膽驗證
- 讓廠商看到成果後重新思考，成為養分
- 團隊實際使用：每個成員當助手、公司庶務在 Slack 處理，但不排斥探索其他工具
- 在這個循環裡，工具會慢慢變得越來越好用

## Checklist

### Preparation
- [x] Target audience confirmed
- [x] Article goals confirmed
- [x] Goal alignment confirmed
- [x] Language and translations confirmed
- [x] Research completed (or skipped)
- [x] Interview completed
- [x] Outline with materials completed
- [x] Ready for writing

### Writing & Review (managed by later skills)
- [ ] First draft completed
- [ ] Fact-check completed
- [ ] Review completed
- [ ] Translations completed
- [ ] Finalized
