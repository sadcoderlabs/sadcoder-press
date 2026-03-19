## Research Notes

### Research Questions
1. 目前社群中 AI 輔助寫作的主流做法有哪些？了解大家怎麼用 AI 寫文章，常見的痛點是什麼（例如產出空洞、缺乏個人觀點）
2. Agent Skills 生態系目前的發展狀況？agentskills.io 標準、有哪些 agent 支援、社群採用程度如何
3. 有沒有其他「AI 作為引導者而非代筆者」的寫作工具或方法？看看是否有類似理念的產品或文章，了解這個做法在光譜上的定位

### Findings

#### 1. AI 輔助寫作的主流做法與痛點

**主流做法：**

目前最常見的 AI 寫作流程是「AI 產出初稿，人類審稿修改」。根據多方報導，AI 可將初稿時間縮短 50-70%，原本需要 4 小時的部落格文章，現在 1-2 小時即可完成提示與修潤，團隊產能可提升 2-3 倍。主要應用場景包括：腦力激盪主題與大綱、生成初稿、改寫與潤飾、SEO 優化，以及多語言翻譯。

在技術寫作領域，AI 最有效的用法是將可信輸入（規格文件、工單、SME 訪談紀錄、API 文件）轉化為結構化草稿，而非憑空創造內容。

**常見痛點：**

- **內容空洞、千篇一律**：AI 產出的文字預設就是通用的，因為模型是在整個網際網路的數十億字上訓練的。缺乏真實的個人聲音和情感深度是 AI 生成文字最根本的限制之一。LLM 的預設語調是正式、中性、情感疏離的，常被形容為「讀起來像公司文件或技術手冊」。
- **個人風格消失**：模型的 instruction-tuning 過程會進一步抹平風格變化，將輸出推向通用的、解決問題的人格。一項調查顯示 68% 的讀者偏好含有個人故事的文章，而非演算法優化的清單。
- **品牌聲音侵蝕**：無意識地使用 AI 內容會悄悄侵蝕品牌的獨特聲音。
- **「內容創作疲勞」**：部分使用者開始放棄 AI 寫作工具，因為產出品質無法滿足期望，反而增加了修改的工作量。
- **認知債務**：心理學研究指出，使用 ChatGPT 寫文章會產生「認知債務」（cognitive debt），導致後設認知懶惰（metacognitive laziness），削弱批判思考、創造力和問題解決能力。

**正面觀點：**

支持者認為痛點的根源不在工具本身，而在使用方式。如果使用者提供自己的想法、聲音和寫作模式作為輸入，並用 AI 處理結構、研究或創意激盪，同時保持對最終成品的控制，就能避免「機器人風格」的問題。

