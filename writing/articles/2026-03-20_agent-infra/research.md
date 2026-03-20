## Research Notes

### Research Questions
1. 目前有哪些專門為 AI agent（而非人類）設計的 infra、service、tool、app？列出盡可能多的早期案例，包含它們解決什麼問題、誰在做、目前狀態。範圍包括但不限於：身份/認證、存儲、通訊/messaging、支付、marketplace、compute、hosting、monitoring。
2. 現有為人類設計的服務（如 Twitter、email、marketplace）如何應對 bot/agent？它們的策略是什麼（封鎖、隔離、收費、開放）？有沒有服務從「為人設計」轉向「為 bot 設計」的案例？
3. 有什麼框架或分類法可以用來判斷 agent infra 各層之間的重要程度和優先順序？例如：Maslow's hierarchy 式的需求層次？依賴關係圖？市場規模？目前哪些層最缺、最急需？

---

### Findings

#### Q1：專門為 AI agent 設計的 infra、service、tool、app

目前 agent-native infra 的生態正在快速分化，按功能層可分為以下類別：

---

**🔑 身份 / 認證（Identity & Auth）**

- **Aembit** — workload IAM 平台，為 AI agent 提供「secretless access」，讓 agent 可以在不持有 secret 的情況下安全存取外部服務，支援即時 policy enforcement。狀態：商業產品，近期活躍。
- **Entro Security** — 統一 AI agent、Non-Human Identity (NHI) 與 secrets 的安全平台，提供完整可見性與異常偵測。
- **SPIFFE/SPIRE（開源標準）** — 原本設計給 workload 的身份框架，現被評估延伸到 AI agent。HashiCorp Vault 1.21 版本原生支援 SPIFFE 認證。Solo.io、NHIMG (Non-Human Identity Management Group) 都在研究 SPIFFE 如何適用 agent 場景。
- **Strata Maverics** — 企業身份協調層，支援 human、machine、agent 三類 actor 的統一認證與稽核。
- **WorkOS（評測）** — 評比各家 OAuth/OIDC provider 對 AI agent 認證的適配程度（Keycloak、Logto 等）。
- **NHI（Non-Human Identity）** — 整個安全業界形成的新類別，WEF、Forrester 皆已將其列為 2025 年最重要 cybersecurity 議題之一。

---

**💾 存儲 / 記憶（Storage & Memory）**

- **Mem0** — 專為 AI agent 設計的記憶層（universal memory layer），已發布 v1.0.0，支援多種 vector store。解決 agent 跨對話記憶持久化的問題。GitHub 活躍。
- **Neon（Serverless Postgres）** — 雖非 agent-only，但已成為 AI agent 建立資料庫的首選。Madrona 數據：AI agent 建立 Neon 資料庫的速度是人類開發者的 4 倍以上，Databricks 已收購 Neon。
- **Redis** — 提供 sub-millisecond 延遲的 in-memory 存儲 + vector search，適合 agent 短期/長期記憶混合架構。
- **Weaviate、Qdrant、Pinecone 等 vector DB** — 為 agent 長期記憶提供語意搜尋，主流框架（LangGraph、LlamaIndex）均整合。

---

**⚡ Compute / Sandbox / Hosting**

- **E2B（e2b.dev）** — Agent 專用雲端 sandbox，讓 AI agent 在隔離環境中安全執行程式碼。定位為「enterprise AI agent cloud」。2025 年 6 月完成新一輪融資。
- **Modal** — Serverless GPU / compute 平台，被評比為 top code sandbox runner 之一。
- **Browserbase + Stagehand** — 為 AI agent 提供雲端瀏覽器基礎設施，Stagehand 是其 AI browser automation SDK，月 npm installs 已超 500K。支援 Playwright/Puppeteer/Selenium，有 stealth mode 與 session persistence。
- **Fly.io、Replit、Daytona** — 也被列入 agent sandbox runner 比較。Replit 有 Agent 專案功能，$20/月含 4 vCPU 與 agent access。
- **SkyPilot** — 開源 LLM agent sandbox self-hosting 方案，支援跨雲部署。

