## 老虎機心理學

Vibe coding 讓人上癮的方式跟老虎機一模一樣。

你輸入一段 prompt，等三十秒，螢幕上冒出一坨程式碼。有時候能跑，有時候不行，而你永遠不知道這次會是哪一種。心理學家管這叫 [variable ratio schedule](https://www.discoveryaba.com/aba-therapy/variable-ratio-examples-and-schedule)——獎勵在不可預測的時間點出現，是所有行為增強排程中最讓人停不下來的一種。賭場老虎機用這個機制讓你一直拉把手。Claude Code 用同一套機制讓你一直按 Enter。

但老虎機拉出來的只是數字。Vibe coding 拉出來的是你自己的東西——一個你描述、你引導、你看著它從無到有的 project。這裡疊上了第二層心理機制：IKEA effect。人會對自己參與建造的東西賦予不成比例的高價值，即使你實際上只是鎖了幾顆螺絲。Prompt 工程就是那幾顆螺絲。你沒寫半行 code，但你覺得這整個東西是你的。

然後是 near-miss effect。AI 的輸出差一點就對了——邏輯通了但有個 edge case 沒處理，UI 長出來了但按鈕位置不對。差一點。再試一次。這跟老虎機轉出兩個 7 加一個櫻桃的效果完全相同：你的大腦把「差一點成功」編碼成「快要成功了」，而不是「這次失敗了」。

用遊戲設計的語言來說，vibe coding 同時命中了三個成癮機制：隨機獎勵、建造投入感、差一點就贏的錯覺。養成遊戲靠前兩個讓你花幾百小時養龍蝦。Universal Paperclips 靠第一和第三個讓你把整個下午燒掉。Claude Code 三個全中。它不像遊戲——它用的是遊戲產業花了三十年打磨出來的同一套心理工具。

## 單機模式的天花板

所有人都在單機玩。

Cursor 2.0 推出 [parallel agents](https://cursor.com/docs/configuration/worktrees)，最多八個 agent 同時在不同 branch 上工作。Agentmaxxing 成了一種[新興實踐](https://vibecoding.app/blog/agentmaxxing)——同時跑 Claude Code、Codex、Gemini CLI，人類負責 review 和 merge。Garry Tan 的 [gstack](https://github.com/garrytan/gstack) 把單一 Claude Code 拆成 CEO、Designer、Eng Manager、QA 一整個虛擬團隊。看起來很多人，但指揮官只有一個。這是 RTS 單機版——你操控多個單位，但對面沒有其他玩家。

一人跑多 agent 跟多人共用 agent 是完全不同的東西。前者是你同時開了八盤棋跟電腦下，後者是八個人坐在同一張棋盤前面。目前市面上幾乎找不到後者。[Devin](https://devin.ai/) 算是最接近的——它透過 Slack 加入你的團隊頻道，像一個遠端同事一樣接任務、回報進度、發 PR。但 Devin 是被指派工作的員工，不是跟你一起探索的玩伴。

為什麼大家更喜歡自己玩？一個解釋是：vibe coding 的快感本質上是私密的。那個 variable ratio schedule、那個 IKEA effect、那個「這是我的」的感覺——加入其他人類會稀釋它。你不想要別人碰你的養成遊戲存檔。你甚至懶得跟人類互動了（AI 不會 judge 你的 prompt 寫得爛）。

## 多人模式長什麼樣

如果用遊戲的語言想，多人 agent 可能不是 MMO，而是更像 Factorio 的合作模式。

我們團隊共用一個 AI agent 來處理日常營運——薪資、行政、排程。不同人教它不同技能，寫入不同記憶，共同塑造它能做的事。工程師教它怎麼查 GitHub issue，PM 教它怎麼整理會議紀錄，設計師教它怎麼從 Figma 抓規格。每個人貢獻的模組不同，但接在同一條自動化產線上。這不是一起打怪——是一起蓋工廠。Factorio 的核心循環：你鋪一段輸送帶，接上我的熔爐，他再接一段組裝線。沒有人設計過這整條線，但它跑起來了。

（或者更常見的情況：多人亂戳把它玩壞了。有人改了一個 skill 的觸發條件，另一個人的工作流程就整個斷掉。這也很 Factorio。）

目前最接近「多人 vibe coding」的商業實驗是 Google AI Studio 在 [2026 年 3 月剛推出的多人協作功能](https://forum.gnoppix.org/t/google-ai-studio-now-lets-you-vibe-code-real-time-multiplayer-games/5127)——多個人同步在同一個環境裡跟 AI 互動。但這還是「多人一起用工具」，不是「多人共同塑造一個 agent」。差別在於：前者像 Google Docs 的多人編輯，後者像一群人養同一隻電子寵物。

## 意外的十倍價值

多人 agent 真正有趣的地方可能不在協作效率。

你為問題 A 打造了一個工具。你的同事拿去用，意外地解決了問題 B。問題 B 的價值是問題 A 的十倍。這個故事在產品史上反覆出現——Slack 本來是遊戲公司的內部聊天工具，YouTube 最初是個約會網站。當多個人類各自帶著不同背景、不同需求去操作同一個 agent 系統，這種意外組合的機率會指數上升。有人把你寫的資料處理 skill 接上他從沒想過的資料來源。有人用你建的排程工具去做你沒設計過的工作流。

這跟做產品的正向回饋循環結構相同，但速度不同。傳統產品要等用戶回饋、開票、排進 sprint，幾週後才能看到意外用途。在 agent 系統裡，有人今天裝了一個新 skill，明天另一個人就可能把它跟現有的三個 skill 組合出第四種用法。反饋循環從幾週壓縮到幾小時。

你做的半成品跟你朋友非同步在做的半成品之間能怎麼互動？是協作還是競爭？如果你的 agent 學會了一種解法，它能不能「教」給別人的 agent？如果兩個團隊的 agent 各自演化出處理同一個問題的不同方式，誰的會勝出——還是它們會合併成第三種？

沒有人知道答案。但如果單機版的 vibe coding 已經讓這麼多人上癮，多人版的 emergent gameplay 值得有人去想。
