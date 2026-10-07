# Implementation Validation

查核日期：2026-10-07（Asia/Taipei）。Baseline main：`664dee533bf31203cb80ae25e16472923a6252fb`。

驗證屬本次 repository implementation，**不是 learner evidence**。Synthetic developer inputs / firewall 勾選不能當作本人已作答；沒有 Diagnostic grade、Assisted Improvement 或 mastery 更新。

## Results

| Check | Result | Evidence / limits |
| --- | --- | --- |
| Numeric / structural tests | PASS：34/34 | Attention raw / scaled scores、row sum、mask、weighted V、shapes、stability；metrics、CE、gradients、DSA、memory、pipeline、TCP、cache |
| Gradient checks | PASS | Tiny network 每個 weight / bias 與 scalar chain、CE gradient 對 finite difference |
| Canonical coverage | PASS：232/232 | Exact frozen keys；one primary decision per key，無 duplicate / unknown subtopics |
| Pedagogy / scenarios | PASS | 24 local models；每個 mapped scenario subtopic 都有實際 case；11-section shell |
| Markdown links | PASS：518 local links | 全 repository 的本地 paths / anchors 可定位；不將 external HTTP lookup 冒充 control test |
| Generated drift | PASS | INDEX、RESOURCE_MAP、46 gated HTML wrappers 與 manifest 一致 |
| Static serving | PASS：65/65 app files | 實際 `python -m http.server 8000`；HTTP 200 且 bytes 與檔案相同 |
| SVGs | PASS：8/8 | XML parse、Inkscape 渲染與合併預覽人工檢視；沒有 copied images / scripts |
| JS syntax | PASS | App / renderers / browser script syntax checks；tests 載入所有 model modules |
| Accessibility / firewall static checks | PASS | Labels / semantic controls、focus、keyboard handlers、reduced-motion、no autoplay audio、no iframe、no remote app requests / storage writer；7 組主要文字配色 contrast 5.87:1–13.26:1 |
| Real browser / responsive / console | NOT RUN | 下方記錄環境限制；靜態 affordances 不等於完整 accessibility certification |
| Existing records / syllabus | PASS | 4 protected files 逐 byte 相同；12 technical topics 的原內容 / review grades 未改，僅 append Visual Learning links |
| Diagnostic / learner state | UNCHANGED | 0/30；Q1 pending-first-answer session 未改；232 Untested；無 grade / progress / mistakes / mastery 更新 |

| Resource type | Resources | Primary subtopic decisions |
| --- | ---: | ---: |
| Local Interactive | 24 | 49 |
| External Interactive | 16 | 24 |
| External Visual Explanation | 6 | 8 |
| Static Diagram | 8 | 28 |
| Scenario Drill | 14 | 114 |
| No Visualization Needed | 6 | 9 |
| Total | 74 | 232 |

24 個 local lessons 按 primary topic 分配：DSA 4、Math 4、ML 3、DL 3、Transformer / LLM 4、OS 3、Networks 1、Architecture 2。Cross-topic mappings 不重複增加 lesson 數。

Protected file SHA-256（與 baseline 相同）：

| File | SHA-256 |
| --- | --- |
| `WEAKNESS_MAP.md` | `612148f3487de8d1249a97bd9df5894f5193faa3791b7b76209d80e5c73b9662` |
| `PROGRESS.md` | `800c89a178df873a5721c12251447df14beee2423319b485b605b31666157da8` |
| `diagnostic/sessions/2026-10-06-session-01.md` | `7e577a33aec9d1ee69fb1be3f6fc30547a18d5d36b76bae133c91a93871ff38a` |
| `mistakes/mistake-log.md` | `2d34ced02b326aa56d70d65cae290ab175d85b07e190a9bf71855684c6f39a1f` |

工作開始時透過 GitHub connector 核對 remote main 與本地 HEAD 均為上述 baseline。CLI `git fetch origin main` 因缺少 HTTPS credentials 失敗（因此未進入後續 pull），改用已連線 connector 讀取 ref / Git objects。提交前再次核對 main，並以 expected-SHA、force=false 做 fast-forward；不使用 reset 或 force push。

## Verification commands

```sh
cd visual-learning
npm test
node scripts/build-index.mjs --check
node scripts/check-firewall.mjs
npm run test:browser
```

## Browser environment limitation

**NOT RUN：真實瀏覽器 E2E、實際 mobile layout / focus / drag、screen-reader 與 console 驗收。** 本次執行 `npm run test:browser`，Playwright package 可載入，但 Chromium executable 不存在；script 明確以 exit 2 結束，沒有把此結果計為 PASS。沒有部署外部 host 或變更安全設定。

已備妥 46 個 local pages 的 browser suite：24 interactive、8 static diagram、14 scenario pages，包含 gating、filters、step / play / pause / reset、numeric / slider、keyboard、vector drag、mobile、reduced-motion、console / network 與 reload relock。這是測試涵蓋設計，**不是本環境已執行的結果**。

Browser script 可在具有官方 Playwright / Chromium 的環境執行。靜態 accessibility / firewall 檢查、SVG 渲染及 pure-model tests 不替代 browser 驗收。

## External vetting boundary

49 筆原作者、university / established educator、official documentation / demo 或 primary research sources，查核公開頁面 / 文件與概念內容；第三方互動控制未逐一完整跑完。Exact URL、checked date、access / quality notes 保留於 [Resource Map](RESOURCE_MAP.md)。只有 hyperlinks，沒有 copied media / code、model weights、iframe 或鏡像。

## Review findings resolved

