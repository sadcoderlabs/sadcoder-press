# Writing Brief

## Article Info
- Title: Agent 基礎建設：當每個人都有自己的 Agent，我們需要什麼？
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
- Reader takeaway: 一個判斷 agent infra/service/tool/app 重要程度的框架，加上目前早期案例的全景圖，讓讀者能自己評估哪些方向值得關注或投入
- Goal alignment: 直接展現團隊在 agent 基礎建設方向的深度思考，這正是「為 agent 世界打造產品」的團隊最該寫的文章——有框架、有案例、有觀點

## Writing Style


## Raw Materials

### 作者素材（Shao 原始 pitch）
- 每個人都會有自己的 agent，但現有服務為人類打造
- 每個 marketplace 都有誘因阻擋/隔離 bot
- 服務會分化：完全面向 bot（mails.dev）或完全面向人類（Twitter）
- Agent 需要什麼基礎建設？身份？存儲？
- 有了基礎建設後需要什麼應用？
- 不要花篇幅解釋「為什麼需要」——讀者已知，直接進入探索
- 需要框架判斷重要程度
- 需要早期案例

## Outline

### 1. 現有服務正在選邊站（簡短開場）
**Purpose:** 用 2-3 個具體案例快速建立前提——不解釋「為什麼」，只展示「正在發生什麼」，然後直接進入正題。
**Materials:**
- Cloudflare 雙面策略：幫客戶封鎖 4,160 億次 AI bot 請求，同時賣 agent-friendly infra（MCP server hosting）
- Twitter/X API 付費化：名義反 bot，實際淘汰了小創作者 bot，大 bot 反而有錢付費
- Neon：原本給人用的 serverless DB，agent 創建速度是人類 4 倍，現在轉型 agent-first
- 作者觀點：服務正在分化為「完全面向 bot」或「完全面向人類」

### 2. Agent 需要什麼基礎建設？——一個依賴關係框架
**Purpose:** 提出文章核心框架：用依賴關係圖判斷 agent infra 各層的重要程度。不是列清單，而是給讀者一個能自己判斷的工具。
**Materials:**
- 依賴關係框架（底→上）：身份 → Compute → 持久狀態 → 工具存取 → 支付 → Agent 間通訊 → 可觀測性 → Marketplace → 治理
- LangChain 需求特性框架作為補充：long-running / stateful / HITL / bursty——判斷現有 infra 哪裡不夠用
- Madrona 三層（Tools/Data/Orchestration）作為另一個參照
- 核心論點：用「沒有 X，Y 就不能運作」來判斷優先順序，比用市場規模更準

### 3. 底層：身份與 Compute（目前最缺的）
**Purpose:** 深入探索框架中最底層、最急需的兩塊。
**Materials:**
- **身份**：NHI 已成 Forrester 獨立類別；SPIFFE 太重、OAuth 太以人為中心；Aembit secretless IAM；Entro；WEF 列為 2025 最重要 cybersecurity 議題
- **Compute/Sandbox**：E2B（agent cloud，已融資）、Browserbase+Stagehand（500K 月下載，有 stealth mode）、Modal
- Visa TAP / Mastercard Agent Pay 的做法：不封鎖，而是「識別合法 agent」——這其實是身份層的延伸

### 4. 中層：支付與 Agent 間通訊（碎片化最嚴重的）
**Purpose:** 展示正在同時爆發但尚無標準的兩個關鍵層。
**Materials:**
- **支付**：x402（Coinbase/USDC/HTTP 402）、Coinbase AgentKit、Visa TAP、Mastercard Agent Pay、Stripe USDC、Google AP2——六個系統 2025 下半年同時出現，沒有單一標準
- **協議**：MCP（Anthropic，1000+ servers，OpenAI 也採用）解決 agent↔tool；A2A（Google，移交 Linux Foundation）解決 agent↔agent
- 核心觀察：支付是 agent 從「操作者」變成「經濟行為者」的門檻

### 5. 早期案例全景
**Purpose:** 給讀者一張快速參照的地圖——目前誰在做什麼，各層有什麼。
**Materials:**
- 存儲/記憶：Mem0（v1.0）、Neon、Redis vector search、各家 vector DB
- 監控：LangSmith、Langfuse、Arize、AgentOps——可觀測性是目前可以最快落地的層
- Marketplace：RentAHuman.ai（agent 雇用人類，WIRED 報導首例）
- 整體判斷：目前仍是 scaffolding era——大部分是把人類工具湊合用，真正 agent-native 的設計還在早期

### 6. 接下來會發生什麼？
**Purpose:** 用框架推導接下來最可能發生的事，給讀者 actionable 判斷。
**Materials:**
- 框架推導：身份標準化 → 支付收斂 → agent 成為真正的經濟行為者 → marketplace 規模化
- 目前最缺四件事：agent 身份標準、支付統一、持久狀態、agent 間信任
- Madrona："Back then, dominated by DIY solutions; today, that picture has changed dramatically"
- 開放問題：agent 基礎建設會長出全新的平台，還是現有大公司（Cloudflare、Google、Stripe）會吃掉這些機會？

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
