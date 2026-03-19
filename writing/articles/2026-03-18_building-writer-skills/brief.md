# Writing Brief

## Article Info
- Title: 我們如何打造 Writer-Skills：一套用 AI Agent Skills 驅動的寫作工作流
- Author: Yuren Ju
- Date: 2026-03-18
- Status: review  <!-- draft | ready | writing | review | published -->
- Original language: zh
- Translations: en

## Target Audience
- Who: 想用 AI 輔助寫作但對成果不滿意的工程師，以及想推動團隊技術寫作的人
- Background: 用過 AI 生成文章但覺得產出空洞、缺乏觀點，或者想讓團隊寫文章但大家不知道從何下手
- Prior state: 認為 AI 寫作 = 讓 AI 幫你寫，但產出總是像罐頭內容；還沒意識到 AI 的價值在於幫作者釐清自己的想法，而不是取代作者

## Source Ideas
- "How we built writer-skills — a writing workflow powered by AI agent skills" from ideas.md (2026-03-18)

## Article Goals
- Reader takeaway: AI 寫作的正確姿勢不是讓 agent 代筆，而是用 agent 作為引導者來萃取作者的觀點和素材。Writer-skills 就是這個理念的具體實作。
- Goal alignment: 這篇文章自然地展示了我們在 AI agent 領域的實作經驗 — 不只是用 agent，而是深入理解 agent 的限制後設計出更好的工作流。這種「踩過坑之後的洞察」正是吸引讀者持續關注的內容。

## Writing Style

## Outline

### 1. 開場：AI 寫作的問題 — 為什麼直接讓 AI 寫文章行不通
**Purpose:** 用讀者熟悉的痛點建立共鳴，引出「AI 寫作的根本問題不在寫作技巧，而在準備不足」的核心論點
**Materials:**
- Author insight: 「AI Agent 如果沒有導引的話寫作能力很差」
- Author insight: 「準備階段決定內容品質，寫作階段決定表達技巧」— 大多數人只關注後者
- Research: 主流做法是「AI 產初稿、人類修改」，但產出空洞、缺乏個人觀點是最大痛點
- Research: 68% 讀者偏好含個人故事的文章，AI 預設產出的「正確但空洞」內容無法滿足
- Research: 痛點的核心是輸入品質問題 — 作者沒先釐清想法就讓 AI 寫，產出自然空洞

### 2. 前一版的教訓 — 從非虛構寫作 Skill 踩過的雷
**Purpose:** 用真實的失敗經驗展示「為什麼準備資料這麼重要」，讓讀者看到這不是空談而是實踐中得出的結論
**Materials:**
- Author experience: 之前寫過一個針對非虛構寫作的 Skill，踩了很多雷
- Author insight: 需要事先準備更多資料 — 讀者是誰、讀者讀完可以獲得什麼、用讀者角度重新審核文字
- Author insight: AI 對情緒的理解有問題，什麼文字帶來什麼情緒沒有好的規則可以說明，寫作本身太複雜無法一步到位
- Author insight: 從 Claude Prompting Best Practices 學到要大量舉例 — 記錄每次修改的原因，告訴 AI 不好的例子和好的例子
- Author insight: 修改紀錄本身就是教學素材，把人類的審稿過程轉化為 AI 可學習的規則
- Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md

### 3. 設計理念 — 不是讓 AI 代筆，而是用 AI 萃取觀點
**Purpose:** 提出文章的核心論點，翻轉讀者對「AI 寫作」的認知
**Materials:**
- Author insight: 「如果要完全交由 AI Agent 協作，它做得並不好。但給它足夠的資料和想要表達的觀點，有高品質素材後它可以做得更好」
- Author insight: 「想要表達什麼重點，跟想要表達的東西有沒有好好傳達，這才是更重要的」
- Author insight: 寫作最大的障礙不是「寫不好」，而是「啟動的摩擦力太大」— 用對話引導降低啟動門檻
- Author insight: 這個工具可能像訓練輪 — 經過練習後使用者可能不再需要它
- Research: Writer-Skills 在光譜上偏向「人工寫作」端，核心差異是用 Agent Skills 將引導流程產品化

### 4. 三個 Skill 的架構 — Management、Preparation、Writing
**Purpose:** 展示具體的拆分邏輯和每個 skill 的職責，讓讀者理解這套系統怎麼運作
**Materials:**
- Author insight: 雙重設計視角 — Management 從團隊角度（統一方向、定調），Preparation + Writing 從個人寫作實踐提煉
- Author context: 設計之初就是為了讓公司同事一起用，很多同事對寫作沒有熱情，希望降低門檻
- Author insight: 同事其實有很多有趣的事情可以分享，但寫作的摩擦力太大，壓力大到難以啟動
- Context: Management 負責想法蒐集和團隊定調；Preparation 負責訪談萃取素材；Writing 負責將素材轉化為文章

### 5. Subagent 架構 — 研究者、寫作者、編輯的獨立 Context
**Purpose:** 展示技術架構上最有趣的設計決策，也是從 Superpowers Brainstorming 借鑑的核心機制
**Materials:**
- Author insight: 從 Superpowers Brainstorming 的 subagent review 機制獲得啟發 — 在獨立 context 下用設計好的 prompt 審核，角度比主 agent 更獨立
- Author insight: 寫文章時有不同角色 — 研究者、寫作者、編輯，各自有不同角度切入
- Author insight: 獨立 context 讓每個角色不被前面的對話歷史「污染」，能真正用自己的視角工作
- Reference: Superpowers Brainstorming skill (https://github.com/obra/superpowers/tree/main/skills/brainstorming) — spec review loop 機制
- Research: Agent Skills 的漸進式揭露機制適合這種場景，不同階段只載入需要的知識

### 6. 結語 — 給想嘗試的人的建議
**Purpose:** 給讀者一個可執行的下一步，同時自然地帶出產品
**Materials:**
- Context: Writer-Skills 是開源的，可透過 `npx skills add sadcoderlabs/writer-skills` 安裝
- Research: Agent Skills 已有 30+ agent 支援，不只限於 Claude Code
- Author insight: 寫作技巧的累積需要時間來回調整，這是必須的過程

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
- [x] First draft completed
- [x] Fact-check completed
- [ ] Review completed
- [ ] Translations completed
- [ ] Finalized
