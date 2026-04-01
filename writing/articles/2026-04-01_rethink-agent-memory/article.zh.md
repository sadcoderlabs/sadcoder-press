# 從 Claude Code 外洩重新思考 AI Agent 的記憶整理

3 月 31 日，Claude Code 的原始碼因為 npm 打包錯誤意外外洩。[512,000 行 TypeScript，1,906 個檔案](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)，社群幾個小時內就把整個架構翻了一遍。多數人在討論 undercover mode 和 frustration regex，但有一個詞抓住了我的注意力：**autoDream**。

我們在 OpenClaw 上探索 AI agent 記憶整合的方式。有機會看到如 Anthropic 這樣的企業是怎麼實做「作夢」的，讓我也想瞭解他們的作法。

## Claude Code 的記憶系統

Claude Code 的記憶，從資訊量級來看，從概括到詳細分三層。

最上層是 MEMORY.md，一個純文字的目錄與章節簡介。它不存任何實際資料，只存指標：每一行大約 150 個字元，格式是 `- [標題](檔名.md) — 一句話描述`。這個檔案在每次 session 開始時完整載入 context，[上限 200 行](https://code.claude.com/docs/en/memory)。超過的部分直接被截斷，不會報錯。

第二層是 topic files。`debugging.md`、`api-conventions.md` 這些獨立的 markdown 檔案，各自聚焦一個領域的知識。它們不在啟動時載入。當 Claude 需要某個領域的記憶時，[系統會用 Sonnet 模型從清單中選出最相關的幾個檔案](https://sathwick.xyz/blog/claude-code.html)再讀進來。

第三層是原始對話記錄。每個 session 的 JSONL transcript 存在本地，但系統從不把它們完整讀回 context。需要的時候只做窄範圍的 grep，[系統提示寫著：「只找你懷疑重要的東西」](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/agent-prompt-dream-memory-consolidation.md)。200 行的硬上限、按需載入、grep-only 的原始資料——每一層都在省 token，因為 [context window 使用量過高時，回答品質就會開始下降](https://www.sitepoint.com/claude-code-context-management/)。

但光是儲存記憶還不夠，記憶會腐爛。autoDream 就是來處理這件事的。

Anthropic 把這個機制叫做「做夢」，靈感似乎來自人類 REM 睡眠期間的記憶整合。autoDream [以 forked subagent 的方式在背景執行](https://sathwick.xyz/blog/claude-code.html)，做四件事：先掃描現有記憶狀態，建立全貌；接著收集新訊號，特別留意「漂移記憶」(drifted memories)，就是跟目前程式碼已經對不上的舊事實；然後把整合結果寫入 topic files，刪除被推翻的事實、合併來自多個 session 的重疊條目、把「昨天」轉成「2026-03-30」，盡量併入既有檔案而非建立新的；最後修剪 MEMORY.md 索引，確保它維持在 200 行、約 25KB 以內。

這整套機制裡有一個設計讓我特別在意：**記憶視為提示 (treat their own memory as a hint)**。Claude Code 的 agent 被要求在行動前，先對照實際程式碼驗證自己的記憶，不盲信上次記下的東西。這是一種內建的反思。

目前主流的 AI coding tool 裡，[只有 Claude Code 內建了記憶整理機制](https://claudefa.st/blog/guide/mechanics/auto-dream)。Cursor 的 Memory Bank 是社群方案，Windsurf 有自動記憶但沒有整理流程。大家都在存記憶，Claude Code 多做了一步：整理它。

## 我們怎麼做

我們在 OpenClaw 上也正在嘗試記憶整合，目的跟做法跟 Claude Code 不一樣。由於 Claude Code 是生產力工具，目的是要可以更好的處理使用者需要處理的情況；而我們使用 OpenClaw 更像是一個 AI Agent 同事，不論是個人或是團隊內部多人使用，我們實作記憶整合更希望的是同事可以給出一些從他的角度觀察到的細節與建議。

當然協助使用者解決問題重要，但同時也想要透過這些生活細節的記憶，賦予 Agent 個性，讓他從自己的一天裡面找到值得分享甚至吐槽的事情。不過雖然目的不一樣，我們也才剛開始作記憶整合，能夠參考其他人的作法也很有幫助。

我們每天跑一個 cron job，整理前一天 session 中的記憶。輸入來源是 agent 當天跟同事們的對話紀錄，加上 workspace 的 git log 作為補充，確保沒有遺漏。整理的結果是一段敘述型文字，後面接一個重點列表。

接下來我們打算做月度整理：每個月回顧每天的記事，從中找出比較重要的事情。格式一樣是敘述加列表。每一層整理都會讓記憶變得更抽象，逐漸收斂到真正重要的東西。最後在 MEMORY.md 裡面讓 agent 讀取今天跟昨天的記憶，並且附上上個月的記憶檔案連結，有需要的時候可以調用。

不過看完 Claude Code 的作法後，確實也覺得除了按照時間為切分以外，應該也要一份按照領域切分的記憶，並且將 MEMORY.md 更新成更能夠找到領域記憶的方式。讓在尋找記憶的時候可以有不同維度的搜尋方式。

這些記憶梳理的方式，都是希望讓記憶能夠在合適的時機被 Agent 取用，從功能性的角度來看，分領域的記憶方式很合理。不過如果要做到賦予 Agent 個性，並且進一步的從記憶當中找到洞見呢？從「記憶」到「洞見」，這之間還有什麼需要填補的呢？

這也是 autoDream 裡「反思」這個概念抓住我的原因。Claude Code 的反思是驗證對錯：這條記憶還正確嗎？我們想探索的是另一個方向：這條記憶重要嗎？或是說為什麼這條記憶重要？重要的記憶最終應該透過作夢被整併到長期記憶，最後內化成核心價值，成為未來跟其他人互動的基石。

## 記憶給了 agent 生活

我們最終希望的是，agent 有自己的生活記憶。

它的「生活」就是跟我們一起工作的日常。這些記憶可以成為風格的基礎。長時間下來，從累積的記憶中找到核心價值和個人特質，然後形成自己的風格。

這聽起來可能很遠。但把路徑拆開來看，每一步都是具體的工程問題：每天整理記憶，讓它能記住事情；每月萃取重點，讓它能分辨輕重；有了輕重，就有了偏好；有了偏好，就有了觀點。

反思能幫助 agent 判斷什麼值得記得更久嗎？這是我們接下來要探索的。Claude Code 的 autoDream 示範了記憶整合可以工程化。接下來的問題是，除了邏輯梳理，整合是否還能更進一步的加入價值判斷，最終為 Agent 的個人特質打下基礎。
