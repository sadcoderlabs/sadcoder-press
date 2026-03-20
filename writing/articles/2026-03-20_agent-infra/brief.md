# Writing Brief

## Article Info
- Title: Agent 不需要 Email
- Author: Shao
- Date: 2026-03-20
- Status: writing  <!-- draft | ready | writing | review | published -->
- Original language: zh
- Translations: en

## Publishing
<!-- Managed by publishing tools. Leave empty during writing. -->

## Target Audience
- Who: 對 AI agent 發展有興趣的技術人、產品人、創業者
- Background: 已經在用 AI agent（Claude Code、Cursor 等），理解 agent 能做什麼，不需要被說服「agent 時代要來了」
- Prior state: 知道 agent 很強但感覺現有服務不太對勁——都是為人設計的，bot 在裡面是二等公民。好奇接下來會長出什麼新東西，但沒有系統化的框架去思考

## Source Ideas
- ideas.md: "Agent 基礎建設：當服務不再為人類而設計" (2026-03-20) @shao

## Article Goals
- Reader takeaway: 一個區分 bridge vs foundation 的框架，加上 agent-friendly 服務設計原則，讓讀者重新思考哪些 agent infra 是過渡期產物、哪些是真正值得建的
- Goal alignment: 直接展現團隊在 agent 基礎建設方向的思考，用具體產品概念而非抽象分析來談觀點

## Writing Style


## Raw Materials

### 作者素材（Shao）
- 產品概念：一系列開源專案，鏡像現有人類工具，agent-first 設計
- 三種使用者：agent 直接用 hosting 版 / 開發者自架開源版 / 非技術人類透過 Sad Coder 取得客製服務
- Agent 路徑：完全自主、不需要 email/phone、免費層零身份、付費只需支付方式（x402）、標準介面（MCP, CLI, skill, llms.txt）
- 核心賣點：onboarding 對 agent 友善
- 11 個服務清單：phone, mail, calendar, doc, spreadsheet, database, git hosting, static site hosting + access control, password management, newsletter, wallet
- 每 1-2 週 launch 一個
- Bridge vs Foundation 框架：agent 需要 mail 只是因為人類服務要求 email 作為 identity，這是過渡期現象
- 不強調 crypto/wallet 避免刻板印象，x402 帶到就好

## Outline

### 1. Agent 需要 email 嗎？
**Purpose:** 用 mail 開場展示反直覺：agent 最常用的工具之一其實是過渡期產物。快速建立問題意識。
**Materials:**
- Agent 要寄信 → 要 Gmail → 要 OAuth → 要 Google 帳號 → 要⋯一個 email 地址來註冊 email 服務
- Agent 需要 email 不是因為 email 本身有價值，而是因為人類網路世界的通用 identity 就是 email
- mails.dev 作為早期案例
- 當更多服務為 agent 設計，email 作為 identity 的角色會消失

### 2. 如果從零幫 agent 設計服務
**Purpose:** 介紹 agent-friendly 服務的設計原則，用具體產品概念展示。
**Materials:**
- 概念：開源鏡像版人類常用工具，agent-first
- 設計原則：(1) 免費層零身份 (2) 付費門檻只需支付方式 (3) 標準介面：MCP, CLI, llms.txt
- 對比：人類服務靠身份圍牆獲取用戶注意力，agent 服務按使用量收費
- 三種使用者路徑：agent 直接用 / 開發者自架 / 非技術用戶透過客製服務

### 3. Bridge vs Foundation：哪些是過渡期產物？
**Purpose:** 核心框架——區分 agent 因為人類世界而需要的工具 vs agent 本來就需要的工具。
**Materials:**
- Bridge：mail（註冊要 email）、phone（2FA）、password manager（人類服務有密碼）
- Foundation：database（agent 要存資料）、git hosting（agent 要版控）、static site hosting（agent 要發布內容）
- 灰色地帶：calendar（跟人協調 vs agent 間排程）、doc/spreadsheet（人類可讀 vs 結構化資料）、newsletter（觸及人類讀者）
- 判斷方法：「如果所有服務都為 agent 設計，agent 還需要這個工具嗎？」
- Bridge 現在重要但會萎縮，Foundation 是長期方向

### 4. 從哪裡開始？
**Purpose:** 從框架推導行動。給讀者具體 takeaway。
**Materials:**
- 選擇標準：foundation > bridge、使用頻率、技術可行性
- 每 1-2 週一個新服務的節奏
- 每多一個 agent-native 服務，agent 需要的 bridge 就少一個
- 開放問題：bridge 的平台效應（email 的網路效應）會不會造成路徑依賴，讓過渡期變成永久？

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
