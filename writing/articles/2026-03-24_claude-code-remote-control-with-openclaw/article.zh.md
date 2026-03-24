# Claude Code Remote Control vs OpenClaw：給 Agent 一台電腦跟給它一個 IDE 有什麼不同？

我跟我的 OpenClaw agent 說：「幫我用這個指令建一個 daemon。」

```
claude remote-control --permission-mode bypassPermissions
```

指定好 workspace 目錄，OpenClaw 就幫我建了一個叫 "Claude remote" 的 daemon，直接跑起來了。然後我打開手機上的 Claude App，連進去，開始跟它對話。

這台 VPS 上所有的資源，Claude 都可以動用，跟原本 OpenClaw 的能力一模一樣。所有 credential 放在 1Password 的 vault 裡，agent 需要的時候按需讀取。不是在我自己的筆電上，所以 bypassPermissions 對我來說是可以接受的風險。

整個設定過程不到十分鐘。

## 第一印象：這是 Claude Code，不是 OpenClaw

剛開始用的時候，體驗跟一般的 Claude Code 幾乎沒有差別。可以寫程式、改檔案、跑指令。但就是少了那個感覺。用 OpenClaw 的時候，它可以幫我處理很多不同類型的事。用 Claude remote control 的時候，它就是一個 coding agent。

差異在哪裡？Claude 沒有拿到 OpenClaw 的 prompt。

OpenClaw 在啟動的時候，會動態地把 workspace 目錄裡的各種 `.md` 檔 merge 在一起，再加上目前可用的 tools，組成一份完整的 system prompt。這份 prompt 裡面有你的偏好、你的記憶、你的技能清單、你的工具設定。Claude Code 的 remote control 沒有這些東西，它只知道自己是一個 coding agent，面對一個目錄。

