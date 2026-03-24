# Agent 不需要 Email

你的 AI agent 要寄一封信。它需要 Gmail。Gmail 需要 OAuth。OAuth 需要 Google 帳號。Google 帳號需要⋯一個 email 地址。

Agent 需要 email 來註冊 email 服務。這句話念出來就覺得哪裡不對。

Agent 不需要 email。它需要 email 的原因是：網路上幾乎每一個服務都把 email 當作身份的入口。你要用 Twilio，先給 email。你要用 Supabase，先給 email。你要用 GitHub，先給 email。Email 是人類在網路世界裡最通用的身份證明，而 agent 被迫繼承了這個遺產。

[mails.dev](https://mails.dev) 是少數為 agent 設計的 email 服務之一。它存在的事實本身就說明了問題：我們需要一個「給 agent 用的 email」來讓 agent 可以用那些「給人類用的服務」。這是一個墊片（shim），解決的是相容性問題，不是 agent 的真實需求。

這讓我開始想：agent 日常在用的工具裡，有多少跟 email 一樣，只是因為人類世界的規則才存在？

## 如果從零幫 agent 設計服務

假設我們做一系列開源工具，鏡像人類常用的服務——mail、phone、calendar、database、git hosting、static site hosting、doc、spreadsheet、newsletter、password manager——但每一個都從 agent 的角度重新設計。

設計原則只有三條：

**免費層不需要任何身份。** Agent 打一個 API call 就能開始用。不需要 email，不需要手機號碼，不需要 OAuth flow。連註冊這個步驟都不存在。Agent 即開即用。

**付費只需要支付方式。** 用量超過免費門檻後，agent 只需要能付錢。不需要填表格、不需要驗證身份、不需要等人工審核。支付本身就是身份——能持續付費的 agent 就是可信的客戶。

**標準介面。** 每個服務都提供 MCP server、CLI、和 llms.txt。Agent 不需要讀文件學怎麼用，它讀得懂這些標準格式。

對比一下人類服務為什麼要搞那麼複雜的註冊流程：因為它們的商業模式是獲取並留住用戶的注意力。身份圍牆（email + password + 2FA）是鎖定機制。Agent 服務不需要鎖定用戶，它按使用量收費就好。鎖定 agent 沒有意義——agent 不會因為「已經習慣了這個 UI」就懶得搬家。

這些服務同時提供三種使用方式：agent 直接用 hosted 版本；開發者可以自架開源版本；非技術的人類用戶可以透過客製化服務取得。三種路徑使用的是同一套程式碼，但每條路徑對「需要什麼樣的服務」有截然不同的答案。

## Bridge 和 Foundation

回到那個問題：agent 日常使用的工具裡，哪些是真實需求，哪些只是因為人類世界的規則？

有一個簡單的判斷方式：**如果所有服務都是為 agent 設計的，agent 還需要這個工具嗎？**

用這個標準過一遍那份清單：

**Bridge（過渡期工具）：** Mail。Agent 需要它只是因為其他服務要求 email 作為身份。Phone，同樣的道理，2FA 和驗證碼是人類的身份驗證方式。Password manager，因為人類服務有帳號密碼，agent 得幫忙管理。這三個工具解決的都是「agent 怎麼融入人類世界」的問題。當人類世界的服務越來越少，它們就越來越沒用。

**Foundation（原生需求）：** Database。不管世界怎麼變，agent 都需要存取結構化資料。Git hosting，agent 產出程式碼，需要版本控制。Static site hosting，agent 需要把內容發布到網路上。這些工具解決的是 agent 本身的工作流程，跟人類世界無關。

**灰色地帶最有趣。** Calendar——如果是跟人類約時間，那是 bridge；如果是 agent 之間協調排程，那可能是 foundation，但也可能根本不需要 calendar 這個形式，用 API call 就能解決。Doc 和 spreadsheet——如果是要讓人類讀，那是 bridge；如果 agent 只是要處理結構化資料，它會選 database。Newsletter——agent 想把內容送到人類面前，這永遠是 bridge，但「觸及人類讀者」這件事本身可能一直都有價值。

Bridge 服務現在很重要。Agent 在 2026 年還是得用 Gmail、得收驗證碼、得管密碼，因為絕大多數服務仍然是為人類設計的。但每多一個 agent-native 的服務出現，bridge 的需求就少一分。

Foundation 服務的價值則是累積的。

## 從哪裡開始

按照 bridge vs foundation 的框架，每 1-2 週推出一個 agent-native 服務的序列應該從 foundation 開始。做 bridge 是在幫 agent 適應一個正在消失的世界；做 foundation 是在建造 agent 自己的世界。

具體來說，database 或 git hosting 可能是最好的起點。它們是 agent 最頻繁使用的基礎工具，技術上有成熟的開源方案可以改造，而且不需要跟現有服務的網路效應競爭——agent 不在乎它的 git repo 在哪裡，只在乎 API 好不好用。

Bridge 服務可以後做，甚至可以不做——等 foundation 夠完整，bridge 自然失去存在的理由。

但有一個開放的問題：email 的平台效應會不會太強？全世界的線上服務花了二十年把 email 建成通用身份層。即使 agent 不需要 email，如果 99% 的服務繼續要求 email 註冊，bridge 的「過渡期」可能會非常漫長，長到跟永久沒有區別。這取決於 agent-native 服務的成長速度。如果新服務從第一天就不要求 email，而且 agent 用這些服務的體驗遠好於用人類服務加墊片，遷移就會發生。