---

**💸 支付（Payment）**

- **x402（Coinbase 主導，開源）** — 以 HTTP 402 狀態碼為基礎的 agent 支付協議。agent 可在 HTTP 請求中內嵌 USDC 支付，支持微支付、reusable sessions、multi-chain（v2，2025 年 12 月）。NEAR、Chainlink、XMTP 均在實驗整合。
- **Coinbase AgentKit** — CDP SDK，讓 AI agent 管理區塊鏈 wallet、執行 onchain 操作（轉帳、NFT、DeFi）。Coinbase 稱之為「every AI agent deserves a wallet」。
- **Visa Trusted Agent Protocol（TAP）** — 2025 年 10 月發布，10+ 合作夥伴，讓商家能辨別合法 AI agent 與惡意 bot，支援 agent 發起的安全結帳。
- **Mastercard Agent Pay** — 與 Visa TAP 同期發布，類似框架，聚焦於 agent-initiated payment 的身份驗證。
- **Stripe + USDC** — Stripe 推出專為 AI agent 設計的 stablecoin 支付系統，使用 Base 區塊鏈上的 USDC。
- **Google AP2（Agent Payments Protocol）** — Google Cloud 2025 年 9 月推出，支援 agent-led transaction。

---

**📡 通訊 / 協定（Communication & Protocol）**

- **MCP（Model Context Protocol，Anthropic 主導）** — 讓 AI agent 存取工具、API、外部資源的標準協議。2024 年 11 月發布後 1,000+ MCP servers 被建立。OpenAI 2025 年 3 月正式採用，微軟 Azure AI Agent Service 也整合。目前最廣泛採用的 agent 工具介面標準。
- **A2A（Agent2Agent Protocol，Google 主導）** — 2025 年 4 月 Google Cloud Next 發布，補充 MCP，讓不同技術棧的 agent 之間可以溝通協作。現已移交 Linux Foundation 管理。
- **Agora Protocol** — meta-coordination 層，整合 MCP、ANP、ACP 等多個協議，設計上相容 Web3。

---

**🔍 監控 / Observability**

- **LangSmith（LangChain）** — 完整的 AI agent tracing 與 monitoring 平台，支援多步驟 agent trace、成本追蹤、延遲分析。
- **Langfuse** — 開源 LLM 工程平台，支援 tracing 與 self-hosting，被廣泛採用。
- **Arize AI / Phoenix** — 企業級 ML observability，以 OpenTelemetry 為基礎，支援 agent trace 與 drift detection。
- **AgentOps** — 專注於 AI agent 行為監控。
- **Maxim AI** — 全端 AI 評估與 observability 平台，被評比為 2025 年最佳之一。
- **Galileo** — AI reliability platform，聚焦於 production agent 的可靠性保障。

---

**🛒 Marketplace / 任務分配**

- **RentAHuman.ai** — 最早期「agent 雇用人類」的 marketplace，AI agent 可以透過 MCP server 或 REST API 發布任務（如跑腿、開會、研究），人類競標接案。被 WIRED 報導為「第一個被 AI agent 雇用人類」的平台（2026 年 2 月）。
- **Moonhub** — AI recruiter agent，協助企業用 agent 完成招募流程。
- **FutureForce.ai** — agent 人力市場預測平台，預言 2030 年出現全由 AI 運作的微型企業。

---

**🤖 框架與 Orchestration（不完全 agent-native，但 agent 專用功能明顯）**

- **LangGraph Platform** — LangChain 推出的 agent infrastructure，提供 durable execution、stateful checkpointing、human-in-the-loop、burst concurrency 支援。
- **AutoGen（Microsoft）** — 多 agent 協作框架，強調靈活性與企業整合。
- **CrewAI** — role-based agent 協作框架，2024 年初發布，32,000+ GitHub stars，月下載近百萬。

