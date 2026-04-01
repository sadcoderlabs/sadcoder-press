# Writing Brief

## Article Info
- Title: 從 Claude Code 外洩重新思考 AI Agent 的記憶整理
- Author: yurenju
- Date: 2026-04-01
- Status: review  <!-- draft | ready | writing | review | published -->
- Original language: zh
- Translations: en

## Publishing
<!-- Managed by publishing tools. Leave empty during writing. -->

## Target Audience
- Who: 對 AI agent 記憶管理有興趣的開發者——因為記憶品質直接影響 agent 的工作品質，好的記憶讓 agent 能推斷更多意圖，不用每次都從頭講完整的上下文
- Background: 有使用 Claude Code、Cursor、Copilot 等 AI coding 工具的經驗，知道 context window 有限，但沒深想過「記憶」該怎麼有系統地管理
- Prior state: 知道有記憶機制，特別是像 OpenClaw 這類以 .md 檔為基底的記憶方式，但沒有仔細想過該怎麼組織這些記憶

## Source Ideas
- [Claude Code 外洩碼中的記憶架構：它怎麼整理記憶，我們又怎麼做](../../ideas.md) (2026-04-01) @yurenju — 從 Claude Code npm source map 外洩事件切入，分析三層記憶架構與 Self-Healing Memory，對比 sadcoderlabs 的實戰記憶管理經驗

## Article Goals
- Reader takeaway: 理解 Claude Code 和 sadcoder（OpenClaw）各自怎麼整理 AI agent 的記憶——從業界最前沿的設計到實戰中的做法，讀者會帶走可應用的記憶管理模式
- Goal alignment: 這篇文章很自然地展現 sadcoderlabs 在 AI agent 領域的深度——不只是轉述新聞，而是用自己在 OpenClaw 上的實戰經驗對照業界最前沿的設計。讀者會覺得「這個團隊真的在認真研究 agent」，進而追蹤後續內容。

## Writing Style
- Style profile: default


## Outline

### 1. 開場：autoDream 抓住了我的注意力
**Purpose:** 從個人經驗帶入——不是轉述新聞，而是一個正在做記憶整合的人看到同行的做法
**Materials:**
- 作者引述：看到外洩新聞中的 autoDream，因為自己對記憶整合感興趣，立刻想深入研究
- 背景：2026-03-31 npm source map 外洩，512K 行原始碼曝光
- 定調：「我正在做類似的事，這抓住了我」

### 2. Claude Code 的記憶系統
**Purpose:** 讓讀者理解 Claude Code 怎麼做記憶——架構概念和整理機制，不鑽實作規格
**Materials:**
- 三層架構概念：MEMORY.md 是索引（不存資料，只存位置）→ Topic Files 按需載入 → Raw Transcripts 只搜不讀
- autoDream 四階段在做什麼：定位當前記憶狀態 → 收集訊號（找漂移記憶、grep transcript）→ 整合（刪矛盾、合併重疊、相對日期轉絕對）→ 修剪索引
- 「記憶視為提示」：agent 被要求行動前對照實際程式碼驗證，不盲信自己的記憶
- Research: Claude Code 是目前唯一內建「記憶整理」的主流 AI coding tool

### 3. 我們怎麼做：OpenClaw 的記憶整理
**Purpose:** 從 Claude Code 轉到自己的實踐，讓讀者看到另一種取向
**Materials:**
- 每天 cron job 整理昨天 session 記憶 + git log
- 格式：敘述段落 + 重點列表；未來每月回顧，記憶越來越抽象
- 誠實：「怎麼判斷什麼重要」還沒有定論，還在摸索
- 具體體感：個人使用不用講完整指示就能推斷意圖（查天氣的例子）

### 4. 同一件事，不同的目的
**Purpose:** 文章的視角轉向——表面上都在做記憶整理，但設計哲學根本不同
**Materials:**
- 核心對比：Claude Code 做的是「壓縮」（工具導向），OpenClaw 想做的是「萃取」（個性塑造）
- 作者引述：把 agent 當同事，信任來自洞見
- 「反思」是抓住作者的關鍵字——Claude Code 的反思驗證對錯，我們想探索的是透過反思判斷什麼重要

### 5. 記憶給了 agent 生活
**Purpose:** 往更大的方向延伸收尾
**Materials:**
- 作者引述：希望 agent 有自己的生活
- 路徑：記憶累積 → 風格基礎 → 核心價值 → 自我風格
- 反思能否幫助判斷什麼值得記得更久？這是接下來要探索的

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
- [x] Translations completed
- [ ] Finalized
