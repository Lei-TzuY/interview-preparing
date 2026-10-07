# Visual Learning / Interactive Learning

這是既有口試 syllabus 的**理解輔助層**：12 technical topics + Research / Project Defense、232 個 subtopics 不增加、不預評能力。100% learning-resource coverage 指每個既有子題有合理資源決策，不是 232 個 local animations，也不是 Diagnostic 測過 232 題。

從 [INDEX](INDEX.md) 選教材，或使用 [本地 app](app/index.html)。[RESOURCE_MAP](RESOURCE_MAP.md) 逐一列出 232 筆 primary decisions 與來源查核記錄；所有清單由 [manifest](app/manifest.js) 產生。

## Diagnostic firewall

1. **Closed-book 首答前**：禁止開啟對應 visual lesson、標準公式推導、完整解法或 answer-oriented external explanation。不得自動推薦能洩漏目前題目答案的資源。
2. **Session 保存首次原始回答後**：只有實測 concept 為 Review / Weak / Critical，或教練指定需建立 intuition，才使用對應資源。跨子題 lesson 可能涉及尚未測的內容；教練應先確認閱讀範圍不污染後續 baseline。
3. **看過教材後立即重答**：只記 **Assisted Improvement**；不覆蓋 cold baseline、不改原 Diagnostic grade、不自動升 Strong / Mastered。
4. **Delayed closed-book retest**：依 [既有 spaced repetition](../review/spaced-repetition.md) 延後閉卷、換條件重測，才形成 independent mastery evidence。

App 首頁與每個 lesson URL 預設鎖定；教學 catalog / numeric models 在確認後才載入，external resources 另經確認，以正常新分頁 hyperlinks 開啟。不解析目前 Q1、不自動推薦、不保存 unlock；重新整理會再鎖定。

這是無登入、無 backend 的靜態工具，**不能驗證 session 已保存**。勾選是本人 / 教練確認流程，不是技術上的考試防作弊系統。原始碼及 Markdown 資源索引可手動讀取，仍須遵守 closed-book 規則。沒有 session writer、learner model、analytics 或 localStorage。

## 使用流程

**Intuition → tiny example → interaction → mechanism → formal definition → misconception → self explanation → professor follow-up → delayed closed-book retest**

由教練從實際 Weakness Map evidence 指定資源。先操作一個最小例子，逐步核對 state / shape / intermediate values；調整參數，看 edge case。遮住教材講 30 秒，再回答 1–3 層追問。教練之後將真實 assisted answer 另記到原 session，錯誤依原 mistake log 欄位記錄，安排 review；本工具不代填紀錄，也不生成 learner scores。

研究 / 專案情境只幫助拆 claim 與 evidence，真實數字、貢獻與結果仍需本人可追溯記錄。當前 Diagnostic 保持 0/30，首答待保存；本次實作不是測驗 evidence。

## Resource strategy

| 優先 | 選擇 | 判斷 |
| --- | --- | --- |
| 1 | External Interactive | 成熟工具能自由改資料、逐步檢查；直接連結 |
| 2 | External Visual Explanation | 原作者高品質動畫、圖解、影片或講義 |
| 3 | Local Interactive | 需要 tiny-number inspector、可逆 trace 或本口試的 mental-model 連接 |
| 4 | Static Diagram | 一張可註解圖已足以解釋關係，不強加 motion |
| 5 | Scenario Drill | 判斷、實驗設計、testing / system trade-off |
| 6 | No Visualization Needed | 視覺增益低，附 rationale 並回既有口述練習 |

24 個 local interactive lessons；另有 8 張原創 static diagrams、14 組 scenario drills。外部來源採正常連結，不搬圖、不搬 animation code、不下載或鏡像模型、不使用 iframe。外部查核為 2026-10-07 的公開頁面 / 文件與內容查核，並非所有第三方控制的完整端到端測試。

`Ready / External / Planned / Not Needed` 是 resource availability。`Strong / Review / Weak / Critical / Untested` 是實測能力，兩者互不推導。Manifest 的 mappedSubtopics 只引用 frozen index；supplemental mappings 不增加 232 的分母。

## Architecture

| 路徑 | 用途 |
| --- | --- |
| [INDEX.md](INDEX.md) | Topic / type / priority / resource status 索引，generated |
| [RESOURCE_MAP.md](RESOURCE_MAP.md) | 232/232 primary decisions、rationale、checked date、source vetting，generated |
| [DESIGN_GUIDE.md](DESIGN_GUIDE.md) | 教學、數學、accessibility 與引用準則 |
| [app/manifest.js](app/manifest.js) | Canonical metadata / mappings / external sources |
| [app/app.js](app/app.js) | Firewall、filter、lesson shell；不寫 training records |
| [app/components/calculations.js](app/components/calculations.js) | 純數學函式 |
| [app/components/traces.js](app/components/traces.js) | 純 toy execution models |
| [app/components/ui.js](app/components/ui.js) | Matrix / array / graph views 與 StepController |
| [app/lessons/catalog.js](app/lessons/catalog.js) / [renderers.js](app/lessons/renderers.js) | 24 個教材與 visualization |
| [app/lessons/scenarios.js](app/lessons/scenarios.js) / [diagrams.js](app/lessons/diagrams.js) | 情境與靜態註解 |
| app/assets/ | 8 張原創 SVG；無第三方 copied media |
| [tests/numeric.test.mjs](tests/numeric.test.mjs) / [quality.test.mjs](tests/quality.test.mjs) | 數值、shape、mapping、links、static safety |
| [tests/browser.mjs](tests/browser.mjs) | Playwright browser suite；不可用須報 NOT RUN |
| [scripts/build-index.mjs](scripts/build-index.mjs) | 產生索引與 gated HTML wrappers |
| [scripts/check-firewall.mjs](scripts/check-firewall.mjs) | 本次變更的 baseline integrity audit |

Vanilla HTML/CSS/ES modules。App 無 build step、package dependencies、backend、database、登入、paid API、cloud service、音效或 analytics。不部署 GitHub Pages / 外部 host，也不改 repository visibility。

## Local run

在 repository 根目錄執行：

```sh
python -m http.server 8000
```

瀏覽器開啟 `http://localhost:8000/visual-learning/app/`。ES modules 應透過 HTTP 開啟，不能以 file:// 雙擊驗收。首頁預設只顯示 firewall，不會自動開教材。

## Validation / maintenance

需要 Node.js 18+。自動 tests 使用 Node built-ins，不需 npm install：

```sh
cd visual-learning
npm test
node scripts/build-index.mjs --check
node scripts/check-firewall.mjs
```

修改 canonical manifest 後執行 `npm run build:index`；不要手改 generated 索引 / wrappers。加入新 mapping 須先確認是 frozen index 的既有鍵，不能借 visual layer 擴課。

Browser suite 另需要官方 Playwright 及其 Chromium binary；它是驗證工具，非 app dependency：

```sh
npm run test:browser
```

可用既有 server（`VISUAL_BASE_URL=http://localhost:8000`），或由 test script 自動啟動 Python server。Binary 缺失時輸出 **NOT RUN** 並以 exit 2 結束，不可解讀成通過；安裝與下載只在需要 browser verification 的開發環境進行。

本次實作的實際檢查與環境限制見 [VALIDATION](VALIDATION.md)。`check-firewall` 是對本次 baseline 的一次性 audit：未來開始真實 Diagnostic 後，protected files 當然會合法更新，該 audit 不應被拿來阻擋真正作答紀錄。
