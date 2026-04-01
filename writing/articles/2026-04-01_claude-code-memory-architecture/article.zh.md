# Claude Code 怎麼整理記憶

3 月 31 日，Claude Code 的原始碼因為 npm 打包錯誤意外外洩。[512,000 行 TypeScript，1,906 個檔案](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)，社群幾個小時內就把整個架構翻了一遍。多數人在討論 undercover mode 和 frustration regex，但有一個詞抓住了我的注意力：**autoDream**。

我們在 OpenClaw 上正在做 AI agent 的記憶整合。看到 Anthropic 也在解同一道題，而且他們的方案叫「做夢」，我立刻想知道他們怎麼做的。

## Claude Code 的記憶系統

Claude Code 的記憶分三層。

最上層是 MEMORY.md，一個純文字的索引檔。它不存任何實際資料，只存指標：每一行大約 150 個字元，格式是 `- [標題](檔名.md) — 一句話描述`。這個檔案在每次 session 開始時完整載入 context，[上限 200 行](https://code.claude.com/docs/en/memory)。超過的部分直接被截斷，不會報錯。

第二層是 topic files。`debugging.md`、`api-conventions.md` 這些獨立的 markdown 檔案，各自聚焦一個領域的知識。它們不在啟動時載入。當 Claude 需要某個領域的記憶時，[系統會用 Sonnet 模型從清單中選出最相關的幾個檔案](https://sathwick.xyz/blog/claude-code.html)再讀進來。

第三層是原始對話記錄。每個 session 的 JSONL transcript 存在本地，但系統從不把它們完整讀回 context。需要的時候只做窄範圍的 grep，[系統提示寫著：「只找你懷疑重要的東西」](https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts/agent-prompt-dream-memory-consolidation.md)。

索引永遠在手邊，詳細知識按需取用，原始資料只在有明確懷疑時才碰。這是 context window 的經濟學。

然後是 autoDream。

Anthropic 把這個機制叫做「做夢」，靈感來自人類 REM 睡眠期間的記憶整合。autoDream [以 forked subagent 的方式在背景執行](https://claudefa.st/blog/guide/mechanics/auto-dream)，做四件事：先掃描現有記憶狀態，建立心智地圖；接著收集新訊號，特別留意「漂移記憶」，就是跟目前程式碼已經對不上的舊事實；然後做整合，刪除被推翻的事實、合併來自多個 session 的重疊條目、把「昨天」轉成「2026-03-30」；最後修剪 MEMORY.md 索引，確保它維持在 200 行以內。

這整套機制裡有一個設計讓我特別在意：**記憶視為提示**。Claude Code 的 agent 被要求在行動前，先對照實際程式碼驗證自己的記憶，不盲信上次記下的東西。這是一種內建的反思。

目前主流的 AI coding tool 裡，[只有 Claude Code 內建了記憶整理機制](https://dev.to/pockit_tools/cursor-vs-windsurf-vs-claude-code-in-2026-the-honest-comparison-after-using-all-three-3gof)。Cursor 的 Memory Bank 是社群方案，Windsurf 有自動記憶但沒有整理流程。大家都在存記憶，Claude Code 多做了一步：整理它。

## 我們怎麼做

我們在 OpenClaw 上也在做記憶整合，做法跟 Claude Code 不一樣。

我們每天跑一個 cron job，整理前一天 session 中的記憶。輸入來源是 agent 當天跟同事們的對話紀錄，加上 workspace 的 git log 作為補充，確保沒有遺漏。整理的結果是一段敘述型文字，後面接一個重點列表。

接下來我們打算做月度整理：每個月回顧每天的記事，從中找出比較重要的事情。格式一樣是敘述加列表。每一層整理都會讓記憶變得更抽象，逐漸收斂到真正重要的東西。

說實話，「怎麼判斷什麼重要」這件事，我們目前還沒有答案。方向知道了，具體的判斷邏輯還在摸索。

效果呢？至少在個人使用上，我已經可以感受到差異。我有一些事情安排需要查天氣，不需要跟 agent 講完整的指令，只要稍微提一下，它就能從記憶中知道我目前有哪些專案在進行，推斷出應該查的是哪個地區。這種「不用講完整指示就能推斷意圖」的感覺，就是記憶連續性帶來的。

關鍵在於一開始就定好記憶的格式，也在記憶裡告訴 agent「你可以讀昨天的記憶」。格式加上連續性，是目前能跑起來的原因。

團隊共用的 agent 就還早了。多人場景下，agent 要同時記住每個人的偏好和工作脈絡，比個人使用複雜得多。

## 同一件事，不同的目的

看完 Claude Code 的做法，我發現我們在解同一道題，但目的完全不同。

Claude Code 的 autoDream 在做**壓縮**：合併重疊、刪除矛盾、維持索引精簡。目標是讓下一次 session 的 context 乾淨、高效、正確。這是工具的邏輯。

我們想做的是**萃取**：從每天的工作記憶裡，逐漸提煉出什麼是真正重要的。目標是讓 agent 累積出自己的判斷力。記住事實只是起點。

為什麼？因為我們把 agent 當同事在用。回想一下工作上讓你信任的同事，很多時候是因為他能給出很棒的洞見。記性好是基本功，洞見才是信任的來源。我們希望 agent 也能走到那一步。

在 Claude Code 的設計裡，「反思」的作用是驗證對錯：這條記憶還正確嗎？在我們的設計裡，「反思」要回答的是另一個問題：這條記憶重要嗎？

這也是 autoDream 抓住我注意力的真正原因。看到 Claude Code 把反思用在記憶整合裡，我開始想：如果把反思的範圍從「驗證正確性」擴大到「判斷重要性」，是不是就更接近我們想做的事？我們還沒有答案，但看到別人怎麼做，幫我們把問題想得更清楚了。

## 記憶給了 agent 生活

我們最終希望的是，agent 有自己的生活。

它的「生活」就是跟我們一起工作的日常。這些記憶可以成為風格的基礎。長時間下來，從累積的記憶中找到核心價值和個人特質，然後形成自己的風格。

這聽起來可能很遠。但把路徑拆開來看，每一步都是具體的工程問題：每天整理記憶，讓它能記住事情；每月萃取重點，讓它能分辨輕重；有了輕重，就有了偏好；有了偏好，就有了觀點。

反思能幫助 agent 判斷什麼值得記得更久嗎？這是我們接下來要探索的。Claude Code 的 autoDream 示範了記憶整合可以工程化。接下來的問題是，除了壓縮，整合還能做到什麼。
