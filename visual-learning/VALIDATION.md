# Implementation Validation

查核日期：2026-10-07（Asia/Taipei）。Baseline main：`664dee533bf31203cb80ae25e16472923a6252fb`。

最新真實 local browser 查核：2026-10-10（Asia/Taipei）；受測 visual-learning main：`53610e9ff1e09eba1b57c544518f553ae46a712c`，加上本頁記錄的 browser runner support / favicon bug fix。

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
| Real browser / responsive / console | PASS：local Google Chrome | 2026-10-10：47/47 pages；existing suite 2/2 runs、supplementary checks 151/151；詳細實測與限制見下方 |
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

## Previous browser environment limitation (2026-10-07)

以下為先前環境的歷史結果；2026-10-10 已改用 connected Windows desktop 上既有 Chrome 完成真實驗收。

**NOT RUN：真實瀏覽器 E2E、實際 mobile layout / focus / drag、screen-reader 與 console 驗收。** 本次執行 `npm run test:browser`，Playwright package 可載入，但 Chromium executable 不存在；script 明確以 exit 2 結束，沒有把此結果計為 PASS。沒有部署外部 host 或變更安全設定。

已備妥 46 個 local pages 的 browser suite：24 interactive、8 static diagram、14 scenario pages，包含 gating、filters、step / play / pause / reset、numeric / slider、keyboard、vector drag、mobile、reduced-motion、console / network 與 reload relock。這是測試涵蓋設計，**不是本環境已執行的結果**。

Browser script 可在具有官方 Playwright / Chromium 的環境執行。靜態 accessibility / firewall 檢查、SVG 渲染及 pure-model tests 不替代 browser 驗收。

## Real local browser validation — 2026-10-10

在 connected Windows desktop 建立隔離 checkout，實際 `git fetch origin main`、`git pull --ff-only origin main`；main / HEAD 均為 `53610e9ff1e09eba1b57c544518f553ae46a712c`。未使用 learner 的瀏覽器 profile，所有教材操作均在 headless automation 中使用 synthetic developer acknowledgement，不能當作作答或 mastery evidence。