**Sources:**
- [AI Content Guide: Best Practices for Writing in 2026](https://copyleaks.com/blog/best-practices-for-writing-ai-content) — 2026 年 AI 寫作最佳實踐總覽，包含產業數據
- [Content Creation Fatigue: Why Users Are Ditching AI Writing Tools in 2025](https://medium.com/@meyarbrough_55952/content-creation-fatigue-why-users-are-ditching-ai-writing-tools-in-2025-87f2ccf5f5ff) — 分析使用者放棄 AI 寫作工具的原因
- [The Ten Telltale Signs of AI-Generated Text](https://www.theaugmentedaducator.com/p/the-ten-telltale-signs-of-ai-generated) — 深入分析 AI 文字為何缺乏個人風格的技術原因
- [How mindless use of AI content undermines your brand voice](https://cxl.com/blog/ai-content-and-the-silent-erosion-of-brand-voice/) — 探討 AI 如何悄悄侵蝕品牌聲音
- [Using AI to Improve Your Writing (Without Losing Your Voice)](http://indisputably.org/2025/04/using-ai-to-improve-your-writing-without-losing-your-voice/) — 在使用 AI 同時保持個人風格的實用建議
- [AI in technical writing: complete guide for 2026](https://instrktiv.com/en/ai-in-technical-writing/) — 技術寫作中 AI 的應用方式，強調從可信輸入轉化為草稿
- [AI Writing Trends 2026: Data, Statistics, and the Future of Content Creation](https://www.humanizeai.io/blog/article/ai-in-content-writing-key-statistics-trends-and-insights) — AI 寫作市場統計數據與趨勢

**Key insights:**
- 「AI 產初稿、人類修改」是當前主流，但這個流程的根本問題是 AI 無法帶入作者的獨特觀點和經驗，因此產出往往是「正確但空洞」的。
- 痛點的核心是輸入品質問題：如果作者沒有先釐清自己的想法就讓 AI 寫，產出自然空洞。這直接呼應了「AI 作為引導者萃取觀點」的理念。
- 68% 讀者偏好含個人故事的文章，這為「先萃取作者素材再寫作」的方法提供了需求端的佐證。

---

#### 2. Agent Skills 生態系發展狀況

**標準概述：**

Agent Skills 是由 Anthropic 於 2025 年 12 月 18 日發布的開放標準，規格與 SDK 公布於 agentskills.io。Skills 是包含指令、腳本和資源的目錄，AI agent 可動態發現並載入。每個 skill 需要一個 SKILL.md 檔案，包含 YAML frontmatter 和 Markdown 內容。

**技術架構 — 漸進式揭露（Progressive Disclosure）：**

SKILL.md 的關鍵創新是三層載入系統：
1. **Metadata Level**：agent 根據任務匹配 skill 的描述
2. **Instructions Level**：載入 SKILL.md 本體的詳細指令（建議 5000 tokens 以下）
3. **Resources Level**：按需讀取補充檔案（references、templates、assets）

這個模式讓 agent 的 context window 保持精簡，同時可按需存取深層領域知識。

**生態系採用：**

截至目前，已有超過 30 個 agent 產品支援此標準，包括主要玩家：
- **Anthropic**: Claude、Claude Code
- **OpenAI**: Codex
- **Google**: Gemini CLI
- **Microsoft**: VS Code、GitHub Copilot
- **獨立工具**: Cursor、Roo Code、Amp、Goose、Firebender、Junie (JetBrains)
- **企業平台**: Databricks、Snowflake、Spring AI
- **其他**: OpenHands、Letta、Factory、TRAE (ByteDance)、Mistral AI Vibe、NovelCrafter、Qodo 等

合作夥伴提供的 skills 包括 Canva、Stripe、Notion、Zapier 等。

**與 MCP 的關係：**

Agent Skills 和 MCP (Model Context Protocol) 解決不同問題，屬於互補而非競爭。MCP 像「USB-C 連接埠」提供結構化工具整合（讓 LLM 以確定性方式與外部世界對話），Skills 則像「知識雲」提供行為指引和領域知識。2026 年 1 月 MCP 也採用了漸進式發現機制，兩者在技術上進一步趨同。截至 2026 年初，MCP 每月 SDK 下載量超過 9700 萬次，部署超過 10,000 個伺服器。

**批評與挑戰觀點：**

有分析認為 Anthropic 的策略是透過定義基礎設施標準來建立影響力——如果 skills 成為標準，Claude 不需要是唯一使用它的 AI，只需要是最擅長使用它的。這引發了對「開放標準」背後商業動機的討論。

**Sources:**
- [Overview - Agent Skills](https://agentskills.io/home) — 官方首頁，列出所有支援的 agent 產品和基本概念
- [Specification - Agent Skills](https://agentskills.io/specification) — SKILL.md 格式的完整技術規格
- [Anthropic Opens Agent Skills Standard (Unite.AI)](https://www.unite.ai/anthropic-opens-agent-skills-standard-continuing-its-pattern-of-building-industry-infrastructure/) — 分析 Anthropic 開放標準的策略意圖
- [Agent Skills: Anthropic's Next Bid to Define AI Standards (The New Stack)](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/) — 技術媒體對 Agent Skills 的深度分析
- [Anthropic launches enterprise Agent Skills (VentureBeat)](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard) — 企業端採用與合作夥伴生態
- [MCP vs Agent Skills: Why They're Different, Not Competing](https://dev.to/phil-whittaker/mcp-vs-agent-skills-why-theyre-different-not-competing-2bc1) — 釐清 Skills 與 MCP 的互補關係
- [Skills vs MCP tools for agents: when to use what (LlamaIndex)](https://www.llamaindex.ai/blog/skills-vs-mcp-tools-for-agents-when-to-use-what) — LlamaIndex 的技術比較分析
- [What Are Agent Skills and How To Use Them (Strapi)](https://strapi.io/blog/what-are-agent-skills-and-how-to-use-them) — 實作導向的入門指南
- [Agent Skills on Simon Willison's blog](https://simonwillison.net/2025/Dec/19/agent-skills/) — 獨立開發者社群的觀點

**Key insights:**
- Agent Skills 已獲得產業級的廣泛採用（30+ agent 支援），不再只是 Anthropic 的專屬格式，這為「用 Skills 驅動寫作工作流」提供了可移植性的論述基礎。
- Skills 的漸進式揭露機制正好適合寫作場景：不同寫作階段只載入需要的知識，避免 context window 浪費。
- Skills 與 MCP 互補的定位很重要——Skills 擅長「如何做」的程序性知識，MCP 擅長「連接什麼」的工具整合。寫作工作流更需要前者。

---

#### 3.「AI 作為引導者而非代筆者」的寫作工具與方法

**核心理念：**

「AI 不應該替你寫，而是幫助你寫得更好」這個理念在 2025-2026 年間獲得越來越多關注。核心論點是：依賴 AI 代筆會阻礙寫作能力的提升、妨礙個人聲音的發展，而且讀者能感知到（並反感）AI 代筆的內容。

**方法一：蘇格拉底式 AI 對話寫作法**

Sean Shadmand 提出的「Socratic AI」方法，透過辯論式對話來產出更好的內容。作者不要求 AI 寫文章，而是用 AI 來辯論和質疑自己的想法，在對話中萃取和精煉觀點。這個方法包含：情境設定、反覆提問以深入探索回應、假設情境以產出具體想法、以及批判性評估讓 AI 精煉自己的建議。

這與 Writer-Skills 的「AI 作為引導者萃取作者觀點」理念高度吻合。

**方法二：Khan Academy Writing Coach**

Khan Academy 的 Writing Coach 是「引導而非代筆」理念在教育領域的具體實作。它「引導學生從大綱到定稿——從不替他們寫一個字」。特色包括：逐步互動式支援、個人化回饋、不產出完成的文字而是鼓勵學生批判性思考自己的作品。教師端可監控每個學生的寫作過程和進步。

**方法三：以作者素材為核心的 AI 寫作工具**

部分工具採用「帶上你自己的素材」策略：
- **NovelCrafter** 的核心是「Codex」——作者建立的結構化故事資料庫（角色、場景、設定），AI 寫作時參照這個 Codex，確保產出符合作者的世界觀。
- **Sudowrite** 的協作模式：作者提供故事、角色和情感核心，AI 處理描述擴展、對話潤飾和變體腦力激盪。
- **ProWritingAid** 更偏向「教練」角色，提供超過 25 種詳細報告分析節奏、對話、敘事流等，但不替作者寫作。

**方法四：從訪談/口述萃取知識**

AI 在從訪談錄音和文字稿中自動萃取關鍵洞察方面已有成熟應用，能根據預定義的研究目標使用自然語言處理來識別相關資訊和引述。這個概念可延伸到寫作：先透過結構化訪談萃取作者的知識，再將其轉化為文章。

**光譜定位：**

```
完全 AI 代筆 ←──────────────────────────────→ 完全人工寫作
     │                    │              │           │
   ChatGPT            Sudowrite     Writer-Skills   純文字編輯器
   直接產出            協作寫作      AI 引導萃取
   Jasper             NovelCrafter   Khan Writing    Hemingway App
                                     Coach
                                     Socratic AI
```

Writer-Skills 的定位偏向「人工寫作」端，但透過結構化的引導流程降低了寫作門檻。它與 Khan Writing Coach 和 Socratic AI 方法最為接近，核心差異在於 Writer-Skills 用 Agent Skills 標準化了這個流程，使其可重複、可分享、可跨 agent 使用。

**對立觀點：**

也有人認為「引導式」方法效率太低，對於需要大量產出的場景（如內容行銷），直接讓 AI 代筆再人工編輯仍然是最實際的選擇。AI 寫作市場預估 2025 年達 12-18 億美元，2030 年將達 49 億美元（年複合成長率 22.5%），這個增長主要來自「代筆」端的需求。

**Sources:**
- [AI Should Be a Writing Tool, Not a Ghostwriter](https://www.samwoolfe.com/2025/07/ai-should-be-a-writing-tool-not-a-ghostwriter.html) — 深入論述 AI 應輔助而非取代寫作的核心論點
- [Socratic AI: The debate-based Writing Method to create better content](https://seanshadmand.com/2025/08/21/socratic-ai-the-debate-based-writing-method-to-create-better-content/) — 蘇格拉底式 AI 對話寫作法的具體實踐
- [Khan Academy Writing Coach](https://www.khanmigo.ai/writingcoach) — 教育領域「引導不代筆」的具體產品實作
- [Socratic Prompting: Explore Ideas with Guided Questions](https://fvivas.com/en/socratic-prompting-technique/) — 蘇格拉底提示工程技術詳解
- [Transform Your AI into a True Intellectual Partner: The Socratic Prompt](https://manoloremiddi.com/2025/05/16/transform-your-ai-into-a-true-intellectual-partner-the-socratic-prompt-guide/) — 將 AI 轉化為知識夥伴的提示方法
- [Best AI for Writing Fiction 2026: 11 Tools Tested](https://blog.mylifenote.ai/the-11-best-ai-tools-for-writing-fiction-in-2026/) — 2026 年 AI 寫作工具橫評，展示協作式工具的生態
- [NovelCrafter](https://www.novelcrafter.com/) — 以作者 Codex 為核心的 AI 寫作工具
- [How to Use AI Writing Tools in 2025 Without Losing Your Creative Voice](https://vocal.media/journal/how-to-use-ai-writing-tools-in-2025-without-losing-your-creative-voice) — 在使用 AI 同時保持創作聲音的實用指南
- [How Creative Writers Integrate AI into their Writing Practice (arXiv)](https://arxiv.org/pdf/2411.03137) — 學術研究：創意寫作者如何整合 AI 到寫作實踐

**Key insights:**
- 「AI 引導者」理念已有多個先例（Khan Writing Coach、Socratic AI 方法），但尚無一個標準化、可重複的實作框架——這正是 Writer-Skills 的差異化定位。
- NovelCrafter 的 Codex 概念與 Writer-Skills 的「先萃取素材」理念相似，但 Codex 是為小說設計的靜態知識庫，而 Writer-Skills 是動態的引導式訪談流程。
- 市場上大多數工具仍偏向「代筆」端，「引導者」定位的工具相對稀少，這既是機會也是挑戰——需要教育使用者這種方法的價值。