[DataCamp 的比較文章](https://www.datacamp.com/blog/openclaw-vs-claude-code)用了一個蠻精準的框架：Claude Code 是「safe, reliable, and specialized」，OpenClaw 是「general-purpose, messy, and expansive」。這個差距，在 remote control 的第一印象裡體現得非常明顯。

## 橋接：一份 CLAUDE.md 的距離

所以我請 Claude 做了一件事：研究 OpenClaw 的 system prompt 結構。

它看完之後，我請它幫忙寫一份 `CLAUDE.md`，把 OpenClaw 那套 prompt 架構翻譯成 Claude Code 能理解的格式。這份 `CLAUDE.md` 大概長這樣：

```markdown
# CLAUDE.md

## 執行環境

這個 workspace 由 Claude Code 和 OpenClaw 共用：
- Claude Code：目前的執行載體，負責互動對話與任務執行
- OpenClaw：同一台機器上運行，負責排程任務和通知
- 兩邊共用同一份檔案（記憶、人格設定、工具清單等）

## 開始對話前

先讀以下檔案取得完整脈絡：
1. SOUL.md — 人格與溝通風格
2. USER.md — 使用者背景
3. TOOLS.md — 環境設定、API、本地工具筆記
4. MEMORY.md — 長期記憶

## 專案結構

├── memory/          # 每日筆記
├── 10-projects/     # 進行中的專案
├── 30-resources/
│   ├── skills/      # 自訂技能
│   ├── cron-jobs/   # 排程任務
│   └── scripts/     # 工具腳本
└── canvas/          # 工作草稿區
```

寫完 `CLAUDE.md` 之後，已經有點像了。但還缺一塊：skills。

OpenClaw 有一套技能系統，我之前已經寫了不少技能放在指定目錄裡。我做了一個 symbolic link，把原本 OpenClaw 用的 skills 目錄連結到 Claude Code 的 `.claude/skills/`。重啟 remote control。

行為變了。Claude 開始讀我的記憶檔案，開始用我寫的技能，開始用我習慣的語氣回覆。它的行為跟原本的 OpenClaw 已經非常接近了。

這是整個實驗裡最讓我意外的一刻：一份 `CLAUDE.md` 加上一個 skills 的 symlink，橋接的門檻比我預期低很多。

## Agent-first 的介面

橋接完成後，我開始在 Claude App 上跟它互動。一個明顯的好處浮現了：Claude App 從設計之初就是一個跟 agent 對話的介面。

![Claude Desktop App 連上 openclaw-remote-control session](assets/claude-app-openclaw-session.png)

我們原本在 Discord 上用 OpenClaw。Discord 是設計給人跟人聊天的，agent 只是寄居在裡面。訊息格式、檔案預覽、程式碼區塊的呈現，都是為了人類對話設計的。Claude App 不一樣，它的整個 UI 就是為了讓你跟 agent 協作。資訊的呈現、工具呼叫的結果、檔案的 diff，都比 Discord 裡清楚。

Anthropic 最近密集推出了三個相關功能。[Remote Control](https://code.claude.com/docs/en/remote-control) 讓你從手機或瀏覽器連回本機的 Claude Code session。[Channels](https://code.claude.com/docs/en/channels) 讓外部平台（Telegram、Discord）的事件推進 Claude Code session，做到事件驅動的自動化。[Dispatch](https://www.forbes.com/sites/ronschmelzer/2026/03/20/claude-dispatch-lets-you-control-claude-cowork-with-your-phone/) 則是 Claude Desktop 的 Cowork 功能延伸，讓你在手機上指派任務給桌機。三個功能合在一起，Anthropic 想把 Claude Code 從「坐在桌前才能用的 IDE agent」變成「隨時可以 reach 的 agent partner」。

Wharton 商學院教授 Ethan Mollick 在 Dispatch 上線後[在 X 上說](https://x.com/emollick/status/2034067677157679379)，Dispatch 已經能滿足他 90% 原本用 OpenClaw 做的事。這句話從學界傳出來，代表業界確實在用 OpenClaw 作為通用 agent 的標竿。

## 還差什麼

90% 不是 100%。

我在 Discord 上用 OpenClaw 的時候，不同的工作會開在不同的頻道。寫文章在一個頻道，專案管理在另一個頻道，每個頻道裡還可以用 thread 來聚焦討論。Claude App 目前只有一個 session。不能新增第二個 session 來平行處理不同的工作。

排程也是一個缺口。OpenClaw 有完整的 cron job 系統，可以設定排程任務自動執行。Claude Code 有 `loop` 指令可以做簡單的重複，但跟排程工具的能力差距很大。Claude Desktop 版已經有 schedule 功能了，只是在 remote control 這個架構上還沒打通。

手機版的體驗也有打磨空間。每次從手機連回 session，都要等一段時間才能看到對話內容，看起來是沒有快取，每次都要重新載入。

這些問題有一個共同的特徵：它們都是「還沒做」，不是「做不到」。

更根本的差異在架構層面。OpenClaw 用一個 [local daemon process 實現全天候運作](https://eu.36kr.com/en/p/3730899849773313)。Claude Code 的 Remote Control、Channels、Dispatch 全部都依賴本機有一個活著的 session。關掉 terminal，Channels 斷線。電腦睡眠，Dispatch 停止。always-on daemon 是目前 Claude Code 體系中最難複製的一個差異。

## 模型廠商的基礎建設

做完這個實驗之後，我最大的感受是：做 LLM 的廠商，他們其實已經有做到跟 OpenClaw 非常接近的成品所需要的基礎建設了。差的只是他們的注意力放在哪裡。

一份 `CLAUDE.md`，一個 skills 的 symlink，一行啟動指令。如果這樣就能逼近 OpenClaw，那問題從來不是 OpenClaw 能不能提供價值，而是模型廠商有沒有想把重點放在這個領域。這個領域對他們來說，是不是只要再多做一點點就可以拿下的市場？

## 大膽的實驗

我們團隊每天都在用 OpenClaw。每個成員拿它當工作跟生活的助手，公司庶務也放在 Slack 裡用 OpenClaw 處理，從請假、行事曆到點子管理。但我們也不排斥嘗試其他工具，這也是為什麼會有這個實驗。

OpenClaw 本質上是一個大膽的實驗。它給了 agent 一台完整的電腦，讓它自由地去解決問題。這很危險，安全性有很多疑慮。但在危險底下，有很多有趣的事情在發生。

Claude 跟 OpenAI 都做過 Computer Use 這類實驗，但他們比較謹慎。OpenClaw 這種第三方工具可以更大膽地去驗證一個主意到底行不行。即使安全性有問題，它還是帶來了價值：讓其他人看到，如果我有這個工具，我可以做到什麼事情。

這會成為模型廠商的養分。Anthropic 跟 OpenAI 看到這些成果之後，可以重新思考他們的工具要不要加這些功能，要不要往這個方向發展。

我的 remote control daemon 還跑著。明天上班的時候，我可能還是會先打開 Discord 跟 OpenClaw 說早安。