- DFS 改用 stack frames，深入一個鄰居後才處理 sibling；discovery tree 與同順序 recursive DFS 一致，加入三角圖 / 教學圖回歸案例。
- Numeric inputs 保留空白 / 負號等輸入中狀態，不再強制變成 0；無效或越界時暫停、顯示說明並保留最後有效 trace，計數拒絕小數。
- Matrix lesson 依步驟顯示 original basis、transformed basis、output vector；drag 與 keyboard sliders 共用 model。
- Root README 補 architecture / workflow，12 份 topic 增加精選 external links；RESOURCE_MAP 頂端加入 primary-type counts。
- 外部來源逐頁重新核對；RNN / LSTM 換為原作者的完整 gates / cell-state 圖解；TLS 改用 IETF 標示取代 RFC 8446 的 RFC 9846，避免把舊文件冒充現行版本。
- `git diff --check`、generated drift、JS syntax 及受保護檔案 audit 均需在提交前通過；沒有新增第 13 個 technical topic。

## Source categories

| Category | Checked sources |
| --- | ---: |
| University / educational project | 20 |
| Established educator | 8 |
| Official educational demo | 1 |
| Open educational project | 2 |
| Official technical / standards | 13 |
| Primary research paper | 5 |
| Total | 49 |

Checked 是 URL / 文件內容查核；USF 等以 JavaScript 產生視覺的頁面僅核對公開入口及主題，沒有宣稱其互動操作已測。全部 checked dates 為 2026-10-07。

## File inventory for this change

所有新增內容集中於 `visual-learning/`；原有文件僅作必要整合。保留先前工作目錄，於獨立副本續作；沒有丟棄既有未提交內容。

新增 76 個檔案：

```text
visual-learning/DESIGN_GUIDE.md
visual-learning/INDEX.md
visual-learning/README.md
visual-learning/RESOURCE_MAP.md
visual-learning/VALIDATION.md
visual-learning/app/app.js
visual-learning/app/assets/database-dependencies.svg
visual-learning/app/assets/gpu-memory.svg
visual-learning/app/assets/linear-geometry.svg
visual-learning/app/assets/memory-hierarchy.svg
visual-learning/app/assets/network-stack.svg
visual-learning/app/assets/normalization.svg
visual-learning/app/assets/rag-flow.svg
visual-learning/app/assets/testing-evidence.svg
visual-learning/app/components/calculations.js
visual-learning/app/components/traces.js
visual-learning/app/components/ui.js
visual-learning/app/index.html
visual-learning/app/lessons/algorithm-choice.html
visual-learning/app/lessons/bfs-dfs.html
visual-learning/app/lessons/binary-search.html
visual-learning/app/lessons/cache-locality.html
visual-learning/app/lessons/catalog.js
visual-learning/app/lessons/chain-rule.html
visual-learning/app/lessons/concurrency-contract.html
visual-learning/app/lessons/confusion-matrix.html
visual-learning/app/lessons/contracts-design.html
visual-learning/app/lessons/convolution.html
visual-learning/app/lessons/cpp-lifetime.html
visual-learning/app/lessons/cpu-pipeline.html
visual-learning/app/lessons/data-validation.html
visual-learning/app/lessons/database-dependencies.html
visual-learning/app/lessons/deadlock.html
visual-learning/app/lessons/decoder-block.html
visual-learning/app/lessons/delivery-debugging.html
visual-learning/app/lessons/diagrams.js
visual-learning/app/lessons/dynamic-programming.html
visual-learning/app/lessons/eigenvectors.html
visual-learning/app/lessons/experiment-controls.html
visual-learning/app/lessons/gpu-memory.html
visual-learning/app/lessons/gradient-descent.html
visual-learning/app/lessons/hardware-bottleneck.html
visual-learning/app/lessons/heap-operations.html
visual-learning/app/lessons/kv-cache.html
visual-learning/app/lessons/linear-geometry.html
visual-learning/app/lessons/matrix-transform.html
visual-learning/app/lessons/measurement-unit.html
visual-learning/app/lessons/memory-hierarchy.html
visual-learning/app/lessons/multi-head-attention.html
visual-learning/app/lessons/network-stack.html
visual-learning/app/lessons/normalization.html
visual-learning/app/lessons/overfitting.html
visual-learning/app/lessons/process-thread.html
visual-learning/app/lessons/qa-evidence.html
visual-learning/app/lessons/rag-flow.html
visual-learning/app/lessons/regression.html
visual-learning/app/lessons/renderers.js
visual-learning/app/lessons/research-claims.html
visual-learning/app/lessons/scaled-dot-product-attention.html
visual-learning/app/lessons/scenarios.js
visual-learning/app/lessons/softmax-cross-entropy.html
visual-learning/app/lessons/statistical-claims.html
visual-learning/app/lessons/tcp-delivery.html
visual-learning/app/lessons/testing-evidence.html
visual-learning/app/lessons/tiny-network.html
visual-learning/app/lessons/training-mode.html
visual-learning/app/lessons/transaction-schedule.html
visual-learning/app/lessons/virtual-memory.html
visual-learning/app/manifest.js
visual-learning/app/styles.css
visual-learning/package.json
visual-learning/scripts/build-index.mjs
visual-learning/scripts/check-firewall.mjs
visual-learning/tests/browser.mjs
visual-learning/tests/numeric.test.mjs
visual-learning/tests/quality.test.mjs
```

修改 16 個既有檔案：

```text
INTERVIEW_STRATEGY.md
README.md
ROADMAP.md
diagnostic/README.md
topics/01-data-structures-algorithms.md
topics/02-math-for-ml.md
topics/03-machine-learning.md
topics/04-deep-learning.md
topics/05-transformer-llm.md
topics/06-operating-systems.md
topics/07-computer-networks.md
topics/08-databases.md
topics/09-cpp.md
topics/10-computer-architecture.md
topics/11-statistics-experimental-design.md
topics/12-software-engineering.md
```
