## 老虎機心理學

Vibe coding 讓人上癮的方式跟老虎機一模一樣。

你輸入一段 prompt，等三十秒，螢幕上冒出一坨程式碼。有時候能跑，有時候不行，你永遠不知道這次會是哪一種。心理學家管這叫 [variable ratio schedule](https://www.discoveryaba.com/aba-therapy/variable-ratio-examples-and-schedule)，獎勵在不可預測的時間點出現，是所有行為增強排程中最讓人停不下來的一種。賭場用這個讓你一直拉把手。Claude Code 用同一套讓你一直按 Enter。

老虎機拉出來的只是數字。Vibe coding 拉出來的是你自己的東西，一個你描述、你引導、看著它從無到有的 project。心理學上這叫 IKEA effect：人會對自己參與建造的東西賦予不成比例的高價值，即使你實際上只是鎖了幾顆螺絲。Prompt 工程就是那幾顆螺絲。你沒寫半行 code，但你覺得整個東西是你的。

然後 AI 的輸出差一點就對了。邏輯通了但有個 edge case 沒處理，UI 長出來了但按鈕位置不對。差一點。再試一次。這跟老虎機轉出兩個 7 加一個櫻桃一樣，你的大腦把「差一點成功」編碼成「快要成功了」而不是「這次失敗了」。賭博研究裡叫 near-miss effect。

養成遊戲靠隨機獎勵跟建造感讓你花幾百小時養龍蝦。[Universal Paperclips](https://www.decisionproblem.com/paperclips/) 靠隨機獎勵跟差一點就贏讓你把整個下午燒掉。Claude Code 全部都中。不是說它像遊戲，是它用了遊戲產業花三十年打磨出來的同一套心理工具，只是沒有人刻意設計過這件事。

## 單機模式的天花板

所有人都在單機玩。

Cursor 2.0 的 [parallel agents](https://cursor.com/docs/configuration/worktrees) 最多八個 agent 同時在不同 branch 上工作。[Agentmaxxing](https://vibecoding.app/blog/agentmaxxing) 同時跑 Claude Code、Codex、Gemini CLI，人類負責 review 和 merge。Garry Tan 的 [gstack](https://github.com/garrytan/gstack) 把單一 Claude Code 拆成 CEO、Designer、Eng Manager、QA 一整個虛擬團隊。看起來很多角色，但指揮官只有一個。你同時開了八盤棋跟電腦下，這是 RTS 單機版。

多人共用 agent 是另一回事。八個人坐在同一張棋盤前面。目前市面上幾乎找不到這種東西。[Devin](https://devin.ai/) 算最接近的，它透過 Slack 加入你的團隊頻道，接任務、回報進度、發 PR，像一個遠端同事。但 Devin 是被指派工作的，不是跟你一起探索的。

為什麼大家更喜歡自己玩？我猜 vibe coding 的快感本質上是私密的。那個 variable ratio schedule，那個「這是我的」的感覺，加入其他人類會稀釋掉。你不想要別人碰你的養成遊戲存檔。（老實說 AI 不會 judge 你的 prompt 寫得爛，這點就贏了。）

## 多人模式長什麼樣

我不確定多人 agent 該長什麼樣，但我們團隊無意間搞出了一個原型。

我們共用一個 AI agent 處理日常營運，薪資、行政、排程那些。不同人教它不同技能，寫入不同記憶，共同塑造它能做的事。工程師教它查 GitHub issue，PM 教它整理會議紀錄，設計師教它從 Figma 抓規格。每個人貢獻的模組不同，但接在同一條自動化產線上。如果要找一個遊戲類比，這比較像 Factorio 的合作模式：你鋪一段輸送帶，接上我的熔爐，他再接一段組裝線。沒有人設計過整條線，但它跑起來了。

更常見的情況是有人改了一個 skill 的觸發條件，另一個人的工作流程整個斷掉。這也很 Factorio。

Google AI Studio 在 [2026 年 3 月剛推出多人協作功能](https://forum.gnoppix.org/t/google-ai-studio-now-lets-you-vibe-code-real-time-multiplayer-games/5127)，多個人同步在同一個環境裡跟 AI 互動。但那還是多人一起用工具，像 Google Docs 的多人編輯。我們在做的比較像一群人養同一隻電子寵物，寵物會記住每個人教它的東西。我不知道哪個方向對，也許兩個都不對。

## 意外的十倍價值

多人 agent 真正有趣的地方可能跟協作效率無關。

你為問題 A 打造了一個工具。同事拿去用，意外解決了問題 B。問題 B 的價值是 A 的十倍。Slack 本來是遊戲公司的內部聊天工具，YouTube 最初是約會網站。當多個人各自帶著不同背景去操作同一個 agent，這種意外組合的機率上升。有人把你寫的資料處理 skill 接上他從沒想過的資料來源，有人用你建的排程工具跑你沒設計過的流程。

傳統產品要等用戶回饋、開票、排進 sprint，幾週後才看到意外用途。Agent 系統裡，有人今天裝了一個新 skill，明天另一個人就把它跟現有的 skill 組合出新用法。回饋循環從幾週壓縮到幾小時。我不確定這是不是好事（壞掉的速度也是幾小時），但速度本身改變了事情的性質。

你做的半成品跟朋友非同步做的半成品之間能怎麼互動？如果你的 agent 學會了一種解法，它能不能教給別人的 agent？兩個團隊的 agent 各自演化出處理同一問題的不同方式，誰的會勝出，還是它們會合併成第三種？

我沒有答案。但單機版已經讓這麼多人上癮了，多人版的 emergent gameplay 值得有人認真想想。
