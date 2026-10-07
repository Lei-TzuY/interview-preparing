# Software Engineering

## Interview Scope

一般 Tier A。因本人 QA / SE 背景，在 Research / Project Defense 與 mock 中視同 Tier S；不由經驗推定 Strong。重點是把需求、設計、測試、交付與可追溯證據接起來。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Functional / non-functional requirements | 系統做什麼與 correctness、reliability、performance 等品質要求；把形容詞轉成可檢查條件 |
| Interface / contract | 呼叫雙方可依賴的輸入、輸出、錯誤、狀態與相容性約定，不只 function signature |
| Precondition / postcondition | 呼叫前的合法條件與完成後的保證；區分使用者輸入驗證與 internal invariant |
| Modularity | 按責任與變更邊界分模組，介面與隱藏實作；切很多檔案不等於良好模組化 |
| Coupling | 模組間依賴與變更傳播；降低不必要耦合也要考慮抽象成本 |
| Cohesion | 模組內功能共同服務的責任；不以抽象程度越高越好作結論 |
| API design | 語意、errors、ownership、idempotency、可測試性與 usage constraints |
| Backward compatibility | 既有 callers 的行為 / 格式 / ABI 等契約；能 compile 不代表行為完全相容 |
| Versioning / deprecation | 版本承諾、遷移與淘汰時程；版本號不代替實際相容性檢查 |
| Unit testing | 小單位 / 決策邏輯測試，明確定義 unit 與依賴隔離範圍 |
| Integration testing | 驗證元件之間真實協作與介面，發現隔離測試漏掉的問題 |
| System testing | 完整系統對需求的測試，與單模組測試不同 |
| E2E testing | 從使用者 / 外部入口走完整路徑；成本、可定位性與環境脆弱性 |
| Regression testing | 保護先前正確行為，測試層級可為 unit / integration / E2E，不是另一個隔離層 |
| Mocks / stubs / fakes | Mock 驗證互動、stub 提供安排好的回覆、fake 有簡化可運作實作；術語依 framework 有差異 |
| Test doubles | 替代依賴的總稱；選擇依測試目標與替代物和真實服務的契約一致性 |
| Code coverage | Line / branch 等執行覆蓋指標，須說明種類與收集範圍 |
| Coverage limitations | 執行到不等於 assertion 有效、需求正確或所有 state / inputs 都測到 |
| Mutation testing | 對程式做小改動，檢查測試能否察覺行為差異；補充 oracle / assertion 敏感度證據 |
| Surviving mutant | 先按工具區分 survived、no coverage、timeout / invalid，再 triage missing assertion、equivalent / irrelevant behavior 與工具問題，不只看單一 score |
| CI | 頻繁整合、重複 build / test 與快速回饋；綠燈的保證受 gates 與環境限制 |
| CD | Continuous delivery / deployment 的差別；可交付與自動上線不等同 |
| Build / test gates | 清楚定義通過條件、coverage / checks 範圍、失敗處理，不以 badge 代替 evidence |
| Version control | Change history、branch、commit、可回溯與協作；記錄的粒度支援 review / rollback |
| Git / PR / code review | Review 檢查需求、設計、測試與可讀性，與自動檢查互補 |
| Rollback / revert | Deployment rollback 與新 commit 反轉變更不同；schema / state 變化可能無法只換 binary 還原 |
| Debugging | Reproduce → minimize → hypothesis → experiment → fix → regression test，區分症狀與根因 |
| Logging / metrics / traces basics | Event records、aggregates / time series、跨元件 request path；為具體診斷問題選資訊 |
| Reproducibility | 固定版本、環境、資料與 commands；能重現失敗 / 測試，不等於 correctness proof |
| Flaky tests | 同 code / 條件意圖下結果不穩定；查 isolation、race、時間、randomness、環境與外部依賴 |

## Should Know

