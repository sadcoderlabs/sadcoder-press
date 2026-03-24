# 事實查核報告（第 1 輪）

## 摘要

- **狀態：** 發現問題
- **問題數量：** 2 個（合併為 1 項修正）
- **總評：** 文章整體事實正確，技術描述與引用來源大致準確。主要問題在於 Ethan Mollick 的「90%」引述的來源連結錯誤：原文連結指向 causalinf.substack.com（Scott Cunningham 的文章），但該文章並不包含這段引述；實際來源是 Mollick 本人的 X/Twitter 貼文。

## 修改項目

### 1. Ethan Mollick「90%」引述的來源連結與呈現方式修正

- **位置：** 「Agent-first 的介面」段落
- **事實宣稱：** Ethan Mollick 說 Dispatch 已能滿足 90% 的 OpenClaw 需求，連結指向 causalinf.substack.com
- **修改前：** > Wharton 商學院教授 Ethan Mollick 在 Dispatch 上線後說，[Dispatch 已經能滿足 90% 的 OpenClaw 需求](https://causalinf.substack.com/p/claude-code-34-using-dispatch-on)。這句話從學界傳出來，代表業界確實在用 OpenClaw 作為通用 agent 的標竿。
- **修改後：** > Wharton 商學院教授 Ethan Mollick 在 Dispatch 上線後[在 X 上說](https://x.com/emollick/status/2034067677157679379)，Dispatch 已經能滿足他 90% 原本用 OpenClaw 做的事。這句話從學界傳出來，代表業界確實在用 OpenClaw 作為通用 agent 的標竿。
- **原因：** (1) 原連結指向 causalinf.substack.com（作者為 Baylor 大學經濟學教授 Scott Cunningham），經驗證該文章並不包含「90%」的引述。實際來源是 Mollick 於 2026 年 3 月 18 日在 X 上的貼文。(2) 原推文 ID 也不正確，已更正為 `2034067677157679379`。來源：https://startit.rs/claude-dispatch-openclaw-alternativa/

## 已驗證通過的事實宣稱

1. **`claude remote-control --permission-mode bypassPermissions` 指令** — 語法正確，為合法的 Claude Code CLI 參數
2. **DataCamp 比較框架引述** — 與 research.md 一致，連結正確
3. **Remote Control / Channels / Dispatch 三功能描述** — 均與官方文件一致，連結已驗證
4. **Ethan Mollick 身份** — 確認為 Wharton 商學院教授
5. **36kr 文章引述** — 經驗證與原文一致
6. **Claude Code `/loop` 指令** — 確認存在
7. **Claude Desktop 已有 schedule 功能** — 經確認 Cowork 中的 Scheduled Tasks 已可用
8. **Claude 跟 OpenAI 都做過 Computer Use** — Anthropic 2024 年 10 月推出 Computer Use，OpenAI 2025 年 1 月推出 Operator (CUA)，事實正確
