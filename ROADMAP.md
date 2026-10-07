# Adaptive Roadmap：四週口試準備

時間約四週，起算於確認並恢復訓練後。週次是階段目標，不是每日排程；較早完成就進階，若關鍵基礎仍有漏洞則調整下一階段的時間。

## Priority tiers

| Tier | 主題 | 排程原則 |
| --- | --- | --- |
| S | Data Structures & Algorithms、Math for ML、Machine Learning、Deep Learning、Transformer / LLM、Statistics / Experimental Design、Research / Project Defense | 每週持續接觸；先測再補，不因專案經驗而跳過基礎 |
| A | Operating Systems、Computer Networks、Databases、C/C++、Computer Architecture、Software Engineering | 先建立口試基本覆蓋，再依弱點或目標實驗室調高優先級 |

同 Tier 的初始順序是 DSA → Math → ML → DL → Transformer / LLM；研究答辯穿插進行。依實測可調整，學校 / 實驗室偏好只有取得資訊後才納入。

Statistics / Experimental Design 隨研究主張一起練。Software Engineering 因本人 QA / SE 背景，在 defense / mock 中視同 Tier S；CPU/GPU / memory hierarchy 隨 deployment 答辯提高優先級。先備核心修補優先於進階延伸。

## 四週階段

| 階段 | 核心目標 | 訓練方式 | 具體產出 | 檢查點 |
| --- | --- | --- | --- | --- |
| 第 1 週：診斷與基礎定位 | 完成 30 題 adaptive diagnostic，13 個領域均有真實實測 evidence | 一次一題、先答後教、逐層追問；必要時即時補基礎 | 真實 session records；第 10 / 20 / 30 題 weakness snapshots；初步 portfolio evidence | 完成不代表通過；未測子題維持 Untested |
| 第 2 週：集中補洞 | 優先修復已測出的 Tier S Critical / Weak 與前置知識 | 每次選 1–2 個子題，閉卷作答、短教學、白板 / coding、變形重測 | mistake log、review queue、至少一份真實 defense draft | 關鍵子題能獨立重答，且沒有新的根本錯誤 |
| 第 3 週：跨題整合 | Fundamentals + Research / Project Defense + Statistics / Experimental Design + Software Engineering | 比較、ablation / uncertainty、QA / SE 證據與系統取捨；安排 mock | mock records；更新 map；有來源的 claim / evaluation 表 | 能處理追問，區分統計 / 因果 / 實務主張與工程品質維度 |
| 第 4 週：面試收斂 | Full mock、defense、spaced repetition；符合觸發條件才提高 school-specific 投入 | 隨機抽問、限時白板、三種 defense 時間版本；已知目標的 fit / risk questions | 最新 priorities、精簡 defense、真實 school information 或 UNKNOWN、未解問題清單 | 高優先級已測子題沒有未處理的根本錯誤；保留所有未知 |

Mock 建議先做 20–30 分鐘，再按目標面試形式調整。Mock 次數與題數依實際時間決定，不預填完成紀錄。

[School-specific](school-specific/README.md) 只在一階通過 / 確定口試後高強度使用，不搶走前期 fundamentals 時間；尚無目標時第 4 週仍做 full mock / defense / review。[Portfolio inventory](research-defense/portfolio-index.md) 的待補項目是證據缺口，不能當成已完成訓練。

## 每次訓練循環

1. 先看 [PROGRESS](PROGRESS.md) 與到期 [Review queue](review/spaced-repetition.md)。
2. 選一個主題：到期 Critical → 到期 Weak → 阻礙推導的前置基礎 → Tier S Untested → Review → Tier A 未覆蓋項目。
3. 先閉卷回答，再依 [rubric](diagnostic/scoring-rubric.md) 評定與追問。
4. 教學後換一個條件重答，紀錄有提示 / 無提示；安排延後重測。
5. 更新 session、mistakes 與 review queue；到檢查點再同步 map 和摘要。

## Adaptive 調整規則

| 實測訊號 | 調整 |
| --- | --- |
| Critical 出現在前置基礎，例如 chain rule 或條件機率 | 先補前置，再回到 backprop / Bayes 題；縮減進階延伸的時間 |
| 同一主題兩次獨立延後重測仍為 C / D | 拆成更小子題，換例子重新建立 mental model |
| 首答及追問為 A | 降低重複基本題比重，改問反例與跨領域應用；仍安排延後重測 |
| Theory 能回答，但 code / 白板失敗 | 為該子題安排實作；不以口述分數代替 coding 證據 |
| 專案主張缺 baseline、ablation 或數據來源 | 優先整理真實證據；無法補實驗時縮小主張並說明限制 |
| 剩餘時間不足 | 保留 Must Know、核心弱點、研究答辯與 mock；Should Know 延伸列入未完成項 |

同題提示後答對，不等於已掌握。Critical → Weak → Review → Strong 的提升只依新的獨立作答證據；可跨級提升，但必須記錄原因。

## 完成標準

- [ ] 30 題診斷完成，13 個領域皆有實測證據。
- [ ] 高優先級子題有定義、理由、推導 / 成本分析及變形題證據。
- [ ] 研究與專案能清楚交代個人貢獻、比較、結果來源及限制。
- [ ] 已進行模擬口試，改善事項有後續驗證。
- [ ] 仍未掌握與 Untested 的項目如實保留，不以看完文件宣告完成。

## Visual Learning integration

四週架構與轉階段條件維持不變。[Visual Learning](visual-learning/README.md) 是 Targeted Study / Review 內的工具，沒有新 phase 或每日 lesson 配額。先保存 Diagnostic closed-book 首答，再依 Review / Weak / Critical evidence 或教練指定，從 [Resource Map](visual-learning/RESOURCE_MAP.md) 選一個最貼近核心錯誤的資源。

首答前禁止對應 lesson、公式 / 完整解法與答案導向外部講解；不自動推薦目前題目的資源。觀看後 self explanation 與即時重答只算 Assisted Improvement，cold baseline、原 grade 與能力等級不由教材更新。沿既有 spaced repetition 安排 delayed closed-book retest，再用獨立證據調整 roadmap。