| Subtopic | 延伸回答要求 |
| --- | --- |
| SOLID as heuristics | 設計啟發式，需要情境與 trade-off，不是套用縮寫就證明架構良好 |
| Property-based testing | 生成多種輸入，檢查 invariant / property；需要有價值的 property 與縮小失敗案例 |
| Fuzzing | 探索輸入空間與異常行為；coverage-guided / grammar 等策略與 oracle 的限制 |
| Static analysis | 不執行程式的分析，soundness / precision / false positives 依工具與設定 |
| Sanitizers | 執行時偵測特定錯誤，未報錯不代表所有 paths 安全 |
| Feature flags | 分離 deployment 與功能啟用，注意組合、清理與測試矩陣 |
| Canary deployment | 小範圍觀察再擴大，需 metrics、停止條件與 rollback 設計 |
| Semantic versioning | 依公開 API 契約宣告變更，使用前要確認專案實際遵循的規則 |
| Dependency pinning | 固定可解析版本與 lockfile，仍需更新、環境 / artifact provenance |
| Supply-chain basics | 來源、dependency、build artifact、簽章 / attestations；信任與驗證邊界 |

## Common Professor Questions

- 100% code coverage 是否代表正確？
- Mutation testing 比 coverage 多提供什麼資訊？
- Surviving mutant 一定代表 test suite 很差嗎？
- Unit / integration / E2E 差在哪？
- CI 全綠為什麼 production 仍可能壞？

## Follow-up Questions

- Mock 什麼時候反而有害？如何用真實依賴或 contract checks 補足？
- Large refactor 如何建立沒有 regression 的證據，哪些部分仍無法證明？
- Flaky test 是產品 bug 還是測試問題？如何定位且不掩蓋失敗？
- Mutant 沒被殺死時，如何區分 equivalent、未覆蓋、弱 assertion 與 harness 問題？
- Rollback 遇到 schema / data migration，如何處理不可逆狀態？
- 你如何分開衡量 correctness、reliability、performance、scalability、maintainability、reproducibility？

## Whiteboard / Coding Expectations

1. 為小 API 寫 contract、邊界與 errors，再設計不同層級測試。
2. 用同一需求說明 unit / integration / E2E 各能抓到什麼，為何需組合。
3. 展示 weak assertion 與能偵測行為變更的 assertion；提出 mutant triage 流程。
4. 畫 CI → build artifact → delivery / deployment → observation → rollback，標出 gates。
5. 根據真實 failure 設計 reproduction、logging / metric / trace 與 regression 驗證，不虛構綠燈結果。

## Common Mistakes

- Coverage = correctness；surviving = 一定有產品 bug 或 test suite 一定很差。
- Mock 所有依賴，只驗證實作細節卻漏掉真實契約。
- CI 綠燈 = production 正確；重試到綠燈 = flaky 已解決。
- 把 regression 當成與 unit / integration 並列的唯一層級。
- 回答只有 SOLID、metrics 或工具名，沒有需求、假設與證據。

## Self-check Checklist

- [ ] 能將需求轉成 contracts 與可觀察驗證。
- [ ] 能比較 modularity、coupling、cohesion、API compatibility。
- [ ] 能區分 testing levels、test doubles、coverage 與 mutation evidence。
- [ ] 能正確 triage surviving mutants，不宣稱測試能證明全部正確。
- [ ] 能說明 CI / CD、gates、review 與 rollback 的保證範圍。
- [ ] 能設計 debugging、observability、flaky-test 與 reproducibility 流程。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準。連到 [Statistics / Experimental Design](11-statistics-experimental-design.md)、[Portfolio inventory](../research-defense/portfolio-index.md) 與 [Mock interviews](../mock-interviews/README.md)。

## References

- [Google Engineering Practices：Code Review](https://google.github.io/eng-practices/review/)
- [Stryker：Mutant States and Metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)
- [pytest：Flaky Tests](https://docs.pytest.org/en/stable/explanation/flaky.html)
- [Git：git revert](https://git-scm.com/docs/git-revert)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[Contracts / design](../visual-learning/app/lessons/contracts-design.html) · [QA evidence](../visual-learning/app/lessons/qa-evidence.html) · [Delivery / debugging](../visual-learning/app/lessons/delivery-debugging.html) · [Testing diagram](../visual-learning/app/lessons/testing-evidence.html)。外部補充（同樣限首答後）：[Stryker mutant states](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)／[Google review practice](https://google.github.io/eng-practices/review/)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
