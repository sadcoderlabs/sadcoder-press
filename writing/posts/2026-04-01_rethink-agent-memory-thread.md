---
type: thread
status: review
source: article
source_article: articles/2026-04-01_rethink-agent-memory/
original_language: zh
translations: [en]
platforms: [twitter]
---

Claude Code 原始碼因 npm 打包錯誤外洩，512K 行 TypeScript。多數人在看 undercover mode，但 autoDream 抓住了我的注意力。它是目前唯一內建記憶整理的主流 AI coding tool。🧵

---

Claude Code 的記憶分三層。MEMORY.md 是索引，啟動時載入，上限 200 行。第二層是 topic files，按領域分的 markdown，需要時才用 Sonnet 選出相關的讀入。第三層是原始 transcript，只做 grep，從不完整讀回。每一層都在省 token。

---

autoDream 以 forked subagent 在背景跑，做四件事：掃描現有記憶建立全貌，收集新訊號找出跟程式碼對不上的「漂移記憶」，把整合結果寫入 topic files（刪矛盾、合併重疊、日期從相對轉絕對），最後修剪 MEMORY.md 索引到 200 行、25KB 以內。

---

整套機制裡最讓我在意的設計：treat memory as a hint。Agent 被要求行動前先對照實際程式碼驗證記憶，不盲信自己上次記下的東西。記憶是線索，不是事實。

---

我們在 OpenClaw 也做記憶整合，但方向不同。我們想探索的是：這條記憶重要嗎？為什麼重要？最終讓 agent 從記憶裡長出偏好和觀點。

完整分析 👇
https://sadcoder-press.vercel.app/zh/blog/rethink-agent-memory/