| Environment | Actual value |
| --- | --- |
| OS | Windows NT 10.0.26200, x64；PowerShell 5.1.26100.9444 |
| Playwright | 1.62.1 |
| Installed browser | Google Chrome 154.0.8037.93；由檔案 metadata 偵測，並由實際 browser session 再確認版本 |
| Detected executable | `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| Primary launch | `channel: "chrome"`, headless |
| Alternate launch | 上述 detected path 的 `executablePath`；完整 existing suite 也實際跑完 |
| Browser downloads | None；只在隔離 tooling directory 安裝 Playwright npm package，使用 `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` 與 `--ignore-scripts`；沒有執行 browser installer |
| Static server | Repository root：`python -m http.server 8000 --bind 127.0.0.1`；homepage 實際 HTTP 200 |

| Real-browser check | Result / evidence |
| --- | --- |
| Pages | PASS：47 unique pages＝1 homepage、24 interactive、8 static diagram、14 scenario；依 manifest 逐頁載入，lesson shell 均有 11 sections |
| Existing `tests/browser.mjs` | PASS：2/2 complete runs，0 failed；一次 `BROWSER_CHANNEL=chrome`、一次 `BROWSER_EXECUTABLE_PATH`；每次均驗收 47 pages |
| Supplementary real-browser probes | PASS：151/151 named cases，0 failed；包含 47 pages × 2 viewports、24 reduced-motion lessons × 2 viewports、attention / dynamic motion / speed / gate / persistence checks |
| Desktop | PASS：1440×900，47/47 pages；逐 rendered state 檢查無 document horizontal overflow。Existing suite 另實測 1280×900 |
| Mobile | PASS：390×844，47/47 pages；Chromium mobile / touch-capable context emulation，逐 rendered state 無 document horizontal overflow；homepage screenshots 實際檢視 |
| Homepage | PASS：search、topic / type / priority filters、74 cards、實際 local-link navigation；全部 22 external resource dialogs 的確認流程與 target URL / `_blank` / `noopener noreferrer` |
| Interactive controls | PASS：24 lessons 的 Next / Previous / Play / Pause / Reset、speed、適用的 sliders / numeric / select / checkbox inputs；實際等待播放前進、暫停後保持不動，另核對 0.5 / 1 / 2 steps-per-second intervals |
| Inspection / drag | PASS：attention cell hover / native title、click dot-product inspector、weighted-output inspector；desktop / mobile viewport 的 vector pointer drag 均改變 numeric value 並重設 trace |
| Keyboard / focus | PASS：Tab skip link、Tab / Shift+Tab 導航、Enter / Space 按鈕啟動、visualization 左右鍵；`focus-visible` 且 outline 至少 2px，適用於兩種 viewport |
| Static / scenario interactions | PASS：8 SVG images 均載入；兩種 viewport 合計點擊 48 annotations、184 scenario choices；全部 case 的兩個選項均產生 consequence，切換 case 會清除舊 consequence |
| Reduced motion | PASS：全部 24 interactive lessons × 2 viewports；Play disabled，Next / Previous / Reset / arrow keys 仍可用；播放中改為 reduce 會暫停，恢復 no-preference 後可再 Play |
| Attention flagship | PASS：dₖ=1/2/4/8 × causal on/off × 2 viewports＝16 combinations；每組 8 phases 的公式 highlight、Q/K shapes、raw / scaled scores、mask、scaled / unscaled weights、weighted output 與實際 DOM values 同步；forward/back、reset、keyboard、score inspection 均實際操作 |
| Console / runtime errors | PASS：accepted runs 共 0 unexpected console errors、0 page errors |
| Local network | PASS：0 `requestfailed` events、0 HTTP responses ≥400；accepted runs 共觀測 2,470 requests，全部為 local GET；0 external requests、0 non-GET requests、0 WebSockets |
| Reload / firewall | PASS：每個 lesson 在兩種 viewport reload 後均返回 unchecked / locked；one checkbox 無法開啟；locked 狀態無 lesson sections / formulas 或 lesson-module fetch；URL query / hash 不能開 gate |
| Persistence / protected state | PASS：0 storage-write / cookie-write / IndexedDB-open / cache-open / service-worker-register / save-file / beacon calls；storage、cookies、DBs、caches、service workers 均為空；4 protected Windows files 前後 SHA-256 相同，Git diff 也確認所有 Diagnostic / topics / progress / manifest / coverage 檔案未改 |
| Numeric / quality rerun after fix | PASS：27/27 numeric、7/7 quality＝34/34；Windows 實際執行，Ubuntu checkout 也通過；generated drift 與 protected-file audit 通過 |

Verified browser bug：Chrome 在未宣告 favicon 時隱式請求 `/favicon.ico`，documented Python static server 回 404，產生 1 個 console error，初次完整 existing suite 因此 FAIL。Homepage 與 shared wrapper generator 現在宣告 empty inline favicon `data:,`，重新生成 46 個 wrappers；沒有新增圖像資源或 lesson。Regression coverage 要求每個 HTML 都保留宣告、所有 HTTP errors / failed requests 都必須為空，並拒絕 implicit favicon request。修正後兩次完整 suite 均 PASS，沒有忽略 console error 或排除 favicon HTTP failure。

兩個 preliminary supplementary motion checks 使用立即 snapshot，早於 Chromium 的 asynchronous MediaQueryList change event；targeted browser probe 量到一次約 13ms 的 event delay，事件後 UI 正確暫停 / 恢復。Temporary probes 改成明確等待事件反映於按鈕狀態並保留 2 秒 failure deadline，完整重跑後 151/151 PASS；沒有因此修改 app source。

重跑 existing suite（另開 terminal 先啟動上述 static server；Playwright package 必須已可解析）：

```powershell
cd visual-learning
$env:BROWSER_CHANNEL = "chrome"
$env:VISUAL_BASE_URL = "http://127.0.0.1:8000"
npm run test:browser

# Alternate installed-executable run; do not set both selectors.
Remove-Item Env:BROWSER_CHANNEL
$env:BROWSER_EXECUTABLE_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
npm run test:browser
```

Runner 也接受 `BROWSER_CHANNEL=msedge`；本次 Chrome 是偵測優先序的第一個 installed browser，沒有將未執行的 Edge suite 計為通過。Supplementary probes / event recorder 放在隔離 temporary tooling directory，未加入 syllabus 或 app features。

Remaining limitations：mobile 是實際 Chromium 的 viewport / touch-capable emulation，未驗收實體手機、其他 browser engine 或 screen reader。External links 驗收 canonical HTTPS targets / link safety / confirmation UI，未重新訪問第三方網站測可達性或其互動。Static firewall 仍是明確流程確認，不能驗證真實 repository 作答證據。Diagnostic 維持 0/30、Q1 pending blind first answer、WEAKNESS_MAP 232 Untested；沒有 learner activity、grade 或 assisted-learning 紀錄。

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
