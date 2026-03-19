# 對話紀錄摘要：AI Agent 架設 Blog 的完整過程

> 來源：Slack #writing 頻道，2026-03-19，Yuren Ju 與 Maelle（AI agent）的對話

## 時間軸與關鍵事件

### Phase 1：建立 Repo 與 Astro 專案（05:03 - 05:10 UTC）

1. **建 GitHub repo**：在 `sadcoderlabs` org 下建立 `sadcoder-press`（空 repo）
2. **規劃 Astro 專案**：討論了需求——blog + social posts CMS、英文預設 + 中文、整合 writer-skills
3. **Astro 版本選擇**：Maelle 一開始用 Astro 5，Yuren 指出 Astro 6 已經出了，砍掉重來改用 Astro 6
   - 教訓：AI agent 的知識可能過時，使用者糾正很重要
4. **Claude Code 代工**：Maelle 派 Claude Code 作為 sub-agent 在背景建置整個 Astro 專案
5. **初始結構**：
   - Astro 6 + TypeScript + Tailwind CSS 4
   - Content Collections：blog（長文）+ posts（社群貼文）
   - i18n：en（預設，無 prefix）+ zh（/zh/ prefix）
   - 10 個頁面，各有 en/zh 版本

### Phase 2：部署方式的來回（05:10 - 05:20 UTC）

1. **最初規劃用 Vercel**，但 Yuren 改主意想用 GitHub Pages
2. **切到 GitHub Actions + Pages**：Maelle 移除 Vercel adapter，加了 `.github/workflows/deploy.yml`，開啟 GitHub Pages
3. **又改回 Vercel**：Yuren 覺得 GitHub Actions 不好，決定還是用 Vercel
4. **Vercel 設定問題**：Yuren 在 Vercel 找不到 repo，因為 Vercel GitHub App 沒有授權 `sadcoderlabs` org，Maelle 引導去 org 層級設定
5. **最終部署成功**：https://sadcoder-press.vercel.app/

- 教訓：部署方式的選擇會來回，AI agent 要能快速切換且不留殘餘

### Phase 3：功能調整（05:20 - 05:30 UTC）

1. **Theme 討論**：確認目前是完全手刻（Tailwind + 自己寫的 components），暫不用現成 theme
2. **Dark/light mode**：加了 ThemeToggle 元件，支援系統偏好 + localStorage 記憶 + 無閃爍載入
3. **簡體→繁體**：所有中文 UI 和範例內容從簡體中文改為繁體中文

### Phase 4：內容結構重構（05:28 - 05:37 UTC）

1. **討論目錄結構**：從 `blog/en/hello-world.md` + `blog/zh/hello-world.md` 改為每篇文章一個目錄
2. **新結構**：`blog/2026-03-19_hello-world/{en.md, zh.md, assets/}`
3. **URL 不變**：討論確認了目錄結構改變不影響最終 URL（`/blog/hello-world/`）
4. **年份目錄**：討論了可以按年份分目錄整理，URL 還是不變
5. **命名慣例**：最終定為 `YYYY-MM-DD_slug` 格式
6. **加了 `src/lib/utils.ts`**：`getSlug()` helper 函數統一處理 slug 解析
7. **寫入 README**：把檔案命名慣例文件化
8. **授權**：MIT（程式碼）+ CC BY-NC-SA 4.0（內容）

### Phase 5：Writer-Skills 整合討論（05:37 - 06:20 UTC）

1. **Skills 裝在哪的討論**：
   - 選項 A：裝在 sadcoder-press（任何人用 Claude Code 開 repo 就有 skills）
   - 選項 B：裝在 Maelle 的 workspace（Maelle 可以從 Slack 直接觸發）
   - 結論：Skills 裝在 Maelle workspace，但寫作產出放在 sadcoder-press

2. **絕對路徑支援**：
   - 問題：writer-skills 的 `workspace` 欄位只支援相對路徑
   - 解決：Yuren 修改 writer-skills 支援絕對路徑（以 `/` 開頭）
   - Maelle 整理了現況敘述給 Yuren 的 Claude Code 去實作

3. **安裝方式**：
   - 用 `git clone` + `symlink` 到 Maelle 的 skills 目錄
   - 好處：之後 `git pull` 就能更新

4. **Writing workspace 位置**：
   - 選項 A：sadcoder-press 根目錄
   - 選項 B：sadcoder-press/writing/ 子目錄
   - 結論：選 B，保持根目錄乾淨

5. **初始化**：建立 `writing.config.md`（在 Maelle workspace）、`ideas.md`、`templates/brief-template.md`（在 sadcoder-press/writing/）

### Phase 6：第一篇文章發布（07:13 - 07:38 UTC）

1. **writer-skills 更新**：Yuren 更新了 skills，Maelle pull 更新，包含新的 article-translation skill
2. **翻譯**：用 translation skill 將 `building-writer-skills` 文章從中文翻譯成英文
   - Review subagent 跑超時（設了 120 秒太短）
   - Maelle 手動完成 review
   - 之後要設 300 秒以上
3. **發布流程**：
   - 從 `writing/articles/` 複製到 `src/content/blog/`
   - `article.zh.md` → `zh.md`（加 Astro frontmatter）
   - `article.en.md` → `en.md`（加 Astro frontmatter）
   - 從 brief.md 提取 title、date、description
   - 複製 assets
   - Build 驗證、commit、push
4. **發布流程寫成 skill**：`publish-to-press` skill 存在 Maelle workspace

### Phase 7：Typography 改善（08:06 - 08:36 UTC）

1. **`@tailwindcss/typography`**：安裝並啟用，文章頁面加上 `prose dark:prose-invert`
2. 文章排版大幅改善

## 關鍵設計決策

| 決策 | 選擇 | 原因 |
|------|------|------|
| Astro 版本 | 6（非 5） | Yuren 指出最新版已出 |
| 部署平台 | Vercel | 比 GitHub Pages 簡單 |
| i18n 策略 | en 無 prefix、zh 加 /zh/ | 英文為預設語言 |
| 內容結構 | 每篇文章一個目錄 | assets 共用、翻譯並排、好管理 |
| 目錄命名 | YYYY-MM-DD_slug | 時間排序 + URL-friendly slug |
| Skills 位置 | Maelle workspace（symlink） | 從 Slack 觸發 + 容易更新 |
| Writing workspace | sadcoder-press/writing/ | 不污染 Astro 根目錄 |
| 發布 skill | Maelle workspace（非 writer-skills） | 發布流程因平台而異，不通用 |

## 有趣的互動模式

1. **即時糾正**：Yuren 多次修正 Maelle 的選擇（Astro 版本、部署方式），AI agent 快速適應
2. **先討論再做**：多次「先不要改，我們討論一下」的模式，避免做白工
3. **漸進式建構**：不是一次到位，而是一步步加功能（基礎 → dark mode → 繁體 → 結構重構 → skills → 翻譯 → 發布 → typography）
4. **來回決策**：部署方式改了三次（Vercel → GitHub Pages → Vercel），這是真實開發的樣子
5. **分工明確**：架構決策由 Yuren 做，實作由 Maelle 做，writer-skills 修改由 Yuren 的 Claude Code 做
