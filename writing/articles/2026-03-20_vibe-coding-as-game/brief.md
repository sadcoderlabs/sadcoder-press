# Writing Brief

## Article Info
- Title: 你以為你在寫程式，其實你在玩遊戲
- Author: Shao
- Date: 2026-03-20
- Status: review  <!-- draft | ready | writing | review | published -->
- Original language: zh
- Translations: (skip for now, iterate on zh first)

## Publishing
<!-- Managed by publishing tools. Leave empty during writing. -->

## Target Audience
- Who: 對 AI/vibe coding 有興趣或已經在玩的開發者和科技愛好者
- Background: 用過 ChatGPT、Cursor、Claude Code 等工具做過一些小 project，體會過那種「停不下來」的感覺
- Prior state: 知道 vibe coding 很好玩但說不清楚為什麼這麼上癮，也沒想過這跟遊戲設計有什麼關係；對「多人一起用 agent」還沒有清晰的想像

## Source Ideas
- ideas.md: "Vibe Coding 就是在玩遊戲" (2026-03-20) @shao

## Article Goals
- Reader takeaway: 讀完後，讀者會用「遊戲機制」的框架理解 vibe coding 為什麼讓人上癮（隨機正向反饋、迭代投入感），並開始思考：如果現在是單機遊戲，多人版會長什麼樣子？
- Goal alignment: 展現團隊對 AI agent 現象的獨特觀察角度——不是教人怎麼用工具，而是提供有趣的解釋框架。這種有觀點的分析文正是吸引人追蹤的內容。

## Writing Style

### 聲音定位

分析性但對話感。自信但不說教 — 立場明確，隨即自己用結構複雜化它。表面下有一層安靜的自嘲溫度。

### 核心原則

1. **不鋪陳，直接進主題。** 禁止 "I think it's worth noting..."、"今天想跟大家分享..."、"It's interesting that..."、"接下來讓我們來看看"、"值得注意的是"。第一句就是主張本身。
2. **括號裡藏真話。** Parenthetical asides 是簽名手法 — 用來放自我修正、真正的重點、或差點沒說出口的東西。
3. **反企業腔與 hype language。** 永遠不用："excited to announce"、"thrilled to share"、"leverage synergies"、"unlock value"、"game-changing"、"revolutionary"、"to the moon"、"WAGMI"、management consultant jargon。
4. **不做勵志雞湯。** 不寫 generic motivational content、inspirational quotes、cheerleading。不用「讓我們一起努力」「未來可期」收尾。如果結尾有希望感，必須是論證自然產出的，不是裝飾。
5. **雙語 code-switch 是功能性的。** 中文用於情感、敘事、社群；英文用於技術概念、產品術語、國際語境。不為讀者翻譯，不刻意展示雙語。中文有自然對應詞時，別用英文。
6. **誠實面對不確定。** 說「IDK」「我不確定」「也許我錯了」，不說「it remains to be seen」「further analysis may be warranted」。
7. **用具體細節錨定抽象主張。** 舉真實的產品、數字、競品名稱，不讓策略性宣稱漂浮在空中。
8. **先立論，再拆論。** 建立方向後引入反力。「然而」「但」是結構承重詞，不是修辭避險。不用修飾語（也許、可能、或許）軟化立場 — 用 counter-argument 複雜化它。一段最多一個「也許」。
9. **結尾擴張，不收束。** 用問題群結尾，不用結論。信任讀者會繼續想。
10. **假設讀者是 peer。** 不複述、不 recap、不 "in other words"。不解釋讀者該知道的基本概念。往前走。
11. **類比是論證的主力。** 把具體事物連結到更大的 pattern。偏好的類比域：工業（工廠、供應鏈、瓶頸）、演化（生態系、選擇壓力）、基礎設施（管線、軌道、Linux）、歷史（煉金術、印刷術、文明弧線）。類比要出人意料但一看就通。
12. **不說教。** 呈現 stakes，讓讀者自己判斷。不替讀者決定他們該在意什麼。

### 永遠不做

- Hashtags、Emoji 濫用、Self-promotional hype language、Thread bait
- 被動語態隱藏責任、SEO 優化標題或 clickbait、第三人稱自我指涉
- Filler transitions："此外"、"綜上所述"、"讓我們來看看"
- 過度解釋：如果一個概念需要一整段背景，你選錯了讀者或選錯了概念

