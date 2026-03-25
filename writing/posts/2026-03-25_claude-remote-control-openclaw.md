---
type: thread
status: draft
source: article
source_article: articles/2026-03-24_claude-code-remote-control-with-openclaw/
original_language: zh
translations: [en]
platforms: [twitter]
---

# Claude Remote Control + OpenClaw：十分鐘實驗的發現

我在 VPS 上跑了一行指令，讓 Claude Code 變成 remote control daemon。然後從手機的 Claude App 連進去，十分鐘內就建好了。

但第一個感覺是：這是 Claude Code，不是 OpenClaw。

---

差在哪？Claude Code 幫你寫程式。OpenClaw 幫你解決問題——透過自己能寫程式的能力。

關鍵是 prompt 結構。OpenClaw 啟動時會把你的記憶、偏好、技能、工具設定合併成一份完整的 system prompt。Claude Code 不讀這些。

---

所以我做了一個實驗：寫一份 CLAUDE.md 把 OpenClaw 的 prompt 架構翻譯給 Claude Code，再把 skills 目錄 symlink 過去。

重啟後，Claude 開始讀我的記憶、用我的技能、用我習慣的語氣回覆。

一份 CLAUDE.md + 一個 symlink，橋接的門檻比預期低很多。

---

Anthropic 最近密集推了三個功能：Remote Control（手機連回本機 session）、Channels（外部平台事件驅動）、Dispatch（手機指派任務給桌機）。

方向很明確：把 Claude Code 從坐在桌前才能用的 IDE agent，變成隨時可以 reach 的 agent partner。

---

但還差一點。

OpenClaw 用頻道切分工作、用 thread 聚焦、有完整的 cron 排程。Claude App 目前只有一個 session，不能平行處理，排程也還沒打通到 remote control。

這些是「還沒做」，不是「做不到」。

---

做完這個實驗最大的感受：模型廠商其實已經有做到非常接近 OpenClaw 的基礎建設了。差的只是注意力放在哪裡。

而 OpenClaw 這種大膽的第三方實驗，可能正是推動他們往這邊前進的養分。