**Sources:**
- [Aembit - Agentic AI and Workload IAM](https://aembit.io/) — agent-native secretless IAM 平台
- [Entro Security - AI Agent & NHI Platform](https://entro.security/) — 統一 NHI、agent 與 secrets 的安全平台
- [WorkOS: Best OAuth/OIDC providers for AI agents 2025](https://workos.com/blog/best-oauth-oidc-providers-for-authenticating-ai-agents-2025) — 評測各 identity provider 對 agent 認證的支援
- [SPIFFE for Agent Identity - Solo.io](https://www.solo.io/blog/agent-identity-and-access-management---can-spiffe-work) — 探討 SPIFFE 是否適用於 AI agent 身份管理
- [HashiCorp: SPIFFE for Agentic AI](https://www.hashicorp.com/en/blog/spiffe-securing-the-identity-of-agentic-ai-and-non-human-actors) — Vault 原生支援 SPIFFE 認證
- [WEF: Non-Human Identities - AI Cybersecurity](https://www.weforum.org/stories/2025/10/non-human-identities-ai-cybersecurity/) — WEF 對 NHI 安全風險的分析
- [mem0 GitHub](https://github.com/mem0ai/mem0) — universal memory layer for AI agents
- [E2B - The Enterprise AI Agent Cloud](https://e2b.dev/) — agent 專用 sandbox 雲端基礎設施
- [The New Era of Cloud Agent Infrastructure - E2B & Browserbase Report](https://jimmysong.io/blog/e2b-browserbase-report/) — E2B 與 Browserbase 的深度分析
- [Modal: Top AI Code Sandbox Products 2025](https://modal.com/blog/top-code-agent-sandbox-products) — 比較 Modal、E2B、Fly、Daytona 等 sandbox
- [Browserbase - Cloud Browser for AI Agents](https://www.browserbase.com) — 雲端瀏覽器 infra，for agent automation
- [Galaxy Research: x402 and AI Agents](https://www.galaxy.com/insights/research/x402-ai-agents-crypto-payments) — x402 協議深度分析
- [Stellar: x402 on Stellar](https://stellar.org/blog/foundation-news/x402-on-stellar) — x402 V2 跨鏈支援
- [Finextra: Is x402 the Stripe for AI Agents?](https://www.finextra.com/blogposting/29778/deep-dive-is-x402-payments-protocol-the-stripe-for-ai-agents) — x402 與各生態整合的深度評估
- [Coinbase AgentKit](https://docs.cdp.coinbase.com/agent-kit/welcome) — agent 區塊鏈 wallet 工具包
- [Coinbase: Introducing Agentic Wallets](https://www.coinbase.com/developer-platform/discover/launches/agentic-wallets) — agent-native wallet 設計理念
- [Visa: Trusted Agent Protocol](https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx) — Visa 的 agent 商務身份框架
- [Visa & Mastercard launch agentic AI payments](https://www.digitalcommerce360.com/2025/10/16/visa-mastercard-both-launch-agentic-ai-payments-tools/) — 兩大卡組織的 agent payment 計劃
- [Everest Group: Agentic Payments](https://www.everestgrp.com/blogs/agentic-payments-reinventing-payments-for-the-ai-era-blog/) — agentic payments 生態全覽
- [MCP Wikipedia](https://en.wikipedia.org/wiki/Model_Context_Protocol) — MCP 協議的概覽與採用狀況
- [Google A2A Announcement](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) — Google A2A 協議發布
- [Auth0: MCP vs A2A](https://auth0.com/blog/mcp-vs-a2a/) — 比較兩個主要 agent 通訊協議
- [Madrona: AI Agent Infrastructure Three Layers](https://www.madrona.com/ai-agent-infrastructure-three-layers-tools-data-orchestration/) — VC 視角的 agent infra stack 分析，含 Neon 4x 數據
- [LangChain: Why Agent Infrastructure Matters](https://blog.langchain.com/why-agent-infrastructure/) — agent 為何需要新型 infra 的論述
- [AImultiple: 15 AI Agent Observability Tools](https://research.aimultiple.com/agentic-monitoring/) — observability 平台評比
- [WIRED: The Rise of RentAHuman](https://www.wired.com/story/ai-agent-rentahuman-bots-hire-humans/) — AI agent 雇用人類的 marketplace

**Key insights:**
- **身份是最緊迫的基礎層**：NHI（Non-Human Identity）已成為獨立安全類別，但現有 IAM 工具多為人類設計，SPIFFE 等標準正被改造以支援 agent，但仍不成熟。
- **支付碎片化嚴重**：x402（USDC/crypto）、Visa TAP、Mastercard Agent Pay、Stripe USDC、Google AP2 同時並存，尚無單一標準，但都在 2025 年下半年密集發布。
- **Compute sandbox 是目前最具體落地的 agent-native 產品**：E2B、Browserbase 等已有真實收入與用戶。
- **協議標準化在加速**：MCP（Anthropic）→ A2A（Google）形成互補，一個解決 agent-tool 介面，另一個解決 agent-agent 溝通，Linux Foundation 接管 A2A 是重要的中立化信號。
- **Database 正在被 agent 重塑使用模式**：Neon 的數據（agent 創建 DB 速度是人類的 4 倍）顯示 agent 正在成為 infra 服務的最大消費者。
- **Marketplace 剛起步，但出現了「agent 雇用人類」的反轉模式**：RentAHuman.ai 是第一個真實案例。

---

#### Q2：現有為人類設計的服務如何應對 bot/agent？

現有服務面對 AI agent/bot 的策略可以分為：封鎖、收費隔離、授權開放、轉向擁抱四種模式，且常常混用。

---

**🚫 封鎖策略**

- **Cloudflare（工具提供者）**：
  - 2024 年 7 月推出一鍵封鎖 AI bot 功能，客戶可直接 block AI scraper。
  - 2025 年 7 月：提供 managed robots.txt 管理，特別是有廣告的網站可以靶向封鎖 AI crawler。
  - Cloudflare 報告：2025 年 7 月至 12 月初，已協助客戶封鎖 **4,160 億次** AI bot 請求。
  - Cloudflare CEO 稱此為「網路商業模式的劇烈轉變」。
- **新聞媒體**：BuzzStream 數據（2025 年 12 月）：79% 的頂級新聞網站透過 robots.txt 封鎖 AI training bots，71% 同時封鎖 AI retrieval bots，PerplexityBot 被 67% 封鎖。
- **ai-robots-txt（開源社群）**：GitHub 上有人維護 AI agent/bot 的封鎖清單（ai-robots-txt/ai.robots.txt），供網站管理員參考。

---

**💰 收費策略**

- **Twitter/X（API 付費化）**：
  - 2023 年 2 月，Twitter 宣布停止免費 API v1.1/v2，改為付費制，名義理由是「打擊 bot」。
  - 對原本靠免費 API 運作的「良善 bot」（如天氣 bot、詩歌 bot 等）造成毀滅性打擊。
  - Reddit 社群討論：X 定價被批「ridiculous」，對小型 bot 開發者完全不友善。
  - 諷刺點：此舉雖說封鎖 bot，但實際上 bot army 更有資源付費，真正被清除的是有創意的個人 bot。
- **Reddit**：Google 支付 6,000 萬美元/年授權 Reddit 用戶內容用於 AI 訓練。Reddit 同時對其 API 收取高額費用，導致多個第三方 app 關閉。
- **Cloudflare 付費存取模型**：提出「permission-based」新商業模式，讓 AI 公司需取得授權才能爬取內容。

---

**🔒 隔離 / 識別策略**

- **Visa + Mastercard**：不是封鎖，而是「識別」。Visa TAP 的核心邏輯是讓商家能區分合法 AI agent（代表用戶行動）與惡意 bot，然後選擇是否服務。
- **HUMAN Security（AgenticTrust）**：Forrester Q4 2025 列入 "Bot & Agent Trust Management" 類別，HUMAN 報告 2025 全年 agentic traffic 成長 **6,900%**，並開發工具讓企業治理 agent 流量。
- **SmartBear / API 管理**：提出「你的 API 最大客戶不是人類」論述，鼓勵企業把 agent 視為 first-class API 消費者，設計相應的 rate limiting、identity 政策。

---

**🔄 從「為人設計」轉向「為 bot/agent 設計」的案例**

- **Neon（Serverless Postgres）**：原本是給開發者用的 serverless DB，但當 AI agent 創建 DB 的速度超越人類 4 倍後，Neon 開始主動優化 agent-driven 使用場景（instant provisioning、branching），並成為 Databricks 收購目標。
- **Browserbase**：原本是 Playwright/Puppeteer 的托管服務，後來明確轉型為「AI agent 的雲端瀏覽器基礎設施」，加入 stealth mode（繞過反爬機制）等 agent-specific 功能。
- **Cloudflare（雙面策略）**：一方面幫客戶封鎖 bot，另一方面積極推出 AI gateway、Workers AI、MCP 支援，擁抱 agent 作為新的 API 消費者。Cloudflare 開始允許 AI 公司部署 MCP server 在其上，實際上是在吃兩邊的餅。
- **Google（搜尋到 AI gateway）**：Google Search 原本是為人設計，現在面對 AI agent 的搜尋替代（Perplexity 等），Google 推出 Gemini、AI Overview、AP2，試圖讓自己成為 agent 的首選 API 而非被繞過。
- **Perplexity（被指控偽裝 bot）**：被指控偽裝成合法訪客爬取受保護內容，顯示 agent/爬蟲與合法使用之間的灰色地帶。

---

**Sources:**
- [Cloudflare: Block AI Bots With One Click (2024)](https://blog.cloudflare.com/declaring-your-aindependence-block-ai-bots-scrapers-and-crawlers-with-a-single-click/) — Cloudflare 封鎖 AI bot 的政策起點
- [Cloudflare: Control Content Use for AI Training (2025)](https://blog.cloudflare.com/control-content-use-for-ai-training/) — managed robots.txt 與廣告網站保護
- [WIRED: Cloudflare Blocked 416 Billion AI Bot Requests](https://www.wired.com/story/big-interview-event-matthew-prince-cloudflare/) — Cloudflare CEO 談 AI 流量對網路商業模式的衝擊
- [BuzzStream: Which News Sites Block AI Crawlers in 2025?](https://www.buzzstream.com/blog/publishers-block-ai-study/) — 79% 頂級新聞網站封鎖 AI bot 的量化研究
- [GitHub: ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt) — 社群維護的 AI bot 封鎖清單
- [Tubefilter: Twitter's New Policy Will Kill Beloved Content Bots (2023)](https://www.tubefilter.com/2023/02/02/twitter-paid-api-access-bots/) — Twitter API 付費化對 bot 生態的衝擊
- [Reddit/SaaS: Twitter's Pricing is Ridiculous](https://www.reddit.com/r/SaaS/comments/1gh6qvj/twitters_pricing_is_ridiculous/) — 開發者社群對 X API 定價的反應
- [HUMAN Security: Bot & Agent Trust Report](https://www.humansecurity.com/learn/blog/forrester-bot-and-agent-trust-management-software-landscape-q4-2025/) — 6,900% agentic traffic 成長數據，以及 Bot & Agent Trust 類別的形成
- [SmartBear: Your API's Biggest Customer Isn't Human](https://smartbear.com/blog/your-apis-biggest-customer-isnt-human-preparing-for-the-agent-economy/) — agent 成為 API 最大消費者的論述
- [Neon: How Specific Provisions Databases for Coding Agents](https://neon.com/blog/how-specific-provisions-thousands-of-databases-for-coding-agents-using-neon) — agent 驅動 DB 創建的實際案例
- [McKinsey: The Agentic Commerce Opportunity](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants) — McKinsey 對 agentic commerce 的全面分析
- [Gartner: Agentic AI to Resolve 80% of Customer Service Issues by 2029](https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-20290) — Gartner 預測

**Key insights:**
- **封鎖是目前大多數服務的第一反應**，但這是過渡策略——真正的問題是如何「識別並收費」，而非一律封鎖。
- **Twitter/X 的 API 付費是典型的「打著反 bot 旗號做商業決策」**，結果是保留了大 bot（有錢付費），淘汰了小創作者 bot。
- **Cloudflare 的雙面策略最具代表性**：同時賣封鎖工具給一端，又賣 agent-friendly infra 給另一端。
- **「服務轉向 agent-first」的案例以 database、browser、storage 層最明顯**，應用層（Twitter、媒體）目前多採封鎖/收費，而不是擁抱。
- **Visa/Mastercard 的做法顯示成熟服務的路徑**：不是封鎖，而是設計「合法 agent 識別機制」，然後在識別後正常服務甚至優化體驗。

---

#### Q3：agent infra 各層重要程度的框架與分類法

目前業界有幾個互補的框架：

---

**框架 1：Madrona 的三層架構（Tools / Data / Orchestration）**

Madrona VC 在 2024 年 6 月與 2025 年 4 月兩度更新分析，提出 agent infra 三層：
1. **Tools**：agent 可呼叫的工具與 API（MCP servers、browser automation 等）
2. **Data**：agent 讀取與儲存的資料（vector DB、document stores、memory layers）
3. **Orchestration**：agent 執行與協調（durable execution、stateful runtime、human-in-the-loop）

Madrona 的判斷標準是「哪層的需求正在從 DIY/自建走向標準化商業產品」。

---

**框架 2：LangChain 的「為什麼需要新 infra」——以需求特性為基礎**

LangChain 提出 agent 工作負載的四個獨特需求特性，每個特性對應一個 infra 空缺：
1. **Long-running**（分鐘級，非毫秒級）→ 需要 durable execution runtime
2. **Stateful**（跨步驟記憶上下文）→ 需要 structured state management
3. **Human-in-the-loop**（需要暫停/繼續）→ 需要 resumable state + async coordination
4. **Bursty**（流量不可預測）→ 需要 burst concurrency 支援

這個框架類似 Maslow：下層未解決，上層就不穩。

---

**框架 3：DTCP 的「五層 agent infra 缺口」（VC 投資視角，2025 年 7 月）**

DTCP Capital 的 deep dive 報告（2025 年 7 月）將今日 agent infra 的關鍵缺口歸為 5 個類別：
- 這五層被描述為「scaffolding」（現有湊合方案）尚不能支撐的領域。
- 聚焦於：安全/合規、身份、狀態管理、協調、可觀測性。

---

**框架 4：arxiv 學術框架——Internet of Agents 的 OSI 模型類比**

arxiv 論文（2511.19699，2026 年 1 月）提出在現有 OSI 7 層之上再加兩層：
- **L8：Agent Communication Layer**
- **L9：Agent Semantic Layer**

另一篇論文（2501.10114）強調「oversight layer」（監督層）的重要性：對 agent malfunction 的 rollback 能力，即使尚未廣泛採用，也應優先建立。

---

**框架 5：依賴關係 / 優先順序判斷**

綜合各框架，可以用「依賴關係」來判斷優先序：

```
[底層必需，缺了啥都不能做]
Layer 1: 身份/認證 (Identity) — agent 沒有可信身份，其他服務無法信任它
Layer 2: Compute/Sandbox — agent 需要地方安全執行
Layer 3: 持久狀態 (Durable State) — agent 需要記憶與 checkpoint
Layer 4: 工具存取 (Tool Access/MCP) — agent 需要呼叫外部服務的標準方式

[中層，大幅提升能力]
Layer 5: 支付 (Payment) — agent 能消費/提供服務才有真實 autonomy
Layer 6: Agent-to-Agent 通訊 (A2A) — 多 agent 協作
Layer 7: 可觀測性 (Observability) — 理解 agent 在做什麼

[上層，規模化後才緊迫]
Layer 8: Marketplace / 任務分配
Layer 9: 治理 / 合規 / 稽核
```

---

**目前最缺、最急需的層**

1. **身份（最缺）**：NHI 已是安全類別，但 agent-specific 標準（如何給一個 ephemeral agent 一個可審計的身份）仍未有共識。SPIFFE/SPIRE 太重，OAuth 太以人為中心，業界正在摸索。
2. **支付碎片化**：x402、Visa TAP、Mastercard、Stripe、Google AP2 同時存在，沒有單一標準。agent 無法跨平台帶著「錢包」移動。
3. **持久狀態 / Durable Execution**：Serverless 架構根本不支援長跑型 agent；LangGraph Platform、Temporal 等方案存在，但生態碎片化。
4. **Agent-to-Agent 信任**：A2A 協議定義了通訊格式，但沒有解決「我怎麼知道這個 agent 是誰在代表誰運作」的信任問題。

**Sources:**
- [Madrona: AI Agent Infrastructure Three Layers](https://www.madrona.com/ai-agent-infrastructure-three-layers-tools-data-orchestration/) — Tools/Data/Orchestration 三層框架，含 Neon 4x 數據
- [LangChain: Why Agent Infrastructure Matters](https://blog.langchain.com/why-agent-infrastructure/) — 從 agent 工作負載特性推導 infra 需求
- [DTCP Capital: Deep Dive on Agents Infrastructure Preview](https://www.dtcp.capital/fileadmin/DTCP/Bilder/News/202507_DTCP_Agent_Infrastructure_Preview_v1.pdf) — VC 投資視角的五層缺口分析
- [arxiv: Infrastructure for AI Agents (2501.10114)](https://arxiv.org/pdf/2501.10114) — 學術論文，強調 oversight layer 的優先性
- [arxiv: Layered Protocol Architecture for Internet of Agents (2511.19699)](https://arxiv.org/abs/2511.19699) — 提出 L8/L9 的 agent 通訊與語意層
- [XenonStack: Agentic AI Infrastructure Stack](https://www.xenonstack.com/blog/ai-agent-infrastructure-stack) — 9 層 agentic infra stack 詳解
- [ExploreDatabase: Agentic AI Infrastructure Stack 2026](https://www.exploredatabase.com/2026/03/agentic-ai-infrastructure-stack-explained.html) — 2026 年視角的 9 層分析
- [Bunnyshell: What Do You Use for AI Agent Infrastructure?](https://www.bunnyshell.com/blog/what-do-you-use-for-ai-agent-infrastructure/) — 多 agent 系統的 infra 挑戰實作指南
- [BigData Boutique: AI Infrastructure Starts With Data](https://bigdataboutique.com/blog/ai-infrastructure-starts-with-data-why-databases-are-critical-in-the-agentic-ai-era) — McKinsey: 78% 企業部署 GenAI 但沒有實質收益，問題在 data 層
- [a16z: Big Ideas 2026](https://a16z.com/newsletter/big-ideas-2026-part-1/) — a16z 對 2026 年 agent infra 與 data stack 的預測

**Key insights:**
- **目前最成熟的框架是 Madrona 的三層（Tools/Data/Orchestration）**，實用性高，可直接對照當前市場。
- **LangChain 的需求特性框架（long-running, stateful, HITL, bursty）是判斷「現有 infra 哪裡不夠用」的最清晰工具**。
- **「依賴關係圖」比「市場規模」更適合判斷優先順序**：身份和 compute 是其他一切的前提，即使市場規模現在不大。
- **支付層是「agent 真正自主」的關鍵門檻**：沒有 payment，agent 只能操作，無法消費/交易，無法成為真正的經濟行為者。
- **目前 agent infra 整體仍是「scaffolding era」**：大部分方案是把人類工具湊合用，agent-native 的真正新設計還在早期。Madrona 的說法："Back then, dominated by DIY solutions; today, that picture has changed dramatically."
- **可觀測性是被低估的緊迫需求**：agent 在生產環境中行為不透明，但 observability 工具（LangSmith、Langfuse 等）已相對成熟，是目前可以快速落地的層。