### Essay-Specific

- One paragraph, one conceptual move, maximum density. Introduce → ground → pivot to implication.
- Build frameworks, then stress-test them. Frameworks are lenses, never truth.
- Irony as punctuation, not as tone. One dry wry line per section max.
- Acknowledge the fog, then speculate anyway.
- Openers are declarative and short. Sentence length is bimodal (long analytical + punchy closers).
- Em dashes (——) are the primary pivot tool. Parentheticals are surgical.
- Titled sections (##) with 2–5 dense paragraphs. Headers are noun phrases or gerunds.
- Telescoping structure: macro → specific mechanism → open questions.
- No bullet points in prose. Endings are deliberately unresolved.
- 800–1500 words. No listicles, no citing authority, no prescriptive advice.

## Outline

### 1. 老虎機心理學
**Purpose:** 建立框架——vibe coding 為什麼讓人停不下來，用遊戲設計的語言精確描述這個體驗。不是要說「它像遊戲」，而是借用遊戲設計的分析工具。
**Materials:**
- 作者觀察：有點隨機的正向反饋，逐次迭代中打造屬於自己的東西建立投入感
- 作者類比：養成遊戲（龍蝦）、模擬遊戲（paperclip、大富翁）、Claude Code ≈ 4X game
- Research: prompt → 等待 → 輸出的循環 = variable ratio schedule（老虎機心理）
- Research: IKEA effect——prompt 工程讓人對 AI 結果有「所有感」
- Research: near-miss effect——「差一點就跑通了，再試一次」

### 2. 單機模式的天花板
**Purpose:** 指出目前的 vibe coding / agent 使用全是單機遊戲，並釐清關鍵區分：一人跑多 agent ≠ 多人。為什麼大家更喜歡自己玩？
**Materials:**
- 作者觀察：目前大都是單機策略遊戲，大家更喜歡自己用 AI 而不是跟人共用，甚至懶得跟人類互動
- 作者區分：一人跑多 agent 仍然是單機——像 RTS 單機版指揮多個單位
- Research: Cursor 2.0 parallel agents、agentmaxxing 都是單人控制多 agent
- Research: Garry Tan 的 gstack——把 Claude Code 變成虛擬團隊（CEO、Designer、Eng Manager、QA），但仍是單人指揮一整個 agent 團隊
- Research: 現有「多 agent」產品（Devin multi-agent）的 agent-to-agent 協作仍由單一人類 orchestrate
- 作者澄清：這篇要探討的是「多人共用 AI」——人類對人類的互動，不是 agent 對 agent

### 3. 多人模式長什麼樣子
**Purpose:** 用遊戲類比作為思考框架，探索多人 agent 的可能形態。不是預測未來，是打開想像空間。
**Materials:**
- 作者案例：team agent（多人共用一個 AI agent，不同人教它不同技能、寫入不同記憶，共同塑造同一個 agent 的能力）= 多人共同養成
- 作者類比：用 agent 處理團隊營運雜務（薪資、行政）≈ 多人 Factorio（多人協作維護一條自動化產線）
- 作者觀點：多人的好玩之處——同一個東西被不同背景的人玩出不同用法，組合到意想不到的 skill/tool/agent/prompt
- 作者觀點：當然更多是多人亂戳把它玩壞了
- Research: Devin 透過 Slack 當「team member」——最接近多人版的現有形態
- Research: Google AI Studio 剛推出多人 vibe coding 功能（2026 年 3 月）

### 4. 意外的十倍價值
**Purpose:** 核心論點——多人 agent 真正有趣的地方不是「一起完成任務」，而是意外的組合與用途。用產品回饋循環類比收束，但留下開放問題。
**Materials:**
- 作者觀點：你本來為問題 A 設計的工具，被別人意外拿去解決問題 B，問題 B 可能有十倍價值
- 作者觀點：這跟做產品的正向回饋循環類似
- 作者觀點：透過組合到意想不到的其他 skill/tool/agent/prompt 來展開作者原本也沒想到的情境
- 作者原始問題：你做的半成品跟朋友非同步在做的半成品之間能怎麼互動？協作還是競爭？
- 關鍵特徵：非同步、每個人貢獻不同模組、成果共享

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
- [x] First draft completed
- [x] Fact-check completed
- [ ] Review completed
- [ ] Translations completed
- [ ] Finalized
