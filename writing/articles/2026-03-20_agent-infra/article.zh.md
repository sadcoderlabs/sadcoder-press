# Agent 基礎建設：當每個人都有自己的 Agent，我們需要什麼？

Cloudflare 在過去半年幫客戶擋掉了 [4,160 億次 AI bot 請求](https://www.wired.com/story/big-interview-event-matthew-prince-cloudflare/)。同一時間，Cloudflare 自己推出了 MCP server hosting，讓 AI agent 可以部署在它的平台上。封鎖 bot 和服務 bot，同一家公司同時在做。

Twitter 在 2023 年把 API 改成付費制，說是要打擊 bot。結果有資源的大型 bot 繼續運作，[被淘汰的是寫詩、報天氣的個人創作者 bot](https://www.tubefilter.com/2023/02/02/twitter-paid-api-access-bots/)。Neon 是一個原本給開發者用的 serverless Postgres，現在 AI agent 在上面建資料庫的速度[是人類的四倍](https://www.madrona.com/ai-agent-infrastructure-three-layers-tools-data-orchestration/)，Databricks 直接把它買了下來。

現有的服務正在選邊站：要嘛封鎖 agent，要嘛擁抱 agent。這中間的灰色地帶正在消失。問題不再是「agent 需不需要自己的基礎建設」，而是：需要哪些？哪些最重要？目前有誰在做？

## 一個判斷框架：依賴關係決定優先順序

怎麼判斷哪些 agent infra 比較重要？比起看市場規模或融資金額，更實用的方法是看依賴關係：沒有 X，Y 就不能運作。

從底往上大概是這樣：

**身份** → agent 沒有可信身份，其他服務無法信任它。Compute/Sandbox → agent 需要安全執行的環境。**持久狀態** → agent 需要跨步驟的記憶和 checkpoint。**工具存取** → agent 需要呼叫外部服務的標準方式。**支付** → agent 能花錢和收錢，才能成為經濟行為者。**Agent 間通訊** → 多個 agent 要能協作。**可觀測性** → 得看得到 agent 在做什麼。再往上是 Marketplace 和治理。

[LangChain 提出的需求特性](https://blog.langchain.com/why-agent-infrastructure/)可以拿來交叉驗證：agent 的工作是 long-running（分鐘級不是毫秒級）、stateful（要記得上下文）、需要 human-in-the-loop（要能暫停和恢復）、流量 bursty（不可預測）。現有為人類設計的 infra 在這四個維度上都有缺口，而缺口的嚴重程度跟依賴關係的位置高度吻合。

這個框架不是唯一的分法。[Madrona 用 Tools/Data/Orchestration 三層](https://www.madrona.com/ai-agent-infrastructure-three-layers-tools-data-orchestration/)來看，更簡潔但也更粗略。依賴關係框架的好處是能回答「先做什麼」這個問題。

## 底層：身份與 Compute

身份是目前最缺的一層。

Non-Human Identity（NHI）已經成為[獨立的安全類別](https://www.weforum.org/stories/2025/10/non-human-identities-ai-cybersecurity/)，WEF 和 Forrester 都把它列為 2025 年最重要的 cybersecurity 議題之一。但「agent 要怎麼有身份」這件事，業界還沒有共識。[SPIFFE/SPIRE](https://www.solo.io/blog/agent-identity-and-access-management---can-spiffe-work) 是 workload 身份的開放標準，正在被評估用於 agent，但它太重了。OAuth/OIDC 是為人類設計的，agent 沒有辦法完成人類的登入流程。[Aembit](https://aembit.io/) 做 secretless IAM，讓 agent 不需要持有密鑰就能安全存取服務。[Entro](https://entro.security/) 做統一的 NHI 安全平台。但這些都還是早期方案，離「標準」很遠。

Visa 和 Mastercard 的做法值得注意。[Visa 的 Trusted Agent Protocol](https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx) 和 [Mastercard Agent Pay](https://www.digitalcommerce360.com/2025/10/16/visa-mastercard-both-launch-agentic-ai-payments-tools/) 的核心不是封鎖 bot，而是識別合法的 agent。它們要解決的問題是：這個 agent 是誰派來的？它有權限做這件事嗎？這其實是身份層的延伸，只是從支付場景切入。

Compute 層相對成熟。[E2B](https://e2b.dev/) 是最明確的 agent-native sandbox cloud，讓 agent 在隔離環境中安全執行程式碼，2025 年完成了新一輪融資。[Browserbase](https://www.browserbase.com) 提供雲端瀏覽器給 agent 使用，它的 SDK Stagehand 月下載量超過 50 萬次，有 stealth mode 可以繞過網站的反爬機制。Modal 和 Fly.io 也在這個領域，但定位更偏通用 serverless，不像 E2B 和 Browserbase 那樣 agent-first。

## 中層：支付與 Agent 間通訊

支付層正在同時爆發。2025 年下半年，六個 agent payment 系統幾乎同時出現：

Coinbase 主導的 [x402 協議](https://www.galaxy.com/insights/research/x402-ai-agents-crypto-payments/)，讓 agent 在 HTTP 請求中內嵌 USDC 支付，用的是 HTTP 402 狀態碼。[Coinbase AgentKit](https://docs.cdp.coinbase.com/agent-kit/welcome) 讓 agent 管理自己的區塊鏈錢包。Visa TAP 和 Mastercard Agent Pay 從傳統金融切入。[Stripe 推出 USDC 支付](https://www.finextra.com/blogposting/29778/deep-dive-is-x402-payments-protocol-the-stripe-for-ai-agents)，跑在 Base 鏈上。Google 也有 [AP2（Agent Payments Protocol）](https://www.everestgrp.com/blogs/agentic-payments-reinventing-payments-for-the-ai-era-blog/)。

六個系統，沒有單一標準。Agent 目前無法帶著一個錢包在不同平台之間移動。但支付是 agent 從「替你操作工具」變成「獨立經濟行為者」的關鍵門檻，所以這個碎片化最終必須收斂。

通訊協定的情況好一些。[MCP（Model Context Protocol）](https://en.wikipedia.org/wiki/Model_Context_Protocol)是 Anthropic 推出的 agent-tool 介面標準，已有超過一千個 MCP server，OpenAI 在 2025 年 3 月也正式採用。[A2A（Agent2Agent Protocol）](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)是 Google 推出的 agent-agent 通訊協定，已移交 Linux Foundation 管理。MCP 解決 agent 怎麼用工具，A2A 解決 agent 怎麼跟 agent 講話，兩者互補。

但 A2A 定義了通訊格式，沒有解決信任問題：我怎麼知道跟我通訊的 agent 是誰在代表誰運作？這又回到了身份層。

## 早期案例全景

在存儲和記憶層，[Mem0](https://github.com/mem0ai/mem0) 做 agent 的通用記憶層，已發布 v1.0。Neon 的 serverless Postgres 成了 agent 建立資料庫的首選。Redis 的 vector search 適合 agent 的短期/長期記憶混合架構。

可觀測性是目前可以最快落地的層。[LangSmith](https://blog.langchain.com/why-agent-infrastructure/) 提供完整的 agent tracing 和 monitoring。[Langfuse](https://langfuse.com) 是開源替代方案，支援 self-hosting。Arize/Phoenix 用 OpenTelemetry 做 agent trace。AgentOps、Maxim AI、Galileo 也都在這個領域。跟其他層比，observability 的需求定義最清楚，工具也最成熟。

最有趣的早期案例或許是 [RentAHuman.ai](https://www.wired.com/story/ai-agent-rentahuman-bots-hire-humans/)。這是一個讓 AI agent 雇用人類的 marketplace：agent 透過 MCP server 或 REST API 發布任務（跑腿、開會、研究），人類競標接案。WIRED 在 2026 年 2 月報導它是第一個「AI 雇用人類」的平台。當 agent 能付錢、能發任務、能選人，marketplace 的方向就反過來了。

整體來看，目前仍是 scaffolding era。大部分方案是把人類的工具改裝給 agent 用。真正 agent-native 的全新設計——從一開始就不考慮人類使用者的設計——還在很早期。

## 接下來會發生什麼

用依賴關係框架來推：身份標準化會先發生（因為其他一切都依賴它），然後支付收斂（六個系統不可能長期並存），然後 agent 才能成為真正的經濟行為者，然後 marketplace 才能規模化。

目前最缺四件事：一個被廣泛採用的 agent 身份標準、支付協定的統一、長跑型 agent 的持久狀態管理、以及 agent 間的信任機制。

開放問題是：這些基礎建設會長出全新的平台公司，還是現有的大公司會吃掉這些機會？Cloudflare 已經在兩邊下注。Google 同時推 A2A 和 AP2。Stripe 加入了 USDC。歷史上，infra 的大轉變通常會產生新的平台公司，但這次的 incumbent 動作很快。
